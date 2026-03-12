import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { HTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PartnersSection } from "@/components/sections/PartnersSection";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      initial,
      whileInView,
      viewport,
      transition,
      ...props
    }: HTMLAttributes<HTMLDivElement> & {
      initial?: unknown;
      whileInView?: unknown;
      viewport?: unknown;
      transition?: unknown;
    }) => <div {...props}>{children}</div>,
  },
}));

describe("PartnersSection", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders partners CTA and logo strip structure with #partners anchor", () => {
    const { container } = render(<PartnersSection />);

    expect(container.querySelector("#partners")).toBeInTheDocument();
    expect(screen.getByText("PARTNERS")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A Collaborative Platform" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Become a Partner" })).toBeInTheDocument();
    expect(screen.getByTestId("partners-logo-scroller")).toBeInTheDocument();
    expect(screen.getAllByTestId("partner-logo-placeholder").length).toBeGreaterThanOrEqual(8);
  });

  it("renders advisory board content", () => {
    render(<PartnersSection />);

    expect(screen.getByText("ADVISORY BOARD")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The initiative is guided by advisors with expertise in coffee systems, renewable energy, climate, and rural development."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("(Names added as initiative grows.)")).toBeInTheDocument();
  });
});
