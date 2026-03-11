import { useMemo, useState } from "react";
import { ApiError } from "@/lib/api/client";
import { uploadAdminImage } from "@/lib/api/admin";
import { type CmsBlock } from "@/lib/cms/blocks";
import { compressImageIfNeeded } from "@/lib/media/compressImage";
import { DEFAULT_UPLOAD_STATE, type UploadState } from "@/lib/media/uploadState";
import { MAX_IMAGE_BYTES, validateImageFile } from "@/lib/media/fileValidation";

type ImageBlockEditorProps = {
  block: CmsBlock<"image">;
  token: string;
  postId?: string | number;
  onChange: (nextData: CmsBlock<"image">["data"]) => void;
  onUnauthorized?: () => void;
};

function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && (error.status === 401 || error.status === 403);
}

export const ImageBlockEditor = ({
  block,
  token,
  postId,
  onChange,
  onUnauthorized,
}: ImageBlockEditorProps) => {
  const [uploadState, setUploadState] = useState<UploadState>(DEFAULT_UPLOAD_STATE);

  const statusLabel = useMemo(() => {
    switch (uploadState.status) {
      case "validating":
        return "Validating image...";
      case "compressing":
        return "Compressing image...";
      case "uploading":
        return `Uploading image... ${uploadState.progress ?? 0}%`;
      case "success":
        return "Image uploaded successfully.";
      case "error":
        return uploadState.error || "Image upload failed.";
      default:
        return "Select an image file (jpeg, jpg, png, webp).";
    }
  }, [uploadState.error, uploadState.progress, uploadState.status]);

  const handleFileSelected = async (file?: File) => {
    if (!file) {
      return;
    }

    setUploadState({ status: "validating" });
    const validation = validateImageFile(file, { enforceMaxSize: false });
    if (!validation.ok) {
      setUploadState({ status: "error", error: validation.error });
      return;
    }

    let uploadFile = file;
    if (file.size > MAX_IMAGE_BYTES) {
      setUploadState({ status: "compressing" });
      uploadFile = await compressImageIfNeeded(file);
    }

    setUploadState({ status: "uploading", progress: 0 });

    try {
      const response = await uploadAdminImage(token, uploadFile, postId, {
        onProgress: (progress) => setUploadState({ status: "uploading", progress }),
      });

      const mediaUrl = response.media?.url;
      if (!mediaUrl) {
        setUploadState({ status: "error", error: "Upload response did not include a media URL." });
        return;
      }

      onChange({
        ...block.data,
        url: mediaUrl,
      });
      setUploadState({ status: "success", mediaUrl });
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorized?.();
      }
      setUploadState({
        status: "error",
        error: error instanceof Error ? error.message : "Image upload failed.",
      });
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="admin-label">Image file</label>
        <input
          aria-label={`Image file ${block.id}`}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={(event) => {
            void handleFileSelected(event.target.files?.[0]);
            event.currentTarget.value = "";
          }}
          className="admin-input mt-1 cursor-pointer file:mr-3 file:cursor-pointer file:rounded-[8px] file:border-0 file:bg-bloomForest/12 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.08em] file:text-bloomForest"
        />
      </div>

      <p
        aria-live="polite"
        className={
          uploadState.status === "error"
            ? "rounded-[8px] border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs text-red-700"
            : uploadState.status === "success"
              ? "rounded-[8px] border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs text-emerald-700"
              : "rounded-[8px] border border-black/10 bg-white px-2.5 py-1.5 text-xs text-bloomDarkCoffee/65"
        }
      >
        {statusLabel}
      </p>

      {uploadState.status === "uploading" ? (
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-black/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={uploadState.progress ?? 0}
          aria-label="Image upload progress"
        >
          <div
            className="h-full rounded-full bg-bloomForest transition-all"
            style={{ width: `${uploadState.progress ?? 0}%` }}
          />
        </div>
      ) : null}

      {(block.data.url || uploadState.mediaUrl) ? (
        <div className="overflow-hidden rounded-[10px] border border-black/10 bg-white">
          <img
            src={block.data.url || uploadState.mediaUrl}
            alt={block.data.alt || "Uploaded block image preview"}
            className="h-44 sm:h-52 w-full object-cover"
          />
        </div>
      ) : (
        <div className="admin-empty text-xs">
          Uploaded image preview will appear here.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="admin-label">Image URL</label>
          <input
            aria-label={`Image url ${block.id}`}
            value={block.data.url}
            onChange={(event) => onChange({ ...block.data, url: event.target.value })}
            className="admin-input mt-1"
          />
        </div>
        <div>
          <label className="admin-label">Alt text</label>
          <input
            aria-label={`Image alt text ${block.id}`}
            value={block.data.alt}
            onChange={(event) => onChange({ ...block.data, alt: event.target.value })}
            className="admin-input mt-1"
          />
        </div>
      </div>

      <div>
        <label className="admin-label">Caption</label>
        <input
          aria-label={`Image caption ${block.id}`}
          value={block.data.caption}
          onChange={(event) => onChange({ ...block.data, caption: event.target.value })}
          className="admin-input mt-1"
        />
      </div>
    </div>
  );
};
