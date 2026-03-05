import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { motion } from "framer-motion";
import { Building2, Globe, HeartHandshake, Handshake } from "lucide-react";

const PartnerWith3rdHarvest = () => {
  const partners = [
    {
      icon: Building2,
      name: "Coffee Industry Partners",
      role: "Value Chain Integration",
      description: "Coffee companies and industry actors can participate by supporting the deployment of 3rd Harvest systems in coffee-producing communities. Through participation in the program, companies contribute to the development of women-led circular coffee systems while engaging directly with Proud Coffee Women producer networks.",
      benefits: [
        "Verified ESG impact reporting",
        "Association with the 3rd Harvest program",
        "Authorization to use the Proud Coffee Women (PCW) label in connection with program participation",
        "Storytelling opportunities connected to regenerative coffee production",
        "Preferred engagement opportunities with PCW producers"
      ]
    },
    {
      icon: Globe,
      name: "Development & Philanthropic Partners",
      role: "Funding & Capacity Building",
      description: "Foundations, development agencies, and climate funds can support the expansion of the 3rd Harvest program by funding community deployments and capacity-building activities. The program offers a scalable model for delivering integrated outcomes across gender empowerment, renewable energy access, and regenerative agriculture.",
      benefits: [
        "Measurable development outcomes",
        "Scalable climate and sustainability interventions",
        "Transparent impact measurement through the 3rd Harvest Impact Framework",
        "Collaboration with private-sector actors within coffee supply chains"
      ]
    },
    {
      icon: HeartHandshake,
      name: "Implementation Partners",
      role: "Local Program Delivery",
      description: "Local organizations and program implementers can participate in the deployment and operation of 3rd Harvest systems. Implementation partners support activities such as:",
      activities: [
        "Community engagement",
        "Training and capacity building",
        "Program delivery at the local level",
        "Monitoring and reporting"
      ]
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
            <h1 className="section-title">Partner with 3rd Harvest</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              Building the Future of Regenerative Coffee Together
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-6">
              3rd Harvest is a collaborative platform connecting coffee companies, development organizations, philanthropic institutions, and local partners to deploy circular coffee systems in producing communities. By aligning development funding with private-sector participation, the initiative enables scalable solutions that strengthen coffee supply chains while improving livelihoods and environmental outcomes.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-4">
              Organizations can participate in the program through several partnership pathways.
            </p>
          </motion.div>

          <div className="space-y-16 mb-20">
            {partners.map((partner, index) => {
              const Icon = partner.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="bloom-card p-10"
                >
                  <div className="flex gap-6 mb-6">
                    <div className="w-20 h-20 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-10 h-10 text-bloomGreen" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-bloomGold uppercase tracking-[0.2em] mb-2">
                        {partner.role}
                      </div>
                      <h2 className="text-3xl font-bold text-bloomGreen mb-4">{partner.name}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {partner.description}
                      </p>
                      {partner.benefits && (
                        <div>
                          <p className="font-bold text-bloomGreen mb-3">Partners receive:</p>
                          <ul className="space-y-2">
                            {partner.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex gap-4 text-muted-foreground">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {partner.activities && (
                        <div>
                          <ul className="space-y-2">
                            {partner.activities.map((activity, idx) => (
                              <li key={idx} className="flex gap-4 text-muted-foreground">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="bloom-card p-10 bg-bloomGreen text-bloomBeige"
          >
            <div className="flex gap-6">
              <div className="w-20 h-20 bg-white/10 rounded-[10px] flex items-center justify-center flex-shrink-0">
                <Handshake className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Program Stewardship</h2>
                <p className="text-black/90 leading-relaxed">
                  The 3rd Harvest initiative was developed by SPX, which serves as the program steward and technology developer behind the TriveraPro system. SPX works with a network of community partners, including organizations such as MCRO (Mother and Child Rehabilitation Organization), to support program implementation and engagement with coffee-producing communities.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-left md:text-center mt-16"
          >
            <p className="text-2xl font-serif font-bold text-bloomGreen italic">
              3rd Harvest connects the coffee industry, development partners, and communities to unlock new value from coffee production.
            </p>
          </motion.div>
        </div>
      </section>
      <Contact />
      <Footer />
    </div>
  );
};

export default PartnerWith3rdHarvest;
