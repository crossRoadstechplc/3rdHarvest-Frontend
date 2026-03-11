import { buildQueryString, type QueryParams } from "@/lib/api/query";

export const DEFAULT_API_URL = "http://localhost:3040";

export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
  query?: QueryParams;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

export interface NormalizedApiError {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
  data?: unknown;
}

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;
  data?: unknown;

  constructor(error: NormalizedApiError) {
    super(error.message);
    this.name = "ApiError";
    this.status = error.status;
    this.code = error.code;
    this.details = error.details;
    this.data = error.data;
  }
}

export function resolveApiBaseUrl(baseUrl?: string): string {
  const value = (baseUrl ?? "").trim();
  if (!value) {
    return DEFAULT_API_URL;
  }

  return value.replace(/\/$/, "");
}

function resolveModeAwareApiBaseUrl(): string {
  const mode = import.meta.env.MODE;
  const configuredDefault = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  const configuredDev = (import.meta.env.VITE_API_URL_DEV as string | undefined)?.trim();
  const configuredTest = (import.meta.env.VITE_API_URL_TEST as string | undefined)?.trim();
  const configuredProd = (import.meta.env.VITE_API_URL_PROD as string | undefined)?.trim();

  if (mode === "test") {
    return resolveApiBaseUrl(configuredTest || configuredDev || DEFAULT_API_URL);
  }

  if (mode === "production") {
    return resolveApiBaseUrl(configuredProd || configuredDefault || "https://3rd.ankuaru.com");
  }

  // Development/local: prefer explicit local override, then localhost fallback.
  return resolveApiBaseUrl(configuredDev || DEFAULT_API_URL);
}

export const API_BASE_URL = resolveModeAwareApiBaseUrl();

export function buildApiUrl(
  path: string,
  query?: QueryParams,
  baseUrl: string = API_BASE_URL
): string {
  return `${resolveApiBaseUrl(baseUrl)}${path}${buildQueryString(query)}`;
}

function normalizeError(status: number, data: unknown): NormalizedApiError {
  if (typeof data === "object" && data !== null) {
    const maybeMessage = (data as { message?: unknown; error?: unknown }).message;
    const fallback = (data as { error?: unknown }).error;
    const code = (data as { code?: unknown }).code;
    const details = (data as { details?: unknown }).details;
    const errors = (data as { errors?: unknown }).errors;
    const firstValidationMessage = Array.isArray(errors)
      ? errors
          .map((item) => {
            if (typeof item === "string") return item;
            if (typeof item === "object" && item !== null) {
              const maybeItemMessage = (item as { message?: unknown; error?: unknown }).message;
              const maybeItemError = (item as { error?: unknown }).error;
              return typeof maybeItemMessage === "string"
                ? maybeItemMessage
                : typeof maybeItemError === "string"
                  ? maybeItemError
                  : null;
            }
            return null;
          })
          .find((message): message is string => Boolean(message && message.trim()))
      : null;

    return {
      status,
      message:
        typeof maybeMessage === "string"
          ? maybeMessage
          : typeof fallback === "string"
            ? fallback
            : typeof firstValidationMessage === "string"
              ? firstValidationMessage
            : "Request failed",
      code: typeof code === "string" ? code : undefined,
      details: details ?? errors,
      data,
    };
  }

  return {
    status,
    message: "Request failed",
    data,
  };
}

async function parseJsonResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError({
      status: response.status,
      message: "Invalid JSON response",
    });
  }
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = "GET", body, token, query, headers, signal } = options;
  const isFormDataBody = body instanceof FormData;

  const requestHeaders = new Headers({
    Accept: "application/json",
  });

  if (!isFormDataBody) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (headers) {
    const customHeaders = new Headers(headers);
    customHeaders.forEach((value, key) => {
      requestHeaders.set(key, value);
    });
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(buildApiUrl(path, query), {
      method,
      headers: requestHeaders,
      body:
        body === undefined
          ? undefined
          : isFormDataBody
            ? (body as FormData)
            : JSON.stringify(body),
      signal,
    });
  } catch {
    throw new ApiError({
      status: 0,
      message: "Network request failed",
    });
  }

  const data = await parseJsonResponse(response);

  if (!response.ok) {
    throw new ApiError(normalizeError(response.status, data));
  }

  return data as T;
}
