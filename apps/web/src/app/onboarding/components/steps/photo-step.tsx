import { useState, useRef } from "react";
import { MotionDiv } from "@hive/ui";
import { Camera, Upload, User, X } from "lucide-react";
import { Button } from "@hive/ui";
import type { OnboardingData } from "../onboarding-wizard";

interface PhotoStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function PhotoStep({ data, updateData, onNext }: PhotoStepProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);

      // For now, just use the preview URL
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      updateData({ profilePhoto: previewUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void handleFileSelect(file).catch(console.error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      void handleFileSelect(file).catch(console.error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removePhoto = () => {
    if (data.profilePhoto) {
      URL.revokeObjectURL(data.profilePhoto);
    }
    updateData({ profilePhoto: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <MotionDiv
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
          <Camera className="w-8 h-8 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">Add a profile photo</h2>
        <p className="text-zinc-400">
          Help classmates recognize you! This step is optional.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Photo Preview */}
          <div className="relative">
            {data.profilePhoto ? (
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.profilePhoto}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-zinc-800 border-4 border-zinc-700 flex items-center justify-center">
                <User className="w-12 h-12 text-zinc-500" />
              </div>
            )}
          </div>

          {/* Upload Area */}
          {!data.profilePhoto && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-md"
            >
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-yellow-500 bg-yellow-500/10"
                    : "border-zinc-700 hover:border-zinc-600"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Upload a photo
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Drag and drop an image, or click to browse
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                >
                  {isUploading ? "Uploading..." : "Choose File"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            </MotionDiv>
          )}
        </div>

        <div className="bg-zinc-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-2">
            Photo Guidelines
          </h4>
          <ul className="text-xs text-zinc-400 space-y-1">
            <li>• Use a clear photo of yourself</li>
            <li>• JPG, PNG, or GIF format</li>
            <li>• Maximum file size: 5MB</li>
            <li>• Square photos work best</li>
          </ul>
        </div>
      </form>
    </MotionDiv>
  );
}
