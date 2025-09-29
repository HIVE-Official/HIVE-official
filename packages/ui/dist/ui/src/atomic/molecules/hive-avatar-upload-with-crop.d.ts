import React from 'react';
interface HiveAvatarUploadWithCropProps {
    currentAvatar?: string | null;
    onUpload?: (file: File, croppedImageUrl: string) => void;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    loading?: boolean;
}
export declare const HiveAvatarUploadWithCrop: React.FC<HiveAvatarUploadWithCropProps>;
export {};
//# sourceMappingURL=hive-avatar-upload-with-crop.d.ts.map