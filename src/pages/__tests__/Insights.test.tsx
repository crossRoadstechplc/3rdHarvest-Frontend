import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Insights from "@/pages/Insights";
import { getPosts } from "@/lib/api/publicCms";

vi.mock("@/lib/api/publicCms", () => ({
  getPosts: vi.fn(),
}));

vi.mock("@/components/BloomNav", () => ({
  BloomNav: () => <div data-testid="mock-nav" />,
}));

vi.mock("@/components/Footer", () => ({
  Footer: () => <div data-testid="mock-footer" />,
}));

function renderInsights() {
  return render(
    <MemoryRouter>
      <Insights />
    </MemoryRouter>
  );
}

describe("Insights page", () => {
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
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("fetches posts for category=insights", async () => {
    vi.mocked(getPosts)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    renderInsights();

    await waitFor(() => {
      expect(getPosts).toHaveBeenCalledWith(
        expect.objectContaining({
          category: "insights",
          page: 1,
          limit: 9,
        })
      );
    });
    await waitFor(() => {
      expect(getPosts).toHaveBeenCalledTimes(2);
      expect(vi.mocked(getPosts).mock.calls[1][0]).toEqual(
        expect.objectContaining({
          page: 1,
          limit: 9,
        })
      );
      expect((vi.mocked(getPosts).mock.calls[1][0] as { category?: string }).category).toBeUndefined();
    });
    expect(document.title).toBe("Insights | 3rd Harvest");
  });

  it("renders exact insights intro content and page structure", async () => {
    vi.mocked(getPosts).mockResolvedValue([]);

    renderInsights();

    expect(screen.getByTestId("mock-nav")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
    expect(screen.getByText("INSIGHTS")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Publications and Updates" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "3rd Harvest publishes insights on coffee systems, circular agriculture, renewable energy, and community resilience."
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/^• field reports$/i)).toBeInTheDocument();
    expect(screen.getByText(/^• concept notes$/i)).toBeInTheDocument();
    expect(screen.getByText(/^• program updates$/i)).toBeInTheDocument();
    expect(screen.getByText(/^• research insights$/i)).toBeInTheDocument();
  });

  it("displays returned post cards", async () => {
    vi.mocked(getPosts).mockResolvedValue([
      {
        id: 1,
        title: "A New Circular Model",
        slug: "circular-model",
        excerpt: "How circular agriculture strengthens local resilience.",
        published_at: "2026-03-01T12:00:00.000Z",
      },
    ]);

    renderInsights();

    expect(await screen.findByText("A New Circular Model")).toBeInTheDocument();
    expect(screen.getByText("Read insight")).toBeInTheDocument();
  });

  it("changing a filter updates the API query", async () => {
    vi.mocked(getPosts)
      .mockResolvedValueOnce([{ id: 1, title: "Warm", slug: "warm" }])
      .mockResolvedValue([]);

    renderInsights();

    await waitFor(() => expect(getPosts).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole("button", { name: "Concept Notes" }));

    await waitFor(() => {
      expect(getPosts).toHaveBeenLastCalledWith(
        expect.objectContaining({
          category: "insights",
          tag: "concept-note",
          page: 1,
        })
      );
    });
  });

  it("shows loading state", () => {
    vi.mocked(getPosts).mockReturnValue(new Promise(() => {}));

    renderInsights();

    expect(screen.getByText("Loading insights...")).toBeInTheDocument();
  });

  it("shows empty state when no posts are returned", async () => {
    vi.mocked(getPosts).mockResolvedValue([]);

    renderInsights();

    expect(
      await screen.findByText(
        "No insights match your current filters. Try another tag or search term."
      )
    ).toBeInTheDocument();
  });

  it("shows error state on API failure", async () => {
    vi.mocked(getPosts).mockRejectedValue(new Error("failed"));

    renderInsights();

    expect(
      await screen.findByText("Unable to load insights right now. Please try again.")
    ).toBeInTheDocument();
  });

  it("keeps responsive grid structure", async () => {
    vi.mocked(getPosts).mockResolvedValue([
      {
        id: 1,
        title: "Responsive card",
        slug: "responsive-card",
        excerpt: "Test",
      },
    ]);

    renderInsights();

    const grid = await screen.findByTestId("insights-grid");
    expect(grid.className).toContain("grid-cols-1");
    expect(grid.className).toContain("md:grid-cols-2");
    expect(grid.className).toContain("lg:grid-cols-3");
  });
});
