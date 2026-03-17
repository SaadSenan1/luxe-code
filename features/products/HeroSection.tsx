"use client";

import { useRef, Suspense, lazy } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/hooks/useTranslation";

const HeroScene = lazy(() =>
  import("@/components/3d/HeroScene").then((m) => ({ default: m.HeroScene }))
);

export function HeroSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.5 + i * 0.12, duration: 0.9, ease: [0.19, 1, 0.22, 1] },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/60 via-transparent to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
              {t("hero.tagline")}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl mb-8">
            {"Crafted for Those Who Demand the Exceptional"
              .split(" ")
              .map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className="inline-block mr-[0.25em]"
                  style={{
                    color:
                      word === "Exceptional"
                        ? "var(--accent)"
                        : "var(--text-primary)",
                  }}
                >
                  {word}
                </motion.span>
              ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-base md:text-lg text-secondary-color max-w-md leading-relaxed mb-10"
          >
            {t("hero.subheadline")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/shop">
              <Button
                variant="gold"
                size="lg"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                {t("hero.cta_primary")}
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                {t("hero.cta_secondary")}
              </Button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex gap-12 mt-20"
          >
            {[
              { value: "10K+", label: "Happy Clients" },
              { value: "50+", label: "Products" },
              { value: "4.9★", label: "Avg Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl text-accent">{stat.value}</div>
                <div className="text-xs tracking-widest uppercase text-tertiary-color mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-tertiary-color"
      >
        <span className="text-[10px] tracking-widest uppercase">
          {t("hero.scroll_hint")}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
