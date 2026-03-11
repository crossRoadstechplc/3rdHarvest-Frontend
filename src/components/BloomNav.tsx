import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", path: "/#home" },
  { id: "idea", label: "Idea", path: "/#the-idea" },
  { id: "system", label: "System", path: "/#the-system" },
  { id: "pcw", label: "PCW", path: "/#pcw" },
  { id: "impact", label: "Impact", path: "/#impact" },
  { id: "deployments", label: "Deployments", path: "/#deployments" },
  { id: "about", label: "About", path: "/#about" },
  { id: "contact", label: "Contact", path: "/#contact" },
];

const secondaryItems = [
  { id: "partners", label: "Partners", path: "/#partners" },
  { id: "newsletter", label: "Newsletter", path: "/#newsletter" },
  { id: "insights", label: "Insights", path: "/insights" },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
];

const HOME_SCROLL_SECTIONS = [
  { navId: "home", sectionId: "hero", hash: "home" },
  { navId: "idea", sectionId: "the-idea", hash: "the-idea" },
  { navId: "system", sectionId: "the-system", hash: "the-system" },
  { navId: "pcw", sectionId: "pcw", hash: "pcw" },
  { navId: "impact", sectionId: "impact", hash: "impact" },
  { navId: "deployments", sectionId: "deployments", hash: "deployments" },
  { navId: "about", sectionId: "about", hash: "about" },
  { navId: "contact", sectionId: "contact", hash: "contact" },
] as const;

export const BloomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const updateScreen = () => setIsDesktop(window.innerWidth >= 1024);
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  useEffect(() => {
    const syncActiveFromRoute = () => {
      if (location.pathname.startsWith("/insights")) {
        setActive("insights");
        return;
      }

      const hash = window.location.hash;
      if (hash) {
        const matchedItem = navItems.find((item) => item.path === `/${hash}`);
        if (matchedItem) {
          setActive(matchedItem.id);
          return;
        }
      }

      if (location.pathname === "/") {
        setActive("home");
      }
    };

    syncActiveFromRoute();
    window.addEventListener("hashchange", syncActiveFromRoute);
    return () => window.removeEventListener("hashchange", syncActiveFromRoute);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const updateActiveSection = () => {
      const viewportOffset = 180;

      const visibleSections = HOME_SCROLL_SECTIONS
        .map((section) => {
          const element = document.getElementById(section.sectionId);
          if (!element) {
            return null;
          }

          const top = element.getBoundingClientRect().top + window.scrollY;
          return { ...section, top };
        })
        .filter((item): item is (typeof HOME_SCROLL_SECTIONS[number] & { top: number }) => Boolean(item))
        .sort((a, b) => a.top - b.top);

      if (visibleSections.length === 0) {
        return;
      }

      const current =
        [...visibleSections].reverse().find((section) => window.scrollY + viewportOffset >= section.top) ?? visibleSections[0];

      setActive((prev) => (prev === current.navId ? prev : current.navId));

      const expectedHash = `#${current.hash}`;
      if (window.location.hash !== expectedHash) {
        window.history.replaceState(null, "", `/${expectedHash}`);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [location.pathname]);

  const navigateTo = (path: string, id: string) => {
    setActive(id);
    setIsOpen(false);

    if (path.startsWith("/#")) {
      const sectionId = path.replace("/#", "");

      if (location.pathname !== "/") {
        navigate(path);
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return;
      }

      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      window.history.pushState(null, "", path);
      return;
    }

    navigate(path);
  };

  const baseNavLinkClass =
    "text-[0.68rem] md:text-xs font-semibold uppercase tracking-[0.11em] transition-colors duration-300";

  return (
    <>
      {isDesktop ? (
        <nav
          className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
            isScrolled
              ? "border-b border-black/10 bg-white/96 py-3 shadow-[0_8px_24px_rgba(30,30,30,0.08)] backdrop-blur"
              : "border-b border-black/10 bg-white/90 py-4 backdrop-blur"
          }`}
        >
          <div className="mx-auto grid w-full max-w-[1840px] grid-cols-[auto_1fr_auto] items-center gap-8 px-8 lg:px-12">
            <button
              onClick={() => navigateTo("/", "home")}
              className="cursor-pointer font-serif text-2xl font-bold uppercase tracking-tight text-bloomDarkCoffee"
            >
              <span className="text-bloomGold">3RD</span> <span className="text-bloomDarkCoffee">HARVEST</span>
            </button>

            <ul className="flex items-center justify-center gap-4 xl:gap-6" aria-label="Main navigation">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigateTo(item.path, item.id)}
                    className={`relative pb-1 ${baseNavLinkClass} ${
                      active === item.id ? "text-bloomGreen" : "text-bloomDarkCoffee/70 hover:text-bloomGreen"
                    }`}
                    aria-current={active === item.id ? "page" : undefined}
                  >
                    {item.label}
                    {active === item.id ? (
                      <span
                        data-testid={`active-indicator-${item.id}`}
                        className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-bloomGold shadow-[0_0_0_1px_rgba(30,30,30,0.04)]"
                      />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>

            <ul className="flex items-center justify-end gap-4 xl:gap-5" aria-label="Secondary navigation">
              {secondaryItems.map((item) => (
                <li key={item.id}>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseNavLinkClass} text-bloomDarkCoffee/65 hover:text-bloomGreen`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => navigateTo(item.path, item.id)}
                      className={`${baseNavLinkClass} text-bloomDarkCoffee/65 hover:text-bloomGreen`}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : (
        <nav
          className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
            isScrolled
              ? "border-b border-black/10 bg-white/95 shadow-[0_8px_24px_rgba(30,30,30,0.08)] backdrop-blur"
              : "border-b border-black/10 bg-white/95 backdrop-blur"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-6">
            <button
              onClick={() => navigateTo("/", "home")}
              className="cursor-pointer font-serif text-xl font-bold uppercase tracking-tight text-bloomDarkCoffee"
            >
              <span className="text-bloomGold">3RD</span> <span className="text-bloomDarkCoffee">HARVEST</span>
            </button>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-[10px] border border-black/10 bg-white p-2.5 text-bloomDarkCoffee transition-colors hover:border-bloomGold/60"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
              aria-controls="mobile-main-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div
            id="mobile-main-menu"
            className={`overflow-hidden bg-white transition-all duration-500 ${
              isOpen ? "max-h-[85vh] border-t border-black/10 py-6" : "max-h-0"
            }`}
          >
            <ul className="flex flex-col gap-4 px-5 sm:px-6" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigateTo(item.path, item.id)}
                    className={`w-full rounded-[10px] px-3 py-2 text-left text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${
                      active === item.id
                        ? "bg-bloomGreen/10 text-bloomGreen"
                        : "text-bloomDarkCoffee/75 hover:bg-black/5 hover:text-bloomGreen"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              <li className="mt-1 border-t border-black/10 pt-4">
                <ul className="flex flex-col gap-3" aria-label="Mobile secondary navigation">
                  {secondaryItems.map((item) => (
                    <li key={item.id}>
                      {"href" in item ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-[10px] px-3 py-2 text-left text-sm font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/75 transition-colors hover:bg-black/5 hover:text-bloomGreen"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <button
                          onClick={() => navigateTo(item.path, item.id)}
                          className="w-full rounded-[10px] px-3 py-2 text-left text-sm font-semibold uppercase tracking-[0.1em] text-bloomDarkCoffee/75 transition-colors hover:bg-black/5 hover:text-bloomGreen"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};
