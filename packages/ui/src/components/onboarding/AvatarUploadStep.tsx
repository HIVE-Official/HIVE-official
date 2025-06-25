"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, User } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Input,
} from "..";

interface AvatarUploadStepProps {
  onNext: () => void;
  onSubmit?: (file: File | null) => Promise<void>;
  onSkip?: () => void;
}

export const AvatarUploadStep = ({
  onNext,
  onSubmit,
  onSkip,
}: AvatarUploadStepProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(file);
      }
      onNext();
    } catch (error) {
      console.error("Failed to save avatar", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
    onNext();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Upload Your Avatar</CardTitle>
          <CardDescription className="text-zinc-400">
            Add a profile picture to personalize your account. You can always
            change this later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview Area */}
          <div className="w-48 h-48 mx-auto bg-zinc-800 rounded-full flex items-center justify-center border-2 border-dashed border-zinc-700 overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-zinc-500" />
            )}
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-yellow-500 bg-yellow-500/10"
                : "border-zinc-700 hover:border-zinc-600"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleUploadClick}
          >
            <Upload className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
            <p className="text-zinc-400 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-zinc-500">PNG, JPG, GIF up to 10MB</p>

            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />
          </div>

          {file && (
            <div className="bg-zinc-800 rounded-lg p-3">
              <p className="text-sm text-zinc-300">Selected: {file.name}</p>
              <p className="text-xs text-zinc-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full border-zinc-700 text-white hover:bg-zinc-800"
            >
              Skip for now
            </Button>
            <Button
              onClick={handleSubmit}
              className="w-full bg-white text-black hover:bg-zinc-100"
              disabled={!file || isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save and Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
