"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Hero = () => {
  const images = [
    "/hero0.webp",
    "/hero2.webp",
    "/hero3.png",
    "/hero1.png", // 4th hero image - add this image to public folder
  ];

  const [current, setCurrent] = useState(0);
  
  // Multiple text variations synchronized with images
  const heroVariations = [
    [
      "Unlocking",
      "Multiple Harvests",
      "from a Single",
      "Coffee Crop"
    ],
    [
      "Transforming",
      "Coffee Production",
      "into Renewable",
      "Energy Systems"
    ],
    [
      "Creating",
      "Circular Value",
      "from One",
      "Coffee Harvest"
    ],
    [
      "Building",
      "Regenerative Systems",
      "through Women-Led",
      "Innovation"
    ],
  ];
  
  const heroLines = heroVariations[current];

  // Preload images to prevent white flash
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // Synchronized cycling: images and text change together
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000); // Change both image and text every 6 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToAbout = () => {
    document.getElementById("context")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToImplementation = () => {
    document.getElementById("implementation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end justify-start overflow-hidden p-0"
    >
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-black">
        <AnimatePresence initial={false}>
          <motion.img
            key={current}
            src={images[current]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.85) contrast(1.1)" }}
          />
        </AnimatePresence>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[2px] z-0 opacity-40" />
      </div>

      <div className="relative z-10 w-full pt-44 md:pt-30 mb-10 md:mb-30 px-10 pb-24 md:px-20 md:pb-32">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-10"
          >
            <div className="space-y-4 max-w-5xl">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="h-[2px] bg-bloomGold"
              />

              <div className="space-y-2 md:space-y-3 min-h-[280px] md:min-h-[320px]">
                <AnimatePresence mode="wait">
                  {heroLines.map((line, index) => (
                    <motion.div
                      key={`${current}-${index}`}
                      initial={{ opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        clipPath: "inset(0 0 0% 0)"
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: -30,
                        clipPath: "inset(100% 0 0% 0)"
                      }}
                      transition={{ 
                        duration: 0.8,
                        delay: current === 0 ? 1 + (index * 0.3) : index * 0.15,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="text-white font-serif font-bold tracking-tight"
                    >
                      <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] block">
                        {line}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex flex-wrap gap-4"
              >
                {/* <button
                  onClick={scrollToAbout}
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                    Explore the Program
                  </span>
                  <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000 ease-in-out" />
                </button> */}

                <button
                  onClick={scrollToImplementation}
                  className="inline-flex items-center justify-center cursor-pointer px-8 py-5 border border-white/40 text-white rounded-[10px] font-bold uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-bloomGreen transition-all"
                >
                  Partner with 3rd Harvest
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1.2 }}
                className="flex items-center gap-3 text-bloomGold text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] ml-2"
              >
                <span>Coffee. Energy. Soil.</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer z-20"
        onClick={scrollToAbout}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="flex flex-col items-center gap-2"
        >
          
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-bloomGold/20 group-hover:border-bloomGold transition-all duration-300">
            <ChevronDown className="w-5 h-5 text-white group-hover:text-bloomGold transition-colors" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
