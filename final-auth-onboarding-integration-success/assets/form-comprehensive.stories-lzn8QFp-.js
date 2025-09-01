import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{R as ce,r as Jr}from"./index-DJO9vBfz.js";import{c as g}from"./utils-CytzSlOG.js";import{F as u}from"./form-field-VVMaDPKt.js";import{C as Kr}from"./circle-check-big-DTzGNsHe.js";import{C as Xr}from"./circle-alert-D_Mj0ODU.js";import{M as Qr}from"./mail-CGUqHGcU.js";import{G as ea}from"./graduation-cap-P9WXVP08.js";import{B as ra}from"./building-2-DGeo9OhY.js";import{U as aa}from"./users-kvqvVsnf.js";import{C as ne}from"./calendar-BPdIbUwb.js";import{E as oe}from"./external-link-DkxaGAGS.js";import{E as ta}from"./eye-B7JxKiV6.js";import{H as ia}from"./hammer-BgkMGYgn.js";import{c as sa}from"./createLucideIcon-WpwZgzX-.js";import{Z as na}from"./zap-0mfePDxG.js";import"./text-Cao0VGB4.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=sa("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]),b=({value:r="",onChange:s,onBlur:n,error:t,required:o=!1,disabled:l=!1,university:a,className:i})=>{const[d,p]=ce.useState(null),y=v=>v?[/\.edu$/,/\.ac\.[a-z]{2}$/,/\.university$/,/student\./,/alumni\./].some($r=>$r.test(v.toLowerCase())):null;ce.useEffect(()=>{p(r?y(r):null)},[r]);const m=v=>{s==null||s(v.target.value)},f=t||(d===!1?"Please use your university email address":void 0);return e.jsx(u,{label:"University Email",description:a?`Use your ${a} email address`:"Use your university email address (.edu domain)",error:f,required:o,className:i,children:e.jsx(InputEnhanced,{type:"email",value:r,onChange:m,onBlur:n,placeholder:"student@university.edu",disabled:l,leftIcon:e.jsx(Qr,{className:"h-4 w-4"}),rightIcon:d===!0?e.jsx(Kr,{className:"h-4 w-4 text-[var(--hive-status-success)]"}):d===!1?e.jsx(Xr,{className:"h-4 w-4 text-[var(--hive-status-error)]"}):null})})},j=({value:r="",onChange:s,onBlur:n,error:t,required:o=!1,disabled:l=!1,className:a})=>{const i=d=>{const p=d.target.value.replace(/[^a-zA-Z0-9\-_]/g,"");s==null||s(p)};return e.jsx(u,{label:"Student ID",description:"Your official university student identification number",error:t,required:o,className:a,children:e.jsx(InputEnhanced,{type:"text",value:r,onChange:i,onBlur:n,placeholder:"123456789",disabled:l,leftIcon:e.jsx(ea,{className:"h-4 w-4"}),maxLength:20})})},oa=[{value:"computer-science",label:"Computer Science"},{value:"engineering",label:"Engineering"},{value:"business",label:"Business Administration"},{value:"psychology",label:"Psychology"},{value:"biology",label:"Biology"},{value:"mathematics",label:"Mathematics"},{value:"english",label:"English Literature"},{value:"history",label:"History"},{value:"art",label:"Art & Design"},{value:"music",label:"Music"},{value:"economics",label:"Economics"},{value:"political-science",label:"Political Science"},{value:"chemistry",label:"Chemistry"},{value:"physics",label:"Physics"},{value:"nursing",label:"Nursing"},{value:"education",label:"Education"},{value:"communications",label:"Communications"},{value:"other",label:"Other"}],la=[{value:"freshman",label:"Freshman (1st Year)"},{value:"sophomore",label:"Sophomore (2nd Year)"},{value:"junior",label:"Junior (3rd Year)"},{value:"senior",label:"Senior (4th Year)"},{value:"grad",label:"Graduate Student"},{value:"phd",label:"PhD Student"},{value:"postdoc",label:"Postdoc"}],S=({major:r="",year:s="",onMajorChange:n,onYearChange:t,majorError:o,yearError:l,required:a=!1,disabled:i=!1,className:d})=>e.jsxs("div",{className:g("space-y-4",d),children:[e.jsx(u,{label:"Academic Major",description:"Your primary field of study",error:o,required:a,children:e.jsx(SelectEnhanced,{options:oa,value:r,onChange:p=>n==null?void 0:n(p.target.value),placeholder:"Select your major",disabled:i,searchable:!0})}),e.jsx(u,{label:"Academic Year",description:"Your current year in university",error:l,required:a,children:e.jsx(SelectEnhanced,{options:la,value:s,onChange:p=>t==null?void 0:t(p.target.value),placeholder:"Select your year",disabled:i})})]}),te=({dormBuilding:r="",roomNumber:s="",onDormChange:n,onRoomChange:t,dormError:o,roomError:l,required:a=!1,disabled:i=!1,className:d})=>{const p=y=>{const m=y.target.value.replace(/[^a-zA-Z0-9\-]/g,"");t==null||t(m)};return e.jsxs("div",{className:g("space-y-4",d),children:[e.jsx(u,{label:"Residence Hall",description:"Your dormitory or residence hall name",error:o,required:a,children:e.jsx(InputEnhanced,{type:"text",value:r,onChange:y=>n==null?void 0:n(y.target.value),placeholder:"e.g., Smith Hall, West Campus Dorms",disabled:i,leftIcon:e.jsx(ra,{className:"h-4 w-4"})})}),e.jsx(u,{label:"Room Number",description:"Your room or suite number",error:l,required:a,children:e.jsx(InputEnhanced,{type:"text",value:s,onChange:p,placeholder:"e.g., 314, A205",disabled:i,maxLength:10})})]})},ca=[{value:"member",label:"Member"},{value:"pledge",label:"Pledge"},{value:"president",label:"President"},{value:"vice-president",label:"Vice President"},{value:"treasurer",label:"Treasurer"},{value:"secretary",label:"Secretary"},{value:"social-chair",label:"Social Chair"},{value:"philanthropy-chair",label:"Philanthropy Chair"},{value:"recruitment-chair",label:"Recruitment Chair"},{value:"other-officer",label:"Other Officer"}],ie=({organization:r="",position:s="",onOrganizationChange:n,onPositionChange:t,organizationError:o,positionError:l,disabled:a=!1,className:i})=>e.jsxs("div",{className:g("space-y-4",i),children:[e.jsx(u,{label:"Greek Organization",description:"Your fraternity, sorority, or Greek organization",error:o,children:e.jsx(InputEnhanced,{type:"text",value:r,onChange:d=>n==null?void 0:n(d.target.value),placeholder:"e.g., Alpha Beta Gamma, Delta Phi Epsilon",disabled:a,leftIcon:e.jsx(aa,{className:"h-4 w-4"})})}),r&&e.jsx(u,{label:"Position",description:"Your role in the organization",error:l,children:e.jsx(SelectEnhanced,{options:ca,value:s,onChange:d=>t==null?void 0:t(d.target.value),placeholder:"Select your position",disabled:a})})]}),se=({googleCalendar:r=!1,outlookCalendar:s=!1,appleCalendar:n=!1,onGoogleChange:t,onOutlookChange:o,onAppleChange:l,error:a,disabled:i=!1,className:d})=>e.jsx(u,{label:"Calendar Integration",description:"Connect your calendars to sync your schedule with HIVE",error:a,className:d,children:e.jsxs("div",{className:"space-y-3 p-4 bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-default)]",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(ne,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsx("span",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Google Calendar"})]}),e.jsxs("button",{type:"button",onClick:()=>t==null?void 0:t(!r),disabled:i,className:g("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",r?"bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20":"bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]"),children:[r?"Connected":"Connect",e.jsx(oe,{className:"h-3 w-3"})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(ne,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsx("span",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Outlook Calendar"})]}),e.jsxs("button",{type:"button",onClick:()=>o==null?void 0:o(!s),disabled:i,className:g("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",s?"bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20":"bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]"),children:[s?"Connected":"Connect",e.jsx(oe,{className:"h-3 w-3"})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(ne,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsx("span",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Apple Calendar"})]}),e.jsxs("button",{type:"button",onClick:()=>l==null?void 0:l(!n),disabled:i,className:g("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",n?"bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20":"bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]"),children:[n?"Connected":"Connect",e.jsx(oe,{className:"h-3 w-3"})]})]})]})}),da=[{value:"public",label:"Public Profile"},{value:"friends",label:"Friends Only"},{value:"ghost",label:"Ghost Mode"}],x=({value:r="friends",onChange:s,error:n,disabled:t=!1,className:o})=>{const l=a=>{switch(a){case"public":return"Your profile is visible to everyone in your university";case"friends":return"Your profile is only visible to your connections";case"ghost":return"Your profile is completely private and invisible to others";default:return"Choose your privacy level"}};return e.jsx(u,{label:"Privacy Level",description:l(r),error:n,className:o,children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(SelectEnhanced,{options:da,value:r,onChange:a=>s==null?void 0:s(a.target.value),disabled:t}),r==="ghost"&&e.jsxs("div",{className:"flex items-center gap-2 p-3 bg-[var(--hive-background-tertiary)] rounded-lg border border-[var(--hive-border-default)]",children:[e.jsx(ta,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsx("span",{className:"text-xs text-[var(--hive-text-secondary)]",children:"Ghost mode allows you to browse and participate while remaining completely anonymous"})]})]})})},ua=[{value:"beginner",label:"Beginner (0-1 years)"},{value:"intermediate",label:"Intermediate (1-3 years)"},{value:"advanced",label:"Advanced (3-5 years)"},{value:"expert",label:"Expert (5+ years)"}],C=({portfolioUrl:r="",githubUrl:s="",experience:n="",onPortfolioChange:t,onGithubChange:o,onExperienceChange:l,portfolioError:a,githubError:i,experienceError:d,disabled:p=!1,className:y})=>e.jsxs("div",{className:g("space-y-4",y),children:[e.jsx(u,{label:"Portfolio URL",description:"Link to your portfolio or personal website",error:a,children:e.jsx(InputEnhanced,{type:"url",value:r,onChange:m=>t==null?void 0:t(m.target.value),placeholder:"https://yourportfolio.com",disabled:p,leftIcon:e.jsx(ia,{className:"h-4 w-4"})})}),e.jsx(u,{label:"GitHub Profile",description:"Your GitHub username or profile URL",error:i,children:e.jsx(InputEnhanced,{type:"text",value:s,onChange:m=>o==null?void 0:o(m.target.value),placeholder:"github.com/username",disabled:p,leftIcon:e.jsx(le,{className:"h-4 w-4"})})}),e.jsx(u,{label:"Experience Level",description:"Your coding/building experience",error:d,required:!0,children:e.jsx(SelectEnhanced,{options:ua,value:n,onChange:m=>l==null?void 0:l(m.target.value),placeholder:"Select your experience level",disabled:p})})]}),pa=[{value:"academic",label:"Academic (Class/Study Group)"},{value:"club",label:"Club/Organization"},{value:"greek",label:"Greek Life"},{value:"residential",label:"Residential (Dorm/Floor)"},{value:"social",label:"Social Group"},{value:"professional",label:"Professional/Career"},{value:"hobby",label:"Hobby/Interest"},{value:"other",label:"Other"}],F=({spaceName:r="",spaceType:s="",description:n="",expectedMembers:t="",onSpaceNameChange:o,onSpaceTypeChange:l,onDescriptionChange:a,onExpectedMembersChange:i,spaceNameError:d,spaceTypeError:p,descriptionError:y,disabled:m=!1,className:f})=>e.jsxs("div",{className:g("space-y-4",f),children:[e.jsx(u,{label:"Space Name",description:"What would you like to call your space?",error:d,required:!0,children:e.jsx(InputEnhanced,{type:"text",value:r,onChange:v=>o==null?void 0:o(v.target.value),placeholder:"e.g., CS Study Group, Delta Chi, Floor 3 East",disabled:m,leftIcon:e.jsx(na,{className:"h-4 w-4"})})}),e.jsx(u,{label:"Space Type",description:"What kind of space is this?",error:p,required:!0,children:e.jsx(SelectEnhanced,{options:pa,value:s,onChange:v=>l==null?void 0:l(v.target.value),placeholder:"Select space type",disabled:m})}),e.jsx(u,{label:"Description",description:"Briefly describe your space and its purpose",error:y,required:!0,children:e.jsx("textarea",{value:n,onChange:v=>a==null?void 0:a(v.target.value),placeholder:"Tell us about your space, its goals, and what members can expect...",disabled:m,className:g("w-full min-h-[80px] p-4 rounded-xl","bg-transparent border border-[var(--hive-border-default)]","focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20","text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]","resize-none transition-all duration-200"),maxLength:500})}),e.jsx(u,{label:"Expected Members",description:"How many people do you expect to join?",required:!0,children:e.jsx(InputEnhanced,{type:"number",value:t,onChange:v=>i==null?void 0:i(v.target.value),placeholder:"e.g., 25",disabled:m,min:"1",max:"1000"})})]}),ma=[{value:"productivity",label:"Productivity"},{value:"academic",label:"Academic/Study"},{value:"social",label:"Social/Communication"},{value:"entertainment",label:"Entertainment"},{value:"utility",label:"Utility"},{value:"health",label:"Health/Wellness"},{value:"finance",label:"Finance"},{value:"creative",label:"Creative/Design"},{value:"developer",label:"Developer Tools"},{value:"other",label:"Other"}],q=({toolName:r="",toolDescription:s="",toolCategory:n="",repositoryUrl:t="",onToolNameChange:o,onToolDescriptionChange:l,onToolCategoryChange:a,onRepositoryUrlChange:i,toolNameError:d,toolDescriptionError:p,toolCategoryError:y,repositoryError:m,disabled:f=!1,className:v})=>e.jsxs("div",{className:g("space-y-4",v),children:[e.jsx(u,{label:"Tool Name",description:"What's your tool called?",error:d,required:!0,children:e.jsx(InputEnhanced,{type:"text",value:r,onChange:h=>o==null?void 0:o(h.target.value),placeholder:"e.g., Study Scheduler, Grade Calculator",disabled:f,leftIcon:e.jsx(le,{className:"h-4 w-4"})})}),e.jsx(u,{label:"Category",description:"What category does your tool fit into?",error:y,required:!0,children:e.jsx(SelectEnhanced,{options:ma,value:n,onChange:h=>a==null?void 0:a(h.target.value),placeholder:"Select a category",disabled:f})}),e.jsx(u,{label:"Description",description:"Describe what your tool does and how it helps students",error:p,required:!0,children:e.jsx("textarea",{value:s,onChange:h=>l==null?void 0:l(h.target.value),placeholder:"Describe your tool's features, benefits, and how students can use it...",disabled:f,className:g("w-full min-h-[100px] p-4 rounded-xl","bg-transparent border border-[var(--hive-border-default)]","focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20","text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]","resize-none transition-all duration-200"),maxLength:1e3})}),e.jsx(u,{label:"Repository URL (Optional)",description:"Link to your GitHub repository or source code",error:m,children:e.jsx(InputEnhanced,{type:"url",value:t,onChange:h=>i==null?void 0:i(h.target.value),placeholder:"https://github.com/username/tool-name",disabled:f,leftIcon:e.jsx(le,{className:"h-4 w-4"})})})]});b.__docgenInfo={description:"",methods:[],displayName:"UniversityEmailFieldMolecule",props:{value:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},error:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},university:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};j.__docgenInfo={description:"",methods:[],displayName:"StudentIDFieldMolecule",props:{value:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},error:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"MajorSelectionFieldMolecule",props:{major:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},year:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onMajorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onYearChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},majorError:{required:!1,tsType:{name:"string"},description:""},yearError:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};te.__docgenInfo={description:"",methods:[],displayName:"DormSelectionFieldMolecule",props:{dormBuilding:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},roomNumber:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onDormChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onRoomChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},dormError:{required:!1,tsType:{name:"string"},description:""},roomError:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};ie.__docgenInfo={description:"",methods:[],displayName:"GreekAffiliationFieldMolecule",props:{organization:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},position:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onOrganizationChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onPositionChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},organizationError:{required:!1,tsType:{name:"string"},description:""},positionError:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};se.__docgenInfo={description:"",methods:[],displayName:"CalendarConnectionFieldMolecule",props:{googleCalendar:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},outlookCalendar:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},appleCalendar:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onGoogleChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(enabled: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"enabled"}],return:{name:"void"}}},description:""},onOutlookChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(enabled: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"enabled"}],return:{name:"void"}}},description:""},onAppleChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(enabled: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"enabled"}],return:{name:"void"}}},description:""},error:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};x.__docgenInfo={description:"",methods:[],displayName:"PrivacyLevelFieldMolecule",props:{value:{required:!1,tsType:{name:"union",raw:"'public' | 'friends' | 'ghost'",elements:[{name:"literal",value:"'public'"},{name:"literal",value:"'friends'"},{name:"literal",value:"'ghost'"}]},description:"",defaultValue:{value:"'friends'",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: 'public' | 'friends' | 'ghost') => void",signature:{arguments:[{type:{name:"union",raw:"'public' | 'friends' | 'ghost'",elements:[{name:"literal",value:"'public'"},{name:"literal",value:"'friends'"},{name:"literal",value:"'ghost'"}]},name:"value"}],return:{name:"void"}}},description:""},error:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};C.__docgenInfo={description:"",methods:[],displayName:"BuilderVerificationFieldMolecule",props:{portfolioUrl:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},githubUrl:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},experience:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onPortfolioChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onGithubChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onExperienceChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},portfolioError:{required:!1,tsType:{name:"string"},description:""},githubError:{required:!1,tsType:{name:"string"},description:""},experienceError:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};F.__docgenInfo={description:"",methods:[],displayName:"SpaceActivationFieldMolecule",props:{spaceName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},spaceType:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},expectedMembers:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onSpaceNameChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onSpaceTypeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onDescriptionChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onExpectedMembersChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},spaceNameError:{required:!1,tsType:{name:"string"},description:""},spaceTypeError:{required:!1,tsType:{name:"string"},description:""},descriptionError:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};q.__docgenInfo={description:"",methods:[],displayName:"ToolPublishingFieldMolecule",props:{toolName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},toolDescription:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},toolCategory:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},repositoryUrl:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onToolNameChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onToolDescriptionChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onToolCategoryChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onRepositoryUrlChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},toolNameError:{required:!1,tsType:{name:"string"},description:""},toolDescriptionError:{required:!1,tsType:{name:"string"},description:""},toolCategoryError:{required:!1,tsType:{name:"string"},description:""},repositoryError:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Ma={title:"Molecules/Form Comprehensive",component:b,parameters:{layout:"centered",docs:{description:{component:`
Comprehensive form field molecules designed specifically for university and campus environments. Each molecule handles complex validation, state management, and user experience patterns common in HIVE.

**Available Components:**
- **UniversityEmailFieldMolecule**: Email validation with university domain checking
- **StudentIDFieldMolecule**: Student ID input with format validation
- **MajorSelectionFieldMolecule**: Academic major and year selection
- **DormSelectionFieldMolecule**: Residence hall and room number fields
- **GreekAffiliationFieldMolecule**: Greek life organization and position
- **CalendarConnectionFieldMolecule**: Calendar integration toggles
- **PrivacyLevelFieldMolecule**: Privacy settings with ghost mode
- **BuilderVerificationFieldMolecule**: Builder portfolio and experience
- **SpaceActivationFieldMolecule**: Space creation request form
- **ToolPublishingFieldMolecule**: Tool publishing and metadata

**Features:**
- Campus-specific validation logic
- Real-time feedback and error states
- Accessible form patterns
- Consistent HIVE design system integration
        `}}}},c=({Component:r,initialData:s={},...n})=>{const[t,o]=Jr.useState(s),l=(a,i)=>{o(d=>({...d,[a]:i}))};return e.jsx("div",{className:"w-96 p-6 bg-[var(--hive-background-primary)]",children:e.jsx(r,{...t,...Object.keys(s).reduce((a,i)=>{const d=`on${i.charAt(0).toUpperCase()+i.slice(1)}Change`;return a[d]=p=>l(i,p),a},{}),...n})})},N={render:r=>e.jsx(c,{Component:b,initialData:{value:""},...r}),parameters:{docs:{description:{story:"Email field with university domain validation and visual feedback."}}}},T={render:r=>e.jsx(c,{Component:b,initialData:{value:"sarah.chen@stanford.edu"},university:"Stanford University",...r})},E={render:r=>e.jsx(c,{Component:b,initialData:{value:"notvalid@gmail.com"},error:"Please use your university email address",...r})},w={render:r=>e.jsx(c,{Component:j,initialData:{value:""},...r}),parameters:{docs:{description:{story:"Student ID input with automatic format sanitization."}}}},D={render:r=>e.jsx(c,{Component:j,initialData:{value:"123456789"},...r})},M={render:r=>e.jsx(c,{Component:j,initialData:{value:""},error:"Student ID is required",required:!0,...r})},I={render:r=>e.jsx(c,{Component:S,initialData:{major:"",year:""},...r}),parameters:{docs:{description:{story:"Combined major and academic year selection with searchable options."}}}},P={render:r=>e.jsx(c,{Component:S,initialData:{major:"computer-science",year:"senior"},...r})},V={render:r=>e.jsx(c,{Component:S,initialData:{major:"",year:""},majorError:"Please select your major",yearError:"Please select your academic year",required:!0,...r})},k={render:r=>e.jsx(c,{Component:te,initialData:{dormBuilding:"",roomNumber:""},...r}),parameters:{docs:{description:{story:"Residence hall and room number input with validation."}}}},A={render:r=>e.jsx(c,{Component:te,initialData:{dormBuilding:"Smith Hall",roomNumber:"314"},...r})},U={render:r=>e.jsx(c,{Component:ie,initialData:{organization:"",position:""},...r}),parameters:{docs:{description:{story:"Greek life organization and position selection with conditional fields."}}}},B={render:r=>e.jsx(c,{Component:ie,initialData:{organization:"Alpha Beta Gamma",position:"president"},...r})},G={render:r=>e.jsx(c,{Component:se,initialData:{googleCalendar:!1,outlookCalendar:!1,appleCalendar:!1},...r}),parameters:{docs:{description:{story:"Calendar integration toggles with connection status indicators."}}}},W={render:r=>e.jsx(c,{Component:se,initialData:{googleCalendar:!0,outlookCalendar:!1,appleCalendar:!0},...r})},L={render:r=>e.jsx(c,{Component:x,initialData:{value:"friends"},...r}),parameters:{docs:{description:{story:"Privacy level selection with dynamic descriptions and ghost mode explanation."}}}},_={render:r=>e.jsx(c,{Component:x,initialData:{value:"public"},...r})},z={render:r=>e.jsx(c,{Component:x,initialData:{value:"ghost"},...r})},H={render:r=>e.jsx(c,{Component:C,initialData:{portfolioUrl:"",githubUrl:"",experience:""},...r}),parameters:{docs:{description:{story:"Builder verification with portfolio, GitHub, and experience level fields."}}}},R={render:r=>e.jsx(c,{Component:C,initialData:{portfolioUrl:"https://sarahchen.dev",githubUrl:"github.com/sarahc",experience:"intermediate"},...r})},Y={render:r=>e.jsx(c,{Component:C,initialData:{portfolioUrl:"",githubUrl:"",experience:""},experienceError:"Please select your experience level",...r})},O={render:r=>e.jsx(c,{Component:F,initialData:{spaceName:"",spaceType:"",description:"",expectedMembers:""},...r}),parameters:{docs:{description:{story:"Space creation request form with name, type, description, and member count."}}}},Z={render:r=>e.jsx(c,{Component:F,initialData:{spaceName:"CS Study Group",spaceType:"academic",description:"A collaborative study group for Computer Science students focusing on data structures and algorithms.",expectedMembers:"25"},...r})},$={render:r=>e.jsx(c,{Component:F,initialData:{spaceName:"",spaceType:"",description:"",expectedMembers:""},spaceNameError:"Space name is required",spaceTypeError:"Please select a space type",descriptionError:"Please describe your space",...r})},J={render:r=>e.jsx(c,{Component:q,initialData:{toolName:"",toolDescription:"",toolCategory:"",repositoryUrl:""},...r}),parameters:{docs:{description:{story:"Tool publishing form with name, category, description, and repository fields."}}}},K={render:r=>e.jsx(c,{Component:q,initialData:{toolName:"GPA Calculator",toolDescription:"A comprehensive GPA calculator that helps students track their academic progress, calculate semester and cumulative GPAs, and set grade goals for future courses.",toolCategory:"academic",repositoryUrl:"https://github.com/sarahc/gpa-calculator"},...r})},X={render:r=>e.jsx(c,{Component:q,initialData:{toolName:"",toolDescription:"",toolCategory:"",repositoryUrl:""},toolNameError:"Tool name is required",toolCategoryError:"Please select a category",toolDescriptionError:"Please describe your tool",...r})},Q={render:()=>e.jsxs("div",{className:"max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Complete Your Profile"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Help us personalize your HIVE experience"})]}),e.jsx(b,{value:"maya.patel@berkeley.edu",university:"UC Berkeley",required:!0}),e.jsx(j,{value:"987654321",required:!0}),e.jsx(S,{major:"biology",year:"junior",required:!0}),e.jsx(te,{dormBuilding:"Unit 3",roomNumber:"A205"}),e.jsx(x,{value:"friends"})]}),parameters:{docs:{description:{story:"Complete student onboarding form with multiple field types."}}}},ee={render:()=>e.jsxs("div",{className:"max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Apply to be a Builder"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Join our community of student developers and creators"})]}),e.jsx(C,{portfolioUrl:"https://jordankim.dev",githubUrl:"github.com/jordank",experience:"intermediate"}),e.jsx(q,{toolName:"Study Scheduler",toolDescription:"A smart scheduling tool that helps students optimize their study time based on their course load, deadlines, and personal energy levels throughout the day.",toolCategory:"productivity",repositoryUrl:"https://github.com/jordank/study-scheduler"})]}),parameters:{docs:{description:{story:"Builder application form with verification and tool publishing fields."}}}},re={render:()=>e.jsxs("div",{className:"max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Request a New Space"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Create a community for your group or organization"})]}),e.jsx(F,{spaceName:"Debate Club",spaceType:"club",description:"The official debate club for competitive debate tournaments, practice sessions, and public speaking skill development. We welcome all skill levels and provide training for beginners.",expectedMembers:"40"}),e.jsx(ie,{organization:"",position:""})]}),parameters:{docs:{description:{story:"Space leader request form for creating new communities."}}}},ae={render:()=>e.jsxs("div",{className:"max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Account Settings"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Manage your privacy and integrations"})]}),e.jsx(x,{value:"friends"}),e.jsx(se,{googleCalendar:!0,outlookCalendar:!1,appleCalendar:!0})]}),parameters:{docs:{description:{story:"Comprehensive settings form with privacy and integration options."}}}};var de,ue,pe;N.parameters={...N.parameters,docs:{...(de=N.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={UniversityEmailFieldMolecule} initialData={{
    value: ''
  }} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Email field with university domain validation and visual feedback.'
      }
    }
  }
}`,...(pe=(ue=N.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var me,ve,ye;T.parameters={...T.parameters,docs:{...(me=T.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={UniversityEmailFieldMolecule} initialData={{
    value: 'sarah.chen@stanford.edu'
  }} university="Stanford University" {...args} />
}`,...(ye=(ve=T.parameters)==null?void 0:ve.docs)==null?void 0:ye.source}}};var ge,fe,he;E.parameters={...E.parameters,docs:{...(ge=E.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={UniversityEmailFieldMolecule} initialData={{
    value: 'notvalid@gmail.com'
  }} error="Please use your university email address" {...args} />
}`,...(he=(fe=E.parameters)==null?void 0:fe.docs)==null?void 0:he.source}}};var be,xe,je;w.parameters={...w.parameters,docs:{...(be=w.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={StudentIDFieldMolecule} initialData={{
    value: ''
  }} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Student ID input with automatic format sanitization.'
      }
    }
  }
}`,...(je=(xe=w.parameters)==null?void 0:xe.docs)==null?void 0:je.source}}};var Se,Ce,Fe;D.parameters={...D.parameters,docs:{...(Se=D.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={StudentIDFieldMolecule} initialData={{
    value: '123456789'
  }} {...args} />
}`,...(Fe=(Ce=D.parameters)==null?void 0:Ce.docs)==null?void 0:Fe.source}}};var qe,Ne,Te;M.parameters={...M.parameters,docs:{...(qe=M.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={StudentIDFieldMolecule} initialData={{
    value: ''
  }} error="Student ID is required" required {...args} />
}`,...(Te=(Ne=M.parameters)==null?void 0:Ne.docs)==null?void 0:Te.source}}};var Ee,we,De;I.parameters={...I.parameters,docs:{...(Ee=I.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={MajorSelectionFieldMolecule} initialData={{
    major: '',
    year: ''
  }} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Combined major and academic year selection with searchable options.'
      }
    }
  }
}`,...(De=(we=I.parameters)==null?void 0:we.docs)==null?void 0:De.source}}};var Me,Ie,Pe;P.parameters={...P.parameters,docs:{...(Me=P.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={MajorSelectionFieldMolecule} initialData={{
    major: 'computer-science',
    year: 'senior'
  }} {...args} />
}`,...(Pe=(Ie=P.parameters)==null?void 0:Ie.docs)==null?void 0:Pe.source}}};var Ve,ke,Ae;V.parameters={...V.parameters,docs:{...(Ve=V.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={MajorSelectionFieldMolecule} initialData={{
    major: '',
    year: ''
  }} majorError="Please select your major" yearError="Please select your academic year" required {...args} />
}`,...(Ae=(ke=V.parameters)==null?void 0:ke.docs)==null?void 0:Ae.source}}};var Ue,Be,Ge;k.parameters={...k.parameters,docs:{...(Ue=k.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={DormSelectionFieldMolecule} initialData={{
    dormBuilding: '',
    roomNumber: ''
  }} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Residence hall and room number input with validation.'
      }
    }
  }
}`,...(Ge=(Be=k.parameters)==null?void 0:Be.docs)==null?void 0:Ge.source}}};var We,Le,_e;A.parameters={...A.parameters,docs:{...(We=A.parameters)==null?void 0:We.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={DormSelectionFieldMolecule} initialData={{
    dormBuilding: 'Smith Hall',
    roomNumber: '314'
  }} {...args} />
}`,...(_e=(Le=A.parameters)==null?void 0:Le.docs)==null?void 0:_e.source}}};var ze,He,Re;U.parameters={...U.parameters,docs:{...(ze=U.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={GreekAffiliationFieldMolecule} initialData={{
    organization: '',
    position: ''
  }} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Greek life organization and position selection with conditional fields.'
      }
    }
  }
}`,...(Re=(He=U.parameters)==null?void 0:He.docs)==null?void 0:Re.source}}};var Ye,Oe,Ze;B.parameters={...B.parameters,docs:{...(Ye=B.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={GreekAffiliationFieldMolecule} initialData={{
    organization: 'Alpha Beta Gamma',
    position: 'president'
  }} {...args} />
}`,...(Ze=(Oe=B.parameters)==null?void 0:Oe.docs)==null?void 0:Ze.source}}};var $e,Je,Ke;G.parameters={...G.parameters,docs:{...($e=G.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={CalendarConnectionFieldMolecule} initialData={{
    googleCalendar: false,
    outlookCalendar: false,
    appleCalendar: false
  }} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Calendar integration toggles with connection status indicators.'
      }
    }
  }
}`,...(Ke=(Je=G.parameters)==null?void 0:Je.docs)==null?void 0:Ke.source}}};var Xe,Qe,er;W.parameters={...W.parameters,docs:{...(Xe=W.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={CalendarConnectionFieldMolecule} initialData={{
    googleCalendar: true,
    outlookCalendar: false,
    appleCalendar: true
  }} {...args} />
}`,...(er=(Qe=W.parameters)==null?void 0:Qe.docs)==null?void 0:er.source}}};var rr,ar,tr;L.parameters={...L.parameters,docs:{...(rr=L.parameters)==null?void 0:rr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={PrivacyLevelFieldMolecule} initialData={{
    value: 'friends'
  }} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Privacy level selection with dynamic descriptions and ghost mode explanation.'
      }
    }
  }
}`,...(tr=(ar=L.parameters)==null?void 0:ar.docs)==null?void 0:tr.source}}};var ir,sr,nr;_.parameters={..._.parameters,docs:{...(ir=_.parameters)==null?void 0:ir.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={PrivacyLevelFieldMolecule} initialData={{
    value: 'public'
  }} {...args} />
}`,...(nr=(sr=_.parameters)==null?void 0:sr.docs)==null?void 0:nr.source}}};var or,lr,cr;z.parameters={...z.parameters,docs:{...(or=z.parameters)==null?void 0:or.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={PrivacyLevelFieldMolecule} initialData={{
    value: 'ghost'
  }} {...args} />
}`,...(cr=(lr=z.parameters)==null?void 0:lr.docs)==null?void 0:cr.source}}};var dr,ur,pr;H.parameters={...H.parameters,docs:{...(dr=H.parameters)==null?void 0:dr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={BuilderVerificationFieldMolecule} initialData={{
    portfolioUrl: '',
    githubUrl: '',
    experience: ''
  }} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Builder verification with portfolio, GitHub, and experience level fields.'
      }
    }
  }
}`,...(pr=(ur=H.parameters)==null?void 0:ur.docs)==null?void 0:pr.source}}};var mr,vr,yr;R.parameters={...R.parameters,docs:{...(mr=R.parameters)==null?void 0:mr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={BuilderVerificationFieldMolecule} initialData={{
    portfolioUrl: 'https://sarahchen.dev',
    githubUrl: 'github.com/sarahc',
    experience: 'intermediate'
  }} {...args} />
}`,...(yr=(vr=R.parameters)==null?void 0:vr.docs)==null?void 0:yr.source}}};var gr,fr,hr;Y.parameters={...Y.parameters,docs:{...(gr=Y.parameters)==null?void 0:gr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={BuilderVerificationFieldMolecule} initialData={{
    portfolioUrl: '',
    githubUrl: '',
    experience: ''
  }} experienceError="Please select your experience level" {...args} />
}`,...(hr=(fr=Y.parameters)==null?void 0:fr.docs)==null?void 0:hr.source}}};var br,xr,jr;O.parameters={...O.parameters,docs:{...(br=O.parameters)==null?void 0:br.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={SpaceActivationFieldMolecule} initialData={{
    spaceName: '',
    spaceType: '',
    description: '',
    expectedMembers: ''
  }} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Space creation request form with name, type, description, and member count.'
      }
    }
  }
}`,...(jr=(xr=O.parameters)==null?void 0:xr.docs)==null?void 0:jr.source}}};var Sr,Cr,Fr;Z.parameters={...Z.parameters,docs:{...(Sr=Z.parameters)==null?void 0:Sr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={SpaceActivationFieldMolecule} initialData={{
    spaceName: 'CS Study Group',
    spaceType: 'academic',
    description: 'A collaborative study group for Computer Science students focusing on data structures and algorithms.',
    expectedMembers: '25'
  }} {...args} />
}`,...(Fr=(Cr=Z.parameters)==null?void 0:Cr.docs)==null?void 0:Fr.source}}};var qr,Nr,Tr;$.parameters={...$.parameters,docs:{...(qr=$.parameters)==null?void 0:qr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={SpaceActivationFieldMolecule} initialData={{
    spaceName: '',
    spaceType: '',
    description: '',
    expectedMembers: ''
  }} spaceNameError="Space name is required" spaceTypeError="Please select a space type" descriptionError="Please describe your space" {...args} />
}`,...(Tr=(Nr=$.parameters)==null?void 0:Nr.docs)==null?void 0:Tr.source}}};var Er,wr,Dr;J.parameters={...J.parameters,docs:{...(Er=J.parameters)==null?void 0:Er.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={ToolPublishingFieldMolecule} initialData={{
    toolName: '',
    toolDescription: '',
    toolCategory: '',
    repositoryUrl: ''
  }} {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Tool publishing form with name, category, description, and repository fields.'
      }
    }
  }
}`,...(Dr=(wr=J.parameters)==null?void 0:wr.docs)==null?void 0:Dr.source}}};var Mr,Ir,Pr;K.parameters={...K.parameters,docs:{...(Mr=K.parameters)==null?void 0:Mr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={ToolPublishingFieldMolecule} initialData={{
    toolName: 'GPA Calculator',
    toolDescription: 'A comprehensive GPA calculator that helps students track their academic progress, calculate semester and cumulative GPAs, and set grade goals for future courses.',
    toolCategory: 'academic',
    repositoryUrl: 'https://github.com/sarahc/gpa-calculator'
  }} {...args} />
}`,...(Pr=(Ir=K.parameters)==null?void 0:Ir.docs)==null?void 0:Pr.source}}};var Vr,kr,Ar;X.parameters={...X.parameters,docs:{...(Vr=X.parameters)==null?void 0:Vr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={ToolPublishingFieldMolecule} initialData={{
    toolName: '',
    toolDescription: '',
    toolCategory: '',
    repositoryUrl: ''
  }} toolNameError="Tool name is required" toolCategoryError="Please select a category" toolDescriptionError="Please describe your tool" {...args} />
}`,...(Ar=(kr=X.parameters)==null?void 0:kr.docs)==null?void 0:Ar.source}}};var Ur,Br,Gr;Q.parameters={...Q.parameters,docs:{...(Ur=Q.parameters)==null?void 0:Ur.docs,source:{originalSource:`{
  render: () => <div className="max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Complete Your Profile
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Help us personalize your HIVE experience
        </p>
      </div>

      <UniversityEmailFieldMolecule value="maya.patel@berkeley.edu" university="UC Berkeley" required />

      <StudentIDFieldMolecule value="987654321" required />

      <MajorSelectionFieldMolecule major="biology" year="junior" required />

      <DormSelectionFieldMolecule dormBuilding="Unit 3" roomNumber="A205" />

      <PrivacyLevelFieldMolecule value="friends" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Complete student onboarding form with multiple field types.'
      }
    }
  }
}`,...(Gr=(Br=Q.parameters)==null?void 0:Br.docs)==null?void 0:Gr.source}}};var Wr,Lr,_r;ee.parameters={...ee.parameters,docs:{...(Wr=ee.parameters)==null?void 0:Wr.docs,source:{originalSource:`{
  render: () => <div className="max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Apply to be a Builder
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Join our community of student developers and creators
        </p>
      </div>

      <BuilderVerificationFieldMolecule portfolioUrl="https://jordankim.dev" githubUrl="github.com/jordank" experience="intermediate" />

      <ToolPublishingFieldMolecule toolName="Study Scheduler" toolDescription="A smart scheduling tool that helps students optimize their study time based on their course load, deadlines, and personal energy levels throughout the day." toolCategory="productivity" repositoryUrl="https://github.com/jordank/study-scheduler" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Builder application form with verification and tool publishing fields.'
      }
    }
  }
}`,...(_r=(Lr=ee.parameters)==null?void 0:Lr.docs)==null?void 0:_r.source}}};var zr,Hr,Rr;re.parameters={...re.parameters,docs:{...(zr=re.parameters)==null?void 0:zr.docs,source:{originalSource:`{
  render: () => <div className="max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Request a New Space
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Create a community for your group or organization
        </p>
      </div>

      <SpaceActivationFieldMolecule spaceName="Debate Club" spaceType="club" description="The official debate club for competitive debate tournaments, practice sessions, and public speaking skill development. We welcome all skill levels and provide training for beginners." expectedMembers="40" />

      <GreekAffiliationFieldMolecule organization="" position="" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Space leader request form for creating new communities.'
      }
    }
  }
}`,...(Rr=(Hr=re.parameters)==null?void 0:Hr.docs)==null?void 0:Rr.source}}};var Yr,Or,Zr;ae.parameters={...ae.parameters,docs:{...(Yr=ae.parameters)==null?void 0:Yr.docs,source:{originalSource:`{
  render: () => <div className="max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Account Settings
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Manage your privacy and integrations
        </p>
      </div>

      <PrivacyLevelFieldMolecule value="friends" />

      <CalendarConnectionFieldMolecule googleCalendar={true} outlookCalendar={false} appleCalendar={true} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive settings form with privacy and integration options.'
      }
    }
  }
}`,...(Zr=(Or=ae.parameters)==null?void 0:Or.docs)==null?void 0:Zr.source}}};const Ia=["UniversityEmailField","UniversityEmailWithValue","UniversityEmailWithError","StudentIDField","StudentIDWithValue","StudentIDWithError","MajorSelectionField","MajorSelectionWithValues","MajorSelectionWithErrors","DormSelectionField","DormSelectionWithValues","GreekAffiliationField","GreekAffiliationWithValues","CalendarConnectionField","CalendarConnectionWithConnections","PrivacyLevelField","PrivacyLevelPublic","PrivacyLevelGhost","BuilderVerificationField","BuilderVerificationWithValues","BuilderVerificationWithErrors","SpaceActivationField","SpaceActivationWithValues","SpaceActivationWithErrors","ToolPublishingField","ToolPublishingWithValues","ToolPublishingWithErrors","StudentOnboardingForm","BuilderApplicationForm","SpaceLeaderRequestForm","ComprehensiveSettingsForm"];export{ee as BuilderApplicationForm,H as BuilderVerificationField,Y as BuilderVerificationWithErrors,R as BuilderVerificationWithValues,G as CalendarConnectionField,W as CalendarConnectionWithConnections,ae as ComprehensiveSettingsForm,k as DormSelectionField,A as DormSelectionWithValues,U as GreekAffiliationField,B as GreekAffiliationWithValues,I as MajorSelectionField,V as MajorSelectionWithErrors,P as MajorSelectionWithValues,L as PrivacyLevelField,z as PrivacyLevelGhost,_ as PrivacyLevelPublic,O as SpaceActivationField,$ as SpaceActivationWithErrors,Z as SpaceActivationWithValues,re as SpaceLeaderRequestForm,w as StudentIDField,M as StudentIDWithError,D as StudentIDWithValue,Q as StudentOnboardingForm,J as ToolPublishingField,X as ToolPublishingWithErrors,K as ToolPublishingWithValues,N as UniversityEmailField,E as UniversityEmailWithError,T as UniversityEmailWithValue,Ia as __namedExportsOrder,Ma as default};
