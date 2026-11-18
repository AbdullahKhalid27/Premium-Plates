import Link from "next/link";
import packageInfo from "../../../package.json";

export default function ReleasesPage() {
  return (
    <main className="release-page">
      <Link href="/">Back to Plate Workshop</Link>
      <h1>Version {packageInfo.version}</h1>
      <p>Local storefront preview with a live plate builder and seven catalogue styles.</p>
      <p>Browse the <a href="https://github.com/AbdullahKhalid27/Premium-Plates/releases">release history</a> for published versions.</p>
    </main>
  );
}
