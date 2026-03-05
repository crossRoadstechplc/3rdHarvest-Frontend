import { Handshake, Building2, Globe, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Partners = () => {
  const partners = [
    {
      icon: Building2,
      name: "Coffee Industry Partners",
      role: "Value Chain Integration",
      description:
        "Coffee companies and industry actors can participate by supporting the deployment of 3rd Harvest systems, contributing to women-led circular coffee systems while engaging directly with PCW producer networks."
    },
    {
      icon: Globe,
      name: "Development & Philanthropic Partners",
      role: "Funding & Capacity Building",
      description:
        "Foundations, development agencies, and climate funds can support the expansion of the 3rd Harvest program by funding community deployments and capacity-building activities for scalable climate and sustainability interventions."
    },
    {
      icon: HeartHandshake,
      name: "Implementation Partners",
      role: "Local Program Delivery",
      description:
        "Local organizations and program implementers can participate in the deployment and operation of 3rd Harvest systems, supporting community engagement, training, and program delivery at the local level."
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8 } },
  };

  const navigate = useNavigate();

  const handleBecomePartner = () => {
    navigate("/partner");
  };

  return (
    <section id="partners" className="bg-bloom-gradient relative overflow-hidden py-32">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-bloomGold opacity-[0.02] transform skew-x-12 translate-x-1/4 text-white" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 flex flex-col items-center z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl mb-20 flex flex-col items-start md:items-center justify-start md:justify-center text-left md:text-center"
        >
          <h2 className="section-title">A Collaborative Platform</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Working Together for Regenerative Coffee. 3rd Harvest operates as a collaborative platform connecting coffee companies, development organizations, philanthropic institutions, and local partners. By aligning development resources with private-sector participation, the initiative enables scalable solutions for coffee communities and supply chains.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10"
          >
            <button
              onClick={handleBecomePartner}
              className="group inline-flex items-center justify-center px-10 py-5 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
            >
              <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                Become a Partner
              </span>
              <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </motion.div>
        </motion.div>

        {/* Partner Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
        >
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bloom-card border-none bg-white shadow-xl hover:shadow-2xl transition-all duration-700 group rounded-[10px] p-10"
              >
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-bloomGreen/5 rounded-[10px] flex items-center justify-center mb-8 group-hover:bg-bloomGreen transition-all duration-700 group-hover:rotate-6">
                    <Icon className="w-10 h-10 text-bloomGreen group-hover:text-white" />
                  </div>

                  <h3 className="text-3xl font-serif font-bold mb-3 text-bloomGreen">
                    {partner.name}
                  </h3>

                  <div className="text-sm font-bold text-bloomGold uppercase tracking-[0.2em] mb-8 border-b border-bloomGold/10 pb-6">
                    {partner.role}
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Strategic Alignment Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-28 p-12 md:p-20 rounded-[10px] bg-white border border-bloomGreen/5 shadow-2xl backdrop-blur-md relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-bloomGold/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-bloomGold/10 transition-colors duration-1000" />

          <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="md:w-1/4 flex justify-center"
            >
              <div className="w-40 h-40 bg-bloomGreen rounded-[10px] rotate-12 flex items-center justify-center shadow-2xl group transition-all duration-700">
                <Handshake className="w-20 h-20 text-bloomGold" />
              </div>
            </motion.div>
            <div className="md:w-3/4">
              <h3 className="text-4xl font-serif font-bold text-bloomGreen mb-8 leading-tight">Cross-Sector Collaboration</h3>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                By combining technical innovation (SPX) with gender-focused implementation (MCRO-A) and market-driven sustainability leaders, we are creating an ecosystem where origin-authored prosperity is the new standard.
              </p>
              <div className="flex items-center gap-4 text-bloomGreen font-bold text-lg">
                <ShieldCheck className="w-7 h-7 text-bloomGold" />
                <span className="tracking-tight">Validated Implementation Model</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
