import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { siteContent } from "@/content/siteContent";

export const Vision = () => {
  const navigate = useNavigate();

  const handleBecomePartner = () => {
    navigate("/partner");
  };

  return (
    <section id="vision" className="bg-bloom-gradient relative overflow-hidden py-32">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-left md:text-center mb-16"
        >
          <h2 className="section-title">{siteContent.sections.vision.title}</h2>
          <p className="section-subtitle max-w-4xl mx-auto">
            {siteContent.sections.vision.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bloom-card p-12 bg-bloomGreen text-bloomBeige max-w-4xl mx-auto"
        >
          <p className="text-2xl leading-relaxed text-blacktj/90 mb-8">
            {siteContent.sections.vision.description}
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleBecomePartner}
              className="group inline-flex items-center justify-center px-10 py-5 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
            >
              <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                Join the Initiative
              </span>
              <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
