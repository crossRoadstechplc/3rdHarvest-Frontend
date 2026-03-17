import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/BrandWordmark";

const ADMIN_SECTIONS = [
  { label: "Posts", path: "/admin/posts" },
  { label: "Categories", path: "/admin/categories" },
  { label: "Tags", path: "/admin/tags" },
  { label: "Authors", path: "/admin/authors" },
  { label: "Leads", path: "/admin/leads" },
  { label: "Newsletter", path: "/admin/newsletter" },
] as const;

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full md:w-72 md:min-h-screen md:sticky md:top-0 border-r border-black/10 bg-white" aria-label="Admin navigation">
      <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
        <div>
          <p className="text-xs tracking-[0.18em] uppercase font-bold text-bloomGold">
            <BrandWordmark
              numberClassName="text-[#b3872f]"
              harvestClassName="text-[#496255]"
              superscriptClassName="ml-[0.02em]"
              spacerClassName="ml-[0.2em]"
            />
          </p>
          <h1 className="text-xl font-serif font-bold mt-1 text-bloomDarkCoffee">Admin Console</h1>
        </div>

        <button
          type="button"
          aria-label="Toggle admin navigation"
          aria-expanded={isOpen}
          className="md:hidden rounded-[10px] border border-black/15 bg-white p-2 text-bloomDarkCoffee"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:block`}>
        <ul className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2" role="list">
          {ADMIN_SECTIONS.map((section) => (
            <li key={section.path}>
              <NavLink
                to={section.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-left px-3 py-2 rounded-[10px] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/70 ${
                    isActive
                      ? "border border-bloomGold/55 bg-bloomLightGreen text-bloomGreen"
                      : "border border-transparent text-bloomDarkCoffee/75 hover:bg-bloomLightGreen/70 hover:text-bloomGreen"
                  }`
                }
              >
                {section.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export { ADMIN_SECTIONS };
