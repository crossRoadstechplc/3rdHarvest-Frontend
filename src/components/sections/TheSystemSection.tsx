import { motion } from "framer-motion";
import { Coffee, Cog, Leaf, Shovel, Sun, Zap } from "lucide-react";
import { SectionContainer } from "@/components/public/SectionContainer";

const systemNarratives = [
  {
    id: "bloom-solar",
    label: "Solar Power System",
    title: "Solar Power System",
    imageUrl: "/solar.png",
    imageAlt: "Solar panels powering a unit for Woman Beneficiaries in an Ethiopian coffee community",
    icon: Sun,
    iconShellClass: "bg-gradient-to-br from-bloomGold to-bloomGold/70",
    iconClass: "text-bloomDarkCoffee",
    accentGlowClass: "bg-bloomGold/5 group-hover:bg-bloomGold/10",
    body: "A reliable renewable energy source powering the entire unit for women beneficiaries, ensuring uninterrupted coffee processing and household electricity free of the grid or costly diesel generators",
    bullets: [
      "Solar clean energy dedicated to coffee processing and household needs.",
      "Reduces operating costs and eliminates fuel price volatility.",
      "Enables evening lighting and phone charging for teams of women beneficiaries and their families.",
      "Cuts carbon emissions and aligns with national clean-energy goals.",
    ],
  },
  {
    id: "bloom-pulper",
    label: "Motorized Coffee Pulper",
    title: "Motorized Coffee Pulper",
    imageUrl: "/bloom-unit3.png",
    imageAlt: "Motorized coffee pulper in operation at a Woman Beneficiaries site",
    icon: Cog,
    iconShellClass: "bg-gradient-to-br from-bloomBrown to-bloomBrown/70",
    iconClass: "text-bloomBeige",
    accentGlowClass: "bg-bloomGold/5 group-hover:bg-bloomGold/10",
    body: "A modern pulping machine that reduces labor by over 70%, improves coffee quality, and unlocks access to washed-coffee markets, increasing earnings for teams of woman beneficiaries.",
    bullets: [
      "Reduces women’s physical workload by more than 70% compared to natural cherry production.",
      "Processes significantly more volume in less time, especially during peak harvest.",
      "Improves consistency of dried coffee by reducing defects and increasing coffee quality.",
      "Enables women to offer pulping as a paid service to neighboring farmers.",
    ],
  },
  {
    id: "bloom-biogas",
    label: "Biogas Waste-to-Energy",
    title: "Biogas Waste-to-Energy System",
    imageUrl: "/bloom-unit2.png",
    imageAlt: "Biogas digester tank and waste-to-energy system connected to a Woman Beneficiaries unit",
    icon: Leaf,
    iconShellClass: "bg-gradient-to-br from-bloomGreen to-bloomGreen/70",
    iconClass: "text-bloomBeige",
    accentGlowClass: "bg-bloomGreen/5 group-hover:bg-bloomGreen/10",
    body: "An eco-friendly system that turns coffee pulp waste into biogas for clean cooking, reducing deforestation, protecting women’s health, and creating a unique and pioneering exercise in circular energy cycle.",
    bullets: [
      "Uses coffee pulp, a by-product of pulping, as feedstock for biogas.",
      "Replaces firewood and charcoal, reducing deforestation and smoke exposure.",
      "Provides reliable, smokeless cooking energy for teams of women beneficiaries and their families.",
      "Demonstrates a replicable model for climate-smart rural infrastructure.",
    ],
  },
  {
    id: "bloom-soil",
    label: "Soil Regeneration",
    title: "Soil Regeneration Cycle",
    imageUrl: "/sys.png",
    imageAlt: "Nutrient-rich organic matter returning to coffee farm soil",
    icon: Shovel,
    iconShellClass: "bg-gradient-to-br from-bloomGold to-bloomGold/70",
    iconClass: "text-bloomDarkCoffee",
    accentGlowClass: "bg-bloomGold/5 group-hover:bg-bloomGold/10",
    body: "The digestion process produces nutrient-rich organic matter (digestate) that returns to the soil, helping restore fertility and improve long-term productivity for coffee households.",
    bullets: [
      "Returns organic nutrients to coffee soils through circular system outputs.",
      "Supports improved soil structure and moisture retention over time.",
      "Strengthens long-term productivity and resilience of coffee plots.",
      "Closes the loop between coffee processing, energy, and farm regeneration.",
      "Reduces need for chemical fertilizers.",
    ],
  },
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
            

          <div className="bloom-panel p-5 md:p-7 gap-4 flex-e" data-testid="system-diagram">
            <div className="space-y-4 text-left pl-8">
            <p className="text-xl font-semibold uppercase tracking-[0.16em] text-bloomGold text-left">THE CIRCULAR SYSTEM</p>
            <h2 className="text-4xl leading-tight text-bloomDarkCoffee md:text-5xl text-left">Productive Energy at the First Mile</h2>
            <p className="w-full mx-auto text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg text-left">
              The 3rd Harvest model connects energy, agriculture, and livelihoods through a circular system.
            </p>
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

          <div className="mt-16 space-y-20" data-testid="system-narrative-blocks">
            {systemNarratives.map((item, index) => {
              const Icon = item.icon;
              const imageFirst = index % 2 === 0;

              return (
                <div key={item.id} id={item.id} className="grid items-center gap-10 lg:grid-cols-2">
                  <div className={`${imageFirst ? "order-1" : "order-1 lg:order-2"} relative overflow-hidden rounded-3xl shadow-2xl group`}>
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className="h-[320px] w-full object-contain transition-transform duration-700 group-hover:scale-105 md:h-[420px] lg:h-[460px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bloomDarkCoffee/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">{item.label}</div>
                  </div>

                  <div className={`${imageFirst ? "order-2" : "order-2 lg:order-1"} bloom-card relative overflow-hidden group`}>
                    <div className={`absolute top-0 right-0 h-32 w-32 rounded-full blur-2xl transition-colors duration-500 ${item.accentGlowClass}`} />
                    <div className="relative z-10">
                      <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-xl shadow-lg ${item.iconShellClass}`}>
                        <Icon className={`h-8 w-8 ${item.iconClass}`} />
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-bloomGreen">{item.title}</h3>
                      <p className="mb-4 leading-relaxed text-foreground">{item.body}</p>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/90 md:text-base">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
};
