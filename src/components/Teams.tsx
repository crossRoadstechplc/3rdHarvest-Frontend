import { ArrowRight, BadgeCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Teams = () => {
  const navigate = useNavigate();

  return (
    <section id="teams" className="bg-bloom-gradient py-28">
      <div className="mx-auto max-w-[1600px] px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bloomGold">
            Proud Coffee Women
          </div>
          <h2 className="section-title !mb-0 !text-left text-white">Women Leading the Change</h2>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
            <div className="bloom-card border-white/20 bg-white/10 p-3 backdrop-blur-sm md:p-4 max-w-md">
              <img
                src="/pcw.jpg"
                alt="Proud Coffee Women storytelling visual"
                className="w-full max-h-150 rounded-[10px] object-cover"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bloom-card border-white/20 bg-white/10 p-6 text-white/90 backdrop-blur-sm">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                  <Users className="h-5 w-5" />
                </div>
                <p className="text-base leading-relaxed text-black">
                  The system is operated by teams of Proud Coffee Women (PCW)-women entrepreneurs who manage coffee processing and circular energy systems within their communities.
                </p>
              </div>
              <div className="bloom-card border-white/20 bg-white/10 p-6 text-white/90 backdrop-blur-sm">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <p className="text-base leading-relaxed text-black">
                  The PCW label identifies coffee produced within the 3rd Harvest system, representing a new generation of regenerative coffee production.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/pcw")}
            className="group mt-4 inline-flex items-center cursor-pointer justify-center rounded-[10px] bg-bloomGold px-10 py-5 text-sm font-bold tracking-[0.08em] text-white transition-all hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)]"
          >
            <span>More on Proud Coffee Women</span>
            <span className="ml-3 rounded-full bg-white/20 p-1 transition-colors group-hover:bg-white group-hover:text-bloomGold">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
