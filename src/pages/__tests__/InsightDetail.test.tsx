import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import InsightDetail from "@/pages/InsightDetail";
import { getPostBySlug } from "@/lib/api/publicCms";
import { ApiError } from "@/lib/api/client";

vi.mock("@/lib/api/publicCms", () => ({
  getPostBySlug: vi.fn(),
}));

vi.mock("@/components/BloomNav", () => ({
  BloomNav: () => <div data-testid="mock-nav" />,
}));

vi.mock("@/components/Footer", () => ({
  Footer: () => <div data-testid="mock-footer" />,
}));

function renderDetail(slug = "coffee-resilience") {
  return render(
    <MemoryRouter initialEntries={[`/insights/${slug}`]}>
      <Routes>
        <Route path="/insights/:slug" element={<InsightDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("InsightDetail page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("fetches the post by slug", async () => {
    vi.mocked(getPostBySlug).mockResolvedValue({
      title: "Coffee Resilience",
      slug: "coffee-resilience",
      content_html: "<p>Body</p>",
    });

    renderDetail("coffee-resilience");

    await waitFor(() => {
      expect(getPostBySlug).toHaveBeenCalledWith("coffee-resilience");
    });
  });

  it("renders title, excerpt, and body HTML", async () => {
    vi.mocked(getPostBySlug).mockResolvedValue({
      title: "Coffee Resilience",
      excerpt: "A new framework for growers.",
      published_at: "2026-02-05T12:00:00.000Z",
      category: { name: "Insights" },
      author: { name: "Research Team" },
      tags: ["field-report", "resilience"],
      content_html: "<p>Deep article content</p>",
    });

    renderDetail();

    expect(await screen.findByText("Coffee Resilience")).toBeInTheDocument();
    expect(screen.getByText("A new framework for growers.")).toBeInTheDocument();
    expect(screen.getByText("Deep article content")).toBeInTheDocument();
    expect(screen.getByText("Insights")).toBeInTheDocument();
    expect(screen.getByText("Research Team")).toBeInTheDocument();
    expect(screen.getByText("field-report")).toBeInTheDocument();
    expect(screen.getByText("resilience")).toBeInTheDocument();
  });

  it("renders document and external resource actions when present", async () => {
    vi.mocked(getPostBySlug).mockResolvedValue({
      title: "Coffee Resilience",
      content_html: "<p>Body</p>",
      document_url: "https://example.com/doc.pdf",
      external_url: "https://example.com/resource",
    });

    renderDetail();

    expect(await screen.findByRole("link", { name: "Download document" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open external resource" })).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(getPostBySlug).mockReturnValue(new Promise(() => {}));

    renderDetail();

    expect(screen.getByText("Loading insight...")).toBeInTheDocument();
  });

  it("shows not found state on 404", async () => {
    vi.mocked(getPostBySlug).mockRejectedValue(
      new ApiError({ status: 404, message: "Not found" })
    );

    renderDetail();

    expect(await screen.findByText("Insight not found")).toBeInTheDocument();
  });

  it("shows generic error state on failure", async () => {
    vi.mocked(getPostBySlug).mockRejectedValue(new Error("boom"));

    renderDetail();

    expect(
      await screen.findByText("Unable to load this insight right now. Please try again.")
    ).toBeInTheDocument();
  });

  it("renders image and video HTML content in article body", async () => {
    vi.mocked(getPostBySlug).mockResolvedValue({
      title: "Coffee Resilience",
      content_html:
        '<figure><img src="https://cdn.example.com/photo.jpg" alt="Farm photo" /><figcaption>Field capture</figcaption></figure><figure><video controls src="https://cdn.example.com/video.mp4"></video><figcaption>Interview clip</figcaption></figure>',
    });

    renderDetail();

    await screen.findByText("Coffee Resilience");
    const body = screen.getByTestId("insight-body");
    expect(body.querySelector("img")).toBeInTheDocument();
    expect(body.querySelector("video")).toBeInTheDocument();
    expect(screen.getByText("Field capture")).toBeInTheDocument();
    expect(screen.getByText("Interview clip")).toBeInTheDocument();
  });

  it("shows graceful fallback when content_html is missing but block payload exists", async () => {
    vi.mocked(getPostBySlug).mockResolvedValue({
      title: "Coffee Resilience",
      content_blocks_json: [{ id: "p-1", type: "paragraph", order: 0, data: { text: "Block text" } }],
    });

    renderDetail();

    expect(
      await screen.findByText(
        "This insight is being refreshed for the latest content format. Please check back soon."
      )
    ).toBeInTheDocument();
  });
});
