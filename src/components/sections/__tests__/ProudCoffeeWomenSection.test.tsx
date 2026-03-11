import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { HTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProudCoffeeWomenSection } from "@/components/sections/ProudCoffeeWomenSection";

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

describe("ProudCoffeeWomenSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders household transformation exact content", () => {
    render(<ProudCoffeeWomenSection />);

    expect(screen.getByText("HOUSEHOLD TRANSFORMATION")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Women, Health, and Opportunity" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Women play a central role in coffee production and household life across many coffee communities."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Women and youth can participate directly in managing and benefiting from these systems, strengthening both livelihoods and community resilience."
      )
    ).toBeInTheDocument();
  });

  it("renders proud coffee women heading/body and preserves #pcw anchor", () => {
    const { container } = render(<ProudCoffeeWomenSection />);

    expect(container.querySelector("#pcw")).toBeInTheDocument();
    expect(screen.getByText("PROUD COFFEE WOMEN")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A Label for Community-Centered Coffee" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "The Proud Coffee Women (PCW) label is connected to the 3rd Harvest initiative."
      )
    ).toBeInTheDocument();
  });
});
