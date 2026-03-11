import { useEffect, useMemo, useState } from "react";

type PostContentPreviewProps = {
  title: string;
  excerpt: string;
  contentHtml: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  contentType?: string;
  authorName?: string;
  publishedAt?: string;
  categoryName?: string;
  tags?: string[];
};

function formatPublishedDate(value?: string): string {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export const PostContentPreview = ({
  title,
  excerpt,
  contentHtml,
  featuredImageUrl,
  featuredImageAlt,
  contentType,
  authorName,
  publishedAt,
  categoryName,
  tags = [],
}: PostContentPreviewProps) => {
  const [showImage, setShowImage] = useState(Boolean(featuredImageUrl));

  useEffect(() => {
    setShowImage(Boolean(featuredImageUrl));
  }, [featuredImageUrl]);

  const previewTitle = title.trim() || "Untitled Post";
  const previewExcerpt = excerpt.trim();
  const publishedLabel = useMemo(() => formatPublishedDate(publishedAt), [publishedAt]);
  const hasBody = Boolean(contentHtml.trim());

  const metaItems = [categoryName?.trim(), authorName?.trim(), publishedLabel].filter(Boolean) as string[];

  const normalizedTags = tags.map((tag) => tag.trim()).filter(Boolean);

  const isEmpty = !title.trim() && !excerpt.trim() && !contentHtml.trim();

  return (
    <aside className="admin-panel-soft p-4 md:p-5" data-testid="post-content-preview">
      <p className="text-xs uppercase tracking-[0.14em] text-bloomGold font-semibold mb-3">Live Preview</p>

      {isEmpty ? (
        <div className="admin-empty" data-testid="preview-empty-state">
          Your article preview will appear here.
        </div>
      ) : (
        <article className="space-y-5">
          {showImage && featuredImageUrl ? (
            <div className="overflow-hidden rounded-[10px] border border-black/10 bg-white">
              <img
                src={featuredImageUrl}
                alt={featuredImageAlt || previewTitle}
                onError={() => setShowImage(false)}
                className="w-full max-h-[260px] object-cover"
              />
            </div>
          ) : null}

          {contentType ? (
            <span className="inline-flex rounded-full border border-bloomGold/40 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-bloomGreen">
              {contentType.replace(/_/g, " ")}
            </span>
          ) : null}

          <header>
            <h3 className="font-serif text-2xl leading-tight text-bloomDarkCoffee">{previewTitle}</h3>
            {previewExcerpt ? <p className="mt-3 text-sm leading-relaxed text-bloomDarkCoffee/75">{previewExcerpt}</p> : null}
            {metaItems.length > 0 ? (
              <p className="mt-3 text-xs uppercase tracking-[0.1em] text-bloomDarkCoffee/55">{metaItems.join(" | ")}</p>
            ) : null}
          </header>

          {hasBody ? (
            <div
              className="text-bloomDarkCoffee/85 text-sm leading-relaxed
              [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-bloomDarkCoffee [&_h1]:mb-3 [&_h1]:mt-6
              [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-bloomDarkCoffee [&_h2]:mb-3 [&_h2]:mt-5
              [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-bloomDarkCoffee [&_h3]:mb-2 [&_h3]:mt-4
              [&_p]:mb-3 [&_p]:text-bloomDarkCoffee/85
              [&_ul]:mb-3 [&_ul]:pl-5 [&_ul]:list-disc
              [&_ol]:mb-3 [&_ol]:pl-5 [&_ol]:list-decimal
              [&_li]:mb-1
              [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-bloomGold [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-bloomDarkCoffee/70
              [&_a]:text-bloomGreen [&_a]:underline [&_a:hover]:text-bloomGold
              [&_img]:my-4 [&_img]:rounded-[8px] [&_img]:max-w-full [&_img]:h-auto"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <div className="admin-empty">Add body content to preview your article.</div>
          )}

          {normalizedTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {normalizedTags.map((tag) => (
                <span key={tag} className="rounded-full border border-black/15 px-2 py-1 text-xs text-bloomDarkCoffee/70">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      )}
    </aside>
  );
};
