import { LegalPageLayout } from "@/pages/legal/LegalPageLayout";

const YourPrivacyChoicesPage = () => {
  return (
    <LegalPageLayout
      title="Your Privacy Choices"
      intro="This page explains privacy choices available to users engaging with the 3rd Harvest website."
    >
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Communication Preferences</h2>
        <p className="mt-2 text-base leading-relaxed">
          Newsletter recipients can unsubscribe through the provided unsubscribe flow or by contacting the 3rd Harvest team.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Request Access or Deletion</h2>
        <p className="mt-2 text-base leading-relaxed">
          Users may request access, correction, or deletion of personal information associated with inquiry or subscription submissions.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">How to Submit a Request</h2>
        <p className="mt-2 text-base leading-relaxed">
          Send requests to info@3rdharvest.org with sufficient details to identify the record and requested action.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default YourPrivacyChoicesPage;
