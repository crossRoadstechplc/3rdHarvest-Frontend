import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ImageBlockEditor } from "@/components/admin/blocks/ImageBlockEditor";
import { VideoBlockEditor } from "@/components/admin/blocks/VideoBlockEditor";
import { createBlock } from "@/lib/cms/blocks";
import { MAX_IMAGE_BYTES, MAX_VIDEO_BYTES } from "@/lib/media/fileValidation";

vi.mock("@/lib/api/admin", () => ({
  uploadAdminImage: vi.fn(),
  uploadAdminVideo: vi.fn(),
}));

vi.mock("@/lib/media/compressImage", () => ({
  compressImageIfNeeded: vi.fn(),
}));

import { uploadAdminImage, uploadAdminVideo } from "@/lib/api/admin";
import { compressImageIfNeeded } from "@/lib/media/compressImage";

function makeFile(name: string, type: string, bytes: number): File {
  return new File([new Uint8Array(bytes)], name, { type });
}

describe("media block editors", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("image block validates type before upload", async () => {
    render(
      <ImageBlockEditor
        block={createBlock("image", { order: 0 })}
        token="admin-token"
        onChange={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/Image file/i), {
      target: {
        files: [makeFile("invalid.gif", "image/gif", 10_000)],
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Unsupported image type. Use jpeg, jpg, png, or webp.")).toBeInTheDocument();
    });
    expect(uploadAdminImage).not.toHaveBeenCalled();
  });

  it("image block compresses oversized images before upload", async () => {
    const compressed = makeFile("compressed.jpg", "image/jpeg", 500_000);
    vi.mocked(compressImageIfNeeded).mockResolvedValue(compressed);
    vi.mocked(uploadAdminImage).mockResolvedValue({
      ok: true,
      media: { id: 1, url: "https://cdn.example.com/image.jpg" },
    });

    render(
      <ImageBlockEditor
        block={createBlock("image", { order: 0 })}
        token="admin-token"
        postId={12}
        onChange={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/Image file/i), {
      target: {
        files: [makeFile("big.jpg", "image/jpeg", MAX_IMAGE_BYTES + 128)],
      },
    });

    await waitFor(() => {
      expect(compressImageIfNeeded).toHaveBeenCalledTimes(1);
    });
    expect(uploadAdminImage).toHaveBeenCalledWith(
      "admin-token",
      compressed,
      12,
      expect.objectContaining({ onProgress: expect.any(Function) })
    );
  });

  it("image block stores returned URL and calls onChange", async () => {
    const onChange = vi.fn();
    vi.mocked(compressImageIfNeeded).mockResolvedValue(makeFile("small.jpg", "image/jpeg", 200_000));
    vi.mocked(uploadAdminImage).mockResolvedValue({
      ok: true,
      media: { id: 2, url: "https://cdn.example.com/updated.jpg" },
    });

    render(
      <ImageBlockEditor
        block={createBlock("image", { order: 0 })}
        token="admin-token"
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByLabelText(/Image file/i), {
      target: {
        files: [makeFile("small.jpg", "image/jpeg", 200_000)],
      },
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          url: "https://cdn.example.com/updated.jpg",
        })
      );
    });
  });

  it("image block shows error on failed upload", async () => {
    vi.mocked(uploadAdminImage).mockRejectedValue(new Error("Upload failed"));

    render(
      <ImageBlockEditor
        block={createBlock("image", { order: 0 })}
        token="admin-token"
        onChange={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/Image file/i), {
      target: {
        files: [makeFile("small.jpg", "image/jpeg", 200_000)],
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Upload failed")).toBeInTheDocument();
    });
  });

  it("video block validates size and type before upload", async () => {
    render(
      <VideoBlockEditor
        block={createBlock("video", { order: 0 })}
        token="admin-token"
        onChange={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/Video file/i), {
      target: {
        files: [makeFile("large.mp4", "video/mp4", MAX_VIDEO_BYTES + 1)],
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Video file must be 3 MB or smaller.")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Video file/i), {
      target: {
        files: [makeFile("movie.mov", "video/quicktime", 100_000)],
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Unsupported video type. Use mp4 or webm.")).toBeInTheDocument();
    });
    expect(uploadAdminVideo).not.toHaveBeenCalled();
  });

  it("video block stores returned URL on successful upload", async () => {
    const onChange = vi.fn();
    vi.mocked(uploadAdminVideo).mockResolvedValue({
      ok: true,
      media: { id: 8, url: "https://cdn.example.com/video.mp4" },
    });

    render(
      <VideoBlockEditor
        block={createBlock("video", { order: 0 })}
        token="admin-token"
        postId={22}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByLabelText(/Video file/i), {
      target: {
        files: [makeFile("clip.mp4", "video/mp4", 200_000)],
      },
    });

    await waitFor(() => {
      expect(uploadAdminVideo).toHaveBeenCalledWith(
        "admin-token",
        expect.any(File),
        22,
        expect.objectContaining({ onProgress: expect.any(Function) })
      );
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "https://cdn.example.com/video.mp4",
      })
    );
  });

  it("progress/status states render during upload", async () => {
    vi.mocked(uploadAdminImage).mockImplementation(async (_token, _file, _postId, options) => {
      options?.onProgress?.(35);
      return new Promise(() => {
        // keep pending to assert uploading state
      });
    });

    render(
      <ImageBlockEditor
        block={createBlock("image", { order: 0 })}
        token="admin-token"
        onChange={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/Image file/i), {
      target: {
        files: [makeFile("upload.jpg", "image/jpeg", 200_000)],
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Uploading image... 35%")).toBeInTheDocument();
      expect(screen.getByRole("progressbar", { name: "Image upload progress" })).toBeInTheDocument();
    });
  });
});
