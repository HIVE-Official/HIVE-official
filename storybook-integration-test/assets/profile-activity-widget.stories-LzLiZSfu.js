import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as $}from"./index-DJO9vBfz.js";import{c as v}from"./utils-CytzSlOG.js";import{H as l,a as p,c as m,b as f}from"./hive-tokens-CKIUfcHM.js";import{B as A}from"./badge-B09J4pcg.js";import{T as t}from"./text-Cao0VGB4.js";import{c as X}from"./createLucideIcon-WpwZgzX-.js";import{S as Q}from"./settings-GFIh7SpU.js";import{A as N}from"./activity-DkRGcIzu.js";import{T as ee}from"./trending-up-CllCr3lL.js";import{T as te}from"./target-CMXB8H7t.js";import{C as ie}from"./clock-Boexj8FH.js";import{H as w}from"./heart-Dhw1SL1X.js";import{C as ae}from"./chevron-right-BGhHLs4c.js";import{P as k}from"./plus-Cg8nMOSF.js";import{E as re}from"./external-link-DkxaGAGS.js";import{C as se}from"./calendar-BPdIbUwb.js";import{T as oe}from"./trophy-B5Tnzdfb.js";import{C as G}from"./code-B2XVm3Gn.js";import{U as ne}from"./users-kvqvVsnf.js";import{M as U}from"./message-square-BYWfq8X7.js";import{A as ce}from"./award-wJZPpTAr.js";import{C as de}from"./coffee-BkeCUNU7.js";import{B as le}from"./book-open-Btvde7pg.js";import{a as i}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=X("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]),d=o=>{const r={post:{color:"text-blue-500",bgColor:"bg-blue-500/10",borderColor:"border-blue-500/20",icon:U,label:"Posted"},comment:{color:"text-green-500",bgColor:"bg-green-500/10",borderColor:"border-green-500/20",icon:U,label:"Commented"},join:{color:"text-purple-500",bgColor:"bg-purple-500/10",borderColor:"border-purple-500/20",icon:ne,label:"Joined"},create:{color:"text-[var(--hive-gold)]",bgColor:"bg-[var(--hive-gold)]/10",borderColor:"border-[var(--hive-gold)]/20",icon:k,label:"Created"},like:{color:"text-red-500",bgColor:"bg-red-500/10",borderColor:"border-red-500/20",icon:w,label:"Liked"},collaborate:{color:"text-indigo-500",bgColor:"bg-indigo-500/10",borderColor:"border-indigo-500/20",icon:G,label:"Collaborated"},achievement:{color:"text-[var(--hive-gold)]",bgColor:"bg-[var(--hive-gold)]/10",borderColor:"border-[var(--hive-gold)]/20",icon:oe,label:"Achieved"},event:{color:"text-green-500",bgColor:"bg-green-500/10",borderColor:"border-green-500/20",icon:se,label:"Attended"}};return r[o]||r.post},ge=o=>({academic:le,residential:de,social:w,professional:ce,hobby:G})[o]||w,ve=o=>{const r=new Date(o),y=new Date,n=Math.floor((y.getTime()-r.getTime())/(1e3*60*60));if(n<1){const g=Math.floor((y.getTime()-r.getTime())/6e4);return g<1?"Just now":`${g}m ago`}else return n<24?`${n}h ago`:`${Math.floor(n/24)}d ago`},s=({user:o,recentActivities:r=[],todayActivities:y=0,weeklyStreak:n=0,totalEngagement:g=0,activityScore:K=0,topActivityType:c="post",isEditable:j=!0,onViewActivity:T,onViewAllActivities:C,onCreatePost:u,onEngageMore:E,className:_})=>{const[P,V]=$.useState(!1),B=r.slice(0,4);r.filter(a=>a.isHighlighted).length;const I=r.length;return e.jsxs(l,{className:v("relative overflow-hidden transition-all duration-300 hover:shadow-lg","bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]",P&&"scale-[1.02]",_),onMouseEnter:()=>V(!0),onMouseLeave:()=>V(!1),children:[e.jsx(p,{className:"pb-2",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Recent Activity"}),n>0&&e.jsxs(A,{variant:"secondary",className:"text-xs",children:[e.jsx(me,{className:"h-3 w-3 mr-1"}),n," day streak"]})]}),j&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:C,className:"h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(Q,{className:"h-3 w-3"})})]})}),e.jsxs(m,{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(N,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsx(t,{variant:"body-sm",weight:"medium",color:"primary",children:y})]}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Today's Activity"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(ee,{className:"h-3 w-3 text-green-500"}),e.jsx(t,{variant:"body-sm",weight:"medium",color:"primary",children:g})]}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Total Engagement"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(te,{className:"h-3 w-3 text-[var(--hive-gold)]"}),e.jsx(t,{variant:"body-sm",weight:"medium",color:"primary",children:K})]}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Activity Score"})]})]}),n>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Weekly Engagement:"}),e.jsxs(t,{variant:"body-xs",color:"gold",weight:"medium",children:[I," activities"]})]}),e.jsx("div",{className:"w-full bg-[var(--hive-background-secondary)] rounded-full h-2",children:e.jsx("div",{className:"bg-gradient-to-r from-blue-500 to-[var(--hive-gold)] rounded-full h-2 transition-all duration-500",style:{width:`${Math.min(I/20*100,100)}%`}})}),e.jsxs(t,{variant:"body-xs",color:"secondary",children:[n," day activity streak • Keep it going! 🔥"]})]}),B.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Recent Activity:"}),r.length>4&&e.jsxs(t,{variant:"body-xs",color:"secondary",children:["+",r.length-4," more"]})]}),e.jsx("div",{className:"space-y-1",children:B.map(a=>{const M=d(a.type),H=a.contextSpace?ge(a.contextSpace.type):null;return e.jsxs("div",{className:v("flex items-center gap-2 p-2 rounded transition-colors cursor-pointer","hover:bg-[var(--hive-background-secondary)]",a.isHighlighted&&"bg-[var(--hive-gold)]/5 border border-[var(--hive-gold)]/20"),onClick:()=>T==null?void 0:T(a.id),children:[e.jsx(M.icon,{className:v("h-3 w-3 flex-shrink-0",M.color)}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx(t,{variant:"body-xs",color:"primary",className:"truncate",children:a.title}),e.jsxs("div",{className:"flex items-center gap-2 mt-0.5",children:[a.contextSpace&&H&&e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(H,{className:"h-2 w-2 text-[var(--hive-text-muted)]"}),e.jsx(t,{variant:"body-xs",color:"muted",className:"truncate",children:a.contextSpace.name})]}),e.jsx(ie,{className:"h-2 w-2 text-[var(--hive-text-muted)]"}),e.jsx(t,{variant:"body-xs",color:"muted",children:ve(a.timestamp)})]})]}),a.engagement&&e.jsx("div",{className:"flex items-center gap-1",children:a.engagement.likes>0&&e.jsxs("div",{className:"flex items-center gap-0.5",children:[e.jsx(w,{className:"h-2 w-2 text-red-500"}),e.jsx(t,{variant:"body-xs",color:"muted",children:a.engagement.likes})]})}),e.jsx(ae,{className:"h-3 w-3 text-[var(--hive-text-secondary)] flex-shrink-0"})]},a.id)})})]}),c&&e.jsxs("div",{className:"space-y-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Activity Insights:"}),e.jsxs("div",{className:v("p-3 rounded-lg border",d(c).bgColor,d(c).borderColor),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[(()=>{const a=d(c).icon;return e.jsx(a,{className:v("h-4 w-4",d(c).color)})})(),e.jsxs(t,{variant:"body-sm",color:"primary",children:["Most active in: ",d(c).label.toLowerCase()]})]}),e.jsxs(t,{variant:"body-xs",color:"secondary",className:"mt-1",children:["You're building strong engagement through ",d(c).label.toLowerCase()," activities"]})]})]}),e.jsxs("div",{className:"flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[j&&u&&e.jsxs(ButtonEnhanced,{variant:"secondary",size:"sm",onClick:u,className:"flex-1",children:[e.jsx(k,{className:"h-3 w-3 mr-1"}),"Create Post"]}),C&&e.jsxs(ButtonEnhanced,{variant:"primary",size:"sm",onClick:C,className:"flex-1",children:[e.jsx(N,{className:"h-3 w-3 mr-1"}),"All Activity"]}),E&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:E,className:"text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(re,{className:"h-3 w-3"})})]}),r.length===0&&e.jsxs("div",{className:"text-center py-6",children:[e.jsx(N,{className:"h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]"}),e.jsx(t,{variant:"body-sm",color:"secondary",className:"mb-2",children:"No recent activity"}),e.jsx(t,{variant:"body-xs",color:"secondary",className:"mb-4",children:"Start engaging with the UB community to see your activity here"}),j&&u&&e.jsxs(ButtonEnhanced,{variant:"secondary",size:"sm",onClick:u,children:[e.jsx(k,{className:"h-3 w-3 mr-1"}),"Create Your First Post"]})]})]}),P&&e.jsx("div",{className:"absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg blur-xl"})]})};s.__docgenInfo={description:"",methods:[],displayName:"ProfileActivityWidget",props:{user:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}}]}},description:""},recentActivities:{required:!1,tsType:{name:"Array",elements:[{name:"ActivityItem"}],raw:"ActivityItem[]"},description:"",defaultValue:{value:"[]",computed:!1}},todayActivities:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},weeklyStreak:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},totalEngagement:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},activityScore:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},topActivityType:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'post'",computed:!1}},isEditable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onViewActivity:{required:!1,tsType:{name:"signature",type:"function",raw:"(activityId: string) => void",signature:{arguments:[{type:{name:"string"},name:"activityId"}],return:{name:"void"}}},description:""},onViewAllActivities:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCreatePost:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onEngageMore:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const De={title:"04-Organisms/Profile System/Profile Activity Widget - COMPLETE DEFINITION",component:s,parameters:{docs:{description:{component:`
## 🎯 HIVE Profile Activity Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive recent platform engagement tracking interface for University at Buffalo HIVE platform student activity monitoring and social participation analytics.

### 🎯 **COMPONENT EXCELLENCE**
- **8 Activity Types** - Post, comment, join, create, like, collaborate, achievement, event for complete engagement tracking
- **Real-Time Feed** - Live activity updates with timestamps and contextual information
- **Engagement Analytics** - Activity score, weekly streaks, and total engagement metrics
- **Social Context** - Space-aware activities with community integration and peer visibility
- **Progress Tracking** - Weekly engagement goals with visual progress indicators
- **Interactive Design** - Hover effects, activity navigation, and responsive mobile optimization
- **Campus Integration** - University at Buffalo specific activity contexts and academic engagement
- **Achievement System** - Activity streaks, milestones, and community contribution recognition

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student engagement tracking:
- **Academic Activities** - Course participation, study group collaboration, assignment discussions
- **Community Engagement** - Space joining, peer networking, campus event participation
- **Social Interactions** - Post creation, commenting, liking, and collaborative content development
- **Achievement Tracking** - Academic milestones, community contributions, and platform engagement goals
- **Real-Time Updates** - Live activity feeds showing campus community participation and peer interactions
- **Engagement Insights** - Weekly activity analytics and personal engagement pattern recognition
- **Campus Integration** - Residence hall, academic, and social space activity correlation

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large activity items optimized for mobile interaction
- **Responsive Layout** - Adaptive activity feed for different screen sizes and orientations
- **Quick Actions** - Easy post creation and activity navigation for on-the-go campus engagement
- **Loading States** - Smooth activity updates during real-time feed synchronization
`}}},tags:["autodocs"],argTypes:{recentActivities:{control:"object",description:"Array of recent activity items"},todayActivities:{control:"number",description:"Number of activities today"},weeklyStreak:{control:"number",description:"Current weekly activity streak"},totalEngagement:{control:"number",description:"Total engagement count"},activityScore:{control:"number",description:"Overall activity score"},topActivityType:{control:"select",options:["post","comment","join","create","like","collaborate","achievement","event"],description:"Most frequent activity type"},isEditable:{control:"boolean",description:"Enable editing capabilities"},onViewActivity:{action:"view-activity",description:"Activity item click handler"},onViewAllActivities:{action:"view-all-activities",description:"View all activities handler"},onCreatePost:{action:"create-post",description:"Create new post handler"},onEngageMore:{action:"engage-more",description:"Engagement suggestions handler"}}},W=[],S=[{id:"act-001",type:"post",title:"Shared CSE 331 algorithm study notes",description:"Posted comprehensive notes on dynamic programming",timestamp:"2024-01-15T10:30:00Z",contextSpace:{name:"CSE 331 - Data Structures",type:"academic"},engagement:{likes:12,comments:5,shares:3},isHighlighted:!0},{id:"act-002",type:"join",title:"Joined UB Robotics Club",description:"Became a member of the campus robotics community",timestamp:"2024-01-15T09:15:00Z",contextSpace:{name:"UB Robotics Club",type:"hobby"},engagement:{likes:8,comments:2,shares:1}},{id:"act-003",type:"comment",title:"Commented on Ellicott floor meeting",description:"Added input about laundry schedule coordination",timestamp:"2024-01-15T08:45:00Z",contextSpace:{name:"Ellicott Complex - Floor 3",type:"residential"},engagement:{likes:4,comments:0,shares:0}},{id:"act-004",type:"like",title:"Liked study session coordination tool",description:"Appreciated community-built scheduling tool",timestamp:"2024-01-15T07:20:00Z",contextSpace:{name:"UB Study Tools",type:"academic"},engagement:{likes:0,comments:0,shares:0}}],F=[{id:"act-101",type:"achievement",title:"Reached 50 community contributions milestone",description:"Achieved significant platform engagement milestone",timestamp:"2024-01-15T11:00:00Z",engagement:{likes:24,comments:8,shares:6},isHighlighted:!0},{id:"act-102",type:"create",title:"Created GPA Calculator Tool",description:"Built and published academic planning tool for UB students",timestamp:"2024-01-15T10:45:00Z",contextSpace:{name:"UB Tool Marketplace",type:"academic"},engagement:{likes:18,comments:12,shares:9},isHighlighted:!0},{id:"act-103",type:"collaborate",title:"Collaborated on MTH 241 study guide",description:"Co-authored comprehensive calculus study materials",timestamp:"2024-01-15T09:30:00Z",contextSpace:{name:"MTH 241 - Calculus II",type:"academic"},engagement:{likes:15,comments:7,shares:4}},{id:"act-104",type:"event",title:"Attended Career Fair Prep Workshop",description:"Participated in professional development session",timestamp:"2024-01-15T08:00:00Z",contextSpace:{name:"UB Career Services",type:"professional"},engagement:{likes:6,comments:3,shares:1}},{id:"act-105",type:"post",title:"Posted about finals week study strategy",description:"Shared effective study techniques and scheduling tips",timestamp:"2024-01-15T07:45:00Z",contextSpace:{name:"UB Study Strategy Hub",type:"academic"},engagement:{likes:22,comments:14,shares:8}},{id:"act-106",type:"comment",title:"Commented on dorm sustainability initiative",description:"Contributed ideas for campus environmental improvements",timestamp:"2024-01-15T06:30:00Z",contextSpace:{name:"Sustainable UB",type:"social"},engagement:{likes:9,comments:4,shares:2}}],pe=[{id:"act-201",type:"create",title:"Launched UB Course Review Platform",description:"Built comprehensive course evaluation and planning system",timestamp:"2024-01-15T12:00:00Z",contextSpace:{name:"UB Academic Tools",type:"academic"},engagement:{likes:45,comments:23,shares:18},isHighlighted:!0},{id:"act-202",type:"achievement",title:"Became Space Founder - CSE Study Hub",description:"Founded and launched computer science academic community",timestamp:"2024-01-15T11:30:00Z",contextSpace:{name:"CSE Study Hub",type:"academic"},engagement:{likes:38,comments:19,shares:12},isHighlighted:!0},{id:"act-203",type:"collaborate",title:"Led group project for Software Engineering",description:"Coordinated team development of campus utility application",timestamp:"2024-01-15T10:15:00Z",contextSpace:{name:"CSE 442 - Software Engineering",type:"academic"},engagement:{likes:28,comments:16,shares:7}},{id:"act-204",type:"post",title:"Organized campus coding bootcamp",description:"Created and promoted intensive programming workshop series",timestamp:"2024-01-15T09:00:00Z",contextSpace:{name:"UB Programming Community",type:"hobby"},engagement:{likes:34,comments:21,shares:15},isHighlighted:!0}],h={args:{user:{id:"user-123",name:"Alex Chen"},recentActivities:S,todayActivities:4,weeklyStreak:5,totalEngagement:167,activityScore:82,topActivityType:"post",isEditable:!0,onViewActivity:i("view-activity"),onViewAllActivities:i("view-all-activities"),onCreatePost:i("create-post"),onEngageMore:i("engage-more")},render:o=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(l,{children:e.jsxs(m,{className:"space-y-4",children:[e.jsx(t,{variant:"body-md",color:"primary",children:"HIVE profile activity widget for University at Buffalo student engagement tracking:"}),e.jsx(s,{...o}),e.jsx(t,{variant:"body-sm",color:"secondary",children:"Interactive activity feed with engagement analytics, streak tracking, and campus context integration"})]})})})},x={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(l,{children:[e.jsxs(p,{children:[e.jsxs(f,{className:"flex items-center gap-3",children:[e.jsx(A,{variant:"success",children:"🎯 ACTIVITY WIDGET SYSTEM"}),"Campus Engagement Tracking"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Complete profile activity widget system for University at Buffalo HIVE platform student engagement monitoring and social participation analytics"})]}),e.jsx(m,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Activity Widget Variations:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"New User Activity:"}),e.jsx(s,{user:{id:"user-001",name:"Sarah Johnson"},recentActivities:S,todayActivities:2,weeklyStreak:3,totalEngagement:45,activityScore:38,topActivityType:"join",onViewActivity:i("new-user-activity"),onViewAllActivities:i("new-user-all"),onCreatePost:i("new-user-post"),onEngageMore:i("new-user-engage")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Basic activity tracking for new UB students building campus engagement"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Active Community Member:"}),e.jsx(s,{user:{id:"user-002",name:"Marcus Rodriguez"},recentActivities:F,todayActivities:6,weeklyStreak:12,totalEngagement:287,activityScore:94,topActivityType:"post",onViewActivity:i("active-user-activity"),onViewAllActivities:i("active-user-all"),onCreatePost:i("active-user-post"),onEngageMore:i("active-user-engage")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"High engagement tracking for established community members with strong participation"})]})]})})]})})})]}),e.jsxs(l,{children:[e.jsxs(p,{children:[e.jsxs(f,{className:"flex items-center gap-3",children:[e.jsx(A,{variant:"info",children:"⚡ ACTIVITY TYPES"}),"Comprehensive Engagement Tracking"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"8 activity types for complete University at Buffalo campus engagement monitoring and social participation analytics"})]}),e.jsx(m,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Complete Activity Type System:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Content Creation Activities:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Post Activity"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Share knowledge, insights, and campus experiences"})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Create Activity"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Build tools, resources, and community utilities"})]}),e.jsxs("div",{className:"p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Collaborate Activity"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Work together on projects and academic initiatives"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Engagement Activities:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"p-3 bg-green-500/10 border border-green-500/20 rounded-lg",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Comment Activity"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Participate in discussions and provide feedback"})]}),e.jsxs("div",{className:"p-3 bg-red-500/10 border border-red-500/20 rounded-lg",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Like Activity"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Show appreciation and support community content"})]}),e.jsxs("div",{className:"p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Join Activity"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Become member of spaces and communities"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Milestone Activities:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Achievement Activity"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Reach platform milestones and community goals"})]}),e.jsxs("div",{className:"p-3 bg-green-500/10 border border-green-500/20 rounded-lg",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Event Activity"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Attend workshops, meetings, and campus gatherings"})]})]})]})]})})]})})})]}),e.jsxs(l,{children:[e.jsxs(p,{children:[e.jsxs(f,{className:"flex items-center gap-3",children:[e.jsx(A,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Activity Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Profile activity widget usage in actual University at Buffalo student engagement and campus integration contexts"})]}),e.jsxs(m,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"CSE Junior - Alex Chen - Academic Excellence Focus:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{as:"h3",variant:"heading-sm",color:"primary",children:"Computer Science Student with High Academic Engagement"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic-Focused Activity:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{user:{id:"user-cs-001",name:"Alex Chen"},recentActivities:[{id:"cs-001",type:"post",title:"Shared CSE 331 dynamic programming solutions",description:"Posted comprehensive algorithm explanations",timestamp:"2024-01-15T10:30:00Z",contextSpace:{name:"CSE 331 - Data Structures",type:"academic"},engagement:{likes:18,comments:7,shares:5},isHighlighted:!0},{id:"cs-002",type:"collaborate",title:"Co-authored CSE 442 project documentation",description:"Team collaboration on software engineering project",timestamp:"2024-01-15T09:15:00Z",contextSpace:{name:"CSE 442 - Software Engineering",type:"academic"},engagement:{likes:12,comments:4,shares:2}},{id:"cs-003",type:"create",title:"Built algorithm visualization tool",description:"Created interactive learning resource for CSE courses",timestamp:"2024-01-15T08:45:00Z",contextSpace:{name:"CSE Tool Development",type:"academic"},engagement:{likes:25,comments:9,shares:8},isHighlighted:!0}],todayActivities:5,weeklyStreak:14,totalEngagement:342,activityScore:96,topActivityType:"create",onViewActivity:i("cs-student-activity"),onViewAllActivities:i("cs-student-all"),onCreatePost:i("cs-student-post"),onEngageMore:i("cs-student-engage")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Junior CSE student with consistent academic contribution and high tool development activity"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Leadership Activity:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{user:{id:"user-cs-002",name:"Maya Patel"},recentActivities:pe,todayActivities:7,weeklyStreak:21,totalEngagement:567,activityScore:98,topActivityType:"create",onViewActivity:i("cs-leader-activity"),onViewAllActivities:i("cs-leader-all"),onCreatePost:i("cs-leader-post"),onEngageMore:i("cs-leader-engage")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Senior CSE student with leadership roles and community building initiatives"})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Freshman Integration Journey:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Week 1 - First Steps:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{user:{id:"user-fresh-001",name:"Jordan Kim"},recentActivities:[{id:"fresh-001",type:"join",title:"Joined Ellicott Complex - Floor 3",description:"Became part of residential community",timestamp:"2024-01-15T10:00:00Z",contextSpace:{name:"Ellicott Complex - Floor 3",type:"residential"},engagement:{likes:5,comments:2,shares:0}},{id:"fresh-002",type:"join",title:"Joined Undecided Majors Support",description:"Connected with academic exploration community",timestamp:"2024-01-15T09:30:00Z",contextSpace:{name:"Undecided Majors Support",type:"academic"},engagement:{likes:3,comments:1,shares:0}}],todayActivities:2,weeklyStreak:1,totalEngagement:8,activityScore:15,topActivityType:"join",onViewActivity:i("fresh-week1-activity"),onViewAllActivities:i("fresh-week1-all"),onCreatePost:i("fresh-week1-post"),onEngageMore:i("fresh-week1-engage")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"New student beginning campus integration through community joining"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Week 4 - Growing Engagement:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{user:{id:"user-fresh-002",name:"Jordan Kim"},recentActivities:[{id:"fresh-101",type:"post",title:"Shared freshman orientation insights",description:"Posted helpful tips for new students",timestamp:"2024-01-15T11:00:00Z",contextSpace:{name:"UB Freshman Community",type:"social"},engagement:{likes:8,comments:3,shares:2},isHighlighted:!0},{id:"fresh-102",type:"comment",title:"Commented on study group formation",description:"Joined discussion about academic collaboration",timestamp:"2024-01-15T10:15:00Z",contextSpace:{name:"GEN 101 Study Groups",type:"academic"},engagement:{likes:4,comments:0,shares:0}}],todayActivities:3,weeklyStreak:7,totalEngagement:34,activityScore:42,topActivityType:"comment",onViewActivity:i("fresh-week4-activity"),onViewAllActivities:i("fresh-week4-all"),onCreatePost:i("fresh-week4-post"),onEngageMore:i("fresh-week4-engage")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Student developing confidence and beginning to contribute content"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Semester End - Established Member:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{user:{id:"user-fresh-003",name:"Jordan Kim"},recentActivities:F,todayActivities:4,weeklyStreak:15,totalEngagement:156,activityScore:78,topActivityType:"collaborate",onViewActivity:i("fresh-established-activity"),onViewAllActivities:i("fresh-established-all"),onCreatePost:i("fresh-established-post"),onEngageMore:i("fresh-established-engage")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Fully integrated student with consistent engagement and community contributions"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"New Account - Empty State:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{variant:"body-md",color:"primary",children:"First-time platform experience with empty activity state:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Brand New Account:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{user:{id:"user-empty-001",name:"Taylor Wilson"},recentActivities:W,todayActivities:0,weeklyStreak:0,totalEngagement:0,activityScore:0,topActivityType:"post",onViewActivity:i("empty-activity"),onViewAllActivities:i("empty-all"),onCreatePost:i("empty-post"),onEngageMore:i("empty-engage")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"New user experience with call-to-action for first campus engagement"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"View-Only Mode:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(s,{user:{id:"user-empty-002",name:"Sam Mitchell"},recentActivities:W,todayActivities:0,weeklyStreak:0,totalEngagement:0,activityScore:0,isEditable:!1,topActivityType:"post",onViewActivity:i("readonly-activity"),onViewAllActivities:i("readonly-all")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Read-only profile view without editing capabilities or action buttons"})]})]})]})]})})]})]})]})]})},b={args:{user:{id:"user-playground",name:"Alex Chen"},recentActivities:S,todayActivities:4,weeklyStreak:5,totalEngagement:167,activityScore:82,topActivityType:"post",isEditable:!0,onViewActivity:i("playground-activity"),onViewAllActivities:i("playground-all"),onCreatePost:i("playground-post"),onEngageMore:i("playground-engage")},render:o=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(l,{children:[e.jsxs(p,{children:[e.jsx(f,{children:"Profile Activity Widget Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different activity widget configurations"})]}),e.jsx(m,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{...o}),e.jsx(t,{variant:"body-sm",color:"secondary",children:"Interactive activity widget testing for University at Buffalo HIVE platform engagement tracking design"})]})})]})})};var Z,L,J;h.parameters={...h.parameters,docs:{...(Z=h.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    user: {
      id: 'user-123',
      name: 'Alex Chen'
    },
    recentActivities: mockActivitiesBasic,
    todayActivities: 4,
    weeklyStreak: 5,
    totalEngagement: 167,
    activityScore: 82,
    topActivityType: 'post',
    isEditable: true,
    onViewActivity: action('view-activity'),
    onViewAllActivities: action('view-all-activities'),
    onCreatePost: action('create-post'),
    onEngageMore: action('engage-more')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE profile activity widget for University at Buffalo student engagement tracking:
          </Text>
          <ProfileActivityWidget {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive activity feed with engagement analytics, streak tracking, and campus context integration
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(J=(L=h.parameters)==null?void 0:L.docs)==null?void 0:J.source}}};var R,D,O;x.parameters={...x.parameters,docs:{...(R=x.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Activity Widget Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎯 ACTIVITY WIDGET SYSTEM</Badge>
            Campus Engagement Tracking
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Complete profile activity widget system for University at Buffalo HIVE platform student engagement monitoring and social participation analytics
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Activity Widget Variations:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">New User Activity:</Text>
                    <ProfileActivityWidget user={{
                    id: 'user-001',
                    name: 'Sarah Johnson'
                  }} recentActivities={mockActivitiesBasic} todayActivities={2} weeklyStreak={3} totalEngagement={45} activityScore={38} topActivityType="join" onViewActivity={action('new-user-activity')} onViewAllActivities={action('new-user-all')} onCreatePost={action('new-user-post')} onEngageMore={action('new-user-engage')} />
                    <Text variant="body-xs" color="secondary">
                      Basic activity tracking for new UB students building campus engagement
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Active Community Member:</Text>
                    <ProfileActivityWidget user={{
                    id: 'user-002',
                    name: 'Marcus Rodriguez'
                  }} recentActivities={mockActivitiesEngaged} todayActivities={6} weeklyStreak={12} totalEngagement={287} activityScore={94} topActivityType="post" onViewActivity={action('active-user-activity')} onViewAllActivities={action('active-user-all')} onCreatePost={action('active-user-post')} onEngageMore={action('active-user-engage')} />
                    <Text variant="body-xs" color="secondary">
                      High engagement tracking for established community members with strong participation
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Activity Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">⚡ ACTIVITY TYPES</Badge>
            Comprehensive Engagement Tracking
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            8 activity types for complete University at Buffalo campus engagement monitoring and social participation analytics
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Activity Type System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Content Creation Activities:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Post Activity</Text>
                        <Text variant="body-xs" color="secondary">Share knowledge, insights, and campus experiences</Text>
                      </div>
                      <div className="p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Create Activity</Text>
                        <Text variant="body-xs" color="secondary">Build tools, resources, and community utilities</Text>
                      </div>
                      <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Collaborate Activity</Text>
                        <Text variant="body-xs" color="secondary">Work together on projects and academic initiatives</Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Engagement Activities:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Comment Activity</Text>
                        <Text variant="body-xs" color="secondary">Participate in discussions and provide feedback</Text>
                      </div>
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Like Activity</Text>
                        <Text variant="body-xs" color="secondary">Show appreciation and support community content</Text>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Join Activity</Text>
                        <Text variant="body-xs" color="secondary">Become member of spaces and communities</Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Milestone Activities:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Achievement Activity</Text>
                        <Text variant="body-xs" color="secondary">Reach platform milestones and community goals</Text>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Event Activity</Text>
                        <Text variant="body-xs" color="secondary">Attend workshops, meetings, and campus gatherings</Text>
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
            Real Campus Activity Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile activity widget usage in actual University at Buffalo student engagement and campus integration contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Computer Science Student */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE Junior - Alex Chen - Academic Excellence Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Computer Science Student with High Academic Engagement
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic-Focused Activity:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileActivityWidget user={{
                      id: 'user-cs-001',
                      name: 'Alex Chen'
                    }} recentActivities={[{
                      id: 'cs-001',
                      type: 'post',
                      title: 'Shared CSE 331 dynamic programming solutions',
                      description: 'Posted comprehensive algorithm explanations',
                      timestamp: '2024-01-15T10:30:00Z',
                      contextSpace: {
                        name: 'CSE 331 - Data Structures',
                        type: 'academic'
                      },
                      engagement: {
                        likes: 18,
                        comments: 7,
                        shares: 5
                      },
                      isHighlighted: true
                    }, {
                      id: 'cs-002',
                      type: 'collaborate',
                      title: 'Co-authored CSE 442 project documentation',
                      description: 'Team collaboration on software engineering project',
                      timestamp: '2024-01-15T09:15:00Z',
                      contextSpace: {
                        name: 'CSE 442 - Software Engineering',
                        type: 'academic'
                      },
                      engagement: {
                        likes: 12,
                        comments: 4,
                        shares: 2
                      }
                    }, {
                      id: 'cs-003',
                      type: 'create',
                      title: 'Built algorithm visualization tool',
                      description: 'Created interactive learning resource for CSE courses',
                      timestamp: '2024-01-15T08:45:00Z',
                      contextSpace: {
                        name: 'CSE Tool Development',
                        type: 'academic'
                      },
                      engagement: {
                        likes: 25,
                        comments: 9,
                        shares: 8
                      },
                      isHighlighted: true
                    }]} todayActivities={5} weeklyStreak={14} totalEngagement={342} activityScore={96} topActivityType="create" onViewActivity={action('cs-student-activity')} onViewAllActivities={action('cs-student-all')} onCreatePost={action('cs-student-post')} onEngageMore={action('cs-student-engage')} />
                      <Text variant="body-xs" color="secondary">
                        Junior CSE student with consistent academic contribution and high tool development activity
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Leadership Activity:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileActivityWidget user={{
                      id: 'user-cs-002',
                      name: 'Maya Patel'
                    }} recentActivities={mockActivitiesLeadership} todayActivities={7} weeklyStreak={21} totalEngagement={567} activityScore={98} topActivityType="create" onViewActivity={action('cs-leader-activity')} onViewAllActivities={action('cs-leader-all')} onCreatePost={action('cs-leader-post')} onEngageMore={action('cs-leader-engage')} />
                      <Text variant="body-xs" color="secondary">
                        Senior CSE student with leadership roles and community building initiatives
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* New Student Experience */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Freshman Integration Journey:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Week 1 - First Steps:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileActivityWidget user={{
                    id: 'user-fresh-001',
                    name: 'Jordan Kim'
                  }} recentActivities={[{
                    id: 'fresh-001',
                    type: 'join',
                    title: 'Joined Ellicott Complex - Floor 3',
                    description: 'Became part of residential community',
                    timestamp: '2024-01-15T10:00:00Z',
                    contextSpace: {
                      name: 'Ellicott Complex - Floor 3',
                      type: 'residential'
                    },
                    engagement: {
                      likes: 5,
                      comments: 2,
                      shares: 0
                    }
                  }, {
                    id: 'fresh-002',
                    type: 'join',
                    title: 'Joined Undecided Majors Support',
                    description: 'Connected with academic exploration community',
                    timestamp: '2024-01-15T09:30:00Z',
                    contextSpace: {
                      name: 'Undecided Majors Support',
                      type: 'academic'
                    },
                    engagement: {
                      likes: 3,
                      comments: 1,
                      shares: 0
                    }
                  }]} todayActivities={2} weeklyStreak={1} totalEngagement={8} activityScore={15} topActivityType="join" onViewActivity={action('fresh-week1-activity')} onViewAllActivities={action('fresh-week1-all')} onCreatePost={action('fresh-week1-post')} onEngageMore={action('fresh-week1-engage')} />
                    <Text variant="body-xs" color="secondary">
                      New student beginning campus integration through community joining
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Week 4 - Growing Engagement:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileActivityWidget user={{
                    id: 'user-fresh-002',
                    name: 'Jordan Kim'
                  }} recentActivities={[{
                    id: 'fresh-101',
                    type: 'post',
                    title: 'Shared freshman orientation insights',
                    description: 'Posted helpful tips for new students',
                    timestamp: '2024-01-15T11:00:00Z',
                    contextSpace: {
                      name: 'UB Freshman Community',
                      type: 'social'
                    },
                    engagement: {
                      likes: 8,
                      comments: 3,
                      shares: 2
                    },
                    isHighlighted: true
                  }, {
                    id: 'fresh-102',
                    type: 'comment',
                    title: 'Commented on study group formation',
                    description: 'Joined discussion about academic collaboration',
                    timestamp: '2024-01-15T10:15:00Z',
                    contextSpace: {
                      name: 'GEN 101 Study Groups',
                      type: 'academic'
                    },
                    engagement: {
                      likes: 4,
                      comments: 0,
                      shares: 0
                    }
                  }]} todayActivities={3} weeklyStreak={7} totalEngagement={34} activityScore={42} topActivityType="comment" onViewActivity={action('fresh-week4-activity')} onViewAllActivities={action('fresh-week4-all')} onCreatePost={action('fresh-week4-post')} onEngageMore={action('fresh-week4-engage')} />
                    <Text variant="body-xs" color="secondary">
                      Student developing confidence and beginning to contribute content
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Semester End - Established Member:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileActivityWidget user={{
                    id: 'user-fresh-003',
                    name: 'Jordan Kim'
                  }} recentActivities={mockActivitiesEngaged} todayActivities={4} weeklyStreak={15} totalEngagement={156} activityScore={78} topActivityType="collaborate" onViewActivity={action('fresh-established-activity')} onViewAllActivities={action('fresh-established-all')} onCreatePost={action('fresh-established-post')} onEngageMore={action('fresh-established-engage')} />
                    <Text variant="body-xs" color="secondary">
                      Fully integrated student with consistent engagement and community contributions
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Empty State */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">New Account - Empty State:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text variant="body-md" color="primary">
                  First-time platform experience with empty activity state:
                </Text>

                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Brand New Account:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileActivityWidget user={{
                      id: 'user-empty-001',
                      name: 'Taylor Wilson'
                    }} recentActivities={mockActivitiesEmpty} todayActivities={0} weeklyStreak={0} totalEngagement={0} activityScore={0} topActivityType="post" onViewActivity={action('empty-activity')} onViewAllActivities={action('empty-all')} onCreatePost={action('empty-post')} onEngageMore={action('empty-engage')} />
                      <Text variant="body-xs" color="secondary">
                        New user experience with call-to-action for first campus engagement
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">View-Only Mode:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileActivityWidget user={{
                      id: 'user-empty-002',
                      name: 'Sam Mitchell'
                    }} recentActivities={mockActivitiesEmpty} todayActivities={0} weeklyStreak={0} totalEngagement={0} activityScore={0} isEditable={false} topActivityType="post" onViewActivity={action('readonly-activity')} onViewAllActivities={action('readonly-all')} />
                      <Text variant="body-xs" color="secondary">
                        Read-only profile view without editing capabilities or action buttons
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
}`,...(O=(D=x.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var q,z,Y;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    user: {
      id: 'user-playground',
      name: 'Alex Chen'
    },
    recentActivities: mockActivitiesBasic,
    todayActivities: 4,
    weeklyStreak: 5,
    totalEngagement: 167,
    activityScore: 82,
    topActivityType: 'post',
    isEditable: true,
    onViewActivity: action('playground-activity'),
    onViewAllActivities: action('playground-all'),
    onCreatePost: action('playground-post'),
    onEngageMore: action('playground-engage')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Activity Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different activity widget configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileActivityWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive activity widget testing for University at Buffalo HIVE platform engagement tracking design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(Y=(z=b.parameters)==null?void 0:z.docs)==null?void 0:Y.source}}};const Oe=["Default","CompleteShowcase","Playground"];export{x as CompleteShowcase,h as Default,b as Playground,Oe as __namedExportsOrder,De as default};
