import type { Draft } from "@/config/catalogue";
import { rulesCheckedOn, rulesCheckedLabel, ruleSources, rulesForPlate } from "@/config/plateRules";
import "./rules-panel.css";

export default function RulesPanel({ draft }: { draft: Draft }) {
  return (
    <details className="plate-rules-panel">
      <summary>Rules for this plate</summary>
      <ul>{rulesForPlate(draft).map(rule => (
        <li key={rule.title}>
          <strong>{rule.title}</strong>
          <p>{rule.reason} {rule.action}</p>
          <a href={ruleSources[rule.source].url}>{ruleSources[rule.source].label}</a>
        </li>
      ))}</ul>
      <small>Last checked <time dateTime={rulesCheckedOn}>{rulesCheckedLabel}</time></small>
    </details>
  );
}
