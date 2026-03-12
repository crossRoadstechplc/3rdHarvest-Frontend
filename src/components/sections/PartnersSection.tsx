import { motion } from "framer-motion";
import { PublicButton } from "@/components/public/PublicButton";
import { SectionContainer } from "@/components/public/SectionContainer";

export const PartnersSection = () => {
  const placeholderLogos = Array.from({ length: 8 }, (_, index) => `Partner ${index + 1}`);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="partners" className="bg-background py-24 md:py-28">
      <SectionContainer size="wide" className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bloom-panel p-6 md:p-8"
        >
          <p className="text-xl font-semibold uppercase tracking-[0.16em] text-bloomGold">PARTNERS</p>
          <h2 className="mt-3 text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">A Collaborative Platform</h2>

          <p className="mt-6 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
            3rd Harvest connects actors across the coffee ecosystem.
          </p>

          <p className="mt-5 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">Partners may include:</p>
          <ul className="mt-3 grid gap-3 text-base leading-relaxed text-bloomDarkCoffee/85 md:text-lg">
            <li>• Coffee companies</li>
            <li>• Foundations and philanthropic institutions</li>
            <li>• Development agencies</li>
            <li>• NGOs and civil society organizations</li>
          </ul>

          <p className="mt-6 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
            Through collaboration, the initiative enables scalable solutions for communities and supply chains.
          </p>

          <div className="mt-8">
            <PublicButton type="button" onClick={scrollToContact}>
              Become a Partner
            </PublicButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="bloom-panel p-6 md:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">ADVISORY BOARD</p>
          <div className="mt-4 space-y-3 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
            <p>
              The initiative is guided by advisors with expertise in coffee systems, renewable energy, climate, and rural development.
            </p>
            <p>(Names added as initiative grows.)</p>
          </div>
        </motion.div>
      </SectionContainer>

      <div
        className="relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden border-y border-black/10 bg-white/85 py-4"
        data-testid="partners-logo-scroller"
      >
        <div className="partners-logo-marquee-track flex w-max items-center gap-3 px-4 sm:gap-4">
          {[...placeholderLogos, ...placeholderLogos].map((label, index) => (
            <div
              key={`${label}-${index}`}
              className="flex h-14 w-36 items-center justify-center rounded-lg border border-black/10 bg-bloomBeige/70 text-[11px] font-semibold uppercase tracking-[0.08em] text-bloomDarkCoffee/55 sm:h-16 sm:w-44"
              aria-label={`${label} logo placeholder`}
              data-testid="partner-logo-placeholder"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
