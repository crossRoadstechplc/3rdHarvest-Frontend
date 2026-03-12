import { motion } from "framer-motion";
import { Coffee, Leaf, Sun, Zap } from "lucide-react";
import { SectionContainer } from "@/components/public/SectionContainer";

const systemSteps = [
  { label: "Sun", icon: Sun },
  { label: "Coffee Processing", icon: Coffee },
  { label: "Household Energy", icon: Zap },
  { label: "Soil Regeneration", icon: Leaf },
];

export const TheSystemSection = () => {
  return (
    <section id="the-system" className="bloom-soft-section py-24 md:py-28">
      <SectionContainer size="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4 text-left md:text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">THE CIRCULAR SYSTEM</p>
            <h2 className="text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">Productive Energy at the First Mile</h2>
            <p className="mx-auto max-w-4xl text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              The 3rd Harvest model connects energy, agriculture, and livelihoods through a circular system.
            </p>
          </div>

          <div className="bloom-panel p-5 md:p-7 gap-4 flex-e" data-testid="system-diagram">
            <div className="grid gap-4 md:grid-cols-4">
              {systemSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="relative rounded-xl border border-black/10 bg-bloomBeige px-4 py-5 text-center">
                    <Icon className="mx-auto mb-3 h-5 w-5 text-bloomGreen" aria-hidden="true" />
                    <p className="text-sm font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee">{step.label}</p>
                    {index < systemSteps.length - 1 ? (
                      <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-bloomGold" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="bloom-panel space-y-5 p-6 md:p-8">
              <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
                Rather than producing waste, each stage of the system generates additional value for households and farms.
              </p>
              <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
                By placing productive infrastructure within coffee communities, the first mile becomes a place where:
              </p>
              <ul className="space-y-3 text-base leading-relaxed text-bloomDarkCoffee/85 md:text-lg">
                <li>• Energy access improves household resilience</li>
                <li>• Agricultural productivity increases</li>
                <li>• Rural livelihoods expand</li>
              </ul>
            </div>
          </div>

        </motion.div>
      </SectionContainer>
    </section>
  );
};
