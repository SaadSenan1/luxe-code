"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import { useTranslation } from "@/hooks/useTranslation";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { t } = useTranslation();
  const items = useWishlistStore((s) => s.items);

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-accent" />
            <span className="text-xs tracking-[0.3em] uppercase text-accent">Saved</span>
          </div>
          <h1 className="font-display text-5xl font-light">{t("nav.wishlist")}</h1>
          <p className="text-secondary-color mt-2">{items.length} items saved</p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center mb-6">
              <Heart size={36} className="text-tertiary-color" />
            </div>
            <h2 className="font-display text-3xl font-light mb-3">
              Nothing saved yet
            </h2>
            <p className="text-secondary-color mb-8">
              Start exploring and save what catches your eye.
            </p>
            <Link href="/shop">
              <Button variant="gold">Explore Collection</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
