import { Link } from "react-router-dom";
import { LegalPageLayout } from "@/pages/legal/LegalPageLayout";

const siteLinks = [
  { label: "Home", path: "/" },
  { label: "The Idea", path: "/#the-idea" },
  { label: "The System", path: "/#the-system" },
  { label: "Proud Coffee Women", path: "/#pcw" },
  { label: "Impact", path: "/#impact" },
  { label: "Deployments", path: "/#deployments" },
  { label: "Partners", path: "/#partners" },
  { label: "Insights", path: "/insights" },
  { label: "About", path: "/#about" },
  { label: "Contact", path: "/#contact" },
  { label: "Admin", path: "/admin" },
];

const SiteMapPage = () => {
  return (
    <LegalPageLayout
      title="Sitemap"
      intro="Quick access to the main public sections and pages of the 3rd Harvest website."
    >
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Pages and Sections</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {siteLinks.map((item) => (
            <li key={item.label}>
              <Link className="text-bloomGreen hover:text-bloomGold" to={item.path}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </LegalPageLayout>
  );
};

export default SiteMapPage;
