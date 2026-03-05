import { motion } from "framer-motion";
import { Globe2, Recycle } from "lucide-react";

export const Vision = () => {
  return (
    <section id="vision" className="bg-white py-28">
      <div className="mx-auto max-w-[1600px] px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-flex rounded-full border border-bloomGold/20 bg-bloomGold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bloomGold">
            The Vision
          </div>
          <h2 className="section-title !mb-0 !text-left">A New Harvest for Coffee</h2>
          <p className="max-w-4xl text-lg leading-relaxed text-muted-foreground">
            3rd Harvest aims to expand circular coffee systems across producing regions, creating communities where agricultural waste becomes energy, soils are regenerated, and women entrepreneurs lead the next generation of coffee production.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bloom-card border-bloomGreen/10 bg-bloomLightGreen/30 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-bloomGreen/10 text-bloomGreen">
                <Globe2 className="h-5 w-5" />
              </div>
              <p className="font-medium text-bloomGreen">Regional expansion across coffee-producing regions.</p>
            </div>
            <div className="bloom-card border-bloomGreen/10 bg-bloomLightGreen/30 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-bloomGreen/10 text-bloomGreen">
                <Recycle className="h-5 w-5" />
              </div>
              <p className="font-medium text-bloomGreen">Circular systems where waste becomes energy and soils are regenerated.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
