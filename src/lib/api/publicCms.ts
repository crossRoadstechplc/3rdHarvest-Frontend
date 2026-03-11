import { apiRequest } from "@/lib/api/client";
import type { QueryParams } from "@/lib/api/query";

export function getPosts(params?: QueryParams) {
  return apiRequest<unknown>("/api/posts", {
    method: "GET",
    query: params,
  });
}

export function getPostBySlug(slug: string) {
  return apiRequest<unknown>(`/api/posts/${encodeURIComponent(slug)}`, {
    method: "GET",
  });
}

export function getCategories() {
  return apiRequest<unknown>("/api/categories", {
    method: "GET",
  });
}

export function getTags() {
  return apiRequest<unknown>("/api/tags", {
    method: "GET",
  });
}

export function getAuthors() {
  return apiRequest<unknown>("/api/authors", {
    method: "GET",
  });
}
