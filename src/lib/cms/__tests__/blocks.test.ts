import { describe, expect, it } from "vitest";
import {
  createBlock,
  CMS_BLOCK_TYPES,
  getDefaultBlockData,
  normalizeAndSortBlocks,
} from "@/lib/cms/blocks";

describe("cms blocks", () => {
  it("block factory creates valid default blocks", () => {
    for (const type of CMS_BLOCK_TYPES) {
      const block = createBlock(type, { order: 3 });
      expect(block.type).toBe(type);
      expect(block.order).toBe(3);
      expect(block.id).toContain(`${type}-`);
      expect(block.data).toEqual(getDefaultBlockData(type));
    }
  });

  it("block sorting helper normalizes and sorts by order", () => {
    const blocks = normalizeAndSortBlocks([
      createBlock("paragraph", { order: 3, id: "p-3", data: { text: "third" } }),
      createBlock("heading", { order: 1, id: "h-1", data: { text: "first", level: 2 } }),
      { type: "quote", data: { quote: "second", attribution: "" }, id: "q-no-order" },
      null,
    ]);

    expect(blocks.map((block) => block.type)).toEqual(["heading", "quote", "paragraph"]);
    expect(blocks.map((block) => block.order)).toEqual([1, 2, 3]);
    expect(blocks[1].id).toBe("q-no-order");
  });
});
