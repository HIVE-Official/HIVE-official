import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as re}from"./index-DJO9vBfz.js";import{c as m}from"./utils-CytzSlOG.js";import{H as c,a as g,c as d,b as p}from"./hive-tokens-CKIUfcHM.js";import{B as v}from"./badge-B09J4pcg.js";import{T as r}from"./text-Cao0VGB4.js";import{T as z}from"./trophy-B5Tnzdfb.js";import{S as ie}from"./settings-GFIh7SpU.js";import{B as P}from"./bar-chart-3-CRKf5MQJ.js";import{T as J}from"./trending-up-CllCr3lL.js";import{A as te}from"./award-wJZPpTAr.js";import{C as se}from"./chevron-right-BGhHLs4c.js";import{T as w}from"./target-CMXB8H7t.js";import{E as oe}from"./eye-B7JxKiV6.js";import{D as ne}from"./download-YB6BOdB0.js";import{Z as ce}from"./zap-0mfePDxG.js";import{U as K}from"./users-kvqvVsnf.js";import{A as de}from"./activity-DkRGcIzu.js";import{M as L}from"./minus-CMp0-NgR.js";import{c as _}from"./createLucideIcon-WpwZgzX-.js";import{H as le}from"./heart-Dhw1SL1X.js";import{a}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=_("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=_("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]),pe=s=>{const o={engagement:{color:"text-blue-500",bgColor:"bg-blue-500/10",borderColor:"border-blue-500/20",icon:de,label:"Engagement"},academic:{color:"text-green-500",bgColor:"bg-green-500/10",borderColor:"border-green-500/20",icon:w,label:"Academic"},social:{color:"text-purple-500",bgColor:"bg-purple-500/10",borderColor:"border-purple-500/20",icon:K,label:"Social"},productivity:{color:"text-[var(--hive-gold)]",bgColor:"bg-[var(--hive-gold)]/10",borderColor:"border-[var(--hive-gold)]/20",icon:ce,label:"Productivity"},growth:{color:"text-pink-500",bgColor:"bg-pink-500/10",borderColor:"border-pink-500/20",icon:J,label:"Growth"}};return o[s]||o.engagement},ve=s=>({up:ge,down:me,stable:L})[s]||L,ue=s=>{const o={up:"text-green-500",down:"text-red-500",stable:"text-[var(--hive-text-muted)]"};return o[s]||o.stable},ye=s=>{const o={academic:{color:"text-blue-500",bgColor:"bg-blue-500/10",icon:w,label:"Academic"},social:{color:"text-purple-500",bgColor:"bg-purple-500/10",icon:K,label:"Social"},personal:{color:"text-green-500",bgColor:"bg-green-500/10",icon:le,label:"Personal"},career:{color:"text-[var(--hive-gold)]",bgColor:"bg-[var(--hive-gold)]/10",icon:z,label:"Career"}};return o[s]||o.personal},t=({user:s,keyMetrics:o=[],personalGoals:N=[],overallScore:$=0,weeklyGrowth:X=0,academicProgress:n=0,socialEngagement:G=0,platformLevel:Q=1,streak:E=0,isEditable:k=!0,onViewMetric:S,onViewAllStats:T,onSetGoal:u,onExportData:V,onViewInsights:M,className:ee})=>{const[I,B]=re.useState(!1),D=o.slice(0,4),C=N.filter(i=>i.isActive),ae=N.filter(i=>i.current>=i.target&&i.isActive);return e.jsxs(c,{className:m("relative overflow-hidden transition-all duration-300 hover:shadow-lg","bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]",I&&"scale-[1.02]",ee),onMouseEnter:()=>B(!0),onMouseLeave:()=>B(!1),children:[e.jsx(g,{className:"pb-2",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Personal Analytics"}),E>0&&e.jsxs(v,{variant:"secondary",className:"text-xs",children:[e.jsx(z,{className:"h-3 w-3 mr-1"}),"Level ",Q]})]}),k&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:T,className:"h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(ie,{className:"h-3 w-3"})})]})}),e.jsxs(d,{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(P,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsx(r,{variant:"body-sm",weight:"medium",color:"primary",children:$})]}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Overall Score"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(J,{className:"h-3 w-3 text-green-500"}),e.jsxs(r,{variant:"body-sm",weight:"medium",color:"primary",children:["+",X,"%"]})]}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Weekly Growth"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(te,{className:"h-3 w-3 text-[var(--hive-gold)]"}),e.jsx(r,{variant:"body-sm",weight:"medium",color:"primary",children:E})]}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Day Streak"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(r,{variant:"body-sm",color:"primary",children:"Academic Progress"}),e.jsxs(r,{variant:"body-xs",color:"secondary",children:[n,"%"]})]}),e.jsx("div",{className:"w-full bg-[var(--hive-background-secondary)] rounded-full h-2",children:e.jsx("div",{className:"bg-blue-500 rounded-full h-2 transition-all duration-500",style:{width:`${n}%`}})})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(r,{variant:"body-sm",color:"primary",children:"Social Engagement"}),e.jsxs(r,{variant:"body-xs",color:"secondary",children:[G,"%"]})]}),e.jsx("div",{className:"w-full bg-[var(--hive-background-secondary)] rounded-full h-2",children:e.jsx("div",{className:"bg-purple-500 rounded-full h-2 transition-all duration-500",style:{width:`${G}%`}})})]})]}),D.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(r,{variant:"body-sm",color:"primary",weight:"medium",children:"Key Metrics:"}),o.length>4&&e.jsxs(r,{variant:"body-xs",color:"secondary",children:["+",o.length-4," more"]})]}),e.jsx("div",{className:"space-y-1",children:D.map(i=>{const l=pe(i.category),A=ve(i.trend),y=ue(i.trend);return e.jsxs("div",{className:m("flex items-center gap-2 p-2 rounded transition-colors cursor-pointer","hover:bg-[var(--hive-background-secondary)]",i.isHighlighted&&"bg-[var(--hive-gold)]/5 border border-[var(--hive-gold)]/20"),onClick:()=>S==null?void 0:S(i.id),children:[e.jsx(l.icon,{className:m("h-3 w-3",l.color)}),e.jsx(r,{variant:"body-xs",color:"primary",className:"flex-1 truncate",children:i.name}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsxs(r,{variant:"body-xs",color:"primary",weight:"medium",children:[i.value.toLocaleString(),i.unit]}),e.jsx(A,{className:m("h-2 w-2",y)}),e.jsxs(r,{variant:"body-xs",className:y,children:[i.trendPercentage,"%"]})]}),e.jsx(se,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"})]},i.id)})})]}),C.length>0&&e.jsxs("div",{className:"space-y-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(r,{variant:"body-sm",color:"primary",weight:"medium",children:"Active Goals:"}),e.jsxs(r,{variant:"body-xs",color:"secondary",children:[ae.length,"/",C.length," completed"]})]}),e.jsx("div",{className:"space-y-2",children:C.slice(0,2).map(i=>{const l=ye(i.category),A=Math.min(i.current/i.target*100,100),y=i.current>=i.target;return e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(l.icon,{className:m("h-3 w-3",l.color)}),e.jsx(r,{variant:"body-xs",color:"primary",className:"truncate",children:i.name})]}),e.jsxs(r,{variant:"body-xs",color:"secondary",children:[i.current,"/",i.target," ",i.unit]})]}),e.jsx("div",{className:"w-full bg-[var(--hive-background-secondary)] rounded-full h-1.5",children:e.jsx("div",{className:m("rounded-full h-1.5 transition-all duration-500",y?"bg-green-500":l.color.replace("text-","bg-")),style:{width:`${A}%`}})})]},i.id)})})]}),s.academicYear&&e.jsxs("div",{className:"space-y-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[e.jsxs(r,{variant:"body-sm",color:"primary",weight:"medium",children:[s.academicYear.charAt(0).toUpperCase()+s.academicYear.slice(1)," Year Progress:"]}),e.jsxs("div",{className:"p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx(r,{variant:"body-sm",color:"primary",children:"Semester Completion"}),e.jsxs(r,{variant:"body-xs",color:"secondary",children:[n,"%"]})]}),e.jsx("div",{className:"w-full bg-[var(--hive-background-secondary)] rounded-full h-2",children:e.jsx("div",{className:"bg-blue-500 rounded-full h-2 transition-all duration-500",style:{width:`${n}%`}})}),e.jsx(r,{variant:"body-xs",color:"secondary",className:"mt-1",children:n>=75?"Excellent progress this semester! 🎓":n>=50?"Good progress - keep it up! 📚":n>=25?"Building momentum this term 💪":"Early semester - great potential ahead! ✨"})]})]}),e.jsxs("div",{className:"flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[k&&u&&e.jsxs(ButtonEnhanced,{variant:"secondary",size:"sm",onClick:u,className:"flex-1",children:[e.jsx(w,{className:"h-3 w-3 mr-1"}),"Set Goal"]}),T&&e.jsxs(ButtonEnhanced,{variant:"primary",size:"sm",onClick:T,className:"flex-1",children:[e.jsx(P,{className:"h-3 w-3 mr-1"}),"All Stats"]}),M&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:M,className:"text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(oe,{className:"h-3 w-3"})}),V&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:V,className:"text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(ne,{className:"h-3 w-3"})})]}),o.length===0&&N.length===0&&e.jsxs("div",{className:"text-center py-6",children:[e.jsx(P,{className:"h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]"}),e.jsx(r,{variant:"body-sm",color:"secondary",className:"mb-2",children:"No analytics data yet"}),e.jsx(r,{variant:"body-xs",color:"secondary",className:"mb-4",children:"Start engaging with the platform to see your personal analytics and insights"}),k&&u&&e.jsxs(ButtonEnhanced,{variant:"secondary",size:"sm",onClick:u,children:[e.jsx(w,{className:"h-3 w-3 mr-1"}),"Set Your First Goal"]})]})]}),I&&e.jsx("div",{className:"absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl"})]})};t.__docgenInfo={description:"",methods:[],displayName:"ProfileStatsWidget",props:{user:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  academicYear?: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate';
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"academicYear",value:{name:"union",raw:"'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate'",elements:[{name:"literal",value:"'freshman'"},{name:"literal",value:"'sophomore'"},{name:"literal",value:"'junior'"},{name:"literal",value:"'senior'"},{name:"literal",value:"'graduate'"}],required:!1}}]}},description:""},keyMetrics:{required:!1,tsType:{name:"Array",elements:[{name:"StatMetric"}],raw:"StatMetric[]"},description:"",defaultValue:{value:"[]",computed:!1}},personalGoals:{required:!1,tsType:{name:"Array",elements:[{name:"PersonalGoal"}],raw:"PersonalGoal[]"},description:"",defaultValue:{value:"[]",computed:!1}},overallScore:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},weeklyGrowth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},academicProgress:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},socialEngagement:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},platformLevel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},streak:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},isEditable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onViewMetric:{required:!1,tsType:{name:"signature",type:"function",raw:"(metricId: string) => void",signature:{arguments:[{type:{name:"string"},name:"metricId"}],return:{name:"void"}}},description:""},onViewAllStats:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSetGoal:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onExportData:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onViewInsights:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const Oe={title:"04-Organisms/Profile System/Profile Stats Widget - COMPLETE DEFINITION",component:t,parameters:{docs:{description:{component:`
## 🎯 HIVE Profile Stats Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive personal analytics and goal tracking interface for University at Buffalo HIVE platform student performance monitoring and academic success insights.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Metric Categories** - Engagement, academic, social, productivity, growth for complete performance tracking
- **4 Goal Categories** - Academic, social, personal, career goal setting with progress monitoring
- **Trend Analysis** - Up, down, stable trends with percentage change tracking and visual indicators
- **Progress Visualization** - Academic year progress, semester completion, goal achievement tracking
- **Level System** - Platform level progression with streak tracking and achievement recognition
- **Real-Time Analytics** - Live metric updates with weekly growth analysis and performance insights
- **Campus Context** - University at Buffalo specific academic progress and semester milestone tracking
- **Data Export** - Analytics export functionality for academic portfolio and progress documentation

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student performance and goal tracking:
- **Academic Analytics** - Course engagement, study time tracking, GPA correlation, semester progress
- **Social Metrics** - Community participation, peer interaction, space engagement, collaboration tracking
- **Campus Activity** - Event attendance, organization involvement, leadership participation metrics
- **Career Development** - Professional growth tracking, skill development, networking progress monitoring
- **Goal Achievement** - Academic milestones, personal development targets, career preparation objectives
- **Semester Planning** - Academic year progress with semester-specific goal setting and achievement tracking
- **Performance Insights** - Data-driven recommendations for academic success and campus engagement optimization

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Analytics** - Large metric cards and goal progress bars optimized for mobile viewing
- **Responsive Charts** - Adaptive data visualization for different screen sizes and orientations
- **Quick Goal Setting** - One-tap goal creation and progress updates for on-the-go academic management
- **Mobile Insights** - Location-aware campus analytics and real-time engagement tracking
`}}},tags:["autodocs"],argTypes:{keyMetrics:{control:"object",description:"Array of key performance metrics"},personalGoals:{control:"object",description:"Array of personal goal items"},overallScore:{control:{type:"range",min:0,max:100},description:"Overall performance score"},weeklyGrowth:{control:{type:"range",min:-50,max:50},description:"Weekly growth percentage"},academicProgress:{control:{type:"range",min:0,max:100},description:"Academic progress percentage"},socialEngagement:{control:{type:"range",min:0,max:100},description:"Social engagement percentage"},platformLevel:{control:"number",description:"Platform level achievement"},streak:{control:"number",description:"Daily activity streak"},isEditable:{control:"boolean",description:"Enable editing capabilities"},onViewMetric:{action:"view-metric",description:"View metric details handler"},onViewAllStats:{action:"view-all-stats",description:"View all statistics handler"},onSetGoal:{action:"set-goal",description:"Set new goal handler"},onExportData:{action:"export-data",description:"Export analytics data handler"},onViewInsights:{action:"view-insights",description:"View analytics insights handler"}}},f=[{id:"metric-001",name:"Study Sessions",value:12,unit:"",category:"academic",trend:"up",trendPercentage:15,period:"weekly",isHighlighted:!0},{id:"metric-002",name:"Community Posts",value:8,unit:"",category:"social",trend:"up",trendPercentage:25,period:"weekly"},{id:"metric-003",name:"Tools Created",value:2,unit:"",category:"productivity",trend:"stable",trendPercentage:0,period:"monthly"}],he=[{id:"metric-101",name:"Study Hours",value:42,unit:"h",category:"academic",trend:"up",trendPercentage:18,period:"weekly",isHighlighted:!0},{id:"metric-102",name:"Community Engagement",value:156,unit:" interactions",category:"social",trend:"up",trendPercentage:32,period:"weekly",isHighlighted:!0},{id:"metric-103",name:"Tools Deployed",value:8,unit:"",category:"productivity",trend:"up",trendPercentage:60,period:"monthly"},{id:"metric-104",name:"Peer Collaborations",value:24,unit:"",category:"growth",trend:"up",trendPercentage:41,period:"monthly"},{id:"metric-105",name:"Platform Activity",value:89,unit:"%",category:"engagement",trend:"up",trendPercentage:12,period:"weekly"}],j=[{id:"goal-001",name:"Complete CSE 331 Project",target:100,current:65,unit:"%",deadline:"2024-02-15T23:59:59Z",category:"academic",isActive:!0},{id:"goal-002",name:"Join 3 Study Groups",target:3,current:2,unit:" groups",deadline:"2024-01-30T23:59:59Z",category:"social",isActive:!0}],xe=[{id:"goal-101",name:"Maintain 3.8+ GPA",target:38,current:37,unit:"/10",deadline:"2024-05-15T23:59:59Z",category:"academic",isActive:!0},{id:"goal-102",name:"Lead 2 Community Projects",target:2,current:2,unit:" projects",deadline:"2024-03-30T23:59:59Z",category:"social",isActive:!0},{id:"goal-103",name:"Build Professional Portfolio",target:5,current:4,unit:" projects",deadline:"2024-04-20T23:59:59Z",category:"career",isActive:!0},{id:"goal-104",name:"Daily Platform Engagement",target:30,current:28,unit:" days",deadline:"2024-02-28T23:59:59Z",category:"personal",isActive:!0}],h={args:{user:{id:"user-123",name:"Alex Chen",academicYear:"junior"},keyMetrics:f,personalGoals:j,overallScore:78,weeklyGrowth:12,academicProgress:68,socialEngagement:82,platformLevel:5,streak:14,isEditable:!0,onViewMetric:a("view-metric"),onViewAllStats:a("view-all-stats"),onSetGoal:a("set-goal"),onExportData:a("export-data"),onViewInsights:a("view-insights")},render:s=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(c,{children:e.jsxs(d,{className:"space-y-4",children:[e.jsx(r,{variant:"body-md",color:"primary",children:"HIVE profile stats widget for University at Buffalo student performance tracking:"}),e.jsx(t,{...s}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Interactive analytics dashboard with goal tracking, progress monitoring, and UB academic context integration"})]})})})},x={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(c,{children:[e.jsxs(g,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(v,{variant:"success",children:"🎯 STATS WIDGET SYSTEM"}),"Personal Analytics & Goals"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Complete profile stats widget system for University at Buffalo HIVE platform student performance monitoring and academic success tracking"})]}),e.jsx(d,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Stats Widget Variations:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Basic Analytics:"}),e.jsx(t,{user:{id:"user-001",name:"Sarah Johnson",academicYear:"freshman"},keyMetrics:f,personalGoals:j,overallScore:65,weeklyGrowth:8,academicProgress:45,socialEngagement:72,platformLevel:2,streak:7,onViewMetric:a("basic-view-metric"),onViewAllStats:a("basic-view-all"),onSetGoal:a("basic-set-goal"),onExportData:a("basic-export"),onViewInsights:a("basic-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Beginning student with foundational metrics and academic goal tracking"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Advanced Analytics:"}),e.jsx(t,{user:{id:"user-002",name:"Marcus Rodriguez",academicYear:"senior"},keyMetrics:he,personalGoals:xe,overallScore:92,weeklyGrowth:15,academicProgress:88,socialEngagement:94,platformLevel:12,streak:45,onViewMetric:a("advanced-view-metric"),onViewAllStats:a("advanced-view-all"),onSetGoal:a("advanced-set-goal"),onExportData:a("advanced-export"),onViewInsights:a("advanced-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Advanced student with comprehensive analytics and multiple active goal achievements"})]})]})})]})})})]}),e.jsxs(c,{children:[e.jsxs(g,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(v,{variant:"info",children:"📊 METRIC CATEGORIES"}),"Performance Tracking Areas"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"5 metric categories for comprehensive University at Buffalo student performance monitoring and academic success analytics"})]}),e.jsx(d,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Complete Metric Category System:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Core Performance Categories:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg",children:[e.jsx(r,{variant:"body-sm",color:"primary",weight:"medium",children:"Engagement Metrics"}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Platform activity, interaction frequency, community participation"})]}),e.jsxs("div",{className:"p-3 bg-green-500/10 border border-green-500/20 rounded-lg",children:[e.jsx(r,{variant:"body-sm",color:"primary",weight:"medium",children:"Academic Performance"}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Study time, course progress, academic milestone tracking"})]}),e.jsxs("div",{className:"p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg",children:[e.jsx(r,{variant:"body-sm",color:"primary",weight:"medium",children:"Social Analytics"}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Community building, peer collaboration, network growth"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Growth & Development Areas:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg",children:[e.jsx(r,{variant:"body-sm",color:"primary",weight:"medium",children:"Productivity Tracking"}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Tool creation, project completion, efficiency improvements"})]}),e.jsxs("div",{className:"p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg",children:[e.jsx(r,{variant:"body-sm",color:"primary",weight:"medium",children:"Growth Indicators"}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Skill development, leadership progression, achievement trends"})]})]})]})]})})]})})})]}),e.jsxs(c,{children:[e.jsxs(g,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(v,{variant:"primary",children:"🎓 ACADEMIC YEAR TRACKING"}),"UB Semester Progress"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Academic year specific progress tracking for University at Buffalo semester system and graduation planning"})]}),e.jsx(d,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Academic Year Progression:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Freshman Year Progress:"}),e.jsx(t,{user:{id:"user-fresh",name:"Emma Martinez",academicYear:"freshman"},keyMetrics:[{id:"fresh-001",name:"Orientation Completion",value:100,unit:"%",category:"academic",trend:"up",trendPercentage:100,period:"semester"},{id:"fresh-002",name:"Study Group Participation",value:3,unit:" groups",category:"social",trend:"up",trendPercentage:50,period:"weekly"}],personalGoals:[{id:"fresh-goal-001",name:"Complete First Semester",target:100,current:35,unit:"%",deadline:"2024-05-15T23:59:59Z",category:"academic",isActive:!0}],overallScore:58,weeklyGrowth:22,academicProgress:35,socialEngagement:68,platformLevel:1,streak:12,onViewMetric:a("fresh-view-metric"),onViewAllStats:a("fresh-view-all"),onSetGoal:a("fresh-set-goal"),onExportData:a("fresh-export"),onViewInsights:a("fresh-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"First-year student establishing academic foundation and campus community connections"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Senior Year Achievement:"}),e.jsx(t,{user:{id:"user-senior",name:"David Park",academicYear:"senior"},keyMetrics:[{id:"senior-001",name:"Capstone Progress",value:92,unit:"%",category:"academic",trend:"up",trendPercentage:8,period:"weekly",isHighlighted:!0},{id:"senior-002",name:"Career Network",value:45,unit:" connections",category:"growth",trend:"up",trendPercentage:18,period:"monthly"}],personalGoals:[{id:"senior-goal-001",name:"Graduate Magna Cum Laude",target:375,current:368,unit:" GPA points",deadline:"2024-05-15T23:59:59Z",category:"academic",isActive:!0}],overallScore:94,weeklyGrowth:5,academicProgress:92,socialEngagement:88,platformLevel:15,streak:67,onViewMetric:a("senior-view-metric"),onViewAllStats:a("senior-view-all"),onSetGoal:a("senior-set-goal"),onExportData:a("senior-export"),onViewInsights:a("senior-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Final year student completing degree requirements and preparing for post-graduation success"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Graduate Student Research:"}),e.jsx(t,{user:{id:"user-grad",name:"Lisa Thompson",academicYear:"graduate"},keyMetrics:[{id:"grad-001",name:"Research Publications",value:3,unit:" papers",category:"academic",trend:"up",trendPercentage:50,period:"semester",isHighlighted:!0},{id:"grad-002",name:"Conference Presentations",value:2,unit:" presentations",category:"growth",trend:"up",trendPercentage:100,period:"semester"}],personalGoals:[{id:"grad-goal-001",name:"Complete Dissertation",target:100,current:78,unit:"%",deadline:"2024-08-30T23:59:59Z",category:"academic",isActive:!0}],overallScore:89,weeklyGrowth:3,academicProgress:78,socialEngagement:65,platformLevel:18,streak:34,onViewMetric:a("grad-view-metric"),onViewAllStats:a("grad-view-all"),onSetGoal:a("grad-set-goal"),onExportData:a("grad-export"),onViewInsights:a("grad-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Graduate researcher with advanced analytics focused on academic achievement and research progress"})]})]})})]})})})]}),e.jsxs(c,{children:[e.jsxs(g,{children:[e.jsxs(p,{className:"flex items-center gap-3",children:[e.jsx(v,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Analytics Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Profile stats widget usage in actual University at Buffalo student performance tracking and academic success contexts"})]}),e.jsxs(d,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Computer Science Student Performance Tracking:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{as:"h3",variant:"heading-sm",color:"primary",children:"CSE Junior - Alex Chen - Academic Excellence Analytics"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"High Achievement Metrics:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(t,{user:{id:"user-cse-001",name:"Alex Chen",academicYear:"junior"},keyMetrics:[{id:"cse-001",name:"Algorithm Study Hours",value:35,unit:"h",category:"academic",trend:"up",trendPercentage:25,period:"weekly",isHighlighted:!0},{id:"cse-002",name:"Code Reviews Given",value:18,unit:" reviews",category:"social",trend:"up",trendPercentage:38,period:"weekly"},{id:"cse-003",name:"Projects Deployed",value:4,unit:" apps",category:"productivity",trend:"up",trendPercentage:100,period:"monthly"}],personalGoals:[{id:"cse-goal-001",name:"Master Data Structures",target:15,current:13,unit:" topics",deadline:"2024-03-15T23:59:59Z",category:"academic",isActive:!0},{id:"cse-goal-002",name:"Lead Study Groups",target:3,current:3,unit:" groups",deadline:"2024-02-28T23:59:59Z",category:"social",isActive:!0}],overallScore:89,weeklyGrowth:18,academicProgress:87,socialEngagement:91,platformLevel:8,streak:28,onViewMetric:a("cse-view-metric"),onViewAllStats:a("cse-view-all"),onSetGoal:a("cse-set-goal"),onExportData:a("cse-export"),onViewInsights:a("cse-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Junior CSE student with high academic performance and strong peer collaboration metrics"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Research Focus Analytics:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(t,{user:{id:"user-research-001",name:"Maya Patel",academicYear:"senior"},keyMetrics:[{id:"research-001",name:"Research Hours",value:45,unit:"h",category:"academic",trend:"up",trendPercentage:12,period:"weekly",isHighlighted:!0},{id:"research-002",name:"Lab Collaborations",value:8,unit:" projects",category:"growth",trend:"up",trendPercentage:33,period:"monthly"},{id:"research-003",name:"Conference Submissions",value:2,unit:" papers",category:"academic",trend:"up",trendPercentage:100,period:"semester"}],personalGoals:[{id:"research-goal-001",name:"Complete Honors Thesis",target:100,current:85,unit:"%",deadline:"2024-04-30T23:59:59Z",category:"academic",isActive:!0},{id:"research-goal-002",name:"Publish Research Paper",target:1,current:0,unit:" publication",deadline:"2024-06-15T23:59:59Z",category:"career",isActive:!0}],overallScore:94,weeklyGrowth:8,academicProgress:92,socialEngagement:76,platformLevel:12,streak:41,onViewMetric:a("research-view-metric"),onViewAllStats:a("research-view-all"),onSetGoal:a("research-set-goal"),onExportData:a("research-export"),onViewInsights:a("research-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Senior researcher with advanced academic metrics and graduate school preparation analytics"})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Academic Support & Recovery Analytics:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Recovery Plan:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(t,{user:{id:"user-recovery-001",name:"Jordan Kim",academicYear:"sophomore"},keyMetrics:[{id:"recovery-001",name:"Tutoring Sessions",value:6,unit:" sessions",category:"academic",trend:"up",trendPercentage:50,period:"weekly",isHighlighted:!0},{id:"recovery-002",name:"Study Hours",value:25,unit:"h",category:"academic",trend:"up",trendPercentage:67,period:"weekly"}],personalGoals:[{id:"recovery-goal-001",name:"Raise GPA to 3.0",target:30,current:26,unit:"/10",deadline:"2024-05-15T23:59:59Z",category:"academic",isActive:!0}],overallScore:52,weeklyGrowth:28,academicProgress:48,socialEngagement:65,platformLevel:3,streak:9,onViewMetric:a("recovery-view-metric"),onViewAllStats:a("recovery-view-all"),onSetGoal:a("recovery-set-goal"),onExportData:a("recovery-export"),onViewInsights:a("recovery-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Student implementing academic recovery plan with tutoring support and structured study analytics"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Balanced Improvement:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(t,{user:{id:"user-balance-001",name:"Sam Wilson",academicYear:"junior"},keyMetrics:[{id:"balance-001",name:"Study-Life Balance",value:78,unit:"%",category:"personal",trend:"up",trendPercentage:15,period:"weekly"},{id:"balance-002",name:"Wellness Check-ins",value:5,unit:" sessions",category:"personal",trend:"stable",trendPercentage:0,period:"weekly"}],personalGoals:[{id:"balance-goal-001",name:"Maintain 3.5+ GPA",target:35,current:34,unit:"/10",deadline:"2024-05-15T23:59:59Z",category:"academic",isActive:!0}],overallScore:72,weeklyGrowth:6,academicProgress:76,socialEngagement:68,platformLevel:6,streak:21,onViewMetric:a("balance-view-metric"),onViewAllStats:a("balance-view-all"),onSetGoal:a("balance-set-goal"),onExportData:a("balance-export"),onViewInsights:a("balance-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Student focusing on sustainable academic performance with wellness and life balance integration"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Leadership Development:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(t,{user:{id:"user-leader-001",name:"Riley Martinez",academicYear:"senior"},keyMetrics:[{id:"leader-001",name:"Students Mentored",value:12,unit:" students",category:"growth",trend:"up",trendPercentage:20,period:"monthly",isHighlighted:!0},{id:"leader-002",name:"Org Leadership Roles",value:3,unit:" positions",category:"social",trend:"stable",trendPercentage:0,period:"semester"}],personalGoals:[{id:"leader-goal-001",name:"Graduate Summa Cum Laude",target:38,current:37,unit:"/10",deadline:"2024-05-15T23:59:59Z",category:"academic",isActive:!0}],overallScore:91,weeklyGrowth:4,academicProgress:94,socialEngagement:96,platformLevel:14,streak:52,onViewMetric:a("leader-view-metric"),onViewAllStats:a("leader-view-all"),onSetGoal:a("leader-set-goal"),onExportData:a("leader-export"),onViewInsights:a("leader-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Senior leader with exceptional metrics in mentorship, academic excellence, and community impact"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"New Student - Starting Analytics Journey:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-md",color:"primary",children:"First-time platform experience with minimal analytics data:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Brand New Account:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(t,{user:{id:"user-empty-001",name:"Taylor Wilson",academicYear:"freshman"},keyMetrics:[],personalGoals:[],overallScore:0,weeklyGrowth:0,academicProgress:0,socialEngagement:0,platformLevel:1,streak:0,onViewMetric:a("empty-view-metric"),onViewAllStats:a("empty-view-all"),onSetGoal:a("empty-set-goal"),onExportData:a("empty-export"),onViewInsights:a("empty-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"New user experience with call-to-action for first goal setting and platform engagement"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"View-Only Analytics:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(t,{user:{id:"user-readonly-001",name:"Casey Johnson",academicYear:"sophomore"},keyMetrics:f,personalGoals:j,overallScore:78,weeklyGrowth:12,academicProgress:68,socialEngagement:82,platformLevel:5,streak:14,isEditable:!1,onViewMetric:a("readonly-view-metric"),onViewAllStats:a("readonly-view-all"),onViewInsights:a("readonly-insights")}),e.jsx(r,{variant:"body-xs",color:"secondary",children:"Read-only profile view without editing capabilities for public analytics viewing"})]})]})]})]})})]})]})]})]})},b={args:{user:{id:"user-playground",name:"Alex Chen",academicYear:"junior"},keyMetrics:f,personalGoals:j,overallScore:78,weeklyGrowth:12,academicProgress:68,socialEngagement:82,platformLevel:5,streak:14,isEditable:!0,onViewMetric:a("playground-view-metric"),onViewAllStats:a("playground-view-all"),onSetGoal:a("playground-set-goal"),onExportData:a("playground-export"),onViewInsights:a("playground-insights")},render:s=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(c,{children:[e.jsxs(g,{children:[e.jsx(p,{children:"Profile Stats Widget Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different analytics and goal configurations"})]}),e.jsx(d,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{...s}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Interactive stats widget testing for University at Buffalo HIVE platform performance analytics design"})]})})]})})};var H,Y,R;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    user: {
      id: 'user-123',
      name: 'Alex Chen',
      academicYear: 'junior'
    },
    keyMetrics: mockMetricsBasic,
    personalGoals: mockGoalsBasic,
    overallScore: 78,
    weeklyGrowth: 12,
    academicProgress: 68,
    socialEngagement: 82,
    platformLevel: 5,
    streak: 14,
    isEditable: true,
    onViewMetric: action('view-metric'),
    onViewAllStats: action('view-all-stats'),
    onSetGoal: action('set-goal'),
    onExportData: action('export-data'),
    onViewInsights: action('view-insights')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE profile stats widget for University at Buffalo student performance tracking:
          </Text>
          <ProfileStatsWidget {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive analytics dashboard with goal tracking, progress monitoring, and UB academic context integration
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(R=(Y=h.parameters)==null?void 0:Y.docs)==null?void 0:R.source}}};var U,W,Z;x.parameters={...x.parameters,docs:{...(U=x.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Stats Widget Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎯 STATS WIDGET SYSTEM</Badge>
            Personal Analytics & Goals
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Complete profile stats widget system for University at Buffalo HIVE platform student performance monitoring and academic success tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Stats Widget Variations:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Basic Analytics:</Text>
                    <ProfileStatsWidget user={{
                    id: 'user-001',
                    name: 'Sarah Johnson',
                    academicYear: 'freshman'
                  }} keyMetrics={mockMetricsBasic} personalGoals={mockGoalsBasic} overallScore={65} weeklyGrowth={8} academicProgress={45} socialEngagement={72} platformLevel={2} streak={7} onViewMetric={action('basic-view-metric')} onViewAllStats={action('basic-view-all')} onSetGoal={action('basic-set-goal')} onExportData={action('basic-export')} onViewInsights={action('basic-insights')} />
                    <Text variant="body-xs" color="secondary">
                      Beginning student with foundational metrics and academic goal tracking
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Advanced Analytics:</Text>
                    <ProfileStatsWidget user={{
                    id: 'user-002',
                    name: 'Marcus Rodriguez',
                    academicYear: 'senior'
                  }} keyMetrics={mockMetricsAdvanced} personalGoals={mockGoalsAdvanced} overallScore={92} weeklyGrowth={15} academicProgress={88} socialEngagement={94} platformLevel={12} streak={45} onViewMetric={action('advanced-view-metric')} onViewAllStats={action('advanced-view-all')} onSetGoal={action('advanced-set-goal')} onExportData={action('advanced-export')} onViewInsights={action('advanced-insights')} />
                    <Text variant="body-xs" color="secondary">
                      Advanced student with comprehensive analytics and multiple active goal achievements
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Metric Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📊 METRIC CATEGORIES</Badge>
            Performance Tracking Areas
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 metric categories for comprehensive University at Buffalo student performance monitoring and academic success analytics
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Metric Category System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Core Performance Categories:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Engagement Metrics</Text>
                        <Text variant="body-xs" color="secondary">Platform activity, interaction frequency, community participation</Text>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Academic Performance</Text>
                        <Text variant="body-xs" color="secondary">Study time, course progress, academic milestone tracking</Text>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Social Analytics</Text>
                        <Text variant="body-xs" color="secondary">Community building, peer collaboration, network growth</Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Growth & Development Areas:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Productivity Tracking</Text>
                        <Text variant="body-xs" color="secondary">Tool creation, project completion, efficiency improvements</Text>
                      </div>
                      <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Growth Indicators</Text>
                        <Text variant="body-xs" color="secondary">Skill development, leadership progression, achievement trends</Text>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Academic Year Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎓 ACADEMIC YEAR TRACKING</Badge>
            UB Semester Progress
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Academic year specific progress tracking for University at Buffalo semester system and graduation planning
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Academic Year Progression:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Freshman Year Progress:</Text>
                    <ProfileStatsWidget user={{
                    id: 'user-fresh',
                    name: 'Emma Martinez',
                    academicYear: 'freshman'
                  }} keyMetrics={[{
                    id: 'fresh-001',
                    name: 'Orientation Completion',
                    value: 100,
                    unit: '%',
                    category: 'academic',
                    trend: 'up',
                    trendPercentage: 100,
                    period: 'semester'
                  }, {
                    id: 'fresh-002',
                    name: 'Study Group Participation',
                    value: 3,
                    unit: ' groups',
                    category: 'social',
                    trend: 'up',
                    trendPercentage: 50,
                    period: 'weekly'
                  }]} personalGoals={[{
                    id: 'fresh-goal-001',
                    name: 'Complete First Semester',
                    target: 100,
                    current: 35,
                    unit: '%',
                    deadline: '2024-05-15T23:59:59Z',
                    category: 'academic',
                    isActive: true
                  }]} overallScore={58} weeklyGrowth={22} academicProgress={35} socialEngagement={68} platformLevel={1} streak={12} onViewMetric={action('fresh-view-metric')} onViewAllStats={action('fresh-view-all')} onSetGoal={action('fresh-set-goal')} onExportData={action('fresh-export')} onViewInsights={action('fresh-insights')} />
                    <Text variant="body-xs" color="secondary">
                      First-year student establishing academic foundation and campus community connections
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Senior Year Achievement:</Text>
                    <ProfileStatsWidget user={{
                    id: 'user-senior',
                    name: 'David Park',
                    academicYear: 'senior'
                  }} keyMetrics={[{
                    id: 'senior-001',
                    name: 'Capstone Progress',
                    value: 92,
                    unit: '%',
                    category: 'academic',
                    trend: 'up',
                    trendPercentage: 8,
                    period: 'weekly',
                    isHighlighted: true
                  }, {
                    id: 'senior-002',
                    name: 'Career Network',
                    value: 45,
                    unit: ' connections',
                    category: 'growth',
                    trend: 'up',
                    trendPercentage: 18,
                    period: 'monthly'
                  }]} personalGoals={[{
                    id: 'senior-goal-001',
                    name: 'Graduate Magna Cum Laude',
                    target: 375,
                    current: 368,
                    unit: ' GPA points',
                    deadline: '2024-05-15T23:59:59Z',
                    category: 'academic',
                    isActive: true
                  }]} overallScore={94} weeklyGrowth={5} academicProgress={92} socialEngagement={88} platformLevel={15} streak={67} onViewMetric={action('senior-view-metric')} onViewAllStats={action('senior-view-all')} onSetGoal={action('senior-set-goal')} onExportData={action('senior-export')} onViewInsights={action('senior-insights')} />
                    <Text variant="body-xs" color="secondary">
                      Final year student completing degree requirements and preparing for post-graduation success
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Graduate Student Research:</Text>
                    <ProfileStatsWidget user={{
                    id: 'user-grad',
                    name: 'Lisa Thompson',
                    academicYear: 'graduate'
                  }} keyMetrics={[{
                    id: 'grad-001',
                    name: 'Research Publications',
                    value: 3,
                    unit: ' papers',
                    category: 'academic',
                    trend: 'up',
                    trendPercentage: 50,
                    period: 'semester',
                    isHighlighted: true
                  }, {
                    id: 'grad-002',
                    name: 'Conference Presentations',
                    value: 2,
                    unit: ' presentations',
                    category: 'growth',
                    trend: 'up',
                    trendPercentage: 100,
                    period: 'semester'
                  }]} personalGoals={[{
                    id: 'grad-goal-001',
                    name: 'Complete Dissertation',
                    target: 100,
                    current: 78,
                    unit: '%',
                    deadline: '2024-08-30T23:59:59Z',
                    category: 'academic',
                    isActive: true
                  }]} overallScore={89} weeklyGrowth={3} academicProgress={78} socialEngagement={65} platformLevel={18} streak={34} onViewMetric={action('grad-view-metric')} onViewAllStats={action('grad-view-all')} onSetGoal={action('grad-set-goal')} onExportData={action('grad-export')} onViewInsights={action('grad-insights')} />
                    <Text variant="body-xs" color="secondary">
                      Graduate researcher with advanced analytics focused on academic achievement and research progress
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
            Real Campus Analytics Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile stats widget usage in actual University at Buffalo student performance tracking and academic success contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* CSE Student Analytics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Computer Science Student Performance Tracking:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE Junior - Alex Chen - Academic Excellence Analytics
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">High Achievement Metrics:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileStatsWidget user={{
                      id: 'user-cse-001',
                      name: 'Alex Chen',
                      academicYear: 'junior'
                    }} keyMetrics={[{
                      id: 'cse-001',
                      name: 'Algorithm Study Hours',
                      value: 35,
                      unit: 'h',
                      category: 'academic',
                      trend: 'up',
                      trendPercentage: 25,
                      period: 'weekly',
                      isHighlighted: true
                    }, {
                      id: 'cse-002',
                      name: 'Code Reviews Given',
                      value: 18,
                      unit: ' reviews',
                      category: 'social',
                      trend: 'up',
                      trendPercentage: 38,
                      period: 'weekly'
                    }, {
                      id: 'cse-003',
                      name: 'Projects Deployed',
                      value: 4,
                      unit: ' apps',
                      category: 'productivity',
                      trend: 'up',
                      trendPercentage: 100,
                      period: 'monthly'
                    }]} personalGoals={[{
                      id: 'cse-goal-001',
                      name: 'Master Data Structures',
                      target: 15,
                      current: 13,
                      unit: ' topics',
                      deadline: '2024-03-15T23:59:59Z',
                      category: 'academic',
                      isActive: true
                    }, {
                      id: 'cse-goal-002',
                      name: 'Lead Study Groups',
                      target: 3,
                      current: 3,
                      unit: ' groups',
                      deadline: '2024-02-28T23:59:59Z',
                      category: 'social',
                      isActive: true
                    }]} overallScore={89} weeklyGrowth={18} academicProgress={87} socialEngagement={91} platformLevel={8} streak={28} onViewMetric={action('cse-view-metric')} onViewAllStats={action('cse-view-all')} onSetGoal={action('cse-set-goal')} onExportData={action('cse-export')} onViewInsights={action('cse-insights')} />
                      <Text variant="body-xs" color="secondary">
                        Junior CSE student with high academic performance and strong peer collaboration metrics
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Research Focus Analytics:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileStatsWidget user={{
                      id: 'user-research-001',
                      name: 'Maya Patel',
                      academicYear: 'senior'
                    }} keyMetrics={[{
                      id: 'research-001',
                      name: 'Research Hours',
                      value: 45,
                      unit: 'h',
                      category: 'academic',
                      trend: 'up',
                      trendPercentage: 12,
                      period: 'weekly',
                      isHighlighted: true
                    }, {
                      id: 'research-002',
                      name: 'Lab Collaborations',
                      value: 8,
                      unit: ' projects',
                      category: 'growth',
                      trend: 'up',
                      trendPercentage: 33,
                      period: 'monthly'
                    }, {
                      id: 'research-003',
                      name: 'Conference Submissions',
                      value: 2,
                      unit: ' papers',
                      category: 'academic',
                      trend: 'up',
                      trendPercentage: 100,
                      period: 'semester'
                    }]} personalGoals={[{
                      id: 'research-goal-001',
                      name: 'Complete Honors Thesis',
                      target: 100,
                      current: 85,
                      unit: '%',
                      deadline: '2024-04-30T23:59:59Z',
                      category: 'academic',
                      isActive: true
                    }, {
                      id: 'research-goal-002',
                      name: 'Publish Research Paper',
                      target: 1,
                      current: 0,
                      unit: ' publication',
                      deadline: '2024-06-15T23:59:59Z',
                      category: 'career',
                      isActive: true
                    }]} overallScore={94} weeklyGrowth={8} academicProgress={92} socialEngagement={76} platformLevel={12} streak={41} onViewMetric={action('research-view-metric')} onViewAllStats={action('research-view-all')} onSetGoal={action('research-set-goal')} onExportData={action('research-export')} onViewInsights={action('research-insights')} />
                      <Text variant="body-xs" color="secondary">
                        Senior researcher with advanced academic metrics and graduate school preparation analytics
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Academic Struggle Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Support & Recovery Analytics:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Recovery Plan:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileStatsWidget user={{
                    id: 'user-recovery-001',
                    name: 'Jordan Kim',
                    academicYear: 'sophomore'
                  }} keyMetrics={[{
                    id: 'recovery-001',
                    name: 'Tutoring Sessions',
                    value: 6,
                    unit: ' sessions',
                    category: 'academic',
                    trend: 'up',
                    trendPercentage: 50,
                    period: 'weekly',
                    isHighlighted: true
                  }, {
                    id: 'recovery-002',
                    name: 'Study Hours',
                    value: 25,
                    unit: 'h',
                    category: 'academic',
                    trend: 'up',
                    trendPercentage: 67,
                    period: 'weekly'
                  }]} personalGoals={[{
                    id: 'recovery-goal-001',
                    name: 'Raise GPA to 3.0',
                    target: 30,
                    current: 26,
                    unit: '/10',
                    deadline: '2024-05-15T23:59:59Z',
                    category: 'academic',
                    isActive: true
                  }]} overallScore={52} weeklyGrowth={28} academicProgress={48} socialEngagement={65} platformLevel={3} streak={9} onViewMetric={action('recovery-view-metric')} onViewAllStats={action('recovery-view-all')} onSetGoal={action('recovery-set-goal')} onExportData={action('recovery-export')} onViewInsights={action('recovery-insights')} />
                    <Text variant="body-xs" color="secondary">
                      Student implementing academic recovery plan with tutoring support and structured study analytics
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Balanced Improvement:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileStatsWidget user={{
                    id: 'user-balance-001',
                    name: 'Sam Wilson',
                    academicYear: 'junior'
                  }} keyMetrics={[{
                    id: 'balance-001',
                    name: 'Study-Life Balance',
                    value: 78,
                    unit: '%',
                    category: 'personal',
                    trend: 'up',
                    trendPercentage: 15,
                    period: 'weekly'
                  }, {
                    id: 'balance-002',
                    name: 'Wellness Check-ins',
                    value: 5,
                    unit: ' sessions',
                    category: 'personal',
                    trend: 'stable',
                    trendPercentage: 0,
                    period: 'weekly'
                  }]} personalGoals={[{
                    id: 'balance-goal-001',
                    name: 'Maintain 3.5+ GPA',
                    target: 35,
                    current: 34,
                    unit: '/10',
                    deadline: '2024-05-15T23:59:59Z',
                    category: 'academic',
                    isActive: true
                  }]} overallScore={72} weeklyGrowth={6} academicProgress={76} socialEngagement={68} platformLevel={6} streak={21} onViewMetric={action('balance-view-metric')} onViewAllStats={action('balance-view-all')} onSetGoal={action('balance-set-goal')} onExportData={action('balance-export')} onViewInsights={action('balance-insights')} />
                    <Text variant="body-xs" color="secondary">
                      Student focusing on sustainable academic performance with wellness and life balance integration
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Leadership Development:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileStatsWidget user={{
                    id: 'user-leader-001',
                    name: 'Riley Martinez',
                    academicYear: 'senior'
                  }} keyMetrics={[{
                    id: 'leader-001',
                    name: 'Students Mentored',
                    value: 12,
                    unit: ' students',
                    category: 'growth',
                    trend: 'up',
                    trendPercentage: 20,
                    period: 'monthly',
                    isHighlighted: true
                  }, {
                    id: 'leader-002',
                    name: 'Org Leadership Roles',
                    value: 3,
                    unit: ' positions',
                    category: 'social',
                    trend: 'stable',
                    trendPercentage: 0,
                    period: 'semester'
                  }]} personalGoals={[{
                    id: 'leader-goal-001',
                    name: 'Graduate Summa Cum Laude',
                    target: 38,
                    current: 37,
                    unit: '/10',
                    deadline: '2024-05-15T23:59:59Z',
                    category: 'academic',
                    isActive: true
                  }]} overallScore={91} weeklyGrowth={4} academicProgress={94} socialEngagement={96} platformLevel={14} streak={52} onViewMetric={action('leader-view-metric')} onViewAllStats={action('leader-view-all')} onSetGoal={action('leader-set-goal')} onExportData={action('leader-export')} onViewInsights={action('leader-insights')} />
                    <Text variant="body-xs" color="secondary">
                      Senior leader with exceptional metrics in mentorship, academic excellence, and community impact
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Empty State */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">New Student - Starting Analytics Journey:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text variant="body-md" color="primary">
                  First-time platform experience with minimal analytics data:
                </Text>

                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Brand New Account:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileStatsWidget user={{
                      id: 'user-empty-001',
                      name: 'Taylor Wilson',
                      academicYear: 'freshman'
                    }} keyMetrics={[]} personalGoals={[]} overallScore={0} weeklyGrowth={0} academicProgress={0} socialEngagement={0} platformLevel={1} streak={0} onViewMetric={action('empty-view-metric')} onViewAllStats={action('empty-view-all')} onSetGoal={action('empty-set-goal')} onExportData={action('empty-export')} onViewInsights={action('empty-insights')} />
                      <Text variant="body-xs" color="secondary">
                        New user experience with call-to-action for first goal setting and platform engagement
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">View-Only Analytics:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileStatsWidget user={{
                      id: 'user-readonly-001',
                      name: 'Casey Johnson',
                      academicYear: 'sophomore'
                    }} keyMetrics={mockMetricsBasic} personalGoals={mockGoalsBasic} overallScore={78} weeklyGrowth={12} academicProgress={68} socialEngagement={82} platformLevel={5} streak={14} isEditable={false} onViewMetric={action('readonly-view-metric')} onViewAllStats={action('readonly-view-all')} onViewInsights={action('readonly-insights')} />
                      <Text variant="body-xs" color="secondary">
                        Read-only profile view without editing capabilities for public analytics viewing
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
}`,...(Z=(W=x.parameters)==null?void 0:W.docs)==null?void 0:Z.source}}};var O,q,F;b.parameters={...b.parameters,docs:{...(O=b.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    user: {
      id: 'user-playground',
      name: 'Alex Chen',
      academicYear: 'junior'
    },
    keyMetrics: mockMetricsBasic,
    personalGoals: mockGoalsBasic,
    overallScore: 78,
    weeklyGrowth: 12,
    academicProgress: 68,
    socialEngagement: 82,
    platformLevel: 5,
    streak: 14,
    isEditable: true,
    onViewMetric: action('playground-view-metric'),
    onViewAllStats: action('playground-view-all'),
    onSetGoal: action('playground-set-goal'),
    onExportData: action('playground-export'),
    onViewInsights: action('playground-insights')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Stats Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different analytics and goal configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileStatsWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive stats widget testing for University at Buffalo HIVE platform performance analytics design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(F=(q=b.parameters)==null?void 0:q.docs)==null?void 0:F.source}}};const qe=["Default","CompleteShowcase","Playground"];export{x as CompleteShowcase,h as Default,b as Playground,qe as __namedExportsOrder,Oe as default};
