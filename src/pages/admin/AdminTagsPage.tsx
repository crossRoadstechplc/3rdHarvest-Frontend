import { FormEvent, useEffect, useState } from "react";
import {
  createAdminTag,
  deleteAdminTag,
  getAdminTags,
  updateAdminTag,
} from "@/lib/api/admin";
import { extractList, isUnauthorizedError, slugify } from "@/pages/admin/adminPageUtils";

type TagRecord = {
  id: string | number;
  name?: string;
  slug?: string;
};

type AdminTagsPageProps = {
  token: string;
  onUnauthorized: () => void;
};

const emptyForm = { name: "", slug: "" };

export const AdminTagsPage = ({ token, onUnauthorized }: AdminTagsPageProps) => {
  const [items, setItems] = useState<TagRecord[]>([]);
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
      const response = await getAdminTags(token);
      setItems(extractList<TagRecord>(response, ["tags"]));
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }
      setErrorMessage("Unable to load tags.");
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
      };

      if (editingId !== null) {
        await updateAdminTag(token, editingId, payload);
      } else {
        await createAdminTag(token, payload);
      }

      resetForm();
      await loadItems();
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }
      setErrorMessage("Unable to save tag.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteAdminTag(token, id);
      await loadItems();
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized();
        return;
      }
      setErrorMessage("Unable to delete tag.");
    }
  };

  return (
    <section className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
      <div className="admin-panel p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-bloomDarkCoffee">Tags</h3>
          <button type="button" onClick={loadItems} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]">
            Refresh
          </button>
        </div>

        {isLoading && <div className="admin-loading">Loading tags...</div>}
        {!isLoading && !errorMessage && items.length === 0 && <div className="admin-empty">No tags yet.</div>}

        {errorMessage && <div className="admin-error mb-3">{errorMessage}</div>}

        {!isLoading && items.length > 0 && (
          <div className="space-y-3">
            {items.map((item) => (
              <article key={String(item.id)} className="admin-panel-soft flex items-center justify-between gap-3 p-3">
                <div>
                  <p className="font-semibold text-bloomDarkCoffee">{item.name}</p>
                  <p className="text-xs text-bloomDarkCoffee/60">{item.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(item.id);
                      setForm({
                        name: item.name || "",
                        slug: item.slug || "",
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
        <h3 className="mb-4 font-serif text-xl font-semibold text-bloomDarkCoffee">{editingId !== null ? "Edit tag" : "New tag"}</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="admin-label">Name</label>
            <input
              aria-label="Tag name"
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
              aria-label="Tag slug"
              value={form.slug}
              onChange={(event) => setForm((prev) => ({ ...prev, slug: slugify(event.target.value) }))}
              className="admin-input mt-1"
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
