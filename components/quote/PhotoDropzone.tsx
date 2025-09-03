"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onFiles: (files: File[]) => void;
  maxFiles?: number;
};

export function PhotoDropzone({ onFiles, maxFiles = 5 }: Props) {
  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      const files: File[] = [];
      for (const f of acceptedFiles.slice(0, maxFiles)) {
        if (!f.type.startsWith("image/")) continue;
        if (f.size > 10 * 1024 * 1024) continue;
        files.push(f);
      }
      onFiles(files);
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
      {isDragActive ? <p>Drop images here…</p> : <p>Drag and drop images, or click to upload (max 10MB each)</p>}
    </div>
  );
}

