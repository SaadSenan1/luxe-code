"use client";

import { useState, lazy, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useTranslation } from "@/hooks/useTranslation";
import { formatPrice, calculateDiscount, cn } from "@/utils";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { getRelatedProducts } from "@/lib/products";
import toast from "react-hot-toast";

const ProductViewer = lazy(() =>
  import("@/components/3d/ProductViewer").then((m) => ({
    default: m.ProductViewer,
  }))
);

interface Props {
  product: Product;
}

export function ProductDetailClient({ product }: Props) {
  const { t } = useTranslation();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "specs">(
    "description"
  );
  const [show3D, setShow3D] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { isWishlisted, toggleItem } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);
  const related = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    addItem(product, selectedColor, quantity);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-xs text-tertiary-color mb-10"
        >
          <a href="/" className="hover:text-accent transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/shop" className="hover:text-accent transition-colors">
            Shop
          </a>
          <span>/</span>
          <span className="text-primary-color">{product.name}</span>
        </motion.nav>

        {/* Main product section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Images / 3D */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Toggle */}
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setShow3D(false)}
                className={cn(
                  "text-xs tracking-widest uppercase transition-colors",
                  !show3D ? "text-accent" : "text-tertiary-color hover:text-secondary-color"
                )}
              >
                Photos
              </button>
              <div className="w-px h-3 bg-border" />
              <button
                onClick={() => setShow3D(true)}
                className={cn(
                  "text-xs tracking-widest uppercase transition-colors",
                  show3D ? "text-accent" : "text-tertiary-color hover:text-secondary-color"
                )}
              >
                3D View
              </button>
            </div>

            <AnimatePresence mode="wait">
              {show3D ? (
                <motion.div
                  key="3d"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl overflow-hidden bg-surface border border-color"
                >
                  <Suspense
                    fallback={
                      <div className="h-[450px] flex items-center justify-center text-tertiary-color text-sm">
                        Loading 3D...
                      </div>
                    }
                  >
                    <ProductViewer color={selectedColor.hex} size="md" />
                  </Suspense>
                </motion.div>
              ) : (
                <motion.div
                  key="photos"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Main image */}
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface mb-3">
                    <Image
                      src={product.images[activeImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {product.new && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-obsidian-900 text-[10px] font-medium tracking-widest uppercase rounded-full">
                        {t("common.new")}
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-obsidian-900 text-white text-[10px] font-medium tracking-widest uppercase rounded-full">
                        -{calculateDiscount(product.originalPrice, product.price)}%
                      </div>
                    )}

                    {/* Nav arrows */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setActiveImage((i) =>
                              i === 0 ? product.images.length - 1 : i - 1
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 glass rounded-full flex items-center justify-center hover:text-accent transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() =>
                            setActiveImage((i) =>
                              i === product.images.length - 1 ? 0 : i + 1
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 glass rounded-full flex items-center justify-center hover:text-accent transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={cn(
                          "relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors flex-shrink-0",
                          activeImage === i
                            ? "border-accent"
                            : "border-transparent"
                        )}
                      >
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col"
          >
            {/* Category & rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs tracking-widest uppercase text-accent">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-border"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-secondary-color">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-light leading-tight mb-4">
              {product.name}
            </h1>

            <p className="text-secondary-color leading-relaxed mb-8">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-3xl text-primary-color">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-lg text-tertiary-color line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Color */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs tracking-widest uppercase text-secondary-color">
                  {t("products.select_color")}
                </span>
                <span className="text-sm text-accent">{selectedColor.name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    title={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      selectedColor.name === color.name
                        ? "border-accent scale-110"
                        : "border-transparent hover:scale-105"
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-xs tracking-widest uppercase text-secondary-color block mb-3">
                {t("products.quantity")}
              </span>
              <div className="flex items-center gap-4 bg-surface rounded-full border border-color w-fit px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-secondary-color hover:text-primary-color transition-colors"
                >
                  −
                </button>
                <span className="font-mono text-sm w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="w-8 h-8 flex items-center justify-center text-secondary-color hover:text-primary-color transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-tertiary-color mt-2">
                {product.stock} in stock
              </p>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-8">
              <Button
                variant="gold"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                icon={<ShoppingBag size={16} />}
                className="flex-1"
              >
                {product.stock === 0
                  ? t("products.out_of_stock")
                  : t("products.add_to_cart")}
              </Button>
              <button
                onClick={() => {
                  toggleItem(product);
                  toast.success(
                    wishlisted ? "Removed from wishlist" : "Added to wishlist"
                  );
                }}
                className={cn(
                  "w-12 h-12 rounded-full border flex items-center justify-center transition-colors",
                  wishlisted
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-color text-secondary-color hover:border-accent hover:text-accent"
                )}
              >
                <Heart
                  size={18}
                  className={wishlisted ? "fill-accent" : ""}
                />
              </button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-color">
              {[
                { Icon: Truck, label: "Free shipping on orders $200+" },
                { Icon: Shield, label: "5-year warranty included" },
                { Icon: RotateCcw, label: "30-day returns" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon size={18} className="text-accent" />
                  <span className="text-[10px] text-tertiary-color leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-24">
          <div className="flex gap-8 border-b border-color mb-8">
            {(["description", "specs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-4 text-sm tracking-widest uppercase transition-colors border-b-2 -mb-px",
                  activeTab === tab
                    ? "border-accent text-accent"
                    : "border-transparent text-tertiary-color hover:text-secondary-color"
                )}
              >
                {tab === "description"
                  ? t("products.description")
                  : t("products.specifications")}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "description" ? (
              <motion.div
                key="desc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl text-secondary-color leading-relaxed"
              >
                {product.description}
              </motion.div>
            ) : (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl"
              >
                <dl className="divide-y divide-border">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-3 text-sm"
                    >
                      <dt className="text-tertiary-color">{key}</dt>
                      <dd className="text-primary-color font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-3xl font-light mb-10">
              {t("products.related_products")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
