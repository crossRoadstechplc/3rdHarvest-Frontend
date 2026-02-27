import { Wind, Flame, Sprout, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export const Impact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0 } },
  };

  return (
    <section id="impact" className="bg-background relative overflow-hidden py-24">
      {/* Structural Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-bloomGreen/10" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-20 flex flex-col items-center"
        >
          <h2 className="section-title">Environmental Impact</h2>
          <p className="w-full text-xl text-center text-muted-foreground leading-relaxed">
            Sustainability is not an afterthought; it is integrated into our structural model. The Third Harvest transforms environmental externalities into productive assets for the community.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Main Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            {/* Methane & Biomass */}
            <motion.div variants={itemVariants} className="bloom-card group border-2 border-transparent hover:border-bloomGreen/10">
              <div className="flex gap-6">
                <div className="w-16 h-16 shrink-0 bg-bloomGreen/5 rounded-2xl flex items-center justify-center group-hover:bg-bloomGreen transition-all duration-500">
                  <Wind className="w-8 h-8 text-bloomGreen group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-bloomGreen">Mitigating Emissions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By converting coffee pulp, a significant source of methane when left in open pits, into biogas. We eliminate a major environmental hazard while creating a valuable energy source.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Firewood Reduction */}
            <motion.div variants={itemVariants} className="bloom-card group border-2 border-transparent hover:border-bloomGreen/10">
              <div className="flex gap-6">
                <div className="w-16 h-16 shrink-0 bg-bloomGreen/5 rounded-2xl flex items-center justify-center group-hover:bg-bloomGreen transition-all duration-500">
                  <Flame className="w-8 h-8 text-bloomGreen group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-bloomGreen">Preserving Forests</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Access to clean cooking biogas directly reduces the community's dependence on firewood, mitigating local deforestation and improving household air quality.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Soil Health */}
            <motion.div variants={itemVariants} className="bloom-card group border-2 border-transparent hover:border-bloomGreen/10">
              <div className="flex gap-6">
                <div className="w-16 h-16 shrink-0 bg-bloomGreen/5 rounded-2xl flex items-center justify-center group-hover:bg-bloomGreen transition-all duration-500">
                  <Sprout className="w-8 h-8 text-bloomGreen group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-bloomGreen">Regenerative Soil Health</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The nutrient-rich bio-slurry generated as a byproduct of biogas production serves as a powerful organic fertilizer, returning essential nutrients to the soil for regenerative coffee farming.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Impact Visual / Metric Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative h-[650px] group">
              <img
                src="/impact.webp"
                alt="Environmental regeneration infrastructure"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bloomGreen/95 via-bloomGreen/20 to-transparent" />

              <div className="absolute bottom-12 left-12 right-12 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex items-center gap-3 mb-6 text-bloomGold"
                >
                  <ShieldCheck className="w-7 h-7" />
                  <span className="text-sm font-bold uppercase tracking-[0.2em]">Circular Validation</span>
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-4xl md:text-5xl font-serif font-bold mb-8 text-bloomGold!"
                >
                  Closing the Loop
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="grid grid-cols-2 gap-10 border-t border-white/20 pt-10"
                >
                  <div>
                    <div className="text-4xl font-bold text-bloomGold mb-2">100%</div>
                    <div className="text-xs uppercase tracking-[0.1em] opacity-80 leading-relaxed font-bold">Organic Waste Diversion</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-bloomGold mb-2 text-nowrap">Low Carbon</div>
                    <div className="text-xs uppercase tracking-[0.1em] opacity-80 leading-relaxed font-bold">Infrastructure Footprint</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Global Contribution Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 text-center max-w-3xl mx-auto p-10 bg-bloomGreen/5 rounded-3xl border border-bloomGreen/10"
        >
          <p className="text-2xl font-serif font-bold text-bloomGreen italic opacity-80">
            "We do not just protect the environment; we integrate its health into the economic viability of the community."
          </p>
        </motion.div>

      </div>
    </section>
  );
};
