import { useState, useCallback } from "react";
import { reviews as initialReviews } from "@/data/businesses";
import type { Review } from "@/data/businesses";

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = useCallback((review: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...review,
      id: `r${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews((prev) => [newReview, ...prev]);
  }, []);

  const getReviews = useCallback(
    (businessId: string) =>
      reviews
        .filter((r) => r.businessId === businessId)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [reviews]
  );

  return { reviews, addReview, getReviews };
};
