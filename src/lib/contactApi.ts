/**
 * contactApi.ts
 * API client for the public contact form.
 */

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export interface ContactResponse {
    ok: boolean;
    error?: string;
}

export async function submitContact(data: {
    name: string;
    email: string;
    message: string;
}): Promise<ContactResponse> {
    let res: Response;
    try {
        res = await fetch(`${API}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    } catch {
        throw new Error("Network error – please check your connection.");
    }

    const body = await res.json().catch(() => {
        throw new Error("Server returned an invalid response.");
    });

    return body as ContactResponse;
}
