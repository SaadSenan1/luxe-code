"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "@/hooks/useTranslation";
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCartStore();
  const { t } = useTranslation();
  const sub = subtotal();
  const shipping = sub >= 200 ? 0 : 25;
  const tax = sub * 0.08;
  const total = sub + shipping + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-page border-l border-color flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-color">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-accent" />
                <h2 className="font-display text-xl font-light tracking-wide">
                  {t("cart.title")}
                </h2>
                <span className="text-xs text-tertiary-color">
                  ({items.length}{" "}
                  {items.length === 1 ? t("cart.item") : t("cart.items")})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-raised text-secondary-color hover:text-primary-color transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center">
                    <ShoppingBag size={32} className="text-tertiary-color" />
                  </div>
                  <p className="font-display text-2xl font-light">
                    {t("cart.empty")}
                  </p>
                  <p className="text-sm text-secondary-color">
                    {t("cart.empty_desc")}
                  </p>
                  <Button
                    variant="outline"
                    onClick={closeCart}
                    className="mt-2"
                  >
                    {t("cart.continue_shopping")}
                  </Button>
                </div>
              ) : (
                <ul className="space-y-1 px-4">
                  {items.map((item, i) => (
                    <motion.li
                      key={`${item.product.id}-${item.selectedColor.name}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 p-4 rounded-2xl hover:bg-surface transition-colors"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-primary-color truncate">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className="w-3 h-3 rounded-full border border-color"
                            style={{
                              backgroundColor: item.selectedColor.hex,
                            }}
                          />
                          <span className="text-xs text-tertiary-color">
                            {item.selectedColor.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 bg-raised rounded-full px-2 py-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.name,
                                  item.quantity - 1
                                )
                              }
                              className="w-5 h-5 flex items-center justify-center text-secondary-color hover:text-primary-color"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="text-xs font-medium w-4 text-center">
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
                              className="w-5 h-5 flex items-center justify-center text-secondary-color hover:text-primary-color"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <span className="font-mono text-sm">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.selectedColor.name)
                        }
                        className="p-1.5 text-tertiary-color hover:text-red-400 transition-colors self-start"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-color px-6 py-5 space-y-4">
                {sub < 200 && (
                  <p className="text-xs text-center text-tertiary-color">
                    {t("cart.free_shipping_note")}
                  </p>
                )}
                <div className="space-y-2">
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
                    <span>{t("cart.tax")}</span>
                    <span className="font-mono">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-color">
                    <span>{t("cart.total")}</span>
                    <span className="font-mono text-accent">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
                <Link href="/checkout" onClick={closeCart}>
                  <Button variant="gold" size="lg" className="w-full">
                    {t("cart.checkout")}
                  </Button>
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-xs text-tertiary-color hover:text-secondary-color transition-colors"
                >
                  {t("cart.continue_shopping")}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
