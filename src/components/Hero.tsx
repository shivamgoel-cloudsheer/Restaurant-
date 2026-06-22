"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/content";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const words = site.hero.title.split(" ");

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Entrance - delayed so it lands just as the preloader lifts.
      const tl = gsap.timeline({ delay: 2.4, defaults: { ease: "power4.out" } });
      tl.from(".hero-eyebrow", { yPercent: 100, autoAlpha: 0, duration: 0.9 })
        .from(".hero-word", { yPercent: 120, duration: 1.1, stagger: 0.1 }, "-=0.5")
        .from(".hero-sub", { y: 24, autoAlpha: 0, duration: 0.9 }, "-=0.7")
        .from(".hero-actions", { y: 24, autoAlpha: 0, duration: 0.9 }, "-=0.7")
        .from(".hero-cue", { autoAlpha: 0, duration: 0.8 }, "-=0.5");

      // Scroll parallax - background drifts slower than the content above it.
      gsap.to(".hero-bg", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        yPercent: -18,
        autoAlpha: 0.3,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="hero" ref={root}>
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${site.hero.image})` }}
      />
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-eyebrow">{site.hero.eyebrow}</p>
        <h1 className="hero-title">
          {words.map((w, i) => (
            <span className="hero-line" key={i}>
              <span className="hero-word">{w}</span>
            </span>
          ))}
        </h1>
        <p className="hero-sub">{site.hero.sub}</p>
        <div className="hero-actions">
          <Magnetic>
            <a href="#reserve" className="btn btn-gold">
              Reserve a Table
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#menu" className="btn btn-ghost">
              View the Menu
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="hero-cue">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
