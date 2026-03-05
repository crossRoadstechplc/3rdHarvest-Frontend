import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Award, ShieldCheck, Globe, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { siteContent } from "@/content/siteContent";

const ProudCoffeeWomen = () => {
  const navigate = useNavigate();

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
            <h1 className="section-title">{siteContent.pcwPage.title}</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              {siteContent.pcwPage.subtitle}
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-6">
              {siteContent.pcwPage.description}
            </p>
          </motion.div>

          <div className="space-y-20 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bloom-card p-10"
            >
              <div className="flex gap-6 mb-6">
                <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center">
                  <Users className="w-8 h-8 text-bloomGreen" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-bloomGreen mb-4">{siteContent.pcwPage.role.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {siteContent.pcwPage.role.description}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bloom-card p-10"
            >
              <div className="flex gap-6 mb-6">
                <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center">
                  <Award className="w-8 h-8 text-bloomGreen" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-bloomGreen mb-4">{siteContent.pcwPage.team.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {siteContent.pcwPage.team.description}
                  </p>
                  <ul className="space-y-3">
                    {siteContent.pcwPage.team.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex gap-4 text-muted-foreground">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">{siteContent.pcwPage.purpose.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {siteContent.pcwPage.purpose.description}
              </p>
              <ul className="space-y-3">
                {siteContent.pcwPage.purpose.values.map((value, idx) => (
                  <li key={idx} className="flex gap-4 text-muted-foreground">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                    {value}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bloom-card p-10 bg-bloomGreen text-bloomBeige"
            >
              <div className="flex gap-6 mb-6">
                <div className="w-16 h-16 bg-white/10 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-black mb-4">{siteContent.pcwPage.label.title}</h2>
                  <p className="text-black/90 leading-relaxed">
                    {siteContent.pcwPage.label.description}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-left md:text-center space-y-8"
            >
              <p className="text-2xl font-serif font-bold text-bloomGreen italic">
                {siteContent.pcwPage.closing}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                  onClick={() => navigate("/impact-esg")}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                    View Impact
                  </span>
                  <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
                <button
                  onClick={() => navigate("/partner")}
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-bloomGreen text-bloomGreen overflow-hidden rounded-[10px] transition-all duration-500 hover:bg-bloomGreen hover:text-white active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                    Become a Partner
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

export default ProudCoffeeWomen;
