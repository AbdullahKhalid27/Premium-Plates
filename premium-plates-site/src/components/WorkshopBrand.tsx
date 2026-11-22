import Link from "./StoreLink";
import { storefrontName } from "@/config/catalogue";

export const navigation = [
  ["About Us", "/about"], ["Plate Builder", "#studio"], ["Find Your Taste", "#collection"],
  ["Comparison", "#difference"], ["Lookbook", "#lookbook"], ["How to Order", "#how-to-order"],
  ["Frequently Asked Questions", "#questions"],
] as const;

export default function Brand({home = false}: {home?: boolean}) {
  return <Link className="workshop-wordmark" href={home ? "#home" : "/"} aria-label={storefrontName + " home"}>
    <svg width="47" height="31" viewBox="0 0 60 38" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="56" height="32" rx="5" stroke="var(--signal)" strokeWidth="2"/>
      <path d="M9 27 19 11h7l5 9 5-9h9L35 27h-7l-5-9-5 9z" fill="var(--signal)"/>
      <path d="m43 24 8-13" stroke="var(--signal)" strokeWidth="3"/>
    </svg><span>{storefrontName}</span>
  </Link>;
}

export function InteriorHeader() {
  return <header className="inside-header"><Brand/><nav aria-label="Main navigation">
    {navigation.map(([name,href])=><Link key={href} href={href.startsWith("#") ? "/"+href : href}>{name}</Link>)}
  </nav></header>;
}
