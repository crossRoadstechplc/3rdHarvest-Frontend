import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Wind, Flame, Sprout, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { siteContent } from "@/content/siteContent";

const ImpactESG = () => {
  const navigate = useNavigate();

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
            <h1 className="section-title">Impact & ESG</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              The 3rd Harvest initiative delivers measurable environmental, social, and economic outcomes through integrated circular coffee systems. All results are tracked through the 3rd Harvest Impact Framework, enabling partners to report verified outcomes within their ESG and sustainability disclosures.
            </p>
          </motion.div>

          <div className="space-y-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bloom-card p-10"
              >
                <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6">
                  <Wind className="w-8 h-8 text-bloomGreen" />
                </div>
                <h2 className="text-3xl font-bold text-bloomGreen mb-4">Climate & Environmental Impact</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The TriveraPro system transforms coffee processing waste into renewable energy and soil nutrients. This circular approach reduces emissions while regenerating agricultural ecosystems.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 font-bold">Key environmental outcomes include:</p>
                <ul className="space-y-2">
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    Methane capture from coffee pulp
                  </li>
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    Reduced reliance on firewood for cooking
                  </li>
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    Renewable solar energy used in coffee processing
                  </li>
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    Organic compost returned to coffee farms
                  </li>
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    Improved soil health and agricultural productivity
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bloom-card p-10"
              >
                <div className="w-16 h-16 bg-bloomGold/10 rounded-[10px] flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-bloomGold" />
                </div>
                <h2 className="text-3xl font-bold text-bloomGreen mb-4">Women's Economic Empowerment</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Proud Coffee Women (PCW) model enables women entrepreneurs to participate directly in coffee processing and circular energy systems. Through PCW teams, women gain access to new economic opportunities and leadership roles within their communities.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 font-bold">Program outcomes include:</p>
                <ul className="space-y-2">
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                    Women-led coffee processing enterprises
                  </li>
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                    Increased participation of women in value-added activities
                  </li>
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                    Expanded income opportunities within coffee communities
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bloom-card p-10"
              >
                <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6">
                  <Flame className="w-8 h-8 text-bloomGreen" />
                </div>
                <h2 className="text-3xl font-bold text-bloomGreen mb-4">Renewable Energy for Rural Communities</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Coffee pulp generated during processing becomes a source of renewable energy through the TriveraPro biogas system. This energy provides clean cooking fuel for households, reducing dependence on firewood and improving indoor air quality.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 font-bold">Key outcomes include:</p>
                <ul className="space-y-2">
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    Households using clean cooking gas
                  </li>
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    Reduced indoor air pollution
                  </li>
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    Decreased pressure on local forests
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="bloom-card p-10"
              >
                <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6">
                  <Sprout className="w-8 h-8 text-bloomGreen" />
                </div>
                <h2 className="text-3xl font-bold text-bloomGreen mb-4">Circular Agriculture</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The TriveraPro system converts coffee pulp into nutrient-rich compost through the biogas digestion process. This organic fertilizer is returned to coffee farms, supporting soil regeneration and sustainable agricultural practices.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 font-bold">Outcomes include:</p>
                <ul className="space-y-2">
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    Compost returned to coffee farms
                  </li>
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    Improved soil fertility
                  </li>
                  <li className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    Regenerative agricultural practices
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bloom-card p-10 bg-bloomGreen text-bloomBeige"
            >
              <h2 className="text-3xl font-bold text-white mb-6">{siteContent.sections.impact.framework.title}</h2>
              <p className="text-black/90 leading-relaxed mb-8">
                {siteContent.sections.impact.framework.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {siteContent.sections.impact.framework.indicators.map((indicator, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="bg-white/10 rounded-[10px] p-6"
                  >
                    <h3 className="text-xl font-bold text-black mb-3">{indicator.name}</h3>
                    <p className="text-black/80 text-sm">{indicator.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
              className="bloom-card p-10"
            >
              <div className="flex gap-6 mb-6">
                <div className="w-16 h-16 bg-bloomGold/10 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-bloomGold" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-bloomGreen mb-4">{siteContent.sections.impact.framework.certificate.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {siteContent.sections.impact.framework.certificate.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {siteContent.sections.impact.framework.certificate.uses.map((use, idx) => (
                      <li key={idx} className="flex gap-4 text-muted-foreground">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                        {use}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 p-6 bg-bloomGreen/5 rounded-[10px]">
                    <p className="text-sm font-bold text-bloomGreen mb-4">The program aligns with multiple Sustainable Development Goals including:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {siteContent.sections.impact.framework.certificate.sdgs.map((sdg, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                          {sdg}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-left md:text-center max-w-3xl mx-auto space-y-8"
            >
              <p className="text-2xl font-serif font-bold text-bloomGreen italic">
                3rd Harvest transforms coffee production into a measurable engine of environmental and social impact.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                  onClick={() => navigate("/partner")}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                    Become a Partner
                  </span>
                  <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
                <button
                  onClick={() => navigate("/ecosystem")}
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-bloomGreen text-bloomGreen overflow-hidden rounded-[10px] transition-all duration-500 hover:bg-bloomGreen hover:text-white active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                    Explore Ecosystem
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

export default ImpactESG;
