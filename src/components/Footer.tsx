import { Coffee, Mail, MapPin, Heart, Linkedin, Github, Instagram } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleFooterLink = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <footer className="bg-black/90 bg-bloomDarkCoffee text-white py-20 px-4 relative overflow-hidden pl:10 lg:pl-40">
      {/* Decorative Elements */}
      <div className="absolute text-white top-10 right-10 w-64 h-64 bg-bloomGold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute text-white bottom-10 left-10 w-96 h-96 bg-bloomGreen/10 rounded-full blur-3xl pointer-events-none" />

      {/* Container */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 relative z-10">

        {/* TOP GRID — your layout, made responsive */}
        <div className="flex flex-col lg:flex-row justify-between gap-16">

          {/* BRAND BLOCK */}
          <div className="w-full lg:w-1/3">
            <div className="flex items-center gap-4 mb-8">
              <div className="font-serif font-bold text-3xl tracking-tight uppercase text-white">
                3rd <span className="text-bloomGold">Harvest</span>
              </div>
            </div>

            <p className="text-white/80 leading-relaxed text-sm md:text-base max-w-sm mb-4">
              Coffee. Energy. Soil.
            </p>
            <p className="text-white/60 text-xs md:text-sm italic leading-relaxed max-w-sm mb-8">
              "Coffee can produce more than coffee." 3rd Harvest unlocks value, energy, and regeneration from a single crop.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              {[
                { type: "text", content: "X", href: "#", label: "X" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Instagram, href: "#", label: "Instagram" }
              ].map((social) => {
                if (social.type === "text") {
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bloomGold hover:text-black transition-all duration-300 group font-bold"
                    >
                      {social.content}
                    </a>
                  );
                } else {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bloomGold hover:text-black transition-all duration-300 group"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                }
              })}
            </div>
          </div>

          {/* CONTACT BLOCK — YOU LEFT THIS COMMENTED, WE LEAVE IT COMMENTED */}
          {/* <div>
            <h3 className="text-xl font-bold mb-6 !text-white">Get in Touch</h3>
            ...
          </div> */}

          {/* QUICK LINKS */}
          <div className="w-full lg:w-2/3">
            <h3 className="text-xl font-bold mb-6 !text-white">Quick Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Context", id: "context" },
                { label: "Model", id: "model" },
                { label: "Enterprise", id: "enterprise" },
                { label: "Impact", id: "impact" },
                { label: "Implementation", id: "implementation" },
                { label: "Partners", id: "partners" },
                { label: "PCW", id: "pcw" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleFooterLink(link.id)}
                  className="text-white/80 text-sm hover:text-bloomGold cursor-pointer transition-colors hover:translate-x-1 inline-block duration-300 text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/20 pt-8 mt-16 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-white/60 text-sm text-center">
            © 2026 The 3RD Harvest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
