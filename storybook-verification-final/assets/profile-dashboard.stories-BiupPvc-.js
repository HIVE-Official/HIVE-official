import{j as h}from"./jsx-runtime-B9GTzLod.js";import{P as Q}from"./profile-dashboard-B9ymp9M8.js";import"./index-BMjrbHXN.js";import"./framer-motion-proxy-B9jN8120.js";import"./utils-CytzSlOG.js";import"./campus-identity-header-B-aNQBST.js";import"./campus-spaces-card-CwaOV8gC.js";import"./createLucideIcon-DtX30ipI.js";import"./message-square-B08MMCUN.js";import"./pin-u4JsefzA.js";import"./bell-DcMkR9fh.js";import"./user-minus-DQ1RMynK.js";import"./send-BhLLUBQ1.js";import"./x-DmZh90ps.js";import"./campus-activity-feed-CkIDEGm7.js";import"./campus-builder-tools-DbdUtSmf.js";import"./lock-CpC2nJsY.js";import"./zap-BzDMfB1h.js";import"./users-B5XgMSov.js";import"./star-q8LOEa9p.js";import"./clock-B-89-V79.js";import"./calendar-RwBiWFlj.js";import"./plus-BTyRuzWD.js";import"./triangle-alert-Cs-Y0lD5.js";import"./loader-circle-C0fUCed1.js";import"./map-pin-J5WJcL57.js";import"./trash-2-CZMgR76f.js";const Ce={title:"HIVE/Organisms/ProfileDashboard",component:Q,parameters:{layout:"fullscreen",backgrounds:{default:"hive-dark",values:[{name:"hive-dark",value:"var(--hive-background-primary)"},{name:"hive-obsidian",value:"var(--hive-background-primary)"}]},docs:{description:{component:"Complete Profile Dashboard organism combining Campus Identity Header, Spaces Card, Activity Feed, and Builder Tools into sophisticated BentoGrid layouts. Adapts beautifully across desktop, tablet, and mobile with campus-first social hierarchy."}}},argTypes:{onAvatarClick:{action:"avatar clicked"},onEditProfile:{action:"edit profile clicked"},onSpaceClick:{action:"space clicked"},onActivityClick:{action:"activity clicked"},onToolClick:{action:"tool clicked"},onCreateTool:{action:"create tool clicked"},onBecomeBuilder:{action:"become builder clicked"},onJoinSpace:{action:"join space clicked"},onViewAllSpaces:{action:"view all spaces clicked"},onViewAllActivities:{action:"view all activities clicked"},layout:{control:{type:"select"},options:["desktop","tablet","mobile"]},variant:{control:{type:"select"},options:["default","compact","focused"]},showBuilder:{control:{type:"boolean"}}},decorators:[s=>h.jsx("div",{style:{minHeight:"100vh"},children:h.jsx(s,{})})]},e={name:"Sarah Chen",handle:"sarahc_cs",avatar:"https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=128&h=128&fit=crop&crop=face",year:"2026",major:"Computer Science",dorm:"West Campus",isOnline:!0,isBuilder:!0,completionPercentage:85},a=[{id:"1",name:"CS 101: Intro to Programming",type:"course",memberCount:847,unreadCount:3,lastActivity:"2024-01-15T10:30:00Z",isPinned:!0,recentActivity:{type:"announcement",preview:"Midterm exam scheduled for next Friday",timestamp:"2024-01-15T10:30:00Z"}},{id:"2",name:"West Campus Residents",type:"housing",memberCount:234,unreadCount:12,lastActivity:"2024-01-15T09:15:00Z",isFavorite:!0,recentActivity:{type:"message",preview:"Anyone want to grab dinner tonight?",timestamp:"2024-01-15T09:15:00Z"}},{id:"3",name:"Robotics Club",type:"club",memberCount:156,lastActivity:"2024-01-14T16:45:00Z",recentActivity:{type:"event",preview:"Weekly meeting moved to Thursday",timestamp:"2024-01-14T16:45:00Z"}},{id:"4",name:"Study Abroad Alumni",type:"community",memberCount:89,unreadCount:1,lastActivity:"2024-01-13T14:20:00Z",recentActivity:{type:"message",preview:"Share your favorite study abroad memories!",timestamp:"2024-01-13T14:20:00Z"}},{id:"5",name:"Class of 2026",type:"graduation",memberCount:1203,unreadCount:24,lastActivity:"2024-01-15T08:00:00Z",recentActivity:{type:"announcement",preview:"Senior year course registration opens Monday",timestamp:"2024-01-15T08:00:00Z"}}],o=[{id:"1",type:"announcement",title:"Midterm Exam Schedule Released",content:"Your Computer Science 101 midterm has been scheduled for Friday, January 26th at 10:00 AM in the main lecture hall.",author:{name:"Prof. Sarah Chen",avatar:"https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=32&h=32&fit=crop&crop=face",handle:"prof_chen"},space:{id:"cs101",name:"CS 101: Intro to Programming",type:"course"},timestamp:"2024-01-15T14:30:00Z",priority:"high",isUnread:!0,metadata:{likes:12,replyCount:8,eventDate:"2024-01-26T10:00:00Z"}},{id:"2",type:"message",title:"Study Group Formation",content:"Hey everyone! Looking to form a study group for the upcoming midterm. We can meet in the library every Tuesday and Thursday.",author:{name:"Marcus Thompson",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",handle:"marcus_builds"},space:{id:"cs101",name:"CS 101: Intro to Programming",type:"course"},timestamp:"2024-01-15T13:45:00Z",priority:"medium",isUnread:!0,metadata:{likes:5,replyCount:3}},{id:"3",type:"social",title:"Dorm Game Night Tonight!",content:"Join us in the common room at 8 PM for board games and pizza. All West Campus residents welcome!",author:{name:"Alex Rivera",avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",handle:"alex_r"},space:{id:"west-campus",name:"West Campus Residents",type:"housing"},timestamp:"2024-01-15T12:15:00Z",priority:"medium",metadata:{likes:18,replyCount:12,eventDate:"2024-01-15T20:00:00Z"}},{id:"4",type:"assignment",title:"Programming Assignment 3 Posted",content:"New assignment focusing on data structures and algorithms. Due next Friday.",author:{name:"TA Jordan Kim",handle:"jordan_ta"},space:{id:"cs101",name:"CS 101: Intro to Programming",type:"course"},timestamp:"2024-01-15T11:00:00Z",priority:"high",isUnread:!1,metadata:{attachmentCount:2,dueDate:"2024-01-22T23:59:00Z"}},{id:"5",type:"achievement",title:"Congratulations! Tool Featured",content:"Your study planner tool has been featured in the HIVE showcase and gained 50+ users this week!",timestamp:"2024-01-15T09:30:00Z",priority:"medium",metadata:{likes:24}},{id:"6",type:"event",title:"Robotics Club Meeting",content:"Weekly meeting to discuss the upcoming competition. New members welcome!",author:{name:"Priya Patel",avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face",handle:"priya_robotics"},space:{id:"robotics",name:"Robotics Club",type:"club"},timestamp:"2024-01-14T16:45:00Z",priority:"medium",metadata:{eventDate:"2024-01-18T19:00:00Z",replyCount:6}}],t=[{id:"1",name:"Study Schedule Template",type:"template",category:"productivity",description:"Create personalized study schedules that adapt to your class times",icon:"📅",difficulty:"beginner",timeToCreate:"5 min",popularity:5,usageCount:1247},{id:"2",name:"Grade Tracker Widget",type:"widget",category:"academic",description:"Track your grades and GPA across all courses with visual insights",icon:"📊",difficulty:"intermediate",timeToCreate:"10 min",popularity:4,usageCount:892},{id:"3",name:"Dorm Event Automation",type:"automation",category:"social",description:"Automatically notify dorm mates about upcoming events and activities",icon:"🎉",difficulty:"advanced",timeToCreate:"20 min",popularity:4,usageCount:567,isPremium:!0},{id:"4",name:"Calendar Integration",type:"integration",category:"utility",description:"Sync your class schedule with Google Calendar and other apps",icon:"🔗",difficulty:"intermediate",timeToCreate:"15 min",popularity:5,usageCount:1056}],i=[{id:"c1",name:"My Study Planner",type:"template",category:"productivity",description:"Personalized study schedule for CS courses",icon:"📚",createdAt:"2024-01-10T14:30:00Z",usageCount:45,isPublic:!0,likes:12,isStarred:!0},{id:"c2",name:"Dorm Chore Tracker",type:"widget",category:"utility",description:"Track shared chores with roommates",icon:"🏠",createdAt:"2024-01-08T09:15:00Z",usageCount:23,isPublic:!1,likes:0},{id:"c3",name:"Club Meeting Reminder",type:"automation",category:"social",description:"Automated reminders for robotics club meetings",icon:"🤖",createdAt:"2024-01-05T16:45:00Z",usageCount:67,isPublic:!0,likes:8}],r={args:{user:e,spaces:a,activities:o,availableTools:t,createdTools:i,layout:"desktop",showBuilder:!0}},n={args:{user:{...e,isBuilder:!1},spaces:a,activities:o,availableTools:t,createdTools:[],layout:"desktop",showBuilder:!0}},c={args:{user:e,spaces:a.slice(0,3),activities:o.slice(0,4),availableTools:t,createdTools:i,layout:"tablet",showBuilder:!0},parameters:{viewport:{defaultViewport:"tablet"}}},l={args:{user:e,spaces:a.slice(0,3),activities:o.slice(0,3),availableTools:t.slice(0,2),createdTools:i.slice(0,1),layout:"mobile",showBuilder:!0},parameters:{viewport:{defaultViewport:"mobile1"}}},m={args:{user:e,spaces:[],activities:[],availableTools:[],createdTools:[],layout:"desktop",showBuilder:!0,isLoading:{profile:!1,spaces:!0,activities:!0,tools:!0}}},d={args:{user:{...e,name:"Alex Rivera",handle:"alex_r",year:"2027",major:"Biology",dorm:"Freshman Quad",isOnline:!1,isBuilder:!1,completionPercentage:25},spaces:a.slice(0,2),activities:o.slice(0,2),availableTools:t,createdTools:[],layout:"desktop",showBuilder:!0}},u={args:{user:e,spaces:a,activities:o,availableTools:t,createdTools:i,layout:"desktop",variant:"focused",showBuilder:!1}},p={args:{user:e,spaces:a.slice(0,3),activities:o.slice(0,4),availableTools:t,createdTools:i,layout:"desktop",variant:"compact",showBuilder:!0}},y={args:{user:e,spaces:a.map(s=>({...s,unreadCount:Math.floor(Math.random()*50)+1})),activities:o.map((s,J)=>({...s,isUnread:J<4})),availableTools:t,createdTools:i,layout:"desktop",showBuilder:!0}},v={args:{user:{...e,isBuilder:!1,completionPercentage:0},spaces:[],activities:[],availableTools:t,createdTools:[],layout:"desktop",showBuilder:!0}};var g,T,k;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    user: mockUser,
    spaces: mockSpaces,
    activities: mockActivities,
    availableTools: mockAvailableTools,
    createdTools: mockCreatedTools,
    layout: 'desktop',
    showBuilder: true
  }
}`,...(k=(T=r.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var b,f,C;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    user: {
      ...mockUser,
      isBuilder: false
    },
    spaces: mockSpaces,
    activities: mockActivities,
    availableTools: mockAvailableTools,
    createdTools: [],
    layout: 'desktop',
    showBuilder: true
  }
}`,...(C=(f=n.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var w,A,S;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    user: mockUser,
    spaces: mockSpaces.slice(0, 3),
    activities: mockActivities.slice(0, 4),
    availableTools: mockAvailableTools,
    createdTools: mockCreatedTools,
    layout: 'tablet',
    showBuilder: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
}`,...(S=(A=c.parameters)==null?void 0:A.docs)==null?void 0:S.source}}};var B,P,Z;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    user: mockUser,
    spaces: mockSpaces.slice(0, 3),
    activities: mockActivities.slice(0, 3),
    availableTools: mockAvailableTools.slice(0, 2),
    createdTools: mockCreatedTools.slice(0, 1),
    layout: 'mobile',
    showBuilder: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(Z=(P=l.parameters)==null?void 0:P.docs)==null?void 0:Z.source}}};var x,U,M;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    user: mockUser,
    spaces: [],
    activities: [],
    availableTools: [],
    createdTools: [],
    layout: 'desktop',
    showBuilder: true,
    isLoading: {
      profile: false,
      spaces: true,
      activities: true,
      tools: true
    }
  }
}`,...(M=(U=m.parameters)==null?void 0:U.docs)==null?void 0:M.source}}};var D,F,R;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    user: {
      ...mockUser,
      name: 'Alex Rivera',
      handle: 'alex_r',
      year: '2027',
      major: 'Biology',
      dorm: 'Freshman Quad',
      isOnline: false,
      isBuilder: false,
      completionPercentage: 25
    },
    spaces: mockSpaces.slice(0, 2),
    activities: mockActivities.slice(0, 2),
    availableTools: mockAvailableTools,
    createdTools: [],
    layout: 'desktop',
    showBuilder: true
  }
}`,...(R=(F=d.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var _,j,E;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    user: mockUser,
    spaces: mockSpaces,
    activities: mockActivities,
    availableTools: mockAvailableTools,
    createdTools: mockCreatedTools,
    layout: 'desktop',
    variant: 'focused',
    showBuilder: false
  }
}`,...(E=(j=u.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};var I,V,W;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    user: mockUser,
    spaces: mockSpaces.slice(0, 3),
    activities: mockActivities.slice(0, 4),
    availableTools: mockAvailableTools,
    createdTools: mockCreatedTools,
    layout: 'desktop',
    variant: 'compact',
    showBuilder: true
  }
}`,...(W=(V=p.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var H,N,G;y.parameters={...y.parameters,docs:{...(H=y.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    user: mockUser,
    spaces: mockSpaces.map(space => ({
      ...space,
      unreadCount: Math.floor(Math.random() * 50) + 1
    })),
    activities: mockActivities.map((activity, index) => ({
      ...activity,
      isUnread: index < 4
    })),
    availableTools: mockAvailableTools,
    createdTools: mockCreatedTools,
    layout: 'desktop',
    showBuilder: true
  }
}`,...(G=(N=y.parameters)==null?void 0:N.docs)==null?void 0:G.source}}};var L,O,z;v.parameters={...v.parameters,docs:{...(L=v.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    user: {
      ...mockUser,
      isBuilder: false,
      completionPercentage: 0
    },
    spaces: [],
    activities: [],
    availableTools: mockAvailableTools,
    createdTools: [],
    layout: 'desktop',
    showBuilder: true
  }
}`,...(z=(O=v.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};const we=["Default","NonBuilder","Tablet","Mobile","Loading","NewStudent","Focused","Compact","HighActivity","EmptyStates"];export{p as Compact,r as Default,v as EmptyStates,u as Focused,y as HighActivity,m as Loading,l as Mobile,d as NewStudent,n as NonBuilder,c as Tablet,we as __namedExportsOrder,Ce as default};
