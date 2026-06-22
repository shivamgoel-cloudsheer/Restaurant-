"use client";

import { useEffect, useRef } from "react";
import { Anton, Space_Mono } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BodyBg from "@/components/BodyBg";
import ChooserLink from "@/components/ChooserLink";
import "./brut.css";

gsap.registerPlugin(ScrollTrigger);

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spacemono",
  display: "swap",
});

const rows = [
  { nm: "Raw Bar", ds: "Oysters / clams / king crab / caviar", pr: "MKT" },
  { nm: "Dry-Aged Burger", ds: "60-day, raclette, bone marrow", pr: "26" },
  { nm: "Côte de Boeuf", ds: "For two, fat chips, peppercorn", pr: "120" },
  { nm: "Martini, Cold", ds: "Gin or vodka, your call", pr: "19" },
];

const kinetic = ["EAT", "DRINK", "REPEAT", "EST. 1936", "AFTER DARK"];

export default function Brut() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Text scramble on the kicker
    let raf = 0;
    const node = el.querySelector<HTMLElement>(".bru-scramble");
    const finalText = node?.dataset.text ?? "";
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/*0123456789";
    let frame = 0;
    const tick = () => {
      if (!node) return;
      node.textContent = finalText
        .split("")
        .map((c, i) =>
          c === " " || c === "·"
            ? c
            : i < frame / 2
            ? c
            : glyphs[Math.floor(Math.random() * glyphs.length)]
        )
        .join("");
      frame++;
      if (frame / 2 <= finalText.length) {
        raf = window.setTimeout(tick, 38);
      } else {
        node.textContent = finalText;
      }
    };
    raf = window.setTimeout(tick, 300);

    const ctx = gsap.context(() => {
      gsap.from(".bru-huge .ln > span", {
        yPercent: 110,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.2,
      });
      gsap.from(".bru-hero-foot", { autoAlpha: 0, y: 20, duration: 0.8, delay: 0.9 });

      gsap.from(".bru-row", {
        xPercent: -3,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".bru-menu", start: "top 75%" },
      });

      gsap.to(".bru-menu h2", {
        x: () => -40,
        ease: "none",
        scrollTrigger: { trigger: ".bru-menu", start: "top bottom", end: "top top", scrub: true },
      });
    }, el);

    return () => {
      clearTimeout(raf);
      ctx.revert();
    };
  }, []);

  const krow = [...kinetic, ...kinetic, ...kinetic, ...kinetic];

  return (
    <div ref={root} className={`bru ${anton.variable} ${spaceMono.variable}`}>
      <BodyBg color="#0f0f0f" />
      <ChooserLink />

      <nav className="bru-nav">
        <span className="bru-brand">MERIDIAN</span>
        <div className="bru-nav-links">
          <a href="#menu">MENU</a>
          <a href="#book">BOOK</a>
          <a href="#find">FIND US</a>
        </div>
        <span>NY / 1936</span>
      </nav>

      <section className="bru-hero">
        <p className="bru-scramble" data-text="DINNER · DRINKS · AFTER DARK">
          DINNER · DRINKS · AFTER DARK
        </p>
        <h1 className="bru-huge">
          <span className="ln"><span>EAT LIKE</span></span>
          <span className="ln"><span>IT&apos;S STILL</span></span>
          <span className="ln"><span className="accent">1936.</span></span>
        </h1>
        <div className="bru-hero-foot">
          <span className="box">155 E 56TH ST</span>
          <span className="box">OPEN TIL LATE</span>
          <span className="spacer" />
          <span>NO DRESS CODE / NO ATTITUDE</span>
        </div>
      </section>

      <div className="bru-kinetic" aria-hidden>
        <div className="bru-kinetic-track a">
          {krow.map((w, i) => (
            <span key={i} className={i % 2 ? "o" : ""}>{w} &#9632;</span>
          ))}
        </div>
      </div>
      <div className="bru-kinetic" aria-hidden>
        <div className="bru-kinetic-track b">
          {krow.map((w, i) => (
            <span key={i} className={i % 3 === 0 ? "r" : "o"}>{w} &#9633;</span>
          ))}
        </div>
      </div>

      <section className="bru-menu" id="menu">
        <h2>The Short List</h2>
        {rows.map((r, i) => (
          <div className="bru-row" key={r.nm}>
            <span className="idx">{String(i + 1).padStart(2, "0")}</span>
            <span className="nm">
              {r.nm}
              <span className="ds"> - {r.ds}</span>
            </span>
            <span className="pr">{r.pr}</span>
          </div>
        ))}
      </section>

      <footer className="bru-footer" id="find">
        <span className="big bru-display">Meridian</span>
        <span>155 EAST 56TH STREET</span>
        <span>RESERVATIONS: WALK IN</span>
        <span>&copy; 2026</span>
      </footer>
    </div>
  );
}
