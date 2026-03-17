"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

const team = [
  { name: "Maren Holdt", role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1494790108755-2616b612b1c8?w=400&q=80" },
  { name: "Kenji Nakamura", role: "Head of Engineering", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "Sophia Reyes", role: "Design Lead", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Amir Khalil", role: "Operations Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-accent" />
            <span className="text-xs tracking-[0.3em] uppercase text-accent">Est. 2018</span>
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-light leading-tight mb-8">
            {t("about.title")}
          </h1>
          <p className="text-xl text-secondary-color font-light leading-relaxed">
            {t("about.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Full-width image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative h-[60vh] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
          alt="LUXE workshop"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-primary)]" />
        <div className="absolute inset-0 bg-[var(--bg-primary)]/20" />
      </motion.div>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl font-light mb-6">{t("about.mission_title")}</h2>
            <p className="text-secondary-color leading-relaxed mb-6">
              {t("about.story")}
            </p>
            <p className="text-secondary-color leading-relaxed">
              {t("about.mission")}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 gap-4"
          >
            {[
              { title: t("about.craftsmanship"), desc: t("about.craftsmanship_desc"), num: "01" },
              { title: t("about.innovation"), desc: t("about.innovation_desc"), num: "02" },
              { title: t("about.sustainability"), desc: t("about.sustainability_desc"), num: "03" },
            ].map((item) => (
              <div
                key={item.num}
                className="flex gap-5 p-5 rounded-2xl border border-color hover:border-accent transition-colors group"
              >
                <div className="font-display text-4xl text-accent/30 font-light leading-none group-hover:text-accent/60 transition-colors">
                  {item.num}
                </div>
                <div>
                  <h3 className="font-medium text-sm tracking-widest uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-secondary-color leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-surface border-y border-color py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-px bg-accent" />
              <span className="text-xs tracking-[0.3em] uppercase text-accent">The People</span>
              <div className="w-6 h-px bg-accent" />
            </div>
            <h2 className="font-display text-4xl font-light">{t("about.team_title")}</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-raised mb-4">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="font-medium text-sm">{member.name}</h3>
                <p className="text-xs text-tertiary-color mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "2018", label: "Founded" },
            { val: "4", label: "Team Members" },
            { val: "50+", label: "Products" },
            { val: "120+", label: "Countries" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="font-display text-5xl text-accent font-light">{item.val}</div>
              <div className="text-xs tracking-widest uppercase text-tertiary-color mt-2">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
