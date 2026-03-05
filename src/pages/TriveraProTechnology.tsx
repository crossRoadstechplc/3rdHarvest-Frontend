import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Sun, Cog, Leaf, Factory, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { siteContent } from "@/content/siteContent";

const TriveraProTechnology = () => {
  const navigate = useNavigate();

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
            <h1 className="section-title">{siteContent.triveraPro.title}</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              {siteContent.triveraPro.subtitle}
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-6">
              {siteContent.triveraPro.description}
            </p>
          </motion.div>

          <div className="space-y-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bloom-card p-10 max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">The TriveraPro Concept</h2>
              <p className="text-muted-foreground leading-relaxed">
                {siteContent.triveraPro.concept.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bloom-card p-10"
              >
                <div className="w-16 h-16 bg-bloomGold/10 rounded-[10px] flex items-center justify-center mb-6">
                  <Sun className="w-8 h-8 text-bloomGold" />
                </div>
                <h3 className="text-2xl font-bold text-bloomGreen mb-4">{siteContent.triveraPro.components.solar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {siteContent.triveraPro.components.solar.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bloom-card p-10"
              >
                <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6">
                  <Factory className="w-8 h-8 text-bloomGreen" />
                </div>
                <h3 className="text-2xl font-bold text-bloomGreen mb-4">{siteContent.triveraPro.components.biogas.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {siteContent.triveraPro.components.biogas.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="bloom-card p-10"
              >
                <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6">
                  <Cog className="w-8 h-8 text-bloomGreen" />
                </div>
                <h3 className="text-2xl font-bold text-bloomGreen mb-4">{siteContent.triveraPro.components.cooking.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {siteContent.triveraPro.components.cooking.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bloom-card p-10"
              >
                <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-bloomGreen" />
                </div>
                <h3 className="text-2xl font-bold text-bloomGreen mb-4">{siteContent.triveraPro.components.compost.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {siteContent.triveraPro.components.compost.description}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bloom-card p-10 bg-bloomGreen text-bloomBeige max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-white mb-6">A System That Unlocks Multiple Harvests</h2>
              <p className="text-black/90 leading-relaxed mb-6">
                The TriveraPro system transforms a single coffee harvest into multiple value streams:
              </p>
              <ul className="space-y-3">
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
              <p className="text-white/90 leading-relaxed mt-6">
                This circular model increases community resilience while reducing environmental impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-left md:text-center max-w-3xl mx-auto space-y-8"
            >
              <p className="text-2xl font-serif font-bold text-bloomGreen italic">
                {siteContent.triveraPro.closing}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                  onClick={() => navigate("/proud-coffee-women")}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                    Meet PCW Teams
                  </span>
                  <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
                <button
                  onClick={() => navigate("/impact-esg")}
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-bloomGreen text-bloomGreen overflow-hidden rounded-[10px] transition-all duration-500 hover:bg-bloomGreen hover:text-white active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                    View Impact
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

export default TriveraProTechnology;
