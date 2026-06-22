"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, img } from "@/lib/content";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Each tile parallaxes at a slightly different rate for a layered drift.
      gsap.utils.toArray<HTMLElement>(".g-item img").forEach((image, i) => {
        const depth = 6 + (i % 3) * 6;
        gsap.fromTo(
          image,
          { yPercent: -depth },
          {
            yPercent: depth,
            ease: "none",
            scrollTrigger: {
              trigger: image.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="section" ref={root}>
      <div className="section-head">
        <span className="eyebrow">{site.gallery.eyebrow}</span>
        <SplitHeading text={site.gallery.heading} />
      </div>

      <Reveal>
        <div className="gallery-grid">
          {site.gallery.images.map((g) => (
            <figure className="g-item" key={g.seed}>
              <img src={img(g.seed, 900, 1200)} alt={g.caption} />
              <figcaption className="g-cap">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
