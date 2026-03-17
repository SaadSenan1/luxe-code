"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { useTranslation } from "@/hooks/useTranslation";
import { FilterState, ProductCategory, SortOption } from "@/types";
import { cn } from "@/utils";

const CATEGORIES: { value: FilterState["category"]; label: string }[] = [
  { value: "all", label: "filter.all" },
  { value: "watches", label: "filter.watches" },
  { value: "audio", label: "filter.audio" },
  { value: "tech", label: "filter.tech" },
  { value: "lifestyle", label: "filter.lifestyle" },
  { value: "accessories", label: "filter.accessories" },
];

const SORTS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "filter.featured" },
  { value: "newest", label: "filter.newest" },
  { value: "price-asc", label: "filter.price_low_high" },
  { value: "price-desc", label: "filter.price_high_low" },
  { value: "rating", label: "filter.top_rated" },
];

export function ShopPageClient() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: [0, 10000],
    sortBy: "featured",
    searchQuery: "",
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (filters.sortBy) {
      case "newest":
        result = result.filter((p) => p.new).concat(result.filter((p) => !p.new));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
        result = result.filter((p) => p.featured).concat(result.filter((p) => !p.featured));
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-accent" />
            <span className="text-xs tracking-[0.3em] uppercase text-accent">
              Collection
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light mb-2">
            {t("products.all_products")}
          </h1>
          <p className="text-secondary-color">
            {filtered.length} products
          </p>
        </motion.div>

        {/* Search & Filters bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mt-10"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary-color"
            />
            <input
              type="text"
              placeholder={t("filter.search")}
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters((f) => ({ ...f, searchQuery: e.target.value }))
              }
              className="w-full bg-surface border border-color rounded-full pl-10 pr-4 py-3 text-sm text-primary-color placeholder:text-tertiary-color focus:outline-none focus:border-accent transition-colors"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters((f) => ({ ...f, searchQuery: "" }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary-color hover:text-primary-color"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((f) => ({ ...f, sortBy: e.target.value as SortOption }))
            }
            className="bg-surface border border-color rounded-full px-5 py-3 text-sm text-primary-color focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {t(s.label)}
              </option>
            ))}
          </select>

          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn(
              "flex items-center gap-2 border rounded-full px-5 py-3 text-sm transition-colors",
              filtersOpen
                ? "bg-accent text-obsidian-900 border-accent"
                : "bg-surface border-color text-primary-color hover:border-accent hover:text-accent"
            )}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mt-6 flex-wrap"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilters((f) => ({ ...f, category: cat.value }))}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all border",
                filters.category === cat.value
                  ? "bg-accent text-obsidian-900 border-accent"
                  : "bg-transparent border-color text-secondary-color hover:border-accent hover:text-accent"
              )}
            >
              {t(cat.label)}
            </button>
          ))}
        </motion.div>

        {/* Price filter */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 pb-2">
                <label className="text-xs tracking-widest uppercase text-tertiary-color block mb-3">
                  {t("filter.price_range")}: $0 — ${filters.priceRange[1].toLocaleString()}
                </label>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      priceRange: [0, Number(e.target.value)],
                    }))
                  }
                  className="w-64 accent-accent"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-secondary-color">
            <p className="font-display text-3xl font-light mb-3">
              No products found
            </p>
            <button
              onClick={() =>
                setFilters({
                  category: "all",
                  priceRange: [0, 10000],
                  sortBy: "featured",
                  searchQuery: "",
                })
              }
              className="text-sm text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
