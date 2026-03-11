import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { HTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DeploymentsSection } from "@/components/sections/DeploymentsSection";

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

describe("DeploymentsSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders deployments content and preserves #deployments anchor", () => {
    const { container } = render(<DeploymentsSection />);

    expect(container.querySelector("#deployments")).toBeInTheDocument();
    expect(screen.getByText("DEPLOYMENTS")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Early Deployments" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "3rd Harvest systems are being introduced in coffee-producing communities through pilot deployments and partner collaborations."
      )
    ).toBeInTheDocument();
  });
});
