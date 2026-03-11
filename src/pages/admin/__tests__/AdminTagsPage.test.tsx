import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AdminTagsPage } from "@/pages/admin/AdminTagsPage";
import { createAdminTag, deleteAdminTag, getAdminTags, updateAdminTag } from "@/lib/api/admin";

vi.mock("@/lib/api/admin", async () => {
  const original = await vi.importActual("@/lib/api/admin");
  return {
    ...original,
    getAdminTags: vi.fn(),
    createAdminTag: vi.fn(),
    updateAdminTag: vi.fn(),
    deleteAdminTag: vi.fn(),
  };
});

describe("AdminTagsPage", () => {
  const onUnauthorized = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    onUnauthorized.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders tag list", async () => {
    vi.mocked(getAdminTags).mockResolvedValue([{ id: 1, name: "Field Report", slug: "field-report" }]);

    render(<AdminTagsPage token="token" onUnauthorized={onUnauthorized} />);

    expect(await screen.findByText("Field Report")).toBeInTheDocument();
  });

  it("creates tag", async () => {
    vi.mocked(getAdminTags).mockResolvedValue([]);
    vi.mocked(createAdminTag).mockResolvedValue({});

    render(<AdminTagsPage token="token" onUnauthorized={onUnauthorized} />);

    fireEvent.change(screen.getByLabelText("Tag name"), { target: { value: "Research" } });
    fireEvent.change(screen.getByLabelText("Tag slug"), { target: { value: "research" } });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => {
      expect(createAdminTag).toHaveBeenCalledWith("token", expect.objectContaining({ name: "Research", slug: "research" }));
    });
  });

  it("edits tag", async () => {
    vi.mocked(getAdminTags).mockResolvedValue([{ id: 2, name: "Old", slug: "old" }]);
    vi.mocked(updateAdminTag).mockResolvedValue({});

    render(<AdminTagsPage token="token" onUnauthorized={onUnauthorized} />);

    await screen.findByText("Old");
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByLabelText("Tag name"), { target: { value: "New" } });
    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(updateAdminTag).toHaveBeenCalledWith("token", 2, expect.objectContaining({ name: "New" }));
    });
  });

  it("deletes tag", async () => {
    vi.mocked(getAdminTags).mockResolvedValue([{ id: 3, name: "Delete", slug: "delete" }]);
    vi.mocked(deleteAdminTag).mockResolvedValue({});

    render(<AdminTagsPage token="token" onUnauthorized={onUnauthorized} />);

    await screen.findByRole("button", { name: "Delete" });
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(deleteAdminTag).toHaveBeenCalledWith("token", 3);
    });
  });
});

