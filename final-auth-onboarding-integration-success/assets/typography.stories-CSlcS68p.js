import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as h}from"./index-DJO9vBfz.js";import{c as x}from"./utils-CytzSlOG.js";import{c as S}from"./index-BwobEAja.js";import{H as g,a as y,b as v,c as f}from"./hive-tokens-BKUtHA8Z.js";import{B as u}from"./badge-B09J4pcg.js";import"./framer-motion-proxy-Bzlf7Pk2.js";const U=S("font-sans font-semibold tracking-tight text-[var(--hive-text-primary)]",{variants:{level:{1:"text-6xl leading-tight",2:"text-5xl leading-tight",3:"text-4xl leading-snug",4:"text-3xl leading-snug",5:"text-2xl leading-normal",6:"text-xl leading-normal"},color:{primary:"text-[var(--hive-text-primary)]",secondary:"text-[var(--hive-text-secondary)]",tertiary:"text-[var(--hive-text-tertiary)]",brand:"text-[var(--hive-brand-secondary)]",success:"text-[var(--hive-status-success)]",error:"text-[var(--hive-status-error)]",warning:"text-[var(--hive-status-warning)]",info:"text-[var(--hive-status-info)]"},weight:{light:"font-light",normal:"font-normal",medium:"font-medium",semibold:"font-semibold",bold:"font-bold"}},defaultVariants:{level:2,color:"primary",weight:"semibold"}}),O=S("font-sans text-[var(--hive-text-primary)]",{variants:{size:{xs:"text-xs leading-relaxed",sm:"text-sm leading-relaxed",base:"text-base leading-relaxed",lg:"text-lg leading-relaxed",xl:"text-xl leading-relaxed"},color:{primary:"text-[var(--hive-text-primary)]",secondary:"text-[var(--hive-text-secondary)]",tertiary:"text-[var(--hive-text-tertiary)]",disabled:"text-[var(--hive-text-disabled)]",brand:"text-[var(--hive-brand-secondary)]",success:"text-[var(--hive-status-success)]",error:"text-[var(--hive-status-error)]",warning:"text-[var(--hive-status-warning)]",info:"text-[var(--hive-status-info)]",inverse:"text-[var(--hive-text-inverse)]"},weight:{light:"font-light",normal:"font-normal",medium:"font-medium",semibold:"font-semibold",bold:"font-bold"},decoration:{none:"no-underline",underline:"underline","line-through":"line-through"}},defaultVariants:{size:"base",color:"primary",weight:"normal",decoration:"none"}}),R=S("font-sans text-xs text-[var(--hive-text-tertiary)] leading-relaxed",{variants:{color:{tertiary:"text-[var(--hive-text-tertiary)]",disabled:"text-[var(--hive-text-disabled)]",brand:"text-[var(--hive-brand-secondary)]",success:"text-[var(--hive-status-success)]",error:"text-[var(--hive-status-error)]",warning:"text-[var(--hive-status-warning)]",info:"text-[var(--hive-status-info)]"},weight:{normal:"font-normal",medium:"font-medium",semibold:"font-semibold"}},defaultVariants:{color:"tertiary",weight:"normal"}}),q=S("font-sans text-[var(--hive-brand-secondary)] underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] rounded-sm",{variants:{color:{brand:"text-[var(--hive-brand-secondary)] hover:text-[color-mix(in_srgb,var(--hive-brand-secondary)_80%,transparent)]",primary:"text-[var(--hive-text-primary)] hover:text-[var(--hive-brand-secondary)]",secondary:"text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",tertiary:"text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-secondary)]"},decoration:{always:"underline",hover:"no-underline hover:underline",none:"no-underline"}},defaultVariants:{color:"brand",decoration:"hover"}}),n=h.forwardRef(({className:t,level:o=2,color:l,weight:c,as:m,...j},L)=>{const w=m||`h${o}`;return h.createElement(w,{ref:L,className:x(U({level:o,color:l,weight:c}),t),...j})});n.displayName="Heading";const i=h.forwardRef(({className:t,size:o,color:l,weight:c,decoration:m,as:j="p",...L},w)=>h.createElement(j,{ref:w,className:x(O({size:o,color:l,weight:c,decoration:m}),t),...L}));i.displayName="Text";const I=h.forwardRef(({className:t,color:o,weight:l,as:c="p",...m},j)=>h.createElement(c,{ref:j,className:x(R({color:o,weight:l}),t),...m}));I.displayName="Caption";const d=h.forwardRef(({className:t,color:o,decoration:l,...c},m)=>e.jsx("a",{ref:m,className:x(q({color:o,decoration:l}),t),...c}));d.displayName="Link";const r=h.forwardRef(({className:t,variant:o="inline",...l},c)=>{const m="font-mono text-[var(--hive-text-primary)] bg-[color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)] rounded-sm";return o==="block"?e.jsx("pre",{ref:c,className:x(m,"block p-4 overflow-x-auto border border-[var(--hive-border-default)]",t),...l}):e.jsx("code",{ref:c,className:x(m,"px-1.5 py-0.5",t),...l})});r.displayName="Code";const T=h.forwardRef(({className:t,...o},l)=>e.jsx("blockquote",{ref:l,className:x("border-l-4 border-[var(--hive-brand-secondary)] pl-6 italic text-[var(--hive-text-secondary)]",t),...o}));T.displayName="Blockquote";const p=h.forwardRef(({className:t,variant:o="unordered",...l},c)=>{const m=o==="ordered"?"ol":"ul";return h.createElement(m,{ref:c,className:x("space-y-2 text-[var(--hive-text-primary)]",o==="unordered"&&"list-disc list-inside",o==="ordered"&&"list-decimal list-inside",t),...l})});p.displayName="List";const a=h.forwardRef(({className:t,...o},l)=>e.jsx("li",{ref:l,className:x("text-[var(--hive-text-primary)]",t),...o}));a.displayName="ListItem";const s={PageTitle:t=>e.jsx(n,{level:1,weight:"bold",...t}),SectionTitle:t=>e.jsx(n,{level:2,weight:"semibold",...t}),CardTitle:t=>e.jsx(n,{level:3,weight:"medium",...t}),Body:t=>e.jsx(i,{size:"base",...t}),Small:t=>e.jsx(i,{size:"sm",color:"secondary",...t}),CaptionText:t=>e.jsx(I,{color:"tertiary",...t}),ErrorText:t=>e.jsx(i,{size:"sm",color:"error",...t}),SuccessText:t=>e.jsx(i,{size:"sm",color:"success",...t}),BrandText:t=>e.jsx(i,{color:"brand",weight:"medium",...t})};n.__docgenInfo={description:"",methods:[],displayName:"Heading",props:{as:{required:!1,tsType:{name:"union",raw:'"h1" | "h2" | "h3" | "h4" | "h5" | "h6"',elements:[{name:"literal",value:'"h1"'},{name:"literal",value:'"h2"'},{name:"literal",value:'"h3"'},{name:"literal",value:'"h4"'},{name:"literal",value:'"h5"'},{name:"literal",value:'"h6"'}]},description:""},level:{defaultValue:{value:"2",computed:!1},required:!1}},composes:["Omit","VariantProps"]};i.__docgenInfo={description:"",methods:[],displayName:"Text",props:{as:{required:!1,tsType:{name:"union",raw:'"p" | "span" | "div" | "label"',elements:[{name:"literal",value:'"p"'},{name:"literal",value:'"span"'},{name:"literal",value:'"div"'},{name:"literal",value:'"label"'}]},description:"",defaultValue:{value:'"p"',computed:!1}}},composes:["Omit","VariantProps"]};I.__docgenInfo={description:"",methods:[],displayName:"Caption",props:{as:{required:!1,tsType:{name:"union",raw:'"p" | "span" | "div" | "figcaption"',elements:[{name:"literal",value:'"p"'},{name:"literal",value:'"span"'},{name:"literal",value:'"div"'},{name:"literal",value:'"figcaption"'}]},description:"",defaultValue:{value:'"p"',computed:!1}}},composes:["Omit","VariantProps"]};d.__docgenInfo={description:"",methods:[],displayName:"Link",composes:["Omit","VariantProps"]};r.__docgenInfo={description:"",methods:[],displayName:"Code",props:{variant:{required:!1,tsType:{name:"union",raw:'"inline" | "block"',elements:[{name:"literal",value:'"inline"'},{name:"literal",value:'"block"'}]},description:"",defaultValue:{value:'"inline"',computed:!1}}}};T.__docgenInfo={description:"",methods:[],displayName:"Blockquote"};p.__docgenInfo={description:"",methods:[],displayName:"List",props:{variant:{required:!1,tsType:{name:"union",raw:'"unordered" | "ordered"',elements:[{name:"literal",value:'"unordered"'},{name:"literal",value:'"ordered"'}]},description:"",defaultValue:{value:'"unordered"',computed:!1}}}};a.__docgenInfo={description:"",methods:[],displayName:"ListItem"};const K={title:"01-Atoms/Typography - COMPLETE DEFINITION",component:n,parameters:{docs:{description:{component:`
## 🎯 HIVE Typography - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated typography system for University at Buffalo campus content display and text hierarchy.

### 🏆 **COMPONENT EXCELLENCE**
- **7 Typography Components** - Heading, Text, Caption, Link, Code, Blockquote, List
- **Semantic Token Perfection** - 100% semantic token usage with color-mix sophistication
- **Smart Text Hierarchy** - 6 heading levels, multiple text sizes, comprehensive styling
- **Advanced Typography** - Display fonts, text weights, color variants, decorations
- **Perfect Accessibility** - Screen reader optimized, semantic HTML, keyboard navigation
- **Campus Content Ready** - Optimized for UB academic content and campus communication
- **Typography Presets** - Pre-built patterns for common campus text scenarios

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo text content and academic communication:
- **Academic Content** - Course descriptions, assignment text, research papers
- **Campus Communications** - Announcements, event descriptions, policy documents
- **Student Information** - Profile descriptions, bio text, academic achievements
- **Documentation** - Help articles, guides, FAQ content, instructional materials
- **Interactive Content** - Links to campus resources, email addresses, phone numbers

### 📱 **MOBILE OPTIMIZATION**
- **Readable Text** - Optimized line heights and spacing for mobile reading
- **Touch-Friendly Links** - Proper link sizing for thumb navigation
- **Responsive Hierarchy** - Typography scales appropriately across device sizes
`}}},tags:["autodocs"],argTypes:{level:{control:"select",options:[1,2,3,4,5,6],description:"Heading level (semantic HTML and visual hierarchy)"},color:{control:"select",options:["primary","secondary","tertiary","brand","success","error","warning","info"],description:"Text color variant"},weight:{control:"select",options:["light","normal","medium","semibold","bold"],description:"Font weight"},as:{control:"select",options:["h1","h2","h3","h4","h5","h6"],description:"HTML element override"}}},C={args:{level:2,color:"primary",weight:"semibold",children:"University at Buffalo Campus Life"}},N={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(g,{children:[e.jsxs(y,{children:[e.jsxs(v,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"success",children:"✅ HEADINGS"}),"Heading Hierarchy - Semantic Levels & Visual Scale"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"6 heading levels with perfect semantic tokens and visual hierarchy"})]}),e.jsx(f,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"grid gap-4",children:[e.jsx(n,{level:1,color:"primary",children:"H1: University at Buffalo - Premium Learning Experience"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Level 1: Hero headings for main page titles and primary branding"})]}),e.jsxs("div",{className:"grid gap-4",children:[e.jsx(n,{level:2,color:"primary",children:"H2: Student Life & Campus Community"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Level 2: Page headings for major sections and landing pages"})]}),e.jsxs("div",{className:"grid gap-4",children:[e.jsx(n,{level:3,color:"primary",children:"H3: Academic Programs & Course Offerings"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Level 3: Section headings for content areas and feature highlights"})]}),e.jsxs("div",{className:"grid gap-4",children:[e.jsx(n,{level:4,color:"primary",children:"H4: Computer Science Department Resources"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Level 4: Subsection headings for detailed content areas"})]}),e.jsxs("div",{className:"grid gap-4",children:[e.jsx(n,{level:5,color:"primary",children:"H5: CSE 331 Algorithm Analysis Course"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Level 5: Component headings for cards and smaller sections"})]}),e.jsxs("div",{className:"grid gap-4",children:[e.jsx(n,{level:6,color:"primary",children:"H6: Assignment 3: Dynamic Programming"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Level 6: Small headings for detailed items and labels"})]})]})})})]}),e.jsxs(g,{children:[e.jsxs(y,{children:[e.jsxs(v,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"info",children:"🎨 COLORS"}),"Typography Colors - Semantic Token Usage"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"8 semantic color variants for different content contexts"})]}),e.jsx(f,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(n,{level:3,color:"primary",children:"Primary Text - Main Content"}),e.jsx(i,{color:"primary",children:"Primary color is used for main content text and primary headings throughout the UB campus platform."}),e.jsx(n,{level:3,color:"secondary",children:"Secondary Text - Supporting Content"}),e.jsx(i,{color:"secondary",children:"Secondary color provides subtle contrast for supporting information and less prominent content."}),e.jsx(n,{level:3,color:"tertiary",children:"Tertiary Text - Metadata"}),e.jsx(i,{color:"tertiary",children:"Tertiary color is perfect for timestamps, metadata, and supplementary information."}),e.jsx(n,{level:3,color:"brand",children:"Brand Text - UB Gold Emphasis"}),e.jsx(i,{color:"brand",children:"Brand color uses UB's signature gold for highlighting important campus-related content."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(n,{level:3,color:"success",children:"Success Text - Positive Status"}),e.jsx(i,{color:"success",children:"Success color indicates completed assignments, passed courses, and positive achievements."}),e.jsx(n,{level:3,color:"error",children:"Error Text - Critical Information"}),e.jsx(i,{color:"error",children:"Error color alerts students to failed submissions, missing requirements, or urgent issues."}),e.jsx(n,{level:3,color:"warning",children:"Warning Text - Attention Required"}),e.jsx(i,{color:"warning",children:"Warning color highlights deadlines approaching, incomplete profiles, or items needing attention."}),e.jsx(n,{level:3,color:"info",children:"Info Text - Informational Content"}),e.jsx(i,{color:"info",children:"Info color provides helpful tips, additional context, and supplementary academic information."})]})]})})})]}),e.jsxs(g,{children:[e.jsxs(y,{children:[e.jsxs(v,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"primary",children:"📏 SIZES & WEIGHTS"}),"Text Sizes & Font Weights - Visual Hierarchy"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Comprehensive text sizing and weight options for all campus content needs"})]}),e.jsx(f,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Text Sizes:"}),e.jsx("div",{className:"space-y-3",children:e.jsxs("div",{className:"grid gap-2",children:[e.jsx(i,{size:"xs",children:"Extra Small: Course code references, footnotes, and fine print details"}),e.jsx(i,{size:"sm",children:"Small: Captions, metadata, timestamps, and supplementary information"}),e.jsx(i,{size:"base",children:"Base: Standard body text for articles, descriptions, and main content"}),e.jsx(i,{size:"lg",children:"Large: Prominent text for important announcements and featured content"}),e.jsx(i,{size:"xl",children:"Extra Large: Emphasis text for key messages and call-to-action content"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Font Weights:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{weight:"light",children:"Light: Subtle text for less important information and secondary details"}),e.jsx(i,{weight:"normal",children:"Normal: Standard body text weight for comfortable reading experiences"}),e.jsx(i,{weight:"medium",children:"Medium: Slightly emphasized text for labels and important information"}),e.jsx(i,{weight:"semibold",children:"Semibold: Strong emphasis for headings and key content highlights"}),e.jsx(i,{weight:"bold",children:"Bold: Maximum emphasis for critical information and strong calls-to-action"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Text Decorations:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{decoration:"none",children:"No decoration: Standard text without any visual enhancements"}),e.jsx(i,{decoration:"underline",children:"Underlined: Emphasized text for important notices and highlights"}),e.jsx(i,{decoration:"line-through",children:"Strikethrough: Cancelled events, outdated information, or completed tasks"})]})]})]})})]}),e.jsxs(g,{children:[e.jsxs(y,{children:[e.jsxs(v,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"secondary",children:"⚡ COMPONENTS"}),"Advanced Typography - Links, Code, Quotes, Lists"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Specialized typography components for rich campus content formatting"})]}),e.jsx(f,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Interactive Links:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(d,{href:"https://buffalo.edu",color:"brand",children:"University at Buffalo Official Website"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Brand links for official UB resources and campus websites"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(d,{href:"mailto:example@buffalo.edu",color:"primary",children:"Contact Academic Advisor"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Primary links for email addresses and contact information"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(d,{href:"#",color:"secondary",decoration:"always",children:"Secondary Resource Link"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Secondary links with persistent underlines for clarity"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(d,{href:"#",color:"tertiary",decoration:"none",children:"Subtle Navigation Link"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Tertiary links without decoration for subtle navigation"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Code & Technical Content:"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs(i,{children:["For CSE 331, you'll need to implement the ",e.jsx(r,{children:"dijkstra"})," algorithm using a ",e.jsx(r,{children:"PriorityQueue"})," data structure."]}),e.jsx(i,{size:"sm",color:"tertiary",children:"Inline code for technical terms and function names"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(r,{variant:"block",children:`// Assignment 3: Dynamic Programming Solution
function fibonacci(n) {
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  
  return dp[n];
}`}),e.jsx(i,{size:"sm",color:"tertiary",children:"Block code for algorithm examples and code submissions"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Academic Quotes & Citations:"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(T,{children:`"The University at Buffalo is committed to providing an inclusive environment where all students can thrive academically and personally, contributing to a vibrant campus community that prepares leaders for tomorrow's challenges."`}),e.jsx(i,{size:"sm",color:"tertiary",children:"— President Satish K. Tripathi, University at Buffalo"}),e.jsx(T,{children:`"Computer science is not just about programming. It's about problem-solving, critical thinking, and creating solutions that can change the world. Our students learn to think algorithmically and approach complex challenges systematically."`}),e.jsx(i,{size:"sm",color:"tertiary",children:"— CSE Department Mission Statement"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Lists & Structured Content:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{weight:"medium",children:"CSE Core Requirements:"}),e.jsxs(p,{variant:"unordered",children:[e.jsx(a,{children:"CSE 115 - Introduction to Computer Science I"}),e.jsx(a,{children:"CSE 116 - Introduction to Computer Science II"}),e.jsx(a,{children:"CSE 250 - Data Structures"}),e.jsx(a,{children:"CSE 331 - Algorithm Analysis and Design"}),e.jsx(a,{children:"CSE 341 - Computer Organization"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{weight:"medium",children:"Academic Timeline:"}),e.jsxs(p,{variant:"ordered",children:[e.jsx(a,{children:"Complete prerequisite courses (Year 1-2)"}),e.jsx(a,{children:"Declare computer science major"}),e.jsx(a,{children:"Fulfill core requirements (Year 2-3)"}),e.jsx(a,{children:"Choose specialization track"}),e.jsx(a,{children:"Complete capstone project (Year 4)"})]})]})]})]})]})})]}),e.jsxs(g,{children:[e.jsxs(y,{children:[e.jsxs(v,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"primary",children:"🎯 PRESETS"}),"Typography Presets - Common Campus Patterns"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Pre-built typography components for common campus content scenarios"})]}),e.jsx(f,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-8",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Page Titles:"}),e.jsx(s.PageTitle,{children:"Student Dashboard"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Hero-level page titles for main sections"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Section Titles:"}),e.jsx(s.SectionTitle,{children:"My Courses - Spring 2025"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Section headings for content areas"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Card Titles:"}),e.jsx(s.CardTitle,{children:"CSE 331 - Algorithm Analysis"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Card and component headings"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Body Text:"}),e.jsx(s.Body,{children:"This course covers fundamental algorithm design techniques including divide-and-conquer, dynamic programming, and greedy algorithms. Students will analyze algorithm complexity and implement solutions to complex problems."}),e.jsx(i,{size:"sm",color:"tertiary",children:"Standard body text for descriptions"})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Small Text:"}),e.jsx(s.Small,{children:"Last updated: March 15, 2025 at 2:30 PM EST"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Timestamps and metadata"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Caption Text:"}),e.jsx(s.CaptionText,{children:"Figure 1: Student enrollment trends by academic department"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Image captions and figure labels"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Error Text:"}),e.jsx(s.ErrorText,{children:"Assignment submission failed. Please check your file format."}),e.jsx(i,{size:"sm",color:"tertiary",children:"Error messages and critical alerts"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Success Text:"}),e.jsx(s.SuccessText,{children:"Course registration completed successfully!"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Success confirmations and positive feedback"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Brand Text:"}),e.jsx(s.BrandText,{children:"University at Buffalo - The State University of New York"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Official branding and university references"})]})]})]})})})]}),e.jsxs(g,{children:[e.jsxs(y,{children:[e.jsxs(v,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Typography Usage"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Typography examples from actual University at Buffalo academic and campus contexts"})]}),e.jsxs(f,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(s.SectionTitle,{children:"CSE 331: Algorithm Analysis and Design - Spring 2025"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(s.CardTitle,{children:"Course Information"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(i,{weight:"medium",children:"Instructor:"}),e.jsx(i,{children:"Dr. Sarah Johnson"}),e.jsx(d,{href:"mailto:sjohnson@buffalo.edu",color:"brand",children:"sjohnson@buffalo.edu"})]}),e.jsxs("div",{children:[e.jsx(i,{weight:"medium",children:"Office Hours:"}),e.jsx(i,{children:"TTh 3:00-4:30 PM, Davis Hall 338"}),e.jsx(i,{size:"sm",color:"tertiary",children:"Or by appointment"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s.CardTitle,{children:"Course Description"}),e.jsx(s.Body,{children:"This course provides a comprehensive introduction to algorithm design and analysis. Students will learn fundamental algorithmic techniques including divide-and-conquer, dynamic programming, greedy algorithms, and graph algorithms. Emphasis is placed on understanding algorithm correctness, analyzing time and space complexity, and implementing efficient solutions to computational problems."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s.CardTitle,{children:"Learning Objectives"}),e.jsxs(p,{variant:"ordered",children:[e.jsx(a,{children:"Design and analyze efficient algorithms for various computational problems"}),e.jsx(a,{children:"Apply mathematical techniques to prove algorithm correctness and analyze complexity"}),e.jsx(a,{children:"Implement algorithms using appropriate data structures in Python and Java"}),e.jsx(a,{children:"Compare different algorithmic approaches and select optimal solutions"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s.CardTitle,{children:"Prerequisites"}),e.jsxs(i,{children:[e.jsx(i,{weight:"medium",children:"Required:"})," CSE 250 (Data Structures), MTH 141 (College Calculus I)"]}),e.jsxs(i,{children:[e.jsx(i,{weight:"medium",children:"Recommended:"})," MTH 241 (College Calculus II), MTH 311 (Introduction to Discrete Mathematics)"]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(s.SectionTitle,{children:"Campus Event Announcement"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsx(s.PageTitle,{color:"brand",children:"UB Tech Career Fair 2025"}),e.jsxs("div",{className:"flex items-center gap-4 text-sm",children:[e.jsx(u,{variant:"success",children:"Registration Open"}),e.jsx(s.Small,{children:"March 22, 2025 • Student Union Ballrooms"})]}),e.jsx(s.Body,{children:"Join us for the largest technology career fair in Western New York! Connect with leading tech companies, startups, and UB alumni working in the technology industry. This is your opportunity to explore internship and full-time opportunities, network with professionals, and learn about exciting career paths in computer science, engineering, and technology."}),e.jsx(T,{children:'"The UB Tech Career Fair has been instrumental in connecting our students with amazing opportunities. Last year, over 75% of participating students received interview offers, and many secured internships or full-time positions."'}),e.jsx(i,{size:"sm",color:"tertiary",children:"— Dr. Michael Chen, CSE Career Services Director"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{weight:"medium",children:"Featured Companies:"}),e.jsxs(p,{variant:"unordered",children:[e.jsx(a,{children:"Google • Software Engineering"}),e.jsx(a,{children:"Microsoft • Cloud Computing"}),e.jsx(a,{children:"Apple • Mobile Development"}),e.jsx(a,{children:"Amazon • AWS Solutions"}),e.jsx(a,{children:"Meta • Social Platform Engineering"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{weight:"medium",children:"Event Schedule:"}),e.jsxs(p,{variant:"ordered",children:[e.jsxs(a,{children:[e.jsx(r,{children:"10:00 AM"})," - Registration & Welcome"]}),e.jsxs(a,{children:[e.jsx(r,{children:"10:30 AM"})," - Company Fair Opens"]}),e.jsxs(a,{children:[e.jsx(r,{children:"12:00 PM"})," - Networking Lunch"]}),e.jsxs(a,{children:[e.jsx(r,{children:"1:00 PM"})," - Technical Workshops"]}),e.jsxs(a,{children:[e.jsx(r,{children:"3:00 PM"})," - One-on-One Interviews"]})]})]})]}),e.jsxs("div",{className:"bg-[var(--hive-brand-secondary)] bg-opacity-10 p-4 rounded-lg",children:[e.jsx(i,{weight:"semibold",color:"brand",children:"Important Registration Information:"}),e.jsxs(i,{size:"sm",children:["Space is limited to 300 students. Registration closes March 18th or when capacity is reached. Bring multiple copies of your resume and dress professionally.",e.jsx(d,{href:"#",color:"brand",children:" Click here to register now"}),"."]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(s.SectionTitle,{children:"Research Publication Example"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsx(s.CardTitle,{children:"Optimizing Campus Resource Allocation Through Machine Learning: A University at Buffalo Case Study"}),e.jsxs("div",{className:"flex flex-wrap items-center gap-4 text-sm",children:[e.jsx(i,{size:"sm",weight:"medium",children:"Authors:"}),e.jsx(d,{href:"#",color:"brand",children:"Dr. Jennifer Liu"}),e.jsx(d,{href:"#",color:"brand",children:"Prof. David Rodriguez"}),e.jsx(d,{href:"#",color:"brand",children:"Alex Chen (PhD Candidate)"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{weight:"medium",children:"Abstract"}),e.jsx(s.Body,{children:"This paper presents a novel machine learning approach to optimize campus resource allocation at the University at Buffalo. Using five years of historical data including student enrollment, facility usage, and academic performance metrics, we developed a predictive model that improves resource utilization by 23% while maintaining student satisfaction scores above 4.2/5.0."}),e.jsxs(s.Body,{children:["Our methodology combines ",e.jsx(r,{children:"random forest regression"})," with ",e.jsx(r,{children:"k-means clustering"}),"to identify optimal allocation patterns for study spaces, computer labs, and dining facilities. The model achieves 89% accuracy in predicting peak usage periods and successfully reduced wait times by an average of 15 minutes across all campus facilities."]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{weight:"medium",children:"Key Findings"}),e.jsxs(p,{variant:"unordered",children:[e.jsx(a,{children:"Machine learning models can accurately predict campus facility usage patterns"}),e.jsx(a,{children:"Dynamic resource allocation reduces student wait times and improves satisfaction"}),e.jsx(a,{children:"Cross-semester data analysis reveals consistent behavioral patterns in student populations"}),e.jsx(a,{children:"Integration with existing campus systems requires minimal infrastructure changes"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{weight:"medium",children:"Publication Details"}),e.jsxs(i,{size:"sm",children:[e.jsx(i,{weight:"medium",children:"Journal:"})," International Conference on Educational Technology and Smart Campus Systems"]}),e.jsxs(i,{size:"sm",children:[e.jsx(i,{weight:"medium",children:"Publication Date:"})," March 2025"]}),e.jsxs(i,{size:"sm",children:[e.jsx(i,{weight:"medium",children:"DOI:"})," ",e.jsx(d,{href:"#",color:"brand",children:"10.1109/ETSC.2025.123456"})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(s.SectionTitle,{children:"Student Profile Example"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s.CardTitle,{children:"Alex Kim - Computer Science Major"}),e.jsx(u,{variant:"primary",children:"Class of 2025"})]}),e.jsx(s.Body,{children:"Senior Computer Science student at the University at Buffalo with a passion for artificial intelligence and machine learning. Currently working on a capstone project developing a campus navigation app that uses computer vision to help students with disabilities navigate the North and South campuses more effectively."}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{weight:"medium",children:"Academic Achievements:"}),e.jsxs(p,{variant:"unordered",children:[e.jsx(a,{children:"Dean's List (Fall 2023, Spring 2024)"}),e.jsx(a,{children:"CSE Outstanding Student Award 2024"}),e.jsx(a,{children:"Undergraduate Research Fellowship"}),e.jsx(a,{children:"ACM Student Chapter President"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{weight:"medium",children:"Technical Skills:"}),e.jsxs(p,{variant:"unordered",children:[e.jsxs(a,{children:[e.jsx(r,{children:"Python"}),", ",e.jsx(r,{children:"Java"}),", ",e.jsx(r,{children:"C++"})]}),e.jsxs(a,{children:[e.jsx(r,{children:"TensorFlow"}),", ",e.jsx(r,{children:"PyTorch"}),", ",e.jsx(r,{children:"scikit-learn"})]}),e.jsxs(a,{children:[e.jsx(r,{children:"React"}),", ",e.jsx(r,{children:"Node.js"}),", ",e.jsx(r,{children:"MongoDB"})]}),e.jsxs(a,{children:[e.jsx(r,{children:"AWS"}),", ",e.jsx(r,{children:"Docker"}),", ",e.jsx(r,{children:"Kubernetes"})]})]})]})]}),e.jsx(T,{children:`"UB has provided me with incredible opportunities to explore cutting-edge research while building practical skills through hands-on projects. The Computer Science department's emphasis on both theoretical foundations and real-world applications has prepared me well for my career in technology."`}),e.jsxs("div",{className:"flex items-center gap-6 text-sm",children:[e.jsx(d,{href:"mailto:alex.kim@buffalo.edu",color:"brand",children:"alex.kim@buffalo.edu"}),e.jsx(d,{href:"#",color:"primary",children:"LinkedIn Profile"}),e.jsx(d,{href:"#",color:"primary",children:"GitHub Portfolio"})]})]})]})]})]})]})},b={args:{level:2,color:"primary",weight:"semibold",children:"University at Buffalo Campus Experience"},render:t=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(g,{children:[e.jsxs(y,{children:[e.jsx(v,{children:"Typography Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different typography configurations"})]}),e.jsx(f,{className:"flex justify-center",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx(n,{...t})})})]})})};var P,k,B;C.parameters={...C.parameters,docs:{...(P=C.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    level: 2,
    color: 'primary',
    weight: 'semibold',
    children: 'University at Buffalo Campus Life'
  }
}`,...(B=(k=C.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var z,E,H;N.parameters={...N.parameters,docs:{...(z=N.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Heading Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">✅ HEADINGS</Badge>
            Heading Hierarchy - Semantic Levels & Visual Scale
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 heading levels with perfect semantic tokens and visual hierarchy
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-4">
                <Heading level={1} color="primary">
                  H1: University at Buffalo - Premium Learning Experience
                </Heading>
                <Text size="sm" color="tertiary">Level 1: Hero headings for main page titles and primary branding</Text>
              </div>
              
              <div className="grid gap-4">
                <Heading level={2} color="primary">
                  H2: Student Life & Campus Community
                </Heading>
                <Text size="sm" color="tertiary">Level 2: Page headings for major sections and landing pages</Text>
              </div>
              
              <div className="grid gap-4">
                <Heading level={3} color="primary">
                  H3: Academic Programs & Course Offerings
                </Heading>
                <Text size="sm" color="tertiary">Level 3: Section headings for content areas and feature highlights</Text>
              </div>
              
              <div className="grid gap-4">
                <Heading level={4} color="primary">
                  H4: Computer Science Department Resources
                </Heading>
                <Text size="sm" color="tertiary">Level 4: Subsection headings for detailed content areas</Text>
              </div>
              
              <div className="grid gap-4">
                <Heading level={5} color="primary">
                  H5: CSE 331 Algorithm Analysis Course
                </Heading>
                <Text size="sm" color="tertiary">Level 5: Component headings for cards and smaller sections</Text>
              </div>
              
              <div className="grid gap-4">
                <Heading level={6} color="primary">
                  H6: Assignment 3: Dynamic Programming
                </Heading>
                <Text size="sm" color="tertiary">Level 6: Small headings for detailed items and labels</Text>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 COLORS</Badge>
            Typography Colors - Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            8 semantic color variants for different content contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Heading level={3} color="primary">
                  Primary Text - Main Content
                </Heading>
                <Text color="primary">
                  Primary color is used for main content text and primary headings throughout the UB campus platform.
                </Text>
                
                <Heading level={3} color="secondary">
                  Secondary Text - Supporting Content
                </Heading>
                <Text color="secondary">
                  Secondary color provides subtle contrast for supporting information and less prominent content.
                </Text>
                
                <Heading level={3} color="tertiary">
                  Tertiary Text - Metadata
                </Heading>
                <Text color="tertiary">
                  Tertiary color is perfect for timestamps, metadata, and supplementary information.
                </Text>
                
                <Heading level={3} color="brand">
                  Brand Text - UB Gold Emphasis
                </Heading>
                <Text color="brand">
                  Brand color uses UB's signature gold for highlighting important campus-related content.
                </Text>
              </div>
              
              <div className="space-y-4">
                <Heading level={3} color="success">
                  Success Text - Positive Status
                </Heading>
                <Text color="success">
                  Success color indicates completed assignments, passed courses, and positive achievements.
                </Text>
                
                <Heading level={3} color="error">
                  Error Text - Critical Information
                </Heading>
                <Text color="error">
                  Error color alerts students to failed submissions, missing requirements, or urgent issues.
                </Text>
                
                <Heading level={3} color="warning">
                  Warning Text - Attention Required
                </Heading>
                <Text color="warning">
                  Warning color highlights deadlines approaching, incomplete profiles, or items needing attention.
                </Text>
                
                <Heading level={3} color="info">
                  Info Text - Informational Content
                </Heading>
                <Text color="info">
                  Info color provides helpful tips, additional context, and supplementary academic information.
                </Text>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text Sizes & Weights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">📏 SIZES & WEIGHTS</Badge>
            Text Sizes & Font Weights - Visual Hierarchy
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive text sizing and weight options for all campus content needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Text Sizes */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Text Sizes:</h4>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Text size="xs">Extra Small: Course code references, footnotes, and fine print details</Text>
                  <Text size="sm">Small: Captions, metadata, timestamps, and supplementary information</Text>
                  <Text size="base">Base: Standard body text for articles, descriptions, and main content</Text>
                  <Text size="lg">Large: Prominent text for important announcements and featured content</Text>
                  <Text size="xl">Extra Large: Emphasis text for key messages and call-to-action content</Text>
                </div>
              </div>
            </div>

            {/* Font Weights */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Font Weights:</h4>
              <div className="space-y-3">
                <Text weight="light">Light: Subtle text for less important information and secondary details</Text>
                <Text weight="normal">Normal: Standard body text weight for comfortable reading experiences</Text>
                <Text weight="medium">Medium: Slightly emphasized text for labels and important information</Text>
                <Text weight="semibold">Semibold: Strong emphasis for headings and key content highlights</Text>
                <Text weight="bold">Bold: Maximum emphasis for critical information and strong calls-to-action</Text>
              </div>
            </div>

            {/* Text Decorations */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Text Decorations:</h4>
              <div className="space-y-3">
                <Text decoration="none">No decoration: Standard text without any visual enhancements</Text>
                <Text decoration="underline">Underlined: Emphasized text for important notices and highlights</Text>
                <Text decoration="line-through">Strikethrough: Cancelled events, outdated information, or completed tasks</Text>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Advanced Typography Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">⚡ COMPONENTS</Badge>
            Advanced Typography - Links, Code, Quotes, Lists
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Specialized typography components for rich campus content formatting
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Links */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive Links:</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Link href="https://buffalo.edu" color="brand">
                    University at Buffalo Official Website
                  </Link>
                  <Text size="sm" color="tertiary">Brand links for official UB resources and campus websites</Text>
                </div>
                
                <div className="space-y-2">
                  <Link href="mailto:example@buffalo.edu" color="primary">
                    Contact Academic Advisor
                  </Link>
                  <Text size="sm" color="tertiary">Primary links for email addresses and contact information</Text>
                </div>
                
                <div className="space-y-2">
                  <Link href="#" color="secondary" decoration="always">
                    Secondary Resource Link
                  </Link>
                  <Text size="sm" color="tertiary">Secondary links with persistent underlines for clarity</Text>
                </div>
                
                <div className="space-y-2">
                  <Link href="#" color="tertiary" decoration="none">
                    Subtle Navigation Link
                  </Link>
                  <Text size="sm" color="tertiary">Tertiary links without decoration for subtle navigation</Text>
                </div>
              </div>
            </div>

            {/* Code */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Code & Technical Content:</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Text>
                    For CSE 331, you'll need to implement the <Code>dijkstra</Code> algorithm 
                    using a <Code>PriorityQueue</Code> data structure.
                  </Text>
                  <Text size="sm" color="tertiary">Inline code for technical terms and function names</Text>
                </div>
                
                <div className="space-y-2">
                  <Code variant="block">
                  {\`// Assignment 3: Dynamic Programming Solution
function fibonacci(n) {
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  
  return dp[n];
}\`}
                  </Code>
                  <Text size="sm" color="tertiary">Block code for algorithm examples and code submissions</Text>
                </div>
              </div>
            </div>

            {/* Blockquotes */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Academic Quotes & Citations:</h4>
              <div className="space-y-4">
                <Blockquote>
                  "The University at Buffalo is committed to providing an inclusive environment 
                  where all students can thrive academically and personally, contributing to a 
                  vibrant campus community that prepares leaders for tomorrow's challenges."
                </Blockquote>
                <Text size="sm" color="tertiary">— President Satish K. Tripathi, University at Buffalo</Text>
                
                <Blockquote>
                  "Computer science is not just about programming. It's about problem-solving, 
                  critical thinking, and creating solutions that can change the world. Our students 
                  learn to think algorithmically and approach complex challenges systematically."
                </Blockquote>
                <Text size="sm" color="tertiary">— CSE Department Mission Statement</Text>
              </div>
            </div>

            {/* Lists */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Lists & Structured Content:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Text weight="medium">CSE Core Requirements:</Text>
                  <List variant="unordered">
                    <ListItem>CSE 115 - Introduction to Computer Science I</ListItem>
                    <ListItem>CSE 116 - Introduction to Computer Science II</ListItem>
                    <ListItem>CSE 250 - Data Structures</ListItem>
                    <ListItem>CSE 331 - Algorithm Analysis and Design</ListItem>
                    <ListItem>CSE 341 - Computer Organization</ListItem>
                  </List>
                </div>
                
                <div className="space-y-3">
                  <Text weight="medium">Academic Timeline:</Text>
                  <List variant="ordered">
                    <ListItem>Complete prerequisite courses (Year 1-2)</ListItem>
                    <ListItem>Declare computer science major</ListItem>
                    <ListItem>Fulfill core requirements (Year 2-3)</ListItem>
                    <ListItem>Choose specialization track</ListItem>
                    <ListItem>Complete capstone project (Year 4)</ListItem>
                  </List>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Typography Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎯 PRESETS</Badge>
            Typography Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built typography components for common campus content scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Page Titles:</h4>
                  <TypographyPresets.PageTitle>
                    Student Dashboard
                  </TypographyPresets.PageTitle>
                  <Text size="sm" color="tertiary">Hero-level page titles for main sections</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Section Titles:</h4>
                  <TypographyPresets.SectionTitle>
                    My Courses - Spring 2025
                  </TypographyPresets.SectionTitle>
                  <Text size="sm" color="tertiary">Section headings for content areas</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Card Titles:</h4>
                  <TypographyPresets.CardTitle>
                    CSE 331 - Algorithm Analysis
                  </TypographyPresets.CardTitle>
                  <Text size="sm" color="tertiary">Card and component headings</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Body Text:</h4>
                  <TypographyPresets.Body>
                    This course covers fundamental algorithm design techniques including 
                    divide-and-conquer, dynamic programming, and greedy algorithms. Students 
                    will analyze algorithm complexity and implement solutions to complex problems.
                  </TypographyPresets.Body>
                  <Text size="sm" color="tertiary">Standard body text for descriptions</Text>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Small Text:</h4>
                  <TypographyPresets.Small>
                    Last updated: March 15, 2025 at 2:30 PM EST
                  </TypographyPresets.Small>
                  <Text size="sm" color="tertiary">Timestamps and metadata</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Caption Text:</h4>
                  <TypographyPresets.CaptionText>
                    Figure 1: Student enrollment trends by academic department
                  </TypographyPresets.CaptionText>
                  <Text size="sm" color="tertiary">Image captions and figure labels</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Error Text:</h4>
                  <TypographyPresets.ErrorText>
                    Assignment submission failed. Please check your file format.
                  </TypographyPresets.ErrorText>
                  <Text size="sm" color="tertiary">Error messages and critical alerts</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Success Text:</h4>
                  <TypographyPresets.SuccessText>
                    Course registration completed successfully!
                  </TypographyPresets.SuccessText>
                  <Text size="sm" color="tertiary">Success confirmations and positive feedback</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Brand Text:</h4>
                  <TypographyPresets.BrandText>
                    University at Buffalo - The State University of New York
                  </TypographyPresets.BrandText>
                  <Text size="sm" color="tertiary">Official branding and university references</Text>
                </div>
              </div>
              
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Typography Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Typography examples from actual University at Buffalo academic and campus contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Syllabus */}
          <div className="space-y-4">
            <TypographyPresets.SectionTitle>
              CSE 331: Algorithm Analysis and Design - Spring 2025
            </TypographyPresets.SectionTitle>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="space-y-3">
                <TypographyPresets.CardTitle>Course Information</TypographyPresets.CardTitle>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Text weight="medium">Instructor:</Text>
                    <Text>Dr. Sarah Johnson</Text>
                    <Link href="mailto:sjohnson@buffalo.edu" color="brand">sjohnson@buffalo.edu</Link>
                  </div>
                  <div>
                    <Text weight="medium">Office Hours:</Text>
                    <Text>TTh 3:00-4:30 PM, Davis Hall 338</Text>
                    <Text size="sm" color="tertiary">Or by appointment</Text>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <TypographyPresets.CardTitle>Course Description</TypographyPresets.CardTitle>
                <TypographyPresets.Body>
                  This course provides a comprehensive introduction to algorithm design and analysis. 
                  Students will learn fundamental algorithmic techniques including divide-and-conquer, 
                  dynamic programming, greedy algorithms, and graph algorithms. Emphasis is placed on 
                  understanding algorithm correctness, analyzing time and space complexity, and 
                  implementing efficient solutions to computational problems.
                </TypographyPresets.Body>
              </div>
              
              <div className="space-y-3">
                <TypographyPresets.CardTitle>Learning Objectives</TypographyPresets.CardTitle>
                <List variant="ordered">
                  <ListItem>Design and analyze efficient algorithms for various computational problems</ListItem>
                  <ListItem>Apply mathematical techniques to prove algorithm correctness and analyze complexity</ListItem>
                  <ListItem>Implement algorithms using appropriate data structures in Python and Java</ListItem>
                  <ListItem>Compare different algorithmic approaches and select optimal solutions</ListItem>
                </List>
              </div>
              
              <div className="space-y-3">
                <TypographyPresets.CardTitle>Prerequisites</TypographyPresets.CardTitle>
                <Text>
                  <Text weight="medium">Required:</Text> CSE 250 (Data Structures), MTH 141 (College Calculus I)
                </Text>
                <Text>
                  <Text weight="medium">Recommended:</Text> MTH 241 (College Calculus II), MTH 311 (Introduction to Discrete Mathematics)
                </Text>
              </div>
              
            </div>
          </div>

          {/* Campus Event Announcement */}
          <div className="space-y-4">
            <TypographyPresets.SectionTitle>Campus Event Announcement</TypographyPresets.SectionTitle>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <TypographyPresets.PageTitle color="brand">
                UB Tech Career Fair 2025
              </TypographyPresets.PageTitle>
              
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="success">Registration Open</Badge>
                <TypographyPresets.Small>March 22, 2025 • Student Union Ballrooms</TypographyPresets.Small>
              </div>
              
              <TypographyPresets.Body>
                Join us for the largest technology career fair in Western New York! Connect with leading 
                tech companies, startups, and UB alumni working in the technology industry. This is your 
                opportunity to explore internship and full-time opportunities, network with professionals, 
                and learn about exciting career paths in computer science, engineering, and technology.
              </TypographyPresets.Body>
              
              <Blockquote>
                "The UB Tech Career Fair has been instrumental in connecting our students with amazing 
                opportunities. Last year, over 75% of participating students received interview offers, 
                and many secured internships or full-time positions."
              </Blockquote>
              <Text size="sm" color="tertiary">— Dr. Michael Chen, CSE Career Services Director</Text>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Text weight="medium">Featured Companies:</Text>
                  <List variant="unordered">
                    <ListItem>Google • Software Engineering</ListItem>
                    <ListItem>Microsoft • Cloud Computing</ListItem>
                    <ListItem>Apple • Mobile Development</ListItem>
                    <ListItem>Amazon • AWS Solutions</ListItem>
                    <ListItem>Meta • Social Platform Engineering</ListItem>
                  </List>
                </div>
                
                <div className="space-y-3">
                  <Text weight="medium">Event Schedule:</Text>
                  <List variant="ordered">
                    <ListItem><Code>10:00 AM</Code> - Registration & Welcome</ListItem>
                    <ListItem><Code>10:30 AM</Code> - Company Fair Opens</ListItem>
                    <ListItem><Code>12:00 PM</Code> - Networking Lunch</ListItem>
                    <ListItem><Code>1:00 PM</Code> - Technical Workshops</ListItem>
                    <ListItem><Code>3:00 PM</Code> - One-on-One Interviews</ListItem>
                  </List>
                </div>
              </div>
              
              <div className="bg-[var(--hive-brand-secondary)] bg-opacity-10 p-4 rounded-lg">
                <Text weight="semibold" color="brand">Important Registration Information:</Text>
                <Text size="sm">
                  Space is limited to 300 students. Registration closes March 18th or when capacity is reached. 
                  Bring multiple copies of your resume and dress professionally. 
                  <Link href="#" color="brand"> Click here to register now</Link>.
                </Text>
              </div>
              
            </div>
          </div>

          {/* Academic Research Abstract */}
          <div className="space-y-4">
            <TypographyPresets.SectionTitle>Research Publication Example</TypographyPresets.SectionTitle>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <TypographyPresets.CardTitle>
                Optimizing Campus Resource Allocation Through Machine Learning: 
                A University at Buffalo Case Study
              </TypographyPresets.CardTitle>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <Text size="sm" weight="medium">Authors:</Text>
                <Link href="#" color="brand">Dr. Jennifer Liu</Link>
                <Link href="#" color="brand">Prof. David Rodriguez</Link>
                <Link href="#" color="brand">Alex Chen (PhD Candidate)</Link>
              </div>
              
              <div className="space-y-3">
                <Text weight="medium">Abstract</Text>
                <TypographyPresets.Body>
                  This paper presents a novel machine learning approach to optimize campus resource allocation 
                  at the University at Buffalo. Using five years of historical data including student enrollment, 
                  facility usage, and academic performance metrics, we developed a predictive model that improves 
                  resource utilization by 23% while maintaining student satisfaction scores above 4.2/5.0.
                </TypographyPresets.Body>
                
                <TypographyPresets.Body>
                  Our methodology combines <Code>random forest regression</Code> with <Code>k-means clustering</Code> 
                  to identify optimal allocation patterns for study spaces, computer labs, and dining facilities. 
                  The model achieves 89% accuracy in predicting peak usage periods and successfully reduced wait 
                  times by an average of 15 minutes across all campus facilities.
                </TypographyPresets.Body>
              </div>
              
              <div className="space-y-3">
                <Text weight="medium">Key Findings</Text>
                <List variant="unordered">
                  <ListItem>Machine learning models can accurately predict campus facility usage patterns</ListItem>
                  <ListItem>Dynamic resource allocation reduces student wait times and improves satisfaction</ListItem>
                  <ListItem>Cross-semester data analysis reveals consistent behavioral patterns in student populations</ListItem>
                  <ListItem>Integration with existing campus systems requires minimal infrastructure changes</ListItem>
                </List>
              </div>
              
              <div className="space-y-3">
                <Text weight="medium">Publication Details</Text>
                <Text size="sm">
                  <Text weight="medium">Journal:</Text> International Conference on Educational Technology and Smart Campus Systems
                </Text>
                <Text size="sm">
                  <Text weight="medium">Publication Date:</Text> March 2025
                </Text>
                <Text size="sm">
                  <Text weight="medium">DOI:</Text> <Link href="#" color="brand">10.1109/ETSC.2025.123456</Link>
                </Text>
              </div>
              
            </div>
          </div>

          {/* Student Profile Bio */}
          <div className="space-y-4">
            <TypographyPresets.SectionTitle>Student Profile Example</TypographyPresets.SectionTitle>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="flex items-center gap-4">
                <TypographyPresets.CardTitle>Alex Kim - Computer Science Major</TypographyPresets.CardTitle>
                <Badge variant="primary">Class of 2025</Badge>
              </div>
              
              <TypographyPresets.Body>
                Senior Computer Science student at the University at Buffalo with a passion for artificial 
                intelligence and machine learning. Currently working on a capstone project developing a 
                campus navigation app that uses computer vision to help students with disabilities navigate 
                the North and South campuses more effectively.
              </TypographyPresets.Body>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Text weight="medium">Academic Achievements:</Text>
                  <List variant="unordered">
                    <ListItem>Dean's List (Fall 2023, Spring 2024)</ListItem>
                    <ListItem>CSE Outstanding Student Award 2024</ListItem>
                    <ListItem>Undergraduate Research Fellowship</ListItem>
                    <ListItem>ACM Student Chapter President</ListItem>
                  </List>
                </div>
                
                <div className="space-y-3">
                  <Text weight="medium">Technical Skills:</Text>
                  <List variant="unordered">
                    <ListItem><Code>Python</Code>, <Code>Java</Code>, <Code>C++</Code></ListItem>
                    <ListItem><Code>TensorFlow</Code>, <Code>PyTorch</Code>, <Code>scikit-learn</Code></ListItem>
                    <ListItem><Code>React</Code>, <Code>Node.js</Code>, <Code>MongoDB</Code></ListItem>
                    <ListItem><Code>AWS</Code>, <Code>Docker</Code>, <Code>Kubernetes</Code></ListItem>
                  </List>
                </div>
              </div>
              
              <Blockquote>
                "UB has provided me with incredible opportunities to explore cutting-edge research while 
                building practical skills through hands-on projects. The Computer Science department's 
                emphasis on both theoretical foundations and real-world applications has prepared me well 
                for my career in technology."
              </Blockquote>
              
              <div className="flex items-center gap-6 text-sm">
                <Link href="mailto:alex.kim@buffalo.edu" color="brand">alex.kim@buffalo.edu</Link>
                <Link href="#" color="primary">LinkedIn Profile</Link>
                <Link href="#" color="primary">GitHub Portfolio</Link>
              </div>
              
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(H=(E=N.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var A,D,M;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    level: 2,
    color: 'primary',
    weight: 'semibold',
    children: 'University at Buffalo Campus Experience'
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Typography Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different typography configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <Heading {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(M=(D=b.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};const Q=["Default","CompleteShowcase","Playground"];export{N as CompleteShowcase,C as Default,b as Playground,Q as __namedExportsOrder,K as default};
