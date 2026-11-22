"use client";

import { useEffect, useRef } from "react";
import "./motion.css";

export default function NightDriveFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let resumeOnEntry = true;
    function sync() {
      if (!video) return;
      if (!visible || motion.matches || document.hidden) {
        if (!video.paused) resumeOnEntry = true;
        video.pause();
      } else if (resumeOnEntry && !video.ended) {
        resumeOnEntry = false;
        void video.play().catch(() => {});
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.35;
      sync();
    }, { threshold: [0, 0.35] });
    observer.observe(video);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <section className="night-drive" aria-labelledby="night-drive-title">
    <video ref={videoRef} aria-label="Night drive with a display registration plate" controls muted playsInline preload="none" poster="/Premium-Plates/media/night-drive-poster.jpg">
      <source src="/Premium-Plates/media/night-drive-cinematic.mp4" type="video/mp4" />
    </video>
    <h2 id="night-drive-title">The plate after dark</h2>
  </section>;
}
