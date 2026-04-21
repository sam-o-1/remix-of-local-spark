import { Clock } from "lucide-react";
import { businesses } from "@/data/businesses";

interface Props {
  recentIds: string[];
  onViewDetails: (id: string) => void;
}

const RecentlyViewed = ({ recentIds, onViewDetails }: Props) => {
  if (recentIds.length === 0) return null;
  const items = recentIds
    .map((id) => businesses.find((b) => b.id === id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));
  if (items.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container">
        <div className="mb-5 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold sm:text-2xl">Recently Viewed</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {items.map((b) => (
            <button
              key={b.id}
              onClick={() => onViewDetails(b.id)}
              className="group flex w-56 shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition hover:shadow-md"
            >
              <div className="h-28 w-full overflow-hidden">
                <img src={b.image} alt={b.name} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-3">
                <p className="line-clamp-1 text-sm font-semibold">{b.name}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">{b.area}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
