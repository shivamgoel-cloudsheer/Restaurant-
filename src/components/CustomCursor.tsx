"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Gold dot that tracks the pointer 1:1 with a larger ring that lags behind and
 * swells over anything interactive. Bails out entirely on touch / coarse
 * pointers, and only hides the native cursor once it has mounted (so a JS
 * failure never leaves the user without a pointer).
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || !dot.current || !ring.current) return;

    document.body.classList.add("has-cursor");
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });

    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };
    const interactive = "a, button, input, .g-item, .menu-tab, .sc-dot, .magnetic";
    const over = (e: Event) => {
      if ((e.target as Element).closest(interactive)) ring.current?.classList.add("is-hover");
    };
    const out = (e: Event) => {
      if ((e.target as Element).closest(interactive)) ring.current?.classList.remove("is-hover");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  );
}
