import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
let hasLoadedInitially = false;

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(!hasLoadedInitially);

  useEffect(() => {
    if (hasLoadedInitially) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      hasLoadedInitially = true;
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute -left-20 top-12 h-56 w-56 rounded-full bg-[#b3872f]/18 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
            className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-[#496255]/16 blur-3xl"
          />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-8">
            {/* <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-4 text-xs tracking-[0.24em] text-[#496255]/75 uppercase"
            >
              Preparing Experience
            </motion.p> */}

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative flex items-end gap-2 text-4xl font-black tracking-tight md:text-5xl lg:text-7xl"
              style={{ fontFamily: "\"Times New Roman\", Times, serif" }}
            >
              <span className="inline-flex items-start text-[#b3872f]">
                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.93 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.85, ease: "easeOut", delay: 0.2 }}
                  className="leading-[0.88] text-[1.24em]"
                >
                  3
                </motion.span>
                <motion.sup
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: "easeOut", delay: 0.45 }}
                  className="ml-[0.05em] text-[0.5em] leading-none lowercase"
                >
                  rd
                </motion.sup>
              </span>

              <motion.span
                initial={{ opacity: 0, y: 10, x: 4 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.85, ease: "easeOut", delay: 0.32 }}
                className="text-[#496255]"
              >
                Harvest
              </motion.span>

              <motion.span
                initial={{ x: "-120%", opacity: 0 }}
                animate={{ x: "120%", opacity: [0, 0.45, 0] }}
                transition={{ duration: 1.6, ease: "easeInOut", delay: 0.95 }}
                className="pointer-events-none absolute inset-y-1 -left-20 w-16 bg-gradient-to-r from-transparent via-white/95 to-transparent blur-[1px]"
                aria-hidden="true"
              />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              className="relative mt-8 h-[2px] w-56 overflow-hidden rounded-full bg-black/10 md:w-72"
            >
              <motion.span
                initial={{ left: "-6rem" }}
                animate={{ left: "100%" }}
                transition={{ duration: 2.35, ease: "easeInOut", repeat: Infinity }}
                className="absolute inset-y-0 w-24 bg-gradient-to-r from-[#b3872f]/20 via-[#496255]/70 to-[#b3872f]/20"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-6 flex items-center gap-2"
            />

            {/* <div className="mt-6 flex items-center gap-2">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className={`h-1.5 w-1.5 rounded-full ${dot === 1 ? "bg-[#496255]/70" : "bg-[#b3872f]/60"}`}
                  animate={{ y: [0, -4, 0], opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.16, ease: "easeInOut" }}
                />
              ))}
            </div> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
