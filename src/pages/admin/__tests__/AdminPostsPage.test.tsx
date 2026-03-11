import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AdminPostsPage } from "@/pages/admin/AdminPostsPage";
import { deleteAdminPost, getAdminPost, getAdminPosts, updateAdminPost } from "@/lib/api/admin";

vi.mock("@/lib/api/admin", async () => {
  const original = await vi.importActual("@/lib/api/admin");
  return {
    ...original,
    getAdminPosts: vi.fn(),
    getAdminPost: vi.fn(),
    deleteAdminPost: vi.fn(),
    updateAdminPost: vi.fn(),
  };
});

function renderPage() {
  return render(
    <MemoryRouter>
      <AdminPostsPage token="token" onUnauthorized={vi.fn()} />
    </MemoryRouter>
  );
}

describe("AdminPostsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getAdminPosts).mockResolvedValue([
      { id: 1, title: "Post One", slug: "post-one", status: "draft", content_type: "article" },
    ]);
    vi.mocked(getAdminPost).mockResolvedValue({
      post: {
        id: 1,
        title: "Post One",
        slug: "post-one",
        content_type: "insight",
        excerpt: "Excerpt",
        content_blocks_json: [
          {
            id: "b1",
            type: "paragraph",
            order: 1,
            data: { html: "<p>Body</p>" },
          },
        ],
        status: "draft",
        category_id: null,
        author_id: null,
        tag_ids: [],
      },
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders posts list and routes for create/edit", async () => {
    renderPage();
    expect(await screen.findByText("Post One")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "New post" })).toHaveAttribute("href", "/admin/posts/new");
    expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute("href", "/admin/posts/1/edit");
  });

  it("deletes post", async () => {
    vi.mocked(deleteAdminPost).mockResolvedValue({});
    renderPage();
    await screen.findByText("Post One");

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(deleteAdminPost).toHaveBeenCalledWith("token", 1);
    });
  });

  it("filters update list query", async () => {
    renderPage();
    await screen.findByText("Post One");

    fireEvent.change(screen.getByLabelText("Filter posts by status"), { target: { value: "published" } });
    fireEvent.change(screen.getByLabelText("Filter posts by content type"), { target: { value: "insight" } });
    fireEvent.change(screen.getByLabelText("Search posts"), { target: { value: "coffee" } });

    await waitFor(() => {
      expect(getAdminPosts).toHaveBeenLastCalledWith(
        "token",
        expect.objectContaining({ status: "published", content_type: "insight", search: "coffee" })
      );
    });
  });

  it("updates post status from the card selector", async () => {
    vi.mocked(updateAdminPost).mockResolvedValue({});
    renderPage();
    await screen.findByText("Post One");

    fireEvent.change(screen.getByLabelText("Set status for Post One"), { target: { value: "published" } });

    await waitFor(() => {
      expect(updateAdminPost).toHaveBeenCalledWith(
        "token",
        1,
        expect.objectContaining({
          title: "Post One",
          slug: "post-one",
          content_type: "insight",
          status: "published",
          content_blocks_json: expect.any(Array),
        })
      );
    });
  });

  it("handles loading and error states", async () => {
    vi.mocked(getAdminPosts).mockReset();
    vi.mocked(getAdminPosts).mockReturnValue(new Promise(() => {}));

    const { rerender } = render(
      <MemoryRouter>
        <AdminPostsPage token="token" onUnauthorized={vi.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText("Loading posts...")).toBeInTheDocument();

    vi.mocked(getAdminPosts).mockRejectedValue(new Error("boom"));
    rerender(
      <MemoryRouter>
        <AdminPostsPage token="token" onUnauthorized={vi.fn()} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));

    expect(await screen.findByText("Unable to load posts.")).toBeInTheDocument();
  });
});
