import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{I as a,S as h,P as B,N as P,a as d,b as u,F as l}from"./input-enhanced-BwtnjkW5.js";import{H as n,a as r,b as t,c as s}from"./hive-tokens-CKIUfcHM.js";import{B as i}from"./badge-CR1yj3dt.js";import"./index-DJO9vBfz.js";import"./index-BwobEAja.js";import"./utils-CytzSlOG.js";import"./framer-motion-proxy-Bzlf7Pk2.js";const M={title:"01-Atoms/Input Enhanced - COMPLETE DEFINITION",component:a,parameters:{docs:{description:{component:`
## 🎯 HIVE Input Enhanced - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated input system in HIVE with **modular container expansion** and perfect semantic token usage.

### 🏆 **COMPONENT EXCELLENCE**
- **Modular Container Expansion** - Input can expand to include labels, helper text, error messages, left/right elements
- **5 Specialized Input Types** - Basic, Search, Password, Number + specialized presets
- **7 Variant States** - default, error, success, warning, brand, ghost, filled
- **5 Size Options** - from compact (sm) to hero (xl)
- **Advanced Element System** - Left/right icons, elements, complex interactions
- **Perfect Accessibility** - WCAG 2.1 AA compliant with focus management
- **Campus-Ready Presets** - Email (@buffalo.edu), Phone, Search, Currency

### 🎓 **UB CAMPUS CONTEXT & MODULAR EXPANSION**
Perfect modular expansion for University at Buffalo student needs:
- **Student Email**: Validates @buffalo.edu domains
- **Dorm Search**: "Hadley Village", "Ellicott Complex" autocomplete
- **Course Search**: "CSE 331", "MTH 141" with semester context
- **Room Numbers**: "Knox 20", "Fronczak 444" location finder
- **UB Person Number**: Secure student ID input with validation
`}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","error","success","warning","brand","ghost","filled"],description:"Input visual variant state"},size:{control:"select",options:["sm","default","lg","xl"],description:"Input size (all meet mobile touch targets)"},label:{control:"text",description:"Input label text (expands container)"},error:{control:"text",description:"Error message (expands container with red styling)"},helperText:{control:"text",description:"Helper text (expands container)"},placeholder:{control:"text",description:"Placeholder text"}}},o={args:{placeholder:"Enter your UB email address",label:"UB Email",helperText:"Use your @buffalo.edu address"}},c={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(n,{children:[e.jsxs(r,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"primary",children:"✅ MODULAR EXPANSION"}),"Container Expansion - Labels, Helper Text, Error States"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Input components can expand their container to include labels, helper text, and error messages"})]}),e.jsxs(s,{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Basic Input (No Container Expansion):"}),e.jsx(a,{placeholder:"Just the input field"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"With Label (Container Expands):"}),e.jsx(a,{label:"UB Student Email",placeholder:"your.name@buffalo.edu"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"With Label + Helper Text (Container Expands):"}),e.jsx(a,{label:"Dorm Room",placeholder:"Hadley Village 123A",helperText:"Include building name and room number"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"With Error State (Container Expands):"}),e.jsx(a,{label:"UB Person Number",placeholder:"12345678",error:"Please enter a valid 8-digit UB Person Number",required:!0})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"With Success State (Container Expands):"}),e.jsx(a,{label:"Major Declaration",placeholder:"Computer Science & Engineering",success:"Major successfully verified with UB registrar",value:"Computer Science & Engineering"})]})]})]}),e.jsxs(n,{children:[e.jsxs(r,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"secondary",children:"🎨 VARIANTS"}),"Input Variants - Semantic Token Perfection"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"7 variants using 100% semantic tokens with proper state management"})]}),e.jsx(s,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsx(a,{variant:"primary",placeholder:"Default variant"}),e.jsx(a,{variant:"error",placeholder:"Error variant"}),e.jsx(a,{variant:"success",placeholder:"Success variant"}),e.jsx(a,{variant:"warning",placeholder:"Warning variant"}),e.jsx(a,{variant:"brand",placeholder:"Brand variant (gold focus)"}),e.jsx(a,{variant:"ghost",placeholder:"Ghost variant"}),e.jsx(a,{variant:"filled",placeholder:"Filled variant"})]})})]}),e.jsxs(n,{children:[e.jsxs(r,{children:[e.jsx(t,{children:"Input Sizes - Mobile-First Touch Targets"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"All sizes meet mobile accessibility requirements for UB students"})]}),e.jsx(s,{children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{size:"sm",placeholder:"Small (32px height)"}),e.jsx(a,{size:"default",placeholder:"Default (40px height)"}),e.jsx(a,{size:"lg",placeholder:"Large (48px height)"}),e.jsx(a,{size:"xl",placeholder:"Extra Large (56px height)"})]})})]}),e.jsxs(n,{children:[e.jsxs(r,{children:[e.jsx(t,{children:"Element System - Icons & Interactive Elements"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Sophisticated left/right element system with icons and interactive components"})]}),e.jsxs(s,{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Icon Elements:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsx(a,{leftIcon:e.jsx("span",{children:"📧"}),placeholder:"Email with left icon"}),e.jsx(a,{rightIcon:e.jsx("span",{children:"🔍"}),placeholder:"Search with right icon"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Complex Elements:"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{leftElement:e.jsx("span",{className:"text-[var(--hive-text-tertiary)] text-sm",children:"https://"}),placeholder:"ub-student-tools.com",label:"Tool URL"}),e.jsx(a,{leftElement:e.jsx("span",{className:"text-[var(--hive-text-tertiary)]",children:"$"}),rightElement:e.jsx("span",{className:"text-[var(--hive-text-tertiary)] text-xs",children:"USD"}),placeholder:"0.00",label:"Budget Amount"})]})]})]})]}),e.jsxs(n,{children:[e.jsxs(r,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"secondary",children:"🔧 SPECIALIZED"}),"Specialized Input Components"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Built-in components for common campus input patterns"})]}),e.jsxs(s,{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Search Input with Clear Button:"}),e.jsx(h,{placeholder:"Search UB spaces, tools, students...",label:"Campus Search",helperText:"Search across all UB campus resources"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Password Input with Show/Hide:"}),e.jsx(B,{placeholder:"Enter your password",label:"UB Account Password",helperText:"Use your UB HUB password"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Number Input with Controls:"}),e.jsx(P,{placeholder:"18",label:"Credit Hours",helperText:"Semester credit hour load",min:1,max:21})]})]})]}),e.jsxs(n,{children:[e.jsxs(r,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"secondary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Campus-Specific Input Presets"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Pre-configured inputs for common University at Buffalo student needs"})]}),e.jsx(s,{className:"space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"UB Email Input:"}),e.jsx(d.Email,{label:"UB Student Email",helperText:"Use your @buffalo.edu address"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Phone Input:"}),e.jsx(d.Phone,{label:"Contact Phone",helperText:"For coordination and meetups"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"URL Input:"}),e.jsx(d.URL,{label:"Tool Repository",helperText:"GitHub, portfolio, or project link"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Currency Input:"}),e.jsx(d.Currency,{label:"Group Expense",helperText:"Split cost for group activities"})]})]})})]}),e.jsxs(n,{children:[e.jsxs(r,{children:[e.jsx(t,{children:"Input Groups - Complex Forms"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Grouped inputs for complex campus forms and coordination"})]}),e.jsxs(s,{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Student Profile Setup:"}),e.jsxs(u,{spacing:"md",children:[e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsx(a,{label:"First Name",placeholder:"John",required:!0}),e.jsx(a,{label:"Last Name",placeholder:"Smith",required:!0})]}),e.jsx(d.Email,{label:"UB Email Address",required:!0}),e.jsx(a,{label:"Major",placeholder:"Computer Science & Engineering",helperText:"Your declared or intended major"}),e.jsx(a,{label:"Dorm/Housing",placeholder:"Hadley Village 123A",helperText:"Current housing location"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Create Study Group Space:"}),e.jsxs(u,{spacing:"md",children:[e.jsx(a,{label:"Space Name",placeholder:"CSE 331 Final Exam Prep",required:!0}),e.jsx(a,{label:"Course Code",placeholder:"CSE 331",helperText:"Course or subject area"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsx(a,{label:"Meeting Location",placeholder:"Lockwood Library Level 2"}),e.jsx(a,{label:"Preferred Times",placeholder:"Evenings, Weekends"})]})]})]})]})]}),e.jsxs(n,{children:[e.jsxs(r,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"secondary",children:"🏫 CAMPUS CONTEXT"}),"Real UB Student Coordination Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Input configurations for actual University at Buffalo student needs"})]}),e.jsxs(s,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Dorm Floor Coordination:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{label:"Dorm Building",placeholder:"Hadley Village",leftIcon:e.jsx("span",{children:"🏠"}),helperText:"Select your residence hall"}),e.jsx(a,{label:"Floor/Wing",placeholder:"2nd Floor East Wing",leftIcon:e.jsx("span",{children:"📍"}),helperText:"For floor-specific coordination"}),e.jsx(h,{placeholder:"Search roommates, floormates...",label:"Find People",helperText:"Connect with people in your area"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Study Group Formation:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{label:"Course",placeholder:"CSE 331 - Introduction to Algorithm Analysis",leftIcon:e.jsx("span",{children:"📚"}),helperText:"Full course name and number"}),e.jsx(a,{label:"Semester",placeholder:"Spring 2024",leftIcon:e.jsx("span",{children:"📅"})}),e.jsx(a,{label:"Professor",placeholder:"Dr. Smith",leftIcon:e.jsx("span",{children:"👨‍🏫"}),helperText:"Help others find the right section"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Event Planning:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3",children:[e.jsx(a,{label:"Event Name",placeholder:"Computer Science Study Night",leftIcon:e.jsx("span",{children:"🎯"})}),e.jsx(a,{label:"Location",placeholder:"Knox 20 Computer Lab",leftIcon:e.jsx("span",{children:"📍"}),helperText:"Include building and room number"}),e.jsx(a,{label:"RSVP Limit",placeholder:"15",leftIcon:e.jsx("span",{children:"👥"}),helperText:"Maximum number of participants"})]})]})]})]})]})},p={render:()=>e.jsx("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(n,{children:[e.jsxs(r,{children:[e.jsxs(t,{className:"flex items-center gap-3",children:[e.jsx(i,{variant:"secondary",children:"✨ MODERN FLOATING LABELS"}),"Sleek Material Design Label Animation"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Clean floating label implementation with smooth transitions and proper state management"})]}),e.jsxs(s,{className:"space-y-6",children:[e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Basic Floating Labels:"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(l,{label:"Email Address",type:"email",helperText:"Enter your @buffalo.edu email"}),e.jsx(l,{label:"Phone Number",type:"tel",helperText:"Format: (xxx) xxx-xxxx"}),e.jsx(l,{label:"Message",helperText:"What would you like to share?"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"State Variations:"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(l,{label:"Expected Date",type:"date",defaultValue:"2024-08-12"}),e.jsx(l,{label:"Error Example",error:"This field is required",variant:"error"}),e.jsx(l,{label:"Success Example",success:"Looks good!",variant:"success",defaultValue:"Valid input"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Campus Use Cases:"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsx(l,{label:"UB Person Number",type:"text",placeholder:"50xxxxxx",helperText:"8-digit UB ID"}),e.jsx(l,{label:"Course Section",placeholder:"CSE 331-LEC",helperText:"Course and section"}),e.jsx(l,{label:"Dorm Room",placeholder:"Hadley 204B",helperText:"Building and room number"})]})]})]})]})})},m={args:{placeholder:"Interactive Input",variant:"default",size:"default",label:"Label Text",helperText:"Helper text example"},render:T=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(n,{children:[e.jsxs(r,{children:[e.jsx(t,{children:"Input Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different input configurations"})]}),e.jsx(s,{children:e.jsx(a,{...T})})]})})};var x,v,g;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter your UB email address',
    label: 'UB Email',
    helperText: 'Use your @buffalo.edu address'
  }
}`,...(g=(v=o.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var y,N,C;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Modular Container Expansion Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">✅ MODULAR EXPANSION</Badge>
            Container Expansion - Labels, Helper Text, Error States
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Input components can expand their container to include labels, helper text, and error messages
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Basic Input - No Expansion */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Basic Input (No Container Expansion):</h4>
            <Input placeholder="Just the input field" />
          </div>

          {/* With Label - Container Expands */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">With Label (Container Expands):</h4>
            <Input label="UB Student Email" placeholder="your.name@buffalo.edu" />
          </div>

          {/* With Label + Helper Text - Container Expands */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">With Label + Helper Text (Container Expands):</h4>
            <Input label="Dorm Room" placeholder="Hadley Village 123A" helperText="Include building name and room number" />
          </div>

          {/* With Error State - Container Expands */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">With Error State (Container Expands):</h4>
            <Input label="UB Person Number" placeholder="12345678" error="Please enter a valid 8-digit UB Person Number" required />
          </div>

          {/* With Success State - Container Expands */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">With Success State (Container Expands):</h4>
            <Input label="Major Declaration" placeholder="Computer Science & Engineering" success="Major successfully verified with UB registrar" value="Computer Science & Engineering" />
          </div>

        </CardContent>
      </Card>

      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🎨 VARIANTS</Badge>
            Input Variants - Semantic Token Perfection
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            7 variants using 100% semantic tokens with proper state management
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Input variant="primary" placeholder="Default variant" />
            <Input variant="error" placeholder="Error variant" />
            <Input variant="success" placeholder="Success variant" />
            <Input variant="warning" placeholder="Warning variant" />
            <Input variant="brand" placeholder="Brand variant (gold focus)" />
            <Input variant="ghost" placeholder="Ghost variant" />
            <Input variant="filled" placeholder="Filled variant" />
          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Input Sizes - Mobile-First Touch Targets</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            All sizes meet mobile accessibility requirements for UB students
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input size="sm" placeholder="Small (32px height)" />
            <Input size="default" placeholder="Default (40px height)" />
            <Input size="lg" placeholder="Large (48px height)" />
            <Input size="xl" placeholder="Extra Large (56px height)" />
          </div>
        </CardContent>
      </Card>

      {/* Left/Right Elements Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Element System - Icons & Interactive Elements</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Sophisticated left/right element system with icons and interactive components
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Icon Examples */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Icon Elements:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Input leftIcon={<span>📧</span>} placeholder="Email with left icon" />
              <Input rightIcon={<span>🔍</span>} placeholder="Search with right icon" />
            </div>
          </div>

          {/* Complex Elements */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Complex Elements:</h4>
            <div className="space-y-4">
              <Input leftElement={<span className="text-[var(--hive-text-tertiary)] text-sm">https://</span>} placeholder="ub-student-tools.com" label="Tool URL" />
              <Input leftElement={<span className="text-[var(--hive-text-tertiary)]">$</span>} rightElement={<span className="text-[var(--hive-text-tertiary)] text-xs">USD</span>} placeholder="0.00" label="Budget Amount" />
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Specialized Input Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔧 SPECIALIZED</Badge>
            Specialized Input Components
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Built-in components for common campus input patterns
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Search Input */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Search Input with Clear Button:</h4>
            <SearchInput placeholder="Search UB spaces, tools, students..." label="Campus Search" helperText="Search across all UB campus resources" />
          </div>

          {/* Password Input */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Password Input with Show/Hide:</h4>
            <PasswordInput placeholder="Enter your password" label="UB Account Password" helperText="Use your UB HUB password" />
          </div>

          {/* Number Input */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Number Input with Controls:</h4>
            <NumberInput placeholder="18" label="Credit Hours" helperText="Semester credit hour load" min={1} max={21} />
          </div>

        </CardContent>
      </Card>

      {/* UB Campus Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Campus-Specific Input Presets
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-configured inputs for common University at Buffalo student needs
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Email Preset */}
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">UB Email Input:</h4>
              <InputPresets.Email label="UB Student Email" helperText="Use your @buffalo.edu address" />
            </div>

            {/* Phone Preset */}
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Phone Input:</h4>
              <InputPresets.Phone label="Contact Phone" helperText="For coordination and meetups" />
            </div>

            {/* URL Preset */}
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">URL Input:</h4>
              <InputPresets.URL label="Tool Repository" helperText="GitHub, portfolio, or project link" />
            </div>

            {/* Currency Preset */}
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Currency Input:</h4>
              <InputPresets.Currency label="Group Expense" helperText="Split cost for group activities" />
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Input Groups */}
      <Card>
        <CardHeader>
          <CardTitle>Input Groups - Complex Forms</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Grouped inputs for complex campus forms and coordination
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Student Profile Form */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Student Profile Setup:</h4>
            <InputGroup spacing="md">
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" required />
                <Input label="Last Name" placeholder="Smith" required />
              </div>
              <InputPresets.Email label="UB Email Address" required />
              <Input label="Major" placeholder="Computer Science & Engineering" helperText="Your declared or intended major" />
              <Input label="Dorm/Housing" placeholder="Hadley Village 123A" helperText="Current housing location" />
            </InputGroup>
          </div>

          {/* Space Creation Form */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Create Study Group Space:</h4>
            <InputGroup spacing="md">
              <Input label="Space Name" placeholder="CSE 331 Final Exam Prep" required />
              <Input label="Course Code" placeholder="CSE 331" helperText="Course or subject area" />
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Meeting Location" placeholder="Lockwood Library Level 2" />
                <Input label="Preferred Times" placeholder="Evenings, Weekends" />
              </div>
            </InputGroup>
          </div>

        </CardContent>
      </Card>

      {/* Real Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🏫 CAMPUS CONTEXT</Badge>
            Real UB Student Coordination Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Input configurations for actual University at Buffalo student needs
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Dorm Coordination */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Dorm Floor Coordination:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <Input label="Dorm Building" placeholder="Hadley Village" leftIcon={<span>🏠</span>} helperText="Select your residence hall" />
              <Input label="Floor/Wing" placeholder="2nd Floor East Wing" leftIcon={<span>📍</span>} helperText="For floor-specific coordination" />
              <SearchInput placeholder="Search roommates, floormates..." label="Find People" helperText="Connect with people in your area" />
            </div>
          </div>

          {/* Academic Collaboration */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Study Group Formation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <Input label="Course" placeholder="CSE 331 - Introduction to Algorithm Analysis" leftIcon={<span>📚</span>} helperText="Full course name and number" />
              <Input label="Semester" placeholder="Spring 2024" leftIcon={<span>📅</span>} />
              <Input label="Professor" placeholder="Dr. Smith" leftIcon={<span>👨‍🏫</span>} helperText="Help others find the right section" />
            </div>
          </div>

          {/* Campus Event Planning */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Event Planning:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <Input label="Event Name" placeholder="Computer Science Study Night" leftIcon={<span>🎯</span>} />
              <Input label="Location" placeholder="Knox 20 Computer Lab" leftIcon={<span>📍</span>} helperText="Include building and room number" />
              <Input label="RSVP Limit" placeholder="15" leftIcon={<span>👥</span>} helperText="Maximum number of participants" />
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(C=(N=c.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};var b,f,j;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">✨ MODERN FLOATING LABELS</Badge>
            Sleek Material Design Label Animation
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Clean floating label implementation with smooth transitions and proper state management
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Basic Floating Labels:</h4>
              <div className="space-y-4">
                <FloatingLabelInput label="Email Address" type="email" helperText="Enter your @buffalo.edu email" />
                <FloatingLabelInput label="Phone Number" type="tel" helperText="Format: (xxx) xxx-xxxx" />
                <FloatingLabelInput label="Message" helperText="What would you like to share?" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">State Variations:</h4>
              <div className="space-y-4">
                <FloatingLabelInput label="Expected Date" type="date" defaultValue="2024-08-12" />
                <FloatingLabelInput label="Error Example" error="This field is required" variant="error" />
                <FloatingLabelInput label="Success Example" success="Looks good!" variant="success" defaultValue="Valid input" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Campus Use Cases:</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <FloatingLabelInput label="UB Person Number" type="text" placeholder="50xxxxxx" helperText="8-digit UB ID" />
              <FloatingLabelInput label="Course Section" placeholder="CSE 331-LEC" helperText="Course and section" />
              <FloatingLabelInput label="Dorm Room" placeholder="Hadley 204B" helperText="Building and room number" />
            </div>
          </div>
          
        </CardContent>
      </Card>
      
    </div>
}`,...(j=(f=p.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};var I,S,E;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    placeholder: 'Interactive Input',
    variant: 'default',
    size: 'default',
    label: 'Label Text',
    helperText: 'Helper text example'
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Input Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different input configurations
          </p>
        </CardHeader>
        <CardContent>
          <Input {...args} />
        </CardContent>
      </Card>
    </div>
}`,...(E=(S=m.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};const k=["Default","CompleteShowcase","ModernFloatingLabels","Playground"];export{c as CompleteShowcase,o as Default,p as ModernFloatingLabels,m as Playground,k as __namedExportsOrder,M as default};
