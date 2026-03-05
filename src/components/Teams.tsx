import { Users, GraduationCap, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Teams = () => {
  const navigate = useNavigate();

  const handleMeetPCW = () => {
    navigate("/proud-coffee-women");
  };

  return (
    <section id="enterprise" className="bg-bloom-gradient relative overflow-hidden py-24">
      {/* Decorative Orbs */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-bloomGreen/5 rounded-full blur-3xl text-white" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 relative z-10">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-left md:text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="section-title">Proud Coffee Women</h2>
          <p className="section-subtitle">
            Women Leading the Change. The system is operated by teams of Proud Coffee Women (PCW) —women entrepreneurs who manage coffee processing and circular energy systems within their communities. The PCW label identifies coffee produced within the 3rd Harvest system, representing a new generation of regenerative coffee production.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10"
          >
            <button
              onClick={handleMeetPCW}
              className="group inline-flex items-center justify-center px-10 py-5 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
            >
              <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                Meet Proud Coffee Women
              </span>
              <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

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
              <div className="w-16 h-16 shrink-0 bg-white rounded-[10px] shadow-sm flex items-center justify-center border border-bloomGreen/5">
                <Users className="w-8 h-8 text-bloomGreen" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-bloomGreen">New Role for Women</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In many coffee-producing regions, women play essential roles in farming and household management but often have limited access to income-generating opportunities. The PCW model creates new pathways for participation.
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
              <div className="w-16 h-16 shrink-0 bg-white rounded-[10px] shadow-sm flex items-center justify-center border border-bloomGreen/5">
                <GraduationCap className="w-8 h-8 text-bloomGreen" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-bloomGreen">The PCW Team Model</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Each Proud Coffee Women team consists of three women entrepreneurs who jointly operate a TriveraPro system within their community.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Coffee pulping and processing", "Biogas energy generation", "Clean cooking energy distribution", "Compost production for farms"].map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.7 + (idx * 0.2) }}
                      className="bg-white/80 backdrop-blur-sm p-4 rounded-[10px] border border-bloomGreen/10 text-sm font-bold text-bloomGreen shadow-sm"
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
              <div className="w-16 h-16 shrink-0 bg-white rounded-[10px] shadow-sm flex items-center justify-center border border-bloomGreen/5">
                <Building2 className="w-8 h-8 text-bloomGreen" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-bloomGreen">Coffee with Purpose</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Coffee produced through the PCW system represents more than a product—it reflects a production model where women entrepreneurs participate in value creation and renewable energy replaces traditional fuels.
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
            className="relative hidden lg:block"
          >
            <div className="rounded-[10px] overflow-hidden shadow-2xl relative group">
              <img
                src="/teams.png"
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
                <div className="bloom-card border-none bg-white/95 backdrop-blur-md p-10 shadow-2xl rounded-[10px]">
                  <div className="flex items-center gap-3 mb-4 text-bloomGold">
                    <ShieldCheck className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Enterprise Validation</span>
                  </div>
                  <h4 className="text-2xl font-bold text-bloomGreen mb-3">Sustainable Livelihoods</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    By transitioning from labor-intensive activities to enterprise management, women operators achieve a "3RD Harvest" of social and economic standing.
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
