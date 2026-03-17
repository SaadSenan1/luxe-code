"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils";
import { FilterState, SortOption } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const CATEGORIES = [
  { value: "all" as const, label: "filter.all" },
  { value: "watches" as const, label: "filter.watches" },
  { value: "audio" as const, label: "filter.audio" },
  { value: "tech" as const, label: "filter.tech" },
  { value: "lifestyle" as const, label: "filter.lifestyle" },
  { value: "accessories" as const, label: "filter.accessories" },
];

export function ProductFilters({ filters, onChange }: ProductFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs tracking-widest uppercase text-tertiary-color mb-3">
          {t("filter.category")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onChange({ ...filters, category: cat.value })}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs tracking-widest uppercase border transition-all",
                filters.category === cat.value
                  ? "bg-accent text-obsidian-900 border-accent"
                  : "border-color text-secondary-color hover:border-accent hover:text-accent"
              )}
            >
              {t(cat.label)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
