import { motion } from "framer-motion";
import { BakedTextImageCard } from "@/components/public/BakedTextImageCard";
import { SectionContainer } from "@/components/public/SectionContainer";

const breakthroughCards = [
  {
    title: "Increased income from coffee processing",
    imageUrl: "/system1.png",
    imageAlt: "Increased income from coffee processing",
  },
  {
    title: "Renewable household energy",
    imageUrl: "/system2.png",
    imageAlt: "Renewable household energy",
  },
  {
    title: "Clean cooking fuel",
    imageUrl: "/bloom-unit2.png",
    imageAlt: "Clean cooking fuel",
  },
  {
    title: "Regenerated soil nutrients",
    imageUrl: "/system4.png",
    imageAlt: "Regenerated soil nutrients",
  },
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
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">THE IDEA</p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">THE BREAKTHROUGH</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-bloomDarkCoffee md:text-4xl">Unlocking the Third Harvest</h3>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              <p>The 3rd Harvest initiative is built around a simple idea:</p>
              <p>
                A single coffee crop can generate multiple forms of value when the right infrastructure exists within coffee communities.
              </p>
              <p>Solar energy powers small-scale coffee processing at the household or community level.</p>
              <p>Coffee pulp produced during processing becomes a feedstock for biogas generation.</p>
              <p>The digestion process produces nutrient-rich organic matter that returns to the soil.</p>
            </div>

            <p className="mt-6 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              Through this circular model, a single coffee crop can generate:
            </p>
            <p className="text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              Declining renewable energy costs now make it possible to deploy these productive systems directly within coffee-producing communities.
            </p>
            <p className="mt-3 font-serif text-2xl text-bloomGreen md:text-3xl">This is the Third Harvest.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4" data-testid="breakthrough-cards-grid">
            {breakthroughCards.map((card) => (
              <BakedTextImageCard
                key={card.title}
                imageUrl={card.imageUrl}
                imageAlt={card.imageAlt}
                title={card.title}
                ratio="2:3"
              />
            ))}
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
};
