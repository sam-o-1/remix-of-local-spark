import { useState } from "react";
import { Star, Edit, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Business } from "@/data/businesses";

interface AdminPanelProps {
  businesses: Business[];
  onToggleFeatured: (id: string) => void;
  onUpdateBusiness: (updated: Business) => void;
}

const AdminPanel = ({ businesses, onToggleFeatured, onUpdateBusiness }: AdminPanelProps) => {
  const [editBiz, setEditBiz] = useState<Business | null>(null);

  const handleSave = () => {
    if (editBiz) {
      onUpdateBusiness(editBiz);
      setEditBiz(null);
    }
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-muted-foreground">Manage businesses, toggle featured, edit details</p>
        </div>

        <div className="space-y-3">
          {businesses.map((b) => (
            <div
              key={b.id}
              className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
            >
              <img src={b.image} alt={b.name} className="h-12 w-12 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{b.name}</p>
                <p className="text-sm text-muted-foreground">{b.area} · ⭐ {b.rating}</p>
              </div>

              {b.isFeatured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}

              <Button
                size="sm"
                variant="outline"
                onClick={() => onToggleFeatured(b.id)}
              >
                {b.isFeatured ? <EyeOff className="mr-1 h-4 w-4" /> : <Eye className="mr-1 h-4 w-4" />}
                {b.isFeatured ? "Unfeature" : "Feature"}
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" onClick={() => setEditBiz({ ...b })}>
                    <Edit className="mr-1 h-4 w-4" /> Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit {b.name}</DialogTitle>
                  </DialogHeader>
                  {editBiz && editBiz.id === b.id && (
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label>Name</Label>
                        <Input value={editBiz.name} onChange={(e) => setEditBiz({ ...editBiz, name: e.target.value })} />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea value={editBiz.description} onChange={(e) => setEditBiz({ ...editBiz, description: e.target.value })} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Area</Label>
                          <Input value={editBiz.area} onChange={(e) => setEditBiz({ ...editBiz, area: e.target.value })} />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input value={editBiz.phone} onChange={(e) => setEditBiz({ ...editBiz, phone: e.target.value })} />
                        </div>
                      </div>
                      <div>
                        <Label>Offers</Label>
                        <Input value={editBiz.offers ?? ""} onChange={(e) => setEditBiz({ ...editBiz, offers: e.target.value || undefined })} />
                      </div>
                      <Button onClick={handleSave} className="w-full">Save Changes</Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
