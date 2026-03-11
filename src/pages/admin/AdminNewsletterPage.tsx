import { useEffect, useMemo, useState } from "react";
import { ApiError } from "@/lib/api/client";
import { getAdminNewsletterSubscriptions } from "@/lib/api/admin";

type SubscriptionStatus = "subscribed" | "unsubscribed";

type NewsletterRecord = {
  email?: string;
  status?: SubscriptionStatus;
  source?: string;
  subscribed_at?: string;
  unsubscribed_at?: string;
};

type AdminNewsletterPageProps = {
  token: string;
  onUnauthorized: () => void;
};

function extractSubscriptions(payload: unknown): NewsletterRecord[] {
  if (Array.isArray(payload)) return payload as NewsletterRecord[];

  if (payload && typeof payload === "object") {
    const maybePayload = payload as {
      subscriptions?: unknown;
      items?: unknown;
      data?: unknown;
    };

    if (Array.isArray(maybePayload.subscriptions)) return maybePayload.subscriptions as NewsletterRecord[];
    if (Array.isArray(maybePayload.items)) return maybePayload.items as NewsletterRecord[];
    if (Array.isArray(maybePayload.data)) return maybePayload.data as NewsletterRecord[];
  }

  return [];
}

function formatDate(value?: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function triggerDownload(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export const AdminNewsletterPage = ({ token, onUnauthorized }: AdminNewsletterPageProps) => {
  const [records, setRecords] = useState<NewsletterRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | SubscriptionStatus>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadRecords = async () => {
    if (!token) {
      onUnauthorized();
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await getAdminNewsletterSubscriptions(token);
      setRecords(extractSubscriptions(response));
    } catch (error) {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        onUnauthorized();
        return;
      }

      setErrorMessage("Unable to load newsletter subscriptions right now.");
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((row) => {
      const matchesSearch = (row.email || "").toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" ? true : row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const visibleEmails = useMemo(
    () => visibleRows.map((row) => row.email).filter((email): email is string => Boolean(email)),
    [visibleRows]
  );

  const handleCopy = async () => {
    if (!navigator.clipboard || visibleEmails.length === 0) return;
    await navigator.clipboard.writeText(visibleEmails.join("\n"));
  };

  const exportTxt = () => {
    if (visibleEmails.length === 0) return;
    triggerDownload("newsletter-visible.txt", visibleEmails.join("\n"), "text/plain;charset=utf-8");
  };

  const exportCsv = () => {
    if (visibleRows.length === 0) return;

    const lines = [
      "email,status,source,subscribed_at,unsubscribed_at",
      ...visibleRows.map((row) =>
        [row.email || "", row.status || "", row.source || "", row.subscribed_at || "", row.unsubscribed_at || ""]
          .map((value) => `\"${String(value).replace(/"/g, "\"\"")}\"`)
          .join(",")
      ),
    ];

    triggerDownload("newsletter-visible.csv", lines.join("\n"), "text/csv;charset=utf-8");
  };

  return (
    <section className="admin-panel p-4 md:p-6">
      <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">
          <input
            aria-label="Search newsletter"
            type="search"
            placeholder="Search by email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="admin-input w-full sm:w-72 px-4 py-2.5"
          />

          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as "all" | SubscriptionStatus)}
            className="admin-select"
          >
            <option value="all">All statuses</option>
            <option value="subscribed">Subscribed</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={loadRecords} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]">Refresh</button>
          <button type="button" onClick={handleCopy} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]" disabled={visibleEmails.length === 0}>Copy visible emails</button>
          <button type="button" onClick={exportTxt} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]" disabled={visibleEmails.length === 0}>Export .txt</button>
          <button type="button" onClick={exportCsv} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]" disabled={visibleRows.length === 0}>Export .csv</button>
        </div>
      </div>

      {isLoading && <div className="admin-loading">Loading newsletter subscriptions...</div>}
      {!isLoading && errorMessage && <div className="admin-error">{errorMessage}</div>}
      {!isLoading && !errorMessage && visibleRows.length === 0 && <div className="admin-empty">No subscriptions match the current filters.</div>}

      {!isLoading && !errorMessage && visibleRows.length > 0 && (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 text-left text-bloomDarkCoffee/60">
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Source</th>
                  <th className="py-2 pr-3">Subscribed</th>
                  <th className="py-2">Unsubscribed</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, index) => (
                  <tr key={`${row.email}-${index}`} className="border-b border-black/5">
                    <td className="py-3 pr-3 text-bloomDarkCoffee/90">{row.email || "-"}</td>
                    <td className="py-3 pr-3 text-bloomDarkCoffee/75">{row.status || "-"}</td>
                    <td className="py-3 pr-3 text-bloomDarkCoffee/75">{row.source || "-"}</td>
                    <td className="py-3 pr-3 text-bloomDarkCoffee/75">{formatDate(row.subscribed_at)}</td>
                    <td className="py-3 text-bloomDarkCoffee/75">{formatDate(row.unsubscribed_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {visibleRows.map((row, index) => (
              <article key={`${row.email}-${index}`} className="admin-panel-soft p-3 text-sm">
                <p className="mb-1 break-all font-semibold text-bloomDarkCoffee">{row.email || "-"}</p>
                <p className="text-bloomDarkCoffee/70">Status: {row.status || "-"}</p>
                <p className="text-bloomDarkCoffee/70">Source: {row.source || "-"}</p>
                <p className="text-bloomDarkCoffee/70">Subscribed: {formatDate(row.subscribed_at)}</p>
                <p className="text-bloomDarkCoffee/70">Unsubscribed: {formatDate(row.unsubscribed_at)}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
