// Stripe integration ready
// Install: npm install @stripe/stripe-js @stripe/react-stripe-js
// Add your publishable key to .env.local as NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

// Uncomment when ready to use Stripe:
// import { loadStripe } from "@stripe/stripe-js";
// export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

/**
 * Creates a Stripe Checkout session via your API route
 * POST /api/create-checkout-session
 */
export async function createCheckoutSession(items: { priceId: string; quantity: number }[]) {
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error("Failed to create checkout session");
  }

  return response.json();
}
