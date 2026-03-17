import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Locale } from "@/types";

interface UIStore {
  locale: Locale;
  theme: "dark" | "light";
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
  setTheme: (theme: "dark" | "light") => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      locale: "en",
      theme: "dark",

      setLocale: (locale) => set({ locale }),

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "luxe-ui",
    }
  )
);
