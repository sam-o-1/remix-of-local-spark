import { useState, useMemo } from "react";
import { businesses as initialBusinesses } from "@/data/businesses";
import type { Business } from "@/data/businesses";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import FeaturedSection from "@/components/FeaturedSection";
import TrendingSection from "@/components/TrendingSection";
import OffersSection from "@/components/OffersSection";
import BusinessCard from "@/components/BusinessCard";
import BusinessDetail from "@/components/BusinessDetail";
import AdminPanel from "@/components/AdminPanel";
import Footer from "@/components/Footer";

const Index = () => {
  const [allBusinesses, setAllBusinesses] = useState<Business[]>(initialBusinesses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const filteredBusinesses = useMemo(() => {
    let result = allBusinesses;
    if (selectedCategory) {
      result = result.filter((b) => b.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.area.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allBusinesses, searchQuery, selectedCategory]);

  const selectedBusiness = allBusinesses.find((b) => b.id === selectedBusinessId);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
    setSelectedBusinessId(null);
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSearchQuery("");
    setSelectedBusinessId(null);
  };

  const handleViewDetails = (id: string) => {
    setSelectedBusinessId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedBusinessId(null);
  };

  const handleToggleFeatured = (id: string) => {
    setAllBusinesses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFeatured: !b.isFeatured } : b))
    );
  };

  const handleUpdateBusiness = (updated: Business) => {
    setAllBusinesses((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  // Detail view
  if (selectedBusiness) {
    return (
      <>
        <Navbar onAdminToggle={() => setIsAdmin(!isAdmin)} isAdmin={isAdmin} />
        <div className="pt-14 sm:pt-16">
          <BusinessDetail business={selectedBusiness} onBack={handleBack} />
        </div>
      </>
    );
  }

  const showSearchResults = searchQuery || selectedCategory;

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAdminToggle={() => setIsAdmin(!isAdmin)} isAdmin={isAdmin} />

      {isAdmin ? (
        <div className="pt-14 sm:pt-16">
          <AdminPanel
            businesses={allBusinesses}
            onToggleFeatured={handleToggleFeatured}
            onUpdateBusiness={handleUpdateBusiness}
          />
        </div>
      ) : (
        <>
          <HeroSection onSearch={handleSearch} />

          {showSearchResults ? (
            <section className="py-12">
              <div className="container">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {filteredBusinesses.length} result{filteredBusinesses.length !== 1 && "s"}
                    {selectedCategory && (
                      <span className="ml-2 text-base font-normal text-muted-foreground">
                        in {selectedCategory.replace("-", " ")}
                      </span>
                    )}
                    {searchQuery && (
                      <span className="ml-2 text-base font-normal text-muted-foreground">
                        for "{searchQuery}"
                      </span>
                    )}
                  </h2>
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredBusinesses.map((b) => (
                    <BusinessCard key={b.id} business={b} onViewDetails={handleViewDetails} />
                  ))}
                </div>
                {filteredBusinesses.length === 0 && (
                  <p className="py-16 text-center text-muted-foreground">
                    No businesses found. Try a different search.
                  </p>
                )}
              </div>
            </section>
          ) : (
            <>
              <CategoriesGrid onCategorySelect={handleCategorySelect} />
              <FeaturedSection onViewDetails={handleViewDetails} />
              <OffersSection onViewDetails={handleViewDetails} />
              <TrendingSection onViewDetails={handleViewDetails} />
            </>
          )}

          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
