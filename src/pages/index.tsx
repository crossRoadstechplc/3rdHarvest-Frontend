import { BloomNav } from "@/components/BloomNav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Mission } from "@/components/Mission";
import { BloomUnit } from "@/components/BloomUnit";
import { Teams } from "@/components/Teams";
import { Impact } from "@/components/Impact";
import { Implementation } from "@/components/Implementation";
import { PCW } from "@/components/PCW";
import { Story } from "@/components/Story";
import { Partners } from "@/components/Partners";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <LoadingScreen />
      <BloomNav />
      <Hero />
      <About />
      {/* <Mission /> */}
      <BloomUnit />
      <Teams />
      <Impact />
      <Implementation />
      <PCW />
      {/* <Story /> */}
      <Partners />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
