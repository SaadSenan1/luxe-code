"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";
import { isRTL } from "@/utils";

export function useTheme() {
  const { theme, locale, toggleTheme, setTheme } = useUIStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", locale);
    root.setAttribute("dir", isRTL(locale) ? "rtl" : "ltr");
  }, [locale]);

  return { theme, toggleTheme, setTheme };
}
