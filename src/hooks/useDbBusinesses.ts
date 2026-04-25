import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DbBusiness {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  location: string;
  contact: string;
  description: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export const useDbBusinesses = (ownerId?: string) => {
  const [businesses, setBusinesses] = useState<DbBusiness[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("businesses").select("*").order("created_at", { ascending: false });
    if (ownerId) query = query.eq("owner_id", ownerId);
    const { data } = await query;
    setBusinesses((data as DbBusiness[]) ?? []);
    setLoading(false);
  }, [ownerId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { businesses, loading, refetch: fetch };
};
