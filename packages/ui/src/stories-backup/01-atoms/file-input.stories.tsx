import type { Meta, StoryObj } from '@storybook/react';
import { FileInput, ImageInput, DocumentInput, DropzoneInput, ButtonFileInput } from '../../atomic/atoms/file-input';
import { useState } from 'react';

const meta: Meta<typeof FileInput> = {
  title: '01-Atoms/File Input',
  component: FileInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE file input component with drag-and-drop support, file validation, previews, and campus-specific use cases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted file types',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files',
    },
    preview: {
      control: 'boolean',
      description: 'Show image previews',
    },
    variant: {
      control: 'select',
      options: ['default', 'dropzone', 'button'],
      description: 'Input variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    showFileList: {
      control: 'boolean',
      description: 'Show selected files list',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    label: 'Upload Files',
    helperText: 'Select files to upload',
  },
};

export const Dropzone: Story = {
  args: {
    variant: 'dropzone',
    label: 'Drag & Drop Files',
    helperText: 'Drag files here or click to browse',
  },
};

export const Button: Story = {
  args: {
    variant: 'button',
    label: 'Upload Button',
    helperText: 'Click button to select files',
  },
};

export const WithPreview: Story = {
  args: {
    accept: 'image/*',
    preview: true,
    multiple: true,
    label: 'Upload Images',
    helperText: 'Images will show preview thumbnails',
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 p-4 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Default Variant</h3>
        <FileInput
          label="Default File Input"
          helperText="Click to upload or drag and drop"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Dropzone Variant</h3>
        <FileInput
          variant="dropzone"
          label="Dropzone Input"
          helperText="Large drag and drop area"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Button Variant</h3>
        <FileInput
          variant="button"
          label="Button Input"
          helperText="Simple button to select files"
        />
      </div>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 p-4 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Small Size</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FileInput size="sm" label="Small Default" />
          <FileInput variant="dropzone" size="sm" label="Small Dropzone" />
          <FileInput variant="button" size="sm" label="Small Button" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Medium Size</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FileInput size="md" label="Medium Default" />
          <FileInput variant="dropzone" size="md" label="Medium Dropzone" />
          <FileInput variant="button" size="md" label="Medium Button" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Large Size</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FileInput size="lg" label="Large Default" />
          <FileInput variant="dropzone" size="lg" label="Large Dropzone" />
          <FileInput variant="button" size="lg" label="Large Button" />
        </div>
      </div>
    </div>
  ),
};

// Campus file upload scenarios
export const CampusFileUploadScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Profile Setup</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4">Profile Picture</h4>
              <ImageInput
                variant="dropzone"
                size="sm"
                maxSize={5 * 1024 * 1024} // 5MB
                label="Upload Profile Picture"
                helperText="Upload a square image for best results. Max 5MB."
                preview
              />
            </div>
            
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4">Academic Documents</h4>
              <DocumentInput
                variant="dropzone"
                multiple
                maxFiles={3}
                maxSize={10 * 1024 * 1024} // 10MB
                label="Upload Transcripts"
                helperText="Upload official transcripts (PDF format preferred). Max 3 files, 10MB each."
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Development</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Tool Assets</h4>
            <FileInput
              accept="image/*,.js,.css,.html"
              multiple
              maxFiles={10}
              preview
              label="Upload Tool Files"
              helperText="Images, JS, CSS, and HTML files"
              showFileList
            />
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Documentation</h4>
            <FileInput
              accept=".md,.txt,.pdf"
              multiple
              maxFiles={5}
              variant="button"
              label="Upload Documentation"
              helperText="Markdown, text, or PDF files"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Resources</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="font-semibold text-hive-text-primary">CS 101 Study Materials</h4>
            <p className="text-sm text-hive-text-secondary">Share notes, assignments, and study guides with your group</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FileInput
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                multiple
                maxFiles={5}
                maxSize={25 * 1024 * 1024} // 25MB
                label="Study Notes & Slides"
                helperText="PDF, Word, or PowerPoint files. Max 25MB each."
              />
            </div>
            
            <div>
              <ImageInput
                multiple
                maxFiles={10}
                maxSize={10 * 1024 * 1024} // 10MB
                variant="dropzone"
                size="sm"
                label="Photos & Diagrams"
                helperText="Whiteboard photos, diagrams, charts. Max 10MB each."
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Assignment Submission</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="font-semibold text-hive-text-primary">CS 101 - Final Project</h4>
            <p className="text-sm text-hive-text-secondary">Submit your project files and documentation</p>
            <div className="flex items-center space-x-4 text-xs text-hive-text-mutedLight mt-2">
              <span>Due: Dec 15, 2024 11:59 PM</span>
              <span>•</span>
              <span>Max 100MB total</span>
            </div>
          </div>
          
          <FileInput
            multiple
            maxFiles={20}
            maxSize={100 * 1024 * 1024} // 100MB
            variant="dropzone"
            label="Project Files"
            helperText="Upload all project files including source code, documentation, and assets"
            accept=".js,.html,.css,.json,.md,.txt,.pdf,.png,.jpg,.gif"
          />
          
          <div className="mt-4 p-3 bg-hive-surface-elevated rounded-lg">
            <p className="text-sm text-hive-text-primary font-medium mb-1">Submission Guidelines:</p>
            <ul className="text-xs text-hive-text-secondary space-y-1">
              <li>• Include a README.md file with setup instructions</li>
              <li>• Compress large projects into a ZIP file</li>
              <li>• Test all files before submission</li>
              <li>• Late submissions will receive a grade penalty</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus Event Photos</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="font-semibold text-hive-text-primary">Hackathon 2024 - Photo Submissions</h4>
            <p className="text-sm text-hive-text-secondary">Share your favorite moments from the event</p>
          </div>
          
          <ImageInput
            multiple
            maxFiles={15}
            maxSize={20 * 1024 * 1024} // 20MB
            variant="dropzone"
            size="lg"
            label="Upload Event Photos"
            helperText="High-quality photos from the hackathon. Max 15 photos, 20MB each."
          />
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-hive-text-secondary">Photos will be reviewed before posting to the campus gallery</span>
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Submit Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// File type specific examples
export const FileTypeSpecificExamples: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Image Files</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageInput
            label="Profile Picture"
            helperText="JPG, PNG, or GIF. Max 5MB."
            maxSize={5 * 1024 * 1024}
          />
          
          <ImageInput
            multiple
            variant="dropzone"
            size="sm"
            label="Photo Gallery"
            helperText="Multiple images with preview"
            maxFiles={10}
            maxSize={10 * 1024 * 1024}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Document Files</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DocumentInput
            label="Resume Upload"
            helperText="PDF, DOC, or DOCX format"
            maxSize={5 * 1024 * 1024}
          />
          
          <DocumentInput
            multiple
            variant="button"
            label="Course Materials"
            helperText="Multiple documents allowed"
            maxFiles={5}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Code Files</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileInput
            accept=".js,.ts,.jsx,.tsx,.html,.css"
            multiple
            label="Web Development Files"
            helperText="JavaScript, TypeScript, HTML, CSS"
          />
          
          <FileInput
            accept=".py,.java,.cpp,.c,.h"
            multiple
            variant="dropzone"
            size="sm"
            label="Programming Files"
            helperText="Python, Java, C/C++ files"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Media Files</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileInput
            accept="video/*"
            label="Video Upload"
            helperText="MP4, MOV, AVI formats"
            maxSize={100 * 1024 * 1024} // 100MB
          />
          
          <FileInput
            accept="audio/*"
            multiple
            variant="button"
            label="Audio Files"
            helperText="MP3, WAV, OGG formats"
            maxSize={50 * 1024 * 1024} // 50MB
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive file management
export const InteractiveFileManagement: Story = {
  render: () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

    const handleFileSelect = (selectedFiles: FileList | null) => {
      setFiles(selectedFiles);
      
      // Simulate upload progress
      if (selectedFiles) {
        Array.from(selectedFiles).forEach((file, index) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
              progress = 100;
              clearInterval(interval);
            }
            setUploadProgress(prev => ({
              ...prev,
              [`${file.name}-${index}`]: progress
            }));
          }, 200);
        });
      }
    };

    return (
      <div className="space-y-6 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Upload Demo</h3>
          <p className="text-sm text-hive-text-secondary mb-4">
            Upload files to see progress simulation and file management
          </p>
          
          <FileInput
            multiple
            variant="dropzone"
            accept="image/*,.pdf,.doc,.docx"
            maxFiles={5}
            maxSize={10 * 1024 * 1024}
            label="Upload Files"
            helperText="Images and documents. Max 5 files, 10MB each."
            onFileSelect={handleFileSelect}
            preview
          />
        </div>

        {files && files.length > 0 && (
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-3">Upload Progress</h4>
            <div className="space-y-3">
              {Array.from(files).map((file, index) => {
                const key = `${file.name}-${index}`;
                const progress = uploadProgress[key] || 0;
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-primary truncate">{file.name}</span>
                      <span className="text-xs text-hive-text-secondary">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-hive-background-tertiary rounded-full h-2">
                      <div 
                        className="bg-hive-gold h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
};

// Error states and validation
export const ErrorStatesAndValidation: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Validation Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileInput
            accept="image/*"
            maxSize={1024} // Very small limit for demo
            label="Size Validation"
            helperText="Max 1KB (will trigger size error)"
            error="File size too large"
          />
          
          <FileInput
            accept=".pdf"
            maxFiles={1}
            label="File Type Validation"
            helperText="PDF files only"
            error="Invalid file type"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Disabled State</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FileInput
            disabled
            label="Disabled Default"
            helperText="Upload not available"
          />
          
          <FileInput
            disabled
            variant="dropzone"
            size="sm"
            label="Disabled Dropzone"
            helperText="Drag & drop disabled"
          />
          
          <FileInput
            disabled
            variant="button"
            label="Disabled Button"
            helperText="Button disabled"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Form Integration</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <form className="space-y-4">
            <div>
              <FileInput
                name="assignment"
                accept=".pdf,.doc,.docx"
                required
                label="Assignment Submission *"
                helperText="Required field - PDF or Word document"
              />
            </div>
            
            <div>
              <FileInput
                name="supplementary"
                multiple
                accept="image/*,.txt"
                label="Supplementary Materials"
                helperText="Optional - Images or text files"
              />
            </div>
            
            <div className="flex space-x-3">
              <button 
                type="submit" 
                className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors"
              >
                Submit Assignment
              </button>
              <button 
                type="button" 
                className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors"
              >
                Save Draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ),
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Image Input Preset</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageInput
            label="Single Image"
            helperText="Automatically configured for images with preview"
          />
          
          <ImageInput
            multiple
            variant="dropzone"
            size="sm"
            label="Multiple Images"
            helperText="Multiple image upload with thumbnails"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Document Input Preset</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DocumentInput
            label="Single Document"
            helperText="PDF, Word, and text documents"
          />
          
          <DocumentInput
            multiple
            variant="button"
            label="Multiple Documents"
            helperText="Multiple document upload"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Variant Presets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DropzoneInput
            label="Dropzone Preset"
            helperText="Always uses dropzone variant"
          />
          
          <ButtonFileInput
            label="Button Preset"
            helperText="Always uses button variant"
          />
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    label: 'Interactive File Input - Use controls to customize →',
    helperText: 'Select files to test different configurations',
    variant: 'dropzone',
    size: 'md',
    multiple: false,
    preview: false,
    showFileList: true,
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 3,
  },
};