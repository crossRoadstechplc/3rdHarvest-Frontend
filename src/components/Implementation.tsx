import { MapPin, Target, LayoutGrid, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const Implementation = () => {
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
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.0 } },
  };

  return (
    <section id="implementation" className="bg-bloom-gradient relative overflow-hidden py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-20 flex flex-col items-center"
        >
          <h2 className="section-title">Implementation</h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-center">
            The Third Harvest is a time-sensitive deployment program designed for measurable first-mile transformation at scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="flex gap-6">
              <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-bloomGreen/5">
                <MapPin className="w-8 h-8 text-bloomGreen" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-bloomGreen">Location</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Primary deployment is centered in the <strong>Sidama Highlands, Ethiopia</strong>, where coffee quality is globally recognized and smallholder density supports cluster-based rollout.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6">
              <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-bloomGreen/5">
                <Target className="w-8 h-8 text-bloomGreen" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-bloomGreen">Status: Deployment Window</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Coffee washing season begins in September. Manufacturing, transport, distribution, and installation must be capitalized now to meet the coming season.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6">
              <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-bloomGreen/5">
                <LayoutGrid className="w-8 h-8 text-bloomGreen" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-bloomGreen">Minimum Viable Scale</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-6">
                  {[
                    { val: "500", label: "Deployment Units" },
                    { val: "$3.9M", label: "Capital Requirement" },
                    { val: "Mar 2026", label: "Funding Deadline" },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <div className="text-4xl font-bold text-bloomGreen mb-1">{stat.val}</div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group h-full"
          >
            <div className="bloom-card h-full flex flex-col justify-between border-2 border-bloomGreen/10 hover:border-bloomGreen/30 transition-all duration-700 overflow-hidden bg-white/50 backdrop-blur-md p-12 rounded-[2.5rem]">
              <div className="absolute top-0 right-0 p-10">
                <ArrowUpRight className="w-12 h-12 text-bloomGreen/10 group-hover:text-bloomGreen transition-all duration-500 group-hover:rotate-45" />
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl font-serif font-bold text-bloomGreen mb-8">Capital Deployment Plan</h3>
                <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                  Scale is required for manufacturing efficiency, distribution logistics, maintenance viability, and impact measurability.
                </p>
                <ul className="space-y-6">
                  {[
                    "$2.1M allocated to TriveraPro hardware",
                    "$1.8M allocated to installation, training, MEL, and logistics",
                    "500-unit threshold required for system efficiency",
                  ].map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-center gap-4 text-bloomGreen font-bold text-lg"
                    >
                      <div className="w-3 h-3 rounded-full bg-bloomGold shadow-[0_0_10px_rgba(212,168,88,0.5)]" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="mt-16 pt-10 border-t border-bloomGreen/5">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-sm font-bold uppercase tracking-[0.3em] text-bloomGold"
                >
                  Funding Target: No Later Than End of March 2026
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
