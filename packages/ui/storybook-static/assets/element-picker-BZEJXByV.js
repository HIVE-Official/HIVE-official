import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as h}from"./index-GiUgBvb1.js";import{c as p}from"./utils-CytzSlOG.js";import{Z as x,B as f,C,M as v}from"./zap-DCkLN-xk.js";import{c as a}from"./createLucideIcon-DlCdiEX6.js";import{m as w}from"./proxy-Bec6Vc3j.js";import{L as k}from"./loader-circle-BzTvcBo1.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=a("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=a("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=a("GitBranch",[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=a("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=a("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=a("SquareCheckBig",[["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",key:"1jnkn4"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=a("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=a("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=a("TextCursor",[["path",{d:"M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1",key:"uvaxm9"}],["path",{d:"M7 22h1a4 4 0 0 0 4-4v-1",key:"11xy8d"}],["path",{d:"M7 2h1a4 4 0 0 1 4 4v1",key:"1uw06m"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=a("Type",[["polyline",{points:"4 7 4 4 20 4 20 7",key:"1nosan"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20",key:"swin9y"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]]),E={textBlock:g,imageBlock:N,divider:T,stack:L,button:v,choiceSelect:I,textInput:q,ratingStars:B,countdownTimer:C,progressBar:f,conditionGate:j,pingTrigger:x},y=({element:i,onDragStart:n,onSelect:o,className:c})=>{const l=t=>{t.dataTransfer.setData("application/json",JSON.stringify({elementId:i.id,elementType:i.id})),n==null||n(i)},d=()=>{o==null||o(i)},r=E[i.id]||g;return e.jsxs(w.div,{className:p("group relative flex flex-col items-center gap-2 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors",c),draggable:!0,onDragStart:l,onClick:d,whileHover:{scale:1.02},whileTap:{scale:.98},children:[e.jsx("div",{className:"flex items-center justify-center w-8 h-8 rounded-md bg-accent-gold/20 text-accent-gold",children:e.jsx(r,{className:"w-4 h-4"})}),e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-sm font-medium text-text-primary",children:i.name}),e.jsx("p",{className:"text-xs text-text-muted mt-1 line-clamp-2",children:i.description})]}),e.jsx("div",{className:"absolute inset-0 rounded-lg border-2 border-accent-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"})]})};y.__docgenInfo={description:"",methods:[],displayName:"ElementCard",props:{element:{required:!0,tsType:{name:"Element"},description:"The element to display"},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(elementId: string) => void",signature:{arguments:[{type:{name:"string"},name:"elementId"}],return:{name:"void"}}},description:"Callback when the element is selected"},enableDrag:{required:!1,tsType:{name:"boolean"},description:"Whether drag and drop is enabled"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name"}}};const D=[{id:"textBlock",name:"Text Block",description:"Display formatted text content",icon:"Type",category:"Display & Layout",defaultConfig:{},validationSchema:""},{id:"imageBlock",name:"Image Block",description:"Display images with captions",icon:"Image",category:"Display & Layout",defaultConfig:{},validationSchema:""},{id:"divider",name:"Divider",description:"Visual separator between sections",icon:"Minus",category:"Display & Layout",defaultConfig:{},validationSchema:""},{id:"stack",name:"Stack Container",description:"Organize elements vertically or horizontally",icon:"Square",category:"Display & Layout",defaultConfig:{},validationSchema:""},{id:"button",name:"Button",description:"Interactive button for user actions",icon:"MousePointer",category:"Inputs & Choices",defaultConfig:{},validationSchema:""},{id:"choiceSelect",name:"Choice Select",description:"Multiple choice selection input",icon:"CheckSquare",category:"Inputs & Choices",defaultConfig:{},validationSchema:""},{id:"textInput",name:"Text Input",description:"Single or multi-line text input",icon:"TextCursor",category:"Inputs & Choices",defaultConfig:{},validationSchema:""},{id:"ratingStars",name:"Rating Stars",description:"Star-based rating input",icon:"Star",category:"Inputs & Choices",defaultConfig:{},validationSchema:""},{id:"countdownTimer",name:"Countdown Timer",description:"Display time remaining until an event",icon:"Clock",category:"Logic & Dynamics",defaultConfig:{},validationSchema:""},{id:"progressBar",name:"Progress Bar",description:"Show completion progress",icon:"BarChart3",category:"Logic & Dynamics",defaultConfig:{},validationSchema:""},{id:"conditionGate",name:"Condition Gate",description:"Conditional content display",icon:"GitBranch",category:"Logic & Dynamics",defaultConfig:{},validationSchema:""},{id:"pingTrigger",name:"Ping Trigger",description:"Send notifications or signals",icon:"Zap",category:"Logic & Dynamics",defaultConfig:{},validationSchema:""}],u=["Display & Layout","Inputs & Choices","Logic & Dynamics"];function M({category:i,elements:n,isCollapsed:o,onToggle:c,onElementSelect:l}){const d=o?S:b;return e.jsxs("div",{className:"border-b border-white/10 last:border-b-0",children:[e.jsxs("button",{className:p("flex w-full items-center justify-between px-4 py-3","text-left hover:bg-white/5 transition-colors","focus:outline-none focus:ring-1 focus:ring-yellow-400/50"),onClick:c,"aria-expanded":!o,"aria-controls":`category-${i.replace(/\s+/g,"-").toLowerCase()}`,children:[e.jsx("h3",{className:"text-sm font-medium text-white",children:i}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-xs text-white/60",children:n.length}),e.jsx(d,{className:"h-4 w-4 text-white/60",strokeWidth:1.5})]})]}),!o&&e.jsx("div",{id:`category-${i.replace(/\s+/g,"-").toLowerCase()}`,className:"grid gap-2 p-4 pt-0",children:n.map(r=>e.jsx(y,{element:r,onSelect:l,enableDrag:!0},r.id))})]})}function G({onElementSelect:i,className:n,isLoading:o=!1}){const[c,l]=h.useState(new Set),d=h.useMemo(()=>u.reduce((t,m)=>(t[m]=D.filter(s=>s.category===m),t),{}),[]),r=t=>{l(m=>{const s=new Set(m);return s.has(t)?s.delete(t):s.add(t),s})};return o?e.jsxs("div",{className:p("flex h-96 w-80 flex-col items-center justify-center","rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm",n),children:[e.jsx(k,{className:"h-8 w-8 animate-spin text-yellow-400"}),e.jsx("p",{className:"mt-2 text-sm text-white/60",children:"Loading elements..."})]}):e.jsxs("div",{className:p("flex h-96 w-80 flex-col overflow-hidden","rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm",n),children:[e.jsxs("div",{className:"border-b border-white/10 p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-white",children:"Elements"}),e.jsx("p",{className:"text-sm text-white/60",children:"Click or drag to add to your tool"})]}),e.jsx("div",{className:"flex-1 overflow-y-auto",children:u.map(t=>e.jsx(M,{category:t,elements:d[t]||[],isCollapsed:c.has(t),onToggle:()=>r(t),onElementSelect:i},t))})]})}G.__docgenInfo={description:"",methods:[],displayName:"ElementPicker",props:{onElementSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(elementId: string) => void",signature:{arguments:[{type:{name:"string"},name:"elementId"}],return:{name:"void"}}},description:"Callback when an element is selected"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the picker is in a loading state",defaultValue:{value:"false",computed:!1}}}};export{G as E,y as a};
