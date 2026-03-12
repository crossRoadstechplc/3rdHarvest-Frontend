import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { HTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactSection } from "@/components/sections/ContactSection";

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

describe("ContactSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders contact email and form fields with #contact anchor", () => {
    const { container } = render(<ContactSection />);

    expect(container.querySelector("#contact")).toBeInTheDocument();
    expect(screen.getByText("CONTACT")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "info@3rdharvest.org" })).toHaveAttribute(
      "href",
      "mailto:info@3rdharvest.org"
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("renders social icon links", () => {
    render(<ContactSection />);

    ["LinkedIn", "X", "Instagram", "Facebook"].forEach((label) => {
      const link = screen.getByRole("link", { name: label });
      expect(link).toBeInTheDocument();
    });

    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://linkedin.com");
    expect(screen.getByRole("link", { name: "X" })).toHaveAttribute("href", "https://x.com");
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://instagram.com");
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute("href", "https://facebook.com");
  });
});
