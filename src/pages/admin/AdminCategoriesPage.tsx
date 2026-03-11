import { FormEvent, useEffect, useState } from "react";
import {
  createAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
  updateAdminCategory,
} from "@/lib/api/admin";
import { extractList, isUnauthorizedError, slugify } from "@/pages/admin/adminPageUtils";

type Category = {
  id: string | number;
  name?: string;
  slug?: string;
  description?: string;
};

type AdminCategoriesPageProps = {
  token: string;
  onUnauthorized: () => void;
};

const emptyForm = { name: "", slug: "", description: "" };

export const AdminCategoriesPage = ({ token, onUnauthorized }: AdminCategoriesPageProps) => {
  const [items, setItems] = useState<Category[]>([]);
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
      const response = await getAdminCategories(token);
      setItems(extractList<Category>(response, ["categories"]));
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }
      setErrorMessage("Unable to load categories.");
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
        description: form.description.trim(),
      };

      if (editingId !== null) {
        await updateAdminCategory(token, editingId, payload);
      } else {
        await createAdminCategory(token, payload);
      }

      resetForm();
      await loadItems();
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }
      setErrorMessage("Unable to save category.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteAdminCategory(token, id);
      await loadItems();
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }
      setErrorMessage("Unable to delete category.");
    }
  };

  return (
    <section className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
      <div className="admin-panel p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-bloomDarkCoffee">Categories</h3>
          <button type="button" onClick={loadItems} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]">
            Refresh
          </button>
        </div>

        {isLoading && <div className="admin-loading">Loading categories...</div>}
        {!isLoading && !errorMessage && items.length === 0 && <div className="admin-empty">No categories yet.</div>}

        {errorMessage && <div className="admin-error mb-3">{errorMessage}</div>}

        {!isLoading && items.length > 0 && (
          <div className="space-y-3">
            {items.map((item) => (
              <article key={String(item.id)} className="admin-panel-soft p-3">
                <p className="font-semibold text-bloomDarkCoffee">{item.name}</p>
                <p className="text-xs text-bloomDarkCoffee/60">{item.slug}</p>
                {item.description ? <p className="mt-2 text-sm text-bloomDarkCoffee/75">{item.description}</p> : null}
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(item.id);
                      setForm({
                        name: item.name || "",
                        slug: item.slug || "",
                        description: item.description || "",
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
        <h3 className="mb-4 font-serif text-xl font-semibold text-bloomDarkCoffee">{editingId !== null ? "Edit category" : "New category"}</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="admin-label">Name</label>
            <input
              aria-label="Category name"
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
              aria-label="Category slug"
              value={form.slug}
              onChange={(event) => setForm((prev) => ({ ...prev, slug: slugify(event.target.value) }))}
              className="admin-input mt-1"
            />
          </div>

          <div>
            <label className="admin-label">Description</label>
            <textarea
              aria-label="Category description"
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              rows={4}
              className="admin-textarea mt-1"
            />
          </div>

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
