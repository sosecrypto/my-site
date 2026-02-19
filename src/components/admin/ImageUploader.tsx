"use client";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  bucket?: string;
}

export default function ImageUploader({
  onUpload,
  bucket = "blog-images",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      onUpload(urlData.publicUrl);
    } catch {
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border
          text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30
          font-mono text-xs transition-all disabled:opacity-50"
      >
        <Upload size={14} />
        {uploading ? "업로드 중..." : "이미지 업로드"}
      </button>
    </div>
  );
}
