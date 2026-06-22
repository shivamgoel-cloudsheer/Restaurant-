"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

/**
 * Full-bleed crossfading slideshow with Ken Burns drift, auto-advance, and dot
 * pagination - the Food & Drink carousel move from the reference site. The
 * caption remounts on each change (key=index) so it fades in with its slide.
 */
export default function Showcase() {
  const slides = site.showcase.slides;
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIndex((p) => (p + 1) % slides.length), 4800);
  };

  useEffect(() => {
    start();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const go = (n: number) => {
    setIndex(n);
    start();
  };

  const active = slides[index];

  return (
    <section className="showcase" id="showcase">
      <div className="sc-stage">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`sc-slide${i === index ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${s.src})` }}
          />
        ))}
        <div className="sc-overlay" />
      </div>

      <div className="sc-content">
        <span className="eyebrow">{site.showcase.eyebrow}</span>
        <div className="sc-caption" key={index}>
          <h3 className="sc-name">{active.name}</h3>
          <p className="sc-desc">{active.desc}</p>
        </div>
        <div className="sc-dots">
          {slides.map((s, i) => (
            <button
              key={s.src}
              className={`sc-dot${i === index ? " is-active" : ""}`}
              aria-label={`Show ${slides[i].name}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
