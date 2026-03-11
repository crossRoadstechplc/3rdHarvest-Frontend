import { describe, expect, it } from "vitest";
import { buildQueryString } from "@/lib/api/query";

describe("query helper", () => {
  it("serializes filters correctly", () => {
    const query = buildQueryString({
      page: 3,
      category: "insights",
      tag: ["coffee", "women"],
      draft: false,
      search: "third harvest",
      ignored: undefined,
      skipped: null,
    });

    expect(query).toBe(
      "?page=3&category=insights&tag=coffee&tag=women&draft=false&search=third+harvest"
    );
  });
});
