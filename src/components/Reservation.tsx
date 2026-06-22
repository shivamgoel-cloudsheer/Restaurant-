import { site } from "@/lib/content";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import Magnetic from "./Magnetic";

export default function Reservation() {
  const r = site.reserve;
  return (
    <section id="reserve" className="section reserve">
      <div>
        <div className="section-head" style={{ marginBottom: "0" }}>
          <span className="eyebrow">{r.eyebrow}</span>
          <SplitHeading text={r.heading} />
        </div>
        <Reveal>
          <p className="reserve-body">{r.body}</p>
          <div className="reserve-actions">
            <Magnetic>
              <a href={`tel:${r.phone.replace(/[^0-9+]/g, "")}`} className="btn btn-gold">
                Call to Book
              </a>
            </Magnetic>
            <Magnetic>
              <a href={`mailto:${r.email}`} className="btn btn-ghost">
                Email Us
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      <Reveal className="reserve-panel" delay={0.1}>
        <h3>Hours</h3>
        {r.hours.map((h) => (
          <div className="reserve-row" key={h.day}>
            <span>{h.day}</span>
            <span>{h.time}</span>
          </div>
        ))}
        <div className="reserve-contact">
          {r.address.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <a href={`tel:${r.phone.replace(/[^0-9+]/g, "")}`} className="link-underline">
            {r.phone}
          </a>
          <a href={`mailto:${r.email}`} className="link-underline">
            {r.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
