import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiRequest, buildApiUrl, resolveApiBaseUrl } from "@/lib/api/client";

describe("api client", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("builds request URLs correctly", () => {
    const url = buildApiUrl(
      "/api/posts",
      { page: 2, tag: ["coffee", "co-op"] },
      "http://localhost:3040/"
    );

    expect(url).toBe("http://localhost:3040/api/posts?page=2&tag=coffee&tag=co-op");
    expect(resolveApiBaseUrl("")).toBe("http://localhost:3040");
  });

  it("uses the default base URL when none is configured", async () => {
    const fetchMock = vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    await apiRequest<{ ok: boolean }>("/api/ping", { method: "GET" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe("http://localhost:3040/api/ping");
  });
});
