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
import VendorBusinessGrid from "@/components/VendorBusinessGrid";
import RecentlyViewed from "@/components/RecentlyViewed";
import Footer from "@/components/Footer";
import SavedBusinesses from "@/pages/SavedBusinesses";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

type View = "home" | "detail" | "saved";

const Index = () => {
  const [allBusinesses] = useState<Business[]>(initialBusinesses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [view, setView] = useState<View>("home");

  const { favorites, toggle: toggleFavorite, isFavorite } = useFavorites();
  const { addReview, getReviews } = useReviews();

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

  const showSearchResults = searchQuery || selectedCategory;

  if (view === "detail" && selectedBusiness) {
    return (
      <>
        <Navbar onSavedClick={() => setView("saved")} savedCount={favorites.length} />
        <div className="pt-14 sm:pt-16">
          <BusinessDetail business={selectedBusiness} onBack={handleBack} reviews={getReviews(selectedBusiness.id)} onAddReview={addReview} />
        </div>
      </>
    );
  }

  if (view === "saved") {
    return (
      <>
        <Navbar onSavedClick={() => setView("saved")} savedCount={favorites.length} />
        <div className="pt-14 sm:pt-16">
          <SavedBusinesses businesses={allBusinesses} favorites={favorites} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} onViewDetails={handleViewDetails} onBack={handleBack} />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSavedClick={() => setView("saved")} savedCount={favorites.length} />
      <HeroSection onSearch={handleSearch} onSelectBusiness={handleViewDetails} />

      {showSearchResults ? (
        <>
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
                <p className="py-16 text-center text-muted-foreground">No demo businesses found.</p>
              )}
            </div>
          </section>
          <VendorBusinessGrid searchQuery={searchQuery} category={selectedCategory} />
        </>
      ) : (
        <>
          <CategoriesGrid onCategorySelect={handleCategorySelect} />
          <FamousInSolapur onViewDetails={handleViewDetails} />
          <FeaturedSection onViewDetails={handleViewDetails} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
          <VendorBusinessGrid />
          <OffersSection onViewDetails={handleViewDetails} />
          <TrendingSection onViewDetails={handleViewDetails} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
