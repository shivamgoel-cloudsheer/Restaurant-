import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Story from "@/components/Story";
import Showcase from "@/components/Showcase";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Reservation from "@/components/Reservation";
import ScallopDivider from "@/components/ScallopDivider";
import Footer from "@/components/Footer";
import ChooserLink from "@/components/ChooserLink";

/** Template 1 - Noir: dark Art-Deco supper club (the original MERIDIAN build). */
export default function NoirTemplate() {
  return (
    <>
      <Preloader />
      <ChooserLink />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Showcase />
        <Menu />
        <Gallery />
        <Reservation />
      </main>
      <ScallopDivider />
      <Footer />
    </>
  );
}
