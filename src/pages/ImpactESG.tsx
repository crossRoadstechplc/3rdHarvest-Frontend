import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const ImpactESG = () => {
  return (
    <div className="min-h-screen">
      <BloomNav />
      <section className="bg-background relative overflow-hidden py-32">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-left md:text-center mb-20"
          >
            <p className="text-sm uppercase tracking-[0.2em] font-bold text-bloomGold mb-4">IMPACT & ESG</p>
            <h1 className="section-title">Impact & ESG</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              Measurable Impact for Coffee Communities and Supply Chains
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-6">
              The 3rd Harvest initiative delivers measurable environmental, social, and economic outcomes through integrated circular coffee systems.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-4">
              All results are tracked through the 3rd Harvest Impact Framework, enabling partners to report verified outcomes within their ESG and sustainability disclosures.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-4">
              By combining renewable energy, circular resource management, and women-led entrepreneurship, the program creates tangible impact across multiple dimensions.
            </p>
          </motion.div>

          <div className="space-y-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Climate & Environmental Impact</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The TriveraPro system transforms coffee processing waste into renewable energy and soil nutrients.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This circular approach reduces emissions while regenerating agricultural ecosystems.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 font-bold">Key environmental outcomes include:</p>
              <ul className="space-y-2">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  methane capture from coffee pulp
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  reduced reliance on firewood for cooking
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  renewable solar energy used in coffee processing
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  organic compost returned to coffee farms
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  improved soil health and agricultural productivity
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These outcomes contribute to climate mitigation and regenerative agriculture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Women's Economic Empowerment</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Proud Coffee Women (PCW) model enables women entrepreneurs to participate directly in coffee processing and circular energy systems.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Through PCW teams, women gain access to new economic opportunities and leadership roles within their communities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 font-bold">Program outcomes include:</p>
              <ul className="space-y-2">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  women-led coffee processing enterprises
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  increased participation of women in value-added activities
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  expanded income opportunities within coffee communities
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Renewable Energy for Rural Communities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Coffee pulp generated during processing becomes a source of renewable energy through the TriveraPro biogas system.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This energy provides clean cooking fuel for households, reducing dependence on firewood and improving indoor air quality.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 font-bold">Key outcomes include:</p>
              <ul className="space-y-2">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  households using clean cooking gas
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  reduced indoor air pollution
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  decreased pressure on local forests
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Circular Agriculture</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The TriveraPro system converts coffee pulp into nutrient-rich compost through the biogas digestion process.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This organic fertilizer is returned to coffee farms, supporting soil regeneration and sustainable agricultural practices.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 font-bold">Outcomes include:</p>
              <ul className="space-y-2">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  compost returned to coffee farms
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  improved soil fertility
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  regenerative agricultural practices
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bloom-card p-10 bg-bloomGreen text-bloomBeige"
            >
              <h2 className="text-3xl font-bold text-white mb-6">The 3rd Harvest Impact Framework</h2>
              <p className="text-black/90 leading-relaxed mb-6">The program measures impact across five core indicators:</p>

              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-black">Women entrepreneurs enabled</h3>
                  <p className="text-black/80">Number of Proud Coffee Women teams operating TriveraPro systems.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">Coffee value created</h3>
                  <p className="text-black/80">Volume of coffee processed through renewable systems.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">Clean energy generated</h3>
                  <p className="text-black/80">Households using biogas cooking energy.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">Carbon emissions avoided</h3>
                  <p className="text-black/80">Estimated CO2 emissions reductions through methane capture and firewood displacement.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">Soil regeneration</h3>
                  <p className="text-black/80">Volume of compost returned to agricultural soils.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">ESG Reporting for Partners</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Partners participating in the 3rd Harvest initiative receive verified impact reporting through the 3rd Harvest Impact Certificate.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This reporting enables companies and organizations to incorporate measurable outcomes into:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  ESG disclosures
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  sustainability reports
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  climate commitments
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  supply chain impact reporting
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The program aligns with multiple Sustainable Development Goals including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
                <p>SDG 5 - Gender Equality</p>
                <p>SDG 7 - Affordable and Clean Energy</p>
                <p>SDG 8 - Decent Work and Economic Growth</p>
                <p>SDG 12 - Responsible Consumption and Production</p>
                <p>SDG 13 - Climate Action</p>
                <p>SDG 15 - Life on Land</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-left md:text-center"
            >
              <p className="text-2xl font-serif font-bold text-bloomGreen italic">
                3rd Harvest transforms coffee production into a measurable engine of environmental and social impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ImpactESG;
