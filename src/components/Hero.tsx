"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Hero = () => {
  const images = [
    "/hero0.webp",
    "/hero2.webp",
    "/hero3.webp",
    "/hero4.webp",
  ];

  const [current, setCurrent] = useState(0);
  const [typeText, setTypeText] = useState("");
  const fullText = "The Third Harvest: Unlocking Multiple Yields from One Crop.";
  const typeStarted = useRef(false);

  useEffect(() => {
    if (typeStarted.current) return;
    typeStarted.current = true;

    let i = 0;
    const speed = 55;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypeText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToAbout = () => {
    document.getElementById("context")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end justify-start overflow-hidden p-0"
    >
      {/* BACKGROUND CAROUSEL */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.85) contrast(1.1)" }}
          />
        </AnimatePresence>
        {/* Cinematic Backdrop Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[2px] z-0 opacity-40" />
      </div>

      {/* SIGNATURE TEXT BLOCK (Bottom Left, Aligned with Nav) */}
      <div className="relative z-10 w-full mb-10 md:mb-16 px-10 pb-24 md:px-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-10"
          >
            {/* Description Text */}
            <div className="space-y-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="h-[2px] bg-bloomGold mb-8"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-2xl md:text-3xl lg:text-4xl text-white font-serif font-medium tracking-tight max-w-3xl leading-[1.3]"
              >
                "Unlocking Multiple Yields from One Crop. Infrastructure for income, energy, and regeneration."
              </motion.p>
            </div>

            {/* Distinctive CTA + Metadata */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <button
                  onClick={scrollToAbout}
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-bloomGold text-white overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                    Explore the Model
                  </span>
                  <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  {/* Subtle hover sweep */}
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000 ease-in-out" />
                </button>
              </motion.div>

              {/* Context Pin (Moved under CTA) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1.2 }}
                className="flex items-center gap-3 text-white/50 text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] ml-2"
              >
                <span className="text-bloomGold">•</span>
                <span>Climate-Smart Infrastructure</span>
                <span className="hidden md:inline text-white/20">|</span>
                <span className="hidden md:inline">Ethiopian Highlands</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator Signature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-4 group cursor-pointer"
        onClick={scrollToAbout}
      >
        <span className="text-[10px] text-white/30 skew-x-[-12deg] font-bold uppercase tracking-widest group-hover:text-bloomGold transition-colors">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent group-hover:h-20 transition-all duration-700" />
      </motion.div>
    </section>
  );
};
