"use client";

import { useEffect, useRef } from "react";
import { Fraunces, Inter } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pic } from "@/lib/photos";
import BodyBg from "@/components/BodyBg";
import ChooserLink from "@/components/ChooserLink";
import "./atelier.css";

gsap.registerPlugin(ScrollTrigger);

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const dishes = [
  { num: "I", name: "Hand-Dived Scallop", desc: "Brown butter, cauliflower, oscietra caviar", price: "32", seed: "atl-d1" },
  { num: "II", name: "Aged Pigeon", desc: "Beetroot, blackberry, juniper jus", price: "46", seed: "atl-d2" },
  { num: "III", name: "Tarte au Citron", desc: "Amalfi lemon, brown sugar, sheep's milk", price: "22", seed: "atl-d3" },
];

export default function Atelier() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".atl-eyebrow", { y: 20, autoAlpha: 0, duration: 0.8 })
        .from(".atl-line-inner", { yPercent: 105, duration: 1, stagger: 0.12 }, "-=0.4")
        .to(".atl-rule", { scaleX: 1, duration: 1, ease: "power4.inOut" }, "-=0.5")
        .from(".atl-lead", { y: 20, autoAlpha: 0, duration: 0.8 }, "-=0.7")
        .to(".atl-cover", { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "-=1")
        .to(".atl-hero-media img", { scale: 1, duration: 1.4, ease: "power3.out" }, "<");

      gsap.from(".atl-quote .w", {
        y: 16,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: { trigger: ".atl-statement", start: "top 70%" },
      });

      gsap.from(".atl-dish", {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        scrollTrigger: { trigger: ".atl-dishes", start: "top 75%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const quote = "We cook one tasting menu a night, built from whatever arrived that morning.";

  return (
    <div ref={root} className={`atl ${fraunces.variable} ${inter.variable}`}>
      <BodyBg color="#f5f2eb" />
      <ChooserLink />

      <nav className="atl-nav">
        <span className="atl-brand">MERIDIAN</span>
        <div className="atl-nav-links">
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#visit">Visit</a>
        </div>
        <a href="#reserve" className="atl-reserve">
          Reserve
        </a>
      </nav>

      <header className="atl-hero">
        <div className="atl-hero-text">
          <span className="atl-eyebrow">Est. 1936 &middot; New York</span>
          <h1 className="atl-title">
            <span className="atl-line-mask"><span className="atl-line-inner">A quiet room</span></span>
            <span className="atl-line-mask"><span className="atl-line-inner">and a long,</span></span>
            <span className="atl-line-mask"><span className="atl-line-inner"><span className="atl-em">considered</span> meal.</span></span>
          </h1>
          <div className="atl-rule" />
          <p className="atl-lead">
            Meridian is a fourteen-seat counter in Midtown serving a single tasting
            menu each evening - precise, seasonal, and unhurried.
          </p>
        </div>
        <div className="atl-hero-media">
          <img src={pic("atl-hero", 1000, 1300)} alt="A plated course at Meridian" />
          <div className="atl-cover" />
        </div>
      </header>

      <section className="atl-statement" id="about">
        <p className="atl-quote">
          {quote.split(" ").map((w, i) => (
            <span className="w" key={i}>
              {w}&nbsp;
            </span>
          ))}
        </p>
        <p className="atl-attrib">Chef's note</p>
      </section>

      <section className="atl-dishes" id="menu">
        <div className="atl-dishes-head">
          <h2>Tonight's Counter</h2>
          <p>Three of fourteen courses</p>
        </div>
        <div className="atl-grid">
          {dishes.map((d) => (
            <article className="atl-dish" key={d.name}>
              <div className="atl-dish-img">
                <img src={pic(d.seed, 800, 1000)} alt={d.name} />
              </div>
              <span className="atl-dish-num">COURSE {d.num}</span>
              <h3 className="atl-dish-name">{d.name}</h3>
              <p className="atl-dish-desc">{d.desc}</p>
              <p className="atl-dish-price">{d.price}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="atl-footer" id="visit">
        <div className="atl-footer-mark">Meridian</div>
        <div className="atl-footer-row">
          <span>155 East 56th Street, New York</span>
          <span>Reservations open 30 days ahead</span>
          <span>&copy; 2026 Meridian</span>
        </div>
      </footer>
    </div>
  );
}
