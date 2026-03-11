import { FormEvent, useEffect, useState } from "react";
import {
  createAdminAuthor,
  deleteAdminAuthor,
  getAdminAuthors,
  updateAdminAuthor,
} from "@/lib/api/admin";
import { extractList, isUnauthorizedError, slugify } from "@/pages/admin/adminPageUtils";

type Author = {
  id: string | number;
  name?: string;
  slug?: string;
  bio?: string;
  title?: string;
  avatar_url?: string;
  email?: string;
  linkedin_url?: string;
  is_active?: boolean;
};

type AdminAuthorsPageProps = {
  token: string;
  onUnauthorized: () => void;
};

const emptyForm = {
  name: "",
  slug: "",
  bio: "",
  title: "",
  avatar_url: "",
  email: "",
  linkedin_url: "",
  is_active: true,
};

export const AdminAuthorsPage = ({ token, onUnauthorized }: AdminAuthorsPageProps) => {
  const [items, setItems] = useState<Author[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadItems = async () => {
    if (!token) {
      onUnauthorized();
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await getAdminAuthors(token);
      setItems(extractList<Author>(response, ["authors"]));
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }
      setErrorMessage("Unable to load authors.");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.slug.trim()) {
      setErrorMessage("Name and slug are required.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim(),
        bio: form.bio.trim(),
        title: form.title.trim(),
        avatar_url: form.avatar_url.trim(),
        email: form.email.trim(),
        linkedin_url: form.linkedin_url.trim(),
        is_active: form.is_active,
      };

      if (editingId !== null) {
        await updateAdminAuthor(token, editingId, payload);
      } else {
        await createAdminAuthor(token, payload);
      }

      resetForm();
      await loadItems();
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }
      setErrorMessage("Unable to save author.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteAdminAuthor(token, id);
      await loadItems();
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }
      setErrorMessage("Unable to delete author.");
    }
  };

  return (
    <section className="grid gap-5 xl:grid-cols-[1.15fr_1fr]">
      <div className="admin-panel p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-bloomDarkCoffee">Authors</h3>
          <button type="button" onClick={loadItems} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]">
            Refresh
          </button>
        </div>

        {isLoading && <div className="admin-loading">Loading authors...</div>}
        {!isLoading && !errorMessage && items.length === 0 && <div className="admin-empty">No authors yet.</div>}

        {errorMessage && <div className="admin-error mb-3">{errorMessage}</div>}

        {!isLoading && items.length > 0 && (
          <div className="space-y-3">
            {items.map((item) => (
              <article key={String(item.id)} className="admin-panel-soft p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-bloomDarkCoffee">{item.name}</p>
                    <p className="text-xs text-bloomDarkCoffee/60">{item.slug}</p>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-1 text-xs ${
                      item.is_active ? "border-emerald-400/40 text-emerald-700 bg-emerald-50" : "border-black/20 text-bloomDarkCoffee/60"
                    }`}
                  >
                    {item.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                {item.title ? <p className="mt-2 text-sm text-bloomDarkCoffee/80">{item.title}</p> : null}
                {item.email ? <p className="mt-1 text-xs text-bloomDarkCoffee/60">{item.email}</p> : null}

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(item.id);
                      setForm({
                        name: item.name || "",
                        slug: item.slug || "",
                        bio: item.bio || "",
                        title: item.title || "",
                        avatar_url: item.avatar_url || "",
                        email: item.email || "",
                        linkedin_url: item.linkedin_url || "",
                        is_active: Boolean(item.is_active),
                      });
                    }}
                    className="admin-button-secondary px-2.5 py-1.5 text-xs"
                  >
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(item.id)} className="admin-button-danger px-2.5 py-1.5 text-xs">
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="admin-panel p-4 md:p-6">
        <h3 className="mb-4 font-serif text-xl font-semibold text-bloomDarkCoffee">{editingId !== null ? "Edit author" : "New author"}</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="admin-label">Name</label>
            <input
              aria-label="Author name"
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  name: event.target.value,
                  slug: prev.slug ? prev.slug : slugify(event.target.value),
                }))
              }
              className="admin-input mt-1"
            />
          </div>
          <div>
            <label className="admin-label">Slug</label>
            <input
              aria-label="Author slug"
              value={form.slug}
              onChange={(event) => setForm((prev) => ({ ...prev, slug: slugify(event.target.value) }))}
              className="admin-input mt-1"
            />
          </div>
          <div>
            <label className="admin-label">Title</label>
            <input
              aria-label="Author title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className="admin-input mt-1"
            />
          </div>
          <div>
            <label className="admin-label">Email</label>
            <input
              aria-label="Author email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="admin-input mt-1"
            />
          </div>
          <div>
            <label className="admin-label">LinkedIn URL</label>
            <input
              aria-label="Author linkedin"
              value={form.linkedin_url}
              onChange={(event) => setForm((prev) => ({ ...prev, linkedin_url: event.target.value }))}
              className="admin-input mt-1"
            />
          </div>
          <div>
            <label className="admin-label">Avatar URL</label>
            <input
              aria-label="Author avatar"
              value={form.avatar_url}
              onChange={(event) => setForm((prev) => ({ ...prev, avatar_url: event.target.value }))}
              className="admin-input mt-1"
            />
          </div>
          <div>
            <label className="admin-label">Bio</label>
            <textarea
              aria-label="Author bio"
              rows={4}
              value={form.bio}
              onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
              className="admin-textarea mt-1"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-bloomDarkCoffee/85">
            <input
              aria-label="Author active"
              type="checkbox"
              checked={form.is_active}
              onChange={(event) => setForm((prev) => ({ ...prev, is_active: event.target.checked }))}
            />
            Active author
          </label>

          <div className="flex gap-2">
            <button type="submit" disabled={isSaving} className="admin-button-primary disabled:opacity-60">
              {isSaving ? "Saving..." : editingId !== null ? "Update" : "Create"}
            </button>
            {editingId !== null && (
              <button type="button" onClick={resetForm} className="admin-button-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
