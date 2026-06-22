"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drop-in scroll reveal: fades and lifts its children into view the first time
 * they cross into the viewport. Compose freely around any block of markup.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 44,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
