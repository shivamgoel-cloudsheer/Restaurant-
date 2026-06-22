import Link from "next/link";
import "./chooser.css";

type Tpl = {
  n: string;
  slug: string;
  word: string;
  name: string;
  desc: string;
  traits: string[];
  bg: string;
  wordColor: string;
  accent: string;
  wordFont: string;
  dark?: boolean;
};

const templates: Tpl[] = [
  {
    n: "01",
    slug: "noir",
    word: "MERIDIAN",
    name: "Noir",
    desc: "Dark Art-Deco supper club. Low light, antique gold, layered parallax and a curtain-lift intro.",
    traits: ["Ink + Gold", "Cormorant serif", "Parallax + preloader"],
    bg: "radial-gradient(120% 120% at 30% 20%, #1c1812, #0a0a0b)",
    wordColor: "#c2a35a",
    accent: "#c2a35a",
    wordFont: "var(--font-cormorant), serif",
  },
  {
    n: "02",
    slug: "atelier",
    word: "Atelier",
    name: "Atelier",
    desc: "Bright editorial minimalism. Generous whitespace, hairline rules, slow and confident fades.",
    traits: ["Cream + Ink", "Fraunces serif", "Slow line reveals"],
    bg: "linear-gradient(135deg, #f5f2eb, #e7e1d4)",
    wordColor: "#191917",
    accent: "#b08d57",
    wordFont: "var(--font-cormorant), serif",
    dark: true,
  },
  {
    n: "03",
    slug: "cellar",
    word: "Cellar",
    name: "Cellar",
    desc: "Moody candlelit wine bar. Deep green and oxblood, warm glow, a side-scrolling cellar gallery.",
    traits: ["Forest + Amber", "Playfair serif", "Horizontal scroll"],
    bg: "linear-gradient(135deg, #11241c, #2c1014)",
    wordColor: "#d9a066",
    accent: "#d9a066",
    wordFont: "var(--font-cormorant), serif",
  },
  {
    n: "04",
    slug: "maison",
    word: "Maison",
    name: "Maison",
    desc: "Warm Mediterranean trattoria. Terracotta and olive, arched imagery, a slowly rotating seal.",
    traits: ["Terracotta + Cream", "DM Serif", "Arches + spinning badge"],
    bg: "linear-gradient(135deg, #c4622d, #9f4820)",
    wordColor: "#f5ecdb",
    accent: "#f5ecdb",
    wordFont: "var(--font-cormorant), serif",
  },
  {
    n: "05",
    slug: "brut",
    word: "BRUT",
    name: "Brut",
    desc: "Brutalist kinetic monochrome. Oversized type, a hard grid, text-scramble and marquee motion.",
    traits: ["Mono + Red", "Anton display", "Kinetic type"],
    bg: "repeating-linear-gradient(45deg, #0f0f0f, #0f0f0f 14px, #141414 14px, #141414 28px)",
    wordColor: "#ff3b00",
    accent: "#ff3b00",
    wordFont: "var(--font-jost), sans-serif",
  },
];

export default function Chooser() {
  return (
    <main className="chooser">
      <header className="ch-head">
        <p className="ch-kicker">Meridian &middot; Design Studio</p>
        <h1 className="ch-title">Five Home-Page Directions</h1>
        <p className="ch-sub">
          One restaurant, five distinct concepts - each with its own palette,
          typography, layout, and motion language. Open any of them, then tell me
          which direction to take further.
        </p>
      </header>

      <div className="ch-grid">
        {templates.map((t) => (
          <Link key={t.slug} href={`/${t.slug}`} className="ch-card">
            <div className="ch-preview" style={{ background: t.bg }}>
              <span
                className="ch-word"
                style={{
                  color: t.wordColor,
                  fontFamily: t.wordFont,
                  fontWeight: t.slug === "brut" ? 600 : 400,
                  textTransform: t.slug === "brut" ? "uppercase" : "none",
                  letterSpacing: t.slug === "brut" ? "0.12em" : "0.04em",
                }}
              >
                {t.word}
              </span>
              <span className="ch-accent-line" style={{ background: t.accent }} />
            </div>

            <div className="ch-body">
              <span className="ch-num">TEMPLATE {t.n}</span>
              <span className="ch-name">{t.name}</span>
              <span className="ch-desc">{t.desc}</span>
              <div className="ch-traits">
                {t.traits.map((tr) => (
                  <span className="ch-trait" key={tr}>
                    {tr}
                  </span>
                ))}
              </div>
              <span className="ch-view" style={{ color: t.accent }}>
                View template <span>&rarr;</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="ch-footnote">
        Placeholder imagery and copy throughout - everything is swappable in one
        config per template.
      </p>
    </main>
  );
}
