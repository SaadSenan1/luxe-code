"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNewProducts } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { useTranslation } from "@/hooks/useTranslation";

export function NewArrivalsSection() {
  const { t } = useTranslation();
  const products = getNewProducts();

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-6 h-px bg-accent" />
            <span className="text-xs tracking-[0.3em] uppercase text-accent">
              Just In
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-light"
          >
            {t("products.new_arrivals")}
          </motion.h2>
        </div>

        <Link
          href="/shop?sort=newest"
          className="flex items-center gap-2 text-sm tracking-widest uppercase text-secondary-color hover:text-accent transition-colors group"
        >
          {t("products.all_products")}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
