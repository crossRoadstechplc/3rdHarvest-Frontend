import { describe, expect, it } from "vitest";
import {
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
  validateImageFile,
  validateVideoFile,
} from "@/lib/media/fileValidation";

function createFile(name: string, type: string, bytes: number): File {
  const content = new Uint8Array(bytes);
  return new File([content], name, { type });
}

describe("file validation helpers", () => {
  it("image validation accepts and rejects expected file types and sizes", () => {
    const validImage = createFile("valid.webp", "image/webp", 128_000);
    const invalidType = createFile("not-image.gif", "image/gif", 10_000);
    const oversized = createFile("big.jpg", "image/jpeg", MAX_IMAGE_BYTES + 1);

    expect(validateImageFile(validImage)).toEqual({ ok: true });
    expect(validateImageFile(invalidType)).toEqual({
      ok: false,
      error: "Unsupported image type. Use jpeg, jpg, png, or webp.",
    });
    expect(validateImageFile(oversized)).toEqual({
      ok: false,
      error: "Image file must be 1 MB or smaller before upload.",
    });
  });

  it("video validation accepts and rejects expected file types and sizes", () => {
    const validVideo = createFile("clip.webm", "video/webm", 512_000);
    const invalidType = createFile("clip.mov", "video/quicktime", 300_000);
    const oversized = createFile("big.mp4", "video/mp4", MAX_VIDEO_BYTES + 1);

    expect(validateVideoFile(validVideo)).toEqual({ ok: true });
    expect(validateVideoFile(invalidType)).toEqual({
      ok: false,
      error: "Unsupported video type. Use mp4 or webm.",
    });
    expect(validateVideoFile(oversized)).toEqual({
      ok: false,
      error: "Video file must be 3 MB or smaller.",
    });
  });
});

