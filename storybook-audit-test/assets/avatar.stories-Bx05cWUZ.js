import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{A as t}from"./avatar-BAPm_Prc.js";import{H as s,a,b as i,c as r}from"./hive-tokens-CKIUfcHM.js";import{B as n}from"./badge-CR1yj3dt.js";import"./index-DJO9vBfz.js";import"./utils-CytzSlOG.js";import"./user-CFaOcM52.js";import"./createLucideIcon-WpwZgzX-.js";import"./index-BwobEAja.js";import"./framer-motion-proxy-Bzlf7Pk2.js";const T={title:"01-Atoms/Avatar - COMPLETE DEFINITION",component:t,parameters:{docs:{description:{component:`
## 🎯 HIVE Avatar - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated avatar system for University at Buffalo campus social coordination.

### 🏆 **COMPONENT EXCELLENCE**
- **6 Size Options** - From tiny (24px) to profile hero (80px)
- **5 Status Indicators** - Online, offline, away (gold outline), busy, ghost
- **Campus Privacy Modes** - Public, ghost mode, anonymous coordination
- **Social Platform Features** - Student roles, residential affiliations
- **Perfect Fallback System** - Image → Initials → Custom → Default icon
- **Interactive States** - Hover, focus, click with gold outline accent
- **Mobile Optimized** - All sizes work perfectly on touch devices

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo student coordination:
- **Student Identification** - Profile pictures for study groups and spaces
- **Status Awareness** - Know when classmates are available for coordination
- **Privacy Controls** - Ghost mode for low-key campus presence
- **Residential Coordination** - Dorm floor avatars and wing identification
- **Academic Collaboration** - Class project team member identification
`}}},tags:["autodocs"],argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl","2xl"],description:"Avatar size (all optimized for mobile touch)"},status:{control:"select",options:["online","offline","away","busy","ghost"],description:"Status indicator (away uses gold outline)"},privacy:{control:"select",options:["public","ghost","anonymous"],description:"Privacy mode for campus coordination"},interactive:{control:"boolean",description:"Enable hover and click interactions"},initials:{control:"text",description:"Fallback initials when no image"}}},c={args:{initials:"JS",size:"md",status:"online"}},l={render:()=>e.jsxs("div",{className:"space-y-8 p-6 bg-[var(--hive-background-primary)]",children:[e.jsxs(s,{children:[e.jsxs(a,{children:[e.jsxs(i,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"primary",children:"✅ SIZES"}),"Avatar Sizes - Mobile-First Touch Optimization"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"6 sizes optimized for different campus coordination contexts"})]}),e.jsx(r,{children:e.jsxs("div",{className:"flex items-center gap-6 flex-wrap",children:[e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{size:"xs",initials:"XS"}),e.jsxs("p",{className:"text-xs text-[var(--hive-text-muted)]",children:["XS (24px)",e.jsx("br",{}),"Compact lists"]})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{size:"sm",initials:"SM"}),e.jsxs("p",{className:"text-xs text-[var(--hive-text-muted)]",children:["SM (32px)",e.jsx("br",{}),"Small cards"]})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{size:"md",initials:"MD"}),e.jsxs("p",{className:"text-xs text-[var(--hive-text-muted)]",children:["MD (40px)",e.jsx("br",{}),"Default size"]})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{size:"lg",initials:"LG"}),e.jsxs("p",{className:"text-xs text-[var(--hive-text-muted)]",children:["LG (48px)",e.jsx("br",{}),"Member cards"]})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{size:"xl",initials:"XL"}),e.jsxs("p",{className:"text-xs text-[var(--hive-text-muted)]",children:["XL (64px)",e.jsx("br",{}),"Profile headers"]})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{size:"2xl",initials:"2XL"}),e.jsxs("p",{className:"text-xs text-[var(--hive-text-muted)]",children:["2XL (80px)",e.jsx("br",{}),"Hero profiles"]})]})]})})]}),e.jsxs(s,{children:[e.jsxs(a,{children:[e.jsxs(i,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"secondary",children:"🟢 STATUS"}),"Status Indicators - Campus Availability"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Status indicators for coordinating with other UB students (away uses gold outline only)"})]}),e.jsx(r,{children:e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-5 gap-6",children:[e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",alt:"Online student",size:"lg",status:"online"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Online"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Available for coordination"})]})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face",alt:"Away student",size:"lg",status:"away"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Away"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Gold outline (never fill)"})]})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Busy student",size:"lg",status:"busy"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Busy"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"In class/studying"})]})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",alt:"Offline student",size:"lg",status:"offline"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Offline"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Not available"})]})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",alt:"Ghost mode student",size:"lg",status:"ghost"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Ghost"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Low-key presence"})]})]})]})})]}),e.jsxs(s,{children:[e.jsxs(a,{children:[e.jsxs(i,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"secondary",children:"🔒 PRIVACY"}),"Privacy Modes - Campus Coordination Control"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Privacy controls for different levels of campus visibility"})]}),e.jsx(r,{children:e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",alt:"Public profile",size:"lg",privacy:"public",status:"online"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Public"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Full visibility in spaces"})]})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face",alt:"Ghost mode",size:"lg",privacy:"ghost",status:"away"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Ghost Mode"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Reduced opacity for low-key presence"})]})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{initials:"AN",size:"lg",privacy:"anonymous",status:"online"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Anonymous"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Dashed border for anonymous coordination"})]})]})]})})]}),e.jsxs(s,{children:[e.jsxs(a,{children:[e.jsxs(i,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"secondary",children:"🔄 FALLBACKS"}),"Fallback System - Graceful Degradation"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Smart fallback system: Image → Initials → Custom → Default icon"})]}),e.jsx(r,{children:e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-6",children:[e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Profile image",size:"lg",status:"online"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Image"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Primary: Profile photo"})]})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{initials:"JS",size:"lg",status:"away"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Initials"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Fallback: User initials"})]})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{placeholder:e.jsx("span",{className:"text-2xl",children:"🦌"}),size:"lg",status:"online"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Custom"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Custom: UB mascot"})]})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{size:"lg",status:"offline"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Default"}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Final: User icon"})]})]})]})})]}),e.jsxs(s,{children:[e.jsxs(a,{children:[e.jsxs(i,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"secondary",children:"👆 INTERACTIVE"}),"Interactive States - Gold Outline Hover"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Interactive avatars with hover effects and gold outline focus states"})]}),e.jsx(r,{children:e.jsxs("div",{className:"flex gap-6 flex-wrap",children:[e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",alt:"Interactive avatar",size:"lg",status:"online",interactive:!0}),e.jsx("p",{className:"text-sm text-[var(--hive-text-muted)]",children:"Hover me!"})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{initials:"CS",size:"lg",status:"away",interactive:!0}),e.jsx("p",{className:"text-sm text-[var(--hive-text-muted)]",children:"Click to view profile"})]}),e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face",alt:"Interactive avatar",size:"lg",status:"busy",interactive:!0}),e.jsx("p",{className:"text-sm text-[var(--hive-text-muted)]",children:"Focus for accessibility"})]})]})})]}),e.jsxs(s,{children:[e.jsxs(a,{children:[e.jsxs(i,{className:"flex items-center gap-3",children:[e.jsx(n,{variant:"secondary",children:"🦌 UNIVERSITY AT BUFFALO"}),"Real Campus Coordination Scenarios"]}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Avatar usage in actual University at Buffalo student coordination contexts"})]}),e.jsxs(r,{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"CSE 331 Study Group Members:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",alt:"John Smith",size:"md",status:"online",interactive:!0}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"John S."}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Group Leader"})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face",alt:"Emily Chen",size:"md",status:"away",interactive:!0}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Emily C."}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"CS Major"})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(t,{initials:"MR",size:"md",status:"busy",interactive:!0}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Mike R."}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"In class"})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",alt:"Sarah Wilson",size:"md",status:"offline",interactive:!0}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Sarah W."}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Offline"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Hadley Village 2nd Floor East:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:e.jsxs("div",{className:"grid grid-cols-4 md:grid-cols-6 gap-4",children:[e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Room 201",size:"sm",status:"online",interactive:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"201A"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{initials:"JD",size:"sm",status:"away",interactive:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"201B"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face",alt:"Room 202",size:"sm",status:"busy",interactive:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"202A"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{initials:"KL",size:"sm",status:"offline",privacy:"ghost",interactive:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"202B"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",alt:"Room 203",size:"sm",status:"online",interactive:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"203A"})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{initials:"RA",size:"sm",status:"online",placeholder:e.jsx("span",{className:"text-lg",children:"🔑"}),interactive:!0}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"RA"})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-[var(--hive-text-primary)]",children:"Capstone Project Team - Smart Campus Tool:"}),e.jsx("div",{className:"bg-[var(--hive-background-secondary)] p-4 rounded-lg",children:e.jsxs("div",{className:"flex gap-6 items-center flex-wrap",children:[e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",alt:"Project lead",size:"xl",status:"online",interactive:!0}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-[var(--hive-text-primary)]",children:"Alex K."}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Project Lead"}),e.jsx("p",{className:"text-xs text-[var(--hive-brand-secondary)]",children:"Frontend Dev"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face",alt:"Backend dev",size:"lg",status:"busy",interactive:!0}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Maria L."}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Backend"})]})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{initials:"DW",size:"lg",status:"away",interactive:!0}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"David W."}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"UI/UX"})]})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx(t,{src:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",alt:"Data analyst",size:"lg",status:"online",interactive:!0}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Lisa P."}),e.jsx("p",{className:"text-xs text-[var(--hive-text-muted)]",children:"Data"})]})]})]})]})})]})]})]})]})},d={args:{initials:"UB",size:"lg",status:"online",privacy:"public",interactive:!0},render:y=>e.jsx("div",{className:"p-6 bg-[var(--hive-background-primary)]",children:e.jsxs(s,{children:[e.jsxs(a,{children:[e.jsx(i,{children:"Avatar Playground"}),e.jsx("p",{className:"text-[var(--hive-text-muted)]",children:"Use the controls to test different avatar configurations"})]}),e.jsx(r,{className:"flex justify-center",children:e.jsx(t,{...y})})]})})};var o,m,x;c.parameters={...c.parameters,docs:{...(o=c.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    initials: 'JS',
    size: 'md',
    status: 'online'
  }
}`,...(x=(m=c.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var p,v,h;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">✅ SIZES</Badge>
            Avatar Sizes - Mobile-First Touch Optimization
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 sizes optimized for different campus coordination contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center space-y-2">
              <Avatar size="xs" initials="XS" />
              <p className="text-xs text-[var(--hive-text-muted)]">XS (24px)<br />Compact lists</p>
            </div>
            <div className="text-center space-y-2">
              <Avatar size="sm" initials="SM" />
              <p className="text-xs text-[var(--hive-text-muted)]">SM (32px)<br />Small cards</p>
            </div>
            <div className="text-center space-y-2">
              <Avatar size="md" initials="MD" />
              <p className="text-xs text-[var(--hive-text-muted)]">MD (40px)<br />Default size</p>
            </div>
            <div className="text-center space-y-2">
              <Avatar size="lg" initials="LG" />
              <p className="text-xs text-[var(--hive-text-muted)]">LG (48px)<br />Member cards</p>
            </div>
            <div className="text-center space-y-2">
              <Avatar size="xl" initials="XL" />
              <p className="text-xs text-[var(--hive-text-muted)]">XL (64px)<br />Profile headers</p>
            </div>
            <div className="text-center space-y-2">
              <Avatar size="2xl" initials="2XL" />
              <p className="text-xs text-[var(--hive-text-muted)]">2XL (80px)<br />Hero profiles</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🟢 STATUS</Badge>
            Status Indicators - Campus Availability
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Status indicators for coordinating with other UB students (away uses gold outline only)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center space-y-3">
              <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Online student" size="lg" status="online" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Online</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Available for coordination</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face" alt="Away student" size="lg" status="away" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Away</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Gold outline (never fill)</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Busy student" size="lg" status="busy" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Busy</p>
                <p className="text-xs text-[var(--hive-text-muted)]">In class/studying</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" alt="Offline student" size="lg" status="offline" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Offline</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Not available</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" alt="Ghost mode student" size="lg" status="ghost" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Ghost</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Low-key presence</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Modes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔒 PRIVACY</Badge>
            Privacy Modes - Campus Coordination Control
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Privacy controls for different levels of campus visibility
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Public profile" size="lg" privacy="public" status="online" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Public</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Full visibility in spaces</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face" alt="Ghost mode" size="lg" privacy="ghost" status="away" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Ghost Mode</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Reduced opacity for low-key presence</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar initials="AN" size="lg" privacy="anonymous" status="online" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Anonymous</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Dashed border for anonymous coordination</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fallback System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔄 FALLBACKS</Badge>
            Fallback System - Graceful Degradation
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Smart fallback system: Image → Initials → Custom → Default icon
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Profile image" size="lg" status="online" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Image</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Primary: Profile photo</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar initials="JS" size="lg" status="away" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Initials</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Fallback: User initials</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar placeholder={<span className="text-2xl">🦌</span>} size="lg" status="online" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Custom</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Custom: UB mascot</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <Avatar size="lg" status="offline" />
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Default</p>
                <p className="text-xs text-[var(--hive-text-muted)]">Final: User icon</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">👆 INTERACTIVE</Badge>
            Interactive States - Gold Outline Hover
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive avatars with hover effects and gold outline focus states
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 flex-wrap">
            <div className="text-center space-y-3">
              <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Interactive avatar" size="lg" status="online" interactive={true} />
              <p className="text-sm text-[var(--hive-text-muted)]">Hover me!</p>
            </div>
            <div className="text-center space-y-3">
              <Avatar initials="CS" size="lg" status="away" interactive={true} />
              <p className="text-sm text-[var(--hive-text-muted)]">Click to view profile</p>
            </div>
            <div className="text-center space-y-3">
              <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face" alt="Interactive avatar" size="lg" status="busy" interactive={true} />
              <p className="text-sm text-[var(--hive-text-muted)]">Focus for accessibility</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Coordination Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Avatar usage in actual University at Buffalo student coordination contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Study Group Members */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 331 Study Group Members:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="John Smith" size="md" status="online" interactive={true} />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">John S.</p>
                    <p className="text-xs text-[var(--hive-text-muted)]">Group Leader</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face" alt="Emily Chen" size="md" status="away" interactive={true} />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">Emily C.</p>
                    <p className="text-xs text-[var(--hive-text-muted)]">CS Major</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar initials="MR" size="md" status="busy" interactive={true} />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">Mike R.</p>
                    <p className="text-xs text-[var(--hive-text-muted)]">In class</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" alt="Sarah Wilson" size="md" status="offline" interactive={true} />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">Sarah W.</p>
                    <p className="text-xs text-[var(--hive-text-muted)]">Offline</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dorm Floor Residents */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Hadley Village 2nd Floor East:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                <div className="text-center space-y-2">
                  <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Room 201" size="sm" status="online" interactive={true} />
                  <p className="text-xs text-[var(--hive-text-muted)]">201A</p>
                </div>
                <div className="text-center space-y-2">
                  <Avatar initials="JD" size="sm" status="away" interactive={true} />
                  <p className="text-xs text-[var(--hive-text-muted)]">201B</p>
                </div>
                <div className="text-center space-y-2">
                  <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face" alt="Room 202" size="sm" status="busy" interactive={true} />
                  <p className="text-xs text-[var(--hive-text-muted)]">202A</p>
                </div>
                <div className="text-center space-y-2">
                  <Avatar initials="KL" size="sm" status="offline" privacy="ghost" interactive={true} />
                  <p className="text-xs text-[var(--hive-text-muted)]">202B</p>
                </div>
                <div className="text-center space-y-2">
                  <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" alt="Room 203" size="sm" status="online" interactive={true} />
                  <p className="text-xs text-[var(--hive-text-muted)]">203A</p>
                </div>
                <div className="text-center space-y-2">
                  <Avatar initials="RA" size="sm" status="online" placeholder={<span className="text-lg">🔑</span>} interactive={true} />
                  <p className="text-xs text-[var(--hive-text-muted)]">RA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Engineering Project Team */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Capstone Project Team - Smart Campus Tool:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
              <div className="flex gap-6 items-center flex-wrap">
                <div className="text-center space-y-2">
                  <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Project lead" size="xl" status="online" interactive={true} />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">Alex K.</p>
                    <p className="text-xs text-[var(--hive-text-muted)]">Project Lead</p>
                    <p className="text-xs text-[var(--hive-brand-secondary)]">Frontend Dev</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b987?w=150&h=150&fit=crop&crop=face" alt="Backend dev" size="lg" status="busy" interactive={true} />
                    <div>
                      <p className="text-sm font-medium text-[var(--hive-text-primary)]">Maria L.</p>
                      <p className="text-xs text-[var(--hive-text-muted)]">Backend</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <Avatar initials="DW" size="lg" status="away" interactive={true} />
                    <div>
                      <p className="text-sm font-medium text-[var(--hive-text-primary)]">David W.</p>
                      <p className="text-xs text-[var(--hive-text-muted)]">UI/UX</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" alt="Data analyst" size="lg" status="online" interactive={true} />
                    <div>
                      <p className="text-sm font-medium text-[var(--hive-text-primary)]">Lisa P.</p>
                      <p className="text-xs text-[var(--hive-text-muted)]">Data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
}`,...(h=(v=l.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var u,f,N;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    initials: 'UB',
    size: 'lg',
    status: 'online',
    privacy: 'public',
    interactive: true
  },
  render: args => <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Avatar Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different avatar configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Avatar {...args} />
        </CardContent>
      </Card>
    </div>
}`,...(N=(f=d.parameters)==null?void 0:f.docs)==null?void 0:N.source}}};const B=["Default","CompleteShowcase","Playground"];export{l as CompleteShowcase,c as Default,d as Playground,B as __namedExportsOrder,T as default};
