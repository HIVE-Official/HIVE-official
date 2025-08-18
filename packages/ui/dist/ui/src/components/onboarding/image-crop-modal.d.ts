import React from 'react';
interface ImageCropModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageFile: File | null;
    onCropComplete: (croppedFile: File) => void;
}
export declare const ImageCropModal: React.FC<ImageCropModalProps>;
export {};
//# sourceMappingURL=image-crop-modal.d.ts.map