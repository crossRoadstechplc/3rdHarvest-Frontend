import { motion } from "framer-motion";
import { SectionContainer } from "@/components/public/SectionContainer";

export const ContactSection = () => {
  return (
    <section id="contact" className="bloom-soft-section py-24 md:py-28">
      <SectionContainer size="wide">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bloom-panel p-6 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">CONTACT</p>
            <h2 className="mt-3 text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">For partnership inquiries and program information:</h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              <p>Email</p>
              <p className="font-semibold text-bloomGreen">info@3rdharvest.org</p>
              <p>Global initiative working with regional partners across coffee-producing regions.</p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">SOCIAL MEDIA</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold uppercase tracking-[0.08em] text-bloomDarkCoffee/75">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-bloomGreen">LinkedIn</a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-bloomGreen">Twitter / X</a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-bloomGreen">YouTube</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-bloomGreen">Instagram</a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="bloom-panel p-6 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">Contact Form:</p>
            <form className="mt-5 flex flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Name</label>
                  <input
                    type="text"
                    aria-label="Name"
                    required
                    className="w-full rounded-[10px] border border-black/15 bg-white px-4 py-3 text-bloomDarkCoffee focus:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Organization</label>
                  <input
                    type="text"
                    aria-label="Organization"
                    className="w-full rounded-[10px] border border-black/15 bg-white px-4 py-3 text-bloomDarkCoffee focus:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Email</label>
                <input
                  type="email"
                  aria-label="Email"
                  required
                  className="w-full rounded-[10px] border border-black/15 bg-white px-4 py-3 text-bloomDarkCoffee focus:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Message</label>
                <textarea
                  rows={4}
                  aria-label="Message"
                  required
                  className="w-full rounded-[10px] border border-black/15 bg-white px-4 py-3 text-bloomDarkCoffee focus:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-[10px] bg-bloomGreen px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-bloomGreen/90"
              >
                Send
              </button>
            </form>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
};
