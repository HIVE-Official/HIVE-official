import{j as o}from"./jsx-runtime-B9GTzLod.js";import{U as a}from"./user-card-BTBApjju.js";import"./index-BMjrbHXN.js";import"./utils-CytzSlOG.js";import"./avatar-Cb2P8PXW.js";import"./user-DLkx1tbP.js";import"./createLucideIcon-DtX30ipI.js";import"./button-enhanced-DKTgaNxR.js";import"./index-BwobEAja.js";import"./users-B5XgMSov.js";import"./house-Bg02DBcS.js";import"./graduation-cap-CjRbfMsL.js";import"./user-check-Div6BfLT.js";import"./user-plus-BC0iow-Q.js";import"./message-circle-CnQJGxxu.js";import"./ellipsis-D2AHQBIe.js";import"./mail-DQ8H9hI8.js";import"./map-pin-J5WJcL57.js";import"./calendar-RwBiWFlj.js";import"./link-D9HUmIqS.js";const bo={title:"Molecules/User Card",component:a,parameters:{layout:"centered",docs:{description:{component:`
A comprehensive user profile card component for displaying detailed user information, social stats, and action buttons. Perfect for user directories, member lists, and social interactions in HIVE.

**Key Features:**
- Multiple variants (default, compact, detailed, minimal)
- Relationship states (following, followed, mutual, blocked)
- Social stats (followers, following, spaces, tools)
- User roles and affiliations
- Interactive action buttons
- Campus-specific information display
- Responsive layout design
        `}}},argTypes:{user:{control:"object",description:"User data object with profile information"},variant:{control:"select",options:["default","compact","detailed","minimal"],description:"Card display variant"},relationship:{control:"select",options:["none","following","followed","mutual","blocked"],description:"Current relationship with the user"},showActions:{control:"boolean",description:"Show action buttons (follow, message, etc.)"},showStats:{control:"boolean",description:"Show social statistics"},showBio:{control:"boolean",description:"Show user bio text"},showDetails:{control:"boolean",description:"Show detailed profile information"},interactive:{control:"boolean",description:"Enable hover states and click interactions"}}},e={id:"1",name:"Sarah Chen",handle:"sarahc",avatar:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",bio:"CS Major passionate about AI and machine learning. Building tools to help students succeed. Always down for a good study session! 🤖📚",status:"online",role:"builder",affiliation:"university",privacy:"public",university:"Stanford University",graduationYear:2025,major:"Computer Science",location:"Palo Alto, CA",joinedDate:"September 2021",website:"https://sarahchen.dev",followers:1234,following:567,spaces:12,tools:8},s={id:"2",name:"Alex Rodriguez",handle:"alexr",bio:"Math major, tutor, and problem solver. Love helping classmates with calculus and statistics.",status:"away",role:"student",university:"UC Berkeley",graduationYear:2026,major:"Mathematics",followers:456,following:234,spaces:8,tools:3},Xe={id:"3",name:"Emily Watson",handle:"emilyw",avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",bio:"Psychology major and Debate Club President. Passionate about mental health advocacy and public speaking.",status:"online",role:"leader",university:"Harvard University",graduationYear:2024,major:"Psychology",location:"Cambridge, MA",joinedDate:"August 2020",followers:2345,following:1234,spaces:15,tools:5},Ze={id:"4",name:"Dr. Michael Foster",handle:"profmike",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",bio:"Computer Science Professor specializing in distributed systems and databases. Office hours: MW 2-4pm.",status:"busy",role:"verified",university:"MIT",major:"Computer Science Faculty",location:"Cambridge, MA",joinedDate:"January 2019",website:"https://cs.mit.edu/~foster",followers:5678,following:123,spaces:25,tools:15},n={args:{user:e,relationship:"none"}},i={args:{user:{...e,avatar:void 0},relationship:"none"}},t={args:{user:e,relationship:"none",interactive:!0,onFollow:r=>console.log("Follow user:",r),onMessage:r=>console.log("Message user:",r),onViewProfile:r=>console.log("View profile:",r)}},l={args:{user:e,variant:"minimal",relationship:"none"},parameters:{docs:{description:{story:"Compact display showing only essential information."}}}},c={args:{user:e,variant:"compact",relationship:"none"},parameters:{docs:{description:{story:"Balanced display with key information and basic stats."}}}},d={args:{user:e,variant:"detailed",relationship:"none"},parameters:{docs:{description:{story:"Full display with all available information including profile details."}}}},p={args:{user:s,relationship:"none"}},m={args:{user:s,relationship:"following"}},u={args:{user:s,relationship:"followed"}},h={args:{user:s,relationship:"mutual"}},g={args:{user:{...s,bio:"This user has been blocked."},relationship:"blocked"}},f={args:{user:s,relationship:"none"}},w={args:{user:e,relationship:"none"}},y={args:{user:Xe,relationship:"none"}},v={args:{user:Ze,relationship:"none"}},b={args:{user:e,relationship:"none",showActions:!1}},S={args:{user:e,relationship:"none",showStats:!1}},C={args:{user:e,relationship:"none",showBio:!1}},j={args:{user:e,relationship:"none",showStats:!1,showBio:!1,showDetails:!1},parameters:{docs:{description:{story:"Minimal information display with just name, handle, and role."}}}},U={args:{user:{id:"5",name:"Maya Patel",handle:"mayap",bio:"Biology major focusing on genetics research. Lab TA for Bio 101.",role:"student",university:"UC Davis",graduationYear:2025,major:"Biology",followers:234,following:156,spaces:6,tools:2},variant:"compact",relationship:"none"},parameters:{docs:{description:{story:"Example of a study group member profile."}}}},B={args:{user:{id:"6",name:"Jordan Kim",handle:"jordank",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",bio:"Full-stack developer and CS senior. Love building tools that make campus life easier!",role:"builder",university:"Carnegie Mellon",graduationYear:2024,major:"Computer Science",followers:890,following:345,spaces:18,tools:22},variant:"detailed",relationship:"mutual"},parameters:{docs:{description:{story:"Profile of an active tool builder and collaborator."}}}},x={args:{user:{id:"7",name:"Taylor Davis",handle:"taylord",avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",bio:"Business major and entrepreneur. Leading the Startup Club and organizing pitch competitions.",role:"leader",university:"Wharton School",graduationYear:2024,major:"Business Administration",location:"Philadelphia, PA",followers:1876,following:567,spaces:12,tools:8},relationship:"following"},parameters:{docs:{description:{story:"Profile of a space leader and community organizer."}}}},M={args:{user:{id:"8",name:"Chris Thompson",handle:"christ",bio:"RA for West Hall, Psychology major. Here to help with any dorm life questions!",role:"leader",affiliation:"residential",university:"NYU",graduationYear:2025,major:"Psychology",location:"New York, NY",followers:567,following:234,spaces:8,tools:4},variant:"compact",relationship:"none"},parameters:{docs:{description:{story:"Profile of a residential assistant with leadership role."}}}},A={render:()=>o.jsxs("div",{className:"space-y-4 w-96",children:[o.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"CS Study Group Members"}),o.jsx(a,{user:{id:"1",name:"Sarah Chen",handle:"sarahc",role:"builder",university:"Stanford",major:"Computer Science",followers:1234,following:567,spaces:12,tools:8},variant:"minimal",relationship:"mutual",showStats:!1}),o.jsx(a,{user:{id:"2",name:"Alex Rodriguez",handle:"alexr",role:"student",university:"UC Berkeley",major:"Mathematics",followers:456,following:234,spaces:8,tools:3},variant:"minimal",relationship:"following",showStats:!1}),o.jsx(a,{user:{id:"3",name:"Maya Patel",handle:"mayap",role:"student",university:"UC Davis",major:"Biology",followers:234,following:156,spaces:6,tools:2},variant:"minimal",relationship:"none",showStats:!1})]}),parameters:{docs:{description:{story:"Example of user cards in a directory or member list."}}}},P={render:()=>o.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl",children:[o.jsx(a,{user:{id:"1",name:"Jordan Kim",handle:"jordank",bio:"CS senior building productivity tools for students",role:"builder",university:"Carnegie Mellon",major:"Computer Science",followers:890,following:345,spaces:18,tools:22},variant:"compact",relationship:"none"}),o.jsx(a,{user:{id:"2",name:"Taylor Davis",handle:"taylord",bio:"Business major leading startup initiatives on campus",role:"leader",university:"Wharton",major:"Business",followers:1876,following:567,spaces:12,tools:8},variant:"compact",relationship:"none"})]}),parameters:{docs:{description:{story:"Example of suggested connections or recommendations layout."}}}};var k,D,N;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none'
  }
}`,...(N=(D=n.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var F,R,Y;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    user: {
      ...sampleUser,
      avatar: undefined
    },
    relationship: 'none'
  }
}`,...(Y=(R=i.parameters)==null?void 0:R.docs)==null?void 0:Y.source}}};var I,T,V;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none',
    interactive: true,
    onFollow: userId => console.log('Follow user:', userId),
    onMessage: userId => console.log('Message user:', userId),
    onViewProfile: userId => console.log('View profile:', userId)
  }
}`,...(V=(T=t.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var E,L,W;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    variant: 'minimal',
    relationship: 'none'
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact display showing only essential information.'
      }
    }
  }
}`,...(W=(L=l.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var z,H,J;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    variant: 'compact',
    relationship: 'none'
  },
  parameters: {
    docs: {
      description: {
        story: 'Balanced display with key information and basic stats.'
      }
    }
  }
}`,...(J=(H=c.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,G,q;d.parameters={...d.parameters,docs:{...(K=d.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    variant: 'detailed',
    relationship: 'none'
  },
  parameters: {
    docs: {
      description: {
        story: 'Full display with all available information including profile details.'
      }
    }
  }
}`,...(q=(G=d.parameters)==null?void 0:G.docs)==null?void 0:q.source}}};var O,_,Q;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    user: studentUser,
    relationship: 'none'
  }
}`,...(Q=(_=p.parameters)==null?void 0:_.docs)==null?void 0:Q.source}}};var X,Z,$;m.parameters={...m.parameters,docs:{...(X=m.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    user: studentUser,
    relationship: 'following'
  }
}`,...($=(Z=m.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,oe,ae;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    user: studentUser,
    relationship: 'followed'
  }
}`,...(ae=(oe=u.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};var se,re,ne;h.parameters={...h.parameters,docs:{...(se=h.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    user: studentUser,
    relationship: 'mutual'
  }
}`,...(ne=(re=h.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var ie,te,le;g.parameters={...g.parameters,docs:{...(ie=g.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    user: {
      ...studentUser,
      bio: 'This user has been blocked.'
    },
    relationship: 'blocked'
  }
}`,...(le=(te=g.parameters)==null?void 0:te.docs)==null?void 0:le.source}}};var ce,de,pe;f.parameters={...f.parameters,docs:{...(ce=f.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    user: studentUser,
    relationship: 'none'
  }
}`,...(pe=(de=f.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var me,ue,he;w.parameters={...w.parameters,docs:{...(me=w.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none'
  }
}`,...(he=(ue=w.parameters)==null?void 0:ue.docs)==null?void 0:he.source}}};var ge,fe,we;y.parameters={...y.parameters,docs:{...(ge=y.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    user: leaderUser,
    relationship: 'none'
  }
}`,...(we=(fe=y.parameters)==null?void 0:fe.docs)==null?void 0:we.source}}};var ye,ve,be;v.parameters={...v.parameters,docs:{...(ye=v.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    user: verifiedUser,
    relationship: 'none'
  }
}`,...(be=(ve=v.parameters)==null?void 0:ve.docs)==null?void 0:be.source}}};var Se,Ce,je;b.parameters={...b.parameters,docs:{...(Se=b.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none',
    showActions: false
  }
}`,...(je=(Ce=b.parameters)==null?void 0:Ce.docs)==null?void 0:je.source}}};var Ue,Be,xe;S.parameters={...S.parameters,docs:{...(Ue=S.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none',
    showStats: false
  }
}`,...(xe=(Be=S.parameters)==null?void 0:Be.docs)==null?void 0:xe.source}}};var Me,Ae,Pe;C.parameters={...C.parameters,docs:{...(Me=C.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none',
    showBio: false
  }
}`,...(Pe=(Ae=C.parameters)==null?void 0:Ae.docs)==null?void 0:Pe.source}}};var ke,De,Ne;j.parameters={...j.parameters,docs:{...(ke=j.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none',
    showStats: false,
    showBio: false,
    showDetails: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal information display with just name, handle, and role.'
      }
    }
  }
}`,...(Ne=(De=j.parameters)==null?void 0:De.docs)==null?void 0:Ne.source}}};var Fe,Re,Ye;U.parameters={...U.parameters,docs:{...(Fe=U.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    user: {
      id: '5',
      name: 'Maya Patel',
      handle: 'mayap',
      bio: 'Biology major focusing on genetics research. Lab TA for Bio 101.',
      role: 'student' as const,
      university: 'UC Davis',
      graduationYear: 2025,
      major: 'Biology',
      followers: 234,
      following: 156,
      spaces: 6,
      tools: 2
    },
    variant: 'compact',
    relationship: 'none'
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a study group member profile.'
      }
    }
  }
}`,...(Ye=(Re=U.parameters)==null?void 0:Re.docs)==null?void 0:Ye.source}}};var Ie,Te,Ve;B.parameters={...B.parameters,docs:{...(Ie=B.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    user: {
      id: '6',
      name: 'Jordan Kim',
      handle: 'jordank',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Full-stack developer and CS senior. Love building tools that make campus life easier!',
      role: 'builder' as const,
      university: 'Carnegie Mellon',
      graduationYear: 2024,
      major: 'Computer Science',
      followers: 890,
      following: 345,
      spaces: 18,
      tools: 22
    },
    variant: 'detailed',
    relationship: 'mutual'
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile of an active tool builder and collaborator.'
      }
    }
  }
}`,...(Ve=(Te=B.parameters)==null?void 0:Te.docs)==null?void 0:Ve.source}}};var Ee,Le,We;x.parameters={...x.parameters,docs:{...(Ee=x.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    user: {
      id: '7',
      name: 'Taylor Davis',
      handle: 'taylord',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Business major and entrepreneur. Leading the Startup Club and organizing pitch competitions.',
      role: 'leader' as const,
      university: 'Wharton School',
      graduationYear: 2024,
      major: 'Business Administration',
      location: 'Philadelphia, PA',
      followers: 1876,
      following: 567,
      spaces: 12,
      tools: 8
    },
    relationship: 'following'
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile of a space leader and community organizer.'
      }
    }
  }
}`,...(We=(Le=x.parameters)==null?void 0:Le.docs)==null?void 0:We.source}}};var ze,He,Je;M.parameters={...M.parameters,docs:{...(ze=M.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  args: {
    user: {
      id: '8',
      name: 'Chris Thompson',
      handle: 'christ',
      bio: 'RA for West Hall, Psychology major. Here to help with any dorm life questions!',
      role: 'leader' as const,
      affiliation: 'residential' as const,
      university: 'NYU',
      graduationYear: 2025,
      major: 'Psychology',
      location: 'New York, NY',
      followers: 567,
      following: 234,
      spaces: 8,
      tools: 4
    },
    variant: 'compact',
    relationship: 'none'
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile of a residential assistant with leadership role.'
      }
    }
  }
}`,...(Je=(He=M.parameters)==null?void 0:He.docs)==null?void 0:Je.source}}};var Ke,Ge,qe;A.parameters={...A.parameters,docs:{...(Ke=A.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-96">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
        CS Study Group Members
      </h3>
      <UserCard user={{
      id: '1',
      name: 'Sarah Chen',
      handle: 'sarahc',
      role: 'builder',
      university: 'Stanford',
      major: 'Computer Science',
      followers: 1234,
      following: 567,
      spaces: 12,
      tools: 8
    }} variant="minimal" relationship="mutual" showStats={false} />
      <UserCard user={{
      id: '2',
      name: 'Alex Rodriguez',
      handle: 'alexr',
      role: 'student',
      university: 'UC Berkeley',
      major: 'Mathematics',
      followers: 456,
      following: 234,
      spaces: 8,
      tools: 3
    }} variant="minimal" relationship="following" showStats={false} />
      <UserCard user={{
      id: '3',
      name: 'Maya Patel',
      handle: 'mayap',
      role: 'student',
      university: 'UC Davis',
      major: 'Biology',
      followers: 234,
      following: 156,
      spaces: 6,
      tools: 2
    }} variant="minimal" relationship="none" showStats={false} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Example of user cards in a directory or member list.'
      }
    }
  }
}`,...(qe=(Ge=A.parameters)==null?void 0:Ge.docs)==null?void 0:qe.source}}};var Oe,_e,Qe;P.parameters={...P.parameters,docs:{...(Oe=P.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      <UserCard user={{
      id: '1',
      name: 'Jordan Kim',
      handle: 'jordank',
      bio: 'CS senior building productivity tools for students',
      role: 'builder',
      university: 'Carnegie Mellon',
      major: 'Computer Science',
      followers: 890,
      following: 345,
      spaces: 18,
      tools: 22
    }} variant="compact" relationship="none" />
      <UserCard user={{
      id: '2',
      name: 'Taylor Davis',
      handle: 'taylord',
      bio: 'Business major leading startup initiatives on campus',
      role: 'leader',
      university: 'Wharton',
      major: 'Business',
      followers: 1876,
      following: 567,
      spaces: 12,
      tools: 8
    }} variant="compact" relationship="none" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Example of suggested connections or recommendations layout.'
      }
    }
  }
}`,...(Qe=(_e=P.parameters)==null?void 0:_e.docs)==null?void 0:Qe.source}}};const So=["Default","WithoutAvatar","Interactive","MinimalVariant","CompactVariant","DetailedVariant","NotFollowing","Following","FollowedByUser","MutualFollowing","BlockedUser","StudentRole","BuilderRole","LeaderRole","VerifiedRole","NoActions","NoStats","NoBio","BasicInfo","StudyGroupMember","ToolCollaborator","SpaceLeader","ResidentialAssistant","UserDirectory","SuggestedConnections"];export{j as BasicInfo,g as BlockedUser,w as BuilderRole,c as CompactVariant,n as Default,d as DetailedVariant,u as FollowedByUser,m as Following,t as Interactive,y as LeaderRole,l as MinimalVariant,h as MutualFollowing,b as NoActions,C as NoBio,S as NoStats,p as NotFollowing,M as ResidentialAssistant,x as SpaceLeader,f as StudentRole,U as StudyGroupMember,P as SuggestedConnections,B as ToolCollaborator,A as UserDirectory,v as VerifiedRole,i as WithoutAvatar,So as __namedExportsOrder,bo as default};
