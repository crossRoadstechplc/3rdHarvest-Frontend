import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { subscribeNewsletter } from "@/lib/api/newsletter";
import { PublicButton } from "@/components/public/PublicButton";
import { SectionContainer } from "@/components/public/SectionContainer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setSuccessMessage(null);
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await subscribeNewsletter(normalizedEmail, "homepage-newsletter");

      if (response.ok) {
        setSuccessMessage("Thank you for subscribing. You're on the list.");
        setEmail("");
        return;
      }

      setErrorMessage(response.error ?? "Unable to subscribe right now.");
    } catch {
      setErrorMessage("Unable to subscribe right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="relative py-24 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-[68%] -translate-y-1/2 bg-bloomGreen/10 border-y border-bloomGreen/20"
      />
      <SectionContainer size="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 bloom-panel mx-auto max-w-3xl px-5 py-7 text-center sm:px-6 md:px-10 md:py-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">NEWSLETTER</p>
          <h2 className="mt-3 text-3xl leading-tight text-bloomDarkCoffee md:text-4xl">
            Stay informed about developments in the 3rd Harvest initiative.
          </h2>

          <form className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:gap-2.5" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errorMessage) setErrorMessage(null);
                if (successMessage) setSuccessMessage(null);
              }}
              placeholder="Email"
              aria-label="Email address"
              required
              disabled={isSubmitting}
              className="w-full min-w-0 flex-1 rounded-[10px] border border-black/15 bg-white px-4 py-3 text-bloomDarkCoffee placeholder:text-bloomDarkCoffee/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60 disabled:opacity-70"
            />
            <PublicButton type="submit" disabled={isSubmitting} className="sm:w-auto">
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </PublicButton>
          </form>

          <div className="mt-4 min-h-6" aria-live="polite">
            {successMessage ? <p className="text-sm text-emerald-700">{successMessage}</p> : null}
            {errorMessage ? <p className="text-sm text-red-700">{errorMessage}</p> : null}
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
};
