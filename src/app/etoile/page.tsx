"use client";

import { useEffect, useRef, useState } from "react";
import { Marcellus, Inter } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BodyBg from "@/components/BodyBg";
import ChooserLink from "@/components/ChooserLink";
import "./etoile.css";

gsap.registerPlugin(ScrollTrigger);

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const accolades = ["Two Michelin Stars", "Five AA Rosettes", "Relais & Chateaux", "World's 50 Best", "Est. 1936"];

const courses = [
  { n: "I", nm: "Cornish Crab", ds: "Granny smith, brown crab custard, oscietra caviar" },
  { n: "II", nm: "Hand-Dived Scallop", ds: "Sea vegetables, champagne and chive veloute" },
  { n: "III", nm: "Foie Gras", ds: "Quince, toasted brioche, aged Sauternes" },
  { n: "IV", nm: "Native Lobster", ds: "Bisque, tarragon, shavings of summer truffle" },
  { n: "V", nm: "Aged Beef Fillet", ds: "Bone marrow, girolles, Madeira reduction" },
  { n: "VI", nm: "From the Trolley", ds: "A selection of farmhouse cheese, walnut, honey" },
  { n: "VII", nm: "Valrhona Chocolate", ds: "Salted caramel, brown butter, milk ice cream" },
];

const gallery = [
  { src: "/photos/terrace.jpg", cap: "The terrace" },
  { src: "/photos/toast.jpg", cap: "The first course" },
  { src: "/photos/burger.jpg", cap: "The grill" },
];

export default function Etoile() {
  const root = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    const el = root.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
      tl.from(".eto-stars", { y: 18, autoAlpha: 0, duration: 0.9 })
        .from(".eto-line > span", { yPercent: 115, duration: 1.1, stagger: 0.12 }, "-=0.4")
        .from(".eto-sub", { y: 18, autoAlpha: 0, duration: 0.9 }, "-=0.7")
        .from(".eto-hero-actions", { y: 18, autoAlpha: 0, duration: 0.9 }, "-=0.7")
        .to(".eto-hero-bg", { scale: 1, duration: 2.2, ease: "power2.out" }, 0);

      gsap.to(".eto-hero-bg", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: { trigger: ".eto-hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.from(".eto-statement-media img", {
        yPercent: -10,
        scrollTrigger: { trigger: ".eto-statement", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(".eto-quote .w", {
        y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.03, ease: "power2.out",
        scrollTrigger: { trigger: ".eto-statement", start: "top 68%" },
      });

      gsap.from(".eto-course", {
        y: 32, autoAlpha: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: ".eto-menu", start: "top 72%" },
      });

      gsap.to(".eto-break-bg", {
        yPercent: 18, ease: "none",
        scrollTrigger: { trigger: ".eto-break", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(".eto-break-line", {
        autoAlpha: 0, y: 24, duration: 1,
        scrollTrigger: { trigger: ".eto-break", start: "top 65%" },
      });

      gsap.utils.toArray<HTMLElement>(".eto-g img").forEach((image, i) => {
        gsap.fromTo(image, { yPercent: -6 + i * 2 }, {
          yPercent: 6 - i * 2, ease: "none",
          scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, el ?? undefined);

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  const quote = "Perfection is lots of little things done well. We chase it from the first knife in the morning to the last plate at midnight.";
  const acc = [...accolades, ...accolades];

  return (
    <div ref={root} className={`eto ${marcellus.variable} ${inter.variable}`}>
      <BodyBg color="#0c0c0d" />
      <ChooserLink />

      <nav className={`eto-nav${scrolled ? " is-scrolled" : ""}`}>
        <span className="eto-brand">MERIDIAN</span>
        <div className="eto-nav-links">
          <a href="#menu">The Menu</a>
          <a href="#story">The Kitchen</a>
          <a href="#reserve">Visit</a>
        </div>
        <a href="#reserve" className="eto-nav-cta">Reserve</a>
      </nav>

      <header className="eto-hero">
        <div className="eto-hero-bg" style={{ backgroundImage: "url(/photos/pass.jpg)" }} />
        <div className="eto-hero-inner">
          <span className="eto-stars"><b>&#9733;&#9733;</b> Two Michelin Stars &middot; Midtown</span>
          <h1 className="eto-title">
            <span className="eto-line"><span>An obsession</span></span>
            <span className="eto-line"><span>with the perfect</span></span>
            <span className="eto-line"><span><em>plate.</em></span></span>
          </h1>
          <p className="eto-sub">
            A two-Michelin-star kitchen in the heart of New York, serving a single
            tasting menu built around the morning's best produce.
          </p>
          <div className="eto-hero-actions">
            <a href="#reserve" className="eto-btn eto-btn-gold">Reserve a Table</a>
            <a href="#menu" className="eto-btn eto-btn-ghost">The Menu Prestige</a>
          </div>
        </div>
      </header>

      <div className="eto-accolades" aria-hidden>
        <div className="eto-acc-track">
          {acc.map((a, i) => (
            <span key={i}>{a}<i>&#9733;</i></span>
          ))}
        </div>
      </div>

      <section className="eto-statement" id="story">
        <div className="eto-statement-media">
          <img src="/photos/plate.jpg" alt="A finished plate at Meridian" />
        </div>
        <div>
          <p className="eto-kicker">The Kitchen</p>
          <p className="eto-quote">
            {quote.split(" ").map((w, i) => (
              <span className="w" key={i}>{w}&nbsp;</span>
            ))}
          </p>
          <p className="eto-attrib">
            <b>Marco Meridian</b> &middot; Chef Patron
          </p>
        </div>
      </section>

      <section className="eto-menu" id="menu">
        <div className="eto-menu-head">
          <p className="eto-kicker">Le Menu Prestige</p>
          <h2 className="eto-serif">Seven Courses</h2>
          <p>165 per guest &middot; with wine pairing 110 &middot; served Tuesday to Saturday</p>
        </div>
        <div className="eto-courses">
          {courses.map((c) => (
            <div className="eto-course" key={c.n}>
              <span className="num">{c.n}</span>
              <div>
                <div className="nm">{c.nm}</div>
                <div className="ds">{c.ds}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="eto-break">
        <div className="eto-break-bg" style={{ backgroundImage: "url(/photos/atrium.jpg)" }} />
        <p className="eto-break-line eto-serif">A room ninety years in the making.</p>
      </section>

      <section className="eto-gallery">
        <div className="eto-gallery-grid">
          {gallery.map((g) => (
            <figure className="eto-g" key={g.src}>
              <img src={g.src} alt={g.cap} />
            </figure>
          ))}
        </div>
      </section>

      <section className="eto-reserve" id="reserve">
        <p className="eto-kicker">Reservations</p>
        <h2 className="eto-serif">Join Us</h2>
        <p>
          The Menu Prestige is served Tuesday through Saturday, seatings from
          six. Reservations open sixty days in advance.
        </p>
        <a href="tel:+12125551936" className="eto-btn eto-btn-gold">Reserve a Table</a>
        <div className="eto-reserve-meta">
          <span>155 East 56th Street, New York</span>
          <span>(212) 555-1936</span>
          <span>Tue - Sat, from 6:00pm</span>
        </div>
      </section>

      <footer className="eto-footer">
        <span className="eto-brand">MERIDIAN</span>
        <span>Two Michelin Stars &middot; New York</span>
        <span>&copy; 2026 Meridian</span>
      </footer>
    </div>
  );
}
