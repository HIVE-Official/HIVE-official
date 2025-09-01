import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{R as n}from"./index-DJO9vBfz.js";import{c as E}from"./utils-CytzSlOG.js";import{H as i,c as o,a as c,b as d}from"./hive-tokens-CKIUfcHM.js";import{B as m}from"./badge-B09J4pcg.js";import{T as a}from"./text-Cao0VGB4.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";const se={square:"aspect-square",video:"aspect-video",photo:"aspect-[4/3]",wide:"aspect-[21/9]",portrait:"aspect-[3/4]"},te={cover:"object-cover",contain:"object-contain",fill:"object-fill","scale-down":"object-scale-down"},re={none:"rounded-none",sm:"rounded-sm",md:"rounded-md",lg:"rounded-lg",xl:"rounded-xl",full:"rounded-full"},s=n.forwardRef(({src:t,alt:l,fallback:g,aspectRatio:h,fit:V="cover",loading:M="lazy",placeholder:j="skeleton",sizes:z,priority:G=!1,rounded:_="md",bordered:J=!1,grayscale:X=!1,blur:W=!1,className:S,style:I,onError:w,onLoad:T,...Y},$)=>{const[v,C]=n.useState(!0),[x,R]=n.useState(!1),[K,Z]=n.useState(t);n.useEffect(()=>{C(!0),R(!1),Z(t)},[t]);const Q=u=>{C(!1),T==null||T(u)},ee=u=>{C(!1),R(!0),w==null||w(u)},P=["relative overflow-hidden","bg-[var(--hive-background-tertiary)]",typeof h=="string"?se[h]:"",re[_],J&&"border border-[var(--hive-border-primary)]",typeof h=="number"&&"relative"].filter(Boolean).join(" "),ae=["w-full h-full","transition-all duration-300 ease-out",te[V],X&&"grayscale",W&&"blur-sm",v&&j!=="none"&&"opacity-0",!v&&!x&&"opacity-100"].filter(Boolean).join(" "),k=n.useMemo(()=>{const u={...I};return typeof h=="number"&&(u.aspectRatio=h.toString()),u},[I,h]);return x&&g?e.jsx("div",{className:E(P,S),style:k,children:typeof g=="string"?e.jsx("div",{className:"flex items-center justify-center h-full text-[var(--hive-text-secondary)] text-sm",children:g}):g}):e.jsxs("div",{className:E(P,S),style:k,children:[v&&j==="skeleton"&&e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-[var(--hive-background-tertiary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] animate-pulse"}),v&&j==="blur"&&e.jsx("div",{className:"absolute inset-0 bg-[var(--hive-background-tertiary)] blur-sm"}),!x&&e.jsx("img",{ref:$,src:K,alt:l,loading:G?"eager":M,sizes:z,className:ae,onLoad:Q,onError:ee,...Y}),x&&!g&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-[var(--hive-background-tertiary)]",children:e.jsxs("div",{className:"text-center text-[var(--hive-text-secondary)]",children:[e.jsx("div",{className:"w-8 h-8 mx-auto mb-2 bg-[var(--hive-text-muted)] rounded opacity-50"}),e.jsx("p",{className:"text-xs",children:"Failed to load image"})]})})]})});s.displayName="Image";const p=n.forwardRef((t,l)=>e.jsx(s,{ref:l,aspectRatio:"square",rounded:"full",fit:"cover",...t}));p.displayName="ProfileImage";const r=n.forwardRef((t,l)=>e.jsx(s,{ref:l,aspectRatio:"square",fit:"cover",rounded:"md",...t}));r.displayName="ThumbnailImage";const N=n.forwardRef((t,l)=>e.jsx(s,{ref:l,aspectRatio:"video",fit:"cover",priority:!0,...t}));N.displayName="HeroImage";s.__docgenInfo={description:"",methods:[],displayName:"Image",props:{src:{required:!0,tsType:{name:"string"},description:""},alt:{required:!0,tsType:{name:"string"},description:""},fallback:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},aspectRatio:{required:!1,tsType:{name:"union",raw:"'square' | 'video' | 'photo' | 'wide' | 'portrait' | number",elements:[{name:"literal",value:"'square'"},{name:"literal",value:"'video'"},{name:"literal",value:"'photo'"},{name:"literal",value:"'wide'"},{name:"literal",value:"'portrait'"},{name:"number"}]},description:""},fit:{required:!1,tsType:{name:"union",raw:"'cover' | 'contain' | 'fill' | 'scale-down'",elements:[{name:"literal",value:"'cover'"},{name:"literal",value:"'contain'"},{name:"literal",value:"'fill'"},{name:"literal",value:"'scale-down'"}]},description:"",defaultValue:{value:"'cover'",computed:!1}},loading:{required:!1,tsType:{name:"union",raw:"'lazy' | 'eager'",elements:[{name:"literal",value:"'lazy'"},{name:"literal",value:"'eager'"}]},description:"",defaultValue:{value:"'lazy'",computed:!1}},placeholder:{required:!1,tsType:{name:"union",raw:"'blur' | 'skeleton' | 'none'",elements:[{name:"literal",value:"'blur'"},{name:"literal",value:"'skeleton'"},{name:"literal",value:"'none'"}]},description:"",defaultValue:{value:"'skeleton'",computed:!1}},sizes:{required:!1,tsType:{name:"string"},description:""},priority:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},rounded:{required:!1,tsType:{name:"union",raw:"'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"},{name:"literal",value:"'full'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},bordered:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},grayscale:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},blur:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}},composes:["Omit"]};p.__docgenInfo={description:"",methods:[],displayName:"ProfileImage"};r.__docgenInfo={description:"",methods:[],displayName:"ThumbnailImage"};N.__docgenInfo={description:"",methods:[],displayName:"HeroImage"};const he={title:"01-Atoms/Image - COMPLETE DEFINITION",component:s,parameters:{docs:{description:{component:`
## 🎯 HIVE Image - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated image display system for University at Buffalo campus content and media presentation.

### 🏆 **COMPONENT EXCELLENCE**
- **5 Aspect Ratios** - Square, video, photo, wide, portrait plus custom numeric ratios
- **4 Object Fit Options** - Cover, contain, fill, scale-down for perfect image presentation
- **6 Rounded Variants** - From none to full circle for flexible styling
- **3 Loading Placeholders** - Blur, skeleton, none for smooth loading experience
- **Smart Loading States** - Lazy loading, priority loading, error handling with fallbacks
- **Perfect Semantic Tokens** - 100% semantic token usage for all backgrounds and borders
- **Campus Media Ready** - Optimized for UB academic content, events, and student media

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo image content and media display:
- **Student Profiles** - Profile photos, academic headshots, student organization members
- **Campus Events** - Event photos, promotional images, campus life documentation
- **Academic Content** - Course materials, research images, presentation media
- **Administrative Media** - Department photos, faculty portraits, campus facilities
- **Social Features** - Post images, shared content, community galleries
- **Mobile Campus** - Responsive images for mobile campus access and social sharing

### 📱 **MOBILE OPTIMIZATION**
- **Progressive Loading** - Efficient loading with appropriate placeholders
- **Responsive Sizing** - Automatic sizing based on device capabilities
- **Touch-Friendly Display** - Optimized for mobile viewing and interaction
`}}},tags:["autodocs"],argTypes:{src:{control:"text",description:"Image source URL"},alt:{control:"text",description:"Alternative text for accessibility"},aspectRatio:{control:"select",options:["square","video","photo","wide","portrait"],description:"Image aspect ratio"},fit:{control:"select",options:["cover","contain","fill","scale-down"],description:"How image fits in container"},loading:{control:"select",options:["lazy","eager"],description:"Loading behavior"},placeholder:{control:"select",options:["blur","skeleton","none"],description:"Loading placeholder type"},rounded:{control:"select",options:["none","sm","md","lg","xl","full"],description:"Border radius"},bordered:{control:"boolean",description:"Show border"},grayscale:{control:"boolean",description:"Apply grayscale filter"},blur:{control:"boolean",description:"Apply blur effect"},priority:{control:"boolean",description:"Priority loading (eager)"}}},f={args:{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",alt:"University at Buffalo student",aspectRatio:"square",fit:"cover",loading:"lazy",placeholder:"skeleton",rounded:"md",bordered:!1,grayscale:!1,blur:!1,priority:!1},render:t=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(i,{children:e.jsxs(o,{className:"space-y-4",children:[e.jsx("div",{className:"w-64 mx-auto",children:e.jsx(s,{...t})}),e.jsx(a,{variant:"body-sm",color:"secondary",className:"text-center",children:"Default image display for University at Buffalo content"})]})})})},y={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(m,{variant:"success",children:"📐 ASPECT RATIOS"}),"Image Aspect Ratios - Content Presentation"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"5 predefined aspect ratios plus custom numeric ratios for flexible content presentation"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Standard Aspect Ratios:"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-5 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Square (1:1):"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",alt:"Student profile",aspectRatio:"square",rounded:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Profile photos"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Video (16:9):"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=225&fit=crop",alt:"Campus quad",aspectRatio:"video",rounded:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Campus scenes"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Photo (4:3):"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=225&fit=crop",alt:"Library study",aspectRatio:"photo",rounded:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Study spaces"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Wide (21:9):"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=171&fit=crop",alt:"Campus panorama",aspectRatio:"wide",rounded:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Campus views"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Portrait (3:4):"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=225&h=300&fit=crop",alt:"Student portrait",aspectRatio:"portrait",rounded:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Academic portraits"})]})]})]})})})]}),e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(m,{variant:"info",children:"🎯 OBJECT FIT"}),"Image Object Fit - Content Scaling"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 object fit options for perfect image scaling and presentation in containers"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Object Fit Comparison:"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Cover:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",alt:"Student photo cover",aspectRatio:"square",fit:"cover",rounded:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Fills container, crops if needed"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Contain:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",alt:"Student photo contain",aspectRatio:"square",fit:"contain",rounded:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Fits entirely, may have gaps"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Fill:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",alt:"Student photo fill",aspectRatio:"square",fit:"fill",rounded:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Stretches to fill container"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Scale Down:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",alt:"Student photo scale",aspectRatio:"square",fit:"scale-down",rounded:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Scales down if too large"})]})]})]})})})]}),e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(m,{variant:"primary",children:"🔵 ROUNDED"}),"Rounded Variants - Visual Styling"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"6 rounded variants from sharp corners to full circles for different content contexts"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Rounded Corner Options:"}),e.jsxs("div",{className:"grid grid-cols-3 md:grid-cols-6 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"None:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",alt:"No rounding",aspectRatio:"square",rounded:"none",className:"w-20 h-20"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Small:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",alt:"Small rounding",aspectRatio:"square",rounded:"sm",className:"w-20 h-20"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Medium:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",alt:"Medium rounding",aspectRatio:"square",rounded:"md",className:"w-20 h-20"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Large:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",alt:"Large rounding",aspectRatio:"square",rounded:"lg",className:"w-20 h-20"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"XL:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",alt:"XL rounding",aspectRatio:"square",rounded:"xl",className:"w-20 h-20"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Full:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face",alt:"Full circle",aspectRatio:"square",rounded:"full",className:"w-20 h-20"})]})]})]})})})]}),e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(m,{variant:"secondary",children:"✨ EFFECTS"}),"Visual Effects - Image Styling"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Visual effects and styling options for different content contexts and emphasis"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Visual Effect Options:"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Normal:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",alt:"Normal campus",aspectRatio:"photo",rounded:"lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Standard appearance"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Bordered:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=200&fit=crop",alt:"Bordered library",aspectRatio:"photo",rounded:"lg",bordered:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"With border outline"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Grayscale:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop",alt:"Grayscale campus",aspectRatio:"photo",rounded:"lg",grayscale:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Monochrome effect"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Blurred:"}),e.jsx(s,{src:"https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=200&fit=crop",alt:"Blurred study",aspectRatio:"photo",rounded:"lg",blur:!0}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Blur effect"})]})]})]})})})]}),e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(m,{variant:"warning",children:"⏳ LOADING"}),"Loading States - Progressive Enhancement"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Smooth loading experience with placeholders and fallback options"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Loading Placeholder Types:"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Skeleton Placeholder:"}),e.jsx("div",{className:"w-full h-48 bg-gradient-to-r from-[var(--hive-background-tertiary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] animate-pulse rounded-lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Animated gradient shimmer"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Blur Placeholder:"}),e.jsx("div",{className:"w-full h-48 bg-[var(--hive-background-tertiary)] blur-sm rounded-lg"}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Blurred background"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Error Fallback:"}),e.jsx("div",{className:"w-full h-48 bg-[var(--hive-background-tertiary)] rounded-lg flex items-center justify-center",children:e.jsxs("div",{className:"text-center text-[var(--hive-text-secondary)]",children:[e.jsx("div",{className:"w-8 h-8 mx-auto mb-2 bg-[var(--hive-text-muted)] rounded opacity-50"}),e.jsx("p",{className:"text-xs",children:"Failed to load image"})]})}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"text-center",children:"Error state display"})]})]})]})})})]}),e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(m,{variant:"primary",children:"🎯 PRESETS"}),"Image Presets - Common Campus Patterns"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Pre-configured image components for common University at Buffalo interface patterns"})]}),e.jsx(o,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"ProfileImage Preset:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx(p,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",alt:"Student profile",className:"w-16 h-16"}),e.jsx(p,{src:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",alt:"Faculty profile",className:"w-20 h-20"}),e.jsx(p,{src:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",alt:"Alumni profile",className:"w-24 h-24"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"ThumbnailImage Preset:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"grid grid-cols-4 md:grid-cols-6 gap-4",children:[e.jsx(r,{src:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop",alt:"Campus quad"}),e.jsx(r,{src:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop",alt:"Library study"}),e.jsx(r,{src:"https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop",alt:"Campus building"}),e.jsx(r,{src:"https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=200&h=200&fit=crop",alt:"Student activities"}),e.jsx(r,{src:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",alt:"Graduation ceremony"}),e.jsx(r,{src:"https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=200&h=200&fit=crop",alt:"Research lab"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"HeroImage Preset:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsx(N,{src:"https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop",alt:"University at Buffalo campus panorama",className:"w-full"})})]})]})})]}),e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsxs(d,{className:"flex items-center gap-3",children:[e.jsx(m,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Image Usage Examples"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Image usage in actual University at Buffalo academic and campus life contexts"})]}),e.jsxs(o,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Profile Display:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx(p,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",alt:"John Smith - Computer Science Student",className:"w-24 h-24"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"John Smith"}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Computer Science & Engineering • Class of 2025"}),e.jsx(a,{variant:"body-sm",color:"gold",children:"Dean's List • Research Assistant"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Event Gallery:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"CS Department Career Fair 2024"}),e.jsx(N,{src:"https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop",alt:"CS Career Fair main event space"}),e.jsxs("div",{className:"grid grid-cols-4 md:grid-cols-6 gap-4",children:[e.jsx(r,{src:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=200&fit=crop",alt:"Students networking"}),e.jsx(r,{src:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=200&fit=crop",alt:"Company booths"}),e.jsx(r,{src:"https://images.unsplash.com/photo-1515169067868-5387ec356754?w=200&h=200&fit=crop",alt:"Resume reviews"}),e.jsx(r,{src:"https://images.unsplash.com/photo-1552581234-26160f608093?w=200&h=200&fit=crop",alt:"Tech demonstrations"}),e.jsx(r,{src:"https://images.unsplash.com/photo-1573164713988-8665fc963095?w=200&h=200&fit=crop",alt:"Student presentations"}),e.jsx(r,{src:"https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=200&fit=crop",alt:"Awards ceremony"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Course Materials Display:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"CSE 331 - Algorithm Analysis"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Lecture Materials:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{src:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=75&fit=crop",alt:"Algorithm complexity chart",aspectRatio:"photo",rounded:"sm",className:"w-16 h-12"}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Big O Notation"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Complexity analysis fundamentals"})]})]}),e.jsxs("div",{className:"flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{src:"https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=100&h=75&fit=crop",alt:"Graph algorithms",aspectRatio:"photo",rounded:"sm",className:"w-16 h-12"}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Graph Algorithms"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"BFS, DFS, shortest paths"})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Assignment Examples:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{src:"https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=100&h=75&fit=crop",alt:"Code implementation",aspectRatio:"photo",rounded:"sm",className:"w-16 h-12"}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Dynamic Programming"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Assignment 3 solution"})]})]}),e.jsxs("div",{className:"flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{src:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=75&fit=crop",alt:"Data structures",aspectRatio:"photo",rounded:"sm",className:"w-16 h-12"}),e.jsxs("div",{children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Tree Structures"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Binary search trees"})]})]})]})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Faculty Directory:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"Computer Science & Engineering Faculty"}),e.jsx("div",{className:"grid md:grid-cols-2 gap-6",children:[{name:"Dr. Sarah Johnson",title:"Professor & Department Chair",specialties:"Machine Learning, AI Ethics",image:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"},{name:"Dr. Michael Chen",title:"Associate Professor",specialties:"Computer Graphics, Visualization",image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"},{name:"Dr. Emily Rodriguez",title:"Assistant Professor",specialties:"Cybersecurity, Network Protocols",image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"},{name:"Dr. David Kim",title:"Professor",specialties:"Software Engineering, HCI",image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}].map(t=>e.jsxs("div",{className:"flex items-center gap-4 p-4 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(p,{src:t.image,alt:`${t.name} - ${t.title}`,className:"w-16 h-16"}),e.jsxs("div",{className:"space-y-1",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:t.name}),e.jsx(a,{variant:"body-xs",color:"secondary",children:t.title}),e.jsx(a,{variant:"body-xs",color:"gold",children:t.specialties})]})]},t.name))})]})]})]})]})]})},b={args:{src:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",alt:"University at Buffalo campus",aspectRatio:"photo",fit:"cover",loading:"lazy",placeholder:"skeleton",rounded:"lg",bordered:!1,grayscale:!1,blur:!1,priority:!1},render:t=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(i,{children:[e.jsxs(c,{children:[e.jsx(d,{children:"Image Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different image configurations"})]}),e.jsx(o,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"w-80 mx-auto",children:e.jsx(s,{...t})}),e.jsx(a,{variant:"body-sm",color:"secondary",className:"text-center",children:"Interactive image testing for University at Buffalo content display"})]})})]})})};var B,A,F;f.parameters={...f.parameters,docs:{...(B=f.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    alt: 'University at Buffalo student',
    aspectRatio: 'square',
    fit: 'cover',
    loading: 'lazy',
    placeholder: 'skeleton',
    rounded: 'md',
    bordered: false,
    grayscale: false,
    blur: false,
    priority: false
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <div className="w-64 mx-auto">
            <Image {...args} />
          </div>
          <Text variant="body-sm" color="secondary" className="text-center">
            Default image display for University at Buffalo content
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(F=(A=f.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var q,D,L;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Aspect Ratio Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">📐 ASPECT RATIOS</Badge>
            Image Aspect Ratios - Content Presentation
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 predefined aspect ratios plus custom numeric ratios for flexible content presentation
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Standard Aspect Ratios:</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Square (1:1):</Text>
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" alt="Student profile" aspectRatio="square" rounded="lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Profile photos</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Video (16:9):</Text>
                  <Image src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=225&fit=crop" alt="Campus quad" aspectRatio="video" rounded="lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Campus scenes</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Photo (4:3):</Text>
                  <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=225&fit=crop" alt="Library study" aspectRatio="photo" rounded="lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Study spaces</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Wide (21:9):</Text>
                  <Image src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=171&fit=crop" alt="Campus panorama" aspectRatio="wide" rounded="lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Campus views</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Portrait (3:4):</Text>
                  <Image src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=225&h=300&fit=crop" alt="Student portrait" aspectRatio="portrait" rounded="lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Academic portraits</Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Object Fit Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎯 OBJECT FIT</Badge>
            Image Object Fit - Content Scaling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 object fit options for perfect image scaling and presentation in containers
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Object Fit Comparison:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Cover:</Text>
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face" alt="Student photo cover" aspectRatio="square" fit="cover" rounded="lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Fills container, crops if needed</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Contain:</Text>
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face" alt="Student photo contain" aspectRatio="square" fit="contain" rounded="lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Fits entirely, may have gaps</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Fill:</Text>
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face" alt="Student photo fill" aspectRatio="square" fit="fill" rounded="lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Stretches to fill container</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Scale Down:</Text>
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face" alt="Student photo scale" aspectRatio="square" fit="scale-down" rounded="lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Scales down if too large</Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Rounded Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🔵 ROUNDED</Badge>
            Rounded Variants - Visual Styling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 rounded variants from sharp corners to full circles for different content contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Rounded Corner Options:</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">None:</Text>
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="No rounding" aspectRatio="square" rounded="none" className="w-20 h-20" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small:</Text>
                  <Image src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" alt="Small rounding" aspectRatio="square" rounded="sm" className="w-20 h-20" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium:</Text>
                  <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" alt="Medium rounding" aspectRatio="square" rounded="md" className="w-20 h-20" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large:</Text>
                  <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" alt="Large rounding" aspectRatio="square" rounded="lg" className="w-20 h-20" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">XL:</Text>
                  <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" alt="XL rounding" aspectRatio="square" rounded="xl" className="w-20 h-20" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Full:</Text>
                  <Image src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face" alt="Full circle" aspectRatio="square" rounded="full" className="w-20 h-20" />
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Visual Effects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">✨ EFFECTS</Badge>
            Visual Effects - Image Styling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Visual effects and styling options for different content contexts and emphasis
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Visual Effect Options:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Normal:</Text>
                  <Image src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop" alt="Normal campus" aspectRatio="photo" rounded="lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Standard appearance</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Bordered:</Text>
                  <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=200&fit=crop" alt="Bordered library" aspectRatio="photo" rounded="lg" bordered />
                  <Text variant="body-xs" color="secondary" className="text-center">With border outline</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Grayscale:</Text>
                  <Image src="https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop" alt="Grayscale campus" aspectRatio="photo" rounded="lg" grayscale />
                  <Text variant="body-xs" color="secondary" className="text-center">Monochrome effect</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Blurred:</Text>
                  <Image src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=200&fit=crop" alt="Blurred study" aspectRatio="photo" rounded="lg" blur />
                  <Text variant="body-xs" color="secondary" className="text-center">Blur effect</Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="warning">⏳ LOADING</Badge>
            Loading States - Progressive Enhancement
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Smooth loading experience with placeholders and fallback options
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Loading Placeholder Types:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Skeleton Placeholder:</Text>
                  <div className="w-full h-48 bg-gradient-to-r from-[var(--hive-background-tertiary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] animate-pulse rounded-lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Animated gradient shimmer</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Blur Placeholder:</Text>
                  <div className="w-full h-48 bg-[var(--hive-background-tertiary)] blur-sm rounded-lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Blurred background</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Error Fallback:</Text>
                  <div className="w-full h-48 bg-[var(--hive-background-tertiary)] rounded-lg flex items-center justify-center">
                    <div className="text-center text-[var(--hive-text-secondary)]">
                      <div className="w-8 h-8 mx-auto mb-2 bg-[var(--hive-text-muted)] rounded opacity-50" />
                      <p className="text-xs">Failed to load image</p>
                    </div>
                  </div>
                  <Text variant="body-xs" color="secondary" className="text-center">Error state display</Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎯 PRESETS</Badge>
            Image Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-configured image components for common University at Buffalo interface patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">ProfileImage Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="flex items-center gap-6">
                  <ProfileImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Student profile" className="w-16 h-16" />
                  <ProfileImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" alt="Faculty profile" className="w-20 h-20" />
                  <ProfileImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" alt="Alumni profile" className="w-24 h-24" />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">ThumbnailImage Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  <ThumbnailImage src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop" alt="Campus quad" />
                  <ThumbnailImage src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop" alt="Library study" />
                  <ThumbnailImage src="https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop" alt="Campus building" />
                  <ThumbnailImage src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=200&h=200&fit=crop" alt="Student activities" />
                  <ThumbnailImage src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop" alt="Graduation ceremony" />
                  <ThumbnailImage src="https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=200&h=200&fit=crop" alt="Research lab" />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">HeroImage Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <HeroImage src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop" alt="University at Buffalo campus panorama" className="w-full" />

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
            Real Campus Image Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Image usage in actual University at Buffalo academic and campus life contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Profile Display */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Profile Display:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="flex items-center gap-6">
                <ProfileImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="John Smith - Computer Science Student" className="w-24 h-24" />
                <div className="space-y-2">
                  <Text as="h3" variant="heading-sm" color="primary">
                    John Smith
                  </Text>
                  <Text variant="body-sm" color="secondary">
                    Computer Science & Engineering • Class of 2025
                  </Text>
                  <Text variant="body-sm" color="gold">
                    Dean's List • Research Assistant
                  </Text>
                </div>
              </div>

            </div>
          </div>

          {/* Campus Event Gallery */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Event Gallery:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text as="h3" variant="heading-sm" color="primary">
                CS Department Career Fair 2024
              </Text>

              <HeroImage src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop" alt="CS Career Fair main event space" />

              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                <ThumbnailImage src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=200&fit=crop" alt="Students networking" />
                <ThumbnailImage src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=200&fit=crop" alt="Company booths" />
                <ThumbnailImage src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=200&h=200&fit=crop" alt="Resume reviews" />
                <ThumbnailImage src="https://images.unsplash.com/photo-1552581234-26160f608093?w=200&h=200&fit=crop" alt="Tech demonstrations" />
                <ThumbnailImage src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=200&h=200&fit=crop" alt="Student presentations" />
                <ThumbnailImage src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=200&fit=crop" alt="Awards ceremony" />
              </div>

            </div>
          </div>

          {/* Course Materials */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Materials Display:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text as="h3" variant="heading-sm" color="primary">
                CSE 331 - Algorithm Analysis
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Lecture Materials:</Text>
                  <div className="space-y-3">
                    
                    <div className="flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <Image src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=75&fit=crop" alt="Algorithm complexity chart" aspectRatio="photo" rounded="sm" className="w-16 h-12" />
                      <div>
                        <Text variant="body-sm" color="primary" weight="medium">Big O Notation</Text>
                        <Text variant="body-xs" color="secondary">Complexity analysis fundamentals</Text>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <Image src="https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=100&h=75&fit=crop" alt="Graph algorithms" aspectRatio="photo" rounded="sm" className="w-16 h-12" />
                      <div>
                        <Text variant="body-sm" color="primary" weight="medium">Graph Algorithms</Text>
                        <Text variant="body-xs" color="secondary">BFS, DFS, shortest paths</Text>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Assignment Examples:</Text>
                  <div className="space-y-3">
                    
                    <div className="flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <Image src="https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=100&h=75&fit=crop" alt="Code implementation" aspectRatio="photo" rounded="sm" className="w-16 h-12" />
                      <div>
                        <Text variant="body-sm" color="primary" weight="medium">Dynamic Programming</Text>
                        <Text variant="body-xs" color="secondary">Assignment 3 solution</Text>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=75&fit=crop" alt="Data structures" aspectRatio="photo" rounded="sm" className="w-16 h-12" />
                      <div>
                        <Text variant="body-sm" color="primary" weight="medium">Tree Structures</Text>
                        <Text variant="body-xs" color="secondary">Binary search trees</Text>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Faculty Directory */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Faculty Directory:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text as="h3" variant="heading-sm" color="primary">
                Computer Science & Engineering Faculty
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                {[{
                name: "Dr. Sarah Johnson",
                title: "Professor & Department Chair",
                specialties: "Machine Learning, AI Ethics",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
              }, {
                name: "Dr. Michael Chen",
                title: "Associate Professor",
                specialties: "Computer Graphics, Visualization",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
              }, {
                name: "Dr. Emily Rodriguez",
                title: "Assistant Professor",
                specialties: "Cybersecurity, Network Protocols",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
              }, {
                name: "Dr. David Kim",
                title: "Professor",
                specialties: "Software Engineering, HCI",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
              }].map(faculty => <div key={faculty.name} className="flex items-center gap-4 p-4 bg-[var(--hive-background-primary)] rounded-lg">
                    <ProfileImage src={faculty.image} alt={\`\${faculty.name} - \${faculty.title}\`} className="w-16 h-16" />
                    <div className="space-y-1">
                      <Text variant="body-sm" color="primary" weight="medium">{faculty.name}</Text>
                      <Text variant="body-xs" color="secondary">{faculty.title}</Text>
                      <Text variant="body-xs" color="gold">{faculty.specialties}</Text>
                    </div>
                  </div>)}

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(L=(D=y.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var O,U,H;b.parameters={...b.parameters,docs:{...(O=b.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    alt: 'University at Buffalo campus',
    aspectRatio: 'photo',
    fit: 'cover',
    loading: 'lazy',
    placeholder: 'skeleton',
    rounded: 'lg',
    bordered: false,
    grayscale: false,
    blur: false,
    priority: false
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Image Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different image configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="w-80 mx-auto">
              <Image {...args} />
            </div>
            <Text variant="body-sm" color="secondary" className="text-center">
              Interactive image testing for University at Buffalo content display
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(H=(U=b.parameters)==null?void 0:U.docs)==null?void 0:H.source}}};const ue=["Default","CompleteShowcase","Playground"];export{y as CompleteShowcase,f as Default,b as Playground,ue as __namedExportsOrder,he as default};
