import { LegalPageLayout } from "@/pages/legal/LegalPageLayout";

const TermsAndConditions = () => {
  return (
    <LegalPageLayout
      title="Terms and Conditions"
      intro="These terms describe how visitors may use the 3rd Harvest website and its public information resources."
    >
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Use of Content</h2>
        <p className="mt-2 text-base leading-relaxed">
          Materials on this site are provided for information about the initiative, its deployments, and insights. Content may be quoted with attribution to 3rd Harvest.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Acceptable Use</h2>
        <p className="mt-2 text-base leading-relaxed">
          Users must not attempt to disrupt services, access restricted admin systems without authorization, or misuse forms and communications channels.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Changes</h2>
        <p className="mt-2 text-base leading-relaxed">
          These terms may be updated as program operations evolve. Updated versions are published on this page.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default TermsAndConditions;
