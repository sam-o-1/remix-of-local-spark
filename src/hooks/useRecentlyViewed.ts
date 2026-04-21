import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "lbpp_recently_viewed";
const MAX_ITEMS = 6;

const getStored = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

export const useRecentlyViewed = () => {
  const [recent, setRecent] = useState<string[]>(getStored);

  const addRecent = useCallback((id: string) => {
    setRecent((prev) => {
      const next = [id, ...prev.filter((p) => p !== id)].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  useEffect(() => {
    const handler = () => setRecent(getStored());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { recent, addRecent };
};
