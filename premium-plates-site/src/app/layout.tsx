import type { Metadata } from "next";
import StreetSpine from "@/components/StreetSpine";
import localFont from "next/font/local";
import "./redesign.css";
import "./foundation.css";
import "./workshop.css";
import "./road.css";
import { storefrontName } from "@/config/catalogue";

// Authentic UK BS AU 145e Charles Wright registration font
const charlesWright = localFont({
  src: "./fonts/CharlesWright-Bold.otf",
  variable: "--font-plate",
  weight: "700",
  display: "swap",
  fallback: ["Impact", "Arial Black", "sans-serif"],
});

export const metadata: Metadata = {
  title: `${storefrontName} | Design your number plates`,
  description: "Explore number plate finishes and compare your registration in the plate studio.",
  openGraph: {
    title: storefrontName,
    description: "Explore number plate finishes and personalise your preview.",
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
      lang="en-GB"
      className={`${charlesWright.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}<StreetSpine /></body>
    </html>
  );
}
