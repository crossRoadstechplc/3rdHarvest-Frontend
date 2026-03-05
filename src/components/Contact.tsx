import { useState, useEffect } from "react";
import { Mail, MapPin, Globe, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize EmailJS
    useEffect(() => {
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        if (publicKey) {
            emailjs.init(publicKey);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

            if (!serviceId || !templateId || !publicKey) {
                throw new Error("EmailJS configuration is missing. Please check your environment variables.");
            }

            const templateParams = {
                name: formData.name,
                email: formData.email,
                source: "3RD HARVEST",
                message: formData.message,
                to_email: import.meta.env.VITE_RECIPIENT_EMAIL || 'dawit@spxafrica.com',
            };

            await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            toast.success("Message delivered successfully!");
            setFormData({ name: "", email: "", message: "" });
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section id="contact" className="bg-white relative overflow-hidden py-24 border-t border-bloomGreen/5">
            {/* Decorative side accent */}
            <div className="absolute top-0 right-0 w-1/4 h-full bg-bloomGreen/[0.02] -skew-x-12 transform translate-x-1/2" />

            <div className="max-w-[1600px] mx-auto px-8 lg:px-12 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                    {/* Left Column: Strategic Engagement */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                    >
                        <h2 className="section-title text-left">Become a Partner</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                            3RD HARVEST is open to strategic partnerships with global coffee buyers, sustainability leaders, and technology innovators who share our vision for structural reform.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: Mail, label: "Email", value: "info@3rdharvest.com" },
                                { icon: MapPin, label: "Location", value: "Ethiopia" },
                                { icon: Globe, label: "Network", value: "Regional Decentralized Nodes" }
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + (idx * 0.2), duration: 0.8 }}
                                        className="flex items-center gap-6 group cursor-default"
                                    >
                                        <div className="w-16 h-16 rounded-[10px] bg-bloomGreen/5 flex items-center justify-center group-hover:bg-bloomGreen transition-all duration-500">
                                            <Icon className="w-7 h-7 text-bloomGreen group-hover:text-white" />
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

                    {/* Right Column: Interaction Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        className="bloom-card border-none bg-bloomGreen text-bloomBeige p-10 md:p-14 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40 blur-3xl" />

                        <div className="relative z-10">
                            <h3 className="text-3xl font-serif font-bold mb-8 leading-tight">Send a Message</h3>

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
                                    className="w-full bg-bloomGold cursor-pointer text-white font-bold py-5 rounded-[10px] hover:bg-white hover:text-bloomGreen transition-all shadow-xl flex items-center justify-center gap-3 text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed group/btn overflow-hidden relative"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <span className="relative z-10">Send Message</span>
                                            <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-10 text-center">
                                <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
                                    Strategic Reform in Progress
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
