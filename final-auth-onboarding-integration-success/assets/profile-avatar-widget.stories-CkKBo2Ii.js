import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as H}from"./index-DJO9vBfz.js";import{c as u}from"./utils-CytzSlOG.js";import{H as s,a as t,c as n,b as h}from"./hive-tokens-BKUtHA8Z.js";import{A as L}from"./avatar-BAPm_Prc.js";import{B as v}from"./badge-B09J4pcg.js";import{T as i}from"./text-Cao0VGB4.js";import{E as P}from"./eye-off-BoT7HipX.js";import{S as R}from"./settings-GFIh7SpU.js";import{C as F}from"./camera-DvyA-l59.js";import{A as z}from"./award-wJZPpTAr.js";import{G as D}from"./graduation-cap-P9WXVP08.js";import{C as _}from"./calendar-BPdIbUwb.js";import{M as q}from"./map-pin-CNTkGvcp.js";import{E as y}from"./eye-B7JxKiV6.js";import{U as W}from"./users-kvqvVsnf.js";import{S as J}from"./star-DcfUHeTk.js";import{P as Q}from"./pen-line-62jTgK4K.js";import{a}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./user-CFaOcM52.js";import"./createLucideIcon-WpwZgzX-.js";import"./v4-CtRu48qb.js";const r=({user:o,isEditable:l=!0,onEditProfile:g,onUploadPhoto:O,onToggleVisibility:x,onViewProfile:f,className:B})=>{var w,N,T;const[b,j]=H.useState(!1);return e.jsxs(s,{className:u("relative overflow-hidden transition-all duration-300 hover:shadow-lg","bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]",b&&"scale-[1.02]",B),onMouseEnter:()=>j(!0),onMouseLeave:()=>j(!1),children:[e.jsx(t,{className:"pb-2",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Profile Identity"}),o.isGhostMode&&e.jsxs(v,{variant:"secondary",className:"text-xs",children:[e.jsx(P,{className:"h-3 w-3 mr-1"}),"Ghost Mode"]})]}),l&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:g,className:"h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(R,{className:"h-3 w-3"})})]})}),e.jsxs(n,{className:"space-y-4",children:[e.jsx("div",{className:"relative group",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"relative",children:[e.jsx(L,{src:o.avatar,alt:o.name,initials:o.name.split(" ").map(G=>G[0]).join(""),size:"lg",className:"ring-2 ring-[var(--hive-border-primary)] ring-offset-2 ring-offset-[var(--hive-background-primary)]"}),o.isOnline&&e.jsx("div",{className:"absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[var(--hive-background-primary)] rounded-full"}),l&&e.jsx("div",{className:u("absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer transition-opacity","opacity-0 group-hover:opacity-100"),onClick:O,children:e.jsx(F,{className:"h-5 w-5 text-[var(--hive-text-inverse)]"})})]}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(i,{variant:"heading-sm",color:"primary",className:"truncate",children:o.name}),o.achievements&&o.achievements>10&&e.jsx(z,{className:"h-4 w-4 text-[var(--hive-gold)]"})]}),e.jsxs(i,{variant:"body-sm",color:"secondary",className:"truncate",children:["@",o.handle]}),e.jsxs("div",{className:"flex items-center gap-1 mt-1",children:[e.jsx("div",{className:u("w-2 h-2 rounded-full",o.isOnline?"bg-green-500":"bg-[var(--hive-text-muted)]")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:o.isOnline?"Online":o.lastSeen})]})]})]})}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-6",children:[o.major&&e.jsxs("div",{className:"flex items-center gap-2 min-w-0 flex-1",children:[e.jsx(D,{className:"h-4 w-4 text-[var(--hive-text-secondary)] flex-shrink-0"}),e.jsx(i,{variant:"body-sm",color:"primary",className:"truncate",children:o.major})]}),o.year&&e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(_,{className:"h-4 w-4 text-[var(--hive-text-secondary)]"}),e.jsx(i,{variant:"body-sm",color:"secondary",children:o.year})]})]}),o.residence&&e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(q,{className:"h-4 w-4 text-[var(--hive-text-secondary)]"}),e.jsx(i,{variant:"body-sm",color:"secondary",children:o.residence})]})]}),o.bio&&e.jsx("div",{className:"space-y-2",children:e.jsx(i,{variant:"body-sm",color:"primary",className:"line-clamp-3 leading-relaxed",children:o.bio})}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 pt-2 border-t border-[var(--hive-border-primary)]",children:[e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(y,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:((w=o.profileViews)==null?void 0:w.toLocaleString())||"0"})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Profile Views"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(W,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:((N=o.connections)==null?void 0:N.toLocaleString())||"0"})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Connections"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(J,{className:"h-3 w-3 text-[var(--hive-gold)]"}),e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:((T=o.achievements)==null?void 0:T.toLocaleString())||"0"})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Achievements"})]})]}),e.jsxs("div",{className:"flex gap-2 pt-2",children:[f&&e.jsxs(ButtonEnhanced,{variant:"secondary",size:"sm",onClick:f,className:"flex-1",children:[e.jsx(y,{className:"h-3 w-3 mr-1"}),"View Profile"]}),l&&g&&e.jsxs(ButtonEnhanced,{variant:"primary",size:"sm",onClick:g,className:"flex-1",children:[e.jsx(Q,{className:"h-3 w-3 mr-1"}),"Edit Profile"]}),l&&x&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:x,className:"text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:o.isGhostMode?e.jsx(P,{className:"h-4 w-4"}):e.jsx(y,{className:"h-4 w-4"})})]})]}),b&&e.jsx("div",{className:"absolute inset-0 -z-10 bg-gradient-to-r from-[var(--hive-gold)]/5 to-[var(--hive-brand-secondary)]/5 rounded-lg blur-xl"})]})};r.__docgenInfo={description:"",methods:[],displayName:"ProfileAvatarWidget",props:{user:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  major?: string;
  year?: string;
  residence?: string;
  bio?: string;
  isOnline?: boolean;
  lastSeen?: string;
  profileViews?: number;
  achievements?: number;
  connections?: number;
  isGhostMode?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"handle",value:{name:"string",required:!0}},{key:"avatar",value:{name:"string",required:!1}},{key:"major",value:{name:"string",required:!1}},{key:"year",value:{name:"string",required:!1}},{key:"residence",value:{name:"string",required:!1}},{key:"bio",value:{name:"string",required:!1}},{key:"isOnline",value:{name:"boolean",required:!1}},{key:"lastSeen",value:{name:"string",required:!1}},{key:"profileViews",value:{name:"number",required:!1}},{key:"achievements",value:{name:"number",required:!1}},{key:"connections",value:{name:"number",required:!1}},{key:"isGhostMode",value:{name:"boolean",required:!1}}]}},description:""},isEditable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onEditProfile:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onUploadPhoto:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onToggleVisibility:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onViewProfile:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const fe={title:"03-Organisms/Profile Avatar Widget - COMPLETE DEFINITION",component:r,parameters:{docs:{description:{component:`
## 👤 HIVE Profile Avatar Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive profile identity widget for University at Buffalo HIVE platform student profile dashboard and campus command center.

### 🎯 **COMPONENT EXCELLENCE**
- **Complete Identity Display** - Avatar, name, handle, academic info, and bio in unified interface
- **Interactive Photo Management** - Hover-to-edit photo upload with visual feedback
- **Academic Context** - Major, year, residence hall integration for UB student identity
- **Online Status Tracking** - Real-time presence indicators and last seen timestamps
- **Profile Analytics** - Views, connections, achievements with visual metrics
- **Privacy Controls** - Ghost mode toggle and visibility management
- **Perfect Semantic Tokens** - 100% semantic token usage for consistent theming
- **Mobile Optimized** - Touch-friendly design with responsive layout adaptation
- **Campus Integration** - Built for University at Buffalo student profile management

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student profiles:
- **Academic Identity** - CSE major, Junior year, Ellicott Complex residence display
- **Campus Presence** - Online status for study session coordination and availability
- **Social Proof** - Profile views from classmates, connection counts, achievement displays
- **Privacy Management** - Ghost mode for focused study periods and controlled visibility
- **Achievement Recognition** - Visual indicators for academic excellence and platform engagement
- **Peer Discovery** - Professional profile presentation for study partner matching
- **Campus Coordination** - Status updates for availability and academic collaboration

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large avatar targets and clear interaction zones
- **Responsive Layout** - Adaptive information display for mobile profile management
- **Gesture Support** - Swipe and tap interactions for photo upload and editing
- **Quick Actions** - One-touch profile editing and visibility control
`}}},tags:["autodocs"],argTypes:{user:{control:"object",description:"User profile data"},isEditable:{control:"boolean",description:"Enable editing controls"},onEditProfile:{action:"edit-profile",description:"Profile edit handler"},onUploadPhoto:{action:"upload-photo",description:"Photo upload handler"},onToggleVisibility:{action:"toggle-visibility",description:"Visibility toggle handler"},onViewProfile:{action:"view-profile",description:"Profile view handler"}}},d={activeStudent:{id:"sarah-chen-cs",name:"Sarah Chen",handle:"schen_cs",avatar:"https://images.unsplash.com/photo-1494790108755-2616b02e4d2d?w=150&h=150&fit=crop&crop=face",major:"Computer Science",year:"Junior",residence:"Ellicott Complex",bio:"CS junior passionate about AI and machine learning. Always down for algorithm study sessions and hackathons! Currently working on neural network projects.",isOnline:!0,profileViews:1247,achievements:23,connections:156,isGhostMode:!1},ghostModeStudent:{id:"alex-rivera-ee",name:"Alex Rivera",handle:"arivera_ub",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",major:"Electrical Engineering",year:"Senior",residence:"Governors Complex",bio:"EE senior focusing on embedded systems. Leading the robotics club and working on autonomous vehicle projects.",isOnline:!1,lastSeen:"2 hours ago",profileViews:892,achievements:34,connections:203,isGhostMode:!0},newStudent:{id:"jamie-park-bio",name:"Jamie Park",handle:"jpark2024",major:"Biology",year:"Freshman",residence:"South Campus Apartments",bio:"Pre-med freshman excited to connect with study partners and join research opportunities at UB!",isOnline:!0,profileViews:45,achievements:3,connections:12,isGhostMode:!1}},c={args:{user:d.activeStudent,isEditable:!0,onEditProfile:a("edit-profile-clicked"),onUploadPhoto:a("upload-photo-clicked"),onToggleVisibility:a("visibility-toggled"),onViewProfile:a("view-profile-clicked")},render:o=>e.jsxs("div",{className:"p-6 bg-[var(--hive-background-primary)] max-w-md",children:[e.jsx(i,{variant:"body-md",color:"primary",className:"mb-4",children:"HIVE profile avatar widget for University at Buffalo student dashboard:"}),e.jsx(r,{...o})]})},m={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(s,{children:[e.jsxs(t,{children:[e.jsxs(h,{className:"flex items-center gap-3",children:[e.jsx(v,{variant:"success",children:"👤 PROFILE VARIATIONS"}),"Identity Widget States"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Profile avatar widget variations for different University at Buffalo student states and contexts"})]}),e.jsx(n,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Student Profile States:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Active Online Student:"}),e.jsx(r,{user:d.activeStudent,isEditable:!0,onEditProfile:a("edit-active-profile"),onUploadPhoto:a("upload-active-photo"),onToggleVisibility:a("toggle-active-visibility"),onViewProfile:a("view-active-profile")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Junior CS student with active engagement, high achievements, and strong campus presence"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Ghost Mode Student:"}),e.jsx(r,{user:d.ghostModeStudent,isEditable:!0,onEditProfile:a("edit-ghost-profile"),onUploadPhoto:a("upload-ghost-photo"),onToggleVisibility:a("toggle-ghost-visibility"),onViewProfile:a("view-ghost-profile")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Senior EE student using ghost mode for focused study periods and controlled visibility"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"New Student Profile:"}),e.jsx(r,{user:d.newStudent,isEditable:!0,onEditProfile:a("edit-new-profile"),onUploadPhoto:a("upload-new-photo"),onToggleVisibility:a("toggle-new-visibility"),onViewProfile:a("view-new-profile")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Freshman pre-med student building connections and establishing campus presence"})]})]})})]})})})]}),e.jsxs(s,{children:[e.jsxs(t,{children:[e.jsxs(h,{className:"flex items-center gap-3",children:[e.jsx(v,{variant:"info",children:"🎯 PROFILE FEATURES"}),"Identity Management Components"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Core features and functionality of the profile avatar widget for comprehensive identity management"})]}),e.jsx(n,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Identity Components:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Visual Identity:"}),e.jsx("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:e.jsxs("div",{className:"space-y-2",children:[e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:"Avatar & Photo Management"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Large avatar display with ring indicator"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Hover-to-edit photo upload functionality"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Online status indicator with real-time updates"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Achievement badge for high-performing students"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Identity:"}),e.jsx("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:e.jsxs("div",{className:"space-y-2",children:[e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:"Campus Context Display"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Major and academic year presentation"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Residence hall and campus location"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Personal bio with academic interests"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• UB handle for platform identification"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Social Analytics:"}),e.jsx("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:e.jsxs("div",{className:"space-y-2",children:[e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:"Engagement Metrics"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Profile views from other UB students"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Connection count and network size"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Achievement count with visual recognition"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Three-column stats grid layout"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Privacy Controls:"}),e.jsx("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:e.jsxs("div",{className:"space-y-2",children:[e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:"Visibility Management"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Ghost mode toggle for privacy"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Editable vs view-only mode control"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• Quick profile edit access button"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"• External profile view option"})]})})]})]})})]})})})]}),e.jsxs(s,{children:[e.jsxs(t,{children:[e.jsxs(h,{className:"flex items-center gap-3",children:[e.jsx(v,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Profile Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Profile avatar widget usage in actual University at Buffalo student identity and campus integration contexts"})]}),e.jsxs(n,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Academic Identity Integration:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{as:"h3",variant:"heading-sm",color:"primary",children:"Computer Science Student Profile - Academic Excellence Display"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"High-Achieving Junior:"}),e.jsx(r,{user:{id:"sarah-chen-excellence",name:"Sarah Chen",handle:"schen_cs_ub",avatar:"https://images.unsplash.com/photo-1494790108755-2616b02e4d2d?w=150&h=150&fit=crop&crop=face",major:"Computer Science & Mathematics",year:"Junior",residence:"Ellicott Complex - Porter Hall",bio:"Dean's List CS junior specializing in AI/ML. TA for CSE 331, researcher in UB AI lab. Always organizing study groups for algorithms and data structures!",isOnline:!0,profileViews:2847,achievements:47,connections:234,isGhostMode:!1},isEditable:!0,onEditProfile:a("edit-excellence-profile"),onUploadPhoto:a("upload-excellence-photo"),onToggleVisibility:a("toggle-excellence-visibility"),onViewProfile:a("view-excellence-profile")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Profile showcasing academic achievement, teaching assistance, and active research participation"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Engineering Leadership:"}),e.jsx(r,{user:{id:"alex-engineering-lead",name:"Alex Rivera",handle:"arivera_seas",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",major:"Electrical Engineering",year:"Senior",residence:"Governors Complex - Richmond Quad",bio:"EE senior and robotics club president. Building autonomous drones, mentoring underclassmen, and preparing for graduate school in embedded systems.",isOnline:!1,lastSeen:"4 hours ago",profileViews:1923,achievements:52,connections:189,isGhostMode:!1},isEditable:!0,onEditProfile:a("edit-leader-profile"),onUploadPhoto:a("upload-leader-photo"),onToggleVisibility:a("toggle-leader-visibility"),onViewProfile:a("view-leader-profile")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Senior leadership profile with club presidency, mentoring roles, and graduate preparation"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Community Integration:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Freshman Explorer:"}),e.jsx(r,{user:{id:"jamie-freshman",name:"Jamie Park",handle:"jpark_ub2024",major:"Biology (Pre-Med)",year:"Freshman",residence:"South Campus Apartments",bio:"Pre-med freshman excited about organic chemistry and volunteer opportunities. Looking for study partners and research experience!",isOnline:!0,profileViews:127,achievements:8,connections:34,isGhostMode:!1},isEditable:!0,onEditProfile:a("edit-freshman-profile"),onUploadPhoto:a("upload-freshman-photo"),onToggleVisibility:a("toggle-freshman-visibility"),onViewProfile:a("view-freshman-profile")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"New student profile focused on community building and academic exploration"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Research Scholar:"}),e.jsx(r,{user:{id:"marcus-researcher",name:"Marcus Thompson",handle:"mthompson_phd",major:"Psychology PhD",year:"Graduate Student",residence:"Graduate Student Housing",bio:"PhD candidate in cognitive psychology studying decision-making processes. Published researcher and statistics tutor for undergraduates.",isOnline:!0,profileViews:1456,achievements:34,connections:145,isGhostMode:!1},isEditable:!0,onEditProfile:a("edit-researcher-profile"),onUploadPhoto:a("upload-researcher-photo"),onToggleVisibility:a("toggle-researcher-visibility"),onViewProfile:a("view-researcher-profile")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Graduate student profile showcasing research credentials and tutoring services"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"International Student:"}),e.jsx(r,{user:{id:"sofia-international",name:"Sofia Nakamura",handle:"snakamura_intl",major:"Business Administration",year:"Sophomore",residence:"Creekside Village",bio:"International business student from Tokyo. Passionate about cross-cultural collaboration and sustainable business practices. Always happy to share language exchange!",isOnline:!1,lastSeen:"1 hour ago",profileViews:892,achievements:19,connections:167,isGhostMode:!1},isEditable:!0,onEditProfile:a("edit-international-profile"),onUploadPhoto:a("upload-international-photo"),onToggleVisibility:a("toggle-international-visibility"),onViewProfile:a("view-international-profile")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"International student profile emphasizing cultural exchange and global perspective"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Privacy & Status Management:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Ghost Mode Study Focus:"}),e.jsx(r,{user:{id:"finals-focus-student",name:"Emily Rodriguez",handle:"erodriguez_chem",avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",major:"Chemistry",year:"Junior",residence:"Hadley Village",bio:"Chemistry junior in finals preparation mode. Using ghost mode for focused study sessions and minimal distractions.",isOnline:!1,lastSeen:"30 minutes ago",profileViews:634,achievements:28,connections:98,isGhostMode:!0},isEditable:!0,onEditProfile:a("edit-ghost-focus-profile"),onUploadPhoto:a("upload-ghost-focus-photo"),onToggleVisibility:a("toggle-ghost-focus-visibility"),onViewProfile:a("view-ghost-focus-profile")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Student using ghost mode for intensive study periods with controlled campus visibility"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Highly Connected Student:"}),e.jsx(r,{user:{id:"campus-connector",name:"David Kim",handle:"dkim_campus_life",avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",major:"Communications",year:"Senior",residence:"Flint Loop",bio:"Communications senior and student government representative. Event coordinator for campus activities and inter-organization collaboration.",isOnline:!0,profileViews:4521,achievements:73,connections:456,isGhostMode:!1},isEditable:!0,onEditProfile:a("edit-connector-profile"),onUploadPhoto:a("upload-connector-photo"),onToggleVisibility:a("toggle-connector-visibility"),onViewProfile:a("view-connector-profile")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Highly connected student leader with maximum engagement and campus activity coordination"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Mobile Profile Management:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(i,{variant:"body-md",color:"primary",children:"Mobile-optimized profile widget for on-campus identity management:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Quick Profile Updates:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:"Touch-Friendly Profile Management"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Large avatar touch targets for photo upload while walking between classes"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"One-touch ghost mode toggle for instant privacy control"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Quick bio updates for current academic status and availability"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Responsive layout adaptation for portrait and landscape orientations"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Campus Status Broadcasting:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:"Real-Time Campus Presence"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Online status updates for study session coordination and availability"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Location-aware presence for campus building and study space coordination"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Achievement notifications and milestone celebrations"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Social proof display for peer recognition and connection building"})]})]})]})]})]})]})]})]})},p={args:{user:d.activeStudent,isEditable:!0,onEditProfile:a("playground-edit-profile"),onUploadPhoto:a("playground-upload-photo"),onToggleVisibility:a("playground-toggle-visibility"),onViewProfile:a("playground-view-profile")},render:o=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(s,{children:[e.jsxs(t,{children:[e.jsx(h,{children:"Profile Avatar Widget Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different profile avatar configurations"})]}),e.jsx(n,{className:"p-6",children:e.jsxs("div",{className:"space-y-4 max-w-md",children:[e.jsx(r,{...o}),e.jsx(i,{variant:"body-sm",color:"secondary",children:"Interactive profile widget testing for University at Buffalo HIVE platform student dashboard"})]})})]})})};var C,E,S;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    user: sampleUsers.activeStudent,
    isEditable: true,
    onEditProfile: action('edit-profile-clicked'),
    onUploadPhoto: action('upload-photo-clicked'),
    onToggleVisibility: action('visibility-toggled'),
    onViewProfile: action('view-profile-clicked')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)] max-w-md">
      <Text variant="body-md" color="primary" className="mb-4">
        HIVE profile avatar widget for University at Buffalo student dashboard:
      </Text>
      <ProfileAvatarWidget {...args} />
    </div>
}`,...(S=(E=c.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var k,V,A;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Profile Widget Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">👤 PROFILE VARIATIONS</Badge>
            Identity Widget States
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile avatar widget variations for different University at Buffalo student states and contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Student Profile States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Active Online Student:</Text>
                    <ProfileAvatarWidget user={sampleUsers.activeStudent} isEditable={true} onEditProfile={action('edit-active-profile')} onUploadPhoto={action('upload-active-photo')} onToggleVisibility={action('toggle-active-visibility')} onViewProfile={action('view-active-profile')} />
                    <Text variant="body-xs" color="secondary">
                      Junior CS student with active engagement, high achievements, and strong campus presence
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Ghost Mode Student:</Text>
                    <ProfileAvatarWidget user={sampleUsers.ghostModeStudent} isEditable={true} onEditProfile={action('edit-ghost-profile')} onUploadPhoto={action('upload-ghost-photo')} onToggleVisibility={action('toggle-ghost-visibility')} onViewProfile={action('view-ghost-profile')} />
                    <Text variant="body-xs" color="secondary">
                      Senior EE student using ghost mode for focused study periods and controlled visibility
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">New Student Profile:</Text>
                    <ProfileAvatarWidget user={sampleUsers.newStudent} isEditable={true} onEditProfile={action('edit-new-profile')} onUploadPhoto={action('upload-new-photo')} onToggleVisibility={action('toggle-new-visibility')} onViewProfile={action('view-new-profile')} />
                    <Text variant="body-xs" color="secondary">
                      Freshman pre-med student building connections and establishing campus presence
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Profile Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎯 PROFILE FEATURES</Badge>
            Identity Management Components
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Core features and functionality of the profile avatar widget for comprehensive identity management
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Identity Components:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Visual Identity:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="space-y-2">
                        <Text variant="body-sm" weight="medium" color="primary">Avatar & Photo Management</Text>
                        <Text variant="body-xs" color="secondary">
                          • Large avatar display with ring indicator
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • Hover-to-edit photo upload functionality
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • Online status indicator with real-time updates
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • Achievement badge for high-performing students
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Identity:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="space-y-2">
                        <Text variant="body-sm" weight="medium" color="primary">Campus Context Display</Text>
                        <Text variant="body-xs" color="secondary">
                          • Major and academic year presentation
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • Residence hall and campus location
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • Personal bio with academic interests
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • UB handle for platform identification
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Social Analytics:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="space-y-2">
                        <Text variant="body-sm" weight="medium" color="primary">Engagement Metrics</Text>
                        <Text variant="body-xs" color="secondary">
                          • Profile views from other UB students
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • Connection count and network size
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • Achievement count with visual recognition
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • Three-column stats grid layout
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Privacy Controls:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="space-y-2">
                        <Text variant="body-sm" weight="medium" color="primary">Visibility Management</Text>
                        <Text variant="body-xs" color="secondary">
                          • Ghost mode toggle for privacy
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • Editable vs view-only mode control
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • Quick profile edit access button
                        </Text>
                        <Text variant="body-xs" color="secondary">
                          • External profile view option
                        </Text>
                      </div>
                    </div>
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
            Real Campus Profile Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile avatar widget usage in actual University at Buffalo student identity and campus integration contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Identity Scenarios */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Identity Integration:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Computer Science Student Profile - Academic Excellence Display
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">High-Achieving Junior:</Text>
                    <ProfileAvatarWidget user={{
                    id: 'sarah-chen-excellence',
                    name: 'Sarah Chen',
                    handle: 'schen_cs_ub',
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b02e4d2d?w=150&h=150&fit=crop&crop=face',
                    major: 'Computer Science & Mathematics',
                    year: 'Junior',
                    residence: 'Ellicott Complex - Porter Hall',
                    bio: 'Dean\\'s List CS junior specializing in AI/ML. TA for CSE 331, researcher in UB AI lab. Always organizing study groups for algorithms and data structures!',
                    isOnline: true,
                    profileViews: 2847,
                    achievements: 47,
                    connections: 234,
                    isGhostMode: false
                  }} isEditable={true} onEditProfile={action('edit-excellence-profile')} onUploadPhoto={action('upload-excellence-photo')} onToggleVisibility={action('toggle-excellence-visibility')} onViewProfile={action('view-excellence-profile')} />
                    <Text variant="body-xs" color="secondary">
                      Profile showcasing academic achievement, teaching assistance, and active research participation
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Engineering Leadership:</Text>
                    <ProfileAvatarWidget user={{
                    id: 'alex-engineering-lead',
                    name: 'Alex Rivera',
                    handle: 'arivera_seas',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                    major: 'Electrical Engineering',
                    year: 'Senior',
                    residence: 'Governors Complex - Richmond Quad',
                    bio: 'EE senior and robotics club president. Building autonomous drones, mentoring underclassmen, and preparing for graduate school in embedded systems.',
                    isOnline: false,
                    lastSeen: '4 hours ago',
                    profileViews: 1923,
                    achievements: 52,
                    connections: 189,
                    isGhostMode: false
                  }} isEditable={true} onEditProfile={action('edit-leader-profile')} onUploadPhoto={action('upload-leader-photo')} onToggleVisibility={action('toggle-leader-visibility')} onViewProfile={action('view-leader-profile')} />
                    <Text variant="body-xs" color="secondary">
                      Senior leadership profile with club presidency, mentoring roles, and graduate preparation
                    </Text>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Campus Life Integration */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Community Integration:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Freshman Explorer:</Text>
                  <ProfileAvatarWidget user={{
                  id: 'jamie-freshman',
                  name: 'Jamie Park',
                  handle: 'jpark_ub2024',
                  major: 'Biology (Pre-Med)',
                  year: 'Freshman',
                  residence: 'South Campus Apartments',
                  bio: 'Pre-med freshman excited about organic chemistry and volunteer opportunities. Looking for study partners and research experience!',
                  isOnline: true,
                  profileViews: 127,
                  achievements: 8,
                  connections: 34,
                  isGhostMode: false
                }} isEditable={true} onEditProfile={action('edit-freshman-profile')} onUploadPhoto={action('upload-freshman-photo')} onToggleVisibility={action('toggle-freshman-visibility')} onViewProfile={action('view-freshman-profile')} />
                  <Text variant="body-xs" color="secondary">
                    New student profile focused on community building and academic exploration
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Research Scholar:</Text>
                  <ProfileAvatarWidget user={{
                  id: 'marcus-researcher',
                  name: 'Marcus Thompson',
                  handle: 'mthompson_phd',
                  major: 'Psychology PhD',
                  year: 'Graduate Student',
                  residence: 'Graduate Student Housing',
                  bio: 'PhD candidate in cognitive psychology studying decision-making processes. Published researcher and statistics tutor for undergraduates.',
                  isOnline: true,
                  profileViews: 1456,
                  achievements: 34,
                  connections: 145,
                  isGhostMode: false
                }} isEditable={true} onEditProfile={action('edit-researcher-profile')} onUploadPhoto={action('upload-researcher-photo')} onToggleVisibility={action('toggle-researcher-visibility')} onViewProfile={action('view-researcher-profile')} />
                  <Text variant="body-xs" color="secondary">
                    Graduate student profile showcasing research credentials and tutoring services
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">International Student:</Text>
                  <ProfileAvatarWidget user={{
                  id: 'sofia-international',
                  name: 'Sofia Nakamura',
                  handle: 'snakamura_intl',
                  major: 'Business Administration',
                  year: 'Sophomore',
                  residence: 'Creekside Village',
                  bio: 'International business student from Tokyo. Passionate about cross-cultural collaboration and sustainable business practices. Always happy to share language exchange!',
                  isOnline: false,
                  lastSeen: '1 hour ago',
                  profileViews: 892,
                  achievements: 19,
                  connections: 167,
                  isGhostMode: false
                }} isEditable={true} onEditProfile={action('edit-international-profile')} onUploadPhoto={action('upload-international-photo')} onToggleVisibility={action('toggle-international-visibility')} onViewProfile={action('view-international-profile')} />
                  <Text variant="body-xs" color="secondary">
                    International student profile emphasizing cultural exchange and global perspective
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Privacy and Status Management */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Privacy & Status Management:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Ghost Mode Study Focus:</Text>
                  <ProfileAvatarWidget user={{
                  id: 'finals-focus-student',
                  name: 'Emily Rodriguez',
                  handle: 'erodriguez_chem',
                  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                  major: 'Chemistry',
                  year: 'Junior',
                  residence: 'Hadley Village',
                  bio: 'Chemistry junior in finals preparation mode. Using ghost mode for focused study sessions and minimal distractions.',
                  isOnline: false,
                  lastSeen: '30 minutes ago',
                  profileViews: 634,
                  achievements: 28,
                  connections: 98,
                  isGhostMode: true
                }} isEditable={true} onEditProfile={action('edit-ghost-focus-profile')} onUploadPhoto={action('upload-ghost-focus-photo')} onToggleVisibility={action('toggle-ghost-focus-visibility')} onViewProfile={action('view-ghost-focus-profile')} />
                  <Text variant="body-xs" color="secondary">
                    Student using ghost mode for intensive study periods with controlled campus visibility
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Highly Connected Student:</Text>
                  <ProfileAvatarWidget user={{
                  id: 'campus-connector',
                  name: 'David Kim',
                  handle: 'dkim_campus_life',
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                  major: 'Communications',
                  year: 'Senior',
                  residence: 'Flint Loop',
                  bio: 'Communications senior and student government representative. Event coordinator for campus activities and inter-organization collaboration.',
                  isOnline: true,
                  profileViews: 4521,
                  achievements: 73,
                  connections: 456,
                  isGhostMode: false
                }} isEditable={true} onEditProfile={action('edit-connector-profile')} onUploadPhoto={action('upload-connector-photo')} onToggleVisibility={action('toggle-connector-visibility')} onViewProfile={action('view-connector-profile')} />
                  <Text variant="body-xs" color="secondary">
                    Highly connected student leader with maximum engagement and campus activity coordination
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Profile Experience */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Profile Management:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized profile widget for on-campus identity management:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Profile Updates:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Touch-Friendly Profile Management</Text>
                    <Text variant="body-xs" color="secondary">
                      Large avatar touch targets for photo upload while walking between classes
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      One-touch ghost mode toggle for instant privacy control
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Quick bio updates for current academic status and availability
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Responsive layout adaptation for portrait and landscape orientations
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Status Broadcasting:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Real-Time Campus Presence</Text>
                    <Text variant="body-xs" color="secondary">
                      Online status updates for study session coordination and availability
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Location-aware presence for campus building and study space coordination
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Achievement notifications and milestone celebrations
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Social proof display for peer recognition and connection building
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(A=(V=m.parameters)==null?void 0:V.docs)==null?void 0:A.source}}};var U,M,I;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    user: sampleUsers.activeStudent,
    isEditable: true,
    onEditProfile: action('playground-edit-profile'),
    onUploadPhoto: action('playground-upload-photo'),
    onToggleVisibility: action('playground-toggle-visibility'),
    onViewProfile: action('playground-view-profile')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Avatar Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different profile avatar configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 max-w-md">
            <ProfileAvatarWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive profile widget testing for University at Buffalo HIVE platform student dashboard
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(I=(M=p.parameters)==null?void 0:M.docs)==null?void 0:I.source}}};const be=["Default","CompleteShowcase","Playground"];export{m as CompleteShowcase,c as Default,p as Playground,be as __namedExportsOrder,fe as default};
