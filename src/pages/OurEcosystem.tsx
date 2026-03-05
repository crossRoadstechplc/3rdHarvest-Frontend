import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Coffee, Users, Building2, Globe, HeartHandshake, Factory, Leaf, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OurEcosystem = () => {
  const navigate = useNavigate();

  const ecosystemActors = [
    {
      icon: Coffee,
      name: "Coffee Companies",
      description: "Industry leaders supporting the deployment of 3rd Harvest systems and engaging with PCW producer networks."
    },
    {
      icon: Globe,
      name: "Development Organizations",
      description: "Foundations and development agencies funding community deployments and capacity-building activities."
    },
    {
      icon: Building2,
      name: "Philanthropic Institutions",
      description: "Organizations supporting scalable climate and sustainability interventions."
    },
    {
      icon: HeartHandshake,
      name: "Local Implementation Partners",
      description: "Community organizations like MCRO supporting program delivery at the local level."
    },
    {
      icon: Factory,
      name: "SPX (Technology Developer)",
      description: "Ethiopia-based organization developing and stewarding the TriveraPro system and 3rd Harvest initiative."
    },
    {
      icon: Users,
      name: "Proud Coffee Women (PCW)",
      description: "Women entrepreneurs operating TriveraPro systems and leading circular coffee production in their communities."
    }
  ];

  return (
    <div className="min-h-screen">
      <BloomNav />
      <section className="bg-bloom-gradient relative overflow-hidden py-32">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-left md:text-center mb-20"
          >
            <h1 className="section-title">Our Ecosystem</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              A Collaborative Network for Regenerative Coffee
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-6">
              3rd Harvest operates as a collaborative platform connecting diverse actors across the coffee ecosystem. By aligning development resources with private-sector participation, the initiative enables scalable solutions for coffee-producing communities and supply chains.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {ecosystemActors.map((actor, index) => {
              const Icon = actor.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bloom-card p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-bloomGreen" />
                  </div>
                  <h3 className="text-2xl font-bold text-bloomGreen mb-4">{actor.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{actor.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="bloom-card p-10 bg-bloomGreen text-bloomBeige max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">How We Work Together</h2>
            <p className="text-black/90 leading-relaxed mb-6">
              The 3rd Harvest ecosystem brings together technical innovation, community engagement, market access, and sustainable development funding to create a comprehensive solution for regenerative coffee production.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 text-black/90">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                <p>SPX provides the TriveraPro technology platform and program stewardship</p>
              </div>
              <div className="flex gap-4 text-black/90">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                <p>Local partners like MCRO support community engagement and implementation</p>
              </div>
              <div className="flex gap-4 text-white/90">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                <p>Development and philanthropic partners provide funding for deployments</p>
              </div>
              <div className="flex gap-4 text-white/90">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                <p>Coffee companies engage with PCW producers and support system deployment</p>
              </div>
              <div className="flex gap-4 text-white/90">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                <p>Proud Coffee Women operate the systems and lead circular coffee production</p>
              </div>
            </div>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-left md:text-center mt-16 space-y-8"
            >
              <p className="text-2xl font-serif font-bold text-bloomGreen italic">
                Together, we're building a new model for coffee communities where value, energy, and regeneration flow from a single crop.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                  onClick={() => navigate("/partner")}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                    Join the Ecosystem
                  </span>
                  <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OurEcosystem;
