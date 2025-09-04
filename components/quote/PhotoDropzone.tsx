"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onFiles: (files: File[]) => void;
  maxFiles?: number;
};

type UploadedFile = {
  file: File;
  url: string;
  path: string;
};

export function PhotoDropzone({ onFiles, maxFiles = 5 }: Props) {
  const [isUploading, setIsUploading] = React.useState(false);

  const uploadToSupabase = async (file: File): Promise<UploadedFile> => {
    const presignResponse = await fetch("/api/uploads/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType: file.type }),
    });

    if (!presignResponse.ok) {
      const error = await presignResponse.json();
      throw new Error(error.error || "Failed to get upload URL");
    }

    const { url, path } = await presignResponse.json();

    const uploadResponse = await fetch(url, {
      method: "PUT",
      headers: { 
        "Content-Type": file.type,
        "x-upsert": "true"
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file");
    }

    return { file, url, path };
  };

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      const validFiles: File[] = [];
      for (const f of acceptedFiles.slice(0, maxFiles)) {
        if (!f.type.startsWith("image/")) continue;
        if (f.size > 10 * 1024 * 1024) continue;
        validFiles.push(f);
      }

      if (validFiles.length === 0) return;

      setIsUploading(true);
      try {
        const uploadedFiles = await Promise.all(
          validFiles.map(file => uploadToSupabase(file))
        );
        onFiles(uploadedFiles.map(uf => uf.file));
      } catch (error) {
        console.error("Upload failed:", error);
        onFiles(validFiles);
      } finally {
        setIsUploading(false);
      }
    },
    [onFiles, maxFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "image/*": [] }, multiple: true });

  return (
    <div
      {...getRootProps()}
      className="rounded-2xl border border-dashed border-black/15 p-6 text-sm text-slate-600 bg-white hover:bg-black/[0.02] cursor-pointer"
      aria-label="Upload panel photos"
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <p>Uploading images...</p>
      ) : isDragActive ? (
        <p>Drop images here…</p>
      ) : (
        <p>Drag and drop images, or click to upload (max 10MB each)</p>
      )}
    </div>
  );
}

