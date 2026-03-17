export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  images: string[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  featured: boolean;
  new: boolean;
  specs: Record<string, string>;
  modelColor?: string;
}

export type ProductCategory =
  | "watches"
  | "audio"
  | "accessories"
  | "tech"
  | "lifestyle";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
}

export interface FilterState {
  category: ProductCategory | "all";
  priceRange: [number, number];
  sortBy: SortOption;
  searchQuery: string;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating";

export type Locale = "en" | "ar";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
