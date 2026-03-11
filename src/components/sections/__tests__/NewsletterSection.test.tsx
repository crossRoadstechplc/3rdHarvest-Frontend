import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { subscribeNewsletter } from "@/lib/api/newsletter";

vi.mock("@/lib/api/newsletter", () => ({
  subscribeNewsletter: vi.fn(),
}));

describe("NewsletterSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        disconnect() {}
        observe() {}
        unobserve() {}
      }
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders email input and submit button", () => {
    const { container } = render(<NewsletterSection />);

    expect(container.querySelector("#newsletter")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
  });

  it("validates bad email before API call", async () => {
    render(<NewsletterSection />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "bad-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(subscribeNewsletter).not.toHaveBeenCalled();
    expect(await screen.findByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  it("submits valid email and shows success state", async () => {
    vi.mocked(subscribeNewsletter).mockResolvedValue({ ok: true });
    render(<NewsletterSection />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(await screen.findByText("Thank you for subscribing. You're on the list.")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByLabelText("Email address")).toHaveValue("");
    });
  });

  it("shows error state on failed request", async () => {
    vi.mocked(subscribeNewsletter).mockRejectedValue(new Error("boom"));
    render(<NewsletterSection />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(await screen.findByText("Unable to subscribe right now. Please try again.")).toBeInTheDocument();
  });

  it("disables button while request is pending", async () => {
    let resolveRequest: ((value: { ok: boolean }) => void) | undefined;
    vi.mocked(subscribeNewsletter).mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      })
    );

    render(<NewsletterSection />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Subscribe" }));

    const pendingButton = screen.getByRole("button", { name: "Subscribing..." });
    expect(pendingButton).toBeDisabled();

    resolveRequest?.({ ok: true });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Subscribe" })).not.toBeDisabled();
    });
  });

  it("sends source homepage-newsletter", async () => {
    vi.mocked(subscribeNewsletter).mockResolvedValue({ ok: true });
    render(<NewsletterSection />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "source@example.com" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Subscribe" }).closest("form")!);

    await waitFor(() => {
      expect(subscribeNewsletter).toHaveBeenCalledWith(
        "source@example.com",
        "homepage-newsletter"
      );
    });
  });
});
