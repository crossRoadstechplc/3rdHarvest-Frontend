import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import type { HTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ImpactSection } from "@/components/sections/ImpactSection";

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

describe("ImpactSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("preserves #impact anchor", () => {
    const { container } = render(<ImpactSection />);
    expect(container.querySelector("#impact")).toBeInTheDocument();
  });

  it("renders climate alignment content and three framework cards", () => {
    render(<ImpactSection />);

    expect(screen.getByText("CLIMATE & SUPPLY CHAIN ALIGNMENT")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Supporting Sustainable Coffee Systems" })).toBeInTheDocument();

    const climateGrid = screen.getByTestId("climate-cards-grid");
    expect(within(climateGrid).getAllByTestId("baked-text-overlay")).toHaveLength(3);
    expect(screen.getByText("Scope 3 supply chain engagement")).toBeInTheDocument();
    expect(screen.getByText("regenerative agriculture initiatives")).toBeInTheDocument();
    expect(screen.getByText("sustainable sourcing frameworks")).toBeInTheDocument();
  });

  it("renders impact heading and five impact cards", () => {
    render(<ImpactSection />);

    expect(screen.getByText("IMPACT")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Transforming the First Mile of Coffee" })).toBeInTheDocument();

    const impactGrid = screen.getByTestId("impact-cards-grid");
    expect(impactGrid.querySelectorAll("article")).toHaveLength(5);

    expect(screen.getByText("• improved household income from coffee")).toBeInTheDocument();
    expect(screen.getByText("• renewable energy access")).toBeInTheDocument();
    expect(screen.getByText("• reduced pressure on forests")).toBeInTheDocument();
    expect(screen.getByText("• improved soil fertility")).toBeInTheDocument();
    expect(screen.getByText("• expanded roles for women in coffee communities")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Impact metrics are tracked through the 3rd Harvest Impact Framework, supporting partner ESG and sustainability reporting."
      )
    ).toBeInTheDocument();
  });
});
