import { site } from "@/lib/content";

/**
 * Infinite gold-dotted ticker. The list is doubled so the CSS translateX(-50%)
 * loop is seamless.
 */
export default function Marquee() {
  const row = [...site.marquee, ...site.marquee];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((text, i) => (
          <span key={i}>
            {text}
            <i className="dot">&#10038;</i>
          </span>
        ))}
      </div>
    </div>
  );
}
