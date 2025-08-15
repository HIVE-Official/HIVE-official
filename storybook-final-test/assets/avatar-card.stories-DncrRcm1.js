import{j as e}from"./jsx-runtime-B9GTzLod.js";import{R as la}from"./index-BMjrbHXN.js";import{c as s}from"./utils-CytzSlOG.js";import{A as ca}from"./avatar-Y7_S4Uop.js";import{C as ua}from"./check-ChQelZXp.js";import{C as da}from"./crown-Bf-Ij_V7.js";import{S as ma}from"./star-q8LOEa9p.js";import{G as pa}from"./graduation-cap-CjRbfMsL.js";import"./user-DLkx1tbP.js";import"./createLucideIcon-DtX30ipI.js";const N={student:{icon:pa,color:"text-[var(--hive-status-info)]"},builder:{icon:ma,color:"text-[var(--hive-brand-secondary)]"},leader:{icon:da,color:"text-[var(--hive-brand-secondary)]"},verified:{icon:ua,color:"text-[var(--hive-status-success)]"}},va={sm:{avatar:"sm",padding:"p-3",nameSize:"text-sm",subtitleSize:"text-xs"},md:{avatar:"md",padding:"p-4",nameSize:"text-base",subtitleSize:"text-sm"},lg:{avatar:"lg",padding:"p-5",nameSize:"text-lg",subtitleSize:"text-base"}},t=({src:Ye,name:j,subtitle:R,size:$e="md",status:a,role:r,affiliation:ba,privacy:ea="public",interactive:aa=!1,layout:T="horizontal",className:ra,onClick:ta})=>{const sa=j.split(" ").map(oa=>oa[0]).join("").slice(0,2),n=va[$e],na=["rounded-2xl","bg-[var(--hive-background-secondary)]","border border-[var(--hive-border-default)]","transition-all duration-200 ease-out",n.padding,aa&&["cursor-pointer","hover:bg-[var(--hive-background-tertiary)]","hover:border-[var(--hive-brand-secondary)]","hover:shadow-lg","active:scale-[0.98]"].filter(Boolean).join(" ")].filter(Boolean).join(" "),ia=T==="horizontal"?"flex items-center space-x-3":"flex flex-col items-center space-y-3 text-center";return e.jsx("div",{className:s(na,ra),onClick:ta,children:e.jsxs("div",{className:ia,children:[e.jsx(ca,{src:Ye,initials:sa,size:n.avatar,status:a,privacy:ea,interactive:!1,showBadge:!1}),e.jsxs("div",{className:T==="horizontal"?"flex-1 min-w-0":"",children:[e.jsx("h3",{className:s("font-semibold text-[var(--hive-text-primary)] truncate",n.nameSize),children:j}),R&&e.jsx("p",{className:s("text-[var(--hive-text-secondary)] truncate",n.subtitleSize),children:R}),(a||r)&&e.jsxs("div",{className:"flex items-center space-x-3 mt-1",children:[r&&e.jsxs("div",{className:"flex items-center space-x-1",children:[la.createElement(N[r].icon,{size:12,className:N[r].color}),e.jsx("span",{className:s("text-xs font-medium",r==="verified"&&"text-[var(--hive-status-success)]",r==="builder"&&"text-[var(--hive-brand-secondary)]",r==="leader"&&"text-[var(--hive-brand-secondary)]",r==="student"&&"text-[var(--hive-status-info)]"),children:r==="verified"?"Verified":r==="builder"?"Builder":r==="leader"?"Leader":"Student"})]}),a&&a!=="offline"&&e.jsxs("div",{className:"flex items-center space-x-1",children:[e.jsx("div",{className:s("h-2 w-2 rounded-full",a==="online"&&"bg-[var(--hive-status-success)]",a==="away"&&"bg-[var(--hive-brand-secondary)]",a==="busy"&&"bg-[var(--hive-status-error)]",a==="ghost"&&"bg-[var(--hive-text-tertiary)]")}),e.jsx("span",{className:s("text-xs",a==="online"&&"text-[var(--hive-status-success)]",a==="away"&&"text-[var(--hive-brand-secondary)]",a==="busy"&&"text-[var(--hive-status-error)]",a==="ghost"&&"text-[var(--hive-text-tertiary)]"),children:a==="online"?"Online":a==="away"?"Away":a==="busy"?"Busy":"Ghost"})]})]})]})]})})};t.__docgenInfo={description:"",methods:[],displayName:"AvatarCard",props:{src:{required:!1,tsType:{name:"string"},description:""},name:{required:!0,tsType:{name:"string"},description:""},subtitle:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},status:{required:!1,tsType:{name:"union",raw:"'online' | 'offline' | 'away' | 'busy' | 'ghost'",elements:[{name:"literal",value:"'online'"},{name:"literal",value:"'offline'"},{name:"literal",value:"'away'"},{name:"literal",value:"'busy'"},{name:"literal",value:"'ghost'"}]},description:""},role:{required:!1,tsType:{name:"union",raw:"'student' | 'builder' | 'leader' | 'verified'",elements:[{name:"literal",value:"'student'"},{name:"literal",value:"'builder'"},{name:"literal",value:"'leader'"},{name:"literal",value:"'verified'"}]},description:""},affiliation:{required:!1,tsType:{name:"union",raw:"'university' | 'residential' | 'greek'",elements:[{name:"literal",value:"'university'"},{name:"literal",value:"'residential'"},{name:"literal",value:"'greek'"}]},description:""},privacy:{required:!1,tsType:{name:"union",raw:"'public' | 'ghost' | 'anonymous'",elements:[{name:"literal",value:"'public'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'anonymous'"}]},description:"",defaultValue:{value:"'public'",computed:!1}},interactive:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},layout:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"",defaultValue:{value:"'horizontal'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const Ma={title:"Molecules/Avatar Card",component:t,parameters:{layout:"centered",docs:{description:{component:`
A flexible avatar card component that combines an avatar with user information, status indicators, and role badges. Perfect for user profiles, member lists, and social interactions in HIVE.

**Key Features:**
- Multiple sizes (sm, md, lg)
- Various user roles (student, builder, leader, verified)  
- Status indicators (online, offline, away, busy, ghost)
- Privacy modes (public, ghost, anonymous)
- Layout options (horizontal, vertical)
- Interactive hover states
- Campus-specific roles and affiliations
        `}}},argTypes:{name:{control:"text",description:"User's full name"},subtitle:{control:"text",description:"Additional information like major, year, or role"},size:{control:"select",options:["sm","md","lg"],description:"Card size variant"},status:{control:"select",options:["online","offline","away","busy","ghost"],description:"User's current activity status"},role:{control:"select",options:["student","builder","leader","verified"],description:"User's role or verification status"},affiliation:{control:"select",options:["university","residential","greek"],description:"Campus affiliation type"},privacy:{control:"select",options:["public","ghost","anonymous"],description:"Privacy mode affecting avatar display"},layout:{control:"select",options:["horizontal","vertical"],description:"Layout direction for content"},interactive:{control:"boolean",description:"Enable hover states and cursor pointer"},src:{control:"text",description:"Avatar image URL"}}},i={args:{name:"Sarah Chen",subtitle:"Computer Science • Junior",status:"online",role:"student"}},o={args:{name:"Alex Rodriguez",subtitle:"Mathematics • Senior",src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",status:"online",role:"builder"}},l={args:{name:"Emily Watson",subtitle:"Psychology • Sophomore",status:"online",role:"verified",interactive:!0},parameters:{docs:{description:{story:"Interactive cards show hover effects and can be clicked."}}}},c={args:{name:"Maya Patel",subtitle:"Biology",size:"sm",status:"online",role:"student"}},u={args:{name:"Jordan Kim",subtitle:"Engineering • Graduate Student",size:"lg",status:"away",role:"leader",interactive:!0}},d={args:{name:"Chris Thompson",subtitle:"History • Freshman",role:"student",status:"online"}},m={args:{name:"Sam Liu",subtitle:"CS • Senior • Tool Creator",role:"builder",status:"online"}},p={args:{name:"Taylor Davis",subtitle:"Space Leader • Business",role:"leader",status:"away"}},v={args:{name:"Dr. Amanda Foster",subtitle:"Faculty • Computer Science",role:"verified",status:"online"}},b={args:{name:"Ryan Mitchell",subtitle:"Physics • Junior",status:"online",role:"student"}},y={args:{name:"Zoe Adams",subtitle:"Art • Sophomore",status:"away",role:"builder"}},g={args:{name:"Marcus Johnson",subtitle:"Engineering • Senior",status:"busy",role:"leader"}},h={args:{name:"Anonymous User",subtitle:"Ghost Mode Active",status:"ghost",privacy:"ghost"}},f={args:{name:"Olivia Brown",subtitle:"Literature • Junior",layout:"horizontal",status:"online",role:"student"}},S={args:{name:"Noah Wilson",subtitle:"Chemistry • Senior",layout:"vertical",status:"online",role:"builder",interactive:!0}},x={args:{name:"Isabella Garcia",subtitle:"Sociology • Junior",privacy:"public",status:"online",role:"student"}},C={args:{name:"Ghost User",subtitle:"Privacy Mode Enabled",privacy:"ghost",status:"ghost"}},z={args:{name:"Anonymous",subtitle:"Hidden Identity",privacy:"anonymous"}},A={args:{name:"Lucas Martinez",subtitle:"CS 101 Study Group • Freshman",status:"online",role:"student",interactive:!0},parameters:{docs:{description:{story:"Representing a member in a study group or academic space."}}}},w={args:{name:"Grace Lee",subtitle:"RA • Smith Hall • Senior",status:"online",role:"leader",affiliation:"residential",interactive:!0}},M={args:{name:"Daniel Park",subtitle:"GPA Calculator Creator • CS",status:"away",role:"builder",interactive:!0}},G={args:{name:"Sophia Rodriguez",subtitle:"Debate Club President • Politics",status:"online",role:"leader",interactive:!0}},P={render:()=>e.jsxs("div",{className:"space-y-3 w-80",children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Study Group Members"}),e.jsx(t,{name:"Sarah Chen",subtitle:"CS • Group Leader",status:"online",role:"leader",interactive:!0}),e.jsx(t,{name:"Alex Rodriguez",subtitle:"CS • Active Member",status:"online",role:"builder",interactive:!0}),e.jsx(t,{name:"Emily Watson",subtitle:"Math • New Member",status:"away",role:"student",interactive:!0}),e.jsx(t,{name:"Jordan Kim",subtitle:"CS • Verified",status:"online",role:"verified",interactive:!0})]}),parameters:{docs:{description:{story:"Example of avatar cards in a member list layout."}}}},L={render:()=>e.jsxs("div",{className:"grid grid-cols-2 gap-3 w-80",children:[e.jsx(t,{name:"Recent Chat",subtitle:"Study Group",size:"sm",status:"online",interactive:!0}),e.jsx(t,{name:"Maya Patel",subtitle:"Lab Partner",size:"sm",status:"away",role:"student",interactive:!0}),e.jsx(t,{name:"Tool Collab",subtitle:"GPA Calc Team",size:"sm",status:"online",role:"builder",interactive:!0}),e.jsx(t,{name:"Office Hours",subtitle:"Prof. Smith",size:"sm",status:"busy",role:"verified",interactive:!0})]}),parameters:{docs:{description:{story:"Compact avatar cards for quick access or dashboard widgets."}}}};var E,k,B;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    name: 'Sarah Chen',
    subtitle: 'Computer Science • Junior',
    status: 'online',
    role: 'student'
  }
}`,...(B=(k=i.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var q,J,V;o.parameters={...o.parameters,docs:{...(q=o.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    name: 'Alex Rodriguez',
    subtitle: 'Mathematics • Senior',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'online',
    role: 'builder'
  }
}`,...(V=(J=o.parameters)==null?void 0:J.docs)==null?void 0:V.source}}};var H,I,D;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(D=(I=l.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};var F,O,U;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    name: 'Maya Patel',
    subtitle: 'Biology',
    size: 'sm',
    status: 'online',
    role: 'student'
  }
}`,...(U=(O=c.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};var W,K,_;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    name: 'Jordan Kim',
    subtitle: 'Engineering • Graduate Student',
    size: 'lg',
    status: 'away',
    role: 'leader',
    interactive: true
  }
}`,...(_=(K=u.parameters)==null?void 0:K.docs)==null?void 0:_.source}}};var Q,Z,X;d.parameters={...d.parameters,docs:{...(Q=d.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    name: 'Chris Thompson',
    subtitle: 'History • Freshman',
    role: 'student',
    status: 'online'
  }
}`,...(X=(Z=d.parameters)==null?void 0:Z.docs)==null?void 0:X.source}}};var Y,$,ee;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    name: 'Sam Liu',
    subtitle: 'CS • Senior • Tool Creator',
    role: 'builder',
    status: 'online'
  }
}`,...(ee=($=m.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var ae,re,te;p.parameters={...p.parameters,docs:{...(ae=p.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    name: 'Taylor Davis',
    subtitle: 'Space Leader • Business',
    role: 'leader',
    status: 'away'
  }
}`,...(te=(re=p.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var se,ne,ie;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    name: 'Dr. Amanda Foster',
    subtitle: 'Faculty • Computer Science',
    role: 'verified',
    status: 'online'
  }
}`,...(ie=(ne=v.parameters)==null?void 0:ne.docs)==null?void 0:ie.source}}};var oe,le,ce;b.parameters={...b.parameters,docs:{...(oe=b.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    name: 'Ryan Mitchell',
    subtitle: 'Physics • Junior',
    status: 'online',
    role: 'student'
  }
}`,...(ce=(le=b.parameters)==null?void 0:le.docs)==null?void 0:ce.source}}};var ue,de,me;y.parameters={...y.parameters,docs:{...(ue=y.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    name: 'Zoe Adams',
    subtitle: 'Art • Sophomore',
    status: 'away',
    role: 'builder'
  }
}`,...(me=(de=y.parameters)==null?void 0:de.docs)==null?void 0:me.source}}};var pe,ve,be;g.parameters={...g.parameters,docs:{...(pe=g.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    name: 'Marcus Johnson',
    subtitle: 'Engineering • Senior',
    status: 'busy',
    role: 'leader'
  }
}`,...(be=(ve=g.parameters)==null?void 0:ve.docs)==null?void 0:be.source}}};var ye,ge,he;h.parameters={...h.parameters,docs:{...(ye=h.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    name: 'Anonymous User',
    subtitle: 'Ghost Mode Active',
    status: 'ghost',
    privacy: 'ghost'
  }
}`,...(he=(ge=h.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var fe,Se,xe;f.parameters={...f.parameters,docs:{...(fe=f.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    name: 'Olivia Brown',
    subtitle: 'Literature • Junior',
    layout: 'horizontal',
    status: 'online',
    role: 'student'
  }
}`,...(xe=(Se=f.parameters)==null?void 0:Se.docs)==null?void 0:xe.source}}};var Ce,ze,Ae;S.parameters={...S.parameters,docs:{...(Ce=S.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    name: 'Noah Wilson',
    subtitle: 'Chemistry • Senior',
    layout: 'vertical',
    status: 'online',
    role: 'builder',
    interactive: true
  }
}`,...(Ae=(ze=S.parameters)==null?void 0:ze.docs)==null?void 0:Ae.source}}};var we,Me,Ge;x.parameters={...x.parameters,docs:{...(we=x.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    name: 'Isabella Garcia',
    subtitle: 'Sociology • Junior',
    privacy: 'public',
    status: 'online',
    role: 'student'
  }
}`,...(Ge=(Me=x.parameters)==null?void 0:Me.docs)==null?void 0:Ge.source}}};var Pe,Le,je;C.parameters={...C.parameters,docs:{...(Pe=C.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    name: 'Ghost User',
    subtitle: 'Privacy Mode Enabled',
    privacy: 'ghost',
    status: 'ghost'
  }
}`,...(je=(Le=C.parameters)==null?void 0:Le.docs)==null?void 0:je.source}}};var Re,Te,Ne;z.parameters={...z.parameters,docs:{...(Re=z.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    name: 'Anonymous',
    subtitle: 'Hidden Identity',
    privacy: 'anonymous'
  }
}`,...(Ne=(Te=z.parameters)==null?void 0:Te.docs)==null?void 0:Ne.source}}};var Ee,ke,Be;A.parameters={...A.parameters,docs:{...(Ee=A.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
}`,...(Be=(ke=A.parameters)==null?void 0:ke.docs)==null?void 0:Be.source}}};var qe,Je,Ve;w.parameters={...w.parameters,docs:{...(qe=w.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  args: {
    name: 'Grace Lee',
    subtitle: 'RA • Smith Hall • Senior',
    status: 'online',
    role: 'leader',
    affiliation: 'residential',
    interactive: true
  }
}`,...(Ve=(Je=w.parameters)==null?void 0:Je.docs)==null?void 0:Ve.source}}};var He,Ie,De;M.parameters={...M.parameters,docs:{...(He=M.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    name: 'Daniel Park',
    subtitle: 'GPA Calculator Creator • CS',
    status: 'away',
    role: 'builder',
    interactive: true
  }
}`,...(De=(Ie=M.parameters)==null?void 0:Ie.docs)==null?void 0:De.source}}};var Fe,Oe,Ue;G.parameters={...G.parameters,docs:{...(Fe=G.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    name: 'Sophia Rodriguez',
    subtitle: 'Debate Club President • Politics',
    status: 'online',
    role: 'leader',
    interactive: true
  }
}`,...(Ue=(Oe=G.parameters)==null?void 0:Oe.docs)==null?void 0:Ue.source}}};var We,Ke,_e;P.parameters={...P.parameters,docs:{...(We=P.parameters)==null?void 0:We.docs,source:{originalSource:`{
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
}`,...(_e=(Ke=P.parameters)==null?void 0:Ke.docs)==null?void 0:_e.source}}};var Qe,Ze,Xe;L.parameters={...L.parameters,docs:{...(Qe=L.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
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
}`,...(Xe=(Ze=L.parameters)==null?void 0:Ze.docs)==null?void 0:Xe.source}}};const Ga=["Default","WithAvatar","Interactive","SmallSize","LargeSize","StudentRole","BuilderRole","LeaderRole","VerifiedRole","OnlineStatus","AwayStatus","BusyStatus","GhostStatus","HorizontalLayout","VerticalLayout","PublicProfile","GhostMode","AnonymousMode","StudyGroupMember","ResidentialAssistant","ToolCreator","SpaceLeader","MembersList","QuickActions"];export{z as AnonymousMode,y as AwayStatus,m as BuilderRole,g as BusyStatus,i as Default,C as GhostMode,h as GhostStatus,f as HorizontalLayout,l as Interactive,u as LargeSize,p as LeaderRole,P as MembersList,b as OnlineStatus,x as PublicProfile,L as QuickActions,w as ResidentialAssistant,c as SmallSize,G as SpaceLeader,d as StudentRole,A as StudyGroupMember,M as ToolCreator,v as VerifiedRole,S as VerticalLayout,o as WithAvatar,Ga as __namedExportsOrder,Ma as default};
