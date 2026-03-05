import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const PCW = () => {
  return (
    <div className="min-h-screen">
      <BloomNav />
      <section className="bg-bloom-gradient relative overflow-hidden py-32">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-left md:text-center mb-20"
          >
            <p className="text-sm uppercase tracking-[0.2em] font-bold text-bloomGold mb-4">PROUD COFFEE WOMEN (PCW)</p>
            <h1 className="section-title">Proud Coffee Women (PCW)</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              Women Leading the Next Generation of Coffee
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start max-w-5xl mx-auto mb-14"
          >
            <div className="bloom-card p-8">
              <p className="text-xl text-muted-foreground leading-relaxed">
                At the heart of the 3rd Harvest initiative are teams of Proud Coffee Women (PCW)-women entrepreneurs who lead circular coffee systems in their communities.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed mt-4">
                Through the PCW model, women participate directly in coffee processing, renewable energy generation, and regenerative agriculture.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed mt-4">
                The PCW label identifies coffee produced through these women-led systems.
              </p>
            </div>

            <div className="bloom-card border-bloomGreen/10 bg-white/80 p-3 md:p-4">
              <img
                src="/pcw.jpg"
                alt="Proud Coffee Women logo"
                className="w-full max-h-150 rounded-[10px] object-cover"
              />
            </div>
          </motion.div>

          <div className="space-y-16 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">A New Role for Women in Coffee Communities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In many coffee-producing regions, women play essential roles in farming and household management but often have limited access to income-generating opportunities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The PCW model creates new pathways for participation by enabling women to manage coffee processing systems and participate in the value created from coffee production.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Each PCW team operates a TriveraPro Unit, transforming coffee processing into a community-based enterprise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">The PCW Team Model</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Each Proud Coffee Women team consists of three women entrepreneurs who jointly operate a TriveraPro system within their community.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">Together they manage:</p>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  coffee pulping and processing
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  biogas energy generation
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  clean cooking energy distribution
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  compost production for farms
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Through this model, women become leaders in both coffee production and circular resource management.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Coffee with Purpose</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Coffee produced through the PCW system represents more than a product.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">It reflects a production model where:</p>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  women entrepreneurs participate in value creation
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  renewable energy replaces traditional fuels
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  agricultural waste becomes a resource
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  soils are regenerated through organic nutrients
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                The PCW label signals participation in this regenerative system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bloom-card p-10 bg-bloomGreen text-bloomBeige"
            >
              <h2 className="text-3xl font-bold text-black mb-6">A Label for Impact</h2>
              <p className="text-black/90 leading-relaxed mb-4">
                The Proud Coffee Women (PCW) label is used to identify coffee produced within the 3rd Harvest system.
              </p>
              <p className="text-black/90 leading-relaxed mb-4">
                Coffee companies and partners participating in the program may receive authorization to use the PCW label when sourcing coffee produced by PCW teams or when supporting the deployment of 3rd Harvest systems.
              </p>
              <p className="text-black/90 leading-relaxed">
                The label represents a commitment to women-led regenerative coffee production.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">A Growing Community</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As the 3rd Harvest initiative expands, the network of Proud Coffee Women teams will grow across coffee-producing regions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Together, these women entrepreneurs are helping to build a new model for coffee communities-one where energy, agriculture, and livelihoods are connected through circular systems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              className="text-left md:text-center"
            >
              <p className="text-2xl font-serif font-bold text-bloomGreen italic">
                Proud Coffee Women represent the human face of the 3rd Harvest system.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PCW;
