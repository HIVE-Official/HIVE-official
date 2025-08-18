import{j as e}from"./jsx-runtime-B9GTzLod.js";import{c as p}from"./utils-CytzSlOG.js";import{A as _}from"./avatar-Y7_S4Uop.js";import{B as t}from"./button-enhanced-5mvuuZ4M.js";import{U as Ca}from"./users-B5XgMSov.js";import{H as Ua}from"./house-Bg02DBcS.js";import{G as Sa}from"./graduation-cap-CjRbfMsL.js";import{U as Ba}from"./user-DLkx1tbP.js";import{U as X}from"./user-check-Div6BfLT.js";import{U as Z}from"./user-plus-BC0iow-Q.js";import{M as ee}from"./message-circle-CnQJGxxu.js";import{E as ae}from"./ellipsis-D2AHQBIe.js";import{M as qa}from"./mail-DQ8H9hI8.js";import{M as Pa}from"./map-pin-J5WJcL57.js";import{C as Aa}from"./calendar-RwBiWFlj.js";import{L as Da}from"./link-D9HUmIqS.js";import"./index-BMjrbHXN.js";import"./index-BwobEAja.js";import"./createLucideIcon-DtX30ipI.js";const Ia={student:{color:"text-[var(--hive-status-info)]",label:"Student"},builder:{color:"text-[var(--hive-brand-secondary)]",label:"Builder"},leader:{color:"text-[var(--hive-brand-secondary)]",label:"Leader"},verified:{color:"text-[var(--hive-status-success)]",label:"Verified"}},Ta={university:{icon:Sa,color:"text-[var(--hive-status-info)]",label:"University"},residential:{icon:Ua,color:"text-[var(--hive-text-secondary)]",label:"Residential"},greek:{icon:Ca,color:"text-[var(--hive-brand-secondary)]",label:"Greek Life"}},Ma={none:{label:"Follow",icon:Z,variant:"secondary"},following:{label:"Following",icon:X,variant:"accent"},followed:{label:"Follow Back",icon:Z,variant:"secondary"},mutual:{label:"Following",icon:X,variant:"accent"},blocked:{label:"Blocked",icon:Ba,variant:"ghost"}},d=({user:a,variant:E="default",relationship:v="none",onFollow:o,onMessage:c,onEmail:W,onViewProfile:$,onMenu:m,showActions:H=!0,showStats:O=!0,showBio:Q=!0,showDetails:ka=!0,interactive:f=!0,className:G,...J})=>{const n=a.role?Ia[a.role]:null;a.affiliation&&Ta[a.affiliation];const u=Ma[v],K=r=>{f&&$&&!r.defaultPrevented&&$(a.id)},i=(r,Na)=>{r.preventDefault(),r.stopPropagation(),Na()},l=r=>r>=1e3?`${(r/1e3).toFixed(1)}k`:r.toString();return E==="minimal"?e.jsxs("div",{className:p("flex items-center space-x-4 p-4","bg-[var(--hive-background-secondary)]","border border-[var(--hive-border-default)]","rounded-2xl shadow-level2",f&&["cursor-pointer","hover:bg-[var(--hive-background-tertiary)]","hover:border-[var(--hive-border-secondary)]","hover:shadow-level3","transition-all duration-200 ease-out"].filter(Boolean).join(" "),G),onClick:K,...J,children:[e.jsx(_,{src:a.avatar,initials:a.name.split(" ").map(r=>r[0]).join(""),size:"md"}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h3",{className:"font-semibold text-[var(--hive-text-primary)] mb-1",children:a.name}),e.jsxs("p",{className:"text-sm text-[var(--hive-text-secondary)] mb-1",children:["@",a.handle]}),n&&e.jsx("div",{className:p("text-xs font-medium",n.color),children:n.label})]}),H&&v!=="blocked"&&e.jsx(t,{size:"sm",variant:u.variant,onClick:r=>i(r,()=>o==null?void 0:o(a.id)),children:e.jsx(u.icon,{className:"h-4 w-4"})})]}):E==="compact"?e.jsxs("div",{className:p("p-4","bg-[var(--hive-background-secondary)]","border border-[var(--hive-border-default)]","rounded-2xl shadow-level2",f&&["cursor-pointer","hover:bg-[var(--hive-background-tertiary)]","hover:border-[var(--hive-border-secondary)]","hover:shadow-level3","transition-all duration-200 ease-out"].filter(Boolean).join(" "),G),onClick:K,...J,children:[e.jsxs("div",{className:"flex items-start justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(_,{src:a.avatar,initials:a.name.split(" ").map(r=>r[0]).join(""),size:"lg"}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h3",{className:"text-base font-bold text-[var(--hive-text-primary)] mb-1",children:a.name}),e.jsxs("p",{className:"text-sm text-[var(--hive-text-secondary)] mb-1",children:["@",a.handle]}),n&&e.jsx("div",{className:p("text-xs font-medium",n.color),children:n.label})]})]}),H&&e.jsxs("div",{className:"flex items-center space-x-2",children:[v!=="blocked"&&e.jsxs(e.Fragment,{children:[e.jsx(t,{size:"sm",variant:"ghost",onClick:r=>i(r,()=>c==null?void 0:c(a.id)),children:e.jsx(ee,{className:"h-4 w-4"})}),e.jsx(t,{size:"sm",variant:u.variant,onClick:r=>i(r,()=>o==null?void 0:o(a.id)),children:e.jsx(u.icon,{className:"h-4 w-4"})})]}),e.jsx(t,{size:"sm",variant:"ghost",onClick:r=>i(r,()=>m==null?void 0:m(a.id)),children:e.jsx(ae,{className:"h-4 w-4"})})]})]}),Q&&a.bio&&e.jsx("div",{className:"mb-4 pt-3 border-t border-[var(--hive-border-default)]",children:e.jsx("p",{className:"text-sm text-[var(--hive-text-secondary)] leading-relaxed line-clamp-2",children:a.bio})}),O&&e.jsxs("div",{className:"flex items-center space-x-6 text-sm pt-3 border-t border-[var(--hive-border-default)]",children:[a.followers!==void 0&&e.jsxs("div",{children:[e.jsx("span",{className:"font-bold text-[var(--hive-text-primary)]",children:l(a.followers)}),e.jsx("span",{className:"text-[var(--hive-text-secondary)] ml-1",children:"followers"})]}),a.following!==void 0&&e.jsxs("div",{children:[e.jsx("span",{className:"font-bold text-[var(--hive-text-primary)]",children:l(a.following)}),e.jsx("span",{className:"text-[var(--hive-text-secondary)] ml-1",children:"following"})]}),a.spaces!==void 0&&e.jsxs("div",{children:[e.jsx("span",{className:"font-bold text-[var(--hive-text-primary)]",children:l(a.spaces)}),e.jsx("span",{className:"text-[var(--hive-text-secondary)] ml-1",children:"spaces"})]})]})]}):e.jsxs("div",{className:p("p-4","bg-[var(--hive-background-secondary)]","border border-[var(--hive-border-default)]","rounded-2xl shadow-level3",f&&["cursor-pointer","hover:bg-[var(--hive-background-tertiary)]","hover:border-[var(--hive-border-secondary)]","hover:shadow-level4","transition-all duration-200 ease-out"].filter(Boolean).join(" "),G),onClick:K,...J,children:[e.jsxs("div",{className:"flex items-start justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(_,{src:a.avatar,initials:a.name.split(" ").map(r=>r[0]).join(""),size:"xl",interactive:!0}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h2",{className:"text-xl font-bold text-[var(--hive-text-primary)] mb-1",children:a.name}),e.jsxs("p",{className:"text-[var(--hive-text-secondary)] mb-1",children:["@",a.handle]}),n&&e.jsx("div",{className:p("text-sm font-medium",n.color),children:n.label})]})]}),H&&e.jsxs("div",{className:"flex items-center space-x-2",children:[v!=="blocked"&&e.jsxs(e.Fragment,{children:[e.jsx(t,{size:"md",variant:"ghost",onClick:r=>i(r,()=>c==null?void 0:c(a.id)),children:e.jsx(ee,{className:"h-4 w-4"})}),e.jsx(t,{size:"md",variant:"ghost",onClick:r=>i(r,()=>W==null?void 0:W(a.id)),children:e.jsx(qa,{className:"h-4 w-4"})}),e.jsx(t,{size:"md",variant:u.variant,onClick:r=>i(r,()=>o==null?void 0:o(a.id)),children:e.jsx(u.icon,{className:"h-4 w-4"})})]}),e.jsx(t,{size:"md",variant:"ghost",onClick:r=>i(r,()=>m==null?void 0:m(a.id)),children:e.jsx(ae,{className:"h-4 w-4"})})]})]}),Q&&a.bio&&e.jsx("div",{className:"mb-4 pt-3 border-t border-[var(--hive-border-default)]",children:e.jsx("p",{className:"text-[var(--hive-text-secondary)] leading-relaxed text-sm",children:a.bio})}),ka&&E==="detailed"&&e.jsxs("div",{className:"mb-4 space-y-2",children:[a.university&&e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(Sa,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsxs("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:[a.university,a.major&&` • ${a.major}`,a.graduationYear&&` • Class of ${a.graduationYear}`]})]}),a.location&&e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(Pa,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsx("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:a.location})]}),a.joinedDate&&e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(Aa,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsxs("span",{className:"text-sm text-[var(--hive-text-secondary)]",children:["Joined ",a.joinedDate]})]}),a.website&&e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(Da,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsx("a",{href:a.website,target:"_blank",rel:"noopener noreferrer",className:"text-sm text-[var(--hive-brand-secondary)] hover:underline",onClick:r=>r.stopPropagation(),children:a.website.replace(/^https?:\/\//,"")})]})]}),O&&e.jsxs("div",{className:"flex items-center justify-start space-x-6 pt-3 border-t border-[var(--hive-border-default)]",children:[a.followers!==void 0&&e.jsxs("div",{children:[e.jsx("div",{className:"font-bold text-lg text-[var(--hive-text-primary)]",children:l(a.followers)}),e.jsx("div",{className:"text-sm text-[var(--hive-text-secondary)]",children:"followers"})]}),a.following!==void 0&&e.jsxs("div",{children:[e.jsx("div",{className:"font-bold text-lg text-[var(--hive-text-primary)]",children:l(a.following)}),e.jsx("div",{className:"text-sm text-[var(--hive-text-secondary)]",children:"following"})]}),a.spaces!==void 0&&e.jsxs("div",{children:[e.jsx("div",{className:"font-bold text-lg text-[var(--hive-text-primary)]",children:l(a.spaces)}),e.jsx("div",{className:"text-sm text-[var(--hive-text-secondary)]",children:"spaces"})]}),a.tools!==void 0&&e.jsxs("div",{children:[e.jsx("div",{className:"font-bold text-lg text-[var(--hive-text-primary)]",children:l(a.tools)}),e.jsx("div",{className:"text-sm text-[var(--hive-text-secondary)]",children:"tools"})]})]})]})};d.__docgenInfo={description:"",methods:[],displayName:"UserCard",props:{user:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  bio?: string;
  status?: 'online' | 'offline' | 'away' | 'busy' | 'ghost';
  role?: 'student' | 'builder' | 'leader' | 'verified';
  affiliation?: 'university' | 'residential' | 'greek';
  privacy?: 'public' | 'ghost' | 'anonymous';
  
  // Profile details
  university?: string;
  graduationYear?: number;
  major?: string;
  location?: string;
  joinedDate?: string;
  website?: string;
  
  // Social stats
  followers?: number;
  following?: number;
  spaces?: number;
  tools?: number;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"handle",value:{name:"string",required:!0}},{key:"avatar",value:{name:"string",required:!1}},{key:"bio",value:{name:"string",required:!1}},{key:"status",value:{name:"union",raw:"'online' | 'offline' | 'away' | 'busy' | 'ghost'",elements:[{name:"literal",value:"'online'"},{name:"literal",value:"'offline'"},{name:"literal",value:"'away'"},{name:"literal",value:"'busy'"},{name:"literal",value:"'ghost'"}],required:!1}},{key:"role",value:{name:"union",raw:"'student' | 'builder' | 'leader' | 'verified'",elements:[{name:"literal",value:"'student'"},{name:"literal",value:"'builder'"},{name:"literal",value:"'leader'"},{name:"literal",value:"'verified'"}],required:!1}},{key:"affiliation",value:{name:"union",raw:"'university' | 'residential' | 'greek'",elements:[{name:"literal",value:"'university'"},{name:"literal",value:"'residential'"},{name:"literal",value:"'greek'"}],required:!1}},{key:"privacy",value:{name:"union",raw:"'public' | 'ghost' | 'anonymous'",elements:[{name:"literal",value:"'public'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'anonymous'"}],required:!1}},{key:"university",value:{name:"string",required:!1}},{key:"graduationYear",value:{name:"number",required:!1}},{key:"major",value:{name:"string",required:!1}},{key:"location",value:{name:"string",required:!1}},{key:"joinedDate",value:{name:"string",required:!1}},{key:"website",value:{name:"string",required:!1}},{key:"followers",value:{name:"number",required:!1}},{key:"following",value:{name:"number",required:!1}},{key:"spaces",value:{name:"number",required:!1}},{key:"tools",value:{name:"number",required:!1}}]}},description:""},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'compact' | 'detailed' | 'minimal'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'detailed'"},{name:"literal",value:"'minimal'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},relationship:{required:!1,tsType:{name:"union",raw:"'none' | 'following' | 'followed' | 'mutual' | 'blocked'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'following'"},{name:"literal",value:"'followed'"},{name:"literal",value:"'mutual'"},{name:"literal",value:"'blocked'"}]},description:"",defaultValue:{value:"'none'",computed:!1}},onFollow:{required:!1,tsType:{name:"signature",type:"function",raw:"(userId: string) => void",signature:{arguments:[{type:{name:"string"},name:"userId"}],return:{name:"void"}}},description:""},onMessage:{required:!1,tsType:{name:"signature",type:"function",raw:"(userId: string) => void",signature:{arguments:[{type:{name:"string"},name:"userId"}],return:{name:"void"}}},description:""},onEmail:{required:!1,tsType:{name:"signature",type:"function",raw:"(userId: string) => void",signature:{arguments:[{type:{name:"string"},name:"userId"}],return:{name:"void"}}},description:""},onViewProfile:{required:!1,tsType:{name:"signature",type:"function",raw:"(userId: string) => void",signature:{arguments:[{type:{name:"string"},name:"userId"}],return:{name:"void"}}},description:""},onMenu:{required:!1,tsType:{name:"signature",type:"function",raw:"(userId: string) => void",signature:{arguments:[{type:{name:"string"},name:"userId"}],return:{name:"void"}}},description:""},showActions:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showStats:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showBio:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showDetails:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},interactive:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const sr={title:"Molecules/User Card",component:d,parameters:{layout:"centered",docs:{description:{component:`
A comprehensive user profile card component for displaying detailed user information, social stats, and action buttons. Perfect for user directories, member lists, and social interactions in HIVE.

**Key Features:**
- Multiple variants (default, compact, detailed, minimal)
- Relationship states (following, followed, mutual, blocked)
- Social stats (followers, following, spaces, tools)
- User roles and affiliations
- Interactive action buttons
- Campus-specific information display
- Responsive layout design
        `}}},argTypes:{user:{control:"object",description:"User data object with profile information"},variant:{control:"select",options:["default","compact","detailed","minimal"],description:"Card display variant"},relationship:{control:"select",options:["none","following","followed","mutual","blocked"],description:"Current relationship with the user"},showActions:{control:"boolean",description:"Show action buttons (follow, message, etc.)"},showStats:{control:"boolean",description:"Show social statistics"},showBio:{control:"boolean",description:"Show user bio text"},showDetails:{control:"boolean",description:"Show detailed profile information"},interactive:{control:"boolean",description:"Enable hover states and click interactions"}}},s={id:"1",name:"Sarah Chen",handle:"sarahc",avatar:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",bio:"CS Major passionate about AI and machine learning. Building tools to help students succeed. Always down for a good study session! 🤖📚",status:"online",role:"builder",affiliation:"university",privacy:"public",university:"Stanford University",graduationYear:2025,major:"Computer Science",location:"Palo Alto, CA",joinedDate:"September 2021",website:"https://sarahchen.dev",followers:1234,following:567,spaces:12,tools:8},h={id:"2",name:"Alex Rodriguez",handle:"alexr",bio:"Math major, tutor, and problem solver. Love helping classmates with calculus and statistics.",status:"away",role:"student",university:"UC Berkeley",graduationYear:2026,major:"Mathematics",followers:456,following:234,spaces:8,tools:3},Va={id:"3",name:"Emily Watson",handle:"emilyw",avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",bio:"Psychology major and Debate Club President. Passionate about mental health advocacy and public speaking.",status:"online",role:"leader",university:"Harvard University",graduationYear:2024,major:"Psychology",location:"Cambridge, MA",joinedDate:"August 2020",followers:2345,following:1234,spaces:15,tools:5},Ya={id:"4",name:"Dr. Michael Foster",handle:"profmike",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",bio:"Computer Science Professor specializing in distributed systems and databases. Office hours: MW 2-4pm.",status:"busy",role:"verified",university:"MIT",major:"Computer Science Faculty",location:"Cambridge, MA",joinedDate:"January 2019",website:"https://cs.mit.edu/~foster",followers:5678,following:123,spaces:25,tools:15},g={args:{user:s,relationship:"none"}},y={args:{user:{...s,avatar:void 0},relationship:"none"}},x={args:{user:s,relationship:"none",interactive:!0,onFollow:a=>console.log("Follow user:",a),onMessage:a=>console.log("Message user:",a),onViewProfile:a=>console.log("View profile:",a)}},b={args:{user:s,variant:"minimal",relationship:"none"},parameters:{docs:{description:{story:"Compact display showing only essential information."}}}},w={args:{user:s,variant:"compact",relationship:"none"},parameters:{docs:{description:{story:"Balanced display with key information and basic stats."}}}},j={args:{user:s,variant:"detailed",relationship:"none"},parameters:{docs:{description:{story:"Full display with all available information including profile details."}}}},S={args:{user:h,relationship:"none"}},k={args:{user:h,relationship:"following"}},N={args:{user:h,relationship:"followed"}},C={args:{user:h,relationship:"mutual"}},U={args:{user:{...h,bio:"This user has been blocked."},relationship:"blocked"}},B={args:{user:h,relationship:"none"}},q={args:{user:s,relationship:"none"}},P={args:{user:Va,relationship:"none"}},A={args:{user:Ya,relationship:"none"}},D={args:{user:s,relationship:"none",showActions:!1}},I={args:{user:s,relationship:"none",showStats:!1}},T={args:{user:s,relationship:"none",showBio:!1}},M={args:{user:s,relationship:"none",showStats:!1,showBio:!1,showDetails:!1},parameters:{docs:{description:{story:"Minimal information display with just name, handle, and role."}}}},V={args:{user:{id:"5",name:"Maya Patel",handle:"mayap",bio:"Biology major focusing on genetics research. Lab TA for Bio 101.",role:"student",university:"UC Davis",graduationYear:2025,major:"Biology",followers:234,following:156,spaces:6,tools:2},variant:"compact",relationship:"none"},parameters:{docs:{description:{story:"Example of a study group member profile."}}}},Y={args:{user:{id:"6",name:"Jordan Kim",handle:"jordank",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",bio:"Full-stack developer and CS senior. Love building tools that make campus life easier!",role:"builder",university:"Carnegie Mellon",graduationYear:2024,major:"Computer Science",followers:890,following:345,spaces:18,tools:22},variant:"detailed",relationship:"mutual"},parameters:{docs:{description:{story:"Profile of an active tool builder and collaborator."}}}},R={args:{user:{id:"7",name:"Taylor Davis",handle:"taylord",avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",bio:"Business major and entrepreneur. Leading the Startup Club and organizing pitch competitions.",role:"leader",university:"Wharton School",graduationYear:2024,major:"Business Administration",location:"Philadelphia, PA",followers:1876,following:567,spaces:12,tools:8},relationship:"following"},parameters:{docs:{description:{story:"Profile of a space leader and community organizer."}}}},z={args:{user:{id:"8",name:"Chris Thompson",handle:"christ",bio:"RA for West Hall, Psychology major. Here to help with any dorm life questions!",role:"leader",affiliation:"residential",university:"NYU",graduationYear:2025,major:"Psychology",location:"New York, NY",followers:567,following:234,spaces:8,tools:4},variant:"compact",relationship:"none"},parameters:{docs:{description:{story:"Profile of a residential assistant with leadership role."}}}},L={render:()=>e.jsxs("div",{className:"space-y-4 w-96",children:[e.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"CS Study Group Members"}),e.jsx(d,{user:{id:"1",name:"Sarah Chen",handle:"sarahc",role:"builder",university:"Stanford",major:"Computer Science",followers:1234,following:567,spaces:12,tools:8},variant:"minimal",relationship:"mutual",showStats:!1}),e.jsx(d,{user:{id:"2",name:"Alex Rodriguez",handle:"alexr",role:"student",university:"UC Berkeley",major:"Mathematics",followers:456,following:234,spaces:8,tools:3},variant:"minimal",relationship:"following",showStats:!1}),e.jsx(d,{user:{id:"3",name:"Maya Patel",handle:"mayap",role:"student",university:"UC Davis",major:"Biology",followers:234,following:156,spaces:6,tools:2},variant:"minimal",relationship:"none",showStats:!1})]}),parameters:{docs:{description:{story:"Example of user cards in a directory or member list."}}}},F={render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl",children:[e.jsx(d,{user:{id:"1",name:"Jordan Kim",handle:"jordank",bio:"CS senior building productivity tools for students",role:"builder",university:"Carnegie Mellon",major:"Computer Science",followers:890,following:345,spaces:18,tools:22},variant:"compact",relationship:"none"}),e.jsx(d,{user:{id:"2",name:"Taylor Davis",handle:"taylord",bio:"Business major leading startup initiatives on campus",role:"leader",university:"Wharton",major:"Business",followers:1876,following:567,spaces:12,tools:8},variant:"compact",relationship:"none"})]}),parameters:{docs:{description:{story:"Example of suggested connections or recommendations layout."}}}};var re,se,oe;g.parameters={...g.parameters,docs:{...(re=g.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none'
  }
}`,...(oe=(se=g.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var ne,ie,te;y.parameters={...y.parameters,docs:{...(ne=y.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    user: {
      ...sampleUser,
      avatar: undefined
    },
    relationship: 'none'
  }
}`,...(te=(ie=y.parameters)==null?void 0:ie.docs)==null?void 0:te.source}}};var le,de,ce;x.parameters={...x.parameters,docs:{...(le=x.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none',
    interactive: true,
    onFollow: userId => console.log('Follow user:', userId),
    onMessage: userId => console.log('Message user:', userId),
    onViewProfile: userId => console.log('View profile:', userId)
  }
}`,...(ce=(de=x.parameters)==null?void 0:de.docs)==null?void 0:ce.source}}};var me,ue,pe;b.parameters={...b.parameters,docs:{...(me=b.parameters)==null?void 0:me.docs,source:{originalSource:`{
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
}`,...(pe=(ue=b.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var he,ve,fe;w.parameters={...w.parameters,docs:{...(he=w.parameters)==null?void 0:he.docs,source:{originalSource:`{
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
}`,...(fe=(ve=w.parameters)==null?void 0:ve.docs)==null?void 0:fe.source}}};var ge,ye,xe;j.parameters={...j.parameters,docs:{...(ge=j.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(xe=(ye=j.parameters)==null?void 0:ye.docs)==null?void 0:xe.source}}};var be,we,je;S.parameters={...S.parameters,docs:{...(be=S.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    user: studentUser,
    relationship: 'none'
  }
}`,...(je=(we=S.parameters)==null?void 0:we.docs)==null?void 0:je.source}}};var Se,ke,Ne;k.parameters={...k.parameters,docs:{...(Se=k.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    user: studentUser,
    relationship: 'following'
  }
}`,...(Ne=(ke=k.parameters)==null?void 0:ke.docs)==null?void 0:Ne.source}}};var Ce,Ue,Be;N.parameters={...N.parameters,docs:{...(Ce=N.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    user: studentUser,
    relationship: 'followed'
  }
}`,...(Be=(Ue=N.parameters)==null?void 0:Ue.docs)==null?void 0:Be.source}}};var qe,Pe,Ae;C.parameters={...C.parameters,docs:{...(qe=C.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  args: {
    user: studentUser,
    relationship: 'mutual'
  }
}`,...(Ae=(Pe=C.parameters)==null?void 0:Pe.docs)==null?void 0:Ae.source}}};var De,Ie,Te;U.parameters={...U.parameters,docs:{...(De=U.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    user: {
      ...studentUser,
      bio: 'This user has been blocked.'
    },
    relationship: 'blocked'
  }
}`,...(Te=(Ie=U.parameters)==null?void 0:Ie.docs)==null?void 0:Te.source}}};var Me,Ve,Ye;B.parameters={...B.parameters,docs:{...(Me=B.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    user: studentUser,
    relationship: 'none'
  }
}`,...(Ye=(Ve=B.parameters)==null?void 0:Ve.docs)==null?void 0:Ye.source}}};var Re,ze,Le;q.parameters={...q.parameters,docs:{...(Re=q.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none'
  }
}`,...(Le=(ze=q.parameters)==null?void 0:ze.docs)==null?void 0:Le.source}}};var Fe,Ee,We;P.parameters={...P.parameters,docs:{...(Fe=P.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    user: leaderUser,
    relationship: 'none'
  }
}`,...(We=(Ee=P.parameters)==null?void 0:Ee.docs)==null?void 0:We.source}}};var He,Ge,Je;A.parameters={...A.parameters,docs:{...(He=A.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    user: verifiedUser,
    relationship: 'none'
  }
}`,...(Je=(Ge=A.parameters)==null?void 0:Ge.docs)==null?void 0:Je.source}}};var Ke,_e,$e;D.parameters={...D.parameters,docs:{...(Ke=D.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none',
    showActions: false
  }
}`,...($e=(_e=D.parameters)==null?void 0:_e.docs)==null?void 0:$e.source}}};var Oe,Qe,Xe;I.parameters={...I.parameters,docs:{...(Oe=I.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none',
    showStats: false
  }
}`,...(Xe=(Qe=I.parameters)==null?void 0:Qe.docs)==null?void 0:Xe.source}}};var Ze,ea,aa;T.parameters={...T.parameters,docs:{...(Ze=T.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  args: {
    user: sampleUser,
    relationship: 'none',
    showBio: false
  }
}`,...(aa=(ea=T.parameters)==null?void 0:ea.docs)==null?void 0:aa.source}}};var ra,sa,oa;M.parameters={...M.parameters,docs:{...(ra=M.parameters)==null?void 0:ra.docs,source:{originalSource:`{
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
}`,...(oa=(sa=M.parameters)==null?void 0:sa.docs)==null?void 0:oa.source}}};var na,ia,ta;V.parameters={...V.parameters,docs:{...(na=V.parameters)==null?void 0:na.docs,source:{originalSource:`{
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
}`,...(ta=(ia=V.parameters)==null?void 0:ia.docs)==null?void 0:ta.source}}};var la,da,ca;Y.parameters={...Y.parameters,docs:{...(la=Y.parameters)==null?void 0:la.docs,source:{originalSource:`{
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
}`,...(ca=(da=Y.parameters)==null?void 0:da.docs)==null?void 0:ca.source}}};var ma,ua,pa;R.parameters={...R.parameters,docs:{...(ma=R.parameters)==null?void 0:ma.docs,source:{originalSource:`{
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
}`,...(pa=(ua=R.parameters)==null?void 0:ua.docs)==null?void 0:pa.source}}};var ha,va,fa;z.parameters={...z.parameters,docs:{...(ha=z.parameters)==null?void 0:ha.docs,source:{originalSource:`{
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
}`,...(fa=(va=z.parameters)==null?void 0:va.docs)==null?void 0:fa.source}}};var ga,ya,xa;L.parameters={...L.parameters,docs:{...(ga=L.parameters)==null?void 0:ga.docs,source:{originalSource:`{
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
}`,...(xa=(ya=L.parameters)==null?void 0:ya.docs)==null?void 0:xa.source}}};var ba,wa,ja;F.parameters={...F.parameters,docs:{...(ba=F.parameters)==null?void 0:ba.docs,source:{originalSource:`{
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
}`,...(ja=(wa=F.parameters)==null?void 0:wa.docs)==null?void 0:ja.source}}};const or=["Default","WithoutAvatar","Interactive","MinimalVariant","CompactVariant","DetailedVariant","NotFollowing","Following","FollowedByUser","MutualFollowing","BlockedUser","StudentRole","BuilderRole","LeaderRole","VerifiedRole","NoActions","NoStats","NoBio","BasicInfo","StudyGroupMember","ToolCollaborator","SpaceLeader","ResidentialAssistant","UserDirectory","SuggestedConnections"];export{M as BasicInfo,U as BlockedUser,q as BuilderRole,w as CompactVariant,g as Default,j as DetailedVariant,N as FollowedByUser,k as Following,x as Interactive,P as LeaderRole,b as MinimalVariant,C as MutualFollowing,D as NoActions,T as NoBio,I as NoStats,S as NotFollowing,z as ResidentialAssistant,R as SpaceLeader,B as StudentRole,V as StudyGroupMember,F as SuggestedConnections,Y as ToolCollaborator,L as UserDirectory,A as VerifiedRole,y as WithoutAvatar,or as __namedExportsOrder,sr as default};
