import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { adminLogin } from "@/lib/api/admin";
import {
  clearAdminAuth,
  getAdminToken,
  isAdminTokenValid,
  setAdminAuth,
} from "@/lib/auth/adminStorage";
import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLeadsPage } from "@/pages/admin/AdminLeadsPage";
import { AdminNewsletterPage } from "@/pages/admin/AdminNewsletterPage";
import { AdminCategoriesPage } from "@/pages/admin/AdminCategoriesPage";
import { AdminTagsPage } from "@/pages/admin/AdminTagsPage";
import { AdminAuthorsPage } from "@/pages/admin/AdminAuthorsPage";
import { AdminPostsPage } from "@/pages/admin/AdminPostsPage";
import { AdminPostEditorPage } from "@/pages/admin/AdminPostEditorPage";

export default function AdminEntry() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (isAdminTokenValid()) {
      setIsAuthed(true);
      return;
    }

    clearAdminAuth();
    setIsAuthed(false);
  }, []);

  const handleLogin = async (password: string) => {
    const response = await adminLogin(password);

    if (!response.ok || !response.token || response.expiresAt === undefined) {
      throw new Error(response.error || "Invalid admin credentials.");
    }

    const expiresAtMs =
      typeof response.expiresAt === "string"
        ? new Date(response.expiresAt).getTime()
        : response.expiresAt;

    if (!Number.isFinite(expiresAtMs)) {
      throw new Error("Invalid session expiration returned by server.");
    }

    setAdminAuth(response.token, expiresAtMs);
    setIsAuthed(true);
  };

  const handleLogout = () => {
    clearAdminAuth();
    setIsAuthed(false);
  };

  const token = useMemo(() => getAdminToken() || "", [isAuthed]);

  const handleUnauthorized = () => {
    clearAdminAuth();
    setIsAuthed(false);
  };

  if (!isAuthed) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout onLogout={handleLogout} />}>
        <Route index element={<Navigate to="posts" replace />} />
        <Route path="posts" element={<AdminPostsPage token={token} onUnauthorized={handleUnauthorized} />} />
        <Route path="posts/new" element={<AdminPostEditorPage token={token} onUnauthorized={handleUnauthorized} />} />
        <Route path="posts/:id/edit" element={<AdminPostEditorPage token={token} onUnauthorized={handleUnauthorized} />} />
        <Route path="categories" element={<AdminCategoriesPage token={token} onUnauthorized={handleUnauthorized} />} />
        <Route path="tags" element={<AdminTagsPage token={token} onUnauthorized={handleUnauthorized} />} />
        <Route path="authors" element={<AdminAuthorsPage token={token} onUnauthorized={handleUnauthorized} />} />
        <Route path="leads" element={<AdminLeadsPage token={token} onUnauthorized={handleUnauthorized} />} />
        <Route path="newsletter" element={<AdminNewsletterPage token={token} onUnauthorized={handleUnauthorized} />} />
      </Route>
    </Routes>
  );
}

