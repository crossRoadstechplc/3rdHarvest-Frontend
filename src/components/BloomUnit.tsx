import { Sun, Cog, Leaf, Factory, RefreshCcw, Cylinder } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

export const BloomUnit = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <section id="model" className="bg-white relative overflow-hidden py-32">
      {/* Top Gold Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bloomGold to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-bloomGold/10 border border-bloomGold/20 text-bloomGold text-xs font-bold uppercase tracking-[0.2em]">
            Technical Framework
          </div>
          <h2 className="section-title">THE MODEL</h2>
          <p className="section-subtitle mx-auto max-w-4xl">
            The Third Harvest architecture transitions coffee-producing communities from raw material providers to value-added enterprises through a decentralized technical ecosystem.
          </p>

          {/* Technical Pillars Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { icon: Factory, title: "Decentralized Washing", text: "TriveraPro integrates solar-powered pulping and inverter-driven processing equipment that enables local operators to offer washed coffee services, capturing the ~30% value premium typically reserved for commercial aggregators." },
              { icon: Sun, title: "Renewable Integration", text: "Solar and inverter components are integrated within the broader TriveraPro system architecture, providing reliable electricity for coffee processing and household use in off-grid rural communities." },
              { icon: Cylinder, title: "Biomass Conversion", text: "Waste grinding technology feeds biogas conversion tanks that transform coffee pulp into clean cooking gas, reducing wood fuel consumption and respiratory health risks while providing year-round energy access." },
              { icon: RefreshCcw, title: "Soil Regeneration", text: "The closed-loop system produces high-nutrient compost outputs returned to soil, completing the regenerative cycle and improving long-term agricultural productivity for coffee-growing communities." }
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-bloomGreen/5 shadow-sm hover:shadow-md transition-all duration-500 text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-bloomGreen/5 rounded-xl flex items-center justify-center text-bloomGreen group-hover:bg-bloomGreen group-hover:text-white transition-all duration-500">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-bloomGreen mb-2 text-sm uppercase tracking-wider">{pillar.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-40">

          {/* ================= SECOND HARVEST: VALUE ADDITION ================= */}
          <div className="space-y-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-16"
            >
              <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-bloomGold opacity-30" />
              <h3 className="text-2xl font-serif font-bold text-bloomGold italic whitespace-nowrap">
                Second Harvest: Value Addition
              </h3>
              <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-bloomGold opacity-30" />
            </motion.div>

            {/* SOLAR POWER SYSTEM */}
            <div id="bloom-solar" className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="rounded-3xl overflow-hidden shadow-2xl relative group"
              >
                <img
                  src="/bloom-unit1.png"
                  alt="Solar panels powering the Bloom Unit"
                  className="w-full h-[400px] md:h-[450px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-6 left-6 bg-black/50 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-md">
                  Renewable Energy Integration
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bloom-card relative overflow-hidden group p-12"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-bloomGold/5 rounded-full blur-3xl group-hover:bg-bloomGold/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-bloomGold to-bloomGold/70 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                    <Sun className="w-8 h-8 text-bloomDarkCoffee" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-bloomGreen tracking-tight">Solar Power System</h3>
                  <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                    A reliable renewable energy source powering the entire Bloom Unit, ensuring uninterrupted coffee processing and household electricity.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Solar clean energy dedicated to coffee processing and household electricity access.",
                      "Reduces operating costs and eliminates fuel price volatility for rural operators.",
                      "Enables evening lighting for Bloom teams and extends productive processing hours.",
                      "Significantly cuts carbon emissions while supporting energy independence."
                    ].map((bullet) => (
                      <li key={bullet} className="flex gap-4 text-base md:text-lg text-muted-foreground">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* COFFEE PULPER */}
            <div id="bloom-pulper" className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="order-2 lg:order-1 bloom-card relative overflow-hidden group p-12"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-bloomGold/5 rounded-full blur-3xl group-hover:bg-bloomGold/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-bloomBrown to-bloomBrown/70 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                    <Cog className="w-8 h-8 text-bloomBeige" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-bloomGreen tracking-tight">Motorized Coffee Pulper</h3>
                  <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                    Modern decentralized washing capability that reduces labor by 70%, improves quality, and unlocks washed-coffee markets.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Reduces women's physical workload by more than 70% through mechanized processing.",
                      "Processes significantly more volume in less time, enabling higher throughput.",
                      "Improves pulping consistency and reduces quality defects for premium markets.",
                      "Enables women operators to offer pulping as a paid service to neighboring farmers."
                    ].map((bullet) => (
                      <li key={bullet} className="flex gap-4 text-base md:text-lg text-muted-foreground">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomBrown shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl relative group"
              >
                <img
                  src="/bloom-unit3.png"
                  alt="Motorized coffee pulper"
                  className="w-full h-[400px] md:h-[450px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-6 left-6 bg-black/50 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-md">
                  Decentralized Washing Capability
                </div>
              </motion.div>
            </div>
          </div>

          {/* ================= THIRD HARVEST: ENERGY & REGENERATION ================= */}
          <div className="space-y-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-16"
            >
              <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-bloomGreen opacity-30" />
              <h3 className="text-2xl font-serif font-bold text-bloomGreen italic whitespace-nowrap">
                Third Harvest: Energy & Regeneration
              </h3>
              <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-bloomGreen opacity-30" />
            </motion.div>

            {/* BIOGAS SYSTEM & SOIL REGENERATION */}
            <div id="bloom-biogas" className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="rounded-3xl overflow-hidden shadow-2xl relative group"
              >
                <img
                  src="/bloom-unit2.png"
                  alt="Biogas digester system"
                  className="w-full h-[400px] md:h-[450px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-6 left-6 bg-black/50 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-md">
                  Biomass Conversion
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bloom-card relative overflow-hidden group p-12"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-bloomGreen/5 rounded-full blur-3xl group-hover:bg-bloomGreen/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-bloomGreen to-bloomGreen/70 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                    <Leaf className="w-8 h-8 text-bloomBeige" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-bloomGreen tracking-tight">Biogas Waste-to-Energy</h3>
                  <p className="text-xl text-foreground/80 leading-relaxed mb-6">
                    A circular biomass conversion system that turns coffee waste into clean cooking fuel and returns nutrients to the land.
                  </p>

                  {/* Biomass Explanation */}
                  <div className="mb-8 p-6 rounded-2xl bg-bloomGreen/5 border border-bloomGreen/10 shadow-inner">
                    <h4 className="font-bold text-bloomGreen text-sm uppercase tracking-wider mb-2">Soil Regeneration</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Beyond energy, the process produces nutrient-rich bio-slurry that acts as a powerful natural fertilizer, restoring soil health and increasing crop yields.
                    </p>
                  </div>

                  <ul className="space-y-4">
                    {[
                      "Converts coffee pulp waste into clean, combustible biogas for household cooking.",
                      "Replaces firewood collection, saving forests and reducing women's health risks from smoke inhalation.",
                      "Produces nutrient-rich bio-slurry for essential soil regeneration and increased yields.",
                      "Pioneering circular energy model for rural coffee communities with year-round benefits."
                    ].map((bullet) => (
                      <li key={bullet} className="flex gap-4 text-base md:text-lg text-muted-foreground">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
