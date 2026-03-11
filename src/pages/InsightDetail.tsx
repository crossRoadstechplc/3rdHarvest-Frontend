import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { getPostBySlug } from "@/lib/api/publicCms";
import { ApiError } from "@/lib/api/client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

type InsightPost = {
  id?: string | number;
  title?: string;
  seo_title?: string;
  seo_description?: string;
  slug?: string;
  excerpt?: string;
  content_html?: string;
  content_blocks_json?: unknown;
  content_text?: string;
  content_type?: string;
  document_url?: string;
  external_url?: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  published_at?: string;
  category?: string | { name?: string };
  author?: string | { name?: string };
  tags?: Array<string | { name?: string; slug?: string }>;
};

function extractPost(payload: unknown): InsightPost | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const maybePayload = payload as {
    post?: unknown;
    data?: unknown;
    item?: unknown;
  };

  if (maybePayload.post && typeof maybePayload.post === "object") {
    return maybePayload.post as InsightPost;
  }

  if (maybePayload.item && typeof maybePayload.item === "object") {
    return maybePayload.item as InsightPost;
  }

  if (maybePayload.data && typeof maybePayload.data === "object" && !Array.isArray(maybePayload.data)) {
    return maybePayload.data as InsightPost;
  }

  return payload as InsightPost;
}

function formatDate(value?: string): string {
  if (!value) {
    return "Unscheduled";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unscheduled";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function normalizeRenderedContentHtml(value: string): string {
  if (!value) return value;

  let normalized = value;

  // Cleanup legacy escaped empty paragraph artifacts from earlier editor serialization.
  normalized = normalized.replace(/&lt;p&gt;\s*(?:&nbsp;)?\s*&lt;\/p&gt;/gi, "");

  // Decode only common formatting tags that should render as HTML in article content.
  const simpleTags = ["p", "strong", "em", "b", "i", "u", "s", "blockquote", "ul", "ol", "li", "h2", "h3", "h4", "br", "hr"];
  simpleTags.forEach((tag) => {
    const openPattern = new RegExp(`&lt;${tag}&gt;`, "gi");
    const closePattern = new RegExp(`&lt;\\/${tag}&gt;`, "gi");
    normalized = normalized.replace(openPattern, `<${tag}>`).replace(closePattern, `</${tag}>`);
  });

  normalized = normalized.replace(/&lt;br\s*\/?&gt;/gi, "<br/>");
  normalized = normalized.replace(/&lt;hr\s*\/?&gt;/gi, "<hr/>");

  return normalized;
}

const InsightDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<InsightPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      setIsNotFound(true);
      return;
    }

    let isMounted = true;

    const loadPost = async () => {
      setIsLoading(true);
      setIsNotFound(false);
      setHasError(false);

      try {
        const response = await getPostBySlug(slug);
        if (!isMounted) return;

        const extractedPost = extractPost(response);
        if (!extractedPost || !extractedPost.title) {
          setIsNotFound(true);
          setPost(null);
        } else {
          setPost(extractedPost);
        }
      } catch (error) {
        if (!isMounted) return;

        if (error instanceof ApiError && error.status === 404) {
          setIsNotFound(true);
          setPost(null);
        } else {
          setHasError(true);
          setPost(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    const title = post?.seo_title || post?.title;
    document.title = title ? `${title} | 3rd Harvest` : "Insights | 3rd Harvest";
  }, [post]);

  const authorName = useMemo(() => {
    if (!post?.author) return "";
    return typeof post.author === "string" ? post.author : post.author.name || "";
  }, [post?.author]);

  const categoryName = useMemo(() => {
    if (!post?.category) return "";
    return typeof post.category === "string" ? post.category : post.category.name || "";
  }, [post?.category]);

  const formattedTags = useMemo(() => {
    if (!post?.tags || !Array.isArray(post.tags)) {
      return [] as string[];
    }

    return post.tags
      .map((tag) => (typeof tag === "string" ? tag : tag?.name || tag?.slug || ""))
      .filter(Boolean);
  }, [post?.tags]);

  const hasContentHtml = Boolean((post?.content_html || "").trim());
  const hasBlockPayload = Array.isArray(post?.content_blocks_json) && post.content_blocks_json.length > 0;
  const renderedContentHtml = useMemo(
    () => normalizeRenderedContentHtml(post?.content_html || ""),
    [post?.content_html]
  );

  return (
    <div className="min-h-screen">
      <BloomNav />
      <section className="bg-bloom-gradient relative overflow-hidden py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
          <Link
            to="/insights"
            className="inline-flex items-center text-sm tracking-[0.1em] uppercase font-bold text-bloomGold hover:text-bloomGreen transition-colors"
          >
            Back to Insights
          </Link>

          {isLoading && (
            <div className="mt-10 rounded-[12px] border border-bloomGreen/10 bg-white/70 p-8">
              <p className="text-sm uppercase tracking-[0.18em] font-bold text-bloomGold">Loading insight...</p>
            </div>
          )}

          {!isLoading && isNotFound && (
            <div className="mt-10 rounded-[12px] border border-bloomGreen/10 bg-white/70 p-8">
              <h1 className="text-3xl text-bloomGreen font-bold mb-3">Insight not found</h1>
              <p className="text-bloomGreen/80">This publication is not available or may have been moved.</p>
            </div>
          )}

          {!isLoading && hasError && (
            <div className="mt-10 rounded-[12px] border border-red-300/30 bg-red-950/20 p-8 text-red-100">
              Unable to load this insight right now. Please try again.
            </div>
          )}

          {!isLoading && !isNotFound && !hasError && post && (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <header className="mb-8">
                <p className="text-sm uppercase tracking-[0.2em] font-bold text-bloomGold mb-4">INSIGHT</p>
                <h1 className="text-3xl md:text-5xl text-bloomGreen font-bold leading-tight mb-4">{post.title}</h1>
                {post.excerpt && (
                  <p className="text-lg text-bloomGreen/80 leading-relaxed max-w-4xl">{post.excerpt}</p>
                )}

                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-bloomGreen/70">
                  <span>{formatDate(post.published_at)}</span>
                  {categoryName ? <span>{categoryName}</span> : null}
                  {authorName ? <span>{authorName}</span> : null}
                  {post.content_type ? (
                    <span className="px-2 py-0.5 rounded-full border border-bloomGold/40 text-bloomGold text-xs uppercase tracking-[0.1em]">
                      {post.content_type.replace(/_/g, " ")}
                    </span>
                  ) : null}
                </div>
              </header>

              {post.featured_image_url && (
                <div className="mb-10 rounded-[12px] overflow-hidden border border-bloomGreen/10 bg-white/70">
                  <img
                    src={post.featured_image_url}
                    alt={post.featured_image_alt || post.title || "Insight featured image"}
                    className="w-full max-h-[560px] object-cover"
                  />
                </div>
              )}

              <div
                data-testid="insight-body"
                className="text-bloomGreen/90 leading-relaxed text-base md:text-lg
                [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-bold [&_h1]:text-bloomGreen [&_h1]:mt-10 [&_h1]:mb-5
                [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-bloomGreen [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-bloomGreen [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:mb-5 [&_p]:text-bloomGreen/90 [&_p]:leading-relaxed
                [&_strong]:font-semibold [&_strong]:text-bloomDarkCoffee
                [&_em]:italic
                [&_b]:font-semibold [&_b]:text-bloomDarkCoffee
                [&_i]:italic
                [&_ul]:mb-5 [&_ul]:pl-6 [&_ul]:list-disc
                [&_ol]:mb-5 [&_ol]:pl-6 [&_ol]:list-decimal
                [&_li]:mb-2
                [&_blockquote]:my-7 [&_blockquote]:border-l-4 [&_blockquote]:border-bloomGold [&_blockquote]:pl-5 [&_blockquote]:text-bloomGreen/80 [&_blockquote]:italic
                [&_a]:text-bloomGold [&_a]:underline [&_a:hover]:text-bloomGreen
                [&_figure]:my-8 [&_figure]:space-y-2
                [&_figcaption]:text-sm [&_figcaption]:text-bloomGreen/70
                [&_figure>img]:w-full [&_figure>img]:aspect-[4/3] [&_figure>img]:object-cover
                [&_img]:my-2 [&_img]:rounded-[10px] [&_img]:border [&_img]:border-bloomGreen/10 [&_img]:max-w-full
                [&_video]:my-2 [&_video]:w-full [&_video]:rounded-[10px] [&_video]:border [&_video]:border-bloomGreen/10
                [&_iframe]:my-4 [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:aspect-video [&_iframe]:rounded-[10px] [&_iframe]:border [&_iframe]:border-bloomGreen/10
                [&_.link-card]:my-5 [&_.link-card]:rounded-[10px] [&_.link-card]:border [&_.link-card]:border-bloomGreen/15 [&_.link-card]:bg-white/80 [&_.link-card]:p-4"
              >
                {hasContentHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: renderedContentHtml }} />
                ) : hasBlockPayload ? (
                  <div className="admin-empty">
                    This insight is being refreshed for the latest content format. Please check back soon.
                  </div>
                ) : (
                  <p className="whitespace-pre-line">{post.content_text || "No content available."}</p>
                )}
              </div>

              {(post.document_url || post.external_url) && (
                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                  {post.document_url && (
                    <a
                      href={post.document_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-[10px] bg-bloomGold px-6 py-3 text-sm font-bold tracking-[0.08em] text-white transition-all hover:bg-white hover:text-black"
                    >
                      Download document
                    </a>
                  )}
                  {post.external_url && (
                    <a
                      href={post.external_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-[10px] border border-bloomGreen/25 bg-white/70 px-6 py-3 text-sm font-bold tracking-[0.08em] text-bloomGreen transition-all hover:border-bloomGold/60 hover:text-bloomGold"
                    >
                      Open external resource
                    </a>
                  )}
                </div>
              )}

              {formattedTags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2">
                  {formattedTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full border border-bloomGreen/20 text-bloomGreen/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default InsightDetail;
