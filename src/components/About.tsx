import { BarChart3, Globe2, Network, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

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

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="section-title text-left md:text-center">A New Model for Coffee Communities</h2>
          <p className="section-subtitle max-w-3xl text-left md:text-center">
            Coffee production generates more than just coffee. When integrated into a circular system, it can produce renewable energy, regenerate soils, and create new economic opportunities for women. 3rd Harvest brings these elements together into a single system that enables coffee communities to unlock multiple harvests from the same crop.
          </p>
        </motion.div>

        {/* Context Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex justify-center mt-16"
        >
          <div className="rounded-[10px] overflow-hidden border border-bloomGreen/10 shadow-2xl bg-white w-full md:w-1/2 max-w-2xl">
            <img
              src="/context.png"
              alt="Current coffee market bottleneck and first-mile value constraints"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Challenge Cards */}
        <div className="mt-20 max-w-6xl mx-auto">
          {/* Desktop Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Infrastructure Access Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.4 }}
              className="bloom-card group hover:bg-white/40 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-bloomGreen transition-colors duration-300">
                <Network className="w-7 h-7 text-bloomGreen group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-bloomGreen">The Challenge</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                At the same time, coffee production generates large volumes of organic waste and rural households often depend on firewood for cooking energy. These challenges create environmental pressures while limiting economic opportunities.
              </p>
            </motion.div>

            {/* Value Capture Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.5 }}
              className="bloom-card group hover:bg-white/40 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-bloomGreen transition-colors duration-300">
                <BarChart3 className="w-7 h-7 text-bloomGreen group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-bloomGreen">The Solution</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                3rd Harvest was created to address these challenges through an integrated approach that combines coffee value addition, renewable energy, and circular agriculture.
              </p>
            </motion.div>

            {/* Processing Structure Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.6 }}
              className="bloom-card group hover:bg-white/40 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-bloomGreen transition-colors duration-300">
                <Globe2 className="w-7 h-7 text-bloomGreen group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-bloomGreen">Multiple Harvests</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                The concept behind 3rd Harvest is simple: a single coffee harvest can generate multiple forms of value when resources are used efficiently.
              </p>
            </motion.div>

            {/* Structural Reform Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.7 }}
              className="bloom-card group hover:bg-white/40 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-bloomGreen transition-colors duration-300">
                <ShieldCheck className="w-7 h-7 text-bloomGreen group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-bloomGreen">Integrated System</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                Through the 3rd Harvest system, coffee production can deliver higher-value coffee, renewable cooking energy, and nutrient-rich compost that regenerates agricultural soils.
              </p>
            </motion.div>
          </div>
        </div>


        {/* SPX Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-12 p-8 rounded-[10px] bg-white border border-bloomGreen/10 shadow-xl"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-bloomGreen rounded-[10px] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-2xl">SPX</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-bloomGreen mb-3">Africa-Based Systems Architects</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SPX operates at the intersection of Coffee, Infrastructure, Energy, and Regenerative systems. We are not an NGO. We are system builders.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We design, integrate, and deploy infrastructure solutions that rebalances value capture at the first mile. Our response is not symbolic—it is structural.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Strategic Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-20 p-8 md:p-12 rounded-[10px] bg-bloomGreen text-bloomBeige shadow-2xl relative overflow-hidden group border border-white/10"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-colors" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h3 className="text-3xl font-serif font-bold mb-4 text-white!">A Strategic Imperative</h3>
              <p className="text-xl opacity-90 leading-relaxed text-white">We are system builders. The model is engineered to rebalance first-mile value capture through replicable infrastructure and local ownership.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-bloomGold rounded-full" />
                  <span className="text-white/90 text-sm">Patent pending under TriveraPro brand (Ethiopian IP office)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-bloomGold rounded-full" />
                  <span className="text-white/90 text-sm">Partnership with MCRO, a women-focused Ethiopian NGO</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-bloomGold rounded-full" />
                  <span className="text-white/90 text-sm">Locally designed, locally implemented infrastructure</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-bloomGold text-white font-bold rounded-[10px] uppercase tracking-[0.2em] text-sm bg-bloomGold cursor-default shadow-lg"
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
