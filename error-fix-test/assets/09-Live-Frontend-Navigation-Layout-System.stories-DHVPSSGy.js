import{j as e}from"./jsx-runtime-B9GTzLod.js";import{B as a,H as r,a as t,b as i,c as l}from"./button-CA_RYJmp.js";import{B as d}from"./badge-CebFJquh.js";import{A as o,b as m}from"./avatar-DPA-6xOy.js";import{r as u}from"./index-BMjrbHXN.js";/* empty css                    */import{C as b}from"./crown-Bf-Ij_V7.js";import{H as P}from"./house-Bg02DBcS.js";import{U as R}from"./users-B5XgMSov.js";import{Z as j}from"./zap-BzDMfB1h.js";import{C as N}from"./calendar-RwBiWFlj.js";import{U}from"./user-DLkx1tbP.js";import{S as F}from"./settings-Cw08DGvz.js";import{B as f}from"./bell-DcMkR9fh.js";import{S as V}from"./search-kw2io5mN.js";import{P as w}from"./plus-BTyRuzWD.js";import{A as C}from"./activity-BpE6NZRo.js";import{T as I}from"./trending-up-DHCBXhUA.js";import{C as O}from"./clock-B-89-V79.js";import{M as G}from"./menu-Hw40w2Y7.js";import{M as K}from"./monitor-DIGimNDK.js";import{c as Q}from"./createLucideIcon-DtX30ipI.js";import{S as Z}from"./smartphone-BfGr81rm.js";import"./index-BwobEAja.js";import"./utils-CytzSlOG.js";import"./framer-motion-proxy-Bip1EXUU.js";import"./button-enhanced-5mvuuZ4M.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=Q("Tablet",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["line",{x1:"12",x2:"12.01",y1:"18",y2:"18",key:"1dp563"}]]),Ce={title:"09-Live-Frontend/Navigation & Layout System",component:p,parameters:{layout:"fullscreen",docs:{description:{component:`
# HIVE Live Navigation & Layout System

The complete navigation architecture and responsive layout patterns as experienced by UB students in production. This showcases the entire information architecture and user flow systems.

## Key Features
- **Adaptive Navigation**: Desktop sidebar, tablet drawer, mobile bottom tabs
- **Contextual Layouts**: Page-specific layouts that adapt to content
- **Responsive Design**: Fluid transitions between breakpoints
- **Campus Context**: UB-specific navigation patterns and shortcuts
- **State Management**: Persistent navigation states and user preferences
- **Accessibility**: Full keyboard navigation and screen reader support
        `}}}},n={user:{name:"Sarah Chen",avatar:"SC",role:"Builder",campusStatus:"Online"},notifications:{unread:3},spaces:[{id:"cs101",name:"CS 101 Study Group",icon:"💻",unread:2},{id:"ellicott",name:"Ellicott 3rd Floor",icon:"🏠",unread:0},{id:"builders",name:"UB Builders Hub",icon:"⚡",unread:1}]},p=()=>{const[c,y]=u.useState("feed"),[$,E]=u.useState(!1),[J,W]=u.useState(!1),g=[{id:"feed",label:"Feed",icon:P,badge:null},{id:"spaces",label:"Spaces",icon:R,badge:null},{id:"tools",label:"Tools",icon:j,badge:null},{id:"calendar",label:"Calendar",icon:N,badge:2},{id:"profile",label:"Profile",icon:U,badge:null}];return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white",children:[e.jsxs("div",{className:"hidden lg:flex",children:[e.jsxs("div",{className:"w-64 bg-black/50 backdrop-blur-sm border-r border-gray-800 flex flex-col",children:[e.jsx("div",{className:"p-4 border-b border-gray-800",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl flex items-center justify-center mr-3 hive-interactive",style:{backgroundColor:"var(--hive-brand-primary)"},children:e.jsx(b,{className:"w-6 h-6 text-black"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-white font-bold text-lg",children:"HIVE"}),e.jsx("p",{className:"text-gray-400 text-xs",children:"University at Buffalo"})]})]})}),e.jsx("div",{className:"p-4 border-b border-gray-800",children:e.jsxs("div",{className:"flex items-center",children:[e.jsxs("div",{className:"relative",children:[e.jsx(o,{className:"w-12 h-12 mr-3",children:e.jsx(m,{className:"font-semibold",style:{backgroundColor:"var(--hive-brand-primary)",color:"var(--hive-text-inverse)"},children:n.user.avatar})}),e.jsx("div",{className:"absolute bottom-0 right-2 w-3 h-3 bg-green-400 rounded-full border-2 border-black"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-white font-medium",children:n.user.name}),e.jsx("div",{className:"flex items-center",children:e.jsx(b,{className:"w-4 h-4",style:{color:"var(--hive-brand-primary)"}})}),e.jsxs("div",{className:"flex items-center mt-1",children:[e.jsx(d,{className:"text-xs mr-2",style:{backgroundColor:"var(--hive-brand-primary)",color:"var(--hive-text-inverse)"},children:n.user.role}),e.jsx("span",{className:"text-green-400 text-xs",children:n.user.campusStatus})]})]})]})}),e.jsx("div",{className:"flex-1 p-4 space-y-2",children:g.map(s=>e.jsxs("button",{onClick:()=>y(s.id),className:`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${c===s.id?"text-black hive-interactive":"text-gray-400 hover:text-white hover:bg-gray-800"}`,style:c===s.id?{backgroundColor:"var(--hive-brand-primary)",color:"var(--hive-text-inverse)"}:{},children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(s.icon,{className:"w-5 h-5 mr-3"}),e.jsx("span",{className:"font-medium",children:s.label})]}),s.badge&&e.jsx(d,{className:"bg-red-500 text-white text-xs",children:s.badge})]},s.id))}),e.jsxs("div",{className:"p-4 border-t border-gray-800",children:[e.jsx("h4",{className:"text-gray-400 text-sm font-medium mb-3",children:"Quick Access"}),n.spaces.map(s=>e.jsxs("div",{className:"flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg cursor-pointer",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("span",{className:"text-lg mr-2",children:s.icon}),e.jsx("span",{className:"text-white text-sm",children:s.name})]}),s.unread>0&&e.jsx("div",{className:"w-2 h-2 rounded-full",style:{backgroundColor:"var(--hive-brand-primary)"}})]},s.id))]}),e.jsx("div",{className:"p-4 border-t border-gray-800",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(o,{className:"w-8 h-8 mr-3",children:e.jsx(m,{style:{backgroundColor:"var(--hive-brand-primary)",color:"var(--hive-text-inverse)"},children:"SC"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"text-white text-sm font-medium",children:"Sarah Chen"}),e.jsx("div",{className:"text-gray-400 text-xs",children:"@sarahc"})]}),e.jsx(a,{size:"icon",variant:"ghost",className:"text-gray-400 hover:text-white",children:e.jsx(F,{className:"w-4 h-4"})})]})})]}),e.jsxs("div",{className:"flex-1 flex flex-col",children:[e.jsx("div",{className:"bg-black/50 backdrop-blur-sm border-b border-gray-800 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("h2",{className:"text-2xl font-bold text-white capitalize",children:c}),e.jsx(d,{className:"text-xs",style:{backgroundColor:"var(--hive-brand-primary)",color:"var(--hive-text-inverse)"},children:"Live"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsxs(a,{size:"icon",variant:"outline",className:"border-gray-600 text-white relative",children:[e.jsx(f,{className:"w-4 h-4"}),e.jsx("div",{className:"absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center",children:e.jsx("span",{className:"text-white text-xs",children:n.notifications.unread})})]}),e.jsx(a,{size:"icon",variant:"outline",className:"border-gray-600 text-white",children:e.jsx(V,{className:"w-4 h-4"})}),e.jsxs(a,{className:"hive-interactive",style:{backgroundColor:"var(--hive-brand-primary)",color:"var(--hive-text-inverse)"},children:[e.jsx(w,{className:"w-4 h-4 mr-2"}),"Create"]})]})]})}),e.jsxs("div",{className:"flex-1 p-6 space-y-6 overflow-y-auto",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[e.jsxs(r,{className:"bg-gray-800/50 border-gray-700",children:[e.jsx(t,{children:e.jsxs(i,{className:"flex items-center",style:{color:"var(--hive-brand-primary)"},children:[e.jsx(C,{className:"w-5 h-5 mr-2"}),"Campus Activity"]})}),e.jsx(l,{children:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-400",children:"Active Spaces"}),e.jsx("span",{className:"text-white font-medium",children:"12"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-400",children:"Tools Built"}),e.jsx("span",{className:"text-white font-medium",children:"5"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-400",children:"Rituals"}),e.jsx("span",{className:"text-white font-medium",children:"3 active"})]})]})})]}),e.jsxs(r,{className:"bg-gray-800/50 border-gray-700",children:[e.jsx(t,{children:e.jsxs(i,{className:"flex items-center",style:{color:"var(--hive-brand-primary)"},children:[e.jsx(I,{className:"w-5 h-5 mr-2"}),"Trending"]})}),e.jsx(l,{children:e.jsx("div",{className:"space-y-2",children:["study-groups","midterm-prep","dorm-events"].map(s=>e.jsxs("div",{className:"text-gray-300 hover:cursor-pointer transition-colors",style:{color:"var(--hive-brand-primary)"},children:["#",s]},s))})})]}),e.jsxs(r,{className:"bg-gray-800/50 border-gray-700",children:[e.jsx(t,{children:e.jsxs(i,{className:"flex items-center",style:{color:"var(--hive-brand-primary)"},children:[e.jsx(O,{className:"w-5 h-5 mr-2"}),"Quick Actions"]})}),e.jsxs(l,{className:"space-y-2",children:[e.jsxs(a,{size:"sm",variant:"outline",className:"w-full border-gray-600 text-white justify-start",children:[e.jsx(w,{className:"w-4 h-4 mr-2"}),"Create Space"]}),e.jsxs(a,{size:"sm",variant:"outline",className:"w-full border-gray-600 text-white justify-start",children:[e.jsx(j,{className:"w-4 h-4 mr-2"}),"Build Tool"]}),e.jsxs(a,{size:"sm",variant:"outline",className:"w-full border-gray-600 text-white justify-start",children:[e.jsx(N,{className:"w-4 h-4 mr-2"}),"Add Event"]})]})]})]}),e.jsxs(r,{className:"bg-gray-800/50 border-gray-700",children:[e.jsx(t,{children:e.jsxs(i,{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg flex items-center justify-center mr-3 hive-interactive",style:{backgroundColor:"var(--hive-brand-primary)"},children:e.jsx(C,{className:"w-4 h-4 text-black"})}),e.jsx("span",{className:"text-white",children:"Recent Activity"})]}),e.jsx(a,{size:"sm",variant:"outline",className:"border-gray-600 text-white",children:"View All"})]})}),e.jsx(l,{className:"space-y-4",children:[{type:"post",user:"Marcus Johnson",action:"posted in CS 101 Study Group",time:"2 hours ago"},{type:"tool",user:"Alex Liu",action:"created Study Room Finder",time:"4 hours ago"},{type:"space",user:"Kim Park",action:"created Weekend Events space",time:"1 day ago"}].map((s,D)=>e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(o,{className:"w-8 h-8",children:e.jsx(m,{className:"text-xs",style:{backgroundColor:"var(--hive-brand-primary)",color:"var(--hive-text-inverse)"},children:"SC"})}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("p",{className:"text-white text-sm",children:[e.jsx("span",{className:"font-medium",children:s.user})," ",s.action]}),e.jsx("p",{className:"text-gray-400 text-xs",children:s.time})]}),e.jsx(d,{className:"text-xs mr-2",style:{backgroundColor:"var(--hive-brand-primary)",color:"var(--hive-text-inverse)"},children:"Builder"})]},D))})]})]})]})]}),e.jsxs("div",{className:"lg:hidden",children:[e.jsxs("div",{className:"bg-black/50 backdrop-blur-sm border-b border-gray-800 p-4 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(a,{size:"icon",variant:"ghost",className:"text-white mr-3",onClick:()=>E(!0),children:e.jsx(G,{className:"w-5 h-5"})}),e.jsx("div",{className:"w-8 h-8 rounded-lg flex items-center justify-center mr-3 hive-interactive",style:{backgroundColor:"var(--hive-brand-primary)"},children:e.jsx(b,{className:"w-4 h-4 text-black"})}),e.jsx("h1",{className:"text-white font-bold",children:"HIVE"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsxs(a,{size:"icon",variant:"ghost",className:"text-white relative",children:[e.jsx(f,{className:"w-4 h-4"}),e.jsx("div",{className:"absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"})]}),e.jsx(o,{className:"w-8 h-8",children:e.jsx(m,{style:{backgroundColor:"var(--hive-brand-primary)",color:"var(--hive-text-inverse)"},children:"SC"})})]})]}),e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"text-xl font-bold text-white mb-4 capitalize",children:c}),e.jsx("p",{className:"text-gray-300",children:"Mobile layout content would appear here..."})]}),e.jsx("div",{className:"fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800 p-2",children:e.jsx("div",{className:"flex justify-around",children:g.map(s=>e.jsxs("button",{onClick:()=>y(s.id),className:`flex flex-col items-center p-2 rounded-lg transition-colors relative ${c===s.id?"text-black hive-interactive":"text-gray-400"}`,style:c===s.id?{color:"var(--hive-brand-primary)"}:{},children:[e.jsx(s.icon,{className:"w-5 h-5 mb-1"}),e.jsx("span",{className:"text-xs",children:s.label}),s.badge&&e.jsx("div",{className:"absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center",children:e.jsx("span",{className:"text-white text-xs",children:s.badge})})]},s.id))})})]})]})},x={render:()=>e.jsx(p,{}),parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},h={render:()=>e.jsx(p,{}),parameters:{layout:"fullscreen",viewport:{defaultViewport:"mobile1"}}},v={render:()=>e.jsxs("div",{className:"space-y-8 p-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h1",{className:"text-3xl font-bold mb-4",style:{color:"var(--hive-brand-primary)"},children:"HIVE Responsive Layout System"}),e.jsx("p",{className:"text-gray-300",children:"Adaptive navigation and layouts across all device types"})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[e.jsxs(r,{className:"bg-gray-800/50 border-gray-700",children:[e.jsx(t,{children:e.jsxs(i,{className:"flex items-center",style:{color:"var(--hive-brand-primary)"},children:[e.jsx(K,{className:"w-5 h-5 mr-2"}),"Desktop Layout"]})}),e.jsx(l,{children:e.jsx("div",{className:"bg-gray-900 rounded-lg p-4 h-40 flex items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg mx-auto mb-2 hive-interactive",style:{backgroundColor:"var(--hive-brand-primary)"}}),e.jsx("p",{className:"text-white text-sm",children:"Sidebar + Main Content"})]})})})]}),e.jsxs(r,{className:"bg-gray-800/50 border-gray-700",children:[e.jsx(t,{children:e.jsxs(i,{className:"flex items-center",style:{color:"var(--hive-brand-primary)"},children:[e.jsx(_,{className:"w-5 h-5 mr-2"}),"Tablet Layout"]})}),e.jsx(l,{children:e.jsx("div",{className:"bg-gray-900 rounded-lg p-4 h-40 flex items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg mx-auto mb-2 hive-interactive",style:{backgroundColor:"var(--hive-brand-primary)"}}),e.jsx("p",{className:"text-white text-sm",children:"Collapsible Drawer"})]})})})]}),e.jsxs(r,{className:"bg-gray-800/50 border-gray-700",children:[e.jsx(t,{children:e.jsxs(i,{className:"flex items-center",style:{color:"var(--hive-brand-primary)"},children:[e.jsx(Z,{className:"w-5 h-5 mr-2"}),"Mobile Layout"]})}),e.jsx(l,{children:e.jsx("div",{className:"bg-gray-900 rounded-lg p-4 h-40 flex items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg mx-auto mb-2 hive-interactive",style:{backgroundColor:"var(--hive-brand-primary)"}}),e.jsx("p",{className:"text-white text-sm",children:"Bottom Tab Navigation"})]})})})]})]})]}),parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}};var k,S,L;x.parameters={...x.parameters,docs:{...(k=x.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <NavigationLayoutSystem />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
}`,...(L=(S=x.parameters)==null?void 0:S.docs)==null?void 0:L.source}}};var T,H,A;h.parameters={...h.parameters,docs:{...(T=h.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <NavigationLayoutSystem />,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(A=(H=h.parameters)==null?void 0:H.docs)==null?void 0:A.source}}};var B,M,z;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4" style={{
        color: 'var(--hive-brand-primary)'
      }}>HIVE Responsive Layout System</h1>
        <p className="text-gray-300">Adaptive navigation and layouts across all device types</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Desktop Preview */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center" style={{
            color: 'var(--hive-brand-primary)'
          }}>
              <Monitor className="w-5 h-5 mr-2" />
              Desktop Layout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 h-40 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 rounded-lg mx-auto mb-2 hive-interactive" style={{
                backgroundColor: 'var(--hive-brand-primary)'
              }}></div>
                <p className="text-white text-sm">Sidebar + Main Content</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tablet Preview */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center" style={{
            color: 'var(--hive-brand-primary)'
          }}>
              <Tablet className="w-5 h-5 mr-2" />
              Tablet Layout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 h-40 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 rounded-lg mx-auto mb-2 hive-interactive" style={{
                backgroundColor: 'var(--hive-brand-primary)'
              }}></div>
                <p className="text-white text-sm">Collapsible Drawer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile Preview */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center" style={{
            color: 'var(--hive-brand-primary)'
          }}>
              <Smartphone className="w-5 h-5 mr-2" />
              Mobile Layout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 h-40 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 rounded-lg mx-auto mb-2 hive-interactive" style={{
                backgroundColor: 'var(--hive-brand-primary)'
              }}></div>
                <p className="text-white text-sm">Bottom Tab Navigation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
}`,...(z=(M=v.parameters)==null?void 0:M.docs)==null?void 0:z.source}}};const ke=["DesktopLayoutSystem","MobileLayoutSystem","ResponsiveLayoutShowcase"];export{x as DesktopLayoutSystem,h as MobileLayoutSystem,v as ResponsiveLayoutShowcase,ke as __namedExportsOrder,Ce as default};
