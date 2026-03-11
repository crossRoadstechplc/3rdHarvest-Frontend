import { LegalPageLayout } from "@/pages/legal/LegalPageLayout";

const PrivacyNotices = () => {
  return (
    <LegalPageLayout
      title="Privacy Notices"
      intro="3rd Harvest uses limited personal information to respond to inquiries, manage subscriptions, and support program communications."
    >
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Information We Collect</h2>
        <p className="mt-2 text-base leading-relaxed">
          Contact and newsletter forms collect details such as name, organization, email address, and message content provided by the user.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">How Information Is Used</h2>
        <p className="mt-2 text-base leading-relaxed">
          Submitted information is used to respond to partnership requests, share initiative updates, and improve communication quality.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-bloomDarkCoffee">Retention and Rights</h2>
        <p className="mt-2 text-base leading-relaxed">
          Data is retained only as needed for operational and reporting purposes. Users may request updates or deletion by contacting info@3rdharvest.org.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default PrivacyNotices;
