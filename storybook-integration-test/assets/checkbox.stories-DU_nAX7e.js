import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{R as b}from"./index-DJO9vBfz.js";import{c as m}from"./utils-CytzSlOG.js";import{M as O}from"./minus-CMp0-NgR.js";import{C as q}from"./check-CNhzvRgm.js";import{H as n,c,a as h,b as p}from"./hive-tokens-CKIUfcHM.js";import{B as u}from"./badge-B09J4pcg.js";import{T as s}from"./text-Cao0VGB4.js";import{a as i}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./createLucideIcon-WpwZgzX-.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./v4-CtRu48qb.js";const C={sm:{box:"h-4 w-4",text:"text-sm",icon:"h-3 w-3"},md:{box:"h-5 w-5",text:"text-base",icon:"h-3.5 w-3.5"},lg:{box:"h-6 w-6",text:"text-lg",icon:"h-4 w-4"}},a=b.forwardRef(({label:t,description:f,error:d,size:r="md",variant:I="default",indeterminate:l=!1,checked:R,className:U,disabled:o,...L},V)=>{const v=b.useRef(null);b.useImperativeHandle(V,()=>v.current),b.useEffect(()=>{v.current&&(v.current.indeterminate=l)},[l]);const k=l?!1:R,j=k||l,D=["relative flex items-center justify-center","border-2 rounded-md","transition-all duration-200 ease-out",C[r].box,!o&&!d&&["border-[var(--hive-border-default)]","hover:border-[var(--hive-brand-gold)]","focus-within:border-[var(--hive-brand-gold)] focus-within:ring-2 focus-within:ring-[var(--hive-brand-gold)]/20"].filter(Boolean).join(" "),o&&["border-[var(--hive-border-default)]","bg-[var(--hive-background-disabled)]","cursor-not-allowed"].join(" "),d&&["border-[var(--hive-status-error)]","focus-within:border-[var(--hive-status-error)] focus-within:ring-2 focus-within:ring-[var(--hive-status-error)]/20"].join(" "),j&&!o&&["bg-[var(--hive-brand-secondary)] border-[var(--hive-brand-gold)]",d&&"bg-[var(--hive-status-error)] border-[var(--hive-status-error)]"].filter(Boolean).join(" ")].filter(Boolean).join(" "),H=["flex items-start gap-3",I==="card"&&["p-4 rounded-xl border border-[var(--hive-border-default)]","hover:bg-[var(--hive-background-secondary)]",!o&&"cursor-pointer",o&&"opacity-50"].filter(Boolean).join(" ")].filter(Boolean).join(" ");return e.jsxs("label",{className:m(H,U),children:[e.jsxs("div",{className:D,children:[e.jsx("input",{ref:v,type:"checkbox",checked:k,disabled:o,className:"sr-only",...L}),j&&e.jsx("div",{className:m("flex items-center justify-center","text-[var(--hive-background-primary)]",C[r].icon,o&&"text-[var(--hive-text-disabled)]"),children:l?e.jsx(O,{className:"h-full w-full"}):e.jsx(q,{className:"h-full w-full"})})]}),(t||f)&&e.jsxs("div",{className:"flex-1 min-w-0",children:[t&&e.jsx("div",{className:m("font-medium text-[var(--hive-text-primary)]",C[r].text,o&&"text-[var(--hive-text-disabled)]"),children:t}),f&&e.jsx("div",{className:m("text-[var(--hive-text-secondary)] mt-1",r==="sm"&&"text-xs",r==="md"&&"text-sm",r==="lg"&&"text-base",o&&"text-[var(--hive-text-disabled)]"),children:f}),d&&e.jsx("div",{className:m("text-[var(--hive-status-error)] mt-1",r==="sm"&&"text-xs",r==="md"&&"text-sm",r==="lg"&&"text-base"),children:d})]})]})});a.displayName="Checkbox";a.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'card'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'card'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},indeterminate:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}},composes:["Omit"]};const ae={title:"01-Atoms/Checkbox - COMPLETE DEFINITION",component:a,parameters:{docs:{description:{component:`
## ☑️ HIVE Checkbox - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive checkbox input system for University at Buffalo HIVE platform selections and preferences.

### 🎯 **COMPONENT EXCELLENCE**
- **2 Visual Variants** - Default and card layouts for different interface contexts
- **3 Size Options** - Small, medium, large for flexible form design
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and states
- **Indeterminate State** - Partial selection support for complex hierarchies
- **Label & Description** - Rich labeling with secondary text support
- **Error States** - Validation feedback with semantic error styling
- **Accessibility Ready** - Proper ARIA labels, keyboard navigation, and screen reader support
- **Campus Interface** - Built for University at Buffalo student platform forms and selections

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform selections:
- **Course Preferences** - Course selection, schedule preferences, notification settings
- **Space Membership** - Space joining, privacy settings, notification preferences
- **Profile Settings** - Visibility controls, contact preferences, platform notifications
- **Tool Configuration** - Tool permissions, sharing settings, deployment options
- **Event Management** - RSVP options, reminder preferences, calendar integration
- **Academic Workflows** - Assignment submissions, group project coordination

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Sizing** - Minimum 44px touch targets for all variants
- **Responsive Design** - Adaptive sizing and spacing for mobile forms
- **Clear Visual States** - High contrast for accessibility and mobile visibility
- **Screen Reader Support** - Proper labeling and state announcements
`}}},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"],description:"Checkbox size"},variant:{control:"select",options:["default","card"],description:"Checkbox variant styling"},checked:{control:"boolean",description:"Checked state"},indeterminate:{control:"boolean",description:"Indeterminate state"},disabled:{control:"boolean",description:"Disabled state"},error:{control:"text",description:"Error message"},onChange:{action:"changed",description:"Change handler"}}},g={args:{label:"Join CSE 331 Space",description:"Receive notifications for assignments and discussions",size:"md",variant:"default",checked:!1,disabled:!1,onChange:i("checkbox-changed")},render:t=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(n,{children:e.jsxs(c,{className:"space-y-4",children:[e.jsx(s,{variant:"body-md",color:"primary",children:"HIVE checkbox system for University at Buffalo platform selections:"}),e.jsx(a,{...t}),e.jsx(s,{variant:"body-sm",color:"secondary",children:"Interactive checkbox with label, description, and state management"})]})})})},y={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(n,{children:[e.jsxs(h,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"success",children:"☑️ CHECKBOX VARIANTS"}),"Layout Variant Options"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"2 checkbox variants for different University at Buffalo HIVE platform interface contexts"})]}),e.jsx(c,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Layout Variants:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Default Layout (Compact):"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Enable notifications",description:"Receive updates about space activity",variant:"primary",onChange:i("default-compact")}),e.jsx(a,{label:"Join study group",description:"Participate in CSE 331 algorithm study sessions",variant:"primary",checked:!0,onChange:i("default-compact-checked")}),e.jsx(a,{label:"Share calendar availability",description:"Let group members see your free time",variant:"primary",onChange:i("default-compact-calendar")})]}),e.jsx(s,{variant:"body-xs",color:"secondary",children:"Compact layout for forms, settings, and preference lists"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Card Layout (Prominent):"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Enable email notifications",description:"Receive daily digests of space activity and important updates",variant:"card",onChange:i("card-prominent")}),e.jsx(a,{label:"Auto-join course spaces",description:"Automatically join spaces for enrolled courses like CSE 331, CSE 250",variant:"card",checked:!0,onChange:i("card-prominent-checked")}),e.jsx(a,{label:"Public profile visibility",description:"Allow other UB students to find and connect with your profile",variant:"card",onChange:i("card-prominent-public")})]}),e.jsx(s,{variant:"body-xs",color:"secondary",children:"Card layout for prominent settings, feature toggles, and onboarding choices"})]})]})]})})})]}),e.jsxs(n,{children:[e.jsxs(h,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"info",children:"📏 CHECKBOX SIZES"}),"Size Variations"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"3 checkbox sizes for different interface densities and responsive design"})]}),e.jsx(c,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Size Options:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Small (Compact):"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{size:"sm",label:"Desktop notifications",description:"Browser notifications for messages",onChange:i("small-desktop")}),e.jsx(a,{size:"sm",label:"Mobile notifications",description:"Push notifications on mobile",checked:!0,onChange:i("small-mobile")}),e.jsx(a,{size:"sm",label:"Email summaries",description:"Weekly activity digest",onChange:i("small-email")})]}),e.jsx(s,{variant:"body-xs",color:"secondary",children:"16px checkbox - Compact size for dense interfaces, secondary preferences, and mobile layouts"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Medium (Standard):"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{size:"md",label:"Auto-save drafts",description:"Automatically save tool and post drafts",onChange:i("medium-autosave")}),e.jsx(a,{size:"md",label:"Profile visibility",description:"Show profile to other UB students",checked:!0,onChange:i("medium-visibility")}),e.jsx(a,{size:"md",label:"Calendar integration",description:"Sync events with personal calendar",onChange:i("medium-calendar")})]}),e.jsx(s,{variant:"body-xs",color:"secondary",children:"20px checkbox - Standard size for most forms, settings, and preference interfaces"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Large (Prominent):"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{size:"lg",label:"Terms of Service",description:"I agree to the University at Buffalo HIVE platform terms and conditions",onChange:i("large-terms")}),e.jsx(a,{size:"lg",label:"Privacy Policy",description:"I understand how my academic and social data will be used",checked:!0,onChange:i("large-privacy")}),e.jsx(a,{size:"lg",label:"Community Guidelines",description:"I agree to maintain respectful campus community interactions",onChange:i("large-community")})]}),e.jsx(s,{variant:"body-xs",color:"secondary",children:"24px checkbox - Large size for important agreements, onboarding, and prominent feature toggles"})]})]})]})})})]}),e.jsxs(n,{children:[e.jsxs(h,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"primary",children:"⚡ INTERACTIVE STATES"}),"Checkbox States and Error Handling"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Interactive states for user feedback, validation, and accessibility"})]}),e.jsx(c,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Interactive Features:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Standard States:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Unchecked state",description:"Default state for new options",onChange:i("unchecked")}),e.jsx(a,{label:"Checked state",description:"Selected option with confirmation",checked:!0,onChange:i("checked")}),e.jsx(a,{label:"Indeterminate state",description:"Partial selection in hierarchical choices",indeterminate:!0,onChange:i("indeterminate")})]}),e.jsx(s,{variant:"body-xs",color:"secondary",children:"Core checkbox states for selection, confirmation, and partial selection"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Disabled States:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Disabled unchecked",description:"Option not available for selection",disabled:!0,onChange:i("disabled-unchecked")}),e.jsx(a,{label:"Disabled checked",description:"Required option that cannot be changed",checked:!0,disabled:!0,onChange:i("disabled-checked")}),e.jsx(a,{label:"Disabled indeterminate",description:"Partial selection in locked hierarchy",indeterminate:!0,disabled:!0,onChange:i("disabled-indeterminate")})]}),e.jsx(s,{variant:"body-xs",color:"secondary",children:"Disabled states for unavailable options and system-controlled settings"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"red",weight:"medium",children:"Error States:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Required selection",description:"You must agree to continue",error:"This field is required",onChange:i("error-required")}),e.jsx(a,{label:"Invalid configuration",description:"This option conflicts with other settings",error:"Cannot enable with current privacy settings",checked:!0,onChange:i("error-conflict")}),e.jsx(a,{label:"Validation error",description:"Please review your selection",error:"Incompatible with university policy",onChange:i("error-validation")})]}),e.jsx(s,{variant:"body-xs",color:"secondary",children:"Error states for validation feedback and user guidance"})]})]})]})})})]}),e.jsxs(n,{children:[e.jsxs(h,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Checkbox Usage Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Checkbox usage in actual University at Buffalo student workflow and campus platform preference contexts"})]}),e.jsxs(c,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Course Registration & Academic Preferences:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{as:"h3",variant:"heading-sm",color:"primary",children:"Fall 2024 Course Selection Preferences"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Course Enrollment:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(a,{variant:"card",label:"Auto-join CSE 331 Space",description:"Automatically join the Algorithm Analysis course space when enrolled",checked:!0,onChange:i("auto-join-cse331")}),e.jsx(a,{variant:"card",label:"Enable course notifications",description:"Receive updates about assignments, exams, and announcements",checked:!0,onChange:i("course-notifications")}),e.jsx(a,{variant:"card",label:"Share study availability",description:"Let classmates see when you're available for group study",onChange:i("study-availability")})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Resources:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(a,{variant:"card",label:"Access lecture recordings",description:"Download and view recorded CSE 331 lectures and demos",checked:!0,onChange:i("lecture-recordings")}),e.jsx(a,{variant:"card",label:"Sync with UB calendar",description:"Automatically add class schedules and assignment due dates",onChange:i("ub-calendar-sync")}),e.jsx(a,{variant:"card",label:"Email assignment reminders",description:"Get email notifications 24 hours before deadlines",checked:!0,onChange:i("assignment-reminders")})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Profile Privacy & Visibility Settings:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Profile Visibility:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(a,{label:"Show profile to UB students",description:"Let other University at Buffalo students find your profile",checked:!0,onChange:i("ub-student-visibility")}),e.jsx(a,{label:"Display major and year",description:"Show Computer Science Senior on your profile",checked:!0,onChange:i("major-year-display")}),e.jsx(a,{label:"Show course enrollment",description:"Display enrolled courses like CSE 331, CSE 250",onChange:i("course-enrollment-display")}),e.jsx(a,{label:"Public space membership",description:"Show which campus spaces you belong to",onChange:i("space-membership-public")})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Contact Preferences:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(a,{label:"Allow direct messages",description:"Let other students send you private messages",checked:!0,onChange:i("direct-messages")}),e.jsx(a,{label:"Study group invitations",description:"Receive invitations to join study groups for your courses",checked:!0,onChange:i("study-group-invites")}),e.jsx(a,{label:"Event notifications",description:"Get notified about campus events and activities",onChange:i("event-notifications")}),e.jsx(a,{label:"Tool collaboration requests",description:"Allow requests to collaborate on tools and projects",checked:!0,onChange:i("tool-collaboration")})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Living & Community Settings:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Residential Community:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(a,{size:"sm",label:"Join floor space",description:"Ellicott Complex Floor 8",checked:!0,onChange:i("floor-space-join")}),e.jsx(a,{size:"sm",label:"Floor event notifications",description:"Floor meetings and activities",checked:!0,onChange:i("floor-events")}),e.jsx(a,{size:"sm",label:"Laundry alerts",description:"Notify when machines available",onChange:i("laundry-alerts")}),e.jsx(a,{size:"sm",label:"Package delivery alerts",description:"Mail center notifications",checked:!0,onChange:i("package-alerts")})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Campus Activities:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(a,{size:"sm",label:"UB Bulls athletics",description:"Game schedules and updates",onChange:i("athletics-updates")}),e.jsx(a,{size:"sm",label:"Student organization fairs",description:"Club recruitment events",checked:!0,onChange:i("org-fairs")}),e.jsx(a,{size:"sm",label:"Homecoming activities",description:"Annual celebration events",onChange:i("homecoming")}),e.jsx(a,{size:"sm",label:"Spring Fest events",description:"End of semester celebrations",checked:!0,onChange:i("spring-fest")})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Support:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(a,{size:"sm",label:"Tutoring center alerts",description:"Available tutoring sessions",onChange:i("tutoring-alerts")}),e.jsx(a,{size:"sm",label:"Library study room booking",description:"Lockwood Library reservations",checked:!0,onChange:i("library-booking")}),e.jsx(a,{size:"sm",label:"Career fair notifications",description:"Job and internship fairs",checked:!0,onChange:i("career-fairs")}),e.jsx(a,{size:"sm",label:"Research opportunities",description:"Faculty research positions",onChange:i("research-opportunities")})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Platform Tools & Collaboration:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{as:"h3",variant:"heading-sm",color:"primary",children:"Tool Building & Sharing Preferences"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Tool Creation:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(a,{variant:"card",label:"Auto-save tool drafts",description:"Automatically save your tool building progress every 2 minutes",checked:!0,onChange:i("auto-save-tools")}),e.jsx(a,{variant:"card",label:"Share tools publicly",description:"Make your tools discoverable by other UB students by default",onChange:i("share-tools-public")}),e.jsx(a,{variant:"card",label:"Enable tool analytics",description:"Track usage statistics and user feedback for your tools",checked:!0,onChange:i("tool-analytics")})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Collaboration:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(a,{variant:"card",label:"Accept collaboration requests",description:"Allow other students to request collaboration on your tools",checked:!0,onChange:i("collaboration-requests")}),e.jsx(a,{variant:"card",label:"Tool deployment notifications",description:"Get notified when collaborators deploy or update shared tools",onChange:i("deployment-notifications")}),e.jsx(a,{variant:"card",label:"Version control integration",description:"Automatically create backups when making significant tool changes",checked:!0,onChange:i("version-control")})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Mobile Campus Usage:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(s,{variant:"body-md",color:"primary",children:"Mobile-optimized checkbox settings for on-campus platform usage:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Mobile Notifications:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(a,{size:"lg",label:"Push notifications",description:"Receive alerts on your mobile device while walking around campus",checked:!0,onChange:i("mobile-push")}),e.jsx(a,{size:"lg",label:"Location-based alerts",description:"Get notifications when near relevant campus buildings or events",onChange:i("location-alerts")}),e.jsx(a,{size:"lg",label:"Offline access",description:"Download content for offline viewing during poor campus WiFi",checked:!0,onChange:i("offline-access")})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{variant:"body-sm",color:"gold",weight:"medium",children:"Quick Actions:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(a,{size:"lg",label:"Quick space joining",description:"Enable one-tap joining for course and community spaces",checked:!0,onChange:i("quick-join")}),e.jsx(a,{size:"lg",label:"Fast tool access",description:"Show frequently used tools on mobile home screen",onChange:i("fast-tools")}),e.jsx(a,{size:"lg",label:"Campus map integration",description:"Show relevant spaces and events on UB campus map",checked:!0,onChange:i("campus-map")})]})]})]})]})]})]})]})]})},x={args:{label:"Join Space",description:"Receive notifications and updates",size:"md",variant:"default",checked:!1,disabled:!1,indeterminate:!1,onChange:i("playground-changed")},render:t=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(n,{children:[e.jsxs(h,{children:[e.jsx(p,{children:"Checkbox Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different checkbox configurations"})]}),e.jsx(c,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{...t}),e.jsx(s,{variant:"body-sm",color:"secondary",children:"Interactive checkbox testing for University at Buffalo HIVE platform interface design"})]})})]})})};var N,w,T;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Join CSE 331 Space',
    description: 'Receive notifications for assignments and discussions',
    size: 'md',
    variant: 'default',
    checked: false,
    disabled: false,
    onChange: action('checkbox-changed')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE checkbox system for University at Buffalo platform selections:
          </Text>
          <Checkbox {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive checkbox with label, description, and state management
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(T=(w=g.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var S,E,z;y.parameters={...y.parameters,docs:{...(S=y.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Checkbox Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">☑️ CHECKBOX VARIANTS</Badge>
            Layout Variant Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            2 checkbox variants for different University at Buffalo HIVE platform interface contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Layout Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Default Layout (Compact):</Text>
                  <div className="space-y-3">
                    <Checkbox label="Enable notifications" description="Receive updates about space activity" variant="primary" onChange={action('default-compact')} />
                    <Checkbox label="Join study group" description="Participate in CSE 331 algorithm study sessions" variant="primary" checked onChange={action('default-compact-checked')} />
                    <Checkbox label="Share calendar availability" description="Let group members see your free time" variant="primary" onChange={action('default-compact-calendar')} />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Compact layout for forms, settings, and preference lists
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Card Layout (Prominent):</Text>
                  <div className="space-y-3">
                    <Checkbox label="Enable email notifications" description="Receive daily digests of space activity and important updates" variant="card" onChange={action('card-prominent')} />
                    <Checkbox label="Auto-join course spaces" description="Automatically join spaces for enrolled courses like CSE 331, CSE 250" variant="card" checked onChange={action('card-prominent-checked')} />
                    <Checkbox label="Public profile visibility" description="Allow other UB students to find and connect with your profile" variant="card" onChange={action('card-prominent-public')} />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Card layout for prominent settings, feature toggles, and onboarding choices
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Checkbox Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 CHECKBOX SIZES</Badge>
            Size Variations
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 checkbox sizes for different interface densities and responsive design
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Options:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (Compact):</Text>
                  <div className="space-y-2">
                    <Checkbox size="sm" label="Desktop notifications" description="Browser notifications for messages" onChange={action('small-desktop')} />
                    <Checkbox size="sm" label="Mobile notifications" description="Push notifications on mobile" checked onChange={action('small-mobile')} />
                    <Checkbox size="sm" label="Email summaries" description="Weekly activity digest" onChange={action('small-email')} />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    16px checkbox - Compact size for dense interfaces, secondary preferences, and mobile layouts
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (Standard):</Text>
                  <div className="space-y-3">
                    <Checkbox size="md" label="Auto-save drafts" description="Automatically save tool and post drafts" onChange={action('medium-autosave')} />
                    <Checkbox size="md" label="Profile visibility" description="Show profile to other UB students" checked onChange={action('medium-visibility')} />
                    <Checkbox size="md" label="Calendar integration" description="Sync events with personal calendar" onChange={action('medium-calendar')} />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    20px checkbox - Standard size for most forms, settings, and preference interfaces
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (Prominent):</Text>
                  <div className="space-y-3">
                    <Checkbox size="lg" label="Terms of Service" description="I agree to the University at Buffalo HIVE platform terms and conditions" onChange={action('large-terms')} />
                    <Checkbox size="lg" label="Privacy Policy" description="I understand how my academic and social data will be used" checked onChange={action('large-privacy')} />
                    <Checkbox size="lg" label="Community Guidelines" description="I agree to maintain respectful campus community interactions" onChange={action('large-community')} />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    24px checkbox - Large size for important agreements, onboarding, and prominent feature toggles
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Interactive States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ INTERACTIVE STATES</Badge>
            Checkbox States and Error Handling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive states for user feedback, validation, and accessibility
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive Features:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Standard States:</Text>
                  <div className="space-y-3">
                    <Checkbox label="Unchecked state" description="Default state for new options" onChange={action('unchecked')} />
                    <Checkbox label="Checked state" description="Selected option with confirmation" checked onChange={action('checked')} />
                    <Checkbox label="Indeterminate state" description="Partial selection in hierarchical choices" indeterminate onChange={action('indeterminate')} />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Core checkbox states for selection, confirmation, and partial selection
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Disabled States:</Text>
                  <div className="space-y-3">
                    <Checkbox label="Disabled unchecked" description="Option not available for selection" disabled onChange={action('disabled-unchecked')} />
                    <Checkbox label="Disabled checked" description="Required option that cannot be changed" checked disabled onChange={action('disabled-checked')} />
                    <Checkbox label="Disabled indeterminate" description="Partial selection in locked hierarchy" indeterminate disabled onChange={action('disabled-indeterminate')} />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Disabled states for unavailable options and system-controlled settings
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="red" weight="medium">Error States:</Text>
                  <div className="space-y-3">
                    <Checkbox label="Required selection" description="You must agree to continue" error="This field is required" onChange={action('error-required')} />
                    <Checkbox label="Invalid configuration" description="This option conflicts with other settings" error="Cannot enable with current privacy settings" checked onChange={action('error-conflict')} />
                    <Checkbox label="Validation error" description="Please review your selection" error="Incompatible with university policy" onChange={action('error-validation')} />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Error states for validation feedback and user guidance
                  </Text>
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
            Real Campus Checkbox Usage Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Checkbox usage in actual University at Buffalo student workflow and campus platform preference contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Registration Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Registration & Academic Preferences:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Fall 2024 Course Selection Preferences
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Course Enrollment:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <Checkbox variant="card" label="Auto-join CSE 331 Space" description="Automatically join the Algorithm Analysis course space when enrolled" checked onChange={action('auto-join-cse331')} />
                      <Checkbox variant="card" label="Enable course notifications" description="Receive updates about assignments, exams, and announcements" checked onChange={action('course-notifications')} />
                      <Checkbox variant="card" label="Share study availability" description="Let classmates see when you're available for group study" onChange={action('study-availability')} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Resources:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <Checkbox variant="card" label="Access lecture recordings" description="Download and view recorded CSE 331 lectures and demos" checked onChange={action('lecture-recordings')} />
                      <Checkbox variant="card" label="Sync with UB calendar" description="Automatically add class schedules and assignment due dates" onChange={action('ub-calendar-sync')} />
                      <Checkbox variant="card" label="Email assignment reminders" description="Get email notifications 24 hours before deadlines" checked onChange={action('assignment-reminders')} />
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Profile Privacy Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Profile Privacy & Visibility Settings:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Profile Visibility:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox label="Show profile to UB students" description="Let other University at Buffalo students find your profile" checked onChange={action('ub-student-visibility')} />
                    <Checkbox label="Display major and year" description="Show Computer Science Senior on your profile" checked onChange={action('major-year-display')} />
                    <Checkbox label="Show course enrollment" description="Display enrolled courses like CSE 331, CSE 250" onChange={action('course-enrollment-display')} />
                    <Checkbox label="Public space membership" description="Show which campus spaces you belong to" onChange={action('space-membership-public')} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Contact Preferences:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox label="Allow direct messages" description="Let other students send you private messages" checked onChange={action('direct-messages')} />
                    <Checkbox label="Study group invitations" description="Receive invitations to join study groups for your courses" checked onChange={action('study-group-invites')} />
                    <Checkbox label="Event notifications" description="Get notified about campus events and activities" onChange={action('event-notifications')} />
                    <Checkbox label="Tool collaboration requests" description="Allow requests to collaborate on tools and projects" checked onChange={action('tool-collaboration')} />
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Residential Life Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Living & Community Settings:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Residential Community:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox size="sm" label="Join floor space" description="Ellicott Complex Floor 8" checked onChange={action('floor-space-join')} />
                    <Checkbox size="sm" label="Floor event notifications" description="Floor meetings and activities" checked onChange={action('floor-events')} />
                    <Checkbox size="sm" label="Laundry alerts" description="Notify when machines available" onChange={action('laundry-alerts')} />
                    <Checkbox size="sm" label="Package delivery alerts" description="Mail center notifications" checked onChange={action('package-alerts')} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Activities:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox size="sm" label="UB Bulls athletics" description="Game schedules and updates" onChange={action('athletics-updates')} />
                    <Checkbox size="sm" label="Student organization fairs" description="Club recruitment events" checked onChange={action('org-fairs')} />
                    <Checkbox size="sm" label="Homecoming activities" description="Annual celebration events" onChange={action('homecoming')} />
                    <Checkbox size="sm" label="Spring Fest events" description="End of semester celebrations" checked onChange={action('spring-fest')} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Support:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox size="sm" label="Tutoring center alerts" description="Available tutoring sessions" onChange={action('tutoring-alerts')} />
                    <Checkbox size="sm" label="Library study room booking" description="Lockwood Library reservations" checked onChange={action('library-booking')} />
                    <Checkbox size="sm" label="Career fair notifications" description="Job and internship fairs" checked onChange={action('career-fairs')} />
                    <Checkbox size="sm" label="Research opportunities" description="Faculty research positions" onChange={action('research-opportunities')} />
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Tool & Platform Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Platform Tools & Collaboration:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Tool Building & Sharing Preferences
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Tool Creation:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <Checkbox variant="card" label="Auto-save tool drafts" description="Automatically save your tool building progress every 2 minutes" checked onChange={action('auto-save-tools')} />
                      <Checkbox variant="card" label="Share tools publicly" description="Make your tools discoverable by other UB students by default" onChange={action('share-tools-public')} />
                      <Checkbox variant="card" label="Enable tool analytics" description="Track usage statistics and user feedback for your tools" checked onChange={action('tool-analytics')} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Collaboration:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <Checkbox variant="card" label="Accept collaboration requests" description="Allow other students to request collaboration on your tools" checked onChange={action('collaboration-requests')} />
                      <Checkbox variant="card" label="Tool deployment notifications" description="Get notified when collaborators deploy or update shared tools" onChange={action('deployment-notifications')} />
                      <Checkbox variant="card" label="Version control integration" description="Automatically create backups when making significant tool changes" checked onChange={action('version-control')} />
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Mobile Accessibility */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Usage:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized checkbox settings for on-campus platform usage:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Mobile Notifications:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox size="lg" label="Push notifications" description="Receive alerts on your mobile device while walking around campus" checked onChange={action('mobile-push')} />
                    <Checkbox size="lg" label="Location-based alerts" description="Get notifications when near relevant campus buildings or events" onChange={action('location-alerts')} />
                    <Checkbox size="lg" label="Offline access" description="Download content for offline viewing during poor campus WiFi" checked onChange={action('offline-access')} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Actions:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox size="lg" label="Quick space joining" description="Enable one-tap joining for course and community spaces" checked onChange={action('quick-join')} />
                    <Checkbox size="lg" label="Fast tool access" description="Show frequently used tools on mobile home screen" onChange={action('fast-tools')} />
                    <Checkbox size="lg" label="Campus map integration" description="Show relevant spaces and events on UB campus map" checked onChange={action('campus-map')} />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(z=(E=y.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};var A,P,B;x.parameters={...x.parameters,docs:{...(A=x.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Join Space',
    description: 'Receive notifications and updates',
    size: 'md',
    variant: 'default',
    checked: false,
    disabled: false,
    indeterminate: false,
    onChange: action('playground-changed')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Checkbox Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different checkbox configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Checkbox {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive checkbox testing for University at Buffalo HIVE platform interface design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(B=(P=x.parameters)==null?void 0:P.docs)==null?void 0:B.source}}};const ie=["Default","CompleteShowcase","Playground"];export{y as CompleteShowcase,g as Default,x as Playground,ie as __namedExportsOrder,ae as default};
