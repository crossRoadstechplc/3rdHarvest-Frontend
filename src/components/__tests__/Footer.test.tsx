import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { Footer } from "@/components/Footer";

describe("Footer", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders brand statement, quick links, and legal links", () => {
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

    ["Privacy Policy", "Terms of Use", "Cookie Policy"].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    expect(screen.getByText("© 2026 3rd Harvest Initiative. All Rights Reserved.")).toBeInTheDocument();
  });
});
