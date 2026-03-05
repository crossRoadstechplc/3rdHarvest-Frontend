import { createContext, useContext, useMemo, useState } from "react";
import { ContactModal } from "@/components/ContactModal";

type ContactModalContextValue = {
  openContactModal: () => void;
  closeContactModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | undefined>(undefined);

export const ContactModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      openContactModal: () => setIsOpen(true),
      closeContactModal: () => setIsOpen(false),
    }),
    []
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal isOpen={isOpen} onClose={value.closeContactModal} />
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
};
