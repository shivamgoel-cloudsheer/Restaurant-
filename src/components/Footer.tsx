import { site } from "@/lib/content";

export default function Footer() {
  const year = "2026"; // static so the build stays deterministic; update as needed

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="display">{site.brand}</div>
          <p>{site.footer.note}</p>
        </div>

        {site.footer.columns.map((col) => (
          <div className="footer-col" key={col.title}>
            <h4>{col.title}</h4>
            {col.links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-wordmark" aria-hidden>
        {site.brand}
      </div>

      <div className="footer-bottom">
        <span>
          &copy; {year} {site.brand}. {site.tagline}.
        </span>
        <span>Placeholder build - swap copy and photography in src/lib/content.ts</span>
      </div>
    </footer>
  );
}
