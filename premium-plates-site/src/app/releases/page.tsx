import Link from "@/components/StoreLink";
import packageInfo from "../../../package.json";

export const metadata={title:"Storefront release notes",robots:{index:false,follow:false}};
export default function ReleasesPage() {
  return (
    <main className="release-page">
      <Link href="/">Back to the plate builder</Link>
      <h1>Version {packageInfo.version}</h1>
      <p>Local storefront preview with a live plate builder and seven catalogue styles.</p>
      <p>Browse the <a href="https://github.com/AbdullahKhalid27/Premium-Plates/releases">release history</a> for published versions.</p>
    </main>
  );
}
