import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useDbBusinesses, type DbBusiness } from "@/hooks/useDbBusinesses";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, ShieldCheck, Trash2, Plus, Pencil, UserCog, Store, Inbox, Check, X, Star, BadgeCheck,
} from "lucide-react";
import BusinessForm from "@/components/BusinessForm";
import Navbar from "@/components/Navbar";

interface UserRow {
  user_id: string;
  display_name: string | null;
  email: string | null;
  roles: string[];
}

interface VendorRequest {
  id: string;
  user_id: string;
  note: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

const AdminDashboard = () => {
  const { businesses, loading, refetch } = useDbBusinesses();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [requests, setRequests] = useState<VendorRequest[]>([]);
  const [editing, setEditing] = useState<DbBusiness | null>(null);
  const [adding, setAdding] = useState(false);
  const { toast } = useToast();

  const loadUsers = async () => {
    setUsersLoading(true);
    const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, email");
    const { data: roles } = await supabase.from("user_roles").select("user_id, role");
    if (profiles) {
      const merged: UserRow[] = profiles.map((p: any) => ({
        ...p,
        roles: (roles ?? []).filter((r: any) => r.user_id === p.user_id).map((r: any) => r.role),
      }));
      setUsers(merged);
    }
    setUsersLoading(false);
  };

  const loadRequests = async () => {
    const { data } = await supabase
      .from("vendor_requests")
      .select("id, user_id, note, status, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: false });
    setRequests((data as VendorRequest[]) ?? []);
  };

  useEffect(() => { loadUsers(); loadRequests(); }, []);

  const reviewRequest = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase.from("vendor_requests").update({ status }).eq("id", id);
    if (error) return toast({ title: error.message, variant: "destructive" });
    toast({ title: status === "approved" ? "Vendor approved" : "Request rejected" });
    loadRequests(); loadUsers();
  };

  const promoteVendor = async (userId: string, isVendor: boolean) => {
    if (isVendor) {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "vendor");
      if (error) return toast({ title: error.message, variant: "destructive" });
      toast({ title: "Vendor access removed" });
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "vendor" });
      if (error) return toast({ title: error.message, variant: "destructive" });
      toast({ title: "Promoted to vendor" });
    }
    loadUsers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this business?")) return;
    const { error } = await supabase.from("businesses").delete().eq("id", id);
    if (error) toast({ title: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); refetch(); }
  };

  const toggleFlag = async (b: DbBusiness, field: "is_featured" | "is_verified") => {
    const { error } = await supabase.from("businesses").update({ [field]: !b[field] }).eq("id", b.id);
    if (error) return toast({ title: error.message, variant: "destructive" });
    toast({ title: `${field === "is_featured" ? "Popular" : "Verified"} ${!b[field] ? "enabled" : "disabled"}` });
    refetch();
  };

  const userLookup = (uid: string) => users.find((u) => u.user_id === uid);

  return (
    <>
      <Navbar />
      <div className="container pt-20 pb-12">
        <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold">
          <ShieldCheck className="h-6 w-6 text-primary" /> Admin Dashboard
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">Manage users, vendor requests, and all business listings</p>

        {/* Vendor Requests */}
        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Inbox className="h-5 w-5" /> Vendor Requests ({requests.length})
          </h2>
          <Card className="divide-y">
            {requests.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">No pending vendor requests.</p>
            )}
            {requests.map((r) => {
              const u = userLookup(r.user_id);
              return (
                <div key={r.id} className="flex flex-wrap items-start gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{u?.display_name || u?.email || r.user_id.slice(0, 8)}</p>
                    <p className="truncate text-xs text-muted-foreground">{u?.email}</p>
                    {r.note && <p className="mt-1 text-sm text-muted-foreground">"{r.note}"</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => reviewRequest(r.id, "approved")}>
                      <Check className="mr-1 h-3 w-3" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => reviewRequest(r.id, "rejected")}>
                      <X className="mr-1 h-3 w-3" /> Reject
                    </Button>
                  </div>
                </div>
              );
            })}
          </Card>
        </section>

        {/* Users */}
        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <UserCog className="h-5 w-5" /> Users ({users.length})
          </h2>
          <Card className="divide-y">
            {usersLoading && <p className="p-4 text-sm text-muted-foreground">Loading...</p>}
            {users.map((u) => {
              const isAdmin = u.roles.includes("admin");
              const isVendor = u.roles.includes("vendor");
              return (
                <div key={u.user_id} className="flex flex-wrap items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{u.display_name || u.email}</p>
                    <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  {isAdmin && <Badge>Admin</Badge>}
                  {isVendor && <Badge variant="secondary">Vendor</Badge>}
                  {!isAdmin && !isVendor && <Badge variant="outline">Customer</Badge>}
                  {!isAdmin && (
                    <Button size="sm" variant="outline" onClick={() => promoteVendor(u.user_id, isVendor)}>
                      {isVendor ? "Revoke Vendor" : "Make Vendor"}
                    </Button>
                  )}
                </div>
              );
            })}
          </Card>
        </section>

        {/* Businesses */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Store className="h-5 w-5" /> All Businesses ({businesses.length})
            </h2>
            <Button size="sm" onClick={() => setAdding(true)}><Plus className="mr-1 h-4 w-4" /> Add</Button>
          </div>
          {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
          <div className="grid gap-3">
            {businesses.map((b) => (
              <Card key={b.id} className="flex flex-wrap items-center gap-3 p-3">
                {b.image_url ? (
                  <img src={b.image_url} alt={b.name} className="h-14 w-14 rounded-lg object-cover" />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary"><Store className="h-5 w-5 text-muted-foreground" /></div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">
                    {b.name}
                    {b.is_featured && <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-[10px]"><Star className="mr-0.5 h-2.5 w-2.5" />Popular</Badge>}
                    {b.is_verified && <Badge className="ml-1 px-1.5 py-0 text-[10px]"><BadgeCheck className="mr-0.5 h-2.5 w-2.5" />Verified</Badge>}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{b.category} · {b.location} · {b.contact}</p>
                </div>
                <Button
                  size="sm"
                  variant={b.is_featured ? "default" : "outline"}
                  onClick={() => toggleFlag(b, "is_featured")}
                  title="Toggle popular"
                >
                  <Star className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant={b.is_verified ? "default" : "outline"}
                  onClick={() => toggleFlag(b, "is_verified")}
                  title="Toggle verified"
                >
                  <BadgeCheck className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setEditing(b)}><Pencil className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(b.id)}><Trash2 className="h-3 w-3" /></Button>
              </Card>
            ))}
          </div>
        </section>

        <Dialog open={adding} onOpenChange={setAdding}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add Business</DialogTitle></DialogHeader>
            <BusinessForm onSaved={() => { setAdding(false); refetch(); }} onCancel={() => setAdding(false)} />
          </DialogContent>
        </Dialog>

        <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Edit Business</DialogTitle></DialogHeader>
            {editing && <BusinessForm initial={editing} onSaved={() => { setEditing(null); refetch(); }} onCancel={() => setEditing(null)} />}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AdminDashboard;
