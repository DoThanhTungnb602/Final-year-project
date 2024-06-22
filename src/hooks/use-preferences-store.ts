import { create } from "zustand";
import { Theme } from "~/lib/types";

interface UserPreferencesStore {
  theme: Theme;
  toggleTheme: () => void;
}

export const useUserPreferencesStore = create<UserPreferencesStore>((set) => ({
  theme: "dark",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
}));
