import{j as e}from"./jsx-runtime-SKoiH9zj.js";import"./index-DJO9vBfz.js";const g={title:"🏛️ Foundation/Colors",parameters:{docs:{description:{component:"HIVE color system with strategic gold accent usage. Minimal surface, maximal spark."}}}},s=({color:n,name:m,hex:u,usage:x})=>e.jsxs("div",{className:"space-y-3",children:[e.jsx("div",{className:"w-full h-24 rounded-lg border border-border",style:{backgroundColor:n}}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-white",children:m}),e.jsx("p",{className:"text-sm text-muted font-mono",children:u}),e.jsx("p",{className:"text-xs text-muted/70 mt-1",children:x})]})]}),r={render:()=>e.jsxs("div",{className:"bg-background p-8 space-y-8",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-white mb-4",children:"HIVE Color System"}),e.jsx("p",{className:"text-muted mb-8",children:"Our monochromatic foundation with strategic gold accents creates sophistication with purposeful moments of celebration."})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6",children:[e.jsx(s,{color:"#0A0A0A",name:"Primary Black",hex:"#0A0A0A",usage:"Main background, primary surfaces"}),e.jsx(s,{color:"#111111",name:"Surface",hex:"#111111",usage:"Cards, elevated elements"}),e.jsx(s,{color:"#2A2A2A",name:"Border",hex:"#2A2A2A",usage:"Subtle divisions, component borders"}),e.jsx(s,{color:"#FFD700",name:"Gold Accent",hex:"#FFD700",usage:"Focus rings, achievements, highlights"}),e.jsx(s,{color:"#6B7280",name:"Muted Text",hex:"#6B7280",usage:"Secondary text, descriptions"})]}),e.jsxs("div",{className:"border border-accent rounded-xl p-6 bg-accent/5",children:[e.jsx("h3",{className:"text-lg font-semibold text-white mb-4",children:"Gold Usage Strategy"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-accent font-medium mb-2",children:"✅ DO Use Gold For:"}),e.jsxs("ul",{className:"text-sm text-muted space-y-1",children:[e.jsx("li",{children:"• Focus rings on interactive elements"}),e.jsx("li",{children:"• Hover/click borders on buttons and cards"}),e.jsx("li",{children:"• Success states and achievements"}),e.jsx("li",{children:"• Active states in tabs and selections"}),e.jsx("li",{children:"• Special/elevated component variants"})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-red-400 font-medium mb-2",children:"❌ DON'T Use Gold For:"}),e.jsxs("ul",{className:"text-sm text-muted space-y-1",children:[e.jsx("li",{children:"• Large surface areas or backgrounds"}),e.jsx("li",{children:"• Default states or decorative elements"}),e.jsx("li",{children:"• Primary text color (except special cases)"}),e.jsx("li",{children:"• Overuse that diminishes impact"})]})]})]})]})]})},o={render:()=>e.jsxs("div",{className:"bg-background p-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-white mb-6",children:"Design Tokens"}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"border border-border rounded-lg p-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-white mb-3",children:"CSS Custom Properties"}),e.jsx("pre",{className:"text-sm text-muted bg-surface/50 p-4 rounded border border-border overflow-x-auto",children:`:root {
  /* Colors */
  --color-background: #0A0A0A;
  --color-surface: #111111;
  --color-border: #2A2A2A;
  --color-accent: #FFD700;
  --color-muted: #6B7280;
  
  /* Motion */
  --motion-curve: cubic-bezier(0.33, 0.65, 0, 1);
  --motion-duration: 180ms;
}`})]}),e.jsxs("div",{className:"border border-border rounded-lg p-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-white mb-3",children:"Tailwind Classes"}),e.jsx("pre",{className:"text-sm text-muted bg-surface/50 p-4 rounded border border-border overflow-x-auto",children:`/* Color Classes */
bg-background     /* #0A0A0A */
bg-surface        /* #111111 */
border-border     /* #2A2A2A */
border-accent     /* #FFD700 */
text-muted        /* #6B7280 */

/* Motion Classes */
duration-[180ms]
ease-[cubic-bezier(0.33,0.65,0,1)]`})]})]})]})};var t,a,c;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <div className="bg-background p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">HIVE Color System</h2>
        <p className="text-muted mb-8">Our monochromatic foundation with strategic gold accents creates sophistication with purposeful moments of celebration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <ColorSwatch color="#0A0A0A" name="Primary Black" hex="#0A0A0A" usage="Main background, primary surfaces" />
        <ColorSwatch color="#111111" name="Surface" hex="#111111" usage="Cards, elevated elements" />
        <ColorSwatch color="#2A2A2A" name="Border" hex="#2A2A2A" usage="Subtle divisions, component borders" />
        <ColorSwatch color="#FFD700" name="Gold Accent" hex="#FFD700" usage="Focus rings, achievements, highlights" />
        <ColorSwatch color="#6B7280" name="Muted Text" hex="#6B7280" usage="Secondary text, descriptions" />
      </div>

      <div className="border border-accent rounded-xl p-6 bg-accent/5">
        <h3 className="text-lg font-semibold text-white mb-4">Gold Usage Strategy</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-accent font-medium mb-2">✅ DO Use Gold For:</h4>
            <ul className="text-sm text-muted space-y-1">
              <li>• Focus rings on interactive elements</li>
              <li>• Hover/click borders on buttons and cards</li>
              <li>• Success states and achievements</li>
              <li>• Active states in tabs and selections</li>
              <li>• Special/elevated component variants</li>
            </ul>
          </div>
          <div>
            <h4 className="text-red-400 font-medium mb-2">❌ DON'T Use Gold For:</h4>
            <ul className="text-sm text-muted space-y-1">
              <li>• Large surface areas or backgrounds</li>
              <li>• Default states or decorative elements</li>
              <li>• Primary text color (except special cases)</li>
              <li>• Overuse that diminishes impact</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
}`,...(c=(a=r.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};var d,i,l;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div className="bg-background p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Design Tokens</h2>
      
      <div className="space-y-6">
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">CSS Custom Properties</h3>
          <pre className="text-sm text-muted bg-surface/50 p-4 rounded border border-border overflow-x-auto">
          {\`:root {
  /* Colors */
  --color-background: #0A0A0A;
  --color-surface: #111111;
  --color-border: #2A2A2A;
  --color-accent: #FFD700;
  --color-muted: #6B7280;
  
  /* Motion */
  --motion-curve: cubic-bezier(0.33, 0.65, 0, 1);
  --motion-duration: 180ms;
}\`}
          </pre>
        </div>

        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Tailwind Classes</h3>
          <pre className="text-sm text-muted bg-surface/50 p-4 rounded border border-border overflow-x-auto">
          {\`/* Color Classes */
bg-background     /* #0A0A0A */
bg-surface        /* #111111 */
border-border     /* #2A2A2A */
border-accent     /* #FFD700 */
text-muted        /* #6B7280 */

/* Motion Classes */
duration-[180ms]
ease-[cubic-bezier(0.33,0.65,0,1)]\`}
          </pre>
        </div>
      </div>
    </div>
}`,...(l=(i=o.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const p=["ColorPalette","DesignTokens"];export{r as ColorPalette,o as DesignTokens,p as __namedExportsOrder,g as default};
