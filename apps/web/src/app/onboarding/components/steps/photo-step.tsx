import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@hive/ui';
import { OnboardingData } from '../onboarding-wizard';

interface PhotoStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function PhotoStep({ data, updateData, onNext }: PhotoStepProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image must be smaller than 5MB');
      return;
    }

    setIsUploading(true);
    
    try {
      // Convert to base64 for preview (in a real app, you'd upload to a storage service)
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateData({ profilePhoto: result });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const removePhoto = () => {
    updateData({ profilePhoto: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
          <Camera className="w-8 h-8 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          Add a profile photo
        </h2>
        <p className="text-zinc-400">
          Help classmates recognize you! You can always change this later.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Upload Area */}
        <div className="space-y-4">
          {data.profilePhoto ? (
            /* Photo Preview */
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.profilePhoto}
                  alt="Profile preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-zinc-700"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Looking good! You can upload a different photo if you&apos;d like.
              </p>
            </div>
          ) : (
            /* Upload Area */
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-zinc-600 hover:border-zinc-500'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-zinc-700 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-zinc-400" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    Drop your photo here, or{' '}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-yellow-500 hover:text-yellow-400 underline"
                    >
                      browse files
                    </button>
                  </p>
                  <p className="text-sm text-zinc-400 mt-2">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Upload Button */}
          {!data.profilePhoto && (
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
              >
                {isUploading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Choose Photo
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="bg-zinc-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-2">
            Optional Step
          </h4>
          <p className="text-xs text-zinc-400">
            You can skip this step and add a photo later from your profile settings. We&apos;ll use a default avatar for now.
          </p>
        </div>
      </form>
    </motion.div>
  );
} 