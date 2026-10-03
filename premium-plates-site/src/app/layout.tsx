import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Roboto_Condensed } from "next/font/google";
import "./redesign.css";

const editorial = Instrument_Serif({ variable: "--font-editorial", subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });
const plateFont = Roboto_Condensed({ variable: "--font-plate", subsets: ["latin"], weight: "700", display: "swap" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Plates — The detail that makes it yours",
  description: "A considered finish for the cars you care about. Explore premium number plate styles and preview your registration in the Premium Plates studio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${editorial.variable} ${plateFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
