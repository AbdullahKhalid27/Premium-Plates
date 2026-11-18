import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { storefrontName } from "@/config/catalogue";

export default function CataloguePage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="masthead workshop-masthead">
        <Link className="workshop-wordmark" href="/">{storefrontName}</Link>
        <nav className="catalogue-nav" aria-label="Main navigation">
          <Link href="/collection">Shop plates</Link>
          <Link href="/#studio">Plate builder <ArrowUpRight size={15} /></Link>
        </nav>
      </header>
      <main className="catalogue-page" id="main-content" tabIndex={-1}>{children}</main>
    </>
  );
}
