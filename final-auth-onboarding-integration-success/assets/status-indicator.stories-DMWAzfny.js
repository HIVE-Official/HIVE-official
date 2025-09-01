import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{R as K}from"./index-DJO9vBfz.js";import{c as L}from"./utils-CytzSlOG.js";import{H as o,a as m,b as x,c as v}from"./hive-tokens-BKUtHA8Z.js";import{B as p}from"./badge-B09J4pcg.js";import{A as c}from"./avatar-BAPm_Prc.js";import{B as d}from"./button-enhanced-BN702znq.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./user-CFaOcM52.js";import"./createLucideIcon-WpwZgzX-.js";const W={online:{bg:"bg-[var(--hive-status-success)]",border:"border-[var(--hive-status-success)]",text:"text-[var(--hive-status-success)]",glow:"[--hive-glow:var(--hive-status-success)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]"},offline:{bg:"bg-[var(--hive-text-disabled)]",border:"border-[var(--hive-text-disabled)]",text:"text-[var(--hive-text-disabled)]",glow:"[--hive-glow:var(--hive-text-disabled)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]"},away:{bg:"bg-[var(--hive-status-warning)]",border:"border-[var(--hive-status-warning)]",text:"text-[var(--hive-status-warning)]",glow:"[--hive-glow:var(--hive-status-warning)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]"},busy:{bg:"bg-[var(--hive-status-error)]",border:"border-[var(--hive-status-error)]",text:"text-[var(--hive-status-error)]",glow:"[--hive-glow:var(--hive-status-error)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]"},error:{bg:"bg-[var(--hive-status-error)]",border:"border-[var(--hive-status-error)]",text:"text-[var(--hive-status-error)]",glow:"[--hive-glow:var(--hive-status-error)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]"},success:{bg:"bg-[var(--hive-status-success)]",border:"border-[var(--hive-status-success)]",text:"text-[var(--hive-status-success)]",glow:"[--hive-glow:var(--hive-status-success)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]"},warning:{bg:"bg-[var(--hive-status-warning)]",border:"border-[var(--hive-status-warning)]",text:"text-[var(--hive-status-warning)]",glow:"[--hive-glow:var(--hive-status-warning)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]"},pending:{bg:"bg-[var(--hive-text-tertiary)]",border:"border-[var(--hive-text-tertiary)]",text:"text-[var(--hive-text-tertiary)]",glow:"[--hive-glow:var(--hive-text-tertiary)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]"}},Z={xs:"w-1.5 h-1.5",sm:"w-2 h-2",md:"w-2.5 h-2.5",lg:"w-3 h-3",xl:"w-4 h-4"},X={top:"top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",bottom:"bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",left:"left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",right:"right-0 top-1/2 translate-x-1/2 -translate-y-1/2","top-left":"top-0 left-0 -translate-x-1/2 -translate-y-1/2","top-right":"top-0 right-0 translate-x-1/2 -translate-y-1/2","bottom-left":"bottom-0 left-0 -translate-x-1/2 translate-y-1/2","bottom-right":"bottom-0 right-0 translate-x-1/2 translate-y-1/2"},s=K.forwardRef(({status:a,size:b="md",variant:l="dot",label:f,position:u,showLabel:n=!1,animate:y=!0,className:j,...N},w)=>{const i=W[a],T=!!u,_=["flex items-center",T?"absolute":"relative",u&&X[u]].filter(Boolean).join(" "),R=["rounded-full flex-shrink-0",Z[b],l==="dot"&&i.bg,l==="pulse"&&[i.bg,y&&"animate-pulse"].filter(Boolean).join(" "),l==="glow"&&[i.bg,i.glow,y&&"animate-pulse"].filter(Boolean).join(" "),l==="ring"&&["border-2",i.border,"bg-[var(--hive-background-primary)]"].filter(Boolean).join(" ")].filter(Boolean).join(" "),E=f||a.charAt(0).toUpperCase()+a.slice(1);return n||!T&&f?e.jsxs("div",{ref:w,className:L(_,"gap-2",j),...N,children:[e.jsx("div",{className:R}),e.jsx("span",{className:L("text-sm font-medium capitalize",i.text),children:E})]}):e.jsx("div",{ref:w,className:L(_,j),title:E,...N,children:e.jsx("div",{className:R})})});s.displayName="StatusIndicator";const P=a=>e.jsx(s,{status:"online",...a}),Y=a=>e.jsx(s,{status:"offline",...a}),A=a=>e.jsx(s,{status:"busy",...a}),B=a=>e.jsx(s,{status:"away",...a}),k=a=>e.jsx(s,{status:"error",...a}),t=a=>e.jsx(s,{status:"success",...a}),h=a=>e.jsx(s,{status:"warning",...a}),g=a=>e.jsx(s,{variant:"pulse",...a}),z=a=>e.jsx(s,{variant:"glow",...a}),r=({status:a,size:b="sm",variant:l="dot",position:f="top-right",children:u,count:n,max:y=99,className:j,...N})=>{const w=u||n!==void 0,i=n!==void 0?n>y?`${y}+`:n.toString():"";return w?e.jsxs("div",{className:"relative inline-flex",children:[u,e.jsx("div",{className:L("absolute flex items-center justify-center",X[f],n!==void 0&&["min-w-4.5 h-4.5 px-1","text-xs font-bold text-[var(--hive-text-inverse)]","rounded-full",W[a].bg].filter(Boolean).join(" ")),children:n!==void 0?i:e.jsx(s,{status:a,size:b,variant:l,animate:N.animate})})]}):e.jsx(s,{status:a,size:b,variant:l,className:j,...N})};s.__docgenInfo={description:"",methods:[],displayName:"StatusIndicator",props:{status:{required:!0,tsType:{name:"union",raw:"'online' | 'offline' | 'away' | 'busy' | 'error' | 'success' | 'warning' | 'pending'",elements:[{name:"literal",value:"'online'"},{name:"literal",value:"'offline'"},{name:"literal",value:"'away'"},{name:"literal",value:"'busy'"},{name:"literal",value:"'error'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'pending'"}]},description:""},size:{required:!1,tsType:{name:"union",raw:"'xs' | 'sm' | 'md' | 'lg' | 'xl'",elements:[{name:"literal",value:"'xs'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'dot' | 'pulse' | 'glow' | 'ring'",elements:[{name:"literal",value:"'dot'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'glow'"},{name:"literal",value:"'ring'"}]},description:"",defaultValue:{value:"'dot'",computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},position:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'top-left'"},{name:"literal",value:"'top-right'"},{name:"literal",value:"'bottom-left'"},{name:"literal",value:"'bottom-right'"}]},description:""},showLabel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},animate:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};P.__docgenInfo={description:"",methods:[],displayName:"OnlineIndicator"};Y.__docgenInfo={description:"",methods:[],displayName:"OfflineIndicator"};A.__docgenInfo={description:"",methods:[],displayName:"BusyIndicator"};B.__docgenInfo={description:"",methods:[],displayName:"AwayIndicator"};k.__docgenInfo={description:"",methods:[],displayName:"ErrorIndicator"};t.__docgenInfo={description:"",methods:[],displayName:"SuccessIndicator"};h.__docgenInfo={description:"",methods:[],displayName:"WarningIndicator"};g.__docgenInfo={description:"",methods:[],displayName:"PulseIndicator"};z.__docgenInfo={description:"",methods:[],displayName:"GlowIndicator"};r.__docgenInfo={description:"",methods:[],displayName:"StatusBadge",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},count:{required:!1,tsType:{name:"number"},description:""},max:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"99",computed:!1}},size:{defaultValue:{value:"'sm'",computed:!1},required:!1},variant:{defaultValue:{value:"'dot'",computed:!1},required:!1},position:{defaultValue:{value:"'top-right'",computed:!1},required:!1}},composes:["Omit"]};const ce={title:"01-Atoms/Status Indicator - COMPLETE DEFINITION",component:s,parameters:{docs:{description:{component:`
## 🎯 HIVE Status Indicator - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated status indication system for University at Buffalo campus real-time status display and user presence.

### 🏆 **COMPONENT EXCELLENCE**
- **8 Status Types** - Online, offline, away, busy, error, success, warning, pending
- **4 Visual Variants** - Dot, pulse, glow, ring with smooth animations
- **5 Size Options** - XS to XL with perfect scaling and visibility
- **8 Position Options** - Complete positioning system for badge overlays
- **Advanced Features** - Labels, animations, status badges with count display
- **Perfect Semantic Tokens** - 100% semantic token usage with sophisticated color-mix effects
- **Smart Accessibility** - ARIA compliant, tooltips, screen reader support
- **Campus Status Ready** - Optimized for UB student presence and system status indication

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo status indication and presence display:
- **Student Presence** - Online status for study groups, virtual office hours, collaboration
- **System Status** - Course registration systems, campus services, network connectivity
- **Academic Progress** - Assignment completion, grade processing, enrollment status
- **Campus Services** - Dining hall capacity, library availability, lab equipment status
- **Event Status** - Registration status, attendance confirmation, waitlist position

### 📱 **MOBILE OPTIMIZATION**
- **Touch Visibility** - Clear status indication on mobile devices
- **Animation Performance** - Smooth animations without battery drain
- **Responsive Sizing** - Appropriate scaling for mobile interfaces
`}}},tags:["autodocs"],argTypes:{status:{control:"select",options:["online","offline","away","busy","error","success","warning","pending"],description:"Status type to display"},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Indicator size"},variant:{control:"select",options:["dot","pulse","glow","ring"],description:"Visual style variant"},position:{control:"select",options:["top","bottom","left","right","top-left","top-right","bottom-left","bottom-right"],description:"Position for badge overlay"},showLabel:{control:"boolean",description:"Show status label text"},animate:{control:"boolean",description:"Enable animations"}}},S={args:{status:"online",size:"md",variant:"dot",showLabel:!0,animate:!0}},C={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(o,{children:[e.jsxs(m,{children:[e.jsxs(x,{className:"flex items-center gap-3",children:[e.jsx(p,{variant:"success",children:"✅ STATUS TYPES"}),"Status Types - Perfect Semantic Token Usage"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"8 status types using 100% semantic tokens with sophisticated color-mix glow effects"})]}),e.jsx(v,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Presence Status:"}),e.jsxs("div",{className:"space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"online",showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Available for collaboration"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"away",showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Temporarily unavailable"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"busy",showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Do not disturb"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"offline",showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Not currently active"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"System Status:"}),e.jsxs("div",{className:"space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"success",showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Operation completed successfully"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"warning",showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Attention required"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"error",showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Error or failure state"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"pending",showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Processing or waiting"})]})]})]})]})})]}),e.jsxs(o,{children:[e.jsxs(m,{children:[e.jsxs(x,{className:"flex items-center gap-3",children:[e.jsx(p,{variant:"info",children:"🎨 VARIANTS"}),"Visual Variants - Animation & Style Options"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 visual variants with sophisticated animations and effects for different campus contexts"})]}),e.jsx(v,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Static Variants:"}),e.jsxs("div",{className:"space-y-4 bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"online",variant:"dot",size:"lg"}),e.jsx("span",{className:"text-sm font-medium",children:"Dot - Clean solid indicator"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"online",variant:"ring",size:"lg"}),e.jsx("span",{className:"text-sm font-medium",children:"Ring - Outlined style with background"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Animated Variants:"}),e.jsxs("div",{className:"space-y-4 bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"online",variant:"pulse",size:"lg",animate:!0}),e.jsx("span",{className:"text-sm font-medium",children:"Pulse - Breathing animation effect"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"online",variant:"glow",size:"lg",animate:!0}),e.jsx("span",{className:"text-sm font-medium",children:"Glow - Radiant glow with pulse"})]})]})]})]})})]}),e.jsxs(o,{children:[e.jsxs(m,{children:[e.jsxs(x,{className:"flex items-center gap-3",children:[e.jsx(p,{variant:"primary",children:"📏 SIZES"}),"Status Indicator Sizes - Perfect Scaling"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"5 sizes optimized for different campus interface contexts and visibility needs"})]}),e.jsx(v,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Size Comparison:"}),e.jsxs("div",{className:"flex items-center gap-8 bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:[e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(s,{status:"online",size:"xs"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"XS: 6px"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(s,{status:"online",size:"sm"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"SM: 8px"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(s,{status:"online",size:"md"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"MD: 10px"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(s,{status:"online",size:"lg"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"LG: 12px"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(s,{status:"online",size:"xl"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"XL: 16px"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Usage Context:"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg text-center space-y-3",children:[e.jsx(s,{status:"online",size:"xs",showLabel:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Compact lists, inline text"})]}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg text-center space-y-3",children:[e.jsx(s,{status:"online",size:"md",showLabel:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Standard interface elements"})]}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg text-center space-y-3",children:[e.jsx(s,{status:"online",size:"xl",showLabel:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Prominent status display"})]})]})]})]})})]}),e.jsxs(o,{children:[e.jsxs(m,{children:[e.jsxs(x,{className:"flex items-center gap-3",children:[e.jsx(p,{variant:"secondary",children:"📍 POSITIONING"}),"Position Options & Status Badges"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"8 position options for badge overlays and notification counts on campus profile elements"})]}),e.jsx(v,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Student Profile Status:"}),e.jsxs("div",{className:"grid md:grid-cols-4 gap-6",children:[e.jsxs("div",{className:"text-center space-y-3",children:[e.jsxs("div",{className:"relative inline-block",children:[e.jsx(c,{size:"lg"}),e.jsx(s,{status:"online",size:"md",position:"bottom-right"})]}),e.jsx("p",{className:"text-sm font-medium",children:"Alex Martinez"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-secondary)]",children:"Computer Science"})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsxs("div",{className:"relative inline-block",children:[e.jsx(c,{size:"lg"}),e.jsx(s,{status:"away",size:"md",position:"bottom-right"})]}),e.jsx("p",{className:"text-sm font-medium",children:"Maria Rodriguez"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-secondary)]",children:"Mathematics"})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsxs("div",{className:"relative inline-block",children:[e.jsx(c,{size:"lg"}),e.jsx(s,{status:"busy",size:"md",position:"bottom-right"})]}),e.jsx("p",{className:"text-sm font-medium",children:"David Kim"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-secondary)]",children:"Engineering"})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsxs("div",{className:"relative inline-block",children:[e.jsx(c,{size:"lg"}),e.jsx(s,{status:"offline",size:"md",position:"bottom-right"})]}),e.jsx("p",{className:"text-sm font-medium",children:"Sarah Chen"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-secondary)]",children:"Business"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Notification Badges:"}),e.jsxs("div",{className:"grid md:grid-cols-4 gap-6",children:[e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(r,{status:"error",count:3,children:e.jsx(d,{variant:"secondary",size:"lg",children:"Messages"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Unread messages"})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(r,{status:"warning",count:12,children:e.jsx(d,{variant:"secondary",size:"lg",children:"Assignments"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Due assignments"})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(r,{status:"success",count:150,max:99,children:e.jsx(d,{variant:"secondary",size:"lg",children:"Achievements"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Earned points"})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(r,{status:"pending",children:e.jsx(d,{variant:"secondary",size:"lg",children:"Sync Status"})}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Processing update"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"All Position Options:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-8 rounded-lg",children:e.jsxs("div",{className:"grid grid-cols-3 gap-4 max-w-xs mx-auto",children:[e.jsxs("div",{className:"relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{status:"online",position:"top-left",size:"sm"}),e.jsx("span",{className:"absolute inset-0 flex items-center justify-center text-xs",children:"TL"})]}),e.jsxs("div",{className:"relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{status:"warning",position:"top",size:"sm"}),e.jsx("span",{className:"absolute inset-0 flex items-center justify-center text-xs",children:"T"})]}),e.jsxs("div",{className:"relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{status:"error",position:"top-right",size:"sm"}),e.jsx("span",{className:"absolute inset-0 flex items-center justify-center text-xs",children:"TR"})]}),e.jsxs("div",{className:"relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{status:"away",position:"left",size:"sm"}),e.jsx("span",{className:"absolute inset-0 flex items-center justify-center text-xs",children:"L"})]}),e.jsx("div",{className:"relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg flex items-center justify-center text-xs",children:"Center"}),e.jsxs("div",{className:"relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{status:"success",position:"right",size:"sm"}),e.jsx("span",{className:"absolute inset-0 flex items-center justify-center text-xs",children:"R"})]}),e.jsxs("div",{className:"relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{status:"pending",position:"bottom-left",size:"sm"}),e.jsx("span",{className:"absolute inset-0 flex items-center justify-center text-xs",children:"BL"})]}),e.jsxs("div",{className:"relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{status:"busy",position:"bottom",size:"sm"}),e.jsx("span",{className:"absolute inset-0 flex items-center justify-center text-xs",children:"B"})]}),e.jsxs("div",{className:"relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(s,{status:"offline",position:"bottom-right",size:"sm"}),e.jsx("span",{className:"absolute inset-0 flex items-center justify-center text-xs",children:"BR"})]})]})})]})]})})]}),e.jsxs(o,{children:[e.jsxs(m,{children:[e.jsxs(x,{className:"flex items-center gap-3",children:[e.jsx(p,{variant:"warning",children:"🎯 PRESETS"}),"Status Indicator Presets - Common Campus Patterns"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Pre-built indicator components for common campus status and presence scenarios"})]}),e.jsx(v,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Presence Indicators:"}),e.jsxs("div",{className:"space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(P,{showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Available for study groups"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(B,{showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"In class or meeting"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(A,{showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Focused study time"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(Y,{showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Not available"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"System Status:"}),e.jsxs("div",{className:"space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(t,{showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Registration completed"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(h,{showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Action required"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(k,{showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Registration failed"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{status:"pending",showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Processing request"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Animated Variants:"}),e.jsxs("div",{className:"space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(g,{status:"online",showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Active collaboration"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(z,{status:"success",showLabel:!0}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Featured achievement"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Custom Labels:"}),e.jsxs("div",{className:"space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:[e.jsx(s,{status:"online",label:"Study Group Active",showLabel:!0}),e.jsx(s,{status:"away",label:"In Office Hours",showLabel:!0}),e.jsx(s,{status:"busy",label:"Taking Exam",showLabel:!0}),e.jsx(s,{status:"success",label:"Assignment Submitted",showLabel:!0})]})]})]})})]}),e.jsxs(o,{children:[e.jsxs(m,{children:[e.jsxs(x,{className:"flex items-center gap-3",children:[e.jsx(p,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Status Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Status indicators in actual University at Buffalo academic and campus contexts"})]}),e.jsxs(v,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Study Group Collaboration:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h5",{className:"font-medium text-[var(--hive-text-primary)]",children:"CSE 331 Study Group - Algorithm Analysis"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-sm font-medium text-[var(--hive-text-secondary)]",children:"Group Members:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsxs("div",{className:"relative",children:[e.jsx(c,{size:"sm"}),e.jsx(P,{size:"sm",position:"bottom-right"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium",children:"Alex Martinez (Leader)"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Available now"})]}),e.jsx(z,{status:"online"})]}),e.jsxs("div",{className:"flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsxs("div",{className:"relative",children:[e.jsx(c,{size:"sm"}),e.jsx(B,{size:"sm",position:"bottom-right"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium",children:"Maria Rodriguez"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"In CSE 250 lecture"})]}),e.jsx(s,{status:"away",label:"In Class",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsxs("div",{className:"relative",children:[e.jsx(c,{size:"sm"}),e.jsx(A,{size:"sm",position:"bottom-right"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium",children:"David Kim"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Taking midterm exam"})]}),e.jsx(g,{status:"busy",label:"Do Not Disturb",showLabel:!0})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-sm font-medium text-[var(--hive-text-secondary)]",children:"Session Progress:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx("span",{className:"text-sm",children:"Dynamic Programming Review"}),e.jsx(t,{label:"Completed",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx("span",{className:"text-sm",children:"Graph Algorithms Practice"}),e.jsx(g,{status:"warning",label:"In Progress",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx("span",{className:"text-sm",children:"NP-Completeness Discussion"}),e.jsx(s,{status:"pending",label:"Pending",showLabel:!0})]})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Systems Status:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h5",{className:"font-medium text-[var(--hive-text-primary)]",children:"Academic Systems"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"UBLearns"}),e.jsx(t,{showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"HUB Student Center"}),e.jsx(t,{showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Course Registration"}),e.jsx(h,{label:"High Load",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Grade Portal"}),e.jsx(s,{status:"pending",label:"Maintenance",showLabel:!0})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h5",{className:"font-medium text-[var(--hive-text-primary)]",children:"Campus Services"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Dining Services"}),e.jsx(t,{showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Library Systems"}),e.jsx(t,{showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Campus WiFi"}),e.jsx(z,{status:"success",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Parking System"}),e.jsx(k,{label:"Outage",showLabel:!0})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h5",{className:"font-medium text-[var(--hive-text-primary)]",children:"HIVE Platform"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Profile Sync"}),e.jsx(t,{showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Real-time Updates"}),e.jsx(g,{status:"online",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Data Backup"}),e.jsx(s,{status:"pending",label:"Running",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Mobile App"}),e.jsx(t,{showLabel:!0})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Academic Progress Tracking:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h5",{className:"font-medium text-[var(--hive-text-primary)]",children:"Fall 2024 Courses"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium",children:"CSE 331 - Algorithm Analysis"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Final project due Dec 15"})]}),e.jsx(h,{label:"Due Soon",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium",children:"MTH 241 - Calculus III"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"All assignments submitted"})]}),e.jsx(t,{label:"Complete",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium",children:"PHI 237 - Ethics"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Essay grading in progress"})]}),e.jsx(g,{status:"pending",label:"Grading",showLabel:!0})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h5",{className:"font-medium text-[var(--hive-text-primary)]",children:"Degree Requirements"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx("span",{className:"text-sm",children:"Core CS Courses"}),e.jsx(t,{label:"27/30 Complete",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx("span",{className:"text-sm",children:"Math Requirements"}),e.jsx(t,{label:"Complete",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx("span",{className:"text-sm",children:"General Education"}),e.jsx(h,{label:"18/24 Credits",showLabel:!0})]}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx("span",{className:"text-sm",children:"Capstone Project"}),e.jsx(s,{status:"pending",label:"Spring 2025",showLabel:!0})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Notifications:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h5",{className:"font-medium text-[var(--hive-text-primary)]",children:"Notification Center"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx(r,{status:"error",count:3,children:e.jsx(d,{variant:"ghost",size:"sm",children:"Urgent"})}),e.jsx(r,{status:"warning",count:8,children:e.jsx(d,{variant:"ghost",size:"sm",children:"Important"})}),e.jsx(r,{status:"success",count:12,children:e.jsx(d,{variant:"ghost",size:"sm",children:"Updates"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(k,{size:"sm"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium",children:"Payment Overdue"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Spring 2025 tuition payment is past due"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-quaternary)]",children:"2 hours ago"})]})]}),e.jsxs("div",{className:"flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(h,{size:"sm"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium",children:"Registration Reminder"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Course registration for Summer 2025 opens tomorrow"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-quaternary)]",children:"1 day ago"})]})]}),e.jsxs("div",{className:"flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(t,{size:"sm"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium",children:"Grade Posted"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-tertiary)]",children:"Your CSE 331 midterm grade is now available"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-quaternary)]",children:"3 days ago"})]})]})]})]})]})]})]})]})},I={args:{status:"online",size:"md",variant:"dot",showLabel:!0,animate:!0,label:"Campus Activity Status"},render:a=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(o,{children:[e.jsxs(m,{children:[e.jsx(x,{children:"Status Indicator Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different status indicator configurations"})]}),e.jsx(v,{className:"flex justify-center",children:e.jsx("div",{className:"w-full max-w-md text-center",children:e.jsx(s,{...a})})})]})})};var O,D,U;S.parameters={...S.parameters,docs:{...(O=S.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    status: 'online',
    size: 'md',
    variant: 'dot',
    showLabel: true,
    animate: true
  }
}`,...(U=(D=S.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};var H,M,V;C.parameters={...C.parameters,docs:{...(H=C.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Status Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">✅ STATUS TYPES</Badge>
            Status Types - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            8 status types using 100% semantic tokens with sophisticated color-mix glow effects
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Presence Status:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <StatusIndicator status="online" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Available for collaboration</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="away" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Temporarily unavailable</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="busy" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Do not disturb</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="offline" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Not currently active</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">System Status:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <StatusIndicator status="success" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Operation completed successfully</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="warning" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Attention required</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="error" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Error or failure state</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="pending" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Processing or waiting</span>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Visual Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VARIANTS</Badge>
            Visual Variants - Animation & Style Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 visual variants with sophisticated animations and effects for different campus contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Static Variants:</h4>
              <div className="space-y-4 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <StatusIndicator status="online" variant="dot" size="lg" />
                  <span className="text-sm font-medium">Dot - Clean solid indicator</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="online" variant="ring" size="lg" />
                  <span className="text-sm font-medium">Ring - Outlined style with background</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Animated Variants:</h4>
              <div className="space-y-4 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <StatusIndicator status="online" variant="pulse" size="lg" animate />
                  <span className="text-sm font-medium">Pulse - Breathing animation effect</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="online" variant="glow" size="lg" animate />
                  <span className="text-sm font-medium">Glow - Radiant glow with pulse</span>
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
            <Badge variant="primary">📏 SIZES</Badge>
            Status Indicator Sizes - Perfect Scaling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 sizes optimized for different campus interface contexts and visibility needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Comparison:</h4>
              <div className="flex items-center gap-8 bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="text-center space-y-2">
                  <StatusIndicator status="online" size="xs" />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">XS: 6px</p>
                </div>
                <div className="text-center space-y-2">
                  <StatusIndicator status="online" size="sm" />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">SM: 8px</p>
                </div>
                <div className="text-center space-y-2">
                  <StatusIndicator status="online" size="md" />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">MD: 10px</p>
                </div>
                <div className="text-center space-y-2">
                  <StatusIndicator status="online" size="lg" />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">LG: 12px</p>
                </div>
                <div className="text-center space-y-2">
                  <StatusIndicator status="online" size="xl" />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">XL: 16px</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Usage Context:</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg text-center space-y-3">
                  <StatusIndicator status="online" size="xs" showLabel />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Compact lists, inline text</p>
                </div>
                <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg text-center space-y-3">
                  <StatusIndicator status="online" size="md" showLabel />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Standard interface elements</p>
                </div>
                <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg text-center space-y-3">
                  <StatusIndicator status="online" size="xl" showLabel />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Prominent status display</p>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Position & Badge Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">📍 POSITIONING</Badge>
            Position Options & Status Badges
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            8 position options for badge overlays and notification counts on campus profile elements
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Avatar Status Examples */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Student Profile Status:</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <Avatar size="lg" />
                    <StatusIndicator status="online" size="md" position="bottom-right" />
                  </div>
                  <p className="text-sm font-medium">Alex Martinez</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Computer Science</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <Avatar size="lg" />
                    <StatusIndicator status="away" size="md" position="bottom-right" />
                  </div>
                  <p className="text-sm font-medium">Maria Rodriguez</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Mathematics</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <Avatar size="lg" />
                    <StatusIndicator status="busy" size="md" position="bottom-right" />
                  </div>
                  <p className="text-sm font-medium">David Kim</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Engineering</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <Avatar size="lg" />
                    <StatusIndicator status="offline" size="md" position="bottom-right" />
                  </div>
                  <p className="text-sm font-medium">Sarah Chen</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Business</p>
                </div>
              </div>
            </div>

            {/* Notification Badges */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Notification Badges:</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <StatusBadge status="error" count={3}>
                    <Button variant="secondary" size="lg">
                      Messages
                    </Button>
                  </StatusBadge>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Unread messages</p>
                </div>
                <div className="text-center space-y-3">
                  <StatusBadge status="warning" count={12}>
                    <Button variant="secondary" size="lg">
                      Assignments
                    </Button>
                  </StatusBadge>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Due assignments</p>
                </div>
                <div className="text-center space-y-3">
                  <StatusBadge status="success" count={150} max={99}>
                    <Button variant="secondary" size="lg">
                      Achievements
                    </Button>
                  </StatusBadge>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Earned points</p>
                </div>
                <div className="text-center space-y-3">
                  <StatusBadge status="pending">
                    <Button variant="secondary" size="lg">
                      Sync Status
                    </Button>
                  </StatusBadge>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Processing update</p>
                </div>
              </div>
            </div>

            {/* Position Grid */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">All Position Options:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-8 rounded-lg">
                <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                  
                  {/* Top Row */}
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="online" position="top-left" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">TL</span>
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="warning" position="top" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">T</span>
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="error" position="top-right" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">TR</span>
                  </div>
                  
                  {/* Middle Row */}
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="away" position="left" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">L</span>
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg flex items-center justify-center text-xs">
                    Center
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="success" position="right" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">R</span>
                  </div>
                  
                  {/* Bottom Row */}
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="pending" position="bottom-left" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">BL</span>
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="busy" position="bottom" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">B</span>
                  </div>
                  <div className="relative w-16 h-16 bg-[var(--hive-background-primary)] rounded-lg">
                    <StatusIndicator status="offline" position="bottom-right" size="sm" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs">BR</span>
                  </div>
                  
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
            <Badge variant="warning">🎯 PRESETS</Badge>
            Status Indicator Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built indicator components for common campus status and presence scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Presence Indicators:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <OnlineIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Available for study groups</span>
                </div>
                <div className="flex items-center gap-4">
                  <AwayIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">In class or meeting</span>
                </div>
                <div className="flex items-center gap-4">
                  <BusyIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Focused study time</span>
                </div>
                <div className="flex items-center gap-4">
                  <OfflineIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Not available</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">System Status:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <SuccessIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Registration completed</span>
                </div>
                <div className="flex items-center gap-4">
                  <WarningIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Action required</span>
                </div>
                <div className="flex items-center gap-4">
                  <ErrorIndicator showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Registration failed</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status="pending" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Processing request</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Animated Variants:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <PulseIndicator status="online" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Active collaboration</span>
                </div>
                <div className="flex items-center gap-4">
                  <GlowIndicator status="success" showLabel />
                  <span className="text-sm text-[var(--hive-text-secondary)]">Featured achievement</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Custom Labels:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <StatusIndicator status="online" label="Study Group Active" showLabel />
                <StatusIndicator status="away" label="In Office Hours" showLabel />
                <StatusIndicator status="busy" label="Taking Exam" showLabel />
                <StatusIndicator status="success" label="Assignment Submitted" showLabel />
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
            Real Campus Status Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Status indicators in actual University at Buffalo academic and campus contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Collaboration */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Study Group Collaboration:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="space-y-4">
                <h5 className="font-medium text-[var(--hive-text-primary)]">CSE 331 Study Group - Algorithm Analysis</h5>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[var(--hive-text-secondary)]">Group Members:</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <div className="relative">
                          <Avatar size="sm" />
                          <OnlineIndicator size="sm" position="bottom-right" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Alex Martinez (Leader)</p>
                          <p className="text-xs text-[var(--hive-text-tertiary)]">Available now</p>
                        </div>
                        <GlowIndicator status="online" />
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <div className="relative">
                          <Avatar size="sm" />
                          <AwayIndicator size="sm" position="bottom-right" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Maria Rodriguez</p>
                          <p className="text-xs text-[var(--hive-text-tertiary)]">In CSE 250 lecture</p>
                        </div>
                        <StatusIndicator status="away" label="In Class" showLabel />
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <div className="relative">
                          <Avatar size="sm" />
                          <BusyIndicator size="sm" position="bottom-right" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">David Kim</p>
                          <p className="text-xs text-[var(--hive-text-tertiary)]">Taking midterm exam</p>
                        </div>
                        <PulseIndicator status="busy" label="Do Not Disturb" showLabel />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[var(--hive-text-secondary)]">Session Progress:</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <span className="text-sm">Dynamic Programming Review</span>
                        <SuccessIndicator label="Completed" showLabel />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <span className="text-sm">Graph Algorithms Practice</span>
                        <PulseIndicator status="warning" label="In Progress" showLabel />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <span className="text-sm">NP-Completeness Discussion</span>
                        <StatusIndicator status="pending" label="Pending" showLabel />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* System Status Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Systems Status:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Academic Systems</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">UBLearns</span>
                      <SuccessIndicator showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">HUB Student Center</span>
                      <SuccessIndicator showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Course Registration</span>
                      <WarningIndicator label="High Load" showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Grade Portal</span>
                      <StatusIndicator status="pending" label="Maintenance" showLabel />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Campus Services</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dining Services</span>
                      <SuccessIndicator showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Library Systems</span>
                      <SuccessIndicator showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Campus WiFi</span>
                      <GlowIndicator status="success" showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Parking System</span>
                      <ErrorIndicator label="Outage" showLabel />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">HIVE Platform</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Profile Sync</span>
                      <SuccessIndicator showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Real-time Updates</span>
                      <PulseIndicator status="online" showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Backup</span>
                      <StatusIndicator status="pending" label="Running" showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mobile App</span>
                      <SuccessIndicator showLabel />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Academic Progress */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Progress Tracking:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Fall 2024 Courses</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div>
                        <p className="text-sm font-medium">CSE 331 - Algorithm Analysis</p>
                        <p className="text-xs text-[var(--hive-text-tertiary)]">Final project due Dec 15</p>
                      </div>
                      <WarningIndicator label="Due Soon" showLabel />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div>
                        <p className="text-sm font-medium">MTH 241 - Calculus III</p>
                        <p className="text-xs text-[var(--hive-text-tertiary)]">All assignments submitted</p>
                      </div>
                      <SuccessIndicator label="Complete" showLabel />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div>
                        <p className="text-sm font-medium">PHI 237 - Ethics</p>
                        <p className="text-xs text-[var(--hive-text-tertiary)]">Essay grading in progress</p>
                      </div>
                      <PulseIndicator status="pending" label="Grading" showLabel />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Degree Requirements</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <span className="text-sm">Core CS Courses</span>
                      <SuccessIndicator label="27/30 Complete" showLabel />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <span className="text-sm">Math Requirements</span>
                      <SuccessIndicator label="Complete" showLabel />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <span className="text-sm">General Education</span>
                      <WarningIndicator label="18/24 Credits" showLabel />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <span className="text-sm">Capstone Project</span>
                      <StatusIndicator status="pending" label="Spring 2025" showLabel />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Notification Center */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Notifications:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Notification Center</h5>
                <div className="flex gap-4">
                  <StatusBadge status="error" count={3}>
                    <Button variant="ghost" size="sm">Urgent</Button>
                  </StatusBadge>
                  <StatusBadge status="warning" count={8}>
                    <Button variant="ghost" size="sm">Important</Button>
                  </StatusBadge>
                  <StatusBadge status="success" count={12}>
                    <Button variant="ghost" size="sm">Updates</Button>
                  </StatusBadge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <ErrorIndicator size="sm" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment Overdue</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Spring 2025 tuition payment is past due</p>
                    <p className="text-xs text-[var(--hive-text-quaternary)]">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <WarningIndicator size="sm" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Registration Reminder</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Course registration for Summer 2025 opens tomorrow</p>
                    <p className="text-xs text-[var(--hive-text-quaternary)]">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <SuccessIndicator size="sm" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Grade Posted</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Your CSE 331 midterm grade is now available</p>
                    <p className="text-xs text-[var(--hive-text-quaternary)]">3 days ago</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(V=(M=C.parameters)==null?void 0:M.docs)==null?void 0:V.source}}};var q,G,F;I.parameters={...I.parameters,docs:{...(q=I.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    status: 'online',
    size: 'md',
    variant: 'dot',
    showLabel: true,
    animate: true,
    label: 'Campus Activity Status'
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Status Indicator Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different status indicator configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md text-center">
            <StatusIndicator {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(F=(G=I.parameters)==null?void 0:G.docs)==null?void 0:F.source}}};const de=["Default","CompleteShowcase","Playground"];export{C as CompleteShowcase,S as Default,I as Playground,de as __namedExportsOrder,ce as default};
