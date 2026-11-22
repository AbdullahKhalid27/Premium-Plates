import type { Metadata } from "next";
import { storefrontName } from "@/config/catalogue";

// Set to the full approved public storefront URL, including its base path.
const configured = process.env.STOREFRONT_PUBLIC_URL;
export const publicBase = configured ? new URL(configured.replace(/\/+$/, "") + "/") : undefined;
export function publicUrl(path: string) { return publicBase && new URL(path, publicBase).href; }

export function storeMetadata(path:string, title:string, description:string):Metadata {
  const canonical=publicUrl(path);
  return {title,description,alternates:canonical?{canonical}:undefined,
    robots:{index:Boolean(canonical),follow:true},
    openGraph:{type:"website",siteName:storefrontName,title,description,url:canonical,locale:"en_GB"},
    twitter:{card:"summary",title,description}};
}

