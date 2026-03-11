import { motion } from "framer-motion";
import { SectionContainer } from "@/components/public/SectionContainer";

export const ProudCoffeeWomenSection = () => {
  return (
    <>
      <section className="bg-background py-24 md:py-28">
        <SectionContainer size="wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]"
            data-testid="household-layout"
          >
            <div className="bloom-panel overflow-hidden rounded-[18px] p-2">
              <img src="/pcw.jpg" alt="Women in coffee-producing communities" className="h-[380px] w-full rounded-[14px] object-contain md:h-[560px]" />
            </div>

            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">HOUSEHOLD TRANSFORMATION</p>
              <h2 className="text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">Women, Health, and Opportunity</h2>

              <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
                Women play a central role in coffee production and household life across many coffee communities.
              </p>
              <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
                They contribute significantly to harvesting, sorting, and handling coffee while also managing many of the daily activities that sustain family life.
              </p>
              <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
                Traditional cooking methods that rely on firewood create significant time burdens and health risks in many rural areas.
              </p>
              <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
                Indoor smoke exposure particularly affects mothers and young children.
              </p>
              <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
                By enabling access to clean cooking energy and productive infrastructure, the 3rd Harvest initiative helps reduce these burdens while expanding economic opportunities.
              </p>
              <p className="text-base leading-relaxed text-bloomGreen md:text-lg">
                Women and youth can participate directly in managing and benefiting from these systems, strengthening both livelihoods and community resilience.
              </p>
            </div>
          </motion.div>
        </SectionContainer>
      </section>

      <section id="pcw" className="bloom-soft-section py-24 md:py-28">
        <SectionContainer size="wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bloom-panel overflow-hidden"
          >
            <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 md:p-9 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">PROUD COFFEE WOMEN</p>
                <h2 className="mt-3 text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">A Label for Community-Centered Coffee</h2>

                <div className="mt-6 space-y-5 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
                  <p>The Proud Coffee Women (PCW) label is connected to the 3rd Harvest initiative.</p>
                  <p>
                    It identifies coffee produced within communities where circular coffee systems support stronger livelihoods, healthier households, and more sustainable landscapes.
                  </p>
                  <p>
                    Coffee companies participating in the initiative may associate their engagement with the PCW label, signaling participation in coffee production systems that strengthen communities at the first mile of the supply chain.
                  </p>
                </div>
              </div>

              <div className="min-h-[280px] lg:min-h-full">
                <img src="/hero0.webp" alt="Proud Coffee Women label communities" className="h-full w-full object-cover" />
              </div>
            </div>
          </motion.div>
        </SectionContainer>
      </section>
    </>
  );
};
