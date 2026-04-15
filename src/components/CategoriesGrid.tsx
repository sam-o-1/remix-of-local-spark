import { categories } from "@/data/businesses";

interface CategoriesGridProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategoriesGrid = ({ onCategorySelect }: CategoriesGridProps) => {
  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">Browse by Category</h2>
          <p className="text-muted-foreground">Find exactly what you need</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover sm:p-6"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-3xl sm:text-4xl">{cat.icon}</span>
              <div className="text-center">
                <p className="font-semibold text-foreground">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.count} businesses</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
