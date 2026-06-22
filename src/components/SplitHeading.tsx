"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Renders a section title whose words rise up from behind a mask, one after
 * another, the first time the heading scrolls into view.
 */
export default function SplitHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".sh-word"), {
        yPercent: 120,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
    return () => ctx.revert();
  }, [text]);

  return (
    <h2 ref={ref} className={`section-title${className ? ` ${className}` : ""}`}>
      {text.split(" ").map((word, i) => (
        <span className="sh-line" key={i}>
          <span className="sh-word">{word}</span>
        </span>
      ))}
    </h2>
  );
}
