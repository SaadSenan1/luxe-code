import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "LUXE — Crafted for the Extraordinary",
    template: "%s | LUXE",
  },
  description:
    "Discover our curated collection of luxury objects designed to elevate everyday life. Premium watches, audio, tech, and lifestyle products.",
  keywords: ["luxury", "premium", "watches", "audio", "tech", "lifestyle"],
  authors: [{ name: "LUXE" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luxe.com",
    siteName: "LUXE",
    title: "LUXE — Crafted for the Extraordinary",
    description: "Discover our curated collection of luxury objects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXE — Crafted for the Extraordinary",
    description: "Discover our curated collection of luxury objects.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
              },
              duration: 3000,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
