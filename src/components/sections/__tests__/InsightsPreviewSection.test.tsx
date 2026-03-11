import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { HTMLAttributes } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InsightsPreviewSection } from "@/components/sections/InsightsPreviewSection";
import { getPosts } from "@/lib/api/publicCms";

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

vi.mock("@/lib/api/publicCms", () => ({
  getPosts: vi.fn(),
}));

describe("InsightsPreviewSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders insights intro copy", async () => {
    vi.mocked(getPosts).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <InsightsPreviewSection />
      </MemoryRouter>
    );

    expect(screen.getAllByText("INSIGHTS").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Publications and Updates" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "3rd Harvest publishes insights on coffee systems, circular agriculture, renewable energy, and community resilience."
      )
    ).toBeInTheDocument();
  });

  it("loads and renders preview posts from mocked API", async () => {
    vi.mocked(getPosts).mockResolvedValueOnce([
      {
        id: 1,
        slug: "alpha",
        title: "Alpha insight",
        excerpt: "Alpha excerpt",
        featured_image_url: "/hero0.webp",
      },
      {
        id: 2,
        slug: "beta",
        title: "Beta insight",
        excerpt: "Beta excerpt",
        featured_image_url: "/hero2.webp",
      },
    ]);

    render(
      <MemoryRouter>
        <InsightsPreviewSection />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getPosts).toHaveBeenCalledWith({ category: "insights", page: 1, limit: 4 });
    });

    expect(screen.getByTestId("insights-preview-grid")).toBeInTheDocument();
    expect(screen.getByText("Alpha insight")).toBeInTheDocument();
    expect(screen.getByText("Beta insight")).toBeInTheDocument();
  });

  it("falls back to uncategorized query when category=insights returns empty", async () => {
    vi.mocked(getPosts)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
      {
        id: 1,
        slug: "alpha",
        title: "Alpha insight",
        excerpt: "Alpha excerpt",
        featured_image_url: "/hero0.webp",
      },
      {
        id: 2,
        slug: "beta",
        title: "Beta insight",
        excerpt: "Beta excerpt",
        featured_image_url: "/hero2.webp",
      },
    ]);

    render(
      <MemoryRouter>
        <InsightsPreviewSection />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getPosts).toHaveBeenCalledWith({ category: "insights", page: 1, limit: 4 });
    });
    await waitFor(() => {
      expect(getPosts).toHaveBeenCalledWith({ page: 1, limit: 4 });
    });

    expect(screen.getByTestId("insights-preview-grid")).toBeInTheDocument();
    expect(screen.getByText("Alpha insight")).toBeInTheDocument();
    expect(screen.getByText("Beta insight")).toBeInTheDocument();
  });
});
