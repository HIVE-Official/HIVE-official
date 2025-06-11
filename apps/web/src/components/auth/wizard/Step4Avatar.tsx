'use client';

import { useState } from "react";
import { Upload, User, Loader2 } from "lucide-react";
import Image from "next/image";

interface Step4AvatarProps {
  formData: {
    avatar: File | null;
  };
  updateFormData: (field: string, value: File | null) => void;
}

export function Step4Avatar({ formData, updateFormData }: Step4AvatarProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            // In a real app, you'd trigger an upload here.
            // For now, we'll just show a preview and store the file object.
            setUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                updateFormData('avatar', file);
                setUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSkip = () => {
        updateFormData('avatar', null);
        // This would typically trigger moving to the next step
        console.log("Skipped avatar upload");
    }

    return (
        <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold">Add a photo</h2>
            <p className="text-muted">Or skip this step for now.</p>
            
            <div className="flex justify-center items-center">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="w-32 h-32 rounded-full bg-card border-2 border-dashed border-border flex flex-col items-center justify-center text-muted hover:border-accent-gold hover:text-primary transition-colors">
                        {uploading ? (
                             <Loader2 className="h-8 w-8 animate-spin" />
                        ) : preview ? (
                            <Image src={preview} alt="Avatar Preview" width={128} height={128} className="rounded-full object-cover w-full h-full" />
                        ) : (
                            <>
                                <User className="h-8 w-8 mb-2" />
                                <span>Upload</span>
                            </>
                        )}
                    </div>
                </label>
                <input id="avatar-upload" type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleFileChange} />
            </div>

             <button onClick={handleSkip} className="text-sm text-muted hover:underline">
                I'll add one later
            </button>
        </div>
    );
} 