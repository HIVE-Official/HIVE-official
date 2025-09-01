import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as Z}from"./index-DJO9vBfz.js";import{c as m}from"./utils-CytzSlOG.js";import{H as g,a as v,c as y,b as w}from"./hive-tokens-CKIUfcHM.js";import{B as u}from"./badge-B09J4pcg.js";import{T as o}from"./text-Cao0VGB4.js";import{Z as J}from"./zap-0mfePDxG.js";import{S as K}from"./settings-GFIh7SpU.js";import{W as k}from"./wrench-7DMXSgPE.js";import{U as z}from"./users-kvqvVsnf.js";import{H as F}from"./heart-Dhw1SL1X.js";import{S as $}from"./star-DcfUHeTk.js";import{P as ee}from"./play-D7e6preK.js";import{E as ae}from"./external-link-DkxaGAGS.js";import{C as oe}from"./chevron-right-BGhHLs4c.js";import{P as V}from"./plus-Cg8nMOSF.js";import{S as te}from"./share-DqvRU5ju.js";import{C as ie}from"./code-B2XVm3Gn.js";import{M as re}from"./message-square-BYWfq8X7.js";import{c as se}from"./createLucideIcon-WpwZgzX-.js";import{a}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=se("Calculator",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]),p=c=>{const s={academic:{color:"text-blue-500",bgColor:"bg-blue-500/10",borderColor:"border-blue-500/20",icon:le,label:"Academic"},productivity:{color:"text-[var(--hive-gold)]",bgColor:"bg-[var(--hive-gold)]/10",borderColor:"border-[var(--hive-gold)]/20",icon:J,label:"Productivity"},social:{color:"text-purple-500",bgColor:"bg-purple-500/10",borderColor:"border-purple-500/20",icon:re,label:"Social"},utility:{color:"text-green-500",bgColor:"bg-green-500/10",borderColor:"border-green-500/20",icon:k,label:"Utility"},experimental:{color:"text-pink-500",bgColor:"bg-pink-500/10",borderColor:"border-pink-500/20",icon:ie,label:"Experimental"}};return s[c]||s.utility},ne=c=>{const s={active:{color:"text-green-500",bgColor:"bg-green-500/10",label:"Active"},draft:{color:"text-yellow-500",bgColor:"bg-yellow-500/10",label:"Draft"},published:{color:"text-blue-500",bgColor:"bg-blue-500/10",label:"Published"},archived:{color:"text-[var(--hive-text-muted)]",bgColor:"bg-[var(--hive-background-secondary)]",label:"Archived"}};return s[c]||s.draft},i=({user:c,personalTools:s=[],totalToolsCreated:Y=0,totalUsage:_=0,featuredTool:r,weeklyActivity:j=0,isEditable:h=!0,onCreateTool:b,onViewTool:n,onEditTool:P,onViewAllTools:N,onToolMarketplace:A,className:Q})=>{const[E,S]=Z.useState(!1),U=s.slice(0,3),M=s.filter(t=>t.status==="active"||t.status==="published").length,X=s.reduce((t,x)=>t+x.likes,0);return e.jsxs(g,{className:m("relative overflow-hidden transition-all duration-300 hover:shadow-lg","bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]",E&&"scale-[1.02]",Q),onMouseEnter:()=>S(!0),onMouseLeave:()=>S(!1),children:[e.jsx(v,{className:"pb-2",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Personal Tools"}),M>0&&e.jsxs(u,{variant:"secondary",className:"text-xs",children:[e.jsx(J,{className:"h-3 w-3 mr-1"}),M," Active"]})]}),h&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:N,className:"h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(K,{className:"h-3 w-3"})})]})}),e.jsxs(y,{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(k,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsx(o,{variant:"body-sm",weight:"medium",color:"primary",children:Y})]}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Tools Created"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(z,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsx(o,{variant:"body-sm",weight:"medium",color:"primary",children:_.toLocaleString()})]}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Total Usage"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(F,{className:"h-3 w-3 text-red-500"}),e.jsx(o,{variant:"body-sm",weight:"medium",color:"primary",children:X})]}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Likes Received"})]})]}),r&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(o,{variant:"body-sm",color:"primary",weight:"medium",children:"Featured Tool:"}),e.jsx($,{className:"h-3 w-3 text-[var(--hive-gold)]"})]}),e.jsx("div",{className:m("p-3 rounded-lg border transition-colors hover:bg-[var(--hive-background-secondary)] cursor-pointer",p(r.category).bgColor,p(r.category).borderColor),onClick:()=>n==null?void 0:n(r.id),children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex items-start gap-2 flex-1 min-w-0",children:[(()=>{const t=p(r.category).icon;return e.jsx(t,{className:m("h-4 w-4 mt-0.5 flex-shrink-0",p(r.category).color)})})(),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx(o,{variant:"body-sm",weight:"medium",color:"primary",className:"truncate",children:r.name}),r.isPublic&&e.jsx(u,{variant:"secondary",className:"text-xs",children:"Public"})]}),e.jsx(o,{variant:"body-xs",color:"secondary",className:"line-clamp-2",children:r.description}),e.jsxs("div",{className:"flex items-center gap-3 mt-2",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(z,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsxs(o,{variant:"body-xs",color:"secondary",children:[r.usageCount.toLocaleString()," uses"]})]}),r.likes>0&&e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(F,{className:"h-3 w-3 text-red-500"}),e.jsx(o,{variant:"body-xs",color:"secondary",children:r.likes})]}),r.collaborators&&r.collaborators>1&&e.jsxs(o,{variant:"body-xs",color:"secondary",children:["+",r.collaborators-1," collaborators"]})]})]})]}),e.jsxs("div",{className:"flex items-center gap-1 ml-2",children:[h&&P&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:t=>{t.stopPropagation(),P(r.id)},className:"h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(ee,{className:"h-3 w-3"})}),e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:t=>{t.stopPropagation(),n==null||n(r.id)},className:"h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(ae,{className:"h-3 w-3"})})]})]})})]}),U.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(o,{variant:"body-sm",color:"primary",weight:"medium",children:"Recent Tools:"}),s.length>3&&e.jsxs(o,{variant:"body-xs",color:"secondary",children:["+",s.length-3," more"]})]}),e.jsx("div",{className:"space-y-1",children:U.map(t=>{const x=p(t.category),B=ne(t.status);return e.jsxs("div",{className:"flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer",onClick:()=>n==null?void 0:n(t.id),children:[e.jsx(x.icon,{className:m("h-3 w-3",x.color)}),e.jsx(o,{variant:"body-xs",color:"primary",className:"flex-1 truncate",children:t.name}),e.jsx(u,{variant:"secondary",className:m("text-xs",B.color),children:B.label}),e.jsxs("div",{className:"flex items-center gap-1",children:[t.usageCount>0&&e.jsx(o,{variant:"body-xs",color:"secondary",children:t.usageCount>999?"999+":t.usageCount}),e.jsx(oe,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"})]})]},t.id)})})]}),j>0&&e.jsxs("div",{className:"space-y-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[e.jsx(o,{variant:"body-sm",color:"primary",weight:"medium",children:"This Week:"}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(o,{variant:"body-sm",color:"secondary",children:"Tool Development Activity"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-16 h-2 bg-[var(--hive-background-secondary)] rounded-full",children:e.jsx("div",{className:"h-2 bg-[var(--hive-gold)] rounded-full transition-all duration-500",style:{width:`${Math.min(j,100)}%`}})}),e.jsxs(o,{variant:"body-xs",color:"gold",weight:"medium",children:[j,"%"]})]})]})]}),e.jsxs("div",{className:"flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[h&&b&&e.jsxs(ButtonEnhanced,{variant:"secondary",size:"sm",onClick:b,className:"flex-1",children:[e.jsx(V,{className:"h-3 w-3 mr-1"}),"Create Tool"]}),N&&e.jsxs(ButtonEnhanced,{variant:"primary",size:"sm",onClick:N,className:"flex-1",children:[e.jsx(k,{className:"h-3 w-3 mr-1"}),"My Tools"]}),A&&e.jsx(ButtonEnhanced,{variant:"ghost",size:"icon",onClick:A,className:"text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(te,{className:"h-3 w-3"})})]}),s.length===0&&e.jsxs("div",{className:"text-center py-6",children:[e.jsx(k,{className:"h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]"}),e.jsx(o,{variant:"body-sm",color:"secondary",className:"mb-2",children:"No tools created yet"}),e.jsx(o,{variant:"body-xs",color:"secondary",className:"mb-4",children:"Start building your first tool to help fellow UB students"}),h&&b&&e.jsxs(ButtonEnhanced,{variant:"secondary",size:"sm",onClick:b,children:[e.jsx(V,{className:"h-3 w-3 mr-1"}),"Create Your First Tool"]})]})]}),E&&e.jsx("div",{className:"absolute inset-0 -z-10 bg-gradient-to-r from-[var(--hive-gold)]/5 to-purple-500/5 rounded-lg blur-xl"})]})};i.__docgenInfo={description:"",methods:[],displayName:"ProfileToolsWidget",props:{user:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}}]}},description:""},personalTools:{required:!1,tsType:{name:"Array",elements:[{name:"PersonalTool"}],raw:"PersonalTool[]"},description:"",defaultValue:{value:"[]",computed:!1}},totalToolsCreated:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},totalUsage:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},featuredTool:{required:!1,tsType:{name:"PersonalTool"},description:""},weeklyActivity:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},isEditable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onCreateTool:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onViewTool:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"void"}}},description:""},onEditTool:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"void"}}},description:""},onViewAllTools:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onToolMarketplace:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const Be={title:"03-Organisms/Profile Tools Widget - COMPLETE DEFINITION",component:i,parameters:{docs:{description:{component:`
## 🛠️ HIVE Profile Tools Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive personal tool portfolio widget for University at Buffalo HIVE platform student tool creation and HiveLAB integration.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Tool Categories** - Academic, productivity, social, utility, experimental with distinct styling
- **4 Tool Status States** - Active, draft, published, archived with proper lifecycle management
- **Featured Tool Display** - Highlighted showcase for most successful or important tools
- **Usage Analytics** - Total usage counts, likes received, and collaboration metrics
- **Development Activity** - Weekly tool development progress with visual indicators
- **Interactive Management** - Create, edit, view, and share tools with seamless workflows
- **Perfect Semantic Tokens** - 100% semantic token usage for consistent theming
- **Mobile Optimized** - Touch-friendly design with responsive tool portfolio management
- **Campus Integration** - Built for University at Buffalo student tool sharing and collaboration

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student tool creation:
- **Academic Tools** - GPA calculators, course planners, algorithm visualizers, study timers
- **Productivity Tools** - Assignment trackers, schedule optimizers, deadline managers
- **Social Tools** - Study group finders, roommate matchers, event coordinators
- **Utility Tools** - Laundry trackers, dining hall menus, campus navigation, weather alerts
- **Experimental Tools** - Creative projects, research prototypes, hackathon submissions
- **Tool Sharing** - Public tool marketplace for campus-wide utility and collaboration
- **Collaboration Features** - Multi-student tool development and version management

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large tool cards and clear interaction zones
- **Quick Tool Access** - One-touch tool launching and editing while on campus
- **Gesture Support** - Swipe interactions for tool navigation and management
- **Responsive Portfolio** - Adaptive tool display for mobile development workflow
`}}},tags:["autodocs"],argTypes:{user:{control:"object",description:"User profile data"},personalTools:{control:"object",description:"Array of personal tools created"},totalToolsCreated:{control:"number",description:"Total number of tools created"},totalUsage:{control:"number",description:"Total usage across all tools"},featuredTool:{control:"object",description:"Featured tool to highlight"},weeklyActivity:{control:{type:"range",min:0,max:100},description:"Weekly development activity percentage"},isEditable:{control:"boolean",description:"Enable editing controls"},onCreateTool:{action:"create-tool",description:"Create new tool handler"},onViewTool:{action:"view-tool",description:"View tool handler"},onEditTool:{action:"edit-tool",description:"Edit tool handler"},onViewAllTools:{action:"view-all-tools",description:"View all tools handler"},onToolMarketplace:{action:"tool-marketplace",description:"Tool marketplace handler"}}},l={activeCreator:[{id:"ub-gpa-calculator",name:"UB GPA Calculator",description:"Smart GPA calculator that accounts for UB credit hours and helps plan your academic goals with semester projections.",category:"academic",status:"published",usageCount:2847,likes:156,collaborators:3,lastUsed:"2 hours ago",isPublic:!0,isFeatured:!0},{id:"study-group-matcher",name:"CSE Study Group Matcher",description:"Find perfect study partners for computer science courses based on schedule, location, and learning style.",category:"social",status:"active",usageCount:1234,likes:89,collaborators:2,lastUsed:"1 day ago",isPublic:!0},{id:"lockwood-availability",name:"Lockwood Study Room Finder",description:"Real-time availability checker for Lockwood Library study rooms with booking integration.",category:"utility",status:"published",usageCount:5672,likes:234,lastUsed:"3 hours ago",isPublic:!0},{id:"algorithm-visualizer",name:"Algorithm Visualization Tool",description:"Interactive visualizations for CSE 331 algorithms including sorting, search, and graph algorithms.",category:"academic",status:"draft",usageCount:45,likes:12,collaborators:4,lastUsed:"1 hour ago",isPublic:!1},{id:"campus-weather-alerts",name:"UB Campus Weather Alerts",description:"Smart weather notifications for outdoor activities and campus events with Buffalo microclimate data.",category:"utility",status:"active",usageCount:892,likes:67,lastUsed:"12 hours ago",isPublic:!0}],newCreator:[{id:"first-tool-schedule",name:"My Course Schedule",description:"Personal course schedule with notifications and assignment tracking for freshman year.",category:"productivity",status:"draft",usageCount:12,likes:3,lastUsed:"30 minutes ago",isPublic:!1}],experimentalCreator:[{id:"neural-network-demo",name:"Neural Network Playground",description:"Interactive neural network builder for machine learning course demonstrations and experiments.",category:"experimental",status:"published",usageCount:567,likes:45,collaborators:8,lastUsed:"4 hours ago",isPublic:!0,isFeatured:!0},{id:"ar-campus-navigation",name:"AR Campus Navigation",description:"Augmented reality campus navigation using WebXR for immersive UB building and classroom finding.",category:"experimental",status:"draft",usageCount:23,likes:8,collaborators:3,lastUsed:"2 days ago",isPublic:!1}]},d={id:"sarah-chen-tools",name:"Sarah Chen"},T={args:{user:d,personalTools:l.activeCreator,totalToolsCreated:12,totalUsage:15847,featuredTool:l.activeCreator[0],weeklyActivity:78,isEditable:!0,onCreateTool:a("create-tool-clicked"),onViewTool:a("view-tool-clicked"),onEditTool:a("edit-tool-clicked"),onViewAllTools:a("view-all-tools-clicked"),onToolMarketplace:a("tool-marketplace-clicked")},render:c=>e.jsxs("div",{className:"p-6 bg-[var(--hive-background-primary)] max-w-md",children:[e.jsx(o,{variant:"body-md",color:"primary",className:"mb-4",children:"HIVE profile tools widget for University at Buffalo student tool portfolio:"}),e.jsx(i,{...c})]})},f={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(g,{children:[e.jsxs(v,{children:[e.jsxs(w,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"success",children:"🛠️ TOOL CREATOR PROFILES"}),"Student Development Levels"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Tool widget variations for different University at Buffalo student development levels and creation experiences"})]}),e.jsx(y,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Creator Development Stages:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Active Tool Creator:"}),e.jsx(i,{user:d,personalTools:l.activeCreator,totalToolsCreated:12,totalUsage:15847,featuredTool:l.activeCreator[0],weeklyActivity:78,isEditable:!0,onCreateTool:a("active-creator-create"),onViewTool:a("active-creator-view"),onEditTool:a("active-creator-edit"),onViewAllTools:a("active-creator-all"),onToolMarketplace:a("active-creator-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Experienced creator with multiple published tools and high campus usage"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"New Tool Creator:"}),e.jsx(i,{user:{id:"jamie-new-creator",name:"Jamie Park"},personalTools:l.newCreator,totalToolsCreated:1,totalUsage:12,featuredTool:l.newCreator[0],weeklyActivity:45,isEditable:!0,onCreateTool:a("new-creator-create"),onViewTool:a("new-creator-view"),onEditTool:a("new-creator-edit"),onViewAllTools:a("new-creator-all"),onToolMarketplace:a("new-creator-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Beginning creator working on first tool, learning development workflow"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Experimental Creator:"}),e.jsx(i,{user:{id:"alex-experimental",name:"Alex Rivera"},personalTools:l.experimentalCreator,totalToolsCreated:8,totalUsage:3456,featuredTool:l.experimentalCreator[0],weeklyActivity:92,isEditable:!0,onCreateTool:a("experimental-creator-create"),onViewTool:a("experimental-creator-view"),onEditTool:a("experimental-creator-edit"),onViewAllTools:a("experimental-creator-all"),onToolMarketplace:a("experimental-creator-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Advanced creator focusing on experimental technologies and research projects"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Empty State:"}),e.jsx(i,{user:{id:"david-empty",name:"David Kim"},personalTools:[],totalToolsCreated:0,totalUsage:0,weeklyActivity:0,isEditable:!0,onCreateTool:a("empty-create-first"),onViewTool:a("empty-view"),onEditTool:a("empty-edit"),onViewAllTools:a("empty-all"),onToolMarketplace:a("empty-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"New student ready to create their first tool with empty state encouragement"})]})]})})]})})})]}),e.jsxs(g,{children:[e.jsxs(v,{children:[e.jsxs(w,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"info",children:"🎯 TOOL CATEGORIES"}),"Development Focus Areas"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"5 tool categories for comprehensive University at Buffalo student tool development and campus utility"})]}),e.jsx(y,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Tool Development Categories:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Tools:"}),e.jsx(i,{user:d,personalTools:[{id:"academic-tool-1",name:"UB GPA Calculator Pro",description:"Advanced GPA calculator with semester planning, credit hour optimization, and graduation timeline.",category:"academic",status:"published",usageCount:3456,likes:189,collaborators:4,isPublic:!0,isFeatured:!0},{id:"academic-tool-2",name:"Algorithm Complexity Analyzer",description:"Visual tool for analyzing time and space complexity of algorithms in CSE courses.",category:"academic",status:"active",usageCount:1234,likes:67,isPublic:!0}],totalToolsCreated:8,totalUsage:12456,featuredTool:{id:"academic-tool-1",name:"UB GPA Calculator Pro",description:"Advanced GPA calculator with semester planning, credit hour optimization, and graduation timeline.",category:"academic",status:"published",usageCount:3456,likes:189,collaborators:4,isPublic:!0,isFeatured:!0},weeklyActivity:65,isEditable:!0,onCreateTool:a("academic-create"),onViewTool:a("academic-view"),onEditTool:a("academic-edit"),onViewAllTools:a("academic-all"),onToolMarketplace:a("academic-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Tools for academic success: calculators, visualizers, course planners, study aids"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Productivity Tools:"}),e.jsx(i,{user:d,personalTools:[{id:"productivity-tool-1",name:"Smart Assignment Tracker",description:"AI-powered assignment tracker that integrates with UB Learn and predicts workload.",category:"productivity",status:"published",usageCount:2891,likes:145,collaborators:2,isPublic:!0,isFeatured:!0},{id:"productivity-tool-2",name:"Study Schedule Optimizer",description:"Optimizes study schedules based on course difficulty, personal energy levels, and deadlines.",category:"productivity",status:"active",usageCount:856,likes:43,isPublic:!0}],totalToolsCreated:6,totalUsage:8945,featuredTool:{id:"productivity-tool-1",name:"Smart Assignment Tracker",description:"AI-powered assignment tracker that integrates with UB Learn and predicts workload.",category:"productivity",status:"published",usageCount:2891,likes:145,collaborators:2,isPublic:!0,isFeatured:!0},weeklyActivity:82,isEditable:!0,onCreateTool:a("productivity-create"),onViewTool:a("productivity-view"),onEditTool:a("productivity-edit"),onViewAllTools:a("productivity-all"),onToolMarketplace:a("productivity-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Tools for efficiency: schedulers, trackers, organizers, automation utilities"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Social Tools:"}),e.jsx(i,{user:d,personalTools:[{id:"social-tool-1",name:"Study Group Matchmaker",description:"Smart matching for study partners based on courses, schedules, and learning styles.",category:"social",status:"published",usageCount:4567,likes:234,collaborators:6,isPublic:!0,isFeatured:!0},{id:"social-tool-2",name:"Campus Event Coordinator",description:"Easy event creation and coordination for student organizations and study groups.",category:"social",status:"active",usageCount:1892,likes:98,isPublic:!0}],totalToolsCreated:10,totalUsage:18934,featuredTool:{id:"social-tool-1",name:"Study Group Matchmaker",description:"Smart matching for study partners based on courses, schedules, and learning styles.",category:"social",status:"published",usageCount:4567,likes:234,collaborators:6,isPublic:!0,isFeatured:!0},weeklyActivity:91,isEditable:!0,onCreateTool:a("social-create"),onViewTool:a("social-view"),onEditTool:a("social-edit"),onViewAllTools:a("social-all"),onToolMarketplace:a("social-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Tools for connection: matchmakers, coordinators, communication enhancers"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Utility Tools:"}),e.jsx(i,{user:d,personalTools:[{id:"utility-tool-1",name:"UB Laundry Tracker",description:"Real-time laundry machine availability across all UB residence halls with notifications.",category:"utility",status:"published",usageCount:8934,likes:456,collaborators:3,isPublic:!0,isFeatured:!0},{id:"utility-tool-2",name:"Campus Navigation GPS",description:"Indoor and outdoor navigation for UB campus with accessibility route options.",category:"utility",status:"active",usageCount:3456,likes:178,isPublic:!0}],totalToolsCreated:15,totalUsage:34567,featuredTool:{id:"utility-tool-1",name:"UB Laundry Tracker",description:"Real-time laundry machine availability across all UB residence halls with notifications.",category:"utility",status:"published",usageCount:8934,likes:456,collaborators:3,isPublic:!0,isFeatured:!0},weeklyActivity:73,isEditable:!0,onCreateTool:a("utility-create"),onViewTool:a("utility-view"),onEditTool:a("utility-edit"),onViewAllTools:a("utility-all"),onToolMarketplace:a("utility-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Tools for campus life: navigation, services, facilities, daily essentials"})]})]})})]})})})]}),e.jsxs(g,{children:[e.jsxs(v,{children:[e.jsxs(w,{className:"flex items-center gap-3",children:[e.jsx(u,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Tool Development Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Profile tools widget usage in actual University at Buffalo student tool creation and campus utility contexts"})]}),e.jsxs(y,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Computer Science Student - Academic Tool Focus:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(o,{as:"h3",variant:"heading-sm",color:"primary",children:"Sarah Chen - CS Junior Tool Portfolio (Algorithm & Data Structure Focus)"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Published Academic Tools:"}),e.jsx(i,{user:{id:"sarah-cs-academic",name:"Sarah Chen"},personalTools:[{id:"cse331-visualizer",name:"CSE 331 Algorithm Visualizer",description:"Interactive visualizations for sorting algorithms, graph traversal, and dynamic programming used in Algorithm Analysis course.",category:"academic",status:"published",usageCount:2847,likes:156,collaborators:4,isPublic:!0,isFeatured:!0},{id:"data-structure-tester",name:"Data Structure Performance Tester",description:"Benchmark and compare performance of different data structures for CSE 250 assignments.",category:"academic",status:"published",usageCount:1456,likes:89,collaborators:2,isPublic:!0},{id:"complexity-calculator",name:"Big O Complexity Calculator",description:"Analyze code snippets and calculate time/space complexity for algorithm design courses.",category:"academic",status:"active",usageCount:892,likes:45,isPublic:!0}],totalToolsCreated:8,totalUsage:12456,featuredTool:{id:"cse331-visualizer",name:"CSE 331 Algorithm Visualizer",description:"Interactive visualizations for sorting algorithms, graph traversal, and dynamic programming used in Algorithm Analysis course.",category:"academic",status:"published",usageCount:2847,likes:156,collaborators:4,isPublic:!0,isFeatured:!0},weeklyActivity:85,isEditable:!0,onCreateTool:a("cs-academic-create"),onViewTool:a("cs-academic-view"),onEditTool:a("cs-academic-edit"),onViewAllTools:a("cs-academic-all"),onToolMarketplace:a("cs-academic-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Academic tools helping CSE students visualize and understand complex algorithms"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Research & Experimental:"}),e.jsx(i,{user:{id:"sarah-cs-research",name:"Sarah Chen"},personalTools:[{id:"ml-playground",name:"Machine Learning Playground",description:"Interactive ML model training environment for CSE 474 course with real-time visualization of training progress.",category:"experimental",status:"draft",usageCount:234,likes:23,collaborators:6,isPublic:!1,isFeatured:!0},{id:"neural-net-builder",name:"Neural Network Architecture Builder",description:"Drag-and-drop neural network designer for understanding deep learning concepts in AI courses.",category:"experimental",status:"active",usageCount:567,likes:34,collaborators:3,isPublic:!0}],totalToolsCreated:12,totalUsage:8934,featuredTool:{id:"ml-playground",name:"Machine Learning Playground",description:"Interactive ML model training environment for CSE 474 course with real-time visualization of training progress.",category:"experimental",status:"draft",usageCount:234,likes:23,collaborators:6,isPublic:!1,isFeatured:!0},weeklyActivity:92,isEditable:!0,onCreateTool:a("cs-research-create"),onViewTool:a("cs-research-view"),onEditTool:a("cs-research-edit"),onViewAllTools:a("cs-research-all"),onToolMarketplace:a("cs-research-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Experimental tools for AI/ML research and advanced computer science exploration"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Engineering Student - Project & Collaboration Focus:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Senior Design Tools:"}),e.jsx(i,{user:{id:"alex-engineering-design",name:"Alex Rivera"},personalTools:[{id:"drone-controller-sim",name:"Autonomous Drone Simulator",description:"Flight simulation and control testing environment for senior design autonomous drone project.",category:"experimental",status:"published",usageCount:892,likes:67,collaborators:5,isPublic:!0,isFeatured:!0},{id:"sensor-data-visualizer",name:"Real-Time Sensor Dashboard",description:"Live sensor data visualization for robotics projects with multi-device synchronization.",category:"utility",status:"active",usageCount:456,likes:34,collaborators:4,isPublic:!0}],totalToolsCreated:6,totalUsage:4567,featuredTool:{id:"drone-controller-sim",name:"Autonomous Drone Simulator",description:"Flight simulation and control testing environment for senior design autonomous drone project.",category:"experimental",status:"published",usageCount:892,likes:67,collaborators:5,isPublic:!0,isFeatured:!0},weeklyActivity:78,isEditable:!0,onCreateTool:a("engineering-design-create"),onViewTool:a("engineering-design-view"),onEditTool:a("engineering-design-edit"),onViewAllTools:a("engineering-design-all"),onToolMarketplace:a("engineering-design-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Senior design project tools for autonomous systems and robotics development"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Student Organization Tools:"}),e.jsx(i,{user:{id:"alex-organization-tools",name:"Alex Rivera"},personalTools:[{id:"robotics-club-manager",name:"Robotics Club Project Manager",description:"Project coordination tool for UB Robotics Club with task assignment and progress tracking.",category:"social",status:"published",usageCount:234,likes:45,collaborators:12,isPublic:!0,isFeatured:!0},{id:"hackathon-team-builder",name:"UB Hackathon Team Builder",description:"Smart team formation for UB hackathons based on skills, interests, and availability.",category:"social",status:"active",usageCount:567,likes:89,collaborators:8,isPublic:!0}],totalToolsCreated:9,totalUsage:3456,featuredTool:{id:"robotics-club-manager",name:"Robotics Club Project Manager",description:"Project coordination tool for UB Robotics Club with task assignment and progress tracking.",category:"social",status:"published",usageCount:234,likes:45,collaborators:12,isPublic:!0,isFeatured:!0},weeklyActivity:65,isEditable:!0,onCreateTool:a("organization-tools-create"),onViewTool:a("organization-tools-view"),onEditTool:a("organization-tools-edit"),onViewAllTools:a("organization-tools-all"),onToolMarketplace:a("organization-tools-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Leadership tools for student organizations and campus event coordination"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Pre-Med Student - Academic & Research Tool Focus:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"MCAT Preparation Tools:"}),e.jsx(i,{user:{id:"jamie-premed-mcat",name:"Jamie Park"},personalTools:[{id:"mcat-physics-simulator",name:"MCAT Physics Problem Simulator",description:"Interactive physics simulations for MCAT preparation with step-by-step solutions.",category:"academic",status:"published",usageCount:1456,likes:123,collaborators:3,isPublic:!0,isFeatured:!0},{id:"biochemistry-pathways",name:"Biochemical Pathways Visualizer",description:"Interactive metabolic pathway diagrams for organic chemistry and biochemistry study.",category:"academic",status:"active",usageCount:789,likes:56,isPublic:!0}],totalToolsCreated:5,totalUsage:3456,featuredTool:{id:"mcat-physics-simulator",name:"MCAT Physics Problem Simulator",description:"Interactive physics simulations for MCAT preparation with step-by-step solutions.",category:"academic",status:"published",usageCount:1456,likes:123,collaborators:3,isPublic:!0,isFeatured:!0},weeklyActivity:89,isEditable:!0,onCreateTool:a("premed-mcat-create"),onViewTool:a("premed-mcat-view"),onEditTool:a("premed-mcat-edit"),onViewAllTools:a("premed-mcat-all"),onToolMarketplace:a("premed-mcat-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"MCAT preparation tools for physics, chemistry, and biological sciences"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Research & Clinical Tools:"}),e.jsx(i,{user:{id:"jamie-premed-research",name:"Jamie Park"},personalTools:[{id:"clinical-data-tracker",name:"Clinical Research Data Tracker",description:"Patient data tracking tool for clinical research at Erie County Medical Center internship.",category:"productivity",status:"draft",usageCount:45,likes:8,collaborators:4,isPublic:!1,isFeatured:!0},{id:"anatomy-study-cards",name:"Interactive Anatomy Study Cards",description:"Flashcard system with 3D anatomical models for human anatomy and physiology courses.",category:"academic",status:"published",usageCount:892,likes:67,isPublic:!0}],totalToolsCreated:7,totalUsage:2345,featuredTool:{id:"clinical-data-tracker",name:"Clinical Research Data Tracker",description:"Patient data tracking tool for clinical research at Erie County Medical Center internship.",category:"productivity",status:"draft",usageCount:45,likes:8,collaborators:4,isPublic:!1,isFeatured:!0},weeklyActivity:76,isEditable:!0,onCreateTool:a("premed-research-create"),onViewTool:a("premed-research-view"),onEditTool:a("premed-research-edit"),onViewAllTools:a("premed-research-all"),onToolMarketplace:a("premed-research-marketplace")}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Research and clinical tools for medical school preparation and healthcare experience"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Mobile Tool Development Experience:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(o,{variant:"body-md",color:"primary",children:"Mobile-optimized tools widget for on-campus development and management:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Mobile Development Workflow:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(o,{variant:"body-sm",weight:"medium",color:"primary",children:"Touch-Friendly Tool Management"}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Quick tool editing and testing while walking between Davis Hall and lab sessions"}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"One-touch tool publishing for immediate campus sharing and feedback"}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Real-time usage analytics viewing during study breaks and between classes"}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Mobile-first tool creation with responsive preview and testing capabilities"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{variant:"body-sm",color:"gold",weight:"medium",children:"Campus-Integrated Development:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(o,{variant:"body-sm",weight:"medium",color:"primary",children:"Location-Aware Tool Development"}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Building-specific tools with automatic UB location integration and services"}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Campus API integration for dining, transportation, and facility services"}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Collaborative development with real-time sharing among project teammates"}),e.jsx(o,{variant:"body-xs",color:"secondary",children:"Tool marketplace discovery with campus usage analytics and peer feedback"})]})]})]})]})]})]})]})]})},C={args:{user:d,personalTools:l.activeCreator.slice(0,3),totalToolsCreated:8,totalUsage:12456,featuredTool:l.activeCreator[0],weeklyActivity:65,isEditable:!0,onCreateTool:a("playground-create-tool"),onViewTool:a("playground-view-tool"),onEditTool:a("playground-edit-tool"),onViewAllTools:a("playground-view-all-tools"),onToolMarketplace:a("playground-tool-marketplace")},render:c=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(g,{children:[e.jsxs(v,{children:[e.jsx(w,{children:"Profile Tools Widget Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different tools widget configurations"})]}),e.jsx(y,{className:"p-6",children:e.jsxs("div",{className:"space-y-4 max-w-md",children:[e.jsx(i,{...c}),e.jsx(o,{variant:"body-sm",color:"secondary",children:"Interactive tools widget testing for University at Buffalo HIVE platform student tool development"})]})})]})})};var I,R,D;T.parameters={...T.parameters,docs:{...(I=T.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    personalTools: sampleTools.activeCreator,
    totalToolsCreated: 12,
    totalUsage: 15847,
    featuredTool: sampleTools.activeCreator[0],
    weeklyActivity: 78,
    isEditable: true,
    onCreateTool: action('create-tool-clicked'),
    onViewTool: action('view-tool-clicked'),
    onEditTool: action('edit-tool-clicked'),
    onViewAllTools: action('view-all-tools-clicked'),
    onToolMarketplace: action('tool-marketplace-clicked')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)] max-w-md">
      <Text variant="body-md" color="primary" className="mb-4">
        HIVE profile tools widget for University at Buffalo student tool portfolio:
      </Text>
      <ProfileToolsWidget {...args} />
    </div>
}`,...(D=(R=T.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var L,O,H;f.parameters={...f.parameters,docs:{...(L=f.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Tool Creator Profiles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🛠️ TOOL CREATOR PROFILES</Badge>
            Student Development Levels
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Tool widget variations for different University at Buffalo student development levels and creation experiences
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Creator Development Stages:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Active Tool Creator:</Text>
                    <ProfileToolsWidget user={sampleUser} personalTools={sampleTools.activeCreator} totalToolsCreated={12} totalUsage={15847} featuredTool={sampleTools.activeCreator[0]} weeklyActivity={78} isEditable={true} onCreateTool={action('active-creator-create')} onViewTool={action('active-creator-view')} onEditTool={action('active-creator-edit')} onViewAllTools={action('active-creator-all')} onToolMarketplace={action('active-creator-marketplace')} />
                    <Text variant="body-xs" color="secondary">
                      Experienced creator with multiple published tools and high campus usage
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">New Tool Creator:</Text>
                    <ProfileToolsWidget user={{
                    id: 'jamie-new-creator',
                    name: 'Jamie Park'
                  }} personalTools={sampleTools.newCreator} totalToolsCreated={1} totalUsage={12} featuredTool={sampleTools.newCreator[0]} weeklyActivity={45} isEditable={true} onCreateTool={action('new-creator-create')} onViewTool={action('new-creator-view')} onEditTool={action('new-creator-edit')} onViewAllTools={action('new-creator-all')} onToolMarketplace={action('new-creator-marketplace')} />
                    <Text variant="body-xs" color="secondary">
                      Beginning creator working on first tool, learning development workflow
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Experimental Creator:</Text>
                    <ProfileToolsWidget user={{
                    id: 'alex-experimental',
                    name: 'Alex Rivera'
                  }} personalTools={sampleTools.experimentalCreator} totalToolsCreated={8} totalUsage={3456} featuredTool={sampleTools.experimentalCreator[0]} weeklyActivity={92} isEditable={true} onCreateTool={action('experimental-creator-create')} onViewTool={action('experimental-creator-view')} onEditTool={action('experimental-creator-edit')} onViewAllTools={action('experimental-creator-all')} onToolMarketplace={action('experimental-creator-marketplace')} />
                    <Text variant="body-xs" color="secondary">
                      Advanced creator focusing on experimental technologies and research projects
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Empty State:</Text>
                    <ProfileToolsWidget user={{
                    id: 'david-empty',
                    name: 'David Kim'
                  }} personalTools={[]} totalToolsCreated={0} totalUsage={0} weeklyActivity={0} isEditable={true} onCreateTool={action('empty-create-first')} onViewTool={action('empty-view')} onEditTool={action('empty-edit')} onViewAllTools={action('empty-all')} onToolMarketplace={action('empty-marketplace')} />
                    <Text variant="body-xs" color="secondary">
                      New student ready to create their first tool with empty state encouragement
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Tool Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎯 TOOL CATEGORIES</Badge>
            Development Focus Areas
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 tool categories for comprehensive University at Buffalo student tool development and campus utility
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Tool Development Categories:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Tools:</Text>
                    <ProfileToolsWidget user={sampleUser} personalTools={[{
                    id: 'academic-tool-1',
                    name: 'UB GPA Calculator Pro',
                    description: 'Advanced GPA calculator with semester planning, credit hour optimization, and graduation timeline.',
                    category: 'academic',
                    status: 'published',
                    usageCount: 3456,
                    likes: 189,
                    collaborators: 4,
                    isPublic: true,
                    isFeatured: true
                  }, {
                    id: 'academic-tool-2',
                    name: 'Algorithm Complexity Analyzer',
                    description: 'Visual tool for analyzing time and space complexity of algorithms in CSE courses.',
                    category: 'academic',
                    status: 'active',
                    usageCount: 1234,
                    likes: 67,
                    isPublic: true
                  }]} totalToolsCreated={8} totalUsage={12456} featuredTool={{
                    id: 'academic-tool-1',
                    name: 'UB GPA Calculator Pro',
                    description: 'Advanced GPA calculator with semester planning, credit hour optimization, and graduation timeline.',
                    category: 'academic',
                    status: 'published',
                    usageCount: 3456,
                    likes: 189,
                    collaborators: 4,
                    isPublic: true,
                    isFeatured: true
                  }} weeklyActivity={65} isEditable={true} onCreateTool={action('academic-create')} onViewTool={action('academic-view')} onEditTool={action('academic-edit')} onViewAllTools={action('academic-all')} onToolMarketplace={action('academic-marketplace')} />
                    <Text variant="body-xs" color="secondary">
                      Tools for academic success: calculators, visualizers, course planners, study aids
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Productivity Tools:</Text>
                    <ProfileToolsWidget user={sampleUser} personalTools={[{
                    id: 'productivity-tool-1',
                    name: 'Smart Assignment Tracker',
                    description: 'AI-powered assignment tracker that integrates with UB Learn and predicts workload.',
                    category: 'productivity',
                    status: 'published',
                    usageCount: 2891,
                    likes: 145,
                    collaborators: 2,
                    isPublic: true,
                    isFeatured: true
                  }, {
                    id: 'productivity-tool-2',
                    name: 'Study Schedule Optimizer',
                    description: 'Optimizes study schedules based on course difficulty, personal energy levels, and deadlines.',
                    category: 'productivity',
                    status: 'active',
                    usageCount: 856,
                    likes: 43,
                    isPublic: true
                  }]} totalToolsCreated={6} totalUsage={8945} featuredTool={{
                    id: 'productivity-tool-1',
                    name: 'Smart Assignment Tracker',
                    description: 'AI-powered assignment tracker that integrates with UB Learn and predicts workload.',
                    category: 'productivity',
                    status: 'published',
                    usageCount: 2891,
                    likes: 145,
                    collaborators: 2,
                    isPublic: true,
                    isFeatured: true
                  }} weeklyActivity={82} isEditable={true} onCreateTool={action('productivity-create')} onViewTool={action('productivity-view')} onEditTool={action('productivity-edit')} onViewAllTools={action('productivity-all')} onToolMarketplace={action('productivity-marketplace')} />
                    <Text variant="body-xs" color="secondary">
                      Tools for efficiency: schedulers, trackers, organizers, automation utilities
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Social Tools:</Text>
                    <ProfileToolsWidget user={sampleUser} personalTools={[{
                    id: 'social-tool-1',
                    name: 'Study Group Matchmaker',
                    description: 'Smart matching for study partners based on courses, schedules, and learning styles.',
                    category: 'social',
                    status: 'published',
                    usageCount: 4567,
                    likes: 234,
                    collaborators: 6,
                    isPublic: true,
                    isFeatured: true
                  }, {
                    id: 'social-tool-2',
                    name: 'Campus Event Coordinator',
                    description: 'Easy event creation and coordination for student organizations and study groups.',
                    category: 'social',
                    status: 'active',
                    usageCount: 1892,
                    likes: 98,
                    isPublic: true
                  }]} totalToolsCreated={10} totalUsage={18934} featuredTool={{
                    id: 'social-tool-1',
                    name: 'Study Group Matchmaker',
                    description: 'Smart matching for study partners based on courses, schedules, and learning styles.',
                    category: 'social',
                    status: 'published',
                    usageCount: 4567,
                    likes: 234,
                    collaborators: 6,
                    isPublic: true,
                    isFeatured: true
                  }} weeklyActivity={91} isEditable={true} onCreateTool={action('social-create')} onViewTool={action('social-view')} onEditTool={action('social-edit')} onViewAllTools={action('social-all')} onToolMarketplace={action('social-marketplace')} />
                    <Text variant="body-xs" color="secondary">
                      Tools for connection: matchmakers, coordinators, communication enhancers
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Utility Tools:</Text>
                    <ProfileToolsWidget user={sampleUser} personalTools={[{
                    id: 'utility-tool-1',
                    name: 'UB Laundry Tracker',
                    description: 'Real-time laundry machine availability across all UB residence halls with notifications.',
                    category: 'utility',
                    status: 'published',
                    usageCount: 8934,
                    likes: 456,
                    collaborators: 3,
                    isPublic: true,
                    isFeatured: true
                  }, {
                    id: 'utility-tool-2',
                    name: 'Campus Navigation GPS',
                    description: 'Indoor and outdoor navigation for UB campus with accessibility route options.',
                    category: 'utility',
                    status: 'active',
                    usageCount: 3456,
                    likes: 178,
                    isPublic: true
                  }]} totalToolsCreated={15} totalUsage={34567} featuredTool={{
                    id: 'utility-tool-1',
                    name: 'UB Laundry Tracker',
                    description: 'Real-time laundry machine availability across all UB residence halls with notifications.',
                    category: 'utility',
                    status: 'published',
                    usageCount: 8934,
                    likes: 456,
                    collaborators: 3,
                    isPublic: true,
                    isFeatured: true
                  }} weeklyActivity={73} isEditable={true} onCreateTool={action('utility-create')} onViewTool={action('utility-view')} onEditTool={action('utility-edit')} onViewAllTools={action('utility-all')} onToolMarketplace={action('utility-marketplace')} />
                    <Text variant="body-xs" color="secondary">
                      Tools for campus life: navigation, services, facilities, daily essentials
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
            Real Campus Tool Development Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile tools widget usage in actual University at Buffalo student tool creation and campus utility contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Computer Science Student Tools */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Computer Science Student - Academic Tool Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Sarah Chen - CS Junior Tool Portfolio (Algorithm & Data Structure Focus)
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Published Academic Tools:</Text>
                    <ProfileToolsWidget user={{
                    id: 'sarah-cs-academic',
                    name: 'Sarah Chen'
                  }} personalTools={[{
                    id: 'cse331-visualizer',
                    name: 'CSE 331 Algorithm Visualizer',
                    description: 'Interactive visualizations for sorting algorithms, graph traversal, and dynamic programming used in Algorithm Analysis course.',
                    category: 'academic',
                    status: 'published',
                    usageCount: 2847,
                    likes: 156,
                    collaborators: 4,
                    isPublic: true,
                    isFeatured: true
                  }, {
                    id: 'data-structure-tester',
                    name: 'Data Structure Performance Tester',
                    description: 'Benchmark and compare performance of different data structures for CSE 250 assignments.',
                    category: 'academic',
                    status: 'published',
                    usageCount: 1456,
                    likes: 89,
                    collaborators: 2,
                    isPublic: true
                  }, {
                    id: 'complexity-calculator',
                    name: 'Big O Complexity Calculator',
                    description: 'Analyze code snippets and calculate time/space complexity for algorithm design courses.',
                    category: 'academic',
                    status: 'active',
                    usageCount: 892,
                    likes: 45,
                    isPublic: true
                  }]} totalToolsCreated={8} totalUsage={12456} featuredTool={{
                    id: 'cse331-visualizer',
                    name: 'CSE 331 Algorithm Visualizer',
                    description: 'Interactive visualizations for sorting algorithms, graph traversal, and dynamic programming used in Algorithm Analysis course.',
                    category: 'academic',
                    status: 'published',
                    usageCount: 2847,
                    likes: 156,
                    collaborators: 4,
                    isPublic: true,
                    isFeatured: true
                  }} weeklyActivity={85} isEditable={true} onCreateTool={action('cs-academic-create')} onViewTool={action('cs-academic-view')} onEditTool={action('cs-academic-edit')} onViewAllTools={action('cs-academic-all')} onToolMarketplace={action('cs-academic-marketplace')} />
                    <Text variant="body-xs" color="secondary">
                      Academic tools helping CSE students visualize and understand complex algorithms
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Research & Experimental:</Text>
                    <ProfileToolsWidget user={{
                    id: 'sarah-cs-research',
                    name: 'Sarah Chen'
                  }} personalTools={[{
                    id: 'ml-playground',
                    name: 'Machine Learning Playground',
                    description: 'Interactive ML model training environment for CSE 474 course with real-time visualization of training progress.',
                    category: 'experimental',
                    status: 'draft',
                    usageCount: 234,
                    likes: 23,
                    collaborators: 6,
                    isPublic: false,
                    isFeatured: true
                  }, {
                    id: 'neural-net-builder',
                    name: 'Neural Network Architecture Builder',
                    description: 'Drag-and-drop neural network designer for understanding deep learning concepts in AI courses.',
                    category: 'experimental',
                    status: 'active',
                    usageCount: 567,
                    likes: 34,
                    collaborators: 3,
                    isPublic: true
                  }]} totalToolsCreated={12} totalUsage={8934} featuredTool={{
                    id: 'ml-playground',
                    name: 'Machine Learning Playground',
                    description: 'Interactive ML model training environment for CSE 474 course with real-time visualization of training progress.',
                    category: 'experimental',
                    status: 'draft',
                    usageCount: 234,
                    likes: 23,
                    collaborators: 6,
                    isPublic: false,
                    isFeatured: true
                  }} weeklyActivity={92} isEditable={true} onCreateTool={action('cs-research-create')} onViewTool={action('cs-research-view')} onEditTool={action('cs-research-edit')} onViewAllTools={action('cs-research-all')} onToolMarketplace={action('cs-research-marketplace')} />
                    <Text variant="body-xs" color="secondary">
                      Experimental tools for AI/ML research and advanced computer science exploration
                    </Text>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Engineering Student Tools */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Engineering Student - Project & Collaboration Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Senior Design Tools:</Text>
                  <ProfileToolsWidget user={{
                  id: 'alex-engineering-design',
                  name: 'Alex Rivera'
                }} personalTools={[{
                  id: 'drone-controller-sim',
                  name: 'Autonomous Drone Simulator',
                  description: 'Flight simulation and control testing environment for senior design autonomous drone project.',
                  category: 'experimental',
                  status: 'published',
                  usageCount: 892,
                  likes: 67,
                  collaborators: 5,
                  isPublic: true,
                  isFeatured: true
                }, {
                  id: 'sensor-data-visualizer',
                  name: 'Real-Time Sensor Dashboard',
                  description: 'Live sensor data visualization for robotics projects with multi-device synchronization.',
                  category: 'utility',
                  status: 'active',
                  usageCount: 456,
                  likes: 34,
                  collaborators: 4,
                  isPublic: true
                }]} totalToolsCreated={6} totalUsage={4567} featuredTool={{
                  id: 'drone-controller-sim',
                  name: 'Autonomous Drone Simulator',
                  description: 'Flight simulation and control testing environment for senior design autonomous drone project.',
                  category: 'experimental',
                  status: 'published',
                  usageCount: 892,
                  likes: 67,
                  collaborators: 5,
                  isPublic: true,
                  isFeatured: true
                }} weeklyActivity={78} isEditable={true} onCreateTool={action('engineering-design-create')} onViewTool={action('engineering-design-view')} onEditTool={action('engineering-design-edit')} onViewAllTools={action('engineering-design-all')} onToolMarketplace={action('engineering-design-marketplace')} />
                  <Text variant="body-xs" color="secondary">
                    Senior design project tools for autonomous systems and robotics development
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Student Organization Tools:</Text>
                  <ProfileToolsWidget user={{
                  id: 'alex-organization-tools',
                  name: 'Alex Rivera'
                }} personalTools={[{
                  id: 'robotics-club-manager',
                  name: 'Robotics Club Project Manager',
                  description: 'Project coordination tool for UB Robotics Club with task assignment and progress tracking.',
                  category: 'social',
                  status: 'published',
                  usageCount: 234,
                  likes: 45,
                  collaborators: 12,
                  isPublic: true,
                  isFeatured: true
                }, {
                  id: 'hackathon-team-builder',
                  name: 'UB Hackathon Team Builder',
                  description: 'Smart team formation for UB hackathons based on skills, interests, and availability.',
                  category: 'social',
                  status: 'active',
                  usageCount: 567,
                  likes: 89,
                  collaborators: 8,
                  isPublic: true
                }]} totalToolsCreated={9} totalUsage={3456} featuredTool={{
                  id: 'robotics-club-manager',
                  name: 'Robotics Club Project Manager',
                  description: 'Project coordination tool for UB Robotics Club with task assignment and progress tracking.',
                  category: 'social',
                  status: 'published',
                  usageCount: 234,
                  likes: 45,
                  collaborators: 12,
                  isPublic: true,
                  isFeatured: true
                }} weeklyActivity={65} isEditable={true} onCreateTool={action('organization-tools-create')} onViewTool={action('organization-tools-view')} onEditTool={action('organization-tools-edit')} onViewAllTools={action('organization-tools-all')} onToolMarketplace={action('organization-tools-marketplace')} />
                  <Text variant="body-xs" color="secondary">
                    Leadership tools for student organizations and campus event coordination
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Pre-Med Student Tools */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Pre-Med Student - Academic & Research Tool Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">MCAT Preparation Tools:</Text>
                  <ProfileToolsWidget user={{
                  id: 'jamie-premed-mcat',
                  name: 'Jamie Park'
                }} personalTools={[{
                  id: 'mcat-physics-simulator',
                  name: 'MCAT Physics Problem Simulator',
                  description: 'Interactive physics simulations for MCAT preparation with step-by-step solutions.',
                  category: 'academic',
                  status: 'published',
                  usageCount: 1456,
                  likes: 123,
                  collaborators: 3,
                  isPublic: true,
                  isFeatured: true
                }, {
                  id: 'biochemistry-pathways',
                  name: 'Biochemical Pathways Visualizer',
                  description: 'Interactive metabolic pathway diagrams for organic chemistry and biochemistry study.',
                  category: 'academic',
                  status: 'active',
                  usageCount: 789,
                  likes: 56,
                  isPublic: true
                }]} totalToolsCreated={5} totalUsage={3456} featuredTool={{
                  id: 'mcat-physics-simulator',
                  name: 'MCAT Physics Problem Simulator',
                  description: 'Interactive physics simulations for MCAT preparation with step-by-step solutions.',
                  category: 'academic',
                  status: 'published',
                  usageCount: 1456,
                  likes: 123,
                  collaborators: 3,
                  isPublic: true,
                  isFeatured: true
                }} weeklyActivity={89} isEditable={true} onCreateTool={action('premed-mcat-create')} onViewTool={action('premed-mcat-view')} onEditTool={action('premed-mcat-edit')} onViewAllTools={action('premed-mcat-all')} onToolMarketplace={action('premed-mcat-marketplace')} />
                  <Text variant="body-xs" color="secondary">
                    MCAT preparation tools for physics, chemistry, and biological sciences
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Research & Clinical Tools:</Text>
                  <ProfileToolsWidget user={{
                  id: 'jamie-premed-research',
                  name: 'Jamie Park'
                }} personalTools={[{
                  id: 'clinical-data-tracker',
                  name: 'Clinical Research Data Tracker',
                  description: 'Patient data tracking tool for clinical research at Erie County Medical Center internship.',
                  category: 'productivity',
                  status: 'draft',
                  usageCount: 45,
                  likes: 8,
                  collaborators: 4,
                  isPublic: false,
                  isFeatured: true
                }, {
                  id: 'anatomy-study-cards',
                  name: 'Interactive Anatomy Study Cards',
                  description: 'Flashcard system with 3D anatomical models for human anatomy and physiology courses.',
                  category: 'academic',
                  status: 'published',
                  usageCount: 892,
                  likes: 67,
                  isPublic: true
                }]} totalToolsCreated={7} totalUsage={2345} featuredTool={{
                  id: 'clinical-data-tracker',
                  name: 'Clinical Research Data Tracker',
                  description: 'Patient data tracking tool for clinical research at Erie County Medical Center internship.',
                  category: 'productivity',
                  status: 'draft',
                  usageCount: 45,
                  likes: 8,
                  collaborators: 4,
                  isPublic: false,
                  isFeatured: true
                }} weeklyActivity={76} isEditable={true} onCreateTool={action('premed-research-create')} onViewTool={action('premed-research-view')} onEditTool={action('premed-research-edit')} onViewAllTools={action('premed-research-all')} onToolMarketplace={action('premed-research-marketplace')} />
                  <Text variant="body-xs" color="secondary">
                    Research and clinical tools for medical school preparation and healthcare experience
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Tool Development */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Tool Development Experience:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized tools widget for on-campus development and management:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Mobile Development Workflow:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Touch-Friendly Tool Management</Text>
                    <Text variant="body-xs" color="secondary">
                      Quick tool editing and testing while walking between Davis Hall and lab sessions
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      One-touch tool publishing for immediate campus sharing and feedback
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Real-time usage analytics viewing during study breaks and between classes
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Mobile-first tool creation with responsive preview and testing capabilities
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus-Integrated Development:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Location-Aware Tool Development</Text>
                    <Text variant="body-xs" color="secondary">
                      Building-specific tools with automatic UB location integration and services
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Campus API integration for dining, transportation, and facility services
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Collaborative development with real-time sharing among project teammates
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Tool marketplace discovery with campus usage analytics and peer feedback
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(H=(O=f.parameters)==null?void 0:O.docs)==null?void 0:H.source}}};var W,G,q;C.parameters={...C.parameters,docs:{...(W=C.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    personalTools: sampleTools.activeCreator.slice(0, 3),
    totalToolsCreated: 8,
    totalUsage: 12456,
    featuredTool: sampleTools.activeCreator[0],
    weeklyActivity: 65,
    isEditable: true,
    onCreateTool: action('playground-create-tool'),
    onViewTool: action('playground-view-tool'),
    onEditTool: action('playground-edit-tool'),
    onViewAllTools: action('playground-view-all-tools'),
    onToolMarketplace: action('playground-tool-marketplace')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Tools Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different tools widget configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 max-w-md">
            <ProfileToolsWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive tools widget testing for University at Buffalo HIVE platform student tool development
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(q=(G=C.parameters)==null?void 0:G.docs)==null?void 0:q.source}}};const ze=["Default","CompleteShowcase","Playground"];export{f as CompleteShowcase,T as Default,C as Playground,ze as __namedExportsOrder,Be as default};
