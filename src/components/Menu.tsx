"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";

export default function Menu() {
  const [active, setActive] = useState<string>(site.menu.tabs[0].id);
  const tab = site.menu.tabs.find((t) => t.id === active) ?? site.menu.tabs[0];

  return (
    <section id="menu" className="section menu">
      <div className="section-head">
        <span className="eyebrow">{site.menu.eyebrow}</span>
        <SplitHeading text={site.menu.heading} />
      </div>

      <Reveal>
        <div className="menu-tabs" role="tablist">
          {site.menu.tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.id === active}
              className={`menu-tab${t.id === active ? " is-active" : ""}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* key={active} remounts the list so the stagger replays on every tab. */}
      <div className="menu-list" key={active}>
        {tab.items.map((item, i) => (
          <div
            className="menu-item"
            key={item.name}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="mi-main">
              <span className="mi-name">{item.name}</span>
              <span className="mi-desc">{item.desc}</span>
            </div>
            <span className="mi-price">{item.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
