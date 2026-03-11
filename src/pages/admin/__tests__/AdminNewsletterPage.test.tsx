import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AdminNewsletterPage } from "@/pages/admin/AdminNewsletterPage";
import { getAdminNewsletterSubscriptions } from "@/lib/api/admin";
import { ApiError } from "@/lib/api/client";

vi.mock("@/lib/api/admin", async () => {
  const original = await vi.importActual("@/lib/api/admin");
  return {
    ...original,
    getAdminNewsletterSubscriptions: vi.fn(),
  };
});

describe("AdminNewsletterPage", () => {
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

  it("fetches and renders subscriptions", async () => {
    vi.mocked(getAdminNewsletterSubscriptions).mockResolvedValue([
      {
        email: "first@example.com",
        status: "subscribed",
        source: "homepage-newsletter",
        subscribed_at: "2026-01-02T00:00:00.000Z",
      },
    ]);

    render(<AdminNewsletterPage token="admin-token" onUnauthorized={onUnauthorized} />);

    const matches = await screen.findAllByText("first@example.com");
    expect(matches.length).toBeGreaterThan(0);
    expect(getAdminNewsletterSubscriptions).toHaveBeenCalledWith("admin-token");
  });

  it("filters by search and status", async () => {
    vi.mocked(getAdminNewsletterSubscriptions).mockResolvedValue([
      { email: "one@example.com", status: "subscribed" },
      { email: "two@example.com", status: "unsubscribed" },
    ]);

    render(<AdminNewsletterPage token="admin-token" onUnauthorized={onUnauthorized} />);

    await screen.findAllByText("one@example.com");

    fireEvent.change(screen.getByLabelText("Search newsletter"), {
      target: { value: "two" },
    });
    fireEvent.change(screen.getByLabelText("Filter by status"), {
      target: { value: "unsubscribed" },
    });

    expect(screen.queryByText("one@example.com")).not.toBeInTheDocument();
    expect(screen.getAllByText("two@example.com").length).toBeGreaterThan(0);
  });

  it("copy and export actions use filtered rows", async () => {
    vi.mocked(getAdminNewsletterSubscriptions).mockResolvedValue([
      { email: "stay@example.com", status: "subscribed", source: "home" },
      { email: "leave@example.com", status: "unsubscribed", source: "home" },
    ]);

    render(<AdminNewsletterPage token="admin-token" onUnauthorized={onUnauthorized} />);

    await screen.findAllByText("stay@example.com");

    fireEvent.change(screen.getByLabelText("Filter by status"), {
      target: { value: "unsubscribed" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Copy visible emails" }));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("leave@example.com");
    });

    fireEvent.click(screen.getByRole("button", { name: "Export .txt" }));
    fireEvent.click(screen.getByRole("button", { name: "Export .csv" }));

    const txtBlob = vi.mocked(URL.createObjectURL).mock.calls[0][0] as Blob;
    const csvBlob = vi.mocked(URL.createObjectURL).mock.calls[1][0] as Blob;

    await expect(txtBlob.text()).resolves.toBe("leave@example.com");
    await expect(csvBlob.text()).resolves.toContain("leave@example.com");
    await expect(csvBlob.text()).resolves.not.toContain("stay@example.com");
  });

  it("unauthorized response triggers auth reset callback", async () => {
    vi.mocked(getAdminNewsletterSubscriptions).mockRejectedValue(
      new ApiError({ status: 401, message: "Unauthorized" })
    );

    render(<AdminNewsletterPage token="admin-token" onUnauthorized={onUnauthorized} />);

    await waitFor(() => {
      expect(onUnauthorized).toHaveBeenCalledTimes(1);
    });
  });

  it("empty and error states render correctly", async () => {
    vi.mocked(getAdminNewsletterSubscriptions).mockResolvedValueOnce([]);

    const { rerender } = render(<AdminNewsletterPage token="admin-token" onUnauthorized={onUnauthorized} />);

    expect(await screen.findByText("No subscriptions match the current filters.")).toBeInTheDocument();

    vi.mocked(getAdminNewsletterSubscriptions).mockRejectedValueOnce(new Error("boom"));

    rerender(<AdminNewsletterPage token="admin-token" onUnauthorized={onUnauthorized} />);
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));

    expect(
      await screen.findByText("Unable to load newsletter subscriptions right now.")
    ).toBeInTheDocument();
  });
});
