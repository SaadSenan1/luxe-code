"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <div className="font-display text-[120px] leading-none text-accent/20 font-light mb-4">
          404
        </div>
        <h1 className="font-display text-4xl font-light mb-4">
          Page Not Found
        </h1>
        <p className="text-secondary-color mb-10">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="gold" size="lg">Return Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}
