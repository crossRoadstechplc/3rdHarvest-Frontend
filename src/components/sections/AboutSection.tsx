import { motion } from "framer-motion";
import { SectionContainer } from "@/components/public/SectionContainer";

export const AboutSection = () => {
  return (
    <section id="about" className="bg-background py-24 md:py-28">
      <SectionContainer size="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bloom-panel mx-auto max-w-4xl p-6 text-center md:p-9"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">ABOUT</p>
          <div className="mt-5 space-y-5 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
            <p>
              3rd Harvest is an initiative focused on strengthening the first mile of coffee through circular systems that connect renewable energy, coffee processing, and soil regeneration.
            </p>
            <p>
              The initiative works with partners across the coffee ecosystem to introduce productive infrastructure within coffee-producing communities.
            </p>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
};
