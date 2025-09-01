import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{F as i,T as s,E as y,P as f}from"./form-field-VVMaDPKt.js";import{I as v}from"./input-enhanced-BwtnjkW5.js";import{S as l}from"./select-enhanced-BZv7thi2.js";import{T as b}from"./textarea-enhanced-CBMaYMDz.js";import{C as o}from"./checkbox-enhanced-C2e5iGSN.js";import{H as t,c as n,a as d,b as c}from"./hive-tokens-BKUtHA8Z.js";import{B as m}from"./badge-B09J4pcg.js";import{T as r}from"./text-Cao0VGB4.js";import{a}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-DJO9vBfz.js";import"./utils-CytzSlOG.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./v4-CtRu48qb.js";const G={title:"02-Molecules/Form Field - COMPLETE DEFINITION",component:i,parameters:{docs:{description:{component:`
## 📝 HIVE Form Field - Complete Molecule Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive form field wrapper for University at Buffalo HIVE platform data collection and user input.

### 🎯 **COMPONENT EXCELLENCE**
- **Universal Input Wrapper** - Works with any form control (input, textarea, select, checkbox)
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and states
- **Accessibility First** - Proper ARIA labels, descriptions, error announcements
- **Error State Management** - Integrated validation feedback with semantic styling
- **Required Field Indicators** - Visual and screen reader accessible required markers
- **Composed Variants** - Pre-built TextFormField, EmailFormField, PasswordFormField
- **Auto-Generated IDs** - Unique field identification for proper label association
- **Campus Form Integration** - Built for University at Buffalo student platform forms

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform forms:
- **Profile Setup** - Student onboarding forms with academic information
- **Space Creation** - Community building forms with validation
- **Tool Configuration** - HiveLAB tool settings and deployment forms
- **Event Planning** - Campus event creation with coordination details
- **Settings Management** - Privacy controls, notification preferences, account settings
- **Academic Integration** - Course enrollment, schedule preferences, study group formation
- **Contact Information** - Email, phone, dorm assignment, emergency contacts

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large touch targets and clear visual hierarchy
- **Responsive Labels** - Adaptive text sizing for mobile interfaces
- **Error Visibility** - Clear error messaging that doesn't break mobile layouts
- **Screen Reader Support** - Proper announcements for form validation states
`}}},tags:["autodocs"],argTypes:{label:{control:"text",description:"Field label text"},description:{control:"text",description:"Helper text description"},error:{control:"text",description:"Error message"},required:{control:"boolean",description:"Required field indicator"}}},u={args:{label:"Major",description:"Select your primary academic major at University at Buffalo",required:!0},render:g=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsx(t,{children:e.jsxs(n,{className:"space-y-4",children:[e.jsx(r,{variant:"body-md",color:"primary",children:"HIVE form field wrapper for University at Buffalo platform forms:"}),e.jsx(i,{...g,children:e.jsx(v,{placeholder:"Computer Science",onChange:a("field-changed")})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Accessible form field with label, description, and error state support"})]})})})},p={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(t,{children:[e.jsxs(d,{children:[e.jsxs(c,{className:"flex items-center gap-3",children:[e.jsx(m,{variant:"success",children:"📝 FORM FIELD TYPES"}),"Input Control Wrapper"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Universal form field wrapper supporting all input types for University at Buffalo HIVE platform forms"})]}),e.jsx(n,{children:e.jsx("div",{className:"space-y-8",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Input Control Support:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Text Input Fields:"}),e.jsx(i,{label:"Full Name",description:"Your full name as it appears on UB records",required:!0,children:e.jsx(v,{placeholder:"Sarah Chen",onChange:a("name-changed")})}),e.jsx(i,{label:"UB Handle",description:"Unique identifier for your HIVE profile",required:!0,children:e.jsx(v,{placeholder:"schen_cs",onChange:a("handle-changed")})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Select and Textarea:"}),e.jsx(i,{label:"Academic Year",description:"Current standing at University at Buffalo",required:!0,children:e.jsx(l,{placeholder:"Select year",options:[{value:"freshman",label:"Freshman"},{value:"sophomore",label:"Sophomore"},{value:"junior",label:"Junior"},{value:"senior",label:"Senior"},{value:"graduate",label:"Graduate Student"}],onChange:a("year-changed")})}),e.jsx(i,{label:"Academic Goals",description:"Describe your academic objectives and interests",children:e.jsx(b,{placeholder:"Focusing on software engineering and AI research...",onChange:a("goals-changed")})})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Checkbox Integration:"}),e.jsx(i,{label:"Privacy Settings",description:"Control visibility of your academic information",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{label:"Share course schedule with study groups",description:"Allow classmates to see your availability for collaboration",onChange:a("schedule-privacy-changed")}),e.jsx(o,{label:"Display major and year on profile",description:"Show academic information to other UB students",defaultChecked:!0,onChange:a("academic-display-changed")}),e.jsx(o,{label:"Enable study partner recommendations",description:"Receive suggestions for collaboration based on courses and interests",defaultChecked:!0,onChange:a("recommendations-changed")})]})})]})]})]})})})]}),e.jsxs(t,{children:[e.jsxs(d,{children:[e.jsxs(c,{className:"flex items-center gap-3",children:[e.jsx(m,{variant:"info",children:"🔧 COMPOSED VARIANTS"}),"Pre-built Form Components"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Ready-to-use form field variants for common University at Buffalo platform input patterns"})]}),e.jsx(n,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Common Field Types:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Basic Text Field:"}),e.jsx(s,{label:"Preferred Name",description:"What would you like to be called?",placeholder:"Sarah",onChange:a("preferred-name-changed")})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Email Field:"}),e.jsx(y,{label:"UB Email Address",description:"Your @buffalo.edu email address",placeholder:"schen@buffalo.edu",required:!0,onChange:a("email-changed")})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Password Field:"}),e.jsx(f,{label:"Account Password",description:"Create a secure password for your HIVE account",placeholder:"••••••••••••",required:!0,onChange:a("password-changed")})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Required Field:"}),e.jsx(s,{label:"Student ID",description:"Your University at Buffalo student identification number",placeholder:"50123456",required:!0,onChange:a("student-id-changed")})]})]})})]})})})]}),e.jsxs(t,{children:[e.jsxs(d,{children:[e.jsxs(c,{className:"flex items-center gap-3",children:[e.jsx(m,{variant:"primary",children:"⚠️ ERROR STATES"}),"Validation and Error Handling"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Form field error states for validation feedback and user guidance"})]}),e.jsx(n,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-medium text-[var(--hive-text-primary)]",children:"Validation Examples:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"red",weight:"medium",children:"Required Field Error:"}),e.jsx(y,{label:"UB Email Address",description:"Your @buffalo.edu email is required for verification",placeholder:"schen@buffalo.edu",required:!0,error:"University at Buffalo email address is required",onChange:a("email-error")})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"red",weight:"medium",children:"Format Validation Error:"}),e.jsx(s,{label:"UB Handle",description:"Choose a unique identifier (letters, numbers, underscore only)",placeholder:"schen_cs",required:!0,error:"Handle can only contain letters, numbers, and underscores",onChange:a("handle-error")})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"red",weight:"medium",children:"Duplicate Value Error:"}),e.jsx(s,{label:"Space Name",description:"Choose a name for your new study space",placeholder:"CSE 331 Algorithm Study Group",required:!0,error:"A space with this name already exists",onChange:a("space-name-error")})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"red",weight:"medium",children:"Password Strength Error:"}),e.jsx(f,{label:"New Password",description:"Password must be at least 8 characters with mixed case and numbers",required:!0,error:"Password must contain at least one uppercase letter and one number",onChange:a("password-error")})]})]})})]})})})]}),e.jsxs(t,{children:[e.jsxs(d,{children:[e.jsxs(c,{className:"flex items-center gap-3",children:[e.jsx(m,{variant:"primary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Form Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Form field usage in actual University at Buffalo student registration and platform configuration contexts"})]}),e.jsxs(n,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Student Onboarding Profile Setup:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{as:"h3",variant:"heading-sm",color:"primary",children:"New UB Student Registration Form"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Personal Information:"}),e.jsx(s,{label:"Full Name",description:"Name as it appears on your UB student records",placeholder:"Sarah Chen",required:!0,onChange:a("onboard-name")}),e.jsx(y,{label:"UB Email",description:"Your @buffalo.edu email address for verification",placeholder:"schen@buffalo.edu",required:!0,onChange:a("onboard-email")}),e.jsx(i,{label:"Residence Hall",description:"Where do you live on campus?",children:e.jsx(l,{placeholder:"Select residence hall",options:[{value:"ellicott",label:"Ellicott Complex"},{value:"governors",label:"Governors Complex"},{value:"south",label:"South Campus Apartments"},{value:"flint",label:"Flint Loop"},{value:"offcampus",label:"Off-Campus"}],onChange:a("onboard-residence")})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Academic Information:"}),e.jsx(i,{label:"School/Department",description:"Your primary academic school at UB",required:!0,children:e.jsx(l,{placeholder:"Select school",options:[{value:"seas",label:"School of Engineering and Applied Sciences"},{value:"artsci",label:"College of Arts and Sciences"},{value:"management",label:"School of Management"},{value:"medicine",label:"Jacobs School of Medicine"},{value:"education",label:"Graduate School of Education"}],onChange:a("onboard-school")})}),e.jsx(s,{label:"Major",description:"Your primary field of study",placeholder:"Computer Science",required:!0,onChange:a("onboard-major")}),e.jsx(i,{label:"Academic Year",description:"Current academic standing",required:!0,children:e.jsx(l,{placeholder:"Select year",options:[{value:"freshman",label:"Freshman"},{value:"sophomore",label:"Sophomore"},{value:"junior",label:"Junior"},{value:"senior",label:"Senior"},{value:"graduate",label:"Graduate Student"}],onChange:a("onboard-year")})})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Campus Space Creation Form:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Space Details:"}),e.jsx(s,{label:"Space Name",description:"What would you like to call your community space?",placeholder:"CSE 331 Algorithm Analysis Study Group",required:!0,onChange:a("space-name")}),e.jsx(i,{label:"Space Type",description:"What kind of community are you creating?",required:!0,children:e.jsx(l,{placeholder:"Select space type",options:[{value:"study",label:"Study Group"},{value:"course",label:"Course Community"},{value:"project",label:"Project Team"},{value:"social",label:"Social Group"},{value:"residential",label:"Residential Community"},{value:"organization",label:"Student Organization"}],onChange:a("space-type")})}),e.jsx(i,{label:"Space Description",description:"Describe the purpose and goals of your space",required:!0,children:e.jsx(b,{placeholder:"A collaborative study group for UB computer science students taking Algorithm Analysis. We meet weekly to discuss problem sets, prepare for exams, and work on coding projects together.",onChange:a("space-description")})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Space Settings:"}),e.jsx(i,{label:"Privacy Settings",description:"Who can discover and join your space?",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{label:"Public space",description:"Allow any UB student to discover and join",defaultChecked:!0,onChange:a("space-public")}),e.jsx(o,{label:"Course-specific",description:"Only students enrolled in CSE 331 can join",onChange:a("space-course-specific")}),e.jsx(o,{label:"Invitation required",description:"Members must be invited to join",onChange:a("space-invite-only")})]})}),e.jsx(i,{label:"Meeting Information",description:"When and where does your group typically meet?",children:e.jsx(b,{placeholder:"Wednesdays 7-9pm in Lockwood Library Study Room 240. Also available for online study sessions via Discord.",onChange:a("space-meeting-info")})})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Platform Settings & Preferences:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Privacy Controls:"}),e.jsx(i,{label:"Profile Visibility",description:"Control who can see your profile information",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{label:"Show profile to UB students",description:"Let other University at Buffalo students find your profile",defaultChecked:!0,onChange:a("profile-visibility")}),e.jsx(o,{label:"Display academic information",description:"Show your major, year, and course enrollment",defaultChecked:!0,onChange:a("academic-visibility")}),e.jsx(o,{label:"Enable Ghost Mode",description:"Hide your activity status and online presence",onChange:a("ghost-mode")})]})}),e.jsx(i,{label:"Contact Preferences",description:"How can other students reach you?",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{label:"Allow direct messages",description:"Let other UB students send you private messages",defaultChecked:!0,onChange:a("direct-messages")}),e.jsx(o,{label:"Study group invitations",description:"Receive invitations to join academic study groups",defaultChecked:!0,onChange:a("study-invites")}),e.jsx(o,{label:"Tool collaboration requests",description:"Allow requests to collaborate on tools and projects",onChange:a("tool-collaboration")})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Notification Settings:"}),e.jsx(i,{label:"Email Notifications",description:"Choose what email updates you want to receive",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{label:"Space activity digest",description:"Weekly summary of activity in your joined spaces",defaultChecked:!0,onChange:a("email-digest")}),e.jsx(o,{label:"Assignment reminders",description:"Email notifications 24 hours before due dates",defaultChecked:!0,onChange:a("assignment-reminders")}),e.jsx(o,{label:"Tool deployment notifications",description:"Updates when your tools are used or shared",onChange:a("tool-notifications")})]})}),e.jsx(i,{label:"Platform Integration",description:"Connect with external services",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(o,{label:"Sync with Google Calendar",description:"Automatically add HIVE events to your calendar",onChange:a("google-calendar")}),e.jsx(o,{label:"Import course schedule",description:"Connect with UB academic systems for schedule sync",onChange:a("course-schedule-sync")}),e.jsx(o,{label:"Enable browser notifications",description:"Get real-time notifications in your browser",defaultChecked:!0,onChange:a("browser-notifications")})]})})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Mobile Form Optimization:"}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6",children:[e.jsx(r,{variant:"body-md",color:"primary",children:"Mobile-optimized form fields for on-campus platform usage:"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Quick Profile Update:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4",children:[e.jsx(s,{label:"Current Status",description:"Let your study partners know what you're working on",placeholder:"Studying for CSE 331 midterm in Lockwood",onChange:a("mobile-status")}),e.jsx(i,{label:"Availability",description:"When are you free for study sessions?",children:e.jsx(l,{placeholder:"Select availability",options:[{value:"available",label:"Available now"},{value:"busy",label:"Busy until evening"},{value:"studying",label:"In study session"},{value:"class",label:"In class"},{value:"offline",label:"Offline"}],onChange:a("mobile-availability")})})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{variant:"body-sm",color:"gold",weight:"medium",children:"Quick Space Actions:"}),e.jsxs("div",{className:"p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4",children:[e.jsx(s,{label:"Study Session Title",description:"What are you working on together?",placeholder:"Algorithm problem set review",onChange:a("mobile-session-title")}),e.jsx(i,{label:"Session Type",description:"What kind of study session is this?",children:e.jsx(l,{placeholder:"Select session type",options:[{value:"homework",label:"Homework help"},{value:"exam-prep",label:"Exam preparation"},{value:"project",label:"Project work"},{value:"concept-review",label:"Concept review"},{value:"coding",label:"Coding practice"}],onChange:a("mobile-session-type")})})]})]})]})]})]})]})]})]})},h={args:{label:"Field Label",description:"Helper text for the field",required:!1,error:""},render:g=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(t,{children:[e.jsxs(d,{children:[e.jsx(c,{children:"Form Field Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different form field configurations"})]}),e.jsx(n,{className:"p-6",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{...g,children:e.jsx(v,{placeholder:"Enter value...",onChange:a("playground-changed")})}),e.jsx(r,{variant:"body-sm",color:"secondary",children:"Interactive form field testing for University at Buffalo HIVE platform interface design"})]})})]})})};var x,C,j;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'Major',
    description: 'Select your primary academic major at University at Buffalo',
    required: true
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE form field wrapper for University at Buffalo platform forms:
          </Text>
          <FormField {...args}>
            <Input placeholder="Computer Science" onChange={action('field-changed')} />
          </FormField>
          <Text variant="body-sm" color="secondary">
            Accessible form field with label, description, and error state support
          </Text>
        </CardContent>
      </Card>
    </div>
}`,...(j=(C=u.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var F,N,S;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Form Field Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">📝 FORM FIELD TYPES</Badge>
            Input Control Wrapper
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Universal form field wrapper supporting all input types for University at Buffalo HIVE platform forms
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Input Control Support:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Text Input Fields:</Text>
                    
                    <FormField label="Full Name" description="Your full name as it appears on UB records" required>
                      <Input placeholder="Sarah Chen" onChange={action('name-changed')} />
                    </FormField>
                    
                    <FormField label="UB Handle" description="Unique identifier for your HIVE profile" required>
                      <Input placeholder="schen_cs" onChange={action('handle-changed')} />
                    </FormField>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Select and Textarea:</Text>
                    
                    <FormField label="Academic Year" description="Current standing at University at Buffalo" required>
                      <Select placeholder="Select year" options={[{
                      value: 'freshman',
                      label: 'Freshman'
                    }, {
                      value: 'sophomore',
                      label: 'Sophomore'
                    }, {
                      value: 'junior',
                      label: 'Junior'
                    }, {
                      value: 'senior',
                      label: 'Senior'
                    }, {
                      value: 'graduate',
                      label: 'Graduate Student'
                    }]} onChange={action('year-changed')} />
                    </FormField>
                    
                    <FormField label="Academic Goals" description="Describe your academic objectives and interests">
                      <Textarea placeholder="Focusing on software engineering and AI research..." onChange={action('goals-changed')} />
                    </FormField>
                  </div>

                </div>

                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Checkbox Integration:</Text>
                  <FormField label="Privacy Settings" description="Control visibility of your academic information">
                    <div className="space-y-3">
                      <Checkbox label="Share course schedule with study groups" description="Allow classmates to see your availability for collaboration" onChange={action('schedule-privacy-changed')} />
                      <Checkbox label="Display major and year on profile" description="Show academic information to other UB students" defaultChecked onChange={action('academic-display-changed')} />
                      <Checkbox label="Enable study partner recommendations" description="Receive suggestions for collaboration based on courses and interests" defaultChecked onChange={action('recommendations-changed')} />
                    </div>
                  </FormField>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Composed Form Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🔧 COMPOSED VARIANTS</Badge>
            Pre-built Form Components
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Ready-to-use form field variants for common University at Buffalo platform input patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Common Field Types:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Basic Text Field:</Text>
                    <TextFormField label="Preferred Name" description="What would you like to be called?" placeholder="Sarah" onChange={action('preferred-name-changed')} />
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Email Field:</Text>
                    <EmailFormField label="UB Email Address" description="Your @buffalo.edu email address" placeholder="schen@buffalo.edu" required onChange={action('email-changed')} />
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Password Field:</Text>
                    <PasswordFormField label="Account Password" description="Create a secure password for your HIVE account" placeholder="••••••••••••" required onChange={action('password-changed')} />
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Required Field:</Text>
                    <TextFormField label="Student ID" description="Your University at Buffalo student identification number" placeholder="50123456" required onChange={action('student-id-changed')} />
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Error States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚠️ ERROR STATES</Badge>
            Validation and Error Handling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Form field error states for validation feedback and user guidance
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Validation Examples:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="red" weight="medium">Required Field Error:</Text>
                    <EmailFormField label="UB Email Address" description="Your @buffalo.edu email is required for verification" placeholder="schen@buffalo.edu" required error="University at Buffalo email address is required" onChange={action('email-error')} />
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="red" weight="medium">Format Validation Error:</Text>
                    <TextFormField label="UB Handle" description="Choose a unique identifier (letters, numbers, underscore only)" placeholder="schen_cs" required error="Handle can only contain letters, numbers, and underscores" onChange={action('handle-error')} />
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="red" weight="medium">Duplicate Value Error:</Text>
                    <TextFormField label="Space Name" description="Choose a name for your new study space" placeholder="CSE 331 Algorithm Study Group" required error="A space with this name already exists" onChange={action('space-name-error')} />
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="red" weight="medium">Password Strength Error:</Text>
                    <PasswordFormField label="New Password" description="Password must be at least 8 characters with mixed case and numbers" required error="Password must contain at least one uppercase letter and one number" onChange={action('password-error')} />
                  </div>

                </div>

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
            Real Campus Form Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Form field usage in actual University at Buffalo student registration and platform configuration contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Onboarding */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Onboarding Profile Setup:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  New UB Student Registration Form
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Personal Information:</Text>
                    
                    <TextFormField label="Full Name" description="Name as it appears on your UB student records" placeholder="Sarah Chen" required onChange={action('onboard-name')} />
                    
                    <EmailFormField label="UB Email" description="Your @buffalo.edu email address for verification" placeholder="schen@buffalo.edu" required onChange={action('onboard-email')} />
                    
                    <FormField label="Residence Hall" description="Where do you live on campus?">
                      <Select placeholder="Select residence hall" options={[{
                      value: 'ellicott',
                      label: 'Ellicott Complex'
                    }, {
                      value: 'governors',
                      label: 'Governors Complex'
                    }, {
                      value: 'south',
                      label: 'South Campus Apartments'
                    }, {
                      value: 'flint',
                      label: 'Flint Loop'
                    }, {
                      value: 'offcampus',
                      label: 'Off-Campus'
                    }]} onChange={action('onboard-residence')} />
                    </FormField>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Information:</Text>
                    
                    <FormField label="School/Department" description="Your primary academic school at UB" required>
                      <Select placeholder="Select school" options={[{
                      value: 'seas',
                      label: 'School of Engineering and Applied Sciences'
                    }, {
                      value: 'artsci',
                      label: 'College of Arts and Sciences'
                    }, {
                      value: 'management',
                      label: 'School of Management'
                    }, {
                      value: 'medicine',
                      label: 'Jacobs School of Medicine'
                    }, {
                      value: 'education',
                      label: 'Graduate School of Education'
                    }]} onChange={action('onboard-school')} />
                    </FormField>
                    
                    <TextFormField label="Major" description="Your primary field of study" placeholder="Computer Science" required onChange={action('onboard-major')} />
                    
                    <FormField label="Academic Year" description="Current academic standing" required>
                      <Select placeholder="Select year" options={[{
                      value: 'freshman',
                      label: 'Freshman'
                    }, {
                      value: 'sophomore',
                      label: 'Sophomore'
                    }, {
                      value: 'junior',
                      label: 'Junior'
                    }, {
                      value: 'senior',
                      label: 'Senior'
                    }, {
                      value: 'graduate',
                      label: 'Graduate Student'
                    }]} onChange={action('onboard-year')} />
                    </FormField>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Space Creation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Space Creation Form:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Space Details:</Text>
                  
                  <TextFormField label="Space Name" description="What would you like to call your community space?" placeholder="CSE 331 Algorithm Analysis Study Group" required onChange={action('space-name')} />
                  
                  <FormField label="Space Type" description="What kind of community are you creating?" required>
                    <Select placeholder="Select space type" options={[{
                    value: 'study',
                    label: 'Study Group'
                  }, {
                    value: 'course',
                    label: 'Course Community'
                  }, {
                    value: 'project',
                    label: 'Project Team'
                  }, {
                    value: 'social',
                    label: 'Social Group'
                  }, {
                    value: 'residential',
                    label: 'Residential Community'
                  }, {
                    value: 'organization',
                    label: 'Student Organization'
                  }]} onChange={action('space-type')} />
                  </FormField>
                  
                  <FormField label="Space Description" description="Describe the purpose and goals of your space" required>
                    <Textarea placeholder="A collaborative study group for UB computer science students taking Algorithm Analysis. We meet weekly to discuss problem sets, prepare for exams, and work on coding projects together." onChange={action('space-description')} />
                  </FormField>
                </div>

                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Space Settings:</Text>
                  
                  <FormField label="Privacy Settings" description="Who can discover and join your space?">
                    <div className="space-y-3">
                      <Checkbox label="Public space" description="Allow any UB student to discover and join" defaultChecked onChange={action('space-public')} />
                      <Checkbox label="Course-specific" description="Only students enrolled in CSE 331 can join" onChange={action('space-course-specific')} />
                      <Checkbox label="Invitation required" description="Members must be invited to join" onChange={action('space-invite-only')} />
                    </div>
                  </FormField>
                  
                  <FormField label="Meeting Information" description="When and where does your group typically meet?">
                    <Textarea placeholder="Wednesdays 7-9pm in Lockwood Library Study Room 240. Also available for online study sessions via Discord." onChange={action('space-meeting-info')} />
                  </FormField>
                </div>

              </div>

            </div>
          </div>

          {/* Settings Management */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Platform Settings & Preferences:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Privacy Controls:</Text>
                  
                  <FormField label="Profile Visibility" description="Control who can see your profile information">
                    <div className="space-y-3">
                      <Checkbox label="Show profile to UB students" description="Let other University at Buffalo students find your profile" defaultChecked onChange={action('profile-visibility')} />
                      <Checkbox label="Display academic information" description="Show your major, year, and course enrollment" defaultChecked onChange={action('academic-visibility')} />
                      <Checkbox label="Enable Ghost Mode" description="Hide your activity status and online presence" onChange={action('ghost-mode')} />
                    </div>
                  </FormField>
                  
                  <FormField label="Contact Preferences" description="How can other students reach you?">
                    <div className="space-y-3">
                      <Checkbox label="Allow direct messages" description="Let other UB students send you private messages" defaultChecked onChange={action('direct-messages')} />
                      <Checkbox label="Study group invitations" description="Receive invitations to join academic study groups" defaultChecked onChange={action('study-invites')} />
                      <Checkbox label="Tool collaboration requests" description="Allow requests to collaborate on tools and projects" onChange={action('tool-collaboration')} />
                    </div>
                  </FormField>
                </div>

                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Notification Settings:</Text>
                  
                  <FormField label="Email Notifications" description="Choose what email updates you want to receive">
                    <div className="space-y-3">
                      <Checkbox label="Space activity digest" description="Weekly summary of activity in your joined spaces" defaultChecked onChange={action('email-digest')} />
                      <Checkbox label="Assignment reminders" description="Email notifications 24 hours before due dates" defaultChecked onChange={action('assignment-reminders')} />
                      <Checkbox label="Tool deployment notifications" description="Updates when your tools are used or shared" onChange={action('tool-notifications')} />
                    </div>
                  </FormField>
                  
                  <FormField label="Platform Integration" description="Connect with external services">
                    <div className="space-y-3">
                      <Checkbox label="Sync with Google Calendar" description="Automatically add HIVE events to your calendar" onChange={action('google-calendar')} />
                      <Checkbox label="Import course schedule" description="Connect with UB academic systems for schedule sync" onChange={action('course-schedule-sync')} />
                      <Checkbox label="Enable browser notifications" description="Get real-time notifications in your browser" defaultChecked onChange={action('browser-notifications')} />
                    </div>
                  </FormField>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Form Optimization */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Form Optimization:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized form fields for on-campus platform usage:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Profile Update:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                    <TextFormField label="Current Status" description="Let your study partners know what you're working on" placeholder="Studying for CSE 331 midterm in Lockwood" onChange={action('mobile-status')} />
                    <FormField label="Availability" description="When are you free for study sessions?">
                      <Select placeholder="Select availability" options={[{
                      value: 'available',
                      label: 'Available now'
                    }, {
                      value: 'busy',
                      label: 'Busy until evening'
                    }, {
                      value: 'studying',
                      label: 'In study session'
                    }, {
                      value: 'class',
                      label: 'In class'
                    }, {
                      value: 'offline',
                      label: 'Offline'
                    }]} onChange={action('mobile-availability')} />
                    </FormField>
                  </div>
                </div>

                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Space Actions:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-4">
                    <TextFormField label="Study Session Title" description="What are you working on together?" placeholder="Algorithm problem set review" onChange={action('mobile-session-title')} />
                    <FormField label="Session Type" description="What kind of study session is this?">
                      <Select placeholder="Select session type" options={[{
                      value: 'homework',
                      label: 'Homework help'
                    }, {
                      value: 'exam-prep',
                      label: 'Exam preparation'
                    }, {
                      value: 'project',
                      label: 'Project work'
                    }, {
                      value: 'concept-review',
                      label: 'Concept review'
                    }, {
                      value: 'coding',
                      label: 'Coding practice'
                    }]} onChange={action('mobile-session-type')} />
                    </FormField>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(S=(N=p.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var w,T,k;h.parameters={...h.parameters,docs:{...(w=h.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Field Label',
    description: 'Helper text for the field',
    required: false,
    error: ''
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Form Field Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different form field configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <FormField {...args}>
              <Input placeholder="Enter value..." onChange={action('playground-changed')} />
            </FormField>
            <Text variant="body-sm" color="secondary">
              Interactive form field testing for University at Buffalo HIVE platform interface design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
}`,...(k=(T=h.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};const Y=["Default","CompleteShowcase","Playground"];export{p as CompleteShowcase,u as Default,h as Playground,Y as __namedExportsOrder,G as default};
