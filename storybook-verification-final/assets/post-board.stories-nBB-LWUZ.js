import{j as e}from"./jsx-runtime-B9GTzLod.js";import{R as ue,r as D}from"./index-BMjrbHXN.js";import{A as de,m as y}from"./framer-motion-proxy-B9jN8120.js";import{c as f}from"./utils-CytzSlOG.js";import{M as le}from"./message-circle-CnQJGxxu.js";import{P as ve}from"./pin-u4JsefzA.js";import{C as he}from"./crown-Bf-Ij_V7.js";import{C as U}from"./circle-check-big-fUBFJcwM.js";import{E as xe}from"./eye-DHVClHkA.js";import{E as ye}from"./ellipsis-D2AHQBIe.js";import{S as ge}from"./share-2-DREqtcC9.js";import{B as fe}from"./bookmark-B4q7zV9u.js";import{C as be}from"./calendar-RwBiWFlj.js";import{C as je}from"./clock-B-89-V79.js";import{M as we}from"./map-pin-J5WJcL57.js";import{U as Pe}from"./users-B5XgMSov.js";import{a as n}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./createLucideIcon-DtX30ipI.js";import"./v4-CtRu48qb.js";const Ne=({reactions:t,onReaction:r})=>{const s=["👍","❤️","😊","🎉","👏"];return e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[t.map((a,m)=>e.jsxs(y.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>r(a.emoji,!a.userReacted),className:f("flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-all duration-200",a.userReacted?"bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/40 text-[var(--hive-brand-primary)]":"bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 text-[var(--hive-text-secondary)] hover:bg-[var(--hive-background-tertiary)]/60"),children:[e.jsx("span",{children:a.emoji}),e.jsx("span",{className:"font-medium",children:a.count})]},`${a.emoji}-${m}`)),s.filter(a=>!t.find(m=>m.emoji===a)).slice(0,3).map(a=>e.jsx(y.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>r(a,!0),className:"w-8 h-8 rounded-full bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 flex items-center justify-center text-sm hover:bg-[var(--hive-background-tertiary)]/60 transition-all duration-200",children:a},a))]})},Ce=({event:t,onRsvp:r})=>e.jsxs("div",{className:"mt-3 p-4 bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/20 rounded-2xl",children:[e.jsx("div",{className:"flex items-start justify-between mb-3",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30 flex items-center justify-center",children:e.jsx(be,{className:"w-5 h-5 text-[var(--hive-brand-primary)]"})}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:t.title}),e.jsxs("div",{className:"flex items-center gap-4 text-sm text-[var(--hive-text-secondary)] mt-1",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(je,{className:"w-3 h-3"}),e.jsx("span",{children:new Date(t.date).toLocaleDateString()})]}),t.location&&e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(we,{className:"w-3 h-3"}),e.jsx("span",{children:t.location})]}),t.rsvpCount&&e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(Pe,{className:"w-3 h-3"}),e.jsxs("span",{children:[t.rsvpCount," attending"]})]})]})]})]})}),r&&e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)] mr-2",children:"Will you attend?"}),["yes","no","maybe"].map(s=>e.jsxs(y.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>r(s),className:f("px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",t.userRsvp===s?"bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40":"bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]/30 hover:bg-[var(--hive-background-primary)]/70"),children:[s==="yes"&&"✓ Yes",s==="no"&&"✗ No",s==="maybe"&&"? Maybe"]},s))]})]}),Re=({poll:t,onVote:r})=>{const s=t.options.some(c=>c.userVoted),a=t.expiresAt?new Date(t.expiresAt).getTime()-Date.now():null,m=a!==null&&a<=0;return e.jsxs("div",{className:"mt-3 p-4 bg-[var(--hive-status-info)]/10 border border-[var(--hive-status-info)]/20 rounded-2xl",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx(U,{className:"w-5 h-5 text-[var(--hive-status-info)]"}),e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:t.question})]}),e.jsx("div",{className:"space-y-2 mb-4",children:t.options.map(c=>{const d=t.totalVotes>0?c.votes/t.totalVotes*100:0;return e.jsxs(y.div,{whileHover:!s&&!m?{scale:1.01}:{},className:f("relative overflow-hidden rounded-xl border transition-all duration-200",s||m?"cursor-default":"cursor-pointer hover:border-[var(--hive-status-info)]/40"),onClick:()=>!s&&!m&&(r==null?void 0:r(c.id)),children:[e.jsx("div",{className:"absolute inset-0 bg-[var(--hive-status-info)]/10 transition-all duration-500",style:{width:`${d}%`}}),e.jsxs("div",{className:"relative z-10 flex items-center justify-between px-4 py-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[c.userVoted&&e.jsx(U,{className:"w-4 h-4 text-[var(--hive-status-info)]"}),e.jsx("span",{className:f("font-medium",c.userVoted?"text-[var(--hive-status-info)]":"text-[var(--hive-text-primary)]"),children:c.text})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]",children:[e.jsxs("span",{children:[c.votes," votes"]}),(s||m)&&e.jsxs("span",{className:"font-medium",children:["(",d.toFixed(1),"%)"]})]})]})]},c.id)})}),e.jsxs("div",{className:"flex items-center justify-between text-xs text-[var(--hive-text-muted)]",children:[e.jsxs("span",{children:[t.totalVotes," total votes"]}),a!==null&&!m&&e.jsxs("span",{children:["Expires in ",Math.floor(a/(1e3*60*60*24))," days"]}),m&&e.jsx("span",{className:"text-[var(--hive-status-warning)]",children:"Poll expired"})]})]})},ke=({post:t,currentUser:r,onReaction:s,onComment:a,onShare:m,onEdit:c,onDelete:d,onPin:l,onReport:v,onEventRsvp:o,onPollVote:p})=>{var A;const[h,g]=D.useState(!1),u=D.useRef(null),N=(r==null?void 0:r.id)===t.author.id,i=(r==null?void 0:r.role)==="leader"||(r==null?void 0:r.role)==="co_leader",x=N||i,B=w=>{const M=new Date,pe=new Date(w),P=Math.floor((M.getTime()-pe.getTime())/(1e3*60*60));return P<1?"Just now":P<24?`${P}h ago`:P<168?`${Math.floor(P/24)}d ago`:`${Math.floor(P/168)}w ago`},me=w=>{switch(w){case"urgent":return"border-red-500/40 bg-red-500/10";case"high":return"border-orange-500/40 bg-orange-500/10";case"medium":return"border-yellow-500/40 bg-yellow-500/10";default:return"border-[var(--hive-border-primary)]/20 bg-[var(--hive-background-secondary)]/60"}};return D.useEffect(()=>{const w=M=>{u.current&&!u.current.contains(M.target)&&g(!1)};if(h)return document.addEventListener("mousedown",w),()=>document.removeEventListener("mousedown",w)},[h]),e.jsxs(y.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:f("relative backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300",t.type==="announcement"?me((A=t.announcement)==null?void 0:A.priority):"border-[var(--hive-border-primary)]/20 bg-[var(--hive-background-secondary)]/60",t.isPinned&&"ring-2 ring-[var(--hive-brand-primary)]/20"),children:[t.isPinned&&e.jsx("div",{className:"absolute -top-2 -right-2 w-8 h-8 bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/40 rounded-full flex items-center justify-center",children:e.jsx(ve,{className:"w-4 h-4 text-[var(--hive-brand-primary)]"})}),e.jsxs("div",{className:"flex items-start justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-12 h-12 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center",children:e.jsx("span",{className:"text-lg font-bold text-[var(--hive-text-primary)]",children:t.author.name.charAt(0)})}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-semibold text-[var(--hive-text-primary)]",children:t.author.name}),t.author.role==="leader"&&e.jsx(he,{className:"w-4 h-4 text-[var(--hive-brand-secondary)]"}),t.author.verified&&e.jsx(U,{className:"w-4 h-4 text-[var(--hive-status-success)]"}),t.toolSource&&e.jsxs("div",{className:"flex items-center gap-1 px-2 py-0.5 bg-[var(--hive-status-info)]/20 border border-[var(--hive-status-info)]/30 rounded-full",children:[e.jsx("span",{className:"text-xs",children:t.toolSource.icon}),e.jsx("span",{className:"text-xs font-medium text-[var(--hive-status-info)]",children:t.toolSource.toolName})]})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm text-[var(--hive-text-muted)] mt-0.5",children:[e.jsx("span",{children:B(t.timestamp)}),t.isEdited&&e.jsx("span",{children:"• edited"}),t.viewCount&&e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(xe,{className:"w-3 h-3"}),e.jsx("span",{children:t.viewCount})]})]})]})]}),e.jsxs("div",{className:"relative",ref:u,children:[e.jsx("button",{onClick:()=>g(!h),className:"w-8 h-8 rounded-lg flex items-center justify-center text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200",children:e.jsx(ye,{className:"w-4 h-4"})}),e.jsx(de,{children:h&&e.jsxs(y.div,{initial:{opacity:0,scale:.95,y:-10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:-10},className:"absolute right-0 top-10 w-48 bg-[var(--hive-background-secondary)]/95 backdrop-blur-xl border border-[var(--hive-border-primary)]/30 rounded-xl shadow-lg z-50 py-2",children:[N&&e.jsx("button",{onClick:()=>{c==null||c(),g(!1)},className:"w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200",children:"Edit post"}),i&&e.jsx("button",{onClick:()=>{l==null||l(!t.isPinned),g(!1)},className:"w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200",children:t.isPinned?"Unpin post":"Pin post"}),e.jsx("button",{onClick:()=>{v==null||v(),g(!1)},className:"w-full px-4 py-2 text-left text-sm text-[var(--hive-status-warning)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200",children:"Report post"}),x&&e.jsx("button",{onClick:()=>{d==null||d(),g(!1)},className:"w-full px-4 py-2 text-left text-sm text-[var(--hive-status-error)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200",children:"Delete post"})]})})]})]}),e.jsx("div",{className:"mb-4",children:e.jsx("p",{className:"text-[var(--hive-text-primary)] leading-relaxed whitespace-pre-wrap",children:t.content})}),t.event&&e.jsx(Ce,{event:t.event,onRsvp:o}),t.poll&&e.jsx(Re,{poll:t.poll,onVote:p}),e.jsxs("div",{className:"flex items-center justify-between pt-4 border-t border-[var(--hive-border-primary)]/10",children:[e.jsx("div",{className:"flex-1",children:t.reactions&&t.reactions.length>0&&s&&e.jsx(Ne,{reactions:t.reactions,onReaction:s})}),e.jsxs("div",{className:"flex items-center gap-2 ml-4",children:[t.commentCount!==void 0&&e.jsxs(y.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:a,className:"flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-200",children:[e.jsx(le,{className:"w-4 h-4"}),e.jsx("span",{children:t.commentCount})]}),e.jsxs(y.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:m,className:"flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-200",children:[e.jsx(ge,{className:"w-4 h-4"}),t.shareCount&&e.jsx("span",{children:t.shareCount})]}),e.jsx(y.button,{whileHover:{scale:1.05},whileTap:{scale:.95},className:"w-8 h-8 rounded-xl flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-200",children:e.jsx(fe,{className:"w-4 h-4"})})]})]})]})},q=({posts:t,currentUser:r,onReaction:s,onComment:a,onShare:m,onEdit:c,onDelete:d,onPin:l,onReport:v,onEventRsvp:o,onPollVote:p,showComments:h=!0,enableInfiniteScroll:g=!1,className:u})=>{const N=ue.useMemo(()=>[...t].sort((i,x)=>i.isPinned&&!x.isPinned?-1:!i.isPinned&&x.isPinned?1:new Date(x.timestamp).getTime()-new Date(i.timestamp).getTime()),[t]);return t.length===0?e.jsxs("div",{className:f("text-center py-12",u),children:[e.jsx("div",{className:"w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 flex items-center justify-center",children:e.jsx(le,{className:"w-8 h-8 text-[var(--hive-text-muted)]"})}),e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-2",children:"No posts yet"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Be the first to share something with this community"})]}):e.jsx("div",{className:f("space-y-6",u),children:e.jsx(de,{children:N.map(i=>e.jsx(ke,{post:i,currentUser:r,onReaction:s?(x,B)=>s(i.id,x,B):void 0,onComment:a?()=>a(i.id):void 0,onShare:m?()=>m(i.id):void 0,onEdit:c?()=>c(i.id):void 0,onDelete:d?()=>d(i.id):void 0,onPin:l?x=>l(i.id,x):void 0,onReport:v?()=>v(i.id):void 0,onEventRsvp:o&&i.event?x=>o(i.event.id,x):void 0,onPollVote:p&&i.poll?x=>p(i.poll.id,x):void 0},i.id))})})};q.__docgenInfo={description:"",methods:[],displayName:"PostBoard",props:{posts:{required:!0,tsType:{name:"Array",elements:[{name:"SpacePost"}],raw:"SpacePost[]"},description:""},currentUser:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  role?: 'leader' | 'co_leader' | 'member';
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"role",value:{name:"union",raw:"'leader' | 'co_leader' | 'member'",elements:[{name:"literal",value:"'leader'"},{name:"literal",value:"'co_leader'"},{name:"literal",value:"'member'"}],required:!1}}]}},description:""},onReaction:{required:!1,tsType:{name:"signature",type:"function",raw:"(postId: string, emoji: string, add: boolean) => void",signature:{arguments:[{type:{name:"string"},name:"postId"},{type:{name:"string"},name:"emoji"},{type:{name:"boolean"},name:"add"}],return:{name:"void"}}},description:""},onComment:{required:!1,tsType:{name:"signature",type:"function",raw:"(postId: string) => void",signature:{arguments:[{type:{name:"string"},name:"postId"}],return:{name:"void"}}},description:""},onShare:{required:!1,tsType:{name:"signature",type:"function",raw:"(postId: string) => void",signature:{arguments:[{type:{name:"string"},name:"postId"}],return:{name:"void"}}},description:""},onEdit:{required:!1,tsType:{name:"signature",type:"function",raw:"(postId: string) => void",signature:{arguments:[{type:{name:"string"},name:"postId"}],return:{name:"void"}}},description:""},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(postId: string) => void",signature:{arguments:[{type:{name:"string"},name:"postId"}],return:{name:"void"}}},description:""},onPin:{required:!1,tsType:{name:"signature",type:"function",raw:"(postId: string, pin: boolean) => void",signature:{arguments:[{type:{name:"string"},name:"postId"},{type:{name:"boolean"},name:"pin"}],return:{name:"void"}}},description:""},onReport:{required:!1,tsType:{name:"signature",type:"function",raw:"(postId: string) => void",signature:{arguments:[{type:{name:"string"},name:"postId"}],return:{name:"void"}}},description:""},onEventRsvp:{required:!1,tsType:{name:"signature",type:"function",raw:"(eventId: string, response: 'yes' | 'no' | 'maybe') => void",signature:{arguments:[{type:{name:"string"},name:"eventId"},{type:{name:"union",raw:"'yes' | 'no' | 'maybe'",elements:[{name:"literal",value:"'yes'"},{name:"literal",value:"'no'"},{name:"literal",value:"'maybe'"}]},name:"response"}],return:{name:"void"}}},description:""},onPollVote:{required:!1,tsType:{name:"signature",type:"function",raw:"(pollId: string, optionId: string) => void",signature:{arguments:[{type:{name:"string"},name:"pollId"},{type:{name:"string"},name:"optionId"}],return:{name:"void"}}},description:""},showComments:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},enableInfiniteScroll:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Je={title:"HIVE/Spaces/Molecules/PostBoard",component:q,parameters:{layout:"fullscreen",docs:{description:{component:"The PostBoard molecule handles the display and interaction of posts within a space. Supports text posts, events, polls, announcements, and tool-generated content with reactions, comments, and moderation features."}}},argTypes:{showComments:{control:{type:"boolean"}},enableInfiniteScroll:{control:{type:"boolean"}}},tags:["autodocs"]},b=[{id:"1",type:"announcement",content:"Welcome everyone to CS 101! This is our digital space for course coordination, discussions, and collaboration. Please review the syllabus and setup instructions in the pinned resources.",author:{id:"prof1",name:"Dr. Sarah Chen",role:"leader",verified:!0},timestamp:"2024-01-20T14:30:00Z",reactions:[{emoji:"👍",count:23,userReacted:!0},{emoji:"❤️",count:8,userReacted:!1},{emoji:"🎉",count:12,userReacted:!1}],commentCount:5,shareCount:3,viewCount:47,isPinned:!0,announcement:{priority:"high",isPinned:!0}},{id:"2",type:"event",content:"Lab Session: Introduction to Python basics and development environment setup. Bring your laptops and make sure you've completed the pre-lab checklist.",author:{id:"ta1",name:"Alex Rodriguez",role:"co_leader"},timestamp:"2024-01-19T16:45:00Z",reactions:[{emoji:"👍",count:15,userReacted:!1},{emoji:"📚",count:7,userReacted:!0}],commentCount:8,viewCount:31,event:{id:"lab1",title:"Lab 1: Python Setup & Basics",date:"2024-01-22T14:00:00Z",location:"Computer Lab B, 2nd Floor",rsvpCount:28,userRsvp:"yes"}},{id:"3",type:"poll",content:"What time works best for our weekly study group sessions? We want to find a time that works for the majority of the class.",author:{id:"student1",name:"Maya Patel",role:"member"},timestamp:"2024-01-19T11:20:00Z",reactions:[{emoji:"🤔",count:9,userReacted:!1},{emoji:"👍",count:6,userReacted:!1}],commentCount:12,viewCount:38,poll:{id:"poll1",question:"Best time for study group?",options:[{id:"opt1",text:"Monday 6-8 PM",votes:12,userVoted:!1},{id:"opt2",text:"Wednesday 7-9 PM",votes:18,userVoted:!0},{id:"opt3",text:"Friday 4-6 PM",votes:8,userVoted:!1},{id:"opt4",text:"Saturday 2-4 PM",votes:15,userVoted:!1}],totalVotes:53,expiresAt:"2024-01-25T23:59:59Z",allowMultiple:!1}},{id:"4",type:"text",content:"Has anyone figured out the installation issue with PyCharm on Windows 11? I keep getting an error about Python interpreter not being found even though I installed it correctly.",author:{id:"student2",name:"James Wilson",role:"member"},timestamp:"2024-01-18T20:15:00Z",reactions:[{emoji:"🆘",count:4,userReacted:!1},{emoji:"🤝",count:2,userReacted:!1}],commentCount:7,viewCount:22},{id:"5",type:"tool_output",content:"Assignment 1 has been posted with a due date of January 30th. The assignment covers variables, data types, and basic input/output operations.",author:{id:"system",name:"Assignment Tracker"},timestamp:"2024-01-18T10:00:00Z",reactions:[{emoji:"📝",count:19,userReacted:!0},{emoji:"⏰",count:11,userReacted:!1}],commentCount:3,viewCount:45,toolSource:{toolId:"assignment-tracker",toolName:"Assignment Tracker",icon:"📝"}}],j={id:"student1",role:"member"},Se={id:"prof1",role:"leader"},C={args:{posts:b,currentUser:j,onReaction:n("reaction"),onComment:n("comment"),onShare:n("share"),onEdit:n("edit"),onDelete:n("delete"),onPin:n("pin"),onReport:n("report"),onEventRsvp:n("event-rsvp"),onPollVote:n("poll-vote")}},R={args:{posts:b,currentUser:Se,onReaction:n("reaction"),onComment:n("comment"),onShare:n("share"),onEdit:n("edit"),onDelete:n("delete"),onPin:n("pin"),onReport:n("report"),onEventRsvp:n("event-rsvp"),onPollVote:n("poll-vote")},parameters:{docs:{description:{story:"PostBoard as viewed by a space leader with additional moderation capabilities like pinning and deleting posts."}}}},k={args:{posts:b.filter(t=>t.type==="event"||t.type==="announcement"),currentUser:j,onReaction:n("reaction"),onComment:n("comment"),onShare:n("share"),onEventRsvp:n("event-rsvp")},parameters:{docs:{description:{story:"PostBoard showing primarily event and announcement posts with RSVP functionality."}}}},S={args:{posts:b.filter(t=>t.type==="poll"),currentUser:j,onReaction:n("reaction"),onComment:n("comment"),onPollVote:n("poll-vote")},parameters:{docs:{description:{story:"PostBoard focusing on poll interactions with voting and results display."}}}},T={args:{posts:b.filter(t=>t.type==="tool_output"),currentUser:j,onReaction:n("reaction"),onComment:n("comment")},parameters:{docs:{description:{story:"PostBoard showing tool-generated content with proper attribution and styling."}}}},I={args:{posts:[],currentUser:j,onReaction:n("reaction"),onComment:n("comment"),onShare:n("share")},parameters:{docs:{description:{story:"Empty state when no posts exist in the space."}}}},E={args:{posts:[{...b[0],announcement:{priority:"urgent",isPinned:!0}},{id:"urgent1",type:"announcement",content:"URGENT: Class cancelled today due to weather conditions. Please check your email for updates on rescheduling.",author:{id:"prof1",name:"Dr. Sarah Chen",role:"leader",verified:!0},timestamp:"2024-01-20T08:00:00Z",reactions:[{emoji:"⚠️",count:31,userReacted:!0},{emoji:"👍",count:15,userReacted:!1}],commentCount:8,viewCount:67,isPinned:!0,announcement:{priority:"urgent",isPinned:!0}}],currentUser:j,onReaction:n("reaction"),onComment:n("comment")},parameters:{docs:{description:{story:"PostBoard with high-priority and urgent announcements showing visual priority indicators."}}}},V={render:()=>{const[t,r]=React.useState(b),[s]=React.useState(j),a=(d,l,v)=>{r(o=>o.map(p=>{if(p.id!==d)return p;const h=p.reactions||[];return h.find(u=>u.emoji===l)?{...p,reactions:h.map(u=>u.emoji===l?{...u,count:v?u.count+1:Math.max(0,u.count-1),userReacted:v}:u).filter(u=>u.count>0)}:v?{...p,reactions:[...h,{emoji:l,count:1,userReacted:!0}]}:p})),n("reaction")(d,l,v)},m=(d,l)=>{r(v=>v.map(o=>{var p;return((p=o.event)==null?void 0:p.id)===d?{...o,event:{...o.event,userRsvp:l,rsvpCount:o.event.rsvpCount?o.event.rsvpCount+1:1}}:o})),n("event-rsvp")(d,l)},c=(d,l)=>{r(v=>v.map(o=>{var p;return((p=o.poll)==null?void 0:p.id)===d?{...o,poll:{...o.poll,options:o.poll.options.map(h=>({...h,votes:h.id===l?h.votes+1:h.votes,userVoted:h.id===l})),totalVotes:o.poll.totalVotes+1}}:o})),n("poll-vote")(d,l)};return e.jsx("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:e.jsx("div",{className:"max-w-2xl mx-auto",children:e.jsx(q,{posts:t,currentUser:s,onReaction:a,onComment:n("comment"),onShare:n("share"),onEdit:n("edit"),onDelete:n("delete"),onPin:n("pin"),onReport:n("report"),onEventRsvp:m,onPollVote:c})})})},parameters:{docs:{description:{story:"Fully interactive PostBoard demo with live state updates for reactions, RSVP, and poll voting."}}}};var H,_,L;C.parameters={...C.parameters,docs:{...(H=C.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    posts: samplePosts,
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share'),
    onEdit: action('edit'),
    onDelete: action('delete'),
    onPin: action('pin'),
    onReport: action('report'),
    onEventRsvp: action('event-rsvp'),
    onPollVote: action('poll-vote')
  }
}`,...(L=(_=C.parameters)==null?void 0:_.docs)==null?void 0:L.source}}};var Z,F,W;R.parameters={...R.parameters,docs:{...(Z=R.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    posts: samplePosts,
    currentUser: leaderUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share'),
    onEdit: action('edit'),
    onDelete: action('delete'),
    onPin: action('pin'),
    onReport: action('report'),
    onEventRsvp: action('event-rsvp'),
    onPollVote: action('poll-vote')
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard as viewed by a space leader with additional moderation capabilities like pinning and deleting posts.'
      }
    }
  }
}`,...(W=(F=R.parameters)==null?void 0:F.docs)==null?void 0:W.source}}};var $,G,z;k.parameters={...k.parameters,docs:{...($=k.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    posts: samplePosts.filter(post => post.type === 'event' || post.type === 'announcement'),
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share'),
    onEventRsvp: action('event-rsvp')
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard showing primarily event and announcement posts with RSVP functionality.'
      }
    }
  }
}`,...(z=(G=k.parameters)==null?void 0:G.docs)==null?void 0:z.source}}};var J,O,Y;S.parameters={...S.parameters,docs:{...(J=S.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    posts: samplePosts.filter(post => post.type === 'poll'),
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onPollVote: action('poll-vote')
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard focusing on poll interactions with voting and results display.'
      }
    }
  }
}`,...(Y=(O=S.parameters)==null?void 0:O.docs)==null?void 0:Y.source}}};var K,Q,X;T.parameters={...T.parameters,docs:{...(K=T.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    posts: samplePosts.filter(post => post.type === 'tool_output'),
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment')
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard showing tool-generated content with proper attribution and styling.'
      }
    }
  }
}`,...(X=(Q=T.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var ee,te,ne;I.parameters={...I.parameters,docs:{...(ee=I.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    posts: [],
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share')
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no posts exist in the space.'
      }
    }
  }
}`,...(ne=(te=I.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var re,ae,se;E.parameters={...E.parameters,docs:{...(re=E.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    posts: [{
      ...samplePosts[0],
      announcement: {
        priority: 'urgent',
        isPinned: true
      }
    }, {
      id: 'urgent1',
      type: 'announcement',
      content: 'URGENT: Class cancelled today due to weather conditions. Please check your email for updates on rescheduling.',
      author: {
        id: 'prof1',
        name: 'Dr. Sarah Chen',
        role: 'leader',
        verified: true
      },
      timestamp: '2024-01-20T08:00:00Z',
      reactions: [{
        emoji: '⚠️',
        count: 31,
        userReacted: true
      }, {
        emoji: '👍',
        count: 15,
        userReacted: false
      }],
      commentCount: 8,
      viewCount: 67,
      isPinned: true,
      announcement: {
        priority: 'urgent',
        isPinned: true
      }
    }],
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment')
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard with high-priority and urgent announcements showing visual priority indicators.'
      }
    }
  }
}`,...(se=(ae=E.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var oe,ie,ce;V.parameters={...V.parameters,docs:{...(oe=V.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => {
    const [posts, setPosts] = React.useState(samplePosts);
    const [currentUser] = React.useState(sampleUser);
    const handleReaction = (postId: string, emoji: string, add: boolean) => {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id !== postId) return post;
        const reactions = post.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...post,
            reactions: reactions.map(r => r.emoji === emoji ? {
              ...r,
              count: add ? r.count + 1 : Math.max(0, r.count - 1),
              userReacted: add
            } : r).filter(r => r.count > 0)
          };
        } else if (add) {
          return {
            ...post,
            reactions: [...reactions, {
              emoji,
              count: 1,
              userReacted: true
            }]
          };
        }
        return post;
      }));
      action('reaction')(postId, emoji, add);
    };
    const handleEventRsvp = (eventId: string, response: 'yes' | 'no' | 'maybe') => {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.event?.id === eventId) {
          return {
            ...post,
            event: {
              ...post.event,
              userRsvp: response,
              rsvpCount: post.event.rsvpCount ? post.event.rsvpCount + 1 : 1
            }
          };
        }
        return post;
      }));
      action('event-rsvp')(eventId, response);
    };
    const handlePollVote = (pollId: string, optionId: string) => {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.poll?.id === pollId) {
          return {
            ...post,
            poll: {
              ...post.poll,
              options: post.poll.options.map(option => ({
                ...option,
                votes: option.id === optionId ? option.votes + 1 : option.votes,
                userVoted: option.id === optionId
              })),
              totalVotes: post.poll.totalVotes + 1
            }
          };
        }
        return post;
      }));
      action('poll-vote')(pollId, optionId);
    };
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-2xl mx-auto">
          <PostBoard posts={posts} currentUser={currentUser} onReaction={handleReaction} onComment={action('comment')} onShare={action('share')} onEdit={action('edit')} onDelete={action('delete')} onPin={action('pin')} onReport={action('report')} onEventRsvp={handleEventRsvp} onPollVote={handlePollVote} />
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive PostBoard demo with live state updates for reactions, RSVP, and poll voting.'
      }
    }
  }
}`,...(ce=(ie=V.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};const Oe=["Default","AsLeader","EventFocused","PollInteraction","ToolGenerated","EmptyState","HighPriorityAnnouncements","InteractiveDemo"];export{R as AsLeader,C as Default,I as EmptyState,k as EventFocused,E as HighPriorityAnnouncements,V as InteractiveDemo,S as PollInteraction,T as ToolGenerated,Oe as __namedExportsOrder,Je as default};
