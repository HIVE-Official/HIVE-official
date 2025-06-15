import{j as e}from"./jsx-runtime-CDt2p4po.js";import{W as l}from"./welcome-mat-DxZ7I1ZQ.js";import{r as u}from"./index-GiUgBvb1.js";import"./utils-CytzSlOG.js";import"./proxy-Bec6Vc3j.js";import"./createLucideIcon-DlCdiEX6.js";import"./users-BnPOFdzp.js";const F={title:"Components/Welcome/WelcomeMat",component:l,parameters:{layout:"fullscreen",docs:{description:{component:"A dismissible overlay that welcomes new users to HIVE after onboarding completion."}}},argTypes:{isVisible:{control:"boolean",description:"Whether the welcome mat is visible"},userName:{control:"text",description:"User name for personalization"},onDismiss:{action:"dismissed",description:"Callback when the welcome mat is dismissed"}}},p=({initialVisible:s=!0,userName:r})=>{const[t,a]=u.useState(s);return e.jsx("div",{className:"min-h-screen bg-zinc-900 p-8",children:e.jsxs("div",{className:"mx-auto max-w-4xl space-y-4",children:[e.jsx("h1",{className:"text-2xl font-bold text-white",children:"HIVE Feed"}),e.jsx("p",{className:"text-zinc-400",children:"This is the main feed content. The welcome mat will overlay on top when visible."}),e.jsx("button",{onClick:()=>a(!0),className:"rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-400",children:"Show Welcome Mat"}),e.jsx(l,{isVisible:t,onDismiss:()=>a(!1),userName:r})]})})},i={render:()=>e.jsx(p,{}),parameters:{docs:{description:{story:"Default welcome mat with standard messaging and CTAs."}}}},o={render:()=>e.jsx(p,{userName:"Alex Chen"}),parameters:{docs:{description:{story:"Welcome mat with personalized greeting using the user's name."}}}},n={render:()=>e.jsx(p,{initialVisible:!1}),parameters:{docs:{description:{story:"Welcome mat in hidden state. Click the button to show it."}}}},c={args:{isVisible:!0,userName:"Jordan Smith",onDismiss:()=>console.log("Dismissed")},render:s=>e.jsx("div",{className:"min-h-screen bg-zinc-900",children:e.jsx(l,{...s})}),parameters:{docs:{description:{story:"Static version of the welcome mat for design review and testing."}}}},M=()=>{const[s,r]=u.useState(!1),[t,a]=u.useState("Demo User");return e.jsx("div",{className:"min-h-screen bg-zinc-900 p-8",children:e.jsxs("div",{className:"mx-auto max-w-md space-y-4",children:[e.jsx("h2",{className:"text-xl font-bold text-white",children:"Animation Test"}),e.jsx("div",{className:"space-y-2",children:e.jsxs("label",{className:"block text-sm text-zinc-400",children:["User Name:",e.jsx("input",{type:"text",value:t,onChange:T=>a(T.target.value),className:"mt-1 block w-full rounded bg-zinc-800 px-3 py-2 text-white"})]})}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>r(!0),disabled:s,className:"rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50",children:"Show"}),e.jsx("button",{onClick:()=>r(!1),disabled:!s,className:"rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50",children:"Hide"})]}),e.jsx(l,{isVisible:s,onDismiss:()=>r(!1),userName:t||void 0})]})})},d={render:()=>e.jsx(M,{}),parameters:{docs:{description:{story:"Interactive demo to test animations and different user names."}}}},m={render:()=>e.jsx(p,{userName:"Screen Reader User"}),parameters:{docs:{description:{story:"Test version for accessibility features like keyboard navigation and screen reader support."}},a11y:{config:{rules:[{id:"color-contrast",enabled:!0},{id:"keyboard-navigation",enabled:!0}]}}}};var h,x,b;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <WelcomeMatWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'Default welcome mat with standard messaging and CTAs.'
      }
    }
  }
}`,...(b=(x=i.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var g,y,f;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <WelcomeMatWrapper userName="Alex Chen" />,
  parameters: {
    docs: {
      description: {
        story: 'Welcome mat with personalized greeting using the user\\'s name.'
      }
    }
  }
}`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var w,v,N;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <WelcomeMatWrapper initialVisible={false} />,
  parameters: {
    docs: {
      description: {
        story: 'Welcome mat in hidden state. Click the button to show it.'
      }
    }
  }
}`,...(N=(v=n.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};var j,S,W;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(W=(S=c.parameters)==null?void 0:S.docs)==null?void 0:W.source}}};var k,C,V;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <AnimationShowcaseComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo to test animations and different user names.'
      }
    }
  }
}`,...(V=(C=d.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var A,D,z;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(z=(D=m.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};const O=["Default","WithUserName","Hidden","StaticVisible","AnimationShowcase","AccessibilityTest"];export{m as AccessibilityTest,d as AnimationShowcase,i as Default,n as Hidden,c as StaticVisible,o as WithUserName,O as __namedExportsOrder,F as default};
