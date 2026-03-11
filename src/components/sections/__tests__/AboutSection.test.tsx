import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { HTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AboutSection } from "@/components/sections/AboutSection";

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

describe("AboutSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders exact about text and preserves #about anchor", () => {
    const { container } = render(<AboutSection />);

    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(screen.getByText("ABOUT")).toBeInTheDocument();
    expect(
      screen.getByText(
        "3rd Harvest is an initiative focused on strengthening the first mile of coffee through circular systems that connect renewable energy, coffee processing, and soil regeneration."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The initiative works with partners across the coffee ecosystem to introduce productive infrastructure within coffee-producing communities."
      )
    ).toBeInTheDocument();
  });
});
