import { HiveFileUpload } from '../../components';
const meta = {
    title: '04-Hive/Hive File Upload',
    component: HiveFileUpload,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**Premium file upload component for the HIVE ecosystem**

Drag-and-drop file upload with magnetic interactions and liquid metal motion. Optimized for tool creation and campus content sharing.

## When to Use
- Adding resources to Tools in HiveLAB
- Uploading content for Space activation
- Sharing files in Builder workflows
- Profile and Space customization

## Design Principles
- **Magnetic Interactions**: Files snap into place with liquid metal physics
- **Infrastructure Feel**: Matte obsidian glass with premium upload experience
- **Builder-Optimized**: Designed for creative workflows and tool assembly
- **Campus Context**: File organization follows university content patterns

## File Types Supported
- **Images**: JPG, PNG, GIF, WebP (for Spaces and profiles)
- **Documents**: PDF, DOC, DOCX (for academic content)
- **Code**: JSON, JS, TS (for tool configurations)
- **Media**: MP4, MP3 (for rich tool experiences)

## Accessibility
- WCAG 2.1 AA compliant interactions
- Keyboard-only upload support
- Screen reader file status announcements
- Clear error messaging and recovery
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        accept: {
            control: 'text',
            description: 'Accepted file types (MIME types or extensions)'
        },
        maxSize: {
            control: 'number',
            description: 'Maximum file size in bytes'
        },
        multiple: {
            control: 'boolean',
            description: 'Allow multiple file selection'
        },
        variant: {
            control: 'select',
            options: ['default', 'compact', 'premium', 'tool-builder'],
            description: 'Upload variant optimized for different contexts'
        }
    }
};
export default meta;
export const Default = {
    args: {
        accept: 'image/*',
        maxSize: 5 * 1024 * 1024, // 5MB
        placeholder: 'Drag & drop files here, or click to browse'
    }
};
export const ToolBuilder = {
    args: {
        variant: 'tool-builder',
        accept: '.json,.js,.ts,image/*',
        multiple: true,
        maxSize: 10 * 1024 * 1024, // 10MB
        placeholder: 'Upload elements and assets for your tool',
        description: 'Supports code files, images, and configurations'
    }
};
export const SpaceAssets = {
    args: {
        variant: 'premium',
        accept: 'image/*,video/*,.pdf',
        multiple: true,
        maxSize: 25 * 1024 * 1024, // 25MB
        placeholder: 'Upload content for your Space',
        description: 'Images, videos, and documents for Space customization'
    }
};
export const ProfilePhoto = {
    args: {
        variant: 'compact',
        accept: 'image/jpeg,image/png,image/webp',
        maxSize: 2 * 1024 * 1024, // 2MB
        aspectRatio: '1:1',
        placeholder: 'Upload profile photo',
        description: 'Square images work best • Max 2MB'
    }
};
export const WithPreview = {
    args: {
        accept: 'image/*',
        maxSize: 5 * 1024 * 1024,
        showPreview: true,
        placeholder: 'Upload with instant preview',
        onFileSelect: (files) => console.log('Files selected:', files)
    }
};
export const ErrorState = {
    args: {
        accept: 'image/*',
        maxSize: 1024, // Very small limit to trigger errors
        placeholder: 'Upload will show error for large files',
        error: 'File too large. Maximum size is 1KB.'
    }
};
export const LoadingState = {
    args: {
        accept: 'image/*',
        maxSize: 5 * 1024 * 1024,
        loading: true,
        progress: 65,
        placeholder: 'Uploading your file...',
        description: 'Processing and optimizing for HIVE'
    }
};
export const SuccessState = {
    args: {
        accept: 'image/*',
        maxSize: 5 * 1024 * 1024,
        success: true,
        uploadedFiles: [
            { name: 'tool-icon.png', size: '156 KB', type: 'image/png' },
            { name: 'background.jpg', size: '2.3 MB', type: 'image/jpeg' }
        ],
        placeholder: 'Files uploaded successfully!'
    }
};
export const Interactive = {
    args: {
        accept: 'image/*,.pdf,.json',
        maxSize: 10 * 1024 * 1024,
        multiple: true,
        placeholder: 'Try dragging files here',
        onFileSelect: (files) => {
            console.log('Files selected:', Array.from(files).map(f => f.name));
        },
        onUploadProgress: (progress) => {
            console.log('Upload progress:', progress + '%');
        },
        onUploadComplete: (files) => {
            console.log('Upload complete:', files);
        }
    }
};
//# sourceMappingURL=hive-file-upload.stories.js.map