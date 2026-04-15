import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BusinessCard from "@/components/BusinessCard";
import type { Business } from "@/data/businesses";

interface SavedBusinessesProps {
  businesses: Business[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  onViewDetails: (id: string) => void;
  onBack: () => void;
}

const SavedBusinesses = ({
  businesses,
  favorites,
  onToggleFavorite,
  isFavorite,
  onViewDetails,
  onBack,
}: SavedBusinessesProps) => {
  const saved = businesses.filter((b) => favorites.includes(b.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold">
            Saved Businesses{" "}
            <span className="text-lg font-normal text-muted-foreground">({saved.length})</span>
          </h1>
        </div>

        {saved.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No saved businesses yet.</p>
            <p className="text-sm text-muted-foreground">
              Tap the heart icon on any business to save it here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {saved.map((b) => (
              <BusinessCard
                key={b.id}
                business={b}
                onViewDetails={onViewDetails}
                isFavorite={isFavorite(b.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedBusinesses;
