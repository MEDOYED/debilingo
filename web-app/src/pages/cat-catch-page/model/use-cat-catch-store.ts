import { create } from "zustand";
import type { CatRarity, CatchStep, CreateCatPayload, GeoLocationState } from "./types";
import { createCatCatch } from "./api";

const RANDOM_NAMES = [
  "Мурчик",
  "Сніжок",
  "Барсик",
  "Рижик",
  "Барон",
  "Люцифер",
  "Оскар",
  "Матроскін",
  "Пушистик",
  "Лео",
  "Тайсон",
  "Сімба",
];

const getRandomName = () => {
  const index = Math.floor(Math.random() * RANDOM_NAMES.length);
  return RANDOM_NAMES[index];
};

const getRandomRarity = (): CatRarity => {
  const rand = Math.random();
  if (rand < 0.6) return "Common";
  if (rand < 0.85) return "Rare";
  if (rand < 0.96) return "Epic";
  return "Legendary";
};

interface CatCatchStore {
  step: CatchStep;
  photoUrl: string | null;
  name: string;
  breed: string;
  rarity: CatRarity;
  notes: string;
  locationName: string;
  location: GeoLocationState;
  isSubmitting: boolean;
  submitError: string | null;
  createdCatId: string | null;

  setStep: (step: CatchStep) => void;
  setPhotoUrl: (photoUrl: string | null) => void;
  setName: (name: string) => void;
  setBreed: (breed: string) => void;
  setRarity: (rarity: CatRarity) => void;
  setNotes: (notes: string) => void;
  setLocationName: (name: string) => void;
  setLocation: (loc: Partial<GeoLocationState>) => void;
  initCaptureWithPhoto: (photoDataUrl: string) => void;
  resetCatch: () => void;
  saveCatch: () => Promise<boolean>;
}

export const useCatCatchStore = create<CatCatchStore>((set, get) => ({
  step: "camera",
  photoUrl: null,
  name: "",
  breed: "",
  rarity: "Common",
  notes: "",
  locationName: "",
  location: {
    lat: null,
    lng: null,
    accuracy: null,
    error: null,
    isFetching: false,
  },
  isSubmitting: false,
  submitError: null,
  createdCatId: null,

  setStep: (step) => set({ step }),
  setPhotoUrl: (photoUrl) => set({ photoUrl }),
  setName: (name) => set({ name }),
  setBreed: (breed) => set({ breed }),
  setRarity: (rarity) => set({ rarity }),
  setNotes: (notes) => set({ notes }),
  setLocationName: (locationName) => set({ locationName }),
  setLocation: (loc) =>
    set((state) => ({ location: { ...state.location, ...loc } })),

  initCaptureWithPhoto: (photoDataUrl: string) => {
    set({
      photoUrl: photoDataUrl,
      step: "preview",
      name: getRandomName(),
      rarity: getRandomRarity(),
      submitError: null,
    });
  },

  resetCatch: () => {
    set({
      step: "camera",
      photoUrl: null,
      name: "",
      breed: "",
      rarity: "Common",
      notes: "",
      locationName: "",
      submitError: null,
      createdCatId: null,
    });
  },

  saveCatch: async () => {
    const { photoUrl, name, breed, rarity, notes, location, locationName } = get();

    if (!photoUrl) {
      set({ submitError: "Фото котика обов'язкове!" });
      return false;
    }

    if (!name.trim()) {
      set({ submitError: "Будь ласка, введіть ім'я котика" });
      return false;
    }

    // Default fallback coordinates if user denied geolocation (e.g. Center of Kyiv)
    const lat = location.lat !== null ? location.lat : 50.4501;
    const lng = location.lng !== null ? location.lng : 30.5234;

    const payload: CreateCatPayload = {
      name: name.trim(),
      image_url: photoUrl,
      latitude: lat,
      longitude: lng,
      location_name: locationName.trim() || undefined,
      breed: breed.trim() || undefined,
      rarity: rarity,
      notes: notes.trim() || undefined,
    };

    set({ isSubmitting: true, submitError: null });

    try {
      const saved = await createCatCatch(payload);
      set({
        isSubmitting: false,
        step: "success",
        createdCatId: saved?.id || null,
      });
      return true;
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string; details?: string } };
        message?: string;
      };
      console.error("Failed to save cat:", err);
      const msg =
        error.response?.data?.details ||
        error.response?.data?.error ||
        error.message ||
        "Помилка при збереженні котика";
      set({
        isSubmitting: false,
        submitError: msg,
      });
      return false;
    }
  },
}));
