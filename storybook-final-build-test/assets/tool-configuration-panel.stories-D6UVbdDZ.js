import{j as e}from"./jsx-runtime-B9GTzLod.js";import{r as l}from"./index-BMjrbHXN.js";import{A as Ue,m as N}from"./framer-motion-proxy-Bip1EXUU.js";import{c as m}from"./utils-CytzSlOG.js";import{E as Ge}from"./external-link-BBRviWFd.js";import{X as re}from"./x-DmZh90ps.js";import{C as U}from"./circle-alert-D27CINV1.js";import{S as te}from"./settings-Cw08DGvz.js";import{C as He}from"./code-OMVEgBw0.js";import{S as Ke}from"./shield-DruECp-Z.js";import{R as ae}from"./refresh-cw-SbqVByDa.js";import{Z as Me}from"./zap-BzDMfB1h.js";import{C as ne}from"./circle-check-big-fUBFJcwM.js";import{C as We}from"./copy-XxyUjQ-i.js";import{R as $e}from"./rotate-ccw-DtMj7lZX.js";import{T as ze}from"./trash-2-CZMgR76f.js";import{S as Ze}from"./save-Dp6ok-kF.js";import{D as Xe}from"./database-BscHc6YP.js";import{c as Fe}from"./createLucideIcon-DtX30ipI.js";import{F as G}from"./file-text-B72BLrv5.js";import{I as Ye}from"./image-CGtD2XV-.js";import{C as Je}from"./clock-B-89-V79.js";import{C as Qe}from"./calendar-RwBiWFlj.js";import{L as ie}from"./list-CBX0SPyA.js";import{L as er}from"./link-D9HUmIqS.js";import{G as rr}from"./globe-nBk3QZSs.js";import{H as tr}from"./hash-ujXIHQxc.js";import{L as ar}from"./lock-CpC2nJsY.js";import{T as nr}from"./type-DoE-GsQW.js";import{E as ir}from"./eye-off-BD-Ijkxb.js";import{E as sr}from"./eye-DHVClHkA.js";import{a as t}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const or=Fe("Key",[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lr=Fe("SquareCheckBig",[["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",key:"1jnkn4"}]]),dr={text:nr,password:ar,number:tr,email:rr,url:er,textarea:G,boolean:lr,select:ie,multiselect:ie,date:Qe,time:Je,color:Ye,file:G,api_key:or,webhook_url:Xe},H=({tool:n,isOpen:b,onClose:h,onSave:w,onActivate:K,onDeactivate:V,onReset:g,onRemove:k,onTestConfiguration:y,isSaving:u=!1,className:d})=>{const[o,x]=l.useState(n.currentValues),[C,L]=l.useState({}),[qe,Ee]=l.useState({}),[Pe,B]=l.useState(!1),[j,M]=l.useState(null),[W,$]=l.useState(!1),[S,Re]=l.useState("config"),z=l.useRef({}),f=(r,a)=>{x(i=>({...i,[r]:a})),B(!0),C[r]&&L(i=>{const c={...i};return delete c[r],c})},Ae=(r,a)=>{if(r.required&&(!a||typeof a=="string"&&!a.trim()))return`${r.name} is required`;if(r.validation){const{min:i,max:c,pattern:p,message:T}=r.validation;if(typeof a=="string"&&p&&!new RegExp(p).test(a))return T||`${r.name} format is invalid`;if(typeof a=="number"){if(i!==void 0&&a<i)return`${r.name} must be at least ${i}`;if(c!==void 0&&a>c)return`${r.name} must be at most ${c}`}}return null},Z=()=>{const r={};return n.fields.forEach(a=>{const i=Ae(a,o[a.id]);i&&(r[a.id]=i)}),L(r),Object.keys(r).length===0},Oe=async()=>{if(Z())try{await w(n.toolId,o),B(!1)}catch(r){console.error("Failed to save configuration:",r)}},De=async()=>{if(!(!y||!Z())){$(!0);try{const r=await y(n.toolId,o);M(r)}catch{M({success:!1,message:"Test failed with an error"})}finally{$(!1)}}},Ve=async()=>{if(g)try{await g(n.toolId),x(n.currentValues),B(!1),L({})}catch(r){console.error("Failed to reset configuration:",r)}},Le=r=>{var X,Y,J;const a=dr[r.type]||te,i=o[r.id]??r.defaultValue??"",c=C[r.id],p=r.type==="password"||r.sensitive,T=!p||qe[r.id],v={id:r.id,className:m("w-full px-4 py-3 rounded-xl border transition-all duration-200","bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]","placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0",c?"border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]":"border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50")};return e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("label",{htmlFor:r.id,className:"flex items-center gap-2 text-sm font-medium text-[var(--hive-text-primary)]",children:[e.jsx(a,{className:"w-4 h-4"}),e.jsx("span",{children:r.name}),r.required&&e.jsx("span",{className:"text-[var(--hive-status-error)]",children:"*"})]}),p&&e.jsx("button",{type:"button",onClick:()=>Ee(s=>({...s,[r.id]:!s[r.id]})),className:"p-1 rounded text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors duration-200",children:T?e.jsx(ir,{className:"w-4 h-4"}):e.jsx(sr,{className:"w-4 h-4"})})]}),r.description&&e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:r.description}),e.jsx("div",{className:"relative",children:r.type==="textarea"?e.jsx("textarea",{...v,value:i,onChange:s=>f(r.id,s.target.value),placeholder:r.placeholder,rows:4,className:m(v.className,"resize-none")}):r.type==="boolean"?e.jsxs("label",{className:"flex items-center gap-3 p-3 rounded-xl border border-[var(--hive-border-primary)]/30 cursor-pointer hover:bg-[var(--hive-brand-primary)]/5 transition-all duration-200",children:[e.jsx("input",{type:"checkbox",checked:i,onChange:s=>f(r.id,s.target.checked),className:"w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20"}),e.jsx("span",{className:"text-[var(--hive-text-primary)]",children:r.placeholder||"Enabled"})]}):r.type==="select"?e.jsxs("select",{...v,value:i,onChange:s=>f(r.id,s.target.value),children:[e.jsx("option",{value:"",children:r.placeholder||"Select an option"}),(X=r.options)==null?void 0:X.map(s=>e.jsx("option",{value:s.value,children:s.label},s.value))]}):r.type==="file"?e.jsxs("div",{children:[e.jsx("input",{ref:s=>{z.current[r.id]=s},type:"file",onChange:s=>{var ee;const Q=(ee=s.target.files)==null?void 0:ee[0];Q&&f(r.id,Q)},className:"hidden"}),e.jsxs("button",{type:"button",onClick:()=>{var s;return(s=z.current[r.id])==null?void 0:s.click()},className:m(v.className,"flex items-center justify-between cursor-pointer"),children:[e.jsx("span",{className:m(i instanceof File?"text-[var(--hive-text-primary)]":"text-[var(--hive-text-muted)]"),children:i instanceof File?i.name:r.placeholder||"Choose file"}),e.jsx(G,{className:"w-4 h-4 text-[var(--hive-text-muted)]"})]})]}):e.jsx("input",{...v,type:p&&!T?"password":r.type==="number"?"number":r.type,value:i,onChange:s=>f(r.id,r.type==="number"?Number(s.target.value):s.target.value),placeholder:r.placeholder,min:(Y=r.validation)==null?void 0:Y.min,max:(J=r.validation)==null?void 0:J.max})}),c&&e.jsxs("p",{className:"text-xs text-[var(--hive-status-error)] flex items-center gap-1",children:[e.jsx(U,{className:"w-3 h-3"}),c]})]},r.id)},Be=n.fields.reduce((r,a)=>{const i=a.group||"General";return r[i]||(r[i]=[]),r[i].push(a),r},{});return b?e.jsx(Ue,{children:e.jsxs(N.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[e.jsx(N.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:h,className:"absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl"}),e.jsxs(N.div,{initial:{opacity:0,scale:.95,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:20},className:m("relative w-full max-w-4xl max-h-[90vh] overflow-hidden","bg-gradient-to-br from-[var(--hive-background-secondary)]/95 via-[var(--hive-background-tertiary)]/90 to-[var(--hive-background-interactive)]/95","backdrop-blur-xl border border-[var(--hive-border-primary)]/30","rounded-3xl shadow-2xl",d),children:[e.jsxs("div",{className:"flex items-center justify-between p-6 border-b border-[var(--hive-border-primary)]/20",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 rounded-2xl bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30 flex items-center justify-center text-2xl",children:n.toolIcon}),e.jsxs("div",{children:[e.jsxs("h2",{className:"text-xl font-bold text-[var(--hive-text-primary)]",children:["Configure ",n.toolName]}),e.jsxs("p",{className:"text-sm text-[var(--hive-text-secondary)]",children:["Version ",n.version," • ",n.category]})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[n.documentationUrl&&e.jsx("a",{href:n.documentationUrl,target:"_blank",rel:"noopener noreferrer",className:"w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200",children:e.jsx(Ge,{className:"w-5 h-5"})}),e.jsx("button",{onClick:h,className:"w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200",children:e.jsx(re,{className:"w-5 h-5"})})]})]}),n.status==="error"&&e.jsx("div",{className:"px-6 py-3 bg-red-400/10 border-b border-red-400/20",children:e.jsxs("div",{className:"flex items-center gap-2 text-red-400",children:[e.jsx(U,{className:"w-4 h-4"}),e.jsx("span",{className:"text-sm font-medium",children:"Tool configuration has errors"})]})}),e.jsx("div",{className:"flex items-center px-6 border-b border-[var(--hive-border-primary)]/20",children:[{id:"config",label:"Configuration",icon:te},{id:"advanced",label:"Advanced",icon:He},{id:"permissions",label:"Permissions",icon:Ke}].map(r=>e.jsxs("button",{onClick:()=>Re(r.id),className:m("flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-200",S===r.id?"border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]":"border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"),children:[e.jsx(r.icon,{className:"w-4 h-4"}),e.jsx("span",{className:"font-medium",children:r.label})]},r.id))}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-6",children:[S==="config"&&e.jsxs("div",{className:"space-y-8",children:[Object.entries(Be).map(([r,a])=>e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:r}),e.jsx("div",{className:"space-y-6",children:a.map(Le)})]},r)),y&&e.jsxs("div",{className:"pt-4 border-t border-[var(--hive-border-primary)]/20",children:[e.jsxs("button",{onClick:De,disabled:W,className:"flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-400/10 text-blue-400 border border-blue-400/30 hover:bg-blue-400/20 hover:border-blue-400/50 transition-all duration-300 disabled:opacity-50",children:[W?e.jsx(ae,{className:"w-4 h-4 animate-spin"}):e.jsx(Me,{className:"w-4 h-4"}),e.jsx("span",{children:"Test Configuration"})]}),j&&e.jsxs("div",{className:m("mt-3 p-3 rounded-xl flex items-center gap-2 text-sm",j.success?"bg-green-400/10 text-green-400 border border-green-400/30":"bg-red-400/10 text-red-400 border border-red-400/30"),children:[j.success?e.jsx(ne,{className:"w-4 h-4"}):e.jsx(U,{className:"w-4 h-4"}),e.jsx("span",{children:j.message})]})]})]}),S==="advanced"&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Advanced Settings"}),n.webhookUrl&&e.jsxs("div",{className:"p-4 rounded-2xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)] mb-2",children:"Webhook URL"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("code",{className:"flex-1 p-2 rounded-lg bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm font-mono",children:n.webhookUrl}),e.jsx("button",{onClick:()=>navigator.clipboard.writeText(n.webhookUrl||""),className:"w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200 flex items-center justify-center",children:e.jsx(We,{className:"w-4 h-4"})})]})]}),n.apiEndpoints&&n.apiEndpoints.length>0&&e.jsxs("div",{className:"p-4 rounded-2xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)] mb-3",children:"API Endpoints"}),e.jsx("div",{className:"space-y-2",children:n.apiEndpoints.map((r,a)=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:m("px-2 py-1 rounded text-xs font-mono",r.method==="GET"&&"bg-green-400/20 text-green-400",r.method==="POST"&&"bg-blue-400/20 text-blue-400",r.method==="PUT"&&"bg-orange-400/20 text-orange-400",r.method==="DELETE"&&"bg-red-400/20 text-red-400"),children:r.method}),e.jsx("code",{className:"text-sm text-[var(--hive-text-primary)] font-mono",children:r.url})]},a))})]})]})}),S==="permissions"&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Tool Permissions"}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:Object.entries(n.permissions).map(([r,a])=>e.jsx("div",{className:m("p-4 rounded-2xl border",a?"bg-green-400/10 border-green-400/30":"bg-[var(--hive-background-tertiary)]/40 border-[var(--hive-border-primary)]/20"),children:e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[a?e.jsx(ne,{className:"w-4 h-4 text-green-400"}):e.jsx(re,{className:"w-4 h-4 text-[var(--hive-text-muted)]"}),e.jsx("span",{className:"font-medium text-[var(--hive-text-primary)] capitalize",children:r.replace(/([A-Z])/g," $1").toLowerCase()})]})},r))})]})})]}),e.jsxs("div",{className:"flex items-center justify-between p-6 border-t border-[var(--hive-border-primary)]/20",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[g&&e.jsxs("button",{onClick:Ve,className:"px-4 py-2.5 rounded-2xl border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-300 flex items-center gap-2",children:[e.jsx($e,{className:"w-4 h-4"}),e.jsx("span",{children:"Reset"})]}),k&&e.jsxs("button",{onClick:()=>k(n.toolId),className:"px-4 py-2.5 rounded-2xl border border-red-400/30 text-red-400 hover:bg-red-400/10 hover:border-red-400/50 transition-all duration-300 flex items-center gap-2",children:[e.jsx(ze,{className:"w-4 h-4"}),e.jsx("span",{children:"Remove Tool"})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{onClick:h,disabled:u,className:"px-6 py-2.5 rounded-2xl border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-300 disabled:opacity-50",children:"Cancel"}),e.jsx(N.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:Oe,disabled:u||!Pe,className:m("px-6 py-2.5 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2","bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40","hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60","disabled:opacity-50 disabled:cursor-not-allowed"),children:u?e.jsxs(e.Fragment,{children:[e.jsx(ae,{className:"w-4 h-4 animate-spin"}),e.jsx("span",{children:"Saving..."})]}):e.jsxs(e.Fragment,{children:[e.jsx(Ze,{className:"w-4 h-4"}),e.jsx("span",{children:"Save Configuration"})]})})]})]})]})]})}):null};H.__docgenInfo={description:"",methods:[],displayName:"ToolConfigurationPanel",props:{tool:{required:!0,tsType:{name:"ToolConfigurationData"},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSave:{required:!0,tsType:{name:"signature",type:"function",raw:"(toolId: string, values: Record<string, any>) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"toolId"},{type:{name:"Record",elements:[{name:"string"},{name:"any"}],raw:"Record<string, any>"},name:"values"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onActivate:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onDeactivate:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onReset:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onTestConfiguration:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string, values: Record<string, any>) => Promise<{ success: boolean; message: string }>",signature:{arguments:[{type:{name:"string"},name:"toolId"},{type:{name:"Record",elements:[{name:"string"},{name:"any"}],raw:"Record<string, any>"},name:"values"}],return:{name:"Promise",elements:[{name:"signature",type:"object",raw:"{ success: boolean; message: string }",signature:{properties:[{key:"success",value:{name:"boolean",required:!0}},{key:"message",value:{name:"string",required:!0}}]}}],raw:"Promise<{ success: boolean; message: string }>"}}},description:""},isSaving:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Mr={title:"HIVE/Tools/Organisms/ToolConfigurationPanel",component:H,parameters:{layout:"fullscreen",docs:{description:{component:"Advanced configuration panel for planted tools with field validation, sensitive data handling, testing capabilities, and permission management."}}},argTypes:{isOpen:{control:{type:"boolean"}},isSaving:{control:{type:"boolean"}}},tags:["autodocs"]},D={toolId:"event-management",toolName:"Event Management",toolIcon:"📅",version:"2.1.0",category:"coordination",description:"Create, manage, and track events with RSVP functionality and calendar integration",fields:[{id:"title_prefix",name:"Event Title Prefix",type:"text",required:!1,description:"Optional prefix to add to all event titles",placeholder:'e.g., "[CS Club]"',group:"General"},{id:"default_location",name:"Default Location",type:"text",required:!0,description:"Default location for events",placeholder:"Enter default meeting location",group:"General"},{id:"rsvp_required",name:"Require RSVP",type:"boolean",required:!1,description:"Require RSVP for all events by default",placeholder:"Require RSVP for events",group:"Settings"},{id:"reminder_time",name:"Reminder Time",type:"select",required:!0,description:"When to send event reminders",options:[{value:"15",label:"15 minutes before"},{value:"30",label:"30 minutes before"},{value:"60",label:"1 hour before"},{value:"1440",label:"1 day before"}],group:"Notifications"},{id:"max_capacity",name:"Default Max Capacity",type:"number",required:!1,description:"Default maximum number of attendees",placeholder:"Leave empty for unlimited",validation:{min:1,max:1e3},group:"Settings"}],currentValues:{title_prefix:"[CS Club]",default_location:"Engineering Building, Room 101",rsvp_required:!0,reminder_time:"60",max_capacity:50},permissions:{canConfigure:!0,canView:!0,canActivate:!0,canRemove:!0},status:"active",isConfigured:!0,lastConfigured:"2024-01-20T10:30:00Z",configuredBy:"sarah_cs",documentationUrl:"https://docs.hive.college/tools/event-management",supportUrl:"https://support.hive.college"},O={toolId:"calendar-sync",toolName:"Calendar Sync",toolIcon:"🔄",version:"1.3.2",category:"productivity",description:"Sync events with external calendar services like Google Calendar and Outlook",fields:[{id:"service_provider",name:"Calendar Service",type:"select",required:!0,description:"Choose your calendar service provider",options:[{value:"google",label:"Google Calendar"},{value:"outlook",label:"Microsoft Outlook"},{value:"apple",label:"Apple iCloud"}],group:"Connection"},{id:"api_key",name:"API Key",type:"api_key",required:!0,sensitive:!0,description:"Your calendar service API key",placeholder:"Enter your API key",group:"Authentication"},{id:"client_secret",name:"Client Secret",type:"password",required:!0,sensitive:!0,description:"OAuth client secret for calendar access",placeholder:"Enter client secret",group:"Authentication"},{id:"calendar_id",name:"Calendar ID",type:"text",required:!0,description:"ID of the calendar to sync with",placeholder:"primary or specific calendar ID",group:"Connection"},{id:"sync_frequency",name:"Sync Frequency",type:"select",required:!0,description:"How often to sync with the external calendar",options:[{value:"5",label:"Every 5 minutes"},{value:"15",label:"Every 15 minutes"},{value:"60",label:"Every hour"},{value:"360",label:"Every 6 hours"}],group:"Settings"},{id:"two_way_sync",name:"Two-way Sync",type:"boolean",required:!1,description:"Allow changes in external calendar to sync back to HIVE",placeholder:"Enable bidirectional sync",group:"Settings"},{id:"webhook_url",name:"Webhook URL",type:"webhook_url",required:!1,description:"Webhook endpoint for real-time updates",placeholder:"https://your-app.com/webhook",validation:{pattern:"^https?://.*",message:"Must be a valid HTTP/HTTPS URL"},group:"Advanced"}],currentValues:{service_provider:"google",api_key:"AIzaSyB...",client_secret:"GOCSPX-...",calendar_id:"primary",sync_frequency:"15",two_way_sync:!1,webhook_url:""},permissions:{canConfigure:!0,canView:!0,canActivate:!0,canRemove:!0},status:"configured",isConfigured:!0,lastConfigured:"2024-01-19T15:45:00Z",configuredBy:"mike_physics",webhookUrl:"https://api.hive.college/webhooks/tools/calendar-sync/abc123",apiEndpoints:[{name:"Get Events",url:"/api/calendar/events",method:"GET"},{name:"Create Event",url:"/api/calendar/events",method:"POST"},{name:"Update Event",url:"/api/calendar/events/{id}",method:"PUT"},{name:"Delete Event",url:"/api/calendar/events/{id}",method:"DELETE"}],documentationUrl:"https://docs.hive.college/tools/calendar-sync",supportUrl:"https://support.hive.college"},cr={...O,toolId:"calendar-sync-error",toolName:"Calendar Sync (Error)",status:"error",currentValues:{...O.currentValues,api_key:"invalid_key"}},mr={toolId:"assignment-tracker",toolName:"Assignment Tracker",toolIcon:"📝",version:"1.0.0",category:"academic",description:"Track assignments, due dates, and submission status across all your courses",fields:[{id:"semester",name:"Current Semester",type:"select",required:!0,description:"Select your current semester",options:[{value:"fall2024",label:"Fall 2024"},{value:"spring2025",label:"Spring 2025"},{value:"summer2025",label:"Summer 2025"}],group:"Academic"},{id:"courses",name:"Course List",type:"textarea",required:!0,description:'List your courses, one per line (e.g., "CS 101 - Intro to Programming")',placeholder:`CS 101 - Intro to Programming
MATH 201 - Calculus II
ENG 102 - Writing`,group:"Academic"},{id:"default_reminder",name:"Default Reminder",type:"select",required:!0,description:"Default reminder time for assignments",options:[{value:"1",label:"1 day before"},{value:"2",label:"2 days before"},{value:"3",label:"3 days before"},{value:"7",label:"1 week before"}],group:"Notifications"},{id:"grade_tracking",name:"Track Grades",type:"boolean",required:!1,description:"Enable grade tracking for assignments",placeholder:"Track assignment grades",group:"Features"}],currentValues:{},permissions:{canConfigure:!0,canView:!0,canActivate:!1,canRemove:!0},status:"needs_setup",isConfigured:!1,documentationUrl:"https://docs.hive.college/tools/assignment-tracker"},_={args:{tool:D,isOpen:!0,onClose:t("close"),onSave:t("save"),onActivate:t("activate"),onDeactivate:t("deactivate"),onReset:t("reset"),onRemove:t("remove"),onTestConfiguration:t("test-configuration")},parameters:{docs:{description:{story:"Basic tool configuration with simple fields and validation."}}}},I={args:{tool:O,isOpen:!0,onClose:t("close"),onSave:t("save"),onActivate:t("activate"),onDeactivate:t("deactivate"),onReset:t("reset"),onRemove:t("remove"),onTestConfiguration:t("test-configuration")},parameters:{docs:{description:{story:"Advanced tool with sensitive fields, API configuration, and webhook endpoints."}}}},F={args:{tool:cr,isOpen:!0,onClose:t("close"),onSave:t("save"),onReset:t("reset"),onRemove:t("remove"),onTestConfiguration:t("test-configuration")},parameters:{docs:{description:{story:"Tool in error state showing configuration issues."}}}},q={args:{tool:mr,isOpen:!0,onClose:t("close"),onSave:t("save"),onActivate:t("activate"),onRemove:t("remove")},parameters:{docs:{description:{story:"Tool that needs initial setup with empty configuration."}}}},E={args:{tool:D,isOpen:!0,isSaving:!0,onClose:t("close"),onSave:t("save")},parameters:{docs:{description:{story:"Configuration panel in saving state with disabled interactions."}}}},P={args:{tool:{...D,permissions:{canConfigure:!1,canView:!0,canActivate:!1,canRemove:!1}},isOpen:!0,onClose:t("close"),onSave:t("save")},parameters:{docs:{description:{story:"Configuration panel for user with limited permissions (view-only)."}}}},R={render:()=>{const[n,b]=l.useState(!0),[h,w]=l.useState(!1),[K,V]=l.useState(O),g=async(u,d)=>{w(!0);try{await new Promise(o=>setTimeout(o,2e3)),V(o=>({...o,currentValues:d,status:"active",isConfigured:!0,lastConfigured:new Date().toISOString()})),t("save")(u,d)}catch(o){console.error("Failed to save:",o)}finally{w(!1)}},k=async(u,d)=>{await new Promise(C=>setTimeout(C,2e3));const o=d.api_key,x=o&&o.length>10&&!o.includes("invalid");return{success:x,message:x?"Configuration test successful! Calendar connection established.":"Configuration test failed. Please check your API key and try again."}},y=async u=>{await new Promise(d=>setTimeout(d,1e3)),V(d=>({...d,currentValues:{},status:"needs_setup",isConfigured:!1})),t("reset")(u)};return e.jsxs("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:[!n&&e.jsx("div",{className:"text-center",children:e.jsx("button",{onClick:()=>b(!0),className:"px-6 py-3 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300",children:"Configure Tool"})}),e.jsx(H,{tool:K,isOpen:n,onClose:()=>b(!1),onSave:g,onActivate:t("activate"),onDeactivate:t("deactivate"),onReset:y,onRemove:t("remove"),onTestConfiguration:k,isSaving:h})]})},parameters:{docs:{description:{story:"Fully interactive demo with state management, validation, and testing."}}}},A={args:{tool:{...D,toolName:"Field Types Demo",toolIcon:"🔧",description:"Demonstration of all available field types",fields:[{id:"text_field",name:"Text Field",type:"text",required:!0,placeholder:"Enter some text",group:"Basic Fields"},{id:"password_field",name:"Password Field",type:"password",required:!0,sensitive:!0,placeholder:"Enter password",group:"Basic Fields"},{id:"number_field",name:"Number Field",type:"number",required:!1,placeholder:"Enter a number",validation:{min:0,max:100},group:"Basic Fields"},{id:"email_field",name:"Email Field",type:"email",required:!1,placeholder:"user@example.com",group:"Basic Fields"},{id:"url_field",name:"URL Field",type:"url",required:!1,placeholder:"https://example.com",group:"Basic Fields"},{id:"textarea_field",name:"Textarea Field",type:"textarea",required:!1,placeholder:"Enter multi-line text",group:"Text Fields"},{id:"boolean_field",name:"Boolean Field",type:"boolean",required:!1,placeholder:"Enable this feature",group:"Selection Fields"},{id:"select_field",name:"Select Field",type:"select",required:!0,options:[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"}],group:"Selection Fields"},{id:"date_field",name:"Date Field",type:"date",required:!1,group:"Date/Time Fields"},{id:"time_field",name:"Time Field",type:"time",required:!1,group:"Date/Time Fields"},{id:"api_key_field",name:"API Key Field",type:"api_key",required:!0,sensitive:!0,placeholder:"Enter API key",group:"Security Fields"},{id:"webhook_field",name:"Webhook URL Field",type:"webhook_url",required:!1,placeholder:"https://api.example.com/webhook",validation:{pattern:"^https?://.*",message:"Must be a valid URL"},group:"Advanced Fields"}],currentValues:{text_field:"Sample text",password_field:"secret123",number_field:42,email_field:"user@example.com",url_field:"https://example.com",textarea_field:`Multi-line
text example`,boolean_field:!0,select_field:"option2",date_field:"2024-01-20",time_field:"14:30",api_key_field:"sk_test_12345",webhook_field:"https://api.example.com/webhook"}},isOpen:!0,onClose:t("close"),onSave:t("save")},parameters:{docs:{description:{story:"Comprehensive demonstration of all available field types and their validation."}}}};var se,oe,le;_.parameters={..._.parameters,docs:{...(se=_.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    tool: mockBasicTool,
    isOpen: true,
    onClose: action('close'),
    onSave: action('save'),
    onActivate: action('activate'),
    onDeactivate: action('deactivate'),
    onReset: action('reset'),
    onRemove: action('remove'),
    onTestConfiguration: action('test-configuration')
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic tool configuration with simple fields and validation.'
      }
    }
  }
}`,...(le=(oe=_.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var de,ce,me;I.parameters={...I.parameters,docs:{...(de=I.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    tool: mockAdvancedTool,
    isOpen: true,
    onClose: action('close'),
    onSave: action('save'),
    onActivate: action('activate'),
    onDeactivate: action('deactivate'),
    onReset: action('reset'),
    onRemove: action('remove'),
    onTestConfiguration: action('test-configuration')
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced tool with sensitive fields, API configuration, and webhook endpoints.'
      }
    }
  }
}`,...(me=(ce=I.parameters)==null?void 0:ce.docs)==null?void 0:me.source}}};var ue,pe,ve;F.parameters={...F.parameters,docs:{...(ue=F.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    tool: mockErrorTool,
    isOpen: true,
    onClose: action('close'),
    onSave: action('save'),
    onReset: action('reset'),
    onRemove: action('remove'),
    onTestConfiguration: action('test-configuration')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool in error state showing configuration issues.'
      }
    }
  }
}`,...(ve=(pe=F.parameters)==null?void 0:pe.docs)==null?void 0:ve.source}}};var he,ge,ye;q.parameters={...q.parameters,docs:{...(he=q.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    tool: mockNeedsSetupTool,
    isOpen: true,
    onClose: action('close'),
    onSave: action('save'),
    onActivate: action('activate'),
    onRemove: action('remove')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool that needs initial setup with empty configuration.'
      }
    }
  }
}`,...(ye=(ge=q.parameters)==null?void 0:ge.docs)==null?void 0:ye.source}}};var xe,fe,be;E.parameters={...E.parameters,docs:{...(xe=E.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    tool: mockBasicTool,
    isOpen: true,
    isSaving: true,
    onClose: action('close'),
    onSave: action('save')
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration panel in saving state with disabled interactions.'
      }
    }
  }
}`,...(be=(fe=E.parameters)==null?void 0:fe.docs)==null?void 0:be.source}}};var we,ke,Ce;P.parameters={...P.parameters,docs:{...(we=P.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    tool: {
      ...mockBasicTool,
      permissions: {
        canConfigure: false,
        canView: true,
        canActivate: false,
        canRemove: false
      }
    },
    isOpen: true,
    onClose: action('close'),
    onSave: action('save')
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration panel for user with limited permissions (view-only).'
      }
    }
  }
}`,...(Ce=(ke=P.parameters)==null?void 0:ke.docs)==null?void 0:Ce.source}}};var je,Se,Te;R.parameters={...R.parameters,docs:{...(je=R.parameters)==null?void 0:je.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [tool, setTool] = useState<ToolConfigurationData>(mockAdvancedTool);
    const handleSave = async (toolId: string, values: Record<string, any>) => {
      setIsSaving(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setTool(prev => ({
          ...prev,
          currentValues: values,
          status: 'active',
          isConfigured: true,
          lastConfigured: new Date().toISOString()
        }));
        action('save')(toolId, values);
      } catch (error) {
        console.error('Failed to save:', error);
      } finally {
        setIsSaving(false);
      }
    };
    const handleTestConfiguration = async (toolId: string, values: Record<string, any>) => {
      // Simulate test based on API key
      await new Promise(resolve => setTimeout(resolve, 2000));
      const apiKey = values.api_key;
      const isValid = apiKey && apiKey.length > 10 && !apiKey.includes('invalid');
      return {
        success: isValid,
        message: isValid ? 'Configuration test successful! Calendar connection established.' : 'Configuration test failed. Please check your API key and try again.'
      };
    };
    const handleReset = async (toolId: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTool(prev => ({
        ...prev,
        currentValues: {},
        status: 'needs_setup',
        isConfigured: false
      }));
      action('reset')(toolId);
    };
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        {!isOpen && <div className="text-center">
            <button onClick={() => setIsOpen(true)} className="px-6 py-3 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300">
              Configure Tool
            </button>
          </div>}

        <ToolConfigurationPanel tool={tool} isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleSave} onActivate={action('activate')} onDeactivate={action('deactivate')} onReset={handleReset} onRemove={action('remove')} onTestConfiguration={handleTestConfiguration} isSaving={isSaving} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with state management, validation, and testing.'
      }
    }
  }
}`,...(Te=(Se=R.parameters)==null?void 0:Se.docs)==null?void 0:Te.source}}};var Ne,_e,Ie;A.parameters={...A.parameters,docs:{...(Ne=A.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  args: {
    tool: {
      ...mockBasicTool,
      toolName: 'Field Types Demo',
      toolIcon: '🔧',
      description: 'Demonstration of all available field types',
      fields: [{
        id: 'text_field',
        name: 'Text Field',
        type: 'text',
        required: true,
        placeholder: 'Enter some text',
        group: 'Basic Fields'
      }, {
        id: 'password_field',
        name: 'Password Field',
        type: 'password',
        required: true,
        sensitive: true,
        placeholder: 'Enter password',
        group: 'Basic Fields'
      }, {
        id: 'number_field',
        name: 'Number Field',
        type: 'number',
        required: false,
        placeholder: 'Enter a number',
        validation: {
          min: 0,
          max: 100
        },
        group: 'Basic Fields'
      }, {
        id: 'email_field',
        name: 'Email Field',
        type: 'email',
        required: false,
        placeholder: 'user@example.com',
        group: 'Basic Fields'
      }, {
        id: 'url_field',
        name: 'URL Field',
        type: 'url',
        required: false,
        placeholder: 'https://example.com',
        group: 'Basic Fields'
      }, {
        id: 'textarea_field',
        name: 'Textarea Field',
        type: 'textarea',
        required: false,
        placeholder: 'Enter multi-line text',
        group: 'Text Fields'
      }, {
        id: 'boolean_field',
        name: 'Boolean Field',
        type: 'boolean',
        required: false,
        placeholder: 'Enable this feature',
        group: 'Selection Fields'
      }, {
        id: 'select_field',
        name: 'Select Field',
        type: 'select',
        required: true,
        options: [{
          value: 'option1',
          label: 'Option 1'
        }, {
          value: 'option2',
          label: 'Option 2'
        }, {
          value: 'option3',
          label: 'Option 3'
        }],
        group: 'Selection Fields'
      }, {
        id: 'date_field',
        name: 'Date Field',
        type: 'date',
        required: false,
        group: 'Date/Time Fields'
      }, {
        id: 'time_field',
        name: 'Time Field',
        type: 'time',
        required: false,
        group: 'Date/Time Fields'
      }, {
        id: 'api_key_field',
        name: 'API Key Field',
        type: 'api_key',
        required: true,
        sensitive: true,
        placeholder: 'Enter API key',
        group: 'Security Fields'
      }, {
        id: 'webhook_field',
        name: 'Webhook URL Field',
        type: 'webhook_url',
        required: false,
        placeholder: 'https://api.example.com/webhook',
        validation: {
          pattern: '^https?://.*',
          message: 'Must be a valid URL'
        },
        group: 'Advanced Fields'
      }],
      currentValues: {
        text_field: 'Sample text',
        password_field: 'secret123',
        number_field: 42,
        email_field: 'user@example.com',
        url_field: 'https://example.com',
        textarea_field: 'Multi-line\\ntext example',
        boolean_field: true,
        select_field: 'option2',
        date_field: '2024-01-20',
        time_field: '14:30',
        api_key_field: 'sk_test_12345',
        webhook_field: 'https://api.example.com/webhook'
      }
    },
    isOpen: true,
    onClose: action('close'),
    onSave: action('save')
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive demonstration of all available field types and their validation.'
      }
    }
  }
}`,...(Ie=(_e=A.parameters)==null?void 0:_e.docs)==null?void 0:Ie.source}}};const Wr=["BasicTool","AdvancedTool","ErrorState","NeedsSetup","SavingState","LimitedPermissions","InteractiveDemo","AllFieldTypes"];export{I as AdvancedTool,A as AllFieldTypes,_ as BasicTool,F as ErrorState,R as InteractiveDemo,P as LimitedPermissions,q as NeedsSetup,E as SavingState,Wr as __namedExportsOrder,Mr as default};
