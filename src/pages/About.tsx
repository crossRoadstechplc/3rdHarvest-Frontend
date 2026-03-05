import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen">
      <BloomNav />
      <section className="bg-bloom-gradient relative overflow-hidden py-32">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-left md:text-center mb-20"
          >
            <p className="text-sm uppercase tracking-[0.2em] font-bold text-bloomGold mb-4">ABOUT 3rd HARVEST</p>
            <h1 className="section-title">A New Model for Coffee Communities</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              Coffee is one of the world's most valuable agricultural commodities, yet many coffee-producing communities capture only a small portion of the value created along the supply chain.
            </p>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              At the same time, coffee production generates large volumes of organic waste and rural households often depend on firewood for cooking energy. These challenges create environmental pressures while limiting economic opportunities for smallholder communities.
            </p>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              3rd Harvest was created to address these challenges through an integrated approach that combines coffee value addition, renewable energy, and circular agriculture.
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
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Unlocking Multiple Harvests</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The concept behind 3rd Harvest is simple: a single coffee harvest can generate multiple forms of value when resources are used efficiently.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">Through the 3rd Harvest system, coffee production can deliver:</p>
              <ul className="space-y-3 mt-6">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  higher-value coffee through local processing
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  renewable cooking energy generated from coffee waste
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  nutrient-rich compost that regenerates agricultural soils
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6">
                By integrating these elements into a single system, communities can unlock multiple harvests from the same crop.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">The TriveraPro System</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At the center of the program is the TriveraPro Unit, an integrated technology platform developed by SPX.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">The TriveraPro system combines:</p>
              <ul className="space-y-3 mt-6">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  solar-powered coffee pulping
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  biogas generation from coffee pulp
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  clean cooking energy for households
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  compost production for soil regeneration
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6">
                This technology transforms coffee processing into a circular system where waste becomes energy and nutrients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Proud Coffee Women (PCW)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The 3rd Harvest system is operated by teams of Proud Coffee Women (PCW).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Each PCW team consists of women entrepreneurs who manage TriveraPro systems within their communities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Through the PCW model, women participate directly in coffee processing, energy generation, and regenerative farming practices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The PCW label identifies coffee produced within the 3rd Harvest system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">A Collaborative Platform</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                3rd Harvest operates as a collaborative platform bringing together actors across the coffee ecosystem.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">Participants may include:</p>
              <ul className="space-y-3 mt-6">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  Coffee companies
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  Development organizations
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  Philanthropic institutions
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  Local implementation partners
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6">
                By aligning development funding with private-sector engagement, the initiative enables scalable solutions for coffee-producing communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="bloom-card p-10 bg-bloomGreen text-bloomBeige"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Measuring Impact</h2>
              <p className="text-black/90 leading-relaxed mb-4">
                All outcomes generated through the program are tracked through the 3rd Harvest Impact Framework.
              </p>
              <p className="text-black/90 leading-relaxed mb-4">
                This framework measures environmental, social, and economic outcomes such as renewable energy generation, emissions reductions, women-led entrepreneurship, and soil regeneration.
              </p>
              <p className="text-black/90 leading-relaxed">
                Program partners receive verified 3rd Harvest Impact Certificates, enabling them to report measurable contributions to sustainability and ESG objectives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Program Stewardship</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The 3rd Harvest initiative was developed by SPX, an Ethiopia-based organization working at the intersection of coffee systems, technology, and sustainability.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Community engagement and implementation activities are carried out in collaboration with local partners such as MCRO (Mother and Child Rehabilitation Organization).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Together with industry and development partners, the initiative aims to expand circular coffee systems across producing regions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-left md:text-center mt-8"
            >
              <p className="text-2xl font-serif font-bold text-bloomGreen italic mb-3">"Coffee can produce more than coffee."</p>
              <p className="text-xl text-muted-foreground">3rd Harvest unlocks value, energy, and regeneration from a single crop.</p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
