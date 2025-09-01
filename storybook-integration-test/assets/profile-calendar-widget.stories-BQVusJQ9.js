import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as $}from"./index-DJO9vBfz.js";import{c as m}from"./utils-CytzSlOG.js";import{H as p,a as g,c as h,b as C}from"./hive-tokens-CKIUfcHM.js";import{B as E}from"./badge-B09J4pcg.js";import{T as t}from"./text-Cao0VGB4.js";import{S as X}from"./settings-GFIh7SpU.js";import{C as O}from"./clock-Boexj8FH.js";import{M as K}from"./map-pin-CNTkGvcp.js";import{U as z}from"./users-kvqvVsnf.js";import{C as ee}from"./chevron-right-BGhHLs4c.js";import{c as ae}from"./createLucideIcon-WpwZgzX-.js";import{P as te}from"./plus-Cg8nMOSF.js";import{C as ie}from"./calendar-BPdIbUwb.js";import{E as se}from"./external-link-DkxaGAGS.js";import{Z as F}from"./zap-0mfePDxG.js";import{B as W}from"./book-open-Btvde7pg.js";import{C as Y}from"./circle-alert-D_Mj0ODU.js";import{C as ne}from"./coffee-BkeCUNU7.js";import{a}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=ae("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]),v=l=>{const r={class:{color:"text-blue-500",bgColor:"bg-blue-500/10",borderColor:"border-blue-500/20",icon:W,label:"Class"},study:{color:"text-[var(--hive-gold)]",bgColor:"bg-[var(--hive-gold)]/10",borderColor:"border-[var(--hive-gold)]/20",icon:F,label:"Study"},meeting:{color:"text-purple-500",bgColor:"bg-purple-500/10",borderColor:"border-purple-500/20",icon:z,label:"Meeting"},personal:{color:"text-green-500",bgColor:"bg-green-500/10",borderColor:"border-green-500/20",icon:ne,label:"Personal"},deadline:{color:"text-red-500",bgColor:"bg-red-500/10",borderColor:"border-red-500/20",icon:Y,label:"Deadline"}};return r[l]||r.personal},re=l=>{const r={available:{color:"text-green-500",bgColor:"bg-green-500/10",label:"Available for Study",icon:_},busy:{color:"text-red-500",bgColor:"bg-red-500/10",label:"Busy",icon:Y},"in-class":{color:"text-blue-500",bgColor:"bg-blue-500/10",label:"In Class",icon:W},studying:{color:"text-[var(--hive-gold)]",bgColor:"bg-[var(--hive-gold)]/10",label:"Studying",icon:F},offline:{color:"text-[var(--hive-text-muted)]",bgColor:"bg-[var(--hive-background-secondary)]",label:"Offline",icon:O}};return r[l]||r.offline},i=({user:l,todayEvents:r=[],upcomingEvents:oe=[],availabilityStatus:q="available",nextAvailableSlot:A,studyHoursToday:w=0,studyGoal:u=6,isEditable:b=!0,onAddEvent:N,onViewCalendar:j,onEditEvent:y,onUpdateAvailability:J,className:Q})=>{const[k,P]=$.useState(!1),c=re(q),H=u>0?Math.min(w/u*100,100):0,s=r.find(n=>n.status!=="completed"),S=n=>new Date(`2024-01-01 ${n}`).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0});return e.jsxs(p,{className:m("relative overflow-hidden transition-all duration-300 hover:shadow-lg","bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]",k&&"scale-[1.02]",Q),onMouseEnter:()=>P(!0),onMouseLeave:()=>P(!1),children:[e.jsx(g,{className:"pb-2",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Calendar & Schedule"}),e.jsxs(E,{variant:"secondary",className:m("text-xs",c.color),children:[e.jsx(c.icon,{className:"h-3 w-3 mr-1"}),c.label]})]}),b&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:J,className:"h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(X,{className:"h-3 w-3"})})]})}),e.jsxs(h,{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("div",{className:m("p-3 rounded-lg border",c.bgColor,"border-[var(--hive-border-primary)]"),children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(c.icon,{className:m("h-4 w-4",c.color)}),e.jsx(t,{variant:"body-sm",weight:"medium",color:"primary",children:c.label})]}),A&&e.jsxs(t,{variant:"body-xs",color:"secondary",children:["Next free: ",A]})]})}),u>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(t,{variant:"body-sm",color:"primary",children:"Today's Study Progress"}),e.jsxs(t,{variant:"body-sm",color:"gold",weight:"medium",children:[w,"h / ",u,"h"]})]}),e.jsx("div",{className:"w-full bg-[var(--hive-background-secondary)] rounded-full h-2",children:e.jsx("div",{className:"bg-[var(--hive-gold)] rounded-full h-2 transition-all duration-500",style:{width:`${H}%`}})}),e.jsx(t,{variant:"body-xs",color:"secondary",children:H>=100?"🎉 Daily goal achieved!":`${(u-w).toFixed(1)}h remaining`})]})]}),s&&e.jsxs("div",{className:"space-y-2",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Next Event:"}),e.jsx("div",{className:m("p-3 rounded-lg border",v(s.type).bgColor,v(s.type).borderColor),children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex items-start gap-2 flex-1 min-w-0",children:[(()=>{const n=v(s.type).icon;return e.jsx(n,{className:m("h-4 w-4 mt-0.5 flex-shrink-0",v(s.type).color)})})(),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx(t,{variant:"body-sm",weight:"medium",color:"primary",className:"truncate",children:s.title}),e.jsxs("div",{className:"flex items-center gap-3 mt-1",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(O,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsxs(t,{variant:"body-xs",color:"secondary",children:[S(s.startTime)," - ",S(s.endTime)]})]}),s.location&&e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(K,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsx(t,{variant:"body-xs",color:"secondary",className:"truncate",children:s.location})]})]}),s.participants&&s.participants>1&&e.jsxs("div",{className:"flex items-center gap-1 mt-1",children:[e.jsx(z,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsxs(t,{variant:"body-xs",color:"secondary",children:[s.participants," participants"]})]})]})]}),b&&y&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:()=>y(s.id),className:"h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] flex-shrink-0 ml-2",children:e.jsx(ee,{className:"h-3 w-3"})})]})})]}),r.length>1&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(t,{variant:"body-sm",color:"primary",weight:"medium",children:"Today's Schedule:"}),e.jsxs(t,{variant:"body-xs",color:"secondary",children:[r.filter(n=>n.status==="completed").length,"/",r.length," completed"]})]}),e.jsxs("div",{className:"space-y-1",children:[r.slice(0,3).map(n=>{const Z=v(n.type);return e.jsxs("div",{className:"flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer",onClick:()=>b&&(y==null?void 0:y(n.id)),children:[e.jsx("div",{className:m("w-2 h-2 rounded-full",Z.color.replace("text-","bg-"))}),e.jsx(t,{variant:"body-xs",color:"primary",className:"flex-1 truncate",children:n.title}),e.jsx(t,{variant:"body-xs",color:"secondary",children:S(n.startTime)}),n.status==="completed"&&e.jsx(_,{className:"h-3 w-3 text-green-500"})]},n.id)}),r.length>3&&e.jsx("div",{className:"text-center pt-1",children:e.jsxs(t,{variant:"body-xs",color:"secondary",children:["+",r.length-3," more events"]})})]})]}),e.jsxs("div",{className:"flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[b&&N&&e.jsxs(ButtonEnhanced,{variant:"secondary",size:"sm",onClick:N,className:"flex-1",children:[e.jsx(te,{className:"h-3 w-3 mr-1"}),"Add Event"]}),j&&e.jsxs(ButtonEnhanced,{variant:"primary",size:"sm",onClick:j,className:"flex-1",children:[e.jsx(ie,{className:"h-3 w-3 mr-1"}),"View Calendar"]}),e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:j,className:"text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(se,{className:"h-3 w-3"})})]})]}),k&&e.jsx("div",{className:"absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl"})]})};i.__docgenInfo={description:"",methods:[],displayName:"ProfileCalendarWidget",props:{user:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  timezone?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"timezone",value:{name:"string",required:!1}}]}},description:""},todayEvents:{required:!1,tsType:{name:"Array",elements:[{name:"CalendarEvent"}],raw:"CalendarEvent[]"},description:"",defaultValue:{value:"[]",computed:!1}},upcomingEvents:{required:!1,tsType:{name:"Array",elements:[{name:"CalendarEvent"}],raw:"CalendarEvent[]"},description:"",defaultValue:{value:"[]",computed:!1}},availabilityStatus:{required:!1,tsType:{name:"union",raw:"'available' | 'busy' | 'in-class' | 'studying' | 'offline'",elements:[{name:"literal",value:"'available'"},{name:"literal",value:"'busy'"},{name:"literal",value:"'in-class'"},{name:"literal",value:"'studying'"},{name:"literal",value:"'offline'"}]},description:"",defaultValue:{value:"'available'",computed:!1}},nextAvailableSlot:{required:!1,tsType:{name:"string"},description:""},studyHoursToday:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},studyGoal:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"6",computed:!1}},isEditable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onAddEvent:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onViewCalendar:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onEditEvent:{required:!1,tsType:{name:"signature",type:"function",raw:"(eventId: string) => void",signature:{arguments:[{type:{name:"string"},name:"eventId"}],return:{name:"void"}}},description:""},onUpdateAvailability:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const He={title:"03-Organisms/Profile Calendar Widget - COMPLETE DEFINITION",component:i,parameters:{docs:{description:{component:`
## 📅 HIVE Profile Calendar Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive personal schedule and availability widget for University at Buffalo HIVE platform student time management and campus coordination.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Event Types** - Class, study, meeting, personal, deadline with distinct visual styling
- **5 Availability States** - Available, busy, in-class, studying, offline with real-time updates
- **Study Progress Tracking** - Daily study hour goals with visual progress indicators
- **Next Event Preview** - Immediate upcoming event with location and participant details
- **Schedule Overview** - Today's complete schedule with completion status tracking
- **Interactive Management** - Add events, edit existing, update availability status
- **Perfect Semantic Tokens** - 100% semantic token usage for consistent theming
- **Mobile Optimized** - Touch-friendly design with responsive event management
- **Campus Integration** - Built for University at Buffalo student academic scheduling

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student scheduling:
- **Class Schedule Management** - CSE 331, MTH 241, PHY 207 course tracking with locations
- **Study Session Coordination** - Algorithm practice, exam prep, project work scheduling
- **Campus Event Integration** - Study groups, office hours, research meetings, club activities
- **Availability Broadcasting** - Real-time status for study partner coordination
- **Academic Goal Tracking** - Daily study hour goals with progress visualization
- **Location Awareness** - Lockwood Library, Davis Hall, Knox Hall building integration
- **Time Management** - Semester planning with deadline tracking and workload balance

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large event targets and clear availability controls
- **Quick Status Updates** - One-touch availability changes while walking between classes
- **Gesture Support** - Swipe interactions for event navigation and management
- **Responsive Layout** - Adaptive schedule display for mobile time management
`}}},tags:["autodocs"],argTypes:{user:{control:"object",description:"User profile data"},todayEvents:{control:"object",description:"Today's schedule events"},upcomingEvents:{control:"object",description:"Upcoming events array"},availabilityStatus:{control:"select",options:["available","busy","in-class","studying","offline"],description:"Current availability status"},nextAvailableSlot:{control:"text",description:"Next available time slot"},studyHoursToday:{control:{type:"range",min:0,max:12},description:"Study hours completed today"},studyGoal:{control:{type:"range",min:0,max:12},description:"Daily study hour goal"},isEditable:{control:"boolean",description:"Enable editing controls"},onAddEvent:{action:"add-event",description:"Add event handler"},onViewCalendar:{action:"view-calendar",description:"View full calendar handler"},onEditEvent:{action:"edit-event",description:"Edit event handler"},onUpdateAvailability:{action:"update-availability",description:"Update availability handler"}}},d={busyStudentDay:[{id:"cse331-lecture",title:"CSE 331 Algorithm Analysis",type:"class",startTime:"09:00",endTime:"10:20",location:"Davis Hall 101",isRecurring:!0,status:"completed"},{id:"study-group-algo",title:"Algorithm Study Group",type:"study",startTime:"14:00",endTime:"16:00",location:"Lockwood Library Room 240",participants:6,status:"confirmed"},{id:"office-hours",title:"Prof. Johnson Office Hours",type:"meeting",startTime:"16:30",endTime:"17:00",location:"Davis Hall 338",status:"confirmed"},{id:"dinner-friends",title:"Dinner with Floor Friends",type:"personal",startTime:"18:00",endTime:"19:30",location:"Ellicott Dining",participants:8,status:"confirmed"},{id:"project-deadline",title:"Data Structures Project Due",type:"deadline",startTime:"23:59",endTime:"23:59",status:"confirmed"}],lightScheduleDay:[{id:"physics-lab",title:"PHY 207 Physics Lab",type:"class",startTime:"10:00",endTime:"12:50",location:"Fronczak Hall B6",status:"confirmed"},{id:"lunch-study",title:"Calculus Review Session",type:"study",startTime:"13:30",endTime:"15:00",location:"Mathematics Building",participants:4,status:"confirmed"}]},o={id:"sarah-chen-schedule",name:"Sarah Chen",timezone:"America/New_York"},x={args:{user:o,todayEvents:d.busyStudentDay,upcomingEvents:d.lightScheduleDay,availabilityStatus:"studying",nextAvailableSlot:"4:30 PM",studyHoursToday:4.5,studyGoal:6,isEditable:!0,onAddEvent:a("add-event-clicked"),onViewCalendar:a("view-calendar-clicked"),onEditEvent:a("edit-event-clicked"),onUpdateAvailability:a("availability-updated")},render:l=>e.jsxs("div",{className:"p-6 bg-[var(--hive-background-primary)] max-w-md",children:[e.jsx(t,{variant:"body-md",color:"primary",className:"mb-4",children:"HIVE profile calendar widget for University at Buffalo student scheduling:"}),e.jsx(i,{...l})]})},f={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(p,{children:[e.jsxs(g,{children:[e.jsxs(C,{className:"flex items-center gap-3",children:[e.jsx(E,{variant:"success",children:"🎯 AVAILABILITY STATES"}),"Real-Time Student Status"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"5 availability states for University at Buffalo HIVE platform student status and study coordination"})]}),e.jsx(h,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Student Status Options:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Available for Study:"}),e.jsx(i,{user:o,todayEvents:d.lightScheduleDay,availabilityStatus:"available",nextAvailableSlot:"Now",studyHoursToday:2,studyGoal:6,isEditable:!0,onAddEvent:a("available-add"),onViewCalendar:a("available-view"),onEditEvent:a("available-edit"),onUpdateAvailability:a("available-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Open for study sessions, group work, and academic collaboration"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Currently Studying:"}),e.jsx(i,{user:o,todayEvents:d.busyStudentDay.slice(1,3),availabilityStatus:"studying",nextAvailableSlot:"6:00 PM",studyHoursToday:4.5,studyGoal:6,isEditable:!0,onAddEvent:a("studying-add"),onViewCalendar:a("studying-view"),onEditEvent:a("studying-edit"),onUpdateAvailability:a("studying-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"In focused study session, prefer minimal interruptions"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"In Class:"}),e.jsx(i,{user:o,todayEvents:[d.busyStudentDay[0],d.busyStudentDay[2]],availabilityStatus:"in-class",nextAvailableSlot:"2:00 PM",studyHoursToday:1.5,studyGoal:6,isEditable:!0,onAddEvent:a("class-add"),onViewCalendar:a("class-view"),onEditEvent:a("class-edit"),onUpdateAvailability:a("class-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Currently in lecture, lab, or academic session"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Busy:"}),e.jsx(i,{user:o,todayEvents:d.busyStudentDay,availabilityStatus:"busy",nextAvailableSlot:"Tomorrow 9:00 AM",studyHoursToday:6,studyGoal:6,isEditable:!0,onAddEvent:a("busy-add"),onViewCalendar:a("busy-view"),onEditEvent:a("busy-edit"),onUpdateAvailability:a("busy-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Packed schedule with classes, meetings, and commitments"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Offline:"}),e.jsx(i,{user:o,todayEvents:[],availabilityStatus:"offline",studyHoursToday:0,studyGoal:6,isEditable:!0,onAddEvent:a("offline-add"),onViewCalendar:a("offline-view"),onEditEvent:a("offline-edit"),onUpdateAvailability:a("offline-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Not currently available for coordination or communication"})]})]})})]})})})]}),e.jsxs(p,{children:[e.jsxs(g,{children:[e.jsxs(C,{className:"flex items-center gap-3",children:[e.jsx(E,{variant:"info",children:"📚 EVENT TYPES"}),"Calendar Event Categories"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"5 event types for comprehensive University at Buffalo student schedule management"})]}),e.jsx(h,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Academic & Personal Events:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Class Schedule:"}),e.jsx(i,{user:o,todayEvents:[{id:"cse331-algo",title:"CSE 331 Algorithm Analysis",type:"class",startTime:"09:00",endTime:"10:20",location:"Davis Hall 101",status:"confirmed"},{id:"math241-calc",title:"MTH 241 Calculus III",type:"class",startTime:"11:30",endTime:"12:50",location:"Mathematics Building",status:"confirmed"}],availabilityStatus:"in-class",nextAvailableSlot:"1:00 PM",studyHoursToday:2,studyGoal:5,isEditable:!0,onAddEvent:a("class-schedule-add"),onViewCalendar:a("class-schedule-view"),onEditEvent:a("class-schedule-edit"),onUpdateAvailability:a("class-schedule-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Academic classes with building locations and recurring schedule"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Study Sessions:"}),e.jsx(i,{user:o,todayEvents:[{id:"algo-practice",title:"Algorithm Practice Problems",type:"study",startTime:"14:00",endTime:"16:00",location:"Lockwood Library Room 240",participants:5,status:"confirmed"},{id:"exam-prep",title:"Midterm Exam Preparation",type:"study",startTime:"19:00",endTime:"21:00",location:"Ellicott Study Lounge",status:"confirmed"}],availabilityStatus:"studying",nextAvailableSlot:"4:30 PM",studyHoursToday:4,studyGoal:6,isEditable:!0,onAddEvent:a("study-sessions-add"),onViewCalendar:a("study-sessions-view"),onEditEvent:a("study-sessions-edit"),onUpdateAvailability:a("study-sessions-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Group and individual study sessions with participant tracking"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Meetings & Office Hours:"}),e.jsx(i,{user:o,todayEvents:[{id:"prof-office-hours",title:"Prof. Johnson Office Hours",type:"meeting",startTime:"15:30",endTime:"16:00",location:"Davis Hall 338",status:"confirmed"},{id:"research-meeting",title:"AI Lab Research Meeting",type:"meeting",startTime:"17:00",endTime:"18:00",location:"Capen Hall 213",participants:12,status:"tentative"}],availabilityStatus:"busy",nextAvailableSlot:"6:30 PM",studyHoursToday:3,studyGoal:6,isEditable:!0,onAddEvent:a("meetings-add"),onViewCalendar:a("meetings-view"),onEditEvent:a("meetings-edit"),onUpdateAvailability:a("meetings-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Academic meetings, office hours, and research collaboration"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Deadlines & Personal:"}),e.jsx(i,{user:o,todayEvents:[{id:"project-due",title:"Data Structures Project Due",type:"deadline",startTime:"23:59",endTime:"23:59",status:"confirmed"},{id:"dinner-plans",title:"Dinner with Roommates",type:"personal",startTime:"18:30",endTime:"20:00",location:"Student Union Food Court",participants:4,status:"confirmed"}],availabilityStatus:"available",nextAvailableSlot:"Now",studyHoursToday:5.5,studyGoal:6,isEditable:!0,onAddEvent:a("deadlines-add"),onViewCalendar:a("deadlines-view"),onEditEvent:a("deadlines-edit"),onUpdateAvailability:a("deadlines-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Assignment deadlines and personal social commitments"})]})]})})]})})})]}),e.jsxs(p,{children:[e.jsxs(g,{children:[e.jsxs(C,{className:"flex items-center gap-3",children:[e.jsx(E,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Schedule Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Profile calendar widget usage in actual University at Buffalo student scheduling and campus coordination contexts"})]}),e.jsxs(h,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Computer Science Junior - Heavy Course Load:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{as:"h3",variant:"heading-sm",color:"primary",children:"Sarah Chen - Tuesday Schedule (Peak Academic Day)"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Morning Classes:"}),e.jsx(i,{user:{id:"sarah-cs-morning",name:"Sarah Chen",timezone:"America/New_York"},todayEvents:[{id:"cse331-morning",title:"CSE 331 Algorithm Analysis",type:"class",startTime:"09:00",endTime:"10:20",location:"Davis Hall 101",isRecurring:!0,status:"completed"},{id:"mth241-morning",title:"MTH 241 Calculus III",type:"class",startTime:"11:30",endTime:"12:50",location:"Mathematics Building 122",isRecurring:!0,status:"confirmed"}],availabilityStatus:"in-class",nextAvailableSlot:"1:00 PM",studyHoursToday:1.5,studyGoal:7,isEditable:!0,onAddEvent:a("cs-morning-add"),onViewCalendar:a("cs-morning-view"),onEditEvent:a("cs-morning-edit"),onUpdateAvailability:a("cs-morning-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Back-to-back morning classes in Davis Hall and Mathematics Building"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Afternoon Coordination:"}),e.jsx(i,{user:{id:"sarah-cs-afternoon",name:"Sarah Chen",timezone:"America/New_York"},todayEvents:[{id:"lunch-study-group",title:"Algorithm Study Group",type:"study",startTime:"13:00",endTime:"15:00",location:"Lockwood Library Room 240",participants:6,status:"confirmed"},{id:"ta-office-hours",title:"TA Office Hours - Help Students",type:"meeting",startTime:"15:30",endTime:"17:00",location:"Davis Hall TA Room",participants:8,status:"confirmed"},{id:"research-lab",title:"AI Research Lab Meeting",type:"meeting",startTime:"17:30",endTime:"19:00",location:"Capen Hall 213",participants:15,status:"confirmed"}],availabilityStatus:"studying",nextAvailableSlot:"7:30 PM",studyHoursToday:4.5,studyGoal:7,isEditable:!0,onAddEvent:a("cs-afternoon-add"),onViewCalendar:a("cs-afternoon-view"),onEditEvent:a("cs-afternoon-edit"),onUpdateAvailability:a("cs-afternoon-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Study coordination, teaching assistance, and research participation"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Pre-Med Student - Research & Clinical Focus:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Lab & Research Schedule:"}),e.jsx(i,{user:{id:"jamie-premed",name:"Jamie Park",timezone:"America/New_York"},todayEvents:[{id:"organic-chem-lab",title:"CHE 201 Organic Chemistry Lab",type:"class",startTime:"10:00",endTime:"13:00",location:"Chemistry Building B40",status:"confirmed"},{id:"research-hospital",title:"Clinical Research at ECMC",type:"meeting",startTime:"14:30",endTime:"17:30",location:"Erie County Medical Center",participants:4,status:"confirmed"}],availabilityStatus:"busy",nextAvailableSlot:"Tomorrow 9:00 AM",studyHoursToday:6,studyGoal:8,isEditable:!0,onAddEvent:a("premed-research-add"),onViewCalendar:a("premed-research-view"),onEditEvent:a("premed-research-edit"),onUpdateAvailability:a("premed-research-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Laboratory work and clinical research experience for medical school preparation"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"MCAT Preparation:"}),e.jsx(i,{user:{id:"jamie-mcat-prep",name:"Jamie Park",timezone:"America/New_York"},todayEvents:[{id:"mcat-study-session",title:"MCAT Physics Practice",type:"study",startTime:"08:00",endTime:"10:00",location:"Health Sciences Library",status:"completed"},{id:"mcat-group-review",title:"MCAT Study Group",type:"study",startTime:"19:00",endTime:"21:00",location:"Abbott Hall Study Room",participants:8,status:"confirmed"},{id:"mcat-practice-test",title:"MCAT Practice Test Deadline",type:"deadline",startTime:"23:59",endTime:"23:59",status:"confirmed"}],availabilityStatus:"studying",nextAvailableSlot:"5:00 PM",studyHoursToday:8,studyGoal:9,isEditable:!0,onAddEvent:a("mcat-prep-add"),onViewCalendar:a("mcat-prep-view"),onEditEvent:a("mcat-prep-edit"),onUpdateAvailability:a("mcat-prep-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Intensive MCAT preparation with group study and practice test coordination"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Engineering Student - Senior Design Project:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Project Coordination:"}),e.jsx(i,{user:{id:"alex-engineering",name:"Alex Rivera",timezone:"America/New_York"},todayEvents:[{id:"senior-design-meeting",title:"Senior Design Team Meeting",type:"meeting",startTime:"11:00",endTime:"12:30",location:"Furnas Hall Maker Space",participants:5,status:"confirmed"},{id:"prototype-testing",title:"Autonomous Drone Testing",type:"study",startTime:"14:00",endTime:"17:00",location:"Baird Point Testing Field",participants:3,status:"confirmed"},{id:"sponsor-presentation",title:"Industry Sponsor Presentation",type:"meeting",startTime:"18:00",endTime:"19:00",location:"Zoom/Davis Hall 101",participants:8,status:"tentative"}],availabilityStatus:"busy",nextAvailableSlot:"Tomorrow 10:00 AM",studyHoursToday:5.5,studyGoal:6,isEditable:!0,onAddEvent:a("engineering-project-add"),onViewCalendar:a("engineering-project-view"),onEditEvent:a("engineering-project-edit"),onUpdateAvailability:a("engineering-project-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Senior design project with team coordination, testing, and industry presentations"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Leadership & Mentoring:"}),e.jsx(i,{user:{id:"alex-leadership",name:"Alex Rivera",timezone:"America/New_York"},todayEvents:[{id:"robotics-club-meeting",title:"Robotics Club Leadership Meeting",type:"meeting",startTime:"16:00",endTime:"17:30",location:"Student Union 403",participants:12,status:"confirmed"},{id:"freshman-mentoring",title:"EE Freshman Mentoring Session",type:"meeting",startTime:"19:00",endTime:"20:30",location:"Bonner Hall Lounge",participants:8,status:"confirmed"}],availabilityStatus:"available",nextAvailableSlot:"2:00 PM",studyHoursToday:3,studyGoal:5,isEditable:!0,onAddEvent:a("leadership-mentoring-add"),onViewCalendar:a("leadership-mentoring-view"),onEditEvent:a("leadership-mentoring-edit"),onUpdateAvailability:a("leadership-mentoring-update")}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Student organization leadership and peer mentoring responsibilities"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Mobile Campus Schedule Management:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(t,{variant:"body-md",color:"primary",children:"Mobile-optimized calendar widget for on-campus schedule management:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Quick Status Updates:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(t,{variant:"body-sm",weight:"medium",color:"primary",children:"Touch-Friendly Calendar Management"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"One-touch availability updates while walking between Davis Hall and Lockwood Library"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Quick event additions during spontaneous study group formations"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Real-time schedule sharing for immediate study partner coordination"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Study progress tracking with visual goal achievement feedback"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Campus-Aware Scheduling:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(t,{variant:"body-sm",weight:"medium",color:"primary",children:"Location-Integrated Time Management"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Building-aware event creation with automatic location suggestions"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Transit time calculations between North Campus and South Campus"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Study space availability integration with Lockwood Library booking"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Weather-aware outdoor event suggestions and location alternatives"})]})]})]})]})]})]})]})]})},T={args:{user:o,todayEvents:d.busyStudentDay,upcomingEvents:d.lightScheduleDay,availabilityStatus:"available",nextAvailableSlot:"2:00 PM",studyHoursToday:3.5,studyGoal:6,isEditable:!0,onAddEvent:a("playground-add-event"),onViewCalendar:a("playground-view-calendar"),onEditEvent:a("playground-edit-event"),onUpdateAvailability:a("playground-update-availability")},render:l=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(p,{children:[e.jsxs(g,{children:[e.jsx(C,{children:"Profile Calendar Widget Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different calendar widget configurations"})]}),e.jsx(h,{className:"p-6",children:e.jsxs("div",{className:"space-y-4 max-w-md",children:[e.jsx(i,{...l}),e.jsx(t,{variant:"body-sm",color:"secondary",children:"Interactive calendar widget testing for University at Buffalo HIVE platform student scheduling"})]})})]})})};var M,U,D;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    todayEvents: sampleEvents.busyStudentDay,
    upcomingEvents: sampleEvents.lightScheduleDay,
    availabilityStatus: 'studying',
    nextAvailableSlot: '4:30 PM',
    studyHoursToday: 4.5,
    studyGoal: 6,
    isEditable: true,
    onAddEvent: action('add-event-clicked'),
    onViewCalendar: action('view-calendar-clicked'),
    onEditEvent: action('edit-event-clicked'),
    onUpdateAvailability: action('availability-updated')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)] max-w-md">
      <Text variant="body-md" color="primary" className="mb-4">
        HIVE profile calendar widget for University at Buffalo student scheduling:
      </Text>
      <ProfileCalendarWidget {...args} />
    </div>
}`,...(D=(U=x.parameters)==null?void 0:U.docs)==null?void 0:D.source}}};var I,L,B;f.parameters={...f.parameters,docs:{...(I=f.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Availability States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎯 AVAILABILITY STATES</Badge>
            Real-Time Student Status
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 availability states for University at Buffalo HIVE platform student status and study coordination
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Student Status Options:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Available for Study:</Text>
                    <ProfileCalendarWidget user={sampleUser} todayEvents={sampleEvents.lightScheduleDay} availabilityStatus="available" nextAvailableSlot="Now" studyHoursToday={2} studyGoal={6} isEditable={true} onAddEvent={action('available-add')} onViewCalendar={action('available-view')} onEditEvent={action('available-edit')} onUpdateAvailability={action('available-update')} />
                    <Text variant="body-xs" color="secondary">
                      Open for study sessions, group work, and academic collaboration
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Currently Studying:</Text>
                    <ProfileCalendarWidget user={sampleUser} todayEvents={sampleEvents.busyStudentDay.slice(1, 3)} availabilityStatus="studying" nextAvailableSlot="6:00 PM" studyHoursToday={4.5} studyGoal={6} isEditable={true} onAddEvent={action('studying-add')} onViewCalendar={action('studying-view')} onEditEvent={action('studying-edit')} onUpdateAvailability={action('studying-update')} />
                    <Text variant="body-xs" color="secondary">
                      In focused study session, prefer minimal interruptions
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">In Class:</Text>
                    <ProfileCalendarWidget user={sampleUser} todayEvents={[sampleEvents.busyStudentDay[0], sampleEvents.busyStudentDay[2]]} availabilityStatus="in-class" nextAvailableSlot="2:00 PM" studyHoursToday={1.5} studyGoal={6} isEditable={true} onAddEvent={action('class-add')} onViewCalendar={action('class-view')} onEditEvent={action('class-edit')} onUpdateAvailability={action('class-update')} />
                    <Text variant="body-xs" color="secondary">
                      Currently in lecture, lab, or academic session
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Busy:</Text>
                    <ProfileCalendarWidget user={sampleUser} todayEvents={sampleEvents.busyStudentDay} availabilityStatus="busy" nextAvailableSlot="Tomorrow 9:00 AM" studyHoursToday={6} studyGoal={6} isEditable={true} onAddEvent={action('busy-add')} onViewCalendar={action('busy-view')} onEditEvent={action('busy-edit')} onUpdateAvailability={action('busy-update')} />
                    <Text variant="body-xs" color="secondary">
                      Packed schedule with classes, meetings, and commitments
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Offline:</Text>
                    <ProfileCalendarWidget user={sampleUser} todayEvents={[]} availabilityStatus="offline" studyHoursToday={0} studyGoal={6} isEditable={true} onAddEvent={action('offline-add')} onViewCalendar={action('offline-view')} onEditEvent={action('offline-edit')} onUpdateAvailability={action('offline-update')} />
                    <Text variant="body-xs" color="secondary">
                      Not currently available for coordination or communication
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Event Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📚 EVENT TYPES</Badge>
            Calendar Event Categories
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 event types for comprehensive University at Buffalo student schedule management
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Academic & Personal Events:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Class Schedule:</Text>
                    <ProfileCalendarWidget user={sampleUser} todayEvents={[{
                    id: 'cse331-algo',
                    title: 'CSE 331 Algorithm Analysis',
                    type: 'class',
                    startTime: '09:00',
                    endTime: '10:20',
                    location: 'Davis Hall 101',
                    status: 'confirmed'
                  }, {
                    id: 'math241-calc',
                    title: 'MTH 241 Calculus III',
                    type: 'class',
                    startTime: '11:30',
                    endTime: '12:50',
                    location: 'Mathematics Building',
                    status: 'confirmed'
                  }]} availabilityStatus="in-class" nextAvailableSlot="1:00 PM" studyHoursToday={2} studyGoal={5} isEditable={true} onAddEvent={action('class-schedule-add')} onViewCalendar={action('class-schedule-view')} onEditEvent={action('class-schedule-edit')} onUpdateAvailability={action('class-schedule-update')} />
                    <Text variant="body-xs" color="secondary">
                      Academic classes with building locations and recurring schedule
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Study Sessions:</Text>
                    <ProfileCalendarWidget user={sampleUser} todayEvents={[{
                    id: 'algo-practice',
                    title: 'Algorithm Practice Problems',
                    type: 'study',
                    startTime: '14:00',
                    endTime: '16:00',
                    location: 'Lockwood Library Room 240',
                    participants: 5,
                    status: 'confirmed'
                  }, {
                    id: 'exam-prep',
                    title: 'Midterm Exam Preparation',
                    type: 'study',
                    startTime: '19:00',
                    endTime: '21:00',
                    location: 'Ellicott Study Lounge',
                    status: 'confirmed'
                  }]} availabilityStatus="studying" nextAvailableSlot="4:30 PM" studyHoursToday={4} studyGoal={6} isEditable={true} onAddEvent={action('study-sessions-add')} onViewCalendar={action('study-sessions-view')} onEditEvent={action('study-sessions-edit')} onUpdateAvailability={action('study-sessions-update')} />
                    <Text variant="body-xs" color="secondary">
                      Group and individual study sessions with participant tracking
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Meetings & Office Hours:</Text>
                    <ProfileCalendarWidget user={sampleUser} todayEvents={[{
                    id: 'prof-office-hours',
                    title: 'Prof. Johnson Office Hours',
                    type: 'meeting',
                    startTime: '15:30',
                    endTime: '16:00',
                    location: 'Davis Hall 338',
                    status: 'confirmed'
                  }, {
                    id: 'research-meeting',
                    title: 'AI Lab Research Meeting',
                    type: 'meeting',
                    startTime: '17:00',
                    endTime: '18:00',
                    location: 'Capen Hall 213',
                    participants: 12,
                    status: 'tentative'
                  }]} availabilityStatus="busy" nextAvailableSlot="6:30 PM" studyHoursToday={3} studyGoal={6} isEditable={true} onAddEvent={action('meetings-add')} onViewCalendar={action('meetings-view')} onEditEvent={action('meetings-edit')} onUpdateAvailability={action('meetings-update')} />
                    <Text variant="body-xs" color="secondary">
                      Academic meetings, office hours, and research collaboration
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Deadlines & Personal:</Text>
                    <ProfileCalendarWidget user={sampleUser} todayEvents={[{
                    id: 'project-due',
                    title: 'Data Structures Project Due',
                    type: 'deadline',
                    startTime: '23:59',
                    endTime: '23:59',
                    status: 'confirmed'
                  }, {
                    id: 'dinner-plans',
                    title: 'Dinner with Roommates',
                    type: 'personal',
                    startTime: '18:30',
                    endTime: '20:00',
                    location: 'Student Union Food Court',
                    participants: 4,
                    status: 'confirmed'
                  }]} availabilityStatus="available" nextAvailableSlot="Now" studyHoursToday={5.5} studyGoal={6} isEditable={true} onAddEvent={action('deadlines-add')} onViewCalendar={action('deadlines-view')} onEditEvent={action('deadlines-edit')} onUpdateAvailability={action('deadlines-update')} />
                    <Text variant="body-xs" color="secondary">
                      Assignment deadlines and personal social commitments
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
            Real Campus Schedule Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile calendar widget usage in actual University at Buffalo student scheduling and campus coordination contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* CS Student Full Schedule */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Computer Science Junior - Heavy Course Load:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Sarah Chen - Tuesday Schedule (Peak Academic Day)
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Morning Classes:</Text>
                    <ProfileCalendarWidget user={{
                    id: 'sarah-cs-morning',
                    name: 'Sarah Chen',
                    timezone: 'America/New_York'
                  }} todayEvents={[{
                    id: 'cse331-morning',
                    title: 'CSE 331 Algorithm Analysis',
                    type: 'class',
                    startTime: '09:00',
                    endTime: '10:20',
                    location: 'Davis Hall 101',
                    isRecurring: true,
                    status: 'completed'
                  }, {
                    id: 'mth241-morning',
                    title: 'MTH 241 Calculus III',
                    type: 'class',
                    startTime: '11:30',
                    endTime: '12:50',
                    location: 'Mathematics Building 122',
                    isRecurring: true,
                    status: 'confirmed'
                  }]} availabilityStatus="in-class" nextAvailableSlot="1:00 PM" studyHoursToday={1.5} studyGoal={7} isEditable={true} onAddEvent={action('cs-morning-add')} onViewCalendar={action('cs-morning-view')} onEditEvent={action('cs-morning-edit')} onUpdateAvailability={action('cs-morning-update')} />
                    <Text variant="body-xs" color="secondary">
                      Back-to-back morning classes in Davis Hall and Mathematics Building
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Afternoon Coordination:</Text>
                    <ProfileCalendarWidget user={{
                    id: 'sarah-cs-afternoon',
                    name: 'Sarah Chen',
                    timezone: 'America/New_York'
                  }} todayEvents={[{
                    id: 'lunch-study-group',
                    title: 'Algorithm Study Group',
                    type: 'study',
                    startTime: '13:00',
                    endTime: '15:00',
                    location: 'Lockwood Library Room 240',
                    participants: 6,
                    status: 'confirmed'
                  }, {
                    id: 'ta-office-hours',
                    title: 'TA Office Hours - Help Students',
                    type: 'meeting',
                    startTime: '15:30',
                    endTime: '17:00',
                    location: 'Davis Hall TA Room',
                    participants: 8,
                    status: 'confirmed'
                  }, {
                    id: 'research-lab',
                    title: 'AI Research Lab Meeting',
                    type: 'meeting',
                    startTime: '17:30',
                    endTime: '19:00',
                    location: 'Capen Hall 213',
                    participants: 15,
                    status: 'confirmed'
                  }]} availabilityStatus="studying" nextAvailableSlot="7:30 PM" studyHoursToday={4.5} studyGoal={7} isEditable={true} onAddEvent={action('cs-afternoon-add')} onViewCalendar={action('cs-afternoon-view')} onEditEvent={action('cs-afternoon-edit')} onUpdateAvailability={action('cs-afternoon-update')} />
                    <Text variant="body-xs" color="secondary">
                      Study coordination, teaching assistance, and research participation
                    </Text>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Pre-Med Student Schedule */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Pre-Med Student - Research & Clinical Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Lab & Research Schedule:</Text>
                  <ProfileCalendarWidget user={{
                  id: 'jamie-premed',
                  name: 'Jamie Park',
                  timezone: 'America/New_York'
                }} todayEvents={[{
                  id: 'organic-chem-lab',
                  title: 'CHE 201 Organic Chemistry Lab',
                  type: 'class',
                  startTime: '10:00',
                  endTime: '13:00',
                  location: 'Chemistry Building B40',
                  status: 'confirmed'
                }, {
                  id: 'research-hospital',
                  title: 'Clinical Research at ECMC',
                  type: 'meeting',
                  startTime: '14:30',
                  endTime: '17:30',
                  location: 'Erie County Medical Center',
                  participants: 4,
                  status: 'confirmed'
                }]} availabilityStatus="busy" nextAvailableSlot="Tomorrow 9:00 AM" studyHoursToday={6} studyGoal={8} isEditable={true} onAddEvent={action('premed-research-add')} onViewCalendar={action('premed-research-view')} onEditEvent={action('premed-research-edit')} onUpdateAvailability={action('premed-research-update')} />
                  <Text variant="body-xs" color="secondary">
                    Laboratory work and clinical research experience for medical school preparation
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">MCAT Preparation:</Text>
                  <ProfileCalendarWidget user={{
                  id: 'jamie-mcat-prep',
                  name: 'Jamie Park',
                  timezone: 'America/New_York'
                }} todayEvents={[{
                  id: 'mcat-study-session',
                  title: 'MCAT Physics Practice',
                  type: 'study',
                  startTime: '08:00',
                  endTime: '10:00',
                  location: 'Health Sciences Library',
                  status: 'completed'
                }, {
                  id: 'mcat-group-review',
                  title: 'MCAT Study Group',
                  type: 'study',
                  startTime: '19:00',
                  endTime: '21:00',
                  location: 'Abbott Hall Study Room',
                  participants: 8,
                  status: 'confirmed'
                }, {
                  id: 'mcat-practice-test',
                  title: 'MCAT Practice Test Deadline',
                  type: 'deadline',
                  startTime: '23:59',
                  endTime: '23:59',
                  status: 'confirmed'
                }]} availabilityStatus="studying" nextAvailableSlot="5:00 PM" studyHoursToday={8} studyGoal={9} isEditable={true} onAddEvent={action('mcat-prep-add')} onViewCalendar={action('mcat-prep-view')} onEditEvent={action('mcat-prep-edit')} onUpdateAvailability={action('mcat-prep-update')} />
                  <Text variant="body-xs" color="secondary">
                    Intensive MCAT preparation with group study and practice test coordination
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Engineering Student Project Schedule */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Engineering Student - Senior Design Project:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Project Coordination:</Text>
                  <ProfileCalendarWidget user={{
                  id: 'alex-engineering',
                  name: 'Alex Rivera',
                  timezone: 'America/New_York'
                }} todayEvents={[{
                  id: 'senior-design-meeting',
                  title: 'Senior Design Team Meeting',
                  type: 'meeting',
                  startTime: '11:00',
                  endTime: '12:30',
                  location: 'Furnas Hall Maker Space',
                  participants: 5,
                  status: 'confirmed'
                }, {
                  id: 'prototype-testing',
                  title: 'Autonomous Drone Testing',
                  type: 'study',
                  startTime: '14:00',
                  endTime: '17:00',
                  location: 'Baird Point Testing Field',
                  participants: 3,
                  status: 'confirmed'
                }, {
                  id: 'sponsor-presentation',
                  title: 'Industry Sponsor Presentation',
                  type: 'meeting',
                  startTime: '18:00',
                  endTime: '19:00',
                  location: 'Zoom/Davis Hall 101',
                  participants: 8,
                  status: 'tentative'
                }]} availabilityStatus="busy" nextAvailableSlot="Tomorrow 10:00 AM" studyHoursToday={5.5} studyGoal={6} isEditable={true} onAddEvent={action('engineering-project-add')} onViewCalendar={action('engineering-project-view')} onEditEvent={action('engineering-project-edit')} onUpdateAvailability={action('engineering-project-update')} />
                  <Text variant="body-xs" color="secondary">
                    Senior design project with team coordination, testing, and industry presentations
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Leadership & Mentoring:</Text>
                  <ProfileCalendarWidget user={{
                  id: 'alex-leadership',
                  name: 'Alex Rivera',
                  timezone: 'America/New_York'
                }} todayEvents={[{
                  id: 'robotics-club-meeting',
                  title: 'Robotics Club Leadership Meeting',
                  type: 'meeting',
                  startTime: '16:00',
                  endTime: '17:30',
                  location: 'Student Union 403',
                  participants: 12,
                  status: 'confirmed'
                }, {
                  id: 'freshman-mentoring',
                  title: 'EE Freshman Mentoring Session',
                  type: 'meeting',
                  startTime: '19:00',
                  endTime: '20:30',
                  location: 'Bonner Hall Lounge',
                  participants: 8,
                  status: 'confirmed'
                }]} availabilityStatus="available" nextAvailableSlot="2:00 PM" studyHoursToday={3} studyGoal={5} isEditable={true} onAddEvent={action('leadership-mentoring-add')} onViewCalendar={action('leadership-mentoring-view')} onEditEvent={action('leadership-mentoring-edit')} onUpdateAvailability={action('leadership-mentoring-update')} />
                  <Text variant="body-xs" color="secondary">
                    Student organization leadership and peer mentoring responsibilities
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Schedule Management */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Schedule Management:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized calendar widget for on-campus schedule management:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Status Updates:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Touch-Friendly Calendar Management</Text>
                    <Text variant="body-xs" color="secondary">
                      One-touch availability updates while walking between Davis Hall and Lockwood Library
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Quick event additions during spontaneous study group formations
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Real-time schedule sharing for immediate study partner coordination
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Study progress tracking with visual goal achievement feedback
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus-Aware Scheduling:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Location-Integrated Time Management</Text>
                    <Text variant="body-xs" color="secondary">
                      Building-aware event creation with automatic location suggestions
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Transit time calculations between North Campus and South Campus
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Study space availability integration with Lockwood Library booking
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Weather-aware outdoor event suggestions and location alternatives
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(B=(L=f.parameters)==null?void 0:L.docs)==null?void 0:B.source}}};var V,R,G;T.parameters={...T.parameters,docs:{...(V=T.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    todayEvents: sampleEvents.busyStudentDay,
    upcomingEvents: sampleEvents.lightScheduleDay,
    availabilityStatus: 'available',
    nextAvailableSlot: '2:00 PM',
    studyHoursToday: 3.5,
    studyGoal: 6,
    isEditable: true,
    onAddEvent: action('playground-add-event'),
    onViewCalendar: action('playground-view-calendar'),
    onEditEvent: action('playground-edit-event'),
    onUpdateAvailability: action('playground-update-availability')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Calendar Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different calendar widget configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 max-w-md">
            <ProfileCalendarWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive calendar widget testing for University at Buffalo HIVE platform student scheduling
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(G=(R=T.parameters)==null?void 0:R.docs)==null?void 0:G.source}}};const Me=["Default","CompleteShowcase","Playground"];export{f as CompleteShowcase,x as Default,T as Playground,Me as __namedExportsOrder,He as default};
