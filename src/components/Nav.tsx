"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide on the way down, reveal on the way up - but never near the top.
      setHidden(y > last.current && y > 320);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`nav${scrolled ? " is-scrolled" : ""}${hidden && !open ? " is-hidden" : ""}`}
      >
        <a href="#top" className="nav-brand">
          {site.brand}
        </a>

        <nav className="nav-links">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#reserve" className="btn btn-gold nav-cta">
          Reserve
        </a>

        <button
          className="nav-toggle"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`nav-overlay${open ? " is-open" : ""}`}>
        <button
          className="nav-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        {site.nav.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
