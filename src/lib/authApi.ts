/**
 * authApi.ts
 * Lightweight API client for the OTP-based auth endpoints.
 * Reads base URL from VITE_API_URL env var (falls back to localhost:4000).
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RequestCodeResponse {
    ok: boolean;
    error?: string;
}

export interface VerifyCodeResponse {
    ok: boolean;
    token?: string;
    /** Unix ms OR ISO date string — normalised to ms in AccessGate before storing */
    expiresAt?: number | string;
    error?: string;
}

export interface MeResponse {
    ok: boolean;
    email?: string;
    exp?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Shared fetch wrapper that always parses JSON and throws on network errors. */
async function apiFetch<T>(path: string, init: RequestInit): Promise<T> {
    let response: Response;
    try {
        response = await fetch(`${API_BASE}${path}`, {
            headers: { "Content-Type": "application/json" },
            ...init,
        });
    } catch (networkError) {
        throw new Error("Network error – please check your connection.");
    }

    const data = await response.json().catch(() => {
        throw new Error("Server returned an invalid response.");
    });

    return data as T;
}

// ---------------------------------------------------------------------------
// Auth API functions
// ---------------------------------------------------------------------------

/**
 * Requests a one-time code to be sent to the given email address.
 * POST /api/auth/request-code
 */
export async function requestCode(email: string): Promise<RequestCodeResponse> {
    return apiFetch<RequestCodeResponse>("/api/auth/request-code", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

/**
 * Verifies the OTP entered by the user.
 * POST /api/auth/verify-code
 */
export async function verifyCode(
    email: string,
    code: string
): Promise<VerifyCodeResponse> {
    return apiFetch<VerifyCodeResponse>("/api/auth/verify-code", {
        method: "POST",
        body: JSON.stringify({ email, code }),
    });
}

/**
 * Validates the stored token against the server (optional call).
 * GET /api/auth/me
 */
export async function me(token: string): Promise<MeResponse> {
    return apiFetch<MeResponse>("/api/auth/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}
