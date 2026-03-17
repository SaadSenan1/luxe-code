"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    { Icon: MapPin, label: t("contact.address_label"), value: "28 Mayfair Row, London W1K 5LH" },
    { Icon: Phone, label: t("contact.phone_label"), value: "+44 20 7946 0958" },
    { Icon: Mail, label: t("contact.email_label"), value: "hello@luxe.com" },
    { Icon: Clock, label: t("contact.hours_label"), value: "Mon–Fri 9am–6pm GMT" },
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-accent" />
            <span className="text-xs tracking-[0.3em] uppercase text-accent">Contact</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-secondary-color">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-start gap-4 py-12"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <CheckCircle size={28} className="text-accent" />
                  </div>
                  <h2 className="font-display text-3xl font-light">{t("contact.success")}</h2>
                  <p className="text-secondary-color">{t("contact.success_desc")}</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 text-sm text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-widest uppercase text-tertiary-color">
                        {t("contact.name")}
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="bg-surface border border-color rounded-xl px-4 py-3 text-sm text-primary-color placeholder:text-tertiary-color focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-widest uppercase text-tertiary-color">
                        {t("contact.email")}
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="bg-surface border border-color rounded-xl px-4 py-3 text-sm text-primary-color placeholder:text-tertiary-color focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-widest uppercase text-tertiary-color">
                      {t("contact.subject")}
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="bg-surface border border-color rounded-xl px-4 py-3 text-sm text-primary-color placeholder:text-tertiary-color focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-widest uppercase text-tertiary-color">
                      {t("contact.message")}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us more..."
                      className="bg-surface border border-color rounded-xl px-4 py-3 text-sm text-primary-color placeholder:text-tertiary-color focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    loading={loading}
                    icon={<Send size={15} />}
                    iconPosition="right"
                    className="w-full"
                  >
                    {t("contact.send")}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6">
              {contactInfo.map(({ Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-color hover:border-accent transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-tertiary-color mb-1">
                      {label}
                    </p>
                    <p className="text-sm text-primary-color">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 h-48 rounded-2xl border border-color overflow-hidden bg-surface flex items-center justify-center relative"
            >
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, var(--border) 0px, transparent 1px, transparent 40px, var(--border) 40px),
                    repeating-linear-gradient(90deg, var(--border) 0px, transparent 1px, transparent 40px, var(--border) 40px)`,
                }}
              />
              <div className="text-center relative z-10">
                <MapPin size={28} className="text-accent mx-auto mb-2" />
                <p className="text-xs text-secondary-color">28 Mayfair Row, London</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
