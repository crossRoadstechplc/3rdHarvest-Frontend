import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createAdminPost,
  getAdminAuthors,
  getAdminCategories,
  getAdminPost,
  getAdminTags,
  updateAdminPost,
} from "@/lib/api/admin";
import { extractItem, extractList, isUnauthorizedError, slugify } from "@/pages/admin/adminPageUtils";
import { PostBlockEditor } from "@/components/admin/blocks/PostBlockEditor";
import { PostContentPreview } from "@/components/admin/editor/PostContentPreview";
import { createBlock, normalizeAndSortBlocks, type CmsBlock } from "@/lib/cms/blocks";
import { fallbackBlocksFromLegacyHtml, renderBlocksToPreviewHtml } from "@/lib/cms/renderBlocks";
import { ApiError } from "@/lib/api/client";

type AdminPostEditorPageProps = {
  token: string;
  onUnauthorized: () => void;
};

type PostRecord = {
  id: string | number;
  title?: string;
  slug?: string;
  content_type?: string;
  excerpt?: string;
  content_html?: string;
  content_blocks_json?: unknown;
  document_url?: string;
  external_url?: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  status?: string;
  category_id?: string | number;
  author_id?: string | number;
  seo_title?: string;
  seo_description?: string;
  og_image_url?: string;
  is_featured?: boolean;
  allow_comments?: boolean;
  published_at?: string;
  tag_ids?: Array<string | number>;
};

type OptionItem = { id: string | number; name?: string };

type PostFormState = {
  title: string;
  slug: string;
  content_type: string;
  excerpt: string;
  content_blocks_json: CmsBlock[];
  document_url: string;
  external_url: string;
  featured_image_url: string;
  featured_image_alt: string;
  status: string;
  category_id: string;
  author_id: string;
  seo_title: string;
  seo_description: string;
  og_image_url: string;
  is_featured: boolean;
  allow_comments: boolean;
  published_at: string;
  tag_ids: string[];
};

const emptyForm: PostFormState = {
  title: "",
  slug: "",
  content_type: "insight",
  excerpt: "",
  content_blocks_json: [createBlock("paragraph", { order: 0 })],
  document_url: "",
  external_url: "",
  featured_image_url: "",
  featured_image_alt: "",
  status: "draft",
  category_id: "",
  author_id: "",
  seo_title: "",
  seo_description: "",
  og_image_url: "",
  is_featured: false,
  allow_comments: false,
  published_at: "",
  tag_ids: [],
};

const ALLOWED_CONTENT_TYPES = ["insight", "publication", "update"] as const;
const ALLOWED_STATUSES = ["draft", "published", "archived", "scheduled"] as const;

function toLocalDateTime(iso?: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

function parseContentBlocks(value: unknown): CmsBlock[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return normalizeAndSortBlocks(value as Array<Partial<CmsBlock>>).map((block) => {
    if (block.type === "paragraph") {
      const text = (block.data as { text?: unknown; html?: unknown }).text;
      const html = (block.data as { text?: unknown; html?: unknown }).html;
      return {
        ...block,
        data: {
          ...block.data,
          text: typeof text === "string" && text.trim() ? text : typeof html === "string" ? html : "",
        },
      } as CmsBlock;
    }

    if (block.type === "quote") {
      const quote = (block.data as { quote?: unknown; text?: unknown }).quote;
      const text = (block.data as { quote?: unknown; text?: unknown }).text;
      const attribution = (block.data as { attribution?: unknown; cite?: unknown }).attribution;
      const cite = (block.data as { attribution?: unknown; cite?: unknown }).cite;
      return {
        ...block,
        data: {
          ...block.data,
          quote: typeof quote === "string" && quote.trim() ? quote : typeof text === "string" ? text : "",
          attribution:
            typeof attribution === "string" && attribution.trim() ? attribution : typeof cite === "string" ? cite : "",
        },
      } as CmsBlock;
    }

    if (block.type === "divider") {
      return {
        ...block,
        data: { style: "line" },
      } as CmsBlock;
    }

    return block;
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeNullableUrl(value: string): string | null {
  const trimmed = value.trim();
  return trimmed || null;
}

function hasVisibleHtmlText(value: string): boolean {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim().length > 0;
}

function containsHtmlTag(value: string): boolean {
  return /<\/?[a-z][\w-]*\b[^>]*>/i.test(value);
}

function isMeaningfulBlock(block: CmsBlock): boolean {
  switch (block.type) {
    case "heading":
      return Boolean((block.data.text || "").trim());
    case "paragraph": {
      const paragraphData = block.data as { text?: string; html?: string };
      const candidate = (paragraphData.text || paragraphData.html || "").trim();
      return containsHtmlTag(candidate) ? hasVisibleHtmlText(candidate) : Boolean(candidate);
    }
    case "quote": {
      const quoteData = block.data as { quote?: string; text?: string };
      return Boolean((quoteData.quote || quoteData.text || "").trim());
    }
    case "image":
    case "video":
      return Boolean((block.data.url || "").trim());
    case "linkCard":
      return Boolean((block.data.url || "").trim());
    case "divider":
      return true;
    default:
      return false;
  }
}

function serializeBlocksForApi(blocks: CmsBlock[]) {
  return blocks
    .filter(isMeaningfulBlock)
    .map((block, index) => {
      if (block.type === "paragraph") {
        const paragraphData = block.data as { text?: string; html?: string };
        const source = (paragraphData.text || paragraphData.html || "").trim();
        const html = containsHtmlTag(source) ? source : `<p>${escapeHtml(source)}</p>`;

        return {
          id: block.id,
          type: block.type,
          order: index + 1,
          data: { html },
        };
      }

      if (block.type === "quote") {
        const quoteData = block.data as { quote?: string; text?: string; attribution?: string; cite?: string };
        return {
          id: block.id,
          type: block.type,
          order: index + 1,
          data: {
            text: (quoteData.quote || quoteData.text || "").trim(),
            cite: (quoteData.attribution || quoteData.cite || "").trim(),
          },
        };
      }

      if (block.type === "divider") {
        return {
          id: block.id,
          type: block.type,
          order: index + 1,
          data: {},
        };
      }

      return {
        id: block.id,
        type: block.type,
        order: index + 1,
        data: block.data,
      };
    });
}

export const AdminPostEditorPage = ({ token, onUnauthorized }: AdminPostEditorPageProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState<OptionItem[]>([]);
  const [authors, setAuthors] = useState<OptionItem[]>([]);
  const [tags, setTags] = useState<OptionItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [legacyContentNotice, setLegacyContentNotice] = useState<string | null>(null);
  const [form, setForm] = useState<PostFormState>(emptyForm);

  const previewHtml = useMemo(() => renderBlocksToPreviewHtml(form.content_blocks_json), [form.content_blocks_json]);

  const categoryName = useMemo(() => {
    if (!form.category_id) return "";
    const selected = categories.find((item) => String(item.id) === form.category_id);
    return selected?.name || "";
  }, [categories, form.category_id]);

  const authorName = useMemo(() => {
    if (!form.author_id) return "";
    const selected = authors.find((item) => String(item.id) === form.author_id);
    return selected?.name || "";
  }, [authors, form.author_id]);

  const selectedTagNames = useMemo(() => {
    if (form.tag_ids.length === 0) return [];
    return tags
      .filter((item) => form.tag_ids.includes(String(item.id)))
      .map((item) => item.name || String(item.id));
  }, [form.tag_ids, tags]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!token) {
        onUnauthorized();
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);
      setLegacyContentNotice(null);
      setForm(emptyForm);

      try {
        const [categoriesResponse, authorsResponse, tagsResponse] = await Promise.all([
          getAdminCategories(token),
          getAdminAuthors(token),
          getAdminTags(token),
        ]);

        if (!isMounted) return;

        setCategories(extractList<OptionItem>(categoriesResponse, ["categories"]));
        setAuthors(extractList<OptionItem>(authorsResponse, ["authors"]));
        setTags(extractList<OptionItem>(tagsResponse, ["tags"]));

        if (!id) {
          return;
        }

        const response = await getAdminPost(token, id);
        if (!isMounted) return;

        const post = extractItem<PostRecord>(response, ["post"]);
        if (!post) {
          setErrorMessage("Unable to load post details.");
          return;
        }

        const parsedBlocks = parseContentBlocks(post.content_blocks_json);
        const fallbackBlocks =
          parsedBlocks.length === 0 && (post.content_html || "").trim()
            ? fallbackBlocksFromLegacyHtml(post.content_html)
            : parsedBlocks;

        setForm({
          title: post.title || "",
          slug: post.slug || "",
          content_type: post.content_type || "insight",
          excerpt: post.excerpt || "",
          content_blocks_json: fallbackBlocks.length > 0 ? fallbackBlocks : [createBlock("paragraph", { order: 0 })],
          document_url: post.document_url || "",
          external_url: post.external_url || "",
          featured_image_url: post.featured_image_url || "",
          featured_image_alt: post.featured_image_alt || "",
          status: post.status || "draft",
          category_id: post.category_id ? String(post.category_id) : "",
          author_id: post.author_id ? String(post.author_id) : "",
          seo_title: post.seo_title || "",
          seo_description: post.seo_description || "",
          og_image_url: post.og_image_url || "",
          is_featured: Boolean(post.is_featured),
          allow_comments: Boolean(post.allow_comments),
          published_at: toLocalDateTime(post.published_at),
          tag_ids: Array.isArray(post.tag_ids) ? post.tag_ids.map((tagId) => String(tagId)) : [],
        });

        if (parsedBlocks.length === 0 && (post.content_html || "").trim()) {
          setLegacyContentNotice("This post used legacy HTML content. A fallback paragraph block was generated for editing.");
        }
      } catch (error) {
        if (!isMounted) return;

        if (isUnauthorizedError(error)) {
          onUnauthorized();
          return;
        }

        setErrorMessage(id ? "Unable to load post details." : "Unable to load editor options.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [id, token, onUnauthorized]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setErrorMessage("Title and slug are required.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    const normalizedSlug = slugify(form.slug);
    const normalizedContentType = form.content_type.trim().toLowerCase();
    const normalizedStatus = form.status.trim().toLowerCase();

    if (!normalizedSlug) {
      setErrorMessage("Slug is required.");
      setIsSaving(false);
      return;
    }

    if (!ALLOWED_CONTENT_TYPES.includes(normalizedContentType as (typeof ALLOWED_CONTENT_TYPES)[number])) {
      setErrorMessage("Content type must be one of: insight, publication, update.");
      setIsSaving(false);
      return;
    }

    if (!ALLOWED_STATUSES.includes(normalizedStatus as (typeof ALLOWED_STATUSES)[number])) {
      setErrorMessage("Status must be one of: draft, published, archived, scheduled.");
      setIsSaving(false);
      return;
    }

    const serializedBlocks = serializeBlocksForApi(form.content_blocks_json);
    if (serializedBlocks.length === 0) {
      setErrorMessage("At least one content block is required.");
      setIsSaving(false);
      return;
    }

    const contentHtml = renderBlocksToPreviewHtml(form.content_blocks_json);

    const normalizeId = (value: string): string | number | null => {
      if (!value) return null;
      const numeric = Number(value);
      return Number.isNaN(numeric) ? value : numeric;
    };

    const normalizedTagIds = form.tag_ids.map((tagId) => {
      const numeric = Number(tagId);
      return Number.isNaN(numeric) ? tagId : numeric;
    });

    if (normalizedTagIds.some((tagId) => typeof tagId !== "number" || tagId <= 0 || !Number.isInteger(tagId))) {
      setErrorMessage("Tags must be valid positive integers.");
      setIsSaving(false);
      return;
    }

    const payload = {
      title: form.title.trim(),
      slug: normalizedSlug,
      content_type: normalizedContentType,
      excerpt: form.excerpt.trim(),
      content_html: contentHtml,
      content_blocks_json: serializedBlocks,
      document_url: normalizeNullableUrl(form.document_url),
      external_url: normalizeNullableUrl(form.external_url),
      featured_image_url: normalizeNullableUrl(form.featured_image_url),
      featured_image_alt: form.featured_image_alt.trim(),
      status: normalizedStatus,
      category_id: normalizeId(form.category_id),
      author_id: normalizeId(form.author_id),
      seo_title: form.seo_title.trim(),
      seo_description: form.seo_description.trim(),
      og_image_url: normalizeNullableUrl(form.og_image_url),
      is_featured: form.is_featured,
      allow_comments: form.allow_comments,
      published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
      tag_ids: normalizedTagIds,
    };

    try {
      if (id) {
        await updateAdminPost(token, id, payload);
      } else {
        await createAdminPost(token, payload);
      }
      navigate("/admin/posts");
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }
      if (error instanceof ApiError) {
        setErrorMessage(error.message || "Unable to save post.");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Unable to save post.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="admin-loading">Loading post editor...</div>;
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <Link to="/admin/posts" className="admin-button-secondary">
          Back to posts
        </Link>
      </div>

      {errorMessage ? <div className="admin-error">{errorMessage}</div> : null}

      <form onSubmit={handleSubmit} className="admin-panel space-y-6 p-4 md:p-6">
        <div>
          <h3 className="mb-3 font-serif text-xl font-semibold text-bloomDarkCoffee">
            {isEditMode ? "Edit Post" : "Create Post"}
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="admin-label">Title</label>
              <input
                aria-label="Post title"
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value, slug: prev.slug ? prev.slug : slugify(event.target.value) }))}
                className="admin-input mt-1"
              />
            </div>
            <div>
              <label className="admin-label">Slug</label>
              <input
                aria-label="Post slug"
                value={form.slug}
                onChange={(event) => setForm((prev) => ({ ...prev, slug: slugify(event.target.value) }))}
                className="admin-input mt-1"
              />
            </div>
            <div>
              <label className="admin-label">Content type</label>
              <select
                aria-label="Post content type"
                value={form.content_type}
                onChange={(event) => setForm((prev) => ({ ...prev, content_type: event.target.value }))}
                className="admin-select mt-1"
              >
                <option value="insight">Insight</option>
                <option value="publication">Publication</option>
                <option value="update">Update</option>
              </select>
            </div>
            <div>
              <label className="admin-label">Excerpt</label>
              <input
                aria-label="Post excerpt"
                value={form.excerpt}
                onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))}
                className="admin-input mt-1"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="admin-label">Post body blocks</label>
              <div className="mt-1">
                <PostBlockEditor
                  token={token}
                  postId={id}
                  onUnauthorized={onUnauthorized}
                  blocks={form.content_blocks_json}
                  onChange={(updatedBlocks) => setForm((prev) => ({ ...prev, content_blocks_json: updatedBlocks }))}
                />
              </div>
              {legacyContentNotice ? <p className="mt-2 text-xs text-bloomDarkCoffee/70">{legacyContentNotice}</p> : null}
            </div>
            <div>
              <PostContentPreview
                title={form.title}
                excerpt={form.excerpt}
                contentHtml={previewHtml}
                featuredImageUrl={form.featured_image_url}
                featuredImageAlt={form.featured_image_alt}
                contentType={form.content_type}
                authorName={authorName}
                publishedAt={form.published_at}
                categoryName={categoryName}
                tags={selectedTagNames}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-serif text-xl font-semibold text-bloomDarkCoffee">Publishing</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="admin-label">Status</label>
              <select
                aria-label="Post status"
                value={form.status}
                onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
                className="admin-select mt-1"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            <div>
              <label className="admin-label">Category</label>
              <select
                aria-label="Post category"
                value={form.category_id}
                onChange={(event) => setForm((prev) => ({ ...prev, category_id: event.target.value }))}
                className="admin-select mt-1"
              >
                <option value="">None</option>
                {categories.map((option) => (
                  <option key={String(option.id)} value={String(option.id)}>
                    {option.name || `Category ${option.id}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="admin-label">Author</label>
              <select
                aria-label="Post author"
                value={form.author_id}
                onChange={(event) => setForm((prev) => ({ ...prev, author_id: event.target.value }))}
                className="admin-select mt-1"
              >
                <option value="">None</option>
                {authors.map((option) => (
                  <option key={String(option.id)} value={String(option.id)}>
                    {option.name || `Author ${option.id}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="admin-label">Published at</label>
              <input
                aria-label="Post published at"
                type="datetime-local"
                value={form.published_at}
                onChange={(event) => setForm((prev) => ({ ...prev, published_at: event.target.value }))}
                className="admin-input mt-1"
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-bloomDarkCoffee/62">Tags</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {tags.map((tag) => {
                const tagId = String(tag.id);
                const checked = form.tag_ids.includes(tagId);
                return (
                  <label key={tagId} className="inline-flex items-center gap-2 rounded-[8px] border border-black/15 bg-white px-2 py-1.5 text-sm text-bloomDarkCoffee/85">
                    <input
                      aria-label={tag.name || `Tag ${tagId}`}
                      type="checkbox"
                      checked={checked}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          tag_ids: event.target.checked
                            ? [...prev.tag_ids, tagId]
                            : prev.tag_ids.filter((value) => value !== tagId),
                        }))
                      }
                    />
                    {tag.name || `Tag ${tagId}`}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-bloomDarkCoffee/85">
              <input
                aria-label="Post featured"
                type="checkbox"
                checked={form.is_featured}
                onChange={(event) => setForm((prev) => ({ ...prev, is_featured: event.target.checked }))}
              />
              Featured
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-bloomDarkCoffee/85">
              <input
                aria-label="Post allow comments"
                type="checkbox"
                checked={form.allow_comments}
                onChange={(event) => setForm((prev) => ({ ...prev, allow_comments: event.target.checked }))}
              />
              Allow comments
            </label>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-serif text-xl font-semibold text-bloomDarkCoffee">Media</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <input aria-label="Post featured image" placeholder="Featured image URL" value={form.featured_image_url} onChange={(event) => setForm((prev) => ({ ...prev, featured_image_url: event.target.value }))} className="admin-input" />
            <input aria-label="Post featured image alt" placeholder="Featured image alt" value={form.featured_image_alt} onChange={(event) => setForm((prev) => ({ ...prev, featured_image_alt: event.target.value }))} className="admin-input" />
            <input aria-label="Post document url" placeholder="Document URL" value={form.document_url} onChange={(event) => setForm((prev) => ({ ...prev, document_url: event.target.value }))} className="admin-input" />
            <input aria-label="Post external url" placeholder="External URL" value={form.external_url} onChange={(event) => setForm((prev) => ({ ...prev, external_url: event.target.value }))} className="admin-input" />
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-serif text-xl font-semibold text-bloomDarkCoffee">SEO</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <input aria-label="Post seo title" placeholder="SEO title" value={form.seo_title} onChange={(event) => setForm((prev) => ({ ...prev, seo_title: event.target.value }))} className="admin-input" />
            <input aria-label="Post og image" placeholder="OG image URL" value={form.og_image_url} onChange={(event) => setForm((prev) => ({ ...prev, og_image_url: event.target.value }))} className="admin-input" />
            <textarea aria-label="Post seo description" placeholder="SEO description" rows={3} value={form.seo_description} onChange={(event) => setForm((prev) => ({ ...prev, seo_description: event.target.value }))} className="admin-textarea md:col-span-2" />
          </div>
        </div>

        <div className="flex gap-2">
          <button type="submit" disabled={isSaving} className="admin-button-primary disabled:opacity-60">
            {isSaving ? "Saving..." : isEditMode ? "Update post" : "Create post"}
          </button>
          <button type="button" onClick={() => navigate("/admin/posts")} className="admin-button-secondary">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};
