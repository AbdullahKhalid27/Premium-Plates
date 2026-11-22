import { ruleSources, rulesCheckedOn, rulesCheckedLabel } from "@/config/plateRules";
import "./guidance-paper.css";

export default function GuidanceSources() {
  return (
    <div className="guidance-sources">
      <div><strong>Official guidance</strong><p>Last checked <time dateTime={rulesCheckedOn}>{rulesCheckedLabel}</time></p></div>
      <nav aria-label="GOV.UK sources">
        {Object.values(ruleSources).map(({ label, url }) => <a key={url} href={url}>{label} <span aria-hidden="true">↗</span></a>)}
      </nav>
    </div>
  );
}
