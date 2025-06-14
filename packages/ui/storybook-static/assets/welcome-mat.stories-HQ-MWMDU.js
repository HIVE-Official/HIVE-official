import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as i}from"./index-GiUgBvb1.js";import{c as o}from"./utils-CytzSlOG.js";import{A as O}from"./index-Cx_XmxjP.js";import{m as f}from"./proxy-Bec6Vc3j.js";import{c as H}from"./createLucideIcon-DlCdiEX6.js";import{U as P}from"./users-BnPOFdzp.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=H("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=H("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),n=({isVisible:s,onDismiss:t,userName:a,className:r})=>{const[x,g]=i.useState(!1),b=()=>{g(!0),setTimeout(()=>{t(),g(!1)},300)},q=()=>{window.location.href="/spaces"},R=()=>{window.location.href="/profile"};return i.useEffect(()=>(s?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[s]),e.jsx(O,{children:s&&!x&&e.jsx(f.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3,ease:"easeOut"},className:o("fixed inset-0 z-50 flex items-center justify-center","bg-black/80 backdrop-blur-sm",r),onClick:b,children:e.jsxs(f.div,{initial:{scale:.9,opacity:0,y:20},animate:{scale:1,opacity:1,y:0},exit:{scale:.9,opacity:0,y:20},transition:{duration:.4,ease:"easeOut",delay:.1},className:o("relative mx-4 w-full max-w-md","rounded-2xl border border-white/10","bg-gradient-to-br from-zinc-900/95 to-black/95","p-8 shadow-2xl backdrop-blur-xl","ring-1 ring-white/5"),onClick:_=>_.stopPropagation(),children:[e.jsx("button",{onClick:b,className:o("absolute right-4 top-4 rounded-full p-2","text-zinc-400 transition-colors duration-200","hover:bg-white/10 hover:text-white","focus:outline-none focus:ring-2 focus:ring-yellow-500/50"),"aria-label":"Dismiss welcome message",children:e.jsx(J,{className:"h-4 w-4"})}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"text-center",children:[e.jsx(f.div,{initial:{scale:0},animate:{scale:1},transition:{duration:.5,delay:.3,type:"spring"},className:"mb-4 text-4xl",children:"🚀"}),e.jsx("h1",{className:"text-2xl font-bold text-white",children:"You're in — welcome to HIVE!"}),a&&e.jsxs("p",{className:"mt-2 text-zinc-400",children:["Great to have you here, ",a]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-start gap-3 rounded-lg bg-white/5 p-3",children:[e.jsx("div",{className:"mt-0.5 h-2 w-2 rounded-full bg-yellow-500"}),e.jsx("p",{className:"text-sm text-zinc-300",children:"Scroll the Feed to see what's buzzing."})]}),e.jsxs("div",{className:"flex items-start gap-3 rounded-lg bg-white/5 p-3",children:[e.jsx("div",{className:"mt-0.5 h-2 w-2 rounded-full bg-yellow-500"}),e.jsx("p",{className:"text-sm text-zinc-300",children:"Spin up a Space to rally your group."})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("button",{onClick:q,className:o("flex w-full items-center justify-center gap-2 rounded-lg","bg-gradient-to-r from-yellow-500 to-yellow-600","px-6 py-3 font-semibold text-black","transition-all duration-200","hover:from-yellow-400 hover:to-yellow-500","hover:shadow-lg hover:shadow-yellow-500/25","focus:outline-none focus:ring-2 focus:ring-yellow-500/50","active:scale-[0.98]"),children:[e.jsx(P,{className:"h-4 w-4"}),"Explore Spaces"]}),e.jsxs("button",{onClick:R,className:o("flex w-full items-center justify-center gap-2","text-sm text-zinc-400 transition-colors duration-200","hover:text-white focus:outline-none focus:text-white"),children:["View your profile",e.jsx(F,{className:"h-3 w-3"})]})]})]}),e.jsx("div",{className:"absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"}),e.jsx("div",{className:"absolute -bottom-px left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"})]})})})};n.__docgenInfo={description:"",methods:[],displayName:"WelcomeMat",props:{isVisible:{required:!0,tsType:{name:"boolean"},description:"Whether to show the welcome mat"},onDismiss:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when the welcome mat is dismissed"},userName:{required:!1,tsType:{name:"string"},description:"User's name for personalization"},className:{required:!1,tsType:{name:"string"},description:"Custom className for styling"}}};const $={title:"Components/Welcome/WelcomeMat",component:n,parameters:{layout:"fullscreen",docs:{description:{component:"A dismissible overlay that welcomes new users to HIVE after onboarding completion."}}},argTypes:{isVisible:{control:"boolean",description:"Whether the welcome mat is visible"},userName:{control:"text",description:"User name for personalization"},onDismiss:{action:"dismissed",description:"Callback when the welcome mat is dismissed"}}},h=({initialVisible:s=!0,userName:t})=>{const[a,r]=i.useState(s);return e.jsx("div",{className:"min-h-screen bg-zinc-900 p-8",children:e.jsxs("div",{className:"mx-auto max-w-4xl space-y-4",children:[e.jsx("h1",{className:"text-2xl font-bold text-white",children:"HIVE Feed"}),e.jsx("p",{className:"text-zinc-400",children:"This is the main feed content. The welcome mat will overlay on top when visible."}),e.jsx("button",{onClick:()=>r(!0),className:"rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-400",children:"Show Welcome Mat"}),e.jsx(n,{isVisible:a,onDismiss:()=>r(!1),userName:t})]})})},c={render:()=>e.jsx(h,{}),parameters:{docs:{description:{story:"Default welcome mat with standard messaging and CTAs."}}}},l={render:()=>e.jsx(h,{userName:"Alex Chen"}),parameters:{docs:{description:{story:"Welcome mat with personalized greeting using the user's name."}}}},d={render:()=>e.jsx(h,{initialVisible:!1}),parameters:{docs:{description:{story:"Welcome mat in hidden state. Click the button to show it."}}}},m={args:{isVisible:!0,userName:"Jordan Smith",onDismiss:()=>console.log("Dismissed")},render:s=>e.jsx("div",{className:"min-h-screen bg-zinc-900",children:e.jsx(n,{...s})}),parameters:{docs:{description:{story:"Static version of the welcome mat for design review and testing."}}}},X=()=>{const[s,t]=i.useState(!1),[a,r]=i.useState("Demo User");return e.jsx("div",{className:"min-h-screen bg-zinc-900 p-8",children:e.jsxs("div",{className:"mx-auto max-w-md space-y-4",children:[e.jsx("h2",{className:"text-xl font-bold text-white",children:"Animation Test"}),e.jsx("div",{className:"space-y-2",children:e.jsxs("label",{className:"block text-sm text-zinc-400",children:["User Name:",e.jsx("input",{type:"text",value:a,onChange:x=>r(x.target.value),className:"mt-1 block w-full rounded bg-zinc-800 px-3 py-2 text-white"})]})}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>t(!0),disabled:s,className:"rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50",children:"Show"}),e.jsx("button",{onClick:()=>t(!1),disabled:!s,className:"rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50",children:"Hide"})]}),e.jsx(n,{isVisible:s,onDismiss:()=>t(!1),userName:a||void 0})]})})},p={render:()=>e.jsx(X,{}),parameters:{docs:{description:{story:"Interactive demo to test animations and different user names."}}}},u={render:()=>e.jsx(h,{userName:"Screen Reader User"}),parameters:{docs:{description:{story:"Test version for accessibility features like keyboard navigation and screen reader support."}},a11y:{config:{rules:[{id:"color-contrast",enabled:!0},{id:"keyboard-navigation",enabled:!0}]}}}};var y,w,v;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <WelcomeMatWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'Default welcome mat with standard messaging and CTAs.'
      }
    }
  }
}`,...(v=(w=c.parameters)==null?void 0:w.docs)==null?void 0:v.source}}};var N,j,k;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <WelcomeMatWrapper userName="Alex Chen" />,
  parameters: {
    docs: {
      description: {
        story: 'Welcome mat with personalized greeting using the user\\'s name.'
      }
    }
  }
}`,...(k=(j=l.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var S,W,z;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <WelcomeMatWrapper initialVisible={false} />,
  parameters: {
    docs: {
      description: {
        story: 'Welcome mat in hidden state. Click the button to show it.'
      }
    }
  }
}`,...(z=(W=d.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var C,A,D;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    isVisible: true,
    userName: 'Jordan Smith',
    onDismiss: () => console.log('Dismissed')
  },
  render: args => <div className="min-h-screen bg-zinc-900">\r
      <WelcomeMat {...args} />\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Static version of the welcome mat for design review and testing.'
      }
    }
  }
}`,...(D=(A=m.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var T,V,M;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <AnimationShowcaseComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo to test animations and different user names.'
      }
    }
  }
}`,...(M=(V=p.parameters)==null?void 0:V.docs)==null?void 0:M.source}}};var U,I,E;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <WelcomeMatWrapper userName="Screen Reader User" />,
  parameters: {
    docs: {
      description: {
        story: 'Test version for accessibility features like keyboard navigation and screen reader support.'
      }
    },
    a11y: {
      config: {
        rules: [{
          id: 'color-contrast',
          enabled: true
        }, {
          id: 'keyboard-navigation',
          enabled: true
        }]
      }
    }
  }
}`,...(E=(I=u.parameters)==null?void 0:I.docs)==null?void 0:E.source}}};const ee=["Default","WithUserName","Hidden","StaticVisible","AnimationShowcase","AccessibilityTest"];export{u as AccessibilityTest,p as AnimationShowcase,c as Default,d as Hidden,m as StaticVisible,l as WithUserName,ee as __namedExportsOrder,$ as default};
