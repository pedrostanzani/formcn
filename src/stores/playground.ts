import { create } from "zustand";

interface PlaygroundState {
  currentTab: "form" | "code";
  setCurrentTab: (currentTab: "form" | "code") => void;
}

export const usePlaygroundStore = create<PlaygroundState>()((set) => ({
  currentTab: "form",
  setCurrentTab: (currentTab) => set({ currentTab }),
}));
