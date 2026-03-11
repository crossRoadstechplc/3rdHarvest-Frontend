import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAdminPost, getAdminPosts } from "@/lib/api/admin";
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

export const AdminPostsPage = ({ token, onUnauthorized }: AdminPostsPageProps) => {
  const [items, setItems] = useState<PostRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
              <option value="article">Article</option>
              <option value="field-report">Field Report</option>
              <option value="concept-note">Concept Note</option>
              <option value="program-update">Program Update</option>
              <option value="research-insight">Research Insight</option>
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
                  </div>
                  <div className="flex gap-2">
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

