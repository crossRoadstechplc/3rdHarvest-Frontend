import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AdminPostEditorPage } from "@/pages/admin/AdminPostEditorPage";
import {
  createAdminPost,
  getAdminAuthors,
  getAdminCategories,
  getAdminPost,
  getAdminTags,
  updateAdminPost,
} from "@/lib/api/admin";

vi.mock("@/lib/api/admin", async () => {
  const original = await vi.importActual("@/lib/api/admin");
  return {
    ...original,
    getAdminCategories: vi.fn(),
    getAdminAuthors: vi.fn(),
    getAdminTags: vi.fn(),
    getAdminPost: vi.fn(),
    createAdminPost: vi.fn(),
    updateAdminPost: vi.fn(),
  };
});

function renderCreatePage() {
  return render(
    <MemoryRouter initialEntries={["/admin/posts/new"]}>
      <Routes>
        <Route path="/admin/posts/new" element={<AdminPostEditorPage token="token" onUnauthorized={vi.fn()} />} />
      </Routes>
    </MemoryRouter>
  );
}

function renderEditPage(id = "1") {
  return render(
    <MemoryRouter initialEntries={[`/admin/posts/${id}/edit`]}>
      <Routes>
        <Route path="/admin/posts/:id/edit" element={<AdminPostEditorPage token="token" onUnauthorized={vi.fn()} />} />
      </Routes>
    </MemoryRouter>
  );
}

function getParagraphEditor(): HTMLElement {
  return screen.getByLabelText(/Paragraph rich text/i);
}

function setParagraphRichText(html: string) {
  const editor = getParagraphEditor();
  editor.innerHTML = html;
  fireEvent.input(editor);
}

describe("AdminPostEditorPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getAdminCategories).mockResolvedValue([{ id: 10, name: "Insights" }]);
    vi.mocked(getAdminAuthors).mockResolvedValue([{ id: 20, name: "Author A" }]);
    vi.mocked(getAdminTags).mockResolvedValue([{ id: 30, name: "Tag A" }]);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders create editor flow and does not mount old body editor", async () => {
    renderCreatePage();

    expect(await screen.findByRole("heading", { name: "Create Post" })).toBeInTheDocument();
    expect(screen.getByTestId("post-block-editor")).toBeInTheDocument();
    expect(screen.queryByLabelText("Post body editor")).not.toBeInTheDocument();
  });

  it("create form submits content_blocks_json with metadata", async () => {
    vi.mocked(createAdminPost).mockResolvedValue({});
    renderCreatePage();

    await screen.findByRole("heading", { name: "Create Post" });
    fireEvent.change(screen.getByLabelText("Post title"), { target: { value: "New Post" } });
    fireEvent.change(screen.getByLabelText("Post slug"), { target: { value: "new-post" } });
    setParagraphRichText("<p>Block body</p>");
    fireEvent.change(screen.getByLabelText("Post status"), { target: { value: "published" } });
    fireEvent.change(screen.getByLabelText("Post category"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("Post author"), { target: { value: "20" } });

    fireEvent.click(screen.getByRole("button", { name: "Create post" }));

    await waitFor(() => {
      expect(createAdminPost).toHaveBeenCalledWith(
        "token",
        expect.objectContaining({
          title: "New Post",
          slug: "new-post",
          status: "published",
          category_id: 10,
          author_id: 20,
          content_html: "<p>Block body</p>",
          content_blocks_json: expect.arrayContaining([
            expect.objectContaining({
              type: "paragraph",
              order: 1,
              data: expect.objectContaining({ html: "<p>Block body</p>" }),
            }),
          ]),
        })
      );
    });
  });

  it("edit form initializes from fetched content_blocks_json and updates payload", async () => {
    vi.mocked(getAdminPost).mockResolvedValue({
      post: {
        id: 1,
        title: "Post One",
        slug: "post-one",
        content_blocks_json: [
          { id: "h-1", type: "heading", order: 0, data: { text: "Heading", level: 2 } },
          { id: "p-1", type: "paragraph", order: 1, data: { text: "Initial paragraph" } },
        ],
      },
    });
    vi.mocked(updateAdminPost).mockResolvedValue({});

    renderEditPage("1");

    await waitFor(() => {
      expect(screen.getByDisplayValue("Heading")).toBeInTheDocument();
      expect(screen.getByText("Initial paragraph")).toBeInTheDocument();
    });

    setParagraphRichText("<p>Updated paragraph</p>");
    fireEvent.click(screen.getByRole("button", { name: "Update post" }));

    await waitFor(() => {
      expect(updateAdminPost).toHaveBeenCalledWith(
        "token",
        "1",
        expect.objectContaining({
          content_blocks_json: expect.arrayContaining([
            expect.objectContaining({
              type: "paragraph",
              data: expect.objectContaining({ html: "<p>Updated paragraph</p>" }),
            }),
          ]),
        })
      );
    });
  });

  it("shows fallback notice for legacy posts without blocks", async () => {
    vi.mocked(getAdminPost).mockResolvedValue({
      post: {
        id: 1,
        title: "Legacy",
        slug: "legacy",
        content_html: "<p>Legacy content</p>",
      },
    });

    renderEditPage("1");

    expect(
      await screen.findByText("This post used legacy HTML content. A fallback paragraph block was generated for editing.")
    ).toBeInTheDocument();
    expect(screen.getAllByText("Legacy content").length).toBeGreaterThan(0);
  });
});
