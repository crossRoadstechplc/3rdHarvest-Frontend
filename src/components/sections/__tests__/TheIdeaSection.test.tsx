import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import type { HTMLAttributes } from "react";
import { TheIdeaSection } from "@/components/sections/TheIdeaSection";

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

describe("TheIdeaSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders opportunity heading and exact body content", () => {
    const { container } = render(<TheIdeaSection />);

    const section = container.querySelector("#the-idea");
    expect(section).toBeInTheDocument();
    expect(screen.getByText(/THE (OPPORTUNITY|IDEA)/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The First Mile of Coffee" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Coffee is cultivated largely by smallholder households, yet communities at the origin of the crop often capture the smallest share of its value."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "3rd Harvest addresses this gap by enabling integrated systems that connect coffee production, renewable energy, and regenerative agriculture."
      )
    ).toBeInTheDocument();
  });

  it("renders four baked-text cards for breakthrough outcomes", () => {
    render(<TheIdeaSection />);

    const grid = screen.getByTestId("breakthrough-cards-grid");
    expect(within(grid).getAllByTestId("baked-text-overlay")).toHaveLength(4);
    expect(screen.getByText("increased income from coffee processing")).toBeInTheDocument();
    expect(screen.getByText("renewable household energy")).toBeInTheDocument();
    expect(screen.getByText("clean cooking fuel")).toBeInTheDocument();
    expect(screen.getByText("regenerated soil nutrients")).toBeInTheDocument();
  });

  it("includes mobile-friendly layout hooks", () => {
    render(<TheIdeaSection />);

    expect(screen.getByTestId("opportunity-layout").className).toContain("lg:grid-cols-[1.05fr_0.95fr]");
    expect(screen.getByTestId("breakthrough-layout").className).toContain("space-y-6");
    expect(screen.getByTestId("breakthrough-cards-grid").className).toContain("sm:grid-cols-2");
  });
});
