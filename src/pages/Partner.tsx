import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useContactModal } from "@/components/ContactModalProvider";

const Partner = () => {
  const { openContactModal } = useContactModal();

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
            <p className="text-sm uppercase tracking-[0.2em] font-bold text-bloomGold mb-4">PARTNER WITH 3rd HARVEST</p>
            <h1 className="section-title">Partner with 3rd Harvest</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              Building the Future of Regenerative Coffee Together
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-6">
              3rd Harvest is a collaborative platform connecting coffee companies, development organizations, philanthropic institutions, and local partners to deploy circular coffee systems in producing communities.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-4">
              By aligning development funding with private-sector participation, the initiative enables scalable solutions that strengthen coffee supply chains while improving livelihoods and environmental outcomes.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-4">
              Organizations can participate in the program through several partnership pathways.
            </p>
          </motion.div>

          <div className="space-y-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Coffee Industry Partners</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Coffee companies and industry actors can participate by supporting the deployment of 3rd Harvest systems in coffee-producing communities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Through participation in the program, companies contribute to the development of women-led circular coffee systems while engaging directly with Proud Coffee Women producer networks.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 font-bold">Partners receive:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  verified ESG impact reporting
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  association with the 3rd Harvest program
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  authorization to use the Proud Coffee Women (PCW) label in connection with program participation
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  storytelling opportunities connected to regenerative coffee production
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  preferred engagement opportunities with PCW producers
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                This partnership enables companies to support measurable climate, social, and supply-chain impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Development & Philanthropic Partners</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Foundations, development agencies, and climate funds can support the expansion of the 3rd Harvest program by funding community deployments and capacity-building activities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The program offers a scalable model for delivering integrated outcomes across gender empowerment, renewable energy access, and regenerative agriculture.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 font-bold">Development partners benefit from:</p>
              <ul className="space-y-2">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  measurable development outcomes
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  scalable climate and sustainability interventions
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  transparent impact measurement through the 3rd Harvest Impact Framework
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGreen shrink-0" />
                  collaboration with private-sector actors within coffee supply chains
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Implementation Partners</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Local organizations and program implementers can participate in the deployment and operation of 3rd Harvest systems.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">Implementation partners support activities such as:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  community engagement
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  training and capacity building
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  program delivery at the local level
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-bloomGold shrink-0" />
                  monitoring and reporting
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                These partnerships enable the program to scale effectively across coffee-producing regions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bloom-card p-10"
            >
              <h2 className="text-3xl font-bold text-bloomGreen mb-6">Program Stewardship</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The 3rd Harvest initiative was developed by SPX, which serves as the program steward and technology developer behind the TriveraPro system.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                SPX works with a network of community partners, including organizations such as MCRO (Mother and Child Rehabilitation Organization), to support program implementation and engagement with coffee-producing communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bloom-card p-10 bg-bloomGreen text-bloomBeige"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Join the Initiative</h2>
              <p className="text-black/90 leading-relaxed mb-8">
                Organizations interested in participating in the 3rd Harvest initiative are invited to connect with the program team to explore partnership opportunities.
              </p>
              <button
                onClick={openContactModal}
                className="group inline-flex items-center justify-center px-10 py-5 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
              >
                <span className="relative z-10 text-sm font-bold tracking-[0.08em]">Become a Partner</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-left md:text-center"
            >
              <p className="text-2xl font-serif font-bold text-bloomGreen italic">
                3rd Harvest connects the coffee industry, development partners, and communities to unlock new value from coffee production.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Partner;
