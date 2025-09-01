import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{C as t,M as T,T as o,B as I,a as n}from"./navigation-variants-CcorbgJa.js";import{r as He}from"./index-DJO9vBfz.js";import"./utils-CytzSlOG.js";import"./house-C4nS1CaC.js";import"./createLucideIcon-WpwZgzX-.js";import"./compass-DQEiAODW.js";import"./zap-0mfePDxG.js";import"./user-CFaOcM52.js";const Oe={title:"Molecules/Navigation Variants",component:t,parameters:{layout:"fullscreen",docs:{description:{component:`
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
        `}}},argTypes:{currentPath:{control:"select",options:["/","/spaces","/hivelab","/profile"],description:"Current active path"},user:{control:"object",description:"User profile information"}}},r={id:"1",name:"Sarah Chen",handle:"sarahc",avatar:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"},s=({Component:a,initialPath:ze="/",...Ve})=>{const[i,Fe]=He.useState(ze);return e.jsxs("div",{className:"relative h-screen bg-[var(--hive-background-primary)]",children:[e.jsx(a,{currentPath:i,onItemClick:Fe,...Ve}),e.jsx("div",{className:"flex-1 flex items-center justify-center p-8 absolute inset-0 pointer-events-none",children:e.jsxs("div",{className:"text-center pointer-events-auto",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:i==="/"?"Feed":i==="/spaces"?"Spaces":i==="/hivelab"?"HiveLab":i==="/profile"?"Profile":"Page"}),e.jsxs("p",{className:"text-[var(--hive-text-secondary)]",children:["Current path: ",i]}),e.jsx("p",{className:"text-sm text-[var(--hive-text-tertiary)] mt-4",children:"Click navigation items to see active states"})]})})]})},c={render:a=>e.jsx(s,{Component:T,user:r,...a}),parameters:{docs:{description:{story:"Floating pill-style navigation that hovers over content. Perfect for immersive experiences."}}}},l={render:a=>e.jsx(s,{Component:T,user:null,...a})},d={render:a=>e.jsx(s,{Component:T,user:r,initialPath:"/spaces",...a})},m={render:a=>e.jsx(s,{Component:t,user:r,...a}),parameters:{docs:{description:{story:"Traditional sidebar with clean styling and full labels. Ideal for desktop applications."}}}},p={render:a=>e.jsx(s,{Component:t,user:null,...a})},v={render:a=>e.jsx(s,{Component:t,user:r,initialPath:"/hivelab",...a})},h={render:a=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)]",children:e.jsx(s,{Component:o,user:r,...a})}),parameters:{docs:{description:{story:"Horizontal navigation bar at the top. Great for web applications and content-focused layouts."}}}},u={render:a=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)]",children:e.jsx(s,{Component:o,user:null,...a})})},b={render:a=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)]",children:e.jsx(s,{Component:o,user:r,initialPath:"/profile",...a})})},g={render:a=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)] pb-20",children:e.jsx(s,{Component:I,...a})}),parameters:{docs:{description:{story:"Mobile-style bottom tab navigation. Perfect for mobile applications and touch interfaces."}}}},x={render:a=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)] pb-20",children:e.jsx(s,{Component:I,initialPath:"/spaces",...a})})},f={render:a=>e.jsx(s,{Component:n,user:r,...a}),parameters:{docs:{description:{story:"Icon-only vertical navigation with tooltips. Maximizes content space while maintaining navigation."}}}},N={render:a=>e.jsx(s,{Component:n,user:null,...a})},y={render:a=>e.jsx(s,{Component:n,user:r,initialPath:"/hivelab",...a})},j={render:()=>e.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-screen bg-[var(--hive-background-secondary)]",children:[e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg overflow-hidden",children:[e.jsx("div",{className:"p-2 border-b border-[var(--hive-border-default)]",children:e.jsx("h3",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Clean Vertical"})}),e.jsx("div",{className:"h-64 relative",children:e.jsx(t,{currentPath:"/spaces",user:r,className:"h-full transform scale-75 origin-top-left w-[133%]"})})]}),e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg overflow-hidden",children:[e.jsx("div",{className:"p-2 border-b border-[var(--hive-border-default)]",children:e.jsx("h3",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Top Horizontal"})}),e.jsx("div",{className:"h-64 relative",children:e.jsx(o,{currentPath:"/spaces",user:r,className:"transform scale-75 origin-top"})})]}),e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg overflow-hidden",children:[e.jsx("div",{className:"p-2 border-b border-[var(--hive-border-default)]",children:e.jsx("h3",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Compact Icons"})}),e.jsx("div",{className:"h-64 relative",children:e.jsx(n,{currentPath:"/spaces",user:r,className:"h-full transform scale-75 origin-top-left w-[133%]"})})]}),e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg overflow-hidden relative",children:[e.jsx("div",{className:"p-2 border-b border-[var(--hive-border-default)]",children:e.jsx("h3",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Bottom Tabs"})}),e.jsx("div",{className:"h-64 relative",children:e.jsx("div",{className:"absolute bottom-0 left-0 right-0",children:e.jsx(I,{currentPath:"/spaces",className:"relative transform scale-75 origin-bottom"})})})]}),e.jsxs("div",{className:"bg-[var(--hive-background-primary)] rounded-lg overflow-hidden relative",children:[e.jsx("div",{className:"p-2 border-b border-[var(--hive-border-default)]",children:e.jsx("h3",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Minimal Floating"})}),e.jsx("div",{className:"h-64 relative",children:e.jsx(T,{currentPath:"/spaces",user:r,className:"relative left-4 top-1/2 -translate-y-1/2 transform scale-75"})})]})]}),parameters:{docs:{description:{story:"Side-by-side comparison of all navigation variants."}}}},C={render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 p-8 h-screen bg-[var(--hive-background-primary)]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Student User"}),e.jsx(t,{currentPath:"/spaces",user:{id:"1",name:"Maya Patel",handle:"mayap"},className:"h-96"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Faculty User"}),e.jsx(t,{currentPath:"/profile",user:{id:"2",name:"Dr. Michael Foster",handle:"profmike"},className:"h-96"})]})]}),parameters:{docs:{description:{story:"Navigation with different user types showing initials generation."}}}},S={render:()=>e.jsx("div",{className:"w-full max-w-sm mx-auto h-screen bg-[var(--hive-background-primary)]",children:e.jsxs("div",{className:"h-full pb-20 relative",children:[e.jsx("div",{className:"flex items-center justify-center h-full",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"text-xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Mobile Layout"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Bottom tabs for mobile navigation"})]})}),e.jsx(I,{currentPath:"/spaces"})]})}),parameters:{docs:{description:{story:"Mobile-optimized layout with bottom tab navigation."}}}},w={render:()=>e.jsxs("div",{className:"w-full max-w-md mx-auto h-screen bg-[var(--hive-background-primary)] flex",children:[e.jsx(n,{currentPath:"/hivelab",user:r}),e.jsx("div",{className:"flex-1 flex items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"text-xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Tablet Layout"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Compact icons for medium screens"})]})})]}),parameters:{docs:{description:{story:"Tablet-optimized layout with compact icon navigation."}}}},P={render:()=>e.jsxs("div",{className:"space-y-8 p-8 bg-[var(--hive-background-primary)] min-h-screen",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Clean Vertical Sidebar"}),e.jsx("div",{className:"h-64 border border-[var(--hive-border-default)] rounded-lg overflow-hidden",children:e.jsx(t,{currentPath:"/spaces",user:r})})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Top Horizontal Navigation"}),e.jsx("div",{className:"border border-[var(--hive-border-default)] rounded-lg overflow-hidden",children:e.jsx(o,{currentPath:"/hivelab",user:r})})]})]}),parameters:{docs:{description:{story:"Static examples of different navigation variants."}}}};var k,M,U;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={MinimalFloatingSidebar} user={sampleUser} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Floating pill-style navigation that hovers over content. Perfect for immersive experiences.'
      }
    }
  }
}`,...(U=(M=c.parameters)==null?void 0:M.docs)==null?void 0:U.source}}};var z,V,F;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={MinimalFloatingSidebar} user={null} {...args} />
}`,...(F=(V=l.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};var H,D,B;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={MinimalFloatingSidebar} user={sampleUser} initialPath="/spaces" {...args} />
}`,...(B=(D=d.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var A,L,R;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CleanVerticalSidebar} user={sampleUser} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Traditional sidebar with clean styling and full labels. Ideal for desktop applications.'
      }
    }
  }
}`,...(R=(L=m.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var W,E,G;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CleanVerticalSidebar} user={null} {...args} />
}`,...(G=(E=p.parameters)==null?void 0:E.docs)==null?void 0:G.source}}};var _,O,q;v.parameters={...v.parameters,docs:{...(_=v.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CleanVerticalSidebar} user={sampleUser} initialPath="/hivelab" {...args} />
}`,...(q=(O=v.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var J,K,Q;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(Q=(K=h.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Y,Z;u.parameters={...u.parameters,docs:{...(X=u.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: args => <div className="h-screen bg-[var(--hive-background-primary)]">
      <InteractiveDemo Component={TopHorizontalNav} user={null} {...args} />
    </div>
}`,...(Z=(Y=u.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,ae;b.parameters={...b.parameters,docs:{...($=b.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => <div className="h-screen bg-[var(--hive-background-primary)]">
      <InteractiveDemo Component={TopHorizontalNav} user={sampleUser} initialPath="/profile" {...args} />
    </div>
}`,...(ae=(ee=b.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var re,se,te;g.parameters={...g.parameters,docs:{...(re=g.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(te=(se=g.parameters)==null?void 0:se.docs)==null?void 0:te.source}}};var ie,oe,ne;x.parameters={...x.parameters,docs:{...(ie=x.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: args => <div className="h-screen bg-[var(--hive-background-primary)] pb-20">
      <InteractiveDemo Component={BottomTabNav} initialPath="/spaces" {...args} />
    </div>
}`,...(ne=(oe=x.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var ce,le,de;f.parameters={...f.parameters,docs:{...(ce=f.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CompactIconRail} user={sampleUser} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Icon-only vertical navigation with tooltips. Maximizes content space while maintaining navigation.'
      }
    }
  }
}`,...(de=(le=f.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var me,pe,ve;N.parameters={...N.parameters,docs:{...(me=N.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CompactIconRail} user={null} {...args} />
}`,...(ve=(pe=N.parameters)==null?void 0:pe.docs)==null?void 0:ve.source}}};var he,ue,be;y.parameters={...y.parameters,docs:{...(he=y.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: args => <InteractiveDemo Component={CompactIconRail} user={sampleUser} initialPath="/hivelab" {...args} />
}`,...(be=(ue=y.parameters)==null?void 0:ue.docs)==null?void 0:be.source}}};var ge,xe,fe;j.parameters={...j.parameters,docs:{...(ge=j.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(fe=(xe=j.parameters)==null?void 0:xe.docs)==null?void 0:fe.source}}};var Ne,ye,je;C.parameters={...C.parameters,docs:{...(Ne=C.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
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
}`,...(je=(ye=C.parameters)==null?void 0:ye.docs)==null?void 0:je.source}}};var Ce,Se,we;S.parameters={...S.parameters,docs:{...(Ce=S.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
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
}`,...(we=(Se=S.parameters)==null?void 0:Se.docs)==null?void 0:we.source}}};var Pe,Te,Ie;w.parameters={...w.parameters,docs:{...(Pe=w.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
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
}`,...(Ie=(Te=w.parameters)==null?void 0:Te.docs)==null?void 0:Ie.source}}};var ke,Me,Ue;P.parameters={...P.parameters,docs:{...(ke=P.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
}`,...(Ue=(Me=P.parameters)==null?void 0:Me.docs)==null?void 0:Ue.source}}};const qe=["MinimalFloating","MinimalFloatingWithoutUser","MinimalFloatingActive","CleanVertical","CleanVerticalWithoutUser","CleanVerticalActive","TopHorizontal","TopHorizontalWithoutUser","TopHorizontalActive","BottomTabs","BottomTabsActive","CompactIcons","CompactIconsWithoutUser","CompactIconsActive","AllVariantsComparison","DifferentUsers","MobileLayout","TabletLayout","StaticExamples"];export{j as AllVariantsComparison,g as BottomTabs,x as BottomTabsActive,m as CleanVertical,v as CleanVerticalActive,p as CleanVerticalWithoutUser,f as CompactIcons,y as CompactIconsActive,N as CompactIconsWithoutUser,C as DifferentUsers,c as MinimalFloating,d as MinimalFloatingActive,l as MinimalFloatingWithoutUser,S as MobileLayout,P as StaticExamples,w as TabletLayout,h as TopHorizontal,b as TopHorizontalActive,u as TopHorizontalWithoutUser,qe as __namedExportsOrder,Oe as default};
