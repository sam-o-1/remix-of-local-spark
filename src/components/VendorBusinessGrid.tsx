import { Card } from "@/components/ui/card";
import { Phone, MapPin, Store } from "lucide-react";
import { useDbBusinesses } from "@/hooks/useDbBusinesses";

interface Props {
  searchQuery?: string;
  category?: string | null;
}

const VendorBusinessGrid = ({ searchQuery, category }: Props) => {
  const { businesses, loading } = useDbBusinesses();

  const filtered = businesses.filter((b) => {
    if (category && b.category.toLowerCase() !== category.toLowerCase()) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.location.toLowerCase().includes(q);
    }
    return true;
  });

  if (loading) return null;
  if (filtered.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Vendor Listings</h2>
          <p className="text-sm text-muted-foreground">Businesses added by local vendors</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((b) => (
            <Card key={b.id} className="overflow-hidden transition hover:shadow-md">
              {b.image_url ? (
                <img src={b.image_url} alt={b.name} className="h-44 w-full object-cover" />
              ) : (
                <div className="flex h-44 items-center justify-center bg-secondary"><Store className="h-10 w-10 text-muted-foreground" /></div>
              )}
              <div className="p-4">
                <p className="text-xs font-medium text-primary">{b.category}</p>
                <h3 className="mt-0.5 font-semibold">{b.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{b.description}</p>
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {b.location}</p>
                  <p className="flex items-center gap-1"><Phone className="h-3 w-3" /> {b.contact}</p>
                </div>
                <a
                  href={`tel:${b.contact}`}
                  className="mt-3 flex w-full items-center justify-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Phone className="h-3 w-3" /> Call
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorBusinessGrid;
