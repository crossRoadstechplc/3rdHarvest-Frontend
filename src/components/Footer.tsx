import { useContactModal } from "@/components/ContactModalProvider";
import { Facebook, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const { openContactModal } = useContactModal();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "TriveraPro", path: "/triverapro" },
    { label: "PCW", path: "/pcw" },
    { label: "Impact & ESG", path: "/impact-esg" },
    { label: "Partner", path: "/partner" },
    { label: "Contact", isContact: true },
  ];

  return (
    <footer className="relative overflow-hidden bg-black/90 bg-bloomDarkCoffee px-4 py-20 text-white lg:pl-40">
      <div className="pointer-events-none absolute right-10 top-10 h-64 w-64 rounded-full bg-bloomGold/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-96 w-96 rounded-full bg-bloomGreen/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full">
        <div className="flex flex-col justify-between gap-16 lg:flex-row">
          <div className="w-full lg:w-1/3">
            <div className="mb-8 font-serif text-3xl font-bold uppercase tracking-tight text-white">
              <span className="text-bloomGold">3RD</span> HARVEST
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-white/80 md:text-base">
              Unlocking multiple yields from one crop through decentralized infrastructure, renewable energy, and regenerative models for long-term prosperity.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-white/80 transition-colors hover:text-bloomGold"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/80 transition-colors hover:text-bloomGold"
              >
                X
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-white/80 transition-colors hover:text-bloomGold"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            <button
              onClick={openContactModal}
              className="mt-6 inline-flex items-center justify-center cursor-pointer rounded-[10px] bg-bloomGold px-6 py-3 text-sm font-bold tracking-[0.08em] text-white transition-all hover:shadow-[0_14px_28px_rgba(212,166,87,0.35)]"
            >
              Contact
            </button>
          </div>

          <div className="w-full lg:w-1/3">
            <h3 className="mb-6 text-xl font-bold text-white!">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      if (link.isContact) {
                        openContactModal();
                        return;
                      }
                      if (link.path) navigate(link.path);
                    }}
                    className="inline-block cursor-pointer text-left text-sm text-white/80 transition-all duration-300 hover:translate-x-1 hover:text-bloomGold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 border-t border-white/20 pt-8 md:flex-row">
          <p className="text-center text-sm text-white/60">© 2026 <span className="text-bloomGold">3RD</span> HARVEST. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
