import { create } from "zustand";

const isDev = import.meta.env.DEV;

type ToastStore = {
  errorMessages: string[] | null;
  addErrorMessage: (newErrorMessage: string) => void;
  deleteErrorMessage: (errorMessage: string) => void;

  successMessages: string[] | null;
  addSuccessMessage: (newSuccessMessage: string) => void;
  deleteSuccessMessage: (successMessage: string) => void;

  addDevSuccessMessage: (successMessage: string) => void;
  addDevErrorMessage: (errorMessage: string) => void;
};

export const useToastStore = create<ToastStore>((set, get) => ({
  errorMessages: null,

  addErrorMessage: newErrorMessage => {
    set({
      errorMessages: [
        newErrorMessage,
        ...(get().errorMessages ?? []),
      ],
    });
  },

  deleteErrorMessage: errorMessage => {
    const currentErrorMessages = get().errorMessages;
    if (currentErrorMessages === null) return;

    set({
      errorMessages: currentErrorMessages.filter(
        errMessage => errMessage !== errorMessage,
      ),
    });
  },

  // ===========================================

  successMessages: null,

  addSuccessMessage: newSuccessMessage => {
    set({
      successMessages: [
        newSuccessMessage,
        ...(get().successMessages ?? []),
      ],
    });
  },

  deleteSuccessMessage: successMessage => {
    const currentSuccessMessages = get().successMessages;

    if (currentSuccessMessages === null) return;

    set({
      successMessages: currentSuccessMessages.filter(
        item => item !== successMessage,
      ),
    });
  },

  //  dev messages

  addDevSuccessMessage: successMessage => {
    if (!isDev || !successMessage) return;
    set({
      successMessages: [
        `[DEV] ${successMessage}`,
        ...(get().successMessages ?? []),
      ],
    });
  },

  addDevErrorMessage: errorMessage => {
    if (!isDev || !errorMessage) return;
    set({
      errorMessages: [
        `[DEV] ${errorMessage}`,
        ...(get().errorMessages ?? []),
      ],
    });
  },
}));
