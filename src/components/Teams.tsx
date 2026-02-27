import { Users, GraduationCap, Building2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export const Teams = () => {
  return (
    <section id="enterprise" className="bg-bloom-gradient relative overflow-hidden py-24">
      {/* Decorative Orbs */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-bloomGreen/5 rounded-full blur-3xl text-white" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="section-title">Women & Enterprise</h2>
          <p className="section-subtitle">
            The Third Harvest prioritizes women-led operator clusters to ensure that technological advancements translate directly into localized economic agency and leadership.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Main Content Area */}
          <div className="space-y-12">

            {/* Operator Clusters */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.3 }}
              className="flex gap-6"
            >
              <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-bloomGreen/5">
                <Users className="w-8 h-8 text-bloomGreen" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-bloomGreen">Women-Led Operator Clusters</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We organize young women into localized operator clusters, providing them with the tools and training to manage infrastructure as a collective enterprise. This model fosters ownership and ensures that value remains within the community.
                </p>
              </div>
            </motion.div>

            {/* Comprehensive Training */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.5 }}
              className="flex gap-6"
            >
              <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-bloomGreen/5">
                <GraduationCap className="w-8 h-8 text-bloomGreen" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-bloomGreen">Strategic Skill Training</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Capacity building extends beyond basic operation. Our training curriculum covers technical maintenance, financial management, and long-term project monitoring.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {["Technical Excellence", "Financial Mastery", "Preventative Maintenance", "Impact Monitoring"].map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.7 + (idx * 0.2) }}
                      className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-bloomGreen/10 text-sm font-bold text-bloomGreen shadow-sm"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Partnership */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.7 }}
              className="flex gap-6"
            >
              <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-bloomGreen/5">
                <Building2 className="w-8 h-8 text-bloomGreen" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-bloomGreen">MCRO-A Partnership</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In collaboration with MCRO-A, a prominent women-focused Ethiopian NGO, we ensure localized implementation that respects cultural nuances while driving structural reform.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Impact Visual / Side Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="relative"
          >
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
              <img
                src="/teams.webp"
                alt="Women-led enterprise training"
                className="w-full h-[650px] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bloomGreen/90 via-bloomGreen/20 to-transparent" />

              {/* Overlay Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="absolute bottom-10 left-10 right-10"
              >
                <div className="bloom-card border-none bg-white/95 backdrop-blur-md p-10 shadow-2xl rounded-3xl">
                  <div className="flex items-center gap-3 mb-4 text-bloomGold">
                    <ShieldCheck className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Enterprise Validation</span>
                  </div>
                  <h4 className="text-2xl font-bold text-bloomGreen mb-3">Sustainable Livelihoods</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    By transitioning from labor-intensive activities to enterprise management, women operators achieve a "Third Harvest" of social and economic standing.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
