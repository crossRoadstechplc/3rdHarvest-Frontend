import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useContactModal } from "@/components/ContactModalProvider";
import {
  Coffee,
  Info,
  Award,
  Users,
  BarChart3,
  Handshake,
  Mail,
} from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Coffee, path: "/" },
  { id: "about", label: "About", icon: Info, path: "/about" },
  { id: "triverapro", label: "TriveraPro", icon: Award, path: "/triverapro" },
  { id: "pcw", label: "PCW", icon: Users, path: "/pcw" },
  { id: "impact-esg", label: "Impact & ESG", icon: BarChart3, path: "/impact-esg" },
  { id: "partner", label: "Partner", icon: Handshake, path: "/partner" },
  { id: "contact", label: "Contact", icon: Mail },
];

export const BloomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openContactModal } = useContactModal();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect screen size
  useEffect(() => {
    const updateScreen = () => setIsDesktop(window.innerWidth > 1375);
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  // Track pathname for active nav indicator
  useEffect(() => {
    const matchedItem = navItems.find((item) => item.path === location.pathname);
    if (matchedItem) {
      setActive(matchedItem.id);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (path: string, id: string) => {
    setActive(id);
    setIsOpen(false);
    navigate(path);
  };

  const handleNavItemClick = (item: (typeof navItems)[number]) => {
    if (item.id === "contact") {
      setActive("contact");
      setIsOpen(false);
      openContactModal();
      return;
    }
    if (item.path) {
      navigateTo(item.path, item.id);
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
          <div className="max-w-[1600px] mx-auto flex items-center justify-between px-8 lg:px-12">
            <div
              className={`font-serif font-bold text-3xl md:text-4xl tracking-tighter uppercase cursor-pointer transition-colors duration-500 ${isScrolled ? "text-bloomGreen" : "text-white"
                }`}
              onClick={() => navigateTo("/", "home")}
            >
              <span className="text-bloomGold">3RD</span> HARVEST
            </div>
            <ul className="flex gap-8 lg:gap-10 text-lg">
              {navItems.map((item) => (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => handleNavItemClick(item)}
                    className={`cursor-pointer relative flex flex-col items-center pb-2 transition-all duration-500 font-bold tracking-widest uppercase text-xs ${
                      item.id === "contact"
                        ? "inline-flex !flex-row !items-center !justify-center !pb-0 h-9 px-4 cursor-pointer rounded-[10px] bg-bloomGold text-white hover:brightness-105"
                        : active === item.id
                          ? isScrolled
                            ? "text-bloomGreen"
                            : "text-bloomGold"
                          : isScrolled
                            ? "text-bloomGreen/60 hover:text-bloomGreen"
                            : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}

                    {active === item.id && item.id !== "contact" && (
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
          <div className="flex items-center justify-between px-8 lg:px-12 py-5">
            <div
              className={`font-serif font-bold text-xl md:text-2xl tracking-tight uppercase transition-colors duration-500 ${isScrolled ? "text-bloomGreen" : "text-white"
                }`}
              onClick={() => navigateTo("/", "home")}
            >
              <span className="text-bloomGold">3RD</span> HARVEST
            </div>

            {/* Burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-[10px] bg-bloomGold text-white shadow-xl active:scale-95 transition-transform"
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
                    onClick={() => handleNavItemClick(item)}
                    className={`cursor-pointer relative flex items-center w-full transition-all duration-300 font-bold uppercase tracking-widest text-base py-2 ${
                      item.id === "contact"
                        ? "px-4 rounded-[10px] bg-bloomGold text-white"
                        : active === item.id
                          ? "text-bloomGreen translate-x-3"
                          : "text-bloomGreen/60"
                    }`}
                  >
                    {item.id !== "contact" && (
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-4 transition-all duration-500 ${
                          active === item.id ? "bg-bloomGold scale-150" : "bg-bloomGreen/20"
                        }`}
                      />
                    )}
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
