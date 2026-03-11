import { ApiError } from "@/lib/api/client";

export function extractList<T>(payload: unknown, keys: string[] = []): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === "object") {
    const bag = payload as Record<string, unknown>;
    for (const key of keys) {
      const value = bag[key];
      if (Array.isArray(value)) {
        return value as T[];
      }
    }

    if (Array.isArray(bag.data)) {
      return bag.data as T[];
    }

    if (Array.isArray(bag.items)) {
      return bag.items as T[];
    }
  }

  return [];
}

export function extractItem<T>(payload: unknown, keys: string[] = []): T | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const bag = payload as Record<string, unknown>;
  for (const key of keys) {
    const value = bag[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as T;
    }
  }

  if (bag.data && typeof bag.data === "object" && !Array.isArray(bag.data)) {
    return bag.data as T;
  }

  return payload as T;
}

export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && (error.status === 401 || error.status === 403);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

