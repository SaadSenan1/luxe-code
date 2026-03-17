"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useTranslation } from "@/hooks/useTranslation";
import { formatPrice, calculateDiscount, cn } from "@/utils";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const { t } = useTranslation();
  const addItem = useCartStore((s) => s.addItem);
  const { isWishlisted, toggleItem } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, product.colors[0]);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    toast.success(
      wishlisted ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
    >
      <Link href={`/product/${product.slug}`}>
        <div
          className="group relative"
          onMouseEnter={() => {
            setHovered(true);
            if (product.images[1]) setImgIndex(1);
          }}
          onMouseLeave={() => {
            setHovered(false);
            setImgIndex(0);
          }}
        >
          {/* Image container */}
          <div className="relative overflow-hidden rounded-2xl bg-surface aspect-[4/5] mb-4">
            <motion.div
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="w-full h-full"
            >
              <Image
                src={product.images[imgIndex]}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
            </motion.div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.new && (
                <span className="px-2.5 py-1 bg-accent text-obsidian-900 text-[10px] font-medium tracking-widest uppercase rounded-full">
                  {t("common.new")}
                </span>
              )}
              {product.originalPrice && (
                <span className="px-2.5 py-1 bg-obsidian-900 dark:bg-white text-white dark:text-obsidian-900 text-[10px] font-medium tracking-widest uppercase rounded-full">
                  -{calculateDiscount(product.originalPrice, product.price)}%
                </span>
              )}
            </div>

            {/* Actions overlay */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 left-3 right-3 flex gap-2"
            >
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 glass rounded-full py-2.5 text-xs tracking-widest uppercase text-primary-color hover:text-accent transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={13} />
                {product.stock === 0 ? t("products.out_of_stock") : t("products.add_to_cart")}
              </button>
              <Link
                href={`/product/${product.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-primary-color hover:text-accent transition-colors"
              >
                <Eye size={14} />
              </Link>
            </motion.div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 w-8 h-8 glass rounded-full flex items-center justify-center transition-colors"
            >
              <Heart
                size={13}
                className={cn(
                  "transition-colors",
                  wishlisted ? "fill-accent text-accent" : "text-secondary-color hover:text-accent"
                )}
              />
            </button>
          </div>

          {/* Info */}
          <div className="px-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] tracking-widest uppercase text-tertiary-color">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-accent text-accent" />
                <span className="text-[11px] text-secondary-color">
                  {product.rating}
                </span>
              </div>
            </div>

            <h3 className="font-display text-lg font-light text-primary-color group-hover:text-accent transition-colors leading-snug">
              {product.name}
            </h3>

            <p className="text-xs text-tertiary-color mt-1 line-clamp-1">
              {product.shortDescription}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <span className="font-mono text-base text-primary-color">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-sm text-tertiary-color line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Color swatches */}
            <div className="flex gap-1.5 mt-3">
              {product.colors.map((color) => (
                <div
                  key={color.name}
                  title={color.name}
                  className="w-3.5 h-3.5 rounded-full border border-color"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
