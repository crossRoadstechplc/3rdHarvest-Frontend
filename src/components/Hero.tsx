"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useContactModal } from "@/components/ContactModalProvider";

export const Hero = () => {
  const { openContactModal } = useContactModal();
  const images = ["/hero0.webp", "/hero2.webp", "/hero3.png", "/hero1.png"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, [images.length]);

  const scrollToAbout = () => {
    document.getElementById("context")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden p-0">
      <div className="absolute inset-0 bg-black">
        <AnimatePresence initial={false}>
          <motion.img
            key={current}
            src={images[current]}
            alt="Coffee community landscape"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/50" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] items-center px-8 py-32 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-5xl space-y-7"
        >
          

          <h1 className="text-4xl font-bold leading-tight text-bloomGold! md:text-6xl lg:text-7xl">
            Unlocking Multiple Harvests from a Single Coffee Crop
          </h1>

          <p className="max-w-4xl text-lg leading-relaxed text-white/90 md:text-2xl">
            3rd Harvest is an origin-led initiative transforming coffee production through women-led entrepreneurship, renewable energy, and circular agriculture.
          </p>

          <div className="inline-flex rounded-[10px] px-5 py-4 text-2xl font-bold text-bloomGold md:text-3xl">
            Coffee. Energy. Soil.
          </div>

          <div className="flex flex-wrap gap-4">
            {/* <button
              onClick={scrollToAbout}
              className="inline-flex items-center justify-center rounded-[10px] bg-bloomGold px-8 py-4 text-sm font-bold tracking-[0.08em] text-white transition-all hover:shadow-[0_20px_40px_rgba(212,166,87,0.35)]"
            >
              Explore the Program
            </button> */}
            <button
              onClick={openContactModal}
              className="inline-flex items-center cursor-pointer justify-center rounded-[10px] border border-white/40 px-8 py-4 text-sm font-bold tracking-[0.08em] text-white transition-all hover:bg-white hover:text-bloomGreen"
            >
              Partner with 3rd Harvest
            </button>
          </div>
        </motion.div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        aria-label="Scroll to next section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-bloomGold hover:text-bloomGold"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>
    </section>
  );
};
