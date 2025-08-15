import{j as e}from"./jsx-runtime-B9GTzLod.js";import{S as a,a as c,b as l,c as x}from"./skeleton-DzjW3hjE.js";import{H as s,c as r,a as d,b as n}from"./hive-card-DIMxrd4t.js";import{B as o}from"./badge-BLajwy0n.js";import{T as t}from"./text-BOe2XosQ.js";/* empty css                    */import"./index-BMjrbHXN.js";import"./utils-CytzSlOG.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bip1EXUU.js";const U={title:"01-Atoms/Skeleton - COMPLETE DEFINITION",component:a,parameters:{docs:{description:{component:`
## 🎯 HIVE Skeleton - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated loading placeholder system for University at Buffalo campus interfaces and content loading states.

### 🏆 **COMPONENT EXCELLENCE**
- **4 Visual Variants** - Text, circular, rectangular, rounded for all content types
- **Multi-line Support** - Automatic text line generation with realistic proportions
- **Custom Dimensions** - Flexible width and height configuration
- **Smooth Animation** - Pulse animation for engaging loading experience
- **Perfect Semantic Tokens** - 100% semantic token usage for background colors
- **Smart Accessibility** - Proper ARIA attributes for screen reader compatibility
- **Campus Content Ready** - Optimized for UB academic and administrative content loading

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo interface loading states and content placeholders:
- **Course Loading** - Class schedules, enrollment data, grade calculations
- **Academic Content** - Student profiles, transcript data, degree progress
- **Campus Services** - Dining menus, housing information, library resources
- **Administrative Tools** - User management, system data, reports
- **Social Features** - Profile cards, activity feeds, notifications
- **Mobile Interfaces** - Responsive loading states for mobile campus access

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Sizing** - Appropriate skeleton dimensions for mobile screens
- **Performance Optimized** - Lightweight animations that preserve battery
- **Consistent Rendering** - Smooth placeholder experience across devices
`}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["text","circular","rectangular","rounded"],description:"Skeleton shape variant"},width:{control:"text",description:"Skeleton width (string or number)"},height:{control:"text",description:"Skeleton height (string or number)"},lines:{control:"number",description:"Number of text lines (text variant only)"},animate:{control:"boolean",description:"Enable pulse animation"}}},m={args:{variant:"rectangular",width:"100%",height:"2rem",animate:!0},render:i=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(s,{children:e.jsxs(r,{className:"space-y-4",children:[e.jsx(t,{variant:"body-md",color:"primary",children:"Loading Course Information..."}),e.jsx(a,{...i}),e.jsx(t,{variant:"body-sm",color:"secondary",children:"Default skeleton placeholder for University at Buffalo content"})]})})})},v={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(o,{variant:"success",children:"🎭 VARIANTS"}),"Skeleton Variants - Shape & Content Types"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"4 shape variants for different content types and loading contexts"})]}),e.jsx(r,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Text Variant:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Single Line:"}),e.jsx(a,{variant:"text",width:"60%"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Multiple Lines:"}),e.jsx(a,{variant:"text",lines:3})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Custom Width:"}),e.jsx(a,{variant:"text",width:"80%"}),e.jsx(a,{variant:"text",width:"40%"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Circular Variant:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(a,{variant:"circular",width:32,height:32}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"32px - Small"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(a,{variant:"circular",width:40,height:40}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"40px - Medium"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(a,{variant:"circular",width:48,height:48}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"48px - Large"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(a,{variant:"circular",width:64,height:64}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"64px - Extra"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Rectangular Variant:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Card Content:"}),e.jsx(a,{variant:"rectangular",width:"100%",height:"6rem"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Button Placeholders:"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(a,{variant:"rectangular",width:"5rem",height:"2.5rem"}),e.jsx(a,{variant:"rectangular",width:"4rem",height:"2.5rem"}),e.jsx(a,{variant:"rectangular",width:"6rem",height:"2.5rem"})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Rounded Variant:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Image Placeholders:"}),e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsx(a,{variant:"rounded",width:"100%",height:"4rem"}),e.jsx(a,{variant:"rounded",width:"100%",height:"4rem"}),e.jsx(a,{variant:"rounded",width:"100%",height:"4rem"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Card Headers:"}),e.jsx(a,{variant:"rounded",width:"100%",height:"3rem"})]})]})]})]})})]}),e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(o,{variant:"info",children:"⚡ ANIMATION"}),"Skeleton Animation - Pulse Effects"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Smooth pulse animation for engaging loading experience"})]}),e.jsx(r,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Animated (Default):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsx(a,{variant:"text",lines:3,animate:!0}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(a,{variant:"circular",width:40,height:40,animate:!0}),e.jsx(a,{variant:"text",width:"60%",animate:!0})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Static (No Animation):"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsx(a,{variant:"text",lines:3,animate:!1}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(a,{variant:"circular",width:40,height:40,animate:!1}),e.jsx(a,{variant:"text",width:"60%",animate:!1})]})]})]})]})})]}),e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(o,{variant:"primary",children:"🎯 PRESETS"}),"Skeleton Presets - Common Campus Patterns"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Pre-built skeleton components for common University at Buffalo interface patterns"})]}),e.jsx(r,{children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"SkeletonText Preset:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Short Text (1 line):"}),e.jsx(c,{lines:1})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Medium Text (3 lines - default):"}),e.jsx(c,{})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"body-sm",color:"gold",weight:"medium",children:"Long Text (5 lines):"}),e.jsx(c,{lines:5})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"SkeletonAvatar Preset:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(l,{size:"sm"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Small (32px)"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(l,{size:"md"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Medium (40px)"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(l,{size:"lg"}),e.jsx(t,{variant:"body-xs",color:"secondary",children:"Large (48px)"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"SkeletonCard Preset:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsx(x,{className:"bg-[var(--hive-background-primary)] rounded-lg"})})]})]})})]}),e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsxs(n,{className:"flex items-center gap-3",children:[e.jsx(o,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Loading State Examples"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Skeleton usage in actual University at Buffalo academic and administrative loading contexts"})]}),e.jsxs(r,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Course Schedule Loading:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{variant:"heading-sm",color:"primary",children:"Fall 2024 Course Schedule"}),e.jsx(a,{variant:"text",width:"40%"})]}),e.jsx("div",{className:"space-y-4",children:[1,2,3,4].map(i=>e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg space-y-3",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{variant:"rectangular",width:"4rem",height:"1.5rem"}),e.jsx(a,{variant:"text",width:"60%"}),e.jsx(a,{variant:"rectangular",width:"3rem",height:"1.5rem"})]}),e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx(a,{variant:"text",width:"8rem"}),e.jsx(a,{variant:"text",width:"6rem"}),e.jsx(a,{variant:"text",width:"10rem"})]})]},i))})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Profile Loading:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg",children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx(l,{size:"lg"}),e.jsxs("div",{className:"space-y-3 flex-1",children:[e.jsx(a,{variant:"text",width:"40%"}),e.jsx(a,{variant:"text",width:"60%"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(a,{variant:"rectangular",width:"5rem",height:"1.5rem"}),e.jsx(a,{variant:"rectangular",width:"4rem",height:"1.5rem"})]})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(a,{variant:"text",width:"3rem",className:"mx-auto"}),e.jsx(a,{variant:"text",width:"4rem",className:"mx-auto"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(a,{variant:"text",width:"3rem",className:"mx-auto"}),e.jsx(a,{variant:"text",width:"5rem",className:"mx-auto"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(a,{variant:"text",width:"3rem",className:"mx-auto"}),e.jsx(a,{variant:"text",width:"6rem",className:"mx-auto"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{variant:"text",width:"8rem"}),e.jsx("div",{className:"space-y-2",children:[1,2,3].map(i=>e.jsxs("div",{className:"flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(a,{variant:"text",width:"4rem"}),e.jsx(a,{variant:"text",width:"12rem"})]}),e.jsx(a,{variant:"text",width:"3rem"})]},i))})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Grade Report Loading:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"text",width:"12rem"}),e.jsx(a,{variant:"text",width:"20rem"})]}),e.jsx("div",{className:"space-y-4",children:[1,2,3,4,5].map(i=>e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"text",width:"8rem"}),e.jsxs("div",{className:"grid grid-cols-4 gap-4 p-4 bg-[var(--hive-background-primary)] rounded-lg",children:[e.jsx(a,{variant:"text",width:"100%"}),e.jsx(a,{variant:"text",width:"100%"}),e.jsx(a,{variant:"text",width:"100%"}),e.jsx(a,{variant:"text",width:"100%"})]})]},i))})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Events Loading:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(a,{variant:"text",width:"10rem"}),e.jsx("div",{className:"grid md:grid-cols-2 gap-6",children:[1,2,3,4].map(i=>e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg space-y-4",children:[e.jsx(a,{variant:"rounded",width:"100%",height:"8rem"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"text",width:"80%"}),e.jsx(a,{variant:"text",width:"60%"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{variant:"text",width:"4rem"}),e.jsx(a,{variant:"text",width:"6rem"}),e.jsx(a,{variant:"text",width:"5rem"})]})]},i))})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Dining Menu Loading:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{variant:"rectangular",width:"3rem",height:"3rem"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{variant:"text",width:"10rem"}),e.jsx(a,{variant:"text",width:"15rem"})]})]}),e.jsx("div",{className:"space-y-4",children:["Breakfast","Lunch","Dinner"].map(i=>e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{variant:"text",width:"6rem"}),e.jsx("div",{className:"grid md:grid-cols-3 gap-4",children:[1,2,3].map(w=>e.jsxs("div",{className:"p-3 bg-[var(--hive-background-primary)] rounded-lg space-y-2",children:[e.jsx(a,{variant:"text",width:"80%"}),e.jsx(a,{variant:"text",width:"100%",lines:2}),e.jsx(a,{variant:"text",width:"4rem"})]},w))})]},i))})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Library Search Results Loading:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{variant:"rectangular",width:"20rem",height:"2.5rem"}),e.jsx(a,{variant:"rectangular",width:"6rem",height:"2.5rem"})]}),e.jsx("div",{className:"space-y-4",children:[1,2,3,4,5].map(i=>e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg space-y-3",children:[e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx(a,{variant:"rectangular",width:"4rem",height:"6rem"}),e.jsxs("div",{className:"space-y-2 flex-1",children:[e.jsx(a,{variant:"text",width:"80%"}),e.jsx(a,{variant:"text",width:"60%"}),e.jsx(c,{lines:3})]})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{variant:"text",width:"6rem"}),e.jsx(a,{variant:"text",width:"4rem"}),e.jsx(a,{variant:"text",width:"8rem"})]})]},i))})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Social Feed Loading:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[1,2,3].map(i=>e.jsx(x,{className:"bg-[var(--hive-background-primary)] rounded-lg"},i))})]})]})]})]})},h={args:{variant:"rectangular",width:"100%",height:"4rem",animate:!0},render:i=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsx(n,{children:"Skeleton Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different skeleton configurations"})]}),e.jsx(r,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{...i}),e.jsx(t,{variant:"body-sm",color:"secondary",children:"Interactive skeleton placeholder for University at Buffalo content loading"})]})})]})})};var g,p,u;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: 'rectangular',
    width: '100%',
    height: '2rem',
    animate: true
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Loading Course Information...
          </Text>
          <Skeleton {...args} />
          <Text variant="body-sm" color="secondary">
            Default skeleton placeholder for University at Buffalo content
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(u=(p=m.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var y,N,j;v.parameters={...v.parameters,docs:{...(y=v.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎭 VARIANTS</Badge>
            Skeleton Variants - Shape & Content Types
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 shape variants for different content types and loading contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Text Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Single Line:</Text>
                  <Skeleton variant="text" width="60%" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Multiple Lines:</Text>
                  <Skeleton variant="text" lines={3} />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Custom Width:</Text>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="40%" />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Circular Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="flex items-center gap-6">
                  <div className="text-center space-y-2">
                    <Skeleton variant="circular" width={32} height={32} />
                    <Text variant="body-xs" color="secondary">32px - Small</Text>
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton variant="circular" width={40} height={40} />
                    <Text variant="body-xs" color="secondary">40px - Medium</Text>
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton variant="circular" width={48} height={48} />
                    <Text variant="body-xs" color="secondary">48px - Large</Text>
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton variant="circular" width={64} height={64} />
                    <Text variant="body-xs" color="secondary">64px - Extra</Text>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Rectangular Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Card Content:</Text>
                  <Skeleton variant="rectangular" width="100%" height="6rem" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Button Placeholders:</Text>
                  <div className="flex gap-3">
                    <Skeleton variant="rectangular" width="5rem" height="2.5rem" />
                    <Skeleton variant="rectangular" width="4rem" height="2.5rem" />
                    <Skeleton variant="rectangular" width="6rem" height="2.5rem" />
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Rounded Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Image Placeholders:</Text>
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton variant="rounded" width="100%" height="4rem" />
                    <Skeleton variant="rounded" width="100%" height="4rem" />
                    <Skeleton variant="rounded" width="100%" height="4rem" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Card Headers:</Text>
                  <Skeleton variant="rounded" width="100%" height="3rem" />
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Animation Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">⚡ ANIMATION</Badge>
            Skeleton Animation - Pulse Effects
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Smooth pulse animation for engaging loading experience
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Animated (Default):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <Skeleton variant="text" lines={3} animate={true} />
                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" width={40} height={40} animate={true} />
                  <Skeleton variant="text" width="60%" animate={true} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Static (No Animation):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <Skeleton variant="text" lines={3} animate={false} />
                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" width={40} height={40} animate={false} />
                  <Skeleton variant="text" width="60%" animate={false} />
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎯 PRESETS</Badge>
            Skeleton Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built skeleton components for common University at Buffalo interface patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">SkeletonText Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Short Text (1 line):</Text>
                  <SkeletonText lines={1} />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium Text (3 lines - default):</Text>
                  <SkeletonText />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Long Text (5 lines):</Text>
                  <SkeletonText lines={5} />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">SkeletonAvatar Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="flex items-center gap-6">
                  <div className="text-center space-y-2">
                    <SkeletonAvatar size="sm" />
                    <Text variant="body-xs" color="secondary">Small (32px)</Text>
                  </div>
                  <div className="text-center space-y-2">
                    <SkeletonAvatar size="md" />
                    <Text variant="body-xs" color="secondary">Medium (40px)</Text>
                  </div>
                  <div className="text-center space-y-2">
                    <SkeletonAvatar size="lg" />
                    <Text variant="body-xs" color="secondary">Large (48px)</Text>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">SkeletonCard Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <SkeletonCard className="bg-[var(--hive-background-primary)] rounded-lg" />

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
            Real Campus Loading State Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Skeleton usage in actual University at Buffalo academic and administrative loading contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Schedule Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Schedule Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Text variant="heading-sm" color="primary">Fall 2024 Course Schedule</Text>
                  <Skeleton variant="text" width="40%" />
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(course => <div key={course} className="p-4 bg-[var(--hive-background-primary)] rounded-lg space-y-3">
                      <div className="flex items-center gap-4">
                        <Skeleton variant="rectangular" width="4rem" height="1.5rem" />
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="rectangular" width="3rem" height="1.5rem" />
                      </div>
                      <div className="flex items-center gap-6">
                        <Skeleton variant="text" width="8rem" />
                        <Skeleton variant="text" width="6rem" />
                        <Skeleton variant="text" width="10rem" />
                      </div>
                    </div>)}
                </div>
              </div>

            </div>
          </div>

          {/* Student Profile Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Profile Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="space-y-6">
                
                {/* Profile Header */}
                <div className="flex items-center gap-6">
                  <SkeletonAvatar size="lg" />
                  <div className="space-y-3 flex-1">
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="60%" />
                    <div className="flex gap-3">
                      <Skeleton variant="rectangular" width="5rem" height="1.5rem" />
                      <Skeleton variant="rectangular" width="4rem" height="1.5rem" />
                    </div>
                  </div>
                </div>

                {/* Academic Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <Skeleton variant="text" width="3rem" className="mx-auto" />
                    <Skeleton variant="text" width="4rem" className="mx-auto" />
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton variant="text" width="3rem" className="mx-auto" />
                    <Skeleton variant="text" width="5rem" className="mx-auto" />
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton variant="text" width="3rem" className="mx-auto" />
                    <Skeleton variant="text" width="6rem" className="mx-auto" />
                  </div>
                </div>

                {/* Course List */}
                <div className="space-y-4">
                  <Skeleton variant="text" width="8rem" />
                  <div className="space-y-2">
                    {[1, 2, 3].map(course => <div key={course} className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <Skeleton variant="text" width="4rem" />
                          <Skeleton variant="text" width="12rem" />
                        </div>
                        <Skeleton variant="text" width="3rem" />
                      </div>)}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Grade Report Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Grade Report Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-3">
                <Skeleton variant="text" width="12rem" />
                <Skeleton variant="text" width="20rem" />
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(semester => <div key={semester} className="space-y-3">
                    <Skeleton variant="text" width="8rem" />
                    <div className="grid grid-cols-4 gap-4 p-4 bg-[var(--hive-background-primary)] rounded-lg">
                      <Skeleton variant="text" width="100%" />
                      <Skeleton variant="text" width="100%" />
                      <Skeleton variant="text" width="100%" />
                      <Skeleton variant="text" width="100%" />
                    </div>
                  </div>)}
              </div>

            </div>
          </div>

          {/* Campus Events Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Events Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Skeleton variant="text" width="10rem" />

              <div className="grid md:grid-cols-2 gap-6">
                
                {[1, 2, 3, 4].map(event => <div key={event} className="p-4 bg-[var(--hive-background-primary)] rounded-lg space-y-4">
                    <Skeleton variant="rounded" width="100%" height="8rem" />
                    <div className="space-y-2">
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="60%" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Skeleton variant="text" width="4rem" />
                      <Skeleton variant="text" width="6rem" />
                      <Skeleton variant="text" width="5rem" />
                    </div>
                  </div>)}

              </div>

            </div>
          </div>

          {/* Dining Menu Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Dining Menu Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="flex items-center gap-4">
                <Skeleton variant="rectangular" width="3rem" height="3rem" />
                <div className="space-y-2">
                  <Skeleton variant="text" width="10rem" />
                  <Skeleton variant="text" width="15rem" />
                </div>
              </div>

              <div className="space-y-4">
                {['Breakfast', 'Lunch', 'Dinner'].map(meal => <div key={meal} className="space-y-3">
                    <Skeleton variant="text" width="6rem" />
                    <div className="grid md:grid-cols-3 gap-4">
                      {[1, 2, 3].map(item => <div key={item} className="p-3 bg-[var(--hive-background-primary)] rounded-lg space-y-2">
                          <Skeleton variant="text" width="80%" />
                          <Skeleton variant="text" width="100%" lines={2} />
                          <Skeleton variant="text" width="4rem" />
                        </div>)}
                    </div>
                  </div>)}
              </div>

            </div>
          </div>

          {/* Library Search Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Library Search Results Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="flex items-center gap-4">
                <Skeleton variant="rectangular" width="20rem" height="2.5rem" />
                <Skeleton variant="rectangular" width="6rem" height="2.5rem" />
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(result => <div key={result} className="p-4 bg-[var(--hive-background-primary)] rounded-lg space-y-3">
                    <div className="flex items-start gap-4">
                      <Skeleton variant="rectangular" width="4rem" height="6rem" />
                      <div className="space-y-2 flex-1">
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="60%" />
                        <SkeletonText lines={3} />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Skeleton variant="text" width="6rem" />
                      <Skeleton variant="text" width="4rem" />
                      <Skeleton variant="text" width="8rem" />
                    </div>
                  </div>)}
              </div>

            </div>
          </div>

          {/* Social Feed Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Social Feed Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              {[1, 2, 3].map(post => <SkeletonCard key={post} className="bg-[var(--hive-background-primary)] rounded-lg" />)}

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(j=(N=v.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var b,k,f;h.parameters={...h.parameters,docs:{...(b=h.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    variant: 'rectangular',
    width: '100%',
    height: '4rem',
    animate: true
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Skeleton Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different skeleton configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive skeleton placeholder for University at Buffalo content loading
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(f=(k=h.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};const D=["Default","CompleteShowcase","Playground"];export{v as CompleteShowcase,m as Default,h as Playground,D as __namedExportsOrder,U as default};
