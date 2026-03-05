import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContactModal } from "@/components/ContactModalProvider";

export const Implementation = () => {
  const { openContactModal } = useContactModal();

  return (
    <section id="implementation" className="bg-bloom-gradient py-28">
      <div className="mx-auto max-w-[1600px] px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bloomGold">
            A Collaborative Platform
          </div>
          <h2 className="section-title !mb-0 !text-left text-white">Working Together for Regenerative Coffee</h2>
          <p className="max-w-4xl text-lg leading-relaxed text-black/90">
            3rd Harvest operates as a collaborative platform connecting coffee companies, development organizations, philanthropic institutions, and local partners.
          </p>
          <p className="max-w-4xl text-lg leading-relaxed text-black/90">
            By aligning development resources with private-sector participation, the initiative enables scalable solutions for coffee communities and supply chains.
          </p>
          <p className="max-w-4xl text-lg leading-relaxed text-black/90">Partners may include:</p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              "Coffee companies",
              "Foundations and development organizations",
              "Local implementation partners",
            ].map((partnerType) => (
              <div key={partnerType} className="bloom-card border-white/20 bg-white/10 p-5 text-white backdrop-blur-sm">
                <p className="font-medium text-black">{partnerType}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={openContactModal}
              className="group inline-flex items-center cursor-pointer justify-center rounded-[10px] bg-bloomGold px-10 py-5 text-sm font-bold tracking-[0.08em] text-white transition-all hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)]"
            >
              <span>Become a Partner</span>
              <div className="ml-3 rounded-full bg-white/20 p-1 transition-colors group-hover:bg-white group-hover:text-bloomGold">
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
