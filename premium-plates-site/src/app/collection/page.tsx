import {storeMetadata} from "@/lib/storeSeo";
import CataloguePage from "@/components/CataloguePage";
import { StyleCards } from "@/components/StyleCards";
import { storefrontName } from "@/config/catalogue";

export const metadata=storeMetadata("collection/", "Number plate collection | "+storefrontName, "Browse seven number plate styles, including flat, 3D gel, 4D acrylic, short, hex and motorcycle profiles. Open a style to see its dimensions and options.");

export default function CollectionPage() {
  return (
    <CataloguePage>
      <h1>Number plate collection</h1>
      <p className="catalogue-intro">Explore lettering, shapes and motorcycle plates. Choose a plate to set it up with your registration.</p>
      <StyleCards />
    </CataloguePage>
  );
}

