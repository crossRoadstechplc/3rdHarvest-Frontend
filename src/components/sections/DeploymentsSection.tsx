import { motion } from "framer-motion";
import { SectionContainer } from "@/components/public/SectionContainer";

export const DeploymentsSection = () => {
  return (
    <section id="deployments" className="bloom-soft-section py-24 md:py-28">
      <SectionContainer size="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]"
          data-testid="deployments-layout"
        >
          <div className="space-y-5">
            <p className="text-xl font-semibold uppercase tracking-[0.16em] text-bloomGold">DEPLOYMENTS</p>
            <h2 className="text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">Early Deployments</h2>

            <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              3rd Harvest systems are being introduced in coffee-producing communities through pilot deployments and partner collaborations.
            </p>
            <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              These early deployments demonstrate how integrated productive systems can strengthen coffee communities while improving environmental outcomes.
            </p>
            <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              As the initiative expands, additional deployments will be developed across coffee-producing regions.
            </p>
          </div>

          <div className="bloom-panel overflow-hidden rounded-[18px] p-2">
            <img src="/hero1.png" alt="Early deployments in coffee-producing communities" className="h-[320px] w-full rounded-[14px] object-cover md:h-[420px]" />
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
};
