import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_BASE_URL } from "@/lib/api/client";
import {
  appendApiBaseToMediaUrl,
  createAdminTag,
  getAdminPosts,
  uploadAdminImage,
  uploadAdminVideo,
} from "@/lib/api/admin";

describe("admin API", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("attaches bearer token on GET calls", async () => {
    const fetchMock = vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    await getAdminPosts("token-123", { page: 1, limit: 20 });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      `${API_BASE_URL}/api/admin/posts?page=1&limit=20`
    );

    const options = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = options.headers as Headers;
    expect(headers.get("Authorization")).toBe("Bearer token-123");
  });

  it("attaches bearer token on mutation calls", async () => {
    const fetchMock = vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    await createAdminTag("token-xyz", { name: "traceability" });

    const options = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = options.headers as Headers;
    expect(options.method).toBe("POST");
    expect(headers.get("Authorization")).toBe("Bearer token-xyz");
    expect(options.body).toBe(JSON.stringify({ name: "traceability" }));
  });

  it("builds multipart image upload request with FormData", async () => {
    const fetchMock = vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true, media: { id: 1 } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const file = new File(["image-content"], "photo.jpg", { type: "image/jpeg" });
    await uploadAdminImage("token-image", file, 42);

    const options = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = options.headers as Headers;
    const body = options.body as FormData;

    expect(fetchMock.mock.calls[0][0]).toBe(`${API_BASE_URL}/api/admin/uploads/image`);
    expect(options.method).toBe("POST");
    expect(headers.get("Authorization")).toBe("Bearer token-image");
    expect(headers.get("Content-Type")).toBeNull();
    expect(body).toBeInstanceOf(FormData);
    expect(body.get("file")).toBe(file);
    expect(body.get("postId")).toBe("42");
  });

  it("retries image upload on 404 with singular upload path", async () => {
    const fetchMock = vi
      .mocked(fetch)
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: false, error: "Not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true, media: { id: 9, url: "/uploads/pic.jpg" } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );

    const file = new File(["image-content"], "photo.jpg", { type: "image/jpeg" });
    const response = await uploadAdminImage("token-image", file);

    expect(fetchMock.mock.calls[0][0]).toBe(`${API_BASE_URL}/api/admin/uploads/image`);
    expect(fetchMock.mock.calls[1][0]).toBe(`${API_BASE_URL}/api/admin/upload/image`);
    expect(response.ok).toBe(true);
  });

  it("builds multipart video upload request with FormData", async () => {
    const fetchMock = vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true, media: { id: 2 } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const file = new File(["video-content"], "clip.mp4", { type: "video/mp4" });
    await uploadAdminVideo("token-video", file);

    const options = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = options.headers as Headers;
    const body = options.body as FormData;

    expect(fetchMock.mock.calls[0][0]).toBe(`${API_BASE_URL}/api/admin/uploads/video`);
    expect(options.method).toBe("POST");
    expect(headers.get("Authorization")).toBe("Bearer token-video");
    expect(headers.get("Content-Type")).toBeNull();
    expect(body.get("file")).toBe(file);
    expect(body.get("postId")).toBeNull();
  });

  it("appends API base to relative media URLs", () => {
    expect(appendApiBaseToMediaUrl("/uploads/media.jpg", "https://api.example.com")).toBe(
      "https://api.example.com/uploads/media.jpg"
    );
    expect(appendApiBaseToMediaUrl("uploads/media.jpg", "https://api.example.com")).toBe(
      "https://api.example.com/uploads/media.jpg"
    );
    expect(appendApiBaseToMediaUrl("https://cdn.example.com/media.jpg", "https://api.example.com")).toBe(
      "https://cdn.example.com/media.jpg"
    );
  });
});
