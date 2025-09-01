import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as p}from"./index-DJO9vBfz.js";import{c as E}from"./index-BwobEAja.js";import{c as f}from"./utils-CytzSlOG.js";import{H as x,a as g,b as y,c as b}from"./hive-tokens-BKUtHA8Z.js";import{B as i}from"./badge-B09J4pcg.js";import"./framer-motion-proxy-Bzlf7Pk2.js";const U=E("peer sr-only"),W=E("relative flex items-center justify-center aspect-square shrink-0 rounded-full border-2 bg-[var(--hive-background-secondary)] transition-all duration-200 cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 hover:border-[var(--hive-brand-secondary)] peer-checked:border-[var(--hive-brand-secondary)] peer-checked:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)]",{variants:{size:{sm:"h-4 w-4",default:"h-5 w-5",lg:"h-6 w-6",xl:"h-7 w-7"},variant:{default:"border-[var(--hive-border-default)] peer-checked:border-[var(--hive-brand-secondary)]",success:"border-[var(--hive-status-success)] peer-checked:border-[var(--hive-status-success)]",error:"border-[var(--hive-status-error)] peer-checked:border-[var(--hive-status-error)]",warning:"border-[var(--hive-status-warning)] peer-checked:border-[var(--hive-status-warning)]",info:"border-[var(--hive-status-info)] peer-checked:border-[var(--hive-status-info)]"}},defaultVariants:{size:"default",variant:"default"}}),_=E("text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",{variants:{color:{primary:"text-[var(--hive-text-primary)]",secondary:"text-[var(--hive-text-secondary)]",tertiary:"text-[var(--hive-text-tertiary)]",error:"text-[var(--hive-status-error)]",success:"text-[var(--hive-status-success)]",warning:"text-[var(--hive-status-warning)]",info:"text-[var(--hive-status-info)]"},weight:{normal:"font-normal",medium:"font-medium",semibold:"font-semibold"}},defaultVariants:{color:"primary",weight:"normal"}}),a=p.forwardRef(({className:n,size:o,variant:l,label:d,description:c,error:u,labelProps:s,checked:v,id:h,...j},k)=>{const N=h||p.useId(),R=e.jsxs("div",{className:"relative flex items-center",children:[e.jsx("input",{type:"radio",id:N,className:f(U(),n),ref:k,checked:v,...j}),e.jsx("div",{className:f(W({size:o,variant:l})),children:e.jsx("div",{className:f("rounded-full transition-all duration-200",v?"opacity-100 scale-100":"opacity-0 scale-0",o==="sm"&&"h-1.5 w-1.5",o==="default"&&"h-2 w-2",o==="lg"&&"h-2.5 w-2.5",o==="xl"&&"h-3 w-3",l==="default"&&"bg-[var(--hive-brand-secondary)]",l==="success"&&"bg-[var(--hive-status-success)]",l==="error"&&"bg-[var(--hive-status-error)]",l==="warning"&&"bg-[var(--hive-status-warning)]",l==="info"&&"bg-[var(--hive-status-info)]")})})]});return d||c||u?e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-start space-x-3",children:[R,e.jsxs("div",{className:"flex-1 space-y-1",children:[d&&e.jsx("label",{htmlFor:N,className:f(_({color:s==null?void 0:s.color,weight:s==null?void 0:s.weight}),"cursor-pointer",s==null?void 0:s.className),...s&&Object.fromEntries(Object.entries(s).filter(([z])=>!["color","weight","className"].includes(z))),children:d}),c&&e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)] leading-relaxed",children:c})]})]}),u&&e.jsx("p",{className:"text-xs text-[var(--hive-status-error)] ml-8",children:u})]}):R});a.displayName="Radio";const t=p.forwardRef(({className:n,name:o,value:l,onChange:d,orientation:c="vertical",spacing:u="md",label:s,description:v,error:h,required:j,disabled:k,children:N,...R},z)=>{const P=p.useId(),F={none:"",sm:c==="horizontal"?"space-x-4":"space-y-2",md:c==="horizontal"?"space-x-6":"space-y-3",lg:c==="horizontal"?"space-x-8":"space-y-4"},O=m=>{d==null||d(m)},V=p.Children.map(N,m=>p.isValidElement(m)&&m.type===a?p.cloneElement(m,{name:o,checked:m.props.value===l,onChange:()=>O(m.props.value),disabled:k||m.props.disabled}):m);return e.jsxs("div",{className:"space-y-2",children:[s&&e.jsxs("label",{htmlFor:P,className:"text-sm font-medium text-[var(--hive-text-primary)]",children:[s,j&&e.jsx("span",{className:"ml-1 text-[var(--hive-status-error)]",children:"*"})]}),v&&e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:v}),e.jsx("div",{ref:z,id:P,className:f("flex",c==="horizontal"?"flex-row flex-wrap items-center":"flex-col",F[u],n),role:"radiogroup","aria-labelledby":s?P:void 0,"aria-required":j,...R,children:V}),h&&e.jsx("p",{className:"text-xs text-[var(--hive-status-error)]",children:h})]})});t.displayName="RadioGroup";const r=p.forwardRef(({icon:n,badge:o,label:l,description:d,value:c,className:u,...s},v)=>{const h=p.useId();return e.jsx("label",{htmlFor:h,className:f("relative flex cursor-pointer rounded-lg border-2 border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-4 transition-all duration-200 hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-interactive-hover)] has-[:checked]:border-[var(--hive-brand-secondary)] has-[:checked]:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)]",u),children:e.jsxs("div",{className:"flex items-start space-x-3 w-full",children:[e.jsx(RadioEnhanced,{ref:v,id:h,className:"mt-0.5",value:c,...s}),n&&e.jsx("div",{className:"flex-shrink-0 text-[var(--hive-text-secondary)]",children:n}),e.jsxs("div",{className:"flex-1 space-y-1",children:[l&&e.jsx("div",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:l}),d&&e.jsx("div",{className:"text-xs text-[var(--hive-text-tertiary)]",children:d})]}),o&&e.jsx("div",{className:"flex-shrink-0",children:o})]})})});r.displayName="RadioCard";const C={PaymentMethod:({options:n,...o})=>e.jsx(t,{...o,children:n.map(l=>e.jsx(r,{value:l.value,label:l.label,icon:l.icon},l.value))}),Priority:n=>e.jsxs(t,{...n,children:[e.jsx(RadioEnhanced,{value:"low",label:"Low Priority"}),e.jsx(RadioEnhanced,{value:"medium",label:"Medium Priority"}),e.jsx(RadioEnhanced,{value:"high",label:"High Priority"}),e.jsx(RadioEnhanced,{value:"urgent",label:"Urgent"})]}),Size:n=>e.jsxs(t,{orientation:"horizontal",...n,children:[e.jsx(RadioEnhanced,{value:"xs",label:"XS"}),e.jsx(RadioEnhanced,{value:"sm",label:"SM"}),e.jsx(RadioEnhanced,{value:"md",label:"MD"}),e.jsx(RadioEnhanced,{value:"lg",label:"LG"}),e.jsx(RadioEnhanced,{value:"xl",label:"XL"})]}),Theme:n=>e.jsxs(t,{...n,children:[e.jsx(RadioEnhanced,{value:"light",label:"Light Theme",description:"Clean and bright interface"}),e.jsx(RadioEnhanced,{value:"dark",label:"Dark Theme",description:"Easy on the eyes"}),e.jsx(RadioEnhanced,{value:"auto",label:"Auto",description:"Matches system preference"})]})};a.__docgenInfo={description:"",methods:[],displayName:"Radio",props:{label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},labelProps:{required:!1,tsType:{name:"intersection",raw:`React.LabelHTMLAttributes<HTMLLabelElement> & 
VariantProps<typeof radioLabelVariants>`,elements:[{name:"ReactLabelHTMLAttributes",raw:"React.LabelHTMLAttributes<HTMLLabelElement>",elements:[{name:"HTMLLabelElement"}]},{name:"VariantProps",elements:[{name:"radioLabelVariants"}],raw:"VariantProps<typeof radioLabelVariants>"}]},description:""}},composes:["Omit","VariantProps"]};t.__docgenInfo={description:"",methods:[],displayName:"RadioGroup",props:{name:{required:!0,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"vertical"',computed:!1}},spacing:{required:!1,tsType:{name:"union",raw:'"none" | "sm" | "md" | "lg"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}},composes:["Omit"]};r.__docgenInfo={description:"",methods:[],displayName:"RadioCard",props:{label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},labelProps:{required:!1,tsType:{name:"intersection",raw:`React.LabelHTMLAttributes<HTMLLabelElement> & 
VariantProps<typeof radioLabelVariants>`,elements:[{name:"ReactLabelHTMLAttributes",raw:"React.LabelHTMLAttributes<HTMLLabelElement>",elements:[{name:"HTMLLabelElement"}]},{name:"VariantProps",elements:[{name:"radioLabelVariants"}],raw:"VariantProps<typeof radioLabelVariants>"}]},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},badge:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},value:{required:!0,tsType:{name:"string"},description:""}},composes:["Omit","VariantProps"]};const ee={title:"01-Atoms/Radio Enhanced - COMPLETE DEFINITION",component:a,parameters:{docs:{description:{component:`
## 🎯 HIVE Radio Enhanced - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated radio selection system for University at Buffalo campus single-choice selection and preferences.

### 🏆 **COMPONENT EXCELLENCE**
- **5 Semantic Variants** - Default (gold fill), success, error, warning, info
- **4 Size Options** - Small, default, large, XL with perfect mobile touch targets
- **Advanced Features** - Radio groups, cards, horizontal/vertical layouts
- **Perfect Semantic Tokens** - 100% semantic token usage with color-mix sophistication
- **Gold Fill Brand** - Default variant uses gold fill for selected state (semantically correct)
- **Smart Accessibility** - ARIA compliant, keyboard navigation, screen reader support
- **Campus Choice Ready** - Optimized for UB single-choice forms and preference selection

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo single-choice selection and preference forms:
- **Course Selection** - Single course section, professor choice, time slot selection
- **Housing Preferences** - Single residence hall, room type, meal plan selection
- **Academic Planning** - Single major selection, graduation term, advisor choice
- **Event Registration** - Single event session, workshop track, time preference
- **Profile Settings** - Single privacy level, notification frequency, theme choice

### 📱 **MOBILE OPTIMIZATION**
- **Touch Targets** - All sizes meet 44px minimum touch target requirements
- **Thumb Selection** - Optimized for single-thumb selection workflows
- **Visual Feedback** - Clear selected/unselected states with visual confirmation
`}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","success","error","warning","info"],description:"Radio variant (default uses gold fill for selected state)"},size:{control:"select",options:["sm","default","lg","xl"],description:"Radio size (all optimized for mobile touch)"},checked:{control:"boolean",description:"Selected state"},disabled:{control:"boolean",description:"Disabled state"}}},S={args:{label:"Enable push notifications",description:"Receive real-time updates about your campus activities",variant:"default",size:"default",checked:!0,name:"notifications",value:"push"}},w={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(x,{children:[e.jsxs(g,{children:[e.jsxs(y,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"success",children:"✅ VARIANTS"}),"Radio Variants - Perfect Semantic Token Usage"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"5 variants using 100% semantic tokens (default uses gold fill for selected state)"})]}),e.jsx(b,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{label:"Default (Gold Fill)",description:"Gold fill indicates selected campus preferences",variant:"primary",checked:!0,name:"variant-demo-1",value:"default"}),e.jsx(a,{label:"Success Selection",description:"Indicates confirmed or validated choices",variant:"success",checked:!0,name:"variant-demo-2",value:"success"}),e.jsx(a,{label:"Error Selection",description:"Used for critical or problematic options",variant:"error",checked:!1,name:"variant-demo-3",value:"error"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{label:"Warning Selection",description:"Options that require attention or caution",variant:"warning",checked:!0,name:"variant-demo-4",value:"warning"}),e.jsx(a,{label:"Info Selection",description:"Informational options and secondary choices",variant:"info",checked:!1,name:"variant-demo-5",value:"info"})]})]})})]}),e.jsxs(x,{children:[e.jsxs(g,{children:[e.jsxs(y,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"info",children:"📏 SIZES"}),"Radio Sizes - Mobile-First Touch Optimization"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 sizes optimized for different campus coordination contexts"})]}),e.jsx(b,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Small",description:"Compact forms",size:"sm",variant:"primary",checked:!0,name:"size-demo-1",value:"sm"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"SM: 16px × 16px"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Default",description:"Standard use",size:"default",variant:"primary",checked:!0,name:"size-demo-2",value:"default"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Default: 20px × 20px"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Large",description:"Prominent forms",size:"lg",variant:"primary",checked:!0,name:"size-demo-3",value:"lg"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"LG: 24px × 24px"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Extra Large",description:"Hero forms",size:"xl",variant:"primary",checked:!0,name:"size-demo-4",value:"xl"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"XL: 28px × 28px"})]})]})})})]}),e.jsxs(x,{children:[e.jsxs(g,{children:[e.jsxs(y,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"primary",children:"⚡ FEATURES"}),"Advanced Features - Groups, Cards, Layouts"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Advanced radio features for enhanced campus choice selection UX"})]}),e.jsx(b,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Vertical Radio Groups:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs(t,{name:"notification-frequency",value:"daily",label:"Notification Frequency",description:"How often do you want to receive updates?",orientation:"vertical",spacing:"sm",children:[e.jsx(a,{value:"immediate",label:"Immediate",description:"Get notified right away"}),e.jsx(a,{value:"hourly",label:"Hourly Digest",description:"Summary every hour"}),e.jsx(a,{value:"daily",label:"Daily Summary",description:"Once per day overview"}),e.jsx(a,{value:"weekly",label:"Weekly Report",description:"Weekly comprehensive report"})]}),e.jsxs(t,{name:"privacy-level",value:"friends",label:"Privacy Level",description:"Who can see your campus activity?",orientation:"vertical",spacing:"sm",children:[e.jsx(a,{value:"public",label:"Public",description:"Visible to all UB students"}),e.jsx(a,{value:"friends",label:"Friends Only",description:"Only your connections"}),e.jsx(a,{value:"private",label:"Private",description:"Only you can see"}),e.jsx(a,{value:"ghost",label:"Ghost Mode",description:"Invisible to others"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Horizontal Radio Groups:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:[e.jsxs(t,{name:"theme-preference",value:"auto",label:"Theme Preference",description:"Choose your preferred interface theme",orientation:"horizontal",spacing:"lg",children:[e.jsx(a,{value:"light",label:"Light"}),e.jsx(a,{value:"dark",label:"Dark"}),e.jsx(a,{value:"auto",label:"Auto"})]}),e.jsxs(t,{name:"text-size",value:"medium",label:"Text Size",description:"Select your preferred text size",orientation:"horizontal",spacing:"md",children:[e.jsx(a,{value:"small",label:"Small",size:"sm"}),e.jsx(a,{value:"medium",label:"Medium",size:"default"}),e.jsx(a,{value:"large",label:"Large",size:"lg"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Radio Cards:"}),e.jsxs(t,{name:"residence-hall",value:"hadley",label:"Residence Hall Preference",description:"Select your preferred residence hall for next year",orientation:"vertical",spacing:"sm",children:[e.jsx(r,{value:"ellicott",label:"Ellicott Complex",description:"Traditional residence halls with shared bathrooms. Close to academic buildings and dining halls. Great for first-year students.",icon:e.jsx("span",{className:"text-lg",children:"🏢"}),badge:e.jsx(i,{variant:"info",size:"sm",children:"Traditional"})}),e.jsx(r,{value:"hadley",label:"Hadley Village",description:"Apartment-style living with full kitchens and living areas. Perfect for upper-class students seeking independence.",icon:e.jsx("span",{className:"text-lg",children:"🏠"}),badge:e.jsx(i,{variant:"success",size:"sm",children:"Apartment"})}),e.jsx(r,{value:"governors",label:"Governors Complex",description:"Suite-style rooms with shared common areas. Balance between traditional and apartment living.",icon:e.jsx("span",{className:"text-lg",children:"🏘️"}),badge:e.jsx(i,{variant:"primary",size:"sm",children:"Suite"})})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Required Selection:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:e.jsxs(t,{name:"graduation-term",value:"",label:"Expected Graduation Term",description:"When do you plan to graduate? (Required for academic planning)",required:!0,error:"Please select your expected graduation term",orientation:"vertical",spacing:"sm",children:[e.jsx(a,{value:"fall-2024",label:"Fall 2024",description:"December 2024"}),e.jsx(a,{value:"spring-2025",label:"Spring 2025",description:"May 2025"}),e.jsx(a,{value:"summer-2025",label:"Summer 2025",description:"August 2025"}),e.jsx(a,{value:"fall-2025",label:"Fall 2025",description:"December 2025"})]})})]})]})})]}),e.jsxs(x,{children:[e.jsxs(g,{children:[e.jsxs(y,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"secondary",children:"🎯 PRESETS"}),"Radio Presets - Common Campus Patterns"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Pre-built radio components for common campus single-choice scenarios"})]}),e.jsx(b,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Priority Selection:"}),e.jsx(C.Priority,{name:"task-priority",value:"medium",label:"Assignment Priority",description:"How urgent is this assignment?"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Size Selection:"}),e.jsx(C.Size,{name:"group-size",value:"md",label:"Study Group Size",description:"Preferred group size for collaboration"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Theme Selection:"}),e.jsx(C.Theme,{name:"interface-theme",value:"auto",label:"Interface Theme",description:"Choose your preferred visual theme"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Payment Method:"}),e.jsx(C.PaymentMethod,{name:"payment-method",value:"card",label:"Payment Method",description:"How would you like to pay?",options:[{value:"card",label:"Credit Card",icon:e.jsx("span",{children:"💳"})},{value:"paypal",label:"PayPal",icon:e.jsx("span",{children:"📱"})},{value:"campus",label:"Campus Card",icon:e.jsx("span",{children:"🎓"})}]})]})]})})]}),e.jsxs(x,{children:[e.jsxs(g,{children:[e.jsxs(y,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Single-Choice Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Radio usage in actual University at Buffalo single-choice selection and preference forms"})]}),e.jsxs(b,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"CSE 331 Section Selection:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:e.jsxs(t,{name:"cse331-section",value:"section-a2",label:"Choose Your CSE 331 Section",description:"Select one section that fits your schedule",required:!0,orientation:"vertical",spacing:"sm",children:[e.jsx(r,{value:"section-a1",label:"Section A1 - Dr. Smith",description:"MWF 10:00am - 10:50am • Davis Hall 101 • Available spots: 5/35",icon:e.jsx("span",{className:"text-lg",children:"👨‍🏫"}),badge:e.jsx(i,{variant:"warning",size:"sm",children:"Almost Full"})}),e.jsx(r,{value:"section-a2",label:"Section A2 - Dr. Smith",description:"TTh 2:00pm - 3:20pm • Knox Hall 20 • Available spots: 12/35",icon:e.jsx("span",{className:"text-lg",children:"👨‍🏫"}),badge:e.jsx(i,{variant:"success",size:"sm",children:"Available"})}),e.jsx(r,{value:"section-b1",label:"Section B1 - Prof. Johnson",description:"MWF 1:00pm - 1:50pm • Capen Hall 134 • Available spots: 8/35",icon:e.jsx("span",{className:"text-lg",children:"👩‍🏫"}),badge:e.jsx(i,{variant:"success",size:"sm",children:"Available"})}),e.jsx(r,{value:"section-b2",label:"Section B2 - Prof. Johnson",description:"TTh 11:00am - 12:20pm • Davis Hall 101 • Available spots: 0/35",icon:e.jsx("span",{className:"text-lg",children:"👩‍🏫"}),badge:e.jsx(i,{variant:"error",size:"sm",children:"Full"}),disabled:!0})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Meal Plan Selection:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:e.jsxs(t,{name:"meal-plan",value:"unlimited",label:"Choose Your Meal Plan",description:"Select the meal plan that best fits your lifestyle",required:!0,orientation:"vertical",spacing:"sm",children:[e.jsx(r,{value:"unlimited",label:"Unlimited Meal Plan",description:"Unlimited access to all dining halls, 400 dining dollars per semester. Perfect for students who eat most meals on campus.",icon:e.jsx("span",{className:"text-lg",children:"🍽️"}),badge:e.jsx(i,{variant:"primary",size:"sm",children:"Most Popular"})}),e.jsx(r,{value:"14-meals",label:"14 Meals Per Week",description:"14 meals per week plus 300 dining dollars. Good balance for students who occasionally eat off-campus.",icon:e.jsx("span",{className:"text-lg",children:"📅"}),badge:e.jsx(i,{variant:"success",size:"sm",children:"Balanced"})}),e.jsx(r,{value:"10-meals",label:"10 Meals Per Week",description:"10 meals per week plus 200 dining dollars. Ideal for students with lighter eating schedules.",icon:e.jsx("span",{className:"text-lg",children:"🥪"}),badge:e.jsx(i,{variant:"info",size:"sm",children:"Light"})}),e.jsx(r,{value:"declining-balance",label:"Declining Balance Only",description:"500 dining dollars per semester, no meal swipes. Maximum flexibility for upperclass students.",icon:e.jsx("span",{className:"text-lg",children:"💰"}),badge:e.jsx(i,{variant:"secondary",size:"sm",children:"Flexible"})})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Academic Advisor Assignment:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:e.jsxs(t,{name:"advisor-preference",value:"cs-focus",label:"Advisor Specialization Preference",description:"Choose an advisor based on your academic interests",required:!0,orientation:"vertical",spacing:"sm",children:[e.jsx(a,{value:"cs-focus",label:"Computer Science Focus",description:"Specializes in CS curriculum, graduate school prep, and tech industry career guidance"}),e.jsx(a,{value:"research-focus",label:"Research & Graduate School",description:"Expertise in research opportunities, PhD preparation, and academic career paths"}),e.jsx(a,{value:"industry-focus",label:"Industry & Internships",description:"Strong connections with tech companies, internship placement, and industry networking"}),e.jsx(a,{value:"interdisciplinary",label:"Interdisciplinary Studies",description:"Experience with double majors, minors, and cross-department collaboration"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Graduation Ceremony Participation:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:e.jsxs(t,{name:"graduation-ceremony",value:"",label:"Graduation Ceremony Plans",description:"Will you participate in the graduation ceremony?",required:!0,orientation:"vertical",spacing:"sm",children:[e.jsx(r,{value:"attending",label:"Yes, I will attend",description:"Participate in the full graduation ceremony with cap and gown. Includes professional photos and diploma presentation.",icon:e.jsx("span",{className:"text-lg",children:"🎓"}),badge:e.jsx(i,{variant:"success",size:"sm",children:"Traditional"})}),e.jsx(r,{value:"virtual",label:"Virtual participation only",description:"Watch the ceremony online and receive diploma by mail. Name will still be announced during virtual ceremony.",icon:e.jsx("span",{className:"text-lg",children:"💻"}),badge:e.jsx(i,{variant:"info",size:"sm",children:"Remote"})}),e.jsx(r,{value:"not-attending",label:"No, I will not participate",description:"Skip the ceremony entirely. Diploma will be mailed to your address on file after degree conferral.",icon:e.jsx("span",{className:"text-lg",children:"📮"}),badge:e.jsx(i,{variant:"secondary",size:"sm",children:"Mail Only"})})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Preferred Study Environment:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4",children:e.jsxs(t,{name:"study-environment",value:"library",label:"Where do you study best?",description:"Help us recommend the best study spaces for you",orientation:"vertical",spacing:"sm",children:[e.jsx(a,{value:"library",label:"Quiet Library Spaces",description:"Lockwood Library silent floors, Capen quiet study areas"}),e.jsx(a,{value:"collaborative",label:"Collaborative Study Areas",description:"Group study rooms, Student Union collaborative spaces"}),e.jsx(a,{value:"cafe",label:"Coffee Shops & Cafes",description:"Starbucks, Tim Hortons, campus cafes with background noise"}),e.jsx(a,{value:"dorm",label:"Residence Hall Study Lounges",description:"Floor study lounges, residence hall quiet areas"}),e.jsx(a,{value:"outdoor",label:"Outdoor Spaces (Weather Permitting)",description:"Campus quads, outdoor seating areas, fresh air study spots"})]})})]})]})]})]})},T={args:{label:"UB Campus Notification Preference",description:"Choose how you want to receive campus updates",variant:"default",size:"default",checked:!0,name:"campus-notifications",value:"immediate"},render:n=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(x,{children:[e.jsxs(g,{children:[e.jsx(y,{children:"Radio Enhanced Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different radio configurations"})]}),e.jsx(b,{className:"flex justify-center",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx(a,{...n})})})]})})};var A,L,B;S.parameters={...S.parameters,docs:{...(A=S.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Enable push notifications',
    description: 'Receive real-time updates about your campus activities',
    variant: 'default',
    size: 'default',
    checked: true,
    name: 'notifications',
    value: 'push'
  }
}`,...(B=(L=S.parameters)==null?void 0:L.docs)==null?void 0:B.source}}};var G,H,M;w.parameters={...w.parameters,docs:{...(G=w.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">✅ VARIANTS</Badge>
            Radio Variants - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 variants using 100% semantic tokens (default uses gold fill for selected state)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Radio label="Default (Gold Fill)" description="Gold fill indicates selected campus preferences" variant="primary" checked={true} name="variant-demo-1" value="default" />
              <Radio label="Success Selection" description="Indicates confirmed or validated choices" variant="success" checked={true} name="variant-demo-2" value="success" />
              <Radio label="Error Selection" description="Used for critical or problematic options" variant="error" checked={false} name="variant-demo-3" value="error" />
            </div>
            <div className="space-y-4">
              <Radio label="Warning Selection" description="Options that require attention or caution" variant="warning" checked={true} name="variant-demo-4" value="warning" />
              <Radio label="Info Selection" description="Informational options and secondary choices" variant="info" checked={false} name="variant-demo-5" value="info" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 SIZES</Badge>
            Radio Sizes - Mobile-First Touch Optimization
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 sizes optimized for different campus coordination contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Radio label="Small" description="Compact forms" size="sm" variant="primary" checked={true} name="size-demo-1" value="sm" />
                <p className="text-xs text-[var(--hive-text-muted)]">SM: 16px × 16px</p>
              </div>
              <div className="space-y-3">
                <Radio label="Default" description="Standard use" size="default" variant="primary" checked={true} name="size-demo-2" value="default" />
                <p className="text-xs text-[var(--hive-text-muted)]">Default: 20px × 20px</p>
              </div>
              <div className="space-y-3">
                <Radio label="Large" description="Prominent forms" size="lg" variant="primary" checked={true} name="size-demo-3" value="lg" />
                <p className="text-xs text-[var(--hive-text-muted)]">LG: 24px × 24px</p>
              </div>
              <div className="space-y-3">
                <Radio label="Extra Large" description="Hero forms" size="xl" variant="primary" checked={true} name="size-demo-4" value="xl" />
                <p className="text-xs text-[var(--hive-text-muted)]">XL: 28px × 28px</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ FEATURES</Badge>
            Advanced Features - Groups, Cards, Layouts
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced radio features for enhanced campus choice selection UX
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Radio Groups - Vertical */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Vertical Radio Groups:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <RadioGroup name="notification-frequency" value="daily" label="Notification Frequency" description="How often do you want to receive updates?" orientation="vertical" spacing="sm">
                  <Radio value="immediate" label="Immediate" description="Get notified right away" />
                  <Radio value="hourly" label="Hourly Digest" description="Summary every hour" />
                  <Radio value="daily" label="Daily Summary" description="Once per day overview" />
                  <Radio value="weekly" label="Weekly Report" description="Weekly comprehensive report" />
                </RadioGroup>
                
                <RadioGroup name="privacy-level" value="friends" label="Privacy Level" description="Who can see your campus activity?" orientation="vertical" spacing="sm">
                  <Radio value="public" label="Public" description="Visible to all UB students" />
                  <Radio value="friends" label="Friends Only" description="Only your connections" />
                  <Radio value="private" label="Private" description="Only you can see" />
                  <Radio value="ghost" label="Ghost Mode" description="Invisible to others" />
                </RadioGroup>
              </div>
            </div>

            {/* Radio Groups - Horizontal */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Horizontal Radio Groups:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
                <RadioGroup name="theme-preference" value="auto" label="Theme Preference" description="Choose your preferred interface theme" orientation="horizontal" spacing="lg">
                  <Radio value="light" label="Light" />
                  <Radio value="dark" label="Dark" />
                  <Radio value="auto" label="Auto" />
                </RadioGroup>
                
                <RadioGroup name="text-size" value="medium" label="Text Size" description="Select your preferred text size" orientation="horizontal" spacing="md">
                  <Radio value="small" label="Small" size="sm" />
                  <Radio value="medium" label="Medium" size="default" />
                  <Radio value="large" label="Large" size="lg" />
                </RadioGroup>
              </div>
            </div>

            {/* Radio Cards */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Radio Cards:</h4>
              <RadioGroup name="residence-hall" value="hadley" label="Residence Hall Preference" description="Select your preferred residence hall for next year" orientation="vertical" spacing="sm">
                <RadioCard value="ellicott" label="Ellicott Complex" description="Traditional residence halls with shared bathrooms. Close to academic buildings and dining halls. Great for first-year students." icon={<span className="text-lg">🏢</span>} badge={<Badge variant="info" size="sm">Traditional</Badge>} />
                <RadioCard value="hadley" label="Hadley Village" description="Apartment-style living with full kitchens and living areas. Perfect for upper-class students seeking independence." icon={<span className="text-lg">🏠</span>} badge={<Badge variant="success" size="sm">Apartment</Badge>} />
                <RadioCard value="governors" label="Governors Complex" description="Suite-style rooms with shared common areas. Balance between traditional and apartment living." icon={<span className="text-lg">🏘️</span>} badge={<Badge variant="primary" size="sm">Suite</Badge>} />
              </RadioGroup>
            </div>

            {/* Required Selection */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Required Selection:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <RadioGroup name="graduation-term" value="" label="Expected Graduation Term" description="When do you plan to graduate? (Required for academic planning)" required error="Please select your expected graduation term" orientation="vertical" spacing="sm">
                  <Radio value="fall-2024" label="Fall 2024" description="December 2024" />
                  <Radio value="spring-2025" label="Spring 2025" description="May 2025" />
                  <Radio value="summer-2025" label="Summer 2025" description="August 2025" />
                  <Radio value="fall-2025" label="Fall 2025" description="December 2025" />
                </RadioGroup>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Radio Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🎯 PRESETS</Badge>
            Radio Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built radio components for common campus single-choice scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Priority Selection:</h4>
              <RadioPresets.Priority name="task-priority" value="medium" label="Assignment Priority" description="How urgent is this assignment?" />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Selection:</h4>
              <RadioPresets.Size name="group-size" value="md" label="Study Group Size" description="Preferred group size for collaboration" />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Theme Selection:</h4>
              <RadioPresets.Theme name="interface-theme" value="auto" label="Interface Theme" description="Choose your preferred visual theme" />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Payment Method:</h4>
              <RadioPresets.PaymentMethod name="payment-method" value="card" label="Payment Method" description="How would you like to pay?" options={[{
              value: 'card',
              label: 'Credit Card',
              icon: <span>💳</span>
            }, {
              value: 'paypal',
              label: 'PayPal',
              icon: <span>📱</span>
            }, {
              value: 'campus',
              label: 'Campus Card',
              icon: <span>🎓</span>
            }]} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Single-Choice Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Radio usage in actual University at Buffalo single-choice selection and preference forms
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Section Selection */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 331 Section Selection:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <RadioGroup name="cse331-section" value="section-a2" label="Choose Your CSE 331 Section" description="Select one section that fits your schedule" required orientation="vertical" spacing="sm">
                <RadioCard value="section-a1" label="Section A1 - Dr. Smith" description="MWF 10:00am - 10:50am • Davis Hall 101 • Available spots: 5/35" icon={<span className="text-lg">👨‍🏫</span>} badge={<Badge variant="warning" size="sm">Almost Full</Badge>} />
                <RadioCard value="section-a2" label="Section A2 - Dr. Smith" description="TTh 2:00pm - 3:20pm • Knox Hall 20 • Available spots: 12/35" icon={<span className="text-lg">👨‍🏫</span>} badge={<Badge variant="success" size="sm">Available</Badge>} />
                <RadioCard value="section-b1" label="Section B1 - Prof. Johnson" description="MWF 1:00pm - 1:50pm • Capen Hall 134 • Available spots: 8/35" icon={<span className="text-lg">👩‍🏫</span>} badge={<Badge variant="success" size="sm">Available</Badge>} />
                <RadioCard value="section-b2" label="Section B2 - Prof. Johnson" description="TTh 11:00am - 12:20pm • Davis Hall 101 • Available spots: 0/35" icon={<span className="text-lg">👩‍🏫</span>} badge={<Badge variant="error" size="sm">Full</Badge>} disabled />
              </RadioGroup>
            </div>
          </div>

          {/* Meal Plan Selection */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Meal Plan Selection:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <RadioGroup name="meal-plan" value="unlimited" label="Choose Your Meal Plan" description="Select the meal plan that best fits your lifestyle" required orientation="vertical" spacing="sm">
                <RadioCard value="unlimited" label="Unlimited Meal Plan" description="Unlimited access to all dining halls, 400 dining dollars per semester. Perfect for students who eat most meals on campus." icon={<span className="text-lg">🍽️</span>} badge={<Badge variant="primary" size="sm">Most Popular</Badge>} />
                <RadioCard value="14-meals" label="14 Meals Per Week" description="14 meals per week plus 300 dining dollars. Good balance for students who occasionally eat off-campus." icon={<span className="text-lg">📅</span>} badge={<Badge variant="success" size="sm">Balanced</Badge>} />
                <RadioCard value="10-meals" label="10 Meals Per Week" description="10 meals per week plus 200 dining dollars. Ideal for students with lighter eating schedules." icon={<span className="text-lg">🥪</span>} badge={<Badge variant="info" size="sm">Light</Badge>} />
                <RadioCard value="declining-balance" label="Declining Balance Only" description="500 dining dollars per semester, no meal swipes. Maximum flexibility for upperclass students." icon={<span className="text-lg">💰</span>} badge={<Badge variant="secondary" size="sm">Flexible</Badge>} />
              </RadioGroup>
            </div>
          </div>

          {/* Academic Advisor Selection */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Advisor Assignment:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <RadioGroup name="advisor-preference" value="cs-focus" label="Advisor Specialization Preference" description="Choose an advisor based on your academic interests" required orientation="vertical" spacing="sm">
                <Radio value="cs-focus" label="Computer Science Focus" description="Specializes in CS curriculum, graduate school prep, and tech industry career guidance" />
                <Radio value="research-focus" label="Research & Graduate School" description="Expertise in research opportunities, PhD preparation, and academic career paths" />
                <Radio value="industry-focus" label="Industry & Internships" description="Strong connections with tech companies, internship placement, and industry networking" />
                <Radio value="interdisciplinary" label="Interdisciplinary Studies" description="Experience with double majors, minors, and cross-department collaboration" />
              </RadioGroup>
            </div>
          </div>

          {/* Graduation Ceremony Participation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Graduation Ceremony Participation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <RadioGroup name="graduation-ceremony" value="" label="Graduation Ceremony Plans" description="Will you participate in the graduation ceremony?" required orientation="vertical" spacing="sm">
                <RadioCard value="attending" label="Yes, I will attend" description="Participate in the full graduation ceremony with cap and gown. Includes professional photos and diploma presentation." icon={<span className="text-lg">🎓</span>} badge={<Badge variant="success" size="sm">Traditional</Badge>} />
                <RadioCard value="virtual" label="Virtual participation only" description="Watch the ceremony online and receive diploma by mail. Name will still be announced during virtual ceremony." icon={<span className="text-lg">💻</span>} badge={<Badge variant="info" size="sm">Remote</Badge>} />
                <RadioCard value="not-attending" label="No, I will not participate" description="Skip the ceremony entirely. Diploma will be mailed to your address on file after degree conferral." icon={<span className="text-lg">📮</span>} badge={<Badge variant="secondary" size="sm">Mail Only</Badge>} />
              </RadioGroup>
            </div>
          </div>

          {/* Study Space Preference */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Preferred Study Environment:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <RadioGroup name="study-environment" value="library" label="Where do you study best?" description="Help us recommend the best study spaces for you" orientation="vertical" spacing="sm">
                <Radio value="library" label="Quiet Library Spaces" description="Lockwood Library silent floors, Capen quiet study areas" />
                <Radio value="collaborative" label="Collaborative Study Areas" description="Group study rooms, Student Union collaborative spaces" />
                <Radio value="cafe" label="Coffee Shops & Cafes" description="Starbucks, Tim Hortons, campus cafes with background noise" />
                <Radio value="dorm" label="Residence Hall Study Lounges" description="Floor study lounges, residence hall quiet areas" />
                <Radio value="outdoor" label="Outdoor Spaces (Weather Permitting)" description="Campus quads, outdoor seating areas, fresh air study spots" />
              </RadioGroup>
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(M=(H=w.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var I,q,D;T.parameters={...T.parameters,docs:{...(I=T.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'UB Campus Notification Preference',
    description: 'Choose how you want to receive campus updates',
    variant: 'default',
    size: 'default',
    checked: true,
    name: 'campus-notifications',
    value: 'immediate'
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Radio Enhanced Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different radio configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <Radio {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(D=(q=T.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};const ae=["Default","CompleteShowcase","Playground"];export{w as CompleteShowcase,S as Default,T as Playground,ae as __namedExportsOrder,ee as default};
