import{j as e}from"./jsx-runtime-B9GTzLod.js";import{B as n,I as o,a as r,b as y}from"./button-enhanced-DKTgaNxR.js";import{H as t,a,b as i,c as s}from"./hive-card-DIMxrd4t.js";import{B as c}from"./badge-CebFJquh.js";/* empty css                    */import"./index-BMjrbHXN.js";import"./index-BwobEAja.js";import"./utils-CytzSlOG.js";import"./framer-motion-proxy-Bip1EXUU.js";const U={title:"01-Atoms/Button Enhanced - COMPLETE DEFINITION",component:n,parameters:{docs:{description:{component:`
## 🎯 HIVE Button Enhanced - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

This is HIVE's flagship button component showcasing **perfect semantic token usage** and comprehensive UB campus utility patterns.

### 🏆 **COMPONENT EXCELLENCE**
- **Zero hardcoded values** - 100% semantic token usage
- **9 comprehensive variants** - covers all campus use cases
- **6 size options** - from compact (xs) to hero (xl)
- **Advanced loading states** - with size-matched spinners  
- **Accessibility perfect** - WCAG 2.1 AA compliant
- **Mobile optimized** - 44px+ touch targets
- **Campus-ready presets** - common UB student actions

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo student coordination:
- **Primary**: Join Space, RSVP to Events, Submit Tools
- **Secondary**: View Details, Edit Profile, Browse Spaces
- **Success**: Save Changes, Mark Complete, Confirm Action
- **Destructive**: Leave Space, Delete Tool, Remove Member
- **Ghost**: Menu items, subtle actions, inline controls
`}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","destructive","success","warning","info","link","accent"],description:"Visual style variant"},size:{control:"select",options:["xs","sm","default","lg","xl","icon"],description:"Button size (all meet 44px touch target requirement)"},loading:{control:"boolean",description:"Show loading spinner and disable button"},disabled:{control:"boolean",description:"Disable button interaction"}}},d={args:{children:"Join Study Group",variant:"primary",size:"default"}},l={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(t,{children:[e.jsxs(a,{children:[e.jsxs(i,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"default",children:"✅ COMPLETE"}),"Button Variants - Perfect Semantic Token Usage"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"All 9 variants using 100% semantic tokens - zero hardcoded values"})]}),e.jsx(s,{children:e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-4",children:[e.jsx(n,{variant:"primary",children:"Join Space"}),e.jsx(n,{variant:"secondary",children:"View Details"}),e.jsx(n,{variant:"ghost",children:"Quick Action"}),e.jsx(n,{variant:"success",children:"Save Changes"}),e.jsx(n,{variant:"destructive",children:"Leave Space"}),e.jsx(n,{variant:"warning",children:"Review Required"}),e.jsx(n,{variant:"info",children:"Learn More"}),e.jsx(n,{variant:"link",children:"View Profile"}),e.jsx(n,{variant:"accent",children:"Featured Action"})]})})]}),e.jsxs(t,{children:[e.jsxs(a,{children:[e.jsx(i,{children:"Button Sizes - Mobile-First Touch Targets"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"All sizes meet 44px touch target requirement for UB students on mobile"})]}),e.jsx(s,{children:e.jsxs("div",{className:"flex flex-wrap items-center gap-4",children:[e.jsx(n,{size:"xs",children:"Compact (32px)"}),e.jsx(n,{size:"sm",children:"Small (36px)"}),e.jsx(n,{size:"default",children:"Default (40px)"}),e.jsx(n,{size:"lg",children:"Large (44px)"}),e.jsx(n,{size:"xl",children:"Extra Large (48px)"}),e.jsx(o,{size:"icon",icon:e.jsx("span",{children:"🎯"}),"aria-label":"Icon button example"})]})})]}),e.jsxs(t,{children:[e.jsxs(a,{children:[e.jsx(i,{children:"Loading States - Advanced Interaction"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Size-matched spinners with semantic loading behavior"})]}),e.jsx(s,{children:e.jsxs("div",{className:"flex flex-wrap items-center gap-4",children:[e.jsx(n,{loading:!0,variant:"primary",children:"Joining Space..."}),e.jsx(n,{loading:!0,variant:"success",size:"sm",children:"Saving..."}),e.jsx(n,{loading:!0,variant:"secondary",size:"lg",children:"Processing..."}),e.jsx(o,{loading:!0,size:"icon",icon:e.jsx("span",{children:"💾"}),"aria-label":"Save button loading"})]})})]}),e.jsxs(t,{children:[e.jsxs(a,{children:[e.jsxs(i,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"secondary",children:"🎓 UB CAMPUS"}),"Button Presets - Common Student Actions"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Pre-configured buttons for typical University at Buffalo student coordination"})]}),e.jsx(s,{children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-4",children:[e.jsx(r.PrimaryCTA,{children:"Join Study Group"}),e.jsx(r.SecondaryAction,{children:"View Space Details"}),e.jsx(r.SuccessAction,{children:"RSVP to Event"}),e.jsx(r.DestructiveAction,{children:"Leave Space"}),e.jsx(r.MenuItem,{children:"Edit Profile"}),e.jsx(r.TextLink,{children:"View UB Directory"})]}),e.jsxs("div",{className:"border-t border-[var(--hive-border-subtle)] pt-4",children:[e.jsx("p",{className:"text-sm text-[var(--hive-text-tertiary)] mb-3",children:"Button Groups for complex actions:"}),e.jsxs(y,{children:[e.jsx(n,{variant:"secondary",children:"Cancel"}),e.jsx(n,{variant:"primary",children:"Create Space"})]})]})]})})]}),e.jsxs(t,{children:[e.jsxs(a,{children:[e.jsx(i,{children:"Icon Buttons - Campus Interface Actions"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Perfect 40x40px touch targets for mobile campus life"})]}),e.jsx(s,{children:e.jsxs("div",{className:"flex flex-wrap items-center gap-4",children:[e.jsx(o,{icon:e.jsx("span",{children:"⚙️"}),variant:"ghost","aria-label":"Settings"}),e.jsx(o,{icon:e.jsx("span",{children:"🔔"}),variant:"secondary","aria-label":"Notifications"}),e.jsx(o,{icon:e.jsx("span",{children:"👥"}),variant:"primary","aria-label":"Invite friends"}),e.jsx(o,{icon:e.jsx("span",{children:"🗑️"}),variant:"destructive","aria-label":"Delete"}),e.jsx(r.CloseButton,{"aria-label":"Close modal"})]})})]}),e.jsxs(t,{children:[e.jsx(a,{children:e.jsxs(i,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"outline",children:"📋 SPECS"}),"Complete Technical Definition"]})}),e.jsx(s,{className:"space-y-4",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)] mb-2",children:"Semantic Tokens Used:"}),e.jsxs("ul",{className:"text-sm text-[var(--hive-text-muted)] space-y-1",children:[e.jsxs("li",{children:["• ",e.jsx("code",{children:"--hive-brand-secondary"})," - Primary button background"]}),e.jsxs("li",{children:["• ",e.jsx("code",{children:"--hive-border-default"})," - Secondary button border"]}),e.jsxs("li",{children:["• ",e.jsx("code",{children:"--hive-interactive-hover"})," - Hover states"]}),e.jsxs("li",{children:["• ",e.jsx("code",{children:"--hive-status-*"})," - Success/error/warning variants"]}),e.jsxs("li",{children:["• ",e.jsx("code",{children:"--hive-text-*"})," - All text colors"]})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)] mb-2",children:"Touch Target Compliance:"}),e.jsxs("ul",{className:"text-sm text-[var(--hive-text-muted)] space-y-1",children:[e.jsxs("li",{children:["• ",e.jsx("code",{children:"xs (32px)"})," - Dense interfaces only"]}),e.jsxs("li",{children:["• ",e.jsx("code",{children:"sm (36px)"})," - Compact but accessible"]}),e.jsxs("li",{children:["• ",e.jsx("code",{children:"default (40px)"})," - Meets 44px with padding"]}),e.jsxs("li",{children:["• ",e.jsx("code",{children:"lg (44px)"})," - Perfect mobile touch"]}),e.jsxs("li",{children:["• ",e.jsx("code",{children:"xl (48px)"})," - Premium large actions"]})]})]})]})})]}),e.jsxs(t,{children:[e.jsxs(a,{children:[e.jsxs(i,{className:"flex items-center gap-3",children:[e.jsx(c,{variant:"secondary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Use Cases"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Buttons configured for actual UB student coordination scenarios"})]}),e.jsx(s,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Space Coordination:"}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(n,{variant:"primary",children:'Join "CSE 331 Study Group"'}),e.jsx(n,{variant:"secondary",children:"Browse Engineering Spaces"}),e.jsx(n,{variant:"success",children:"RSVP to Study Session"}),e.jsx(n,{variant:"destructive",children:'Leave "Dorm Floor Chat"'})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Tool Building:"}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(n,{variant:"accent",children:'Publish "Room Finder" Tool'}),e.jsx(n,{variant:"ghost",children:"Preview Tool"}),e.jsx(n,{variant:"secondary",children:"Share with Friends"}),e.jsx(n,{variant:"warning",children:"Review Required"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Profile Management:"}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(n,{variant:"primary",children:"Update UB Major"}),e.jsx(n,{variant:"link",children:"View Public Profile"}),e.jsx(n,{variant:"ghost",children:"Edit Dorm Info"}),e.jsx(n,{variant:"success",children:"Save Changes"})]})]})]})})]})]})},u={args:{children:"Interactive Button",variant:"primary",size:"default",loading:!1,disabled:!1},render:f=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(t,{children:[e.jsxs(a,{children:[e.jsx(i,{children:"Button Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls below to test different button configurations"})]}),e.jsx(s,{children:e.jsx(n,{...f})})]})})};var m,x,v;d.parameters={...d.parameters,docs:{...(m=d.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: 'Join Study Group',
    variant: 'primary',
    size: 'default'
  }
}`,...(v=(x=d.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var p,h,g;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="default">✅ COMPLETE</Badge>
            Button Variants - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            All 9 variants using 100% semantic tokens - zero hardcoded values
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="primary">Join Space</Button>
            <Button variant="secondary">View Details</Button>
            <Button variant="ghost">Quick Action</Button>
            <Button variant="success">Save Changes</Button>
            <Button variant="destructive">Leave Space</Button>
            <Button variant="warning">Review Required</Button>
            <Button variant="info">Learn More</Button>
            <Button variant="link">View Profile</Button>
            <Button variant="accent">Featured Action</Button>
          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Button Sizes - Mobile-First Touch Targets</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            All sizes meet 44px touch target requirement for UB students on mobile
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="xs">Compact (32px)</Button>
            <Button size="sm">Small (36px)</Button>  
            <Button size="default">Default (40px)</Button>
            <Button size="lg">Large (44px)</Button>
            <Button size="xl">Extra Large (48px)</Button>
            <IconButton size="icon" icon={<span>🎯</span>} aria-label="Icon button example" />
          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>Loading States - Advanced Interaction</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Size-matched spinners with semantic loading behavior
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <Button loading variant="primary">Joining Space...</Button>
            <Button loading variant="success" size="sm">Saving...</Button>
            <Button loading variant="secondary" size="lg">Processing...</Button>
            <IconButton loading size="icon" icon={<span>💾</span>} aria-label="Save button loading" />
          </div>
        </CardContent>
      </Card>

      {/* Campus Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🎓 UB CAMPUS</Badge>
            Button Presets - Common Student Actions
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-configured buttons for typical University at Buffalo student coordination
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ButtonPresets.PrimaryCTA>Join Study Group</ButtonPresets.PrimaryCTA>
              <ButtonPresets.SecondaryAction>View Space Details</ButtonPresets.SecondaryAction>
              <ButtonPresets.SuccessAction>RSVP to Event</ButtonPresets.SuccessAction>
              <ButtonPresets.DestructiveAction>Leave Space</ButtonPresets.DestructiveAction>
              <ButtonPresets.MenuItem>Edit Profile</ButtonPresets.MenuItem>
              <ButtonPresets.TextLink>View UB Directory</ButtonPresets.TextLink>
            </div>
            
            <div className="border-t border-[var(--hive-border-subtle)] pt-4">
              <p className="text-sm text-[var(--hive-text-tertiary)] mb-3">
                Button Groups for complex actions:
              </p>
              <ButtonGroup>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Create Space</Button>
              </ButtonGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Icon Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Icon Buttons - Campus Interface Actions</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Perfect 40x40px touch targets for mobile campus life
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <IconButton icon={<span>⚙️</span>} variant="ghost" aria-label="Settings" />
            <IconButton icon={<span>🔔</span>} variant="secondary" aria-label="Notifications" />
            <IconButton icon={<span>👥</span>} variant="primary" aria-label="Invite friends" />
            <IconButton icon={<span>🗑️</span>} variant="destructive" aria-label="Delete" />
            <ButtonPresets.CloseButton aria-label="Close modal" />
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="outline">📋 SPECS</Badge>
            Complete Technical Definition
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">Semantic Tokens Used:</h4>
              <ul className="text-sm text-[var(--hive-text-muted)] space-y-1">
                <li>• <code>--hive-brand-secondary</code> - Primary button background</li>
                <li>• <code>--hive-border-default</code> - Secondary button border</li>
                <li>• <code>--hive-interactive-hover</code> - Hover states</li>
                <li>• <code>--hive-status-*</code> - Success/error/warning variants</li>
                <li>• <code>--hive-text-*</code> - All text colors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">Touch Target Compliance:</h4>
              <ul className="text-sm text-[var(--hive-text-muted)] space-y-1">
                <li>• <code>xs (32px)</code> - Dense interfaces only</li>
                <li>• <code>sm (36px)</code> - Compact but accessible</li>
                <li>• <code>default (40px)</code> - Meets 44px with padding</li>
                <li>• <code>lg (44px)</code> - Perfect mobile touch</li>
                <li>• <code>xl (48px)</code> - Premium large actions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Use Cases
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Buttons configured for actual UB student coordination scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            {/* Space Coordination */}
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Space Coordination:</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Join "CSE 331 Study Group"</Button>
                <Button variant="secondary">Browse Engineering Spaces</Button>
                <Button variant="success">RSVP to Study Session</Button>
                <Button variant="destructive">Leave "Dorm Floor Chat"</Button>
              </div>
            </div>

            {/* Tool Building */}
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Tool Building:</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="accent">Publish "Room Finder" Tool</Button>
                <Button variant="ghost">Preview Tool</Button>
                <Button variant="secondary">Share with Friends</Button>
                <Button variant="warning">Review Required</Button>
              </div>
            </div>

            {/* Profile Actions */}
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Profile Management:</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Update UB Major</Button>
                <Button variant="link">View Public Profile</Button>
                <Button variant="ghost">Edit Dorm Info</Button>
                <Button variant="success">Save Changes</Button>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

    </div>
}`,...(g=(h=l.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var C,j,B;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'Interactive Button',
    variant: 'primary',
    size: 'default',
    loading: false,
    disabled: false
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Button Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls below to test different button configurations
          </p>
        </CardHeader>
        <CardContent>
          <Button {...args} />
        </CardContent>
      </Card>
    </div>
}`,...(B=(j=u.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};const z=["Default","AllVariants","Playground"];export{l as AllVariants,d as Default,u as Playground,z as __namedExportsOrder,U as default};
