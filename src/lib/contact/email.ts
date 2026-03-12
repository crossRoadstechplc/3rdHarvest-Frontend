import emailjs from "@emailjs/browser";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  source: "3rd Harvest" | "contact-section" | string; // Allow custom source values
};

let isEmailJsInitialized = false;

function getRequiredEnvVar(key: string): string {
  const value = (import.meta.env[key] as string | undefined)?.trim();
  if (!value) {
    throw new Error(`Missing ${key}. Set it in your environment (Vercel/ .env).`);
  }
  return value;
}

export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  const serviceId = getRequiredEnvVar("VITE_EMAILJS_SERVICE_ID");
  const templateId = getRequiredEnvVar("VITE_EMAILJS_TEMPLATE_ID");
  const publicKey = getRequiredEnvVar("VITE_EMAILJS_PUBLIC_KEY");
  const toEmail = (import.meta.env.VITE_RECIPIENT_EMAIL as string | undefined)?.trim() || "contact@3rdharvest.org";

  if (!isEmailJsInitialized) {
    emailjs.init(publicKey);
    isEmailJsInitialized = true;
  }

  const templateParams = {
    name: payload.name,
    from_name: payload.name,
    email: payload.email,
    from_email: payload.email,
    reply_to: payload.email,
    message: payload.message,
    source: payload.source,
    to_email: toEmail,
  };

  const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
  if (response.status !== 200) {
    throw new Error(`Email delivery failed (${response.status} ${response.text || "UNKNOWN"}).`);
  }
}

