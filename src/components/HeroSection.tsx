import { MapPin } from "lucide-react";
import SearchBar from "./SearchBar";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onSelectBusiness: (id: string) => void;
}

const HeroSection = ({ onSearch, onSelectBusiness }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent px-4 pb-16 pt-24 sm:pb-20 sm:pt-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-block rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
          🚀 Discover & Support Local Businesses in Solapur
        </span>

        <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
          Find the <span className="text-accent">Best</span> in Solapur
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
          Explore top-rated restaurants, salons, clinics & more across Solapur. Exclusive deals, real reviews, and instant contact.
        </p>

        <SearchBar onSearch={onSearch} onSelectBusiness={onSelectBusiness} />

        <div className="mt-3 flex items-center justify-center gap-1.5 text-sm text-primary-foreground/60">
          <MapPin className="h-3.5 w-3.5" />
          Solapur, Maharashtra
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-primary-foreground/70">
          <span>Popular:</span>
          {["Restaurants", "Salons", "Clinics", "Gyms"].map((tag) => (
            <button
              key={tag}
              onClick={() => onSearch(tag)}
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
