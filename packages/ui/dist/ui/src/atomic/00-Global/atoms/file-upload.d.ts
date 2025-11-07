/**
 * FileUpload - Image/video upload component with drag-drop
 *
 * Features:
 * - Drag-and-drop file upload
 * - Click to upload fallback
 * - Preview thumbnail grid (1-4 files)
 * - File validation (type, size)
 * - Remove uploaded files
 * - Mobile-optimized touch targets
 *
 * Usage:
 * ```tsx
 * import { FileUpload } from '@hive/ui';
 *
 * const [files, setFiles] = useState<File[]>([]);
 *
 * <FileUpload
 *   files={files}
 *   onChange={setFiles}
 *   maxFiles={4}
 *   maxSize={10 * 1024 * 1024} // 10MB
 *   accept="image/*,video/*"
 * />
 * ```
 */
import * as React from 'react';
export interface FileUploadProps {
    /**
     * Current uploaded files
     */
    files: File[];
    /**
     * Callback when files change (add or remove)
     */
    onChange: (files: File[]) => void;
    /**
     * Maximum number of files allowed
     * @default 4
     */
    maxFiles?: number;
    /**
     * Maximum file size in bytes
     * @default 10485760 (10MB)
     */
    maxSize?: number;
    /**
     * Accepted file types (MIME types)
     * @default "image/*,video/*"
     */
    accept?: string;
    /**
     * Disabled state
     */
    disabled?: boolean;
    /**
     * Additional class names
     */
    className?: string;
    /**
     * Custom error handler
     */
    onError?: (error: string) => void;
}
export declare const FileUpload: React.ForwardRefExoticComponent<FileUploadProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=file-upload.d.ts.map