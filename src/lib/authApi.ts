/**
 * authApi.ts
 * API client for user login (OTP) and session endpoints.
 */

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export interface LoginResponse {
    ok: boolean;
    error?: string;
}

export interface VerifyOtpResponse {
    ok: boolean;
    token?: string;
    expiresAt?: number;
    user?: AuthUser;
    error?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
    let res: Response;
    try {
        res = await fetch(`${API}${path}`, {
            headers: { "Content-Type": "application/json" },
            ...init,
        });
    } catch {
        throw new Error("Network error – please check your connection.");
    }

    const data = await res.json().catch(() => {
        throw new Error("Server returned an invalid response.");
    });

    return data as T;
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/** POST /api/users/login — validates credentials and sends OTP email */
export async function login(email: string, password: string): Promise<LoginResponse> {
    return apiFetch<LoginResponse>("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

/** POST /api/users/verify-otp — verifies OTP and returns session token */
export async function verifyOtp(email: string, code: string): Promise<VerifyOtpResponse> {
    return apiFetch<VerifyOtpResponse>("/api/users/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, code }),
    });
}
