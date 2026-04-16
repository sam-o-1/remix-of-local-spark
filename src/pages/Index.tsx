import { useState, useMemo } from "react";
import { businesses as initialBusinesses } from "@/data/businesses";
import type { Business } from "@/data/businesses";
import { useFavorites } from "@/hooks/useFavorites";
import { useReviews } from "@/hooks/useReviews";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import FeaturedSection from "@/components/FeaturedSection";
import FamousInSolapur from "@/components/FamousInSolapur";
import TrendingSection from "@/components/TrendingSection";
import OffersSection from "@/components/OffersSection";
import BusinessCard from "@/components/BusinessCard";
import BusinessDetail from "@/components/BusinessDetail";
import AdminPanel from "@/components/AdminPanel";
import Footer from "@/components/Footer";
import SavedBusinesses from "@/pages/SavedBusinesses";

type View = "home" | "detail" | "admin" | "saved";

const Index = () => {
  const [allBusinesses, setAllBusinesses] = useState<Business[]>(initialBusinesses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [view, setView] = useState<View>("home");

  const { favorites, toggle: toggleFavorite, isFavorite } = useFavorites();
  const { addReview, getReviews } = useReviews();

  // Sort by popularity (views) by default, then apply filters
  const filteredBusinesses = useMemo(() => {
    let result = [...allBusinesses].sort((a, b) => b.views - a.views);
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
    setView("home");
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSearchQuery("");
    setSelectedBusinessId(null);
    setView("home");
  };

  const handleViewDetails = (id: string) => {
    setSelectedBusinessId(id);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedBusinessId(null);
    setView("home");
  };

  const handleToggleFeatured = (id: string) => {
    setAllBusinesses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFeatured: !b.isFeatured } : b))
    );
  };

  const handleUpdateBusiness = (updated: Business) => {
    setAllBusinesses((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const showSearchResults = searchQuery || selectedCategory;

  if (view === "detail" && selectedBusiness) {
    return (
      <>
        <Navbar onAdminToggle={() => setView("admin")} isAdmin={false} onSavedClick={() => setView("saved")} savedCount={favorites.length} />
        <div className="pt-14 sm:pt-16">
          <BusinessDetail business={selectedBusiness} onBack={handleBack} reviews={getReviews(selectedBusiness.id)} onAddReview={addReview} />
        </div>
      </>
    );
  }

  if (view === "saved") {
    return (
      <>
        <Navbar onAdminToggle={() => setView("admin")} isAdmin={false} onSavedClick={() => setView("saved")} savedCount={favorites.length} />
        <div className="pt-14 sm:pt-16">
          <SavedBusinesses businesses={allBusinesses} favorites={favorites} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} onViewDetails={handleViewDetails} onBack={handleBack} />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAdminToggle={() => setView(view === "admin" ? "home" : "admin")} isAdmin={view === "admin"} onSavedClick={() => setView("saved")} savedCount={favorites.length} />

      {view === "admin" ? (
        <div className="pt-14 sm:pt-16">
          <AdminPanel businesses={allBusinesses} onToggleFeatured={handleToggleFeatured} onUpdateBusiness={handleUpdateBusiness} />
        </div>
      ) : (
        <>
          <HeroSection onSearch={handleSearch} onSelectBusiness={handleViewDetails} />

          {showSearchResults ? (
            <section className="py-12">
              <div className="container">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {filteredBusinesses.length} result{filteredBusinesses.length !== 1 && "s"}
                    {selectedCategory && (
                      <span className="ml-2 text-base font-normal text-muted-foreground">in {selectedCategory.replace("-", " ")}</span>
                    )}
                    {searchQuery && (
                      <span className="ml-2 text-base font-normal text-muted-foreground">for "{searchQuery}"</span>
                    )}
                  </h2>
                  <button onClick={() => { setSearchQuery(""); setSelectedCategory(null); }} className="text-sm font-medium text-primary hover:underline">
                    Clear filters
                  </button>
                </div>
                <p className="mb-4 text-xs text-muted-foreground">📊 Sorted by popularity</p>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredBusinesses.map((b, i) => (
                    <BusinessCard key={b.id} business={b} onViewDetails={handleViewDetails} isFavorite={isFavorite(b.id)} onToggleFavorite={toggleFavorite} rank={i + 1} />
                  ))}
                </div>
                {filteredBusinesses.length === 0 && (
                  <p className="py-16 text-center text-muted-foreground">No businesses found. Try a different search.</p>
                )}
              </div>
            </section>
          ) : (
            <>
              <CategoriesGrid onCategorySelect={handleCategorySelect} />
              <FamousInSolapur onViewDetails={handleViewDetails} />
              <FeaturedSection onViewDetails={handleViewDetails} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
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
