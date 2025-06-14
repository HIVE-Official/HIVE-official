import{j as t}from"./jsx-runtime-CDt2p4po.js";import{r as v}from"./index-GiUgBvb1.js";import{c as f}from"./utils-CytzSlOG.js";import{Z,B as H,C as $,M as A}from"./zap-DCkLN-xk.js";import{c as a}from"./createLucideIcon-DlCdiEX6.js";import{m as J}from"./proxy-Bec6Vc3j.js";import{L as K}from"./loader-circle-BzTvcBo1.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=a("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=a("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=a("GitBranch",[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=a("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=a("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=a("SquareCheckBig",[["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",key:"1jnkn4"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=a("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=a("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=a("TextCursor",[["path",{d:"M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1",key:"uvaxm9"}],["path",{d:"M7 22h1a4 4 0 0 0 4-4v-1",key:"11xy8d"}],["path",{d:"M7 2h1a4 4 0 0 1 4 4v1",key:"1uw06m"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=a("Type",[["polyline",{points:"4 7 4 4 20 4 20 7",key:"1nosan"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20",key:"swin9y"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]]),oe={textBlock:V,imageBlock:X,divider:Y,stack:te,button:A,choiceSelect:ee,textInput:ae,ratingStars:ne,countdownTimer:$,progressBar:H,conditionGate:U,pingTrigger:Z},S=({element:e,onDragStart:o,onSelect:i,className:c})=>{const l=n=>{n.dataTransfer.setData("application/json",JSON.stringify({elementId:e.id,elementType:e.id})),o==null||o(e)},d=()=>{i==null||i(e)},r=oe[e.id]||V;return t.jsxs(J.div,{className:f("group relative flex flex-col items-center gap-2 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors",c),draggable:!0,onDragStart:l,onClick:d,whileHover:{scale:1.02},whileTap:{scale:.98},children:[t.jsx("div",{className:"flex items-center justify-center w-8 h-8 rounded-md bg-accent-gold/20 text-accent-gold",children:t.jsx(r,{className:"w-4 h-4"})}),t.jsxs("div",{className:"text-center",children:[t.jsx("h3",{className:"text-sm font-medium text-text-primary",children:e.name}),t.jsx("p",{className:"text-xs text-text-muted mt-1 line-clamp-2",children:e.description})]}),t.jsx("div",{className:"absolute inset-0 rounded-lg border-2 border-accent-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"})]})};S.__docgenInfo={description:"",methods:[],displayName:"ElementCard",props:{element:{required:!0,tsType:{name:"Element"},description:"The element to display"},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(elementId: string) => void",signature:{arguments:[{type:{name:"string"},name:"elementId"}],return:{name:"void"}}},description:"Callback when the element is selected"},enableDrag:{required:!1,tsType:{name:"boolean"},description:"Whether drag and drop is enabled"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name"}}};const ie=[{id:"textBlock",name:"Text Block",description:"Display formatted text content",icon:"Type",category:"Display & Layout",defaultConfig:{},validationSchema:""},{id:"imageBlock",name:"Image Block",description:"Display images with captions",icon:"Image",category:"Display & Layout",defaultConfig:{},validationSchema:""},{id:"divider",name:"Divider",description:"Visual separator between sections",icon:"Minus",category:"Display & Layout",defaultConfig:{},validationSchema:""},{id:"stack",name:"Stack Container",description:"Organize elements vertically or horizontally",icon:"Square",category:"Display & Layout",defaultConfig:{},validationSchema:""},{id:"button",name:"Button",description:"Interactive button for user actions",icon:"MousePointer",category:"Inputs & Choices",defaultConfig:{},validationSchema:""},{id:"choiceSelect",name:"Choice Select",description:"Multiple choice selection input",icon:"CheckSquare",category:"Inputs & Choices",defaultConfig:{},validationSchema:""},{id:"textInput",name:"Text Input",description:"Single or multi-line text input",icon:"TextCursor",category:"Inputs & Choices",defaultConfig:{},validationSchema:""},{id:"ratingStars",name:"Rating Stars",description:"Star-based rating input",icon:"Star",category:"Inputs & Choices",defaultConfig:{},validationSchema:""},{id:"countdownTimer",name:"Countdown Timer",description:"Display time remaining until an event",icon:"Clock",category:"Logic & Dynamics",defaultConfig:{},validationSchema:""},{id:"progressBar",name:"Progress Bar",description:"Show completion progress",icon:"BarChart3",category:"Logic & Dynamics",defaultConfig:{},validationSchema:""},{id:"conditionGate",name:"Condition Gate",description:"Conditional content display",icon:"GitBranch",category:"Logic & Dynamics",defaultConfig:{},validationSchema:""},{id:"pingTrigger",name:"Ping Trigger",description:"Send notifications or signals",icon:"Zap",category:"Logic & Dynamics",defaultConfig:{},validationSchema:""}],b=["Display & Layout","Inputs & Choices","Logic & Dynamics"];function re({category:e,elements:o,isCollapsed:i,onToggle:c,onElementSelect:l}){const d=i?Q:F;return t.jsxs("div",{className:"border-b border-white/10 last:border-b-0",children:[t.jsxs("button",{className:f("flex w-full items-center justify-between px-4 py-3","text-left hover:bg-white/5 transition-colors","focus:outline-none focus:ring-1 focus:ring-yellow-400/50"),onClick:c,"aria-expanded":!i,"aria-controls":`category-${e.replace(/\s+/g,"-").toLowerCase()}`,children:[t.jsx("h3",{className:"text-sm font-medium text-white",children:e}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("span",{className:"text-xs text-white/60",children:o.length}),t.jsx(d,{className:"h-4 w-4 text-white/60",strokeWidth:1.5})]})]}),!i&&t.jsx("div",{id:`category-${e.replace(/\s+/g,"-").toLowerCase()}`,className:"grid gap-2 p-4 pt-0",children:o.map(r=>t.jsx(S,{element:r,onSelect:l,enableDrag:!0},r.id))})]})}function z({onElementSelect:e,className:o,isLoading:i=!1}){const[c,l]=v.useState(new Set),d=v.useMemo(()=>b.reduce((n,m)=>(n[m]=ie.filter(s=>s.category===m),n),{}),[]),r=n=>{l(m=>{const s=new Set(m);return s.has(n)?s.delete(n):s.add(n),s})};return i?t.jsxs("div",{className:f("flex h-96 w-80 flex-col items-center justify-center","rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm",o),children:[t.jsx(K,{className:"h-8 w-8 animate-spin text-yellow-400"}),t.jsx("p",{className:"mt-2 text-sm text-white/60",children:"Loading elements..."})]}):t.jsxs("div",{className:f("flex h-96 w-80 flex-col overflow-hidden","rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm",o),children:[t.jsxs("div",{className:"border-b border-white/10 p-4",children:[t.jsx("h2",{className:"text-lg font-semibold text-white",children:"Elements"}),t.jsx("p",{className:"text-sm text-white/60",children:"Click or drag to add to your tool"})]}),t.jsx("div",{className:"flex-1 overflow-y-auto",children:b.map(n=>t.jsx(re,{category:n,elements:d[n]||[],isCollapsed:c.has(n),onToggle:()=>r(n),onElementSelect:e},n))})]})}z.__docgenInfo={description:"",methods:[],displayName:"ElementPicker",props:{onElementSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(elementId: string) => void",signature:{arguments:[{type:{name:"string"},name:"elementId"}],return:{name:"void"}}},description:"Callback when an element is selected"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the picker is in a loading state",defaultValue:{value:"false",computed:!1}}}};const ge={title:"Creator/ElementPicker",component:z,parameters:{layout:"centered",backgrounds:{default:"dark",values:[{name:"dark",value:"#000000"}]}},tags:["autodocs"],argTypes:{onElementSelect:{action:"element-selected"},isLoading:{control:"boolean"}}},u={args:{onElementSelect:e=>{console.log("Selected element:",e)}}},p={args:{isLoading:!0,onElementSelect:e=>{console.log("Selected element:",e)}}},C={title:"Creator/ElementCard",component:S,parameters:{layout:"centered",backgrounds:{default:"dark",values:[{name:"dark",value:"#000000"}]}},tags:["autodocs"],argTypes:{onSelect:{action:"element-selected"},enableDrag:{control:"boolean"}}},g={...C,args:{element:{id:"text-block-1",name:"Text Block",type:"textBlock",description:"Display formatted text content with rich styling options",icon:"Type",category:"Display & Layout",defaultConfig:{},validationSchema:""},onSelect:e=>{console.log("Selected element:",e)},enableDrag:!0}},h={...C,args:{element:{id:"button-1",name:"Button",type:"button",description:"Interactive button for user actions and form submissions",icon:"MousePointer",category:"Inputs & Choices",defaultConfig:{},validationSchema:""},onSelect:e=>{console.log("Selected element:",e)},enableDrag:!0}},y={...C,args:{element:{id:"countdown-timer-1",name:"Countdown Timer",type:"countdownTimer",description:"Display time remaining until an event with real-time updates",icon:"Clock",category:"Logic & Dynamics",defaultConfig:{},validationSchema:""},onSelect:e=>{console.log("Selected element:",e)},enableDrag:!0}},x={...C,args:{element:{id:"text-input-1",name:"Text Input",type:"textInput",description:"Single or multi-line text input with validation",icon:"TextCursor",category:"Inputs & Choices",defaultConfig:{},validationSchema:""},onSelect:e=>{console.log("Selected element:",e)},enableDrag:!1}};var k,w,I;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    onElementSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    }
  }
}`,...(I=(w=u.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var T,D,j;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    isLoading: true,
    onElementSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    }
  }
}`,...(j=(D=p.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var L,B,N;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  ...elementCardMeta,
  args: {
    element: {
      id: 'text-block-1',
      name: 'Text Block',
      type: 'textBlock',
      description: 'Display formatted text content with rich styling options',
      icon: 'Type',
      category: 'Display & Layout',
      defaultConfig: {},
      validationSchema: ''
    },
    onSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
    enableDrag: true
  }
}`,...(N=(B=g.parameters)==null?void 0:B.docs)==null?void 0:N.source}}};var E,M,q;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`{
  ...elementCardMeta,
  args: {
    element: {
      id: 'button-1',
      name: 'Button',
      type: 'button',
      description: 'Interactive button for user actions and form submissions',
      icon: 'MousePointer',
      category: 'Inputs & Choices',
      defaultConfig: {},
      validationSchema: ''
    },
    onSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
    enableDrag: true
  }
}`,...(q=(M=h.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var P,O,_;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
  ...elementCardMeta,
  args: {
    element: {
      id: 'countdown-timer-1',
      name: 'Countdown Timer',
      type: 'countdownTimer',
      description: 'Display time remaining until an event with real-time updates',
      icon: 'Clock',
      category: 'Logic & Dynamics',
      defaultConfig: {},
      validationSchema: ''
    },
    onSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
    enableDrag: true
  }
}`,...(_=(O=y.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var G,R,W;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`{
  ...elementCardMeta,
  args: {
    element: {
      id: 'text-input-1',
      name: 'Text Input',
      type: 'textInput',
      description: 'Single or multi-line text input with validation',
      icon: 'TextCursor',
      category: 'Inputs & Choices',
      defaultConfig: {},
      validationSchema: ''
    },
    onSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
    enableDrag: false
  }
}`,...(W=(R=x.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};const he=["Default","Loading","TextBlockCard","ButtonCard","CountdownTimerCard","CardWithoutDrag"];export{h as ButtonCard,x as CardWithoutDrag,y as CountdownTimerCard,u as Default,p as Loading,g as TextBlockCard,he as __namedExportsOrder,ge as default};
