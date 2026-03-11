export const UPLOAD_STATUS = [
  "idle",
  "validating",
  "compressing",
  "uploading",
  "success",
  "error",
] as const;

export type UploadStatus = (typeof UPLOAD_STATUS)[number];

export type UploadState = {
  status: UploadStatus;
  error?: string;
  progress?: number;
  mediaUrl?: string;
};

export const DEFAULT_UPLOAD_STATE: UploadState = {
  status: "idle",
};

