import { Wind, Flame, Sprout, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Impact = () => {
  const navigate = useNavigate();

  const handleViewImpact = () => {
    navigate("/impact-esg");
  };

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

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 flex flex-col items-center z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-20 flex flex-col items-start md:items-center"
        >
          <h2 className="section-title text-left md:text-center">Impact</h2>
          <p className="w-full text-xl text-left md:text-center text-muted-foreground leading-relaxed mb-4">
            Measurable Impact. The 3rd Harvest program delivers measurable environmental, social, and economic outcomes. Key metrics tracked through the 3rd Harvest Impact Framework include:
          </p>
          <div className="flex flex-wrap justify-start md:justify-center gap-3 text-sm text-muted-foreground">
            <span>• Women entrepreneurs supported</span>
            <span>• Coffee processed through renewable systems</span>
            <span>• Households using clean cooking energy</span>
            <span>• Carbon emissions avoided</span>
            <span>• Compost returned to coffee farms</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10"
          >
            <button
              onClick={handleViewImpact}
              className="group inline-flex items-center justify-center px-10 py-5 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
            >
              <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                View Impact
              </span>
              <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

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
                <div className="w-16 h-16 shrink-0 bg-bloomGreen/5 rounded-[10px] flex items-center justify-center group-hover:bg-bloomGreen transition-all duration-500">
                  <Wind className="w-8 h-8 text-bloomGreen group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-bloomGreen">Women's Economic Empowerment</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The Proud Coffee Women (PCW) model enables women entrepreneurs to participate directly in coffee processing and circular energy systems, gaining access to new economic opportunities and leadership roles.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Firewood Reduction */}
            <motion.div variants={itemVariants} className="bloom-card group border-2 border-transparent hover:border-bloomGreen/10">
              <div className="flex gap-6">
                <div className="w-16 h-16 shrink-0 bg-bloomGreen/5 rounded-[10px] flex items-center justify-center group-hover:bg-bloomGreen transition-all duration-500">
                  <Flame className="w-8 h-8 text-bloomGreen group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-bloomGreen">Renewable Energy for Rural Communities</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Coffee pulp generated during processing becomes a source of renewable energy through the TriveraPro biogas system, providing clean cooking fuel for households and reducing dependence on firewood.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Soil Health */}
            <motion.div variants={itemVariants} className="bloom-card group border-2 border-transparent hover:border-bloomGreen/10">
              <div className="flex gap-6">
                <div className="w-16 h-16 shrink-0 bg-bloomGreen/5 rounded-[10px] flex items-center justify-center group-hover:bg-bloomGreen transition-all duration-500">
                  <Sprout className="w-8 h-8 text-bloomGreen group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-bloomGreen">Circular Agriculture</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The TriveraPro system converts coffee pulp into nutrient-rich compost through the biogas digestion process, returning organic fertilizer to coffee farms and supporting soil regeneration.
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
            <div className="rounded-[10px] overflow-hidden shadow-2xl relative h-[650px] group">
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/20 pt-10"
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

        {/* Impact Framework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 bloom-card p-10 bg-bloomGreen text-bloomBeige max-w-5xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-white mb-6 text-left md:text-center">The 3rd Harvest Impact Framework</h3>
          <p className="text-black/90 leading-relaxed mb-8 text-left md:text-center">
            The program measures impact across five core indicators:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Women entrepreneurs enabled", desc: "Number of Proud Coffee Women teams operating TriveraPro systems." },
              { name: "Coffee value created", desc: "Volume of coffee processed through renewable systems." },
              { name: "Clean energy generated", desc: "Households using biogas cooking energy." },
              { name: "Carbon emissions avoided", desc: "Estimated CO2 emissions reductions through methane capture and firewood displacement." },
              { name: "Soil regeneration", desc: "Volume of compost returned to agricultural soils." }
            ].map((indicator, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="bg-white/10 rounded-[10px] p-6"
              >
                <h4 className="text-xl font-bold text-black mb-2">{indicator.name}</h4>
                <p className="text-black/80 text-sm">{indicator.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 pt-8 border-t border-white/20"
          >
            <p className="text-black/90 text-left md:text-center leading-relaxed">
              Partners receive verified <strong className="text-bloomGold">3rd Harvest Impact Certificates</strong> to support ESG and sustainability reporting.
            </p>
          </motion.div>
        </motion.div>

        {/* Global Contribution Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-16 text-left md:text-center max-w-3xl mx-auto p-10 bg-bloomGreen/5 rounded-3xl border border-bloomGreen/10"
        >
          <p className="text-2xl font-serif font-bold text-bloomGreen italic opacity-80">
            "We do not just protect the environment; we integrate its health into the economic viability of the community."
          </p>
        </motion.div>

      </div>
    </section>
  );
};
