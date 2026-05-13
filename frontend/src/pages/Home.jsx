import Banner from "../components/home/Banner";
import Services from "../components/home/Services";
import Industries from "../components/home/Industries";
import SuccessStories from "../components/home/SuccessStories";
import NeedSection from "../components/home/NeedSection";
import AgileProcess from "../components/home/AgileProcess";
// import ContactSection from "../components/home/ContactSection";
import ReadySection from "../components/home/ReadySection";
import FaqSection from "../components/home/FaqSection";

export default function Home() {
  return (
    <main>
      <Banner />
      <Services />
      <Industries />
      <SuccessStories />
      <NeedSection />
      <AgileProcess />
      {/* <ContactSection /> */}
      <ReadySection />
      <FaqSection />
    </main>
  );
}
