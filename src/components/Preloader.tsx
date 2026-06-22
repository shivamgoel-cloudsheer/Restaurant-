"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/content";

/**
 * Intro curtain: the wordmark blurs in, a gold progress line and 00 -> 100
 * counter run, then the whole panel lifts away to reveal the site.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => setDone(true) });

    document.body.style.overflow = "hidden";

    tl.from(".pl-brand", {
      yPercent: 40,
      autoAlpha: 0,
      filter: "blur(14px)",
      duration: 1,
      ease: "power3.out",
    });
    tl.to(
      counter,
      {
        v: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
          }
        },
      },
      0.2
    );
    tl.to(".pl-bar span", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.2);
    tl.to(".pl-brand", { yPercent: -25, autoAlpha: 0, filter: "blur(8px)", duration: 0.6, ease: "power2.in" }, "+=0.15");
    tl.to(".pl-count, .pl-bar", { autoAlpha: 0, duration: 0.4 }, "<");
    tl.to(
      root.current,
      {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onStart: () => {
          document.body.style.overflow = "";
        },
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader">
      <div className="pl-inner">
        <div className="pl-brand">{site.brand}</div>
        <div className="pl-bar">
          <span />
        </div>
        <div className="pl-count">
          <span ref={countRef}>00</span>
          <i> / 100</i>
        </div>
      </div>
    </div>
  );
}
