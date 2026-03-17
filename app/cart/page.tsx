"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "@/hooks/useTranslation";
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } =
    useCartStore();
  const { t } = useTranslation();
  const sub = subtotal();
  const shipping = sub >= 200 ? 0 : sub > 0 ? 25 : 0;
  const tax = sub * 0.08;
  const total = sub + shipping + tax;

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-accent" />
                <span className="text-xs tracking-[0.3em] uppercase text-accent">
                  Your Selection
                </span>
              </div>
              <h1 className="font-display text-5xl font-light">{t("cart.title")}</h1>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-tertiary-color hover:text-red-400 transition-colors tracking-widest uppercase"
              >
                Clear All
              </button>
            )}
          </div>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center mb-6">
              <ShoppingBag size={36} className="text-tertiary-color" />
            </div>
            <h2 className="font-display text-3xl font-light mb-3">
              {t("cart.empty")}
            </h2>
            <p className="text-secondary-color mb-8">{t("cart.empty_desc")}</p>
            <Link href="/shop">
              <Button variant="gold" icon={<ArrowRight size={16} />} iconPosition="right">
                {t("cart.continue_shopping")}
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2">
              <ul className="space-y-4">
                <AnimatePresence>
                  {items.map((item, i) => (
                    <motion.li
                      key={`${item.product.id}-${item.selectedColor.name}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-5 p-5 bg-surface rounded-2xl border border-color"
                    >
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="relative w-28 h-28 rounded-xl overflow-hidden bg-raised flex-shrink-0"
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="font-medium hover:text-accent transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <div
                                className="w-3 h-3 rounded-full border border-color"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              <span className="text-xs text-tertiary-color">
                                {item.selectedColor.name}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.product.id, item.selectedColor.name)
                            }
                            className="text-tertiary-color hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-raised rounded-full border border-color px-3 py-1.5">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.name,
                                  item.quantity - 1
                                )
                              }
                              className="text-secondary-color hover:text-primary-color transition-colors"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="font-mono text-sm w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.name,
                                  item.quantity + 1
                                )
                              }
                              className="text-secondary-color hover:text-primary-color transition-colors"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="font-mono text-lg">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              <div className="mt-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm text-tertiary-color hover:text-accent transition-colors"
                >
                  ← {t("cart.continue_shopping")}
                </Link>
              </div>
            </div>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface rounded-3xl border border-color p-6 h-fit"
            >
              <h2 className="font-display text-2xl font-light mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-secondary-color">
                  <span>{t("cart.subtotal")}</span>
                  <span className="font-mono">{formatPrice(sub)}</span>
                </div>
                <div className="flex justify-between text-sm text-secondary-color">
                  <span>{t("cart.shipping")}</span>
                  <span className="font-mono">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-secondary-color">
                  <span>{t("cart.tax")} (8%)</span>
                  <span className="font-mono">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-color pt-3 flex justify-between font-medium text-lg">
                  <span>{t("cart.total")}</span>
                  <span className="font-mono text-accent">{formatPrice(total)}</span>
                </div>
              </div>

              {sub < 200 && sub > 0 && (
                <p className="text-xs text-center text-tertiary-color mb-4 px-2">
                  Add {formatPrice(200 - sub)} more for free shipping
                </p>
              )}

              <Link href="/checkout">
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  {t("cart.checkout")}
                </Button>
              </Link>

              {/* Accepted payments */}
              <div className="mt-6 text-center">
                <p className="text-[10px] tracking-widest uppercase text-tertiary-color mb-3">
                  Secure Payment
                </p>
                <div className="flex justify-center gap-2">
                  {["VISA", "MC", "AMEX", "PayPal"].map((p) => (
                    <span
                      key={p}
                      className="px-2 py-1 text-[9px] border border-color rounded text-tertiary-color"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
