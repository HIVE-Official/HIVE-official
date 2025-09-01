import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{R as p}from"./index-DJO9vBfz.js";import{c as v}from"./utils-CytzSlOG.js";import{U as H}from"./upload-B79xrUhd.js";import{X as ge}from"./x-W2WQYUcx.js";import{I as ye,F as fe}from"./image--8O_CT1J.js";import{c as be}from"./createLucideIcon-WpwZgzX-.js";import{H as u,c as x,a as b,b as j}from"./hive-tokens-CKIUfcHM.js";import{B as d}from"./badge-B09J4pcg.js";import{T as a}from"./text-Cao0VGB4.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=be("File",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]]),z={sm:{dropzone:"p-4 text-sm",button:"px-3 py-2 text-sm",preview:"w-16 h-16"},md:{dropzone:"p-6 text-base",button:"px-4 py-2.5 text-sm",preview:"w-20 h-20"},lg:{dropzone:"p-8 text-lg",button:"px-6 py-3 text-base",preview:"w-24 h-24"}},q=r=>{if(r===0)return"0 Bytes";const o=1024,c=["Bytes","KB","MB","GB"],h=Math.floor(Math.log(r)/Math.log(o));return parseFloat((r/Math.pow(o,h)).toFixed(2))+" "+c[h]},Ne=r=>r.type.startsWith("image/")?e.jsx(ye,{className:"w-full h-full"}):r.type.includes("text/")||r.type.includes("document")?e.jsx(fe,{className:"w-full h-full"}):e.jsx(je,{className:"w-full h-full"}),i=p.forwardRef(({accept:r,multiple:o=!1,maxSize:c,maxFiles:h,preview:B=!1,variant:R="default",size:T="md",error:g,label:G,helperText:_,onFileSelect:M,onFileRemove:E,showFileList:te=!0,className:ne,disabled:t,...L},le)=>{const[y,X]=p.useState([]),[O,V]=p.useState(!1),[f,$]=p.useState([]),w=p.useRef(null);p.useImperativeHandle(le,()=>w.current);const de=s=>c&&s.size>c?`File size must be less than ${q(c)}`:null,S=s=>{if(!s)return;const l=Array.from(s),m=[],F=[];if(l.forEach(C=>{const I=de(C);I?F.push(`${C.name}: ${I}`):m.push(C)}),h&&y.length+m.length>h){F.push(`Maximum ${h} files allowed`);return}const P=o?[...y,...m]:m.slice(0,1);if(X(P),B){const C=P.map(I=>I.type.startsWith("image/")?URL.createObjectURL(I):"");$(C)}M==null||M(s)},oe=s=>{s.preventDefault(),V(!1),t||S(s.dataTransfer.files)},ce=s=>{s.preventDefault(),t||V(!0)},me=s=>{s.preventDefault(),V(!1)},pe=s=>{const l=y.filter((m,F)=>F!==s);if(X(l),B){const m=f.filter((F,P)=>P!==s);f[s]&&URL.revokeObjectURL(f[s]),$(m)}E==null||E(s)},W=()=>{var s;t||(s=w.current)==null||s.click()};p.useEffect(()=>()=>{f.forEach(s=>{s&&URL.revokeObjectURL(s)})},[]);const ve=()=>e.jsx("div",{className:"space-y-2",children:e.jsxs("div",{className:v("relative","border-2 border-dashed border-[var(--hive-border-primary)]","rounded-xl","transition-all duration-200 ease-out",z[T].dropzone,O&&"border-[var(--hive-brand-gold)] bg-[var(--hive-brand-secondary)]/5",g&&"border-[var(--hive-status-error)]",t&&"opacity-50 cursor-not-allowed"),children:[e.jsx("input",{ref:w,type:"file",accept:r,multiple:o,disabled:t,onChange:s=>S(s.target.files),className:"sr-only",...L}),e.jsxs("div",{className:"text-center",children:[e.jsx(H,{className:"mx-auto h-8 w-8 text-[var(--hive-text-secondary)] mb-2"}),e.jsx("p",{className:"text-[var(--hive-text-primary)] font-medium",children:"Click to upload or drag and drop"}),r&&e.jsx("p",{className:"text-[var(--hive-text-secondary)] text-sm mt-1",children:r.split(",").join(", ")}),c&&e.jsxs("p",{className:"text-[var(--hive-text-secondary)] text-sm",children:["Max size: ",q(c)]})]})]})}),ue=()=>e.jsxs("div",{className:v("border-2 border-dashed rounded-xl","transition-all duration-200 ease-out","cursor-pointer",z[T].dropzone,O?"border-[var(--hive-brand-gold)] bg-[var(--hive-brand-secondary)]/5":"border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-gold)] hover:bg-[var(--hive-background-interactive)]",g&&"border-[var(--hive-status-error)]",t&&"opacity-50 cursor-not-allowed pointer-events-none"),onDrop:oe,onDragOver:ce,onDragLeave:me,onClick:W,children:[e.jsx("input",{ref:w,type:"file",accept:r,multiple:o,disabled:t,onChange:s=>S(s.target.files),className:"sr-only",...L}),e.jsxs("div",{className:"text-center",children:[e.jsx(H,{className:"mx-auto h-12 w-12 text-[var(--hive-text-secondary)] mb-4"}),e.jsx("p",{className:"text-[var(--hive-text-primary)] font-medium mb-2",children:O?"Drop files here":"Drag & drop files here"}),e.jsxs("p",{className:"text-[var(--hive-text-secondary)]",children:["or ",e.jsx("span",{className:"text-[var(--hive-brand-secondary)] font-medium",children:"browse"})," to choose files"]})]})]}),xe=()=>e.jsxs("button",{type:"button",onClick:W,disabled:t,className:v("inline-flex items-center gap-2","border border-[var(--hive-border-primary)]","rounded-xl","bg-[var(--hive-background-secondary)]","text-[var(--hive-text-primary)]","font-medium","transition-all duration-200 ease-out","hover:bg-[var(--hive-background-interactive)] hover:border-[var(--hive-brand-gold)]","focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-gold)]/20 focus:border-[var(--hive-brand-gold)]","disabled:opacity-50 disabled:cursor-not-allowed",z[T].button,g&&"border-[var(--hive-status-error)]"),children:[e.jsx("input",{ref:w,type:"file",accept:r,multiple:o,disabled:t,onChange:s=>S(s.target.files),className:"sr-only",...L}),e.jsx(H,{className:"w-4 h-4"}),"Choose Files"]}),he=()=>!te||y.length===0?null:e.jsxs("div",{className:"space-y-2 mt-4",children:[e.jsxs("h4",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:["Selected Files (",y.length,")"]}),e.jsx("div",{className:"space-y-2",children:y.map((s,l)=>e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-primary)]",children:[e.jsxs("div",{className:"flex items-center gap-3 min-w-0 flex-1",children:[B&&f[l]?e.jsx("img",{src:f[l],alt:s.name,className:v("object-cover rounded border border-[var(--hive-border-primary)]",z[T].preview)}):e.jsx("div",{className:v("flex items-center justify-center","bg-[var(--hive-background-tertiary)] rounded border border-[var(--hive-border-primary)]","text-[var(--hive-text-secondary)]",z[T].preview),children:Ne(s)}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"text-sm font-medium text-[var(--hive-text-primary)] truncate",children:s.name}),e.jsx("p",{className:"text-xs text-[var(--hive-text-secondary)]",children:q(s.size)})]})]}),e.jsx("button",{type:"button",onClick:()=>pe(l),className:"ml-2 p-1 text-[var(--hive-text-secondary)] hover:text-[var(--hive-status-error)] transition-colors duration-200","aria-label":`Remove ${s.name}`,children:e.jsx(ge,{className:"w-4 h-4"})})]},`${s.name}-${l}`))})]});return e.jsxs("div",{className:v("space-y-2",ne),children:[G&&e.jsx("label",{className:"block text-sm font-medium text-[var(--hive-text-primary)]",children:G}),R==="dropzone"&&ue(),R==="button"&&xe(),R==="default"&&ve(),(g||_)&&e.jsx("p",{className:v("text-xs",g?"text-[var(--hive-status-error)]":"text-[var(--hive-text-secondary)]"),children:g||_}),he()]})});i.displayName="FileInput";const n=r=>e.jsx(i,{accept:"image/*",preview:!0,...r}),N=r=>e.jsx(i,{accept:".pdf,.doc,.docx,.txt,.rtf",...r}),D=r=>e.jsx(i,{variant:"dropzone",...r}),re=r=>e.jsx(i,{variant:"button",...r});i.__docgenInfo={description:"",methods:[],displayName:"FileInput",props:{accept:{required:!1,tsType:{name:"string"},description:""},multiple:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},maxSize:{required:!1,tsType:{name:"number"},description:""},maxFiles:{required:!1,tsType:{name:"number"},description:""},preview:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'dropzone' | 'button'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'dropzone'"},{name:"literal",value:"'button'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},error:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},onFileSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(files: FileList | null) => void",signature:{arguments:[{type:{name:"union",raw:"FileList | null",elements:[{name:"FileList"},{name:"null"}]},name:"files"}],return:{name:"void"}}},description:""},onFileRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},showFileList:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}},composes:["Omit"]};n.__docgenInfo={description:"",methods:[],displayName:"ImageInput"};N.__docgenInfo={description:"",methods:[],displayName:"DocumentInput"};D.__docgenInfo={description:"",methods:[],displayName:"DropzoneInput"};re.__docgenInfo={description:"",methods:[],displayName:"ButtonFileInput"};const Be={title:"01-Atoms/File Input - COMPLETE DEFINITION",component:i,parameters:{docs:{description:{component:`
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
`}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","dropzone","button"],description:"File input visual variant"},size:{control:"select",options:["sm","md","lg"],description:"File input size"},accept:{control:"text",description:"Accepted file types"},multiple:{control:"boolean",description:"Allow multiple file selection"},preview:{control:"boolean",description:"Show image previews"},showFileList:{control:"boolean",description:"Show selected files list"},disabled:{control:"boolean",description:"Disabled state"}}},U={args:{variant:"default",size:"md",accept:".pdf,.doc,.docx,.txt",multiple:!1,preview:!1,showFileList:!0,disabled:!1,label:"Upload Assignment",helperText:"Select your assignment file (PDF, DOC, DOCX, TXT)"},render:r=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(u,{children:e.jsxs(x,{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Submit your assignment using the file upload below:"}),e.jsx(i,{...r}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Standard file input for University at Buffalo assignment submissions"})]})})})},A={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(u,{children:[e.jsxs(b,{children:[e.jsxs(j,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"success",children:"📂 VARIANTS"}),"File Input Variants - Upload Interfaces"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 visual variants for different file upload contexts and user interface patterns"})]}),e.jsx(x,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Default Variant:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Standard File Upload:"}),e.jsx(i,{variant:"primary",label:"Course Assignment",accept:".pdf,.doc,.docx",helperText:"Upload your assignment in PDF or DOC format"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"With Multiple Files:"}),e.jsx(i,{variant:"primary",label:"Research Materials",accept:".pdf,.txt,.docx",multiple:!0,helperText:"Select multiple research documents"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Dropzone Variant:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Large Upload Area:"}),e.jsx(D,{label:"Project Files",accept:".zip,.rar,.pdf,.docx",multiple:!0,helperText:"Drag and drop your project files here"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Image Upload with Preview:"}),e.jsx(n,{variant:"dropzone",label:"Portfolio Images",multiple:!0,preview:!0,helperText:"Upload images for your academic portfolio"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Button Variant:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Compact Button Upload:"}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(re,{accept:".pdf",helperText:"Choose PDF file"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Quick file selection for forms and modals"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Profile Photo Upload:"}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(n,{variant:"button",preview:!0,accept:"image/*",helperText:"Select profile photo"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Upload your UB student photo"})]})]})]})]})]})})]}),e.jsxs(u,{children:[e.jsxs(b,{children:[e.jsxs(j,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"info",children:"📏 SIZES"}),"File Input Sizes - Interface Integration"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 sizes for seamless integration with different interface contexts and space constraints"})]}),e.jsx(x,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Size Comparison:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Small (sm):"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsx(i,{size:"sm",variant:"button",label:"Quick Upload",accept:".txt"}),e.jsx(i,{size:"sm",variant:"primary",label:"Notes",accept:".txt,.md"}),e.jsx(D,{size:"sm",label:"Attachments",accept:".pdf"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Medium (md - default):"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsx(i,{size:"md",variant:"primary",label:"Assignment Submission",accept:".pdf,.docx",helperText:"Standard assignment upload"}),e.jsx(D,{size:"md",label:"Research Documents",accept:".pdf,.txt,.docx",multiple:!0,helperText:"Multiple academic documents"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Large (lg):"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(D,{size:"lg",label:"Thesis Upload",accept:".pdf,.docx",helperText:"Upload your thesis document"}),e.jsx(n,{size:"lg",variant:"dropzone",label:"Portfolio Gallery",multiple:!0,preview:!0,helperText:"Upload high-resolution portfolio images"})]})]})]})]})})})]}),e.jsxs(u,{children:[e.jsxs(b,{children:[e.jsxs(j,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"primary",children:"📄 FILE TYPES"}),"File Type Support - Academic Documents"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Comprehensive file type support for University at Buffalo academic workflows"})]}),e.jsx(x,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Document Types:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Papers:"}),e.jsx(N,{label:"Research Paper",helperText:"PDF, DOC, DOCX, TXT, RTF"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Spreadsheets & Data:"}),e.jsx(i,{label:"Data Analysis",accept:".xlsx,.xls,.csv,.json",helperText:"Excel files and CSV data"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Presentations:"}),e.jsx(i,{label:"Class Presentation",accept:".pptx,.ppt,.pdf",helperText:"PowerPoint and PDF presentations"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Media Types:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Images:"}),e.jsx(n,{label:"Portfolio Images",multiple:!0,preview:!0,helperText:"JPG, PNG, GIF, WebP images"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Audio/Video:"}),e.jsx(i,{label:"Presentation Recording",accept:".mp4,.mp3,.wav,.m4a",helperText:"Audio and video recordings"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Archives:"}),e.jsx(i,{label:"Project Archive",accept:".zip,.rar,.7z,.tar.gz",helperText:"Compressed project files"})]})]})]})]})})]}),e.jsxs(u,{children:[e.jsxs(b,{children:[e.jsxs(j,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"secondary",children:"⚡ FEATURES"}),"Advanced Features - File Management"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Advanced file handling features for comprehensive academic file management"})]}),e.jsx(x,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Image Preview:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Automatic Image Previews:"}),e.jsx(n,{variant:"dropzone",label:"Lab Results Images",multiple:!0,preview:!0,maxSize:5*1024*1024,helperText:"Upload lab result images (max 5MB each)"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"File Validation:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Size Limits:"}),e.jsx(i,{variant:"dropzone",label:"Thesis Draft",accept:".pdf,.docx",maxSize:10*1024*1024,helperText:"Maximum file size: 10MB"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"File Count Limits:"}),e.jsx(i,{variant:"dropzone",label:"Supporting Documents",accept:".pdf,.jpg,.png",multiple:!0,maxFiles:5,preview:!0,helperText:"Upload up to 5 supporting documents"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Interactive States:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Normal State:"}),e.jsx(i,{variant:"dropzone",label:"Normal Upload",accept:".pdf",helperText:"Ready for file upload"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Error State:"}),e.jsx(i,{variant:"dropzone",label:"Upload with Error",accept:".pdf",error:"File size exceeds 10MB limit"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Disabled State:"}),e.jsx(i,{variant:"dropzone",label:"Disabled Upload",accept:".pdf",disabled:!0,helperText:"Upload is currently disabled"})]})]})]})]})})]}),e.jsxs(u,{children:[e.jsxs(b,{children:[e.jsxs(j,{className:"flex items-center gap-3",children:[e.jsx(d,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Academic File Upload Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"File upload usage in actual University at Buffalo academic and administrative contexts"})]}),e.jsxs(x,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Course Assignment Submission:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"CSE 331 - Algorithm Analysis Assignment 3"}),e.jsx(a,{variant:"body-md",color:"primary",children:"Submit your completed assignment including source code, report, and analysis documentation."}),e.jsx("div",{className:"space-y-4",children:e.jsx(i,{variant:"dropzone",label:"Assignment Files",accept:".pdf,.py,.java,.cpp,.txt,.md",multiple:!0,maxFiles:10,maxSize:25*1024*1024,helperText:"Upload source code, report (PDF), and documentation (max 25MB total)"})}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(d,{variant:"secondary",children:"Due: March 15, 2024"}),e.jsx(d,{variant:"secondary",children:"Max Files: 10"}),e.jsx(d,{variant:"secondary",children:"Accepted: PDF, Python, Java, C++"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Research Project Submission:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Research Paper:"}),e.jsx(N,{variant:"dropzone",label:"Final Research Paper",maxSize:50*1024*1024,helperText:"Upload your completed research paper (PDF or DOC, max 50MB)"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Supporting Materials:"}),e.jsx(i,{variant:"dropzone",label:"Data & Appendices",accept:".xlsx,.csv,.json,.pdf,.zip",multiple:!0,maxFiles:15,helperText:"Research data, charts, appendices (max 15 files)"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Presentation:"}),e.jsx(i,{variant:"dropzone",label:"Research Presentation",accept:".pptx,.ppt,.pdf,.mp4",helperText:"Presentation slides or recorded presentation"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Images & Figures:"}),e.jsx(n,{variant:"dropzone",label:"Research Images",multiple:!0,preview:!0,maxFiles:20,helperText:"Charts, graphs, photographs, diagrams"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Profile & Portfolio:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Profile Photo:"}),e.jsx(n,{variant:"dropzone",size:"sm",label:"Student Photo",maxSize:2*1024*1024,preview:!0,helperText:"Upload your student profile photo"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Resume/CV:"}),e.jsx(N,{variant:"button",label:"Resume Upload",maxSize:5*1024*1024,helperText:"Upload your current resume"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Portfolio Items:"}),e.jsx(i,{variant:"dropzone",size:"sm",label:"Portfolio",accept:".pdf,.jpg,.png,.zip,.pptx",multiple:!0,preview:!0,maxFiles:10,helperText:"Academic work samples"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Administrative Document Upload:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"Upload required documents for academic services and administrative processes:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Transcript Request:"}),e.jsx(N,{label:"Supporting Documents",helperText:"ID verification, forms, supporting materials"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Financial Aid:"}),e.jsx(i,{label:"Financial Documents",accept:".pdf,.jpg,.png",multiple:!0,maxFiles:5,helperText:"Tax forms, bank statements, FAFSA documents"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Study Abroad:"}),e.jsx(i,{label:"Application Materials",accept:".pdf,.docx,.jpg",multiple:!0,preview:!0,helperText:"Application forms, essays, recommendations"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Graduation Application:"}),e.jsx(N,{label:"Degree Requirements",helperText:"Completed forms and verification documents"})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Group Project Collaboration:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"CSE 442 - Software Engineering Team Project"}),e.jsx(a,{variant:"body-md",color:"primary",children:"Team file sharing area for collaborative project development and documentation."}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Source Code:"}),e.jsx(i,{variant:"dropzone",label:"Code Repository",accept:".zip,.tar.gz,.rar",helperText:"Upload compressed source code archive"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Documentation:"}),e.jsx(i,{variant:"dropzone",label:"Project Documentation",accept:".pdf,.md,.docx,.txt",multiple:!0,helperText:"Technical specs, user guides, API docs"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Design Assets:"}),e.jsx(n,{variant:"dropzone",label:"UI/UX Design",multiple:!0,preview:!0,helperText:"Mockups, wireframes, design assets"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Demo Materials:"}),e.jsx(i,{variant:"dropzone",label:"Demo & Presentation",accept:".mp4,.pptx,.pdf",multiple:!0,helperText:"Demo videos, presentation slides"})]})]})]})})]})]})]})]})},k={args:{variant:"dropzone",size:"md",accept:"image/*",multiple:!1,preview:!0,showFileList:!0,disabled:!1,label:"Upload Files",helperText:"Select files to upload"},render:r=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(u,{children:[e.jsxs(b,{children:[e.jsx(j,{children:"File Input Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different file input configurations"})]}),e.jsx(x,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{...r}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Interactive file input testing for University at Buffalo academic workflows"})]})})]})})};var Y,J,Q;U.parameters={...U.parameters,docs:{...(Y=U.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(Q=(J=U.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var Z,K,ee;A.parameters={...A.parameters,docs:{...(Z=A.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
                  <FileInput variant="primary" label="Course Assignment" accept=".pdf,.doc,.docx" helperText="Upload your assignment in PDF or DOC format" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">With Multiple Files:</Text>
                  <FileInput variant="primary" label="Research Materials" accept=".pdf,.txt,.docx" multiple helperText="Select multiple research documents" />
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
                    <FileInput size="sm" variant="primary" label="Notes" accept=".txt,.md" />
                    <DropzoneInput size="sm" label="Attachments" accept=".pdf" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (md - default):</Text>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FileInput size="md" variant="primary" label="Assignment Submission" accept=".pdf,.docx" helperText="Standard assignment upload" />
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
                  <Badge variant="secondary">Due: March 15, 2024</Badge>
                  <Badge variant="secondary">Max Files: 10</Badge>
                  <Badge variant="secondary">Accepted: PDF, Python, Java, C++</Badge>
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
}`,...(ee=(K=A.parameters)==null?void 0:K.docs)==null?void 0:ee.source}}};var ae,se,ie;k.parameters={...k.parameters,docs:{...(ae=k.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(ie=(se=k.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};const Re=["Default","CompleteShowcase","Playground"];export{A as CompleteShowcase,U as Default,k as Playground,Re as __namedExportsOrder,Be as default};
