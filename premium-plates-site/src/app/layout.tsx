import type { Metadata } from "next";
import PreviewThemePicker from "@/components/PreviewThemePicker";
import StreetSpine from "@/components/StreetSpine";
import localFont from "next/font/local";
import "./redesign.css";
import "./foundation.css";
import "./workshop.css";
import "./road.css";
import "./oxblood.css";
import "./theme-flow.css";
import "@/components/ordering-guide.css";
import { storefrontName } from "@/config/catalogue";

// Authentic UK BS AU 145e Charles Wright registration font
const charlesWright = localFont({
  src: "./fonts/CharlesWright-Bold.otf",
  variable: "--font-plate",
  weight: "700",
  display: "swap",
  fallback: ["Impact", "Arial Black", "sans-serif"],
});

const previewPalette = `try {
  const theme = new URLSearchParams(location.search).get("theme");
  if (theme === "midnight" || theme === "oxblood" || theme === "graphite") sessionStorage.setItem("plate-preview-theme", theme);
  const selected = theme || sessionStorage.getItem("plate-preview-theme");
  if (selected === "midnight" || selected === "graphite") document.documentElement.dataset.previewTheme = selected;
} catch {}`;

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
      suppressHydrationWarning
      lang="en-GB"
      className={`${charlesWright.variable} h-full antialiased`}
    >
      <head><script dangerouslySetInnerHTML={{ __html: previewPalette }} /></head>
      <body className="min-h-full flex flex-col font-sans"><PreviewThemePicker />{children}<StreetSpine /></body>
    </html>
  );
}
