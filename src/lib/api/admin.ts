import { API_BASE_URL, ApiError, apiRequest, buildApiUrl } from "@/lib/api/client";
import type { QueryParams } from "@/lib/api/query";

export interface AdminLoginResponse {
  ok: boolean;
  token?: string;
  expiresAt?: number | string;
  error?: string;
  message?: string;
}

export interface AdminUploadMediaResponse {
  ok: boolean;
  media?: {
    id: string | number;
    post_id?: string | number | null;
    uuid?: string;
    type?: string;
    url?: string;
    original_name?: string;
    size_bytes?: number;
    mime_type?: string;
  };
  error?: string;
  message?: string;
}

export interface AdminUploadOptions {
  onProgress?: (progress: number) => void;
  signal?: AbortSignal;
}

const UPLOAD_URL_BASE = ((import.meta.env.VITE_API_URL_BASE as string | undefined)?.trim() || API_BASE_URL).replace(/\/$/, "");
const ADMIN_UPLOAD_IMAGE_PATH =
  (import.meta.env.VITE_ADMIN_UPLOAD_IMAGE_PATH as string | undefined)?.trim() || "/api/admin/uploads/image";
const ADMIN_UPLOAD_VIDEO_PATH =
  (import.meta.env.VITE_ADMIN_UPLOAD_VIDEO_PATH as string | undefined)?.trim() || "/api/admin/uploads/video";
const ADMIN_UPLOAD_IMAGE_FALLBACK_PATH =
  (import.meta.env.VITE_ADMIN_UPLOAD_IMAGE_FALLBACK_PATH as string | undefined)?.trim() || "/api/admin/upload/image";
const ADMIN_UPLOAD_VIDEO_FALLBACK_PATH =
  (import.meta.env.VITE_ADMIN_UPLOAD_VIDEO_FALLBACK_PATH as string | undefined)?.trim() || "/api/admin/upload/video";

export function adminLogin(password: string) {
  return apiRequest<AdminLoginResponse>("/api/admin/login", {
    method: "POST",
    body: { password },
  });
}

export function getAdminLeads(token: string) {
  return apiRequest<unknown>("/api/admin/leads", {
    method: "GET",
    token,
  });
}

export function getAdminLeadEmails(token: string) {
  return apiRequest<unknown>("/api/admin/leads/emails", {
    method: "GET",
    token,
  });
}

export function getAdminNewsletterSubscriptions(token: string) {
  return apiRequest<unknown>("/api/admin/newsletter-subscriptions", {
    method: "GET",
    token,
  });
}

export function getAdminNewsletterEmails(token: string) {
  return apiRequest<unknown>("/api/admin/newsletter-subscriptions/emails", {
    method: "GET",
    token,
  });
}

export function getAdminCategories(token: string) {
  return apiRequest<unknown>("/api/admin/categories", {
    method: "GET",
    token,
  });
}

export function createAdminCategory(token: string, data: unknown) {
  return apiRequest<unknown>("/api/admin/categories", {
    method: "POST",
    token,
    body: data,
  });
}

export function updateAdminCategory(token: string, id: string | number, data: unknown) {
  return apiRequest<unknown>(`/api/admin/categories/${id}`, {
    method: "PUT",
    token,
    body: data,
  });
}

export function deleteAdminCategory(token: string, id: string | number) {
  return apiRequest<unknown>(`/api/admin/categories/${id}`, {
    method: "DELETE",
    token,
  });
}

export function getAdminTags(token: string) {
  return apiRequest<unknown>("/api/admin/tags", {
    method: "GET",
    token,
  });
}

export function createAdminTag(token: string, data: unknown) {
  return apiRequest<unknown>("/api/admin/tags", {
    method: "POST",
    token,
    body: data,
  });
}

export function updateAdminTag(token: string, id: string | number, data: unknown) {
  return apiRequest<unknown>(`/api/admin/tags/${id}`, {
    method: "PUT",
    token,
    body: data,
  });
}

export function deleteAdminTag(token: string, id: string | number) {
  return apiRequest<unknown>(`/api/admin/tags/${id}`, {
    method: "DELETE",
    token,
  });
}

export function getAdminAuthors(token: string) {
  return apiRequest<unknown>("/api/admin/authors", {
    method: "GET",
    token,
  });
}

export function createAdminAuthor(token: string, data: unknown) {
  return apiRequest<unknown>("/api/admin/authors", {
    method: "POST",
    token,
    body: data,
  });
}

export function updateAdminAuthor(token: string, id: string | number, data: unknown) {
  return apiRequest<unknown>(`/api/admin/authors/${id}`, {
    method: "PUT",
    token,
    body: data,
  });
}

export function deleteAdminAuthor(token: string, id: string | number) {
  return apiRequest<unknown>(`/api/admin/authors/${id}`, {
    method: "DELETE",
    token,
  });
}

export function getAdminPosts(token: string, params?: QueryParams) {
  return apiRequest<unknown>("/api/admin/posts", {
    method: "GET",
    token,
    query: params,
  });
}

export function getAdminPost(token: string, id: string | number) {
  return apiRequest<unknown>(`/api/admin/posts/${id}`, {
    method: "GET",
    token,
  });
}

export function createAdminPost(token: string, data: unknown) {
  return apiRequest<unknown>("/api/admin/posts", {
    method: "POST",
    token,
    body: data,
  });
}

export function updateAdminPost(token: string, id: string | number, data: unknown) {
  return apiRequest<unknown>(`/api/admin/posts/${id}`, {
    method: "PUT",
    token,
    body: data,
  });
}

export function deleteAdminPost(token: string, id: string | number) {
  return apiRequest<unknown>(`/api/admin/posts/${id}`, {
    method: "DELETE",
    token,
  });
}

function buildUploadBody(file: File, postId?: string | number) {
  const formData = new FormData();
  formData.append("file", file);
  if (postId !== undefined) {
    formData.append("postId", String(postId));
  }
  return formData;
}

export function appendApiBaseToMediaUrl(url?: string, baseUrl: string = UPLOAD_URL_BASE): string | undefined {
  if (!url) {
    return url;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return trimmed;
  }

  if (!baseUrl || /^https?:\/\//i.test(trimmed) || /^data:/i.test(trimmed) || trimmed.startsWith("blob:")) {
    return trimmed;
  }

  return `${baseUrl}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
}

function normalizeUploadMediaResponse(response: AdminUploadMediaResponse): AdminUploadMediaResponse {
  if (!response?.media?.url) {
    return response;
  }

  return {
    ...response,
    media: {
      ...response.media,
      url: appendApiBaseToMediaUrl(response.media.url),
    },
  };
}

function normalizeUploadError(status: number, data: unknown): ApiError {
  if (typeof data === "object" && data !== null) {
    const message = (data as { message?: unknown; error?: unknown }).message;
    const fallback = (data as { error?: unknown }).error;
    return new ApiError({
      status,
      message:
        typeof message === "string"
          ? message
          : typeof fallback === "string"
            ? fallback
            : "Request failed",
      code: typeof (data as { code?: unknown }).code === "string" ? (data as { code: string }).code : undefined,
      details: (data as { details?: unknown }).details,
      data,
    });
  }

  return new ApiError({
    status,
    message: "Request failed",
    data,
  });
}

async function uploadWithXhr(
  path: string,
  token: string,
  file: File,
  postId?: string | number,
  options?: AdminUploadOptions
): Promise<AdminUploadMediaResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const requestUrl = buildApiUrl(path);
    const body = buildUploadBody(file, postId);

    xhr.open("POST", requestUrl);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.responseType = "text";

    if (options?.onProgress) {
      xhr.upload.onprogress = (event) => {
        if (!event.lengthComputable) {
          return;
        }

        options.onProgress(Math.max(0, Math.min(100, Math.round((event.loaded / event.total) * 100))));
      };
    }

    const handleAbort = () => {
      xhr.abort();
      reject(new ApiError({ status: 0, message: "Network request failed" }));
    };

    if (options?.signal) {
      if (options.signal.aborted) {
        handleAbort();
        return;
      }
      options.signal.addEventListener("abort", handleAbort, { once: true });
    }

    xhr.onerror = () => {
      reject(new ApiError({ status: 0, message: "Network request failed" }));
    };

    xhr.onload = () => {
      let data: unknown = null;
      if (xhr.responseText) {
        try {
          data = JSON.parse(xhr.responseText);
        } catch {
          reject(new ApiError({ status: xhr.status || 0, message: "Invalid JSON response" }));
          return;
        }
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(normalizeUploadMediaResponse((data ?? { ok: false }) as AdminUploadMediaResponse));
        return;
      }

      reject(normalizeUploadError(xhr.status || 0, data));
    };

    xhr.send(body);
  });
}

async function uploadViaFetch(
  path: string,
  token: string,
  file: File,
  postId?: string | number
) {
  return apiRequest<AdminUploadMediaResponse>(path, {
    method: "POST",
    token,
    body: buildUploadBody(file, postId),
  }).then(normalizeUploadMediaResponse);
}

async function uploadWithFallback(
  paths: string[],
  token: string,
  file: File,
  postId?: string | number,
  options?: AdminUploadOptions
) {
  const useXhr = Boolean(options?.onProgress || options?.signal);
  const uniquePaths = [...new Set(paths.filter(Boolean))];
  let lastError: unknown;

  for (let index = 0; index < uniquePaths.length; index += 1) {
    const path = uniquePaths[index];
    try {
      if (useXhr) {
        return await uploadWithXhr(path, token, file, postId, options);
      }
      return await uploadViaFetch(path, token, file, postId);
    } catch (error) {
      lastError = error;
      const isNotFound = error instanceof ApiError && error.status === 404;
      const hasMorePaths = index < uniquePaths.length - 1;
      if (isNotFound && hasMorePaths) {
        continue;
      }
      throw error;
    }
  }

  throw lastError instanceof Error ? lastError : new ApiError({ status: 0, message: "Upload failed" });
}

export function uploadAdminImage(
  token: string,
  file: File,
  postId?: string | number,
  options?: AdminUploadOptions
) {
  return uploadWithFallback(
    [ADMIN_UPLOAD_IMAGE_PATH, ADMIN_UPLOAD_IMAGE_FALLBACK_PATH],
    token,
    file,
    postId,
    options
  );
}

export function uploadAdminVideo(
  token: string,
  file: File,
  postId?: string | number,
  options?: AdminUploadOptions
) {
  return uploadWithFallback(
    [ADMIN_UPLOAD_VIDEO_PATH, ADMIN_UPLOAD_VIDEO_FALLBACK_PATH],
    token,
    file,
    postId,
    options
  );
}
