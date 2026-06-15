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

export interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    created_at: string;
    last_logged_in_at: string | null;
}

export interface AdminUsersResponse {
    ok: boolean;
    users?: AdminUser[];
    error?: string;
}

export interface RegisterUserResponse {
    ok: boolean;
    user?: AdminUser;
    error?: string;
}

export interface DeleteUserResponse {
    ok: boolean;
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

function authHeaders(token: string): HeadersInit {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
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

/** GET /api/admin/users — lists registered users */
export async function fetchAdminUsers(token: string): Promise<AdminUsersResponse> {
    return apiFetch<AdminUsersResponse>("/api/admin/users", {
        method: "GET",
        headers: authHeaders(token),
    });
}

/** POST /api/admin/users — creates a new user account */
export async function registerUser(
    token: string,
    data: { name: string; email: string; password: string; role?: string }
): Promise<RegisterUserResponse> {
    return apiFetch<RegisterUserResponse>("/api/admin/users", {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            ...(data.role ? { role: data.role } : {}),
        }),
    });
}

/** DELETE /api/admin/users/:id — removes a user account */
export async function deleteUser(token: string, userId: number): Promise<DeleteUserResponse> {
    return apiFetch<DeleteUserResponse>(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: authHeaders(token),
    });
}
