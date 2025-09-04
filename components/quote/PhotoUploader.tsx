"use client";
import * as React from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FileState = "pending" | "uploading" | "done" | "error";

interface FileUpload {
  file: File;
  state: FileState;
  progress: number;
  error?: string;
  path?: string;
}

interface Props {
  leadId: string;
  onUploaded?: (files: { path: string; mime: string; size: number }[]) => void;
}

export function PhotoUploader({ leadId, onUploaded }: Props) {
  const [files, setFiles] = React.useState<FileUpload[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    if (selectedFiles.length === 0) return;

    // Validate files
    const validFiles = selectedFiles.filter(file => {
      if (!["image/jpeg", "image/png", "image/heic"].includes(file.type)) {
        alert(`${file.name}: Only JPG, PNG, and HEIC files are allowed`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}: File must be under 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
        file,
        state: "pending" as FileState,
        progress: 0
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFiles = async () => {
    if (files.length === 0 || isUploading) return;

    setIsUploading(true);
    
    let supabase;
    try {
      supabase = supabaseBrowser();
    } catch (err) {
      // Handle missing public keys
      const errorMsg = "Site misconfigured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel env.";
      setFiles(prev => prev.map(f => ({ ...f, state: "error", error: errorMsg })));
      setIsUploading(false);
      return;
    }

    const fileMetadata = files.map(f => ({
      name: f.file.name,
      type: f.file.type,
      size: f.file.size
    }));

    try {
      // Get presigned URLs
      const response = await fetch("/api/uploads/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, files: fileMetadata })
      });

      if (!response.ok) {
        throw new Error("Failed to get upload URLs");
      }

      const { results } = await response.json();
      
      // Upload each file
      const uploadPromises = files.map(async (fileUpload, index) => {
        const result = results[index];
        
        if (result.error) {
          setFiles(prev => prev.map((f, i) => i === index ? { ...f, state: "error", error: result.error } : f));
          return null;
        }

        setFiles(prev => prev.map((f, i) => i === index ? { ...f, state: "uploading" } : f));

        try {
          const uploadPromise = supabase.storage
            .from("lead-photos")
            .uploadToSignedUrl(result.path, result.token, fileUpload.file, {
              contentType: fileUpload.file.type,
              upsert: false
            });

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("UPLOAD_TIMEOUT")), 25000)
          );

          const { data, error } = await Promise.race([uploadPromise, timeoutPromise]) as any;

          if (error) {
            throw new Error(error.message);
          }

          setFiles(prev => prev.map((f, i) => i === index ? { 
            ...f, 
            state: "done", 
            progress: 100,
            path: result.path 
          } : f));

          return {
            path: result.path,
            mime: fileUpload.file.type,
            size: fileUpload.file.size
          };
        } catch (err) {
          const errorMessage = err instanceof Error && err.message === "UPLOAD_TIMEOUT" 
            ? "Upload failed (UPLOAD_TIMEOUT)" 
            : err instanceof Error ? err.message : "Upload failed";
          
          setFiles(prev => prev.map((f, i) => i === index ? { 
            ...f, 
            state: "error", 
            error: errorMessage 
          } : f));
          return null;
        }
      });

      const uploadResults = await Promise.all(uploadPromises);
      const successfulUploads = uploadResults.filter(Boolean) as { path: string; mime: string; size: number }[];

      if (successfulUploads.length > 0) {
        // Record uploads in database
        try {
          const recordResponse = await fetch("/api/uploads/record", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ leadId, files: successfulUploads })
          });
          
          if (recordResponse.ok) {
            onUploaded?.(successfulUploads);
          }
        } catch (err) {
          console.warn("Failed to record uploads:", err);
          // Still call onUploaded since files were uploaded successfully
          onUploaded?.(successfulUploads);
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      setFiles(prev => prev.map(f => ({ ...f, state: "error", error: "Upload failed" })));
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getStateColor = (state: FileState) => {
    switch (state) {
      case "pending": return "text-slate-500";
      case "uploading": return "text-blue-600";
      case "done": return "text-green-600";
      case "error": return "text-red-600";
      default: return "text-slate-500";
    }
  };

  const allDone = files.length > 0 && files.every(f => f.state === "done");
  const hasErrors = files.some(f => f.state === "error");

  return (
    <div className="space-y-4">
      <div>
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/heic"
          onChange={handleFileSelect}
          className="mb-2"
        />
        <p className="text-xs text-slate-500">
          Select JPG, PNG, or HEIC files. Max 5MB each. Upload 3+ photos for best pricing accuracy.
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((fileUpload, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-black/10 bg-slate-50">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{fileUpload.file.name}</div>
                <div className={`text-xs ${getStateColor(fileUpload.state)}`}>
                  {fileUpload.state === "pending" && "Ready to upload"}
                  {fileUpload.state === "uploading" && "Uploading..."}
                  {fileUpload.state === "done" && "✓ Uploaded"}
                  {fileUpload.state === "error" && `✗ ${fileUpload.error}`}
                </div>
                {fileUpload.state === "uploading" && (
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${fileUpload.progress}%` }}
                    />
                  </div>
                )}
              </div>
              {fileUpload.state === "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="ml-2"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && !allDone && (
        <Button 
          onClick={uploadFiles} 
          disabled={isUploading || files.length === 0}
          className="w-full"
        >
          {isUploading ? "Uploading..." : `Upload ${files.filter(f => f.state === "pending").length} file(s)`}
        </Button>
      )}

      {allDone && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
          <p className="text-sm text-green-800">✓ All files uploaded successfully!</p>
        </div>
      )}

      {hasErrors && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-800">Some uploads failed. You can remove failed files and try again.</p>
        </div>
      )}
    </div>
  );
}