import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{r as I}from"./index-DJO9vBfz.js";import{c as D}from"./utils-CytzSlOG.js";const H={title:"Foundation/Motion System",parameters:{layout:"fullscreen",docs:{description:{component:`
# HIVE Motion System

The HIVE motion system creates organic, campus-energy-inspired interactions that feel authentic to student life.

## Philosophy
- **Organic not Mechanical**: Motion feels natural and responsive
- **Campus Energy**: Animation adapts to different student life periods
- **HIVE Brand Curve**: cubic-bezier(0.33, 0.65, 0, 1) for signature feel

## Duration Scale
- **Instant** (50ms): Immediate feedback
- **Fast** (120ms): Micro-interactions
- **Base** (180ms): Content transitions
- **Slow** (280ms): Complex animations
- **Ritual** (400ms): Special HIVE moments

## HIVE-Specific Animations
Custom animations for campus-specific interactions and celebrations.
        `}}},tags:["autodocs"]},s=({title:l,description:d,duration:m,easing:n,children:E})=>e.jsxs("div",{className:"space-y-4 p-4 border rounded-lg",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("h4",{className:"font-semibold",children:l}),e.jsx("p",{className:"text-sm text-muted-foreground",children:d}),e.jsxs("div",{className:"flex gap-4 text-xs text-muted-foreground font-mono",children:[e.jsxs("span",{children:["Duration: ",m]}),e.jsxs("span",{children:["Easing: ",n]})]})]}),e.jsx("div",{className:"flex items-center justify-center p-8 bg-surface rounded-lg",children:E})]}),i=({children:l,className:d})=>{const[m,n]=I.useState(!1);return e.jsx("button",{onClick:()=>{n(!0),setTimeout(()=>n(!1),1e3)},className:D("px-4 py-2 rounded-md transition-all",m&&d),children:l})},a={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Duration Scale"}),e.jsx("p",{className:"text-muted-foreground",children:"The HIVE motion timing system with campus-energy-inspired durations."})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsx(s,{title:"Instant (50ms)",description:"Immediate feedback for direct manipulation",duration:"50ms",easing:"cubic-bezier(0.33, 0.65, 0, 1)",children:e.jsx(i,{className:"duration-[50ms] scale-95 bg-accent",children:"Click me - Instant"})}),e.jsx(s,{title:"Fast (120ms)",description:"Micro-interactions and hover states",duration:"120ms",easing:"cubic-bezier(0.33, 0.65, 0, 1)",children:e.jsx(i,{className:"duration-[120ms] scale-105 bg-accent",children:"Click me - Fast"})}),e.jsx(s,{title:"Base (180ms)",description:"Content transitions and standard interactions",duration:"180ms",easing:"cubic-bezier(0.33, 0.65, 0, 1)",children:e.jsx(i,{className:"duration-base scale-110 bg-accent",children:"Click me - Base"})}),e.jsx(s,{title:"Slow (280ms)",description:"Complex animations and page transitions",duration:"280ms",easing:"cubic-bezier(0.33, 0.65, 0, 1)",children:e.jsx(i,{className:"duration-slow scale-125 bg-accent",children:"Click me - Slow"})}),e.jsx(s,{title:"Ritual (400ms)",description:"Special HIVE moments and celebrations",duration:"400ms",easing:"cubic-bezier(0.33, 0.65, 0, 1)",children:e.jsx(i,{className:"duration-ritual animate-hive-ritual-burst",children:"Click me - Ritual"})})]})]})},t={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Easing Functions"}),e.jsx("p",{className:"text-muted-foreground",children:"HIVE-specific easing curves for different interaction types."})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsx(s,{title:"Brand (Primary)",description:"HIVE's signature easing curve",duration:"180ms",easing:"cubic-bezier(0.33, 0.65, 0, 1)",children:e.jsx(i,{className:"duration-base ease-brand translate-x-8 bg-accent",children:"Brand Curve"})}),e.jsx(s,{title:"Smooth",description:"Gentle, flowing transitions",duration:"180ms",easing:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",children:e.jsx(i,{className:"duration-base ease-smooth translate-x-8 bg-accent",children:"Smooth Curve"})}),e.jsx(s,{title:"Snap",description:"Playful, bouncy interactions",duration:"180ms",easing:"cubic-bezier(0.68, -0.55, 0.265, 1.55)",children:e.jsx(i,{className:"duration-base ease-snap translate-x-8 bg-accent",children:"Snap Curve"})}),e.jsx(s,{title:"Elegant",description:"Sophisticated, refined motion",duration:"180ms",easing:"cubic-bezier(0.23, 1, 0.32, 1)",children:e.jsx(i,{className:"duration-base ease-elegant translate-x-8 bg-accent",children:"Elegant Curve"})})]})]})},r={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"HIVE Animations"}),e.jsx("p",{className:"text-muted-foreground",children:"Custom animations for campus-specific interactions."})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsx(s,{title:"Fade In",description:"Gentle content appearance",duration:"180ms",easing:"cubic-bezier(0.33, 0.65, 0, 1)",children:e.jsx(i,{className:"animate-hive-fade-in bg-accent",children:"Fade In"})}),e.jsx(s,{title:"Slide Up",description:"Content entering from below",duration:"180ms",easing:"cubic-bezier(0.33, 0.65, 0, 1)",children:e.jsx(i,{className:"animate-hive-slide-up bg-accent",children:"Slide Up"})}),e.jsx(s,{title:"Scale In",description:"Gentle scale entrance",duration:"180ms",easing:"cubic-bezier(0.33, 0.65, 0, 1)",children:e.jsx(i,{className:"animate-hive-scale-in bg-accent",children:"Scale In"})}),e.jsx(s,{title:"Gold Pulse",description:"Achievement moment indicator",duration:"2s infinite",easing:"cubic-bezier(0.33, 0.65, 0, 1)",children:e.jsx("div",{className:"w-16 h-16 bg-accent rounded-lg animate-hive-gold-pulse",children:e.jsx("span",{className:"sr-only",children:"Gold Pulse"})})}),e.jsx(s,{title:"Gold Glow",description:"Celebration effect",duration:"1.5s infinite",easing:"cubic-bezier(0.33, 0.65, 0, 1)",children:e.jsx("div",{className:"w-16 h-16 bg-accent rounded-lg animate-hive-gold-glow",children:e.jsx("span",{className:"sr-only",children:"Gold Glow"})})}),e.jsx(s,{title:"Ritual Burst",description:"Special HIVE ritual moments",duration:"400ms",easing:"cubic-bezier(0.68, -0.55, 0.265, 1.55)",children:e.jsx(i,{className:"animate-hive-ritual-burst bg-accent",children:"Ritual Burst"})}),e.jsx(s,{title:"Space Join",description:"Joining a space celebration",duration:"400ms",easing:"cubic-bezier(0.23, 1, 0.32, 1)",children:e.jsx(i,{className:"animate-hive-space-join bg-accent",children:"Space Join"})}),e.jsx(s,{title:"Surface Rise",description:"Elevated surface appearing",duration:"280ms",easing:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",children:e.jsx(i,{className:"animate-hive-surface-rise bg-surface border",children:"Surface Rise"})})]})]})},c={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Campus Energy Motion"}),e.jsx("p",{className:"text-muted-foreground",children:"Motion adapts to different campus energy states and student life cycles."})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-xl font-semibold",children:"High Energy Periods"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Start of semester, events, social peaks"}),e.jsx("div",{className:"p-4 bg-background border rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(i,{className:"duration-fast scale-110 bg-accent animate-hive-gold-pulse",children:"Faster Motion"}),e.jsx("div",{className:"text-sm text-muted-foreground",children:"120ms duration, more dynamic animations, increased energy"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-xl font-semibold",children:"Focus Periods"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Study time, exams, project deadlines"}),e.jsx("div",{className:"p-4 bg-background border rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(i,{className:"duration-slow scale-105 bg-accent/50",children:"Calmer Motion"}),e.jsx("div",{className:"text-sm text-muted-foreground",children:"280ms duration, reduced animations, minimal distractions"})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-xl font-semibold",children:"Celebration Moments"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Achievements, ritual completion, space activation"}),e.jsx("div",{className:"p-4 bg-background border rounded-lg",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(i,{className:"duration-ritual animate-hive-ritual-burst bg-accent",children:"Celebration"}),e.jsx("div",{className:"text-sm text-muted-foreground",children:"400ms duration, special animations, moment of delight"})]})})]})]})]})},o={render:()=>e.jsxs("div",{className:"p-6 space-y-8",children:[e.jsx("div",{className:"space-y-4",children:e.jsx("h2",{className:"text-2xl font-semibold",children:"Motion Guidelines"})}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-accent",children:"✅ DO"}),e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsx("li",{children:"• Use HIVE brand curve for signature feel"}),e.jsx("li",{children:"• Respect duration scale (instant to ritual)"}),e.jsx("li",{children:"• Use HIVE-specific animations"}),e.jsx("li",{children:"• Adapt motion to campus energy states"}),e.jsx("li",{children:"• Respect prefers-reduced-motion"}),e.jsx("li",{children:"• Use consistent easing functions"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-muted-foreground",children:"❌ DON'T"}),e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsx("li",{children:"• Use random easing functions"}),e.jsx("li",{children:"• Ignore accessibility preferences"}),e.jsx("li",{children:"• Overuse complex animations"}),e.jsx("li",{children:"• Use motion without purpose"}),e.jsx("li",{children:"• Mix inconsistent durations"}),e.jsx("li",{children:"• Create jarring transitions"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Implementation Example"}),e.jsx("div",{className:"p-4 bg-surface rounded-lg",children:e.jsx("code",{className:"text-sm",children:`// Use semantic duration classes
<button className="transition-all duration-base ease-brand hover:scale-105">
  Standard Button
</button>

// Campus energy adaptation
<div className="duration-fast animate-hive-gold-pulse">    // High energy
<div className="duration-slow animate-hive-fade-in">      // Focus period
<div className="duration-ritual animate-hive-ritual-burst"> // Celebration

// HIVE animations
<div className="animate-hive-slide-up">Content entering</div>
<div className="animate-hive-space-join">Space activation</div>`})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Accessibility"}),e.jsxs("div",{className:"p-4 bg-surface rounded-lg space-y-2",children:[e.jsx("p",{className:"text-sm",children:"• Respect `prefers-reduced-motion` settings"}),e.jsx("p",{className:"text-sm",children:"• Provide fallback transitions for reduced motion"}),e.jsx("p",{className:"text-sm",children:"• Avoid motion that could trigger vestibular disorders"}),e.jsx("p",{className:"text-sm",children:"• Use motion purposefully, not decoratively"})]})]})]})};var u,g,p;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Duration Scale</h2>
        <p className="text-muted-foreground">
          The HIVE motion timing system with campus-energy-inspired durations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MotionDemo title="Instant (50ms)" description="Immediate feedback for direct manipulation" duration="50ms" easing="cubic-bezier(0.33, 0.65, 0, 1)">
          <AnimationTrigger className="duration-[50ms] scale-95 bg-accent">
            Click me - Instant
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Fast (120ms)" description="Micro-interactions and hover states" duration="120ms" easing="cubic-bezier(0.33, 0.65, 0, 1)">
          <AnimationTrigger className="duration-[120ms] scale-105 bg-accent">
            Click me - Fast
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Base (180ms)" description="Content transitions and standard interactions" duration="180ms" easing="cubic-bezier(0.33, 0.65, 0, 1)">
          <AnimationTrigger className="duration-base scale-110 bg-accent">
            Click me - Base
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Slow (280ms)" description="Complex animations and page transitions" duration="280ms" easing="cubic-bezier(0.33, 0.65, 0, 1)">
          <AnimationTrigger className="duration-slow scale-125 bg-accent">
            Click me - Slow
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Ritual (400ms)" description="Special HIVE moments and celebrations" duration="400ms" easing="cubic-bezier(0.33, 0.65, 0, 1)">
          <AnimationTrigger className="duration-ritual animate-hive-ritual-burst">
            Click me - Ritual
          </AnimationTrigger>
        </MotionDemo>
      </div>
    </div>
}`,...(p=(g=a.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var x,h,b;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Easing Functions</h2>
        <p className="text-muted-foreground">
          HIVE-specific easing curves for different interaction types.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MotionDemo title="Brand (Primary)" description="HIVE's signature easing curve" duration="180ms" easing="cubic-bezier(0.33, 0.65, 0, 1)">
          <AnimationTrigger className="duration-base ease-brand translate-x-8 bg-accent">
            Brand Curve
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Smooth" description="Gentle, flowing transitions" duration="180ms" easing="cubic-bezier(0.25, 0.46, 0.45, 0.94)">
          <AnimationTrigger className="duration-base ease-smooth translate-x-8 bg-accent">
            Smooth Curve
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Snap" description="Playful, bouncy interactions" duration="180ms" easing="cubic-bezier(0.68, -0.55, 0.265, 1.55)">
          <AnimationTrigger className="duration-base ease-snap translate-x-8 bg-accent">
            Snap Curve
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Elegant" description="Sophisticated, refined motion" duration="180ms" easing="cubic-bezier(0.23, 1, 0.32, 1)">
          <AnimationTrigger className="duration-base ease-elegant translate-x-8 bg-accent">
            Elegant Curve
          </AnimationTrigger>
        </MotionDemo>
      </div>
    </div>
}`,...(b=(h=t.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var v,N,f;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">HIVE Animations</h2>
        <p className="text-muted-foreground">
          Custom animations for campus-specific interactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MotionDemo title="Fade In" description="Gentle content appearance" duration="180ms" easing="cubic-bezier(0.33, 0.65, 0, 1)">
          <AnimationTrigger className="animate-hive-fade-in bg-accent">
            Fade In
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Slide Up" description="Content entering from below" duration="180ms" easing="cubic-bezier(0.33, 0.65, 0, 1)">
          <AnimationTrigger className="animate-hive-slide-up bg-accent">
            Slide Up
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Scale In" description="Gentle scale entrance" duration="180ms" easing="cubic-bezier(0.33, 0.65, 0, 1)">
          <AnimationTrigger className="animate-hive-scale-in bg-accent">
            Scale In
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Gold Pulse" description="Achievement moment indicator" duration="2s infinite" easing="cubic-bezier(0.33, 0.65, 0, 1)">
          <div className="w-16 h-16 bg-accent rounded-lg animate-hive-gold-pulse">
            <span className="sr-only">Gold Pulse</span>
          </div>
        </MotionDemo>

        <MotionDemo title="Gold Glow" description="Celebration effect" duration="1.5s infinite" easing="cubic-bezier(0.33, 0.65, 0, 1)">
          <div className="w-16 h-16 bg-accent rounded-lg animate-hive-gold-glow">
            <span className="sr-only">Gold Glow</span>
          </div>
        </MotionDemo>

        <MotionDemo title="Ritual Burst" description="Special HIVE ritual moments" duration="400ms" easing="cubic-bezier(0.68, -0.55, 0.265, 1.55)">
          <AnimationTrigger className="animate-hive-ritual-burst bg-accent">
            Ritual Burst
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Space Join" description="Joining a space celebration" duration="400ms" easing="cubic-bezier(0.23, 1, 0.32, 1)">
          <AnimationTrigger className="animate-hive-space-join bg-accent">
            Space Join
          </AnimationTrigger>
        </MotionDemo>

        <MotionDemo title="Surface Rise" description="Elevated surface appearing" duration="280ms" easing="cubic-bezier(0.25, 0.46, 0.45, 0.94)">
          <AnimationTrigger className="animate-hive-surface-rise bg-surface border">
            Surface Rise
          </AnimationTrigger>
        </MotionDemo>
      </div>
    </div>
}`,...(f=(N=r.parameters)==null?void 0:N.docs)==null?void 0:f.source}}};var j,y,S;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Campus Energy Motion</h2>
        <p className="text-muted-foreground">
          Motion adapts to different campus energy states and student life cycles.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">High Energy Periods</h3>
          <p className="text-sm text-muted-foreground">Start of semester, events, social peaks</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <AnimationTrigger className="duration-fast scale-110 bg-accent animate-hive-gold-pulse">
                Faster Motion
              </AnimationTrigger>
              <div className="text-sm text-muted-foreground">
                120ms duration, more dynamic animations, increased energy
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Focus Periods</h3>
          <p className="text-sm text-muted-foreground">Study time, exams, project deadlines</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <AnimationTrigger className="duration-slow scale-105 bg-accent/50">
                Calmer Motion
              </AnimationTrigger>
              <div className="text-sm text-muted-foreground">
                280ms duration, reduced animations, minimal distractions
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Celebration Moments</h3>
          <p className="text-sm text-muted-foreground">Achievements, ritual completion, space activation</p>
          <div className="p-4 bg-background border rounded-lg">
            <div className="flex items-center gap-4">
              <AnimationTrigger className="duration-ritual animate-hive-ritual-burst bg-accent">
                Celebration
              </AnimationTrigger>
              <div className="text-sm text-muted-foreground">
                400ms duration, special animations, moment of delight
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...(S=(y=c.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var M,A,C;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Motion Guidelines</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accent">✅ DO</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use HIVE brand curve for signature feel</li>
            <li>• Respect duration scale (instant to ritual)</li>
            <li>• Use HIVE-specific animations</li>
            <li>• Adapt motion to campus energy states</li>
            <li>• Respect prefers-reduced-motion</li>
            <li>• Use consistent easing functions</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">❌ DON'T</h3>
          <ul className="space-y-2 text-sm">
            <li>• Use random easing functions</li>
            <li>• Ignore accessibility preferences</li>
            <li>• Overuse complex animations</li>
            <li>• Use motion without purpose</li>
            <li>• Mix inconsistent durations</li>
            <li>• Create jarring transitions</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Implementation Example</h3>
        <div className="p-4 bg-surface rounded-lg">
          <code className="text-sm">
            {\`// Use semantic duration classes
<button className="transition-all duration-base ease-brand hover:scale-105">
  Standard Button
</button>

// Campus energy adaptation
<div className="duration-fast animate-hive-gold-pulse">    // High energy
<div className="duration-slow animate-hive-fade-in">      // Focus period
<div className="duration-ritual animate-hive-ritual-burst"> // Celebration

// HIVE animations
<div className="animate-hive-slide-up">Content entering</div>
<div className="animate-hive-space-join">Space activation</div>\`}
          </code>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Accessibility</h3>
        <div className="p-4 bg-surface rounded-lg space-y-2">
          <p className="text-sm">• Respect \`prefers-reduced-motion\` settings</p>
          <p className="text-sm">• Provide fallback transitions for reduced motion</p>
          <p className="text-sm">• Avoid motion that could trigger vestibular disorders</p>
          <p className="text-sm">• Use motion purposefully, not decoratively</p>
        </div>
      </div>
    </div>
}`,...(C=(A=o.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};const V=["DurationScale","EasingFunctions","HIVEAnimations","CampusEnergyAdaptation","UsageGuidelines"];export{c as CampusEnergyAdaptation,a as DurationScale,t as EasingFunctions,r as HIVEAnimations,o as UsageGuidelines,V as __namedExportsOrder,H as default};
