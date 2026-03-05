import { BloomNav } from "@/components/BloomNav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { LoadingScreen } from "@/components/LoadingScreen";
import { BloomUnit } from "@/components/BloomUnit";
import { Teams } from "@/components/Teams";
import { Impact } from "@/components/Impact";
import { Implementation } from "@/components/Implementation";
import { Vision } from "@/components/Vision";
import { Footer } from "@/components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      <LoadingScreen />
      <BloomNav />
      <Hero />
      <About />
      <BloomUnit />
      <Teams />
      <Impact />
      <Implementation />
      <Vision />
      <Footer />
    </main>
  );
};

export default Home;
