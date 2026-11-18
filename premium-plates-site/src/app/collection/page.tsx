import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CataloguePage from "@/components/CataloguePage";
import CataloguePlate from "@/components/CataloguePlate";
import { collection, storefrontName } from "@/config/catalogue";

export const metadata: Metadata = { title: `Number plate collection | ${storefrontName}` };

export default function CollectionPage() {
  return (
    <CataloguePage>
      <h1>Number plate collection</h1>
      <p className="catalogue-intro">Explore lettering, shapes and motorcycle plates. Choose a plate to set it up with your registration.</p>
      <div className="catalogue-grid">
        {collection.map((product) => (
          <Link className="catalogue-card" key={product.id} href={`/collection/${product.slug}`}>
            <CataloguePlate kind={product.id} />
            <div className="catalogue-card-copy">
              <span>{product.intendedUse}</span>
              <h2>{product.name} <ArrowUpRight size={21} /></h2>
              <p>{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </CataloguePage>
  );
}
