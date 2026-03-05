import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Impact = () => {
  const navigate = useNavigate();
  const metrics = [
    "Women entrepreneurs supported",
    "Coffee processed through renewable systems",
    "Households using clean cooking energy",
    "Carbon emissions avoided",
    "Compost returned to coffee farms",
  ];

  return (
    <section id="impact" className="bg-white py-28">
      <div className="mx-auto max-w-[1600px] px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-flex rounded-full border border-bloomGreen/20 bg-bloomGreen/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bloomGold">
            Impact
          </div>
          <h2 className="section-title !mb-0 !text-left">Measurable Impact</h2>
          <p className="max-w-4xl text-lg leading-relaxed text-muted-foreground">
            The 3rd Harvest program delivers measurable environmental, social, and economic outcomes.
          </p>
          <p className="max-w-4xl text-lg leading-relaxed text-muted-foreground">
            Key metrics tracked through the 3rd Harvest Impact Framework include:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric} className="bloom-card border-bloomGreen/15 bg-bloomGreen/[0.03] p-6">
              <p className="font-medium text-muted-foreground">{metric}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-4xl text-lg leading-relaxed text-muted-foreground">
          Partners receive verified 3rd Harvest Impact Certificates to support ESG and sustainability reporting.
        </p>

        <div className="mt-10">
          <button
            onClick={() => navigate("/impact-esg")}
            className="group inline-flex items-center cursor-pointer justify-center rounded-[10px] bg-bloomGold px-10 py-5 text-sm font-bold tracking-[0.08em] text-white transition-all hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)]"
          >
            <span>View Impact</span>
            <span className="ml-3 rounded-full bg-white/20 p-1 transition-colors group-hover:bg-white group-hover:text-bloomGold">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
