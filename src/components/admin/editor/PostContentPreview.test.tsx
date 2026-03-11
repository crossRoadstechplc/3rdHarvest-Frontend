import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PostContentPreview } from "@/components/admin/editor/PostContentPreview";

describe("PostContentPreview", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders title, excerpt, and contentHtml", () => {
    render(
      <PostContentPreview
        title="Preview Title"
        excerpt="Preview excerpt"
        contentHtml="<p>Preview body</p>"
      />
    );

    expect(screen.getByText("Preview Title")).toBeInTheDocument();
    expect(screen.getByText("Preview excerpt")).toBeInTheDocument();
    expect(screen.getByText("Preview body")).toBeInTheDocument();
  });

  it("renders featured image when present", () => {
    render(
      <PostContentPreview
        title="Image Post"
        excerpt=""
        contentHtml="<p>Body</p>"
        featuredImageUrl="https://example.com/cover.jpg"
        featuredImageAlt="Cover"
      />
    );

    expect(screen.getByRole("img", { name: "Cover" })).toBeInTheDocument();
  });

  it("omits optional fields gracefully when missing", () => {
    render(<PostContentPreview title="Only title" excerpt="" contentHtml="<p>Body</p>" />);

    expect(screen.getByText("Only title")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.queryByText(/\|/)).not.toBeInTheDocument();
  });

  it("renders empty preview state when title and content are empty", () => {
    render(<PostContentPreview title="" excerpt="" contentHtml="" />);

    expect(screen.getByTestId("preview-empty-state")).toBeInTheDocument();
    expect(screen.getByText("Your article preview will appear here.")).toBeInTheDocument();
  });
});
