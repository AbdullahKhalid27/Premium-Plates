import Link from "next/link";
import { version } from "../../../package.json";

export default function ReleasesPage() {
  return (
    <main className="release-page">
      <Link href="/">Back to Plate Studio</Link>
      <h1>Version {version}</h1>
      <p>Design foundation with a beige canvas, plum accents, responsive navigation and keyboard access.</p>
      <p>Browse the <a href="https://github.com/AbdullahKhalid27/Premium-Plates/releases">release history</a> for published versions.</p>
    </main>
  );
}
