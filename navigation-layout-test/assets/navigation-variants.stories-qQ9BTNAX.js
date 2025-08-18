import{j as e}from"./jsx-runtime-B9GTzLod.js";import{c as d}from"./utils-CytzSlOG.js";import{H as _e}from"./house-Bg02DBcS.js";import{C as Le}from"./compass-Cz07JEQ8.js";import{Z as Re}from"./zap-BzDMfB1h.js";import{U as Ee}from"./user-DLkx1tbP.js";import{r as Ge}from"./index-BMjrbHXN.js";import"./createLucideIcon-DtX30ipI.js";const g=[{id:"feed",icon:_e,label:"Feed",href:"/"},{id:"spaces",icon:Le,label:"Spaces",href:"/spaces"},{id:"hivelab",icon:Re,label:"HiveLab",href:"/hivelab"},{id:"profile",icon:Ee,label:"Profile",href:"/profile"}],b=({currentPath:r="/",onItemClick:s,user:t,className:i})=>{var o;const c=((o=t==null?void 0:t.name)==null?void 0:o.split(" ").map(a=>a[0]).join("").slice(0,2))||"";return e.jsx("div",{className:d("fixed left-4 top-1/2 -translate-y-1/2 z-50","w-16 bg-[var(--hive-background-primary)]/95 backdrop-blur-xl","border border-[var(--hive-border-default)]/50","rounded-3xl shadow-2xl",i),children:e.jsxs("div",{className:"p-3 space-y-2",children:[t&&e.jsx("div",{className:"w-10 h-10 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-xs font-bold text-[var(--hive-text-primary)] mb-4",children:c}),g.map(a=>{const p=a.icon,m=r===a.href||r.startsWith(a.href+"/");return e.jsx("button",{onClick:()=>s==null?void 0:s(a.href),className:d("w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200",m?"bg-[var(--hive-brand-secondary)] shadow-lg shadow-[var(--hive-brand-secondary)]/25":"bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-background-tertiary)]"),children:e.jsx(p,{className:d("h-5 w-5",m?"text-[var(--hive-text-inverse)]":"text-[var(--hive-text-secondary)]")})},a.id)})]})})},v=({currentPath:r="/",onItemClick:s,user:t,className:i})=>{var o;const c=((o=t==null?void 0:t.name)==null?void 0:o.split(" ").map(a=>a[0]).join("").slice(0,2))||"";return e.jsx("aside",{className:d("w-64 h-screen bg-[var(--hive-background-primary)] border-r border-[var(--hive-border-default)]",i),children:e.jsxs("div",{className:"p-6 space-y-6",children:[t&&e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-12 h-12 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)]",children:c}),e.jsxs("div",{children:[e.jsx("div",{className:"font-semibold text-[var(--hive-text-primary)]",children:t.name}),e.jsxs("div",{className:"text-sm text-[var(--hive-text-secondary)]",children:["@",t.handle]})]})]}),e.jsx("nav",{className:"space-y-2",children:g.map(a=>{const p=a.icon,m=r===a.href||r.startsWith(a.href+"/");return e.jsxs("button",{onClick:()=>s==null?void 0:s(a.href),className:d("w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200",m?"bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/20":"text-[var(--hive-text-secondary)] hover:bg-[var(--hive-background-secondary)] hover:text-[var(--hive-text-primary)]"),children:[e.jsx(p,{className:"h-5 w-5 flex-shrink-0"}),e.jsx("span",{className:"font-medium",children:a.label})]},a.id)})})]})})},h=({currentPath:r="/",onItemClick:s,user:t,className:i})=>{var o;const c=((o=t==null?void 0:t.name)==null?void 0:o.split(" ").map(a=>a[0]).join("").slice(0,2))||"";return e.jsxs("nav",{className:d("w-full h-16 bg-[var(--hive-background-primary)] border-b border-[var(--hive-border-default)]","flex items-center justify-between px-6",i),children:[e.jsx("div",{className:"flex items-center space-x-2",children:g.map(a=>{const p=a.icon,m=r===a.href||r.startsWith(a.href+"/");return e.jsxs("button",{onClick:()=>s==null?void 0:s(a.href),className:d("flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-200",m?"bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)] shadow-lg":"text-[var(--hive-text-secondary)] hover:bg-[var(--hive-background-secondary)] hover:text-[var(--hive-text-primary)]"),children:[e.jsx(p,{className:"h-4 w-4"}),e.jsx("span",{className:"font-medium text-sm",children:a.label})]},a.id)})}),t&&e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:t.name}),e.jsxs("div",{className:"text-xs text-[var(--hive-text-secondary)]",children:["@",t.handle]})]}),e.jsx("div",{className:"w-10 h-10 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)]",children:c})]})]})},x=({currentPath:r="/",onItemClick:s,className:t})=>e.jsx("nav",{className:d("fixed bottom-0 left-0 right-0 z-50","h-20 bg-[var(--hive-background-primary)]/95 backdrop-blur-xl","border-t border-[var(--hive-border-default)]","flex items-center justify-around px-4",t),children:g.map(i=>{const c=i.icon,o=r===i.href||r.startsWith(i.href+"/");return e.jsxs("button",{onClick:()=>s==null?void 0:s(i.href),className:d("flex flex-col items-center space-y-1 p-2 rounded-2xl transition-all duration-200",o?"text-[var(--hive-brand-secondary)]":"text-[var(--hive-text-secondary)]"),children:[e.jsx("div",{className:d("w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200",o?"bg-[var(--hive-brand-secondary)]/10 border border-[var(--hive-brand-secondary)]/20":"bg-transparent"),children:e.jsx(c,{className:"h-5 w-5"})}),e.jsx("span",{className:"text-xs font-medium",children:i.label})]},i.id)})}),u=({currentPath:r="/",onItemClick:s,user:t,className:i})=>{var o;const c=((o=t==null?void 0:t.name)==null?void 0:o.split(" ").map(a=>a[0]).join("").slice(0,2))||"";return e.jsxs("aside",{className:d("w-20 h-screen bg-[var(--hive-background-primary)] border-r border-[var(--hive-border-default)]","flex flex-col items-center py-6",i),children:[t&&e.jsx("div",{className:"w-12 h-12 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)] mb-6",children:c}),e.jsx("div",{className:"space-y-4",children:g.map(a=>{const p=a.icon,m=r===a.href||r.startsWith(a.href+"/");return e.jsxs("button",{onClick:()=>s==null?void 0:s(a.href),className:d("w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 relative group",m?"bg-[var(--hive-brand-secondary)] shadow-lg shadow-[var(--hive-brand-secondary)]/25":"bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-background-tertiary)]"),children:[e.jsx(p,{className:d("h-5 w-5",m?"text-[var(--hive-text-inverse)]":"text-[var(--hive-text-secondary)]")}),e.jsx("div",{className:"absolute left-full ml-2 px-2 py-1 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-xs font-medium text-[var(--hive-text-primary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none",children:a.label})]},a.id)})})]})};b.__docgenInfo={description:"",methods:[],displayName:"MinimalFloatingSidebar",props:{currentPath:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'/'",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(href: string) => void",signature:{arguments:[{type:{name:"string"},name:"href"}],return:{name:"void"}}},description:""},user:{required:!1,tsType:{name:"union",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
} | null`,elements:[{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"handle",value:{name:"string",required:!0}},{key:"avatar",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};v.__docgenInfo={description:"",methods:[],displayName:"CleanVerticalSidebar",props:{currentPath:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'/'",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(href: string) => void",signature:{arguments:[{type:{name:"string"},name:"href"}],return:{name:"void"}}},description:""},user:{required:!1,tsType:{name:"union",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
} | null`,elements:[{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"handle",value:{name:"string",required:!0}},{key:"avatar",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"TopHorizontalNav",props:{currentPath:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'/'",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(href: string) => void",signature:{arguments:[{type:{name:"string"},name:"href"}],return:{name:"void"}}},description:""},user:{required:!1,tsType:{name:"union",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
} | null`,elements:[{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"handle",value:{name:"string",required:!0}},{key:"avatar",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};x.__docgenInfo={description:"",methods:[],displayName:"BottomTabNav",props:{currentPath:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'/'",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(href: string) => void",signature:{arguments:[{type:{name:"string"},name:"href"}],return:{name:"void"}}},description:""},user:{required:!1,tsType:{name:"union",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
} | null`,elements:[{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"handle",value:{name:"string",required:!0}},{key:"avatar",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"CompactIconRail",props:{currentPath:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'/'",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(href: string) => void",signature:{arguments:[{type:{name:"string"},name:"href"}],return:{name:"void"}}},description:""},user:{required:!1,tsType:{name:"union",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
} | null`,elements:[{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"handle",value:{name:"string",required:!0}},{key:"avatar",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const er={title:"Molecules/Navigation Variants",component:v,parameters:{layout:"fullscreen",docs:{description:{component:`
Collection of navigation variants for different layout needs and device types. Each variant maintains consistent HIVE branding while optimizing for specific use cases.

**Available Variants:**
- **MinimalFloatingSidebar**: Floating pill-style navigation
- **CleanVerticalSidebar**: Traditional sidebar with clean styling
- **TopHorizontalNav**: Horizontal navigation bar
- **BottomTabNav**: Mobile-style bottom tab navigation
- **CompactIconRail**: Icon-only vertical navigation

**Features:**
- Consistent active states across all variants
- Responsive design patterns
- User profile integration
- Smooth animations and transitions
- Campus-focused navigation structure
        `}}},argTypes:{currentPath:{control:"select",options:["/","/spaces","/hivelab","/profile"],description:"Current active path"},user:{control:"object",description:"User profile information"}}},n={id:"1",name:"Sarah Chen",handle:"sarahc",avatar:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"},l=({Component:r,initialPath:s="/",...t})=>{const[i,c]=Ge.useState(s);return e.jsxs("div",{className:"relative h-screen bg-[var(--hive-background-primary)]",children:[e.jsx(r,{currentPath:i,onItemClick:c,...t}),e.jsx("div",{className:"flex-1 flex items-center justify-center p-8 absolute inset-0 pointer-events-none",children:e.jsxs("div",{className:"text-center pointer-events-auto",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:i==="/"?"Feed":i==="/spaces"?"Spaces":i==="/hivelab"?"HiveLab":i==="/profile"?"Profile":"Page"}),e.jsxs("p",{className:"text-[var(--hive-text-secondary)]",children:["Current path: ",i]}),e.jsx("p",{className:"text-sm text-[var(--hive-text-tertiary)] mt-4",children:"Click navigation items to see active states"})]})})]})},f={render:r=>e.jsx(l,{Component:b,user:n,...r}),parameters:{docs:{description:{story:"Floating pill-style navigation that hovers over content. Perfect for immersive experiences."}}}},y={render:r=>e.jsx(l,{Component:b,user:null,...r})},N={render:r=>e.jsx(l,{Component:b,user:n,initialPath:"/spaces",...r})},j={render:r=>e.jsx(l,{Component:v,user:n,...r}),parameters:{docs:{description:{story:"Traditional sidebar with clean styling and full labels. Ideal for desktop applications."}}}},w={render:r=>e.jsx(l,{Component:v,user:null,...r})},C={render:r=>e.jsx(l,{Component:v,user:n,initialPath:"/hivelab",...r})},k={render:r=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)]",children:e.jsx(l,{Component:h,user:n,...r})}),parameters:{docs:{description:{story:"Horizontal navigation bar at the top. Great for web applications and content-focused layouts."}}}},T={render:r=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)]",children:e.jsx(l,{Component:h,user:null,...r})})},S={render:r=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)]",children:e.jsx(l,{Component:h,user:n,initialPath:"/profile",...r})})},P={render:r=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)] pb-20",children:e.jsx(l,{Component:x,...r})}),parameters:{docs:{description:{story:"Mobile-style bottom tab navigation. Perfect for mobile applications and touch interfaces."}}}},q={render:r=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)] pb-20",children:e.jsx(l,{Component:x,initialPath:"/spaces",...r})})},I={render:r=>e.jsx(l,{Component:u,user:n,...r}),parameters:{docs:{description:{story:"Icon-only vertical navigation with tooltips. Maximizes content space while maintaining navigation."}}}},U={render:r=>e.jsx(l,{Component:u,user:null,...r})},M={render:r=>e.jsx(l,{Component:u,user:n,initialPath:"/hivelab",...r})},z={render:()=>e.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-screen bg-[var(--hive-background-secondary)]",children:[e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg overflow-hidden",children:[e.jsx("div",{className:"p-2 border-b border-[var(--hive-border-default)]",children:e.jsx("h3",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Clean Vertical"})}),e.jsx("div",{className:"h-64 relative",children:e.jsx(v,{currentPath:"/spaces",user:n,className:"h-full transform scale-75 origin-top-left w-[133%]"})})]}),e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg overflow-hidden",children:[e.jsx("div",{className:"p-2 border-b border-[var(--hive-border-default)]",children:e.jsx("h3",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Top Horizontal"})}),e.jsx("div",{className:"h-64 relative",children:e.jsx(h,{currentPath:"/spaces",user:n,className:"transform scale-75 origin-top"})})]}),e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg overflow-hidden",children:[e.jsx("div",{className:"p-2 border-b border-[var(--hive-border-default)]",children:e.jsx("h3",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Compact Icons"})}),e.jsx("div",{className:"h-64 relative",children:e.jsx(u,{currentPath:"/spaces",user:n,className:"h-full transform scale-75 origin-top-left w-[133%]"})})]}),e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg overflow-hidden relative",children:[e.jsx("div",{className:"p-2 border-b border-[var(--hive-border-default)]",children:e.jsx("h3",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Bottom Tabs"})}),e.jsx("div",{className:"h-64 relative",children:e.jsx("div",{className:"absolute bottom-0 left-0 right-0",children:e.jsx(x,{currentPath:"/spaces",className:"relative transform scale-75 origin-bottom"})})})]}),e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg overflow-hidden relative",children:[e.jsx("div",{className:"p-2 border-b border-[var(--hive-border-default)]",children:e.jsx("h3",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Minimal Floating"})}),e.jsx("div",{className:"h-64 relative",children:e.jsx(b,{currentPath:"/spaces",user:n,className:"relative left-4 top-1/2 -translate-y-1/2 transform scale-75"})})]})]}),parameters:{docs:{description:{story:"Side-by-side comparison of all navigation variants."}}}},V={render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 p-8 h-screen bg-[var(--hive-background-primary)]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Student User"}),e.jsx(v,{currentPath:"/spaces",user:{id:"1",name:"Maya Patel",handle:"mayap"},className:"h-96"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Faculty User"}),e.jsx(v,{currentPath:"/profile",user:{id:"2",name:"Dr. Michael Foster",handle:"profmike"},className:"h-96"})]})]}),parameters:{docs:{description:{story:"Navigation with different user types showing initials generation."}}}},H={render:()=>e.jsx("div",{className:"w-full max-w-sm mx-auto h-screen bg-[var(--hive-background-primary)]",children:e.jsxs("div",{className:"h-full pb-20 relative",children:[e.jsx("div",{className:"flex items-center justify-center h-full",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"text-xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Mobile Layout"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Bottom tabs for mobile navigation"})]})}),e.jsx(x,{currentPath:"/spaces"})]})}),parameters:{docs:{description:{story:"Mobile-optimized layout with bottom tab navigation."}}}},F={render:()=>e.jsxs("div",{className:"w-full max-w-md mx-auto h-screen bg-[var(--hive-background-primary)] flex",children:[e.jsx(u,{currentPath:"/hivelab",user:n}),e.jsx("div",{className:"flex-1 flex items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"text-xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Tablet Layout"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Compact icons for medium screens"})]})})]}),parameters:{docs:{description:{story:"Tablet-optimized layout with compact icon navigation."}}}},D={render:()=>e.jsxs("div",{className:"space-y-8 p-8 bg-[var(--hive-background-primary)] min-h-screen",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Clean Vertical Sidebar"}),e.jsx("div",{className:"h-64 border border-[var(--hive-border-default)] rounded-lg overflow-hidden",children:e.jsx(v,{currentPath:"/spaces",user:n})})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Top Horizontal Navigation"}),e.jsx("div",{className:"border border-[var(--hive-border-default)] rounded-lg overflow-hidden",children:e.jsx(h,{currentPath:"/hivelab",user:n})})]})]}),parameters:{docs:{description:{story:"Static examples of different navigation variants."}}}};var A,B,W;f.parameters={...f.parameters,docs:{...(A=f.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={MinimalFloatingSidebar} user={sampleUser} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Floating pill-style navigation that hovers over content. Perfect for immersive experiences.'
      }
    }
  }
}`,...(W=(B=f.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};var _,L,R;y.parameters={...y.parameters,docs:{...(_=y.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={MinimalFloatingSidebar} user={null} {...args} />
}`,...(R=(L=y.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var E,G,Z;N.parameters={...N.parameters,docs:{...(E=N.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={MinimalFloatingSidebar} user={sampleUser} initialPath="/spaces" {...args} />
}`,...(Z=(G=N.parameters)==null?void 0:G.docs)==null?void 0:Z.source}}};var O,J,K;j.parameters={...j.parameters,docs:{...(O=j.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CleanVerticalSidebar} user={sampleUser} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Traditional sidebar with clean styling and full labels. Ideal for desktop applications.'
      }
    }
  }
}`,...(K=(J=j.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Y;w.parameters={...w.parameters,docs:{...(Q=w.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CleanVerticalSidebar} user={null} {...args} />
}`,...(Y=(X=w.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var $,ee,re;C.parameters={...C.parameters,docs:{...($=C.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CleanVerticalSidebar} user={sampleUser} initialPath="/hivelab" {...args} />
}`,...(re=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ae,te,se;k.parameters={...k.parameters,docs:{...(ae=k.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: args => <div className="h-screen bg-[var(--hive-background-primary)]">
      <InteractiveDemo Component={TopHorizontalNav} user={sampleUser} {...args} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Horizontal navigation bar at the top. Great for web applications and content-focused layouts.'
      }
    }
  }
}`,...(se=(te=k.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var ie,ne,oe;T.parameters={...T.parameters,docs:{...(ie=T.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: args => <div className="h-screen bg-[var(--hive-background-primary)]">
      <InteractiveDemo Component={TopHorizontalNav} user={null} {...args} />
    </div>
}`,...(oe=(ne=T.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var le,de,ce;S.parameters={...S.parameters,docs:{...(le=S.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: args => <div className="h-screen bg-[var(--hive-background-primary)]">
      <InteractiveDemo Component={TopHorizontalNav} user={sampleUser} initialPath="/profile" {...args} />
    </div>
}`,...(ce=(de=S.parameters)==null?void 0:de.docs)==null?void 0:ce.source}}};var me,ve,pe;P.parameters={...P.parameters,docs:{...(me=P.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: args => <div className="h-screen bg-[var(--hive-background-primary)] pb-20">
      <InteractiveDemo Component={BottomTabNav} {...args} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Mobile-style bottom tab navigation. Perfect for mobile applications and touch interfaces.'
      }
    }
  }
}`,...(pe=(ve=P.parameters)==null?void 0:ve.docs)==null?void 0:pe.source}}};var he,ue,ge;q.parameters={...q.parameters,docs:{...(he=q.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: args => <div className="h-screen bg-[var(--hive-background-primary)] pb-20">
      <InteractiveDemo Component={BottomTabNav} initialPath="/spaces" {...args} />
    </div>
}`,...(ge=(ue=q.parameters)==null?void 0:ue.docs)==null?void 0:ge.source}}};var be,xe,fe;I.parameters={...I.parameters,docs:{...(be=I.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CompactIconRail} user={sampleUser} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Icon-only vertical navigation with tooltips. Maximizes content space while maintaining navigation.'
      }
    }
  }
}`,...(fe=(xe=I.parameters)==null?void 0:xe.docs)==null?void 0:fe.source}}};var ye,Ne,je;U.parameters={...U.parameters,docs:{...(ye=U.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CompactIconRail} user={null} {...args} />
}`,...(je=(Ne=U.parameters)==null?void 0:Ne.docs)==null?void 0:je.source}}};var we,Ce,ke;M.parameters={...M.parameters,docs:{...(we=M.parameters)==null?void 0:we.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CompactIconRail} user={sampleUser} initialPath="/hivelab" {...args} />
}`,...(ke=(Ce=M.parameters)==null?void 0:Ce.docs)==null?void 0:ke.source}}};var Te,Se,Pe;z.parameters={...z.parameters,docs:{...(Te=z.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-screen bg-[var(--hive-background-secondary)]">
      {/* Clean Vertical */}
      <div className="bg-[var(--hive-background-primary)] rounded-lg overflow-hidden">
        <div className="p-2 border-b border-[var(--hive-border-default)]">
          <h3 className="text-sm font-medium text-[var(--hive-text-primary)]">Clean Vertical</h3>
        </div>
        <div className="h-64 relative">
          <CleanVerticalSidebar currentPath="/spaces" user={sampleUser} className="h-full transform scale-75 origin-top-left w-[133%]" />
        </div>
      </div>

      {/* Top Horizontal */}
      <div className="bg-[var(--hive-background-primary)] rounded-lg overflow-hidden">
        <div className="p-2 border-b border-[var(--hive-border-default)]">
          <h3 className="text-sm font-medium text-[var(--hive-text-primary)]">Top Horizontal</h3>
        </div>
        <div className="h-64 relative">
          <TopHorizontalNav currentPath="/spaces" user={sampleUser} className="transform scale-75 origin-top" />
        </div>
      </div>

      {/* Compact Icons */}
      <div className="bg-[var(--hive-background-primary)] rounded-lg overflow-hidden">
        <div className="p-2 border-b border-[var(--hive-border-default)]">
          <h3 className="text-sm font-medium text-[var(--hive-text-primary)]">Compact Icons</h3>
        </div>
        <div className="h-64 relative">
          <CompactIconRail currentPath="/spaces" user={sampleUser} className="h-full transform scale-75 origin-top-left w-[133%]" />
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="bg-[var(--hive-background-primary)] rounded-lg overflow-hidden relative">
        <div className="p-2 border-b border-[var(--hive-border-default)]">
          <h3 className="text-sm font-medium text-[var(--hive-text-primary)]">Bottom Tabs</h3>
        </div>
        <div className="h-64 relative">
          <div className="absolute bottom-0 left-0 right-0">
            <BottomTabNav currentPath="/spaces" className="relative transform scale-75 origin-bottom" />
          </div>
        </div>
      </div>

      {/* Minimal Floating */}
      <div className="bg-[var(--hive-background-primary)] rounded-lg overflow-hidden relative">
        <div className="p-2 border-b border-[var(--hive-border-default)]">
          <h3 className="text-sm font-medium text-[var(--hive-text-primary)]">Minimal Floating</h3>
        </div>
        <div className="h-64 relative">
          <MinimalFloatingSidebar currentPath="/spaces" user={sampleUser} className="relative left-4 top-1/2 -translate-y-1/2 transform scale-75" />
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all navigation variants.'
      }
    }
  }
}`,...(Pe=(Se=z.parameters)==null?void 0:Se.docs)==null?void 0:Pe.source}}};var qe,Ie,Ue;V.parameters={...V.parameters,docs:{...(qe=V.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 h-screen bg-[var(--hive-background-primary)]">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Student User</h3>
        <CleanVerticalSidebar currentPath="/spaces" user={{
        id: '1',
        name: 'Maya Patel',
        handle: 'mayap'
      }} className="h-96" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Faculty User</h3>
        <CleanVerticalSidebar currentPath="/profile" user={{
        id: '2',
        name: 'Dr. Michael Foster',
        handle: 'profmike'
      }} className="h-96" />
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Navigation with different user types showing initials generation.'
      }
    }
  }
}`,...(Ue=(Ie=V.parameters)==null?void 0:Ie.docs)==null?void 0:Ue.source}}};var Me,ze,Ve;H.parameters={...H.parameters,docs:{...(Me=H.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm mx-auto h-screen bg-[var(--hive-background-primary)]">
      <div className="h-full pb-20 relative">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[var(--hive-text-primary)] mb-2">
              Mobile Layout
            </h2>
            <p className="text-[var(--hive-text-secondary)]">
              Bottom tabs for mobile navigation
            </p>
          </div>
        </div>
        <BottomTabNav currentPath="/spaces" />
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized layout with bottom tab navigation.'
      }
    }
  }
}`,...(Ve=(ze=H.parameters)==null?void 0:ze.docs)==null?void 0:Ve.source}}};var He,Fe,De;F.parameters={...F.parameters,docs:{...(He=F.parameters)==null?void 0:He.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-md mx-auto h-screen bg-[var(--hive-background-primary)] flex">
      <CompactIconRail currentPath="/hivelab" user={sampleUser} />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[var(--hive-text-primary)] mb-2">
            Tablet Layout
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Compact icons for medium screens
          </p>
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Tablet-optimized layout with compact icon navigation.'
      }
    }
  }
}`,...(De=(Fe=F.parameters)==null?void 0:Fe.docs)==null?void 0:De.source}}};var Ae,Be,We;D.parameters={...D.parameters,docs:{...(Ae=D.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Clean Vertical Sidebar</h3>
        <div className="h-64 border border-[var(--hive-border-default)] rounded-lg overflow-hidden">
          <CleanVerticalSidebar currentPath="/spaces" user={sampleUser} />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Top Horizontal Navigation</h3>
        <div className="border border-[var(--hive-border-default)] rounded-lg overflow-hidden">
          <TopHorizontalNav currentPath="/hivelab" user={sampleUser} />
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Static examples of different navigation variants.'
      }
    }
  }
}`,...(We=(Be=D.parameters)==null?void 0:Be.docs)==null?void 0:We.source}}};const rr=["MinimalFloating","MinimalFloatingWithoutUser","MinimalFloatingActive","CleanVertical","CleanVerticalWithoutUser","CleanVerticalActive","TopHorizontal","TopHorizontalWithoutUser","TopHorizontalActive","BottomTabs","BottomTabsActive","CompactIcons","CompactIconsWithoutUser","CompactIconsActive","AllVariantsComparison","DifferentUsers","MobileLayout","TabletLayout","StaticExamples"];export{z as AllVariantsComparison,P as BottomTabs,q as BottomTabsActive,j as CleanVertical,C as CleanVerticalActive,w as CleanVerticalWithoutUser,I as CompactIcons,M as CompactIconsActive,U as CompactIconsWithoutUser,V as DifferentUsers,f as MinimalFloating,N as MinimalFloatingActive,y as MinimalFloatingWithoutUser,H as MobileLayout,D as StaticExamples,F as TabletLayout,k as TopHorizontal,S as TopHorizontalActive,T as TopHorizontalWithoutUser,rr as __namedExportsOrder,er as default};
