import { Star, Award } from "lucide-react";
import { businesses } from "@/data/businesses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FamousInSolapurProps {
  onViewDetails: (id: string) => void;
}

const FamousInSolapur = ({ onViewDetails }: FamousInSolapurProps) => {
  // Top restaurants & salons sorted by rating
  const famous = businesses
    .filter((b) => b.category === "restaurants" || b.category === "salons")
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold sm:text-3xl">Famous in Solapur</h2>
          </div>
          <p className="mt-1 text-muted-foreground">
            Top-rated restaurants & salons loved by Solapurkars
          </p>
        </div>

        <ScrollArea className="w-full">
          <div className="flex gap-5 pb-4">
            {famous.map((b) => (
              <div
                key={b.id}
                className="group w-[280px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge className="absolute left-3 top-3 gap-1 bg-accent text-accent-foreground shadow-md">
                    <Award className="h-3 w-3" />
                    Popular
                  </Badge>
                </div>

                <div className="p-4">
                  <h3 className="mb-1 truncate text-base font-bold text-foreground">
                    {b.name}
                  </h3>
                  <p className="mb-2 text-xs capitalize text-muted-foreground">
                    {b.category.replace("-", " ")} · {b.area}
                  </p>

                  <div className="mb-3 flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5 rounded-md bg-primary/10 px-2 py-0.5">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span className="text-sm font-bold text-primary">{b.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({b.reviewCount} reviews)
                    </span>
                  </div>

                  {b.offers && (
                    <p className="mb-3 truncate rounded-lg bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                      🎉 {b.offers}
                    </p>
                  )}

                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => onViewDetails(b.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default FamousInSolapur;
