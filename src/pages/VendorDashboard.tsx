import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDbBusinesses, type DbBusiness } from "@/hooks/useDbBusinesses";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, ArrowLeft, Store, Clock } from "lucide-react";
import BusinessForm from "@/components/BusinessForm";
import Navbar from "@/components/Navbar";

const VendorDashboard = () => {
  const { user, role } = useAuth();
  const { businesses, loading, refetch } = useDbBusinesses(user?.id);
  const [editing, setEditing] = useState<DbBusiness | null>(null);
  const [adding, setAdding] = useState(false);
  const [requestStatus, setRequestStatus] = useState<"pending" | "rejected" | null>(null);
  const { toast } = useToast();

  const isVendor = role === "vendor" || role === "admin";

  useEffect(() => {
    if (!user || isVendor) return;
    supabase
      .from("vendor_requests")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.status === "pending" || data?.status === "rejected") setRequestStatus(data.status);
      });
  }, [user, isVendor]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this business?")) return;
    const { error } = await supabase.from("businesses").delete().eq("id", id);
    if (error) toast({ title: error.message, variant: "destructive" });
    else { toast({ title: "Business deleted" }); refetch(); }
  };

  return (
    <>
      <Navbar />
      <div className="container pt-20 pb-12">
        <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <Store className="h-6 w-6 text-primary" /> My Businesses
            </h1>
            <p className="text-sm text-muted-foreground">Manage your business listings</p>
          </div>
          {isVendor && (
            <Button onClick={() => setAdding(true)}>
              <Plus className="mr-1 h-4 w-4" /> Add Business
            </Button>
          )}
        </div>

        {!isVendor && (
          <Card className="p-6 text-center">
            {requestStatus === "pending" ? (
              <div className="flex flex-col items-center gap-2">
                <Clock className="h-8 w-8 text-primary" />
                <p className="font-medium">Vendor request pending</p>
                <p className="text-sm text-muted-foreground">An admin will review your request shortly. You'll be able to add businesses once approved.</p>
              </div>
            ) : requestStatus === "rejected" ? (
              <p className="text-muted-foreground">Your vendor request was not approved. Please contact an admin for details.</p>
            ) : (
              <p className="text-muted-foreground">
                You need vendor access to add businesses. Sign up as a vendor or contact an admin.
              </p>
            )}
          </Card>
        )}

        {isVendor && loading && <p className="text-muted-foreground">Loading...</p>}

        {isVendor && !loading && businesses.length === 0 && (
          <Card className="p-8 text-center">
            <p className="mb-4 text-muted-foreground">You haven't added any businesses yet.</p>
            <Button onClick={() => setAdding(true)}><Plus className="mr-1 h-4 w-4" /> Add Your First Business</Button>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((b) => (
            <Card key={b.id} className="overflow-hidden">
              {b.image_url ? (
                <img src={b.image_url} alt={b.name} className="h-40 w-full object-cover" />
              ) : (
                <div className="flex h-40 items-center justify-center bg-secondary text-muted-foreground">
                  <Store className="h-10 w-10" />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold">{b.name}</h3>
                <p className="text-xs text-muted-foreground">{b.category} · {b.location}</p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{b.description}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => setEditing(b)}>
                    <Pencil className="mr-1 h-3 w-3" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(b.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={adding} onOpenChange={setAdding}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add Business</DialogTitle></DialogHeader>
            <BusinessForm onSaved={() => { setAdding(false); refetch(); }} onCancel={() => setAdding(false)} />
          </DialogContent>
        </Dialog>

        <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Edit Business</DialogTitle></DialogHeader>
            {editing && (
              <BusinessForm initial={editing} onSaved={() => { setEditing(null); refetch(); }} onCancel={() => setEditing(null)} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default VendorDashboard;
