import { Tag } from "lucide-react";
import { businesses } from "@/data/businesses";
import { Button } from "@/components/ui/button";

interface OffersSectionProps {
  onViewDetails: (id: string) => void;
}

const OffersSection = ({ onViewDetails }: OffersSectionProps) => {
  const withOffers = businesses.filter((b) => b.offers);

  return (
    <section className="bg-gradient-to-br from-accent/5 via-background to-primary/5 py-12 sm:py-16">
      <div className="container">
        <div className="mb-8 flex items-center gap-2">
          <Tag className="h-6 w-6 text-destructive" />
          <h2 className="text-2xl font-bold sm:text-3xl">Today's Deals & Offers</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {withOffers.map((b) => (
            <div
              key={b.id}
              className="relative overflow-hidden rounded-xl border border-accent/20 bg-card p-5 shadow-card"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent/10" />
              <div className="relative">
                <p className="mb-1 text-sm font-medium text-muted-foreground">{b.name}</p>
                <p className="mb-3 text-lg font-bold text-foreground">{b.offers}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{b.area}</span>
                  <Button size="sm" variant="outline" onClick={() => onViewDetails(b.id)}>
                    Claim Offer
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
