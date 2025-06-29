"use client";

import { useState, useEffect, useRef } from "react";

import { Button, Input, Label } from "@hive/ui";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import type { OnboardingState } from "@hive/core";
import { useHandleAvailability } from "@/hooks/use-handle-availability";
import {
  XIcon,
  Upload,
  Camera,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { functions } from "@/lib/firebase-client";
import { httpsCallable } from "firebase/functions";
import { env } from "@hive/core";

interface DisplayNameAvatarProps {
  onNext: (data: {
    displayName: string;
    handle: string;
    avatarUrl?: string;
  }) => void;
  data: Partial<OnboardingState>;
}

function generateHandle(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "") // Remove special characters and emojis
    .replace(/\s+/g, ".") // Replace spaces with dots
    .slice(0, 30); // Limit length
}

function validateName(name: string): boolean {
  // Check for emojis using regex
  const emojiRegex =
    /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/u;
  if (emojiRegex.test(name)) return false;

  // Check for full name (at least two words)
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return false;

  // Check for special characters
  const specialCharsRegex = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/;
  if (specialCharsRegex.test(name)) return false;

  return true;
}

export function DisplayNameAvatar({
  onNext,
  data: onboardingData,
}: DisplayNameAvatarProps) {
  const { update } = useOnboardingStore();
  const [displayName, setDisplayName] = useState(onboardingData?.displayName ?? "");
  const [handle, setHandle] = useState(onboardingData?.handle ?? "");
  const [avatarUrl, setAvatarUrl] = useState(onboardingData?.avatarUrl ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [imgSrc, setImgSrc] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Real-time handle availability checking
  const handleAvailability = useHandleAvailability(handle);

  // Update handle when name changes
  useEffect(() => {
    if (displayName) {
      setHandle(generateHandle(displayName));
    }
  }, [displayName]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setError("");

      // Create preview URL
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setAvatarUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadCroppedImage = async (): Promise<string> => {
    if (!selectedFile || !crop) {
      throw new Error("No image or crop data to upload.");
    }

    // This is a placeholder for the actual canvas cropping logic
    // In a real implementation, you would use a canvas to draw the cropped image
    // and then get the blob data.
    const croppedImageBlob = selectedFile;

    setIsUploading(true);

    try {
      const generateUploadUrl = httpsCallable(
        functions,
        "generateAvatarUploadUrl"
      );
      const uploadUrlResult = await generateUploadUrl({
        fileType: croppedImageBlob.type,
        fileSize: croppedImageBlob.size,
      });

      const { url, filePath } = uploadUrlResult.data as {
        success: boolean;
        url: string;
        filePath: string;
      };

      await fetch(url, {
        method: "PUT",
        body: croppedImageBlob,
        headers: { "Content-Type": croppedImageBlob.type },
      });

      // Construct the public URL
      const bucket = env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "demo-project.appspot.com";
      return `https://storage.googleapis.com/${bucket}/${filePath}`;
    } catch (error) {
      console.error("Upload failed", error);
      throw new Error("Could not upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateName(displayName)) {
      setError(
        "Please enter your full name (first and last) without emojis or special characters"
      );
      return;
    }

    if (!handle || handle.length < 3) {
      setError("Please enter a username with at least 3 characters");
      return;
    }

    if (handleAvailability.available === false) {
      setError("Please choose an available username");
      return;
    }

    if (handleAvailability.isChecking) {
      setError("Please wait while we check username availability");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      let finalAvatarUrl = avatarUrl;

      // Upload file if selected
      if (selectedFile) {
        finalAvatarUrl = await uploadCroppedImage();
      }

      const updatedData = {
        displayName,
        handle,
        avatarUrl: finalAvatarUrl,
      };

      // Update the store
      update(updatedData);

      // Call onNext with the data
      onNext(updatedData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <div className="w-full max-w-lg bg-surface border border-border rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-medium text-foreground">
            Create Your Profile
          </h2>
          <p className="text-muted font-sans">
            Tell us about yourself to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {avatarUrl || selectedFile ? (
                <div className="relative">
                  <img
                    src={avatarUrl || (selectedFile ? URL.createObjectURL(selectedFile) : "")}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-border"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-surface-02 border border-border rounded-full flex items-center justify-center text-muted hover:text-accent transition-colors"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 bg-surface-01 border-2 border-dashed border-border rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-muted" />
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleUploadClick}
                className="flex items-center space-x-2 px-3 py-2 bg-surface-01 border border-accent text-accent rounded-lg hover:bg-accent/5 transition-colors text-sm"
              >
                <Camera className="w-4 h-4" />
                <span>{avatarUrl || selectedFile ? "Change" : "Add Photo"}</span>
              </button>
              
              {(avatarUrl || selectedFile) && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-3 py-2 text-muted hover:text-accent transition-colors text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground font-medium">Full Name</Label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-surface-01 border-border text-foreground placeholder:text-muted"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">Username</Label>
              <div className="relative">
                <Input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.toLowerCase())}
                  placeholder="username"
                  className="bg-surface-01 border-border text-foreground placeholder:text-muted pl-8"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
                  @
                </span>
              </div>
              
              {/* Handle availability feedback */}
              {handle.length >= 3 && (
                <div className="flex items-center space-x-2 text-sm">
                  {handleAvailability.isChecking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-muted" />
                      <span className="text-muted">Checking availability...</span>
                    </>
                  ) : handleAvailability.available === true ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span className="text-accent">@{handle} is available</span>
                    </>
                  ) : handleAvailability.available === false ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-muted" />
                      <span className="text-muted">@{handle} is taken</span>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-surface-02 border border-border rounded-lg">
              <p className="text-sm text-muted">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={
              !displayName ||
              !handle ||
              handle.length < 3 ||
              handleAvailability.isChecking ||
              handleAvailability.available === false ||
              isUploading
            }
            className="w-full bg-accent text-background font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        {/* Image Cropping Modal */}
        {selectedFile && imgSrc && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-surface border border-border rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-foreground mb-4">Crop Your Photo</h3>
              
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                className="mb-4"
              >
                <img src={imgSrc} alt="Crop preview" className="max-w-full" />
              </ReactCrop>
              
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    setSelectedFile(null);
                    setImgSrc("");
                  }}
                  variant="outline"
                  className="flex-1 bg-surface-01 border-border text-foreground hover:bg-surface-02"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Handle crop save
                    setSelectedFile(null);
                    setImgSrc("");
                  }}
                  className="flex-1 bg-accent text-background hover:bg-accent/90"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
