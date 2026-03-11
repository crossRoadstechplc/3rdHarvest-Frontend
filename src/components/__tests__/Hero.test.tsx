import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Hero } from "@/components/Hero";

describe("Hero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders exact headline and CTA buttons", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { name: "Unlocking Multiple Harvests from a Single Coffee Crop" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Learn About the Initiative" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Partner With 3rd Harvest" })).toBeInTheDocument();
  });

  it("renders hero text and image structure", () => {
    render(<Hero />);

    expect(screen.getByText("Coffee. Energy. Soil.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Coffee-producing community scene 1" })).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: "Coffee-producing community scene 2" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("img", { name: "Coffee-producing community scene 3" })).toBeInTheDocument();
  });

  it("uses middle image as top card by default and brings hovered card to front", () => {
    render(<Hero />);

    expect(screen.getByTestId("hero-card-1")).toHaveAttribute("data-active", "true");
    expect(screen.getByTestId("hero-card-0")).toHaveAttribute("data-active", "false");

    fireEvent.mouseEnter(screen.getByTestId("hero-card-0"));
    expect(screen.getByTestId("hero-card-0")).toHaveAttribute("data-active", "true");
  });

  it("learn button keeps anchor scrolling behavior", () => {
    const section = document.createElement("section");
    section.id = "the-idea";
    section.scrollIntoView = vi.fn();
    document.body.appendChild(section);

    render(<Hero />);

    fireEvent.click(screen.getByRole("button", { name: "Learn About the Initiative" }));
    expect(section.scrollIntoView).toHaveBeenCalled();
  });

  it("partner button scrolls to contact section", () => {
    const section = document.createElement("section");
    section.id = "contact";
    section.scrollIntoView = vi.fn();
    document.body.appendChild(section);

    render(<Hero />);
    fireEvent.click(screen.getByRole("button", { name: "Partner With 3rd Harvest" }));

    expect(section.scrollIntoView).toHaveBeenCalled();
  });
});
