"use client";

import { useEffect, useRef } from "react";
import { DM_Serif_Display, Mulish } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pic } from "@/lib/photos";
import BodyBg from "@/components/BodyBg";
import ChooserLink from "@/components/ChooserLink";
import "./maison.css";

gsap.registerPlugin(ScrollTrigger);

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dmserif",
  display: "swap",
});
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-mulish",
  display: "swap",
});

const plates = [
  { name: "Burrata & Peach", desc: "Basil oil, sea salt, sourdough", price: "18", seed: "mai-p1" },
  { name: "Cacio e Pepe", desc: "Hand-rolled tonnarelli, pecorino", price: "26", seed: "mai-p2" },
  { name: "Branzino al Forno", desc: "Fennel, lemon, Castelvetrano", price: "38", seed: "mai-p3" },
];

const marquee = ["Trattoria", "Est. 1936", "Wood Fire", "Midtown", "Family Style"];

export default function Maison() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".mai-eyebrow", { y: 18, autoAlpha: 0, duration: 0.8 })
        .from(".mai-line-inner", { yPercent: 110, duration: 1.05, stagger: 0.12 }, "-=0.4")
        .from(".mai-lead", { y: 18, autoAlpha: 0, duration: 0.8 }, "-=0.7")
        .from(".mai-hero-media", { clipPath: "inset(100% 0 0 0)", duration: 1.1, ease: "power4.inOut" }, "-=0.9")
        .to(".mai-hero-media img", { scale: 1, duration: 1.4, ease: "power3.out" }, "<")
        .from(".mai-badge", { autoAlpha: 0, scale: 0.5, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");

      gsap.from(".mai-plate", {
        y: 44,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mai-plates", start: "top 72%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const row = [...marquee, ...marquee];

  return (
    <div ref={root} className={`mai ${dmSerif.variable} ${mulish.variable}`}>
      <BodyBg color="#f5ecdb" />
      <ChooserLink />

      <nav className="mai-nav">
        <span className="mai-brand">Meridian</span>
        <div className="mai-nav-links">
          <a href="#menu">Menu</a>
          <a href="#story">Our Story</a>
          <a href="#visit">Visit</a>
        </div>
        <a href="#reserve" className="mai-reserve">Book a Table</a>
      </nav>

      <header className="mai-hero">
        <div className="mai-hero-text">
          <span className="mai-eyebrow">A Midtown trattoria since 1936</span>
          <h1 className="mai-title">
            <span className="mai-line-mask"><span className="mai-line-inner">Come hungry,</span></span>
            <span className="mai-line-mask"><span className="mai-line-inner">stay <span className="it">all night.</span></span></span>
          </h1>
          <p className="mai-lead">
            Wood-fired plates meant for sharing, a list of honest Italian wine, and
            a room that has not changed its mind in ninety years.
          </p>
        </div>

        <div className="mai-hero-media">
          <img src={pic("mai-hero", 1000, 1250)} alt="A wood-fired plate at Meridian" />
          <svg className="mai-badge" viewBox="0 0 200 200" aria-hidden>
            <defs>
              <path id="maiCircle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
            </defs>
            <circle className="bg" cx="100" cy="100" r="92" />
            <text>
              <textPath href="#maiCircle" startOffset="0">
                MERIDIAN &middot; TRATTORIA &middot; EST. 1936 &middot; MIDTOWN &middot;
              </textPath>
            </text>
            <text className="star" x="100" y="112" textAnchor="middle">&#10039;</text>
          </svg>
        </div>
      </header>

      <div className="mai-marquee" aria-hidden>
        <div className="mai-marquee-track">
          {row.map((w, i) => (
            <span key={i}>{w}<i>&#10039;</i></span>
          ))}
        </div>
      </div>

      <section className="mai-plates" id="menu">
        <div className="mai-plates-head">
          <h2>From the Wood Fire</h2>
          <p>Made for the middle of the table</p>
        </div>
        <div className="mai-grid">
          {plates.map((p) => (
            <article className="mai-plate" key={p.name}>
              <div className="mai-plate-img">
                <img src={pic(p.seed, 800, 800)} alt={p.name} />
              </div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="pr">${p.price}</div>
            </article>
          ))}
        </div>
      </section>

      <footer className="mai-footer" id="visit">
        <div className="mai-footer-mark">Buon Appetito</div>
        <div className="mai-footer-row">
          <span>155 East 56th Street, New York</span>
          <span>Lunch &amp; dinner, seven days</span>
          <span>&copy; 2026 Meridian</span>
        </div>
      </footer>
    </div>
  );
}
