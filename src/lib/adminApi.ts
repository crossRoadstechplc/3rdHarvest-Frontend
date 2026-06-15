/**
 * adminApi.ts
 * API client for admin-specific endpoints.
 */

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AdminLoginResponse {
    ok: boolean;
    token?: string;
    /** ISO date string OR ms timestamp */
    expiresAt?: string | number;
    error?: string;
}

export interface AdminEmailsResponse {
    ok: boolean;
    emails?: string[];
    error?: string;
}

export interface RegisterUserResponse {
    ok: boolean;
    user?: {
        id: number;
        name: string;
        email: string;
        role: string;
        created_at: string;
    };
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

/** POST /api/admin/login  — authenticates with the admin password */
export async function adminLogin(password: string): Promise<AdminLoginResponse> {
    return apiFetch<AdminLoginResponse>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
    });
}

/** GET /api/auth/verified-emails  — fetches the list of verified emails */
export async function fetchAdminEmails(token: string): Promise<AdminEmailsResponse> {
    return apiFetch<AdminEmailsResponse>("/api/auth/verified-emails", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

/** POST /api/admin/users — creates a new user account */
export async function registerUser(
    token: string,
    data: { name: string; email: string; password: string; role?: string }
): Promise<RegisterUserResponse> {
    return apiFetch<RegisterUserResponse>("/api/admin/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            ...(data.role ? { role: data.role } : {}),
        }),
    });
}
