import { Award, Fingerprint, Globe, ShieldCheck, BookmarkCheck } from "lucide-react";
import { motion } from "framer-motion";

export const PCW = () => {
  return (
    <section id="pcw" className="bg-bloom-gradient relative overflow-hidden py-24">
      {/* Decorative Background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-bloomGold/5 rounded-full blur-3xl text-white" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-left md:text-center max-w-4xl mx-auto mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bloomGold/10 border border-bloomGold/20 text-bloomGold text-xs font-bold uppercase tracking-[0.2em] mb-8"
          >
            <BookmarkCheck className="w-4 h-4" />
            Trademarked Identity
          </motion.div>
          <h2 className="section-title">Proud Coffee Women™</h2>
          <p className="section-subtitle">
            PCW is more than a label; it is a market-facing identity that empowers women operators with a distinct specialty brand and origin-authored narrative.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ===== PCW LOGO FEATURE ===== */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative group"
          >
            <div className="bloom-card bg-bloomGreen p-8 md:p-10 flex flex-col items-center justify-center transition-all duration-700 hover:shadow-[0_24px_48px_rgba(28,59,43,0.25)]">
              {/* PCW Logo Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative z-10 mb-8 w-full max-w-xs bg-white rounded-[10px] shadow-xl flex items-center justify-center overflow-hidden"
              >
                <img
                  src="/pcw.jpg"
                  alt="Proud Coffee Women (PCW) logo"
                  className="w-full max-h-72 object-cover p-3 group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              <div className="text-center">
                <h3 className="text-3xl font-bold text-bloomBeige mb-6 tracking-tight">A Story of Identity and Leadership</h3>
                <p className="text-black text-lg leading-relaxed opacity-90 max-w-md">
                  The PCW logo tells a simple story: women lead the process, communities capture more value, and regenerative systems become visible to buyers.
                </p>
                <div className="mt-6 space-y-3 text-left max-w-md mx-auto">
                  {[
                    "Women-led operation of circular coffee systems",
                    "Traceable coffee linked to real community enterprises",
                    "A recognizable label for regenerative impact",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3 text-bloomBeige/90">
                      <div className="mt-2 h-2 w-2 rounded-full bg-bloomGold shrink-0" />
                      <p className="text-sm leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, rotate: 12, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              className="absolute -top-6 -right-6 bg-bloomGold text-bloomGreen font-bold px-5 py-3 rounded-[10px] shadow-xl flex items-center gap-2 border-2 border-white z-20"
            >
              <Award className="w-5 h-5" />
              <span className="text-sm md:text-base">Specialty Grade</span>
            </motion.div>
          </motion.div>

          {/* ===== KEY PILLARS ===== */}
          <div className="space-y-10">

            {/* Pillar Item Mapping */}
            {[
              { icon: Globe, title: "Origin-Authored Narrative", text: "We return the narrative to the producer. PCW allows women to define their own value and represent their heritage directly to the buyer." },
              { icon: Fingerprint, title: "Digital Traceability", text: "Every PCW lot is backed by unit-integrated data tracking. Buyers can trace the exact date, unit, and operator cluster that produced their coffee." },
              { icon: ShieldCheck, title: "Structural Validation", text: "The trademark identifies coffee that has been processed using 3RD HARVEST's sustainable technical standards, ensuring consistency and excellence." }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (idx * 0.3), duration: 1.0 }}
                  className="flex gap-8 group md:flex-row flex-col sm:flex-row"
                >
                  <div className="w-16 h-16 shrink-0 bg-white rounded-[10px] shadow-sm flex items-center justify-center border border-bloomGreen/5 group-hover:bg-bloomGreen transition-colors duration-500">
                    <Icon className="w-8 h-8 text-bloomGreen group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3 text-bloomGreen tracking-tight">{pillar.title}</h4>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {pillar.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>

        {/* Global Market Bridge */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="mt-28 p-14 rounded-[10px] bg-white border border-bloomGreen/10 shadow-xl text-left md:text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-3 h-full bg-bloomGold" />
          <div className="absolute top-0 left-0 w-full h-full bg-bloomGold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <p className="text-3xl font-serif font-bold text-bloomGreen max-w-4xl mx-auto leading-relaxed italic relative z-10">
            "Empowering women to capture a greater share of the coffee value chain through a distinct, data-backed specialty brand."
          </p>
        </motion.div>

      </div>
    </section>
  );
};
