import{j as e}from"./jsx-runtime-B9GTzLod.js";import{F as s,D as c,I as i,B as w,a as o}from"./file-input-CAmwXcFQ.js";import{H as t,c as n,a as d,b as l}from"./hive-card-DIMxrd4t.js";import{B as r}from"./badge-BLajwy0n.js";import{T as a}from"./text-BOe2XosQ.js";/* empty css                    */import"./index-BMjrbHXN.js";import"./utils-CytzSlOG.js";import"./upload-Bikc-bYU.js";import"./createLucideIcon-DtX30ipI.js";import"./x-DmZh90ps.js";import"./image-CGtD2XV-.js";import"./file-text-B72BLrv5.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bip1EXUU.js";const L={title:"01-Atoms/File Input - COMPLETE DEFINITION",component:s,parameters:{docs:{description:{component:`
## 🎯 HIVE File Input - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most advanced file upload system for University at Buffalo academic document and media management.

### 🏆 **COMPONENT EXCELLENCE**
- **3 Visual Variants** - Default, dropzone, button for different upload contexts
- **3 Size Options** - Small, medium, large for flexible interface integration
- **Smart File Handling** - Drag & drop, file validation, preview generation
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and interactions
- **Image Preview Support** - Automatic image previews with file management
- **Comprehensive Validation** - File size, type, count limits with clear error messaging
- **Academic File Types** - Built-in presets for academic documents and media
- **Mobile Optimized** - Touch-friendly file selection and management

### 🎓 **UB ACADEMIC CONTEXT**
Perfect for University at Buffalo academic file management:
- **Assignment Submissions** - Papers, projects, lab reports, presentations
- **Research Materials** - Data files, images, documentation, references
- **Profile Media** - Profile photos, portfolio items, academic achievements
- **Course Resources** - Syllabi, readings, study materials, notes
- **Administrative Documents** - Transcripts, forms, applications, certificates
- **Collaboration Files** - Group project assets, shared resources

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Targets** - Large drop zones and buttons for mobile interaction
- **Responsive File Lists** - Scrollable, organized file management on small screens
- **Clear Visual Feedback** - Distinct states for drag operations and uploads
- **Accessible Controls** - Keyboard navigation and screen reader support
`}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","dropzone","button"],description:"File input visual variant"},size:{control:"select",options:["sm","md","lg"],description:"File input size"},accept:{control:"text",description:"Accepted file types"},multiple:{control:"boolean",description:"Allow multiple file selection"},preview:{control:"boolean",description:"Show image previews"},showFileList:{control:"boolean",description:"Show selected files list"},disabled:{control:"boolean",description:"Disabled state"}}},m={args:{variant:"default",size:"md",accept:".pdf,.doc,.docx,.txt",multiple:!1,preview:!1,showFileList:!0,disabled:!1,label:"Upload Assignment",helperText:"Select your assignment file (PDF, DOC, DOCX, TXT)"},render:u=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(t,{children:e.jsxs(n,{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Submit your assignment using the file upload below:"}),e.jsx(s,{...u}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Standard file input for University at Buffalo assignment submissions"})]})})})},p={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(t,{children:[e.jsxs(d,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(r,{variant:"success",children:"📂 VARIANTS"}),"File Input Variants - Upload Interfaces"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 visual variants for different file upload contexts and user interface patterns"})]}),e.jsx(n,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Default Variant:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Standard File Upload:"}),e.jsx(s,{variant:"default",label:"Course Assignment",accept:".pdf,.doc,.docx",helperText:"Upload your assignment in PDF or DOC format"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"With Multiple Files:"}),e.jsx(s,{variant:"default",label:"Research Materials",accept:".pdf,.txt,.docx",multiple:!0,helperText:"Select multiple research documents"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Dropzone Variant:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Large Upload Area:"}),e.jsx(c,{label:"Project Files",accept:".zip,.rar,.pdf,.docx",multiple:!0,helperText:"Drag and drop your project files here"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Image Upload with Preview:"}),e.jsx(i,{variant:"dropzone",label:"Portfolio Images",multiple:!0,preview:!0,helperText:"Upload images for your academic portfolio"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Button Variant:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Compact Button Upload:"}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(w,{accept:".pdf",helperText:"Choose PDF file"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Quick file selection for forms and modals"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Profile Photo Upload:"}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(i,{variant:"button",preview:!0,accept:"image/*",helperText:"Select profile photo"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Upload your UB student photo"})]})]})]})]})]})})]}),e.jsxs(t,{children:[e.jsxs(d,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(r,{variant:"info",children:"📏 SIZES"}),"File Input Sizes - Interface Integration"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 sizes for seamless integration with different interface contexts and space constraints"})]}),e.jsx(n,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Size Comparison:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Small (sm):"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsx(s,{size:"sm",variant:"button",label:"Quick Upload",accept:".txt"}),e.jsx(s,{size:"sm",variant:"default",label:"Notes",accept:".txt,.md"}),e.jsx(c,{size:"sm",label:"Attachments",accept:".pdf"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Medium (md - default):"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsx(s,{size:"md",variant:"default",label:"Assignment Submission",accept:".pdf,.docx",helperText:"Standard assignment upload"}),e.jsx(c,{size:"md",label:"Research Documents",accept:".pdf,.txt,.docx",multiple:!0,helperText:"Multiple academic documents"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Large (lg):"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(c,{size:"lg",label:"Thesis Upload",accept:".pdf,.docx",helperText:"Upload your thesis document"}),e.jsx(i,{size:"lg",variant:"dropzone",label:"Portfolio Gallery",multiple:!0,preview:!0,helperText:"Upload high-resolution portfolio images"})]})]})]})]})})})]}),e.jsxs(t,{children:[e.jsxs(d,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(r,{variant:"primary",children:"📄 FILE TYPES"}),"File Type Support - Academic Documents"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Comprehensive file type support for University at Buffalo academic workflows"})]}),e.jsx(n,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Document Types:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Papers:"}),e.jsx(o,{label:"Research Paper",helperText:"PDF, DOC, DOCX, TXT, RTF"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Spreadsheets & Data:"}),e.jsx(s,{label:"Data Analysis",accept:".xlsx,.xls,.csv,.json",helperText:"Excel files and CSV data"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Presentations:"}),e.jsx(s,{label:"Class Presentation",accept:".pptx,.ppt,.pdf",helperText:"PowerPoint and PDF presentations"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Media Types:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Images:"}),e.jsx(i,{label:"Portfolio Images",multiple:!0,preview:!0,helperText:"JPG, PNG, GIF, WebP images"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Audio/Video:"}),e.jsx(s,{label:"Presentation Recording",accept:".mp4,.mp3,.wav,.m4a",helperText:"Audio and video recordings"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Archives:"}),e.jsx(s,{label:"Project Archive",accept:".zip,.rar,.7z,.tar.gz",helperText:"Compressed project files"})]})]})]})]})})]}),e.jsxs(t,{children:[e.jsxs(d,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(r,{variant:"secondary",children:"⚡ FEATURES"}),"Advanced Features - File Management"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Advanced file handling features for comprehensive academic file management"})]}),e.jsx(n,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Image Preview:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Automatic Image Previews:"}),e.jsx(i,{variant:"dropzone",label:"Lab Results Images",multiple:!0,preview:!0,maxSize:5*1024*1024,helperText:"Upload lab result images (max 5MB each)"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"File Validation:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Size Limits:"}),e.jsx(s,{variant:"dropzone",label:"Thesis Draft",accept:".pdf,.docx",maxSize:10*1024*1024,helperText:"Maximum file size: 10MB"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"File Count Limits:"}),e.jsx(s,{variant:"dropzone",label:"Supporting Documents",accept:".pdf,.jpg,.png",multiple:!0,maxFiles:5,preview:!0,helperText:"Upload up to 5 supporting documents"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Interactive States:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Normal State:"}),e.jsx(s,{variant:"dropzone",label:"Normal Upload",accept:".pdf",helperText:"Ready for file upload"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Error State:"}),e.jsx(s,{variant:"dropzone",label:"Upload with Error",accept:".pdf",error:"File size exceeds 10MB limit"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Disabled State:"}),e.jsx(s,{variant:"dropzone",label:"Disabled Upload",accept:".pdf",disabled:!0,helperText:"Upload is currently disabled"})]})]})]})]})})]}),e.jsxs(t,{children:[e.jsxs(d,{children:[e.jsxs(l,{className:"flex items-center gap-3",children:[e.jsx(r,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Academic File Upload Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"File upload usage in actual University at Buffalo academic and administrative contexts"})]}),e.jsxs(n,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Course Assignment Submission:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"CSE 331 - Algorithm Analysis Assignment 3"}),e.jsx(a,{variant:"body-md",color:"primary",children:"Submit your completed assignment including source code, report, and analysis documentation."}),e.jsx("div",{className:"space-y-4",children:e.jsx(s,{variant:"dropzone",label:"Assignment Files",accept:".pdf,.py,.java,.cpp,.txt,.md",multiple:!0,maxFiles:10,maxSize:25*1024*1024,helperText:"Upload source code, report (PDF), and documentation (max 25MB total)"})}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(r,{variant:"outline",children:"Due: March 15, 2024"}),e.jsx(r,{variant:"outline",children:"Max Files: 10"}),e.jsx(r,{variant:"outline",children:"Accepted: PDF, Python, Java, C++"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Research Project Submission:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Research Paper:"}),e.jsx(o,{variant:"dropzone",label:"Final Research Paper",maxSize:50*1024*1024,helperText:"Upload your completed research paper (PDF or DOC, max 50MB)"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Supporting Materials:"}),e.jsx(s,{variant:"dropzone",label:"Data & Appendices",accept:".xlsx,.csv,.json,.pdf,.zip",multiple:!0,maxFiles:15,helperText:"Research data, charts, appendices (max 15 files)"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Presentation:"}),e.jsx(s,{variant:"dropzone",label:"Research Presentation",accept:".pptx,.ppt,.pdf,.mp4",helperText:"Presentation slides or recorded presentation"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Images & Figures:"}),e.jsx(i,{variant:"dropzone",label:"Research Images",multiple:!0,preview:!0,maxFiles:20,helperText:"Charts, graphs, photographs, diagrams"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Profile & Portfolio:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Profile Photo:"}),e.jsx(i,{variant:"dropzone",size:"sm",label:"Student Photo",maxSize:2*1024*1024,preview:!0,helperText:"Upload your student profile photo"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Resume/CV:"}),e.jsx(o,{variant:"button",label:"Resume Upload",maxSize:5*1024*1024,helperText:"Upload your current resume"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Portfolio Items:"}),e.jsx(s,{variant:"dropzone",size:"sm",label:"Portfolio",accept:".pdf,.jpg,.png,.zip,.pptx",multiple:!0,preview:!0,maxFiles:10,helperText:"Academic work samples"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Administrative Document Upload:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Upload required documents for academic services and administrative processes:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Transcript Request:"}),e.jsx(o,{label:"Supporting Documents",helperText:"ID verification, forms, supporting materials"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Financial Aid:"}),e.jsx(s,{label:"Financial Documents",accept:".pdf,.jpg,.png",multiple:!0,maxFiles:5,helperText:"Tax forms, bank statements, FAFSA documents"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Study Abroad:"}),e.jsx(s,{label:"Application Materials",accept:".pdf,.docx,.jpg",multiple:!0,preview:!0,helperText:"Application forms, essays, recommendations"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Graduation Application:"}),e.jsx(o,{label:"Degree Requirements",helperText:"Completed forms and verification documents"})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Group Project Collaboration:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"CSE 442 - Software Engineering Team Project"}),e.jsx(a,{variant:"body-md",color:"primary",children:"Team file sharing area for collaborative project development and documentation."}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Source Code:"}),e.jsx(s,{variant:"dropzone",label:"Code Repository",accept:".zip,.tar.gz,.rar",helperText:"Upload compressed source code archive"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Documentation:"}),e.jsx(s,{variant:"dropzone",label:"Project Documentation",accept:".pdf,.md,.docx,.txt",multiple:!0,helperText:"Technical specs, user guides, API docs"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Design Assets:"}),e.jsx(i,{variant:"dropzone",label:"UI/UX Design",multiple:!0,preview:!0,helperText:"Mockups, wireframes, design assets"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Demo Materials:"}),e.jsx(s,{variant:"dropzone",label:"Demo & Presentation",accept:".mp4,.pptx,.pdf",multiple:!0,helperText:"Demo videos, presentation slides"})]})]})]})})]})]})]})]})},v={args:{variant:"dropzone",size:"md",accept:"image/*",multiple:!1,preview:!0,showFileList:!0,disabled:!1,label:"Upload Files",helperText:"Select files to upload"},render:u=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(t,{children:[e.jsxs(d,{children:[e.jsx(l,{children:"File Input Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different file input configurations"})]}),e.jsx(n,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{...u}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Interactive file input testing for University at Buffalo academic workflows"})]})})]})})};var x,h,g;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    accept: '.pdf,.doc,.docx,.txt',
    multiple: false,
    preview: false,
    showFileList: true,
    disabled: false,
    label: 'Upload Assignment',
    helperText: 'Select your assignment file (PDF, DOC, DOCX, TXT)'
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Submit your assignment using the file upload below:
          </Text>
          <FileInput {...args} />
          <Text variant="body-sm" color="secondary">
            Standard file input for University at Buffalo assignment submissions
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(g=(h=m.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var y,f,b;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">📂 VARIANTS</Badge>
            File Input Variants - Upload Interfaces
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 visual variants for different file upload contexts and user interface patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Default Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Standard File Upload:</Text>
                  <FileInput variant="default" label="Course Assignment" accept=".pdf,.doc,.docx" helperText="Upload your assignment in PDF or DOC format" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">With Multiple Files:</Text>
                  <FileInput variant="default" label="Research Materials" accept=".pdf,.txt,.docx" multiple helperText="Select multiple research documents" />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Dropzone Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large Upload Area:</Text>
                  <DropzoneInput label="Project Files" accept=".zip,.rar,.pdf,.docx" multiple helperText="Drag and drop your project files here" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Image Upload with Preview:</Text>
                  <ImageInput variant="dropzone" label="Portfolio Images" multiple preview helperText="Upload images for your academic portfolio" />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Button Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Compact Button Upload:</Text>
                  <div className="flex items-center gap-4">
                    <ButtonFileInput accept=".pdf" helperText="Choose PDF file" />
                    <Text variant="body-sm" color="secondary">
                      Quick file selection for forms and modals
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Profile Photo Upload:</Text>
                  <div className="flex items-center gap-4">
                    <ImageInput variant="button" preview accept="image/*" helperText="Select profile photo" />
                    <Text variant="body-sm" color="secondary">
                      Upload your UB student photo
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
            File Input Sizes - Interface Integration
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes for seamless integration with different interface contexts and space constraints
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
                    <FileInput size="sm" variant="button" label="Quick Upload" accept=".txt" />
                    <FileInput size="sm" variant="default" label="Notes" accept=".txt,.md" />
                    <DropzoneInput size="sm" label="Attachments" accept=".pdf" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (md - default):</Text>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FileInput size="md" variant="default" label="Assignment Submission" accept=".pdf,.docx" helperText="Standard assignment upload" />
                    <DropzoneInput size="md" label="Research Documents" accept=".pdf,.txt,.docx" multiple helperText="Multiple academic documents" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (lg):</Text>
                  <div className="space-y-4">
                    <DropzoneInput size="lg" label="Thesis Upload" accept=".pdf,.docx" helperText="Upload your thesis document" />
                    <ImageInput size="lg" variant="dropzone" label="Portfolio Gallery" multiple preview helperText="Upload high-resolution portfolio images" />
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
            File Type Support - Academic Documents
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive file type support for University at Buffalo academic workflows
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Document Types:</h4>
              
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Papers:</Text>
                  <DocumentInput label="Research Paper" helperText="PDF, DOC, DOCX, TXT, RTF" />
                </div>
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Spreadsheets & Data:</Text>
                  <FileInput label="Data Analysis" accept=".xlsx,.xls,.csv,.json" helperText="Excel files and CSV data" />
                </div>
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Presentations:</Text>
                  <FileInput label="Class Presentation" accept=".pptx,.ppt,.pdf" helperText="PowerPoint and PDF presentations" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Media Types:</h4>
              
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Images:</Text>
                  <ImageInput label="Portfolio Images" multiple preview helperText="JPG, PNG, GIF, WebP images" />
                </div>
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Audio/Video:</Text>
                  <FileInput label="Presentation Recording" accept=".mp4,.mp3,.wav,.m4a" helperText="Audio and video recordings" />
                </div>
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Archives:</Text>
                  <FileInput label="Project Archive" accept=".zip,.rar,.7z,.tar.gz" helperText="Compressed project files" />
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
            Advanced Features - File Management
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced file handling features for comprehensive academic file management
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Image Preview:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Automatic Image Previews:</Text>
                  <ImageInput variant="dropzone" label="Lab Results Images" multiple preview maxSize={5 * 1024 * 1024} // 5MB
                helperText="Upload lab result images (max 5MB each)" />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">File Validation:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Size Limits:</Text>
                  <FileInput variant="dropzone" label="Thesis Draft" accept=".pdf,.docx" maxSize={10 * 1024 * 1024} // 10MB
                helperText="Maximum file size: 10MB" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">File Count Limits:</Text>
                  <FileInput variant="dropzone" label="Supporting Documents" accept=".pdf,.jpg,.png" multiple maxFiles={5} preview helperText="Upload up to 5 supporting documents" />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Normal State:</Text>
                  <FileInput variant="dropzone" label="Normal Upload" accept=".pdf" helperText="Ready for file upload" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Error State:</Text>
                  <FileInput variant="dropzone" label="Upload with Error" accept=".pdf" error="File size exceeds 10MB limit" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Disabled State:</Text>
                  <FileInput variant="dropzone" label="Disabled Upload" accept=".pdf" disabled helperText="Upload is currently disabled" />
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
            Real Academic File Upload Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            File upload usage in actual University at Buffalo academic and administrative contexts
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
                  <FileInput variant="dropzone" label="Assignment Files" accept=".pdf,.py,.java,.cpp,.txt,.md" multiple maxFiles={10} maxSize={25 * 1024 * 1024} // 25MB
                helperText="Upload source code, report (PDF), and documentation (max 25MB total)" />
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
                  <DocumentInput variant="dropzone" label="Final Research Paper" maxSize={50 * 1024 * 1024} // 50MB
                helperText="Upload your completed research paper (PDF or DOC, max 50MB)" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Supporting Materials:</Text>
                  <FileInput variant="dropzone" label="Data & Appendices" accept=".xlsx,.csv,.json,.pdf,.zip" multiple maxFiles={15} helperText="Research data, charts, appendices (max 15 files)" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Presentation:</Text>
                  <FileInput variant="dropzone" label="Research Presentation" accept=".pptx,.ppt,.pdf,.mp4" helperText="Presentation slides or recorded presentation" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Images & Figures:</Text>
                  <ImageInput variant="dropzone" label="Research Images" multiple preview maxFiles={20} helperText="Charts, graphs, photographs, diagrams" />
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
                  <ImageInput variant="dropzone" size="sm" label="Student Photo" maxSize={2 * 1024 * 1024} // 2MB
                preview helperText="Upload your student profile photo" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Resume/CV:</Text>
                  <DocumentInput variant="button" label="Resume Upload" maxSize={5 * 1024 * 1024} // 5MB
                helperText="Upload your current resume" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Portfolio Items:</Text>
                  <FileInput variant="dropzone" size="sm" label="Portfolio" accept=".pdf,.jpg,.png,.zip,.pptx" multiple preview maxFiles={10} helperText="Academic work samples" />
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
                  <DocumentInput label="Supporting Documents" helperText="ID verification, forms, supporting materials" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Financial Aid:</Text>
                  <FileInput label="Financial Documents" accept=".pdf,.jpg,.png" multiple maxFiles={5} helperText="Tax forms, bank statements, FAFSA documents" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Study Abroad:</Text>
                  <FileInput label="Application Materials" accept=".pdf,.docx,.jpg" multiple preview helperText="Application forms, essays, recommendations" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Graduation Application:</Text>
                  <DocumentInput label="Degree Requirements" helperText="Completed forms and verification documents" />
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
                  CSE 442 - Software Engineering Team Project
                </Text>
                
                <Text variant="body-md" color="primary">
                  Team file sharing area for collaborative project development and documentation.
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Source Code:</Text>
                    <FileInput variant="dropzone" label="Code Repository" accept=".zip,.tar.gz,.rar" helperText="Upload compressed source code archive" />
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Documentation:</Text>
                    <FileInput variant="dropzone" label="Project Documentation" accept=".pdf,.md,.docx,.txt" multiple helperText="Technical specs, user guides, API docs" />
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Design Assets:</Text>
                    <ImageInput variant="dropzone" label="UI/UX Design" multiple preview helperText="Mockups, wireframes, design assets" />
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Demo Materials:</Text>
                    <FileInput variant="dropzone" label="Demo & Presentation" accept=".mp4,.pptx,.pdf" multiple helperText="Demo videos, presentation slides" />
                  </div>

                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(b=(f=p.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var j,N,T;v.parameters={...v.parameters,docs:{...(j=v.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    variant: 'dropzone',
    size: 'md',
    accept: 'image/*',
    multiple: false,
    preview: true,
    showFileList: true,
    disabled: false,
    label: 'Upload Files',
    helperText: 'Select files to upload'
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>File Input Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different file input configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <FileInput {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive file input testing for University at Buffalo academic workflows
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(T=(N=v.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};const V=["Default","CompleteShowcase","Playground"];export{p as CompleteShowcase,m as Default,v as Playground,V as __namedExportsOrder,L as default};
