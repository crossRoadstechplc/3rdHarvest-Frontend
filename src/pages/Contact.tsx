import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { Contact as ContactSection } from "@/components/Contact";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <BloomNav />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;
