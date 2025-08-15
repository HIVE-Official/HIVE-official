import{j as e}from"./jsx-runtime-B9GTzLod.js";import{R as ue,r as Xr}from"./index-BMjrbHXN.js";import{c as g}from"./utils-CytzSlOG.js";import{I as f}from"./input-enhanced-CvbYnkKp.js";import{S as x}from"./select-enhanced-DykFN-tJ.js";import{F as u}from"./form-field-CLlUDKfc.js";import{C as Qr}from"./circle-check-big-fUBFJcwM.js";import{C as ea}from"./circle-alert-D27CINV1.js";import{M as ra}from"./mail-DQ8H9hI8.js";import{G as aa}from"./graduation-cap-CjRbfMsL.js";import{B as ta}from"./building-2-DkE3VlKg.js";import{U as ia}from"./users-B5XgMSov.js";import{C as le}from"./calendar-RwBiWFlj.js";import{E as ce}from"./external-link-BBRviWFd.js";import{E as sa}from"./eye-DHVClHkA.js";import{H as oa}from"./hammer-fuBiazis.js";import{c as na}from"./createLucideIcon-DtX30ipI.js";import{Z as la}from"./zap-BzDMfB1h.js";import"./index-BwobEAja.js";import"./text-BOe2XosQ.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=na("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]),j=({value:r="",onChange:s,onBlur:o,error:t,required:n=!1,disabled:l=!1,university:a,className:i})=>{const[d,p]=ue.useState(null),y=v=>v?[/\.edu$/,/\.ac\.[a-z]{2}$/,/\.university$/,/student\./,/alumni\./].some(Kr=>Kr.test(v.toLowerCase())):null;ue.useEffect(()=>{p(r?y(r):null)},[r]);const m=v=>{s==null||s(v.target.value)},h=t||(d===!1?"Please use your university email address":void 0);return e.jsx(u,{label:"University Email",description:a?`Use your ${a} email address`:"Use your university email address (.edu domain)",error:h,required:n,className:i,children:e.jsx(f,{type:"email",value:r,onChange:m,onBlur:o,placeholder:"student@university.edu",disabled:l,leftIcon:e.jsx(ra,{className:"h-4 w-4"}),rightIcon:d===!0?e.jsx(Qr,{className:"h-4 w-4 text-[var(--hive-status-success)]"}):d===!1?e.jsx(ea,{className:"h-4 w-4 text-[var(--hive-status-error)]"}):null})})},C=({value:r="",onChange:s,onBlur:o,error:t,required:n=!1,disabled:l=!1,className:a})=>{const i=d=>{const p=d.target.value.replace(/[^a-zA-Z0-9\-_]/g,"");s==null||s(p)};return e.jsx(u,{label:"Student ID",description:"Your official university student identification number",error:t,required:n,className:a,children:e.jsx(f,{type:"text",value:r,onChange:i,onBlur:o,placeholder:"123456789",disabled:l,leftIcon:e.jsx(aa,{className:"h-4 w-4"}),maxLength:20})})},ca=[{value:"computer-science",label:"Computer Science"},{value:"engineering",label:"Engineering"},{value:"business",label:"Business Administration"},{value:"psychology",label:"Psychology"},{value:"biology",label:"Biology"},{value:"mathematics",label:"Mathematics"},{value:"english",label:"English Literature"},{value:"history",label:"History"},{value:"art",label:"Art & Design"},{value:"music",label:"Music"},{value:"economics",label:"Economics"},{value:"political-science",label:"Political Science"},{value:"chemistry",label:"Chemistry"},{value:"physics",label:"Physics"},{value:"nursing",label:"Nursing"},{value:"education",label:"Education"},{value:"communications",label:"Communications"},{value:"other",label:"Other"}],da=[{value:"freshman",label:"Freshman (1st Year)"},{value:"sophomore",label:"Sophomore (2nd Year)"},{value:"junior",label:"Junior (3rd Year)"},{value:"senior",label:"Senior (4th Year)"},{value:"grad",label:"Graduate Student"},{value:"phd",label:"PhD Student"},{value:"postdoc",label:"Postdoc"}],F=({major:r="",year:s="",onMajorChange:o,onYearChange:t,majorError:n,yearError:l,required:a=!1,disabled:i=!1,className:d})=>e.jsxs("div",{className:g("space-y-4",d),children:[e.jsx(u,{label:"Academic Major",description:"Your primary field of study",error:n,required:a,children:e.jsx(x,{options:ca,value:r,onChange:p=>o==null?void 0:o(p.target.value),placeholder:"Select your major",disabled:i,searchable:!0})}),e.jsx(u,{label:"Academic Year",description:"Your current year in university",error:l,required:a,children:e.jsx(x,{options:da,value:s,onChange:p=>t==null?void 0:t(p.target.value),placeholder:"Select your year",disabled:i})})]}),se=({dormBuilding:r="",roomNumber:s="",onDormChange:o,onRoomChange:t,dormError:n,roomError:l,required:a=!1,disabled:i=!1,className:d})=>{const p=y=>{const m=y.target.value.replace(/[^a-zA-Z0-9\-]/g,"");t==null||t(m)};return e.jsxs("div",{className:g("space-y-4",d),children:[e.jsx(u,{label:"Residence Hall",description:"Your dormitory or residence hall name",error:n,required:a,children:e.jsx(f,{type:"text",value:r,onChange:y=>o==null?void 0:o(y.target.value),placeholder:"e.g., Smith Hall, West Campus Dorms",disabled:i,leftIcon:e.jsx(ta,{className:"h-4 w-4"})})}),e.jsx(u,{label:"Room Number",description:"Your room or suite number",error:l,required:a,children:e.jsx(f,{type:"text",value:s,onChange:p,placeholder:"e.g., 314, A205",disabled:i,maxLength:10})})]})},ua=[{value:"member",label:"Member"},{value:"pledge",label:"Pledge"},{value:"president",label:"President"},{value:"vice-president",label:"Vice President"},{value:"treasurer",label:"Treasurer"},{value:"secretary",label:"Secretary"},{value:"social-chair",label:"Social Chair"},{value:"philanthropy-chair",label:"Philanthropy Chair"},{value:"recruitment-chair",label:"Recruitment Chair"},{value:"other-officer",label:"Other Officer"}],oe=({organization:r="",position:s="",onOrganizationChange:o,onPositionChange:t,organizationError:n,positionError:l,disabled:a=!1,className:i})=>e.jsxs("div",{className:g("space-y-4",i),children:[e.jsx(u,{label:"Greek Organization",description:"Your fraternity, sorority, or Greek organization",error:n,children:e.jsx(f,{type:"text",value:r,onChange:d=>o==null?void 0:o(d.target.value),placeholder:"e.g., Alpha Beta Gamma, Delta Phi Epsilon",disabled:a,leftIcon:e.jsx(ia,{className:"h-4 w-4"})})}),r&&e.jsx(u,{label:"Position",description:"Your role in the organization",error:l,children:e.jsx(x,{options:ua,value:s,onChange:d=>t==null?void 0:t(d.target.value),placeholder:"Select your position",disabled:a})})]}),ne=({googleCalendar:r=!1,outlookCalendar:s=!1,appleCalendar:o=!1,onGoogleChange:t,onOutlookChange:n,onAppleChange:l,error:a,disabled:i=!1,className:d})=>e.jsx(u,{label:"Calendar Integration",description:"Connect your calendars to sync your schedule with HIVE",error:a,className:d,children:e.jsxs("div",{className:"space-y-3 p-4 bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-default)]",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(le,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsx("span",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Google Calendar"})]}),e.jsxs("button",{type:"button",onClick:()=>t==null?void 0:t(!r),disabled:i,className:g("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",r?"bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20":"bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]"),children:[r?"Connected":"Connect",e.jsx(ce,{className:"h-3 w-3"})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(le,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsx("span",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Outlook Calendar"})]}),e.jsxs("button",{type:"button",onClick:()=>n==null?void 0:n(!s),disabled:i,className:g("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",s?"bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20":"bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]"),children:[s?"Connected":"Connect",e.jsx(ce,{className:"h-3 w-3"})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(le,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsx("span",{className:"text-sm font-medium text-[var(--hive-text-primary)]",children:"Apple Calendar"})]}),e.jsxs("button",{type:"button",onClick:()=>l==null?void 0:l(!o),disabled:i,className:g("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",o?"bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20":"bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]"),children:[o?"Connected":"Connect",e.jsx(ce,{className:"h-3 w-3"})]})]})]})}),pa=[{value:"public",label:"Public Profile"},{value:"friends",label:"Friends Only"},{value:"ghost",label:"Ghost Mode"}],S=({value:r="friends",onChange:s,error:o,disabled:t=!1,className:n})=>{const l=a=>{switch(a){case"public":return"Your profile is visible to everyone in your university";case"friends":return"Your profile is only visible to your connections";case"ghost":return"Your profile is completely private and invisible to others";default:return"Choose your privacy level"}};return e.jsx(u,{label:"Privacy Level",description:l(r),error:o,className:n,children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(x,{options:pa,value:r,onChange:a=>s==null?void 0:s(a.target.value),disabled:t}),r==="ghost"&&e.jsxs("div",{className:"flex items-center gap-2 p-3 bg-[var(--hive-background-tertiary)] rounded-lg border border-[var(--hive-border-default)]",children:[e.jsx(sa,{className:"h-4 w-4 text-[var(--hive-text-tertiary)]"}),e.jsx("span",{className:"text-xs text-[var(--hive-text-secondary)]",children:"Ghost mode allows you to browse and participate while remaining completely anonymous"})]})]})})},ma=[{value:"beginner",label:"Beginner (0-1 years)"},{value:"intermediate",label:"Intermediate (1-3 years)"},{value:"advanced",label:"Advanced (3-5 years)"},{value:"expert",label:"Expert (5+ years)"}],q=({portfolioUrl:r="",githubUrl:s="",experience:o="",onPortfolioChange:t,onGithubChange:n,onExperienceChange:l,portfolioError:a,githubError:i,experienceError:d,disabled:p=!1,className:y})=>e.jsxs("div",{className:g("space-y-4",y),children:[e.jsx(u,{label:"Portfolio URL",description:"Link to your portfolio or personal website",error:a,children:e.jsx(f,{type:"url",value:r,onChange:m=>t==null?void 0:t(m.target.value),placeholder:"https://yourportfolio.com",disabled:p,leftIcon:e.jsx(oa,{className:"h-4 w-4"})})}),e.jsx(u,{label:"GitHub Profile",description:"Your GitHub username or profile URL",error:i,children:e.jsx(f,{type:"text",value:s,onChange:m=>n==null?void 0:n(m.target.value),placeholder:"github.com/username",disabled:p,leftIcon:e.jsx(de,{className:"h-4 w-4"})})}),e.jsx(u,{label:"Experience Level",description:"Your coding/building experience",error:d,required:!0,children:e.jsx(x,{options:ma,value:o,onChange:m=>l==null?void 0:l(m.target.value),placeholder:"Select your experience level",disabled:p})})]}),va=[{value:"academic",label:"Academic (Class/Study Group)"},{value:"club",label:"Club/Organization"},{value:"greek",label:"Greek Life"},{value:"residential",label:"Residential (Dorm/Floor)"},{value:"social",label:"Social Group"},{value:"professional",label:"Professional/Career"},{value:"hobby",label:"Hobby/Interest"},{value:"other",label:"Other"}],N=({spaceName:r="",spaceType:s="",description:o="",expectedMembers:t="",onSpaceNameChange:n,onSpaceTypeChange:l,onDescriptionChange:a,onExpectedMembersChange:i,spaceNameError:d,spaceTypeError:p,descriptionError:y,disabled:m=!1,className:h})=>e.jsxs("div",{className:g("space-y-4",h),children:[e.jsx(u,{label:"Space Name",description:"What would you like to call your space?",error:d,required:!0,children:e.jsx(f,{type:"text",value:r,onChange:v=>n==null?void 0:n(v.target.value),placeholder:"e.g., CS Study Group, Delta Chi, Floor 3 East",disabled:m,leftIcon:e.jsx(la,{className:"h-4 w-4"})})}),e.jsx(u,{label:"Space Type",description:"What kind of space is this?",error:p,required:!0,children:e.jsx(x,{options:va,value:s,onChange:v=>l==null?void 0:l(v.target.value),placeholder:"Select space type",disabled:m})}),e.jsx(u,{label:"Description",description:"Briefly describe your space and its purpose",error:y,required:!0,children:e.jsx("textarea",{value:o,onChange:v=>a==null?void 0:a(v.target.value),placeholder:"Tell us about your space, its goals, and what members can expect...",disabled:m,className:g("w-full min-h-[80px] p-4 rounded-xl","bg-transparent border border-[var(--hive-border-default)]","focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20","text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]","resize-none transition-all duration-200"),maxLength:500})}),e.jsx(u,{label:"Expected Members",description:"How many people do you expect to join?",required:!0,children:e.jsx(f,{type:"number",value:t,onChange:v=>i==null?void 0:i(v.target.value),placeholder:"e.g., 25",disabled:m,min:"1",max:"1000"})})]}),ya=[{value:"productivity",label:"Productivity"},{value:"academic",label:"Academic/Study"},{value:"social",label:"Social/Communication"},{value:"entertainment",label:"Entertainment"},{value:"utility",label:"Utility"},{value:"health",label:"Health/Wellness"},{value:"finance",label:"Finance"},{value:"creative",label:"Creative/Design"},{value:"developer",label:"Developer Tools"},{value:"other",label:"Other"}],T=({toolName:r="",toolDescription:s="",toolCategory:o="",repositoryUrl:t="",onToolNameChange:n,onToolDescriptionChange:l,onToolCategoryChange:a,onRepositoryUrlChange:i,toolNameError:d,toolDescriptionError:p,toolCategoryError:y,repositoryError:m,disabled:h=!1,className:v})=>e.jsxs("div",{className:g("space-y-4",v),children:[e.jsx(u,{label:"Tool Name",description:"What's your tool called?",error:d,required:!0,children:e.jsx(f,{type:"text",value:r,onChange:b=>n==null?void 0:n(b.target.value),placeholder:"e.g., Study Scheduler, Grade Calculator",disabled:h,leftIcon:e.jsx(de,{className:"h-4 w-4"})})}),e.jsx(u,{label:"Category",description:"What category does your tool fit into?",error:y,required:!0,children:e.jsx(x,{options:ya,value:o,onChange:b=>a==null?void 0:a(b.target.value),placeholder:"Select a category",disabled:h})}),e.jsx(u,{label:"Description",description:"Describe what your tool does and how it helps students",error:p,required:!0,children:e.jsx("textarea",{value:s,onChange:b=>l==null?void 0:l(b.target.value),placeholder:"Describe your tool's features, benefits, and how students can use it...",disabled:h,className:g("w-full min-h-[100px] p-4 rounded-xl","bg-transparent border border-[var(--hive-border-default)]","focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20","text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]","resize-none transition-all duration-200"),maxLength:1e3})}),e.jsx(u,{label:"Repository URL (Optional)",description:"Link to your GitHub repository or source code",error:m,children:e.jsx(f,{type:"url",value:t,onChange:b=>i==null?void 0:i(b.target.value),placeholder:"https://github.com/username/tool-name",disabled:h,leftIcon:e.jsx(de,{className:"h-4 w-4"})})})]});j.__docgenInfo={description:"",methods:[],displayName:"UniversityEmailFieldMolecule",props:{value:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},error:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},university:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};C.__docgenInfo={description:"",methods:[],displayName:"StudentIDFieldMolecule",props:{value:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},error:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};F.__docgenInfo={description:"",methods:[],displayName:"MajorSelectionFieldMolecule",props:{major:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},year:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onMajorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onYearChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},majorError:{required:!1,tsType:{name:"string"},description:""},yearError:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};se.__docgenInfo={description:"",methods:[],displayName:"DormSelectionFieldMolecule",props:{dormBuilding:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},roomNumber:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onDormChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onRoomChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},dormError:{required:!1,tsType:{name:"string"},description:""},roomError:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};oe.__docgenInfo={description:"",methods:[],displayName:"GreekAffiliationFieldMolecule",props:{organization:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},position:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onOrganizationChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onPositionChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},organizationError:{required:!1,tsType:{name:"string"},description:""},positionError:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};ne.__docgenInfo={description:"",methods:[],displayName:"CalendarConnectionFieldMolecule",props:{googleCalendar:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},outlookCalendar:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},appleCalendar:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onGoogleChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(enabled: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"enabled"}],return:{name:"void"}}},description:""},onOutlookChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(enabled: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"enabled"}],return:{name:"void"}}},description:""},onAppleChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(enabled: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"enabled"}],return:{name:"void"}}},description:""},error:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"PrivacyLevelFieldMolecule",props:{value:{required:!1,tsType:{name:"union",raw:"'public' | 'friends' | 'ghost'",elements:[{name:"literal",value:"'public'"},{name:"literal",value:"'friends'"},{name:"literal",value:"'ghost'"}]},description:"",defaultValue:{value:"'friends'",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: 'public' | 'friends' | 'ghost') => void",signature:{arguments:[{type:{name:"union",raw:"'public' | 'friends' | 'ghost'",elements:[{name:"literal",value:"'public'"},{name:"literal",value:"'friends'"},{name:"literal",value:"'ghost'"}]},name:"value"}],return:{name:"void"}}},description:""},error:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};q.__docgenInfo={description:"",methods:[],displayName:"BuilderVerificationFieldMolecule",props:{portfolioUrl:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},githubUrl:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},experience:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onPortfolioChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onGithubChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onExperienceChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},portfolioError:{required:!1,tsType:{name:"string"},description:""},githubError:{required:!1,tsType:{name:"string"},description:""},experienceError:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};N.__docgenInfo={description:"",methods:[],displayName:"SpaceActivationFieldMolecule",props:{spaceName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},spaceType:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},expectedMembers:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onSpaceNameChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onSpaceTypeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onDescriptionChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onExpectedMembersChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},spaceNameError:{required:!1,tsType:{name:"string"},description:""},spaceTypeError:{required:!1,tsType:{name:"string"},description:""},descriptionError:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};T.__docgenInfo={description:"",methods:[],displayName:"ToolPublishingFieldMolecule",props:{toolName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},toolDescription:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},toolCategory:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},repositoryUrl:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onToolNameChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onToolDescriptionChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onToolCategoryChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onRepositoryUrlChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},toolNameError:{required:!1,tsType:{name:"string"},description:""},toolDescriptionError:{required:!1,tsType:{name:"string"},description:""},toolCategoryError:{required:!1,tsType:{name:"string"},description:""},repositoryError:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Aa={title:"Molecules/Form Comprehensive",component:j,parameters:{layout:"centered",docs:{description:{component:`
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
        `}}}},c=({Component:r,initialData:s={},...o})=>{const[t,n]=Xr.useState(s),l=(a,i)=>{n(d=>({...d,[a]:i}))};return e.jsx("div",{className:"w-96 p-6 bg-[var(--hive-background-primary)]",children:e.jsx(r,{...t,...Object.keys(s).reduce((a,i)=>{const d=`on${i.charAt(0).toUpperCase()+i.slice(1)}Change`;return a[d]=p=>l(i,p),a},{}),...o})})},w={render:r=>e.jsx(c,{Component:j,initialData:{value:""},...r}),parameters:{docs:{description:{story:"Email field with university domain validation and visual feedback."}}}},D={render:r=>e.jsx(c,{Component:j,initialData:{value:"sarah.chen@stanford.edu"},university:"Stanford University",...r})},E={render:r=>e.jsx(c,{Component:j,initialData:{value:"notvalid@gmail.com"},error:"Please use your university email address",...r})},M={render:r=>e.jsx(c,{Component:C,initialData:{value:""},...r}),parameters:{docs:{description:{story:"Student ID input with automatic format sanitization."}}}},I={render:r=>e.jsx(c,{Component:C,initialData:{value:"123456789"},...r})},P={render:r=>e.jsx(c,{Component:C,initialData:{value:""},error:"Student ID is required",required:!0,...r})},V={render:r=>e.jsx(c,{Component:F,initialData:{major:"",year:""},...r}),parameters:{docs:{description:{story:"Combined major and academic year selection with searchable options."}}}},k={render:r=>e.jsx(c,{Component:F,initialData:{major:"computer-science",year:"senior"},...r})},A={render:r=>e.jsx(c,{Component:F,initialData:{major:"",year:""},majorError:"Please select your major",yearError:"Please select your academic year",required:!0,...r})},U={render:r=>e.jsx(c,{Component:se,initialData:{dormBuilding:"",roomNumber:""},...r}),parameters:{docs:{description:{story:"Residence hall and room number input with validation."}}}},B={render:r=>e.jsx(c,{Component:se,initialData:{dormBuilding:"Smith Hall",roomNumber:"314"},...r})},G={render:r=>e.jsx(c,{Component:oe,initialData:{organization:"",position:""},...r}),parameters:{docs:{description:{story:"Greek life organization and position selection with conditional fields."}}}},W={render:r=>e.jsx(c,{Component:oe,initialData:{organization:"Alpha Beta Gamma",position:"president"},...r})},L={render:r=>e.jsx(c,{Component:ne,initialData:{googleCalendar:!1,outlookCalendar:!1,appleCalendar:!1},...r}),parameters:{docs:{description:{story:"Calendar integration toggles with connection status indicators."}}}},_={render:r=>e.jsx(c,{Component:ne,initialData:{googleCalendar:!0,outlookCalendar:!1,appleCalendar:!0},...r})},z={render:r=>e.jsx(c,{Component:S,initialData:{value:"friends"},...r}),parameters:{docs:{description:{story:"Privacy level selection with dynamic descriptions and ghost mode explanation."}}}},H={render:r=>e.jsx(c,{Component:S,initialData:{value:"public"},...r})},R={render:r=>e.jsx(c,{Component:S,initialData:{value:"ghost"},...r})},Y={render:r=>e.jsx(c,{Component:q,initialData:{portfolioUrl:"",githubUrl:"",experience:""},...r}),parameters:{docs:{description:{story:"Builder verification with portfolio, GitHub, and experience level fields."}}}},O={render:r=>e.jsx(c,{Component:q,initialData:{portfolioUrl:"https://sarahchen.dev",githubUrl:"github.com/sarahc",experience:"intermediate"},...r})},Z={render:r=>e.jsx(c,{Component:q,initialData:{portfolioUrl:"",githubUrl:"",experience:""},experienceError:"Please select your experience level",...r})},$={render:r=>e.jsx(c,{Component:N,initialData:{spaceName:"",spaceType:"",description:"",expectedMembers:""},...r}),parameters:{docs:{description:{story:"Space creation request form with name, type, description, and member count."}}}},J={render:r=>e.jsx(c,{Component:N,initialData:{spaceName:"CS Study Group",spaceType:"academic",description:"A collaborative study group for Computer Science students focusing on data structures and algorithms.",expectedMembers:"25"},...r})},K={render:r=>e.jsx(c,{Component:N,initialData:{spaceName:"",spaceType:"",description:"",expectedMembers:""},spaceNameError:"Space name is required",spaceTypeError:"Please select a space type",descriptionError:"Please describe your space",...r})},X={render:r=>e.jsx(c,{Component:T,initialData:{toolName:"",toolDescription:"",toolCategory:"",repositoryUrl:""},...r}),parameters:{docs:{description:{story:"Tool publishing form with name, category, description, and repository fields."}}}},Q={render:r=>e.jsx(c,{Component:T,initialData:{toolName:"GPA Calculator",toolDescription:"A comprehensive GPA calculator that helps students track their academic progress, calculate semester and cumulative GPAs, and set grade goals for future courses.",toolCategory:"academic",repositoryUrl:"https://github.com/sarahc/gpa-calculator"},...r})},ee={render:r=>e.jsx(c,{Component:T,initialData:{toolName:"",toolDescription:"",toolCategory:"",repositoryUrl:""},toolNameError:"Tool name is required",toolCategoryError:"Please select a category",toolDescriptionError:"Please describe your tool",...r})},re={render:()=>e.jsxs("div",{className:"max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Complete Your Profile"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Help us personalize your HIVE experience"})]}),e.jsx(j,{value:"maya.patel@berkeley.edu",university:"UC Berkeley",required:!0}),e.jsx(C,{value:"987654321",required:!0}),e.jsx(F,{major:"biology",year:"junior",required:!0}),e.jsx(se,{dormBuilding:"Unit 3",roomNumber:"A205"}),e.jsx(S,{value:"friends"})]}),parameters:{docs:{description:{story:"Complete student onboarding form with multiple field types."}}}},ae={render:()=>e.jsxs("div",{className:"max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Apply to be a Builder"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Join our community of student developers and creators"})]}),e.jsx(q,{portfolioUrl:"https://jordankim.dev",githubUrl:"github.com/jordank",experience:"intermediate"}),e.jsx(T,{toolName:"Study Scheduler",toolDescription:"A smart scheduling tool that helps students optimize their study time based on their course load, deadlines, and personal energy levels throughout the day.",toolCategory:"productivity",repositoryUrl:"https://github.com/jordank/study-scheduler"})]}),parameters:{docs:{description:{story:"Builder application form with verification and tool publishing fields."}}}},te={render:()=>e.jsxs("div",{className:"max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Request a New Space"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Create a community for your group or organization"})]}),e.jsx(N,{spaceName:"Debate Club",spaceType:"club",description:"The official debate club for competitive debate tournaments, practice sessions, and public speaking skill development. We welcome all skill levels and provide training for beginners.",expectedMembers:"40"}),e.jsx(oe,{organization:"",position:""})]}),parameters:{docs:{description:{story:"Space leader request form for creating new communities."}}}},ie={render:()=>e.jsxs("div",{className:"max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Account Settings"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Manage your privacy and integrations"})]}),e.jsx(S,{value:"friends"}),e.jsx(ne,{googleCalendar:!0,outlookCalendar:!1,appleCalendar:!0})]}),parameters:{docs:{description:{story:"Comprehensive settings form with privacy and integration options."}}}};var pe,me,ve;w.parameters={...w.parameters,docs:{...(pe=w.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
}`,...(ve=(me=w.parameters)==null?void 0:me.docs)==null?void 0:ve.source}}};var ye,ge,fe;D.parameters={...D.parameters,docs:{...(ye=D.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={UniversityEmailFieldMolecule} initialData={{
    value: 'sarah.chen@stanford.edu'
  }} university="Stanford University" {...args} />
}`,...(fe=(ge=D.parameters)==null?void 0:ge.docs)==null?void 0:fe.source}}};var he,be,xe;E.parameters={...E.parameters,docs:{...(he=E.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={UniversityEmailFieldMolecule} initialData={{
    value: 'notvalid@gmail.com'
  }} error="Please use your university email address" {...args} />
}`,...(xe=(be=E.parameters)==null?void 0:be.docs)==null?void 0:xe.source}}};var je,Se,Ce;M.parameters={...M.parameters,docs:{...(je=M.parameters)==null?void 0:je.docs,source:{originalSource:`{
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
}`,...(Ce=(Se=M.parameters)==null?void 0:Se.docs)==null?void 0:Ce.source}}};var Fe,qe,Ne;I.parameters={...I.parameters,docs:{...(Fe=I.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={StudentIDFieldMolecule} initialData={{
    value: '123456789'
  }} {...args} />
}`,...(Ne=(qe=I.parameters)==null?void 0:qe.docs)==null?void 0:Ne.source}}};var Te,we,De;P.parameters={...P.parameters,docs:{...(Te=P.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={StudentIDFieldMolecule} initialData={{
    value: ''
  }} error="Student ID is required" required {...args} />
}`,...(De=(we=P.parameters)==null?void 0:we.docs)==null?void 0:De.source}}};var Ee,Me,Ie;V.parameters={...V.parameters,docs:{...(Ee=V.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
}`,...(Ie=(Me=V.parameters)==null?void 0:Me.docs)==null?void 0:Ie.source}}};var Pe,Ve,ke;k.parameters={...k.parameters,docs:{...(Pe=k.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={MajorSelectionFieldMolecule} initialData={{
    major: 'computer-science',
    year: 'senior'
  }} {...args} />
}`,...(ke=(Ve=k.parameters)==null?void 0:Ve.docs)==null?void 0:ke.source}}};var Ae,Ue,Be;A.parameters={...A.parameters,docs:{...(Ae=A.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={MajorSelectionFieldMolecule} initialData={{
    major: '',
    year: ''
  }} majorError="Please select your major" yearError="Please select your academic year" required {...args} />
}`,...(Be=(Ue=A.parameters)==null?void 0:Ue.docs)==null?void 0:Be.source}}};var Ge,We,Le;U.parameters={...U.parameters,docs:{...(Ge=U.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
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
}`,...(Le=(We=U.parameters)==null?void 0:We.docs)==null?void 0:Le.source}}};var _e,ze,He;B.parameters={...B.parameters,docs:{...(_e=B.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={DormSelectionFieldMolecule} initialData={{
    dormBuilding: 'Smith Hall',
    roomNumber: '314'
  }} {...args} />
}`,...(He=(ze=B.parameters)==null?void 0:ze.docs)==null?void 0:He.source}}};var Re,Ye,Oe;G.parameters={...G.parameters,docs:{...(Re=G.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(Oe=(Ye=G.parameters)==null?void 0:Ye.docs)==null?void 0:Oe.source}}};var Ze,$e,Je;W.parameters={...W.parameters,docs:{...(Ze=W.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={GreekAffiliationFieldMolecule} initialData={{
    organization: 'Alpha Beta Gamma',
    position: 'president'
  }} {...args} />
}`,...(Je=($e=W.parameters)==null?void 0:$e.docs)==null?void 0:Je.source}}};var Ke,Xe,Qe;L.parameters={...L.parameters,docs:{...(Ke=L.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
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
}`,...(Qe=(Xe=L.parameters)==null?void 0:Xe.docs)==null?void 0:Qe.source}}};var er,rr,ar;_.parameters={..._.parameters,docs:{...(er=_.parameters)==null?void 0:er.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={CalendarConnectionFieldMolecule} initialData={{
    googleCalendar: true,
    outlookCalendar: false,
    appleCalendar: true
  }} {...args} />
}`,...(ar=(rr=_.parameters)==null?void 0:rr.docs)==null?void 0:ar.source}}};var tr,ir,sr;z.parameters={...z.parameters,docs:{...(tr=z.parameters)==null?void 0:tr.docs,source:{originalSource:`{
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
}`,...(sr=(ir=z.parameters)==null?void 0:ir.docs)==null?void 0:sr.source}}};var or,nr,lr;H.parameters={...H.parameters,docs:{...(or=H.parameters)==null?void 0:or.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={PrivacyLevelFieldMolecule} initialData={{
    value: 'public'
  }} {...args} />
}`,...(lr=(nr=H.parameters)==null?void 0:nr.docs)==null?void 0:lr.source}}};var cr,dr,ur;R.parameters={...R.parameters,docs:{...(cr=R.parameters)==null?void 0:cr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={PrivacyLevelFieldMolecule} initialData={{
    value: 'ghost'
  }} {...args} />
}`,...(ur=(dr=R.parameters)==null?void 0:dr.docs)==null?void 0:ur.source}}};var pr,mr,vr;Y.parameters={...Y.parameters,docs:{...(pr=Y.parameters)==null?void 0:pr.docs,source:{originalSource:`{
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
}`,...(vr=(mr=Y.parameters)==null?void 0:mr.docs)==null?void 0:vr.source}}};var yr,gr,fr;O.parameters={...O.parameters,docs:{...(yr=O.parameters)==null?void 0:yr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={BuilderVerificationFieldMolecule} initialData={{
    portfolioUrl: 'https://sarahchen.dev',
    githubUrl: 'github.com/sarahc',
    experience: 'intermediate'
  }} {...args} />
}`,...(fr=(gr=O.parameters)==null?void 0:gr.docs)==null?void 0:fr.source}}};var hr,br,xr;Z.parameters={...Z.parameters,docs:{...(hr=Z.parameters)==null?void 0:hr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={BuilderVerificationFieldMolecule} initialData={{
    portfolioUrl: '',
    githubUrl: '',
    experience: ''
  }} experienceError="Please select your experience level" {...args} />
}`,...(xr=(br=Z.parameters)==null?void 0:br.docs)==null?void 0:xr.source}}};var jr,Sr,Cr;$.parameters={...$.parameters,docs:{...(jr=$.parameters)==null?void 0:jr.docs,source:{originalSource:`{
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
}`,...(Cr=(Sr=$.parameters)==null?void 0:Sr.docs)==null?void 0:Cr.source}}};var Fr,qr,Nr;J.parameters={...J.parameters,docs:{...(Fr=J.parameters)==null?void 0:Fr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={SpaceActivationFieldMolecule} initialData={{
    spaceName: 'CS Study Group',
    spaceType: 'academic',
    description: 'A collaborative study group for Computer Science students focusing on data structures and algorithms.',
    expectedMembers: '25'
  }} {...args} />
}`,...(Nr=(qr=J.parameters)==null?void 0:qr.docs)==null?void 0:Nr.source}}};var Tr,wr,Dr;K.parameters={...K.parameters,docs:{...(Tr=K.parameters)==null?void 0:Tr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={SpaceActivationFieldMolecule} initialData={{
    spaceName: '',
    spaceType: '',
    description: '',
    expectedMembers: ''
  }} spaceNameError="Space name is required" spaceTypeError="Please select a space type" descriptionError="Please describe your space" {...args} />
}`,...(Dr=(wr=K.parameters)==null?void 0:wr.docs)==null?void 0:Dr.source}}};var Er,Mr,Ir;X.parameters={...X.parameters,docs:{...(Er=X.parameters)==null?void 0:Er.docs,source:{originalSource:`{
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
}`,...(Ir=(Mr=X.parameters)==null?void 0:Mr.docs)==null?void 0:Ir.source}}};var Pr,Vr,kr;Q.parameters={...Q.parameters,docs:{...(Pr=Q.parameters)==null?void 0:Pr.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={ToolPublishingFieldMolecule} initialData={{
    toolName: 'GPA Calculator',
    toolDescription: 'A comprehensive GPA calculator that helps students track their academic progress, calculate semester and cumulative GPAs, and set grade goals for future courses.',
    toolCategory: 'academic',
    repositoryUrl: 'https://github.com/sarahc/gpa-calculator'
  }} {...args} />
}`,...(kr=(Vr=Q.parameters)==null?void 0:Vr.docs)==null?void 0:kr.source}}};var Ar,Ur,Br;ee.parameters={...ee.parameters,docs:{...(Ar=ee.parameters)==null?void 0:Ar.docs,source:{originalSource:`{
  render: args => <InteractiveField Component={ToolPublishingFieldMolecule} initialData={{
    toolName: '',
    toolDescription: '',
    toolCategory: '',
    repositoryUrl: ''
  }} toolNameError="Tool name is required" toolCategoryError="Please select a category" toolDescriptionError="Please describe your tool" {...args} />
}`,...(Br=(Ur=ee.parameters)==null?void 0:Ur.docs)==null?void 0:Br.source}}};var Gr,Wr,Lr;re.parameters={...re.parameters,docs:{...(Gr=re.parameters)==null?void 0:Gr.docs,source:{originalSource:`{
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
}`,...(Lr=(Wr=re.parameters)==null?void 0:Wr.docs)==null?void 0:Lr.source}}};var _r,zr,Hr;ae.parameters={...ae.parameters,docs:{...(_r=ae.parameters)==null?void 0:_r.docs,source:{originalSource:`{
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
}`,...(Hr=(zr=ae.parameters)==null?void 0:zr.docs)==null?void 0:Hr.source}}};var Rr,Yr,Or;te.parameters={...te.parameters,docs:{...(Rr=te.parameters)==null?void 0:Rr.docs,source:{originalSource:`{
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
}`,...(Or=(Yr=te.parameters)==null?void 0:Yr.docs)==null?void 0:Or.source}}};var Zr,$r,Jr;ie.parameters={...ie.parameters,docs:{...(Zr=ie.parameters)==null?void 0:Zr.docs,source:{originalSource:`{
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
}`,...(Jr=($r=ie.parameters)==null?void 0:$r.docs)==null?void 0:Jr.source}}};const Ua=["UniversityEmailField","UniversityEmailWithValue","UniversityEmailWithError","StudentIDField","StudentIDWithValue","StudentIDWithError","MajorSelectionField","MajorSelectionWithValues","MajorSelectionWithErrors","DormSelectionField","DormSelectionWithValues","GreekAffiliationField","GreekAffiliationWithValues","CalendarConnectionField","CalendarConnectionWithConnections","PrivacyLevelField","PrivacyLevelPublic","PrivacyLevelGhost","BuilderVerificationField","BuilderVerificationWithValues","BuilderVerificationWithErrors","SpaceActivationField","SpaceActivationWithValues","SpaceActivationWithErrors","ToolPublishingField","ToolPublishingWithValues","ToolPublishingWithErrors","StudentOnboardingForm","BuilderApplicationForm","SpaceLeaderRequestForm","ComprehensiveSettingsForm"];export{ae as BuilderApplicationForm,Y as BuilderVerificationField,Z as BuilderVerificationWithErrors,O as BuilderVerificationWithValues,L as CalendarConnectionField,_ as CalendarConnectionWithConnections,ie as ComprehensiveSettingsForm,U as DormSelectionField,B as DormSelectionWithValues,G as GreekAffiliationField,W as GreekAffiliationWithValues,V as MajorSelectionField,A as MajorSelectionWithErrors,k as MajorSelectionWithValues,z as PrivacyLevelField,R as PrivacyLevelGhost,H as PrivacyLevelPublic,$ as SpaceActivationField,K as SpaceActivationWithErrors,J as SpaceActivationWithValues,te as SpaceLeaderRequestForm,M as StudentIDField,P as StudentIDWithError,I as StudentIDWithValue,re as StudentOnboardingForm,X as ToolPublishingField,ee as ToolPublishingWithErrors,Q as ToolPublishingWithValues,w as UniversityEmailField,E as UniversityEmailWithError,D as UniversityEmailWithValue,Ua as __namedExportsOrder,Aa as default};
