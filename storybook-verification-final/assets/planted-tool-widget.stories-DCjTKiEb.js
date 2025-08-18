import{j as e}from"./jsx-runtime-B9GTzLod.js";import{r as O}from"./index-BMjrbHXN.js";import{m as f,A as Ce}from"./framer-motion-proxy-B9jN8120.js";import{c as m}from"./utils-CytzSlOG.js";import{E as je}from"./ellipsis-D2AHQBIe.js";import{S as A}from"./settings-Cw08DGvz.js";import{M as Se}from"./message-square-B08MMCUN.js";import{P as ye}from"./pause-ysMiIgU5.js";import{P as E}from"./play-xcYDT6Xj.js";import{T as ke}from"./trash-2-CZMgR76f.js";import{C as D}from"./circle-alert-D27CINV1.js";import{C as Pe}from"./calendar-RwBiWFlj.js";import{B as Ve}from"./bar-chart-3-h9BTbren.js";import{U as Re}from"./users-B5XgMSov.js";import{Z as Ie}from"./zap-BzDMfB1h.js";import{C as Ae}from"./circle-check-big-fUBFJcwM.js";import{a}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./createLucideIcon-DtX30ipI.js";import"./v4-CtRu48qb.js";const De={productivity:{color:"text-yellow-400",bgColor:"bg-yellow-500/10",borderColor:"border-yellow-500/20",icon:e.jsx(Ie,{className:"w-4 h-4"})},social:{color:"text-purple-400",bgColor:"bg-purple-500/10",borderColor:"border-purple-500/20",icon:e.jsx(Re,{className:"w-4 h-4"})},academic:{color:"text-blue-400",bgColor:"bg-blue-500/10",borderColor:"border-blue-500/20",icon:e.jsx(Ve,{className:"w-4 h-4"})},coordination:{color:"text-emerald-400",bgColor:"bg-emerald-500/10",borderColor:"border-emerald-500/20",icon:e.jsx(Pe,{className:"w-4 h-4"})}},Ue={active:{color:"text-[var(--hive-status-success)]",bgColor:"bg-[var(--hive-status-success)]/10",borderColor:"border-[var(--hive-status-success)]/20",icon:e.jsx(Ae,{className:"w-4 h-4"}),label:"Active"},configured:{color:"text-[var(--hive-status-info)]",bgColor:"bg-[var(--hive-status-info)]/10",borderColor:"border-[var(--hive-status-info)]/20",icon:e.jsx(A,{className:"w-4 h-4"}),label:"Configured"},needs_setup:{color:"text-[var(--hive-status-warning)]",bgColor:"bg-[var(--hive-status-warning)]/10",borderColor:"border-[var(--hive-status-warning)]/20",icon:e.jsx(D,{className:"w-4 h-4"}),label:"Needs Setup"},error:{color:"text-[var(--hive-status-error)]",bgColor:"bg-[var(--hive-status-error)]/10",borderColor:"border-[var(--hive-status-error)]/20",icon:e.jsx(D,{className:"w-4 h-4"}),label:"Error"},disabled:{color:"text-[var(--hive-text-muted)]",bgColor:"bg-[var(--hive-background-tertiary)]/20",borderColor:"border-[var(--hive-border-primary)]/10",icon:e.jsx(ye,{className:"w-4 h-4"}),label:"Disabled"}},b=({tool:t,variant:n="default",onConfigure:s,onRemove:g,onToggleStatus:i,onViewDetails:d,onViewOutputs:l,showStats:p=!0,showActions:fe=!0,className:U})=>{const[M,h]=O.useState(!1),[x,_]=O.useState(!1),y=De[t.category],c=Ue[t.status],we=o=>{if(!o)return"Never";const Te=new Date,Ne=new Date(o),v=Math.floor((Te.getTime()-Ne.getTime())/(1e3*60*60));return v<1?"Just now":v<24?`${v}h ago`:v<168?`${Math.floor(v/24)}d ago`:`${Math.floor(v/168)}w ago`},q=async()=>{if(i){_(!0);try{await i(t.id,t.status!=="active")}finally{_(!1)}}},u=(()=>{switch(t.status){case"needs_setup":return{label:"Setup Required",action:()=>s==null?void 0:s(t.id),variant:"warning",icon:e.jsx(A,{className:"w-4 h-4"})};case"error":return{label:"Fix Error",action:()=>s==null?void 0:s(t.id),variant:"error",icon:e.jsx(D,{className:"w-4 h-4"})};case"configured":return{label:"Activate",action:q,variant:"success",icon:e.jsx(E,{className:"w-4 h-4"})};case"active":return{label:"Configure",action:()=>s==null?void 0:s(t.id),variant:"default",icon:e.jsx(A,{className:"w-4 h-4"})};default:return null}})();return n==="compact"?e.jsx(f.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},whileHover:{y:-2},className:m("relative group cursor-pointer overflow-hidden","bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl","border border-[var(--hive-border-primary)]/20 rounded-xl p-3","hover:border-[var(--hive-brand-primary)]/30 transition-all duration-300",t.status==="error"&&"border-[var(--hive-status-error)]/30",t.status==="needs_setup"&&"border-[var(--hive-status-warning)]/30",U),onClick:()=>d==null?void 0:d(t.id),children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-lg",children:t.icon}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)] truncate text-sm",children:t.name}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{className:m("flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border",c.bgColor,c.borderColor,c.color),children:[c.icon,e.jsx("span",{children:c.label})]})})]})]})}):e.jsxs(f.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},whileHover:{y:-4},className:m("relative group cursor-pointer overflow-hidden","bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl","border border-[var(--hive-border-primary)]/20 rounded-2xl p-5","hover:border-[var(--hive-brand-primary)]/30 hover:shadow-lg","transition-all duration-300",t.status==="error"&&"border-[var(--hive-status-error)]/30",t.status==="needs_setup"&&"border-[var(--hive-status-warning)]/30",U),children:[e.jsxs("div",{className:"flex items-start justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-12 h-12 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-2xl",children:t.icon}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-primary)] transition-colors duration-300",children:t.name}),e.jsx("p",{className:"text-sm text-[var(--hive-text-secondary)] line-clamp-1",children:t.description}),e.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[e.jsxs("div",{className:m("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border",y.bgColor,y.borderColor,y.color),children:[y.icon,e.jsx("span",{className:"capitalize",children:t.category})]}),e.jsxs("span",{className:"text-xs text-[var(--hive-text-muted)]",children:["v",t.version]})]})]})]}),fe&&e.jsxs("div",{className:"relative",children:[e.jsx("button",{onClick:o=>{o.stopPropagation(),h(!M)},className:"w-8 h-8 rounded-lg flex items-center justify-center text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200",children:e.jsx(je,{className:"w-4 h-4"})}),e.jsx(Ce,{children:M&&e.jsxs(f.div,{initial:{opacity:0,scale:.95,y:-10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:-10},className:"absolute right-0 top-10 w-48 bg-[var(--hive-background-secondary)]/95 backdrop-blur-xl border border-[var(--hive-border-primary)]/30 rounded-xl shadow-lg z-50 py-2",children:[t.canConfigure&&e.jsxs("button",{onClick:o=>{o.stopPropagation(),s==null||s(t.id),h(!1)},className:"w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2",children:[e.jsx(A,{className:"w-4 h-4"}),"Configure Tool"]}),t.outputs&&t.outputs>0&&e.jsxs("button",{onClick:o=>{o.stopPropagation(),l==null||l(t.id),h(!1)},className:"w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2",children:[e.jsx(Se,{className:"w-4 h-4"}),"View Posts (",t.outputs,")"]}),e.jsx("button",{onClick:o=>{o.stopPropagation(),q(),h(!1)},disabled:x,className:"w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50",children:t.status==="active"?e.jsxs(e.Fragment,{children:[e.jsx(ye,{className:"w-4 h-4"}),x?"Disabling...":"Disable Tool"]}):e.jsxs(e.Fragment,{children:[e.jsx(E,{className:"w-4 h-4"}),x?"Activating...":"Activate Tool"]})}),t.canRemove&&e.jsxs("button",{onClick:o=>{o.stopPropagation(),g==null||g(t.id),h(!1)},className:"w-full px-4 py-2 text-left text-sm text-[var(--hive-status-error)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2",children:[e.jsx(ke,{className:"w-4 h-4"}),"Remove Tool"]})]})})]})]}),e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:m("flex items-center gap-2 px-3 py-1.5 rounded-xl border",c.bgColor,c.borderColor),children:[c.icon,e.jsx("span",{className:m("text-sm font-medium",c.color),children:c.label})]}),t.lastUsed&&e.jsxs("span",{className:"text-xs text-[var(--hive-text-muted)]",children:["Last used ",we(t.lastUsed)]})]}),t.status==="error"&&t.errorMessage&&e.jsx("div",{className:"mb-4 p-3 bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/20 rounded-xl",children:e.jsxs("div",{className:"flex items-start gap-2",children:[e.jsx(D,{className:"w-4 h-4 text-[var(--hive-status-error)] mt-0.5"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-[var(--hive-status-error)]",children:"Tool Error"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-secondary)] mt-1",children:t.errorMessage})]})]})}),p&&e.jsxs("div",{className:"grid grid-cols-3 gap-3 mb-4",children:[t.outputs!==void 0&&e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-lg font-bold text-[var(--hive-text-primary)]",children:t.outputs}),e.jsx("div",{className:"text-xs text-[var(--hive-text-muted)]",children:"Posts"})]}),t.usageCount!==void 0&&e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-lg font-bold text-[var(--hive-text-primary)]",children:t.usageCount}),e.jsx("div",{className:"text-xs text-[var(--hive-text-muted)]",children:"Uses"})]}),t.interactions!==void 0&&e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-lg font-bold text-[var(--hive-text-primary)]",children:t.interactions}),e.jsx("div",{className:"text-xs text-[var(--hive-text-muted)]",children:"Interactions"})]})]}),u&&e.jsxs(f.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:o=>{o.stopPropagation(),u.action()},disabled:x,className:m("w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 disabled:opacity-50",u.variant==="warning"&&"bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)] border border-[var(--hive-status-warning)]/40 hover:bg-[var(--hive-status-warning)]/30",u.variant==="error"&&"bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)] border border-[var(--hive-status-error)]/40 hover:bg-[var(--hive-status-error)]/30",u.variant==="success"&&"bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/40 hover:bg-[var(--hive-status-success)]/30",u.variant==="default"&&"bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30"),children:[u.icon,e.jsx("span",{children:x?"Loading...":u.label})]}),e.jsx("div",{className:"absolute inset-0 bg-gradient-radial from-[var(--hive-brand-primary)]/2 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"})]})};b.__docgenInfo={description:"",methods:[],displayName:"PlantedToolWidget",props:{tool:{required:!0,tsType:{name:"PlantedTool"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'compact' | 'detailed'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'detailed'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},onConfigure:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"void"}}},description:""},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"void"}}},description:""},onToggleStatus:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string, active: boolean) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"},{type:{name:"boolean"},name:"active"}],return:{name:"void"}}},description:""},onViewDetails:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"void"}}},description:""},onViewOutputs:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"void"}}},description:""},showStats:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showActions:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const tt={title:"HIVE/Tools/Molecules/PlantedToolWidget",component:b,parameters:{layout:"fullscreen",docs:{description:{component:"Displays planted tools in the Space Tool Grid with status indicators, configuration options, and usage statistics. Shows different states based on tool configuration and health."}}},argTypes:{variant:{control:{type:"select"},options:["default","compact","detailed"]},showStats:{control:{type:"boolean"}},showActions:{control:{type:"boolean"}}},tags:["autodocs"]},r={id:"event-management",name:"Event Management",description:"Create, manage, and track events with RSVP functionality and calendar integration",icon:"📅",category:"coordination",version:"2.1.0",isConfigured:!0,canConfigure:!0,canRemove:!0,canView:!0,hasRequiredSettings:!0,lastUsed:"2024-01-20T14:30:00Z",usageCount:15,outputs:3,interactions:47},w={args:{tool:{...r,status:"active"},onConfigure:a("configure"),onRemove:a("remove"),onToggleStatus:a("toggle-status"),onViewDetails:a("view-details"),onViewOutputs:a("view-outputs")}},T={args:{tool:{...r,status:"needs_setup",isConfigured:!1,hasRequiredSettings:!1,name:"Assignment Tracker",description:"Track assignments, due dates, and submission status",icon:"📝",category:"academic",usageCount:0,outputs:0,interactions:0,lastUsed:void 0},onConfigure:a("configure"),onRemove:a("remove"),onToggleStatus:a("toggle-status"),onViewDetails:a("view-details")},parameters:{docs:{description:{story:"Tool that has been planted but needs initial configuration before it can be used."}}}},N={args:{tool:{...r,status:"error",errorMessage:"Failed to connect to calendar API. Check your integration settings.",name:"Calendar Sync",description:"Sync events with external calendar services",icon:"🔄",category:"productivity"},onConfigure:a("configure"),onRemove:a("remove"),onToggleStatus:a("toggle-status"),onViewDetails:a("view-details")},parameters:{docs:{description:{story:"Tool in error state showing error message and fix action."}}}},C={args:{tool:{...r,status:"configured",name:"Poll Creator",description:"Create polls and surveys for community decision making",icon:"📊",category:"social",usageCount:0,outputs:0,interactions:0,lastUsed:void 0},onConfigure:a("configure"),onRemove:a("remove"),onToggleStatus:a("toggle-status"),onViewDetails:a("view-details")},parameters:{docs:{description:{story:"Tool that is configured but not yet activated."}}}},j={args:{tool:{...r,status:"disabled",name:"Study Timer",description:"Pomodoro-style timer for focused study sessions",icon:"⏰",category:"productivity",usageCount:28,outputs:12,interactions:95,lastUsed:"2024-01-18T10:15:00Z"},onConfigure:a("configure"),onRemove:a("remove"),onToggleStatus:a("toggle-status"),onViewDetails:a("view-details"),onViewOutputs:a("view-outputs")},parameters:{docs:{description:{story:"Tool that has been temporarily disabled but retains its configuration and history."}}}},S={args:{tool:{...r,status:"active"},variant:"compact",onConfigure:a("configure"),onViewDetails:a("view-details")},parameters:{docs:{description:{story:"Compact variant suitable for dense layouts or mobile views."}}}},k={args:{tool:{...r,status:"active",name:"Group Chat",description:"Real-time messaging and coordination for space members",icon:"💬",category:"social",usageCount:247,outputs:156,interactions:1893,lastUsed:"2024-01-20T16:45:00Z"},onConfigure:a("configure"),onRemove:a("remove"),onToggleStatus:a("toggle-status"),onViewDetails:a("view-details"),onViewOutputs:a("view-outputs")},parameters:{docs:{description:{story:"Highly used tool showing significant engagement statistics."}}}},P={args:{tool:{...r,status:"active",canConfigure:!1,canRemove:!1,canView:!0},onViewDetails:a("view-details"),onViewOutputs:a("view-outputs")},parameters:{docs:{description:{story:"Tool viewed by a regular member with limited permissions (no configure/remove actions)."}}}},V={render:()=>{const t=[{...r,id:"productivity-tool",name:"Task Manager",icon:"✅",category:"productivity",status:"active"},{...r,id:"social-tool",name:"Icebreaker",icon:"🎉",category:"social",status:"configured"},{...r,id:"academic-tool",name:"Grade Tracker",icon:"📈",category:"academic",status:"needs_setup"},{...r,id:"coordination-tool",name:"Meeting Scheduler",icon:"🗓️",category:"coordination",status:"active"}];return e.jsx("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-6",children:"Tool Categories"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:t.map(n=>e.jsx(b,{tool:n,onConfigure:a("configure"),onRemove:a("remove"),onToggleStatus:a("toggle-status"),onViewDetails:a("view-details"),onViewOutputs:a("view-outputs")},n.id))})]})})},parameters:{docs:{description:{story:"Showcase of all tool categories with different statuses."}}}},R={render:()=>{const t=[{...r,status:"active"},{...r,id:"assignment-tracker",name:"Assignment Tracker",icon:"📝",category:"academic",status:"needs_setup",isConfigured:!1,usageCount:0,outputs:0,interactions:0,lastUsed:void 0},{...r,id:"poll-creator",name:"Poll Creator",icon:"📊",category:"social",status:"configured",usageCount:0,outputs:0,interactions:0,lastUsed:void 0},{...r,id:"laundry-tracker",name:"Laundry Tracker",icon:"👕",category:"coordination",status:"active",usageCount:67,outputs:23,interactions:156,lastUsed:"2024-01-20T12:30:00Z"}];return e.jsx("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:e.jsxs("div",{className:"max-w-2xl mx-auto",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Space Tools"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Manage your planted tools and their configurations"})]}),e.jsx("div",{className:"space-y-4",children:t.map(n=>e.jsx(b,{tool:n,onConfigure:a("configure"),onRemove:a("remove"),onToggleStatus:a("toggle-status"),onViewDetails:a("view-details"),onViewOutputs:a("view-outputs")},n.id))}),e.jsxs("div",{className:"mt-6 p-4 border-2 border-dashed border-[var(--hive-border-primary)]/30 rounded-2xl text-center hover:border-[var(--hive-brand-primary)]/50 hover:bg-[var(--hive-brand-primary)]/5 transition-all duration-300 cursor-pointer",children:[e.jsx("div",{className:"w-12 h-12 mx-auto mb-2 rounded-xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 flex items-center justify-center",children:e.jsx("span",{className:"text-2xl",children:"➕"})}),e.jsx("h3",{className:"font-medium text-[var(--hive-text-primary)] mb-1",children:"Plant New Tool"}),e.jsx("p",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Add functionality to your space"})]})]})})},parameters:{docs:{description:{story:"Complete tool grid layout as it would appear in a space dashboard."}}}},I={render:()=>{const[t,n]=React.useState([{...r,status:"active"},{...r,id:"poll-creator",name:"Poll Creator",icon:"📊",category:"social",status:"configured",usageCount:0,outputs:0,interactions:0,lastUsed:void 0}]),s=async(i,d)=>{await new Promise(l=>setTimeout(l,1e3)),n(l=>l.map(p=>p.id===i?{...p,status:d?"active":"disabled"}:p)),a("toggle-status")(i,d)},g=i=>{n(d=>d.filter(l=>l.id!==i)),a("remove")(i)};return e.jsx("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:e.jsxs("div",{className:"max-w-3xl mx-auto",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-6",children:"Interactive Tool Management"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:t.map(i=>e.jsx(b,{tool:i,onConfigure:a("configure"),onRemove:g,onToggleStatus:s,onViewDetails:a("view-details"),onViewOutputs:a("view-outputs")},i.id))})]})})},parameters:{docs:{description:{story:"Fully interactive demo with live state updates for tool management actions."}}}};var G,F,H;w.parameters={...w.parameters,docs:{...(G=w.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'active'
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs')
  }
}`,...(H=(F=w.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var Z,L,W;T.parameters={...T.parameters,docs:{...(Z=T.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'needs_setup',
      isConfigured: false,
      hasRequiredSettings: false,
      name: 'Assignment Tracker',
      description: 'Track assignments, due dates, and submission status',
      icon: '📝',
      category: 'academic',
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool that has been planted but needs initial configuration before it can be used.'
      }
    }
  }
}`,...(W=(L=T.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var B,$,z;N.parameters={...N.parameters,docs:{...(B=N.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'error',
      errorMessage: 'Failed to connect to calendar API. Check your integration settings.',
      name: 'Calendar Sync',
      description: 'Sync events with external calendar services',
      icon: '🔄',
      category: 'productivity'
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool in error state showing error message and fix action.'
      }
    }
  }
}`,...(z=($=N.parameters)==null?void 0:$.docs)==null?void 0:z.source}}};var J,Y,K;C.parameters={...C.parameters,docs:{...(J=C.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'configured',
      name: 'Poll Creator',
      description: 'Create polls and surveys for community decision making',
      icon: '📊',
      category: 'social',
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool that is configured but not yet activated.'
      }
    }
  }
}`,...(K=(Y=C.parameters)==null?void 0:Y.docs)==null?void 0:K.source}}};var Q,X,ee;j.parameters={...j.parameters,docs:{...(Q=j.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'disabled',
      name: 'Study Timer',
      description: 'Pomodoro-style timer for focused study sessions',
      icon: '⏰',
      category: 'productivity',
      usageCount: 28,
      outputs: 12,
      interactions: 95,
      lastUsed: '2024-01-18T10:15:00Z'
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool that has been temporarily disabled but retains its configuration and history.'
      }
    }
  }
}`,...(ee=(X=j.parameters)==null?void 0:X.docs)==null?void 0:ee.source}}};var te,ae,re;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'active'
    },
    variant: 'compact',
    onConfigure: action('configure'),
    onViewDetails: action('view-details')
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant suitable for dense layouts or mobile views.'
      }
    }
  }
}`,...(re=(ae=S.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var se,oe,ie;k.parameters={...k.parameters,docs:{...(se=k.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'active',
      name: 'Group Chat',
      description: 'Real-time messaging and coordination for space members',
      icon: '💬',
      category: 'social',
      usageCount: 247,
      outputs: 156,
      interactions: 1893,
      lastUsed: '2024-01-20T16:45:00Z'
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs')
  },
  parameters: {
    docs: {
      description: {
        story: 'Highly used tool showing significant engagement statistics.'
      }
    }
  }
}`,...(ie=(oe=k.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var ne,ce,le;P.parameters={...P.parameters,docs:{...(ne=P.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'active',
      canConfigure: false,
      canRemove: false,
      canView: true
    },
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool viewed by a regular member with limited permissions (no configure/remove actions).'
      }
    }
  }
}`,...(le=(ce=P.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};var de,ue,me;V.parameters={...V.parameters,docs:{...(de=V.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => {
    const tools: PlantedTool[] = [{
      ...baseTool,
      id: 'productivity-tool',
      name: 'Task Manager',
      icon: '✅',
      category: 'productivity',
      status: 'active'
    }, {
      ...baseTool,
      id: 'social-tool',
      name: 'Icebreaker',
      icon: '🎉',
      category: 'social',
      status: 'configured'
    }, {
      ...baseTool,
      id: 'academic-tool',
      name: 'Grade Tracker',
      icon: '📈',
      category: 'academic',
      status: 'needs_setup'
    }, {
      ...baseTool,
      id: 'coordination-tool',
      name: 'Meeting Scheduler',
      icon: '🗓️',
      category: 'coordination',
      status: 'active'
    }];
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-6">
            Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map(tool => <PlantedToolWidget key={tool.id} tool={tool} onConfigure={action('configure')} onRemove={action('remove')} onToggleStatus={action('toggle-status')} onViewDetails={action('view-details')} onViewOutputs={action('view-outputs')} />)}
          </div>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all tool categories with different statuses.'
      }
    }
  }
}`,...(me=(ue=V.parameters)==null?void 0:ue.docs)==null?void 0:me.source}}};var ve,ge,pe;R.parameters={...R.parameters,docs:{...(ve=R.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  render: () => {
    const tools: PlantedTool[] = [{
      ...baseTool,
      status: 'active'
    }, {
      ...baseTool,
      id: 'assignment-tracker',
      name: 'Assignment Tracker',
      icon: '📝',
      category: 'academic',
      status: 'needs_setup',
      isConfigured: false,
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined
    }, {
      ...baseTool,
      id: 'poll-creator',
      name: 'Poll Creator',
      icon: '📊',
      category: 'social',
      status: 'configured',
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined
    }, {
      ...baseTool,
      id: 'laundry-tracker',
      name: 'Laundry Tracker',
      icon: '👕',
      category: 'coordination',
      status: 'active',
      usageCount: 67,
      outputs: 23,
      interactions: 156,
      lastUsed: '2024-01-20T12:30:00Z'
    }];
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
              Space Tools
            </h2>
            <p className="text-[var(--hive-text-secondary)]">
              Manage your planted tools and their configurations
            </p>
          </div>
          
          <div className="space-y-4">
            {tools.map(tool => <PlantedToolWidget key={tool.id} tool={tool} onConfigure={action('configure')} onRemove={action('remove')} onToggleStatus={action('toggle-status')} onViewDetails={action('view-details')} onViewOutputs={action('view-outputs')} />)}
          </div>
          
          {/* Add New Tool Button */}
          <div className="mt-6 p-4 border-2 border-dashed border-[var(--hive-border-primary)]/30 rounded-2xl text-center hover:border-[var(--hive-brand-primary)]/50 hover:bg-[var(--hive-brand-primary)]/5 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 flex items-center justify-center">
              <span className="text-2xl">➕</span>
            </div>
            <h3 className="font-medium text-[var(--hive-text-primary)] mb-1">
              Plant New Tool
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Add functionality to your space
            </p>
          </div>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete tool grid layout as it would appear in a space dashboard.'
      }
    }
  }
}`,...(pe=(ge=R.parameters)==null?void 0:ge.docs)==null?void 0:pe.source}}};var he,xe,be;I.parameters={...I.parameters,docs:{...(he=I.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: () => {
    const [tools, setTools] = React.useState<PlantedTool[]>([{
      ...baseTool,
      status: 'active'
    }, {
      ...baseTool,
      id: 'poll-creator',
      name: 'Poll Creator',
      icon: '📊',
      category: 'social',
      status: 'configured',
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined
    }]);
    const handleToggleStatus = async (toolId: string, activate: boolean) => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setTools(prevTools => prevTools.map(tool => {
        if (tool.id === toolId) {
          return {
            ...tool,
            status: activate ? 'active' : 'disabled'
          };
        }
        return tool;
      }));
      action('toggle-status')(toolId, activate);
    };
    const handleRemoveTool = (toolId: string) => {
      setTools(prevTools => prevTools.filter(tool => tool.id !== toolId));
      action('remove')(toolId);
    };
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-6">
            Interactive Tool Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map(tool => <PlantedToolWidget key={tool.id} tool={tool} onConfigure={action('configure')} onRemove={handleRemoveTool} onToggleStatus={handleToggleStatus} onViewDetails={action('view-details')} onViewOutputs={action('view-outputs')} />)}
          </div>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with live state updates for tool management actions.'
      }
    }
  }
}`,...(be=(xe=I.parameters)==null?void 0:xe.docs)==null?void 0:be.source}}};const at=["Active","NeedsSetup","ErrorState","Configured","Disabled","CompactVariant","HighUsage","LimitedPermissions","AllCategories","ToolGrid","InteractiveDemo"];export{w as Active,V as AllCategories,S as CompactVariant,C as Configured,j as Disabled,N as ErrorState,k as HighUsage,I as InteractiveDemo,P as LimitedPermissions,T as NeedsSetup,R as ToolGrid,at as __namedExportsOrder,tt as default};
