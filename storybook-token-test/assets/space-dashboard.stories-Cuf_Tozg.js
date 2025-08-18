import{j as e}from"./jsx-runtime-B9GTzLod.js";import{r as se}from"./index-BMjrbHXN.js";import{m as s,A as ie}from"./framer-motion-proxy-Bip1EXUU.js";import{c}from"./utils-CytzSlOG.js";import{U as C}from"./users-B5XgMSov.js";import{U as ce}from"./user-plus-BC0iow-Q.js";import{S as le}from"./share-2-DREqtcC9.js";import{B as de}from"./bell-DcMkR9fh.js";import{S as R}from"./settings-Cw08DGvz.js";import{M as me}from"./message-square-B08MMCUN.js";import{C as k}from"./calendar-RwBiWFlj.js";import{P as M}from"./plus-BTyRuzWD.js";import{C as pe}from"./crown-Bf-Ij_V7.js";import{E as ue}from"./ellipsis-D2AHQBIe.js";import{A as ve}from"./activity-BpE6NZRo.js";import{H as he}from"./hash-ujXIHQxc.js";import{a}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./createLucideIcon-DtX30ipI.js";import"./v4-CtRu48qb.js";const $=({space:r,posts:N,plantedTools:w,currentUser:o,onJoinSpace:K,onLeaveSpace:be,onPlantTool:Q,onConfigureTool:f,onRemoveTool:fe,onCreatePost:X,onPostReaction:S,onShareSpace:Y,onManageSpace:ee,variant:j="default",showToolGrid:T=!0,className:ae})=>{const[te,oe]=se.useState("posts"),m=(o==null?void 0:o.role)==="leader"||(o==null?void 0:o.role)==="co_leader",P=(o==null?void 0:o.role)!=="non_member"&&(o==null?void 0:o.role)!==void 0,re=()=>{switch(r.type){case"university":return"🎓";case"residential":return"🏠";case"greek":return"👥";case"student":return"⭐"}},ne=t=>{const l=new Date,i=new Date(t),n=Math.floor((l.getTime()-i.getTime())/(1e3*60*60));return n<1?"Just now":n<24?`${n}h ago`:n<168?`${Math.floor(n/24)}d ago`:`${Math.floor(n/168)}w ago`};return e.jsxs("div",{className:c("min-h-screen bg-[var(--hive-background-primary)]",ae),children:[e.jsx(s.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},className:"bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl border-b border-[var(--hive-border-primary)]/20 sticky top-0 z-50",children:e.jsx("div",{className:"max-w-7xl mx-auto px-6 py-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 rounded-2xl bg-[var(--hive-background-tertiary)]/80 border border-[var(--hive-border-primary)]/30 flex items-center justify-center",children:e.jsx("span",{className:"text-2xl",children:r.logoUrl?"🏛️":re()})}),e.jsxs("div",{children:[e.jsxs("h1",{className:"text-xl font-bold text-[var(--hive-text-primary)] flex items-center gap-2",children:[r.name,r.type==="university"&&"academic"in r&&r.academic.isOfficial&&e.jsx("div",{className:"px-2 py-0.5 bg-[var(--hive-status-info)]/20 border border-[var(--hive-status-info)]/40 rounded-full",children:e.jsx("span",{className:"text-xs font-semibold text-[var(--hive-status-info)]",children:"Official"})})]}),e.jsxs("div",{className:"flex items-center gap-4 text-sm text-[var(--hive-text-secondary)]",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(C,{className:"w-4 h-4"}),e.jsxs("span",{children:[r.memberCount.toLocaleString()," members"]})]}),e.jsxs("span",{className:"capitalize",children:[r.type," space"]})]})]})]}),e.jsx("div",{className:"flex items-center gap-3",children:P?e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:Y,className:"w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] transition-colors duration-200",children:e.jsx(le,{className:"w-4 h-4"})}),e.jsx("button",{className:"w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] transition-colors duration-200",children:e.jsx(de,{className:"w-4 h-4"})}),m&&e.jsx("button",{onClick:ee,className:"w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] transition-colors duration-200",children:e.jsx(R,{className:"w-4 h-4"})})]}):e.jsxs(s.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:K,className:"px-6 py-2.5 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300",children:[e.jsx(ce,{className:"w-4 h-4 mr-2"}),"Join Space"]})})]})})}),e.jsx("div",{className:"max-w-7xl mx-auto px-6 py-8",children:e.jsxs("div",{className:c("grid gap-8",T&&j==="default"?"grid-cols-5":"grid-cols-1"),children:[e.jsx("div",{className:c(T&&j==="default"?"col-span-3":"col-span-1"),children:e.jsxs(s.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.2},className:"space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)]",children:"Activity"}),e.jsx("div",{className:"flex items-center bg-[var(--hive-background-secondary)]/60 border border-[var(--hive-border-primary)]/20 rounded-xl p-1",children:["posts","events","members"].map(t=>e.jsxs("button",{onClick:()=>oe(t),className:c("px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",te===t?"bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]":"text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"),children:[t==="posts"&&e.jsx(me,{className:"w-4 h-4 mr-2"}),t==="events"&&e.jsx(k,{className:"w-4 h-4 mr-2"}),t==="members"&&e.jsx(C,{className:"w-4 h-4 mr-2"}),t.charAt(0).toUpperCase()+t.slice(1)]},t))})]}),P&&e.jsxs(s.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:X,className:"px-4 py-2 bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30 rounded-xl font-medium hover:bg-[var(--hive-brand-primary)]/20 transition-all duration-300",children:[e.jsx(M,{className:"w-4 h-4 mr-2"}),"Create Post"]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(ie,{children:N.map((t,l)=>e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:l*.1},className:"bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl border border-[var(--hive-border-primary)]/20 rounded-2xl p-6",children:[e.jsxs("div",{className:"flex items-start justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center",children:e.jsx("span",{className:"text-sm font-bold text-[var(--hive-text-primary)]",children:t.author.name.charAt(0)})}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-medium text-[var(--hive-text-primary)]",children:t.author.name}),t.author.role==="leader"&&e.jsx(pe,{className:"w-3 h-3 text-[var(--hive-brand-secondary)]"})]}),e.jsx("span",{className:"text-xs text-[var(--hive-text-muted)]",children:ne(t.timestamp)})]})]}),e.jsx("button",{className:"text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors duration-200",children:e.jsx(ue,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("p",{className:"text-[var(--hive-text-primary)] leading-relaxed",children:t.content}),t.type==="event"&&e.jsx("div",{className:"mt-3 p-3 bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/20 rounded-xl",children:e.jsxs("div",{className:"flex items-center gap-2 text-[var(--hive-brand-primary)]",children:[e.jsx(k,{className:"w-4 h-4"}),e.jsx("span",{className:"font-medium",children:"Event"})]})})]}),t.reactions&&t.reactions.length>0&&e.jsx("div",{className:"flex items-center gap-2 pt-3 border-t border-[var(--hive-border-primary)]/10",children:t.reactions.map((i,n)=>e.jsxs("button",{onClick:()=>S==null?void 0:S(t.id,i.emoji),className:c("px-3 py-1 rounded-full text-sm transition-all duration-200",i.userReacted?"bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30":"bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 hover:bg-[var(--hive-background-tertiary)]/60"),children:[i.emoji," ",i.count]},n))})]},t.id))}),N.length===0&&e.jsxs("div",{className:"text-center py-12 text-[var(--hive-text-muted)]",children:[e.jsx(ve,{className:"w-12 h-12 mx-auto mb-4 opacity-50"}),e.jsx("p",{children:"No activity yet. Be the first to post!"})]})]})]})}),T&&j==="default"&&e.jsx("div",{className:"col-span-2",children:e.jsxs(s.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{delay:.3},className:"space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)]",children:"Tools"}),m&&e.jsxs(s.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:Q,className:"px-4 py-2 bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30 rounded-xl font-medium hover:bg-[var(--hive-brand-primary)]/20 transition-all duration-300",children:[e.jsx(M,{className:"w-4 h-4 mr-2"}),"Plant Tool"]})]}),e.jsxs("div",{className:"space-y-4",children:[w.map((t,l)=>e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4+l*.1},className:"bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl border border-[var(--hive-border-primary)]/20 rounded-2xl p-4",children:[e.jsxs("div",{className:"flex items-start justify-between mb-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center",children:e.jsx("span",{className:"text-lg",children:t.icon})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-[var(--hive-text-primary)]",children:t.name}),e.jsx("p",{className:"text-sm text-[var(--hive-text-secondary)]",children:t.description})]})]}),m&&e.jsx("button",{onClick:()=>f==null?void 0:f(t.id),className:"text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors duration-200",children:e.jsx(R,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:c("px-2 py-1 rounded-full text-xs font-medium",t.status==="active"&&"bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)]",t.status==="configured"&&"bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)]",t.status==="needs_setup"&&"bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)]"),children:t.status.replace("_"," ")}),t.outputs&&t.outputs>0&&e.jsxs("span",{className:"text-xs text-[var(--hive-text-muted)]",children:[t.outputs," posts"]})]})]},t.id)),w.length===0&&e.jsxs("div",{className:"text-center py-8 text-[var(--hive-text-muted)]",children:[e.jsx(he,{className:"w-8 h-8 mx-auto mb-2 opacity-50"}),e.jsx("p",{className:"text-sm",children:"No tools planted yet"}),m&&e.jsx("p",{className:"text-xs mt-1",children:"Plant tools to add functionality"})]})]})]})})]})})]})};$.__docgenInfo={description:"",methods:[],displayName:"SpaceDashboard",props:{space:{required:!0,tsType:{name:"union",raw:"UniversitySpace | GreekSpace | ResidentialSpace | StudentSpace",elements:[{name:"UniversitySpace"},{name:"GreekSpace"},{name:"ResidentialSpace"},{name:"StudentSpace"}]},description:""},posts:{required:!0,tsType:{name:"Array",elements:[{name:"SpacePost"}],raw:"SpacePost[]"},description:""},plantedTools:{required:!0,tsType:{name:"Array",elements:[{name:"PlantedTool"}],raw:"PlantedTool[]"},description:""},currentUser:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  role?: 'leader' | 'co_leader' | 'member' | 'non_member';
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"role",value:{name:"union",raw:"'leader' | 'co_leader' | 'member' | 'non_member'",elements:[{name:"literal",value:"'leader'"},{name:"literal",value:"'co_leader'"},{name:"literal",value:"'member'"},{name:"literal",value:"'non_member'"}],required:!1}}]}},description:""},onJoinSpace:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onLeaveSpace:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onPlantTool:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onConfigureTool:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"void"}}},description:""},onRemoveTool:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"void"}}},description:""},onCreatePost:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onPostReaction:{required:!1,tsType:{name:"signature",type:"function",raw:"(postId: string, emoji: string) => void",signature:{arguments:[{type:{name:"string"},name:"postId"},{type:{name:"string"},name:"emoji"}],return:{name:"void"}}},description:""},onShareSpace:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onManageSpace:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'compact'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'compact'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},showToolGrid:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const De={title:"HIVE/Spaces/Organisms/SpaceDashboard",component:$,parameters:{layout:"fullscreen",docs:{description:{component:"The main Space Dashboard with 60/40 layout featuring Post Board and Tool Grid. This is the core interface users see when inside a space."}}},argTypes:{variant:{control:{type:"select"},options:["default","compact"]},showToolGrid:{control:{type:"boolean"}}},tags:["autodocs"]},d={id:"cs101",name:"CS 101: Introduction to Programming",description:"Learn the fundamentals of computer programming with Python",memberCount:247,type:"university",status:"active",logoUrl:"",createdAt:"2024-01-15T08:00:00Z",updatedAt:"2024-01-20T15:30:00Z",academic:{department:"Computer Science",courseCode:"CS 101",credits:3,semester:"Spring 2024",professor:"Dr. Sarah Chen",schedule:"MWF 10:00-11:00",isOfficial:!0},enrollment:{capacity:300,enrolled:247,waitlist:12,status:"open"}},g=[{id:"1",type:"announcement",content:"Welcome to CS 101! Please complete the setup instructions in your course packet before our first lab session.",author:{id:"prof1",name:"Dr. Sarah Chen",role:"leader"},timestamp:"2024-01-20T14:30:00Z",reactions:[{emoji:"👍",count:23,userReacted:!1},{emoji:"❤️",count:8,userReacted:!0}]},{id:"2",type:"event",content:"Reminder: Lab session tomorrow in the computer lab. We'll be covering variables and basic input/output.",author:{id:"ta1",name:"Alex Rodriguez",role:"co_leader"},timestamp:"2024-01-19T16:45:00Z",metadata:{eventDate:"Tomorrow at 2:00 PM"},reactions:[{emoji:"👍",count:15,userReacted:!1}]},{id:"3",type:"text",content:"Has anyone else had trouble with the Python installation? I'm getting an error when trying to run the hello world program.",author:{id:"student1",name:"Maya Patel",role:"member"},timestamp:"2024-01-19T11:20:00Z",reactions:[{emoji:"👍",count:7,userReacted:!1},{emoji:"🤔",count:3,userReacted:!1}]}],b=[{id:"event-system",name:"Event Management",description:"Create and manage class events, lab sessions, and office hours",icon:"📅",status:"active",category:"coordination",outputs:3,usageCount:15,lastUsed:"2024-01-20T10:00:00Z"},{id:"assignment-tracker",name:"Assignment Tracker",description:"Track assignments, due dates, and submission status",icon:"📝",status:"configured",category:"academic",outputs:8,usageCount:42,lastUsed:"2024-01-19T14:30:00Z"},{id:"study-groups",name:"Study Groups",description:"Form and coordinate study groups for exams and projects",icon:"👥",status:"needs_setup",category:"social",outputs:0}],p={args:{space:d,posts:g,plantedTools:b,currentUser:{id:"prof1",role:"leader"},onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onPlantTool:a("plant-tool"),onConfigureTool:a("configure-tool"),onRemoveTool:a("remove-tool"),onCreatePost:a("create-post"),onPostReaction:a("post-reaction"),onShareSpace:a("share-space"),onManageSpace:a("manage-space")}},u={args:{space:d,posts:g,plantedTools:b,currentUser:{id:"student1",role:"member"},onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onPlantTool:a("plant-tool"),onConfigureTool:a("configure-tool"),onRemoveTool:a("remove-tool"),onCreatePost:a("create-post"),onPostReaction:a("post-reaction"),onShareSpace:a("share-space"),onManageSpace:a("manage-space")}},v={args:{space:d,posts:g.slice(0,1),plantedTools:b,currentUser:{id:"visitor1",role:"non_member"},onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onPlantTool:a("plant-tool"),onConfigureTool:a("configure-tool"),onRemoveTool:a("remove-tool"),onCreatePost:a("create-post"),onPostReaction:a("post-reaction"),onShareSpace:a("share-space"),onManageSpace:a("manage-space")}},xe={id:"ellicott-3rd",name:"Ellicott Complex - 3rd Floor",description:"Connect with your floormates and coordinate floor activities",memberCount:42,type:"residential",status:"active",createdAt:"2024-01-10T08:00:00Z",updatedAt:"2024-01-20T15:30:00Z",housing:{buildingName:"Ellicott Complex",floor:3,wing:"East",buildingType:"dorm",capacity:50},community:{residents:42,ra:{name:"Jordan Smith",contact:"jordan.smith@university.edu"},amenities:["Study Lounge","Kitchen","Laundry"]}},ye=[{id:"1",type:"announcement",content:"Floor meeting tonight at 7 PM in the study lounge. We'll be discussing upcoming events and floor rules.",author:{id:"ra1",name:"Jordan Smith",role:"leader"},timestamp:"2024-01-20T12:00:00Z",reactions:[{emoji:"👍",count:18,userReacted:!0}]},{id:"2",type:"text",content:"Anyone want to order pizza for the Super Bowl watch party tomorrow? I'm thinking we get a few large pizzas to share.",author:{id:"resident1",name:"Sam Wilson",role:"member"},timestamp:"2024-01-19T18:30:00Z",reactions:[{emoji:"🍕",count:12,userReacted:!1},{emoji:"👍",count:8,userReacted:!0}]}],ge=[{id:"laundry-tracker",name:"Laundry Tracker",description:"Check washer and dryer availability in real-time",icon:"👕",status:"active",category:"coordination",outputs:5,usageCount:67},{id:"floor-events",name:"Floor Events",description:"Plan and coordinate floor activities and social events",icon:"🎉",status:"active",category:"social",outputs:12,usageCount:28}],h={args:{space:xe,posts:ye,plantedTools:ge,currentUser:{id:"resident1",role:"member"},onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onPlantTool:a("plant-tool"),onConfigureTool:a("configure-tool"),onRemoveTool:a("remove-tool"),onCreatePost:a("create-post"),onPostReaction:a("post-reaction"),onShareSpace:a("share-space"),onManageSpace:a("manage-space")}},x={args:{space:{...d,name:"New Study Group",memberCount:1,type:"student"},posts:[],plantedTools:[],currentUser:{id:"creator1",role:"leader"},onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onPlantTool:a("plant-tool"),onConfigureTool:a("configure-tool"),onRemoveTool:a("remove-tool"),onCreatePost:a("create-post"),onPostReaction:a("post-reaction"),onShareSpace:a("share-space"),onManageSpace:a("manage-space")},parameters:{docs:{description:{story:"Empty space with no posts or tools - typical for newly created spaces."}}}},y={args:{space:d,posts:g,plantedTools:b,currentUser:{id:"student1",role:"member"},variant:"compact",showToolGrid:!1,onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onPlantTool:a("plant-tool"),onConfigureTool:a("configure-tool"),onRemoveTool:a("remove-tool"),onCreatePost:a("create-post"),onPostReaction:a("post-reaction"),onShareSpace:a("share-space"),onManageSpace:a("manage-space")},parameters:{docs:{description:{story:"Compact variant without tool grid - useful for mobile or focused post viewing."}}}};var A,L,q;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    space: sampleUniversitySpace,
    posts: samplePosts,
    plantedTools: sampleTools,
    currentUser: {
      id: 'prof1',
      role: 'leader'
    },
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space')
  }
}`,...(q=(L=p.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var _,J,U;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    space: sampleUniversitySpace,
    posts: samplePosts,
    plantedTools: sampleTools,
    currentUser: {
      id: 'student1',
      role: 'member'
    },
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space')
  }
}`,...(U=(J=u.parameters)==null?void 0:J.docs)==null?void 0:U.source}}};var E,I,Z;v.parameters={...v.parameters,docs:{...(E=v.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    space: sampleUniversitySpace,
    posts: samplePosts.slice(0, 1),
    // Non-members see limited content
    plantedTools: sampleTools,
    currentUser: {
      id: 'visitor1',
      role: 'non_member'
    },
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space')
  }
}`,...(Z=(I=v.parameters)==null?void 0:I.docs)==null?void 0:Z.source}}};var D,G,H;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    space: sampleResidentialSpace,
    posts: residentialPosts,
    plantedTools: residentialTools,
    currentUser: {
      id: 'resident1',
      role: 'member'
    },
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space')
  }
}`,...(H=(G=h.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var z,F,B;x.parameters={...x.parameters,docs:{...(z=x.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    space: {
      ...sampleUniversitySpace,
      name: 'New Study Group',
      memberCount: 1,
      type: 'student' as const
    },
    posts: [],
    plantedTools: [],
    currentUser: {
      id: 'creator1',
      role: 'leader'
    },
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space')
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty space with no posts or tools - typical for newly created spaces.'
      }
    }
  }
}`,...(B=(F=x.parameters)==null?void 0:F.docs)==null?void 0:B.source}}};var O,V,W;y.parameters={...y.parameters,docs:{...(O=y.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    space: sampleUniversitySpace,
    posts: samplePosts,
    plantedTools: sampleTools,
    currentUser: {
      id: 'student1',
      role: 'member'
    },
    variant: 'compact',
    showToolGrid: false,
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space')
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant without tool grid - useful for mobile or focused post viewing.'
      }
    }
  }
}`,...(W=(V=y.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};const Ge=["UniversitySpaceAsLeader","UniversitySpaceAsMember","UniversitySpaceAsNonMember","ResidentialSpace","EmptySpace","CompactVariant"];export{y as CompactVariant,x as EmptySpace,h as ResidentialSpace,p as UniversitySpaceAsLeader,u as UniversitySpaceAsMember,v as UniversitySpaceAsNonMember,Ge as __namedExportsOrder,De as default};
