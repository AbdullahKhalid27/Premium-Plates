import type {MetadataRoute} from "next";
import {publicUrl} from "@/lib/storeSeo";
export const dynamic="force-static";
export default function robots():MetadataRoute.Robots {
  return {rules:{userAgent:"*",allow:"/"},sitemap:publicUrl("sitemap.xml")};
}
