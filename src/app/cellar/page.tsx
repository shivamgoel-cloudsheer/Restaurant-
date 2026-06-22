"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display, Manrope } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BodyBg from "@/components/BodyBg";
import ChooserLink from "@/components/ChooserLink";
import "./cellar.css";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope",
  display: "swap",
});

const panels = [
  { src: "/photos/atrium.jpg", k: "The Cellar", t: "Two thousand labels" },
  { src: "/photos/plate.jpg", k: "By the Glass", t: "Forty open bottles" },
  { src: "/photos/pass.jpg", k: "The Bar", t: "Stirred, never rushed" },
  { src: "/photos/spread.jpg", k: "Small Plates", t: "To keep you here" },
  { src: "/photos/toast.jpg", k: "The Back Room", t: "For the regulars" },
];

const pours = [
  { nm: "Barolo, Piedmont", rg: "Nebbiolo &middot; 2017", pr: "28" },
  { nm: "Grower Champagne", rg: "Côte des Blancs &middot; brut", pr: "26" },
  { nm: "Old Vine Garnacha", rg: "Priorat &middot; 2019", pr: "21" },
  { nm: "Smoked Negroni", rg: "Gin, Campari, barrel vermouth", pr: "20" },
];

export default function Cellar() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".cel-eyebrow", { y: 18, autoAlpha: 0, duration: 0.8 })
        .from(".cel-line-inner", { yPercent: 110, duration: 1.1, stagger: 0.12 }, "-=0.4")
        .from(".cel-lead", { y: 18, autoAlpha: 0, duration: 0.8 }, "-=0.7")
        .from(".cel-vlabel", { autoAlpha: 0, x: 14, duration: 0.8 }, "-=0.6")
        .from(".cel-glow", { autoAlpha: 0, scale: 0.7, duration: 1.4, ease: "power2.out" }, 0);

      // Pinned horizontal scroll
      const track = el.querySelector<HTMLElement>(".cel-track");
      if (track) {
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".cel-hscroll",
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.from(".cel-pour", {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: { trigger: ".cel-pours", start: "top 75%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={`cel ${playfair.variable} ${manrope.variable}`}>
      <BodyBg color="#11241c" />
      <ChooserLink />

      <nav className="cel-nav">
        <span className="cel-brand">MERIDIAN</span>
        <div className="cel-nav-links">
          <a href="#cellar">The Cellar</a>
          <a href="#pours">Pours</a>
          <a href="#visit">Visit</a>
        </div>
      </nav>

      <section className="cel-hero">
        <div className="cel-hero-bg" style={{ backgroundImage: "url(/photos/terrace.jpg)" }} />
        <div className="cel-glow" />
        <span className="cel-vlabel">Est. 1936 &middot; Cellar &amp; Bar</span>
        <div className="cel-hero-inner">
          <span className="cel-eyebrow">A wine bar that keeps late hours</span>
          <h1 className="cel-title">
            <span className="cel-line-mask"><span className="cel-line-inner">Low light,</span></span>
            <span className="cel-line-mask"><span className="cel-line-inner">long pours,</span></span>
            <span className="cel-line-mask"><span className="cel-line-inner">and <em>good company</em></span></span>
          </h1>
          <p className="cel-lead">
            Down a few steps off the street, Meridian is a candlelit room of old
            bottles and small plates - open until the last guest is ready to leave.
          </p>
        </div>
      </section>

      <section className="cel-hscroll" id="cellar">
        <div className="cel-track">
          <div className="cel-intro">
            <h2>Step down into the cellar</h2>
            <p>Scroll through the room - the bar, the back stacks, and the plates
              that keep people lingering past midnight.</p>
          </div>
          {panels.map((p) => (
            <figure className="cel-panel" key={p.src}>
              <img src={p.src} alt={p.t} />
              <figcaption className="cel-panel-cap">
                <span className="k">{p.k}</span>
                <span className="t">{p.t}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="cel-pours" id="pours">
        <h2>On the list tonight</h2>
        {pours.map((p) => (
          <div className="cel-pour" key={p.nm}>
            <span className="nm">
              {p.nm}
              <span className="rg" dangerouslySetInnerHTML={{ __html: p.rg }} />
            </span>
            <span className="dot" />
            <span className="pr">{p.pr}</span>
          </div>
        ))}
      </section>

      <footer className="cel-footer" id="visit">
        <span>155 East 56th Street, New York</span>
        <span>Open nightly until 2am</span>
        <span>&copy; 2026 Meridian Cellar</span>
      </footer>
    </div>
  );
}
