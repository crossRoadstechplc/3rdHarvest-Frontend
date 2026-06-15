/**
 * authStorage.ts
 * localStorage helpers for the user session token / expiry.
 *
 * Keys:
 *   auth_token      – session JWT from POST /api/users/verify-otp
 *   auth_expiresAt  – expiry as a numeric Unix timestamp (ms)
 */

const TOKEN_KEY = "auth_token";
const EXPIRES_KEY = "auth_expiresAt";

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function getExpiresAt(): number | null {
    const raw = localStorage.getItem(EXPIRES_KEY);
    if (raw === null) return null;
    const parsed = Number(raw);
    return isNaN(parsed) ? null : parsed;
}

/** Normalises expiresAt (ISO string or ms number) and persists both values. */
export function setAuth(token: string, expiresAt: string | number): void {
    const expiresAtMs =
        typeof expiresAt === "string" ? new Date(expiresAt).getTime() : expiresAt;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRES_KEY, String(expiresAtMs));
}

export function clearAuth(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

/** Returns true when a token exists and has not yet expired. Clears stale sessions. */
export function isTokenValid(): boolean {
    const token = getToken();
    const expiresAt = getExpiresAt();
    if (!token || expiresAt === null) return false;
    if (expiresAt <= Date.now()) {
        clearAuth();
        return false;
    }
    return true;
}
