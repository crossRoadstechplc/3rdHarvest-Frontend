import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { siteContent } from "@/content/siteContent";

const About3rdHarvest = () => {
  const navigate = useNavigate();

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
            <h1 className="section-title">{siteContent.footer.about.subtitle}</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              {siteContent.footer.about.description}
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
                The concept behind 3rd Harvest is simple: a single coffee harvest can generate multiple forms of value when resources are used efficiently. Through the 3rd Harvest system, coffee production can deliver:
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  Higher-value coffee through local processing
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  Renewable cooking energy generated from coffee waste
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  Nutrient-rich compost that regenerates agricultural soils
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
                At the center of the program is the TriveraPro Unit, an integrated technology platform developed by SPX. The TriveraPro system combines:
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  Solar-powered coffee pulping
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  Biogas generation from coffee pulp
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  Clean cooking energy for households
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  Compost production for soil regeneration
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
                The 3rd Harvest system is operated by teams of Proud Coffee Women (PCW). Each PCW team consists of women entrepreneurs who manage TriveraPro systems within their communities. Through the PCW model, women participate directly in coffee processing, energy generation, and regenerative farming practices.
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
                3rd Harvest operates as a collaborative platform bringing together actors across the coffee ecosystem. Participants may include:
              </p>
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
              <p className="text-white/90 leading-relaxed mb-4">
                All outcomes generated through the program are tracked through the 3rd Harvest Impact Framework. This framework measures environmental, social, and economic outcomes such as renewable energy generation, emissions reductions, women-led entrepreneurship, and soil regeneration.
              </p>
              <p className="text-white/90 leading-relaxed">
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
              <p className="text-muted-foreground leading-relaxed mb-6">
                {siteContent.footer.stewardship.description}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => navigate("/triverapro")}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                    Learn About TriveraPro
                  </span>
                  <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
                <button
                  onClick={() => navigate("/proud-coffee-women")}
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-bloomGreen text-bloomGreen overflow-hidden rounded-[10px] transition-all duration-500 hover:bg-bloomGreen hover:text-white active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                    Meet PCW Teams
                  </span>
                  <div className="ml-4 p-1 bg-bloomGreen/20 rounded-full group-hover:bg-white transition-all duration-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About3rdHarvest;
