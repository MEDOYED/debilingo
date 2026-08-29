import { useMemo } from "react";
import { useCatCollectionStore } from "../model/use-cat-collection-store";
import type { CatRarity } from "../model/types";

const RARITY_WEIGHTS: Record<CatRarity, number> = {
  Legendary: 4,
  Epic: 3,
  Rare: 2,
  Common: 1,
};

export const useCatCollection = () => {
  const {
    cats,
    searchQuery,
    selectedRarity,
    sortOrder,
    isLoading,
    stats,
    loadData,
  } = useCatCollectionStore();

  const filteredCats = useMemo(() => {
    return cats
      .filter((cat) => {
        // Search filter (name, breed, location_name, notes)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = cat.name.toLowerCase().includes(q);
          const matchBreed = cat.breed?.toLowerCase().includes(q);
          const matchLocation = cat.location_name?.toLowerCase().includes(q);
          const matchNotes = cat.notes?.toLowerCase().includes(q);

          if (!matchName && !matchBreed && !matchLocation && !matchNotes) {
            return false;
          }
        }

        // Rarity filter
        if (selectedRarity !== "all") {
          if ((cat.rarity || "Common") !== selectedRarity) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "newest") {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortOrder === "oldest") {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        if (sortOrder === "rarity") {
          const weightA = RARITY_WEIGHTS[a.rarity || "Common"] || 1;
          const weightB = RARITY_WEIGHTS[b.rarity || "Common"] || 1;
          return weightB - weightA;
        }
        if (sortOrder === "name") {
          return a.name.localeCompare(b.name, "uk");
        }
        return 0;
      });
  }, [cats, searchQuery, selectedRarity, sortOrder]);

  return {
    cats: filteredCats,
    totalCount: cats.length,
    isLoading,
    stats,
    loadData,
  };
};
