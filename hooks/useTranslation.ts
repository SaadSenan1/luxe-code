"use client";

import { useCallback } from "react";
import { useUIStore } from "@/store/uiStore";
import en from "@/locales/en/common.json";
import ar from "@/locales/ar/common.json";

type TranslationKeys = typeof en;

const translations: Record<string, TranslationKeys> = { en, ar };

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : path;
}

export function useTranslation() {
  const locale = useUIStore((state) => state.locale);
  const messages = translations[locale] || translations.en;

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let text = getNestedValue(messages as unknown as Record<string, unknown>, key);
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{{${k}}}`, String(v));
        });
      }
      return text;
    },
    [messages]
  );

  return { t, locale };
}
