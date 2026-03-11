const TOKEN_KEY = "admin_token";
const EXPIRES_KEY = "admin_expiresAt";

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdminExpiresAt(): number | null {
  const rawValue = localStorage.getItem(EXPIRES_KEY);
  if (rawValue === null) {
    return null;
  }

  const value = Number(rawValue);
  return Number.isNaN(value) ? null : value;
}

export function setAdminAuth(token: string, expiresAt: number): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRES_KEY, String(expiresAt));
}

export function clearAdminAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

export function isAdminTokenValid(): boolean {
  const token = getAdminToken();
  const expiresAt = getAdminExpiresAt();
  return Boolean(token) && expiresAt !== null && expiresAt > Date.now();
}
