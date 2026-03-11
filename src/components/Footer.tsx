import { useLocation, useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path: string) => {
    if (path.startsWith("/#")) {
      const sectionId = path.replace("/#", "");

      if (location.pathname !== "/") {
        navigate(path);
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        window.history.pushState(null, "", path);
      }
      return;
    }

    navigate(path);
  };

  const quickLinks = [
    { label: "Home", path: "/#home" },
    { label: "The Idea", path: "/#the-idea" },
    { label: "Proud Coffee Women", path: "/#pcw" },
    { label: "Impact", path: "/#impact" },
    { label: "Deployments", path: "/#deployments" },
    { label: "Partners", path: "/#partners" },
    { label: "Insights", path: "/insights" },
    { label: "About", path: "/#about" },
    { label: "Contact", path: "/#contact" },
  ];

  const policyLinks = [
    { label: "Terms and Conditions", path: "/terms-and-conditions" },
    { label: "Privacy Notices", path: "/privacy-notices" },
    { label: "Cookie Settings", path: "/cookie-settings" },
    { label: "Sitemap", path: "/sitemap" },
    { label: "Accessibility", path: "/accessibility" },
    { label: "Your Privacy Choices", path: "/your-privacy-choices" },
  ];

  return (
    <footer className="border-t border-black/10 bg-white py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1720px] px-6 md:px-10">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="font-serif text-3xl font-bold uppercase tracking-tight text-bloomDarkCoffee">
              <span className="text-bloomGold">3RD</span> HARVEST
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-bloomDarkCoffee/75">
              Unlocking multiple harvests from a single coffee crop through circular systems connecting coffee, energy, and soil.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bloomGold">Quick Links</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigateTo(link.path)}
                    className="text-left text-sm leading-relaxed text-bloomDarkCoffee/75 hover:text-bloomGreen"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-8 border-t border-black/10 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-bloomDarkCoffee/60">© 2026 3rd Harvest Initiative. All Rights Reserved.</p>

            <ul className="flex flex-wrap items-center gap-y-2 text-sm text-bloomDarkCoffee/70 md:justify-end">
              {policyLinks.map((link, index) => (
                <li key={link.label} className={index < policyLinks.length - 1 ? "mr-3 pr-3 border-r border-black/20" : ""}>
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noreferrer"
                    className="text-left hover:text-bloomGreen"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
