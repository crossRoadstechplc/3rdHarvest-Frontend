import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BloomNav } from "@/components/BloomNav";

const navigateMock = vi.fn();
const locationMock = { pathname: "/" };

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
  useLocation: () => locationMock,
}));

describe("BloomNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.pushState({}, "", "/");
  });

  afterEach(() => {
    cleanup();
    document.querySelectorAll("#hero, #the-idea").forEach((node) => node.remove());
  });

  it("renders expected navigation labels on desktop", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: 1280 });

    render(<BloomNav />);

    [
      "Home",
      "Idea",
      "System",
      "PCW",
      "Impact",
      "Deployments",
      "Contact",
      "Engage",
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    fireEvent.mouseEnter(screen.getByRole("button", { name: "Engage" }));
    expect(screen.getByRole("menuitem", { name: "Partners" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Newsletter" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Insights" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "X" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Instagram" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Facebook" })).toBeInTheDocument();

    expect(screen.getByTestId("active-indicator-home")).toBeInTheDocument();
  });

  it("mobile nav toggles correctly", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: 390 });

    render(<BloomNav />);

    const toggle = screen.getByRole("button", { name: "Toggle navigation" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Newsletter" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Partners" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Insights" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "X" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Contact" })).toBeInTheDocument();
  });

  it("preserves anchor scrolling and insights routing behavior", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: 1280 });
    const section = document.createElement("section");
    section.id = "the-idea";
    section.scrollIntoView = vi.fn();
    document.body.appendChild(section);

    render(<BloomNav />);

    fireEvent.click(screen.getByRole("button", { name: "Idea" }));
    expect(section.scrollIntoView).toHaveBeenCalled();
    expect(window.location.hash).toBe("#the-idea");

    fireEvent.mouseEnter(screen.getByRole("button", { name: "Engage" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Insights" }));
    expect(navigateMock).toHaveBeenCalledWith("/insights");
  });

  it("updates active indicator and hash based on homepage scroll position", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: 1280 });
    Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 0 });

    const hero = document.createElement("section");
    hero.id = "hero";
    hero.getBoundingClientRect = () =>
      ({
        top: 0 - window.scrollY,
        bottom: 800 - window.scrollY,
        left: 0,
        right: 0,
        width: 1000,
        height: 800,
        x: 0,
        y: 0 - window.scrollY,
        toJSON: () => ({}),
      }) as DOMRect;

    const idea = document.createElement("section");
    idea.id = "the-idea";
    idea.getBoundingClientRect = () =>
      ({
        top: 900 - window.scrollY,
        bottom: 1500 - window.scrollY,
        left: 0,
        right: 0,
        width: 1000,
        height: 600,
        x: 0,
        y: 900 - window.scrollY,
        toJSON: () => ({}),
      }) as DOMRect;

    document.body.appendChild(hero);
    document.body.appendChild(idea);

    render(<BloomNav />);
    expect(screen.getByTestId("active-indicator-home")).toBeInTheDocument();
    expect(window.location.hash).toBe("#home");

    window.scrollY = 980;
    fireEvent.scroll(window);

    expect(screen.getByTestId("active-indicator-idea")).toBeInTheDocument();
    expect(window.location.hash).toBe("#the-idea");
  });
});
