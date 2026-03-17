"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme, locale } = useUIStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.setAttribute("lang", locale);
    root.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
  }, [theme, locale]);

  return <>{children}</>;
}
