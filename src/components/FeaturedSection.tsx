import { businesses } from "@/data/businesses";
import BusinessCard from "./BusinessCard";

interface FeaturedSectionProps {
  onViewDetails: (id: string) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

const FeaturedSection = ({ onViewDetails, isFavorite, onToggleFavorite }: FeaturedSectionProps) => {
  const featured = businesses.filter((b) => b.isFeatured);

  return (
    <section className="bg-secondary/50 py-12 sm:py-16">
      <div className="container">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="mb-1 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Hand-picked for you
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl">Featured Businesses</h2>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((b) => (
            <BusinessCard
              key={b.id}
              business={b}
              onViewDetails={onViewDetails}
              isFavorite={isFavorite(b.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
