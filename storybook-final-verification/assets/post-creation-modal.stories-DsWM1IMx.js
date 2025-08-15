import{j as e}from"./jsx-runtime-B9GTzLod.js";import{r as a}from"./index-BMjrbHXN.js";import{A as er,m as g}from"./framer-motion-proxy-Bip1EXUU.js";import{c as d}from"./utils-CytzSlOG.js";import{E as rr}from"./eye-off-BD-Ijkxb.js";import{E as tr}from"./eye-DHVClHkA.js";import{X as ar}from"./x-DmZh90ps.js";import{C as sr}from"./circle-alert-D27CINV1.js";import{M as nr}from"./minus-DgcdAxY4.js";import{P as ir}from"./plus-BTyRuzWD.js";import{C as or}from"./circle-check-big-fUBFJcwM.js";import{S as lr}from"./send-BhLLUBQ1.js";import{T as cr}from"./type-DoE-GsQW.js";import{C as dr}from"./calendar-RwBiWFlj.js";import{B as mr}from"./bar-chart-3-h9BTbren.js";import{c as pr}from"./createLucideIcon-DtX30ipI.js";import{a as o}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ur=pr("Megaphone",[["path",{d:"m3 11 18-5v12L3 14v-3z",key:"n962bs"}],["path",{d:"M11.6 16.8a3 3 0 1 1-5.8-1.6",key:"1yl0tm"}]]),te=[{type:"text",label:"Text Post",description:"Share thoughts, questions, or updates",icon:e.jsx(cr,{className:"w-5 h-5"}),color:"text-[var(--hive-text-primary)]",bgColor:"bg-[var(--hive-background-secondary)]/60",borderColor:"border-[var(--hive-border-primary)]/30"},{type:"event",label:"Event",description:"Schedule meetings, activities, or gatherings",icon:e.jsx(dr,{className:"w-5 h-5"}),color:"text-[var(--hive-brand-primary)]",bgColor:"bg-[var(--hive-brand-primary)]/10",borderColor:"border-[var(--hive-brand-primary)]/30"},{type:"poll",label:"Poll",description:"Gather opinions and make group decisions",icon:e.jsx(mr,{className:"w-5 h-5"}),color:"text-[var(--hive-status-info)]",bgColor:"bg-[var(--hive-status-info)]/10",borderColor:"border-[var(--hive-status-info)]/30"},{type:"announcement",label:"Announcement",description:"Important notices and updates",icon:e.jsx(ur,{className:"w-5 h-5"}),color:"text-[var(--hive-status-warning)]",bgColor:"bg-[var(--hive-status-warning)]/10",borderColor:"border-[var(--hive-status-warning)]/30",requiredRole:"co_leader"}],vr=[{value:"low",label:"Low Priority",color:"text-gray-400"},{value:"medium",label:"Medium Priority",color:"text-blue-400"},{value:"high",label:"High Priority",color:"text-orange-400"},{value:"urgent",label:"Urgent",color:"text-red-400"}],f=({isOpen:l,onClose:i,onSubmit:v,spaceType:h,userRole:b="member",initialType:y="text",isSubmitting:c=!1,className:x})=>{const[s,Ae]=a.useState(y),[j,Q]=a.useState(""),[q,_e]=a.useState(!1),[n,G]=a.useState({}),[A,H]=a.useState(""),[_,$]=a.useState(""),[F,z]=a.useState(""),[B,W]=a.useState(""),[Fe,Le]=a.useState(""),[L,Y]=a.useState(),[U,Ve]=a.useState(!0),[V,X]=a.useState(""),[m,N]=a.useState(["",""]),[J,Qe]=a.useState(!1),[K,Ge]=a.useState(7),[Z,He]=a.useState(!1),[ee,$e]=a.useState("medium"),[re,ze]=a.useState(!1),[Be,hr]=a.useState(""),We=a.useRef(null);a.useRef(null);const Ye=r=>{const t=te.find(p=>p.type===r);return t!=null&&t.requiredRole?t.requiredRole==="co_leader"?b==="leader"||b==="co_leader":b===t.requiredRole:!0},Ue=()=>{const r={};return j.trim()||(r.content="Content is required"),s==="event"&&(A.trim()||(r.eventTitle="Event title is required"),_||(r.eventDate="Event date is required"),F||(r.eventTime="Event time is required")),s==="poll"&&(V.trim()||(r.pollQuestion="Poll question is required"),m.filter(p=>p.trim()).length<2&&(r.pollOptions="At least 2 poll options are required")),G(r),Object.keys(r).length===0},Xe=async()=>{if(!Ue())return;const r={type:s,content:j.trim()};s==="event"&&(r.event={title:A.trim(),date:_,time:F,location:B.trim()||void 0,description:Fe.trim()||void 0,capacity:L,requireRsvp:U}),s==="poll"&&(r.poll={question:V.trim(),options:m.filter(t=>t.trim()),allowMultiple:J,expiresIn:K,anonymous:Z}),s==="announcement"&&(r.announcement={priority:ee,pinned:re,expiresAt:Be||void 0});try{await v(r),S()}catch(t){console.error("Failed to create post:",t)}},S=()=>{Q(""),H(""),$(""),z(""),W(""),Le(""),Y(void 0),X(""),N(["",""]),G({}),i()},Je=()=>{m.length<6&&N([...m,""])},Ke=r=>{m.length>2&&N(m.filter((t,p)=>p!==r))},Ze=(r,t)=>{const p=[...m];p[r]=t,N(p)};return l?e.jsx(er,{children:e.jsxs(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[e.jsx(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:S,className:"absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl"}),e.jsxs(g.div,{initial:{opacity:0,scale:.95,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:20},className:d("relative w-full max-w-2xl max-h-[90vh] overflow-hidden","bg-gradient-to-br from-[var(--hive-background-secondary)]/95 via-[var(--hive-background-tertiary)]/90 to-[var(--hive-background-interactive)]/95","backdrop-blur-xl border border-[var(--hive-border-primary)]/30","rounded-3xl shadow-2xl",x),children:[e.jsxs("div",{className:"flex items-center justify-between p-6 border-b border-[var(--hive-border-primary)]/20",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)]",children:"Create Post"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)] mt-1",children:"Share something with your community"})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{onClick:()=>_e(!q),className:d("w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200",q?"bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30":"bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]/30 hover:text-[var(--hive-text-primary)]"),children:q?e.jsx(rr,{className:"w-5 h-5"}):e.jsx(tr,{className:"w-5 h-5"})}),e.jsx("button",{onClick:S,className:"w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200",children:e.jsx(ar,{className:"w-5 h-5"})})]})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-6 space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-semibold text-[var(--hive-text-primary)] mb-3",children:"Post Type"}),e.jsx("div",{className:"grid grid-cols-2 gap-3",children:te.map(r=>{const t=!Ye(r.type);return e.jsxs(g.button,{whileHover:t?{}:{scale:1.02},whileTap:t?{}:{scale:.98},onClick:()=>!t&&Ae(r.type),disabled:t,className:d("p-4 rounded-xl border transition-all duration-200 text-left",s===r.type?`${r.bgColor} ${r.borderColor} ${r.color}`:"bg-[var(--hive-background-tertiary)]/40 border-[var(--hive-border-primary)]/20 text-[var(--hive-text-secondary)]",!t&&"hover:border-[var(--hive-brand-primary)]/30",t&&"opacity-50 cursor-not-allowed"),children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[r.icon,e.jsx("span",{className:"font-medium",children:r.label}),t&&e.jsx(sr,{className:"w-4 h-4 text-[var(--hive-status-warning)]"})]}),e.jsx("p",{className:"text-xs opacity-80",children:r.description})]},r.type)})})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"block text-sm font-semibold text-[var(--hive-text-primary)] mb-2",children:[s==="poll"?"Poll Description":"Content",e.jsx("span",{className:"text-[var(--hive-status-error)]",children:"*"})]}),e.jsx("textarea",{ref:We,value:j,onChange:r=>Q(r.target.value),placeholder:s==="event"?"Describe your event and what people can expect...":s==="poll"?"Provide context or details about your poll...":s==="announcement"?"Share your important announcement...":"What's on your mind?",rows:4,className:d("w-full px-4 py-3 rounded-xl border resize-none transition-all duration-200","bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]","placeholder:text-[var(--hive-text-muted)]","focus:outline-none focus:ring-0",n.content?"border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]":"border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50")}),n.content&&e.jsx("p",{className:"text-xs text-[var(--hive-status-error)] mt-1",children:n.content})]}),s==="event"&&e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-sm font-semibold text-[var(--hive-text-primary)]",children:"Event Details"}),e.jsxs("div",{children:[e.jsxs("label",{className:"block text-sm font-medium text-[var(--hive-text-primary)] mb-2",children:["Event Title ",e.jsx("span",{className:"text-[var(--hive-status-error)]",children:"*"})]}),e.jsx("input",{type:"text",value:A,onChange:r=>H(r.target.value),placeholder:"Enter event title",className:d("w-full px-4 py-3 rounded-xl border transition-all duration-200","bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]","placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0",n.eventTitle?"border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]":"border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50")}),n.eventTitle&&e.jsx("p",{className:"text-xs text-[var(--hive-status-error)] mt-1",children:n.eventTitle})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsxs("label",{className:"block text-sm font-medium text-[var(--hive-text-primary)] mb-2",children:["Date ",e.jsx("span",{className:"text-[var(--hive-status-error)]",children:"*"})]}),e.jsx("input",{type:"date",value:_,onChange:r=>$(r.target.value),className:d("w-full px-4 py-3 rounded-xl border transition-all duration-200","bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]","focus:outline-none focus:ring-0",n.eventDate?"border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]":"border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50")}),n.eventDate&&e.jsx("p",{className:"text-xs text-[var(--hive-status-error)] mt-1",children:n.eventDate})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"block text-sm font-medium text-[var(--hive-text-primary)] mb-2",children:["Time ",e.jsx("span",{className:"text-[var(--hive-status-error)]",children:"*"})]}),e.jsx("input",{type:"time",value:F,onChange:r=>z(r.target.value),className:d("w-full px-4 py-3 rounded-xl border transition-all duration-200","bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]","focus:outline-none focus:ring-0",n.eventTime?"border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]":"border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50")}),n.eventTime&&e.jsx("p",{className:"text-xs text-[var(--hive-status-error)] mt-1",children:n.eventTime})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-[var(--hive-text-primary)] mb-2",children:"Location"}),e.jsx("input",{type:"text",value:B,onChange:r=>W(r.target.value),placeholder:"Where will this event take place?",className:"w-full px-4 py-3 rounded-xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",checked:U,onChange:r=>Ve(r.target.checked),className:"w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20"}),e.jsx("span",{className:"text-sm text-[var(--hive-text-primary)]",children:"Require RSVP"})]}),L!==void 0&&e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("label",{className:"text-sm text-[var(--hive-text-primary)]",children:"Capacity:"}),e.jsx("input",{type:"number",value:L,onChange:r=>Y(Number(r.target.value)||void 0),min:"1",className:"w-20 px-2 py-1 rounded border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm focus:outline-none focus:border-[var(--hive-brand-primary)]/50"})]})]})]}),s==="poll"&&e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-sm font-semibold text-[var(--hive-text-primary)]",children:"Poll Details"}),e.jsxs("div",{children:[e.jsxs("label",{className:"block text-sm font-medium text-[var(--hive-text-primary)] mb-2",children:["Poll Question ",e.jsx("span",{className:"text-[var(--hive-status-error)]",children:"*"})]}),e.jsx("input",{type:"text",value:V,onChange:r=>X(r.target.value),placeholder:"What would you like to ask?",className:d("w-full px-4 py-3 rounded-xl border transition-all duration-200","bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]","placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0",n.pollQuestion?"border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]":"border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50")}),n.pollQuestion&&e.jsx("p",{className:"text-xs text-[var(--hive-status-error)] mt-1",children:n.pollQuestion})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"block text-sm font-medium text-[var(--hive-text-primary)] mb-2",children:["Poll Options ",e.jsx("span",{className:"text-[var(--hive-status-error)]",children:"*"})]}),e.jsxs("div",{className:"space-y-2",children:[m.map((r,t)=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"text",value:r,onChange:p=>Ze(t,p.target.value),placeholder:`Option ${t+1}`,className:"flex-1 px-4 py-2 rounded-xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200"}),m.length>2&&e.jsx("button",{onClick:()=>Ke(t),className:"w-8 h-8 rounded-lg bg-[var(--hive-status-error)]/10 text-[var(--hive-status-error)] hover:bg-[var(--hive-status-error)]/20 transition-colors duration-200 flex items-center justify-center",children:e.jsx(nr,{className:"w-4 h-4"})})]},t)),m.length<6&&e.jsxs("button",{onClick:Je,className:"flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] hover:border-[var(--hive-brand-primary)]/50 transition-all duration-200",children:[e.jsx(ir,{className:"w-4 h-4"}),e.jsx("span",{className:"text-sm",children:"Add Option"})]})]}),n.pollOptions&&e.jsx("p",{className:"text-xs text-[var(--hive-status-error)] mt-1",children:n.pollOptions})]}),e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",checked:J,onChange:r=>Qe(r.target.checked),className:"w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20"}),e.jsx("span",{className:"text-sm text-[var(--hive-text-primary)]",children:"Allow multiple choices"})]}),e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",checked:Z,onChange:r=>He(r.target.checked),className:"w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20"}),e.jsx("span",{className:"text-sm text-[var(--hive-text-primary)]",children:"Anonymous voting"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-[var(--hive-text-primary)] mb-2",children:"Poll Duration"}),e.jsxs("select",{value:K||"",onChange:r=>Ge(Number(r.target.value)||void 0),className:"px-4 py-2 rounded-xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200",children:[e.jsx("option",{value:"",children:"No expiration"}),e.jsx("option",{value:1,children:"1 day"}),e.jsx("option",{value:3,children:"3 days"}),e.jsx("option",{value:7,children:"1 week"}),e.jsx("option",{value:14,children:"2 weeks"}),e.jsx("option",{value:30,children:"1 month"})]})]})]}),s==="announcement"&&e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-sm font-semibold text-[var(--hive-text-primary)]",children:"Announcement Settings"}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-[var(--hive-text-primary)] mb-2",children:"Priority Level"}),e.jsx("div",{className:"grid grid-cols-2 gap-2",children:vr.map(r=>e.jsx("button",{onClick:()=>$e(r.value),className:d("p-3 rounded-xl border transition-all duration-200 text-left",ee===r.value?"bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)]":"bg-[var(--hive-background-tertiary)]/40 border-[var(--hive-border-primary)]/20 text-[var(--hive-text-secondary)] hover:border-[var(--hive-brand-primary)]/30"),children:e.jsx("span",{className:d("text-sm font-medium",r.color),children:r.label})},r.value))})]}),e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",checked:re,onChange:r=>ze(r.target.checked),className:"w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20"}),e.jsx("span",{className:"text-sm text-[var(--hive-text-primary)]",children:"Pin to top"})]})})]})]}),e.jsxs("div",{className:"flex items-center justify-between p-6 border-t border-[var(--hive-border-primary)]/20",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm text-[var(--hive-text-muted)]",children:[e.jsx(or,{className:"w-4 h-4"}),e.jsx("span",{children:"Draft saved automatically"})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{onClick:S,disabled:c,className:"px-6 py-2.5 rounded-2xl border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-300 disabled:opacity-50",children:"Cancel"}),e.jsx(g.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:Xe,disabled:c||!j.trim(),className:d("px-6 py-2.5 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2","bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40","hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60","disabled:opacity-50 disabled:cursor-not-allowed"),children:c?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"}),e.jsx("span",{children:"Publishing..."})]}):e.jsxs(e.Fragment,{children:[e.jsx(lr,{className:"w-4 h-4"}),e.jsxs("span",{children:["Publish ",s==="text"?"Post":s==="event"?"Event":s==="poll"?"Poll":"Announcement"]})]})})]})]})]})]})}):null};f.__docgenInfo={description:"",methods:[],displayName:"PostCreationModal",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: PostCreationData) => Promise<void>",signature:{arguments:[{type:{name:"PostCreationData"},name:"data"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},spaceType:{required:!1,tsType:{name:"union",raw:"'university' | 'residential' | 'greek' | 'student'",elements:[{name:"literal",value:"'university'"},{name:"literal",value:"'residential'"},{name:"literal",value:"'greek'"},{name:"literal",value:"'student'"}]},description:""},userRole:{required:!1,tsType:{name:"union",raw:"'leader' | 'co_leader' | 'member'",elements:[{name:"literal",value:"'leader'"},{name:"literal",value:"'co_leader'"},{name:"literal",value:"'member'"}]},description:"",defaultValue:{value:"'member'",computed:!1}},initialType:{required:!1,tsType:{name:"union",raw:"'text' | 'event' | 'poll' | 'announcement'",elements:[{name:"literal",value:"'text'"},{name:"literal",value:"'event'"},{name:"literal",value:"'poll'"},{name:"literal",value:"'announcement'"}]},description:"",defaultValue:{value:"'text'",computed:!1}},isSubmitting:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Ir={title:"HIVE/Spaces/Organisms/PostCreationModal",component:f,parameters:{layout:"fullscreen",docs:{description:{component:"Modal for creating different types of posts in spaces. Supports text posts, events, polls, and announcements with form validation and role-based permissions."}}},argTypes:{spaceType:{control:{type:"select"},options:["university","residential","greek","student"]},userRole:{control:{type:"select"},options:["leader","co_leader","member"]},initialType:{control:{type:"select"},options:["text","event","poll","announcement"]},isSubmitting:{control:{type:"boolean"}}},tags:["autodocs"]},u=async l=>{o("submit")(l),await new Promise(i=>setTimeout(i,2e3))},w={args:{isOpen:!0,onClose:o("close"),onSubmit:u,spaceType:"university",userRole:"member"}},C={args:{isOpen:!0,onClose:o("close"),onSubmit:u,spaceType:"university",userRole:"leader"},parameters:{docs:{description:{story:"Modal as viewed by a space leader with access to announcement creation."}}}},k={args:{isOpen:!0,onClose:o("close"),onSubmit:u,spaceType:"university",userRole:"member",initialType:"event"},parameters:{docs:{description:{story:"Modal pre-configured for event creation with date/time pickers and RSVP options."}}}},T={args:{isOpen:!0,onClose:o("close"),onSubmit:u,spaceType:"student",userRole:"member",initialType:"poll"},parameters:{docs:{description:{story:"Modal configured for poll creation with dynamic option management."}}}},P={args:{isOpen:!0,onClose:o("close"),onSubmit:u,spaceType:"university",userRole:"leader",initialType:"announcement"},parameters:{docs:{description:{story:"Modal for creating announcements with priority levels and pinning options."}}}},O={args:{isOpen:!0,onClose:o("close"),onSubmit:u,spaceType:"residential",userRole:"member"},parameters:{docs:{description:{story:"Modal in the context of a residential space (dorm/floor)."}}}},R={args:{isOpen:!0,onClose:o("close"),onSubmit:u,spaceType:"greek",userRole:"co_leader"},parameters:{docs:{description:{story:"Modal in the context of a Greek life space with co-leader permissions."}}}},E={args:{isOpen:!0,onClose:o("close"),onSubmit:u,spaceType:"university",userRole:"member",isSubmitting:!0},parameters:{docs:{description:{story:"Modal in submitting state showing loading indicators."}}}},M={render:()=>{const[l,i]=a.useState(!0),[v,h]=a.useState(!1),b=async c=>{h(!0);try{await new Promise(x=>setTimeout(x,2e3)),o("submit")(c),console.log("Post created:",c),i(!1)}catch(x){console.error("Failed to create post:",x)}finally{h(!1)}},y=()=>{i(!1),o("close")()};return e.jsxs("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:[!l&&e.jsx("div",{className:"text-center",children:e.jsx("button",{onClick:()=>i(!0),className:"px-6 py-3 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300",children:"Create Post"})}),e.jsx(f,{isOpen:l,onClose:y,onSubmit:b,spaceType:"university",userRole:"leader",isSubmitting:v})]})},parameters:{docs:{description:{story:"Fully interactive demo with state management and realistic submission flow."}}}},D={render:()=>{const[l,i]=a.useState(!0),v=async h=>{o("submit")(h)};return e.jsxs("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:[e.jsx(f,{isOpen:l,onClose:()=>i(!1),onSubmit:v,spaceType:"university",userRole:"member",initialType:"event"}),!l&&e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-[var(--hive-text-secondary)] mb-4",children:"Modal closed. Try submitting without filling required fields to see validation."}),e.jsx("button",{onClick:()=>i(!0),className:"px-6 py-3 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300",children:"Reopen Modal"})]})]})},parameters:{docs:{description:{story:"Demo showing form validation with error states and required field handling."}}}},I={render:()=>{const[l,i]=a.useState(!0),[v,h]=a.useState("text"),b=[{type:"text",label:"Text Post"},{type:"event",label:"Event"},{type:"poll",label:"Poll"},{type:"announcement",label:"Announcement"}],y=async c=>{o("submit")(c),await new Promise(x=>setTimeout(x,1e3)),i(!1)};return e.jsxs("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:[!l&&e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)]",children:"Create Different Post Types"}),e.jsx("div",{className:"flex justify-center gap-4",children:b.map(c=>e.jsxs("button",{onClick:()=>{h(c.type),i(!0)},className:"px-4 py-2 bg-[var(--hive-background-secondary)]/60 text-[var(--hive-text-primary)] border border-[var(--hive-border-primary)]/30 rounded-xl hover:bg-[var(--hive-brand-primary)]/10 hover:border-[var(--hive-brand-primary)]/30 transition-all duration-300",children:["Create ",c.label]},c.type))})]}),e.jsx(f,{isOpen:l,onClose:()=>i(!1),onSubmit:y,spaceType:"university",userRole:"leader",initialType:v})]})},parameters:{docs:{description:{story:"Demo showing all different post types with the ability to switch between them."}}}};var ae,se,ne;w.parameters={...w.parameters,docs:{...(ae=w.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'university',
    userRole: 'member'
  }
}`,...(ne=(se=w.parameters)==null?void 0:se.docs)==null?void 0:ne.source}}};var ie,oe,le;C.parameters={...C.parameters,docs:{...(ie=C.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'university',
    userRole: 'leader'
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal as viewed by a space leader with access to announcement creation.'
      }
    }
  }
}`,...(le=(oe=C.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var ce,de,me;k.parameters={...k.parameters,docs:{...(ce=k.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'university',
    userRole: 'member',
    initialType: 'event'
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal pre-configured for event creation with date/time pickers and RSVP options.'
      }
    }
  }
}`,...(me=(de=k.parameters)==null?void 0:de.docs)==null?void 0:me.source}}};var pe,ue,ve;T.parameters={...T.parameters,docs:{...(pe=T.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'student',
    userRole: 'member',
    initialType: 'poll'
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal configured for poll creation with dynamic option management.'
      }
    }
  }
}`,...(ve=(ue=T.parameters)==null?void 0:ue.docs)==null?void 0:ve.source}}};var he,be,xe;P.parameters={...P.parameters,docs:{...(he=P.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'university',
    userRole: 'leader',
    initialType: 'announcement'
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal for creating announcements with priority levels and pinning options.'
      }
    }
  }
}`,...(xe=(be=P.parameters)==null?void 0:be.docs)==null?void 0:xe.source}}};var ye,ge,fe;O.parameters={...O.parameters,docs:{...(ye=O.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'residential',
    userRole: 'member'
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in the context of a residential space (dorm/floor).'
      }
    }
  }
}`,...(fe=(ge=O.parameters)==null?void 0:ge.docs)==null?void 0:fe.source}}};var je,Ne,Se;R.parameters={...R.parameters,docs:{...(je=R.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'greek',
    userRole: 'co_leader'
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in the context of a Greek life space with co-leader permissions.'
      }
    }
  }
}`,...(Se=(Ne=R.parameters)==null?void 0:Ne.docs)==null?void 0:Se.source}}};var we,Ce,ke;E.parameters={...E.parameters,docs:{...(we=E.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'university',
    userRole: 'member',
    isSubmitting: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in submitting state showing loading indicators.'
      }
    }
  }
}`,...(ke=(Ce=E.parameters)==null?void 0:Ce.docs)==null?void 0:ke.source}}};var Te,Pe,Oe;M.parameters={...M.parameters,docs:{...(Te=M.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (data: PostCreationData) => {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        action('submit')(data);
        console.log('Post created:', data);
        setIsOpen(false);
      } catch (error) {
        console.error('Failed to create post:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
    const handleClose = () => {
      setIsOpen(false);
      action('close')();
    };
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        {!isOpen && <div className="text-center">
            <button onClick={() => setIsOpen(true)} className="px-6 py-3 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300">
              Create Post
            </button>
          </div>}

        <PostCreationModal isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} spaceType="university" userRole="leader" isSubmitting={isSubmitting} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with state management and realistic submission flow.'
      }
    }
  }
}`,...(Oe=(Pe=M.parameters)==null?void 0:Pe.docs)==null?void 0:Oe.source}}};var Re,Ee,Me;D.parameters={...D.parameters,docs:{...(Re=D.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const handleSubmit = async (data: PostCreationData) => {
      // This will trigger validation since we're not providing required fields
      action('submit')(data);
    };
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <PostCreationModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} spaceType="university" userRole="member" initialType="event" />
        
        {!isOpen && <div className="text-center">
            <p className="text-[var(--hive-text-secondary)] mb-4">
              Modal closed. Try submitting without filling required fields to see validation.
            </p>
            <button onClick={() => setIsOpen(true)} className="px-6 py-3 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300">
              Reopen Modal
            </button>
          </div>}
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo showing form validation with error states and required field handling.'
      }
    }
  }
}`,...(Me=(Ee=D.parameters)==null?void 0:Ee.docs)==null?void 0:Me.source}}};var De,Ie,qe;I.parameters={...I.parameters,docs:{...(De=I.parameters)==null?void 0:De.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentType, setCurrentType] = useState<'text' | 'event' | 'poll' | 'announcement'>('text');
    const postTypes = [{
      type: 'text' as const,
      label: 'Text Post'
    }, {
      type: 'event' as const,
      label: 'Event'
    }, {
      type: 'poll' as const,
      label: 'Poll'
    }, {
      type: 'announcement' as const,
      label: 'Announcement'
    }];
    const handleSubmit = async (data: PostCreationData) => {
      action('submit')(data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsOpen(false);
    };
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        {!isOpen && <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
              Create Different Post Types
            </h2>
            <div className="flex justify-center gap-4">
              {postTypes.map(type => <button key={type.type} onClick={() => {
            setCurrentType(type.type);
            setIsOpen(true);
          }} className="px-4 py-2 bg-[var(--hive-background-secondary)]/60 text-[var(--hive-text-primary)] border border-[var(--hive-border-primary)]/30 rounded-xl hover:bg-[var(--hive-brand-primary)]/10 hover:border-[var(--hive-brand-primary)]/30 transition-all duration-300">
                  Create {type.label}
                </button>)}
            </div>
          </div>}

        <PostCreationModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} spaceType="university" userRole="leader" initialType={currentType} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo showing all different post types with the ability to switch between them.'
      }
    }
  }
}`,...(qe=(Ie=I.parameters)==null?void 0:Ie.docs)==null?void 0:qe.source}}};const qr=["Default","AsLeader","EventCreation","PollCreation","AnnouncementCreation","ResidentialSpace","GreekSpace","SubmittingState","InteractiveDemo","FormValidation","AllPostTypes"];export{I as AllPostTypes,P as AnnouncementCreation,C as AsLeader,w as Default,k as EventCreation,D as FormValidation,R as GreekSpace,M as InteractiveDemo,T as PollCreation,O as ResidentialSpace,E as SubmittingState,qr as __namedExportsOrder,Ir as default};
