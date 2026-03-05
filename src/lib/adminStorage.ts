/**
 * adminStorage.ts
 * localStorage helpers for the admin token / expiry.
 *
 * Keys:
 *   admin_token      – JWT or opaque token string
 *   admin_expiresAt  – expiry as a numeric Unix timestamp (ms)
 */

const TOKEN_KEY = "admin_token";
const EXPIRES_KEY = "admin_expiresAt";

export function getAdminToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function getAdminExpiresAt(): number | null {
    const raw = localStorage.getItem(EXPIRES_KEY);
    if (raw === null) return null;
    const parsed = Number(raw);
    return isNaN(parsed) ? null : parsed;
}

/** Normalises expiresAt (ISO string or ms number) and persists both values. */
export function setAdminAuth(token: string, expiresAt: string | number): void {
    const expiresAtMs =
        typeof expiresAt === "string" ? new Date(expiresAt).getTime() : expiresAt;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRES_KEY, String(expiresAtMs));
}

export function clearAdminAuth(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

/** Returns true when a token exists and has not yet expired. */
export function isAdminTokenValid(): boolean {
    const token = getAdminToken();
    const expiresAt = getAdminExpiresAt();
    if (!token || expiresAt === null) return false;
    return expiresAt > Date.now();
}
