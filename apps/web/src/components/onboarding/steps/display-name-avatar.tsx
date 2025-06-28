"use client";

import { useState, useEffect, useRef } from "react";

import { Card, Button, Input, Label } from "@hive/ui";
import { useOnboardingStore } from "@/lib/stores/onboarding";
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

interface DisplayNameAvatarProps {
  onNext: (data: {
    fullName: string;
    handle: string;
    avatarUrl?: string;
  }) => void;
  data: Partial<OnboardingData>;
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
  const [fullName, setFullName] = useState(onboardingData?.fullName ?? "");
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
    if (fullName) {
      setHandle(generateHandle(fullName));
    }
  }, [fullName]);

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
      const bucket = "your-firebase-storage-bucket-name"; // TODO: Replace with your bucket name from env vars
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

    if (!validateName(fullName)) {
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

      const submissionData = {
        fullName,
        handle,
        avatarUrl: finalAvatarUrl,
      };

      await update(submissionData);
      onNext(submissionData);
    } catch (err) {
      setError("Failed to save profile. Please try again.");
      console.error("Profile save error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted mb-2">
          <span>Step 1 of 5</span>
          <span>Profile Setup</span>
        </div>
        <div className="w-full bg-surface-02 rounded-full h-1">
          <div
            className="bg-accent h-1 rounded-full transition-all duration-base"
            style={{ width: "20%" }}
          />
        </div>
      </div>

      <Card className="p-6 space-y-6 bg-surface-01 border-border/20">
        <div className="space-y-2 text-center">
          <h1 className="text-h2 font-display text-foreground">
            Welcome to HIVE
          </h1>
          <p className="text-body text-muted">
            Let&apos;s start by setting up your profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stack Card Photo Upload */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">Profile Photo</Label>

            {/* Stack Card Design */}
            <div className="relative">
              {/* Back cards (stack effect) */}
              <div className="absolute inset-0 bg-surface-02 rounded-lg transform rotate-1 translate-x-1 translate-y-1 opacity-60" />
              <div className="absolute inset-0 bg-surface-02 rounded-lg transform -rotate-1 translate-x-0.5 translate-y-0.5 opacity-80" />

              {/* Main card */}
              <div className="relative bg-surface-01 border-2 border-dashed border-border/40 rounded-lg aspect-[4/3] overflow-hidden transition-all duration-base hover:border-accent/50 hover:bg-surface-02/50">
                {avatarUrl ? (
                  <>
                    <img
                      src={avatarUrl}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute top-3 right-3 rounded-full bg-background/80 hover:bg-background p-2 transition-colors duration-fast backdrop-blur-sm"
                    >
                      <XIcon className="h-4 w-4 text-foreground" />
                    </button>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
                    <div className="rounded-full bg-surface-02 p-4">
                      <Camera className="h-8 w-8 text-accent" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="font-medium text-foreground">
                        Add your photo
                      </p>
                      <p className="text-sm text-muted">
                        JPG, PNG or GIF up to 5MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleUploadClick}
                      className="border-accent/30 text-accent hover:border-accent hover:bg-accent/10"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Photo
                    </Button>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {selectedFile && (
              <div className="flex items-center gap-2 text-sm text-muted">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>{selectedFile.name}</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your first and last name"
                className="bg-surface-02 border-border/30 focus:border-accent"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="handle" className="text-foreground font-medium">
                Username
              </Label>
              <div className="relative">
                <Input
                  id="handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.toLowerCase())}
                  placeholder="Enter your username"
                  className="bg-surface-02 border-border/30 focus:border-accent pr-10"
                  required
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  {handleAvailability.isChecking ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted" />
                  ) : handleAvailability.available === true ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : handleAvailability.available === false ? (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  ) : null}
                </div>
              </div>
              <div className="min-h-[1.25rem]">
                {handleAvailability.error ? (
                  <p className="text-sm text-red-400">
                    {handleAvailability.error}
                  </p>
                ) : handleAvailability.message ? (
                  <p
                    className={`text-sm ${
                      handleAvailability.available
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {handleAvailability.message}
                  </p>
                ) : (
                  <p className="text-sm text-muted">
                    3-20 characters, lowercase letters, numbers, and underscores
                    only
                  </p>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={
              !fullName ||
              !handle ||
              isUploading ||
              handleAvailability.isChecking ||
              handleAvailability.available === false
            }
            className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium"
          >
            {isUploading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </Card>

      {imgSrc && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-surface-01 p-4 rounded-lg">
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
              <img src={imgSrc} />
            </ReactCrop>
            <Button
              onClick={() => {
                // Here you would trigger the upload of the cropped image
                setImgSrc(""); // Close the modal
              }}
            >
              Confirm Crop
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
