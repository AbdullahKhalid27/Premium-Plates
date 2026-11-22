"use client";

import { useEffect, useState } from "react";

type Palette = "oxblood" | "midnight" | "graphite";

export default function PreviewThemePicker() {
  const [palette, setPalette] = useState<Palette>("oxblood");

  useEffect(() => {
    const current = document.documentElement.dataset.previewTheme;
    if (current === "midnight" || current === "graphite") setPalette(current);
  }, []);

  function switchPalette(next: Palette) {
    document.documentElement.dataset.previewTheme = next;
    const url = new URL(window.location.href);
    url.searchParams.set("theme", next);
    window.history.replaceState(window.history.state, "", url);
    try { sessionStorage.setItem("plate-preview-theme", next); } catch {}
    setPalette(next);
  }

  return <aside className="preview-theme-bar" aria-label="Client preview">
    <span>Client preview</span>
    <label>Colour theme
      <select value={palette} onChange={event => switchPalette(event.target.value as Palette)}>
        <option value="oxblood">Oxblood &amp; Brass</option>
        <option value="midnight">Midnight Blue &amp; Copper</option>
        <option value="graphite">Graphite &amp; Ice Blue</option>
      </select>
    </label>
  </aside>;
}
