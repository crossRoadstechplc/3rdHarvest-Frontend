import { LegalPageLayout } from "@/pages/legal/LegalPageLayout";

const AccessibilityPage = () => {
  return (
    <LegalPageLayout
      title="Accessibility"
      intro="3rd Harvest is committed to making this website usable for a broad range of people and assistive technologies."
    >
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Accessibility Approach</h2>
        <p className="mt-2 text-base leading-relaxed">
          The site is built with semantic structure, keyboard focus visibility, responsive layouts, and readable contrast to support accessible navigation.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Known Gaps</h2>
        <p className="mt-2 text-base leading-relaxed">
          Some third-party media and linked external resources may have limitations outside direct 3rd Harvest control.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Contact for Support</h2>
        <p className="mt-2 text-base leading-relaxed">
          If you encounter accessibility barriers, contact info@3rdharvest.org with the affected page and issue details.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default AccessibilityPage;
