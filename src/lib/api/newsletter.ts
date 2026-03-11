import { apiRequest } from "@/lib/api/client";

export interface NewsletterPayload {
  email: string;
  source?: string;
}

export function subscribeNewsletter(email: string, source?: string) {
  const payload: NewsletterPayload = source ? { email, source } : { email };

  return apiRequest<{ ok: boolean; message?: string; error?: string }>(
    "/api/newsletter/subscribe",
    {
      method: "POST",
      body: payload,
    }
  );
}

export function unsubscribeNewsletter(email: string) {
  return apiRequest<{ ok: boolean; message?: string; error?: string }>(
    "/api/newsletter/unsubscribe",
    {
      method: "POST",
      body: { email },
    }
  );
}
