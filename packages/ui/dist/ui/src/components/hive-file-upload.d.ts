import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveFileUploadVariants: (props?: {
    variant?: "default" | "premium" | "minimal";
    state?: "success" | "error" | "idle" | "uploading" | "dragOver";
    size?: "default" | "sm" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
export interface FileUploadItem {
    id: string;
    file: File;
    name: string;
    size: number;
    type: string;
    status: 'pending' | 'uploading' | 'success' | 'error';
    progress: number;
    error?: string;
    url?: string;
    preview?: string;
}
export interface HiveFileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'>, VariantProps<typeof hiveFileUploadVariants> {
    multiple?: boolean;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
    disabled?: boolean;
    showPreview?: boolean;
    showProgress?: boolean;
    dragToReorder?: boolean;
    onFilesSelected?: (files: File[]) => void;
    onFileRemove?: (fileId: string) => void;
    onUpload?: (files: FileUploadItem[]) => Promise<void>;
    customUploadHandler?: (file: File) => Promise<{
        url: string;
        [key: string]: any;
    }>;
    allowedTypes?: string[];
    placeholder?: React.ReactNode;
    dropzoneText?: string;
    uploadText?: string;
}
declare const HiveFileUpload: React.ForwardRefExoticComponent<HiveFileUploadProps & React.RefAttributes<HTMLDivElement>>;
export declare function useHiveFileUpload(): {
    files: FileUploadItem[];
    isUploading: boolean;
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
    addFiles: (newFiles: File[]) => FileUploadItem[];
    removeFile: (fileId: string) => void;
    updateFileStatus: (fileId: string, updates: Partial<FileUploadItem>) => void;
    clearFiles: () => void;
};
export { HiveFileUpload, hiveFileUploadVariants };
//# sourceMappingURL=hive-file-upload.d.ts.map