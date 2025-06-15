import{j as a}from"./jsx-runtime-CDt2p4po.js";import{S as s}from"./space-card-CrIRh5ZE.js";import"./index-GiUgBvb1.js";import"./utils-CytzSlOG.js";import"./createLucideIcon-DlCdiEX6.js";import"./users-BnPOFdzp.js";const R={title:"Components/SpaceCard",component:s,parameters:{layout:"centered",backgrounds:{default:"hive",values:[{name:"hive",value:"#0a0a0a"}]}},tags:["autodocs"],argTypes:{space:{control:"object",description:"The space object to display."},href:{control:"text",description:"The URL to navigate to when the card is clicked."},onClick:{action:"clicked",description:"Optional click handler that overrides navigation."}}},e={name:"Computer Science Majors",name_lowercase:"computer science majors",description:"A community for all CS students to collaborate, share resources, and connect with peers and faculty.",bannerUrl:"https://images.unsplash.com/photo-1580894732444-8ecded7948b4?w=800&q=80",memberCount:1248,schoolId:"ub",type:"major",status:"activated"},n={args:{space:{...e,id:"cs-majors"},href:"/spaces/cs-majors"}},t={args:{space:{...e,id:"no-banner-space",bannerUrl:void 0,name:"Philosophy Club",description:"Deep discussions, critical thinking, and exploring life's biggest questions together.",memberCount:89,type:"interest"},href:"/spaces/no-banner-space"}},r={args:{space:{...e,id:"long-desc-space",name:"Campus Creatives & Innovators Guild",description:"This is an exceptionally long description designed to test the line-clamping functionality of the card component to ensure that the layout remains stable and visually appealing even when presented with a large amount of text content that exceeds the typical summary length.",memberCount:567,type:"creative"},href:"/spaces/long-desc-space"}},o={args:{space:{...e,id:"dormant-space",name:"Advanced Robotics Lab",description:"Cutting-edge robotics research and development. Opening soon for student collaboration.",bannerUrl:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",memberCount:0,type:"organization",status:"dormant"},href:"/spaces/dormant-space"}},i={args:{space:{...e,id:"frozen-space",name:"Spring Break Planning",description:"Coordinate group trips and activities for spring break. Currently in view-only mode.",bannerUrl:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",memberCount:234,type:"interest",status:"frozen"},href:"/spaces/frozen-space"}},c={args:{space:{...e,id:"small-space",name:"Latin Dance Society",description:"Learn salsa, bachata, and more. All skill levels welcome!",bannerUrl:"https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80",memberCount:1,type:"interest"},href:"/spaces/small-space"}},p={args:{space:{...e,id:"large-space",name:"UB Community",description:"The main residential community for all University at Buffalo students.",bannerUrl:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",memberCount:15847,type:"residential"},href:"/spaces/large-space"}},m={render:()=>a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl",children:[a.jsx(s,{space:{...e,id:"1",name:"Computer Science Majors",type:"major"},href:"/spaces/cs-majors"}),a.jsx(s,{space:{...e,id:"2",name:"Ellicott Complex",type:"residential",bannerUrl:void 0,memberCount:567,description:"Connect with your neighbors and build community in Ellicott."},href:"/spaces/ellicott"}),a.jsx(s,{space:{...e,id:"3",name:"Photography Club",type:"interest",status:"dormant",memberCount:0,bannerUrl:"https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",description:"Capture campus life and improve your photography skills together."},href:"/spaces/photography"}),a.jsx(s,{space:{...e,id:"4",name:"Student Government",type:"organization",status:"frozen",memberCount:89,bannerUrl:"https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",description:"Voice student concerns and shape campus policy. Currently in transition."},href:"/spaces/student-gov"}),a.jsx(s,{space:{...e,id:"5",name:"Creative Writing Workshop",type:"creative",memberCount:23,bannerUrl:"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",description:"Share your stories, get feedback, and grow as a writer."},href:"/spaces/creative-writing"}),a.jsx(s,{space:{...e,id:"6",name:"Business Administration",type:"major",memberCount:2156,bannerUrl:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",description:"Network with fellow business students and share opportunities."},href:"/spaces/business"})]}),parameters:{layout:"fullscreen",viewport:{defaultViewport:"responsive"}}};var d,l,u;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    space: {
      ...baseSpace,
      id: 'cs-majors'
    } as Space,
    href: '/spaces/cs-majors'
  }
}`,...(u=(l=n.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var h,g,b;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    space: {
      ...baseSpace,
      id: 'no-banner-space',
      bannerUrl: undefined,
      name: 'Philosophy Club',
      description: 'Deep discussions, critical thinking, and exploring life\\'s biggest questions together.',
      memberCount: 89,
      type: 'interest'
    } as Space,
    href: '/spaces/no-banner-space'
  }
}`,...(b=(g=t.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var f,y,C;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    space: {
      ...baseSpace,
      id: 'long-desc-space',
      name: 'Campus Creatives & Innovators Guild',
      description: 'This is an exceptionally long description designed to test the line-clamping functionality of the card component to ensure that the layout remains stable and visually appealing even when presented with a large amount of text content that exceeds the typical summary length.',
      memberCount: 567,
      type: 'creative'
    } as Space,
    href: '/spaces/long-desc-space'
  }
}`,...(C=(y=r.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var S,v,w;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    space: {
      ...baseSpace,
      id: 'dormant-space',
      name: 'Advanced Robotics Lab',
      description: 'Cutting-edge robotics research and development. Opening soon for student collaboration.',
      bannerUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      memberCount: 0,
      type: 'organization',
      status: 'dormant'
    } as Space,
    href: '/spaces/dormant-space'
  }
}`,...(w=(v=o.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var j,x,U;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    space: {
      ...baseSpace,
      id: 'frozen-space',
      name: 'Spring Break Planning',
      description: 'Coordinate group trips and activities for spring break. Currently in view-only mode.',
      bannerUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      memberCount: 234,
      type: 'interest',
      status: 'frozen'
    } as Space,
    href: '/spaces/frozen-space'
  }
}`,...(U=(x=i.parameters)==null?void 0:x.docs)==null?void 0:U.source}}};var k,q,z;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    space: {
      ...baseSpace,
      id: 'small-space',
      name: 'Latin Dance Society',
      description: 'Learn salsa, bachata, and more. All skill levels welcome!',
      bannerUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80',
      memberCount: 1,
      type: 'interest'
    } as Space,
    href: '/spaces/small-space'
  }
}`,...(z=(q=c.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var L,B,D;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    space: {
      ...baseSpace,
      id: 'large-space',
      name: 'UB Community',
      description: 'The main residential community for all University at Buffalo students.',
      bannerUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
      memberCount: 15847,
      type: 'residential'
    } as Space,
    href: '/spaces/large-space'
  }
}`,...(D=(B=p.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var A,M,T;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">\r
      <SpaceCard space={{
      ...baseSpace,
      id: '1',
      name: 'Computer Science Majors',
      type: 'major'
    } as Space} href="/spaces/cs-majors" />\r
      <SpaceCard space={{
      ...baseSpace,
      id: '2',
      name: 'Ellicott Complex',
      type: 'residential',
      bannerUrl: undefined,
      memberCount: 567,
      description: 'Connect with your neighbors and build community in Ellicott.'
    } as Space} href="/spaces/ellicott" />\r
      <SpaceCard space={{
      ...baseSpace,
      id: '3',
      name: 'Photography Club',
      type: 'interest',
      status: 'dormant',
      memberCount: 0,
      bannerUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
      description: 'Capture campus life and improve your photography skills together.'
    } as Space} href="/spaces/photography" />\r
      <SpaceCard space={{
      ...baseSpace,
      id: '4',
      name: 'Student Government',
      type: 'organization',
      status: 'frozen',
      memberCount: 89,
      bannerUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80',
      description: 'Voice student concerns and shape campus policy. Currently in transition.'
    } as Space} href="/spaces/student-gov" />\r
      <SpaceCard space={{
      ...baseSpace,
      id: '5',
      name: 'Creative Writing Workshop',
      type: 'creative',
      memberCount: 23,
      bannerUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
      description: 'Share your stories, get feedback, and grow as a writer.'
    } as Space} href="/spaces/creative-writing" />\r
      <SpaceCard space={{
      ...baseSpace,
      id: '6',
      name: 'Business Administration',
      type: 'major',
      memberCount: 2156,
      bannerUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      description: 'Network with fellow business students and share opportunities.'
    } as Space} href="/spaces/business" />\r
    </div>,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}`,...(T=(M=m.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};const V=["Default","WithoutBanner","LongDescription","DormantStatus","FrozenStatus","SmallMembership","LargeMembership","GridLayout"];export{n as Default,o as DormantStatus,i as FrozenStatus,m as GridLayout,p as LargeMembership,r as LongDescription,c as SmallMembership,t as WithoutBanner,V as __namedExportsOrder,R as default};
