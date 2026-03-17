"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2018", label: "Founded" },
  { value: "50+", label: "Unique Products" },
  { value: "120+", label: "Countries Shipped" },
  { value: "4.9/5", label: "Customer Rating" },
];

export function StatsSection() {
  return (
    <section className="bg-surface border-y border-color py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-5xl md:text-6xl font-light text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-xs tracking-[0.2em] uppercase text-tertiary-color">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
