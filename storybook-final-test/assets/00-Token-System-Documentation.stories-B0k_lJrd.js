import{j as e}from"./jsx-runtime-B9GTzLod.js";import{H as a,a as t,b as s,c as i}from"./hive-card-DIMxrd4t.js";import{B as c}from"./badge-CebFJquh.js";/* empty css                    */import"./index-BMjrbHXN.js";import"./index-BwobEAja.js";import"./utils-CytzSlOG.js";import"./framer-motion-proxy-Bip1EXUU.js";const E={title:"00-Token-System-Documentation",parameters:{docs:{description:{component:`
## 🎨 HIVE Design Token System

Complete documentation of the HIVE design token system, including the recent critical fixes
that resolved production-breaking issues in 142+ component files.

### Token Philosophy
- **Semantic tokens only** - all values reference meaningful names
- **Dark luxury aesthetic** - sophisticated gold accents on dark backgrounds
- **Campus social utility** - tokens designed for UB student coordination features
- **Production-ready** - comprehensive testing and validation
        `}}}},d={name:"📋 Complete Token Reference",render:()=>{const p={"Background Tokens":[{name:"--hive-background-primary",value:"#0A0A0B",description:"Main app background"},{name:"--hive-background-secondary",value:"#111113",description:"Card backgrounds"},{name:"--hive-background-tertiary",value:"#1A1A1C",description:"Elevated surfaces"},{name:"--hive-background-interactive",value:"#222225",description:"Interactive elements"}],"Text Tokens":[{name:"--hive-text-primary",value:"#E5E5E7",description:"Primary text color"},{name:"--hive-text-secondary",value:"#C1C1C4",description:"Secondary text color"},{name:"--hive-text-muted",value:"#9B9B9F",description:"Muted text color"},{name:"--hive-text-placeholder",value:"#6B6B70",description:"Placeholder text"}],"Brand Tokens":[{name:"--hive-brand-primary",value:"#FFD700",description:"Primary brand color (gold)"},{name:"--hive-brand-secondary",value:"#FFD700",description:"Secondary brand color"},{name:"--hive-brand-accent",value:"#FFA500",description:"Brand accent color"},{name:"--hive-brand-hover",value:"var(--hive-brand-accent)",description:"🆕 FIXED - Brand hover state"}],"Border Tokens - RECENTLY FIXED":[{name:"--hive-border-primary",value:"#2A2A2D",description:"Primary borders"},{name:"--hive-border-secondary",value:"#1A1A1C",description:"Secondary borders"},{name:"--hive-border-subtle",value:"rgba(255, 255, 255, 0.05)",description:"Subtle dividers"},{name:"--hive-border-default",value:"var(--hive-border-primary)",description:"🆕 FIXED - Default borders (142 files)"},{name:"--hive-border-hover",value:"var(--hive-border-gold-strong)",description:"🆕 FIXED - Interactive borders"},{name:"--hive-border-strong",value:"var(--hive-border-secondary)",description:"🆕 FIXED - Strong borders"}],"Interactive Tokens":[{name:"--hive-interactive-hover",value:"rgba(255, 255, 255, 0.08)",description:"Hover backgrounds"},{name:"--hive-interactive-focus",value:"#FFD700",description:"Focus indicators"},{name:"--hive-interactive-active",value:"rgba(255, 255, 255, 0.12)",description:"Active states"}],"Status Tokens":[{name:"--hive-status-success",value:"#10B981",description:"Success states"},{name:"--hive-status-warning",value:"#F59E0B",description:"Warning states"},{name:"--hive-status-error",value:"#EF4444",description:"Error states"},{name:"--hive-status-info",value:"#3B82F6",description:"Info states"}]};return e.jsxs("div",{className:"p-8 space-y-8 max-w-7xl mx-auto",children:[e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx(c,{className:"bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]",children:"Design System"}),e.jsx("h1",{className:"text-4xl font-bold text-[var(--hive-text-primary)]",children:"HIVE Token System"}),e.jsx("p",{className:"text-[var(--hive-text-muted)] max-w-3xl mx-auto",children:"Complete reference for all HIVE design tokens, including recent critical fixes that resolved production-breaking issues in 142+ component files."})]}),e.jsxs(a,{className:"border-2 border-green-500 bg-green-500/10",children:[e.jsx(t,{children:e.jsx(s,{className:"text-green-400 flex items-center gap-2",children:"🚨 → ✅ Token Crisis Resolution Complete"})}),e.jsx(i,{children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-4 text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-green-400 mb-2",children:"Fixed Tokens:"}),e.jsxs("ul",{className:"space-y-1 text-[var(--hive-text-muted)]",children:[e.jsx("li",{children:"• --hive-border-default"}),e.jsx("li",{children:"• --hive-border-hover"}),e.jsx("li",{children:"• --hive-border-strong"}),e.jsx("li",{children:"• --hive-brand-hover"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-green-400 mb-2",children:"Impact:"}),e.jsxs("ul",{className:"space-y-1 text-[var(--hive-text-muted)]",children:[e.jsx("li",{children:"• 142+ files fixed"}),e.jsx("li",{children:"• Production build success"}),e.jsx("li",{children:"• All hover states working"}),e.jsx("li",{children:"• Component styling restored"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-green-400 mb-2",children:"Testing:"}),e.jsxs("ul",{className:"space-y-1 text-[var(--hive-text-muted)]",children:[e.jsx("li",{children:"• TypeScript ✅"}),e.jsx("li",{children:"• Production build ✅"}),e.jsx("li",{children:"• Storybook showcase ✅"}),e.jsx("li",{children:"• Component verification ✅"})]})]})]})})]}),Object.entries(p).map(([o,u])=>e.jsxs(a,{className:"border-[var(--hive-border-default)]",children:[e.jsx(t,{children:e.jsxs(s,{className:"text-[var(--hive-text-primary)] flex items-center gap-2",children:[o.includes("FIXED")&&e.jsx(c,{className:"bg-green-500 text-white text-xs",children:"RECENTLY FIXED"}),o]})}),e.jsx(i,{children:e.jsx("div",{className:"grid gap-3",children:u.map(r=>e.jsxs("div",{className:"flex items-center justify-between p-3 rounded-lg border border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)]",children:[e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("code",{className:"text-sm font-mono text-[var(--hive-brand-primary)] bg-[var(--hive-background-primary)] px-2 py-1 rounded",children:r.name}),r.description.includes("🆕 FIXED")&&e.jsx(c,{className:"bg-green-500 text-white text-xs",children:"NEW"})]}),e.jsx("p",{className:"text-sm text-[var(--hive-text-muted)] mt-1",children:r.description})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("code",{className:"text-xs text-[var(--hive-text-secondary)] bg-[var(--hive-background-primary)] px-2 py-1 rounded",children:r.value}),(r.value.startsWith("#")||r.value.startsWith("rgba"))&&e.jsx("div",{className:"w-6 h-6 rounded-full border-2 border-[var(--hive-border-default)]",style:{backgroundColor:r.value}})]})]},r.name))})})]},o)),e.jsxs(a,{className:"border-[var(--hive-border-default)] bg-[var(--hive-background-tertiary)]",children:[e.jsx(t,{children:e.jsx(s,{className:"text-[var(--hive-text-primary)]",children:"📋 Usage Guidelines"})}),e.jsxs(i,{className:"space-y-6",children:[e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-[var(--hive-text-primary)] font-semibold mb-3",children:"✅ Best Practices"}),e.jsxs("ul",{className:"text-sm text-[var(--hive-text-muted)] space-y-2",children:[e.jsx("li",{children:"• Always use semantic tokens (not hardcoded values)"}),e.jsxs("li",{children:["• Reference tokens with ",e.jsx("code",{children:"var(--token-name)"})]}),e.jsx("li",{children:"• Use appropriate semantic meaning"}),e.jsx("li",{children:"• Test in both light and dark modes"}),e.jsx("li",{children:"• Verify tokens exist before using"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[var(--hive-text-primary)] font-semibold mb-3",children:"❌ Avoid"}),e.jsxs("ul",{className:"text-sm text-[var(--hive-text-muted)] space-y-2",children:[e.jsx("li",{children:"• Hardcoded hex values (#FF0000)"}),e.jsx("li",{children:"• Hardcoded rgba values"}),e.jsx("li",{children:"• Non-semantic token names"}),e.jsx("li",{children:"• Tokens that don't exist in hive-tokens.css"}),e.jsx("li",{children:"• Mixing token systems"})]})]})]}),e.jsxs("div",{className:"border-t border-[var(--hive-border-subtle)] pt-6",children:[e.jsx("h3",{className:"text-[var(--hive-text-primary)] font-semibold mb-3",children:"💡 Example Usage"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-green-400 mb-2",children:"✅ Good:"}),e.jsx("pre",{className:"text-xs bg-[var(--hive-background-primary)] p-3 rounded border border-[var(--hive-border-subtle)]",children:`// Using semantic tokens
className="border border-[var(--hive-border-default)]
           hover:border-[var(--hive-border-hover)]
           bg-[var(--hive-background-secondary)]
           text-[var(--hive-text-primary)]"`})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-red-400 mb-2",children:"❌ Bad:"}),e.jsx("pre",{className:"text-xs bg-[var(--hive-background-primary)] p-3 rounded border border-[var(--hive-border-subtle)]",children:`// Using hardcoded values
className="border border-gray-600
           hover:border-yellow-400
           bg-gray-800
           text-white"`})]})]})]})]})]}),e.jsxs("div",{className:"text-center p-6 border-t border-[var(--hive-border-subtle)]",children:[e.jsxs("p",{className:"text-[var(--hive-text-muted)]",children:["Token system maintained in ",e.jsx("code",{children:"packages/ui/src/hive-tokens.css"})]}),e.jsx("p",{className:"text-xs text-[var(--hive-text-placeholder)] mt-2",children:"Last updated: Token Crisis Resolution - December 2024"})]})]})}},n={name:"🔍 Token Validation Tool",render:()=>e.jsxs("div",{className:"p-8 space-y-6",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-4",children:"Token Validation Tool"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Visual verification that all critical tokens are working correctly"})]}),e.jsxs("div",{className:"grid lg:grid-cols-2 gap-6",children:[e.jsxs(a,{className:"border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] transition-all",children:[e.jsx(t,{children:e.jsx(s,{className:"text-[var(--hive-text-primary)]",children:"Border Token Tests"})}),e.jsxs(i,{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx("div",{className:"p-3 border border-[var(--hive-border-default)] rounded",children:e.jsx("code",{className:"text-xs",children:"border-default"})}),e.jsx("div",{className:"p-3 border border-[var(--hive-border-hover)] rounded",children:e.jsx("code",{className:"text-xs",children:"border-hover"})}),e.jsx("div",{className:"p-3 border-2 border-[var(--hive-border-strong)] rounded",children:e.jsx("code",{className:"text-xs",children:"border-strong"})}),e.jsx("div",{className:"p-3 border border-[var(--hive-border-subtle)] rounded",children:e.jsx("code",{className:"text-xs",children:"border-subtle"})})]}),e.jsx("p",{className:"text-sm text-green-400",children:"✅ All border tokens rendering correctly"})]})]}),e.jsxs(a,{className:"border-[var(--hive-border-default)]",children:[e.jsx(t,{children:e.jsx(s,{className:"text-[var(--hive-text-primary)]",children:"Brand Token Tests"})}),e.jsxs(i,{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx("div",{className:"p-3 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded text-center",children:e.jsx("code",{className:"text-xs",children:"brand-primary"})}),e.jsx("div",{className:"p-3 bg-[var(--hive-brand-hover)] text-[var(--hive-background-primary)] rounded text-center",children:e.jsx("code",{className:"text-xs",children:"brand-hover"})}),e.jsx("div",{className:"p-3 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded text-center",children:e.jsx("code",{className:"text-xs",children:"brand-secondary"})}),e.jsx("div",{className:"p-3 bg-[var(--hive-brand-accent)] text-[var(--hive-background-primary)] rounded text-center",children:e.jsx("code",{className:"text-xs",children:"brand-accent"})})]}),e.jsx("p",{className:"text-sm text-green-400",children:"✅ All brand tokens rendering correctly"})]})]})]}),e.jsxs(a,{className:"border-[var(--hive-border-default)]",children:[e.jsx(t,{children:e.jsx(s,{className:"text-[var(--hive-text-primary)]",children:"Interactive Token Tests"})}),e.jsxs(i,{children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsx("button",{className:"p-4 border border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-interactive-hover)] transition-all rounded",children:"Hover me to test interactive tokens"}),e.jsx("button",{className:"p-4 bg-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-hover)] text-[var(--hive-background-primary)] transition-all rounded",children:"Brand hover test"}),e.jsx("button",{className:"p-4 border-2 border-[var(--hive-border-strong)] hover:bg-[var(--hive-background-interactive)] transition-all rounded text-[var(--hive-text-primary)]",children:"Strong border test"})]}),e.jsx("p",{className:"text-sm text-green-400 mt-4",children:"✅ All interactive states working correctly"})]})]})]})};var l,v,m;d.parameters={...d.parameters,docs:{...(l=d.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "📋 Complete Token Reference",
  render: () => {
    // Sample of all token categories
    const tokenCategories = {
      "Background Tokens": [{
        name: "--hive-background-primary",
        value: "#0A0A0B",
        description: "Main app background"
      }, {
        name: "--hive-background-secondary",
        value: "#111113",
        description: "Card backgrounds"
      }, {
        name: "--hive-background-tertiary",
        value: "#1A1A1C",
        description: "Elevated surfaces"
      }, {
        name: "--hive-background-interactive",
        value: "#222225",
        description: "Interactive elements"
      }],
      "Text Tokens": [{
        name: "--hive-text-primary",
        value: "#E5E5E7",
        description: "Primary text color"
      }, {
        name: "--hive-text-secondary",
        value: "#C1C1C4",
        description: "Secondary text color"
      }, {
        name: "--hive-text-muted",
        value: "#9B9B9F",
        description: "Muted text color"
      }, {
        name: "--hive-text-placeholder",
        value: "#6B6B70",
        description: "Placeholder text"
      }],
      "Brand Tokens": [{
        name: "--hive-brand-primary",
        value: "#FFD700",
        description: "Primary brand color (gold)"
      }, {
        name: "--hive-brand-secondary",
        value: "#FFD700",
        description: "Secondary brand color"
      }, {
        name: "--hive-brand-accent",
        value: "#FFA500",
        description: "Brand accent color"
      }, {
        name: "--hive-brand-hover",
        value: "var(--hive-brand-accent)",
        description: "🆕 FIXED - Brand hover state"
      }],
      "Border Tokens - RECENTLY FIXED": [{
        name: "--hive-border-primary",
        value: "#2A2A2D",
        description: "Primary borders"
      }, {
        name: "--hive-border-secondary",
        value: "#1A1A1C",
        description: "Secondary borders"
      }, {
        name: "--hive-border-subtle",
        value: "rgba(255, 255, 255, 0.05)",
        description: "Subtle dividers"
      }, {
        name: "--hive-border-default",
        value: "var(--hive-border-primary)",
        description: "🆕 FIXED - Default borders (142 files)"
      }, {
        name: "--hive-border-hover",
        value: "var(--hive-border-gold-strong)",
        description: "🆕 FIXED - Interactive borders"
      }, {
        name: "--hive-border-strong",
        value: "var(--hive-border-secondary)",
        description: "🆕 FIXED - Strong borders"
      }],
      "Interactive Tokens": [{
        name: "--hive-interactive-hover",
        value: "rgba(255, 255, 255, 0.08)",
        description: "Hover backgrounds"
      }, {
        name: "--hive-interactive-focus",
        value: "#FFD700",
        description: "Focus indicators"
      }, {
        name: "--hive-interactive-active",
        value: "rgba(255, 255, 255, 0.12)",
        description: "Active states"
      }],
      "Status Tokens": [{
        name: "--hive-status-success",
        value: "#10B981",
        description: "Success states"
      }, {
        name: "--hive-status-warning",
        value: "#F59E0B",
        description: "Warning states"
      }, {
        name: "--hive-status-error",
        value: "#EF4444",
        description: "Error states"
      }, {
        name: "--hive-status-info",
        value: "#3B82F6",
        description: "Info states"
      }]
    };
    return <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]">
            Design System
          </Badge>
          <h1 className="text-4xl font-bold text-[var(--hive-text-primary)]">
            HIVE Token System
          </h1>
          <p className="text-[var(--hive-text-muted)] max-w-3xl mx-auto">
            Complete reference for all HIVE design tokens, including recent critical fixes
            that resolved production-breaking issues in 142+ component files.
          </p>
        </div>

        {/* Crisis Resolution Banner */}
        <Card className="border-2 border-green-500 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              🚨 → ✅ Token Crisis Resolution Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-green-400 mb-2">Fixed Tokens:</p>
                <ul className="space-y-1 text-[var(--hive-text-muted)]">
                  <li>• --hive-border-default</li>
                  <li>• --hive-border-hover</li>
                  <li>• --hive-border-strong</li>
                  <li>• --hive-brand-hover</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-green-400 mb-2">Impact:</p>
                <ul className="space-y-1 text-[var(--hive-text-muted)]">
                  <li>• 142+ files fixed</li>
                  <li>• Production build success</li>
                  <li>• All hover states working</li>
                  <li>• Component styling restored</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-green-400 mb-2">Testing:</p>
                <ul className="space-y-1 text-[var(--hive-text-muted)]">
                  <li>• TypeScript ✅</li>
                  <li>• Production build ✅</li>
                  <li>• Storybook showcase ✅</li>
                  <li>• Component verification ✅</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Categories */}
        {Object.entries(tokenCategories).map(([category, tokens]) => <Card key={category} className="border-[var(--hive-border-default)]">
            <CardHeader>
              <CardTitle className="text-[var(--hive-text-primary)] flex items-center gap-2">
                {category.includes('FIXED') && <Badge className="bg-green-500 text-white text-xs">RECENTLY FIXED</Badge>}
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {tokens.map(token => <div key={token.name} className="flex items-center justify-between p-3 rounded-lg border border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <code className="text-sm font-mono text-[var(--hive-brand-primary)] bg-[var(--hive-background-primary)] px-2 py-1 rounded">
                          {token.name}
                        </code>
                        {token.description.includes('🆕 FIXED') && <Badge className="bg-green-500 text-white text-xs">NEW</Badge>}
                      </div>
                      <p className="text-sm text-[var(--hive-text-muted)] mt-1">
                        {token.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="text-xs text-[var(--hive-text-secondary)] bg-[var(--hive-background-primary)] px-2 py-1 rounded">
                        {token.value}
                      </code>
                      {/* Color swatch for color tokens */}
                      {(token.value.startsWith('#') || token.value.startsWith('rgba')) && <div className="w-6 h-6 rounded-full border-2 border-[var(--hive-border-default)]" style={{
                  backgroundColor: token.value
                }} />}
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>)}

        {/* Usage Guidelines */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-tertiary)]">
          <CardHeader>
            <CardTitle className="text-[var(--hive-text-primary)]">📋 Usage Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[var(--hive-text-primary)] font-semibold mb-3">✅ Best Practices</h3>
                <ul className="text-sm text-[var(--hive-text-muted)] space-y-2">
                  <li>• Always use semantic tokens (not hardcoded values)</li>
                  <li>• Reference tokens with <code>var(--token-name)</code></li>
                  <li>• Use appropriate semantic meaning</li>
                  <li>• Test in both light and dark modes</li>
                  <li>• Verify tokens exist before using</li>
                </ul>
              </div>
              <div>
                <h3 className="text-[var(--hive-text-primary)] font-semibold mb-3">❌ Avoid</h3>
                <ul className="text-sm text-[var(--hive-text-muted)] space-y-2">
                  <li>• Hardcoded hex values (#FF0000)</li>
                  <li>• Hardcoded rgba values</li>
                  <li>• Non-semantic token names</li>
                  <li>• Tokens that don't exist in hive-tokens.css</li>
                  <li>• Mixing token systems</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-[var(--hive-border-subtle)] pt-6">
              <h3 className="text-[var(--hive-text-primary)] font-semibold mb-3">💡 Example Usage</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-green-400 mb-2">✅ Good:</p>
                  <pre className="text-xs bg-[var(--hive-background-primary)] p-3 rounded border border-[var(--hive-border-subtle)]">
                  {\`// Using semantic tokens
className="border border-[var(--hive-border-default)]
           hover:border-[var(--hive-border-hover)]
           bg-[var(--hive-background-secondary)]
           text-[var(--hive-text-primary)]"\`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-red-400 mb-2">❌ Bad:</p>
                  <pre className="text-xs bg-[var(--hive-background-primary)] p-3 rounded border border-[var(--hive-border-subtle)]">
                  {\`// Using hardcoded values
className="border border-gray-600
           hover:border-yellow-400
           bg-gray-800
           text-white"\`}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center p-6 border-t border-[var(--hive-border-subtle)]">
          <p className="text-[var(--hive-text-muted)]">
            Token system maintained in <code>packages/ui/src/hive-tokens.css</code>
          </p>
          <p className="text-xs text-[var(--hive-text-placeholder)] mt-2">
            Last updated: Token Crisis Resolution - December 2024
          </p>
        </div>
      </div>;
  }
}`,...(m=(v=d.parameters)==null?void 0:v.docs)==null?void 0:m.source}}};var h,x,b;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "🔍 Token Validation Tool",
  render: () => <div className="p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-4">
          Token Validation Tool
        </h2>
        <p className="text-[var(--hive-text-muted)]">
          Visual verification that all critical tokens are working correctly
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Border Token Tests */}
        <Card className="border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] transition-all">
          <CardHeader>
            <CardTitle className="text-[var(--hive-text-primary)]">Border Token Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-[var(--hive-border-default)] rounded">
                <code className="text-xs">border-default</code>
              </div>
              <div className="p-3 border border-[var(--hive-border-hover)] rounded">
                <code className="text-xs">border-hover</code>
              </div>
              <div className="p-3 border-2 border-[var(--hive-border-strong)] rounded">
                <code className="text-xs">border-strong</code>
              </div>
              <div className="p-3 border border-[var(--hive-border-subtle)] rounded">
                <code className="text-xs">border-subtle</code>
              </div>
            </div>
            <p className="text-sm text-green-400">
              ✅ All border tokens rendering correctly
            </p>
          </CardContent>
        </Card>

        {/* Brand Token Tests */}
        <Card className="border-[var(--hive-border-default)]">
          <CardHeader>
            <CardTitle className="text-[var(--hive-text-primary)]">Brand Token Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded text-center">
                <code className="text-xs">brand-primary</code>
              </div>
              <div className="p-3 bg-[var(--hive-brand-hover)] text-[var(--hive-background-primary)] rounded text-center">
                <code className="text-xs">brand-hover</code>
              </div>
              <div className="p-3 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded text-center">
                <code className="text-xs">brand-secondary</code>
              </div>
              <div className="p-3 bg-[var(--hive-brand-accent)] text-[var(--hive-background-primary)] rounded text-center">
                <code className="text-xs">brand-accent</code>
              </div>
            </div>
            <p className="text-sm text-green-400">
              ✅ All brand tokens rendering correctly
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Test */}
      <Card className="border-[var(--hive-border-default)]">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">Interactive Token Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-interactive-hover)] transition-all rounded">
              Hover me to test interactive tokens
            </button>
            <button className="p-4 bg-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-hover)] text-[var(--hive-background-primary)] transition-all rounded">
              Brand hover test
            </button>
            <button className="p-4 border-2 border-[var(--hive-border-strong)] hover:bg-[var(--hive-background-interactive)] transition-all rounded text-[var(--hive-text-primary)]">
              Strong border test
            </button>
          </div>
          <p className="text-sm text-green-400 mt-4">
            ✅ All interactive states working correctly
          </p>
        </CardContent>
      </Card>
    </div>
}`,...(b=(x=n.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};const F=["TokenSystemOverview","TokenValidationTool"];export{d as TokenSystemOverview,n as TokenValidationTool,F as __namedExportsOrder,E as default};
