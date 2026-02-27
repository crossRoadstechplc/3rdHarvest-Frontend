import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee,
  Heart,
  Users,
  TrendingUp,
  Award,
  HandHeart,
  BookOpen,
  Mail,
} from "lucide-react";

const navItems = [
  { id: "hero", label: "Home", icon: Coffee },
  { id: "context", label: "Context", icon: BookOpen },
  { id: "model", label: "Model", icon: Award },
  { id: "enterprise", label: "Enterprise", icon: Users },
  { id: "impact", label: "Impact", icon: TrendingUp },
  { id: "implementation", label: "Implementation", icon: Coffee },
  { id: "pcw", label: "PCW", icon: HandHeart },
  { id: "partners", label: "Partners", icon: Heart },
  { id: "contact", label: "Contact", icon: Mail },
];

export const BloomNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect screen size
  useEffect(() => {
    const updateScreen = () => setIsDesktop(window.innerWidth > 1155);
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  // Track scroll position for active section indicator
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      const scrollPos = window.scrollY + 200; // Account for nav height and offset

      let current = navItems[0].id;
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          if (scrollPos >= section.offsetTop) {
            current = item.id;
          }
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {/* Top Overlay Gradient (only at top of page for visibility) */}
        {!isScrolled && isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-[45] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Desktop Nav */}
      {isDesktop && (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-bloomGold/10 py-4 shadow-md"
          : "bg-transparent py-8"
          }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
            <div
              className={`font-serif font-bold text-2xl tracking-tighter uppercase cursor-pointer transition-colors duration-500 ${isScrolled ? "text-bloomGreen" : "text-white"
                }`}
              onClick={() => scrollToSection("hero")}
            >
              THE <span className="text-bloomGold">THIRD</span> HARVEST
            </div>
            <ul className="flex gap-10 text-lg">
              {navItems.map((item) => (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`cursor-pointer relative flex flex-col items-center pb-2 transition-all duration-500 font-bold tracking-widest uppercase text-[11px] ${active === item.id
                      ? (isScrolled ? "text-bloomGreen" : "text-bloomGold")
                      : (isScrolled ? "text-bloomGreen/60 hover:text-bloomGreen" : "text-white/70 hover:text-white")
                      }`}
                  >
                    {item.label}

                    {active === item.id && (
                      <motion.span
                        layoutId="navUnderline"
                        className={`absolute left-0 -bottom-1 w-full h-[3px] rounded-full z-20 shadow-[0_1px_10px_rgba(212,168,88,0.4)] ${isScrolled ? "bg-bloomGreen" : "bg-bloomGold"
                          }`}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* Mobile/Tablet Nav */}
      {!isDesktop && (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-bloomGold/10"
          : "bg-black/20 backdrop-blur-sm"
          }`}>
          <div className="flex items-center justify-between px-6 py-5">
            <div
              className={`font-serif font-bold text-lg tracking-tight uppercase transition-colors duration-500 ${isScrolled ? "text-bloomGreen" : "text-white"
                }`}
              onClick={() => scrollToSection("hero")}
            >
              THE <span className="text-bloomGold">THIRD</span> HARVEST
            </div>

            {/* Burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-xl bg-bloomGold text-white shadow-xl active:scale-95 transition-transform"
              aria-label="Toggle navigation"
            >
              <Coffee
                className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "-rotate-90" : ""
                  }`}
              />
            </button>
          </div>

          {/* mobile menu portal/dropdown */}
          <div
            className={`overflow-hidden transition-all duration-700 bg-white/98 backdrop-blur-xl ${isOpen
              ? "max-h-[80vh] py-8 shadow-2xl border-t border-bloomGold/10"
              : "max-h-0"
              }`}
          >
            <ul className="flex flex-col gap-6 px-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`cursor-pointer relative flex items-center w-full transition-all duration-300 font-bold uppercase tracking-widest text-sm py-2 ${active === item.id
                      ? "text-bloomGreen translate-x-3"
                      : "text-bloomGreen/60"
                      }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mr-4 transition-all duration-500 ${active === item.id ? "bg-bloomGold scale-150" : "bg-bloomGreen/20"
                      }`} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};
