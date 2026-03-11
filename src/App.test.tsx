import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import App from "@/App";

vi.mock("@/components/ui/sonner", () => ({
  Toaster: () => null,
}));

vi.mock("@/components/ui/tooltip", () => ({
  TooltipProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/AccessGate", () => ({
  AccessGate: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/pages/Home", () => ({ default: () => <div>Home Page</div> }));
vi.mock("@/pages/Insights", () => ({ default: () => <div>Insights Page</div> }));
vi.mock("@/pages/InsightDetail", () => ({ default: () => <div>Insight Detail Page</div> }));
vi.mock("@/pages/NotFound", () => ({ default: () => <div>Not Found</div> }));
vi.mock("@/pages/admin/AdminEntry", () => ({ default: () => <div>Admin Entry</div> }));
vi.mock("@/pages/legal/TermsAndConditions", () => ({ default: () => <div>Terms and Conditions Page</div> }));
vi.mock("@/pages/legal/PrivacyNotices", () => ({ default: () => <div>Privacy Notices Page</div> }));
vi.mock("@/pages/legal/CookieSettings", () => ({ default: () => <div>Cookie Settings Page</div> }));
vi.mock("@/pages/legal/SiteMapPage", () => ({ default: () => <div>Sitemap Page</div> }));
vi.mock("@/pages/legal/AccessibilityPage", () => ({ default: () => <div>Accessibility Page</div> }));
vi.mock("@/pages/legal/YourPrivacyChoicesPage", () => ({ default: () => <div>Your Privacy Choices Page</div> }));

function renderAt(path: string) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

describe("App routes and admin shortcut removal", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders homepage route", () => {
    renderAt("/");
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders insights listing route", () => {
    renderAt("/insights");
    expect(screen.getByText("Insights Page")).toBeInTheDocument();
  });

  it("renders insights detail route", () => {
    renderAt("/insights/test-slug");
    expect(screen.getByText("Insight Detail Page")).toBeInTheDocument();
  });

  it("renders admin route", () => {
    renderAt("/admin/posts");
    expect(screen.getByText("Admin Entry")).toBeInTheDocument();
  });

  it("renders policy routes", () => {
    renderAt("/terms-and-conditions");
    expect(screen.getByText("Terms and Conditions Page")).toBeInTheDocument();

    renderAt("/privacy-notices");
    expect(screen.getByText("Privacy Notices Page")).toBeInTheDocument();

    renderAt("/cookie-settings");
    expect(screen.getByText("Cookie Settings Page")).toBeInTheDocument();

    renderAt("/sitemap");
    expect(screen.getByText("Sitemap Page")).toBeInTheDocument();

    renderAt("/accessibility");
    expect(screen.getByText("Accessibility Page")).toBeInTheDocument();

    renderAt("/your-privacy-choices");
    expect(screen.getByText("Your Privacy Choices Page")).toBeInTheDocument();
  });

  it("renders not found for unknown route", () => {
    renderAt("/does-not-exist");
    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });

  it("does not mount the old popup shortcut behavior", () => {
    renderAt("/");

    fireEvent.keyDown(window, { key: "#", code: "Digit3", ctrlKey: true, shiftKey: true });

    expect(screen.queryByRole("button", { name: "Unlock" })).not.toBeInTheDocument();
    expect(screen.queryByText("Ctrl + Shift + 3")).not.toBeInTheDocument();
  });
});

