import React from 'react';
export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    maxFiles?: number;
    preview?: boolean;
    variant?: 'default' | 'dropzone' | 'button';
    size?: 'sm' | 'md' | 'lg';
    error?: string;
    label?: string;
    helperText?: string;
    onFileSelect?: (files: FileList | null) => void;
    onFileRemove?: (index: number) => void;
    showFileList?: boolean;
}
export declare const FileInput: React.ForwardRefExoticComponent<FileInputProps & React.RefAttributes<HTMLInputElement>>;
export declare const ImageInput: React.FC<Omit<FileInputProps, 'accept' | 'preview'>>;
export declare const DocumentInput: React.FC<Omit<FileInputProps, 'accept'>>;
export declare const DropzoneInput: React.FC<Omit<FileInputProps, 'variant'>>;
export declare const ButtonFileInput: React.FC<Omit<FileInputProps, 'variant'>>;
//# sourceMappingURL=file-input.d.ts.map