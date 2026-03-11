import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { Linkedin } from "lucide-react";
import { toast } from "sonner";
import { SectionContainer } from "@/components/public/SectionContainer";
import { sendContactMessage } from "@/lib/contact/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const normalizedEmail = formData.email.trim();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const composedMessage = formData.organization.trim()
        ? `Organization: ${formData.organization.trim()}\n\n${formData.message.trim()}`
        : formData.message.trim();

      await sendContactMessage({
        name: formData.name.trim(),
        email: normalizedEmail,
        message: composedMessage,
        source: "contact-section",
      });

      toast.success("Message delivered successfully!");
      setFormData({ name: "", organization: "", email: "", message: "" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unable to send message right now.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <a className="font-bold" href="mailto:info@3rdharvest.org">Email: info@3rdharvest.org</a>
              <br /><br />
              <p>Global initiative working with regional partners across coffee-producing regions.</p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">SOCIAL MEDIA</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold uppercase tracking-[0.08em] text-bloomDarkCoffee/75">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="inline-flex items-center rounded-[10px] border border-black/15 p-2 hover:border-bloomGreen/40 hover:text-bloomGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60"
                >
                  <Linkedin size={18} aria-hidden="true" />
                </a>
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
            <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Name</label>
                  <input
                    type="text"
                    aria-label="Name"
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                    required
                    disabled={isSubmitting}
                    className="w-full rounded-[10px] border border-black/35 bg-white px-4 py-3 text-bloomDarkCoffee focus:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Organization</label>
                  <input
                    type="text"
                    aria-label="Organization"
                    value={formData.organization}
                    onChange={(event) => setFormData((prev) => ({ ...prev, organization: event.target.value }))}
                    disabled={isSubmitting}
                    className="w-full rounded-[10px] border border-black/35 bg-white px-4 py-3 text-bloomDarkCoffee focus:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Email</label>
                <input
                  type="email"
                  aria-label="Email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-[10px] border border-black/35 bg-white px-4 py-3 text-bloomDarkCoffee focus:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Message</label>
                <textarea
                  rows={4}
                  aria-label="Message"
                  value={formData.message}
                  onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-[10px] border border-black/35 bg-white px-4 py-3 text-bloomDarkCoffee focus:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60 disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-[10px] bg-bloomGreen px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-bloomGreen/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </form>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
};
