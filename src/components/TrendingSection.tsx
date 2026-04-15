import { TrendingUp, Eye } from "lucide-react";
import { businesses } from "@/data/businesses";

interface TrendingSectionProps {
  onViewDetails: (id: string) => void;
}

const TrendingSection = ({ onViewDetails }: TrendingSectionProps) => {
  const trending = [...businesses].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold sm:text-3xl">Trending Now</h2>
          </div>
          <p className="mt-1 text-muted-foreground">Most viewed businesses this week</p>
        </div>

        <div className="space-y-3">
          {trending.map((b, i) => (
            <button
              key={b.id}
              onClick={() => onViewDetails(b.id)}
              className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left shadow-card transition-all hover:shadow-card-hover"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                {i + 1}
              </span>
              <img
                src={b.image}
                alt={b.name}
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-foreground">{b.name}</p>
                <p className="text-sm text-muted-foreground">
                  {b.area} · {b.category.replace("-", " ")}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{b.views.toLocaleString()}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
