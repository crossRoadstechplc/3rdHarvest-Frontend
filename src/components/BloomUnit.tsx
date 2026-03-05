import { ArrowRight, Flame, Leaf, CookingPot, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const BloomUnit = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Solar-powered coffee pulping",
      description: "Coffee cherries are processed with renewable solar energy.",
      icon: Sun,
    },
    {
      title: "Biogas generation from coffee waste",
      description: "Coffee pulp is converted into clean, usable energy.",
      icon: Flame,
    },
    {
      title: "Clean cooking energy for households",
      description: "Communities use cleaner fuel instead of traditional firewood.",
      icon: CookingPot,
    },
    {
      title: "Compost production for soil regeneration",
      description: "Organic outputs return nutrients to farms and improve soils.",
      icon: Leaf,
    },
  ];

  return (
    <section id="model" className="bg-white py-28">
      <div className="mx-auto max-w-[1600px] px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-bloomGold/10 border border-bloomGold/20 text-bloomGold text-xs font-bold uppercase tracking-[0.2em]">
            The System
          </div>
          <h2 className="section-title !mb-0 !text-left">The 3rd Harvest System</h2>
          <p className="max-w-4xl text-lg leading-relaxed text-muted-foreground">
            At the center of the initiative is the TriveraPro Unit, an integrated technology platform that combines:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {cards.map(({ title, description, icon: Icon }) => (
            <div key={title} className="bloom-card border-bloomGreen/10 bg-bloomLightGreen/30 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-bloomGold/20 text-bloomGreen">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-semibold text-bloomGreen">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-4xl text-lg leading-relaxed text-muted-foreground">
          This system transforms coffee waste into energy and nutrients while increasing the value captured from coffee processing.
        </p>

        <div className="mt-10">
          <button
            onClick={() => navigate("/triverapro")}
            className="group inline-flex items-center justify-center cursor-pointer rounded-[10px] bg-bloomGold px-10 py-5 text-sm font-bold tracking-[0.08em] text-white transition-all duration-300 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)]"
          >
            <span>Discover TriveraPro</span>
            <span className="ml-3 rounded-full bg-white/20 p-1 transition-colors group-hover:bg-white group-hover:text-bloomGold">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
