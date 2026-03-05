import { motion } from "framer-motion";
import { Coffee, Leaf, Zap } from "lucide-react";

export const About = () => {
  const highlights = [
    { label: "Coffee", icon: Coffee },
    { label: "Energy", icon: Zap },
    { label: "Soil", icon: Leaf },
  ];

  return (
    <section id="context" className="bg-bloom-gradient py-28">
      <div className="mx-auto max-w-[1600px] px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-5"
        >
          <div className="space-y-6 lg:col-span-3">
            <div className="inline-flex rounded-full border border-bloomGold/25 bg-bloomGold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bloomGold">
              The Idea
            </div>
            <h2 className="section-title !mb-0 !text-left">A New Model for Coffee Communities</h2>
            <div className="bloom-card bg-white/80">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Coffee production generates more than just coffee. When integrated into a circular system, it can produce renewable energy, regenerate soils, and create new economic opportunities for women.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                3rd Harvest brings these elements together into a single system that enables coffee communities to unlock multiple harvests from the same crop.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 pt-16">
              {highlights.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="bloom-card flex items-center gap-4 border-bloomGreen/15 bg-white/75 p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bloomGreen/10 text-bloomGreen">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-semibold text-bloomGreen">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
