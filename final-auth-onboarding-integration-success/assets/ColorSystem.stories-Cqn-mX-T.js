import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{c as C}from"./utils-CytzSlOG.js";import"./index-DJO9vBfz.js";const P={title:"Foundation/Color System",parameters:{layout:"fullscreen",docs:{description:{component:`
# HIVE Color System

The HIVE color system follows the "Minimal Surface. Maximal Spark." philosophy with a monochrome foundation and strategic gold accents.

## Inspiration
- **Vercel + Apple Spacing**: Generous whitespace with confident, technical precision
- **Campus Energy**: Colors that adapt to student life cycles and energy states
- **Gold Rings Only**: Gold (#FFD700) reserved for focus states, achievements, and ritual moments

## Implementation
- Uses CSS custom properties with HSL values for theme flexibility
- Semantic color tokens that work across light/dark themes
- Multiple surface levels for proper visual hierarchy
- Status feedback through icons and motion, not color violations
        `}}},tags:["autodocs"]},s=({name:l,value:a,description:d,className:i})=>e.jsxs("div",{className:C("rounded-lg border p-4 space-y-2",i),children:[e.jsx("div",{className:"h-16 rounded-md border",style:{backgroundColor:a}}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("p",{className:"font-mono text-sm font-medium",children:l}),e.jsx("p",{className:"font-mono text-xs text-muted-foreground",children:a}),e.jsx("p",{className:"text-sm text-muted-foreground",children:d})]})]}),n=({type:l,label:a,icon:d})=>{const i="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium",S={success:"bg-background border-2 border-accent text-foreground",error:"bg-background border border-border text-foreground opacity-75",warning:"bg-background border border-border text-foreground",info:"bg-surface border border-border text-foreground"};return e.jsxs("div",{className:C(i,S[l]),children:[e.jsx("span",{className:"text-lg",children:d}),e.jsx("span",{children:a})]})},r={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Primary Colors"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsx(s,{name:"Primary",value:"#0A0A0A",description:"Primary black - main backgrounds and high contrast elements",className:"bg-primary text-primary-foreground"}),e.jsx(s,{name:"Surface",value:"#111111",description:"Surface gray - cards, elevated elements, layering",className:"bg-surface text-foreground"}),e.jsx(s,{name:"Accent (Gold)",value:"#FFD700",description:"Gold accent - focus rings, achievements, ritual moments only",className:"bg-accent text-accent-foreground"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Surface Levels"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsx(s,{name:"Background",value:"hsl(var(--background))",description:"Base background level",className:"bg-background text-foreground"}),e.jsx(s,{name:"Surface",value:"hsl(var(--surface))",description:"Elevated surface level 1",className:"bg-surface text-foreground"}),e.jsx(s,{name:"Card",value:"hsl(var(--card))",description:"Card container level",className:"bg-card text-card-foreground"}),e.jsx(s,{name:"Popover",value:"hsl(var(--popover))",description:"Floating element level",className:"bg-popover text-popover-foreground"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Text Colors"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsx(s,{name:"Foreground",value:"hsl(var(--foreground))",description:"Primary text color - high contrast",className:"bg-background text-foreground"}),e.jsx(s,{name:"Muted",value:"hsl(var(--muted-foreground))",description:"Secondary text, descriptions, captions",className:"bg-background text-muted-foreground"}),e.jsx(s,{name:"Accent Foreground",value:"hsl(var(--accent-foreground))",description:"Text on gold backgrounds",className:"bg-accent text-accent-foreground"})]})]})]})},o={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Status Without Color Violations"}),e.jsx("p",{className:"text-muted-foreground",children:"HIVE uses icons, motion, and typography to communicate status instead of green/red/blue colors."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-xl font-semibold",children:"Status Indicators"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx(n,{type:"success",label:"Successfully connected",icon:"✓"}),e.jsx(n,{type:"error",label:"Connection failed",icon:"×"}),e.jsx(n,{type:"warning",label:"Check your connection",icon:"⚠"}),e.jsx(n,{type:"info",label:"Processing request",icon:"◐"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-xl font-semibold",children:"Focus States"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-muted-foreground",children:"Gold rings (2px) for all focus states:"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx("button",{className:"px-4 py-2 bg-primary text-primary-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",children:"Primary Button"}),e.jsx("input",{type:"text",placeholder:"Text input",className:"px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"})]})]})]})]})},t={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Campus Energy Adaptation"}),e.jsx("p",{className:"text-muted-foreground",children:"The color system adapts to different campus energy periods through intensity and contrast adjustments."})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-xl font-semibold",children:"High Energy Periods"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Start of semester, events, social peaks"}),e.jsx("div",{className:"p-4 bg-background border rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-16 h-16 bg-accent rounded-lg animate-hive-gold-pulse"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"font-semibold",children:"Increased Gold Presence"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"More gold accents, brighter contrast"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-xl font-semibold",children:"Focus Periods"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Study time, exams, project deadlines"}),e.jsx("div",{className:"p-4 bg-background border rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-16 h-16 bg-accent/30 rounded-lg"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"font-semibold",children:"Muted Gold Presence"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Reduced contrast, minimal distractions"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-xl font-semibold",children:"Celebration Moments"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Achievements, ritual completion, space activation"}),e.jsx("div",{className:"p-4 bg-background border rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-16 h-16 bg-accent rounded-lg animate-hive-gold-glow"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"font-semibold",children:"Gold Celebration"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Gentle glow effects, achievement feedback"})]})]})})]})]})]})},c={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsx("div",{className:"space-y-4",children:e.jsx("h2",{className:"text-2xl font-semibold",children:"Usage Guidelines"})}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-accent",children:"✅ DO"}),e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsx("li",{children:"• Use gold for focus rings (2px)"}),e.jsx("li",{children:"• Use gold for achievement moments"}),e.jsx("li",{children:"• Use gold for ritual button fills"}),e.jsx("li",{children:"• Use monochrome for status feedback"}),e.jsx("li",{children:"• Use generous whitespace (Vercel/Apple inspiration)"}),e.jsx("li",{children:"• Use semantic color tokens"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-muted-foreground",children:"❌ DON'T"}),e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsx("li",{children:"• Use green/red/blue for status colors"}),e.jsx("li",{children:"• Use gold for large surface areas"}),e.jsx("li",{children:"• Use gold/white as standard button fill"}),e.jsx("li",{children:"• Use hardcoded color values"}),e.jsx("li",{children:"• Compromise on contrast ratios"}),e.jsx("li",{children:"• Use gold for decoration without meaning"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Implementation Example"}),e.jsx("div",{className:"p-4 bg-surface rounded-lg",children:e.jsx("code",{className:"text-sm",children:`// Use semantic tokens
<button className="bg-primary text-primary-foreground focus:ring-2 focus:ring-accent">
  Primary Action
</button>

// Campus energy adaptation
<div className="bg-accent/30 animate-hive-gold-pulse"> // Focus period
<div className="bg-accent animate-hive-gold-glow">     // Celebration moment`})})]})]})};var m,u,g;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Primary Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ColorCard name="Primary" value="#0A0A0A" description="Primary black - main backgrounds and high contrast elements" className="bg-primary text-primary-foreground" />
          <ColorCard name="Surface" value="#111111" description="Surface gray - cards, elevated elements, layering" className="bg-surface text-foreground" />
          <ColorCard name="Accent (Gold)" value="#FFD700" description="Gold accent - focus rings, achievements, ritual moments only" className="bg-accent text-accent-foreground" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Surface Levels</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ColorCard name="Background" value="hsl(var(--background))" description="Base background level" className="bg-background text-foreground" />
          <ColorCard name="Surface" value="hsl(var(--surface))" description="Elevated surface level 1" className="bg-surface text-foreground" />
          <ColorCard name="Card" value="hsl(var(--card))" description="Card container level" className="bg-card text-card-foreground" />
          <ColorCard name="Popover" value="hsl(var(--popover))" description="Floating element level" className="bg-popover text-popover-foreground" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Text Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ColorCard name="Foreground" value="hsl(var(--foreground))" description="Primary text color - high contrast" className="bg-background text-foreground" />
          <ColorCard name="Muted" value="hsl(var(--muted-foreground))" description="Secondary text, descriptions, captions" className="bg-background text-muted-foreground" />
          <ColorCard name="Accent Foreground" value="hsl(var(--accent-foreground))" description="Text on gold backgrounds" className="bg-accent text-accent-foreground" />
        </div>
      </div>
    </div>
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var p,x,h;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Status Without Color Violations</h2>
        <p className="text-muted-foreground">
          HIVE uses icons, motion, and typography to communicate status instead of green/red/blue colors.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Status Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatusIndicator type="success" label="Successfully connected" icon="✓" />
          <StatusIndicator type="error" label="Connection failed" icon="×" />
          <StatusIndicator type="warning" label="Check your connection" icon="⚠" />
          <StatusIndicator type="info" label="Processing request" icon="◐" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Focus States</h3>
        <div className="space-y-2">
          <p className="text-muted-foreground">Gold rings (2px) for all focus states:</p>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
              Primary Button
            </button>
            <input type="text" placeholder="Text input" className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2" />
          </div>
        </div>
      </div>
    </div>
}`,...(h=(x=o.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var f,v,N;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Campus Energy Adaptation</h2>
        <p className="text-muted-foreground">
          The color system adapts to different campus energy periods through intensity and contrast adjustments.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">High Energy Periods</h3>
          <p className="text-sm text-muted-foreground">Start of semester, events, social peaks</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-lg animate-hive-gold-pulse" />
              <div className="space-y-2">
                <p className="font-semibold">Increased Gold Presence</p>
                <p className="text-sm text-muted-foreground">More gold accents, brighter contrast</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Focus Periods</h3>
          <p className="text-sm text-muted-foreground">Study time, exams, project deadlines</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent/30 rounded-lg" />
              <div className="space-y-2">
                <p className="font-semibold">Muted Gold Presence</p>
                <p className="text-sm text-muted-foreground">Reduced contrast, minimal distractions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Celebration Moments</h3>
          <p className="text-sm text-muted-foreground">Achievements, ritual completion, space activation</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-lg animate-hive-gold-glow" />
              <div className="space-y-2">
                <p className="font-semibold">Gold Celebration</p>
                <p className="text-sm text-muted-foreground">Gentle glow effects, achievement feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...(N=(v=t.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};var b,y,j;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage Guidelines</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accent">✅ DO</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use gold for focus rings (2px)</li>
            <li>• Use gold for achievement moments</li>
            <li>• Use gold for ritual button fills</li>
            <li>• Use monochrome for status feedback</li>
            <li>• Use generous whitespace (Vercel/Apple inspiration)</li>
            <li>• Use semantic color tokens</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">❌ DON'T</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use green/red/blue for status colors</li>
            <li>• Use gold for large surface areas</li>
            <li>• Use gold/white as standard button fill</li>
            <li>• Use hardcoded color values</li>
            <li>• Compromise on contrast ratios</li>
            <li>• Use gold for decoration without meaning</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Implementation Example</h3>
        <div className="p-4 bg-surface rounded-lg">
          <code className="text-sm">
            {\`// Use semantic tokens
<button className="bg-primary text-primary-foreground focus:ring-2 focus:ring-accent">
  Primary Action
</button>

// Campus energy adaptation
<div className="bg-accent/30 animate-hive-gold-pulse"> // Focus period
<div className="bg-accent animate-hive-gold-glow">     // Celebration moment\`}
          </code>
        </div>
      </div>
    </div>
}`,...(j=(y=c.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};const G=["ColorPalette","StatusSystem","CampusEnergyStates","UsageGuidelines"];export{t as CampusEnergyStates,r as ColorPalette,o as StatusSystem,c as UsageGuidelines,G as __namedExportsOrder,P as default};
