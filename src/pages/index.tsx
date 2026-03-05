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
import { Vision } from "@/components/Vision";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);

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
      <Vision />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
