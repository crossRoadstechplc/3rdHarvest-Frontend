import { describe, expect, it } from "vitest";
import { createBlock, type CmsBlock } from "@/lib/cms/blocks";
import { fallbackBlocksFromLegacyHtml, renderBlocksToPreviewHtml } from "@/lib/cms/renderBlocks";

describe("renderBlocks helpers", () => {
  it("renders mixed blocks to preview HTML", () => {
    const html = renderBlocksToPreviewHtml([
      createBlock("heading", { order: 0, data: { text: "Title", level: 2 } }),
      createBlock("paragraph", { order: 1, data: { text: "Body text" } }),
      createBlock("linkCard", {
        order: 2,
        data: { url: "https://example.com", title: "Example", description: "Desc" },
      }),
    ]);

    expect(html).toContain("<h2>Title</h2>");
    expect(html).toContain("<p>Body text</p>");
    expect(html).toContain("https://example.com");
  });

  it("preserves paragraph HTML when paragraph block already stores HTML", () => {
    const html = renderBlocksToPreviewHtml([
      createBlock("paragraph", { order: 0, data: { text: "<p>Already formatted</p>" } }),
    ]);

    expect(html).toBe("<p>Already formatted</p>");
  });

  it("builds fallback paragraph block from legacy HTML", () => {
    const blocks = fallbackBlocksFromLegacyHtml("<p>Legacy <strong>body</strong> copy</p>");
    expect(blocks).toHaveLength(1);
    expect(blocks[0].type).toBe("paragraph");
    const paragraphBlock = blocks[0] as CmsBlock<"paragraph">;
    expect(paragraphBlock.data.text).toBe("Legacy body copy");
  });
});
