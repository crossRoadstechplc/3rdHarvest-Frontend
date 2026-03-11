import { beforeEach, describe, expect, it, vi } from "vitest";
import { compressImageIfNeeded } from "@/lib/media/compressImage";

const { compressionMock } = vi.hoisted(() => ({
  compressionMock: vi.fn(),
}));

vi.mock("browser-image-compression", () => ({
  default: compressionMock,
}));

function createFile(name: string, type: string, bytes: number): File {
  return new File([new Uint8Array(bytes)], name, { type });
}

describe("compressImageIfNeeded", () => {
  beforeEach(() => {
    compressionMock.mockReset();
  });

  it("returns original file when small enough", async () => {
    const file = createFile("small.jpg", "image/jpeg", 120_000);

    const result = await compressImageIfNeeded(file);

    expect(result).toBe(file);
    expect(compressionMock).not.toHaveBeenCalled();
  });

  it("attempts compression when file is oversized", async () => {
    const largeFile = createFile("large.jpg", "image/jpeg", 1_400_000);
    const compressed = createFile("large-compressed.jpg", "image/jpeg", 850_000);
    compressionMock.mockResolvedValue(compressed);

    const result = await compressImageIfNeeded(largeFile);

    expect(compressionMock).toHaveBeenCalledTimes(1);
    expect(compressionMock).toHaveBeenCalledWith(
      largeFile,
      expect.objectContaining({
        maxSizeMB: 1,
        useWebWorker: true,
      })
    );
    expect(result).toBe(compressed);
  });
});
