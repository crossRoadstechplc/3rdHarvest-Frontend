import { useEffect, useState } from "react";
import { Mail, MapPin, Globe, ArrowRight, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = formData.email.trim();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.");
      }

      const templateParams = {
        name: formData.name,
        email: normalizedEmail,
        source: "3RD HARVEST",
        message: formData.message,
        to_email: import.meta.env.VITE_RECIPIENT_EMAIL || "dawit@spxafrica.com",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("Message delivered successfully!");
      setFormData({ name: "", email: "", message: "" });
      onClose();
    } catch (error) {
      console.error("EmailJS error:", error);
      const errorMessage = error instanceof Error ? error.message : "Cloud delivery failed. Please check your EmailJS keys.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative mx-auto max-w-6xl max-h-[92vh] overflow-y-auto rounded-[10px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close contact popup"
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            >
              <X className="w-5 h-5 text-bloomGreen" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title text-left">Become a Partner</h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                  3RD HARVEST is open to strategic partnerships with global coffee buyers, sustainability leaders, and technology innovators who share our vision for structural reform.
                </p>

                <div className="space-y-8">
                  {[
                    { icon: Mail, label: "Email", value: "info@3rdharvest.com" },
                    { icon: MapPin, label: "Location", value: "Ethiopia" },
                    { icon: Globe, label: "Network", value: "Regional Decentralized Nodes" },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + idx * 0.08, duration: 0.4 }}
                        className="flex items-center gap-6"
                      >
                        <div className="w-16 h-16 rounded-[10px] bg-bloomGreen/5 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-bloomGreen" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.2em] text-bloomGold mb-1">{item.label}</div>
                          <div className="text-xl font-bold text-bloomGreen tracking-tight">{item.value}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bloom-card border-none bg-bloomGreen text-bloomBeige p-8 md:p-10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40 blur-3xl" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif font-bold mb-8 leading-tight">Send an Inquiry</h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-70">Full Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/10 border border-white/10 rounded-[10px] px-5 py-4 focus:outline-none focus:border-bloomGold/50 transition-colors placeholder:text-white/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-70">Email Address</label>
                      <input
                        required
                        type="email"
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        title="Please enter a valid email address."
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-white/10 border border-white/10 rounded-[10px] px-5 py-4 focus:outline-none focus:border-bloomGold/50 transition-colors placeholder:text-white/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-70">Your Inquiry</label>
                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="How can we collaborate?"
                        className="w-full bg-white/10 border border-white/10 rounded-[10px] px-5 py-4 focus:outline-none focus:border-bloomGold/50 transition-colors placeholder:text-white/30 resize-none"
                      />
                    </div>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-bloomGold cursor-pointer text-white font-bold py-5 rounded-[10px] hover:bg-white hover:text-bloomGreen transition-all shadow-xl flex items-center justify-center gap-3 text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <span>Send</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
