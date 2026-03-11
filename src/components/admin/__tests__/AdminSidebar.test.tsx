import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

describe("AdminSidebar", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders expected navigation items", () => {
    render(
      <MemoryRouter initialEntries={["/admin/posts"]}>
        <AdminSidebar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Posts" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Categories" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tags" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Authors" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Leads" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Newsletter" })).toBeInTheDocument();
  });

  it("toggles mobile navigation state", () => {
    render(
      <MemoryRouter initialEntries={["/admin/posts"]}>
        <AdminSidebar />
      </MemoryRouter>
    );

    const toggle = screen.getByRole("button", { name: "Toggle admin navigation" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});
