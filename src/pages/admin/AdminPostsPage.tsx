import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAdminPost, getAdminPost, getAdminPosts, updateAdminPost } from "@/lib/api/admin";
import { extractList, isUnauthorizedError } from "@/pages/admin/adminPageUtils";

type AdminPostsPageProps = {
  token: string;
  onUnauthorized: () => void;
};

type PostRecord = {
  id: string | number;
  title?: string;
  slug?: string;
  content_type?: string;
  status?: string;
};

type PostDetailRecord = PostRecord & {
  excerpt?: string;
  content_html?: string;
  content_blocks_json?: unknown;
  document_url?: string | null;
  external_url?: string | null;
  featured_image_url?: string | null;
  featured_image_alt?: string;
  category_id?: string | number | null;
  author_id?: string | number | null;
  seo_title?: string;
  seo_description?: string;
  og_image_url?: string | null;
  is_featured?: boolean;
  allow_comments?: boolean;
  published_at?: string | null;
  tag_ids?: Array<string | number>;
  tags?: Array<{ id?: string | number }>;
};

const ALLOWED_CONTENT_TYPES = ["insight", "publication", "update"] as const;

function normalizeNullableUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function normalizeId(value: unknown): string | number | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const asNumber = Number(trimmed);
    return Number.isNaN(asNumber) ? trimmed : asNumber;
  }
  return null;
}

function buildStatusUpdatePayload(post: PostDetailRecord, nextStatus: string) {
  const normalizedType = (post.content_type || "").trim().toLowerCase();
  const safeContentType = ALLOWED_CONTENT_TYPES.includes(normalizedType as (typeof ALLOWED_CONTENT_TYPES)[number])
    ? normalizedType
    : "insight";

  const tagIdsRaw =
    Array.isArray(post.tag_ids) && post.tag_ids.length > 0
      ? post.tag_ids
      : Array.isArray(post.tags)
        ? post.tags.map((tag) => tag.id).filter((id): id is string | number => id !== undefined && id !== null)
        : [];

  const tag_ids = tagIdsRaw
    .map((value) => {
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        const asNumber = Number(value);
        return Number.isNaN(asNumber) ? null : asNumber;
      }
      return null;
    })
    .filter((value): value is number => typeof value === "number" && Number.isInteger(value) && value > 0);

  const content_blocks_json = Array.isArray(post.content_blocks_json)
    ? post.content_blocks_json
    : [
        {
          id: "status-fallback-block",
          type: "paragraph",
          order: 1,
          data: { html: `<p>${post.excerpt?.trim() || post.title?.trim() || "Post content"}</p>` },
        },
      ];

  return {
    title: post.title?.trim() || "Untitled",
    slug: post.slug?.trim() || `post-${post.id}`,
    content_type: safeContentType,
    excerpt: post.excerpt?.trim() || "",
    content_html: post.content_html || "",
    content_blocks_json,
    document_url: normalizeNullableUrl(post.document_url),
    external_url: normalizeNullableUrl(post.external_url),
    featured_image_url: normalizeNullableUrl(post.featured_image_url),
    featured_image_alt: post.featured_image_alt?.trim() || "",
    status: nextStatus,
    category_id: normalizeId(post.category_id),
    author_id: normalizeId(post.author_id),
    seo_title: post.seo_title?.trim() || "",
    seo_description: post.seo_description?.trim() || "",
    og_image_url: normalizeNullableUrl(post.og_image_url),
    is_featured: Boolean(post.is_featured),
    allow_comments: Boolean(post.allow_comments),
    published_at: post.published_at || null,
    tag_ids,
  };
}

export const AdminPostsPage = ({ token, onUnauthorized }: AdminPostsPageProps) => {
  const [items, setItems] = useState<PostRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusUpdatingById, setStatusUpdatingById] = useState<Record<string, boolean>>({});
  const [statusErrorById, setStatusErrorById] = useState<Record<string, string | null>>({});

  const loadItems = async () => {
    if (!token) {
      onUnauthorized();
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await getAdminPosts(token, {
        status: statusFilter === "all" ? undefined : statusFilter,
        content_type: typeFilter === "all" ? undefined : typeFilter,
        search: search.trim() || undefined,
      });

      setItems(extractList<PostRecord>(response, ["posts"]));
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }

      setErrorMessage("Unable to load posts.");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, statusFilter, typeFilter, search]);

  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) => (item.title || "").toLowerCase().includes(query) || (item.slug || "").toLowerCase().includes(query));
  }, [items, search]);

  const handleDelete = async (id: string | number) => {
    try {
      await deleteAdminPost(token, id);
      await loadItems();
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }

      setErrorMessage("Unable to delete post.");
    }
  };

  const handleStatusChange = async (id: string | number, nextStatus: string) => {
    const key = String(id);
    setStatusErrorById((prev) => ({ ...prev, [key]: null }));
    setStatusUpdatingById((prev) => ({ ...prev, [key]: true }));

    const previousItems = items;
    setItems((prev) =>
      prev.map((item) => (String(item.id) === key ? { ...item, status: nextStatus } : item))
    );

    try {
      const detailResponse = await getAdminPost(token, id);
      const postDetail = (detailResponse &&
      typeof detailResponse === "object" &&
      "post" in (detailResponse as Record<string, unknown>)
        ? (detailResponse as { post?: PostDetailRecord }).post
        : (detailResponse as PostDetailRecord | null)) as PostDetailRecord | null;

      if (!postDetail) {
        throw new Error("Unable to load post details.");
      }

      const payload = buildStatusUpdatePayload(postDetail, nextStatus);
      await updateAdminPost(token, id, payload);
      await loadItems();
    } catch (error) {
      setItems(previousItems);
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }
      setStatusErrorById((prev) => ({ ...prev, [key]: "Unable to update status." }));
    } finally {
      setStatusUpdatingById((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <section className="space-y-5">
      <div className="admin-panel p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              aria-label="Search posts"
              type="search"
              placeholder="Search title or slug"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="admin-input w-full sm:w-72"
            />
            <select
              aria-label="Filter posts by status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="admin-select"
            >
              <option value="all">All statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <select
              aria-label="Filter posts by content type"
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="admin-select"
            >
              <option value="all">All content types</option>
              <option value="insight">Insight</option>
              <option value="publication">Publication</option>
              <option value="update">Update</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={loadItems} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]">Refresh</button>
            <Link to="/admin/posts/new" className="admin-button-primary px-3 py-2 text-xs uppercase tracking-[0.08em]">
              New post
            </Link>
          </div>
        </div>

        {isLoading ? <div className="admin-loading">Loading posts...</div> : null}
        {!isLoading && !errorMessage && visibleRows.length === 0 ? <div className="admin-empty">No posts match the current filters.</div> : null}
        {errorMessage ? <div className="admin-error mb-3">{errorMessage}</div> : null}

        {!isLoading && visibleRows.length > 0 ? (
          <div className="space-y-3">
            {visibleRows.map((item) => (
              <article key={String(item.id)} className="admin-panel-soft p-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-bloomDarkCoffee">{item.title || "Untitled"}</p>
                    <p className="text-xs text-bloomDarkCoffee/60">/{item.slug}</p>
                    <p className="mt-1 text-xs text-bloomDarkCoffee/60">{item.status || "draft"} | {item.content_type || "article"}</p>
                    {statusErrorById[String(item.id)] ? (
                      <p className="mt-1 text-xs text-red-700">{statusErrorById[String(item.id)]}</p>
                    ) : null}
                  </div>
                  <div className="flex gap-2">
                    <select
                      id={`status-${item.id}`}
                      aria-label={`Set status for ${item.title || "post"}`}
                      value={item.status || "draft"}
                      disabled={Boolean(statusUpdatingById[String(item.id)])}
                      onChange={(event) => handleStatusChange(item.id, event.target.value)}
                      className="admin-button-secondary w-[96px] px-2.5 py-1.5 text-xs"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                    <Link to={`/admin/posts/${item.id}/edit`} className="admin-button-secondary px-2.5 py-1.5 text-xs">
                      Edit
                    </Link>
                    <button type="button" onClick={() => handleDelete(item.id)} className="admin-button-danger px-2.5 py-1.5 text-xs">
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};
