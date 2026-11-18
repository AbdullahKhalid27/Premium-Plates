import RulesPanel from "@/components/RulesPanel";
import type { Metadata } from "next";
import Link from "@/components/StoreLink";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import CataloguePage from "@/components/CataloguePage";
import CataloguePlate from "@/components/CataloguePlate";
import { applyProduct, collection, defaultDraft, previewDimensions, storefrontName } from "@/config/catalogue";

type ProductPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return collection.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = collection.find((item) => item.slug === slug);
  if (!product) return {};
  return { title: `${product.name} number plates | ${storefrontName}`, description: product.description };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = collection.find((item) => item.slug === slug);
  if (!product) notFound();
  const dimensions = previewDimensions(applyProduct(defaultDraft, product.id)).join(" × ");

  return (
    <CataloguePage>
      <Link className="catalogue-breadcrumb" href="/collection">All number plates</Link>
      <article className="product-page">
        <div>
          <h1>{product.name} number plates</h1>
          <p className="catalogue-intro">{product.description}</p>
          <dl className="product-spec">
            <div><dt>Intended use</dt><dd>{product.intendedUse}</dd></div>
            <div><dt>Profile</dt><dd>{product.dimension}</dd></div>
            <div><dt>Preview dimensions</dt><dd>{dimensions} mm</dd></div>
            <div><dt>Preview price</dt><dd>From £{product.price.toFixed(2)}</dd></div>
          </dl>
          <Link className="primary-button" href={`/?product=${product.slug}#studio`}>
            Configure {product.name.toLowerCase()} plates <ArrowUpRight size={18} />
          </Link>
        </div>
        <CataloguePlate kind={product.id} />
      </article>
      <RulesPanel draft={applyProduct(defaultDraft, product.id)} />
    </CataloguePage>
  );
}
