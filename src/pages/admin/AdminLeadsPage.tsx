import { useEffect, useMemo, useState } from "react";
import { ApiError } from "@/lib/api/client";
import { getAdminLeads } from "@/lib/api/admin";

type LeadRecord = {
  email?: string;
  first_verified_at?: string;
  last_verified_at?: string;
  verify_count?: number;
};

type AdminLeadsPageProps = {
  token: string;
  onUnauthorized: () => void;
};

function extractLeads(payload: unknown): LeadRecord[] {
  if (Array.isArray(payload)) {
    return payload as LeadRecord[];
  }

  if (payload && typeof payload === "object") {
    const maybePayload = payload as {
      leads?: unknown;
      items?: unknown;
      data?: unknown;
    };

    if (Array.isArray(maybePayload.leads)) return maybePayload.leads as LeadRecord[];
    if (Array.isArray(maybePayload.items)) return maybePayload.items as LeadRecord[];
    if (Array.isArray(maybePayload.data)) return maybePayload.data as LeadRecord[];
  }

  return [];
}

function formatDate(value?: string): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
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

export const AdminLeadsPage = ({ token, onUnauthorized }: AdminLeadsPageProps) => {
  const [records, setRecords] = useState<LeadRecord[]>([]);
  const [search, setSearch] = useState("");
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
      const response = await getAdminLeads(token);
      setRecords(extractLeads(response));
    } catch (error) {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        onUnauthorized();
        return;
      }

      setErrorMessage("Unable to load leads right now.");
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
    if (!query) return records;

    return records.filter((row) => (row.email || "").toLowerCase().includes(query));
  }, [records, search]);

  const visibleEmails = useMemo(
    () => visibleRows.map((row) => row.email).filter((email): email is string => Boolean(email)),
    [visibleRows]
  );

  const handleCopy = async () => {
    if (!navigator.clipboard || visibleEmails.length === 0) {
      return;
    }

    await navigator.clipboard.writeText(visibleEmails.join("\n"));
  };

  const exportTxt = () => {
    if (visibleEmails.length === 0) return;
    triggerDownload("leads-visible.txt", visibleEmails.join("\n"), "text/plain;charset=utf-8");
  };

  const exportCsv = () => {
    if (visibleRows.length === 0) return;

    const lines = [
      "email,first_verified_at,last_verified_at,verify_count",
      ...visibleRows.map((row) =>
        [row.email || "", row.first_verified_at || "", row.last_verified_at || "", row.verify_count ?? ""]
          .map((value) => `\"${String(value).replace(/"/g, "\"\"")}\"`)
          .join(",")
      ),
    ];

    triggerDownload("leads-visible.csv", lines.join("\n"), "text/csv;charset=utf-8");
  };

  return (
    <section className="admin-panel p-4 md:p-6">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <input
          aria-label="Search leads"
          type="search"
          placeholder="Search by email"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="admin-input w-full lg:max-w-sm px-4 py-2.5"
        />

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={loadRecords} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]">Refresh</button>
          <button type="button" onClick={handleCopy} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]" disabled={visibleEmails.length === 0}>Copy visible emails</button>
          <button type="button" onClick={exportTxt} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]" disabled={visibleEmails.length === 0}>Export .txt</button>
          <button type="button" onClick={exportCsv} className="admin-button-secondary px-3 py-2 text-xs uppercase tracking-[0.08em]" disabled={visibleRows.length === 0}>Export .csv</button>
        </div>
      </div>

      {isLoading && <div className="admin-loading">Loading leads...</div>}
      {!isLoading && errorMessage && <div className="admin-error">{errorMessage}</div>}
      {!isLoading && !errorMessage && visibleRows.length === 0 && <div className="admin-empty">No leads found for the current filter.</div>}

      {!isLoading && !errorMessage && visibleRows.length > 0 && (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 text-left text-bloomDarkCoffee/60">
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">First verified</th>
                  <th className="py-2 pr-3">Last verified</th>
                  <th className="py-2">Verify count</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, index) => (
                  <tr key={`${row.email}-${index}`} className="border-b border-black/5">
                    <td className="py-3 pr-3 text-bloomDarkCoffee/90">{row.email || "-"}</td>
                    <td className="py-3 pr-3 text-bloomDarkCoffee/75">{formatDate(row.first_verified_at)}</td>
                    <td className="py-3 pr-3 text-bloomDarkCoffee/75">{formatDate(row.last_verified_at)}</td>
                    <td className="py-3 text-bloomDarkCoffee/75">{row.verify_count ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {visibleRows.map((row, index) => (
              <article key={`${row.email}-${index}`} className="admin-panel-soft p-3 text-sm">
                <p className="mb-1 break-all font-semibold text-bloomDarkCoffee">{row.email || "-"}</p>
                <p className="text-bloomDarkCoffee/70">First verified: {formatDate(row.first_verified_at)}</p>
                <p className="text-bloomDarkCoffee/70">Last verified: {formatDate(row.last_verified_at)}</p>
                <p className="text-bloomDarkCoffee/70">Verify count: {row.verify_count ?? 0}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
