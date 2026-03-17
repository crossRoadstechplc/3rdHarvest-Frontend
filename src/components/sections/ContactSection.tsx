import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { SectionContainer } from "@/components/public/SectionContainer";
import { sendContactMessage } from "@/lib/contact/email";
import { SOCIAL_LINKS } from "@/lib/socialLinks";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
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
      const composedMessage = formData.lastname.trim()
        ? `Last Name: ${formData.lastname.trim()}\n\n${formData.message.trim()}`
        : formData.message.trim();

      await sendContactMessage({
        name: formData.name.trim() + " " + formData.lastname.trim(),
        email: normalizedEmail,
        message: composedMessage,
        source: "3rd Harvest",
      });

      toast.success("Message delivered successfully!");
      setFormData({ name: "", lastname: "", email: "", message: "" });
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
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.05fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bloom-panel relative overflow-hidden p-6 md:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-bloomGreen/75" />
            <p className="text-xl font-semibold uppercase tracking-[0.16em] text-bloomGold">CONTACT</p>
            <h2 className="mt-3 text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">
              For inquiries and program information:
            </h2>

            <div className="mt-7 space-y-5 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              <div className="rounded-[12px] border border-bloomGreen/15 bg-white/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bloomGold">Email</p>
                <a className="mt-2 inline-block text-lg font-semibold text-bloomDarkCoffee hover:text-bloomGreen" href="mailto:info@3rdharvest.org">
                  info@3rdharvest.org
                </a>
              </div>
              <p>Global initiative working with regional partners across coffee-producing regions.</p>
            </div>

            <div className="mt-8 rounded-[12px] border border-bloomGreen/15 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">SOCIAL MEDIA</p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm font-semibold uppercase tracking-[0.08em] text-bloomDarkCoffee/75">
                {SOCIAL_LINKS.map((link) => {
                  const icon =
                    link.id === "linkedin" ? (
                      <Linkedin size={18} aria-hidden="true" />
                    ) : link.id === "x" ? (
                      <span className="text-[15px] font-black leading-none">X</span>
                    ) : link.id === "instagram" ? (
                      <Instagram size={18} aria-hidden="true" />
                    ) : (
                      <Facebook size={18} aria-hidden="true" />
                    );

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      title={link.label}
                      className="inline-flex items-center rounded-[10px] border border-bloomGreen/20 bg-white p-2.5 hover:border-bloomGreen/50 hover:text-bloomGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60"
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="bloom-panel relative overflow-hidden p-6 md:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-bloomGold/70" />
            <div className="relative">
              <p className="text-xl font-semibold uppercase tracking-[0.16em] text-bloomGold">Contact Form</p>
              <h3 className="mt-2 font-serif text-2xl text-bloomDarkCoffee">Send a Message</h3>
              <p className="mt-2 text-sm leading-relaxed text-bloomDarkCoffee/70">
                Share your inquiry and the team will follow up.
              </p>
            </div>

            <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Name</label>
                  <input
                    type="text"
                    aria-label="Name"
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                    required
                    disabled={isSubmitting}
                    className="w-full rounded-[12px] border border-bloomGreen/25 bg-white px-4 py-3 text-bloomDarkCoffee shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition focus:outline-none focus-visible:border-bloomGold/70 focus-visible:ring-2 focus-visible:ring-bloomGold/35 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Last Name</label>
                  <input
                    type="text"
                    aria-label="Last Name"
                    value={formData.lastname}
                    onChange={(event) => setFormData((prev) => ({ ...prev, lastname: event.target.value }))}
                    disabled={isSubmitting}
                    className="w-full rounded-[12px] border border-bloomGreen/25 bg-white px-4 py-3 text-bloomDarkCoffee shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition focus:outline-none focus-visible:border-bloomGold/70 focus-visible:ring-2 focus-visible:ring-bloomGold/35 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Email</label>
                <input
                  type="email"
                  aria-label="Email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-[12px] border border-bloomGreen/25 bg-white px-4 py-3 text-bloomDarkCoffee shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition focus:outline-none focus-visible:border-bloomGold/70 focus-visible:ring-2 focus-visible:ring-bloomGold/35 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/70">Message</label>
                <textarea
                  rows={5}
                  aria-label="Message"
                  value={formData.message}
                  onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-[12px] border border-bloomGreen/25 bg-white px-4 py-3 text-bloomDarkCoffee shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition focus:outline-none focus-visible:border-bloomGold/70 focus-visible:ring-2 focus-visible:ring-bloomGold/35 disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-[12px] bg-bloomGreen px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-bloomGreen/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60 disabled:cursor-not-allowed disabled:opacity-60"
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
