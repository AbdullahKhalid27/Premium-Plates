import type { Metadata } from "next";
import CataloguePage from "@/components/CataloguePage";
import { StyleCards } from "@/components/StyleCards";
import { storefrontName } from "@/config/catalogue";

export const metadata: Metadata = { title: `Number plate collection | ${storefrontName}` };

export default function CollectionPage() {
  return (
    <CataloguePage>
      <h1>Number plate collection</h1>
      <p className="catalogue-intro">Explore lettering, shapes and motorcycle plates. Choose a plate to set it up with your registration.</p>
      <StyleCards />
    </CataloguePage>
  );
}

