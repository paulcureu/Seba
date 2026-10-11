import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductModal } from "@/components/product/ProductModal";
import { Toast } from "@/components/cart/Toast";
import { MobileCartBar } from "@/components/cart/MobileCartBar";

const manrope = localFont({
  src: [
    { path: "./fonts/manrope-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/manrope-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/manrope-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/manrope-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/manrope-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/cormorant-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/cormorant-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Pizza Seba — Pizzeria e Trattoria în Cluj-Napoca",
    template: "%s · Pizza Seba Cluj",
  },
  description: site.description,
  keywords: ["pizza Cluj", "pizzerie Cluj-Napoca", "livrare pizza Cluj", "trattoria Cluj", "Pizza Seba", "paste Cluj"],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Pizza Seba",
    title: "Pizza Seba — Pizzeria e Trattoria în Cluj-Napoca",
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0d1411",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Pizzeria-Trattoria Seba",
  servesCuisine: ["Italiană", "Pizza"],
  telephone: "+40744320701",
  email: site.email,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Str. Mureșului nr. 14",
    addressLocality: "Cluj-Napoca",
    addressCountry: "RO",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "21:00",
    },
  ],
  sameAs: [site.facebook, site.instagram],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${manrope.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        <script
          // Marchează că JS rulează, ca elementele animate să pornească ascunse (fără „flash”).
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body className="bg-ink text-cream antialiased">
        <Providers>
          <a
            href="#continut"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brass focus:px-5 focus:py-3 focus:text-ink"
          >
            Sari la conținut
          </a>
          <Header />
          <main id="continut">{children}</main>
          <Footer />
          <MobileCartBar />
          <CartDrawer />
          <ProductModal />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
