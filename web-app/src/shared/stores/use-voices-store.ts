import { create } from "zustand";

type VoicesStore = {
  voices: SpeechSynthesisVoice[];

  setVoices: (newVoices: SpeechSynthesisVoice[]) => void;
};

export const useVoicesStore = create<VoicesStore>((set) => ({
  voices: [],

  setVoices: (newVoices) => {
    set({
      voices: newVoices,
    });
  },
}));
