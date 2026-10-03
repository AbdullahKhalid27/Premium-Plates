import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./redesign.css";

// Luxury editorial display font
const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Modern British automotive sans-serif
const modernSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Authentic UK BS AU 145e Charles Wright registration font
const charlesWright = localFont({
  src: "./fonts/CharlesWright-Bold.otf",
  variable: "--font-plate",
  weight: "700",
  display: "swap",
  fallback: ["Impact", "Arial Black", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Premium Plates — Bespoke British Number Plates",
  description: "Precision-engineered UK number plates in 3D Gloss Gel and 4D Laser-Cut Acrylic. Road-legal, BS AU 145e certified, and handcrafted in Great Britain.",
  openGraph: {
    title: "Premium Plates — The Detail That Makes It Yours",
    description: "Explore 3D Gel, 4D Acrylic, and bespoke UK registration finishes with real-time road-legality verification.",
    url: "https://abdullahkhalid27.github.io/Premium-Plates/",
    siteName: "Premium Plates",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${modernSans.variable} ${editorial.variable} ${charlesWright.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
