import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Coș și finalizare comandă",
  robots: { index: false },
};

export default function CartPage() {
  return <CheckoutClient />;
}
