import { Tag, Sparkles, ArrowRight } from "lucide-react";
import { businesses } from "@/data/businesses";
import { Badge } from "@/components/ui/badge";
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
          <Sparkles className="h-6 w-6 text-destructive" />
          <h2 className="text-2xl font-bold sm:text-3xl">Today's Deals & Offers</h2>
          <Badge variant="secondary" className="ml-2">{withOffers.length} Active</Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {withOffers.map((b) => (
            <div
              key={b.id}
              className="group relative overflow-hidden rounded-xl border border-accent/20 bg-card p-5 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-accent/15 to-primary/10 transition-transform group-hover:scale-125" />
              <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-destructive/5" />
              <div className="relative">
                <div className="mb-3 flex items-center gap-3">
                  <img src={b.image} alt={b.name} className="h-12 w-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold text-foreground">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.area} · ⭐ {b.rating}</p>
                  </div>
                </div>
                <div className="mb-3 rounded-lg bg-destructive/5 px-3 py-2">
                  <p className="text-sm font-bold text-destructive">🔥 {b.offers}</p>
                </div>
                <Button
                  size="sm"
                  className="w-full gap-1"
                  onClick={() => onViewDetails(b.id)}
                >
                  Claim Offer <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
