import { motion } from "framer-motion";
import { LogoStripShell } from "@/components/public/LogoStripShell";
import { PublicButton } from "@/components/public/PublicButton";
import { SectionContainer } from "@/components/public/SectionContainer";

export const PartnersSection = () => {
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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">PARTNERS</p>
          <h2 className="mt-3 text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">A Collaborative Platform</h2>

          <p className="mt-6 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
            3rd Harvest connects actors across the coffee ecosystem.
          </p>

          <p className="mt-5 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">Partners may include:</p>
          <ul className="mt-3 grid gap-3 text-base leading-relaxed text-bloomDarkCoffee/85 md:text-lg">
            <li>• coffee companies</li>
            <li>• foundations and philanthropic institutions</li>
            <li>• development agencies</li>
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

        <LogoStripShell className="py-0" title="">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-12 w-[45%] max-w-[140px] min-w-[120px] rounded-lg border border-black/10 bg-bloomBeige/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:h-14 sm:w-[30%] md:h-16 md:w-32"
              aria-label={`Partner logo placeholder ${index + 1}`}
              data-testid="partner-logo-placeholder"
            />
          ))}
        </LogoStripShell>

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
    </section>
  );
};
