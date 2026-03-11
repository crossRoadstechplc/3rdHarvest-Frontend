import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AdminEntry from "@/pages/admin/AdminEntry";
import { adminLogin } from "@/lib/api/admin";

vi.mock("@/lib/api/admin", async () => {
  const original = await vi.importActual("@/lib/api/admin");
  return {
    ...original,
    adminLogin: vi.fn(),
  };
});

vi.mock("@/pages/admin/AdminLeadsPage", () => ({
  AdminLeadsPage: () => <div>Leads Page</div>,
}));

vi.mock("@/pages/admin/AdminNewsletterPage", () => ({
  AdminNewsletterPage: () => <div>Newsletter Page</div>,
}));

function renderEntry(path = "/admin") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/admin/*" element={<AdminEntry />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("AdminEntry", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders admin login form when no token exists", () => {
    renderEntry();

    expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        if (!element) return false;
        return element.textContent?.replace(/\s+/g, " ").trim() === "3RD HARVEST";
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("valid login stores token and shows admin shell", async () => {
    vi.mocked(adminLogin).mockResolvedValue({
      ok: true,
      token: "admin-token",
      expiresAt: Date.now() + 60_000,
    });

    renderEntry();

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "secret-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await screen.findByRole("button", { name: "Logout" });
    expect(screen.getByRole("link", { name: "Posts" })).toBeInTheDocument();

    expect(localStorage.getItem("admin_token")).toBe("admin-token");
    expect(Number(localStorage.getItem("admin_expiresAt"))).toBeGreaterThan(Date.now());
  });

  it("expired token forces login and clears stored session", () => {
    localStorage.setItem("admin_token", "expired-token");
    localStorage.setItem("admin_expiresAt", String(Date.now() - 10_000));

    renderEntry();

    expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
    expect(localStorage.getItem("admin_token")).toBeNull();
    expect(localStorage.getItem("admin_expiresAt")).toBeNull();
  });

  it("logout clears token and returns to login", async () => {
    localStorage.setItem("admin_token", "active-token");
    localStorage.setItem("admin_expiresAt", String(Date.now() + 60_000));

    renderEntry();

    await screen.findByRole("button", { name: "Logout" });
    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    await screen.findByRole("heading", { name: "Sign in" });
    expect(localStorage.getItem("admin_token")).toBeNull();
    expect(localStorage.getItem("admin_expiresAt")).toBeNull();
  });

  it("protected admin shell renders navigation items", async () => {
    localStorage.setItem("admin_token", "active-token");
    localStorage.setItem("admin_expiresAt", String(Date.now() + 60_000));

    renderEntry();

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Posts" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Categories" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Tags" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Authors" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Leads" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Newsletter" })).toBeInTheDocument();
    });
  });

  it("admin navigation keeps mobile-first grid structure", async () => {
    localStorage.setItem("admin_token", "active-token");
    localStorage.setItem("admin_expiresAt", String(Date.now() + 60_000));

    renderEntry();

    const navList = await screen.findByRole("list");
    expect(navList.className).toContain("grid-cols-2");
    expect(navList.className).toContain("sm:grid-cols-3");
    expect(navList.className).toContain("md:grid-cols-1");
  });

});
