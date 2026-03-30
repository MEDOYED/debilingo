import { create } from "zustand";

type Store = {
  isOpenNavModal: boolean;

  toggleIsOpenNavModal: () => void;
  closeNavModal: () => void;
  openNavModal: () => void;
};

export const useModalNavigationStore = create<Store>((set) => ({
  isOpenNavModal: false,

  toggleIsOpenNavModal: () => {
    set((prev) => ({
      isOpenNavModal: !prev.isOpenNavModal,
    }));
  },

  closeNavModal: () => {
    set(() => ({
      isOpenNavModal: false,
    }));
  },

  openNavModal: () => {
    set(() => ({
      isOpenNavModal: true,
    }));
  },
}));
