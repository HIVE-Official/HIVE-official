import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{c as T}from"./utils-CytzSlOG.js";import"./index-DJO9vBfz.js";const A={title:"Foundation/Spacing System",parameters:{layout:"fullscreen",docs:{description:{component:`
# HIVE Spacing System

The HIVE spacing system is inspired by Vercel and Apple's generous whitespace approach, using an 8px base grid for consistent, confident layouts.

## Philosophy
- **Generous Whitespace**: Never cramped, always room to breathe
- **8px Base Grid**: Consistent mathematical relationship between elements
- **Vercel + Apple Inspired**: Technical precision meets human-centered design
- **Campus Energy**: Spacing can adapt to different student energy states

## Scale System
From 4px micro-spacing to 64px major layout gaps, all following the 8px base grid.

## Responsive Behavior
Spacing adapts intelligently across different screen sizes and contexts.
        `}}},tags:["autodocs"]},n=({title:s,value:l,className:m,description:k})=>e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"font-mono text-sm font-medium",children:s}),e.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:l})]}),e.jsx("div",{className:"border rounded-lg p-4 bg-surface",children:e.jsx("div",{className:T("bg-accent rounded",m)})}),e.jsx("p",{className:"text-xs text-muted-foreground",children:k})]}),a=({title:s,children:l,description:m})=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("h4",{className:"font-semibold",children:s}),e.jsx("p",{className:"text-sm text-muted-foreground",children:m})]}),e.jsx("div",{className:"border rounded-lg p-4 bg-surface",children:l})]}),t={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Spacing Scale"}),e.jsx("p",{className:"text-muted-foreground",children:"The HIVE spacing system follows an 8px base grid for consistent, mathematical relationships."})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[e.jsx(n,{title:"XS",value:"4px",className:"w-1 h-8",description:"Icon padding, micro-spacing"}),e.jsx(n,{title:"SM",value:"8px",className:"w-2 h-8",description:"Form field padding, tight spacing"}),e.jsx(n,{title:"MD",value:"12px",className:"w-3 h-8",description:"Button padding, small gaps"}),e.jsx(n,{title:"LG",value:"16px",className:"w-4 h-8",description:"Card padding, section spacing"}),e.jsx(n,{title:"XL",value:"24px",className:"w-6 h-8",description:"Large section spacing"}),e.jsx(n,{title:"2XL",value:"32px",className:"w-8 h-8",description:"Major layout gaps"}),e.jsx(n,{title:"3XL",value:"48px",className:"w-12 h-8",description:"Hero section spacing"}),e.jsx(n,{title:"4XL",value:"64px",className:"w-16 h-8",description:"Page-level spacing"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-xl font-semibold",children:"Tailwind Scale Integration"}),e.jsx("p",{className:"text-muted-foreground",children:"HIVE also extends Tailwind's standard spacing scale for more granular control."}),e.jsx("div",{className:"grid grid-cols-8 gap-2 text-xs",children:[1,2,3,4,5,6,7,8].map(s=>e.jsxs("div",{className:"text-center space-y-1",children:[e.jsx("div",{className:`bg-accent rounded h-${s} w-full`}),e.jsx("span",{className:"font-mono",children:s}),e.jsxs("span",{className:"text-muted-foreground",children:[s*4,"px"]})]},s))})]})]})},c={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Component Spacing"}),e.jsx("p",{className:"text-muted-foreground",children:"How spacing is applied to different component types."})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx(a,{title:"Button Spacing",description:"Comfortable touch targets with generous padding",children:e.jsxs("div",{className:"flex gap-4",children:[e.jsx("button",{className:"px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-sm",children:"Small (px-3 py-1.5)"}),e.jsx("button",{className:"px-4 py-2 bg-accent text-accent-foreground rounded-md",children:"Default (px-4 py-2)"}),e.jsx("button",{className:"px-6 py-3 bg-accent text-accent-foreground rounded-md text-lg",children:"Large (px-6 py-3)"})]})}),e.jsx(a,{title:"Card Spacing",description:"Consistent internal spacing for content containers",children:e.jsxs("div",{className:"bg-background border rounded-lg p-4 space-y-3",children:[e.jsx("h4",{className:"font-semibold",children:"Card Title"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Card content with comfortable padding (p-4) and internal spacing (space-y-3)."}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{className:"px-3 py-1 bg-accent text-accent-foreground rounded text-sm",children:"Action"}),e.jsx("button",{className:"px-3 py-1 bg-surface text-foreground rounded text-sm",children:"Secondary"})]})]})}),e.jsx(a,{title:"Form Spacing",description:"Logical grouping and comfortable field spacing",children:e.jsxs("form",{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-sm font-medium",children:"Name"}),e.jsx("input",{type:"text",className:"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent",placeholder:"Enter your name"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-sm font-medium",children:"Email"}),e.jsx("input",{type:"email",className:"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent",placeholder:"Enter your email"})]}),e.jsx("button",{className:"px-4 py-2 bg-accent text-accent-foreground rounded-md",children:"Submit"})]})})]})]})},i={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Layout Principles"}),e.jsx("p",{className:"text-muted-foreground",children:"Vercel + Apple inspired layout principles for confident, spacious interfaces."})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx(a,{title:"Generous Whitespace",description:"Never cramped, always room to breathe",children:e.jsxs("div",{className:"max-w-md mx-auto text-center space-y-6",children:[e.jsx("h3",{className:"text-2xl font-semibold",children:"Welcome to HIVE"}),e.jsx("p",{className:"text-muted-foreground",children:"Your campus community awaits. Connect with classmates, join spaces, and build together."}),e.jsx("button",{className:"px-6 py-3 bg-accent text-accent-foreground rounded-md",children:"Get Started"})]})}),e.jsx(a,{title:"Visual Hierarchy",description:"Clear relationships through consistent spacing",children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-xl font-semibold",children:"CS Majors Space"}),e.jsx("p",{className:"text-muted-foreground",children:"247 members • Active community"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-sm",children:"Connect with fellow computer science students, share resources, and collaborate on projects."}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("button",{className:"px-4 py-2 bg-accent text-accent-foreground rounded-md",children:"Join Space"}),e.jsx("button",{className:"px-4 py-2 bg-surface text-foreground rounded-md",children:"Learn More"})]})]})]})}),e.jsx(a,{title:"Consistent Rhythms",description:"Predictable spacing patterns create comfort",children:e.jsx("div",{className:"space-y-4",children:[1,2,3].map(s=>e.jsxs("div",{className:"flex items-center gap-4 p-4 bg-background border rounded-lg",children:[e.jsx("div",{className:"w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-semibold",children:s}),e.jsxs("div",{className:"flex-1 space-y-1",children:[e.jsxs("h4",{className:"font-semibold",children:["Space Title ",s]}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Brief description of the space"})]}),e.jsx("button",{className:"px-3 py-1 bg-surface text-foreground rounded text-sm",children:"Join"})]},s))})})]})]})},o={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Campus Energy Spacing"}),e.jsx("p",{className:"text-muted-foreground",children:"Spacing adapts to different campus energy states and student needs."})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx(a,{title:"High Energy Periods",description:"Tighter spacing for dynamic, active periods",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"🎉 Campus Events Today"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"p-3 bg-background border rounded-lg",children:[e.jsx("h4",{className:"font-medium",children:"CS Department Mixer"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"4:00 PM - Davis Hall"})]}),e.jsxs("div",{className:"p-3 bg-background border rounded-lg",children:[e.jsx("h4",{className:"font-medium",children:"Study Group Formation"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"6:00 PM - Library"})]})]})]})}),e.jsx(a,{title:"Focus Periods",description:"More generous spacing for calm, focused work",children:e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Study Tools"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"p-4 bg-background border rounded-lg",children:[e.jsx("h4",{className:"font-medium",children:"Pomodoro Timer"}),e.jsx("p",{className:"text-sm text-muted-foreground mt-2",children:"25-minute focused work sessions"})]}),e.jsxs("div",{className:"p-4 bg-background border rounded-lg",children:[e.jsx("h4",{className:"font-medium",children:"Study Group Finder"}),e.jsx("p",{className:"text-sm text-muted-foreground mt-2",children:"Connect with classmates for quiet study"})]})]})]})}),e.jsx(a,{title:"Celebration Moments",description:"Expansive spacing for special achievements",children:e.jsxs("div",{className:"text-center space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"w-20 h-20 bg-accent rounded-full mx-auto flex items-center justify-center text-2xl animate-hive-gold-pulse",children:"🎉"}),e.jsx("h3",{className:"text-2xl font-semibold",children:"Space Activated!"}),e.jsx("p",{className:"text-muted-foreground max-w-md mx-auto",children:"You've successfully activated the CS Majors space. Welcome to your new campus community!"})]}),e.jsx("button",{className:"px-6 py-3 bg-accent text-accent-foreground rounded-md",children:"Explore Your Space"})]})})]})]})},d={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Responsive Spacing"}),e.jsx("p",{className:"text-muted-foreground",children:"How spacing adapts across different screen sizes and contexts."})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx(a,{title:"Mobile (390px+)",description:"Compact but comfortable spacing for mobile devices",children:e.jsx("div",{className:"max-w-xs mx-auto",children:e.jsxs("div",{className:"p-4 bg-background border rounded-lg space-y-3",children:[e.jsx("h4",{className:"font-semibold",children:"Join CS Majors"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Connect with 247 computer science students"}),e.jsx("button",{className:"w-full py-2 bg-accent text-accent-foreground rounded-md",children:"Join Space"})]})})}),e.jsx(a,{title:"Tablet (768px+)",description:"Increased spacing for comfortable tablet interaction",children:e.jsx("div",{className:"max-w-lg mx-auto",children:e.jsxs("div",{className:"p-6 bg-background border rounded-lg space-y-4",children:[e.jsx("h4",{className:"text-lg font-semibold",children:"Join CS Majors"}),e.jsx("p",{className:"text-muted-foreground",children:"Connect with 247 computer science students, share resources, and collaborate on projects."}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx("button",{className:"px-4 py-2 bg-accent text-accent-foreground rounded-md",children:"Join Space"}),e.jsx("button",{className:"px-4 py-2 bg-surface text-foreground rounded-md",children:"Learn More"})]})]})})}),e.jsx(a,{title:"Desktop (1024px+)",description:"Generous spacing for desktop interfaces",children:e.jsx("div",{className:"p-8 bg-background border rounded-lg space-y-6",children:e.jsxs("div",{className:"flex items-start gap-6",children:[e.jsx("div",{className:"w-16 h-16 bg-accent rounded-lg flex items-center justify-center text-accent-foreground text-xl font-semibold",children:"CS"}),e.jsxs("div",{className:"flex-1 space-y-3",children:[e.jsx("h4",{className:"text-xl font-semibold",children:"CS Majors Space"}),e.jsx("p",{className:"text-muted-foreground",children:"Connect with 247 computer science students, share resources, collaborate on projects, and build tools that help the entire campus community."}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx("button",{className:"px-6 py-3 bg-accent text-accent-foreground rounded-md",children:"Join Space"}),e.jsx("button",{className:"px-6 py-3 bg-surface text-foreground rounded-md",children:"Learn More"})]})]})]})})})]})]})},r={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsx("div",{className:"space-y-4",children:e.jsx("h2",{className:"text-2xl font-semibold",children:"Spacing Guidelines"})}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-accent",children:"✅ DO"}),e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsx("li",{children:"• Use 8px base grid for consistency"}),e.jsx("li",{children:"• Follow Vercel/Apple generous spacing"}),e.jsx("li",{children:"• Use semantic spacing classes (space-y-4, gap-6)"}),e.jsx("li",{children:"• Adapt spacing to campus energy states"}),e.jsx("li",{children:"• Maintain consistent rhythms"}),e.jsx("li",{children:"• Consider mobile touch targets (44px min)"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-muted-foreground",children:"❌ DON'T"}),e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsx("li",{children:"• Use random spacing values"}),e.jsx("li",{children:"• Cram elements together"}),e.jsx("li",{children:"• Ignore responsive spacing needs"}),e.jsx("li",{children:"• Use inconsistent spacing patterns"}),e.jsx("li",{children:"• Forget about touch accessibility"}),e.jsx("li",{children:"• Override spacing system randomly"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Implementation Example"}),e.jsx("div",{className:"p-4 bg-surface rounded-lg",children:e.jsx("code",{className:"text-sm",children:`// Use semantic spacing classes
<div className="space-y-4">           // 16px vertical spacing
  <div className="p-6">              // 24px padding
    <div className="flex gap-4">     // 16px gap between items
      <button className="px-4 py-2"> // 16px horizontal, 8px vertical
        Action
      </button>
    </div>
  </div>
</div>

// Campus energy adaptation
<div className="space-y-3">  // High energy - tighter spacing
<div className="space-y-6">  // Focus period - generous spacing
<div className="space-y-8">  // Celebration - expansive spacing`})})]})]})};var p,u,x;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Spacing Scale</h2>
        <p className="text-muted-foreground">
          The HIVE spacing system follows an 8px base grid for consistent, mathematical relationships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SpacingDemo title="XS" value="4px" className="w-1 h-8" description="Icon padding, micro-spacing" />
        <SpacingDemo title="SM" value="8px" className="w-2 h-8" description="Form field padding, tight spacing" />
        <SpacingDemo title="MD" value="12px" className="w-3 h-8" description="Button padding, small gaps" />
        <SpacingDemo title="LG" value="16px" className="w-4 h-8" description="Card padding, section spacing" />
        <SpacingDemo title="XL" value="24px" className="w-6 h-8" description="Large section spacing" />
        <SpacingDemo title="2XL" value="32px" className="w-8 h-8" description="Major layout gaps" />
        <SpacingDemo title="3XL" value="48px" className="w-12 h-8" description="Hero section spacing" />
        <SpacingDemo title="4XL" value="64px" className="w-16 h-8" description="Page-level spacing" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tailwind Scale Integration</h3>
        <p className="text-muted-foreground">
          HIVE also extends Tailwind's standard spacing scale for more granular control.
        </p>
        <div className="grid grid-cols-8 gap-2 text-xs">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="text-center space-y-1">
              <div className={\`bg-accent rounded h-\${i} w-full\`} />
              <span className="font-mono">{i}</span>
              <span className="text-muted-foreground">{i * 4}px</span>
            </div>)}
        </div>
      </div>
    </div>
}`,...(x=(u=t.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var g,h,N;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Component Spacing</h2>
        <p className="text-muted-foreground">
          How spacing is applied to different component types.
        </p>
      </div>

      <div className="space-y-6">
        <LayoutDemo title="Button Spacing" description="Comfortable touch targets with generous padding">
          <div className="flex gap-4">
            <button className="px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-sm">
              Small (px-3 py-1.5)
            </button>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md">
              Default (px-4 py-2)
            </button>
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-md text-lg">
              Large (px-6 py-3)
            </button>
          </div>
        </LayoutDemo>

        <LayoutDemo title="Card Spacing" description="Consistent internal spacing for content containers">
          <div className="bg-background border rounded-lg p-4 space-y-3">
            <h4 className="font-semibold">Card Title</h4>
            <p className="text-sm text-muted-foreground">
              Card content with comfortable padding (p-4) and internal spacing (space-y-3).
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-accent text-accent-foreground rounded text-sm">
                Action
              </button>
              <button className="px-3 py-1 bg-surface text-foreground rounded text-sm">
                Secondary
              </button>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo title="Form Spacing" description="Logical grouping and comfortable field spacing">
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Enter your email" />
            </div>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md">
              Submit
            </button>
          </form>
        </LayoutDemo>
      </div>
    </div>
}`,...(N=(h=c.parameters)==null?void 0:h.docs)==null?void 0:N.source}}};var f,b,y;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Layout Principles</h2>
        <p className="text-muted-foreground">
          Vercel + Apple inspired layout principles for confident, spacious interfaces.
        </p>
      </div>

      <div className="space-y-6">
        <LayoutDemo title="Generous Whitespace" description="Never cramped, always room to breathe">
          <div className="max-w-md mx-auto text-center space-y-6">
            <h3 className="text-2xl font-semibold">Welcome to HIVE</h3>
            <p className="text-muted-foreground">
              Your campus community awaits. Connect with classmates, join spaces, and build together.
            </p>
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-md">
              Get Started
            </button>
          </div>
        </LayoutDemo>

        <LayoutDemo title="Visual Hierarchy" description="Clear relationships through consistent spacing">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">CS Majors Space</h3>
              <p className="text-muted-foreground">247 members • Active community</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm">
                Connect with fellow computer science students, share resources, and collaborate on projects.
              </p>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md">
                  Join Space
                </button>
                <button className="px-4 py-2 bg-surface text-foreground rounded-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo title="Consistent Rhythms" description="Predictable spacing patterns create comfort">
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-4 p-4 bg-background border rounded-lg">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-semibold">
                  {i}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold">Space Title {i}</h4>
                  <p className="text-sm text-muted-foreground">Brief description of the space</p>
                </div>
                <button className="px-3 py-1 bg-surface text-foreground rounded text-sm">
                  Join
                </button>
              </div>)}
          </div>
        </LayoutDemo>
      </div>
    </div>
}`,...(y=(b=i.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var v,j,S;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Campus Energy Spacing</h2>
        <p className="text-muted-foreground">
          Spacing adapts to different campus energy states and student needs.
        </p>
      </div>

      <div className="space-y-6">
        <LayoutDemo title="High Energy Periods" description="Tighter spacing for dynamic, active periods">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">🎉 Campus Events Today</h3>
            <div className="space-y-2">
              <div className="p-3 bg-background border rounded-lg">
                <h4 className="font-medium">CS Department Mixer</h4>
                <p className="text-sm text-muted-foreground">4:00 PM - Davis Hall</p>
              </div>
              <div className="p-3 bg-background border rounded-lg">
                <h4 className="font-medium">Study Group Formation</h4>
                <p className="text-sm text-muted-foreground">6:00 PM - Library</p>
              </div>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo title="Focus Periods" description="More generous spacing for calm, focused work">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Study Tools</h3>
            <div className="space-y-4">
              <div className="p-4 bg-background border rounded-lg">
                <h4 className="font-medium">Pomodoro Timer</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  25-minute focused work sessions
                </p>
              </div>
              <div className="p-4 bg-background border rounded-lg">
                <h4 className="font-medium">Study Group Finder</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Connect with classmates for quiet study
                </p>
              </div>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo title="Celebration Moments" description="Expansive spacing for special achievements">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-accent rounded-full mx-auto flex items-center justify-center text-2xl animate-hive-gold-pulse">
                🎉
              </div>
              <h3 className="text-2xl font-semibold">Space Activated!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You've successfully activated the CS Majors space. Welcome to your new campus community!
              </p>
            </div>
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-md">
              Explore Your Space
            </button>
          </div>
        </LayoutDemo>
      </div>
    </div>
}`,...(S=(j=o.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var w,C,L;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Responsive Spacing</h2>
        <p className="text-muted-foreground">
          How spacing adapts across different screen sizes and contexts.
        </p>
      </div>

      <div className="space-y-6">
        <LayoutDemo title="Mobile (390px+)" description="Compact but comfortable spacing for mobile devices">
          <div className="max-w-xs mx-auto">
            <div className="p-4 bg-background border rounded-lg space-y-3">
              <h4 className="font-semibold">Join CS Majors</h4>
              <p className="text-sm text-muted-foreground">
                Connect with 247 computer science students
              </p>
              <button className="w-full py-2 bg-accent text-accent-foreground rounded-md">
                Join Space
              </button>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo title="Tablet (768px+)" description="Increased spacing for comfortable tablet interaction">
          <div className="max-w-lg mx-auto">
            <div className="p-6 bg-background border rounded-lg space-y-4">
              <h4 className="text-lg font-semibold">Join CS Majors</h4>
              <p className="text-muted-foreground">
                Connect with 247 computer science students, share resources, and collaborate on projects.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md">
                  Join Space
                </button>
                <button className="px-4 py-2 bg-surface text-foreground rounded-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </LayoutDemo>

        <LayoutDemo title="Desktop (1024px+)" description="Generous spacing for desktop interfaces">
          <div className="p-8 bg-background border rounded-lg space-y-6">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center text-accent-foreground text-xl font-semibold">
                CS
              </div>
              <div className="flex-1 space-y-3">
                <h4 className="text-xl font-semibold">CS Majors Space</h4>
                <p className="text-muted-foreground">
                  Connect with 247 computer science students, share resources, collaborate on projects, 
                  and build tools that help the entire campus community.
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-accent text-accent-foreground rounded-md">
                    Join Space
                  </button>
                  <button className="px-6 py-3 bg-surface text-foreground rounded-md">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </LayoutDemo>
      </div>
    </div>
}`,...(L=(C=d.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var D,M,E;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Spacing Guidelines</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accent">✅ DO</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use 8px base grid for consistency</li>
            <li>• Follow Vercel/Apple generous spacing</li>
            <li>• Use semantic spacing classes (space-y-4, gap-6)</li>
            <li>• Adapt spacing to campus energy states</li>
            <li>• Maintain consistent rhythms</li>
            <li>• Consider mobile touch targets (44px min)</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">❌ DON'T</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use random spacing values</li>
            <li>• Cram elements together</li>
            <li>• Ignore responsive spacing needs</li>
            <li>• Use inconsistent spacing patterns</li>
            <li>• Forget about touch accessibility</li>
            <li>• Override spacing system randomly</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Implementation Example</h3>
        <div className="p-4 bg-surface rounded-lg">
          <code className="text-sm">
            {\`// Use semantic spacing classes
<div className="space-y-4">           // 16px vertical spacing
  <div className="p-6">              // 24px padding
    <div className="flex gap-4">     // 16px gap between items
      <button className="px-4 py-2"> // 16px horizontal, 8px vertical
        Action
      </button>
    </div>
  </div>
</div>

// Campus energy adaptation
<div className="space-y-3">  // High energy - tighter spacing
<div className="space-y-6">  // Focus period - generous spacing
<div className="space-y-8">  // Celebration - expansive spacing\`}
          </code>
        </div>
      </div>
    </div>
}`,...(E=(M=r.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};const F=["SpacingScale","ComponentSpacing","LayoutPrinciples","CampusEnergyAdaptation","ResponsiveSpacing","UsageGuidelines"];export{o as CampusEnergyAdaptation,c as ComponentSpacing,i as LayoutPrinciples,d as ResponsiveSpacing,t as SpacingScale,r as UsageGuidelines,F as __namedExportsOrder,A as default};
