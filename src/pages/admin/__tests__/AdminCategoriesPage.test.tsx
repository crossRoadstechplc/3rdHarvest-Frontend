import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AdminCategoriesPage } from "@/pages/admin/AdminCategoriesPage";
import {
  createAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
  updateAdminCategory,
} from "@/lib/api/admin";

vi.mock("@/lib/api/admin", async () => {
  const original = await vi.importActual("@/lib/api/admin");
  return {
    ...original,
    getAdminCategories: vi.fn(),
    createAdminCategory: vi.fn(),
    updateAdminCategory: vi.fn(),
    deleteAdminCategory: vi.fn(),
  };
});

describe("AdminCategoriesPage", () => {
  const onUnauthorized = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    onUnauthorized.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders category list", async () => {
    vi.mocked(getAdminCategories).mockResolvedValue([{ id: 1, name: "Insights", slug: "insights" }]);

    render(<AdminCategoriesPage token="token" onUnauthorized={onUnauthorized} />);

    expect(await screen.findByText("Insights")).toBeInTheDocument();
  });

  it("creates category", async () => {
    vi.mocked(getAdminCategories).mockResolvedValue([]);
    vi.mocked(createAdminCategory).mockResolvedValue({});

    render(<AdminCategoriesPage token="token" onUnauthorized={onUnauthorized} />);

    fireEvent.change(screen.getByLabelText("Category name"), { target: { value: "Programs" } });
    fireEvent.change(screen.getByLabelText("Category slug"), { target: { value: "programs" } });
    fireEvent.change(screen.getByLabelText("Category description"), { target: { value: "Program posts" } });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => {
      expect(createAdminCategory).toHaveBeenCalledWith(
        "token",
        expect.objectContaining({ name: "Programs", slug: "programs" })
      );
    });
  });

  it("edits category", async () => {
    vi.mocked(getAdminCategories).mockResolvedValue([{ id: 2, name: "Old", slug: "old" }]);
    vi.mocked(updateAdminCategory).mockResolvedValue({});

    render(<AdminCategoriesPage token="token" onUnauthorized={onUnauthorized} />);

    await screen.findByText("Old");
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByLabelText("Category name"), { target: { value: "New" } });
    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(updateAdminCategory).toHaveBeenCalledWith(
        "token",
        2,
        expect.objectContaining({ name: "New" })
      );
    });
  });

  it("deletes category", async () => {
    vi.mocked(getAdminCategories).mockResolvedValue([{ id: 3, name: "Delete me", slug: "delete-me" }]);
    vi.mocked(deleteAdminCategory).mockResolvedValue({});

    render(<AdminCategoriesPage token="token" onUnauthorized={onUnauthorized} />);

    await screen.findByText("Delete me");
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(deleteAdminCategory).toHaveBeenCalledWith("token", 3);
    });
  });
});
