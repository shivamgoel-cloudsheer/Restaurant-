import Link from "next/link";

/**
 * Small fixed pill that returns to the template chooser. Rendered on every
 * template so you can hop between concepts. Theme-neutral inline styles.
 */
export default function ChooserLink() {
  return (
    <Link
      href="/"
      style={{
        position: "fixed",
        bottom: "1.1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 8800,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5em",
        padding: "0.6em 1.2em",
        borderRadius: "100px",
        background: "rgba(10,10,12,0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.18)",
        color: "#f3ede1",
        fontFamily: "system-ui, sans-serif",
        fontSize: "0.7rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        textDecoration: "none",
      }}
    >
      &larr; All Templates
    </Link>
  );
}
