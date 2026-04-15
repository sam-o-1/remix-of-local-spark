import { MapPin, Navigation } from "lucide-react";
import { businesses } from "@/data/businesses";
import { useMemo } from "react";

interface LocationFilterProps {
  selectedArea: string | null;
  onAreaChange: (area: string | null) => void;
}

const LocationFilter = ({ selectedArea, onAreaChange }: LocationFilterProps) => {
  const areas = useMemo(
    () => [...new Set(businesses.map((b) => b.area))].sort(),
    []
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>Area:</span>
      </div>

      <select
        value={selectedArea ?? ""}
        onChange={(e) => onAreaChange(e.target.value || null)}
        className="h-9 rounded-lg border border-border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <option value="">All Areas</option>
        {areas.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      <button
        onClick={() => {
          // Simple mock — just pick a random area to simulate geolocation
          const randomArea = areas[Math.floor(Math.random() * areas.length)];
          onAreaChange(randomArea);
        }}
        className="flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-primary transition hover:bg-primary/5"
      >
        <Navigation className="h-3.5 w-3.5" />
        Use my location
      </button>

      {selectedArea && (
        <button
          onClick={() => onAreaChange(null)}
          className="text-xs font-medium text-destructive hover:underline"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default LocationFilter;
