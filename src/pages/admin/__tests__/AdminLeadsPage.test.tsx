import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AdminLeadsPage } from "@/pages/admin/AdminLeadsPage";
import { getAdminLeads } from "@/lib/api/admin";
import { ApiError } from "@/lib/api/client";

vi.mock("@/lib/api/admin", async () => {
  const original = await vi.importActual("@/lib/api/admin");
  return {
    ...original,
    getAdminLeads: vi.fn(),
  };
});

describe("AdminLeadsPage", () => {
  const onUnauthorized = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    onUnauthorized.mockReset();

    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });

    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("fetches and renders leads", async () => {
    vi.mocked(getAdminLeads).mockResolvedValue([
      {
        email: "a@example.com",
        first_verified_at: "2026-01-01T00:00:00.000Z",
        last_verified_at: "2026-02-01T00:00:00.000Z",
        verify_count: 3,
      },
    ]);

    render(<AdminLeadsPage token="admin-token" onUnauthorized={onUnauthorized} />);

    const matches = await screen.findAllByText("a@example.com");
    expect(matches.length).toBeGreaterThan(0);
    expect(getAdminLeads).toHaveBeenCalledWith("admin-token");
  });

  it("filters by search", async () => {
    vi.mocked(getAdminLeads).mockResolvedValue([
      { email: "alice@example.com", verify_count: 1 },
      { email: "bob@example.com", verify_count: 2 },
    ]);

    render(<AdminLeadsPage token="admin-token" onUnauthorized={onUnauthorized} />);

    await screen.findAllByText("alice@example.com");

    fireEvent.change(screen.getByLabelText("Search leads"), {
      target: { value: "bob" },
    });

    expect(screen.queryByText("alice@example.com")).not.toBeInTheDocument();
    expect(screen.getAllByText("bob@example.com").length).toBeGreaterThan(0);
  });

  it("copy and export actions use filtered rows", async () => {
    vi.mocked(getAdminLeads).mockResolvedValue([
      { email: "alpha@example.com", verify_count: 1 },
      { email: "beta@example.com", verify_count: 2 },
    ]);

    render(<AdminLeadsPage token="admin-token" onUnauthorized={onUnauthorized} />);

    await screen.findAllByText("alpha@example.com");

    fireEvent.change(screen.getByLabelText("Search leads"), {
      target: { value: "beta" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Copy visible emails" }));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("beta@example.com");
    });

    fireEvent.click(screen.getByRole("button", { name: "Export .txt" }));
    fireEvent.click(screen.getByRole("button", { name: "Export .csv" }));

    const txtBlob = vi.mocked(URL.createObjectURL).mock.calls[0][0] as Blob;
    const csvBlob = vi.mocked(URL.createObjectURL).mock.calls[1][0] as Blob;

    await expect(txtBlob.text()).resolves.toBe("beta@example.com");
    await expect(csvBlob.text()).resolves.toContain("beta@example.com");
    await expect(csvBlob.text()).resolves.not.toContain("alpha@example.com");
  });

  it("unauthorized response triggers auth reset callback", async () => {
    vi.mocked(getAdminLeads).mockRejectedValue(new ApiError({ status: 401, message: "Unauthorized" }));

    render(<AdminLeadsPage token="admin-token" onUnauthorized={onUnauthorized} />);

    await waitFor(() => {
      expect(onUnauthorized).toHaveBeenCalledTimes(1);
    });
  });

  it("empty and error states render correctly", async () => {
    vi.mocked(getAdminLeads).mockResolvedValueOnce([]);

    const { rerender } = render(<AdminLeadsPage token="admin-token" onUnauthorized={onUnauthorized} />);

    expect(await screen.findByText("No leads found for the current filter.")).toBeInTheDocument();

    vi.mocked(getAdminLeads).mockRejectedValueOnce(new Error("boom"));

    rerender(<AdminLeadsPage token="admin-token" onUnauthorized={onUnauthorized} />);
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));

    expect(await screen.findByText("Unable to load leads right now.")).toBeInTheDocument();
  });
});
