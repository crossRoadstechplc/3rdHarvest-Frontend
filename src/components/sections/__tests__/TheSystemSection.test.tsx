import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
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

    const diagram = screen.getByTestId("system-diagram");
    expect(diagram).toBeInTheDocument();
    expect(within(diagram).getByText("Sun")).toBeInTheDocument();
    expect(within(diagram).getByText("Coffee Processing")).toBeInTheDocument();
    expect(within(diagram).getByText("Household Energy")).toBeInTheDocument();
    expect(within(diagram).getByText("Soil Regeneration")).toBeInTheDocument();
  });

  it("renders concluding bullet points", () => {
    render(<TheSystemSection />);

    expect(screen.getByText("• Energy access improves household resilience")).toBeInTheDocument();
    expect(screen.getByText("• Agricultural productivity increases")).toBeInTheDocument();
    expect(screen.getByText("• Rural livelihoods expand")).toBeInTheDocument();
  });

  it("renders four narrative blocks at the bottom of the system section", () => {
    render(<TheSystemSection />);

    expect(screen.getByTestId("system-narrative-blocks")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Solar Power System" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Motorized Coffee Pulper" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Biogas Waste-to-Energy System" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Soil Regeneration Cycle" })).toBeInTheDocument();
  });
});
