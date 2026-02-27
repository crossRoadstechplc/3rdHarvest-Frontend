import { BarChart3, Globe2, Network, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0 } },
  };

  return (
    <section id="context" className="bg-bloom-gradient relative overflow-hidden py-32">
      {/* Soft decorative orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-bloomGold/5 rounded-full blur-3xl text-white" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-bloomGreen/5 rounded-full blur-3xl text-white" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="section-title">The Context</h2>
          <p className="section-subtitle max-w-3xl">
            The Third Harvest addresses the structural inequities in the global coffee value chain, beginning at the origin. We provide the infrastructure necessary for economic resilience and environmental regeneration.
          </p>
        </motion.div>

        {/* Data-Backed Insights Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {/* Infrastructure Gap */}
          <motion.div variants={itemVariants} className="bloom-card group hover:bg-white/40">
            <div className="w-14 h-14 bg-bloomGreen/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-bloomGreen transition-colors duration-300">
              <Network className="w-7 h-7 text-bloomGreen group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-bloomGreen">Infrastructure Access</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-medium">
              Coffee-producing communities often lack access to critical value-add infrastructure, limiting their participation in higher-margin processing.
            </p>
          </motion.div>

          {/* Export Value */}
          <motion.div variants={itemVariants} className="bloom-card group hover:bg-white/40">
            <div className="w-14 h-14 bg-bloomGreen/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-bloomGreen transition-colors duration-300">
              <BarChart3 className="w-7 h-7 text-bloomGreen group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-bloomGreen">Value Capture</h3>
            <br />
            <p className="text-muted-foreground text-sm leading-relaxed font-medium">
              In Ethiopia, smallholders capture a disproportionately low share of export value due to their primary role as raw material suppliers.
            </p>
          </motion.div>

          {/* Centralization */}
          <motion.div variants={itemVariants} className="bloom-card group hover:bg-white/40">
            <div className="w-14 h-14 bg-bloomGreen/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-bloomGreen transition-colors duration-300">
              <Globe2 className="w-7 h-7 text-bloomGreen group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-bloomGreen">Processing Structure</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-medium">
              Traditional structures concentrate washing and processing in centralized facilities, distancing producers from the value addition process.
            </p>
          </motion.div>

          {/* Structural Reform */}
          <motion.div variants={itemVariants} className="bloom-card group hover:bg-white/40">
            <div className="w-14 h-14 bg-bloomGreen/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-bloomGreen transition-colors duration-300">
              <ShieldCheck className="w-7 h-7 text-bloomGreen group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-bloomGreen">Structural Reform</h3>
            <br />
            <p className="text-muted-foreground text-sm leading-relaxed font-medium">
              The Third Harvest addresses this imbalance through decentralized technologies that empower communities at the source.
            </p>
          </motion.div>
        </motion.div>

        {/* Strategic Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-bloomGreen text-bloomBeige shadow-2xl relative overflow-hidden group border border-white/10"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-colors" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h3 className="text-3xl font-serif font-bold mb-4 text-white!">A Strategic Imperative</h3>
              <p className="text-xl opacity-90 leading-relaxed text-white">
                We believe that structural reform is the only path to long-term sustainability. By decentralizing capability, we transition from dependency to a model of origin-authored prosperity.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-bloomGold text-bloomGold font-bold rounded-2xl uppercase tracking-[0.2em] text-sm hover:bg-bloomGold hover:text-bloomGreen transition-all cursor-default shadow-lg"
              >
                Strategic Reform
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
