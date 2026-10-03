"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function ClosingSection({ onDesignClick }: { onDesignClick?: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Lazy load the video using IntersectionObserver when scrolled near
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="closing-section relative min-h-[460px] flex items-center justify-center text-center overflow-hidden py-24 px-6 isolate bg-[#09171c] text-[#f3eee4]"
    >
      {/* Background Video using hero footage */}
      {shouldLoadVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-[-2] filter brightness-50 contrast-110"
          autoPlay
          loop
          muted
          playsInline
          poster="/Premium-Plates/media/night-drive-poster.jpg"
        >
          <source src="/Premium-Plates/media/night-drive-cinematic.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="closing-still absolute inset-0 z-[-2] bg-cover bg-center filter brightness-50" />
      )}

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#09171c]/70 via-[#09171c]/40 to-[#09171c]/80 pointer-events-none" />

      {/* Foreground Content */}
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        <span className="text-xs uppercase tracking-widest text-[#d7b696] font-semibold">
          Final Handcrafted Touch
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal leading-tight">
          Not just a registration.<br />
          <em className="italic text-[#d7b696]">A little more you.</em>
        </h2>
        <p className="text-sm md:text-base text-[#cfdcd9] max-w-lg mx-auto leading-relaxed">
          Laser-cut acrylic, resin dome finishes, and authentic British road legality. Preview your personal mark today.
        </p>

        <div className="pt-4">
          <button
            type="button"
            onClick={onDesignClick}
            className="primary-button light-button inline-flex items-center gap-3 bg-[#eee9de] text-[#172328] hover:bg-[#fff8ed] px-8 py-4 rounded-md font-medium text-sm transition-all shadow-xl hover:scale-105"
          >
            Design your plates <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
