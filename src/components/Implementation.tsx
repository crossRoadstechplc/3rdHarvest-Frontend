import { Building2, Users, Handshake, Globe } from "lucide-react";
import { motion } from "framer-motion";

export const Implementation = () => {
  return (
    <section id="implementation" className="bg-bloom-gradient relative overflow-hidden py-24">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-20 text-left md:text-center"
        >
          <h2 className="section-title">Program Stewardship</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The 3rd Harvest initiative was developed by SPX, an Ethiopia-based organization working at the intersection of coffee systems, technology, and sustainability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bloom-card p-10"
          >
            <div className="flex gap-6 mb-6">
              <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-bloomGreen" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-bloomGreen mb-4">SPX - Technology Developer</h3>
                <p className="text-muted-foreground leading-relaxed">
                  SPX serves as the program steward and technology developer behind the TriveraPro system. As an Ethiopia-based organization, SPX works at the intersection of coffee systems, technology, and sustainability to design and deploy infrastructure solutions.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bloom-card p-10"
          >
            <div className="flex gap-6 mb-6">
              <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-bloomGreen" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-bloomGreen mb-4">Community Partners</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Community engagement and implementation activities are carried out in collaboration with local partners such as MCRO (Mother and Child Rehabilitation Organization), a women-focused Ethiopian NGO that supports program implementation and engagement with coffee-producing communities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="bloom-card p-10 bg-bloomGreen text-bloomBeige max-w-4xl mx-auto"
        >
          <div className="flex gap-6">
            <div className="w-20 h-20 bg-white/10 rounded-[10px] flex items-center justify-center flex-shrink-0">
              <Handshake className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Collaborative Implementation</h3>
              <p className="text-black/90 leading-relaxed mb-6">
                Together with industry and development partners, the initiative aims to expand circular coffee systems across producing regions. By combining technical innovation (SPX) with gender-focused implementation (MCRO) and market-driven sustainability leaders, we are creating an ecosystem where origin-authored prosperity is the new standard.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  <span className="text-black">Locally designed, locally implemented infrastructure</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  <span className="text-black">Community-centered program delivery</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  <span className="text-black">Scalable solutions for coffee-producing communities</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
