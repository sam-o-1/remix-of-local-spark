import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent px-4 pb-16 pt-24 sm:pb-20 sm:pt-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-block rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
          🚀 Discover & Support Local Businesses
        </span>

        <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
          Find the <span className="text-accent">Best</span> Near You
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
          Explore top-rated restaurants, salons, clinics & more in your area. Exclusive deals, real reviews, and instant contact.
        </p>

        {/* Search bar */}
        <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search businesses, categories, areas..."
              className="h-12 border-0 bg-card pl-11 text-base shadow-hero placeholder:text-muted-foreground/60 focus-visible:ring-accent sm:h-14 sm:text-lg"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="h-12 bg-accent px-8 text-base font-semibold text-accent-foreground shadow-hero hover:bg-accent/90 sm:h-14"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-primary-foreground/70">
          <span>Popular:</span>
          {["Restaurants", "Salons", "Clinics", "Gyms"].map((tag) => (
            <button
              key={tag}
              onClick={() => { setQuery(tag); onSearch(tag); }}
              className="rounded-full bg-primary-foreground/10 px-3 py-1 text-primary-foreground/90 transition hover:bg-primary-foreground/20"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
