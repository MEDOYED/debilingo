import { create } from "zustand";
import type { Cat, CatRarity, CatStats, SortOrder } from "./types";
import { deleteCat, getCats, getCatStats } from "./api";

interface CatCollectionStore {
  cats: Cat[];
  stats: CatStats | null;
  isLoading: boolean;
  searchQuery: string;
  selectedRarity: CatRarity | "all";
  sortOrder: SortOrder;
  selectedCat: Cat | null;
  isDetailsModalOpen: boolean;

  setSearchQuery: (query: string) => void;
  setSelectedRarity: (rarity: CatRarity | "all") => void;
  setSortOrder: (order: SortOrder) => void;
  setSelectedCat: (cat: Cat | null) => void;
  setIsDetailsModalOpen: (isOpen: boolean) => void;

  loadData: () => Promise<void>;
  removeCat: (id: string) => Promise<boolean>;
}

export const useCatCollectionStore = create<CatCollectionStore>((set) => ({
  cats: [],
  stats: null,
  isLoading: false,
  searchQuery: "",
  selectedRarity: "all",
  sortOrder: "newest",
  selectedCat: null,
  isDetailsModalOpen: false,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedRarity: (selectedRarity) => set({ selectedRarity }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSelectedCat: (selectedCat) => set({ selectedCat }),
  setIsDetailsModalOpen: (isDetailsModalOpen) => set({ isDetailsModalOpen }),

  loadData: async () => {
    set({ isLoading: true });
    try {
      const [catsData, statsData] = await Promise.all([
        getCats(),
        getCatStats().catch(() => null),
      ]);
      set({ cats: catsData, stats: statsData });
    } catch (err) {
      console.error("Failed to load cat collection:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  removeCat: async (id: string) => {
    try {
      const success = await deleteCat(id);
      if (success) {
        set((state) => ({
          cats: state.cats.filter((c) => c.id !== id),
          selectedCat: null,
          isDetailsModalOpen: false,
        }));
        // Reload stats
        getCatStats().then((stats) => set({ stats })).catch(() => {});
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to delete cat:", err);
      return false;
    }
  },
}));
