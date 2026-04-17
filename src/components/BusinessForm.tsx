import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";
import type { DbBusiness } from "@/hooks/useDbBusinesses";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  category: z.string().trim().min(2).max(50),
  location: z.string().trim().min(2).max(100),
  contact: z.string().trim().min(5).max(50),
  description: z.string().trim().max(1000).optional(),
});

interface Props {
  initial?: DbBusiness;
  onSaved: () => void;
  onCancel?: () => void;
}

const BusinessForm = ({ initial, onSaved, onCancel }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [location, setLocation] = useState(initial?.location ?? "Solapur");
  const [contact, setContact] = useState(initial?.contact ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image must be under 5MB", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("business-images").upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("business-images").getPublicUrl(path);
      setImageUrl(data.publicUrl);
      toast({ title: "Image uploaded" });
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = schema.safeParse({ name, category, location, contact, description });
    if (!parsed.success) {
      toast({ title: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const payload = { ...parsed.data, image_url: imageUrl || null, owner_id: user.id };
      if (initial) {
        const { error } = await supabase.from("businesses").update(payload).eq("id", initial.id);
        if (error) throw error;
        toast({ title: "Business updated" });
      } else {
        const { error } = await supabase.from("businesses").insert(payload);
        if (error) throw error;
        toast({ title: "Business added" });
      }
      onSaved();
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Name *</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
        </div>
        <div>
          <Label>Category *</Label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Restaurant" required maxLength={50} />
        </div>
        <div>
          <Label>Location (area) *</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} required maxLength={100} />
        </div>
        <div>
          <Label>Contact (phone) *</Label>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} required maxLength={50} />
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} maxLength={1000} />
      </div>
      <div>
        <Label>Image</Label>
        <div className="mt-1 flex items-center gap-3">
          {imageUrl && <img src={imageUrl} alt="" className="h-16 w-16 rounded-lg object-cover" />}
          <label className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-secondary">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Uploading..." : imageUrl ? "Change image" : "Upload image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
          </label>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={saving || uploading} className="flex-1">
          {saving ? "Saving..." : initial ? "Update Business" : "Add Business"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        )}
      </div>
    </form>
  );
};

export default BusinessForm;
