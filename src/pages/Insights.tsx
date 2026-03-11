import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { SectionContainer } from "@/components/public/SectionContainer";
import { motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "@/lib/api/publicCms";

const PAGE_SIZE = 9;

const INSIGHT_FILTERS = [
  { label: "All", tag: "" },
  { label: "Field Reports", tag: "field-report" },
  { label: "Concept Notes", tag: "concept-note" },
  { label: "Program Updates", tag: "program-update" },
  { label: "Research Insights", tag: "research-insight" },
];

type InsightPost = {
  id?: string | number;
  title?: string;
  slug?: string;
  content_type?: string;
  excerpt?: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  published_at?: string;
  category?: unknown;
  author?: unknown;
  tags?: unknown[];
};

function extractPosts(payload: unknown): InsightPost[] {
  if (Array.isArray(payload)) {
    return payload as InsightPost[];
  }

  if (payload && typeof payload === "object") {
    const maybePayload = payload as {
      posts?: unknown;
      items?: unknown;
      data?: unknown;
    };

    if (Array.isArray(maybePayload.posts)) return maybePayload.posts as InsightPost[];
    if (Array.isArray(maybePayload.items)) return maybePayload.items as InsightPost[];
    if (Array.isArray(maybePayload.data)) return maybePayload.data as InsightPost[];
  }

  return [];
}

function deriveHasMore(payload: unknown, page: number, currentCount: number): boolean {
  if (payload && typeof payload === "object") {
    const maybePayload = payload as {
      totalPages?: number;
      total_pages?: number;
      pagination?: { totalPages?: number; total_pages?: number };
    };

    const totalPages =
      maybePayload.totalPages ??
      maybePayload.total_pages ??
      maybePayload.pagination?.totalPages ??
      maybePayload.pagination?.total_pages;

    if (typeof totalPages === "number") {
      return page < totalPages;
    }
  }

  return currentCount >= PAGE_SIZE;
}

function formatPublishedDate(value?: string): string {
  if (!value) {
    return "Unscheduled";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unscheduled";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function getDisplayText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object") {
    const maybeRecord = value as Record<string, unknown>;
    const candidates = [maybeRecord.name, maybeRecord.title, maybeRecord.slug, maybeRecord.label];
    for (const candidate of candidates) {
      if (typeof candidate === "string" && candidate.trim()) {
        return candidate;
      }
    }
  }
  return "";
}

const Insights = () => {
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [activeTag, setActiveTag] = useState("");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    document.title = "Insights | 3rd Harvest";
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const baseParams = {
          category: "insights",
          page,
          limit: PAGE_SIZE,
          tag: activeTag || undefined,
          search: search || undefined,
        };

        const response = await getPosts(baseParams);
        let extractedPosts = extractPosts(response);

        // Some published posts may not yet be categorized as "insights" in admin.
        // Fall back to a broader public query so the page still surfaces content.
        if (extractedPosts.length === 0) {
          const fallbackResponse = await getPosts({
            page,
            limit: PAGE_SIZE,
            tag: activeTag || undefined,
            search: search || undefined,
          });
          extractedPosts = extractPosts(fallbackResponse);
          if (!isMounted) return;
          setPosts(extractedPosts);
          setHasMore(deriveHasMore(fallbackResponse, page, extractedPosts.length));
          return;
        }

        if (!isMounted) return;

        setPosts(extractedPosts);
        setHasMore(deriveHasMore(response, page, extractedPosts.length));
      } catch {
        if (!isMounted) return;
        setPosts([]);
        setHasMore(false);
        setErrorMessage("Unable to load insights right now. Please try again.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, [activeTag, page, search]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearch(query.trim());
  };

  const activeFilterLabel = useMemo(
    () => INSIGHT_FILTERS.find((item) => item.tag === activeTag)?.label ?? "All",
    [activeTag]
  );

  return (
    <div className="min-h-screen bg-background">
      <BloomNav />

      <section className="bg-bloomLightGreen/25 py-24 md:py-28">
        <SectionContainer size="wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_12px_28px_rgba(30,30,30,0.06)] md:p-8"
            data-testid="insights-intro"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">INSIGHTS</p>
            <h1 className="mt-3 text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">Publications and Updates</h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
              
            </div>
          </motion.div>

          <div className="mt-7 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_10px_24px_rgba(30,30,30,0.05)] md:p-6">
            <div className="flex flex-wrap items-center gap-2.5" data-testid="insights-filters">
              {INSIGHT_FILTERS.map((filter) => {
                const isActive = activeTag === filter.tag;
                return (
                  <button
                    key={filter.label}
                    type="button"
                    onClick={() => {
                      setPage(1);
                      setActiveTag(filter.tag);
                    }}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/70 ${
                      isActive
                        ? "border-bloomGold bg-bloomGold text-white"
                        : "border-black/12 bg-white text-bloomDarkCoffee/75 hover:border-bloomGreen/40 hover:text-bloomGreen"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                placeholder="Search insights..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search insights"
                className="w-full rounded-[10px] border border-black/15 bg-white px-4 py-3 text-bloomDarkCoffee placeholder:text-bloomDarkCoffee/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/70"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-[10px] bg-bloomGreen px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-bloomGreen/90"
              >
                Search
              </button>
            </form>
          </div>

          <div className="mt-8">
            {isLoading ? (
              <div className="space-y-4" aria-live="polite">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-bloomGold">Loading insights...</p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="insights-grid">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-72 animate-pulse rounded-2xl border border-black/10 bg-white" />
                  ))}
                </div>
              </div>
            ) : null}

            {!isLoading && errorMessage ? (
              <div className="rounded-2xl border border-red-300/30 bg-red-50 p-6 text-red-800">{errorMessage}</div>
            ) : null}

            {!isLoading && !errorMessage && posts.length === 0 ? (
              <div className="rounded-2xl border border-black/10 bg-white p-6 text-bloomDarkCoffee/70">
                No insights match your current filters. Try another tag or search term.
              </div>
            ) : null}

            {!isLoading && !errorMessage && posts.length > 0 ? (
              <>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-bloomDarkCoffee/70">
                    Showing {posts.length} item{posts.length === 1 ? "" : "s"} in{" "}
                    <span className="font-semibold text-bloomGreen">{activeFilterLabel}</span>
                    {search ? (
                      <>
                        {" "}for <span className="font-semibold text-bloomGreen">"{search}"</span>
                      </>
                    ) : null}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="insights-grid">
                  {posts.map((post, index) => {
                    const cardSlug = post.slug ?? String(post.id ?? "");
                    const authorName = getDisplayText(post.author);
                    const categoryName = getDisplayText(post.category);
                    const formattedTags = Array.isArray(post.tags)
                      ? post.tags.map((tag) => getDisplayText(tag)).filter(Boolean)
                      : [];

                    return (
                      <motion.article
                        key={`${cardSlug}-${index}`}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.04 }}
                        className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_24px_rgba(30,30,30,0.06)]"
                      >
                        <Link to={`/insights/${cardSlug}`} className="block">
                          {post.featured_image_url ? (
                            <img
                              src={post.featured_image_url}
                              alt={post.featured_image_alt || post.title || "Insight image"}
                              className="block aspect-[4/3] w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex aspect-[4/3] w-full items-center justify-center bg-bloomBeige/60 text-xs font-semibold uppercase tracking-[0.16em] text-bloomDarkCoffee/40">
                              Insight
                            </div>
                          )}

                          <div className="space-y-3 p-5">
                            <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.1em] text-bloomDarkCoffee/60">
                              <span>{formatPublishedDate(post.published_at)}</span>
                              {post.content_type ? (
                                <span className="rounded-full border border-bloomGold/45 px-2 py-1 text-bloomGold">
                                  {post.content_type.replace(/_/g, " ")}
                                </span>
                              ) : null}
                            </div>

                            <h2 className="font-serif text-2xl leading-tight text-bloomDarkCoffee">{post.title || "Untitled insight"}</h2>
                            <p className="text-sm leading-relaxed text-bloomDarkCoffee/75">
                              {post.excerpt || "No excerpt available for this insight yet."}
                            </p>

                            {categoryName || authorName ? (
                              <p className="text-xs uppercase tracking-[0.08em] text-bloomDarkCoffee/55">
                                {[categoryName, authorName].filter(Boolean).join(" | ")}
                              </p>
                            ) : null}

                            {formattedTags.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {formattedTags.slice(0, 4).map((tag) => (
                                  <span key={tag} className="rounded-full border border-black/12 px-2 py-1 text-[11px] text-bloomDarkCoffee/65">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : null}

                            <span className="inline-flex text-sm font-semibold uppercase tracking-[0.08em] text-bloomGreen hover:text-bloomGold">
                              Read insight
                            </span>
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    disabled={page === 1 || isLoading}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="rounded-[10px] border border-black/12 px-5 py-2 text-bloomDarkCoffee/75 hover:border-bloomGold/55 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-bloomDarkCoffee/65">Page {page}</span>
                  <button
                    type="button"
                    disabled={!hasMore || isLoading}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="rounded-[10px] border border-black/12 px-5 py-2 text-bloomDarkCoffee/75 hover:border-bloomGold/55 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </SectionContainer>
      </section>

      <Footer />
    </div>
  );
};

export default Insights;
