import { create } from "zustand";

type Store = {
  isUpdateDescriptionModalOpen: boolean;

  closeUpdateDescriptionModal: () => void;
  openUpdateDescriptionModal: () => void;
};

export const useUpdateDescriptionModalStore = create<Store>((set) => ({
  isUpdateDescriptionModalOpen: false,

  closeUpdateDescriptionModal: () => {
    set({
      isUpdateDescriptionModalOpen: false,
    });
  },

  openUpdateDescriptionModal: () => {
    set({
      isUpdateDescriptionModalOpen: true,
    });
  },
}));
