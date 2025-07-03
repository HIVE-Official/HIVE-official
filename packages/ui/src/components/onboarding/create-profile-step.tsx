import React, { useRef } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Upload,
  Camera,
  XIcon,
} from 'lucide-react';
import { Checkbox } from '../checkbox';

export interface CreateProfileStepProps {
  displayName: string;
  onDisplayNameChange: (value: string) => void;
  handle: string;
  onHandleChange: (value: string) => void;
  handleAvailability: {
    isChecking: boolean;
    available: boolean | null;
  };
  avatarUrl?: string;
  onFileSelect: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  isUploading: boolean;
  error?: string;
  selectedFile: File | null;
  termsAccepted: boolean;
  onTermsAcceptedChange: (checked: boolean) => void;
}

export const CreateProfileStep: React.FC<CreateProfileStepProps> = ({
  displayName,
  onDisplayNameChange,
  handle,
  onHandleChange,
  handleAvailability,
  avatarUrl,
  onFileSelect,
  onSubmit,
  isUploading,
  error,
  selectedFile,
  termsAccepted,
  onTermsAcceptedChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-lg bg-surface border border-border rounded-lg p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display font-medium text-foreground">
          Create Your Profile
        </h2>
        <p className="text-muted font-sans">
          Tell us about yourself to get started
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {avatarUrl || selectedFile ? (
              <div className="relative">
                <img
                  src={avatarUrl || (selectedFile ? URL.createObjectURL(selectedFile) : "")}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full object-cover border-2 border-border"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-surface-02 border border-border rounded-full flex items-center justify-center text-muted hover:text-accent transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={handleUploadClick}
                className="w-20 h-20 rounded-full bg-surface-01 border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-surface-02 transition-colors"
              >
                <Camera className="w-8 h-8 text-muted" />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
              className="hidden"
              accept="image/*"
            />
          </div>
          <Button type="button" variant="outline" size="sm" onClick={handleUploadClick}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="displayName">Full Name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => onDisplayNameChange(e.target.value)}
            placeholder="Ada Lovelace"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="handle">Username</Label>
          <div className="relative">
            <Input
              id="handle"
              value={handle}
              onChange={(e) => onHandleChange(e.target.value)}
              placeholder="ada.lovelace"
              required
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {handleAvailability.isChecking && <Loader2 className="h-5 w-5 animate-spin text-muted" />}
              {handleAvailability.available === true && <CheckCircle className="h-5 w-5 text-green-500" />}
              {handleAvailability.available === false && <AlertCircle className="h-5 w-5 text-red-500" />}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox id="terms" checked={termsAccepted} onCheckedChange={onTermsAcceptedChange} className="mt-1" />
          <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground leading-normal">
            I agree to the{' '}
            <a href="/legal/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
              Privacy Policy
            </a>
            .
          </Label>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={isUploading || !termsAccepted}>
          {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue'}
        </Button>
      </form>
    </div>
  );
}; 