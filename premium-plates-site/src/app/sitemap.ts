import type {MetadataRoute} from "next";
import {collection} from "@/config/catalogue";
import {publicBase,publicUrl} from "@/lib/storeSeo";
export const dynamic="force-static";
export default function sitemap():MetadataRoute.Sitemap {
  if(!publicBase)return [];
  return ["","about/","collection/",...collection.map(p=>"collection/"+p.slug+"/")].map(path=>({url:publicUrl(path)!}));
}
