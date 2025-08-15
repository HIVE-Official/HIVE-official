import{j as e}from"./jsx-runtime-B9GTzLod.js";import{A as r}from"./avatar-card-C3ZJQcI1.js";import"./index-BMjrbHXN.js";import"./utils-CytzSlOG.js";import"./avatar-Cb2P8PXW.js";import"./user-DLkx1tbP.js";import"./createLucideIcon-DtX30ipI.js";import"./check-ChQelZXp.js";import"./crown-Bf-Ij_V7.js";import"./star-q8LOEa9p.js";import"./graduation-cap-CjRbfMsL.js";const rr={title:"Molecules/Avatar Card",component:r,parameters:{layout:"centered",docs:{description:{component:`
A flexible avatar card component that combines an avatar with user information, status indicators, and role badges. Perfect for user profiles, member lists, and social interactions in HIVE.

**Key Features:**
- Multiple sizes (sm, md, lg)
- Various user roles (student, builder, leader, verified)  
- Status indicators (online, offline, away, busy, ghost)
- Privacy modes (public, ghost, anonymous)
- Layout options (horizontal, vertical)
- Interactive hover states
- Campus-specific roles and affiliations
        `}}},argTypes:{name:{control:"text",description:"User's full name"},subtitle:{control:"text",description:"Additional information like major, year, or role"},size:{control:"select",options:["sm","md","lg"],description:"Card size variant"},status:{control:"select",options:["online","offline","away","busy","ghost"],description:"User's current activity status"},role:{control:"select",options:["student","builder","leader","verified"],description:"User's role or verification status"},affiliation:{control:"select",options:["university","residential","greek"],description:"Campus affiliation type"},privacy:{control:"select",options:["public","ghost","anonymous"],description:"Privacy mode affecting avatar display"},layout:{control:"select",options:["horizontal","vertical"],description:"Layout direction for content"},interactive:{control:"boolean",description:"Enable hover states and cursor pointer"},src:{control:"text",description:"Avatar image URL"}}},t={args:{name:"Sarah Chen",subtitle:"Computer Science • Junior",status:"online",role:"student"}},a={args:{name:"Alex Rodriguez",subtitle:"Mathematics • Senior",src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",status:"online",role:"builder"}},s={args:{name:"Emily Watson",subtitle:"Psychology • Sophomore",status:"online",role:"verified",interactive:!0},parameters:{docs:{description:{story:"Interactive cards show hover effects and can be clicked."}}}},o={args:{name:"Maya Patel",subtitle:"Biology",size:"sm",status:"online",role:"student"}},n={args:{name:"Jordan Kim",subtitle:"Engineering • Graduate Student",size:"lg",status:"away",role:"leader",interactive:!0}},i={args:{name:"Chris Thompson",subtitle:"History • Freshman",role:"student",status:"online"}},c={args:{name:"Sam Liu",subtitle:"CS • Senior • Tool Creator",role:"builder",status:"online"}},l={args:{name:"Taylor Davis",subtitle:"Space Leader • Business",role:"leader",status:"away"}},u={args:{name:"Dr. Amanda Foster",subtitle:"Faculty • Computer Science",role:"verified",status:"online"}},d={args:{name:"Ryan Mitchell",subtitle:"Physics • Junior",status:"online",role:"student"}},m={args:{name:"Zoe Adams",subtitle:"Art • Sophomore",status:"away",role:"builder"}},p={args:{name:"Marcus Johnson",subtitle:"Engineering • Senior",status:"busy",role:"leader"}},b={args:{name:"Anonymous User",subtitle:"Ghost Mode Active",status:"ghost",privacy:"ghost"}},g={args:{name:"Olivia Brown",subtitle:"Literature • Junior",layout:"horizontal",status:"online",role:"student"}},y={args:{name:"Noah Wilson",subtitle:"Chemistry • Senior",layout:"vertical",status:"online",role:"builder",interactive:!0}},v={args:{name:"Isabella Garcia",subtitle:"Sociology • Junior",privacy:"public",status:"online",role:"student"}},S={args:{name:"Ghost User",subtitle:"Privacy Mode Enabled",privacy:"ghost",status:"ghost"}},h={args:{name:"Anonymous",subtitle:"Hidden Identity",privacy:"anonymous"}},f={args:{name:"Lucas Martinez",subtitle:"CS 101 Study Group • Freshman",status:"online",role:"student",interactive:!0},parameters:{docs:{description:{story:"Representing a member in a study group or academic space."}}}},C={args:{name:"Grace Lee",subtitle:"RA • Smith Hall • Senior",status:"online",role:"leader",affiliation:"residential",interactive:!0}},A={args:{name:"Daniel Park",subtitle:"GPA Calculator Creator • CS",status:"away",role:"builder",interactive:!0}},M={args:{name:"Sophia Rodriguez",subtitle:"Debate Club President • Politics",status:"online",role:"leader",interactive:!0}},z={render:()=>e.jsxs("div",{className:"space-y-3 w-80",children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Study Group Members"}),e.jsx(r,{name:"Sarah Chen",subtitle:"CS • Group Leader",status:"online",role:"leader",interactive:!0}),e.jsx(r,{name:"Alex Rodriguez",subtitle:"CS • Active Member",status:"online",role:"builder",interactive:!0}),e.jsx(r,{name:"Emily Watson",subtitle:"Math • New Member",status:"away",role:"student",interactive:!0}),e.jsx(r,{name:"Jordan Kim",subtitle:"CS • Verified",status:"online",role:"verified",interactive:!0})]}),parameters:{docs:{description:{story:"Example of avatar cards in a member list layout."}}}},w={render:()=>e.jsxs("div",{className:"grid grid-cols-2 gap-3 w-80",children:[e.jsx(r,{name:"Recent Chat",subtitle:"Study Group",size:"sm",status:"online",interactive:!0}),e.jsx(r,{name:"Maya Patel",subtitle:"Lab Partner",size:"sm",status:"away",role:"student",interactive:!0}),e.jsx(r,{name:"Tool Collab",subtitle:"GPA Calc Team",size:"sm",status:"online",role:"builder",interactive:!0}),e.jsx(r,{name:"Office Hours",subtitle:"Prof. Smith",size:"sm",status:"busy",role:"verified",interactive:!0})]}),parameters:{docs:{description:{story:"Compact avatar cards for quick access or dashboard widgets."}}}};var x,P,L;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    name: 'Sarah Chen',
    subtitle: 'Computer Science • Junior',
    status: 'online',
    role: 'student'
  }
}`,...(L=(P=t.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var G,R,E;a.parameters={...a.parameters,docs:{...(G=a.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    name: 'Alex Rodriguez',
    subtitle: 'Mathematics • Senior',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'online',
    role: 'builder'
  }
}`,...(E=(R=a.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var j,J,T;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    name: 'Emily Watson',
    subtitle: 'Psychology • Sophomore',
    status: 'online',
    role: 'verified',
    interactive: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive cards show hover effects and can be clicked.'
      }
    }
  }
}`,...(T=(J=s.parameters)==null?void 0:J.docs)==null?void 0:T.source}}};var H,k,B;o.parameters={...o.parameters,docs:{...(H=o.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    name: 'Maya Patel',
    subtitle: 'Biology',
    size: 'sm',
    status: 'online',
    role: 'student'
  }
}`,...(B=(k=o.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var D,I,N;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    name: 'Jordan Kim',
    subtitle: 'Engineering • Graduate Student',
    size: 'lg',
    status: 'away',
    role: 'leader',
    interactive: true
  }
}`,...(N=(I=n.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var F,U,V;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    name: 'Chris Thompson',
    subtitle: 'History • Freshman',
    role: 'student',
    status: 'online'
  }
}`,...(V=(U=i.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var W,O,K;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    name: 'Sam Liu',
    subtitle: 'CS • Senior • Tool Creator',
    role: 'builder',
    status: 'online'
  }
}`,...(K=(O=c.parameters)==null?void 0:O.docs)==null?void 0:K.source}}};var q,Q,Z;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    name: 'Taylor Davis',
    subtitle: 'Space Leader • Business',
    role: 'leader',
    status: 'away'
  }
}`,...(Z=(Q=l.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var _,X,Y;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    name: 'Dr. Amanda Foster',
    subtitle: 'Faculty • Computer Science',
    role: 'verified',
    status: 'online'
  }
}`,...(Y=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var $,ee,re;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    name: 'Ryan Mitchell',
    subtitle: 'Physics • Junior',
    status: 'online',
    role: 'student'
  }
}`,...(re=(ee=d.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var te,ae,se;m.parameters={...m.parameters,docs:{...(te=m.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    name: 'Zoe Adams',
    subtitle: 'Art • Sophomore',
    status: 'away',
    role: 'builder'
  }
}`,...(se=(ae=m.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var oe,ne,ie;p.parameters={...p.parameters,docs:{...(oe=p.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    name: 'Marcus Johnson',
    subtitle: 'Engineering • Senior',
    status: 'busy',
    role: 'leader'
  }
}`,...(ie=(ne=p.parameters)==null?void 0:ne.docs)==null?void 0:ie.source}}};var ce,le,ue;b.parameters={...b.parameters,docs:{...(ce=b.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    name: 'Anonymous User',
    subtitle: 'Ghost Mode Active',
    status: 'ghost',
    privacy: 'ghost'
  }
}`,...(ue=(le=b.parameters)==null?void 0:le.docs)==null?void 0:ue.source}}};var de,me,pe;g.parameters={...g.parameters,docs:{...(de=g.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    name: 'Olivia Brown',
    subtitle: 'Literature • Junior',
    layout: 'horizontal',
    status: 'online',
    role: 'student'
  }
}`,...(pe=(me=g.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var be,ge,ye;y.parameters={...y.parameters,docs:{...(be=y.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    name: 'Noah Wilson',
    subtitle: 'Chemistry • Senior',
    layout: 'vertical',
    status: 'online',
    role: 'builder',
    interactive: true
  }
}`,...(ye=(ge=y.parameters)==null?void 0:ge.docs)==null?void 0:ye.source}}};var ve,Se,he;v.parameters={...v.parameters,docs:{...(ve=v.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    name: 'Isabella Garcia',
    subtitle: 'Sociology • Junior',
    privacy: 'public',
    status: 'online',
    role: 'student'
  }
}`,...(he=(Se=v.parameters)==null?void 0:Se.docs)==null?void 0:he.source}}};var fe,Ce,Ae;S.parameters={...S.parameters,docs:{...(fe=S.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    name: 'Ghost User',
    subtitle: 'Privacy Mode Enabled',
    privacy: 'ghost',
    status: 'ghost'
  }
}`,...(Ae=(Ce=S.parameters)==null?void 0:Ce.docs)==null?void 0:Ae.source}}};var Me,ze,we;h.parameters={...h.parameters,docs:{...(Me=h.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    name: 'Anonymous',
    subtitle: 'Hidden Identity',
    privacy: 'anonymous'
  }
}`,...(we=(ze=h.parameters)==null?void 0:ze.docs)==null?void 0:we.source}}};var xe,Pe,Le;f.parameters={...f.parameters,docs:{...(xe=f.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    name: 'Lucas Martinez',
    subtitle: 'CS 101 Study Group • Freshman',
    status: 'online',
    role: 'student',
    interactive: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Representing a member in a study group or academic space.'
      }
    }
  }
}`,...(Le=(Pe=f.parameters)==null?void 0:Pe.docs)==null?void 0:Le.source}}};var Ge,Re,Ee;C.parameters={...C.parameters,docs:{...(Ge=C.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  args: {
    name: 'Grace Lee',
    subtitle: 'RA • Smith Hall • Senior',
    status: 'online',
    role: 'leader',
    affiliation: 'residential',
    interactive: true
  }
}`,...(Ee=(Re=C.parameters)==null?void 0:Re.docs)==null?void 0:Ee.source}}};var je,Je,Te;A.parameters={...A.parameters,docs:{...(je=A.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    name: 'Daniel Park',
    subtitle: 'GPA Calculator Creator • CS',
    status: 'away',
    role: 'builder',
    interactive: true
  }
}`,...(Te=(Je=A.parameters)==null?void 0:Je.docs)==null?void 0:Te.source}}};var He,ke,Be;M.parameters={...M.parameters,docs:{...(He=M.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    name: 'Sophia Rodriguez',
    subtitle: 'Debate Club President • Politics',
    status: 'online',
    role: 'leader',
    interactive: true
  }
}`,...(Be=(ke=M.parameters)==null?void 0:ke.docs)==null?void 0:Be.source}}};var De,Ie,Ne;z.parameters={...z.parameters,docs:{...(De=z.parameters)==null?void 0:De.docs,source:{originalSource:`{
  render: () => <div className="space-y-3 w-80">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
        Study Group Members
      </h3>
      <AvatarCard name="Sarah Chen" subtitle="CS • Group Leader" status="online" role="leader" interactive />
      <AvatarCard name="Alex Rodriguez" subtitle="CS • Active Member" status="online" role="builder" interactive />
      <AvatarCard name="Emily Watson" subtitle="Math • New Member" status="away" role="student" interactive />
      <AvatarCard name="Jordan Kim" subtitle="CS • Verified" status="online" role="verified" interactive />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Example of avatar cards in a member list layout.'
      }
    }
  }
}`,...(Ne=(Ie=z.parameters)==null?void 0:Ie.docs)==null?void 0:Ne.source}}};var Fe,Ue,Ve;w.parameters={...w.parameters,docs:{...(Fe=w.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-3 w-80">
      <AvatarCard name="Recent Chat" subtitle="Study Group" size="sm" status="online" interactive />
      <AvatarCard name="Maya Patel" subtitle="Lab Partner" size="sm" status="away" role="student" interactive />
      <AvatarCard name="Tool Collab" subtitle="GPA Calc Team" size="sm" status="online" role="builder" interactive />
      <AvatarCard name="Office Hours" subtitle="Prof. Smith" size="sm" status="busy" role="verified" interactive />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Compact avatar cards for quick access or dashboard widgets.'
      }
    }
  }
}`,...(Ve=(Ue=w.parameters)==null?void 0:Ue.docs)==null?void 0:Ve.source}}};const tr=["Default","WithAvatar","Interactive","SmallSize","LargeSize","StudentRole","BuilderRole","LeaderRole","VerifiedRole","OnlineStatus","AwayStatus","BusyStatus","GhostStatus","HorizontalLayout","VerticalLayout","PublicProfile","GhostMode","AnonymousMode","StudyGroupMember","ResidentialAssistant","ToolCreator","SpaceLeader","MembersList","QuickActions"];export{h as AnonymousMode,m as AwayStatus,c as BuilderRole,p as BusyStatus,t as Default,S as GhostMode,b as GhostStatus,g as HorizontalLayout,s as Interactive,n as LargeSize,l as LeaderRole,z as MembersList,d as OnlineStatus,v as PublicProfile,w as QuickActions,C as ResidentialAssistant,o as SmallSize,M as SpaceLeader,i as StudentRole,f as StudyGroupMember,A as ToolCreator,u as VerifiedRole,y as VerticalLayout,a as WithAvatar,tr as __namedExportsOrder,rr as default};
