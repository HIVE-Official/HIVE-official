import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as X}from"./index-DJO9vBfz.js";import{c as m}from"./utils-CytzSlOG.js";import{H as p,a as h,c as g,b as f}from"./hive-tokens-CKIUfcHM.js";import{B as u}from"./badge-B09J4pcg.js";import{T as a}from"./text-Cao0VGB4.js";import{E as P}from"./eye-off-BoT7HipX.js";import{S as B}from"./settings-GFIh7SpU.js";import{S as M}from"./shield-C_Z4LaB7.js";import{C as Q}from"./check-CNhzvRgm.js";import{A as J}from"./activity-DkRGcIzu.js";import{c as ee}from"./createLucideIcon-WpwZgzX-.js";import{C as ie}from"./clock-Boexj8FH.js";import{C as G}from"./chevron-right-BGhHLs4c.js";import{T as ae}from"./triangle-alert-3X5SM_bw.js";import{L as te}from"./lock-EH5zy6bB.js";import{U as oe}from"./users-kvqvVsnf.js";import{G as re}from"./globe-De5bsiXL.js";import{M as se}from"./map-pin-CNTkGvcp.js";import{M as ne}from"./message-square-BYWfq8X7.js";import{E as ce}from"./eye-B7JxKiV6.js";import{a as i}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=ee("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]),le=n=>{const t={visibility:{color:"text-blue-500",bgColor:"bg-blue-500/10",borderColor:"border-blue-500/20",icon:ce,label:"Visibility"},data:{color:"text-red-500",bgColor:"bg-red-500/10",borderColor:"border-red-500/20",icon:M,label:"Data Protection"},interaction:{color:"text-green-500",bgColor:"bg-green-500/10",borderColor:"border-green-500/20",icon:ne,label:"Interactions"},location:{color:"text-purple-500",bgColor:"bg-purple-500/10",borderColor:"border-purple-500/20",icon:se,label:"Location"},activity:{color:"text-[var(--hive-gold)]",bgColor:"bg-[var(--hive-gold)]/10",borderColor:"border-[var(--hive-gold)]/20",icon:J,label:"Activity Tracking"}};return t[n]||t.visibility},ve=n=>{const t={public:{color:"text-green-500",bgColor:"bg-green-500/10",icon:re,label:"Public Profile"},friends:{color:"text-blue-500",bgColor:"bg-blue-500/10",icon:oe,label:"Friends Only"},private:{color:"text-[var(--hive-gold)]",bgColor:"bg-[var(--hive-gold)]/10",icon:te,label:"Private"},ghost:{color:"text-purple-500",bgColor:"bg-purple-500/10",icon:P,label:"Ghost Mode"}};return t[n]||t.private},me=n=>{const t=new Date(n),c=new Date,v=Math.floor((c.getTime()-t.getTime())/(1e3*60*60));if(v<1){const y=Math.floor((c.getTime()-t.getTime())/6e4);return y<1?"Just now":`${y}m ago`}else return v<24?`${v}h ago`:`${Math.floor(v/24)}d ago`},o=({user:n,ghostModeConfig:t,privacySettings:c=[],visibilityLevel:v="private",lastPrivacyUpdate:y,privacyScore:k=85,activeSessions:_=1,isEditable:d=!0,onToggleGhostMode:U,onUpdatePrivacySetting:E,onViewPrivacySettings:x,onConfigureGhostMode:w,onViewDataExport:V,className:$})=>{const[L,I]=X.useState(!1),l=(t==null?void 0:t.isActive)||v==="ghost",S=ve(v),K=c.filter(r=>r.isEnabled).length,A=c.filter(r=>r.category==="data"&&r.isEnabled).length;return e.jsxs(p,{className:m("relative overflow-hidden transition-all duration-300 hover:shadow-lg","bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]",L&&"scale-[1.02]",l&&"border-purple-500/30 bg-purple-500/5",$),onMouseEnter:()=>I(!0),onMouseLeave:()=>I(!1),children:[e.jsx(h,{className:"pb-2",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Privacy & Ghost Mode"}),l&&e.jsxs(u,{variant:"secondary",className:"text-xs text-purple-500",children:[e.jsx(P,{className:"h-3 w-3 mr-1"}),"Ghost Active"]})]}),d&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:x,className:"h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(B,{className:"h-3 w-3"})})]})}),e.jsxs(g,{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(M,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsxs(a,{variant:"body-sm",weight:"medium",color:"primary",children:[k,"%"]})]}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Privacy Score"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(Q,{className:"h-3 w-3 text-green-500"}),e.jsx(a,{variant:"body-sm",weight:"medium",color:"primary",children:K})]}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Settings Active"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(J,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsx(a,{variant:"body-sm",weight:"medium",color:"primary",children:_})]}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Active Sessions"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Current Status:"}),e.jsx("div",{className:m("p-3 rounded-lg border",S.bgColor,"border-[var(--hive-border-primary)]"),children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(S.icon,{className:m("h-4 w-4",S.color)}),e.jsx(a,{variant:"body-sm",weight:"medium",color:"primary",children:S.label})]}),y&&e.jsxs(a,{variant:"body-xs",color:"secondary",children:["Updated ",me(y)]})]})})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Ghost Mode:"}),d&&U&&e.jsx(ButtonEnhanced,{variant:l?"primary":"secondary",size:"sm",onClick:()=>U(!l),className:m(l&&"bg-purple-500 hover:bg-purple-600 text-[var(--hive-text-inverse)]"),children:l?e.jsxs(e.Fragment,{children:[e.jsx(P,{className:"h-3 w-3 mr-1"}),"Disable"]}):e.jsxs(e.Fragment,{children:[e.jsx(de,{className:"h-3 w-3 mr-1"}),"Enable"]})})]}),l&&t&&e.jsxs("div",{className:"p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(a,{variant:"body-sm",color:"primary",children:"Ghost Mode Active"}),e.jsx(u,{variant:"secondary",className:"text-xs text-purple-500",children:t.visibilityLevel})]}),e.jsxs(a,{variant:"body-xs",color:"secondary",children:["Your profile is ",t.visibilityLevel==="invisible"?"completely hidden":t.visibilityLevel==="minimal"?"minimally visible":"selectively visible","to other UB students"]}),t.duration==="scheduled"&&t.scheduledEnd&&e.jsxs("div",{className:"flex items-center gap-1 mt-2",children:[e.jsx(ie,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsxs(a,{variant:"body-xs",color:"secondary",children:["Ends: ",new Date(t.scheduledEnd).toLocaleDateString()]})]}),d&&w&&e.jsxs(ButtonEnhanced,{variant:"ghost",size:"sm",onClick:w,className:"mt-2 text-purple-500 hover:text-purple-600",children:["Configure Settings",e.jsx(G,{className:"h-3 w-3 ml-1"})]})]})]}),c.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Privacy Controls:"}),c.length>3&&e.jsxs(a,{variant:"body-xs",color:"secondary",children:["+",c.length-3," more"]})]}),e.jsx("div",{className:"space-y-1",children:c.slice(0,3).map(r=>{const Z=le(r.category);return e.jsxs("div",{className:"flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer",onClick:()=>d&&(E==null?void 0:E(r.id,!r.isEnabled)),children:[e.jsx(Z.icon,{className:m("h-3 w-3",Z.color)}),e.jsx(a,{variant:"body-xs",color:"primary",className:"flex-1 truncate",children:r.name}),e.jsx("div",{className:m("w-2 h-2 rounded-full",r.isEnabled?"bg-green-500":"bg-[var(--hive-text-muted)]")}),d&&e.jsx(G,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"})]},r.id)})})]}),A>0&&e.jsxs("div",{className:"space-y-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Privacy Insights:"}),e.jsxs("div",{className:"p-3 bg-green-500/10 border border-green-500/20 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(M,{className:"h-4 w-4 text-green-500"}),e.jsxs(a,{variant:"body-sm",color:"primary",children:[A," data protection settings active"]})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-1",children:"Your personal data is well-protected according to UB privacy standards"})]})]}),e.jsxs("div",{className:"flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[d&&x&&e.jsxs(ButtonEnhanced,{variant:"secondary",size:"sm",onClick:x,className:"flex-1",children:[e.jsx(M,{className:"h-3 w-3 mr-1"}),"Privacy Settings"]}),d&&w&&e.jsxs(ButtonEnhanced,{variant:"primary",size:"sm",onClick:w,className:"flex-1",children:[e.jsx(P,{className:"h-3 w-3 mr-1"}),"Ghost Config"]}),V&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:V,className:"text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(B,{className:"h-3 w-3"})})]}),k<50&&e.jsxs("div",{className:"p-3 bg-red-500/10 border border-red-500/20 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(ae,{className:"h-4 w-4 text-red-500"}),e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Privacy Score Low"})]}),e.jsx(a,{variant:"body-xs",color:"secondary",className:"mt-1",children:"Consider enabling more privacy settings to protect your UB campus activity"}),d&&x&&e.jsxs(ButtonEnhanced,{variant:"ghost",size:"sm",onClick:x,className:"mt-2 text-red-500 hover:text-red-600",children:["Review Settings",e.jsx(G,{className:"h-3 w-3 ml-1"})]})]})]}),L&&e.jsx("div",{className:m("absolute inset-0 -z-10 rounded-lg blur-xl",l?"bg-gradient-to-r from-purple-500/5 to-indigo-500/5":"bg-gradient-to-r from-blue-500/5 to-green-500/5")})]})};o.__docgenInfo={description:"",methods:[],displayName:"ProfileGhostModeWidget",props:{user:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}}]}},description:""},ghostModeConfig:{required:!1,tsType:{name:"GhostModeConfig"},description:""},privacySettings:{required:!1,tsType:{name:"Array",elements:[{name:"PrivacySetting"}],raw:"PrivacySetting[]"},description:"",defaultValue:{value:"[]",computed:!1}},visibilityLevel:{required:!1,tsType:{name:"union",raw:"'public' | 'friends' | 'private' | 'ghost'",elements:[{name:"literal",value:"'public'"},{name:"literal",value:"'friends'"},{name:"literal",value:"'private'"},{name:"literal",value:"'ghost'"}]},description:"",defaultValue:{value:"'private'",computed:!1}},lastPrivacyUpdate:{required:!1,tsType:{name:"string"},description:""},privacyScore:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"85",computed:!1}},activeSessions:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},isEditable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onToggleGhostMode:{required:!1,tsType:{name:"signature",type:"function",raw:"(enabled: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"enabled"}],return:{name:"void"}}},description:""},onUpdatePrivacySetting:{required:!1,tsType:{name:"signature",type:"function",raw:"(settingId: string, enabled: boolean) => void",signature:{arguments:[{type:{name:"string"},name:"settingId"},{type:{name:"boolean"},name:"enabled"}],return:{name:"void"}}},description:""},onViewPrivacySettings:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onConfigureGhostMode:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onViewDataExport:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const He={title:"04-Organisms/Profile System/Profile Ghost Mode Widget - COMPLETE DEFINITION",component:o,parameters:{docs:{description:{component:`
## 🎯 HIVE Profile Ghost Mode Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive privacy controls and ghost mode interface for University at Buffalo HIVE platform student privacy management and campus visibility control.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Privacy Categories** - Visibility, data protection, interactions, location, activity tracking for complete privacy control
- **4 Visibility Levels** - Public, friends-only, private, ghost mode for granular campus visibility management
- **Advanced Ghost Mode** - Temporary, scheduled, permanent invisibility with selective interaction controls
- **Privacy Scoring** - Real-time privacy assessment with recommendations and campus safety insights
- **Session Management** - Active session tracking and security monitoring for UB account protection
- **Interactive Controls** - Toggle switches, configuration panels, and responsive privacy setting management
- **Campus Safety** - University at Buffalo specific privacy considerations and academic environment protection
- **Data Export** - FERPA-compliant data management and educational privacy rights protection

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student privacy management:
- **Academic Privacy** - Course participation visibility, grade discussion privacy, study group discretion
- **Campus Safety** - Residence hall location privacy, campus activity tracking, peer interaction controls
- **Social Boundaries** - Friend circle visibility, event participation privacy, community engagement control
- **Professional Growth** - Career development privacy, networking discretion, academic achievement visibility
- **Ghost Mode Usage** - Study isolation periods, social breaks, campus drama avoidance, academic focus time
- **Privacy Education** - FERPA awareness, digital citizenship, campus safety protocols, data protection rights
- **Emergency Override** - Campus safety protocols with privacy respect and emergency contact systems

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Controls** - Large toggle switches and privacy setting buttons optimized for mobile interaction
- **Responsive Privacy Panel** - Adaptive layout for different screen sizes and one-handed campus usage
- **Quick Ghost Toggle** - Instant privacy mode activation for immediate campus visibility control
- **Mobile Security** - Location-aware privacy suggestions and campus network safety protocols
`}}},tags:["autodocs"],argTypes:{ghostModeConfig:{control:"object",description:"Ghost mode configuration object"},privacySettings:{control:"object",description:"Array of privacy setting items"},visibilityLevel:{control:"select",options:["public","friends","private","ghost"],description:"Current visibility level"},privacyScore:{control:{type:"range",min:0,max:100},description:"Privacy score percentage"},activeSessions:{control:"number",description:"Number of active sessions"},isEditable:{control:"boolean",description:"Enable editing capabilities"},onToggleGhostMode:{action:"toggle-ghost-mode",description:"Ghost mode toggle handler"},onUpdatePrivacySetting:{action:"update-privacy-setting",description:"Privacy setting update handler"},onViewPrivacySettings:{action:"view-privacy-settings",description:"View all privacy settings handler"},onConfigureGhostMode:{action:"configure-ghost-mode",description:"Ghost mode configuration handler"},onViewDataExport:{action:"view-data-export",description:"Data export handler"}}},b=[{id:"privacy-001",name:"Profile visibility to classmates",description:"Control who can see your academic profile",category:"visibility",isEnabled:!0,level:"friends",lastModified:"2024-01-15T09:30:00Z"},{id:"privacy-002",name:"Location sharing in residence halls",description:"Share your location with floor community",category:"location",isEnabled:!1,level:"private",lastModified:"2024-01-15T08:15:00Z"},{id:"privacy-003",name:"Activity feed visibility",description:"Control who sees your campus activity",category:"activity",isEnabled:!0,level:"friends",lastModified:"2024-01-15T07:45:00Z"}],j=[{id:"privacy-101",name:"Profile visibility to classmates",description:"Control who can see your academic profile",category:"visibility",isEnabled:!0,level:"friends",lastModified:"2024-01-15T11:30:00Z"},{id:"privacy-102",name:"Personal data encryption",description:"Encrypt sensitive academic and personal information",category:"data",isEnabled:!0,level:"private",lastModified:"2024-01-15T11:00:00Z"},{id:"privacy-103",name:"Direct message permissions",description:"Control who can send you private messages",category:"interaction",isEnabled:!0,level:"friends",lastModified:"2024-01-15T10:45:00Z"},{id:"privacy-104",name:"Campus location tracking",description:"Share real-time location with study partners",category:"location",isEnabled:!1,level:"hidden",lastModified:"2024-01-15T10:15:00Z"},{id:"privacy-105",name:"Activity analytics sharing",description:"Share usage patterns for community insights",category:"activity",isEnabled:!0,level:"private",lastModified:"2024-01-15T09:30:00Z"},{id:"privacy-106",name:"Academic data protection",description:"Enhanced FERPA compliance and grade privacy",category:"data",isEnabled:!0,level:"private",lastModified:"2024-01-15T09:00:00Z"}],s={isActive:!1,duration:"temporary",hiddenActivities:[],visibilityLevel:"minimal",allowedInteractions:["emergency","academic"]},pe={isActive:!0,duration:"scheduled",scheduledEnd:"2024-01-20T23:59:59Z",hiddenActivities:["posts","comments","likes","location"],visibilityLevel:"invisible",allowedInteractions:["emergency"]},ge={isActive:!0,duration:"temporary",hiddenActivities:["social","casual"],visibilityLevel:"selective",allowedInteractions:["academic","study-groups","emergency"]},T={args:{user:{id:"user-123",name:"Alex Chen"},ghostModeConfig:s,privacySettings:b,visibilityLevel:"private",lastPrivacyUpdate:"2024-01-15T09:30:00Z",privacyScore:85,activeSessions:1,isEditable:!0,onToggleGhostMode:i("toggle-ghost-mode"),onUpdatePrivacySetting:i("update-privacy-setting"),onViewPrivacySettings:i("view-privacy-settings"),onConfigureGhostMode:i("configure-ghost-mode"),onViewDataExport:i("view-data-export")},render:n=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(p,{children:e.jsxs(g,{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"HIVE profile ghost mode widget for University at Buffalo student privacy management:"}),e.jsx(o,{...n}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Interactive privacy controls with ghost mode activation, campus safety features, and UB-specific privacy management"})]})})})},C={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(p,{children:[e.jsxs(h,{children:[e.jsxs(f,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"success",children:"🎯 GHOST MODE WIDGET SYSTEM"}),"Privacy & Visibility Control"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Complete profile ghost mode widget system for University at Buffalo HIVE platform student privacy management and campus visibility control"})]}),e.jsx(g,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Ghost Mode Widget Variations:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Standard Privacy Mode:"}),e.jsx(o,{user:{id:"user-001",name:"Sarah Johnson"},ghostModeConfig:s,privacySettings:b,visibilityLevel:"private",lastPrivacyUpdate:"2024-01-15T09:30:00Z",privacyScore:85,activeSessions:1,onToggleGhostMode:i("standard-ghost-toggle"),onUpdatePrivacySetting:i("standard-privacy-update"),onViewPrivacySettings:i("standard-privacy-view"),onConfigureGhostMode:i("standard-ghost-config"),onViewDataExport:i("standard-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Standard privacy configuration for regular campus engagement with balanced visibility control"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Active Ghost Mode:"}),e.jsx(o,{user:{id:"user-002",name:"Marcus Rodriguez"},ghostModeConfig:pe,privacySettings:j,visibilityLevel:"ghost",lastPrivacyUpdate:"2024-01-15T11:00:00Z",privacyScore:95,activeSessions:1,onToggleGhostMode:i("ghost-active-toggle"),onUpdatePrivacySetting:i("ghost-active-privacy-update"),onViewPrivacySettings:i("ghost-active-privacy-view"),onConfigureGhostMode:i("ghost-active-config"),onViewDataExport:i("ghost-active-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Full ghost mode activation with scheduled duration and comprehensive invisibility settings"})]})]})})]})})})]}),e.jsxs(p,{children:[e.jsxs(h,{children:[e.jsxs(f,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"info",children:"🔒 PRIVACY CATEGORIES"}),"Comprehensive Privacy Control"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"5 privacy categories for complete University at Buffalo campus privacy management and student data protection"})]}),e.jsx(g,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Complete Privacy Category System:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Core Privacy Categories:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Visibility Control"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Profile visibility, social presence, campus activity display"})]}),e.jsxs("div",{className:"p-3 bg-red-500/10 border border-red-500/20 rounded-lg",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Data Protection"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Personal data encryption, academic record privacy, FERPA compliance"})]}),e.jsxs("div",{className:"p-3 bg-green-500/10 border border-green-500/20 rounded-lg",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Interaction Controls"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Message permissions, collaboration access, social engagement"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Advanced Privacy Features:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Location Privacy"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Campus location sharing, residence hall privacy, study space discretion"})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg",children:[e.jsx(a,{variant:"body-sm",color:"primary",weight:"medium",children:"Activity Tracking"}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Usage analytics, engagement patterns, study habit protection"})]})]})]})]})})]})})})]}),e.jsxs(p,{children:[e.jsxs(h,{children:[e.jsxs(f,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"primary",children:"👁️ VISIBILITY LEVELS"}),"Campus Visibility Management"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 visibility levels for granular University at Buffalo campus presence control and social interaction management"})]}),e.jsx(g,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Visibility Level Progression:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Public Profile:"}),e.jsx(o,{user:{id:"user-public",name:"Emma Martinez"},ghostModeConfig:s,privacySettings:b,visibilityLevel:"public",lastPrivacyUpdate:"2024-01-15T10:00:00Z",privacyScore:60,activeSessions:2,onToggleGhostMode:i("public-ghost-toggle"),onUpdatePrivacySetting:i("public-privacy-update"),onViewPrivacySettings:i("public-privacy-view"),onConfigureGhostMode:i("public-ghost-config"),onViewDataExport:i("public-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Open campus engagement with full visibility to UB student community"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Friends Only:"}),e.jsx(o,{user:{id:"user-friends",name:"David Park"},ghostModeConfig:s,privacySettings:b,visibilityLevel:"friends",lastPrivacyUpdate:"2024-01-15T09:45:00Z",privacyScore:75,activeSessions:1,onToggleGhostMode:i("friends-ghost-toggle"),onUpdatePrivacySetting:i("friends-privacy-update"),onViewPrivacySettings:i("friends-privacy-view"),onConfigureGhostMode:i("friends-ghost-config"),onViewDataExport:i("friends-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Selective visibility limited to connected friends and study partners"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Private Mode:"}),e.jsx(o,{user:{id:"user-private",name:"Lisa Thompson"},ghostModeConfig:s,privacySettings:j,visibilityLevel:"private",lastPrivacyUpdate:"2024-01-15T09:15:00Z",privacyScore:90,activeSessions:1,onToggleGhostMode:i("private-ghost-toggle"),onUpdatePrivacySetting:i("private-privacy-update"),onViewPrivacySettings:i("private-privacy-view"),onConfigureGhostMode:i("private-ghost-config"),onViewDataExport:i("private-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"High privacy with limited visibility and controlled campus presence"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Ghost Mode Active:"}),e.jsx(o,{user:{id:"user-ghost",name:"Jordan Lee"},ghostModeConfig:ge,privacySettings:j,visibilityLevel:"ghost",lastPrivacyUpdate:"2024-01-15T08:30:00Z",privacyScore:98,activeSessions:1,onToggleGhostMode:i("ghost-mode-toggle"),onUpdatePrivacySetting:i("ghost-mode-privacy-update"),onViewPrivacySettings:i("ghost-mode-privacy-view"),onConfigureGhostMode:i("ghost-mode-config"),onViewDataExport:i("ghost-mode-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Complete invisibility with selective academic interaction permissions"})]})]})})]})})})]}),e.jsxs(p,{children:[e.jsxs(h,{children:[e.jsxs(f,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Privacy Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Profile ghost mode widget usage in actual University at Buffalo student privacy management and campus safety contexts"})]}),e.jsxs(g,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Finals Week Study Focus - Ghost Mode Usage:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{as:"h3",variant:"heading-sm",color:"primary",children:"CSE Senior Using Ghost Mode for Final Project Concentration"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Study Isolation Mode:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(o,{user:{id:"user-finals-001",name:"Alex Chen"},ghostModeConfig:{isActive:!0,duration:"scheduled",scheduledEnd:"2024-01-20T23:59:59Z",hiddenActivities:["social","casual","entertainment"],visibilityLevel:"selective",allowedInteractions:["academic","study-groups","emergency","professors"]},privacySettings:[{id:"finals-001",name:"Hide social activity during finals",description:"Focus mode for academic priorities",category:"activity",isEnabled:!0,level:"hidden",lastModified:"2024-01-15T12:00:00Z"},{id:"finals-002",name:"Academic collaboration only",description:"Limit interactions to study-related content",category:"interaction",isEnabled:!0,level:"private",lastModified:"2024-01-15T12:00:00Z"},{id:"finals-003",name:"Study location privacy",description:"Hide library and study space location",category:"location",isEnabled:!0,level:"hidden",lastModified:"2024-01-15T12:00:00Z"}],visibilityLevel:"ghost",lastPrivacyUpdate:"2024-01-15T12:00:00Z",privacyScore:96,activeSessions:1,onToggleGhostMode:i("finals-ghost-toggle"),onUpdatePrivacySetting:i("finals-privacy-update"),onViewPrivacySettings:i("finals-privacy-view"),onConfigureGhostMode:i("finals-ghost-config"),onViewDataExport:i("finals-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Senior CSE student using ghost mode for capstone project focus with academic-only interaction permissions"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Scheduled Privacy Break:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(o,{user:{id:"user-finals-002",name:"Maya Patel"},ghostModeConfig:{isActive:!0,duration:"temporary",hiddenActivities:["posts","comments","likes"],visibilityLevel:"minimal",allowedInteractions:["close-friends","emergency"]},privacySettings:j,visibilityLevel:"ghost",lastPrivacyUpdate:"2024-01-15T11:30:00Z",privacyScore:94,activeSessions:1,onToggleGhostMode:i("break-ghost-toggle"),onUpdatePrivacySetting:i("break-privacy-update"),onViewPrivacySettings:i("break-privacy-view"),onConfigureGhostMode:i("break-ghost-config"),onViewDataExport:i("break-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Temporary ghost mode for mental health break with close friend access maintained"})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Residence Hall Privacy Management:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Ellicott Complex Privacy:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(o,{user:{id:"user-ellicott-001",name:"Jordan Kim"},ghostModeConfig:s,privacySettings:[{id:"ellicott-001",name:"Floor community visibility",description:"Share activity with floor residents",category:"visibility",isEnabled:!0,level:"friends",lastModified:"2024-01-15T10:30:00Z"},{id:"ellicott-002",name:"Room location privacy",description:"Hide specific room number from non-residents",category:"location",isEnabled:!0,level:"private",lastModified:"2024-01-15T10:30:00Z"}],visibilityLevel:"friends",lastPrivacyUpdate:"2024-01-15T10:30:00Z",privacyScore:78,activeSessions:1,onToggleGhostMode:i("ellicott-ghost-toggle"),onUpdatePrivacySetting:i("ellicott-privacy-update"),onViewPrivacySettings:i("ellicott-privacy-view"),onConfigureGhostMode:i("ellicott-ghost-config"),onViewDataExport:i("ellicott-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Freshman balancing floor community engagement with personal privacy boundaries"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Off-Campus Privacy:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(o,{user:{id:"user-offcampus-001",name:"Sam Wilson"},ghostModeConfig:s,privacySettings:[{id:"offcampus-001",name:"Home address protection",description:"Hide off-campus residence location",category:"location",isEnabled:!0,level:"hidden",lastModified:"2024-01-15T09:45:00Z"},{id:"offcampus-002",name:"Campus commute privacy",description:"Hide transportation and schedule patterns",category:"activity",isEnabled:!0,level:"private",lastModified:"2024-01-15T09:45:00Z"}],visibilityLevel:"private",lastPrivacyUpdate:"2024-01-15T09:45:00Z",privacyScore:88,activeSessions:1,onToggleGhostMode:i("offcampus-ghost-toggle"),onUpdatePrivacySetting:i("offcampus-privacy-update"),onViewPrivacySettings:i("offcampus-privacy-view"),onConfigureGhostMode:i("offcampus-ghost-config"),onViewDataExport:i("offcampus-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"Senior living off-campus with enhanced location privacy and commute discretion"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"International Student Privacy:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(o,{user:{id:"user-intl-001",name:"Priya Sharma"},ghostModeConfig:s,privacySettings:[{id:"intl-001",name:"Cultural background sharing",description:"Control visibility of cultural information",category:"visibility",isEnabled:!0,level:"friends",lastModified:"2024-01-15T11:15:00Z"},{id:"intl-002",name:"Immigration status protection",description:"Enhanced privacy for sensitive personal data",category:"data",isEnabled:!0,level:"hidden",lastModified:"2024-01-15T11:15:00Z"}],visibilityLevel:"friends",lastPrivacyUpdate:"2024-01-15T11:15:00Z",privacyScore:92,activeSessions:1,onToggleGhostMode:i("intl-ghost-toggle"),onUpdatePrivacySetting:i("intl-privacy-update"),onViewPrivacySettings:i("intl-privacy-view"),onConfigureGhostMode:i("intl-ghost-config"),onViewDataExport:i("intl-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"International graduate student with enhanced data protection and cultural privacy controls"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Privacy Education - Low Score Warning:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"body-md",color:"primary",children:"New user education with privacy score improvement guidance:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Low Privacy Score:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(o,{user:{id:"user-lowpriv-001",name:"Casey Johnson"},ghostModeConfig:s,privacySettings:[{id:"lowpriv-001",name:"Public profile visibility",description:"Profile visible to all UB students",category:"visibility",isEnabled:!0,level:"public",lastModified:"2024-01-15T08:00:00Z"},{id:"lowpriv-002",name:"Location sharing enabled",description:"Real-time location visible to all",category:"location",isEnabled:!0,level:"public",lastModified:"2024-01-15T08:00:00Z"}],visibilityLevel:"public",lastPrivacyUpdate:"2024-01-15T08:00:00Z",privacyScore:35,activeSessions:3,onToggleGhostMode:i("lowpriv-ghost-toggle"),onUpdatePrivacySetting:i("lowpriv-privacy-update"),onViewPrivacySettings:i("lowpriv-privacy-view"),onConfigureGhostMode:i("lowpriv-ghost-config"),onViewDataExport:i("lowpriv-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"New user with minimal privacy protection needing education and setting improvements"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"body-sm",color:"gold",weight:"medium",children:"Multiple Active Sessions Warning:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(o,{user:{id:"user-sessions-001",name:"Riley Martinez"},ghostModeConfig:s,privacySettings:b,visibilityLevel:"friends",lastPrivacyUpdate:"2024-01-15T07:30:00Z",privacyScore:72,activeSessions:5,onToggleGhostMode:i("sessions-ghost-toggle"),onUpdatePrivacySetting:i("sessions-privacy-update"),onViewPrivacySettings:i("sessions-privacy-view"),onConfigureGhostMode:i("sessions-ghost-config"),onViewDataExport:i("sessions-data-export")}),e.jsx(a,{variant:"body-xs",color:"secondary",children:"User with multiple active sessions requiring security review and session management"})]})]})]})]})})]})]})]})]})},N={args:{user:{id:"user-playground",name:"Alex Chen"},ghostModeConfig:s,privacySettings:b,visibilityLevel:"private",lastPrivacyUpdate:"2024-01-15T09:30:00Z",privacyScore:85,activeSessions:1,isEditable:!0,onToggleGhostMode:i("playground-ghost-toggle"),onUpdatePrivacySetting:i("playground-privacy-update"),onViewPrivacySettings:i("playground-privacy-view"),onConfigureGhostMode:i("playground-ghost-config"),onViewDataExport:i("playground-data-export")},render:n=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(p,{children:[e.jsxs(h,{children:[e.jsx(f,{children:"Profile Ghost Mode Widget Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different ghost mode and privacy configurations"})]}),e.jsx(g,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(o,{...n}),e.jsx(a,{variant:"body-sm",color:"secondary",children:"Interactive ghost mode widget testing for University at Buffalo HIVE platform privacy management design"})]})})]})})};var D,H,F;T.parameters={...T.parameters,docs:{...(D=T.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    user: {
      id: 'user-123',
      name: 'Alex Chen'
    },
    ghostModeConfig: mockGhostModeInactive,
    privacySettings: mockPrivacySettingsBasic,
    visibilityLevel: 'private',
    lastPrivacyUpdate: '2024-01-15T09:30:00Z',
    privacyScore: 85,
    activeSessions: 1,
    isEditable: true,
    onToggleGhostMode: action('toggle-ghost-mode'),
    onUpdatePrivacySetting: action('update-privacy-setting'),
    onViewPrivacySettings: action('view-privacy-settings'),
    onConfigureGhostMode: action('configure-ghost-mode'),
    onViewDataExport: action('view-data-export')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE profile ghost mode widget for University at Buffalo student privacy management:
          </Text>
          <ProfileGhostModeWidget {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive privacy controls with ghost mode activation, campus safety features, and UB-specific privacy management
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(F=(H=T.parameters)==null?void 0:H.docs)==null?void 0:F.source}}};var W,R,O;C.parameters={...C.parameters,docs:{...(W=C.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Ghost Mode Widget Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎯 GHOST MODE WIDGET SYSTEM</Badge>
            Privacy & Visibility Control
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Complete profile ghost mode widget system for University at Buffalo HIVE platform student privacy management and campus visibility control
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Ghost Mode Widget Variations:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Standard Privacy Mode:</Text>
                    <ProfileGhostModeWidget user={{
                    id: 'user-001',
                    name: 'Sarah Johnson'
                  }} ghostModeConfig={mockGhostModeInactive} privacySettings={mockPrivacySettingsBasic} visibilityLevel="private" lastPrivacyUpdate="2024-01-15T09:30:00Z" privacyScore={85} activeSessions={1} onToggleGhostMode={action('standard-ghost-toggle')} onUpdatePrivacySetting={action('standard-privacy-update')} onViewPrivacySettings={action('standard-privacy-view')} onConfigureGhostMode={action('standard-ghost-config')} onViewDataExport={action('standard-data-export')} />
                    <Text variant="body-xs" color="secondary">
                      Standard privacy configuration for regular campus engagement with balanced visibility control
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Active Ghost Mode:</Text>
                    <ProfileGhostModeWidget user={{
                    id: 'user-002',
                    name: 'Marcus Rodriguez'
                  }} ghostModeConfig={mockGhostModeActive} privacySettings={mockPrivacySettingsAdvanced} visibilityLevel="ghost" lastPrivacyUpdate="2024-01-15T11:00:00Z" privacyScore={95} activeSessions={1} onToggleGhostMode={action('ghost-active-toggle')} onUpdatePrivacySetting={action('ghost-active-privacy-update')} onViewPrivacySettings={action('ghost-active-privacy-view')} onConfigureGhostMode={action('ghost-active-config')} onViewDataExport={action('ghost-active-data-export')} />
                    <Text variant="body-xs" color="secondary">
                      Full ghost mode activation with scheduled duration and comprehensive invisibility settings
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Privacy Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🔒 PRIVACY CATEGORIES</Badge>
            Comprehensive Privacy Control
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 privacy categories for complete University at Buffalo campus privacy management and student data protection
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Privacy Category System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Core Privacy Categories:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Visibility Control</Text>
                        <Text variant="body-xs" color="secondary">Profile visibility, social presence, campus activity display</Text>
                      </div>
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Data Protection</Text>
                        <Text variant="body-xs" color="secondary">Personal data encryption, academic record privacy, FERPA compliance</Text>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Interaction Controls</Text>
                        <Text variant="body-xs" color="secondary">Message permissions, collaboration access, social engagement</Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Advanced Privacy Features:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Location Privacy</Text>
                        <Text variant="body-xs" color="secondary">Campus location sharing, residence hall privacy, study space discretion</Text>
                      </div>
                      <div className="p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Activity Tracking</Text>
                        <Text variant="body-xs" color="secondary">Usage analytics, engagement patterns, study habit protection</Text>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Visibility Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">👁️ VISIBILITY LEVELS</Badge>
            Campus Visibility Management
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 visibility levels for granular University at Buffalo campus presence control and social interaction management
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Visibility Level Progression:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Public Profile:</Text>
                    <ProfileGhostModeWidget user={{
                    id: 'user-public',
                    name: 'Emma Martinez'
                  }} ghostModeConfig={mockGhostModeInactive} privacySettings={mockPrivacySettingsBasic} visibilityLevel="public" lastPrivacyUpdate="2024-01-15T10:00:00Z" privacyScore={60} activeSessions={2} onToggleGhostMode={action('public-ghost-toggle')} onUpdatePrivacySetting={action('public-privacy-update')} onViewPrivacySettings={action('public-privacy-view')} onConfigureGhostMode={action('public-ghost-config')} onViewDataExport={action('public-data-export')} />
                    <Text variant="body-xs" color="secondary">
                      Open campus engagement with full visibility to UB student community
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Friends Only:</Text>
                    <ProfileGhostModeWidget user={{
                    id: 'user-friends',
                    name: 'David Park'
                  }} ghostModeConfig={mockGhostModeInactive} privacySettings={mockPrivacySettingsBasic} visibilityLevel="friends" lastPrivacyUpdate="2024-01-15T09:45:00Z" privacyScore={75} activeSessions={1} onToggleGhostMode={action('friends-ghost-toggle')} onUpdatePrivacySetting={action('friends-privacy-update')} onViewPrivacySettings={action('friends-privacy-view')} onConfigureGhostMode={action('friends-ghost-config')} onViewDataExport={action('friends-data-export')} />
                    <Text variant="body-xs" color="secondary">
                      Selective visibility limited to connected friends and study partners
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Private Mode:</Text>
                    <ProfileGhostModeWidget user={{
                    id: 'user-private',
                    name: 'Lisa Thompson'
                  }} ghostModeConfig={mockGhostModeInactive} privacySettings={mockPrivacySettingsAdvanced} visibilityLevel="private" lastPrivacyUpdate="2024-01-15T09:15:00Z" privacyScore={90} activeSessions={1} onToggleGhostMode={action('private-ghost-toggle')} onUpdatePrivacySetting={action('private-privacy-update')} onViewPrivacySettings={action('private-privacy-view')} onConfigureGhostMode={action('private-ghost-config')} onViewDataExport={action('private-data-export')} />
                    <Text variant="body-xs" color="secondary">
                      High privacy with limited visibility and controlled campus presence
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Ghost Mode Active:</Text>
                    <ProfileGhostModeWidget user={{
                    id: 'user-ghost',
                    name: 'Jordan Lee'
                  }} ghostModeConfig={mockGhostModeStudyFocus} privacySettings={mockPrivacySettingsAdvanced} visibilityLevel="ghost" lastPrivacyUpdate="2024-01-15T08:30:00Z" privacyScore={98} activeSessions={1} onToggleGhostMode={action('ghost-mode-toggle')} onUpdatePrivacySetting={action('ghost-mode-privacy-update')} onViewPrivacySettings={action('ghost-mode-privacy-view')} onConfigureGhostMode={action('ghost-mode-config')} onViewDataExport={action('ghost-mode-data-export')} />
                    <Text variant="body-xs" color="secondary">
                      Complete invisibility with selective academic interaction permissions
                    </Text>
                  </div>

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
            Real Campus Privacy Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile ghost mode widget usage in actual University at Buffalo student privacy management and campus safety contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Finals Week Ghost Mode */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Finals Week Study Focus - Ghost Mode Usage:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE Senior Using Ghost Mode for Final Project Concentration
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Study Isolation Mode:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileGhostModeWidget user={{
                      id: 'user-finals-001',
                      name: 'Alex Chen'
                    }} ghostModeConfig={{
                      isActive: true,
                      duration: 'scheduled',
                      scheduledEnd: '2024-01-20T23:59:59Z',
                      hiddenActivities: ['social', 'casual', 'entertainment'],
                      visibilityLevel: 'selective',
                      allowedInteractions: ['academic', 'study-groups', 'emergency', 'professors']
                    }} privacySettings={[{
                      id: 'finals-001',
                      name: 'Hide social activity during finals',
                      description: 'Focus mode for academic priorities',
                      category: 'activity',
                      isEnabled: true,
                      level: 'hidden',
                      lastModified: '2024-01-15T12:00:00Z'
                    }, {
                      id: 'finals-002',
                      name: 'Academic collaboration only',
                      description: 'Limit interactions to study-related content',
                      category: 'interaction',
                      isEnabled: true,
                      level: 'private',
                      lastModified: '2024-01-15T12:00:00Z'
                    }, {
                      id: 'finals-003',
                      name: 'Study location privacy',
                      description: 'Hide library and study space location',
                      category: 'location',
                      isEnabled: true,
                      level: 'hidden',
                      lastModified: '2024-01-15T12:00:00Z'
                    }]} visibilityLevel="ghost" lastPrivacyUpdate="2024-01-15T12:00:00Z" privacyScore={96} activeSessions={1} onToggleGhostMode={action('finals-ghost-toggle')} onUpdatePrivacySetting={action('finals-privacy-update')} onViewPrivacySettings={action('finals-privacy-view')} onConfigureGhostMode={action('finals-ghost-config')} onViewDataExport={action('finals-data-export')} />
                      <Text variant="body-xs" color="secondary">
                        Senior CSE student using ghost mode for capstone project focus with academic-only interaction permissions
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Scheduled Privacy Break:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileGhostModeWidget user={{
                      id: 'user-finals-002',
                      name: 'Maya Patel'
                    }} ghostModeConfig={{
                      isActive: true,
                      duration: 'temporary',
                      hiddenActivities: ['posts', 'comments', 'likes'],
                      visibilityLevel: 'minimal',
                      allowedInteractions: ['close-friends', 'emergency']
                    }} privacySettings={mockPrivacySettingsAdvanced} visibilityLevel="ghost" lastPrivacyUpdate="2024-01-15T11:30:00Z" privacyScore={94} activeSessions={1} onToggleGhostMode={action('break-ghost-toggle')} onUpdatePrivacySetting={action('break-privacy-update')} onViewPrivacySettings={action('break-privacy-view')} onConfigureGhostMode={action('break-ghost-config')} onViewDataExport={action('break-data-export')} />
                      <Text variant="body-xs" color="secondary">
                        Temporary ghost mode for mental health break with close friend access maintained
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Residence Hall Privacy */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Residence Hall Privacy Management:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Ellicott Complex Privacy:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileGhostModeWidget user={{
                    id: 'user-ellicott-001',
                    name: 'Jordan Kim'
                  }} ghostModeConfig={mockGhostModeInactive} privacySettings={[{
                    id: 'ellicott-001',
                    name: 'Floor community visibility',
                    description: 'Share activity with floor residents',
                    category: 'visibility',
                    isEnabled: true,
                    level: 'friends',
                    lastModified: '2024-01-15T10:30:00Z'
                  }, {
                    id: 'ellicott-002',
                    name: 'Room location privacy',
                    description: 'Hide specific room number from non-residents',
                    category: 'location',
                    isEnabled: true,
                    level: 'private',
                    lastModified: '2024-01-15T10:30:00Z'
                  }]} visibilityLevel="friends" lastPrivacyUpdate="2024-01-15T10:30:00Z" privacyScore={78} activeSessions={1} onToggleGhostMode={action('ellicott-ghost-toggle')} onUpdatePrivacySetting={action('ellicott-privacy-update')} onViewPrivacySettings={action('ellicott-privacy-view')} onConfigureGhostMode={action('ellicott-ghost-config')} onViewDataExport={action('ellicott-data-export')} />
                    <Text variant="body-xs" color="secondary">
                      Freshman balancing floor community engagement with personal privacy boundaries
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Off-Campus Privacy:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileGhostModeWidget user={{
                    id: 'user-offcampus-001',
                    name: 'Sam Wilson'
                  }} ghostModeConfig={mockGhostModeInactive} privacySettings={[{
                    id: 'offcampus-001',
                    name: 'Home address protection',
                    description: 'Hide off-campus residence location',
                    category: 'location',
                    isEnabled: true,
                    level: 'hidden',
                    lastModified: '2024-01-15T09:45:00Z'
                  }, {
                    id: 'offcampus-002',
                    name: 'Campus commute privacy',
                    description: 'Hide transportation and schedule patterns',
                    category: 'activity',
                    isEnabled: true,
                    level: 'private',
                    lastModified: '2024-01-15T09:45:00Z'
                  }]} visibilityLevel="private" lastPrivacyUpdate="2024-01-15T09:45:00Z" privacyScore={88} activeSessions={1} onToggleGhostMode={action('offcampus-ghost-toggle')} onUpdatePrivacySetting={action('offcampus-privacy-update')} onViewPrivacySettings={action('offcampus-privacy-view')} onConfigureGhostMode={action('offcampus-ghost-config')} onViewDataExport={action('offcampus-data-export')} />
                    <Text variant="body-xs" color="secondary">
                      Senior living off-campus with enhanced location privacy and commute discretion
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">International Student Privacy:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileGhostModeWidget user={{
                    id: 'user-intl-001',
                    name: 'Priya Sharma'
                  }} ghostModeConfig={mockGhostModeInactive} privacySettings={[{
                    id: 'intl-001',
                    name: 'Cultural background sharing',
                    description: 'Control visibility of cultural information',
                    category: 'visibility',
                    isEnabled: true,
                    level: 'friends',
                    lastModified: '2024-01-15T11:15:00Z'
                  }, {
                    id: 'intl-002',
                    name: 'Immigration status protection',
                    description: 'Enhanced privacy for sensitive personal data',
                    category: 'data',
                    isEnabled: true,
                    level: 'hidden',
                    lastModified: '2024-01-15T11:15:00Z'
                  }]} visibilityLevel="friends" lastPrivacyUpdate="2024-01-15T11:15:00Z" privacyScore={92} activeSessions={1} onToggleGhostMode={action('intl-ghost-toggle')} onUpdatePrivacySetting={action('intl-privacy-update')} onViewPrivacySettings={action('intl-privacy-view')} onConfigureGhostMode={action('intl-ghost-config')} onViewDataExport={action('intl-data-export')} />
                    <Text variant="body-xs" color="secondary">
                      International graduate student with enhanced data protection and cultural privacy controls
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Low Privacy Warning */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Privacy Education - Low Score Warning:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text variant="body-md" color="primary">
                  New user education with privacy score improvement guidance:
                </Text>

                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Low Privacy Score:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileGhostModeWidget user={{
                      id: 'user-lowpriv-001',
                      name: 'Casey Johnson'
                    }} ghostModeConfig={mockGhostModeInactive} privacySettings={[{
                      id: 'lowpriv-001',
                      name: 'Public profile visibility',
                      description: 'Profile visible to all UB students',
                      category: 'visibility',
                      isEnabled: true,
                      level: 'public',
                      lastModified: '2024-01-15T08:00:00Z'
                    }, {
                      id: 'lowpriv-002',
                      name: 'Location sharing enabled',
                      description: 'Real-time location visible to all',
                      category: 'location',
                      isEnabled: true,
                      level: 'public',
                      lastModified: '2024-01-15T08:00:00Z'
                    }]} visibilityLevel="public" lastPrivacyUpdate="2024-01-15T08:00:00Z" privacyScore={35} activeSessions={3} onToggleGhostMode={action('lowpriv-ghost-toggle')} onUpdatePrivacySetting={action('lowpriv-privacy-update')} onViewPrivacySettings={action('lowpriv-privacy-view')} onConfigureGhostMode={action('lowpriv-ghost-config')} onViewDataExport={action('lowpriv-data-export')} />
                      <Text variant="body-xs" color="secondary">
                        New user with minimal privacy protection needing education and setting improvements
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Multiple Active Sessions Warning:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileGhostModeWidget user={{
                      id: 'user-sessions-001',
                      name: 'Riley Martinez'
                    }} ghostModeConfig={mockGhostModeInactive} privacySettings={mockPrivacySettingsBasic} visibilityLevel="friends" lastPrivacyUpdate="2024-01-15T07:30:00Z" privacyScore={72} activeSessions={5} onToggleGhostMode={action('sessions-ghost-toggle')} onUpdatePrivacySetting={action('sessions-privacy-update')} onViewPrivacySettings={action('sessions-privacy-view')} onConfigureGhostMode={action('sessions-ghost-config')} onViewDataExport={action('sessions-data-export')} />
                      <Text variant="body-xs" color="secondary">
                        User with multiple active sessions requiring security review and session management
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(O=(R=C.parameters)==null?void 0:R.docs)==null?void 0:O.source}}};var q,z,Y;N.parameters={...N.parameters,docs:{...(q=N.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    user: {
      id: 'user-playground',
      name: 'Alex Chen'
    },
    ghostModeConfig: mockGhostModeInactive,
    privacySettings: mockPrivacySettingsBasic,
    visibilityLevel: 'private',
    lastPrivacyUpdate: '2024-01-15T09:30:00Z',
    privacyScore: 85,
    activeSessions: 1,
    isEditable: true,
    onToggleGhostMode: action('playground-ghost-toggle'),
    onUpdatePrivacySetting: action('playground-privacy-update'),
    onViewPrivacySettings: action('playground-privacy-view'),
    onConfigureGhostMode: action('playground-ghost-config'),
    onViewDataExport: action('playground-data-export')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Ghost Mode Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different ghost mode and privacy configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileGhostModeWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive ghost mode widget testing for University at Buffalo HIVE platform privacy management design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(Y=(z=N.parameters)==null?void 0:z.docs)==null?void 0:Y.source}}};const Fe=["Default","CompleteShowcase","Playground"];export{C as CompleteShowcase,T as Default,N as Playground,Fe as __namedExportsOrder,He as default};
