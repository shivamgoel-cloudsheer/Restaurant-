"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, img } from "@/lib/content";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // The image floats upward inside its frame as the section scrolls past.
      gsap.fromTo(
        ".story-media img",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" className="section story" ref={root}>
      <Reveal className="story-media">
        <img src={img("meridian-story", 1200, 1500)} alt="Inside Meridian" />
        <span className="tag">{site.established}</span>
      </Reveal>

      <div className="story-text">
        <div className="section-head">
          <span className="eyebrow">{site.story.eyebrow}</span>
          <h2 className="section-title">{site.story.heading}</h2>
        </div>
        <Reveal className="story-body">
          {site.story.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal className="story-stats" delay={0.1}>
          {site.story.stats.map((s) => (
            <div key={s.label}>
              <div className="num">{s.value}</div>
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
