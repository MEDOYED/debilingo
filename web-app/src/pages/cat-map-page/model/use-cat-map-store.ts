import { create } from "zustand";
import type { Cat, UserLocation } from "./types";
import { getCats } from "./api";

interface CatMapStore {
  cats: Cat[];
  isLoading: boolean;
  selectedCat: Cat | null;
  userLocation: UserLocation | null;
  mapCenter: [number, number];
  zoom: number;
  isDetailsModalOpen: boolean;

  setCats: (cats: Cat[]) => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedCat: (cat: Cat | null) => void;
  setUserLocation: (loc: UserLocation | null) => void;
  setMapCenter: (center: [number, number], zoom?: number) => void;
  setIsDetailsModalOpen: (isOpen: boolean) => void;
  loadCats: () => Promise<void>;
  focusCat: (cat: Cat) => void;
}

// Default center: Kyiv, Ukraine
const DEFAULT_CENTER: [number, number] = [50.4501, 30.5234];

export const useCatMapStore = create<CatMapStore>((set, get) => ({
  cats: [],
  isLoading: false,
  selectedCat: null,
  userLocation: null,
  mapCenter: DEFAULT_CENTER,
  zoom: 13,
  isDetailsModalOpen: false,

  setCats: (cats) => set({ cats }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSelectedCat: (selectedCat) => set({ selectedCat }),
  setUserLocation: (userLocation) => {
    set({ userLocation });
    // If no cats yet and center is default, center to user location
    if (get().cats.length === 0 && userLocation) {
      set({ mapCenter: [userLocation.lat, userLocation.lng], zoom: 14 });
    }
  },
  setMapCenter: (mapCenter, zoom) =>
    set((state) => ({ mapCenter, zoom: zoom ?? state.zoom })),
  setIsDetailsModalOpen: (isDetailsModalOpen) => set({ isDetailsModalOpen }),

  loadCats: async () => {
    set({ isLoading: true });
    try {
      const data = await getCats();
      set({ cats: data });
      if (data.length > 0) {
        // Center on the most recently caught cat
        set({ mapCenter: [data[0].latitude, data[0].longitude], zoom: 14 });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  focusCat: (cat: Cat) => {
    set({
      selectedCat: cat,
      mapCenter: [cat.latitude, cat.longitude],
      zoom: 16,
      isDetailsModalOpen: true,
    });
  },
}));
