import { describe, expect, it } from "vitest";
import { DEFAULT_UPLOAD_STATE, UPLOAD_STATUS } from "@/lib/media/uploadState";

describe("upload state helpers", () => {
  it("exposes expected upload statuses and defaults", () => {
    expect(UPLOAD_STATUS).toEqual([
      "idle",
      "validating",
      "compressing",
      "uploading",
      "success",
      "error",
    ]);
    expect(DEFAULT_UPLOAD_STATE).toEqual({ status: "idle" });
  });
});

