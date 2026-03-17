"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const shopLinks = [
    { label: t("filter.watches"), href: "/shop?category=watches" },
    { label: t("filter.audio"), href: "/shop?category=audio" },
    { label: t("filter.tech"), href: "/shop?category=tech" },
    { label: t("filter.lifestyle"), href: "/shop?category=lifestyle" },
    { label: t("filter.accessories"), href: "/shop?category=accessories" },
  ];

  const companyLinks = [
    { label: t("about.title"), href: "/about" },
    { label: t("contact.title"), href: "/contact" },
  ];

  const legalLinks = [
    { label: t("footer.privacy"), href: "/privacy" },
    { label: t("footer.terms"), href: "/terms" },
    { label: t("footer.returns"), href: "/returns" },
  ];

  return (
    <footer className="border-t border-color bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-3xl tracking-[0.15em] text-primary-color font-light block mb-4"
            >
              LUXE
            </Link>
            <p className="text-secondary-color text-sm leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full border border-color flex items-center justify-center text-secondary-color hover:text-accent hover:border-accent transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-tertiary-color mb-5">
              {t("footer.shop")}
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-color hover:text-accent transition-colors group flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-tertiary-color mb-5">
              {t("footer.company")}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-color hover:text-accent transition-colors group flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-tertiary-color mb-5">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-color hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-color pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-tertiary-color">
            © {year} LUXE. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-tertiary-color">
              Designed with obsessive care.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
