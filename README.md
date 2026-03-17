# LUXE — 3D E-Commerce Platform

A high-end, production-ready 3D e-commerce website built with Next.js 14, React Three Fiber, Framer Motion, and TailwindCSS.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + CSS Variables |
| 3D | React Three Fiber + Drei |
| Animations | Framer Motion |
| State | Zustand (persisted) |
| Payments | Stripe-ready |
| i18n | Custom hook (EN + AR with RTL) |
| Toasts | react-hot-toast |

## Project Structure

```
luxe3d/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── shop/               # Shop listing page
│   ├── product/[slug]/     # Product detail page
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── wishlist/           # Wishlist page
├── components/
│   ├── 3d/                 # Three.js components
│   │   ├── HeroScene.tsx   # 3D hero animation
│   │   └── ProductViewer.tsx # Interactive product 3D
│   └── ui/                 # Reusable UI components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── Button.tsx
│       └── ProductCard.tsx
├── features/
│   ├── cart/               # Cart drawer
│   └── products/           # Product sections
├── hooks/                  # Custom React hooks
├── lib/                    # Products data + Stripe
├── locales/                # EN + AR translations
│   ├── en/common.json
│   └── ar/common.json
├── store/                  # Zustand stores
│   ├── cartStore.ts        # Cart state (persisted)
│   ├── wishlistStore.ts    # Wishlist state (persisted)
│   └── uiStore.ts          # Theme + locale state
├── styles/globals.css      # Global styles + CSS variables
├── types/index.ts          # TypeScript types
└── utils/index.ts          # Utility functions
```

## Features

### 🛍 E-Commerce
- Product listing with filters (category, price, sort)
- Product detail page with image gallery
- Interactive 3D product viewer (toggle Photos ↔ 3D)
- Cart with quantity management (persisted)
- Wishlist system (persisted)
- Checkout form (Stripe-ready)

### 🎨 Design
- Dark/Light mode toggle
- Luxury Apple/Tesla-style aesthetic
- Cormorant Garamond display font
- Gold accent color system
- Glassmorphism effects

### 🌐 3D
- Animated hero scene with floating orbs, rings, particles
- Mouse-reactive camera rig
- Interactive product viewer with orbiting rings
- React Three Fiber + Drei

### 🌍 i18n
- English + Arabic
- RTL layout for Arabic
- Persisted language preference
- Language switcher in navbar

### ⚡ Performance
- Lazy loaded 3D components (no SSR)
- Next.js Image optimization
- Zustand persistence
- Code splitting

## Stripe Integration

Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

The checkout page is wired and ready — connect your Stripe keys to go live.

## Customization

### Adding Products
Edit `lib/products.ts` — add entries to the `products` array following the `Product` type.

### Adding Languages
1. Create `locales/[locale]/common.json`
2. Add locale to `hooks/useTranslation.ts` imports
3. Add to the language switcher in `Navbar.tsx`

### Theming
CSS variables in `styles/globals.css` control all colors for both dark and light modes.
