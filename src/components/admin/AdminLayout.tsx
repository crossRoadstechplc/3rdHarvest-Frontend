import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AdminSidebar, ADMIN_SECTIONS } from "@/components/admin/AdminSidebar";

type AdminLayoutProps = {
  onLogout: () => void;
};

function resolveSectionTitle(pathname: string): string {
  const matched = ADMIN_SECTIONS.find((section) => pathname.startsWith(section.path));
  return matched?.label ?? "Admin";
}

export const AdminLayout = ({ onLogout }: AdminLayoutProps) => {
  const location = useLocation();
  const activeSection = resolveSectionTitle(location.pathname);

  useEffect(() => {
    document.title = `${activeSection} | Admin | 3rd Harvest`;
  }, [activeSection]);

  return (
    <div className="admin-app min-h-screen md:flex">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-5 md:p-8">
        <div className="admin-panel mb-6 px-5 py-4 md:mb-8 md:px-6 md:py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-bloomGold font-bold">Admin</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-bloomDarkCoffee">{activeSection}</h2>
            </div>

            <button type="button" onClick={onLogout} className="admin-button-secondary">
              Logout
            </button>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
};
