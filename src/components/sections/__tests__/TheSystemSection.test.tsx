import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { HTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TheSystemSection } from "@/components/sections/TheSystemSection";

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

describe("TheSystemSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders expected anchor and heading", () => {
    const { container } = render(<TheSystemSection />);

    const section = container.querySelector("#the-system");
    expect(section).toBeInTheDocument();
    expect(screen.getByText("THE CIRCULAR SYSTEM")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Productive Energy at the First Mile" })).toBeInTheDocument();
  });

  it("renders four-step system diagram labels", () => {
    render(<TheSystemSection />);

    expect(screen.getByTestId("system-diagram")).toBeInTheDocument();
    expect(screen.getByText("Sun")).toBeInTheDocument();
    expect(screen.getByText("Coffee Processing")).toBeInTheDocument();
    expect(screen.getByText("Household Energy")).toBeInTheDocument();
    expect(screen.getByText("Soil Regeneration")).toBeInTheDocument();
  });

  it("renders concluding bullet points", () => {
    render(<TheSystemSection />);

    expect(screen.getByText("• energy access improves household resilience")).toBeInTheDocument();
    expect(screen.getByText("• agricultural productivity increases")).toBeInTheDocument();
    expect(screen.getByText("• rural livelihoods expand")).toBeInTheDocument();
  });
});
