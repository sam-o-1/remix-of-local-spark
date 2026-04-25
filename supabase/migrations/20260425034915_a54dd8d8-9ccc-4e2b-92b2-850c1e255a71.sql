-- 1. Add verified flag to businesses
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS is_verified boolean NOT NULL DEFAULT false;

-- 2. Vendor requests table
CREATE TYPE public.vendor_request_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.vendor_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  note text,
  status public.vendor_request_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid
);

ALTER TABLE public.vendor_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own vendor request"
ON public.vendor_requests FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own vendor request"
ON public.vendor_requests FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins view all vendor requests"
ON public.vendor_requests FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins update vendor requests"
ON public.vendor_requests FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TRIGGER trg_vendor_requests_updated
BEFORE UPDATE ON public.vendor_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. When a request is approved, grant vendor role automatically
CREATE OR REPLACE FUNCTION public.handle_vendor_request_approval()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'approved' AND (OLD.status IS DISTINCT FROM 'approved') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'vendor'::public.app_role)
    ON CONFLICT DO NOTHING;
    NEW.reviewed_at = now();
    NEW.reviewed_by = auth.uid();
  ELSIF NEW.status = 'rejected' AND (OLD.status IS DISTINCT FROM 'rejected') THEN
    NEW.reviewed_at = now();
    NEW.reviewed_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_vendor_request_approval
BEFORE UPDATE ON public.vendor_requests
FOR EACH ROW EXECUTE FUNCTION public.handle_vendor_request_approval();