import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/pages/Home";
import { getPosts } from "@/lib/api/publicCms";

vi.mock("@/lib/api/publicCms", () => ({
  getPosts: vi.fn(),
}));

vi.mock("@/components/BloomNav", () => ({
  BloomNav: () => <div data-testid="mock-bloom-nav" />,
}));

vi.mock("@/components/Footer", () => ({
  Footer: () => <div data-testid="mock-footer" />,
}));

vi.mock("@/components/LoadingScreen", () => ({
  LoadingScreen: () => null,
}));

vi.mock("@/components/ContactModalProvider", () => ({
  useContactModal: () => ({
    openContactModal: vi.fn(),
  }),
}));

describe("Home page redesign smoke", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        disconnect() {}
        observe() {}
        unobserve() {}
      }
    );
    vi.mocked(getPosts).mockResolvedValue([]);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders critical homepage sections after redesign", async () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getPosts).toHaveBeenCalledWith({ category: "insights", page: 1, limit: 4 });
    });

    expect(screen.getByTestId("mock-bloom-nav")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Unlocking Multiple Harvests from a Single Coffee Crop" })).toBeInTheDocument();
    expect(container.querySelector("#the-idea")).toBeInTheDocument();
    expect(container.querySelector("#the-system")).toBeInTheDocument();
    expect(container.querySelector("#pcw")).toBeInTheDocument();
    expect(container.querySelector("#impact")).toBeInTheDocument();
    expect(container.querySelector("#deployments")).toBeInTheDocument();
    expect(container.querySelector("#partners")).toBeInTheDocument();
    expect(container.querySelector("#newsletter")).toBeInTheDocument();
    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });

  it("does not render obsolete popup shortcut UI", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.queryByText("Ctrl + Shift + 3")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Unlock" })).not.toBeInTheDocument();
  });
});
