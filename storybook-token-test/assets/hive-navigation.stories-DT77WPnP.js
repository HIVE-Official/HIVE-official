import{j as e}from"./jsx-runtime-B9GTzLod.js";import{c}from"./utils-CytzSlOG.js";import{T as Oe}from"./trending-up-DHCBXhUA.js";import{L as Ge,C as Qe}from"./layers-CflMl-0r.js";import{U as Xe}from"./user-DLkx1tbP.js";import{r as Ye}from"./index-BMjrbHXN.js";import"./createLucideIcon-DtX30ipI.js";const q=[{id:"feed",icon:Oe,label:"Feed",href:"/"},{id:"spaces",icon:Ge,label:"Spaces",href:"/spaces"},{id:"hivelab",icon:Qe,label:"HiveLab",href:"/hivelab"},{id:"profile",icon:Xe,label:"Profile",href:"/profile"}],d=({variant:r="full",currentPath:l="/",onItemClick:n,user:i,className:L})=>{var W;const z=((W=i==null?void 0:i.name)==null?void 0:W.split(" ").map(s=>s[0]).join("").slice(0,2))||"",T=s=>l===s||s!=="/"&&l.startsWith(s+"/");return r==="compact"?e.jsxs("aside",{className:c("w-20 h-screen bg-[var(--hive-background-primary)] border-r border-[var(--hive-border-default)]","flex flex-col items-center py-6",L),children:[i&&e.jsx("div",{className:"w-12 h-12 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)] mb-8",children:z}),e.jsx("nav",{className:"space-y-3",children:q.map(s=>{const H=s.icon,o=T(s.href);return e.jsxs("button",{onClick:()=>n==null?void 0:n(s.href),className:c("w-12 h-12 rounded-2xl flex items-center justify-center relative group","transition-all duration-300 ease-out","hover:scale-105 active:scale-95",o?["bg-transparent","border-2 border-[var(--hive-brand-secondary)]","shadow-lg shadow-[var(--hive-brand-secondary)]/10"].join(" "):["bg-[var(--hive-background-secondary)]","border border-[var(--hive-border-default)]","hover:bg-[var(--hive-background-tertiary)]","hover:border-[var(--hive-border-secondary)]"].join(" ")),children:[e.jsx(H,{className:c("h-5 w-5 transition-all duration-300",o?"text-[var(--hive-brand-secondary)]":"text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]")}),e.jsx("div",{className:"absolute left-full ml-3 px-3 py-1.5 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-xl text-sm font-medium text-[var(--hive-text-primary)] opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none z-50 shadow-lg",children:s.label})]},s.id)})})]}):e.jsx("aside",{className:c("w-64 h-screen bg-[var(--hive-background-primary)] border-r border-[var(--hive-border-default)]",L),children:e.jsxs("div",{className:"flex flex-col h-full",children:[i&&e.jsx("div",{className:"p-6 border-b border-[var(--hive-border-default)]",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-12 h-12 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)]",children:z}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("div",{className:"font-semibold text-[var(--hive-text-primary)] truncate",children:i.name}),e.jsxs("div",{className:"text-sm text-[var(--hive-text-secondary)] truncate",children:["@",i.handle]})]})]})}),e.jsx("nav",{className:"flex-1 p-4",children:e.jsx("div",{className:"space-y-2",children:q.map(s=>{const H=s.icon,o=T(s.href);return e.jsxs("button",{onClick:()=>n==null?void 0:n(s.href),className:c("w-full flex items-center space-x-3 px-4 py-3 rounded-2xl","transition-all duration-300 ease-out group relative","hover:scale-[1.02] active:scale-[0.98]",o?["bg-transparent","border border-[var(--hive-brand-secondary)]","shadow-lg shadow-[var(--hive-brand-secondary)]/10"].join(" "):["bg-transparent","border border-transparent","hover:bg-[var(--hive-background-secondary)]","hover:border-[var(--hive-border-default)]"].join(" ")),children:[e.jsx("div",{className:c("w-8 h-8 rounded-xl flex items-center justify-center","transition-all duration-300",o?"bg-[var(--hive-brand-secondary)]/10":"bg-[var(--hive-background-tertiary)] group-hover:bg-[var(--hive-background-secondary)]"),children:e.jsx(H,{className:c("h-5 w-5 transition-all duration-300",o?"text-[var(--hive-brand-secondary)]":"text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]")})}),e.jsx("span",{className:c("font-medium transition-all duration-300 flex-1 text-left",o?"text-[var(--hive-brand-secondary)]":"text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]"),children:s.label}),o&&e.jsx("div",{className:"w-2 h-8 bg-[var(--hive-brand-secondary)] rounded-full opacity-80"})]},s.id)})})})]})})};d.__docgenInfo={description:"",methods:[],displayName:"HiveNavigation",props:{variant:{required:!1,tsType:{name:"union",raw:"'full' | 'compact'",elements:[{name:"literal",value:"'full'"},{name:"literal",value:"'compact'"}]},description:"",defaultValue:{value:"'full'",computed:!1}},currentPath:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'/'",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(href: string) => void",signature:{arguments:[{type:{name:"string"},name:"href"}],return:{name:"void"}}},description:""},user:{required:!1,tsType:{name:"union",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
} | null`,elements:[{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"handle",value:{name:"string",required:!0}},{key:"avatar",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const ir={title:"Molecules/Hive Navigation",component:d,parameters:{layout:"fullscreen",docs:{description:{component:`
The core navigation component for HIVE platform, providing access to main sections: Feed, Spaces, HiveLab, and Profile. Features both full and compact variants for different layout needs.

**Key Features:**
- Full and compact variants
- Active state indicators
- User profile integration
- Hover tooltips (compact mode)
- Smooth animations and transitions
- Campus-focused navigation structure
- Responsive design patterns
        `}}},argTypes:{variant:{control:"select",options:["full","compact"],description:"Navigation display variant"},currentPath:{control:"text",description:"Current active path for highlighting"},user:{control:"object",description:"User object with profile information"}}},t={id:"1",name:"Sarah Chen",handle:"sarahc",avatar:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"},Ze={id:"2",name:"Alex Rodriguez",handle:"alexr"},a=({currentPath:r="/",...l})=>{const[n,i]=Ye.useState(r);return e.jsxs("div",{className:"flex h-screen bg-[var(--hive-background-primary)]",children:[e.jsx(d,{currentPath:n,onItemClick:i,...l}),e.jsx("div",{className:"flex-1 flex items-center justify-center p-8",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:n==="/"?"Feed":n==="/spaces"?"Spaces":n==="/hivelab"?"HiveLab":n==="/profile"?"Profile":"Page"}),e.jsxs("p",{className:"text-[var(--hive-text-secondary)]",children:["Current path: ",n]}),e.jsx("p",{className:"text-sm text-[var(--hive-text-tertiary)] mt-4",children:"Click navigation items to see active states"})]})})]})},m={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:t}},p={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:null}},v={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:t},parameters:{docs:{description:{story:"Full navigation with expanded labels and user profile section."}}}},u={render:r=>e.jsx(a,{...r}),args:{variant:"compact",user:t},parameters:{docs:{description:{story:"Compact navigation with icons only and hover tooltips."}}}},g={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:t,currentPath:"/"}},h={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:t,currentPath:"/spaces"}},x={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:t,currentPath:"/hivelab"}},f={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:t,currentPath:"/profile"}},b={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:{id:"3",name:"Maya Patel",handle:"mayap"}}},y={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:{id:"4",name:"Dr. Michael Foster",handle:"profmike"}}},N={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:{id:"5",name:"Alexandra Elizabeth Rodriguez-Martinez",handle:"alexrodriguezmart"}},parameters:{docs:{description:{story:"Navigation with long user name demonstrating text truncation."}}}},j={render:r=>e.jsx(a,{...r}),args:{variant:"compact",user:Ze}},S={render:r=>e.jsx(a,{...r}),args:{variant:"compact",user:null}},w={render:r=>e.jsx(a,{...r}),args:{variant:"compact",user:t,currentPath:"/spaces"}},P={render:()=>e.jsxs("div",{className:"flex h-screen bg-[var(--hive-background-primary)]",children:[e.jsxs("div",{className:"flex",children:[e.jsx(d,{variant:"full",user:t,currentPath:"/spaces",onItemClick:()=>{}}),e.jsx("div",{className:"w-px bg-[var(--hive-border-default)]"}),e.jsx(d,{variant:"compact",user:t,currentPath:"/spaces",onItemClick:()=>{}})]}),e.jsx("div",{className:"flex-1 flex items-center justify-center p-8",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Navigation Comparison"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Full vs Compact variants side by side"})]})})]}),parameters:{docs:{description:{story:"Side-by-side comparison of full and compact navigation variants."}}}},k={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:{id:"student1",name:"Jordan Kim",handle:"jordank"},currentPath:"/"},parameters:{docs:{description:{story:"Navigation as seen by a typical student user on their dashboard."}}}},U={render:r=>e.jsx(a,{...r}),args:{variant:"compact",user:{id:"builder1",name:"Taylor Davis",handle:"taylord"},currentPath:"/hivelab"},parameters:{docs:{description:{story:"Compact navigation for builders working in HiveLab, maximizing workspace."}}}},C={render:r=>e.jsx(a,{...r}),args:{variant:"full",user:{id:"leader1",name:"Emily Watson",handle:"emilyw"},currentPath:"/spaces"},parameters:{docs:{description:{story:"Navigation for space leaders managing their communities."}}}},I={render:r=>e.jsx("div",{className:"w-full max-w-sm mx-auto h-screen bg-[var(--hive-background-primary)]",children:e.jsx(a,{...r})}),args:{variant:"compact",user:t},parameters:{docs:{description:{story:"Compact navigation optimized for mobile and narrow screens."}}}},F={args:{variant:"full",user:t,currentPath:"/spaces"},render:r=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)]",children:e.jsx(d,{...r})})},A={args:{variant:"compact",user:t,currentPath:"/hivelab"},render:r=>e.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)]",children:e.jsx(d,{...r})})};var M,V,D;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser
  }
}`,...(D=(V=m.parameters)==null?void 0:V.docs)==null?void 0:D.source}}};var E,R,B;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: null
  }
}`,...(B=(R=p.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var _,K,J;v.parameters={...v.parameters,docs:{...(_=v.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser
  },
  parameters: {
    docs: {
      description: {
        story: 'Full navigation with expanded labels and user profile section.'
      }
    }
  }
}`,...(J=(K=v.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var O,G,Q;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: sampleUser
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact navigation with icons only and hover tooltips.'
      }
    }
  }
}`,...(Q=(G=u.parameters)==null?void 0:G.docs)==null?void 0:Q.source}}};var X,Y,Z;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/'
  }
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,re;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/spaces'
  }
}`,...(re=(ee=h.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ae,se,ne;x.parameters={...x.parameters,docs:{...(ae=x.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/hivelab'
  }
}`,...(ne=(se=x.parameters)==null?void 0:se.docs)==null?void 0:ne.source}}};var te,ie,oe;f.parameters={...f.parameters,docs:{...(te=f.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/profile'
  }
}`,...(oe=(ie=f.parameters)==null?void 0:ie.docs)==null?void 0:oe.source}}};var ce,de,le;b.parameters={...b.parameters,docs:{...(ce=b.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: '3',
      name: 'Maya Patel',
      handle: 'mayap'
    }
  }
}`,...(le=(de=b.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var me,pe,ve;y.parameters={...y.parameters,docs:{...(me=y.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: '4',
      name: 'Dr. Michael Foster',
      handle: 'profmike'
    }
  }
}`,...(ve=(pe=y.parameters)==null?void 0:pe.docs)==null?void 0:ve.source}}};var ue,ge,he;N.parameters={...N.parameters,docs:{...(ue=N.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: '5',
      name: 'Alexandra Elizabeth Rodriguez-Martinez',
      handle: 'alexrodriguezmart'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation with long user name demonstrating text truncation.'
      }
    }
  }
}`,...(he=(ge=N.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var xe,fe,be;j.parameters={...j.parameters,docs:{...(xe=j.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: alternateUser
  }
}`,...(be=(fe=j.parameters)==null?void 0:fe.docs)==null?void 0:be.source}}};var ye,Ne,je;S.parameters={...S.parameters,docs:{...(ye=S.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: null
  }
}`,...(je=(Ne=S.parameters)==null?void 0:Ne.docs)==null?void 0:je.source}}};var Se,we,Pe;w.parameters={...w.parameters,docs:{...(Se=w.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: sampleUser,
    currentPath: '/spaces'
  }
}`,...(Pe=(we=w.parameters)==null?void 0:we.docs)==null?void 0:Pe.source}}};var ke,Ue,Ce;P.parameters={...P.parameters,docs:{...(ke=P.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  render: () => <div className="flex h-screen bg-[var(--hive-background-primary)]">
      <div className="flex">
        <HiveNavigation variant="full" user={sampleUser} currentPath="/spaces" onItemClick={() => {}} />
        <div className="w-px bg-[var(--hive-border-default)]" />
        <HiveNavigation variant="compact" user={sampleUser} currentPath="/spaces" onItemClick={() => {}} />
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
            Navigation Comparison
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Full vs Compact variants side by side
          </p>
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of full and compact navigation variants.'
      }
    }
  }
}`,...(Ce=(Ue=P.parameters)==null?void 0:Ue.docs)==null?void 0:Ce.source}}};var Ie,Fe,Ae;k.parameters={...k.parameters,docs:{...(Ie=k.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: 'student1',
      name: 'Jordan Kim',
      handle: 'jordank'
    },
    currentPath: '/'
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation as seen by a typical student user on their dashboard.'
      }
    }
  }
}`,...(Ae=(Fe=k.parameters)==null?void 0:Fe.docs)==null?void 0:Ae.source}}};var He,Le,ze;U.parameters={...U.parameters,docs:{...(He=U.parameters)==null?void 0:He.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: {
      id: 'builder1',
      name: 'Taylor Davis',
      handle: 'taylord'
    },
    currentPath: '/hivelab'
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact navigation for builders working in HiveLab, maximizing workspace.'
      }
    }
  }
}`,...(ze=(Le=U.parameters)==null?void 0:Le.docs)==null?void 0:ze.source}}};var Te,We,qe;C.parameters={...C.parameters,docs:{...(Te=C.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: 'leader1',
      name: 'Emily Watson',
      handle: 'emilyw'
    },
    currentPath: '/spaces'
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation for space leaders managing their communities.'
      }
    }
  }
}`,...(qe=(We=C.parameters)==null?void 0:We.docs)==null?void 0:qe.source}}};var Me,Ve,De;I.parameters={...I.parameters,docs:{...(Me=I.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  render: args => <div className="w-full max-w-sm mx-auto h-screen bg-[var(--hive-background-primary)]">
      <InteractiveNavigation {...args} />
    </div>,
  args: {
    variant: 'compact',
    user: sampleUser
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact navigation optimized for mobile and narrow screens.'
      }
    }
  }
}`,...(De=(Ve=I.parameters)==null?void 0:Ve.docs)==null?void 0:De.source}}};var Ee,Re,Be;F.parameters={...F.parameters,docs:{...(Ee=F.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/spaces'
  },
  render: args => <div className="h-screen bg-[var(--hive-background-primary)]">
      <HiveNavigation {...args} />
    </div>
}`,...(Be=(Re=F.parameters)==null?void 0:Re.docs)==null?void 0:Be.source}}};var _e,Ke,Je;A.parameters={...A.parameters,docs:{...(_e=A.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    variant: 'compact',
    user: sampleUser,
    currentPath: '/hivelab'
  },
  render: args => <div className="h-screen bg-[var(--hive-background-primary)]">
      <HiveNavigation {...args} />
    </div>
}`,...(Je=(Ke=A.parameters)==null?void 0:Ke.docs)==null?void 0:Je.source}}};const or=["Default","WithoutUser","FullVariant","CompactVariant","FeedActive","SpacesActive","HiveLabActive","ProfileActive","StudentUser","FacultyUser","LongNameUser","CompactWithUser","CompactWithoutUser","CompactSpacesActive","SideBySideComparison","StudentDashboard","BuilderWorkspace","SpaceLeaderView","MobileLayout","StaticFull","StaticCompact"];export{U as BuilderWorkspace,w as CompactSpacesActive,u as CompactVariant,j as CompactWithUser,S as CompactWithoutUser,m as Default,y as FacultyUser,g as FeedActive,v as FullVariant,x as HiveLabActive,N as LongNameUser,I as MobileLayout,f as ProfileActive,P as SideBySideComparison,C as SpaceLeaderView,h as SpacesActive,A as StaticCompact,F as StaticFull,k as StudentDashboard,b as StudentUser,p as WithoutUser,or as __namedExportsOrder,ir as default};
