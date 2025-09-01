import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{R as D}from"./index-DJO9vBfz.js";import{c as P}from"./index-BwobEAja.js";import{c as o}from"./utils-CytzSlOG.js";import{M as le}from"./minus-CMp0-NgR.js";import{c as J}from"./createLucideIcon-WpwZgzX-.js";import{T as ne}from"./trending-up-CllCr3lL.js";import{H as d,c as m,a as g,b as u}from"./hive-tokens-BKUtHA8Z.js";import{B as b}from"./badge-B09J4pcg.js";import{T as i}from"./text-Cao0VGB4.js";import{U as l}from"./users-kvqvVsnf.js";import{G as E}from"./graduation-cap-P9WXVP08.js";import{C as h}from"./code-B2XVm3Gn.js";import{C as j}from"./clock-Boexj8FH.js";import{S as n}from"./star-DcfUHeTk.js";import{T as x}from"./trophy-B5Tnzdfb.js";import{Z as T}from"./zap-0mfePDxG.js";import{T as c}from"./target-CMXB8H7t.js";import{C as A}from"./calendar-BPdIbUwb.js";import{U as G}from"./upload-B79xrUhd.js";import{B as y}from"./book-open-Btvde7pg.js";import{C as ce}from"./coffee-BkeCUNU7.js";import{B as I}from"./building-CbZ-EdvD.js";import{M as de}from"./map-pin-CNTkGvcp.js";import{A as me}from"./award-wJZPpTAr.js";import{S as O}from"./share-2-BBg4vcWM.js";import{D as ve}from"./download-YB6BOdB0.js";import{H as R}from"./heart-Dhw1SL1X.js";import"./framer-motion-proxy-Bzlf7Pk2.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=J("TrendingDown",[["polyline",{points:"22 17 13.5 8.5 8.5 13.5 2 7",key:"1r2t7k"}],["polyline",{points:"16 17 22 17 22 11",key:"11uiuu"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=J("Wifi",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]]),F=P("flex flex-col items-center justify-center text-center transition-all duration-200",{variants:{size:{xs:"p-2 gap-1",sm:"p-3 gap-2",md:"p-4 gap-2",lg:"p-6 gap-3"},variant:{default:"bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl",ghost:"bg-transparent",highlight:"bg-gradient-to-br from-[var(--hive-brand-gold)]/10 to-[var(--hive-brand-secondary)]/10 border border-[var(--hive-brand-gold)]/20 rounded-xl",compact:"bg-[var(--hive-background-secondary)]/50 rounded-lg border border-[var(--hive-border-primary)]/50"},interactive:{true:"cursor-pointer hover:bg-[var(--hive-background-interactive)] hover:scale-105 hover:border-[var(--hive-brand-gold)]/30",false:""},trend:{none:"",up:"hover:shadow-[var(--hive-status-success)]/10",down:"hover:shadow-[var(--hive-status-error)]/10",neutral:"hover:shadow-[var(--hive-text-muted)]/10"}},defaultVariants:{size:"md",variant:"default",interactive:!1,trend:"none"}}),ue=P("font-bold transition-colors",{variants:{size:{xs:"text-lg",sm:"text-xl",md:"text-2xl",lg:"text-3xl"},trend:{none:"text-[var(--hive-text-primary)]",up:"text-[var(--hive-status-success)]",down:"text-[var(--hive-status-error)]",neutral:"text-[var(--hive-text-primary)]"},emphasis:{normal:"",gold:"text-[var(--hive-brand-gold)]",secondary:"text-[var(--hive-brand-secondary)]"}},defaultVariants:{size:"md",trend:"none",emphasis:"normal"}}),pe=P("font-medium transition-colors",{variants:{size:{xs:"text-xs",sm:"text-sm",md:"text-sm",lg:"text-base"}},defaultVariants:{size:"md"}}),be=P("flex-shrink-0 transition-colors",{variants:{size:{xs:"h-4 w-4",sm:"h-5 w-5",md:"h-6 w-6",lg:"h-8 w-8"},color:{default:"text-[var(--hive-text-secondary)]",gold:"text-[var(--hive-brand-gold)]",secondary:"text-[var(--hive-brand-secondary)]",success:"text-[var(--hive-status-success)]",warning:"text-[var(--hive-status-warning)]",error:"text-[var(--hive-status-error)]"}},defaultVariants:{size:"md",color:"default"}});function a({value:p,label:ee,icon:V,iconColor:ae="default",change:t,changeLabel:k,showTrend:f=!1,emphasis:ie="normal",loading:se=!1,onClick:B,size:s="md",variant:H="default",interactive:re=!1,trend:z="none",className:U,...oe}){const r=D.useMemo(()=>z!=="none"?z:!f||t===void 0?"none":t>0?"up":t<0?"down":"neutral",[z,f,t]),L=re||!!B,te=C=>{const v=typeof C=="string"?parseFloat(C):C;return isNaN(v)?C:v>=1e6?`${(v/1e6).toFixed(1)}M`:v>=1e3?`${(v/1e3).toFixed(1)}k`:v.toString()},M=D.useMemo(()=>{switch(r){case"up":return ne;case"down":return he;case"neutral":return le;default:return null}},[r]);return se?e.jsx("div",{className:o(F({size:s,variant:H,interactive:!1}),U),children:e.jsxs("div",{className:"space-y-2 w-full",children:[e.jsx("div",{className:o("bg-[var(--hive-background-secondary)] animate-pulse rounded",{"h-6":s==="xs","h-7":s==="sm","h-8":s==="md","h-10":s==="lg"})}),e.jsx("div",{className:o("bg-[var(--hive-background-secondary)] animate-pulse rounded",{"h-3":s==="xs","h-4":s==="sm","h-5":s==="md","h-6":s==="lg"})})]})}):e.jsxs("div",{className:o(F({size:s,variant:H,interactive:L,trend:r}),U),onClick:B,role:L?"button":void 0,tabIndex:L?0:void 0,...oe,children:[V&&e.jsx(V,{className:o(be({size:s,color:ae}))}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("span",{className:o(ue({size:s,trend:r,emphasis:ie})),children:te(p)}),f&&M&&t!==void 0&&e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(M,{className:o("h-4 w-4",{"text-[var(--hive-status-success)]":r==="up","text-[var(--hive-status-error)]":r==="down","text-[var(--hive-text-muted)]":r==="neutral"})}),k&&e.jsx("span",{className:o("text-xs font-medium",{"text-[var(--hive-status-success)]":r==="up","text-[var(--hive-status-error)]":r==="down","text-[var(--hive-text-muted)]":r==="neutral"}),children:k})]})]}),e.jsx("span",{className:o(pe({size:s}),"text-[var(--hive-text-secondary)]"),children:ee}),f&&t!==void 0&&!k&&e.jsx("span",{className:o("text-xs font-medium",{"text-[var(--hive-status-success)]":r==="up","text-[var(--hive-status-error)]":r==="down","text-[var(--hive-text-muted)]":r==="neutral"}),children:t>0?`+${t}`:t})]})}a.__docgenInfo={description:"",methods:[],displayName:"ProfileStatistic",props:{value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},label:{required:!0,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"LucideIcon"},description:""},iconColor:{required:!1,tsType:{name:"union",raw:"'default' | 'gold' | 'secondary' | 'success' | 'warning' | 'error'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'gold'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"}]},description:"",defaultValue:{value:'"default"',computed:!1}},change:{required:!1,tsType:{name:"number"},description:""},changeLabel:{required:!1,tsType:{name:"string"},description:""},showTrend:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},emphasis:{required:!1,tsType:{name:"union",raw:"'normal' | 'gold' | 'secondary'",elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'gold'"},{name:"literal",value:"'secondary'"}]},description:"",defaultValue:{value:'"normal"',computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},size:{defaultValue:{value:'"md"',computed:!1},required:!1},variant:{defaultValue:{value:'"default"',computed:!1},required:!1},interactive:{defaultValue:{value:"false",computed:!1},required:!1},trend:{defaultValue:{value:'"none"',computed:!1},required:!1}},composes:["VariantProps"]};const Qe={title:"01-Atoms/Profile Statistic - COMPLETE DEFINITION",component:a,parameters:{docs:{description:{component:`
## 📊 HIVE Profile Statistic - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive statistic display system for University at Buffalo student metrics, achievements, and activity tracking.

### 🎯 **COMPONENT EXCELLENCE**
- **Flexible Value Display** - Support for text, numbers, formatted values (1.2k, 5.6M) for comprehensive data representation
- **4 Visual Variants** - Default, ghost, highlight, compact for different interface contexts
- **4 Size Options** - XS, SM, MD, LG for scalable interface integration
- **Trend Tracking** - Up, down, neutral indicators with color-coded visual feedback
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and states
- **Interactive States** - Click handling, hover effects, and accessibility compliance
- **Icon Integration** - Custom icons with 6 color variants for visual categorization
- **Loading States** - Built-in skeleton loading with size-appropriate animations
- **Campus Analytics** - Built for University at Buffalo student activity and achievement tracking

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo student analytics and achievement tracking:
- **Academic Performance** - GPA tracking, credit hours, semester progress, course completion
- **Social Engagement** - Connection counts, space memberships, event participation, collaboration metrics
- **Campus Activity** - Study session tracking, library visits, tool usage, platform engagement
- **Achievement Progress** - Badge counts, streak tracking, milestone completion, recognition metrics
- **Course Analytics** - Assignment submissions, participation rates, study group activity
- **Organization Metrics** - Leadership positions, event organization, community building statistics

### 📱 **MOBILE OPTIMIZATION**
- **Clear Data Display** - Easy reading of statistics on small screens
- **Touch Interactions** - Proper spacing and interaction areas for mobile
- **Visual Hierarchy** - Clear emphasis on important metrics
- **Trend Recognition** - Immediate visual understanding of progress and changes
`}}},tags:["autodocs"],argTypes:{value:{control:"text",description:"Statistic value (number or string)"},label:{control:"text",description:"Statistic label"},variant:{control:"select",options:["default","ghost","highlight","compact"],description:"Visual variant"},size:{control:"select",options:["xs","sm","md","lg"],description:"Statistic size"},emphasis:{control:"select",options:["normal","gold","secondary"],description:"Value emphasis color"},showTrend:{control:"boolean",description:"Show trend indicator"},interactive:{control:"boolean",description:"Interactive hover effects"},loading:{control:"boolean",description:"Loading state"}}},S={args:{value:42,label:"Study Sessions",size:"md",variant:"default",emphasis:"normal",showTrend:!1,interactive:!1,loading:!1},render:p=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(d,{children:e.jsxs(m,{className:"space-y-4",children:[e.jsx(i,{variant:"body-md",color:"primary",children:"Student statistic display for University at Buffalo activity tracking:"}),e.jsx(a,{...p}),e.jsx(i,{variant:"body-sm",color:"secondary",children:"Campus engagement and achievement metric display"})]})})})},N={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(d,{children:[e.jsxs(g,{children:[e.jsxs(u,{className:"flex items-center gap-3",children:[e.jsx(b,{variant:"success",children:"📊 STATISTIC TYPES"}),"Profile Statistic Display Variants"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Comprehensive statistic display system for University at Buffalo student metrics and achievement tracking"})]}),e.jsx(m,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Visual Variants:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Default (Card Style):"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[e.jsx(a,{value:156,label:"Connections",icon:l,iconColor:"gold",variant:"primary"}),e.jsx(a,{value:"3.8",label:"GPA",icon:E,iconColor:"success",variant:"primary"}),e.jsx(a,{value:23,label:"Tools Created",icon:h,iconColor:"secondary",variant:"primary"}),e.jsx(a,{value:"12.5k",label:"Study Hours",icon:j,iconColor:"gold",variant:"primary"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Highlight (Emphasized):"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[e.jsx(a,{value:1250,label:"HIVE Points",icon:n,iconColor:"gold",variant:"highlight",emphasis:"gold"}),e.jsx(a,{value:8,label:"Leadership Roles",icon:x,iconColor:"success",variant:"highlight",emphasis:"secondary"}),e.jsx(a,{value:45,label:"Day Streak",icon:T,iconColor:"warning",variant:"highlight"}),e.jsx(a,{value:95,label:"Attendance %",icon:c,iconColor:"success",variant:"highlight"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Compact (Space Efficient):"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-6 gap-3",children:[e.jsx(a,{value:42,label:"Events",variant:"compact",size:"sm"}),e.jsx(a,{value:18,label:"Spaces",variant:"compact",size:"sm"}),e.jsx(a,{value:156,label:"Posts",variant:"compact",size:"sm"}),e.jsx(a,{value:89,label:"Tools",variant:"compact",size:"sm"}),e.jsx(a,{value:"4.2k",label:"Views",variant:"compact",size:"sm"}),e.jsx(a,{value:234,label:"Likes",variant:"compact",size:"sm"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Ghost (Minimal):"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[e.jsx(a,{value:34,label:"Followers",variant:"ghost"}),e.jsx(a,{value:67,label:"Following",variant:"ghost"}),e.jsx(a,{value:12,label:"Groups",variant:"ghost"}),e.jsx(a,{value:5,label:"Projects",variant:"ghost"})]})]})]})]})})})]}),e.jsxs(d,{children:[e.jsxs(g,{children:[e.jsxs(u,{className:"flex items-center gap-3",children:[e.jsx(b,{variant:"info",children:"📈 TREND TRACKING"}),"Progress and Change Indicators"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Visual trend indicators for tracking progress, changes, and performance over time"})]}),e.jsx(m,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Trending Statistics:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Positive Trends (Up):"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[e.jsx(a,{value:"3.8",label:"GPA",icon:E,iconColor:"success",showTrend:!0,change:12,changeLabel:"+0.2 this semester"}),e.jsx(a,{value:156,label:"Connections",icon:l,iconColor:"gold",showTrend:!0,change:24,changeLabel:"+24 this month"}),e.jsx(a,{value:89,label:"Study Hours",icon:j,iconColor:"secondary",showTrend:!0,change:15,changeLabel:"+15 this week"}),e.jsx(a,{value:23,label:"Tools Created",icon:h,iconColor:"gold",showTrend:!0,change:3,changeLabel:"+3 this month"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Negative Trends (Down):"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[e.jsx(a,{value:67,label:"Missed Classes",icon:A,iconColor:"error",showTrend:!0,change:-8,changeLabel:"-8 this month"}),e.jsx(a,{value:234,label:"Procrastination",icon:j,iconColor:"warning",showTrend:!0,change:-45,changeLabel:"-45 min/day"}),e.jsx(a,{value:12,label:"Late Submissions",icon:G,iconColor:"error",showTrend:!0,change:-5,changeLabel:"-5 this semester"}),e.jsx(a,{value:3,label:"Missed Deadlines",icon:c,iconColor:"error",showTrend:!0,change:-2,changeLabel:"-2 this month"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Neutral Trends (Stable):"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[e.jsx(a,{value:45,label:"Library Visits",icon:y,iconColor:"default",showTrend:!0,change:0,changeLabel:"Consistent"}),e.jsx(a,{value:89,label:"Attendance %",icon:c,iconColor:"success",showTrend:!0,change:0,changeLabel:"Steady"}),e.jsx(a,{value:12,label:"Study Groups",icon:l,iconColor:"secondary",showTrend:!0,change:0,changeLabel:"Maintained"}),e.jsx(a,{value:156,label:"Course Load",icon:y,iconColor:"default",showTrend:!0,change:0,changeLabel:"Stable"})]})]})]})]})})})]}),e.jsxs(d,{children:[e.jsxs(g,{children:[e.jsxs(u,{className:"flex items-center gap-3",children:[e.jsx(b,{variant:"secondary",children:"📏 SIZES"}),"Statistic Size Options"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 sizes for different interface contexts and layout requirements"})]}),e.jsx(m,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Size Comparison:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Extra Small (xs):"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(a,{value:42,label:"Events",size:"xs"}),e.jsx(a,{value:"3.8",label:"GPA",size:"xs",icon:n}),e.jsx(a,{value:156,label:"Connections",size:"xs",showTrend:!0,change:12})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Compact dashboard widgets and inline metrics"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Small (sm):"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx(a,{value:42,label:"Events",size:"sm"}),e.jsx(a,{value:"3.8",label:"GPA",size:"sm",icon:n}),e.jsx(a,{value:156,label:"Connections",size:"sm",showTrend:!0,change:12})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Sidebar statistics and card components"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Medium (md - default):"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx(a,{value:42,label:"Events",size:"md"}),e.jsx(a,{value:"3.8",label:"GPA",size:"md",icon:n}),e.jsx(a,{value:156,label:"Connections",size:"md",showTrend:!0,change:12})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Standard profile statistics and main dashboard"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Large (lg):"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx(a,{value:42,label:"Events",size:"lg"}),e.jsx(a,{value:"3.8",label:"GPA",size:"lg",icon:n}),e.jsx(a,{value:156,label:"Connections",size:"lg",showTrend:!0,change:12})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Hero sections and prominent achievement displays"})]})]})]})})})]}),e.jsxs(d,{children:[e.jsxs(g,{children:[e.jsxs(u,{className:"flex items-center gap-3",children:[e.jsx(b,{variant:"primary",children:"⚡ INTERACTIVE FEATURES"}),"Statistic Interaction and Emphasis"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Interactive states, emphasis colors, loading states, and icon customization"})]}),e.jsx(m,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Interactive States:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Clickable Statistics:"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[e.jsx(a,{value:156,label:"View Connections",icon:l,interactive:!0,onClick:()=>alert("Navigate to connections")}),e.jsx(a,{value:23,label:"View Tools",icon:h,interactive:!0,onClick:()=>alert("Navigate to tools")}),e.jsx(a,{value:89,label:"View Calendar",icon:A,interactive:!0,onClick:()=>alert("Navigate to calendar")}),e.jsx(a,{value:12,label:"View Achievements",icon:x,interactive:!0,onClick:()=>alert("Navigate to achievements")})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Loading States:"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[e.jsx(a,{value:0,label:"Loading...",loading:!0,size:"xs"}),e.jsx(a,{value:0,label:"Loading...",loading:!0,size:"sm"}),e.jsx(a,{value:0,label:"Loading...",loading:!0,size:"md"}),e.jsx(a,{value:0,label:"Loading...",loading:!0,size:"lg"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Emphasis Colors:"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-4",children:[e.jsx(a,{value:1250,label:"HIVE Points",icon:n,emphasis:"gold",variant:"highlight"}),e.jsx(a,{value:8,label:"Leadership Roles",icon:x,emphasis:"secondary",variant:"highlight"}),e.jsx(a,{value:156,label:"Standard Metric",icon:c,emphasis:"normal"})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Icon Customization:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Icon Color Variants:"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-6 gap-4",children:[e.jsx(a,{value:42,label:"Default",icon:c,iconColor:"default",size:"sm"}),e.jsx(a,{value:42,label:"Gold",icon:n,iconColor:"gold",size:"sm"}),e.jsx(a,{value:42,label:"Secondary",icon:h,iconColor:"secondary",size:"sm"}),e.jsx(a,{value:42,label:"Success",icon:x,iconColor:"success",size:"sm"}),e.jsx(a,{value:42,label:"Warning",icon:T,iconColor:"warning",size:"sm"}),e.jsx(a,{value:42,label:"Error",icon:c,iconColor:"error",size:"sm"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Custom Icons:"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[e.jsx(a,{value:89,label:"Coffee Breaks",icon:ce,iconColor:"warning"}),e.jsx(a,{value:156,label:"WiFi Sessions",icon:ge,iconColor:"secondary"}),e.jsx(a,{value:23,label:"Building Visits",icon:I,iconColor:"default"}),e.jsx(a,{value:67,label:"Campus Events",icon:de,iconColor:"gold"})]})]})]})]})]})})]}),e.jsxs(d,{children:[e.jsxs(g,{children:[e.jsxs(u,{className:"flex items-center gap-3",children:[e.jsx(b,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Student Analytics Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Profile statistics in actual University at Buffalo student academic and social engagement contexts"})]}),e.jsxs(m,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Academic Performance Dashboard:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{as:"h3",variant:"heading-sm",color:"primary",children:"Sarah Chen - Computer Science Senior"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Metrics:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsx(a,{value:"3.87",label:"Cumulative GPA",icon:E,iconColor:"success",variant:"highlight",emphasis:"gold",showTrend:!0,change:5,changeLabel:"+0.12 this semester"}),e.jsx(a,{value:118,label:"Credit Hours",icon:y,iconColor:"secondary",showTrend:!0,change:15,changeLabel:"+15 this semester"}),e.jsx(a,{value:"92%",label:"Attendance Rate",icon:c,iconColor:"success",showTrend:!0,change:3,changeLabel:"+3% this month"}),e.jsx(a,{value:28,label:"Assignments Completed",icon:me,iconColor:"gold",showTrend:!0,change:4,changeLabel:"+4 this week"})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Fall 2024 semester progress tracking for School of Engineering and Applied Sciences"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Study Engagement:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsx(a,{value:156,label:"Study Hours",icon:j,iconColor:"secondary",showTrend:!0,change:24,changeLabel:"+24 this month"}),e.jsx(a,{value:67,label:"Library Sessions",icon:y,iconColor:"gold",showTrend:!0,change:8,changeLabel:"+8 this month"}),e.jsx(a,{value:23,label:"Study Groups",icon:l,iconColor:"secondary",showTrend:!0,change:3,changeLabel:"+3 this semester"}),e.jsx(a,{value:45,label:"Day Streak",icon:T,iconColor:"warning",variant:"highlight",emphasis:"gold"})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Lockwood Library and campus study space utilization tracking"})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Social Engagement Analytics:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"HIVE Platform Activity:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{value:234,label:"Connections",icon:l,iconColor:"gold",showTrend:!0,change:18,changeLabel:"+18 this month",interactive:!0}),e.jsx(a,{value:67,label:"Spaces Joined",icon:I,iconColor:"secondary",showTrend:!0,change:3,changeLabel:"+3 this semester",interactive:!0}),e.jsx(a,{value:156,label:"Posts Shared",icon:O,iconColor:"default",showTrend:!0,change:12,changeLabel:"+12 this week",interactive:!0})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"HIVE social utility platform engagement metrics"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Campus Events & Organizations:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{value:23,label:"Events Attended",icon:A,iconColor:"gold",showTrend:!0,change:5,changeLabel:"+5 this month"}),e.jsx(a,{value:8,label:"Organizations",icon:I,iconColor:"secondary",showTrend:!0,change:1,changeLabel:"+1 this semester"}),e.jsx(a,{value:4,label:"Leadership Roles",icon:x,iconColor:"success",variant:"highlight",emphasis:"secondary"})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"UB student organization participation and campus event engagement"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Tool Building & Creation:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{value:15,label:"Tools Created",icon:h,iconColor:"gold",variant:"highlight",emphasis:"gold",showTrend:!0,change:3,changeLabel:"+3 this month"}),e.jsx(a,{value:"2.4k",label:"Tool Downloads",icon:ve,iconColor:"success",showTrend:!0,change:456,changeLabel:"+456 this week"}),e.jsx(a,{value:89,label:"Community Likes",icon:R,iconColor:"error",showTrend:!0,change:23,changeLabel:"+23 this week"})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Platform contribution and community impact tracking"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Course Space Analytics:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{as:"h3",variant:"heading-sm",color:"primary",children:"CSE 331 - Algorithm Analysis Course Engagement"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4",children:[e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Course Performance:"}),e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsx(a,{value:"94%",label:"Assignment Score",icon:c,iconColor:"success",showTrend:!0,change:8,changeLabel:"+8% this assignment",size:"sm"}),e.jsx(a,{value:12,label:"Submissions",icon:G,iconColor:"gold",showTrend:!0,change:1,changeLabel:"On time",size:"sm"}),e.jsx(a,{value:"87%",label:"Participation",icon:l,iconColor:"secondary",showTrend:!0,change:5,changeLabel:"+5% this week",size:"sm"}),e.jsx(a,{value:8,label:"Questions Asked",icon:y,iconColor:"gold",showTrend:!0,change:3,changeLabel:"+3 this week",size:"sm"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Collaboration Metrics:"}),e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsx(a,{value:23,label:"Study Partners",icon:l,iconColor:"secondary",showTrend:!0,change:4,changeLabel:"+4 this semester",size:"sm"}),e.jsx(a,{value:67,label:"Peer Helps",icon:R,iconColor:"success",showTrend:!0,change:12,changeLabel:"+12 this month",size:"sm"}),e.jsx(a,{value:34,label:"Resources Shared",icon:O,iconColor:"gold",showTrend:!0,change:6,changeLabel:"+6 this week",size:"sm"}),e.jsx(a,{value:15,label:"Group Projects",icon:h,iconColor:"secondary",showTrend:!0,change:1,changeLabel:"Current project",size:"sm"})]})]})]}),e.jsx(i,{variant:"body-sm",color:"secondary",children:"Real-time analytics for CSE 331 student engagement, performance tracking, and collaborative learning metrics"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Mobile Campus Analytics Dashboard:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(i,{variant:"body-md",color:"primary",children:"Mobile-optimized statistic display for quick campus activity overview:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Quick Overview (Compact):"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-2",children:[e.jsx(a,{value:12,label:"Today's Events",variant:"compact",size:"xs"}),e.jsx(a,{value:"3.8",label:"GPA",variant:"compact",size:"xs",emphasis:"gold"}),e.jsx(a,{value:45,label:"Streak",variant:"compact",size:"xs"}),e.jsx(a,{value:156,label:"Connections",variant:"compact",size:"xs"}),e.jsx(a,{value:23,label:"Tools",variant:"compact",size:"xs"}),e.jsx(a,{value:67,label:"Points",variant:"compact",size:"xs"})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Quick overview panel for mobile dashboard home screen"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Featured Metrics (Highlighted):"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{value:1250,label:"HIVE Points",icon:n,iconColor:"gold",variant:"highlight",emphasis:"gold",size:"sm",interactive:!0}),e.jsx(a,{value:45,label:"Study Streak",icon:T,iconColor:"warning",variant:"highlight",size:"sm",showTrend:!0,change:1,changeLabel:"Keep it up!",interactive:!0})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Prominent achievement display for mobile motivation and engagement"})]})]})]})]})]})]})]})]})},w={args:{value:156,label:"Study Sessions",size:"md",variant:"default",emphasis:"normal",showTrend:!1,interactive:!1,loading:!1},render:p=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(d,{children:[e.jsxs(g,{children:[e.jsx(u,{children:"Profile Statistic Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different statistic configurations"})]}),e.jsx(m,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{...p}),e.jsx(i,{variant:"body-sm",color:"secondary",children:"Interactive statistic testing for University at Buffalo campus analytics and achievement tracking"})]})})]})})};var q,Z,W;S.parameters={...S.parameters,docs:{...(q=S.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    value: 42,
    label: 'Study Sessions',
    size: 'md',
    variant: 'default',
    emphasis: 'normal',
    showTrend: false,
    interactive: false,
    loading: false
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Student statistic display for University at Buffalo activity tracking:
          </Text>
          <ProfileStatistic {...args} />
          <Text variant="body-sm" color="secondary">
            Campus engagement and achievement metric display
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(W=(Z=S.parameters)==null?void 0:Z.docs)==null?void 0:W.source}}};var Q,Y,K;N.parameters={...N.parameters,docs:{...(Q=N.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Basic Statistic Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">📊 STATISTIC TYPES</Badge>
            Profile Statistic Display Variants
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive statistic display system for University at Buffalo student metrics and achievement tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Visual Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Default (Card Style):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={156} label="Connections" icon={Users} iconColor="gold" variant="primary" />
                    <ProfileStatistic value="3.8" label="GPA" icon={GraduationCap} iconColor="success" variant="primary" />
                    <ProfileStatistic value={23} label="Tools Created" icon={Code} iconColor="secondary" variant="primary" />
                    <ProfileStatistic value="12.5k" label="Study Hours" icon={Clock} iconColor="gold" variant="primary" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Highlight (Emphasized):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={1250} label="HIVE Points" icon={Star} iconColor="gold" variant="highlight" emphasis="gold" />
                    <ProfileStatistic value={8} label="Leadership Roles" icon={Trophy} iconColor="success" variant="highlight" emphasis="secondary" />
                    <ProfileStatistic value={45} label="Day Streak" icon={Zap} iconColor="warning" variant="highlight" />
                    <ProfileStatistic value={95} label="Attendance %" icon={Target} iconColor="success" variant="highlight" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Compact (Space Efficient):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    <ProfileStatistic value={42} label="Events" variant="compact" size="sm" />
                    <ProfileStatistic value={18} label="Spaces" variant="compact" size="sm" />
                    <ProfileStatistic value={156} label="Posts" variant="compact" size="sm" />
                    <ProfileStatistic value={89} label="Tools" variant="compact" size="sm" />
                    <ProfileStatistic value="4.2k" label="Views" variant="compact" size="sm" />
                    <ProfileStatistic value={234} label="Likes" variant="compact" size="sm" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Ghost (Minimal):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={34} label="Followers" variant="ghost" />
                    <ProfileStatistic value={67} label="Following" variant="ghost" />
                    <ProfileStatistic value={12} label="Groups" variant="ghost" />
                    <ProfileStatistic value={5} label="Projects" variant="ghost" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Trend Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📈 TREND TRACKING</Badge>
            Progress and Change Indicators
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Visual trend indicators for tracking progress, changes, and performance over time
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Trending Statistics:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Positive Trends (Up):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value="3.8" label="GPA" icon={GraduationCap} iconColor="success" showTrend change={12} changeLabel="+0.2 this semester" />
                    <ProfileStatistic value={156} label="Connections" icon={Users} iconColor="gold" showTrend change={24} changeLabel="+24 this month" />
                    <ProfileStatistic value={89} label="Study Hours" icon={Clock} iconColor="secondary" showTrend change={15} changeLabel="+15 this week" />
                    <ProfileStatistic value={23} label="Tools Created" icon={Code} iconColor="gold" showTrend change={3} changeLabel="+3 this month" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Negative Trends (Down):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={67} label="Missed Classes" icon={Calendar} iconColor="error" showTrend change={-8} changeLabel="-8 this month" />
                    <ProfileStatistic value={234} label="Procrastination" icon={Clock} iconColor="warning" showTrend change={-45} changeLabel="-45 min/day" />
                    <ProfileStatistic value={12} label="Late Submissions" icon={Upload} iconColor="error" showTrend change={-5} changeLabel="-5 this semester" />
                    <ProfileStatistic value={3} label="Missed Deadlines" icon={Target} iconColor="error" showTrend change={-2} changeLabel="-2 this month" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Neutral Trends (Stable):</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={45} label="Library Visits" icon={BookOpen} iconColor="default" showTrend change={0} changeLabel="Consistent" />
                    <ProfileStatistic value={89} label="Attendance %" icon={Target} iconColor="success" showTrend change={0} changeLabel="Steady" />
                    <ProfileStatistic value={12} label="Study Groups" icon={Users} iconColor="secondary" showTrend change={0} changeLabel="Maintained" />
                    <ProfileStatistic value={156} label="Course Load" icon={BookOpen} iconColor="default" showTrend change={0} changeLabel="Stable" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Size Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">📏 SIZES</Badge>
            Statistic Size Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 sizes for different interface contexts and layout requirements
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Comparison:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Extra Small (xs):</Text>
                  <div className="flex gap-3">
                    <ProfileStatistic value={42} label="Events" size="xs" />
                    <ProfileStatistic value="3.8" label="GPA" size="xs" icon={Star} />
                    <ProfileStatistic value={156} label="Connections" size="xs" showTrend change={12} />
                  </div>
                  <Text variant="body-xs" color="secondary">Compact dashboard widgets and inline metrics</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (sm):</Text>
                  <div className="flex gap-4">
                    <ProfileStatistic value={42} label="Events" size="sm" />
                    <ProfileStatistic value="3.8" label="GPA" size="sm" icon={Star} />
                    <ProfileStatistic value={156} label="Connections" size="sm" showTrend change={12} />
                  </div>
                  <Text variant="body-xs" color="secondary">Sidebar statistics and card components</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (md - default):</Text>
                  <div className="flex gap-4">
                    <ProfileStatistic value={42} label="Events" size="md" />
                    <ProfileStatistic value="3.8" label="GPA" size="md" icon={Star} />
                    <ProfileStatistic value={156} label="Connections" size="md" showTrend change={12} />
                  </div>
                  <Text variant="body-xs" color="secondary">Standard profile statistics and main dashboard</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (lg):</Text>
                  <div className="flex gap-4">
                    <ProfileStatistic value={42} label="Events" size="lg" />
                    <ProfileStatistic value="3.8" label="GPA" size="lg" icon={Star} />
                    <ProfileStatistic value={156} label="Connections" size="lg" showTrend change={12} />
                  </div>
                  <Text variant="body-xs" color="secondary">Hero sections and prominent achievement displays</Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Interactive Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ INTERACTIVE FEATURES</Badge>
            Statistic Interaction and Emphasis
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive states, emphasis colors, loading states, and icon customization
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Clickable Statistics:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={156} label="View Connections" icon={Users} interactive onClick={() => alert('Navigate to connections')} />
                    <ProfileStatistic value={23} label="View Tools" icon={Code} interactive onClick={() => alert('Navigate to tools')} />
                    <ProfileStatistic value={89} label="View Calendar" icon={Calendar} interactive onClick={() => alert('Navigate to calendar')} />
                    <ProfileStatistic value={12} label="View Achievements" icon={Trophy} interactive onClick={() => alert('Navigate to achievements')} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Loading States:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={0} label="Loading..." loading size="xs" />
                    <ProfileStatistic value={0} label="Loading..." loading size="sm" />
                    <ProfileStatistic value={0} label="Loading..." loading size="md" />
                    <ProfileStatistic value={0} label="Loading..." loading size="lg" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Emphasis Colors:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <ProfileStatistic value={1250} label="HIVE Points" icon={Star} emphasis="gold" variant="highlight" />
                    <ProfileStatistic value={8} label="Leadership Roles" icon={Trophy} emphasis="secondary" variant="highlight" />
                    <ProfileStatistic value={156} label="Standard Metric" icon={Target} emphasis="normal" />
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Icon Customization:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Icon Color Variants:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <ProfileStatistic value={42} label="Default" icon={Target} iconColor="default" size="sm" />
                    <ProfileStatistic value={42} label="Gold" icon={Star} iconColor="gold" size="sm" />
                    <ProfileStatistic value={42} label="Secondary" icon={Code} iconColor="secondary" size="sm" />
                    <ProfileStatistic value={42} label="Success" icon={Trophy} iconColor="success" size="sm" />
                    <ProfileStatistic value={42} label="Warning" icon={Zap} iconColor="warning" size="sm" />
                    <ProfileStatistic value={42} label="Error" icon={Target} iconColor="error" size="sm" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Custom Icons:</Text>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStatistic value={89} label="Coffee Breaks" icon={Coffee} iconColor="warning" />
                    <ProfileStatistic value={156} label="WiFi Sessions" icon={Wifi} iconColor="secondary" />
                    <ProfileStatistic value={23} label="Building Visits" icon={Building} iconColor="default" />
                    <ProfileStatistic value={67} label="Campus Events" icon={MapPin} iconColor="gold" />
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
            Real Campus Student Analytics Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile statistics in actual University at Buffalo student academic and social engagement contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Performance Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Performance Dashboard:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Sarah Chen - Computer Science Senior
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Metrics:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <ProfileStatistic value="3.87" label="Cumulative GPA" icon={GraduationCap} iconColor="success" variant="highlight" emphasis="gold" showTrend change={5} changeLabel="+0.12 this semester" />
                        <ProfileStatistic value={118} label="Credit Hours" icon={BookOpen} iconColor="secondary" showTrend change={15} changeLabel="+15 this semester" />
                        <ProfileStatistic value="92%" label="Attendance Rate" icon={Target} iconColor="success" showTrend change={3} changeLabel="+3% this month" />
                        <ProfileStatistic value={28} label="Assignments Completed" icon={Award} iconColor="gold" showTrend change={4} changeLabel="+4 this week" />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Fall 2024 semester progress tracking for School of Engineering and Applied Sciences
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Study Engagement:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <ProfileStatistic value={156} label="Study Hours" icon={Clock} iconColor="secondary" showTrend change={24} changeLabel="+24 this month" />
                        <ProfileStatistic value={67} label="Library Sessions" icon={BookOpen} iconColor="gold" showTrend change={8} changeLabel="+8 this month" />
                        <ProfileStatistic value={23} label="Study Groups" icon={Users} iconColor="secondary" showTrend change={3} changeLabel="+3 this semester" />
                        <ProfileStatistic value={45} label="Day Streak" icon={Zap} iconColor="warning" variant="highlight" emphasis="gold" />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Lockwood Library and campus study space utilization tracking
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Social Engagement Analytics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Social Engagement Analytics:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">HIVE Platform Activity:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                    <div className="space-y-3">
                      <ProfileStatistic value={234} label="Connections" icon={Users} iconColor="gold" showTrend change={18} changeLabel="+18 this month" interactive />
                      <ProfileStatistic value={67} label="Spaces Joined" icon={Building} iconColor="secondary" showTrend change={3} changeLabel="+3 this semester" interactive />
                      <ProfileStatistic value={156} label="Posts Shared" icon={Share2} iconColor="default" showTrend change={12} changeLabel="+12 this week" interactive />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      HIVE social utility platform engagement metrics
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Events & Organizations:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                    <div className="space-y-3">
                      <ProfileStatistic value={23} label="Events Attended" icon={Calendar} iconColor="gold" showTrend change={5} changeLabel="+5 this month" />
                      <ProfileStatistic value={8} label="Organizations" icon={Building} iconColor="secondary" showTrend change={1} changeLabel="+1 this semester" />
                      <ProfileStatistic value={4} label="Leadership Roles" icon={Trophy} iconColor="success" variant="highlight" emphasis="secondary" />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      UB student organization participation and campus event engagement
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Tool Building & Creation:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                    <div className="space-y-3">
                      <ProfileStatistic value={15} label="Tools Created" icon={Code} iconColor="gold" variant="highlight" emphasis="gold" showTrend change={3} changeLabel="+3 this month" />
                      <ProfileStatistic value="2.4k" label="Tool Downloads" icon={Download} iconColor="success" showTrend change={456} changeLabel="+456 this week" />
                      <ProfileStatistic value={89} label="Community Likes" icon={Heart} iconColor="error" showTrend change={23} changeLabel="+23 this week" />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Platform contribution and community impact tracking
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Course Space Analytics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Space Analytics:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 - Algorithm Analysis Course Engagement
                </Text>
                
                <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    <div className="space-y-3">
                      <Text variant="body-sm" color="gold" weight="medium">Course Performance:</Text>
                      <div className="grid grid-cols-2 gap-3">
                        <ProfileStatistic value="94%" label="Assignment Score" icon={Target} iconColor="success" showTrend change={8} changeLabel="+8% this assignment" size="sm" />
                        <ProfileStatistic value={12} label="Submissions" icon={Upload} iconColor="gold" showTrend change={1} changeLabel="On time" size="sm" />
                        <ProfileStatistic value="87%" label="Participation" icon={Users} iconColor="secondary" showTrend change={5} changeLabel="+5% this week" size="sm" />
                        <ProfileStatistic value={8} label="Questions Asked" icon={BookOpen} iconColor="gold" showTrend change={3} changeLabel="+3 this week" size="sm" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Text variant="body-sm" color="gold" weight="medium">Collaboration Metrics:</Text>
                      <div className="grid grid-cols-2 gap-3">
                        <ProfileStatistic value={23} label="Study Partners" icon={Users} iconColor="secondary" showTrend change={4} changeLabel="+4 this semester" size="sm" />
                        <ProfileStatistic value={67} label="Peer Helps" icon={Heart} iconColor="success" showTrend change={12} changeLabel="+12 this month" size="sm" />
                        <ProfileStatistic value={34} label="Resources Shared" icon={Share2} iconColor="gold" showTrend change={6} changeLabel="+6 this week" size="sm" />
                        <ProfileStatistic value={15} label="Group Projects" icon={Code} iconColor="secondary" showTrend change={1} changeLabel="Current project" size="sm" />
                      </div>
                    </div>

                  </div>
                  
                  <Text variant="body-sm" color="secondary">
                    Real-time analytics for CSE 331 student engagement, performance tracking, and collaborative learning metrics
                  </Text>

                </div>

              </div>

            </div>
          </div>

          {/* Mobile Dashboard Analytics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Analytics Dashboard:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized statistic display for quick campus activity overview:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Overview (Compact):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <ProfileStatistic value={12} label="Today's Events" variant="compact" size="xs" />
                      <ProfileStatistic value="3.8" label="GPA" variant="compact" size="xs" emphasis="gold" />
                      <ProfileStatistic value={45} label="Streak" variant="compact" size="xs" />
                      <ProfileStatistic value={156} label="Connections" variant="compact" size="xs" />
                      <ProfileStatistic value={23} label="Tools" variant="compact" size="xs" />
                      <ProfileStatistic value={67} label="Points" variant="compact" size="xs" />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Quick overview panel for mobile dashboard home screen
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Featured Metrics (Highlighted):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-3">
                      <ProfileStatistic value={1250} label="HIVE Points" icon={Star} iconColor="gold" variant="highlight" emphasis="gold" size="sm" interactive />
                      <ProfileStatistic value={45} label="Study Streak" icon={Zap} iconColor="warning" variant="highlight" size="sm" showTrend change={1} changeLabel="Keep it up!" interactive />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Prominent achievement display for mobile motivation and engagement
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(K=(Y=N.parameters)==null?void 0:Y.docs)==null?void 0:K.source}}};var _,X,$;w.parameters={...w.parameters,docs:{...(_=w.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    value: 156,
    label: 'Study Sessions',
    size: 'md',
    variant: 'default',
    emphasis: 'normal',
    showTrend: false,
    interactive: false,
    loading: false
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Statistic Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different statistic configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileStatistic {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive statistic testing for University at Buffalo campus analytics and achievement tracking
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...($=(X=w.parameters)==null?void 0:X.docs)==null?void 0:$.source}}};const Ye=["Default","CompleteShowcase","Playground"];export{N as CompleteShowcase,S as Default,w as Playground,Ye as __namedExportsOrder,Qe as default};
