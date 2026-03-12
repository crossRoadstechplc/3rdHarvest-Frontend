import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { Footer } from "@/components/Footer";

describe("Footer", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders brand statement, quick links, policy links, and social icon links", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("3RD")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Unlocking multiple harvests from a single coffee crop through circular systems connecting coffee, energy, and soil."
      )
    ).toBeInTheDocument();

    [
      "Home",
      "The Idea",
      "Proud Coffee Women",
      "Impact",
      "Deployments",
      "Partners",
      "Insights",
      "About",
      "Contact",
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    [
      "Terms and Conditions",
      "Privacy Notices",
      "Cookie Settings",
      "Sitemap",
      "Accessibility",
      "Your Privacy Choices",
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    ["LinkedIn", "X", "Instagram", "Facebook"].forEach((label) => {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    });

    expect(screen.getByText("© 2026 3rd Harvest Initiative. All Rights Reserved.")).toBeInTheDocument();
  });
});
