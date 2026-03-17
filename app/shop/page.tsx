import { Metadata } from "next";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our complete collection of luxury products.",
};

export default function ShopPage() {
  return <ShopPageClient />;
}
