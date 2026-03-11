import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearAdminAuth,
  getAdminExpiresAt,
  getAdminToken,
  isAdminTokenValid,
  setAdminAuth,
} from "@/lib/auth/adminStorage";

describe("adminStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("stores and reads token/expiry", () => {
    setAdminAuth("abc", 1710000000000);

    expect(getAdminToken()).toBe("abc");
    expect(getAdminExpiresAt()).toBe(1710000000000);
  });

  it("validates token based on expiry", () => {
    vi.spyOn(Date, "now").mockReturnValue(2000);
    setAdminAuth("abc", 5000);

    expect(isAdminTokenValid()).toBe(true);

    setAdminAuth("abc", 1000);
    expect(isAdminTokenValid()).toBe(false);
  });

  it("clears token/expiry", () => {
    setAdminAuth("abc", 5000);
    clearAdminAuth();

    expect(getAdminToken()).toBeNull();
    expect(getAdminExpiresAt()).toBeNull();
    expect(isAdminTokenValid()).toBe(false);
  });
});
