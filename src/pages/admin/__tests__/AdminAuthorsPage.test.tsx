import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AdminAuthorsPage } from "@/pages/admin/AdminAuthorsPage";
import {
  createAdminAuthor,
  deleteAdminAuthor,
  getAdminAuthors,
  updateAdminAuthor,
} from "@/lib/api/admin";

vi.mock("@/lib/api/admin", async () => {
  const original = await vi.importActual("@/lib/api/admin");
  return {
    ...original,
    getAdminAuthors: vi.fn(),
    createAdminAuthor: vi.fn(),
    updateAdminAuthor: vi.fn(),
    deleteAdminAuthor: vi.fn(),
  };
});

describe("AdminAuthorsPage", () => {
  const onUnauthorized = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    onUnauthorized.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders author list", async () => {
    vi.mocked(getAdminAuthors).mockResolvedValue([{ id: 1, name: "Jane Doe", slug: "jane-doe" }]);

    render(<AdminAuthorsPage token="token" onUnauthorized={onUnauthorized} />);

    expect(await screen.findByText("Jane Doe")).toBeInTheDocument();
  });

  it("creates author", async () => {
    vi.mocked(getAdminAuthors).mockResolvedValue([]);
    vi.mocked(createAdminAuthor).mockResolvedValue({});

    render(<AdminAuthorsPage token="token" onUnauthorized={onUnauthorized} />);

    fireEvent.change(screen.getByLabelText("Author name"), { target: { value: "Amina" } });
    fireEvent.change(screen.getByLabelText("Author slug"), { target: { value: "amina" } });
    fireEvent.change(screen.getByLabelText("Author email"), { target: { value: "amina@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => {
      expect(createAdminAuthor).toHaveBeenCalledWith("token", expect.objectContaining({ name: "Amina", slug: "amina" }));
    });
  });

  it("edits author", async () => {
    vi.mocked(getAdminAuthors).mockResolvedValue([{ id: 2, name: "Old", slug: "old" }]);
    vi.mocked(updateAdminAuthor).mockResolvedValue({});

    render(<AdminAuthorsPage token="token" onUnauthorized={onUnauthorized} />);

    await screen.findByText("Old");
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByLabelText("Author name"), { target: { value: "Updated" } });
    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(updateAdminAuthor).toHaveBeenCalledWith("token", 2, expect.objectContaining({ name: "Updated" }));
    });
  });

  it("deletes author", async () => {
    vi.mocked(getAdminAuthors).mockResolvedValue([{ id: 3, name: "Delete", slug: "delete" }]);
    vi.mocked(deleteAdminAuthor).mockResolvedValue({});

    render(<AdminAuthorsPage token="token" onUnauthorized={onUnauthorized} />);

    await screen.findByRole("button", { name: "Delete" });
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(deleteAdminAuthor).toHaveBeenCalledWith("token", 3);
    });
  });
});

