import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
} from "@/lib/api/newsletter";

describe("newsletter API", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("calls subscribe endpoint with email and source", async () => {
    const fetchMock = vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    await subscribeNewsletter("hello@example.com", "insights_page");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      "http://localhost:3040/api/newsletter/subscribe"
    );

    const options = fetchMock.mock.calls[0][1] as RequestInit;
    expect(options.method).toBe("POST");
    expect(options.body).toBe(
      JSON.stringify({ email: "hello@example.com", source: "insights_page" })
    );
  });

  it("calls unsubscribe endpoint with email", async () => {
    const fetchMock = vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    await unsubscribeNewsletter("bye@example.com");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      "http://localhost:3040/api/newsletter/unsubscribe"
    );

    const options = fetchMock.mock.calls[0][1] as RequestInit;
    expect(options.method).toBe("POST");
    expect(options.body).toBe(JSON.stringify({ email: "bye@example.com" }));
  });
});
