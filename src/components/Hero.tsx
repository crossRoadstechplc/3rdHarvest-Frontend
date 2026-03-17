import { motion } from "framer-motion";
import { useState } from "react";
import { PublicButton } from "@/components/public/PublicButton";
import { SectionContainer } from "@/components/public/SectionContainer";

export const Hero = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const heroImages = [
    { src: "/hero2.webp", alt: "Coffee-producing community scene 1" },
    { src: "/hero0.webp", alt: "Coffee-producing community scene 2" },
    { src: "/hero3.png", alt: "Coffee-producing community scene 3" },
  ];

  const activeCard = hoveredCard ?? 1;

  const scrollToIdea = () => {
    document.getElementById("the-idea")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="bg-background pb-16 pt-30 md:pb-20 md:pt-36">
      <SectionContainer size="wide">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-18">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:max-w-[760px]"
          >
            <h1 className="text-4xl leading-tight text-bloomDarkCoffee md:text-5xl lg:text-6xl">
              Unlocking Multiple Harvests from a Single Coffee Crop
            </h1>

            <p className="max-w-3xl text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              Coffee&rsquo;s journey begins long before it reaches exporters, roasters, and consumers. It begins in the farms and households of coffee-producing communities, the first mile of coffee.
              <br />
              Yet this is where one of the greatest opportunities for change exists.
              <br />
              Across many producing regions, families cultivate the crop but lack access to the productive infrastructure needed to capture its full value.
              <br />
              The 3rd Harvest initiative focuses on transforming this first mile by enabling communities to unlock new sources of value from the coffee they already grow.
            </p>

            <p className="font-serif text-2xl text-bloomGreen md:text-3xl">Coffee. Energy. Soil.</p>

            <div className="flex flex-wrap gap-3.5 sm:gap-4">
              <PublicButton type="button" onClick={scrollToIdea}>
                Learn About the Initiative
              </PublicButton>
              <PublicButton type="button" variant="secondary" onClick={scrollToContact}>
                Partner With 3rd Harvest
              </PublicButton>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            <div className="overflow-hidden rounded-[18px] border border-black/10 bg-white p-2 shadow-[0_18px_42px_rgba(30,30,30,0.14)] lg:hidden">
              <img src={heroImages[1].src} alt={heroImages[1].alt} className="h-[320px] w-full rounded-[14px] object-cover sm:h-[420px]" />
            </div>

            <div className="relative hidden h-[700px] xl:h-[760px] lg:block" onMouseLeave={() => setHoveredCard(null)}>
              {heroImages.map((image, index) => {
                const isActive = index === activeCard;
                const offsetClass =
                  index === 0
                    ? "-rotate-[8deg] left-[1%] top-[12%] xl:left-[3%] xl:top-[10%]"
                    : index === 1
                      ? "rotate-0 left-[17%] top-[1%] xl:left-[18%] xl:top-[2%]"
                      : "rotate-[7deg] left-[35%] top-[14%] xl:left-[39%] xl:top-[12%]";

                return (
                  <div
                    key={image.src}
                    data-testid={`hero-card-${index}`}
                    data-active={isActive ? "true" : "false"}
                    className={`absolute w-[64%] min-w-[300px] overflow-hidden rounded-[22px] border border-black/10 bg-white p-2.5 shadow-[0_22px_52px_rgba(30,30,30,0.16)] transition-all duration-300 ${offsetClass} ${isActive ? "z-30 scale-[1.09]" : "z-10 scale-100"}`}
                    onMouseEnter={() => setHoveredCard(index)}
                  >
                    <img src={image.src} alt={image.alt} className="h-[520px] w-full rounded-[16px] object-cover xl:h-[560px]" />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
};
