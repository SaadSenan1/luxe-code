import { Metadata } from "next";
import { HeroSection } from "@/features/products/HeroSection";
import { FeaturedSection } from "@/features/products/FeaturedSection";
import { BrandStory } from "@/features/products/BrandStory";
import { NewArrivalsSection } from "@/features/products/NewArrivalsSection";
import { StatsSection } from "@/features/products/StatsSection";

export const metadata: Metadata = {
  title: "LUXE — Crafted for the Extraordinary",
  description:
    "Discover our curated collection of luxury objects designed to elevate everyday life.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <BrandStory />
      <NewArrivalsSection />
      <StatsSection />
    </>
  );
}
