import{j as e}from"./jsx-runtime-B9GTzLod.js";import{r as u}from"./index-BMjrbHXN.js";import{A as K,m as Z}from"./framer-motion-proxy-B9jN8120.js";import{c as n}from"./utils-CytzSlOG.js";import{c as Ie}from"./createLucideIcon-DtX30ipI.js";import{L as Xe}from"./list-CBX0SPyA.js";import{U as E}from"./user-plus-BC0iow-Q.js";import{S as er}from"./search-kw2io5mN.js";import{F as rr}from"./filter-BSWfobtH.js";import{U as H}from"./user-check-Div6BfLT.js";import{G as ar}from"./graduation-cap-CjRbfMsL.js";import{H as tr}from"./house-Bg02DBcS.js";import{B as sr}from"./building-2-DkE3VlKg.js";import{B as V}from"./bookmark-B4q7zV9u.js";import{S as Ze}from"./sparkles-DJELqOJR.js";import{T as Ee}from"./trending-up-DHCBXhUA.js";import{E as or}from"./eye-DHVClHkA.js";import{M as nr}from"./map-pin-J5WJcL57.js";import{U as ir}from"./users-B5XgMSov.js";import{H as cr}from"./hash-ujXIHQxc.js";import{Z as lr}from"./zap-BzDMfB1h.js";import{a}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=Ie("BookmarkCheck",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z",key:"169p4p"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=Ie("Grid3x3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]]),_={university:{label:"University",description:"Academic departments, programs, and university-wide communities",icon:e.jsx(sr,{className:"w-5 h-5"}),color:"text-blue-400",bgColor:"bg-blue-400/10",borderColor:"border-blue-400/30",gradient:"from-blue-400/20 to-indigo-400/20"},residential:{label:"Residential",description:"Dorms, floors, and residential communities",icon:e.jsx(tr,{className:"w-5 h-5"}),color:"text-green-400",bgColor:"bg-green-400/10",borderColor:"border-green-400/30",gradient:"from-green-400/20 to-emerald-400/20"},greek:{label:"Greek Life",description:"Fraternities, sororities, and Greek organizations",icon:e.jsx(ar,{className:"w-5 h-5"}),color:"text-purple-400",bgColor:"bg-purple-400/10",borderColor:"border-purple-400/30",gradient:"from-purple-400/20 to-pink-400/20"},student:{label:"Student Groups",description:"Clubs, organizations, and student-led communities",icon:e.jsx(H,{className:"w-5 h-5"}),color:"text-orange-400",bgColor:"bg-orange-400/10",borderColor:"border-orange-400/30",gradient:"from-orange-400/20 to-red-400/20"}},dr=[{value:"all",label:"All Spaces",icon:e.jsx(L,{className:"w-4 h-4"})},{value:"joined",label:"My Spaces",icon:e.jsx(H,{className:"w-4 h-4"})},{value:"bookmarked",label:"Bookmarked",icon:e.jsx(V,{className:"w-4 h-4"})},{value:"recommended",label:"Recommended",icon:e.jsx(Ze,{className:"w-4 h-4"})},{value:"trending",label:"Trending",icon:e.jsx(Ee,{className:"w-4 h-4"})}],mr=[{value:"name",label:"Name"},{value:"members",label:"Member Count"},{value:"activity",label:"Recent Activity"},{value:"created",label:"Recently Created"},{value:"trending",label:"Trending Score"}],O=({spaces:o,selectedCategory:v,initialViewMode:P="grid",showCategoryFilter:U=!0,showJoinActions:b=!0,onSpaceClick:d,onJoinSpace:l,onLeaveSpace:c,onBookmarkSpace:h,onCreateSpace:x,currentUserRole:pr="member",className:_e})=>{const[y,Ve]=u.useState(""),[i,D]=u.useState(P),[M,He]=u.useState("all"),[G,Oe]=u.useState("name"),[q,De]=u.useState(!1),[p,z]=u.useState(v),I=u.useMemo(()=>{let r=o.filter(t=>{var s;if(p&&t.category!==p)return!1;if(y){const g=y.toLowerCase(),Y=t.name.toLowerCase().includes(g),Qe=t.description.toLowerCase().includes(g),We=t.tags.some(Ke=>Ke.toLowerCase().includes(g)),Ye=(s=t.location)==null?void 0:s.toLowerCase().includes(g);if(!Y&&!Qe&&!We&&!Ye)return!1}switch(M){case"joined":return t.isJoined;case"bookmarked":return t.isBookmarked;case"recommended":return t.isRecommended;case"trending":return t.isTrending;default:return!0}});return r.sort((t,s)=>{switch(G){case"members":return s.memberCount-t.memberCount;case"activity":const g=t.lastActivity?new Date(t.lastActivity).getTime():0;return(s.lastActivity?new Date(s.lastActivity).getTime():0)-g;case"created":return new Date(s.createdAt).getTime()-new Date(t.createdAt).getTime();case"trending":return s.engagementScore-t.engagementScore;default:return t.name.localeCompare(s.name)}}),r},[o,p,y,M,G]),ze=u.useMemo(()=>Object.entries(_).map(([r,t])=>({category:r,...t,count:o.filter(s=>s.category===r).length,joined:o.filter(s=>s.category===r&&s.isJoined).length})),[o]),$=async r=>{if(l)try{await l(r)}catch(t){console.error("Failed to join space:",t)}},Q=async r=>{if(c)try{await c(r)}catch(t){console.error("Failed to leave space:",t)}},W=async(r,t)=>{if(h)try{await h(r,t)}catch(s){console.error("Failed to bookmark space:",s)}},$e=({space:r})=>{const t=_[r.category];return e.jsxs(Z.div,{layout:!0,initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},whileHover:{y:-2},className:n("group relative p-6 rounded-3xl border transition-all duration-300 cursor-pointer","bg-gradient-to-br from-[var(--hive-background-secondary)]/60 via-[var(--hive-background-tertiary)]/40 to-[var(--hive-background-interactive)]/60","border-[var(--hive-border-primary)]/20","hover:border-[var(--hive-brand-primary)]/30 hover:shadow-xl hover:shadow-[var(--hive-brand-primary)]/10",i==="list"&&"flex items-center gap-6"),onClick:()=>d==null?void 0:d(r.id),children:[e.jsx("div",{className:n("absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",`bg-gradient-to-br ${t.gradient}`)}),e.jsxs("div",{className:"absolute top-4 right-4 flex items-center gap-2",children:[r.isTrending&&e.jsxs("div",{className:"px-2 py-1 rounded-full bg-orange-400/20 text-orange-400 text-xs font-medium flex items-center gap-1",children:[e.jsx(Ee,{className:"w-3 h-3"}),e.jsx("span",{children:"Trending"})]}),r.isRecommended&&e.jsxs("div",{className:"px-2 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-medium flex items-center gap-1",children:[e.jsx(Ze,{className:"w-3 h-3"}),e.jsx("span",{children:"Recommended"})]}),r.isPrivate&&e.jsx("div",{className:"w-6 h-6 rounded-full bg-[var(--hive-background-tertiary)]/80 flex items-center justify-center",children:e.jsx(or,{className:"w-3 h-3 text-[var(--hive-text-muted)]"})})]}),e.jsxs("div",{className:n("relative z-10",i==="list"?"flex items-center gap-4 flex-1":"space-y-4"),children:[e.jsxs("div",{className:n("relative",i==="list"?"flex-shrink-0":""),children:[e.jsx("div",{className:n("rounded-2xl flex items-center justify-center font-bold text-white relative overflow-hidden",i==="list"?"w-16 h-16 text-xl":"w-20 h-20 text-2xl",`bg-gradient-to-br ${t.gradient}`),children:r.avatar?e.jsx("img",{src:r.avatar,alt:r.name,className:"w-full h-full object-cover"}):e.jsx("span",{children:r.name.charAt(0).toUpperCase()})}),r.isJoined&&e.jsx("div",{className:"absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-[var(--hive-background-secondary)] flex items-center justify-center",children:e.jsx(H,{className:"w-3 h-3 text-white"})})]}),e.jsxs("div",{className:n(i==="list"?"flex-1 min-w-0":"space-y-3"),children:[e.jsxs("div",{className:n(i==="list"?"flex items-start justify-between":"space-y-2"),children:[e.jsxs("div",{className:n(i==="list"?"min-w-0 flex-1":""),children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx("h3",{className:"font-bold text-[var(--hive-text-primary)] truncate",children:r.name}),i==="grid"&&e.jsxs("div",{className:n("px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1",t.bgColor,t.borderColor,t.color,"border"),children:[t.icon,e.jsx("span",{children:t.label})]})]}),e.jsx("p",{className:n("text-[var(--hive-text-secondary)] line-clamp-2",i==="list"?"text-sm":"text-sm mb-3"),children:r.description}),r.location&&i==="grid"&&e.jsxs("div",{className:"flex items-center gap-1 text-xs text-[var(--hive-text-muted)] mb-2",children:[e.jsx(nr,{className:"w-3 h-3"}),e.jsx("span",{children:r.location})]})]}),i==="list"&&b&&e.jsxs("div",{className:"flex items-center gap-2 ml-4",children:[e.jsx("button",{onClick:s=>{s.stopPropagation(),W(r.id,!r.isBookmarked)},className:"w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 hover:bg-[var(--hive-brand-primary)]/10 transition-colors duration-200 flex items-center justify-center",children:r.isBookmarked?e.jsx(X,{className:"w-4 h-4 text-[var(--hive-brand-primary)]"}):e.jsx(V,{className:"w-4 h-4 text-[var(--hive-text-muted)]"})}),r.isJoined?e.jsx("button",{onClick:s=>{s.stopPropagation(),Q(r.id)},className:"px-3 py-1.5 rounded-lg bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20 transition-all duration-200 text-sm font-medium",children:"Leave"}):e.jsx("button",{onClick:s=>{s.stopPropagation(),$(r.id)},className:"px-3 py-1.5 rounded-lg bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-200 text-sm font-medium",children:"Join"})]})]}),i==="grid"&&e.jsxs("div",{className:"flex items-center gap-4 text-xs text-[var(--hive-text-muted)]",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(ir,{className:"w-3 h-3"}),e.jsxs("span",{children:[r.memberCount," members"]})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(cr,{className:"w-3 h-3"}),e.jsxs("span",{children:[r.postCount," posts"]})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(lr,{className:"w-3 h-3"}),e.jsxs("span",{children:[r.toolCount," tools"]})]})]}),r.tags.length>0&&i==="grid"&&e.jsxs("div",{className:"flex items-center gap-1 flex-wrap",children:[r.tags.slice(0,3).map(s=>e.jsx("span",{className:"px-2 py-1 rounded-lg bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-muted)] text-xs",children:s},s)),r.tags.length>3&&e.jsxs("span",{className:"text-xs text-[var(--hive-text-muted)]",children:["+",r.tags.length-3," more"]})]})]}),i==="grid"&&b&&e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("button",{onClick:s=>{s.stopPropagation(),W(r.id,!r.isBookmarked)},className:"w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 hover:bg-[var(--hive-brand-primary)]/10 transition-colors duration-200 flex items-center justify-center",children:r.isBookmarked?e.jsx(X,{className:"w-4 h-4 text-[var(--hive-brand-primary)]"}):e.jsx(V,{className:"w-4 h-4 text-[var(--hive-text-muted)]"})}),r.isJoined?e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-xs text-[var(--hive-text-muted)]",children:r.userRole&&r.userRole!=="member"?r.userRole.replace("_"," "):"Member"}),e.jsx("button",{onClick:s=>{s.stopPropagation(),Q(r.id)},className:"px-3 py-1.5 rounded-lg bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20 transition-all duration-200 text-sm font-medium",children:"Leave"})]}):e.jsxs("button",{onClick:s=>{s.stopPropagation(),$(r.id)},className:"px-4 py-2 rounded-xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-200 font-medium flex items-center gap-2",children:[e.jsx(E,{className:"w-4 h-4"}),e.jsx("span",{children:"Join"})]})]})]})]})};return e.jsxs("div",{className:n("h-full flex flex-col",_e),children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)]",children:p?_[p].label:"Browse Spaces"}),e.jsxs("p",{className:"text-[var(--hive-text-secondary)] mt-1",children:[I.length," spaces found"]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"flex items-center rounded-2xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 p-1",children:[e.jsx("button",{onClick:()=>D("grid"),className:n("w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200",i==="grid"?"bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]":"text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]"),children:e.jsx(L,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>D("list"),className:n("w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200",i==="list"?"bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]":"text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]"),children:e.jsx(Xe,{className:"w-4 h-4"})})]}),x&&e.jsxs("button",{onClick:()=>x(p||"student"),className:"px-4 py-2.5 rounded-2xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60 transition-all duration-300 font-semibold flex items-center gap-2",children:[e.jsx(E,{className:"w-4 h-4"}),e.jsx("span",{children:"Create Space"})]})]})]}),U&&!v&&e.jsx("div",{className:"mb-6",children:e.jsxs("div",{className:"flex items-center gap-3 flex-wrap",children:[e.jsxs("button",{onClick:()=>z(void 0),className:n("px-4 py-2.5 rounded-2xl border transition-all duration-200 flex items-center gap-2",p?"bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30":"bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40"),children:[e.jsx(L,{className:"w-4 h-4"}),e.jsx("span",{children:"All Categories"})]}),ze.map(r=>e.jsxs("button",{onClick:()=>z(r.category),className:n("px-4 py-2.5 rounded-2xl border transition-all duration-200 flex items-center gap-2",p===r.category?`${r.bgColor} ${r.color} ${r.borderColor}`:"bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30"),children:[r.icon,e.jsx("span",{children:r.label}),e.jsxs("span",{className:"text-xs opacity-80",children:["(",r.count,")"]})]},r.category))]})}),e.jsxs("div",{className:"space-y-4 mb-6",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"relative flex-1",children:[e.jsx(er,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--hive-text-muted)]"}),e.jsx("input",{type:"text",value:y,onChange:r=>Ve(r.target.value),placeholder:"Search spaces by name, description, or tags...",className:"w-full pl-10 pr-4 py-3 rounded-2xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200"})]}),e.jsx("button",{onClick:()=>De(!q),className:n("w-12 h-12 rounded-2xl border transition-all duration-200 flex items-center justify-center",q?"bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40":"bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/30 hover:text-[var(--hive-text-primary)]"),children:e.jsx(rr,{className:"w-5 h-5"})})]}),e.jsx(K,{children:q&&e.jsxs(Z.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"space-y-3",children:[e.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:dr.map(r=>e.jsxs("button",{onClick:()=>He(r.value),className:n("px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2",M===r.value?"bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30":"bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30"),children:[r.icon,e.jsx("span",{children:r.label})]},r.value))}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Sort by:"}),e.jsx("select",{value:G,onChange:r=>Oe(r.target.value),className:"px-3 py-1.5 rounded-lg border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200",children:mr.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))})]})]})})]}),e.jsx("div",{className:"flex-1 overflow-y-auto",children:e.jsx(K,{mode:"popLayout",children:I.length>0?e.jsx("div",{className:n(i==="grid"?"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6":"space-y-4"),children:I.map(r=>e.jsx($e,{space:r},r.id))}):e.jsxs(Z.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-16",children:[e.jsx("div",{className:"w-16 h-16 mx-auto mb-4 rounded-3xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/20 flex items-center justify-center",children:e.jsx(L,{className:"w-8 h-8 text-[var(--hive-text-muted)]"})}),e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-2",children:"No spaces found"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)] max-w-sm mx-auto mb-6",children:y?"Try adjusting your search or filters to find spaces.":"There are no spaces in this category yet."}),x&&e.jsxs("button",{onClick:()=>x(p||"student"),className:"px-6 py-3 rounded-2xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300 font-semibold flex items-center gap-2 mx-auto",children:[e.jsx(E,{className:"w-4 h-4"}),e.jsx("span",{children:"Create the First Space"})]})]})})})]})};O.__docgenInfo={description:"",methods:[],displayName:"SpaceCategoryBrowser",props:{spaces:{required:!0,tsType:{name:"Array",elements:[{name:"SpacePreview"}],raw:"SpacePreview[]"},description:""},selectedCategory:{required:!1,tsType:{name:"union",raw:"'university' | 'residential' | 'greek' | 'student'",elements:[{name:"literal",value:"'university'"},{name:"literal",value:"'residential'"},{name:"literal",value:"'greek'"},{name:"literal",value:"'student'"}]},description:""},initialViewMode:{required:!1,tsType:{name:"union",raw:"'grid' | 'list'",elements:[{name:"literal",value:"'grid'"},{name:"literal",value:"'list'"}]},description:"",defaultValue:{value:"'grid'",computed:!1}},showCategoryFilter:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showJoinActions:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onSpaceClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(spaceId: string) => void",signature:{arguments:[{type:{name:"string"},name:"spaceId"}],return:{name:"void"}}},description:""},onJoinSpace:{required:!1,tsType:{name:"signature",type:"function",raw:"(spaceId: string) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"spaceId"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onLeaveSpace:{required:!1,tsType:{name:"signature",type:"function",raw:"(spaceId: string) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"spaceId"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onBookmarkSpace:{required:!1,tsType:{name:"signature",type:"function",raw:"(spaceId: string, bookmarked: boolean) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"spaceId"},{type:{name:"boolean"},name:"bookmarked"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onCreateSpace:{required:!1,tsType:{name:"signature",type:"function",raw:"(category: SpaceCategory) => void",signature:{arguments:[{type:{name:"union",raw:"'university' | 'residential' | 'greek' | 'student'",elements:[{name:"literal",value:"'university'"},{name:"literal",value:"'residential'"},{name:"literal",value:"'greek'"},{name:"literal",value:"'student'"}]},name:"category"}],return:{name:"void"}}},description:""},currentUserRole:{required:!1,tsType:{name:"union",raw:"'leader' | 'co_leader' | 'member'",elements:[{name:"literal",value:"'leader'"},{name:"literal",value:"'co_leader'"},{name:"literal",value:"'member'"}]},description:"",defaultValue:{value:"'member'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Mr={title:"HIVE/Spaces/Organisms/SpaceCategoryBrowser",component:O,parameters:{layout:"fullscreen",docs:{description:{component:"Comprehensive space discovery browser with category filtering, search, sorting, and space management actions. Supports grid and list view modes."}}},argTypes:{selectedCategory:{control:{type:"select"},options:["university","residential","greek","student"]},initialViewMode:{control:{type:"select"},options:["grid","list"]},showCategoryFilter:{control:{type:"boolean"}},showJoinActions:{control:{type:"boolean"}},currentUserRole:{control:{type:"select"},options:["leader","co_leader","member"]}},tags:["autodocs"]},m=[{id:"1",name:"Computer Science Department",description:"Official space for CS students, faculty, and staff. Share resources, announcements, and connect with the CS community.",category:"university",status:"active",memberCount:342,postCount:156,toolCount:8,createdAt:"2024-01-10T00:00:00Z",lastActivity:"2024-01-20T15:30:00Z",isJoined:!0,isBookmarked:!1,userRole:"member",weeklyActivity:45,monthlyGrowth:12,engagementScore:87,isRecommended:!0,isTrending:!1,isPrivate:!1,requiresApproval:!1,location:"Engineering Building",tags:["programming","algorithms","career","research"],recentPosts:[{id:"1",content:"New internship opportunities posted!",author:"Prof. Smith",timestamp:"2024-01-20T14:00:00Z"}],activeTools:[{id:"1",name:"Assignment Tracker",icon:"📝"},{id:"2",name:"Code Review",icon:"💻"}]},{id:"2",name:"Cummings Hall - Floor 3",description:"Community space for all residents of Cummings Hall 3rd floor. Coordinate events, share resources, and stay connected.",category:"residential",status:"active",memberCount:28,postCount:89,toolCount:5,createdAt:"2024-01-12T00:00:00Z",lastActivity:"2024-01-20T16:00:00Z",isJoined:!1,isBookmarked:!0,weeklyActivity:23,monthlyGrowth:8,engagementScore:92,isRecommended:!1,isTrending:!0,isPrivate:!1,requiresApproval:!0,location:"Cummings Hall, Floor 3",building:"Cummings Hall",floor:3,tags:["community","events","study-groups","floor-life"],activeTools:[{id:"3",name:"Laundry Tracker",icon:"👕"},{id:"4",name:"Event Planner",icon:"📅"}]},{id:"3",name:"Alpha Beta Gamma",description:"Brotherhood activities, events, and chapter communication. Active members and pledges welcome.",category:"greek",status:"active",memberCount:67,postCount:203,toolCount:12,createdAt:"2024-01-08T00:00:00Z",lastActivity:"2024-01-20T14:45:00Z",isJoined:!0,isBookmarked:!0,userRole:"co_leader",weeklyActivity:78,monthlyGrowth:5,engagementScore:95,isRecommended:!1,isTrending:!1,isPrivate:!0,requiresApproval:!0,location:"Greek Row",tags:["brotherhood","philanthropy","social","alumni"],activeTools:[{id:"5",name:"Chapter Management",icon:"🏛️"},{id:"6",name:"Event Calendar",icon:"📅"}]},{id:"4",name:"Robotics Club",description:"Build, program, and compete with robots. Weekly meetings, workshops, and competitions. All skill levels welcome!",category:"student",status:"active",memberCount:45,postCount:67,toolCount:6,createdAt:"2024-01-15T00:00:00Z",lastActivity:"2024-01-20T12:30:00Z",isJoined:!1,isBookmarked:!1,weeklyActivity:34,monthlyGrowth:25,engagementScore:78,isRecommended:!0,isTrending:!0,isPrivate:!1,requiresApproval:!1,location:"Engineering Labs",tags:["robotics","engineering","competition","programming","innovation"],activeTools:[{id:"7",name:"Project Tracker",icon:"🔧"},{id:"8",name:"Workshop Scheduler",icon:"🛠️"}]},{id:"5",name:"Study Abroad Program",description:"Connect with other students planning to study abroad. Share experiences, tips, and resources.",category:"university",status:"active",memberCount:123,postCount:234,toolCount:4,createdAt:"2024-01-05T00:00:00Z",lastActivity:"2024-01-19T18:20:00Z",isJoined:!0,isBookmarked:!1,userRole:"member",weeklyActivity:56,monthlyGrowth:18,engagementScore:83,isRecommended:!1,isTrending:!1,isPrivate:!1,requiresApproval:!1,tags:["study-abroad","travel","culture","languages"],activeTools:[{id:"9",name:"Travel Planner",icon:"✈️"},{id:"10",name:"Document Tracker",icon:"📋"}]},{id:"6",name:"Photography Society",description:"Share your photos, learn new techniques, and participate in photo walks and workshops.",category:"student",status:"active",memberCount:89,postCount:445,toolCount:3,createdAt:"2024-01-03T00:00:00Z",lastActivity:"2024-01-20T11:15:00Z",isJoined:!1,isBookmarked:!0,weeklyActivity:67,monthlyGrowth:15,engagementScore:88,isRecommended:!0,isTrending:!1,isPrivate:!1,requiresApproval:!1,tags:["photography","art","workshops","creativity"],activeTools:[{id:"11",name:"Photo Gallery",icon:"📸"},{id:"12",name:"Event Scheduler",icon:"📅"}]},{id:"7",name:"Delta Epsilon Zeta",description:"Sisterhood, scholarship, and service. Empowering women through lifelong bonds and community engagement.",category:"greek",status:"active",memberCount:52,postCount:178,toolCount:9,createdAt:"2024-01-07T00:00:00Z",lastActivity:"2024-01-20T13:45:00Z",isJoined:!1,isBookmarked:!1,weeklyActivity:41,monthlyGrowth:7,engagementScore:91,isRecommended:!1,isTrending:!1,isPrivate:!0,requiresApproval:!0,location:"Sorority Row",tags:["sisterhood","service","leadership","philanthropy"]},{id:"8",name:"Baker Hall - Floor 2",description:"Floor community for Baker Hall 2nd floor residents. Study sessions, social events, and floor bonding.",category:"residential",status:"active",memberCount:24,postCount:156,toolCount:4,createdAt:"2024-01-14T00:00:00Z",lastActivity:"2024-01-20T09:30:00Z",isJoined:!1,isBookmarked:!1,weeklyActivity:19,monthlyGrowth:12,engagementScore:75,isRecommended:!1,isTrending:!1,isPrivate:!1,requiresApproval:!1,location:"Baker Hall, Floor 2",building:"Baker Hall",floor:2,tags:["floor-community","study","social","residents"]}],k={args:{spaces:m,showCategoryFilter:!0,showJoinActions:!0,onSpaceClick:a("space-click"),onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onBookmarkSpace:a("bookmark-space"),onCreateSpace:a("create-space"),currentUserRole:"member"},parameters:{docs:{description:{story:"Complete space browser showing all categories with filtering and search capabilities."}}}},f={args:{spaces:m.filter(o=>o.category==="university"),selectedCategory:"university",showCategoryFilter:!1,showJoinActions:!0,onSpaceClick:a("space-click"),onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onBookmarkSpace:a("bookmark-space"),onCreateSpace:a("create-space"),currentUserRole:"member"},parameters:{docs:{description:{story:"University spaces category view with academic departments and programs."}}}},w={args:{spaces:m.filter(o=>o.category==="residential"),selectedCategory:"residential",showCategoryFilter:!1,showJoinActions:!0,onSpaceClick:a("space-click"),onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onBookmarkSpace:a("bookmark-space"),onCreateSpace:a("create-space"),currentUserRole:"member"},parameters:{docs:{description:{story:"Residential spaces for dorms and floor communities."}}}},S={args:{spaces:m.filter(o=>o.category==="greek"),selectedCategory:"greek",showCategoryFilter:!1,showJoinActions:!0,onSpaceClick:a("space-click"),onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onBookmarkSpace:a("bookmark-space"),onCreateSpace:a("create-space"),currentUserRole:"co_leader"},parameters:{docs:{description:{story:"Greek life spaces for fraternities and sororities."}}}},C={args:{spaces:m.filter(o=>o.category==="student"),selectedCategory:"student",showCategoryFilter:!1,showJoinActions:!0,onSpaceClick:a("space-click"),onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onBookmarkSpace:a("bookmark-space"),onCreateSpace:a("create-space"),currentUserRole:"member"},parameters:{docs:{description:{story:"Student organizations, clubs, and interest groups."}}}},j={args:{spaces:m,initialViewMode:"list",showCategoryFilter:!0,showJoinActions:!0,onSpaceClick:a("space-click"),onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onBookmarkSpace:a("bookmark-space"),onCreateSpace:a("create-space"),currentUserRole:"member"},parameters:{docs:{description:{story:"Space browser in list view mode for compact display."}}}},N={args:{spaces:m,showCategoryFilter:!0,showJoinActions:!1,onSpaceClick:a("space-click"),currentUserRole:"member"},parameters:{docs:{description:{story:"Read-only view without join/leave actions for browsing only."}}}},A={args:{spaces:[],showCategoryFilter:!0,showJoinActions:!0,onSpaceClick:a("space-click"),onCreateSpace:a("create-space"),currentUserRole:"member"},parameters:{docs:{description:{story:"Empty state when no spaces are available."}}}},T={args:{spaces:m.filter(o=>o.name.toLowerCase().includes("photo")||o.tags.some(v=>v.includes("photo"))),showCategoryFilter:!0,showJoinActions:!0,onSpaceClick:a("space-click"),onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onBookmarkSpace:a("bookmark-space"),currentUserRole:"member"},parameters:{docs:{description:{story:"Filtered search results showing photography-related spaces."}}}},J={render:()=>{const[o,v]=u.useState(m),P=async d=>{await new Promise(l=>setTimeout(l,1e3)),v(l=>l.map(c=>c.id===d?{...c,isJoined:!0,memberCount:c.memberCount+1}:c)),a("join-space")(d)},U=async d=>{await new Promise(l=>setTimeout(l,1e3)),v(l=>l.map(c=>c.id===d?{...c,isJoined:!1,memberCount:Math.max(0,c.memberCount-1)}:c)),a("leave-space")(d)},b=async(d,l)=>{await new Promise(c=>setTimeout(c,500)),v(c=>c.map(h=>h.id===d?{...h,isBookmarked:l}:h)),a("bookmark-space")(d,l)};return e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)] p-8",children:e.jsx("div",{className:"max-w-7xl mx-auto h-full",children:e.jsx(O,{spaces:o,showCategoryFilter:!0,showJoinActions:!0,onSpaceClick:a("space-click"),onJoinSpace:P,onLeaveSpace:U,onBookmarkSpace:b,onCreateSpace:a("create-space"),currentUserRole:"member"})})})},parameters:{docs:{description:{story:"Fully interactive demo with live state updates for space actions."}}}},R={args:{spaces:m.map(o=>({...o,isTrending:Math.random()>.6,isRecommended:Math.random()>.7})),showCategoryFilter:!0,showJoinActions:!0,onSpaceClick:a("space-click"),onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onBookmarkSpace:a("bookmark-space"),onCreateSpace:a("create-space"),currentUserRole:"member"},parameters:{docs:{description:{story:"Spaces with trending and recommended badges highlighted."}}}},B={args:{spaces:m.map(o=>({...o,isJoined:Math.random()>.5,userRole:o.isJoined?["leader","co_leader","member"][Math.floor(Math.random()*3)]:void 0})),showCategoryFilter:!0,showJoinActions:!0,onSpaceClick:a("space-click"),onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onBookmarkSpace:a("bookmark-space"),onCreateSpace:a("create-space"),currentUserRole:"leader"},parameters:{docs:{description:{story:"Space browser as viewed by a user with leader permissions."}}}},F={args:{spaces:m.slice(0,6),showCategoryFilter:!0,showJoinActions:!0,onSpaceClick:a("space-click"),onJoinSpace:a("join-space"),onLeaveSpace:a("leave-space"),onBookmarkSpace:a("bookmark-space"),onCreateSpace:a("create-space"),currentUserRole:"member"},parameters:{viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Space browser optimized for mobile screens with responsive layout."}}}};var ee,re,ae;k.parameters={...k.parameters,docs:{...(ee=k.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces,
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member'
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete space browser showing all categories with filtering and search capabilities.'
      }
    }
  }
}`,...(ae=(re=k.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var te,se,oe;f.parameters={...f.parameters,docs:{...(te=f.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.filter(s => s.category === 'university'),
    selectedCategory: 'university',
    showCategoryFilter: false,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member'
  },
  parameters: {
    docs: {
      description: {
        story: 'University spaces category view with academic departments and programs.'
      }
    }
  }
}`,...(oe=(se=f.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var ne,ie,ce;w.parameters={...w.parameters,docs:{...(ne=w.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.filter(s => s.category === 'residential'),
    selectedCategory: 'residential',
    showCategoryFilter: false,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member'
  },
  parameters: {
    docs: {
      description: {
        story: 'Residential spaces for dorms and floor communities.'
      }
    }
  }
}`,...(ce=(ie=w.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var le,de,me;S.parameters={...S.parameters,docs:{...(le=S.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.filter(s => s.category === 'greek'),
    selectedCategory: 'greek',
    showCategoryFilter: false,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'co_leader'
  },
  parameters: {
    docs: {
      description: {
        story: 'Greek life spaces for fraternities and sororities.'
      }
    }
  }
}`,...(me=(de=S.parameters)==null?void 0:de.docs)==null?void 0:me.source}}};var pe,ue,ve;C.parameters={...C.parameters,docs:{...(pe=C.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.filter(s => s.category === 'student'),
    selectedCategory: 'student',
    showCategoryFilter: false,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member'
  },
  parameters: {
    docs: {
      description: {
        story: 'Student organizations, clubs, and interest groups.'
      }
    }
  }
}`,...(ve=(ue=C.parameters)==null?void 0:ue.docs)==null?void 0:ve.source}}};var he,ge,ye;j.parameters={...j.parameters,docs:{...(he=j.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces,
    initialViewMode: 'list',
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member'
  },
  parameters: {
    docs: {
      description: {
        story: 'Space browser in list view mode for compact display.'
      }
    }
  }
}`,...(ye=(ge=j.parameters)==null?void 0:ge.docs)==null?void 0:ye.source}}};var be,xe,ke;N.parameters={...N.parameters,docs:{...(be=N.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces,
    showCategoryFilter: true,
    showJoinActions: false,
    onSpaceClick: action('space-click'),
    currentUserRole: 'member'
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only view without join/leave actions for browsing only.'
      }
    }
  }
}`,...(ke=(xe=N.parameters)==null?void 0:xe.docs)==null?void 0:ke.source}}};var fe,we,Se;A.parameters={...A.parameters,docs:{...(fe=A.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    spaces: [],
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member'
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no spaces are available.'
      }
    }
  }
}`,...(Se=(we=A.parameters)==null?void 0:we.docs)==null?void 0:Se.source}}};var Ce,je,Ne;T.parameters={...T.parameters,docs:{...(Ce=T.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.filter(s => s.name.toLowerCase().includes('photo') || s.tags.some(tag => tag.includes('photo'))),
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    currentUserRole: 'member'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtered search results showing photography-related spaces.'
      }
    }
  }
}`,...(Ne=(je=T.parameters)==null?void 0:je.docs)==null?void 0:Ne.source}}};var Ae,Te,Je;J.parameters={...J.parameters,docs:{...(Ae=J.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: () => {
    const [spaces, setSpaces] = useState<SpacePreview[]>(mockSpaces);
    const handleJoinSpace = async (spaceId: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setSpaces(prevSpaces => prevSpaces.map(space => space.id === spaceId ? {
        ...space,
        isJoined: true,
        memberCount: space.memberCount + 1
      } : space));
      action('join-space')(spaceId);
    };
    const handleLeaveSpace = async (spaceId: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSpaces(prevSpaces => prevSpaces.map(space => space.id === spaceId ? {
        ...space,
        isJoined: false,
        memberCount: Math.max(0, space.memberCount - 1)
      } : space));
      action('leave-space')(spaceId);
    };
    const handleBookmarkSpace = async (spaceId: string, bookmarked: boolean) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSpaces(prevSpaces => prevSpaces.map(space => space.id === spaceId ? {
        ...space,
        isBookmarked: bookmarked
      } : space));
      action('bookmark-space')(spaceId, bookmarked);
    };
    return <div className="h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-7xl mx-auto h-full">
          <SpaceCategoryBrowser spaces={spaces} showCategoryFilter={true} showJoinActions={true} onSpaceClick={action('space-click')} onJoinSpace={handleJoinSpace} onLeaveSpace={handleLeaveSpace} onBookmarkSpace={handleBookmarkSpace} onCreateSpace={action('create-space')} currentUserRole="member" />
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with live state updates for space actions.'
      }
    }
  }
}`,...(Je=(Te=J.parameters)==null?void 0:Te.docs)==null?void 0:Je.source}}};var Re,Be,Fe;R.parameters={...R.parameters,docs:{...(Re=R.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.map(space => ({
      ...space,
      isTrending: Math.random() > 0.6,
      isRecommended: Math.random() > 0.7
    })),
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member'
  },
  parameters: {
    docs: {
      description: {
        story: 'Spaces with trending and recommended badges highlighted.'
      }
    }
  }
}`,...(Fe=(Be=R.parameters)==null?void 0:Be.docs)==null?void 0:Fe.source}}};var Le,Pe,Ue;B.parameters={...B.parameters,docs:{...(Le=B.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.map(space => ({
      ...space,
      isJoined: Math.random() > 0.5,
      userRole: space.isJoined ? ['leader', 'co_leader', 'member'][Math.floor(Math.random() * 3)] as any : undefined
    })),
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'leader'
  },
  parameters: {
    docs: {
      description: {
        story: 'Space browser as viewed by a user with leader permissions.'
      }
    }
  }
}`,...(Ue=(Pe=B.parameters)==null?void 0:Pe.docs)==null?void 0:Ue.source}}};var Me,Ge,qe;F.parameters={...F.parameters,docs:{...(Me=F.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.slice(0, 6),
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Space browser optimized for mobile screens with responsive layout.'
      }
    }
  }
}`,...(qe=(Ge=F.parameters)==null?void 0:Ge.docs)==null?void 0:qe.source}}};const Gr=["AllCategories","UniversitySpaces","ResidentialSpaces","GreekSpaces","StudentGroups","ListView","ReadOnlyMode","EmptyState","SearchResults","InteractiveDemo","TrendingSpaces","UserAsLeader","MobileLayout"];export{k as AllCategories,A as EmptyState,S as GreekSpaces,J as InteractiveDemo,j as ListView,F as MobileLayout,N as ReadOnlyMode,w as ResidentialSpaces,T as SearchResults,C as StudentGroups,R as TrendingSpaces,f as UniversitySpaces,B as UserAsLeader,Gr as __namedExportsOrder,Mr as default};
