import{j as e}from"./jsx-runtime-B9GTzLod.js";import{C as H}from"./campus-spaces-card-CwaOV8gC.js";import"./index-BMjrbHXN.js";import"./framer-motion-proxy-B9jN8120.js";import"./utils-CytzSlOG.js";import"./createLucideIcon-DtX30ipI.js";import"./message-square-B08MMCUN.js";import"./pin-u4JsefzA.js";import"./bell-DcMkR9fh.js";import"./user-minus-DQ1RMynK.js";import"./send-BhLLUBQ1.js";import"./x-DmZh90ps.js";const Y={title:"HIVE/Spaces/Molecules/CampusSpacesCard",component:H,parameters:{layout:"fullscreen",backgrounds:{default:"hive-dark",values:[{name:"hive-dark",value:"var(--hive-background-primary)"},{name:"hive-obsidian",value:"var(--hive-background-primary)"}]},docs:{description:{component:"Campus Spaces Card with sophisticated BentoGrid aesthetic. Shows user's joined campus spaces with elegant hover states and social-first information hierarchy."}}},argTypes:{onSpaceClick:{action:"space clicked"},onJoinSpace:{action:"join space clicked"},onViewAll:{action:"view all clicked"},variant:{control:{type:"select"},options:["default","compact","detailed"]},showQuickActions:{control:{type:"boolean"}},isLoading:{control:{type:"boolean"}}},decorators:[l=>e.jsx("div",{className:"p-8 min-h-screen bg-obsidian",children:e.jsx("div",{className:"max-w-md mx-auto",children:e.jsx(l,{})})})]},s=[{id:"1",name:"CS 101: Intro to Programming",type:"course",memberCount:847,unreadCount:3,lastActivity:"2024-01-15T10:30:00Z",isPinned:!0,recentActivity:{type:"announcement",preview:"Midterm exam scheduled for next Friday",timestamp:"2024-01-15T10:30:00Z"}},{id:"2",name:"West Campus Residents",type:"housing",memberCount:234,unreadCount:12,lastActivity:"2024-01-15T09:15:00Z",isFavorite:!0,recentActivity:{type:"message",preview:"Anyone want to grab dinner tonight?",timestamp:"2024-01-15T09:15:00Z"}},{id:"3",name:"Robotics Club",type:"club",memberCount:156,lastActivity:"2024-01-14T16:45:00Z",recentActivity:{type:"event",preview:"Weekly meeting moved to Thursday",timestamp:"2024-01-14T16:45:00Z"}},{id:"4",name:"Study Abroad Alumni",type:"community",memberCount:89,unreadCount:1,lastActivity:"2024-01-13T14:20:00Z",recentActivity:{type:"message",preview:"Share your favorite study abroad memories!",timestamp:"2024-01-13T14:20:00Z"}},{id:"5",name:"Engineering Peer Mentors",type:"mentoring",memberCount:45,lastActivity:"2024-01-12T11:30:00Z",isPrivate:!0,recentActivity:{type:"announcement",preview:"New mentee applications are now open",timestamp:"2024-01-12T11:30:00Z"}},{id:"6",name:"Class of 2026",type:"graduation",memberCount:1203,unreadCount:24,lastActivity:"2024-01-15T08:00:00Z",recentActivity:{type:"announcement",preview:"Senior year course registration opens Monday",timestamp:"2024-01-15T08:00:00Z"}},{id:"7",name:"Hackathon Team Alpha",type:"academic",memberCount:12,lastActivity:"2024-01-14T20:15:00Z",recentActivity:{type:"message",preview:"Great work on the prototype everyone!",timestamp:"2024-01-14T20:15:00Z"}}],a={args:{spaces:s.slice(0,5),showQuickActions:!0}},t={args:{spaces:s,showQuickActions:!0}},r={args:{spaces:s.slice(0,2),showQuickActions:!0}},i={args:{spaces:[],showQuickActions:!0}},n={args:{spaces:[],isLoading:!0}},c={args:{spaces:s.slice(0,4),showQuickActions:!1}},o={args:{spaces:[{...s[0],unreadCount:99,isPinned:!0},{...s[1],unreadCount:156,isFavorite:!0},{...s[2],unreadCount:42}],showQuickActions:!0}},d={args:{spaces:s.slice(0,4),showQuickActions:!0},decorators:[l=>e.jsx("div",{className:"p-8 min-h-screen bg-obsidian",children:e.jsx("div",{className:"max-w-6xl mx-auto",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[e.jsx("div",{className:"lg:col-span-1",children:e.jsx(l,{})}),e.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[e.jsxs("div",{className:"rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6",children:[e.jsx("h3",{className:"text-platinum font-semibold mb-4",children:"Campus Activity Feed"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-champagne/10 flex items-center justify-center",children:e.jsx("span",{className:"text-xs",children:"📚"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-mercury text-sm",children:"New assignment posted in CS 101"}),e.jsx("p",{className:"text-steel text-xs",children:"2 hours ago"})]})]}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center",children:e.jsx("span",{className:"text-xs",children:"🏠"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-mercury text-sm",children:"Dorm meeting tonight at 7 PM"}),e.jsx("p",{className:"text-steel text-xs",children:"4 hours ago"})]})]})]})]}),e.jsxs("div",{className:"rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6",children:[e.jsx("h3",{className:"text-platinum font-semibold mb-4",children:"Quick Stats"}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 text-center",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-2xl font-bold text-gold",children:"5"}),e.jsx("div",{className:"text-xs text-mercury",children:"Active Spaces"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-2xl font-bold text-emerald",children:"24"}),e.jsx("div",{className:"text-xs text-mercury",children:"Unread Messages"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-2xl font-bold text-platinum",children:"12"}),e.jsx("div",{className:"text-xs text-mercury",children:"This Week"})]})]})]})]})]})})})]},m={args:{spaces:s.slice(0,4),showQuickActions:!0},parameters:{viewport:{defaultViewport:"mobile1"}}};var p,u,x;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.slice(0, 5),
    showQuickActions: true
  }
}`,...(x=(u=a.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var v,g,h;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces,
    showQuickActions: true
  }
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var y,b,N;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.slice(0, 2),
    showQuickActions: true
  }
}`,...(N=(b=r.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};var f,k,w;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    spaces: [],
    showQuickActions: true
  }
}`,...(w=(k=i.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var A,j,S;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    spaces: [],
    isLoading: true
  }
}`,...(S=(j=n.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var C,Q,T;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.slice(0, 4),
    showQuickActions: false
  }
}`,...(T=(Q=c.parameters)==null?void 0:Q.docs)==null?void 0:T.source}}};var Z,M,F;o.parameters={...o.parameters,docs:{...(Z=o.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    spaces: [{
      ...mockSpaces[0],
      unreadCount: 99,
      isPinned: true
    }, {
      ...mockSpaces[1],
      unreadCount: 156,
      isFavorite: true
    }, {
      ...mockSpaces[2],
      unreadCount: 42
    }],
    showQuickActions: true
  }
}`,...(F=(M=o.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var L,P,E;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.slice(0, 4),
    showQuickActions: true
  },
  decorators: [Story => <div className="p-8 min-h-screen bg-obsidian">
        <div className="max-w-6xl mx-auto">
          {/* BentoGrid Layout Context */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Campus Spaces - Takes 1 column */}
            <div className="lg:col-span-1">
              <Story />
            </div>
            
            {/* Main Content Area - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <h3 className="text-platinum font-semibold mb-4">Campus Activity Feed</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-champagne/10 flex items-center justify-center">
                      <span className="text-xs">📚</span>
                    </div>
                    <div>
                      <p className="text-mercury text-sm">New assignment posted in CS 101</p>
                      <p className="text-steel text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
                      <span className="text-xs">🏠</span>
                    </div>
                    <div>
                      <p className="text-mercury text-sm">Dorm meeting tonight at 7 PM</p>
                      <p className="text-steel text-xs">4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <h3 className="text-platinum font-semibold mb-4">Quick Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gold">5</div>
                    <div className="text-xs text-mercury">Active Spaces</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald">24</div>
                    <div className="text-xs text-mercury">Unread Messages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-platinum">12</div>
                    <div className="text-xs text-mercury">This Week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>]
}`,...(E=(P=d.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};var G,B,D;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    spaces: mockSpaces.slice(0, 4),
    showQuickActions: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(D=(B=m.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};const $=["Default","ManySpaces","FewSpaces","Empty","Loading","NoQuickActions","HighActivity","BentoGridLayout","Mobile"];export{d as BentoGridLayout,a as Default,i as Empty,r as FewSpaces,o as HighActivity,n as Loading,t as ManySpaces,m as Mobile,c as NoQuickActions,$ as __namedExportsOrder,Y as default};
