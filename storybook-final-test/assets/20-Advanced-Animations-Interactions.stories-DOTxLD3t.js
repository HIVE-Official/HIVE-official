import{j as e}from"./jsx-runtime-B9GTzLod.js";import{r as l}from"./index-BMjrbHXN.js";import{H as v,a as S,b as k,d as A,c as w}from"./hive-card-DIMxrd4t.js";import{B as ce}from"./button-B9g-9ceP.js";import{B as q}from"./badge-CebFJquh.js";import{A as le,a as de,b as me}from"./avatar-DPA-6xOy.js";import{H as ue}from"./hive-progress-BKPo3d5d.js";import{S as he}from"./slider-DPeKlcvW.js";import{S as P}from"./switch-enhanced-CEY7Xhd8.js";import{S as Q}from"./sparkles-DJELqOJR.js";import{T as xe}from"./trending-up-DHCBXhUA.js";import{M as K}from"./mouse-pointer-CGlNyllz.js";import{H as ee}from"./heart-BuGzDzw2.js";import{S as se}from"./share-2-DREqtcC9.js";import{P as pe}from"./plus-BTyRuzWD.js";import{S as ge}from"./send-BhLLUBQ1.js";import{M as fe}from"./message-circle-CnQJGxxu.js";import{B as je}from"./bookmark-B4q7zV9u.js";import{M as be}from"./move--zUxQYYE.js";import{A as ye}from"./arrow-up-3WJGBaNT.js";import{A as ve}from"./arrow-down-DRk5yD8I.js";import{A as we}from"./arrow-left-BVCoaEb4.js";import{A as Ne}from"./arrow-right-CLTrdEkf.js";import{L as te}from"./loader-circle-C0fUCed1.js";import{S as Se}from"./settings-Cw08DGvz.js";import{Z as ke}from"./zap-BzDMfB1h.js";import{T as Ae}from"./target-oZw-M8_W.js";import{A as Ce}from"./activity-BpE6NZRo.js";import{C as Me}from"./circle-check-big-fUBFJcwM.js";import"./index-BwobEAja.js";import"./utils-CytzSlOG.js";import"./framer-motion-proxy-Bip1EXUU.js";import"./button-enhanced-5mvuuZ4M.js";import"./proxy-DAMbhHBC.js";import"./filter-props-D0Yg0xnz.js";import"./circle-alert-D27CINV1.js";import"./createLucideIcon-DtX30ipI.js";import"./index-CGSy-E4J.js";const xs={title:"20-Advanced Systems/Animations & Interactions",parameters:{layout:"fullscreen",docs:{description:{component:`# HIVE Advanced Animations & Interactions

Sophisticated micro-animations, transitions, and interactive patterns that create
a buttery-smooth, engaging experience for UB students. Demonstrates advanced
animation techniques while maintaining accessibility and performance.

## Animation Features:
- **Micro-Interactions**: Delightful feedback for every user action
- **State Transitions**: Smooth animation between different UI states
- **Loading Animations**: Engaging loading states that reduce perceived wait time
- **Gesture Feedback**: Visual feedback for touch and swipe interactions
- **Social Animations**: Satisfying animations for likes, shares, and reactions
- **Campus Themed**: Animations that reflect campus life and student energy
- **Performance Optimized**: 60fps animations with motion preference respect
- **Accessibility Aware**: Respects reduced motion preferences`,story:"Advanced micro-animations and interactive patterns for delightful user experiences"}}}},N=()=>{const[s,r]=l.useState(!1),[t,a]=l.useState(1),[o,n]=l.useState(!0);l.useEffect(()=>{const i=window.matchMedia("(prefers-reduced-motion: reduce)");r(i.matches);const h=m=>r(m.matches);return i.addEventListener("change",h),()=>i.removeEventListener("change",h)},[]);const c=l.useCallback((i="light")=>{if(o&&"vibrate"in navigator){const h={light:[10],medium:[20],heavy:[50]};navigator.vibrate(h[i])}},[o]);return{reduceMotion:s,animationSpeed:t,hapticFeedback:o,setReduceMotion:r,setAnimationSpeed:a,setHapticFeedback:n,triggerHaptic:c}},f=({children:s,variant:r="default",size:t="default",loading:a=!1,success:o=!1,icon:n,onClick:c,className:i="",animationType:h="bounce"})=>{const[m,p]=l.useState(!1),[g,j]=l.useState(!1),{reduceMotion:x,triggerHaptic:b}=N(),C=l.useRef(null),d=()=>{a||(b("light"),p(!0),o&&(j(!0),setTimeout(()=>j(!1),2e3)),setTimeout(()=>p(!1),150),c==null||c())},u={bounce:x?"":"active:scale-95 hover:scale-105 transition-transform duration-150",scale:x?"":"hover:scale-110 active:scale-90 transition-transform duration-200",pulse:x?"":"hover:animate-pulse",shake:!x&&m?"animate-bounce":"",glow:x?"":"hover:shadow-lg hover:shadow-yellow-500/25 transition-shadow duration-300"};return e.jsxs(ce,{ref:C,onClick:d,variant:r,size:t,disabled:a,className:`
        ${u[h]}
        ${g?"bg-green-600 hover:bg-green-700":""}
        ${i}
        relative overflow-hidden
      `,children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[a?e.jsx(te,{className:"h-4 w-4 animate-spin"}):g?e.jsx(Me,{className:"h-4 w-4"}):n?e.jsx(n,{className:"h-4 w-4"}):null,e.jsx("span",{className:g?"text-white":"",children:g?"Success!":s})]}),!x&&m&&e.jsx("div",{className:"absolute inset-0 bg-white/20 animate-ping rounded"})]})},M=({icon:s,count:r,active:t,onClick:a,color:o,label:n})=>{const[c,i]=l.useState(!1),[h,m]=l.useState(r),{reduceMotion:p,triggerHaptic:g}=N(),j=()=>{g("medium"),i(!0),m(t?x=>x-1:x=>x+1),setTimeout(()=>i(!1),300),a()};return e.jsxs("button",{onClick:j,className:`
        group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200
        hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500
        ${t?`text-${o}-400`:"text-gray-400"}
        ${p?"":"hover:scale-105 active:scale-95"}
      `,"aria-label":`${n} this post. Currently ${h} ${n.toLowerCase()}s.`,children:[e.jsxs("div",{className:"relative",children:[e.jsx(s,{className:`
            h-5 w-5 transition-all duration-200
            ${c&&!p?"animate-bounce":""}
            ${t?"fill-current":""}
          `}),c&&!p&&!t&&e.jsx("div",{className:"absolute inset-0 pointer-events-none",children:[...Array(6)].map((x,b)=>e.jsx("div",{className:`absolute w-1 h-1 bg-${o}-400 rounded-full animate-ping`,style:{left:"50%",top:"50%",transform:`translate(-50%, -50%) rotate(${b*60}deg) translateY(-15px)`,animationDelay:`${b*50}ms`,animationDuration:"600ms"}},b))})]}),e.jsx("span",{className:`
          text-sm font-medium transition-all duration-200
          ${c&&!p?"animate-pulse":""}
        `,children:h})]})},L=({value:s,label:r,color:t="yellow",showPercentage:a=!0,animated:o=!0})=>{const[n,c]=l.useState(0),{reduceMotion:i}=N();return l.useEffect(()=>{if(!o||i){c(s);return}const h=s/60;let m=0;const p=setInterval(()=>{m+=h,m>=s?(c(s),clearInterval(p)):c(m)},16.67);return()=>clearInterval(p)},[s,o,i]),e.jsxs("div",{className:"space-y-2",children:[r&&e.jsxs("div",{className:"flex items-center justify-between text-sm",children:[e.jsx("span",{className:"text-white",children:r}),a&&e.jsxs("span",{className:"text-gray-400",children:[Math.round(n),"%"]})]}),e.jsxs("div",{className:"relative",children:[e.jsx(ue,{value:n,className:`
            h-3 bg-gray-800
            ${i?"":"transition-all duration-300"}
          `}),!i&&n<100&&e.jsx("div",{className:"absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse",style:{width:`${n}%`}})]})]})},ae=()=>{const{reduceMotion:s}=N(),r=[{name:"Spinning Dots",component:e.jsx("div",{className:"flex space-x-1",children:[...Array(3)].map((t,a)=>e.jsx("div",{className:"w-2 h-2 bg-yellow-500 rounded-full",style:{animation:s?void 0:`bounce 1.4s ease-in-out infinite ${a*.16}s`}},a))})},{name:"Pulsing Circle",component:e.jsx("div",{className:`w-8 h-8 bg-yellow-500 rounded-full ${s?"":"animate-pulse"}`})},{name:"Growing Bars",component:e.jsx("div",{className:"flex items-end space-x-1",children:[...Array(4)].map((t,a)=>e.jsx("div",{className:"w-1 bg-yellow-500 rounded-full",style:{height:"8px",animation:s?void 0:`growBar 1s ease-in-out infinite ${a*.15}s`}},a))})},{name:"Campus Spinner",component:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:`w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full ${s?"":"animate-spin"}`}),e.jsx("div",{className:"absolute inset-2 w-4 h-4 bg-yellow-500 rounded-full"})]})}];return e.jsxs(v,{className:"bg-gray-900 border-gray-800",children:[e.jsxs(S,{children:[e.jsxs(k,{className:"text-white flex items-center",children:[e.jsx(te,{className:"mr-2 h-5 w-5"}),"Loading Animations"]}),e.jsx(A,{className:"text-gray-400",children:"Engaging loading states that make waiting enjoyable"})]}),e.jsx(w,{children:e.jsx("div",{className:"grid grid-cols-2 gap-6",children:r.map((t,a)=>e.jsxs("div",{className:"flex flex-col items-center space-y-3",children:[e.jsx("div",{className:"flex items-center justify-center w-16 h-16 bg-gray-800 rounded-lg",children:t.component}),e.jsx("span",{className:"text-sm text-gray-400",children:t.name})]},a))})})]})},ne=()=>{const[s,r]=l.useState(null),[t,a]=l.useState(!1),[o,n]=l.useState({x:0,y:0}),{reduceMotion:c,triggerHaptic:i}=N(),h=l.useRef(null),m=l.useRef({x:0,y:0}),p=d=>{const u=d.touches[0];m.current={x:u.clientX,y:u.clientY},a(!0),i("light")},g=d=>{if(!t)return;const u=d.touches[0],y=u.clientX-m.current.x,oe=u.clientY-m.current.y;n({x:y,y:oe})},j=()=>{if(!t)return;const{x:d,y:u}=o,y=50;(Math.abs(d)>y||Math.abs(u)>y)&&(Math.abs(d)>Math.abs(u)?r(d>0?"right":"left"):r(u>0?"down":"up"),i("medium")),a(!1),n({x:0,y:0}),setTimeout(()=>r(null),1e3)},x=d=>{m.current={x:d.clientX,y:d.clientY},a(!0)},b=d=>{if(!t)return;const u=d.clientX-m.current.x,y=d.clientY-m.current.y;n({x:u,y})},C=j;return e.jsxs(v,{className:"bg-gray-900 border-gray-800",children:[e.jsxs(S,{children:[e.jsxs(k,{className:"text-white flex items-center",children:[e.jsx(be,{className:"mr-2 h-5 w-5"}),"Gesture Interactions"]}),e.jsx(A,{className:"text-gray-400",children:"Swipe and drag to interact (works with touch and mouse)"})]}),e.jsxs(w,{children:[e.jsxs("div",{ref:h,className:`
            relative w-full h-40 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600
            flex items-center justify-center cursor-grab
            ${t?"cursor-grabbing":""}
            ${c?"":"transition-all duration-200"}
          `,onTouchStart:p,onTouchMove:g,onTouchEnd:j,onMouseDown:x,onMouseMove:b,onMouseUp:C,onMouseLeave:C,children:[e.jsx("div",{className:`
              w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center
              ${c?"":"transition-transform duration-150"}
              ${t?"scale-110":""}
            `,style:{transform:`translate(${o.x}px, ${o.y}px)`},children:e.jsx(K,{className:"h-8 w-8 text-black"})}),s&&e.jsx("div",{className:"absolute top-2 right-2",children:e.jsxs(q,{className:"bg-green-600",children:["Swiped ",s,"!"]})}),e.jsx("div",{className:"absolute bottom-2 left-2 text-gray-400 text-sm",children:t?"Dragging...":"Drag me around!"})]}),e.jsx("div",{className:"mt-4 grid grid-cols-4 gap-2",children:[{direction:"up",icon:ye},{direction:"down",icon:ve},{direction:"left",icon:we},{direction:"right",icon:Ne}].map(({direction:d,icon:u})=>e.jsx("div",{className:`
                flex items-center justify-center p-3 rounded-lg border transition-all
                ${s===d?"border-green-500 bg-green-500/10":"border-gray-700"}
              `,children:e.jsx(u,{className:`h-5 w-5 ${s===d?"text-green-400":"text-gray-500"}`})},d))})]})]})},re=()=>{const[s,r]=l.useState({liked:!1,bookmarked:!1,shared:!1,commented:!1}),[t,a]=l.useState({likes:24,comments:8,shares:3,bookmarks:12}),o=n=>{const c=!s[n];r(i=>({...i,[n]:c})),a(i=>({...i,[n==="liked"?"likes":n==="bookmarked"?"bookmarks":n==="shared"?"shares":"comments"]:i[n==="liked"?"likes":n==="bookmarked"?"bookmarks":n==="shared"?"shares":"comments"]+(c?1:-1)}))};return e.jsx(v,{className:"bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors duration-200",children:e.jsxs(w,{className:"p-6",children:[e.jsxs("div",{className:"flex items-start space-x-3 mb-4",children:[e.jsxs(le,{className:"w-12 h-12",children:[e.jsx(de,{src:"/api/placeholder/48/48"}),e.jsx(me,{className:"bg-gray-700 text-white",children:"SJ"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center space-x-2 mb-1",children:[e.jsx("span",{className:"font-semibold text-white",children:"Sarah Johnson"}),e.jsx(q,{variant:"secondary",className:"bg-blue-900 text-blue-300 text-xs",children:"CS Study Group"}),e.jsx("span",{className:"text-gray-500 text-sm",children:"2m ago"})]}),e.jsx("p",{className:"text-white",children:"Just aced my algorithms exam! 🎉 Thanks to everyone in the study group - collaborative learning really works. Who's up for celebrating at South Campus?"})]})]}),e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx(M,{icon:ee,count:t.likes,active:s.liked,onClick:()=>o("liked"),color:"red",label:"Like"}),e.jsx(M,{icon:fe,count:t.comments,active:s.commented,onClick:()=>o("commented"),color:"blue",label:"Comment"}),e.jsx(M,{icon:se,count:t.shares,active:s.shared,onClick:()=>o("shared"),color:"green",label:"Share"}),e.jsx(M,{icon:je,count:t.bookmarks,active:s.bookmarked,onClick:()=>o("bookmarked"),color:"yellow",label:"Bookmark"})]})})]})})},Te=()=>{const{reduceMotion:s,animationSpeed:r,hapticFeedback:t,setReduceMotion:a,setAnimationSpeed:o,setHapticFeedback:n}=N();return e.jsxs(v,{className:"bg-gray-900 border-gray-800",children:[e.jsxs(S,{children:[e.jsxs(k,{className:"text-white flex items-center",children:[e.jsx(Se,{className:"mr-2 h-5 w-5"}),"Animation Controls"]}),e.jsx(A,{className:"text-gray-400",children:"Customize animation behavior and preferences"})]}),e.jsxs(w,{className:"space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx(Label,{className:"text-white",children:"Reduce Motion"}),e.jsx("p",{className:"text-sm text-gray-400",children:"Minimize animations and transitions"})]}),e.jsx(P,{checked:s,onCheckedChange:a})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(Label,{className:"text-white",children:["Animation Speed: ",r,"x"]}),e.jsx(he,{value:[r],onValueChange:c=>o(c[0]),min:.5,max:2,step:.1,className:"w-full"})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx(Label,{className:"text-white",children:"Haptic Feedback"}),e.jsx("p",{className:"text-sm text-gray-400",children:"Vibration on mobile devices"})]}),e.jsx(P,{checked:t,onCheckedChange:n})]}),e.jsxs("div",{className:"pt-4 border-t border-gray-700",children:[e.jsx("h4",{className:"text-white font-medium mb-3",children:"Test Animations"}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsx(f,{animationType:"bounce",icon:ke,children:"Bounce"}),e.jsx(f,{animationType:"scale",icon:Ae,children:"Scale"}),e.jsx(f,{animationType:"pulse",icon:Ce,children:"Pulse"}),e.jsx(f,{animationType:"glow",icon:Q,children:"Glow"})]})]})]})]})},ie=()=>{const[s,r]=l.useState(0);return l.useEffect(()=>{const t=setInterval(()=>{r(a=>(a+10)%100)},2e3);return()=>clearInterval(t)},[]),e.jsxs("div",{className:"min-h-screen bg-black text-white",children:[e.jsxs("div",{className:"max-w-7xl mx-auto p-6",children:[e.jsxs("div",{className:"mb-8",children:[e.jsxs("h1",{className:"text-4xl font-bold text-white mb-4 flex items-center",children:[e.jsx(Q,{className:"mr-4 h-10 w-10"}),"Advanced Animations & Interactions"]}),e.jsx("p",{className:"text-gray-400 text-lg max-w-4xl",children:"Sophisticated micro-animations and interactive patterns that create a buttery-smooth, engaging experience for UB students while respecting accessibility preferences."})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[e.jsxs("div",{className:"lg:col-span-1 space-y-6",children:[e.jsx(Te,{}),e.jsx(ae,{})]}),e.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[e.jsx(re,{}),e.jsx(ne,{}),e.jsxs(v,{className:"bg-gray-900 border-gray-800",children:[e.jsxs(S,{children:[e.jsxs(k,{className:"text-white flex items-center",children:[e.jsx(xe,{className:"mr-2 h-5 w-5"}),"Progress Animations"]}),e.jsx(A,{className:"text-gray-400",children:"Smooth animated progress indicators"})]}),e.jsxs(w,{className:"space-y-6",children:[e.jsx(L,{value:s,label:"Campus Engagement Level",color:"yellow"}),e.jsx(L,{value:85,label:"Profile Completion",color:"green"}),e.jsx(L,{value:67,label:"Weekly Activity",color:"blue"})]})]}),e.jsxs(v,{className:"bg-gray-900 border-gray-800",children:[e.jsxs(S,{children:[e.jsxs(k,{className:"text-white flex items-center",children:[e.jsx(K,{className:"mr-2 h-5 w-5"}),"Interactive Buttons"]}),e.jsx(A,{className:"text-gray-400",children:"Buttons with various animation and feedback styles"})]}),e.jsx(w,{children:e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(f,{animationType:"bounce",icon:ee,loading:!1,children:"Like Post"}),e.jsx(f,{animationType:"scale",icon:se,variant:"outline",children:"Share"}),e.jsx(f,{animationType:"glow",icon:pe,variant:"secondary",children:"Join Space"}),e.jsx(f,{animationType:"pulse",icon:ge,success:!0,children:"Send Message"})]})})]})]})]})]}),e.jsx("style",{jsx:!0,global:!0,children:`
        @keyframes growBar {
          0%, 40%, 100% { 
            transform: scaleY(0.4);
            height: 8px;
          }
          20% { 
            transform: scaleY(1);
            height: 20px;
          }
        }
        
        .motion-reduce {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `})]})},T={render:()=>e.jsx(ie,{}),parameters:{docs:{description:{story:"Complete advanced animations and interactions system with micro-interactions and gesture support"}}}},$={render:()=>e.jsx(re,{}),parameters:{docs:{description:{story:"Micro-interactions for social features with satisfying animation feedback"}}}},I={render:()=>e.jsx(ne,{}),parameters:{docs:{description:{story:"Touch and mouse gesture interactions with haptic feedback"}}}},D={render:()=>e.jsx(ae,{}),parameters:{docs:{description:{story:"Various loading animation patterns that engage users during wait times"}}}},H={render:()=>e.jsx(ie,{}),parameters:{docs:{description:{story:"Animations that respect reduced motion preferences and accessibility needs"}}}};var B,E,R;T.parameters={...T.parameters,docs:{...(B=T.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <AnimationsSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete advanced animations and interactions system with micro-interactions and gesture support'
      }
    }
  }
}`,...(R=(E=T.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var V,G,Y;$.parameters={...$.parameters,docs:{...(V=$.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <AnimatedPostCard />,
  parameters: {
    docs: {
      description: {
        story: 'Micro-interactions for social features with satisfying animation feedback'
      }
    }
  }
}`,...(Y=(G=$.parameters)==null?void 0:G.docs)==null?void 0:Y.source}}};var F,U,X;I.parameters={...I.parameters,docs:{...(F=I.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <GestureDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Touch and mouse gesture interactions with haptic feedback'
      }
    }
  }
}`,...(X=(U=I.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var _,J,z;D.parameters={...D.parameters,docs:{...(_=D.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <LoadingStates />,
  parameters: {
    docs: {
      description: {
        story: 'Various loading animation patterns that engage users during wait times'
      }
    }
  }
}`,...(z=(J=D.parameters)==null?void 0:J.docs)==null?void 0:z.source}}};var O,W,Z;H.parameters={...H.parameters,docs:{...(O=H.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <AnimationsSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Animations that respect reduced motion preferences and accessibility needs'
      }
    }
  }
}`,...(Z=(W=H.parameters)==null?void 0:W.docs)==null?void 0:Z.source}}};const ps=["AdvancedAnimationsSystem","MicroInteractions","GestureInteractions","LoadingAnimations","AccessibleAnimations"];export{H as AccessibleAnimations,T as AdvancedAnimationsSystem,I as GestureInteractions,D as LoadingAnimations,$ as MicroInteractions,ps as __namedExportsOrder,xs as default};
