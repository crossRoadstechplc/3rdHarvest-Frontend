import { getAdminToken } from "@/lib/auth/adminStorage";

type AdminPlaceholderProps = {
  section: string;
};

export const AdminPlaceholder = ({ section }: AdminPlaceholderProps) => {
  const tokenHint = getAdminToken() ? "Authenticated session active." : "No active token.";

  return (
    <section className="admin-panel p-6 md:p-8">
      <p className="mb-4 leading-relaxed text-bloomDarkCoffee/75">{section} management will be implemented in a later phase.</p>
      <p className="text-xs uppercase tracking-[0.14em] text-bloomDarkCoffee/50">{tokenHint}</p>
    </section>
  );
};
