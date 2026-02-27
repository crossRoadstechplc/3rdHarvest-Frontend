import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Extended timeout to accommodate the more complex 3-second sequence
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <div className="relative px-8 flex flex-col items-center">
            {/* Main Animated Text */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif font-black uppercase tracking-tighter flex gap-3 text-3xl md:text-4xl lg:text-6xl"
            >
              <span className="word word-green word-left" data-text="THE">THE</span>
              <span className="word word-gold word-bottom" data-text="THIRD">THIRD</span>
              <span className="word word-green word-right" data-text="HARVEST">HARVEST</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
              className="h-[1px] w-48 bg-bloomGold mt-8 origin-center opacity-40"
            />
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
            .word {
              position: relative;
              color: transparent;
              -webkit-text-stroke: 1.5px #1c3b2b;
              display: inline-block;
            }
            
            .word-gold {
              -webkit-text-stroke: 1.5px #d4a858;
            }

            .word::after {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              white-space: nowrap;
            }

            /* SEQ 1: THE (Left to Right) & HARVEST (Right to Left) */
            .word-left::after {
              color: #1c3b2b;
              clip-path: inset(0 100% 0 0);
              animation: revealLTR 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
              animation-delay: 0.8s;
            }

            .word-right::after {
              color: #1c3b2b;
              clip-path: inset(0 0 0 100%);
              animation: revealRTL 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
              animation-delay: 0.8s;
            }

            /* SEQ 2: THIRD (Bottom Up) after Seq 1 completes */
            .word-bottom::after {
              color: #d4a858;
              clip-path: inset(100% 0 0 0);
              animation: revealBT 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
              animation-delay: 2.3s;
            }

            @keyframes revealLTR {
              0% { clip-path: inset(0 100% 0 0); }
              100% { clip-path: inset(0 0 0 0); }
            }

            @keyframes revealRTL {
              0% { clip-path: inset(0 0 0 100%); }
              100% { clip-path: inset(0 0 0 0); }
            }

            @keyframes revealBT {
              0% { clip-path: inset(100% 0 0 0); }
              100% { clip-path: inset(0 0 0 0); }
            }

            /* Responsive adjustments */
            @media (max-width: 768px) {
              .word {
                -webkit-text-stroke: 1px #1c3b2b;
              }
              .word-gold {
                -webkit-text-stroke: 1px #d4a858;
              }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
