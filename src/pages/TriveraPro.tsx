import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const TriveraPro = () => {
  return (
    <div className="min-h-screen">
      <BloomNav />
      <section className="bg-white relative overflow-hidden py-32">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-left md:text-center mb-20"
          >
            <p className="text-sm uppercase tracking-[0.2em] font-bold text-bloomGold mb-4">TRIVERAPRO SYSTEM</p>
            <h1 className="section-title">The TriveraPro System</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">Technology for Circular Coffee Systems</p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-6">
              The TriveraPro Unit is the integrated technology platform powering the 3rd Harvest system.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-4">
              Developed by SPX, TriveraPro combines renewable energy, coffee processing, and circular resource management into a single modular platform designed for coffee-producing communities.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-4">
              The system enables smallholder communities to transform coffee production from a linear process into a circular ecosystem where waste becomes energy and nutrients.
            </p>
          </motion.div>

          <div className="space-y-16 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">The TriveraPro Concept</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Coffee processing traditionally generates large volumes of organic waste while rural households rely on firewood for cooking energy.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TriveraPro addresses both challenges simultaneously by converting coffee pulp into renewable energy and soil nutrients.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through this integrated system, a single coffee harvest generates multiple forms of value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Components of the TriveraPro System</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Each TriveraPro unit integrates several technologies into one platform.
              </p>

              <h3 className="text-2xl font-bold text-bloomGreen mb-3">Solar-Powered Coffee Processing</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Solar energy powers the coffee pulping system, enabling communities to convert coffee cherries into higher-value washed coffee without relying on fossil fuels.
              </p>

              <h3 className="text-2xl font-bold text-bloomGreen mb-3">Biogas Energy Generation</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Coffee pulp produced during processing is fed into a biogas digester where natural fermentation generates methane gas.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This gas provides clean cooking energy for households in the community.
              </p>

              <h3 className="text-2xl font-bold text-bloomGreen mb-3">Clean Cooking Solutions</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The biogas produced through the system replaces traditional firewood and charcoal cooking, reducing indoor air pollution and pressure on local forests.
              </p>

              <h3 className="text-2xl font-bold text-bloomGreen mb-3">Compost Production</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The digestate produced by the biogas system is a nutrient-rich organic fertilizer.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This compost is returned to coffee farms, improving soil fertility and supporting regenerative agriculture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bloom-card p-10 bg-bloomGreen text-bloomBeige"
            >
              <h2 className="text-3xl font-bold text-white mb-6">A System That Unlocks Multiple Harvests</h2>
              <p className="text-black/90 leading-relaxed mb-4">
                The TriveraPro system transforms a single coffee harvest into multiple value streams:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-4 text-black/90">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  Coffee value through local processing
                </li>
                <li className="flex gap-4 text-black/90">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  Renewable energy through biogas generation
                </li>
                <li className="flex gap-4 text-black/90">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  Soil regeneration through organic compost
                </li>
              </ul>
              <p className="text-white/90 leading-relaxed">
                This circular model increases community resilience while reducing environmental impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Designed for Community Operation</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TriveraPro systems are operated by teams of Proud Coffee Women (PCW) who manage coffee processing and energy generation within their communities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through this model, women entrepreneurs lead the operation of circular coffee systems and participate directly in the value created through coffee production.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Built for Scale</h2>
              <p className="text-muted-foreground leading-relaxed">
                The TriveraPro platform is designed to be deployed across coffee-producing regions.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                By combining renewable energy technologies with coffee processing infrastructure, the system enables scalable solutions for communities while delivering measurable environmental and social impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Part of the 3rd Harvest Program</h2>
              <p className="text-muted-foreground leading-relaxed">
                TriveraPro units are deployed through the 3rd Harvest initiative, a collaborative platform connecting coffee companies, development organizations, and philanthropic institutions to support regenerative coffee systems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-left md:text-center"
            >
              <p className="text-2xl font-serif font-bold text-bloomGreen italic">
                TriveraPro powers the circular coffee systems that make the 3rd Harvest possible.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TriveraPro;
