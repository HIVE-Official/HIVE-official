import{j as r}from"./jsx-runtime-SKoiH9zj.js";import{H as n}from"./hive-navigation-BJqD3lp7.js";import{r as Ee}from"./index-DJO9vBfz.js";import"./utils-CytzSlOG.js";import"./trending-up-CllCr3lL.js";import"./createLucideIcon-WpwZgzX-.js";import"./user-CFaOcM52.js";const qe={title:"Molecules/Hive Navigation",component:n,parameters:{layout:"fullscreen",docs:{description:{component:`
The core navigation component for HIVE platform, providing access to main sections: Feed, Spaces, HiveLab, and Profile. Features both full and compact variants for different layout needs.

**Key Features:**
- Full and compact variants
- Active state indicators
- User profile integration
- Hover tooltips (compact mode)
- Smooth animations and transitions
- Campus-focused navigation structure
- Responsive design patterns
        `}}},argTypes:{variant:{control:"select",options:["full","compact"],description:"Navigation display variant"},currentPath:{control:"text",description:"Current active path for highlighting"},user:{control:"object",description:"User object with profile information"}}},s={id:"1",name:"Sarah Chen",handle:"sarahc",avatar:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"},Ve={id:"2",name:"Alex Rodriguez",handle:"alexr"},a=({currentPath:e="/",...Me})=>{const[t,De]=Ee.useState(e);return r.jsxs("div",{className:"flex h-screen bg-[var(--hive-background-primary)]",children:[r.jsx(n,{currentPath:t,onItemClick:De,...Me}),r.jsx("div",{className:"flex-1 flex items-center justify-center p-8",children:r.jsxs("div",{className:"text-center",children:[r.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:t==="/"?"Feed":t==="/spaces"?"Spaces":t==="/hivelab"?"HiveLab":t==="/profile"?"Profile":"Page"}),r.jsxs("p",{className:"text-[var(--hive-text-secondary)]",children:["Current path: ",t]}),r.jsx("p",{className:"text-sm text-[var(--hive-text-tertiary)] mt-4",children:"Click navigation items to see active states"})]})})]})},i={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:s}},o={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:null}},c={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:s},parameters:{docs:{description:{story:"Full navigation with expanded labels and user profile section."}}}},d={render:e=>r.jsx(a,{...e}),args:{variant:"compact",user:s},parameters:{docs:{description:{story:"Compact navigation with icons only and hover tooltips."}}}},l={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:s,currentPath:"/"}},m={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:s,currentPath:"/spaces"}},p={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:s,currentPath:"/hivelab"}},u={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:s,currentPath:"/profile"}},v={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:{id:"3",name:"Maya Patel",handle:"mayap"}}},g={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:{id:"4",name:"Dr. Michael Foster",handle:"profmike"}}},h={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:{id:"5",name:"Alexandra Elizabeth Rodriguez-Martinez",handle:"alexrodriguezmart"}},parameters:{docs:{description:{story:"Navigation with long user name demonstrating text truncation."}}}},x={render:e=>r.jsx(a,{...e}),args:{variant:"compact",user:Ve}},f={render:e=>r.jsx(a,{...e}),args:{variant:"compact",user:null}},b={render:e=>r.jsx(a,{...e}),args:{variant:"compact",user:s,currentPath:"/spaces"}},y={render:()=>r.jsxs("div",{className:"flex h-screen bg-[var(--hive-background-primary)]",children:[r.jsxs("div",{className:"flex",children:[r.jsx(n,{variant:"full",user:s,currentPath:"/spaces",onItemClick:()=>{}}),r.jsx("div",{className:"w-px bg-[var(--hive-border-default)]"}),r.jsx(n,{variant:"compact",user:s,currentPath:"/spaces",onItemClick:()=>{}})]}),r.jsx("div",{className:"flex-1 flex items-center justify-center p-8",children:r.jsxs("div",{className:"text-center",children:[r.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Navigation Comparison"}),r.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Full vs Compact variants side by side"})]})})]}),parameters:{docs:{description:{story:"Side-by-side comparison of full and compact navigation variants."}}}},N={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:{id:"student1",name:"Jordan Kim",handle:"jordank"},currentPath:"/"},parameters:{docs:{description:{story:"Navigation as seen by a typical student user on their dashboard."}}}},j={render:e=>r.jsx(a,{...e}),args:{variant:"compact",user:{id:"builder1",name:"Taylor Davis",handle:"taylord"},currentPath:"/hivelab"},parameters:{docs:{description:{story:"Compact navigation for builders working in HiveLab, maximizing workspace."}}}},S={render:e=>r.jsx(a,{...e}),args:{variant:"full",user:{id:"leader1",name:"Emily Watson",handle:"emilyw"},currentPath:"/spaces"},parameters:{docs:{description:{story:"Navigation for space leaders managing their communities."}}}},P={render:e=>r.jsx("div",{className:"w-full max-w-sm mx-auto h-screen bg-[var(--hive-background-primary)]",children:r.jsx(a,{...e})}),args:{variant:"compact",user:s},parameters:{docs:{description:{story:"Compact navigation optimized for mobile and narrow screens."}}}},C={args:{variant:"full",user:s,currentPath:"/spaces"},render:e=>r.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)]",children:r.jsx(n,{...e})})},U={args:{variant:"compact",user:s,currentPath:"/hivelab"},render:e=>r.jsx("div",{className:"h-screen bg-[var(--hive-background-primary)]",children:r.jsx(n,{...e})})};var k,I,w;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser
  }
}`,...(w=(I=i.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var F,H,A;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: null
  }
}`,...(A=(H=o.parameters)==null?void 0:H.docs)==null?void 0:A.source}}};var z,L,W;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(W=(L=c.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var M,D,E;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(E=(D=d.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var V,R,B;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/'
  }
}`,...(B=(R=l.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var T,K,J;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/spaces'
  }
}`,...(J=(K=m.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var _,O,q;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/hivelab'
  }
}`,...(q=(O=p.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var G,Q,X;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/profile'
  }
}`,...(X=(Q=u.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,$;v.parameters={...v.parameters,docs:{...(Y=v.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: '3',
      name: 'Maya Patel',
      handle: 'mayap'
    }
  }
}`,...($=(Z=v.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,re,ae;g.parameters={...g.parameters,docs:{...(ee=g.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: '4',
      name: 'Dr. Michael Foster',
      handle: 'profmike'
    }
  }
}`,...(ae=(re=g.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var se,te,ne;h.parameters={...h.parameters,docs:{...(se=h.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(ne=(te=h.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var ie,oe,ce;x.parameters={...x.parameters,docs:{...(ie=x.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: alternateUser
  }
}`,...(ce=(oe=x.parameters)==null?void 0:oe.docs)==null?void 0:ce.source}}};var de,le,me;f.parameters={...f.parameters,docs:{...(de=f.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: null
  }
}`,...(me=(le=f.parameters)==null?void 0:le.docs)==null?void 0:me.source}}};var pe,ue,ve;b.parameters={...b.parameters,docs:{...(pe=b.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: args => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: sampleUser,
    currentPath: '/spaces'
  }
}`,...(ve=(ue=b.parameters)==null?void 0:ue.docs)==null?void 0:ve.source}}};var ge,he,xe;y.parameters={...y.parameters,docs:{...(ge=y.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(xe=(he=y.parameters)==null?void 0:he.docs)==null?void 0:xe.source}}};var fe,be,ye;N.parameters={...N.parameters,docs:{...(fe=N.parameters)==null?void 0:fe.docs,source:{originalSource:`{
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
}`,...(ye=(be=N.parameters)==null?void 0:be.docs)==null?void 0:ye.source}}};var Ne,je,Se;j.parameters={...j.parameters,docs:{...(Ne=j.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
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
}`,...(Se=(je=j.parameters)==null?void 0:je.docs)==null?void 0:Se.source}}};var Pe,Ce,Ue;S.parameters={...S.parameters,docs:{...(Pe=S.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
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
}`,...(Ue=(Ce=S.parameters)==null?void 0:Ce.docs)==null?void 0:Ue.source}}};var ke,Ie,we;P.parameters={...P.parameters,docs:{...(ke=P.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
}`,...(we=(Ie=P.parameters)==null?void 0:Ie.docs)==null?void 0:we.source}}};var Fe,He,Ae;C.parameters={...C.parameters,docs:{...(Fe=C.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/spaces'
  },
  render: args => <div className="h-screen bg-[var(--hive-background-primary)]">
      <HiveNavigation {...args} />
    </div>
}`,...(Ae=(He=C.parameters)==null?void 0:He.docs)==null?void 0:Ae.source}}};var ze,Le,We;U.parameters={...U.parameters,docs:{...(ze=U.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  args: {
    variant: 'compact',
    user: sampleUser,
    currentPath: '/hivelab'
  },
  render: args => <div className="h-screen bg-[var(--hive-background-primary)]">
      <HiveNavigation {...args} />
    </div>
}`,...(We=(Le=U.parameters)==null?void 0:Le.docs)==null?void 0:We.source}}};const Ge=["Default","WithoutUser","FullVariant","CompactVariant","FeedActive","SpacesActive","HiveLabActive","ProfileActive","StudentUser","FacultyUser","LongNameUser","CompactWithUser","CompactWithoutUser","CompactSpacesActive","SideBySideComparison","StudentDashboard","BuilderWorkspace","SpaceLeaderView","MobileLayout","StaticFull","StaticCompact"];export{j as BuilderWorkspace,b as CompactSpacesActive,d as CompactVariant,x as CompactWithUser,f as CompactWithoutUser,i as Default,g as FacultyUser,l as FeedActive,c as FullVariant,p as HiveLabActive,h as LongNameUser,P as MobileLayout,u as ProfileActive,y as SideBySideComparison,S as SpaceLeaderView,m as SpacesActive,U as StaticCompact,C as StaticFull,N as StudentDashboard,v as StudentUser,o as WithoutUser,Ge as __namedExportsOrder,qe as default};
