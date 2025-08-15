import{j as e}from"./jsx-runtime-B9GTzLod.js";import{r as te}from"./index-BMjrbHXN.js";import{c as d}from"./utils-CytzSlOG.js";import{H as m,a as h,c as u,b as j}from"./hive-card-DIMxrd4t.js";import{B as p}from"./badge-BLajwy0n.js";import{T as i}from"./text-BOe2XosQ.js";import{B as c}from"./button-enhanced-DKTgaNxR.js";import{S as re}from"./settings-Cw08DGvz.js";import{c as oe}from"./createLucideIcon-DtX30ipI.js";import{U as L}from"./users-B5XgMSov.js";import{S as le}from"./star-q8LOEa9p.js";import{T as se}from"./target-oZw-M8_W.js";import{P as ne}from"./play-xcYDT6Xj.js";import{C as de}from"./chevron-right-CIwutkFF.js";import{P as q}from"./plus-BTyRuzWD.js";import{E as ce}from"./external-link-BBRviWFd.js";import{T as me}from"./trophy-Cdnp2oJR.js";import{C as ue}from"./code-OMVEgBw0.js";import{S as pe}from"./sparkles-DJELqOJR.js";import{F as ve}from"./flask-conical-DIdSjRDS.js";import{W as ye}from"./wrench-D524ETe4.js";import{Z as ge}from"./zap-BzDMfB1h.js";import{L as be}from"./lightbulb-ClfP9VoE.js";import{a as o}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";/* empty css                    */import"./index-BwobEAja.js";import"./framer-motion-proxy-Bip1EXUU.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=oe("Beaker",[["path",{d:"M4.5 3h15",key:"c7n0jr"}],["path",{d:"M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3",key:"m1uhx7"}],["path",{d:"M6 14h12",key:"4cwo0f"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=oe("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]),w=s=>{const t={academic:{color:"text-blue-500",bgColor:"bg-blue-500/10",borderColor:"border-blue-500/20",icon:be,label:"Academic"},productivity:{color:"text-[var(--hive-gold)]",bgColor:"bg-[var(--hive-gold)]/10",borderColor:"border-[var(--hive-gold)]/20",icon:ge,label:"Productivity"},social:{color:"text-purple-500",bgColor:"bg-purple-500/10",borderColor:"border-purple-500/20",icon:L,label:"Social"},utility:{color:"text-green-500",bgColor:"bg-green-500/10",borderColor:"border-green-500/20",icon:ye,label:"Utility"},experimental:{color:"text-pink-500",bgColor:"bg-pink-500/10",borderColor:"border-pink-500/20",icon:ve,label:"Experimental"}};return t[s]||t.utility},H=s=>{const t={concept:{color:"text-gray-500",bgColor:"bg-gray-500/10",label:"Concept",progress:10},prototype:{color:"text-yellow-500",bgColor:"bg-yellow-500/10",label:"Prototype",progress:35},testing:{color:"text-blue-500",bgColor:"bg-blue-500/10",label:"Testing",progress:70},published:{color:"text-green-500",bgColor:"bg-green-500/10",label:"Published",progress:100},archived:{color:"text-[var(--hive-text-muted)]",bgColor:"bg-[var(--hive-background-secondary)]",label:"Archived",progress:0}};return t[s]||t.concept},he=s=>{const t={novice:{color:"text-green-500",bgColor:"bg-green-500/10",icon:pe,label:"Novice Builder"},apprentice:{color:"text-blue-500",bgColor:"bg-blue-500/10",icon:ue,label:"Apprentice Builder"},expert:{color:"text-purple-500",bgColor:"bg-purple-500/10",icon:A,label:"Expert Builder"},master:{color:"text-[var(--hive-gold)]",bgColor:"bg-[var(--hive-gold)]/10",icon:me,label:"Master Builder"}};return t[s]||t.novice},xe=s=>{const t=new Date(s),T=new Date,v=Math.floor((T.getTime()-t.getTime())/(1e3*60*60));if(v<1){const f=Math.floor((T.getTime()-t.getTime())/6e4);return f<1?"Just now":`${f}m ago`}else return v<24?`${v}h ago`:`${Math.floor(v/24)}d ago`},l=({user:s,builderTools:t=[],activeProjects:T=[],totalBuilds:v=0,totalDeployments:f=0,totalCollaborations:ie=0,builderScore:y=0,weeklyBuildTime:V=0,featuredBuild:r,isEditable:N=!0,onCreateTool:k,onViewTool:g,onEditTool:W,onDeployTool:O,onViewAllBuilds:z,onViewBuildLab:E,className:ae})=>{const[U,F]=te.useState(!1),R=t.sort((a,B)=>new Date(B.lastWorkedOn).getTime()-new Date(a.lastWorkedOn).getTime()).slice(0,3),D=he(s.builderLevel||"novice");return t.filter(a=>["prototype","testing"].includes(a.buildStatus)).length,t.filter(a=>a.buildStatus==="published").length,e.jsxs(m,{className:d("relative overflow-hidden transition-all duration-300 hover:shadow-lg","bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]",U&&"scale-[1.02]",ae),onMouseEnter:()=>F(!0),onMouseLeave:()=>F(!1),children:[e.jsx(h,{className:"pb-2",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"HiveLab Builder"}),e.jsxs(p,{variant:"outline",className:d("text-xs",D.color),children:[e.jsx(D.icon,{className:"h-3 w-3 mr-1"}),D.label]})]}),N&&e.jsx(c,{variant:"ghost",size:"icon",onClick:E,className:"h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(re,{className:"h-3 w-3"})})]})}),e.jsxs(u,{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(I,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:v})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Total Builds"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(A,{className:"h-3 w-3 text-green-500"}),e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:f})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Deployments"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx(L,{className:"h-3 w-3 text-purple-500"}),e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",children:ie})]}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Collaborations"})]})]}),y>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(i,{variant:"body-sm",color:"primary",weight:"medium",children:"Builder Score:"}),e.jsxs(i,{variant:"body-xs",color:"gold",weight:"medium",children:[y,"/100"]})]}),e.jsx("div",{className:"w-full bg-[var(--hive-background-secondary)] rounded-full h-2",children:e.jsx("div",{className:"bg-gradient-to-r from-purple-500 to-[var(--hive-gold)] rounded-full h-2 transition-all duration-500",style:{width:`${y}%`}})}),e.jsx(i,{variant:"body-xs",color:"secondary",children:y>=80?"Master level builder! 🚀":y>=60?"Expert builder - keep growing! ⚡":y>=40?"Apprentice builder - great progress! 💫":"Novice builder - exciting journey ahead! ✨"})]}),r&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(i,{variant:"body-sm",color:"primary",weight:"medium",children:"Featured Build:"}),e.jsx(le,{className:"h-3 w-3 text-[var(--hive-gold)]"})]}),e.jsx("div",{className:d("p-3 rounded-lg border transition-colors hover:bg-[var(--hive-background-secondary)] cursor-pointer",w(r.category).bgColor,w(r.category).borderColor),onClick:()=>g==null?void 0:g(r.id),children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex items-start gap-2 flex-1 min-w-0",children:[(()=>{const a=w(r.category).icon;return e.jsx(a,{className:d("h-4 w-4 mt-0.5 flex-shrink-0",w(r.category).color)})})(),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx(i,{variant:"body-sm",weight:"medium",color:"primary",className:"truncate",children:r.name}),e.jsx(p,{variant:"outline",className:d("text-xs",H(r.buildStatus).color),children:H(r.buildStatus).label})]}),e.jsx(i,{variant:"body-xs",color:"secondary",className:"line-clamp-2",children:r.description}),e.jsxs("div",{className:"flex items-center gap-3 mt-2",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(se,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"}),e.jsxs(i,{variant:"body-xs",color:"secondary",children:[r.progress,"% complete"]})]}),r.collaborators>1&&e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(L,{className:"h-3 w-3 text-purple-500"}),e.jsxs(i,{variant:"body-xs",color:"secondary",children:[r.collaborators," collaborators"]})]}),r.deployments>0&&e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(A,{className:"h-3 w-3 text-green-500"}),e.jsxs(i,{variant:"body-xs",color:"secondary",children:[r.deployments," deployments"]})]})]})]})]}),e.jsxs("div",{className:"flex items-center gap-1 ml-2",children:[N&&W&&e.jsx(c,{variant:"ghost",size:"icon",onClick:a=>{a.stopPropagation(),W(r.id)},className:"h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(ne,{className:"h-3 w-3"})}),O&&r.buildStatus==="testing"&&e.jsx(c,{variant:"ghost",size:"icon",onClick:a=>{a.stopPropagation(),O(r.id)},className:"h-6 w-6 text-green-500 hover:text-green-600",children:e.jsx(A,{className:"h-3 w-3"})})]})]})})]}),R.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(i,{variant:"body-sm",color:"primary",weight:"medium",children:"Recent Builds:"}),t.length>3&&e.jsxs(i,{variant:"body-xs",color:"secondary",children:["+",t.length-3," more"]})]}),e.jsx("div",{className:"space-y-1",children:R.map(a=>{const B=w(a.category),Z=H(a.buildStatus);return e.jsxs("div",{className:"flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer",onClick:()=>g==null?void 0:g(a.id),children:[e.jsx(B.icon,{className:d("h-3 w-3",B.color)}),e.jsx(i,{variant:"body-xs",color:"primary",className:"flex-1 truncate",children:a.name}),e.jsx(p,{variant:"outline",className:d("text-xs",Z.color),children:Z.label}),e.jsx(i,{variant:"body-xs",color:"secondary",children:xe(a.lastWorkedOn)}),e.jsx(de,{className:"h-3 w-3 text-[var(--hive-text-secondary)]"})]},a.id)})})]}),T.length>0&&e.jsxs("div",{className:"space-y-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[e.jsx(i,{variant:"body-sm",color:"primary",weight:"medium",children:"Active Projects:"}),e.jsx("div",{className:"space-y-1",children:T.slice(0,2).map(a=>e.jsxs("div",{className:"flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors",children:[e.jsxs("div",{className:"flex items-center gap-2 flex-1",children:[e.jsx("div",{className:d("w-2 h-2 rounded-full",a.isActive?"bg-green-500":"bg-[var(--hive-text-muted)]")}),e.jsx(i,{variant:"body-xs",color:"primary",className:"truncate",children:a.name})]}),e.jsxs(i,{variant:"body-xs",color:"secondary",children:[a.progress,"%"]}),a.teamSize>1&&e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(L,{className:"h-2 w-2 text-[var(--hive-text-secondary)]"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:a.teamSize})]})]},a.id))})]}),V>0&&e.jsxs("div",{className:"space-y-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[e.jsx(i,{variant:"body-sm",color:"primary",weight:"medium",children:"This Week:"}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(i,{variant:"body-sm",color:"secondary",children:"Build Time"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-16 h-2 bg-[var(--hive-background-secondary)] rounded-full",children:e.jsx("div",{className:"h-2 bg-gradient-to-r from-purple-500 to-[var(--hive-gold)] rounded-full transition-all duration-500",style:{width:`${Math.min(V/20*100,100)}%`}})}),e.jsxs(i,{variant:"body-xs",color:"gold",weight:"medium",children:[V,"h"]})]})]})]}),e.jsxs("div",{className:"flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]",children:[N&&k&&e.jsxs(c,{variant:"outline",size:"sm",onClick:k,className:"flex-1",children:[e.jsx(q,{className:"h-3 w-3 mr-1"}),"New Build"]}),z&&e.jsxs(c,{variant:"default",size:"sm",onClick:z,className:"flex-1",children:[e.jsx(I,{className:"h-3 w-3 mr-1"}),"All Builds"]}),E&&e.jsx(c,{variant:"ghost",size:"icon",onClick:E,className:"text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",children:e.jsx(ce,{className:"h-3 w-3"})})]}),t.length===0&&e.jsxs("div",{className:"text-center py-6",children:[e.jsx(I,{className:"h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]"}),e.jsx(i,{variant:"body-sm",color:"secondary",className:"mb-2",children:"No builds yet"}),e.jsx(i,{variant:"body-xs",color:"secondary",className:"mb-4",children:"Start building your first tool in HiveLab for the UB community"}),N&&k&&e.jsxs(c,{variant:"outline",size:"sm",onClick:k,children:[e.jsx(q,{className:"h-3 w-3 mr-1"}),"Start Your First Build"]})]})]}),U&&e.jsx("div",{className:"absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl"})]})};l.__docgenInfo={description:"",methods:[],displayName:"ProfileHiveLabWidget",props:{user:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  builderLevel?: 'novice' | 'apprentice' | 'expert' | 'master';
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"builderLevel",value:{name:"union",raw:"'novice' | 'apprentice' | 'expert' | 'master'",elements:[{name:"literal",value:"'novice'"},{name:"literal",value:"'apprentice'"},{name:"literal",value:"'expert'"},{name:"literal",value:"'master'"}],required:!1}}]}},description:""},builderTools:{required:!1,tsType:{name:"Array",elements:[{name:"BuilderTool"}],raw:"BuilderTool[]"},description:"",defaultValue:{value:"[]",computed:!1}},activeProjects:{required:!1,tsType:{name:"Array",elements:[{name:"BuilderProject"}],raw:"BuilderProject[]"},description:"",defaultValue:{value:"[]",computed:!1}},totalBuilds:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},totalDeployments:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},totalCollaborations:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},builderScore:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},weeklyBuildTime:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},featuredBuild:{required:!1,tsType:{name:"BuilderTool"},description:""},isEditable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onCreateTool:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onViewTool:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"void"}}},description:""},onEditTool:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"void"}}},description:""},onDeployTool:{required:!1,tsType:{name:"signature",type:"function",raw:"(toolId: string) => void",signature:{arguments:[{type:{name:"string"},name:"toolId"}],return:{name:"void"}}},description:""},onViewAllBuilds:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onViewBuildLab:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const Qe={title:"04-Organisms/Profile System/Profile HiveLab Widget - COMPLETE DEFINITION",component:l,parameters:{docs:{description:{component:`
## 🎯 HIVE Profile HiveLab Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive builder tools and development workspace interface for University at Buffalo HIVE platform student innovation and tool creation tracking.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Tool Categories** - Academic, productivity, social, utility, experimental for complete development coverage
- **5 Build Statuses** - Concept, prototype, testing, published, archived for comprehensive project lifecycle
- **4 Builder Levels** - Novice, apprentice, expert, master for skill progression and community recognition
- **Project Management** - Individual, team, hackathon, academic project tracking with progress monitoring
- **Deployment Pipeline** - Testing to production deployment with collaboration and version control
- **Builder Analytics** - Build time tracking, collaboration metrics, and skill development insights
- **Campus Innovation** - University at Buffalo specific tool development for academic and social utility
- **Technology Integration** - Stack tracking, framework usage, and technical skill development

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student innovation and tool development:
- **Academic Tools** - Course utilities, study aids, academic planning tools for UB curriculum
- **Campus Utilities** - Residence hall tools, dining coordination, campus navigation solutions
- **Social Innovation** - Community building tools, event coordination, peer collaboration platforms
- **Professional Development** - Portfolio builders, career tools, networking utilities for UB students
- **Research Projects** - Academic research tools, data analysis utilities, experiment coordination
- **Hackathon Development** - Competition projects, innovation challenges, collaborative development
- **Skill Building** - Progressive builder levels with mentorship and peer learning opportunities

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Builder Interface** - Large build action buttons optimized for mobile development workflow
- **Responsive Project Management** - Adaptive layout for code editing and project coordination on mobile
- **Quick Deploy Actions** - One-tap deployment and collaboration features for on-the-go development
- **Mobile Development Support** - Campus-based mobile app development with location-aware features
`}}},tags:["autodocs"],argTypes:{builderTools:{control:"object",description:"Array of builder tool projects"},activeProjects:{control:"object",description:"Array of active development projects"},totalBuilds:{control:"number",description:"Total number of tools built"},totalDeployments:{control:"number",description:"Total successful deployments"},totalCollaborations:{control:"number",description:"Total collaborative projects"},builderScore:{control:{type:"range",min:0,max:100},description:"Builder skill score percentage"},weeklyBuildTime:{control:"number",description:"Hours spent building this week"},isEditable:{control:"boolean",description:"Enable editing capabilities"},onCreateTool:{action:"create-tool",description:"Create new tool handler"},onViewTool:{action:"view-tool",description:"View tool details handler"},onEditTool:{action:"edit-tool",description:"Edit tool handler"},onDeployTool:{action:"deploy-tool",description:"Deploy tool handler"},onViewAllBuilds:{action:"view-all-builds",description:"View all builds handler"},onViewBuildLab:{action:"view-build-lab",description:"Open build lab handler"}}},n=[{id:"tool-001",name:"UB GPA Calculator",description:"Simple GPA calculation tool for UB students",category:"academic",buildStatus:"prototype",progress:45,collaborators:1,deployments:0,lastWorkedOn:"2024-01-15T10:30:00Z",isPublic:!1,technologyStack:["HTML","CSS","JavaScript"]},{id:"tool-002",name:"Study Group Finder",description:"Find and join study groups for UB courses",category:"social",buildStatus:"concept",progress:15,collaborators:2,deployments:0,lastWorkedOn:"2024-01-15T09:15:00Z",isPublic:!1,technologyStack:["React","Node.js"]}],b=[{id:"tool-101",name:"UB Course Scheduler Pro",description:"Advanced course scheduling with conflict detection and optimization",category:"academic",buildStatus:"published",progress:100,collaborators:4,deployments:12,lastWorkedOn:"2024-01-15T11:30:00Z",isPublic:!0,isFeatured:!0,technologyStack:["React","TypeScript","Node.js","PostgreSQL"]},{id:"tool-102",name:"Campus Event Coordination System",description:"Comprehensive event planning and coordination platform for UB organizations",category:"social",buildStatus:"testing",progress:85,collaborators:6,deployments:3,lastWorkedOn:"2024-01-15T11:00:00Z",isPublic:!0,technologyStack:["Vue.js","Express","MongoDB","Socket.io"]},{id:"tool-103",name:"Research Data Analysis Tool",description:"Statistical analysis and visualization for UB research projects",category:"academic",buildStatus:"published",progress:100,collaborators:3,deployments:8,lastWorkedOn:"2024-01-15T10:45:00Z",isPublic:!0,technologyStack:["Python","Django","D3.js","NumPy"]},{id:"tool-104",name:"Ellicott Complex Utilities Hub",description:"Integrated utilities for residence hall coordination and community building",category:"utility",buildStatus:"testing",progress:70,collaborators:5,deployments:2,lastWorkedOn:"2024-01-15T10:15:00Z",isPublic:!1,technologyStack:["React Native","Firebase","Google Maps API"]},{id:"tool-105",name:"AI Study Assistant",description:"Machine learning powered study recommendations and progress tracking",category:"experimental",buildStatus:"prototype",progress:60,collaborators:7,deployments:1,lastWorkedOn:"2024-01-15T09:30:00Z",isPublic:!1,technologyStack:["Python","TensorFlow","FastAPI","Redis"]}],x=[{id:"project-001",name:"CSE 442 Group Project",description:"Software engineering team project for course requirement",type:"academic",deadline:"2024-02-15T23:59:59Z",progress:65,teamSize:4,isActive:!0}],M=[{id:"project-101",name:"UB Hackathon 2024 - Campus AI",description:"Artificial intelligence solutions for campus life optimization",type:"hackathon",deadline:"2024-01-20T18:00:00Z",progress:78,teamSize:5,isActive:!0},{id:"project-102",name:"NSF Research Tool Development",description:"National Science Foundation funded research platform development",type:"academic",deadline:"2024-03-30T23:59:59Z",progress:45,teamSize:8,isActive:!0},{id:"project-103",name:"HIVE Platform Core Development",description:"Contributing to main HIVE platform feature development",type:"team",progress:92,teamSize:12,isActive:!0}],C={args:{user:{id:"user-123",name:"Alex Chen",builderLevel:"apprentice"},builderTools:n,activeProjects:x,totalBuilds:5,totalDeployments:2,totalCollaborations:8,builderScore:65,weeklyBuildTime:12,featuredBuild:n[0],isEditable:!0,onCreateTool:o("create-tool"),onViewTool:o("view-tool"),onEditTool:o("edit-tool"),onDeployTool:o("deploy-tool"),onViewAllBuilds:o("view-all-builds"),onViewBuildLab:o("view-build-lab")},render:s=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(m,{children:e.jsxs(u,{className:"space-y-4",children:[e.jsx(i,{variant:"body-md",color:"primary",children:"HIVE profile HiveLab widget for University at Buffalo student innovation and tool development:"}),e.jsx(l,{...s}),e.jsx(i,{variant:"body-sm",color:"secondary",children:"Interactive builder workspace with tool development tracking, collaboration features, and UB campus innovation focus"})]})})})},S={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(m,{children:[e.jsxs(h,{children:[e.jsxs(j,{className:"flex items-center gap-3",children:[e.jsx(p,{variant:"success",children:"🎯 HIVELAB WIDGET SYSTEM"}),"Builder Tools & Innovation"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Complete profile HiveLab widget system for University at Buffalo HIVE platform student innovation and tool development tracking"})]}),e.jsx(u,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"HiveLab Widget Variations:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Novice Builder:"}),e.jsx(l,{user:{id:"user-001",name:"Sarah Johnson",builderLevel:"novice"},builderTools:n,activeProjects:x,totalBuilds:2,totalDeployments:0,totalCollaborations:3,builderScore:35,weeklyBuildTime:8,featuredBuild:n[0],onCreateTool:o("novice-create-tool"),onViewTool:o("novice-view-tool"),onEditTool:o("novice-edit-tool"),onDeployTool:o("novice-deploy-tool"),onViewAllBuilds:o("novice-view-all"),onViewBuildLab:o("novice-view-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Beginning builder learning tool development with first projects and academic focus"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Master Builder:"}),e.jsx(l,{user:{id:"user-002",name:"Marcus Rodriguez",builderLevel:"master"},builderTools:b,activeProjects:M,totalBuilds:28,totalDeployments:45,totalCollaborations:67,builderScore:96,weeklyBuildTime:25,featuredBuild:b[0],onCreateTool:o("master-create-tool"),onViewTool:o("master-view-tool"),onEditTool:o("master-edit-tool"),onDeployTool:o("master-deploy-tool"),onViewAllBuilds:o("master-view-all"),onViewBuildLab:o("master-view-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Advanced builder with extensive portfolio, leadership roles, and research contributions"})]})]})})]})})})]}),e.jsxs(m,{children:[e.jsxs(h,{children:[e.jsxs(j,{className:"flex items-center gap-3",children:[e.jsx(p,{variant:"info",children:"🚀 BUILDER LEVELS"}),"Skill Progression System"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 builder levels for University at Buffalo student skill development and community recognition in tool creation"})]}),e.jsx(u,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Complete Builder Level Progression:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Novice Builder (0-25 points):"}),e.jsx(l,{user:{id:"user-novice",name:"Emma Martinez",builderLevel:"novice"},builderTools:[n[0]],activeProjects:[x[0]],totalBuilds:1,totalDeployments:0,totalCollaborations:1,builderScore:18,weeklyBuildTime:5,onCreateTool:o("novice-level-create"),onViewTool:o("novice-level-view"),onEditTool:o("novice-level-edit"),onDeployTool:o("novice-level-deploy"),onViewAllBuilds:o("novice-level-all"),onViewBuildLab:o("novice-level-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Starting journey with first tools and learning fundamental development skills"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Apprentice Builder (26-50 points):"}),e.jsx(l,{user:{id:"user-apprentice",name:"David Park",builderLevel:"apprentice"},builderTools:n,activeProjects:x,totalBuilds:4,totalDeployments:1,totalCollaborations:6,builderScore:42,weeklyBuildTime:10,featuredBuild:n[1],onCreateTool:o("apprentice-level-create"),onViewTool:o("apprentice-level-view"),onEditTool:o("apprentice-level-edit"),onDeployTool:o("apprentice-level-deploy"),onViewAllBuilds:o("apprentice-level-all"),onViewBuildLab:o("apprentice-level-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Building competency with multiple projects and first successful deployments"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Expert Builder (51-75 points):"}),e.jsx(l,{user:{id:"user-expert",name:"Lisa Thompson",builderLevel:"expert"},builderTools:b.slice(0,3),activeProjects:M.slice(0,2),totalBuilds:12,totalDeployments:18,totalCollaborations:25,builderScore:68,weeklyBuildTime:18,featuredBuild:b[1],onCreateTool:o("expert-level-create"),onViewTool:o("expert-level-view"),onEditTool:o("expert-level-edit"),onDeployTool:o("expert-level-deploy"),onViewAllBuilds:o("expert-level-all"),onViewBuildLab:o("expert-level-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Advanced skills with complex projects and significant community contributions"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Master Builder (76-100 points):"}),e.jsx(l,{user:{id:"user-master",name:"Jordan Lee",builderLevel:"master"},builderTools:b,activeProjects:M,totalBuilds:25,totalDeployments:40,totalCollaborations:55,builderScore:89,weeklyBuildTime:22,featuredBuild:b[0],onCreateTool:o("master-level-create"),onViewTool:o("master-level-view"),onEditTool:o("master-level-edit"),onDeployTool:o("master-level-deploy"),onViewAllBuilds:o("master-level-all"),onViewBuildLab:o("master-level-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Master level expertise with platform contributions and mentorship leadership"})]})]})})]})})})]}),e.jsxs(m,{children:[e.jsxs(h,{children:[e.jsxs(j,{className:"flex items-center gap-3",children:[e.jsx(p,{variant:"primary",children:"🛠️ TOOL CATEGORIES"}),"Development Focus Areas"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"5 tool categories for comprehensive University at Buffalo campus innovation and student utility development"})]}),e.jsx(u,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Complete Tool Category System:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Core Development Categories:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg",children:[e.jsx(i,{variant:"body-sm",color:"primary",weight:"medium",children:"Academic Tools"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Course utilities, study aids, research tools, academic planning"})]}),e.jsxs("div",{className:"p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg",children:[e.jsx(i,{variant:"body-sm",color:"primary",weight:"medium",children:"Productivity Tools"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Time management, task organization, workflow optimization"})]}),e.jsxs("div",{className:"p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg",children:[e.jsx(i,{variant:"body-sm",color:"primary",weight:"medium",children:"Social Tools"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Community building, event coordination, peer collaboration"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Specialized Development Areas:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"p-3 bg-green-500/10 border border-green-500/20 rounded-lg",children:[e.jsx(i,{variant:"body-sm",color:"primary",weight:"medium",children:"Utility Tools"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Campus navigation, dining coordination, residence hall utilities"})]}),e.jsxs("div",{className:"p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg",children:[e.jsx(i,{variant:"body-sm",color:"primary",weight:"medium",children:"Experimental Tools"}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"AI/ML projects, research prototypes, innovative solutions"})]})]})]})]})})]})})})]}),e.jsxs(m,{children:[e.jsxs(h,{children:[e.jsxs(j,{className:"flex items-center gap-3",children:[e.jsx(p,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Builder Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Profile HiveLab widget usage in actual University at Buffalo student innovation and tool development contexts"})]}),e.jsxs(u,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"CSE Student Innovation Journey:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{as:"h3",variant:"heading-sm",color:"primary",children:"Computer Science Students Building Campus Solutions"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"CSE 442 - Software Engineering Focus:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(l,{user:{id:"user-cse-001",name:"Alex Chen",builderLevel:"expert"},builderTools:[{id:"cse-001",name:"UB Course Dependency Mapper",description:"Visualize prerequisite chains for computer science courses",category:"academic",buildStatus:"testing",progress:88,collaborators:4,deployments:2,lastWorkedOn:"2024-01-15T11:30:00Z",isPublic:!0,technologyStack:["React","D3.js","Node.js","MongoDB"]},{id:"cse-002",name:"Algorithm Complexity Visualizer",description:"Interactive big-O notation learning tool",category:"academic",buildStatus:"published",progress:100,collaborators:2,deployments:8,lastWorkedOn:"2024-01-15T10:15:00Z",isPublic:!0,isFeatured:!0,technologyStack:["Vue.js","TypeScript","Canvas API"]}],activeProjects:[{id:"cse-project-001",name:"CSE 442 - Campus Navigation App",description:"Senior capstone project for indoor campus navigation",type:"academic",deadline:"2024-05-15T23:59:59Z",progress:75,teamSize:5,isActive:!0}],totalBuilds:8,totalDeployments:15,totalCollaborations:12,builderScore:82,weeklyBuildTime:20,featuredBuild:{id:"cse-002",name:"Algorithm Complexity Visualizer",description:"Interactive big-O notation learning tool",category:"academic",buildStatus:"published",progress:100,collaborators:2,deployments:8,lastWorkedOn:"2024-01-15T10:15:00Z",isPublic:!0,isFeatured:!0,technologyStack:["Vue.js","TypeScript","Canvas API"]},onCreateTool:o("cse-create-tool"),onViewTool:o("cse-view-tool"),onEditTool:o("cse-edit-tool"),onDeployTool:o("cse-deploy-tool"),onViewAllBuilds:o("cse-view-all"),onViewBuildLab:o("cse-view-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Senior CSE student building academic tools with focus on visualization and campus utility"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Research Focus Development:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(l,{user:{id:"user-research-001",name:"Maya Patel",builderLevel:"master"},builderTools:[{id:"research-001",name:"ML-Powered Study Pattern Analyzer",description:"Machine learning tool analyzing student study effectiveness",category:"experimental",buildStatus:"testing",progress:92,collaborators:6,deployments:3,lastWorkedOn:"2024-01-15T12:00:00Z",isPublic:!1,technologyStack:["Python","TensorFlow","FastAPI","PostgreSQL"]},{id:"research-002",name:"Academic Performance Predictor",description:"Predictive analytics for course success based on engagement patterns",category:"academic",buildStatus:"prototype",progress:65,collaborators:8,deployments:1,lastWorkedOn:"2024-01-15T11:45:00Z",isPublic:!1,technologyStack:["Python","Scikit-learn","Django","Redis"]}],activeProjects:[{id:"research-project-001",name:"NSF Research Grant - Educational AI",description:"National Science Foundation funded educational technology research",type:"academic",deadline:"2024-08-30T23:59:59Z",progress:58,teamSize:12,isActive:!0}],totalBuilds:15,totalDeployments:22,totalCollaborations:35,builderScore:94,weeklyBuildTime:28,featuredBuild:{id:"research-001",name:"ML-Powered Study Pattern Analyzer",description:"Machine learning tool analyzing student study effectiveness",category:"experimental",buildStatus:"testing",progress:92,collaborators:6,deployments:3,lastWorkedOn:"2024-01-15T12:00:00Z",isPublic:!1,technologyStack:["Python","TensorFlow","FastAPI","PostgreSQL"]},onCreateTool:o("research-create-tool"),onViewTool:o("research-view-tool"),onEditTool:o("research-edit-tool"),onDeployTool:o("research-deploy-tool"),onViewAllBuilds:o("research-view-all"),onViewBuildLab:o("research-view-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Graduate researcher building AI/ML tools for educational technology and student success"})]})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"UB Hackathon Innovation:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"48-Hour Sprint Development:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(l,{user:{id:"user-hack-001",name:"Jordan Kim",builderLevel:"apprentice"},builderTools:[{id:"hack-001",name:"Campus Crisis Response System",description:"Emergency coordination platform for campus safety",category:"utility",buildStatus:"prototype",progress:85,collaborators:4,deployments:1,lastWorkedOn:"2024-01-15T18:30:00Z",isPublic:!0,technologyStack:["React","Socket.io","Express","MongoDB"]}],activeProjects:[{id:"hack-project-001",name:"UB Hackathon 2024 - Emergency Response",description:"Campus safety innovation challenge",type:"hackathon",deadline:"2024-01-20T18:00:00Z",progress:85,teamSize:4,isActive:!0}],totalBuilds:3,totalDeployments:1,totalCollaborations:7,builderScore:58,weeklyBuildTime:35,featuredBuild:{id:"hack-001",name:"Campus Crisis Response System",description:"Emergency coordination platform for campus safety",category:"utility",buildStatus:"prototype",progress:85,collaborators:4,deployments:1,lastWorkedOn:"2024-01-15T18:30:00Z",isPublic:!0,technologyStack:["React","Socket.io","Express","MongoDB"]},onCreateTool:o("hack-create-tool"),onViewTool:o("hack-view-tool"),onEditTool:o("hack-edit-tool"),onDeployTool:o("hack-deploy-tool"),onViewAllBuilds:o("hack-view-all"),onViewBuildLab:o("hack-view-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Hackathon team member building emergency response system with intensive development timeline"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Sustainability Challenge:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(l,{user:{id:"user-sustain-001",name:"Sam Wilson",builderLevel:"expert"},builderTools:[{id:"sustain-001",name:"UB Carbon Footprint Tracker",description:"Track and reduce campus environmental impact",category:"utility",buildStatus:"testing",progress:92,collaborators:5,deployments:2,lastWorkedOn:"2024-01-15T17:45:00Z",isPublic:!0,technologyStack:["Vue.js","Node.js","PostgreSQL","Chart.js"]}],activeProjects:[{id:"sustain-project-001",name:"Green Campus Innovation Challenge",description:"Sustainability focused development sprint",type:"hackathon",deadline:"2024-01-22T20:00:00Z",progress:92,teamSize:5,isActive:!0}],totalBuilds:9,totalDeployments:12,totalCollaborations:18,builderScore:74,weeklyBuildTime:30,onCreateTool:o("sustain-create-tool"),onViewTool:o("sustain-view-tool"),onEditTool:o("sustain-edit-tool"),onDeployTool:o("sustain-deploy-tool"),onViewAllBuilds:o("sustain-view-all"),onViewBuildLab:o("sustain-view-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Environmental engineering student building sustainability tracking tools for campus green initiatives"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Social Innovation Focus:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(l,{user:{id:"user-social-001",name:"Riley Martinez",builderLevel:"novice"},builderTools:[{id:"social-001",name:"International Student Buddy System",description:"Connect international and domestic students for cultural exchange",category:"social",buildStatus:"concept",progress:25,collaborators:3,deployments:0,lastWorkedOn:"2024-01-15T16:20:00Z",isPublic:!1,technologyStack:["React","Firebase"]}],activeProjects:[{id:"social-project-001",name:"Diversity & Inclusion Hackathon",description:"Building inclusive campus community tools",type:"hackathon",deadline:"2024-01-21T19:00:00Z",progress:40,teamSize:6,isActive:!0}],totalBuilds:1,totalDeployments:0,totalCollaborations:3,builderScore:22,weeklyBuildTime:15,onCreateTool:o("social-create-tool"),onViewTool:o("social-view-tool"),onEditTool:o("social-edit-tool"),onDeployTool:o("social-deploy-tool"),onViewAllBuilds:o("social-view-all"),onViewBuildLab:o("social-view-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"First-time hackathon participant building social connection tools for campus diversity initiatives"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"New Builder - Getting Started:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{variant:"body-md",color:"primary",children:"First-time HiveLab experience with empty builder portfolio:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"Brand New Builder:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(l,{user:{id:"user-empty-001",name:"Taylor Wilson",builderLevel:"novice"},builderTools:[],activeProjects:[],totalBuilds:0,totalDeployments:0,totalCollaborations:0,builderScore:0,weeklyBuildTime:0,onCreateTool:o("empty-create-tool"),onViewTool:o("empty-view-tool"),onEditTool:o("empty-edit-tool"),onDeployTool:o("empty-deploy-tool"),onViewAllBuilds:o("empty-view-all"),onViewBuildLab:o("empty-view-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"New user experience with call-to-action for first tool development and HiveLab exploration"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(i,{variant:"body-sm",color:"gold",weight:"medium",children:"View-Only Mode:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3",children:[e.jsx(l,{user:{id:"user-readonly-001",name:"Casey Johnson",builderLevel:"apprentice"},builderTools:n,activeProjects:x,totalBuilds:3,totalDeployments:1,totalCollaborations:4,builderScore:45,weeklyBuildTime:8,isEditable:!1,featuredBuild:n[0],onViewTool:o("readonly-view-tool"),onViewAllBuilds:o("readonly-view-all"),onViewBuildLab:o("readonly-view-lab")}),e.jsx(i,{variant:"body-xs",color:"secondary",children:"Read-only profile view without editing capabilities for public portfolio viewing"})]})]})]})]})})]})]})]})]})},P={args:{user:{id:"user-playground",name:"Alex Chen",builderLevel:"apprentice"},builderTools:n,activeProjects:x,totalBuilds:5,totalDeployments:2,totalCollaborations:8,builderScore:65,weeklyBuildTime:12,featuredBuild:n[0],isEditable:!0,onCreateTool:o("playground-create-tool"),onViewTool:o("playground-view-tool"),onEditTool:o("playground-edit-tool"),onDeployTool:o("playground-deploy-tool"),onViewAllBuilds:o("playground-view-all"),onViewBuildLab:o("playground-view-lab")},render:s=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(m,{children:[e.jsxs(h,{children:[e.jsx(j,{children:"Profile HiveLab Widget Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different HiveLab builder configurations"})]}),e.jsx(u,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(l,{...s}),e.jsx(i,{variant:"body-sm",color:"secondary",children:"Interactive HiveLab widget testing for University at Buffalo HIVE platform builder tool development design"})]})})]})})};var G,J,Q;C.parameters={...C.parameters,docs:{...(G=C.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    user: {
      id: 'user-123',
      name: 'Alex Chen',
      builderLevel: 'apprentice'
    },
    builderTools: mockBuilderToolsNovice,
    activeProjects: mockActiveProjectsBasic,
    totalBuilds: 5,
    totalDeployments: 2,
    totalCollaborations: 8,
    builderScore: 65,
    weeklyBuildTime: 12,
    featuredBuild: mockBuilderToolsNovice[0],
    isEditable: true,
    onCreateTool: action('create-tool'),
    onViewTool: action('view-tool'),
    onEditTool: action('edit-tool'),
    onDeployTool: action('deploy-tool'),
    onViewAllBuilds: action('view-all-builds'),
    onViewBuildLab: action('view-build-lab')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE profile HiveLab widget for University at Buffalo student innovation and tool development:
          </Text>
          <ProfileHiveLabWidget {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive builder workspace with tool development tracking, collaboration features, and UB campus innovation focus
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(Q=(J=C.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var Y,$,_;S.parameters={...S.parameters,docs:{...(Y=S.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* HiveLab Widget Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎯 HIVELAB WIDGET SYSTEM</Badge>
            Builder Tools & Innovation
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Complete profile HiveLab widget system for University at Buffalo HIVE platform student innovation and tool development tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">HiveLab Widget Variations:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Novice Builder:</Text>
                    <ProfileHiveLabWidget user={{
                    id: 'user-001',
                    name: 'Sarah Johnson',
                    builderLevel: 'novice'
                  }} builderTools={mockBuilderToolsNovice} activeProjects={mockActiveProjectsBasic} totalBuilds={2} totalDeployments={0} totalCollaborations={3} builderScore={35} weeklyBuildTime={8} featuredBuild={mockBuilderToolsNovice[0]} onCreateTool={action('novice-create-tool')} onViewTool={action('novice-view-tool')} onEditTool={action('novice-edit-tool')} onDeployTool={action('novice-deploy-tool')} onViewAllBuilds={action('novice-view-all')} onViewBuildLab={action('novice-view-lab')} />
                    <Text variant="body-xs" color="secondary">
                      Beginning builder learning tool development with first projects and academic focus
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Master Builder:</Text>
                    <ProfileHiveLabWidget user={{
                    id: 'user-002',
                    name: 'Marcus Rodriguez',
                    builderLevel: 'master'
                  }} builderTools={mockBuilderToolsAdvanced} activeProjects={mockActiveProjectsAdvanced} totalBuilds={28} totalDeployments={45} totalCollaborations={67} builderScore={96} weeklyBuildTime={25} featuredBuild={mockBuilderToolsAdvanced[0]} onCreateTool={action('master-create-tool')} onViewTool={action('master-view-tool')} onEditTool={action('master-edit-tool')} onDeployTool={action('master-deploy-tool')} onViewAllBuilds={action('master-view-all')} onViewBuildLab={action('master-view-lab')} />
                    <Text variant="body-xs" color="secondary">
                      Advanced builder with extensive portfolio, leadership roles, and research contributions
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Builder Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🚀 BUILDER LEVELS</Badge>
            Skill Progression System
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 builder levels for University at Buffalo student skill development and community recognition in tool creation
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Builder Level Progression:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Novice Builder (0-25 points):</Text>
                    <ProfileHiveLabWidget user={{
                    id: 'user-novice',
                    name: 'Emma Martinez',
                    builderLevel: 'novice'
                  }} builderTools={[mockBuilderToolsNovice[0]]} activeProjects={[mockActiveProjectsBasic[0]]} totalBuilds={1} totalDeployments={0} totalCollaborations={1} builderScore={18} weeklyBuildTime={5} onCreateTool={action('novice-level-create')} onViewTool={action('novice-level-view')} onEditTool={action('novice-level-edit')} onDeployTool={action('novice-level-deploy')} onViewAllBuilds={action('novice-level-all')} onViewBuildLab={action('novice-level-lab')} />
                    <Text variant="body-xs" color="secondary">
                      Starting journey with first tools and learning fundamental development skills
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Apprentice Builder (26-50 points):</Text>
                    <ProfileHiveLabWidget user={{
                    id: 'user-apprentice',
                    name: 'David Park',
                    builderLevel: 'apprentice'
                  }} builderTools={mockBuilderToolsNovice} activeProjects={mockActiveProjectsBasic} totalBuilds={4} totalDeployments={1} totalCollaborations={6} builderScore={42} weeklyBuildTime={10} featuredBuild={mockBuilderToolsNovice[1]} onCreateTool={action('apprentice-level-create')} onViewTool={action('apprentice-level-view')} onEditTool={action('apprentice-level-edit')} onDeployTool={action('apprentice-level-deploy')} onViewAllBuilds={action('apprentice-level-all')} onViewBuildLab={action('apprentice-level-lab')} />
                    <Text variant="body-xs" color="secondary">
                      Building competency with multiple projects and first successful deployments
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Expert Builder (51-75 points):</Text>
                    <ProfileHiveLabWidget user={{
                    id: 'user-expert',
                    name: 'Lisa Thompson',
                    builderLevel: 'expert'
                  }} builderTools={mockBuilderToolsAdvanced.slice(0, 3)} activeProjects={mockActiveProjectsAdvanced.slice(0, 2)} totalBuilds={12} totalDeployments={18} totalCollaborations={25} builderScore={68} weeklyBuildTime={18} featuredBuild={mockBuilderToolsAdvanced[1]} onCreateTool={action('expert-level-create')} onViewTool={action('expert-level-view')} onEditTool={action('expert-level-edit')} onDeployTool={action('expert-level-deploy')} onViewAllBuilds={action('expert-level-all')} onViewBuildLab={action('expert-level-lab')} />
                    <Text variant="body-xs" color="secondary">
                      Advanced skills with complex projects and significant community contributions
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Master Builder (76-100 points):</Text>
                    <ProfileHiveLabWidget user={{
                    id: 'user-master',
                    name: 'Jordan Lee',
                    builderLevel: 'master'
                  }} builderTools={mockBuilderToolsAdvanced} activeProjects={mockActiveProjectsAdvanced} totalBuilds={25} totalDeployments={40} totalCollaborations={55} builderScore={89} weeklyBuildTime={22} featuredBuild={mockBuilderToolsAdvanced[0]} onCreateTool={action('master-level-create')} onViewTool={action('master-level-view')} onEditTool={action('master-level-edit')} onDeployTool={action('master-level-deploy')} onViewAllBuilds={action('master-level-all')} onViewBuildLab={action('master-level-lab')} />
                    <Text variant="body-xs" color="secondary">
                      Master level expertise with platform contributions and mentorship leadership
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
            <Badge variant="primary">🛠️ TOOL CATEGORIES</Badge>
            Development Focus Areas
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 tool categories for comprehensive University at Buffalo campus innovation and student utility development
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Tool Category System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Core Development Categories:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Academic Tools</Text>
                        <Text variant="body-xs" color="secondary">Course utilities, study aids, research tools, academic planning</Text>
                      </div>
                      <div className="p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Productivity Tools</Text>
                        <Text variant="body-xs" color="secondary">Time management, task organization, workflow optimization</Text>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Social Tools</Text>
                        <Text variant="body-xs" color="secondary">Community building, event coordination, peer collaboration</Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Specialized Development Areas:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Utility Tools</Text>
                        <Text variant="body-xs" color="secondary">Campus navigation, dining coordination, residence hall utilities</Text>
                      </div>
                      <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Experimental Tools</Text>
                        <Text variant="body-xs" color="secondary">AI/ML projects, research prototypes, innovative solutions</Text>
                      </div>
                    </div>
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
            Real Campus Builder Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile HiveLab widget usage in actual University at Buffalo student innovation and tool development contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Computer Science Student */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE Student Innovation Journey:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Computer Science Students Building Campus Solutions
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">CSE 442 - Software Engineering Focus:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileHiveLabWidget user={{
                      id: 'user-cse-001',
                      name: 'Alex Chen',
                      builderLevel: 'expert'
                    }} builderTools={[{
                      id: 'cse-001',
                      name: 'UB Course Dependency Mapper',
                      description: 'Visualize prerequisite chains for computer science courses',
                      category: 'academic',
                      buildStatus: 'testing',
                      progress: 88,
                      collaborators: 4,
                      deployments: 2,
                      lastWorkedOn: '2024-01-15T11:30:00Z',
                      isPublic: true,
                      technologyStack: ['React', 'D3.js', 'Node.js', 'MongoDB']
                    }, {
                      id: 'cse-002',
                      name: 'Algorithm Complexity Visualizer',
                      description: 'Interactive big-O notation learning tool',
                      category: 'academic',
                      buildStatus: 'published',
                      progress: 100,
                      collaborators: 2,
                      deployments: 8,
                      lastWorkedOn: '2024-01-15T10:15:00Z',
                      isPublic: true,
                      isFeatured: true,
                      technologyStack: ['Vue.js', 'TypeScript', 'Canvas API']
                    }]} activeProjects={[{
                      id: 'cse-project-001',
                      name: 'CSE 442 - Campus Navigation App',
                      description: 'Senior capstone project for indoor campus navigation',
                      type: 'academic',
                      deadline: '2024-05-15T23:59:59Z',
                      progress: 75,
                      teamSize: 5,
                      isActive: true
                    }]} totalBuilds={8} totalDeployments={15} totalCollaborations={12} builderScore={82} weeklyBuildTime={20} featuredBuild={{
                      id: 'cse-002',
                      name: 'Algorithm Complexity Visualizer',
                      description: 'Interactive big-O notation learning tool',
                      category: 'academic',
                      buildStatus: 'published',
                      progress: 100,
                      collaborators: 2,
                      deployments: 8,
                      lastWorkedOn: '2024-01-15T10:15:00Z',
                      isPublic: true,
                      isFeatured: true,
                      technologyStack: ['Vue.js', 'TypeScript', 'Canvas API']
                    }} onCreateTool={action('cse-create-tool')} onViewTool={action('cse-view-tool')} onEditTool={action('cse-edit-tool')} onDeployTool={action('cse-deploy-tool')} onViewAllBuilds={action('cse-view-all')} onViewBuildLab={action('cse-view-lab')} />
                      <Text variant="body-xs" color="secondary">
                        Senior CSE student building academic tools with focus on visualization and campus utility
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Research Focus Development:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileHiveLabWidget user={{
                      id: 'user-research-001',
                      name: 'Maya Patel',
                      builderLevel: 'master'
                    }} builderTools={[{
                      id: 'research-001',
                      name: 'ML-Powered Study Pattern Analyzer',
                      description: 'Machine learning tool analyzing student study effectiveness',
                      category: 'experimental',
                      buildStatus: 'testing',
                      progress: 92,
                      collaborators: 6,
                      deployments: 3,
                      lastWorkedOn: '2024-01-15T12:00:00Z',
                      isPublic: false,
                      technologyStack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL']
                    }, {
                      id: 'research-002',
                      name: 'Academic Performance Predictor',
                      description: 'Predictive analytics for course success based on engagement patterns',
                      category: 'academic',
                      buildStatus: 'prototype',
                      progress: 65,
                      collaborators: 8,
                      deployments: 1,
                      lastWorkedOn: '2024-01-15T11:45:00Z',
                      isPublic: false,
                      technologyStack: ['Python', 'Scikit-learn', 'Django', 'Redis']
                    }]} activeProjects={[{
                      id: 'research-project-001',
                      name: 'NSF Research Grant - Educational AI',
                      description: 'National Science Foundation funded educational technology research',
                      type: 'academic',
                      deadline: '2024-08-30T23:59:59Z',
                      progress: 58,
                      teamSize: 12,
                      isActive: true
                    }]} totalBuilds={15} totalDeployments={22} totalCollaborations={35} builderScore={94} weeklyBuildTime={28} featuredBuild={{
                      id: 'research-001',
                      name: 'ML-Powered Study Pattern Analyzer',
                      description: 'Machine learning tool analyzing student study effectiveness',
                      category: 'experimental',
                      buildStatus: 'testing',
                      progress: 92,
                      collaborators: 6,
                      deployments: 3,
                      lastWorkedOn: '2024-01-15T12:00:00Z',
                      isPublic: false,
                      technologyStack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL']
                    }} onCreateTool={action('research-create-tool')} onViewTool={action('research-view-tool')} onEditTool={action('research-edit-tool')} onDeployTool={action('research-deploy-tool')} onViewAllBuilds={action('research-view-all')} onViewBuildLab={action('research-view-lab')} />
                      <Text variant="body-xs" color="secondary">
                        Graduate researcher building AI/ML tools for educational technology and student success
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Hackathon Development */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">UB Hackathon Innovation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">48-Hour Sprint Development:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileHiveLabWidget user={{
                    id: 'user-hack-001',
                    name: 'Jordan Kim',
                    builderLevel: 'apprentice'
                  }} builderTools={[{
                    id: 'hack-001',
                    name: 'Campus Crisis Response System',
                    description: 'Emergency coordination platform for campus safety',
                    category: 'utility',
                    buildStatus: 'prototype',
                    progress: 85,
                    collaborators: 4,
                    deployments: 1,
                    lastWorkedOn: '2024-01-15T18:30:00Z',
                    isPublic: true,
                    technologyStack: ['React', 'Socket.io', 'Express', 'MongoDB']
                  }]} activeProjects={[{
                    id: 'hack-project-001',
                    name: 'UB Hackathon 2024 - Emergency Response',
                    description: 'Campus safety innovation challenge',
                    type: 'hackathon',
                    deadline: '2024-01-20T18:00:00Z',
                    progress: 85,
                    teamSize: 4,
                    isActive: true
                  }]} totalBuilds={3} totalDeployments={1} totalCollaborations={7} builderScore={58} weeklyBuildTime={35} featuredBuild={{
                    id: 'hack-001',
                    name: 'Campus Crisis Response System',
                    description: 'Emergency coordination platform for campus safety',
                    category: 'utility',
                    buildStatus: 'prototype',
                    progress: 85,
                    collaborators: 4,
                    deployments: 1,
                    lastWorkedOn: '2024-01-15T18:30:00Z',
                    isPublic: true,
                    technologyStack: ['React', 'Socket.io', 'Express', 'MongoDB']
                  }} onCreateTool={action('hack-create-tool')} onViewTool={action('hack-view-tool')} onEditTool={action('hack-edit-tool')} onDeployTool={action('hack-deploy-tool')} onViewAllBuilds={action('hack-view-all')} onViewBuildLab={action('hack-view-lab')} />
                    <Text variant="body-xs" color="secondary">
                      Hackathon team member building emergency response system with intensive development timeline
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Sustainability Challenge:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileHiveLabWidget user={{
                    id: 'user-sustain-001',
                    name: 'Sam Wilson',
                    builderLevel: 'expert'
                  }} builderTools={[{
                    id: 'sustain-001',
                    name: 'UB Carbon Footprint Tracker',
                    description: 'Track and reduce campus environmental impact',
                    category: 'utility',
                    buildStatus: 'testing',
                    progress: 92,
                    collaborators: 5,
                    deployments: 2,
                    lastWorkedOn: '2024-01-15T17:45:00Z',
                    isPublic: true,
                    technologyStack: ['Vue.js', 'Node.js', 'PostgreSQL', 'Chart.js']
                  }]} activeProjects={[{
                    id: 'sustain-project-001',
                    name: 'Green Campus Innovation Challenge',
                    description: 'Sustainability focused development sprint',
                    type: 'hackathon',
                    deadline: '2024-01-22T20:00:00Z',
                    progress: 92,
                    teamSize: 5,
                    isActive: true
                  }]} totalBuilds={9} totalDeployments={12} totalCollaborations={18} builderScore={74} weeklyBuildTime={30} onCreateTool={action('sustain-create-tool')} onViewTool={action('sustain-view-tool')} onEditTool={action('sustain-edit-tool')} onDeployTool={action('sustain-deploy-tool')} onViewAllBuilds={action('sustain-view-all')} onViewBuildLab={action('sustain-view-lab')} />
                    <Text variant="body-xs" color="secondary">
                      Environmental engineering student building sustainability tracking tools for campus green initiatives
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Social Innovation Focus:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileHiveLabWidget user={{
                    id: 'user-social-001',
                    name: 'Riley Martinez',
                    builderLevel: 'novice'
                  }} builderTools={[{
                    id: 'social-001',
                    name: 'International Student Buddy System',
                    description: 'Connect international and domestic students for cultural exchange',
                    category: 'social',
                    buildStatus: 'concept',
                    progress: 25,
                    collaborators: 3,
                    deployments: 0,
                    lastWorkedOn: '2024-01-15T16:20:00Z',
                    isPublic: false,
                    technologyStack: ['React', 'Firebase']
                  }]} activeProjects={[{
                    id: 'social-project-001',
                    name: 'Diversity & Inclusion Hackathon',
                    description: 'Building inclusive campus community tools',
                    type: 'hackathon',
                    deadline: '2024-01-21T19:00:00Z',
                    progress: 40,
                    teamSize: 6,
                    isActive: true
                  }]} totalBuilds={1} totalDeployments={0} totalCollaborations={3} builderScore={22} weeklyBuildTime={15} onCreateTool={action('social-create-tool')} onViewTool={action('social-view-tool')} onEditTool={action('social-edit-tool')} onDeployTool={action('social-deploy-tool')} onViewAllBuilds={action('social-view-all')} onViewBuildLab={action('social-view-lab')} />
                    <Text variant="body-xs" color="secondary">
                      First-time hackathon participant building social connection tools for campus diversity initiatives
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Empty State */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">New Builder - Getting Started:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text variant="body-md" color="primary">
                  First-time HiveLab experience with empty builder portfolio:
                </Text>

                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Brand New Builder:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileHiveLabWidget user={{
                      id: 'user-empty-001',
                      name: 'Taylor Wilson',
                      builderLevel: 'novice'
                    }} builderTools={[]} activeProjects={[]} totalBuilds={0} totalDeployments={0} totalCollaborations={0} builderScore={0} weeklyBuildTime={0} onCreateTool={action('empty-create-tool')} onViewTool={action('empty-view-tool')} onEditTool={action('empty-edit-tool')} onDeployTool={action('empty-deploy-tool')} onViewAllBuilds={action('empty-view-all')} onViewBuildLab={action('empty-view-lab')} />
                      <Text variant="body-xs" color="secondary">
                        New user experience with call-to-action for first tool development and HiveLab exploration
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">View-Only Mode:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileHiveLabWidget user={{
                      id: 'user-readonly-001',
                      name: 'Casey Johnson',
                      builderLevel: 'apprentice'
                    }} builderTools={mockBuilderToolsNovice} activeProjects={mockActiveProjectsBasic} totalBuilds={3} totalDeployments={1} totalCollaborations={4} builderScore={45} weeklyBuildTime={8} isEditable={false} featuredBuild={mockBuilderToolsNovice[0]} onViewTool={action('readonly-view-tool')} onViewAllBuilds={action('readonly-view-all')} onViewBuildLab={action('readonly-view-lab')} />
                      <Text variant="body-xs" color="secondary">
                        Read-only profile view without editing capabilities for public portfolio viewing
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(_=($=S.parameters)==null?void 0:$.docs)==null?void 0:_.source}}};var K,X,ee;P.parameters={...P.parameters,docs:{...(K=P.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    user: {
      id: 'user-playground',
      name: 'Alex Chen',
      builderLevel: 'apprentice'
    },
    builderTools: mockBuilderToolsNovice,
    activeProjects: mockActiveProjectsBasic,
    totalBuilds: 5,
    totalDeployments: 2,
    totalCollaborations: 8,
    builderScore: 65,
    weeklyBuildTime: 12,
    featuredBuild: mockBuilderToolsNovice[0],
    isEditable: true,
    onCreateTool: action('playground-create-tool'),
    onViewTool: action('playground-view-tool'),
    onEditTool: action('playground-edit-tool'),
    onDeployTool: action('playground-deploy-tool'),
    onViewAllBuilds: action('playground-view-all'),
    onViewBuildLab: action('playground-view-lab')
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile HiveLab Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different HiveLab builder configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileHiveLabWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive HiveLab widget testing for University at Buffalo HIVE platform builder tool development design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(ee=(X=P.parameters)==null?void 0:X.docs)==null?void 0:ee.source}}};const Ye=["Default","CompleteShowcase","Playground"];export{S as CompleteShowcase,C as Default,P as Playground,Ye as __namedExportsOrder,Qe as default};
