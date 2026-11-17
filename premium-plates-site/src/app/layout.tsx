import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./redesign.css";
import "./foundation.css";

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
  title: "Plate Studio — Design your number plates",
  description: "Explore number plate finishes and compare your registration in the plate studio.",
  openGraph: {
    title: "Plate Studio",
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
      className={`${modernSans.variable} ${charlesWright.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
