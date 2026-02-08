import Hero from "../Components/Hero";
import StatsBar from "../Components/StatsBar";
import AboutPreview from "../Components/AboutPreview";
import Services from "../Components/Services";
import FeaturedProjects from "../Components/FeaturedProjects";
import Philosophy from "../Components/Philosophy";
import Testimonials from "../Components/Testimonials";
import Cta from "../Components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutPreview />
      <Services />
      <FeaturedProjects />
      <Philosophy />
      <Testimonials />
      <Cta />
    </>
  );
}
