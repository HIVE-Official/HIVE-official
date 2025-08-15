import{j as e}from"./jsx-runtime-B9GTzLod.js";import{r as d}from"./index-BMjrbHXN.js";import{A as O,m as M}from"./framer-motion-proxy-Bip1EXUU.js";import{c as v}from"./utils-CytzSlOG.js";import{U as Z}from"./users-B5XgMSov.js";import{U as Ie}from"./user-plus-BC0iow-Q.js";import{S as Pe}from"./search-kw2io5mN.js";import{F as _e}from"./filter-BSWfobtH.js";import{C as Me}from"./crown-Bf-Ij_V7.js";import{U as F}from"./user-DLkx1tbP.js";import{C as fe}from"./clock-B-89-V79.js";import{A as Ee}from"./activity-BpE6NZRo.js";import{H as Oe}from"./hash-ujXIHQxc.js";import{C as Ze}from"./calendar-RwBiWFlj.js";import{S as Fe}from"./settings-Cw08DGvz.js";import{C as Ve}from"./check-ChQelZXp.js";import{X as Le}from"./x-DmZh90ps.js";import{E as qe}from"./eye-DHVClHkA.js";import{M as De}from"./message-circle-CnQJGxxu.js";import{E as Je}from"./ellipsis-vertical-UTGjE2pF.js";import{S as xe}from"./shield-DruECp-Z.js";import{U as Ge}from"./user-minus-DQ1RMynK.js";import{a}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./createLucideIcon-DtX30ipI.js";import"./v4-CtRu48qb.js";const Be={leader:{label:"Leader",icon:e.jsx(Me,{className:"w-4 h-4"}),color:"text-yellow-400",bgColor:"bg-yellow-400/10",borderColor:"border-yellow-400/30"},co_leader:{label:"Co-Leader",icon:e.jsx(xe,{className:"w-4 h-4"}),color:"text-purple-400",bgColor:"bg-purple-400/10",borderColor:"border-purple-400/30"},member:{label:"Member",icon:e.jsx(F,{className:"w-4 h-4"}),color:"text-[var(--hive-text-secondary)]",bgColor:"bg-[var(--hive-background-tertiary)]/40",borderColor:"border-[var(--hive-border-primary)]/20"},pending:{label:"Pending",icon:e.jsx(fe,{className:"w-4 h-4"}),color:"text-orange-400",bgColor:"bg-orange-400/10",borderColor:"border-orange-400/30"}},He=[{value:"all",label:"All Members",icon:e.jsx(Z,{className:"w-4 h-4"})},{value:"leaders",label:"Leaders",icon:e.jsx(Me,{className:"w-4 h-4"})},{value:"members",label:"Members",icon:e.jsx(F,{className:"w-4 h-4"})},{value:"pending",label:"Pending",icon:e.jsx(fe,{className:"w-4 h-4"})},{value:"online",label:"Online",icon:e.jsx(Ee,{className:"w-4 h-4"})}],V=({members:l,currentUserRole:p,spaceType:L,onInviteMembers:g,onManageMember:h,onViewMemberProfile:t,onMessageMember:o,onApproveMember:s,onRejectMember:i,className:je})=>{const[u,we]=d.useState(""),[U,Ne]=d.useState("all"),[R,Te]=d.useState("name"),[I,Ce]=d.useState(!1),[Ae,q]=d.useState(null),y=p==="leader"||p==="co_leader",P=d.useMemo(()=>{let r=l.filter(n=>{var m;if(u){const b=u.toLowerCase(),E=n.handle.toLowerCase().includes(b),D=n.displayName.toLowerCase().includes(b),Re=(m=n.major)==null?void 0:m.toLowerCase().includes(b);if(!E&&!D&&!Re)return!1}switch(U){case"leaders":return n.role==="leader"||n.role==="co_leader";case"members":return n.role==="member";case"pending":return n.status==="pending";case"online":return n.isOnline;default:return!0}});return r.sort((n,m)=>{switch(R){case"role":const b={leader:0,co_leader:1,member:2,pending:3};return b[n.role]-b[m.role];case"joined":return new Date(m.joinedAt).getTime()-new Date(n.joinedAt).getTime();case"activity":const E=n.lastActive?new Date(n.lastActive).getTime():0;return(m.lastActive?new Date(m.lastActive).getTime():0)-E;default:return n.displayName.localeCompare(m.displayName)}}),r},[l,u,U,R]),Se=l.filter(r=>r.status==="pending"),ke=l.filter(r=>r.isOnline).length,_=async(r,n)=>{if(h)try{await h(r,n),q(null)}catch(m){console.error("Failed to manage member:",m)}},Ue=({member:r})=>{const n=Be[r.role],m=Ae===r.id;return e.jsxs(M.div,{layout:!0,initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:v("p-4 rounded-2xl border transition-all duration-200","bg-gradient-to-br from-[var(--hive-background-secondary)]/60 via-[var(--hive-background-tertiary)]/40 to-[var(--hive-background-interactive)]/60","border-[var(--hive-border-primary)]/20","hover:border-[var(--hive-brand-primary)]/30 hover:bg-[var(--hive-brand-primary)]/5",r.status==="pending"&&"border-orange-400/30 bg-orange-400/5",r.status==="banned"&&"border-red-400/30 bg-red-400/5 opacity-60"),children:[e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:v("w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold","bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-secondary)]/20","border border-[var(--hive-border-primary)]/20"),children:r.avatar?e.jsx("img",{src:r.avatar,alt:r.displayName,className:"w-full h-full rounded-2xl object-cover"}):e.jsx("span",{className:"text-[var(--hive-text-primary)]",children:r.displayName.charAt(0).toUpperCase()})}),r.isOnline&&e.jsx("div",{className:"absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-[var(--hive-background-secondary)] rounded-full"})]}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx("h3",{className:"font-semibold text-[var(--hive-text-primary)] truncate",children:r.displayName}),e.jsxs("div",{className:v("px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1",n.bgColor,n.borderColor,n.color,"border"),children:[n.icon,e.jsx("span",{children:n.label})]})]}),e.jsxs("p",{className:"text-sm text-[var(--hive-text-secondary)] mb-2",children:["@",r.handle]}),r.major&&e.jsxs("p",{className:"text-xs text-[var(--hive-text-muted)] mb-2",children:[r.major," ",r.year&&`• ${r.year}`]}),e.jsxs("div",{className:"flex items-center gap-4 text-xs text-[var(--hive-text-muted)]",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(Oe,{className:"w-3 h-3"}),e.jsxs("span",{children:[r.postsCount," posts"]})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(Ze,{className:"w-3 h-3"}),e.jsxs("span",{children:[r.eventsAttended," events"]})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(Fe,{className:"w-3 h-3"}),e.jsxs("span",{children:[r.toolsUsed," tools"]})]})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[r.status==="pending"&&y&&e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("button",{onClick:()=>s==null?void 0:s(r.id),className:"w-8 h-8 rounded-lg bg-green-400/10 text-green-400 hover:bg-green-400/20 transition-colors duration-200 flex items-center justify-center",children:e.jsx(Ve,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>i==null?void 0:i(r.id),className:"w-8 h-8 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors duration-200 flex items-center justify-center",children:e.jsx(Le,{className:"w-4 h-4"})})]}),r.status==="active"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>t==null?void 0:t(r.id),className:"w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-brand-primary)]/10 transition-all duration-200 flex items-center justify-center",children:e.jsx(qe,{className:"w-4 h-4"})}),o&&e.jsx("button",{onClick:()=>o(r.id),className:"w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-brand-primary)]/10 transition-all duration-200 flex items-center justify-center",children:e.jsx(De,{className:"w-4 h-4"})}),y&&r.role!=="leader"&&e.jsx("button",{onClick:()=>q(m?null:r.id),className:"w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-brand-primary)]/10 transition-all duration-200 flex items-center justify-center",children:e.jsx(Je,{className:"w-4 h-4"})})]})]})]}),e.jsx(O,{children:m&&y&&r.status==="active"&&e.jsx(M.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-4 pt-4 border-t border-[var(--hive-border-primary)]/20",children:e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[r.role==="member"&&e.jsxs("button",{onClick:()=>_(r.id,"promote"),className:"px-3 py-1.5 rounded-lg bg-blue-400/10 text-blue-400 border border-blue-400/30 hover:bg-blue-400/20 transition-all duration-200 text-sm flex items-center gap-1",children:[e.jsx(xe,{className:"w-3 h-3"}),e.jsx("span",{children:"Promote to Co-Leader"})]}),r.role==="co_leader"&&e.jsxs("button",{onClick:()=>_(r.id,"demote"),className:"px-3 py-1.5 rounded-lg bg-orange-400/10 text-orange-400 border border-orange-400/30 hover:bg-orange-400/20 transition-all duration-200 text-sm flex items-center gap-1",children:[e.jsx(F,{className:"w-3 h-3"}),e.jsx("span",{children:"Demote to Member"})]}),e.jsxs("button",{onClick:()=>_(r.id,"remove"),className:"px-3 py-1.5 rounded-lg bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20 transition-all duration-200 text-sm flex items-center gap-1",children:[e.jsx(Ge,{className:"w-3 h-3"}),e.jsx("span",{children:"Remove"})]})]})})})]})};return e.jsxs("div",{className:v("h-full flex flex-col",je),children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-2xl bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30 flex items-center justify-center",children:e.jsx(Z,{className:"w-5 h-5 text-[var(--hive-brand-primary)]"})}),e.jsxs("div",{children:[e.jsxs("h2",{className:"text-xl font-bold text-[var(--hive-text-primary)]",children:["Members (",P.length,")"]}),e.jsxs("p",{className:"text-sm text-[var(--hive-text-secondary)]",children:[ke," online • ",Se.length," pending"]})]})]}),y&&g&&e.jsxs("button",{onClick:g,className:"px-4 py-2.5 rounded-2xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60 transition-all duration-300 font-semibold flex items-center gap-2",children:[e.jsx(Ie,{className:"w-4 h-4"}),e.jsx("span",{children:"Invite"})]})]}),e.jsxs("div",{className:"space-y-4 mb-6",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"relative flex-1",children:[e.jsx(Pe,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--hive-text-muted)]"}),e.jsx("input",{type:"text",value:u,onChange:r=>we(r.target.value),placeholder:"Search members by name, handle, or major...",className:"w-full pl-10 pr-4 py-3 rounded-2xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200"})]}),e.jsx("button",{onClick:()=>Ce(!I),className:v("w-12 h-12 rounded-2xl border transition-all duration-200 flex items-center justify-center",I?"bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40":"bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/30 hover:text-[var(--hive-text-primary)]"),children:e.jsx(_e,{className:"w-5 h-5"})})]}),e.jsx(O,{children:I&&e.jsxs(M.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"space-y-3",children:[e.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:He.map(r=>e.jsxs("button",{onClick:()=>Ne(r.value),className:v("px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2",U===r.value?"bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30":"bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30"),children:[r.icon,e.jsx("span",{children:r.label})]},r.value))}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Sort by:"}),e.jsxs("select",{value:R,onChange:r=>Te(r.target.value),className:"px-3 py-1.5 rounded-lg border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200",children:[e.jsx("option",{value:"name",children:"Name"}),e.jsx("option",{value:"role",children:"Role"}),e.jsx("option",{value:"joined",children:"Joined Date"}),e.jsx("option",{value:"activity",children:"Last Active"})]})]})]})})]}),e.jsx("div",{className:"flex-1 overflow-y-auto",children:e.jsx(O,{mode:"popLayout",children:P.length>0?e.jsx("div",{className:"space-y-3",children:P.map(r=>e.jsx(Ue,{member:r},r.id))}):e.jsxs(M.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-16",children:[e.jsx("div",{className:"w-16 h-16 mx-auto mb-4 rounded-3xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/20 flex items-center justify-center",children:e.jsx(Z,{className:"w-8 h-8 text-[var(--hive-text-muted)]"})}),e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-2",children:"No members found"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)] max-w-sm mx-auto",children:u?"Try adjusting your search or filters to find members.":"There are no members matching the selected filters."})]})})})]})};V.__docgenInfo={description:"",methods:[],displayName:"SpaceMemberDirectory",props:{members:{required:!0,tsType:{name:"Array",elements:[{name:"SpaceMember"}],raw:"SpaceMember[]"},description:""},currentUserRole:{required:!0,tsType:{name:"union",raw:"'leader' | 'co_leader' | 'member' | 'pending'",elements:[{name:"literal",value:"'leader'"},{name:"literal",value:"'co_leader'"},{name:"literal",value:"'member'"},{name:"literal",value:"'pending'"}]},description:""},spaceType:{required:!0,tsType:{name:"union",raw:"'university' | 'residential' | 'greek' | 'student'",elements:[{name:"literal",value:"'university'"},{name:"literal",value:"'residential'"},{name:"literal",value:"'greek'"},{name:"literal",value:"'student'"}]},description:""},onInviteMembers:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onManageMember:{required:!1,tsType:{name:"signature",type:"function",raw:"(memberId: string, action: 'promote' | 'demote' | 'remove' | 'ban' | 'unban') => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"memberId"},{type:{name:"union",raw:"'promote' | 'demote' | 'remove' | 'ban' | 'unban'",elements:[{name:"literal",value:"'promote'"},{name:"literal",value:"'demote'"},{name:"literal",value:"'remove'"},{name:"literal",value:"'ban'"},{name:"literal",value:"'unban'"}]},name:"action"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onViewMemberProfile:{required:!1,tsType:{name:"signature",type:"function",raw:"(memberId: string) => void",signature:{arguments:[{type:{name:"string"},name:"memberId"}],return:{name:"void"}}},description:""},onMessageMember:{required:!1,tsType:{name:"signature",type:"function",raw:"(memberId: string) => void",signature:{arguments:[{type:{name:"string"},name:"memberId"}],return:{name:"void"}}},description:""},onApproveMember:{required:!1,tsType:{name:"signature",type:"function",raw:"(memberId: string) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"memberId"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onRejectMember:{required:!1,tsType:{name:"signature",type:"function",raw:"(memberId: string) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"memberId"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const yr={title:"HIVE/Spaces/Organisms/SpaceMemberDirectory",component:V,parameters:{layout:"fullscreen",docs:{description:{component:"Complete member management system for spaces with search, filtering, role management, and member actions. Handles different user permissions and space types."}}},argTypes:{currentUserRole:{control:{type:"select"},options:["leader","co_leader","member","pending"]},spaceType:{control:{type:"select"},options:["university","residential","greek","student"]}},tags:["autodocs"]},c=[{id:"1",handle:"sarah_cs",displayName:"Sarah Chen",avatar:void 0,role:"leader",status:"active",joinedAt:"2024-01-10T00:00:00Z",lastActive:"2024-01-20T15:30:00Z",bio:"CS major passionate about algorithms and AI",major:"Computer Science",year:"Junior",postsCount:42,eventsAttended:8,toolsUsed:15,canManageMembers:!0,canManageTools:!0,canCreateEvents:!0,canModerate:!0,email:"sarah.chen@university.edu",isOnline:!0},{id:"2",handle:"mike_physics",displayName:"Michael Rodriguez",role:"co_leader",status:"active",joinedAt:"2024-01-12T00:00:00Z",lastActive:"2024-01-20T14:15:00Z",major:"Physics",year:"Senior",postsCount:28,eventsAttended:12,toolsUsed:9,canManageMembers:!0,canManageTools:!1,canCreateEvents:!0,canModerate:!0,isOnline:!1},{id:"3",handle:"jenny_design",displayName:"Jennifer Wu",role:"member",status:"active",joinedAt:"2024-01-15T00:00:00Z",lastActive:"2024-01-20T16:00:00Z",major:"Graphic Design",year:"Sophomore",postsCount:15,eventsAttended:5,toolsUsed:7,canManageMembers:!1,canManageTools:!1,canCreateEvents:!1,canModerate:!1,isOnline:!0},{id:"4",handle:"alex_math",displayName:"Alex Thompson",role:"member",status:"active",joinedAt:"2024-01-18T00:00:00Z",lastActive:"2024-01-19T09:30:00Z",major:"Mathematics",year:"Freshman",postsCount:8,eventsAttended:3,toolsUsed:4,canManageMembers:!1,canManageTools:!1,canCreateEvents:!1,canModerate:!1,isOnline:!1},{id:"5",handle:"maria_bio",displayName:"Maria Santos",role:"pending",status:"pending",joinedAt:"2024-01-20T00:00:00Z",major:"Biology",year:"Junior",postsCount:0,eventsAttended:0,toolsUsed:0,canManageMembers:!1,canManageTools:!1,canCreateEvents:!1,canModerate:!1,isOnline:!1},{id:"6",handle:"david_eng",displayName:"David Kim",role:"member",status:"active",joinedAt:"2024-01-14T00:00:00Z",lastActive:"2024-01-20T11:45:00Z",major:"Engineering",year:"Senior",postsCount:31,eventsAttended:7,toolsUsed:12,canManageMembers:!1,canManageTools:!1,canCreateEvents:!1,canModerate:!1,isOnline:!0},{id:"7",handle:"lisa_art",displayName:"Lisa Johnson",role:"member",status:"inactive",joinedAt:"2024-01-11T00:00:00Z",lastActive:"2024-01-16T14:20:00Z",major:"Fine Arts",year:"Sophomore",postsCount:12,eventsAttended:2,toolsUsed:3,canManageMembers:!1,canManageTools:!1,canCreateEvents:!1,canModerate:!1,isOnline:!1}],f={args:{members:c,currentUserRole:"leader",spaceType:"university",onInviteMembers:a("invite-members"),onManageMember:a("manage-member"),onViewMemberProfile:a("view-profile"),onMessageMember:a("message-member"),onApproveMember:a("approve-member"),onRejectMember:a("reject-member")},parameters:{docs:{description:{story:"Member directory as viewed by a space leader with full management permissions."}}}},x={args:{members:c,currentUserRole:"member",spaceType:"university",onViewMemberProfile:a("view-profile"),onMessageMember:a("message-member")},parameters:{docs:{description:{story:"Member directory as viewed by a regular member with limited permissions."}}}},j={args:{members:c.map(l=>({...l,major:void 0,year:l.year?`Floor ${Math.floor(Math.random()*10)+1}`:void 0})),currentUserRole:"co_leader",spaceType:"residential",onInviteMembers:a("invite-members"),onManageMember:a("manage-member"),onViewMemberProfile:a("view-profile"),onMessageMember:a("message-member"),onApproveMember:a("approve-member"),onRejectMember:a("reject-member")},parameters:{docs:{description:{story:"Member directory for a residential space (dorm/floor) with floor information instead of majors."}}}},w={args:{members:c.map(l=>({...l,year:l.year?`Pledge Class ${Math.floor(Math.random()*5)+2020}`:void 0})),currentUserRole:"leader",spaceType:"greek",onInviteMembers:a("invite-members"),onManageMember:a("manage-member"),onViewMemberProfile:a("view-profile"),onMessageMember:a("message-member"),onApproveMember:a("approve-member"),onRejectMember:a("reject-member")},parameters:{docs:{description:{story:"Member directory for a Greek life space with pledge class information."}}}},N={args:{members:[...c,{id:"8",handle:"new_user1",displayName:"Emma Wilson",role:"pending",status:"pending",joinedAt:"2024-01-20T10:00:00Z",major:"Psychology",year:"Freshman",postsCount:0,eventsAttended:0,toolsUsed:0,canManageMembers:!1,canManageTools:!1,canCreateEvents:!1,canModerate:!1,isOnline:!0},{id:"9",handle:"new_user2",displayName:"Ryan Garcia",role:"pending",status:"pending",joinedAt:"2024-01-20T11:30:00Z",major:"Business",year:"Junior",postsCount:0,eventsAttended:0,toolsUsed:0,canManageMembers:!1,canManageTools:!1,canCreateEvents:!1,canModerate:!1,isOnline:!1}],currentUserRole:"leader",spaceType:"university",onInviteMembers:a("invite-members"),onManageMember:a("manage-member"),onViewMemberProfile:a("view-profile"),onMessageMember:a("message-member"),onApproveMember:a("approve-member"),onRejectMember:a("reject-member")},parameters:{docs:{description:{story:"Member directory with pending member requests requiring approval."}}}},T={args:{members:c.slice(0,3),currentUserRole:"leader",spaceType:"student",onInviteMembers:a("invite-members"),onManageMember:a("manage-member"),onViewMemberProfile:a("view-profile"),onMessageMember:a("message-member")},parameters:{docs:{description:{story:"Member directory for a smaller student space with fewer members."}}}},C={args:{members:[],currentUserRole:"leader",spaceType:"university",onInviteMembers:a("invite-members")},parameters:{docs:{description:{story:"Empty state when no members match the current filters."}}}},A={render:()=>{const[l,p]=d.useState(c),L=async(t,o)=>{await new Promise(s=>setTimeout(s,1e3)),p(s=>{switch(o){case"promote":return s.map(i=>i.id===t?{...i,role:"co_leader"}:i);case"demote":return s.map(i=>i.id===t?{...i,role:"member"}:i);case"remove":return s.filter(i=>i.id!==t);default:return s}}),o("manage-member")(t,o)},g=async t=>{await new Promise(o=>setTimeout(o,1e3)),p(o=>o.map(s=>s.id===t?{...s,status:"active",role:"member"}:s)),a("approve-member")(t)},h=async t=>{await new Promise(o=>setTimeout(o,500)),p(o=>o.filter(s=>s.id!==t)),a("reject-member")(t)};return e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)] p-8",children:e.jsx("div",{className:"max-w-4xl mx-auto h-full",children:e.jsx(V,{members:l,currentUserRole:"leader",spaceType:"university",onInviteMembers:a("invite-members"),onManageMember:L,onViewMemberProfile:a("view-profile"),onMessageMember:a("message-member"),onApproveMember:g,onRejectMember:h})})})},parameters:{docs:{description:{story:"Fully interactive demo with live state management for member actions."}}}},S={args:{members:[...c,{id:"10",handle:"cs_student",displayName:"Computer Science Student",role:"member",status:"active",joinedAt:"2024-01-16T00:00:00Z",lastActive:"2024-01-20T13:00:00Z",major:"Computer Science",year:"Sophomore",postsCount:5,eventsAttended:1,toolsUsed:2,canManageMembers:!1,canManageTools:!1,canCreateEvents:!1,canModerate:!1,isOnline:!0},{id:"11",handle:"another_cs",displayName:"Another CS Major",role:"member",status:"active",joinedAt:"2024-01-17T00:00:00Z",lastActive:"2024-01-20T12:30:00Z",major:"Computer Science",year:"Junior",postsCount:18,eventsAttended:4,toolsUsed:8,canManageMembers:!1,canManageTools:!1,canCreateEvents:!1,canModerate:!1,isOnline:!1}],currentUserRole:"leader",spaceType:"university",onInviteMembers:a("invite-members"),onManageMember:a("manage-member"),onViewMemberProfile:a("view-profile"),onMessageMember:a("message-member"),onApproveMember:a("approve-member"),onRejectMember:a("reject-member")},parameters:{docs:{description:{story:"Member directory with expanded member list to demonstrate search and filtering capabilities."}}}},k={args:{members:c.slice(0,5),currentUserRole:"co_leader",spaceType:"residential",onInviteMembers:a("invite-members"),onManageMember:a("manage-member"),onViewMemberProfile:a("view-profile"),onMessageMember:a("message-member"),onApproveMember:a("approve-member"),onRejectMember:a("reject-member")},parameters:{viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Member directory optimized for mobile screens with responsive layout."}}}};var J,G,B;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    members: mockMembers,
    currentUserRole: 'leader',
    spaceType: 'university',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member')
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory as viewed by a space leader with full management permissions.'
      }
    }
  }
}`,...(B=(G=f.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};var H,$,z;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    members: mockMembers,
    currentUserRole: 'member',
    spaceType: 'university',
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member')
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory as viewed by a regular member with limited permissions.'
      }
    }
  }
}`,...(z=($=x.parameters)==null?void 0:$.docs)==null?void 0:z.source}}};var W,Q,K;j.parameters={...j.parameters,docs:{...(W=j.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    members: mockMembers.map(m => ({
      ...m,
      major: undefined,
      year: m.year ? \`Floor \${Math.floor(Math.random() * 10) + 1}\` : undefined
    })),
    currentUserRole: 'co_leader',
    spaceType: 'residential',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member')
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory for a residential space (dorm/floor) with floor information instead of majors.'
      }
    }
  }
}`,...(K=(Q=j.parameters)==null?void 0:Q.docs)==null?void 0:K.source}}};var X,Y,ee;w.parameters={...w.parameters,docs:{...(X=w.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    members: mockMembers.map(m => ({
      ...m,
      year: m.year ? \`Pledge Class \${Math.floor(Math.random() * 5) + 2020}\` : undefined
    })),
    currentUserRole: 'leader',
    spaceType: 'greek',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member')
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory for a Greek life space with pledge class information.'
      }
    }
  }
}`,...(ee=(Y=w.parameters)==null?void 0:Y.docs)==null?void 0:ee.source}}};var re,ae,ne;N.parameters={...N.parameters,docs:{...(re=N.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    members: [...mockMembers, {
      id: '8',
      handle: 'new_user1',
      displayName: 'Emma Wilson',
      role: 'pending',
      status: 'pending',
      joinedAt: '2024-01-20T10:00:00Z',
      major: 'Psychology',
      year: 'Freshman',
      postsCount: 0,
      eventsAttended: 0,
      toolsUsed: 0,
      canManageMembers: false,
      canManageTools: false,
      canCreateEvents: false,
      canModerate: false,
      isOnline: true
    }, {
      id: '9',
      handle: 'new_user2',
      displayName: 'Ryan Garcia',
      role: 'pending',
      status: 'pending',
      joinedAt: '2024-01-20T11:30:00Z',
      major: 'Business',
      year: 'Junior',
      postsCount: 0,
      eventsAttended: 0,
      toolsUsed: 0,
      canManageMembers: false,
      canManageTools: false,
      canCreateEvents: false,
      canModerate: false,
      isOnline: false
    }],
    currentUserRole: 'leader',
    spaceType: 'university',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member')
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory with pending member requests requiring approval.'
      }
    }
  }
}`,...(ne=(ae=N.parameters)==null?void 0:ae.docs)==null?void 0:ne.source}}};var se,te,oe;T.parameters={...T.parameters,docs:{...(se=T.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    members: mockMembers.slice(0, 3),
    currentUserRole: 'leader',
    spaceType: 'student',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member')
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory for a smaller student space with fewer members.'
      }
    }
  }
}`,...(oe=(te=T.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var ie,me,le;C.parameters={...C.parameters,docs:{...(ie=C.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    members: [],
    currentUserRole: 'leader',
    spaceType: 'university',
    onInviteMembers: action('invite-members')
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no members match the current filters.'
      }
    }
  }
}`,...(le=(me=C.parameters)==null?void 0:me.docs)==null?void 0:le.source}}};var ce,de,pe;A.parameters={...A.parameters,docs:{...(ce=A.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: () => {
    const [members, setMembers] = useState<SpaceMember[]>(mockMembers);
    const handleManageMember = async (memberId: string, action: 'promote' | 'demote' | 'remove' | 'ban' | 'unban') => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setMembers(prevMembers => {
        switch (action) {
          case 'promote':
            return prevMembers.map(m => m.id === memberId ? {
              ...m,
              role: 'co_leader' as const
            } : m);
          case 'demote':
            return prevMembers.map(m => m.id === memberId ? {
              ...m,
              role: 'member' as const
            } : m);
          case 'remove':
            return prevMembers.filter(m => m.id !== memberId);
          default:
            return prevMembers;
        }
      });
      action('manage-member')(memberId, action);
    };
    const handleApproveMember = async (memberId: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMembers(prevMembers => prevMembers.map(m => m.id === memberId ? {
        ...m,
        status: 'active' as const,
        role: 'member' as const
      } : m));
      action('approve-member')(memberId);
    };
    const handleRejectMember = async (memberId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMembers(prevMembers => prevMembers.filter(m => m.id !== memberId));
      action('reject-member')(memberId);
    };
    return <div className="h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-4xl mx-auto h-full">
          <SpaceMemberDirectory members={members} currentUserRole="leader" spaceType="university" onInviteMembers={action('invite-members')} onManageMember={handleManageMember} onViewMemberProfile={action('view-profile')} onMessageMember={action('message-member')} onApproveMember={handleApproveMember} onRejectMember={handleRejectMember} />
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with live state management for member actions.'
      }
    }
  }
}`,...(pe=(de=A.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var be,ve,ue;S.parameters={...S.parameters,docs:{...(be=S.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    members: [...mockMembers, {
      id: '10',
      handle: 'cs_student',
      displayName: 'Computer Science Student',
      role: 'member',
      status: 'active',
      joinedAt: '2024-01-16T00:00:00Z',
      lastActive: '2024-01-20T13:00:00Z',
      major: 'Computer Science',
      year: 'Sophomore',
      postsCount: 5,
      eventsAttended: 1,
      toolsUsed: 2,
      canManageMembers: false,
      canManageTools: false,
      canCreateEvents: false,
      canModerate: false,
      isOnline: true
    }, {
      id: '11',
      handle: 'another_cs',
      displayName: 'Another CS Major',
      role: 'member',
      status: 'active',
      joinedAt: '2024-01-17T00:00:00Z',
      lastActive: '2024-01-20T12:30:00Z',
      major: 'Computer Science',
      year: 'Junior',
      postsCount: 18,
      eventsAttended: 4,
      toolsUsed: 8,
      canManageMembers: false,
      canManageTools: false,
      canCreateEvents: false,
      canModerate: false,
      isOnline: false
    }],
    currentUserRole: 'leader',
    spaceType: 'university',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member')
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory with expanded member list to demonstrate search and filtering capabilities.'
      }
    }
  }
}`,...(ue=(ve=S.parameters)==null?void 0:ve.docs)==null?void 0:ue.source}}};var ge,he,ye;k.parameters={...k.parameters,docs:{...(ge=k.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    members: mockMembers.slice(0, 5),
    currentUserRole: 'co_leader',
    spaceType: 'residential',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member')
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Member directory optimized for mobile screens with responsive layout.'
      }
    }
  }
}`,...(ye=(he=k.parameters)==null?void 0:he.docs)==null?void 0:ye.source}}};const Mr=["AsLeader","AsMember","ResidentialSpace","GreekSpace","PendingMembers","SmallSpace","EmptyState","InteractiveDemo","SearchAndFilter","MobileLayout"];export{f as AsLeader,x as AsMember,C as EmptyState,w as GreekSpace,A as InteractiveDemo,k as MobileLayout,N as PendingMembers,j as ResidentialSpace,S as SearchAndFilter,T as SmallSpace,Mr as __namedExportsOrder,yr as default};
