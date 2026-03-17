"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function BrandStory() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 bg-surface"
    >
      {/* Background text */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="font-display text-[20vw] font-bold opacity-[0.025] text-primary-color whitespace-nowrap"
          aria-hidden
        >
          LUXE
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-accent" />
              <span className="text-xs tracking-[0.3em] uppercase text-accent">
                Our Philosophy
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8">
              Design is not{" "}
              <em className="text-accent not-italic">decoration</em>.
              <br />
              It is intention.
            </h2>
            <p className="text-secondary-color leading-relaxed mb-6 max-w-md">
              {t("about.story")}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-accent hover:gap-4 transition-all group"
            >
              {t("about.title")}
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Right column — visual grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: t("about.craftsmanship"), value: "VI", desc: t("about.craftsmanship_desc") },
              { label: t("about.innovation"), value: "II", desc: t("about.innovation_desc") },
              { label: t("about.sustainability"), value: "III", desc: t("about.sustainability_desc") },
              { label: "Excellence", value: "IV", desc: "We accept nothing less than the extraordinary in every facet of what we do." },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-raised rounded-2xl p-6 border border-color"
              >
                <div className="font-display text-4xl text-accent mb-3 font-light">
                  {item.value}
                </div>
                <h3 className="text-sm font-medium tracking-widest uppercase text-primary-color mb-2">
                  {item.label}
                </h3>
                <p className="text-xs text-secondary-color leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
