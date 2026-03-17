import { motion } from "framer-motion";
import { SectionContainer } from "@/components/public/SectionContainer";
import { Coffee, Cog, Leaf, Sun, Zap } from "lucide-react";


// const breakthroughCards = [
//   {
//     title: "Renewable household energy",
//     imageUrl: "/bloom-unit1.png",
//     imageAlt: "Increased income from coffee processing",
//   },
//   {
//     title: "Solar",
//     imageUrl: "/bloom-unit3.webp",
//     imageAlt: "Renewable household energy",
//   },
//   {
//     title: "clean cooking fuel",
//     imageUrl: "/bloom-unit2.png",
//     imageAlt: "Clean cooking fuel from coffee pulp biogas",
//   },
//   {
//     title: "regenerated soil nutrients",
//     imageUrl: "/system4.png",
//     imageAlt: "Regenerated soil nutrients",
//   },
// ];
const systemSteps = [
  { label: "Sun", icon: Sun },
  { label: "Coffee Processing", icon: Coffee },
  { label: "Household Energy", icon: Zap },
  { label: "Soil Regeneration", icon: Leaf },
];

export const TheIdeaSection = () => {
  return (
    <section id="the-idea" className="bg-background py-24 md:py-28">
      <SectionContainer size="wide" className="space-y-18">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]"
          data-testid="opportunity-layout"
        >
          <div className="space-y-5">
            <p className="text-xl font-semibold uppercase tracking-[0.16em] text-bloomGold">THE IDEA</p>
            <h2 className="text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">The First Mile of Coffee</h2>

            <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              Coffee is cultivated largely by smallholder households, yet communities at the origin of the crop often capture the smallest share of its value.
            </p>
            <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              Across many coffee landscapes, farmers sell coffee cherries quickly after harvest because access to processing infrastructure or financing is limited.
            </p>
            <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              At the same time, many rural coffee regions rely heavily on firewood for cooking energy. Collecting wood places a significant burden on women and youth while contributing to pressure on surrounding forests.
            </p>
            <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              These challenges reflect a structural gap: the absence of productive infrastructure and clean energy systems at the first mile of coffee.
            </p>
            <p className="text-base leading-relaxed text-bloomGreen md:text-lg">
              3rd Harvest addresses this gap by enabling integrated systems that connect coffee production, renewable energy, and regenerative agriculture.
            </p>
          </div>

          <div className="bloom-panel overflow-hidden rounded-[18px] p-2">
            <img src="/impact.webp" alt="Coffee first mile opportunity" className="h-[360px] w-full rounded-[14px] object-cover md:h-[520px]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="space-y-6"
          data-testid="breakthrough-layout"
        >
          <div className="bloom-panel p-6 md:p-8">
            <p className="text-xl font-semibold uppercase tracking-[0.16em] text-bloomGold">THE BREAKTHROUGH</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-bloomDarkCoffee md:text-4xl">Unlocking the 3rd Harvest</h3>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              <p>The 3rd Harvest initiative is built around a simple idea:</p>
              <p>
                A single coffee crop can generate multiple forms of value when the right infrastructure exists within coffee communities.
              </p>
              <p> Solar energy powers small-scale coffee processing at the household or community level, this is the <strong>1st Harvest</strong>, where farmers move up the value chain and earn more from their coffee.</p>
              <p>Coffee pulp produced during processing becomes a feedstock for biogas generation, this is the <strong>2nd Harvest</strong>, transforming waste into renewable energy and clean cooking fuel.</p>
              <p>The digestion process produces nutrient-rich organic matter that returns to the soil, this is the <strong>3rd Harvest</strong>, restoring soil fertility and strengthening future production.</p>
            </div>

            <p className="mt-6 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              Through this circular model, a single coffee crop can generate:
            </p>
            <ul>
              <li>•  Increased income from coffee processing</li>
              <li>•  Renewable household energy</li>
              <li>•  Clean cooking fuel</li>
              <li>•  Regenerative soil nutrients</li>
            </ul>
            <br />
            <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              Declining renewable energy costs now make it possible to deploy these productive systems directly within coffee-producing communities.
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
          </div>
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 lg:gap-6" data-testid="breakthrough-cards-grid">
            {breakthroughCards.map((card) => (
              <BakedTextImageCard
                key={card.title}
                imageUrl={card.imageUrl}
                imageAlt={card.imageAlt}
                title={card.title}
                ratio="2:3"
                className="h-full"
              />
            ))}
          </div> */}
        </motion.div>
      </SectionContainer>
    </section>
  );
};
