export const MAX_IMAGE_BYTES = 1 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 3 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"] as const;

const ALLOWED_IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp"];
const ALLOWED_VIDEO_EXTENSIONS = [".mp4", ".webm"];

export type FileValidationResult = {
  ok: boolean;
  error?: string;
};

export type ImageValidationOptions = {
  enforceMaxSize?: boolean;
};

function matchesExtension(fileName: string, extensions: string[]): boolean {
  const lower = fileName.toLowerCase();
  return extensions.some((extension) => lower.endsWith(extension));
}

export function validateImageFile(
  file: File,
  options: ImageValidationOptions = {}
): FileValidationResult {
  const { enforceMaxSize = true } = options;

  if (!file) {
    return { ok: false, error: "Image file is required." };
  }

  const mimeOk = ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number]);
  const extensionOk = matchesExtension(file.name, ALLOWED_IMAGE_EXTENSIONS);

  if (!mimeOk && !extensionOk) {
    return { ok: false, error: "Unsupported image type. Use jpeg, jpg, png, or webp." };
  }

  if (enforceMaxSize && file.size > MAX_IMAGE_BYTES) {
    return { ok: false, error: "Image file must be 1 MB or smaller before upload." };
  }

  return { ok: true };
}

export function validateVideoFile(file: File): FileValidationResult {
  if (!file) {
    return { ok: false, error: "Video file is required." };
  }

  const mimeOk = ALLOWED_VIDEO_TYPES.includes(file.type as (typeof ALLOWED_VIDEO_TYPES)[number]);
  const extensionOk = matchesExtension(file.name, ALLOWED_VIDEO_EXTENSIONS);

  if (!mimeOk && !extensionOk) {
    return { ok: false, error: "Unsupported video type. Use mp4 or webm." };
  }

  if (file.size > MAX_VIDEO_BYTES) {
    return { ok: false, error: "Video file must be 3 MB or smaller." };
  }

  return { ok: true };
}
