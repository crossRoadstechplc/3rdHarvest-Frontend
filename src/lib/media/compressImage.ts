import imageCompression from "browser-image-compression";
import { MAX_IMAGE_BYTES } from "@/lib/media/fileValidation";

export type CompressImageOptions = {
  maxBytes?: number;
};

export async function compressImageIfNeeded(
  file: File,
  options: CompressImageOptions = {}
): Promise<File> {
  const maxBytes = options.maxBytes ?? MAX_IMAGE_BYTES;
  if (file.size <= maxBytes) {
    return file;
  }

  const maxSizeMB = maxBytes / (1024 * 1024);

  try {
    const compressed = await imageCompression(file, {
      maxSizeMB,
      useWebWorker: true,
      initialQuality: 0.82,
      maxWidthOrHeight: 2560,
    });

    if (compressed.size <= maxBytes) {
      return compressed;
    }

    return await imageCompression(compressed, {
      maxSizeMB,
      useWebWorker: true,
      initialQuality: 0.72,
      maxWidthOrHeight: 2200,
    });
  } catch {
    return file;
  }
}

