import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileInput, ImageInput, DocumentInput, DropzoneInput, ButtonFileInput } from './file-input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { Upload, Image as ImageIcon, FileText, File } from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta<typeof FileInput> = {
  title: '01-Atoms/File Input - COMPLETE DEFINITION',
  component: FileInput,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE File Input - Complete Component Definition;
**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most advanced file upload system for University at Buffalo academic document and media management.

### 🏆 **COMPONENT EXCELLENCE**
- **3 Visual Variants** - Default, dropzone, button for different upload contexts;
- **3 Size Options** - Small, medium, large for flexible interface integration;
- **Smart File Handling** - Drag & drop, file validation, preview generation;
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and interactions;
- **Image Preview Support** - Automatic image previews with file management;
- **Comprehensive Validation** - File size, type, count limits with clear error messaging;
- **Academic File Types** - Built-in presets for academic documents and media;
- **Mobile Optimized** - Touch-friendly file selection and management;
### 🎓 **UB ACADEMIC CONTEXT**
Perfect for University at Buffalo academic file management:
- **Assignment Submissions** - Papers, projects, lab reports, presentations;
- **Research Materials** - Data files, images, documentation, references;
- **Profile Media** - Profile photos, portfolio items, academic achievements;
- **Course Resources** - Syllabi, readings, study materials, notes;
- **Administrative Documents** - Transcripts, forms, applications, certificates;
- **Collaboration Files** - Group project assets, shared resources;
### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Targets** - Large drop zones and buttons for mobile interaction;
- **Responsive File Lists** - Scrollable, organized file management on small screens;
- **Clear Visual Feedback** - Distinct states for drag operations and uploads;
- **Accessible Controls** - Keyboard navigation and screen reader support;
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dropzone', 'button'],
      description: 'File input visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'File input size',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    preview: {
      control: 'boolean',
      description: 'Show image previews',
    },
    showFileList: {
      control: 'boolean',
      description: 'Show selected files list',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

// Default file input showcase;
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    accept: '.pdf,.doc,.docx,.txt',
    multiple: false,
    preview: false,
    showFileList: true,
    disabled: false,
    label: 'Upload Assignment',
    helperText: 'Select your assignment file (PDF, DOC, DOCX, TXT)',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Submit your assignment using the file upload below:
          </Text>
          <FileInput {...args} />
          <Text variant="body-sm" color="secondary">
            Standard file input for University at Buffalo assignment submissions;
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase;
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">📂 VARIANTS</Badge>
            File Input Variants - Upload Interfaces;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 visual variants for different file upload contexts and user interface patterns;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Default Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Standard File Upload:</Text>
                  <FileInput
                    variant="default"
                    label="Course Assignment"
                    accept=".pdf,.doc,.docx"
                    helperText="Upload your assignment in PDF or DOC format"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">With Multiple Files:</Text>
                  <FileInput
                    variant="default"
                    label="Research Materials"
                    accept=".pdf,.txt,.docx"
                    multiple
                    helperText="Select multiple research documents"
                  />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Dropzone Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large Upload Area:</Text>
                  <DropzoneInput
                    label="Project Files"
                    accept=".zip,.rar,.pdf,.docx"
                    multiple
                    helperText="Drag and drop your project files here"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Image Upload with Preview:</Text>
                  <ImageInput
                    variant="dropzone"
                    label="Portfolio Images"
                    multiple
                    preview
                    helperText="Upload images for your academic portfolio"
                  />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Button Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Compact Button Upload:</Text>
                  <div className="flex items-center gap-4">
                    <ButtonFileInput
                      accept=".pdf"
                      helperText="Choose PDF file"
                    />
                    <Text variant="body-sm" color="secondary">
                      Quick file selection for forms and modals;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Profile Photo Upload:</Text>
                  <div className="flex items-center gap-4">
                    <ImageInput
                      variant="button"
                      preview
                      accept="image/*"
                      helperText="Select profile photo"
                    />
                    <Text variant="body-sm" color="secondary">
                      Upload your UB student photo;
                    </Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 SIZES</Badge>
            File Input Sizes - Interface Integration;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes for seamless integration with different interface contexts and space constraints;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Comparison:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (sm):</Text>
                  <div className="grid md:grid-cols-3 gap-4">
                    <FileInput
                      size="sm"
                      variant="button"
                      label="Quick Upload"
                      accept=".txt"
                    />
                    <FileInput
                      size="sm"
                      variant="default"
                      label="Notes"
                      accept=".txt,.md"
                    />
                    <DropzoneInput
                      size="sm"
                      label="Attachments"
                      accept=".pdf"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (md - default):</Text>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FileInput
                      size="md"
                      variant="default"
                      label="Assignment Submission"
                      accept=".pdf,.docx"
                      helperText="Standard assignment upload"
                    />
                    <DropzoneInput;
                      size="md"
                      label="Research Documents"
                      accept=".pdf,.txt,.docx"
                      multiple;
                      helperText="Multiple academic documents"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (lg):</Text>
                  <div className="space-y-4">
                    <DropzoneInput;
                      size="lg"
                      label="Thesis Upload"
                      accept=".pdf,.docx"
                      helperText="Upload your thesis document"
                    />
                    <ImageInput;
                      size="lg"
                      variant="dropzone"
                      label="Portfolio Gallery"
                      multiple;
                      preview;
                      helperText="Upload high-resolution portfolio images"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* File Type Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">📄 FILE TYPES</Badge>
            File Type Support - Academic Documents;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive file type support for University at Buffalo academic workflows;
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Document Types:</h4>
              
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Papers:</Text>
                  <DocumentInput;
                    label="Research Paper"
                    helperText="PDF, DOC, DOCX, TXT, RTF"
                  />
                </div>
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Spreadsheets & Data:</Text>
                  <FileInput;
                    label="Data Analysis"
                    accept=".xlsx,.xls,.csv,.json"
                    helperText="Excel files and CSV data"
                  />
                </div>
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Presentations:</Text>
                  <FileInput;
                    label="Class Presentation"
                    accept=".pptx,.ppt,.pdf"
                    helperText="PowerPoint and PDF presentations"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Media Types:</h4>
              
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Images:</Text>
                  <ImageInput;
                    label="Portfolio Images"
                    multiple;
                    preview;
                    helperText="JPG, PNG, GIF, WebP images"
                  />
                </div>
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Audio/Video:</Text>
                  <FileInput;
                    label="Presentation Recording"
                    accept=".mp4,.mp3,.wav,.m4a"
                    helperText="Audio and video recordings"
                  />
                </div>
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Archives:</Text>
                  <FileInput;
                    label="Project Archive"
                    accept=".zip,.rar,.7z,.tar.gz"
                    helperText="Compressed project files"
                  />
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Features Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">⚡ FEATURES</Badge>
            Advanced Features - File Management;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced file handling features for comprehensive academic file management;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Image Preview:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Automatic Image Previews:</Text>
                  <ImageInput;
                    variant="dropzone"
                    label="Lab Results Images"
                    multiple;
                    preview;
                    maxSize={5 * 1024 * 1024} // 5MB;
                    helperText="Upload lab result images (max 5MB each)"
                  />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">File Validation:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Size Limits:</Text>
                  <FileInput;
                    variant="dropzone"
                    label="Thesis Draft"
                    accept=".pdf,.docx"
                    maxSize={10 * 1024 * 1024} // 10MB;
                    helperText="Maximum file size: 10MB"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">File Count Limits:</Text>
                  <FileInput;
                    variant="dropzone"
                    label="Supporting Documents"
                    accept=".pdf,.jpg,.png"
                    multiple;
                    maxFiles={5}
                    preview;
                    helperText="Upload up to 5 supporting documents"
                  />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Normal State:</Text>
                  <FileInput;
                    variant="dropzone"
                    label="Normal Upload"
                    accept=".pdf"
                    helperText="Ready for file upload"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Error State:</Text>
                  <FileInput;
                    variant="dropzone"
                    label="Upload with Error"
                    accept=".pdf"
                    error="File size exceeds 10MB limit"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Disabled State:</Text>
                  <FileInput;
                    variant="dropzone"
                    label="Disabled Upload"
                    accept=".pdf"
                    disabled;
                    helperText="Upload is currently disabled"
                  />
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* UB Academic Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Academic File Upload Scenarios;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            File upload usage in actual University at Buffalo academic and administrative contexts;
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Assignment Submission */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Assignment Submission:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 - Algorithm Analysis Assignment 3
                </Text>
                
                <Text variant="body-md" color="primary">
                  Submit your completed assignment including source code, report, and analysis documentation.
                </Text>
                
                <div className="space-y-4">
                  <FileInput;
                    variant="dropzone"
                    label="Assignment Files"
                    accept=".pdf,.py,.java,.cpp,.txt,.md"
                    multiple;
                    maxFiles={10}
                    maxSize={25 * 1024 * 1024} // 25MB;
                    helperText="Upload source code, report (PDF), and documentation (max 25MB total)"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Due: March 15, 2024</Badge>
                  <Badge variant="outline">Max Files: 10</Badge>
                  <Badge variant="outline">Accepted: PDF, Python, Java, C++</Badge>
                </div>

              </div>

            </div>
          </div>

          {/* Research Project Upload */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Research Project Submission:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Research Paper:</Text>
                  <DocumentInput;
                    variant="dropzone"
                    label="Final Research Paper"
                    maxSize={50 * 1024 * 1024} // 50MB;
                    helperText="Upload your completed research paper (PDF or DOC, max 50MB)"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Supporting Materials:</Text>
                  <FileInput;
                    variant="dropzone"
                    label="Data & Appendices"
                    accept=".xlsx,.csv,.json,.pdf,.zip"
                    multiple;
                    maxFiles={15}
                    helperText="Research data, charts, appendices (max 15 files)"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Presentation:</Text>
                  <FileInput;
                    variant="dropzone"
                    label="Research Presentation"
                    accept=".pptx,.ppt,.pdf,.mp4"
                    helperText="Presentation slides or recorded presentation"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Images & Figures:</Text>
                  <ImageInput;
                    variant="dropzone"
                    label="Research Images"
                    multiple;
                    preview;
                    maxFiles={20}
                    helperText="Charts, graphs, photographs, diagrams"
                  />
                </div>

              </div>

            </div>
          </div>

          {/* Student Profile & Portfolio */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Profile & Portfolio:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Profile Photo:</Text>
                  <ImageInput;
                    variant="dropzone"
                    size="sm"
                    label="Student Photo"
                    maxSize={2 * 1024 * 1024} // 2MB;
                    preview;
                    helperText="Upload your student profile photo"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Resume/CV:</Text>
                  <DocumentInput;
                    variant="button"
                    label="Resume Upload"
                    maxSize={5 * 1024 * 1024} // 5MB;
                    helperText="Upload your current resume"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Portfolio Items:</Text>
                  <FileInput;
                    variant="dropzone"
                    size="sm"
                    label="Portfolio"
                    accept=".pdf,.jpg,.png,.zip,.pptx"
                    multiple;
                    preview;
                    maxFiles={10}
                    helperText="Academic work samples"
                  />
                </div>

              </div>

            </div>
          </div>

          {/* Administrative Documents */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Administrative Document Upload:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Upload required documents for academic services and administrative processes:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Transcript Request:</Text>
                  <DocumentInput;
                    label="Supporting Documents"
                    helperText="ID verification, forms, supporting materials"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Financial Aid:</Text>
                  <FileInput;
                    label="Financial Documents"
                    accept=".pdf,.jpg,.png"
                    multiple;
                    maxFiles={5}
                    helperText="Tax forms, bank statements, FAFSA documents"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Study Abroad:</Text>
                  <FileInput;
                    label="Application Materials"
                    accept=".pdf,.docx,.jpg"
                    multiple;
                    preview;
                    helperText="Application forms, essays, recommendations"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Graduation Application:</Text>
                  <DocumentInput;
                    label="Degree Requirements"
                    helperText="Completed forms and verification documents"
                  />
                </div>

              </div>

            </div>
          </div>

          {/* Group Project Collaboration */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Group Project Collaboration:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 442 - Software Engineering Team Project;
                </Text>
                
                <Text variant="body-md" color="primary">
                  Team file sharing area for collaborative project development and documentation.
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Source Code:</Text>
                    <FileInput;
                      variant="dropzone"
                      label="Code Repository"
                      accept=".zip,.tar.gz,.rar"
                      helperText="Upload compressed source code archive"
                    />
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Documentation:</Text>
                    <FileInput;
                      variant="dropzone"
                      label="Project Documentation"
                      accept=".pdf,.md,.docx,.txt"
                      multiple;
                      helperText="Technical specs, user guides, API docs"
                    />
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Design Assets:</Text>
                    <ImageInput;
                      variant="dropzone"
                      label="UI/UX Design"
                      multiple;
                      preview;
                      helperText="Mockups, wireframes, design assets"
                    />
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Demo Materials:</Text>
                    <FileInput;
                      variant="dropzone"
                      label="Demo & Presentation"
                      accept=".mp4,.pptx,.pdf"
                      multiple;
                      helperText="Demo videos, presentation slides"
                    />
                  </div>

                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground;
export const Playground: Story = {
  args: {
    variant: 'dropzone',
    size: 'md',
    accept: 'image/*',
    multiple: false,
    preview: true,
    showFileList: true,
    disabled: false,
    label: 'Upload Files',
    helperText: 'Select files to upload',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>File Input Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different file input configurations;
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <FileInput {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive file input testing for University at Buffalo academic workflows;
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};