import { createBlock, type CmsBlock } from "@/lib/cms/blocks";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsHtmlTag(value: string): boolean {
  return /<\/?[a-z][\w-]*\b[^>]*>/i.test(value);
}

export function fallbackBlocksFromLegacyHtml(contentHtml?: string): CmsBlock[] {
  const text = stripHtml(contentHtml ?? "");
  if (!text) {
    return [createBlock("paragraph", { order: 0 })];
  }

  return [createBlock("paragraph", { order: 0, data: { text } })];
}

export function renderBlocksToPreviewHtml(blocks: CmsBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading": {
          const level = block.data.level === 3 || block.data.level === 4 ? block.data.level : 2;
          return `<h${level}>${escapeHtml(block.data.text || "")}</h${level}>`;
        }
        case "paragraph":
          if (containsHtmlTag((block.data.text || "").trim())) {
            return block.data.text || "";
          }
          return `<p>${escapeHtml(block.data.text || "")}</p>`;
        case "quote": {
          const quoteText = escapeHtml(block.data.quote || "");
          const cite = block.data.attribution ? `<cite>${escapeHtml(block.data.attribution)}</cite>` : "";
          return `<blockquote><p>${quoteText}</p>${cite}</blockquote>`;
        }
        case "divider":
          return "<hr />";
        case "linkCard": {
          const url = escapeHtml(block.data.url || "");
          const title = escapeHtml(block.data.title || "");
          const description = escapeHtml(block.data.description || "");
          return `<p><a href="${url}" target="_blank" rel="noreferrer">${title || url}</a>${description ? ` - ${description}` : ""}</p>`;
        }
        case "image": {
          const url = escapeHtml(block.data.url || "");
          const alt = escapeHtml(block.data.alt || "");
          const caption = escapeHtml(block.data.caption || "");
          if (!url) return "";
          return `<figure><img src="${url}" alt="${alt}" />${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
        }
        case "video": {
          const url = escapeHtml(block.data.url || "");
          const caption = escapeHtml(block.data.caption || "");
          if (!url) return "";
          return `<figure><video controls src="${url}"></video>${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
        }
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("");
}
