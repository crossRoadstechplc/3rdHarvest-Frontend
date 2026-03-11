import { BloomNav } from "@/components/BloomNav";
import { Hero } from "@/components/Hero";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Footer } from "@/components/Footer";

import { TheIdeaSection } from "@/components/sections/TheIdeaSection";
import { TheSystemSection } from "@/components/sections/TheSystemSection";
import { ProudCoffeeWomenSection } from "@/components/sections/ProudCoffeeWomenSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { DeploymentsSection } from "@/components/sections/DeploymentsSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { InsightsPreviewSection } from "@/components/sections/InsightsPreviewSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Home = () => {
  return (
    <main className="min-h-screen bg-background relative selection:bg-bloomGold/30 selection:text-white">
      <LoadingScreen />
      <BloomNav />
      <Hero />
      <TheIdeaSection />
      <TheSystemSection />
      <ProudCoffeeWomenSection />
      <ImpactSection />
      <DeploymentsSection />
      <PartnersSection />
      {/* <InsightsPreviewSection /> */}
      <NewsletterSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Home;
