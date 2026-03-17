"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, CreditCard, MapPin, Lock } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "@/hooks/useTranslation";
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
}

const initialForm: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", city: "", state: "", zipCode: "", country: "US",
  cardNumber: "", cardExpiry: "", cardCvc: "", cardName: "",
};

function InputField({
  label, name, value, onChange, placeholder, type = "text", required = true,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs tracking-widest uppercase text-tertiary-color">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-surface border border-color rounded-xl px-4 py-3 text-sm text-primary-color placeholder:text-tertiary-color focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { items, subtotal, clearCart } = useCartStore();
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const sub = subtotal();
  const shipping = sub >= 200 ? 0 : sub > 0 ? 25 : 0;
  const tax = sub * 0.08;
  const total = sub + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSuccess(true);
    clearCart();
  };

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-3xl font-light mb-4">Your cart is empty</p>
          <Button variant="gold" onClick={() => router.push("/shop")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="text-center max-w-md mx-auto px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-accent" />
          </motion.div>
          <h1 className="font-display text-4xl font-light mb-4">
            {t("checkout.order_placed")}
          </h1>
          <p className="text-secondary-color mb-8">
            {t("checkout.order_placed_desc")}
          </p>
          <Button variant="gold" onClick={() => router.push("/shop")}>
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-accent" />
            <span className="text-xs tracking-[0.3em] uppercase text-accent">
              Final Step
            </span>
          </div>
          <h1 className="font-display text-5xl font-light">{t("checkout.title")}</h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left — Form */}
            <div className="lg:col-span-2 space-y-10">
              {/* Shipping */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface rounded-3xl border border-color p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin size={15} className="text-accent" />
                  </div>
                  <h2 className="font-display text-xl font-light">
                    {t("checkout.shipping_info")}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label={t("checkout.first_name")} name="firstName" value={form.firstName} onChange={handleChange} />
                  <InputField label={t("checkout.last_name")} name="lastName" value={form.lastName} onChange={handleChange} />
                  <InputField label={t("checkout.email")} name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                  <InputField label={t("checkout.phone")} name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                  <div className="sm:col-span-2">
                    <InputField label={t("checkout.address")} name="address" value={form.address} onChange={handleChange} placeholder="123 Main Street" />
                  </div>
                  <InputField label={t("checkout.city")} name="city" value={form.city} onChange={handleChange} />
                  <InputField label={t("checkout.state")} name="state" value={form.state} onChange={handleChange} />
                  <InputField label={t("checkout.zip")} name="zipCode" value={form.zipCode} onChange={handleChange} />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-widest uppercase text-tertiary-color">
                      {t("checkout.country")}
                    </label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="bg-raised border border-color rounded-xl px-4 py-3 text-sm text-primary-color focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AE">UAE</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Payment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface rounded-3xl border border-color p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <CreditCard size={15} className="text-accent" />
                  </div>
                  <h2 className="font-display text-xl font-light">
                    {t("checkout.payment_info")}
                  </h2>
                  <div className="ml-auto flex items-center gap-1 text-xs text-tertiary-color">
                    <Lock size={11} /> Secure
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <InputField
                      label={t("checkout.card_number")}
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <InputField label={t("checkout.card_expiry")} name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM / YY" />
                  <InputField label={t("checkout.card_cvc")} name="cardCvc" value={form.cardCvc} onChange={handleChange} placeholder="CVC" />
                  <div className="sm:col-span-2">
                    <InputField label={t("checkout.card_name")} name="cardName" value={form.cardName} onChange={handleChange} placeholder="Name as on card" />
                  </div>
                </div>
                <p className="text-xs text-tertiary-color mt-4">
                  This is a demo checkout. No real charges will be made.
                </p>
              </motion.div>
            </div>

            {/* Right — Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface rounded-3xl border border-color p-6 h-fit sticky top-28"
            >
              <h2 className="font-display text-xl font-light mb-5">
                {t("checkout.order_summary")}
              </h2>

              <div className="space-y-3 mb-5 max-h-56 overflow-y-auto no-scrollbar">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.name}`}
                    className="flex gap-3 items-center"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-raised flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.product.name}</p>
                      <p className="text-[10px] text-tertiary-color">
                        {item.selectedColor.name} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono text-xs flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-color pt-4 space-y-2">
                <div className="flex justify-between text-xs text-secondary-color">
                  <span>{t("cart.subtotal")}</span>
                  <span className="font-mono">{formatPrice(sub)}</span>
                </div>
                <div className="flex justify-between text-xs text-secondary-color">
                  <span>{t("cart.shipping")}</span>
                  <span className="font-mono">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-xs text-secondary-color">
                  <span>{t("cart.tax")}</span>
                  <span className="font-mono">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-medium text-base pt-2 border-t border-color">
                  <span>{t("cart.total")}</span>
                  <span className="font-mono text-accent">{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                loading={loading}
                className="w-full mt-5"
              >
                {t("checkout.place_order")} — {formatPrice(total)}
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
