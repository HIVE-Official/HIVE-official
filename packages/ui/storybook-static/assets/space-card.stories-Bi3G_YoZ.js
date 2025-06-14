import{j as e}from"./jsx-runtime-CDt2p4po.js";import{c as b}from"./utils-CytzSlOG.js";import{c as u}from"./createLucideIcon-DlCdiEX6.js";import{U as F}from"./users-BnPOFdzp.js";import"./index-GiUgBvb1.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=u("Building",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["path",{d:"M9 22v-4h6v4",key:"r93iot"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=u("EyeOff",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=u("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]),K={activated:{icon:null,label:"Active",className:"bg-green-500/20 text-green-400"},dormant:{icon:J,label:"Coming Soon",className:"bg-yellow-500/20 text-yellow-400"},frozen:{icon:H,label:"View Only",className:"bg-red-500/20 text-red-400"}};function t({space:s,href:V,className:W,onClick:h}){const _=R=>{h&&(R.preventDefault(),h(s))},m=K[s.status],g=m.icon;return e.jsx("a",{href:V,className:b("group block",W),onClick:_,"aria-label":`Visit ${s.name} space`,children:e.jsxs("div",{className:"relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/[0.06] transition-all duration-200 ease-out group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-yellow-500/10 group-hover:border-white/[0.12] group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-yellow-500/50",children:[e.jsxs("div",{className:"relative h-32 w-full overflow-hidden",children:[s.bannerUrl?e.jsx("img",{src:s.bannerUrl,alt:"",className:"h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"}):e.jsx("div",{className:"h-full w-full bg-neutral-800/50"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"}),s.status!=="activated"&&e.jsxs("div",{className:b("absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm",m.className),children:[g&&e.jsx(g,{className:"w-3 h-3"}),m.label]})]}),e.jsxs("div",{className:"p-5",children:[e.jsx("h3",{className:"truncate text-lg font-semibold text-white transition-colors duration-200 group-hover:text-yellow-400",children:s.name}),s.description&&e.jsx("p",{className:"mt-2 line-clamp-2 text-sm text-neutral-400 leading-relaxed",children:s.description}),e.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-4 text-xs text-neutral-500",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(F,{className:"mr-1.5 h-4 w-4"}),e.jsxs("span",{children:[s.memberCount.toLocaleString()," ",s.memberCount===1?"Member":"Members"]})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx($,{className:"mr-1.5 h-4 w-4"}),e.jsx("span",{className:"capitalize",children:s.type})]})]}),e.jsx("div",{className:"opacity-0 transition-opacity duration-200 group-hover:opacity-100",children:e.jsx("div",{className:"flex items-center text-xs text-yellow-400 font-medium",children:e.jsx("span",{children:"Enter →"})})})]})]})]})})}t.__docgenInfo={description:"",methods:[],displayName:"SpaceCard",props:{space:{required:!0,tsType:{name:"Space"},description:""},href:{required:!0,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(space: Space) => void",signature:{arguments:[{type:{name:"Space"},name:"space"}],return:{name:"void"}}},description:""}}};const ae={title:"Components/SpaceCard",component:t,parameters:{layout:"centered",backgrounds:{default:"hive",values:[{name:"hive",value:"#0a0a0a"}]}},tags:["autodocs"],argTypes:{space:{control:"object",description:"The space object to display."},href:{control:"text",description:"The URL to navigate to when the card is clicked."},onClick:{action:"clicked",description:"Optional click handler that overrides navigation."}}},a={name:"Computer Science Majors",name_lowercase:"computer science majors",description:"A community for all CS students to collaborate, share resources, and connect with peers and faculty.",bannerUrl:"https://images.unsplash.com/photo-1580894732444-8ecded7948b4?w=800&q=80",memberCount:1248,schoolId:"ub",type:"major",status:"activated"},n={args:{space:{...a,id:"cs-majors"},href:"/spaces/cs-majors"}},r={args:{space:{...a,id:"no-banner-space",bannerUrl:void 0,name:"Philosophy Club",description:"Deep discussions, critical thinking, and exploring life's biggest questions together.",memberCount:89,type:"interest"},href:"/spaces/no-banner-space"}},o={args:{space:{...a,id:"long-desc-space",name:"Campus Creatives & Innovators Guild",description:"This is an exceptionally long description designed to test the line-clamping functionality of the card component to ensure that the layout remains stable and visually appealing even when presented with a large amount of text content that exceeds the typical summary length.",memberCount:567,type:"creative"},href:"/spaces/long-desc-space"}},i={args:{space:{...a,id:"dormant-space",name:"Advanced Robotics Lab",description:"Cutting-edge robotics research and development. Opening soon for student collaboration.",bannerUrl:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",memberCount:0,type:"organization",status:"dormant"},href:"/spaces/dormant-space"}},c={args:{space:{...a,id:"frozen-space",name:"Spring Break Planning",description:"Coordinate group trips and activities for spring break. Currently in view-only mode.",bannerUrl:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",memberCount:234,type:"interest",status:"frozen"},href:"/spaces/frozen-space"}},p={args:{space:{...a,id:"small-space",name:"Latin Dance Society",description:"Learn salsa, bachata, and more. All skill levels welcome!",bannerUrl:"https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80",memberCount:1,type:"interest"},href:"/spaces/small-space"}},l={args:{space:{...a,id:"large-space",name:"UB Community",description:"The main residential community for all University at Buffalo students.",bannerUrl:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",memberCount:15847,type:"residential"},href:"/spaces/large-space"}},d={render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl",children:[e.jsx(t,{space:{...a,id:"1",name:"Computer Science Majors",type:"major"},href:"/spaces/cs-majors"}),e.jsx(t,{space:{...a,id:"2",name:"Ellicott Complex",type:"residential",bannerUrl:void 0,memberCount:567,description:"Connect with your neighbors and build community in Ellicott."},href:"/spaces/ellicott"}),e.jsx(t,{space:{...a,id:"3",name:"Photography Club",type:"interest",status:"dormant",memberCount:0,bannerUrl:"https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",description:"Capture campus life and improve your photography skills together."},href:"/spaces/photography"}),e.jsx(t,{space:{...a,id:"4",name:"Student Government",type:"organization",status:"frozen",memberCount:89,bannerUrl:"https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",description:"Voice student concerns and shape campus policy. Currently in transition."},href:"/spaces/student-gov"}),e.jsx(t,{space:{...a,id:"5",name:"Creative Writing Workshop",type:"creative",memberCount:23,bannerUrl:"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",description:"Share your stories, get feedback, and grow as a writer."},href:"/spaces/creative-writing"}),e.jsx(t,{space:{...a,id:"6",name:"Business Administration",type:"major",memberCount:2156,bannerUrl:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",description:"Network with fellow business students and share opportunities."},href:"/spaces/business"})]}),parameters:{layout:"fullscreen",viewport:{defaultViewport:"responsive"}}};var f,y,v;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    space: {
      ...baseSpace,
      id: 'cs-majors'
    } as Space,
    href: '/spaces/cs-majors'
  }
}`,...(v=(y=n.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var x,w,C;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(C=(w=r.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var S,j,k;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(k=(j=o.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var N,U,q;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(q=(U=i.parameters)==null?void 0:U.docs)==null?void 0:q.source}}};var M,z,L;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(L=(z=c.parameters)==null?void 0:z.docs)==null?void 0:L.source}}};var B,D,T;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(T=(D=p.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var E,A,P;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(P=(A=l.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var I,O,G;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(G=(O=d.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};const se=["Default","WithoutBanner","LongDescription","DormantStatus","FrozenStatus","SmallMembership","LargeMembership","GridLayout"];export{n as Default,i as DormantStatus,c as FrozenStatus,d as GridLayout,l as LargeMembership,o as LongDescription,p as SmallMembership,r as WithoutBanner,se as __namedExportsOrder,ae as default};
