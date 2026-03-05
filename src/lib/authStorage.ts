/**
 * authStorage.ts
 * Thin wrapper around localStorage for persisting auth token state.
 *
 * Keys used:
 *   auth_token     – the JWT / opaque token string
 *   auth_expiresAt – expiry as a Unix timestamp in milliseconds
 */

const TOKEN_KEY = "auth_token";
const EXPIRES_KEY = "auth_expiresAt";

/** Returns the stored token string, or null if absent. */
export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

/** Returns the stored expiry timestamp (ms), or null if absent. */
export function getExpiresAt(): number | null {
    const raw = localStorage.getItem(EXPIRES_KEY);
    if (raw === null) return null;
    const parsed = Number(raw);
    return isNaN(parsed) ? null : parsed;
}

/** Persists a token and its expiry timestamp. */
export function setAuth(token: string, expiresAt: number): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRES_KEY, String(expiresAt));
}

/** Removes all stored auth data (effectively logs the user out). */
export function clearAuth(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

/**
 * Returns true when a valid, non-expired token exists in localStorage.
 * Checks both presence of the token string and that expiresAt > now.
 */
export function isTokenValid(): boolean {
    const token = getToken();
    const expiresAt = getExpiresAt();
    if (!token || expiresAt === null) return false;
    return expiresAt > Date.now();
}
