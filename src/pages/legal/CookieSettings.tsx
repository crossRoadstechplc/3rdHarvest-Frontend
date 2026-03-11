import { LegalPageLayout } from "@/pages/legal/LegalPageLayout";

const CookieSettings = () => {
  return (
    <LegalPageLayout
      title="Cookie Settings"
      intro="This page explains the cookie and storage choices used on the 3rd Harvest website."
    >
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Essential Storage</h2>
        <p className="mt-2 text-base leading-relaxed">
          Essential browser storage may be used for core site behavior, including admin authentication session persistence where applicable.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Functional Preferences</h2>
        <p className="mt-2 text-base leading-relaxed">
          Functional settings can improve user experience, such as preserving navigation context and form state during interaction.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Managing Preferences</h2>
        <p className="mt-2 text-base leading-relaxed">
          You can manage storage and cookie preferences through your browser controls. Clearing site data will reset saved preferences.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default CookieSettings;
