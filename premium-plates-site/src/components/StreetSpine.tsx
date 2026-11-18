"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** One road edge runs past the storefront. The nearest section owns its lamp. */
export default function StreetSpine() {
  const pathname = usePathname();
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main#main-content:has(#home)");
    if (!main) return;
    const sections = Array.from(main.querySelectorAll<HTMLElement>(":scope > section"));
    if (!sections.length) return;

    const lamps = sections.map(section => {
      const lamp = document.createElement("i");
      lamp.className = "way-lamp";
      lamp.setAttribute("aria-hidden", "true");
      section.append(lamp);
      return lamp;
    });
    main.classList.add("way-road");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active: HTMLElement | undefined;
    let frame = 0;
    function locate() {
      frame = 0;
      const level = window.innerHeight * 0.44;
      const current = sections.find(section => section.getBoundingClientRect().bottom > level) ?? sections[sections.length - 1];
      if (active !== current) {
        active?.removeAttribute("data-lamp-on");
        current.setAttribute("data-lamp-on", "");
        active = current;
      }
      if (!reduced.matches) current.style.setProperty("--pool-y", Math.round(level - current.getBoundingClientRect().top) + "px");
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(locate);
    }
    locate();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
      active?.removeAttribute("data-lamp-on");
      main.classList.remove("way-road");
      sections.forEach(section => section.style.removeProperty("--pool-y"));
      lamps.forEach(lamp => lamp.remove());
    };
  }, [pathname]);
  return null;
}
