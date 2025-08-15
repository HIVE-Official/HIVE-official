import{j as e}from"./jsx-runtime-B9GTzLod.js";import{C as q}from"./campus-builder-tools-B4ojQ-wR.js";import"./index-BMjrbHXN.js";import"./framer-motion-proxy-Bip1EXUU.js";import"./utils-CytzSlOG.js";import"./lock-CpC2nJsY.js";import"./createLucideIcon-DtX30ipI.js";import"./zap-BzDMfB1h.js";import"./users-B5XgMSov.js";import"./star-q8LOEa9p.js";import"./clock-B-89-V79.js";const ie={title:"HIVE/Profile/CampusBuilderTools",component:q,parameters:{layout:"fullscreen",backgrounds:{default:"hive-dark",values:[{name:"hive-dark",value:"var(--hive-background-primary)"},{name:"hive-obsidian",value:"var(--hive-background-primary)"}]},docs:{description:{component:"Campus Builder Tools with subtle, elegant treatment. Provides sophisticated building functionality without dominating the campus social experience."}}},argTypes:{onToolClick:{action:"tool clicked"},onCreateTool:{action:"create tool clicked"},onViewTool:{action:"view tool clicked"},onBecomeBuilder:{action:"become builder clicked"},onViewAllCreated:{action:"view all created clicked"},variant:{control:{type:"select"},options:["default","compact","subtle"]},isBuilder:{control:{type:"boolean"}},showBecomeBuilder:{control:{type:"boolean"}},isLoading:{control:{type:"boolean"}}},decorators:[r=>e.jsx("div",{className:"p-8 min-h-screen bg-obsidian",children:e.jsx("div",{className:"max-w-md mx-auto",children:e.jsx(r,{})})})]},a=[{id:"1",name:"Study Schedule Template",type:"template",category:"productivity",description:"Create personalized study schedules that adapt to your class times",icon:"📅",difficulty:"beginner",timeToCreate:"5 min",popularity:5,usageCount:1247},{id:"2",name:"Grade Tracker Widget",type:"widget",category:"academic",description:"Track your grades and GPA across all courses with visual insights",icon:"📊",difficulty:"intermediate",timeToCreate:"10 min",popularity:4,usageCount:892},{id:"3",name:"Dorm Event Automation",type:"automation",category:"social",description:"Automatically notify dorm mates about upcoming events and activities",icon:"🎉",difficulty:"advanced",timeToCreate:"20 min",popularity:4,usageCount:567,isPremium:!0},{id:"4",name:"Calendar Integration",type:"integration",category:"utility",description:"Sync your class schedule with Google Calendar and other apps",icon:"🔗",difficulty:"intermediate",timeToCreate:"15 min",popularity:5,usageCount:1056},{id:"5",name:"Custom Dashboard",type:"custom",category:"productivity",description:"Build a personalized dashboard with widgets you choose",icon:"🎛️",difficulty:"advanced",timeToCreate:"30 min",popularity:3,usageCount:234,isLocked:!0},{id:"6",name:"Group Study Finder",type:"template",category:"social",description:"Find and organize study groups with classmates",icon:"👥",difficulty:"beginner",timeToCreate:"8 min",popularity:4,usageCount:789}],s=[{id:"c1",name:"My Study Planner",type:"template",category:"productivity",description:"Personalized study schedule for CS courses",icon:"📚",createdAt:"2024-01-10T14:30:00Z",usageCount:45,isPublic:!0,likes:12,isStarred:!0},{id:"c2",name:"Dorm Chore Tracker",type:"widget",category:"utility",description:"Track shared chores with roommates",icon:"🏠",createdAt:"2024-01-08T09:15:00Z",usageCount:23,isPublic:!1,likes:0},{id:"c3",name:"Club Meeting Reminder",type:"automation",category:"social",description:"Automated reminders for robotics club meetings",icon:"🤖",createdAt:"2024-01-05T16:45:00Z",usageCount:67,isPublic:!0,likes:8},{id:"c4",name:"Grade Calculator Pro",type:"custom",category:"academic",description:"Advanced grade calculations with weighted categories",icon:"🧮",createdAt:"2024-01-03T11:20:00Z",usageCount:156,isPublic:!0,likes:34,isStarred:!0}],o={args:{availableTools:a,createdTools:[],isBuilder:!1,showBecomeBuilder:!0}},t={args:{availableTools:a,createdTools:s,isBuilder:!0}},i={args:{availableTools:a,createdTools:s,isBuilder:!0}},l={args:{availableTools:a.slice(0,3),createdTools:[],isBuilder:!0}},c={args:{availableTools:a,createdTools:s,isBuilder:!0}},d={args:{availableTools:[],createdTools:[],isBuilder:!0,isLoading:!0}},n={args:{availableTools:a.slice(0,3),createdTools:s.slice(0,2),isBuilder:!0,variant:"compact"}},m={args:{availableTools:a.slice(0,3),createdTools:s.slice(0,2),isBuilder:!0,variant:"subtle"}},u={args:{availableTools:a.slice(0,4),createdTools:s.slice(0,2),isBuilder:!0},decorators:[r=>e.jsx("div",{className:"p-8 min-h-screen bg-obsidian",children:e.jsx("div",{className:"max-w-6xl mx-auto",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-4 gap-6",children:[e.jsxs("div",{className:"lg:col-span-3 space-y-6",children:[e.jsx("div",{className:"rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-16 h-16 rounded-2xl bg-gradient-to-br from-charcoal via-graphite to-charcoal border-2 border-steel/20 flex items-center justify-center",children:e.jsx("span",{className:"text-platinum text-xl font-bold",children:"SC"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-platinum font-bold text-xl",children:"Sarah Chen"}),e.jsx("p",{className:"text-mercury text-sm",children:"Computer Science • Class of '26"}),e.jsx("p",{className:"text-mercury text-sm",children:"West Campus"})]})]})}),e.jsxs("div",{className:"rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6",children:[e.jsx("h3",{className:"text-platinum font-semibold mb-4",children:"Recent Activity"}),e.jsx("div",{className:"space-y-3",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-8 h-8 rounded-xl bg-gradient-to-br from-gold/20 to-champagne/10 flex items-center justify-center",children:e.jsx("span",{className:"text-sm",children:"📢"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-mercury text-sm",children:"Midterm schedule posted in CS 101"}),e.jsx("p",{className:"text-steel text-xs",children:"2 hours ago"})]})]})})]})]}),e.jsx("div",{className:"lg:col-span-1",children:e.jsx(r,{})})]})})})]},p={args:{availableTools:a,createdTools:[],isBuilder:!1,showBecomeBuilder:!0},decorators:[r=>e.jsx("div",{className:"p-8 min-h-screen bg-obsidian",children:e.jsx("div",{className:"max-w-6xl mx-auto",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-4 gap-6",children:[e.jsx("div",{className:"lg:col-span-3 space-y-6",children:e.jsxs("div",{className:"rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6",children:[e.jsx("h3",{className:"text-platinum font-semibold mb-4",children:"Your Campus Spaces"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-lg",children:"📚"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-platinum text-sm font-medium",children:"CS 101: Intro to Programming"}),e.jsx("p",{className:"text-mercury text-xs",children:"847 members • 3 unread"})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-lg",children:"🏠"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-platinum text-sm font-medium",children:"West Campus Residents"}),e.jsx("p",{className:"text-mercury text-xs",children:"234 members • 12 unread"})]})]})]})]})}),e.jsx("div",{className:"lg:col-span-1",children:e.jsx(r,{})})]})})})]},g={args:{availableTools:a.slice(0,3),createdTools:s.slice(0,2),isBuilder:!0},parameters:{viewport:{defaultViewport:"mobile1"}}};var v,x,b;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    availableTools: mockAvailableTools,
    createdTools: [],
    isBuilder: false,
    showBecomeBuilder: true
  }
}`,...(b=(x=o.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var h,y,T;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    availableTools: mockAvailableTools,
    createdTools: mockCreatedTools,
    isBuilder: true
  }
}`,...(T=(y=t.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var N,f,C;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    availableTools: mockAvailableTools,
    createdTools: mockCreatedTools,
    isBuilder: true
  }
}`,...(C=(f=i.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var B,j,k;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    availableTools: mockAvailableTools.slice(0, 3),
    createdTools: [],
    isBuilder: true
  }
}`,...(k=(j=l.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var S,w,A;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    availableTools: mockAvailableTools,
    createdTools: mockCreatedTools,
    isBuilder: true
  }
}`,...(A=(w=c.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var P,M,I;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    availableTools: [],
    createdTools: [],
    isBuilder: true,
    isLoading: true
  }
}`,...(I=(M=d.parameters)==null?void 0:M.docs)==null?void 0:I.source}}};var L,G,W;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    availableTools: mockAvailableTools.slice(0, 3),
    createdTools: mockCreatedTools.slice(0, 2),
    isBuilder: true,
    variant: 'compact'
  }
}`,...(W=(G=n.parameters)==null?void 0:G.docs)==null?void 0:W.source}}};var R,D,V;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    availableTools: mockAvailableTools.slice(0, 3),
    createdTools: mockCreatedTools.slice(0, 2),
    isBuilder: true,
    variant: 'subtle'
  }
}`,...(V=(D=m.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};var z,E,Z;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    availableTools: mockAvailableTools.slice(0, 4),
    createdTools: mockCreatedTools.slice(0, 2),
    isBuilder: true
  },
  decorators: [Story => <div className="p-8 min-h-screen bg-obsidian">
        <div className="max-w-6xl mx-auto">
          {/* BentoGrid Layout Context */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Profile Content - 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Campus Identity Header */}
              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-charcoal via-graphite to-charcoal border-2 border-steel/20 flex items-center justify-center">
                    <span className="text-platinum text-xl font-bold">SC</span>
                  </div>
                  <div>
                    <h2 className="text-platinum font-bold text-xl">Sarah Chen</h2>
                    <p className="text-mercury text-sm">Computer Science • Class of '26</p>
                    <p className="text-mercury text-sm">West Campus</p>
                  </div>
                </div>
              </div>

              {/* Campus Activity */}
              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <h3 className="text-platinum font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold/20 to-champagne/10 flex items-center justify-center">
                      <span className="text-sm">📢</span>
                    </div>
                    <div>
                      <p className="text-mercury text-sm">Midterm schedule posted in CS 101</p>
                      <p className="text-steel text-xs">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Builder Tools - Subtle Sidebar Treatment */}
            <div className="lg:col-span-1">
              <Story />
            </div>
          </div>
        </div>
      </div>]
}`,...(Z=(E=u.parameters)==null?void 0:E.docs)==null?void 0:Z.source}}};var F,H,U;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    availableTools: mockAvailableTools,
    createdTools: [],
    isBuilder: false,
    showBecomeBuilder: true
  },
  decorators: [Story => <div className="p-8 min-h-screen bg-obsidian">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main campus content dominates */}
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <h3 className="text-platinum font-semibold mb-4">Your Campus Spaces</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📚</span>
                    <div>
                      <p className="text-platinum text-sm font-medium">CS 101: Intro to Programming</p>
                      <p className="text-mercury text-xs">847 members • 3 unread</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🏠</span>
                    <div>
                      <p className="text-platinum text-sm font-medium">West Campus Residents</p>
                      <p className="text-mercury text-xs">234 members • 12 unread</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subtle builder invitation - doesn't dominate */}
            <div className="lg:col-span-1">
              <Story />
            </div>
          </div>
        </div>
      </div>]
}`,...(U=(H=p.parameters)==null?void 0:H.docs)==null?void 0:U.source}}};var Y,_,O;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    availableTools: mockAvailableTools.slice(0, 3),
    createdTools: mockCreatedTools.slice(0, 2),
    isBuilder: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(O=(_=g.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};const le=["NonBuilderInvitation","BuilderDefault","BuilderWithManyTools","BuilderNewUser","BuilderActiveCreator","Loading","Compact","Subtle","BentoGridLayout","NonBuilderInContext","Mobile"];export{u as BentoGridLayout,c as BuilderActiveCreator,t as BuilderDefault,l as BuilderNewUser,i as BuilderWithManyTools,n as Compact,d as Loading,g as Mobile,p as NonBuilderInContext,o as NonBuilderInvitation,m as Subtle,le as __namedExportsOrder,ie as default};
