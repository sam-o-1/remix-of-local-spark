import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { businesses } from "@/data/businesses";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSelectBusiness: (id: string) => void;
}

const SearchBar = ({ onSearch, onSelectBusiness }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return businesses
      .filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.area.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (id: string) => {
    setOpen(false);
    setQuery("");
    onSelectBusiness(id);
  };

  const handleSubmit = () => {
    setOpen(false);
    onSearch(query);
  };

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-2xl">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 h-5 w-5 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Search businesses, categories, areas..."
          className="h-12 w-full rounded-xl border-0 bg-card pl-11 pr-10 text-base shadow-hero placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent sm:h-14 sm:text-lg"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="absolute right-3 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-hero">
          {suggestions.map((b) => (
            <button
              key={b.id}
              onClick={() => handleSelect(b.id)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary"
            >
              <img
                src={b.image}
                alt={b.name}
                className="h-10 w-10 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{b.name}</p>
                <p className="text-xs text-muted-foreground">
                  {b.area} · <span className="capitalize">{b.category.replace("-", " ")}</span>
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
