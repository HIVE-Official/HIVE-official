import{j as r}from"./jsx-runtime-B9GTzLod.js";import{r as He}from"./index-BMjrbHXN.js";import{c as t}from"./utils-CytzSlOG.js";const k={sm:"h-10 text-sm",md:"h-12 text-sm",lg:"h-14 text-base"},N=He.forwardRef(({value:e="",onChange:s,domain:w="university.edu",placeholder:T="username",label:A,error:n,size:q="md",className:We,...Ye},Oe)=>r.jsxs("div",{className:t("space-y-2",We),children:[A&&r.jsxs("label",{className:"block text-sm font-medium text-[var(--hive-text-primary)]",children:[A,n&&r.jsx("span",{className:"text-[var(--hive-status-error)] ml-1",children:"*"})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx("div",{className:t("flex items-center flex-1 px-5","bg-transparent border border-[var(--hive-border-default)]","rounded-2xl rounded-r-none border-r-0","focus-within:border-[var(--hive-brand-secondary)] focus-within:ring-2 focus-within:ring-[var(--hive-brand-secondary)]/20","hover:border-[var(--hive-border-hover)]","transition-all duration-200 ease-out",k[q],n&&"border-[var(--hive-status-error)] focus-within:border-[var(--hive-status-error)]"),children:r.jsx("input",{ref:Oe,type:"text",value:e,onChange:Pe=>s==null?void 0:s(Pe.target.value),placeholder:T,className:t("flex-1 bg-transparent outline-none","font-medium text-[var(--hive-text-primary)]","placeholder:text-[var(--hive-text-tertiary)]"),...Ye})}),r.jsxs("div",{className:t("flex items-center px-5","bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)]","rounded-2xl rounded-l-none","font-medium text-[var(--hive-text-secondary)]",k[q],n&&"border-[var(--hive-status-error)]"),children:["@",w]})]}),n&&r.jsx("p",{className:"text-xs text-[var(--hive-status-error)]",children:n})]}));N.displayName="EmailInput";N.__docgenInfo={description:"",methods:[],displayName:"EmailInput",props:{value:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},domain:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'university.edu'",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'username'",computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const Qe={title:"Molecules/Email Input",component:N,parameters:{layout:"centered",docs:{description:{component:`
A specialized email input component designed for university and campus environments. Combines a username input field with a predefined domain display, perfect for educational email addresses.

**Key Features:**
- Split input design (username + domain)
- University domain presets
- Size variants (sm, md, lg)
- Error state handling
- Accessible labeling
- Focus and hover states
- Campus-specific styling
        `}}},argTypes:{value:{control:"text",description:"Username portion of the email"},domain:{control:"text",description:"Domain portion of the email (without @)"},placeholder:{control:"text",description:"Placeholder text for the username input"},label:{control:"text",description:"Label text displayed above the input"},error:{control:"text",description:"Error message to display"},size:{control:"select",options:["sm","md","lg"],description:"Input size variant"}}},a=({value:e="",...s})=>{const[w,T]=He.useState(e);return r.jsx(N,{value:w,onChange:T,...s})},i={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu"}},o={render:e=>r.jsx(a,{...e}),args:{label:"Student Email",placeholder:"username",domain:"stanford.edu",value:"sarah.chen"}},l={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu",error:"Username is required",value:""}},d={render:e=>r.jsx(a,{...e}),args:{label:"Email Address",placeholder:"username",domain:"university.edu",size:"sm"}},m={render:e=>r.jsx(a,{...e}),args:{label:"Email Address",placeholder:"username",domain:"university.edu",size:"md"}},u={render:e=>r.jsx(a,{...e}),args:{label:"Email Address",placeholder:"username",domain:"university.edu",size:"lg"}},c={render:e=>r.jsx(a,{...e}),args:{label:"Stanford Email",placeholder:"first.last",domain:"stanford.edu",value:"alex.rodriguez"}},p={render:e=>r.jsx(a,{...e}),args:{label:"MIT Email",placeholder:"username",domain:"mit.edu",value:"jdoe"}},v={render:e=>r.jsx(a,{...e}),args:{label:"UC Berkeley Email",placeholder:"firstname_lastname",domain:"berkeley.edu",value:"maya_patel"}},g={render:e=>r.jsx(a,{...e}),args:{label:"Harvard Email",placeholder:"username",domain:"harvard.edu",value:"ewatson"}},y={render:e=>r.jsx(a,{...e}),args:{label:"Student Email Address",placeholder:"firstname.lastname",domain:"university.edu"},parameters:{docs:{description:{story:"Email input for student registration or account creation."}}}},h={render:e=>r.jsx(a,{...e}),args:{label:"Faculty Email",placeholder:"professor.name",domain:"faculty.university.edu",value:"dr.smith"},parameters:{docs:{description:{story:"Email input for faculty members with faculty domain."}}}},f={render:e=>r.jsx(a,{...e}),args:{label:"Alumni Email",placeholder:"firstname.lastname",domain:"alumni.university.edu",value:"john.doe.2020"},parameters:{docs:{description:{story:"Email input for alumni with graduation year convention."}}}},E={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu",error:"Email address is required"}},x={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu",value:"invalid@username",error:"Username cannot contain @ symbol"}},b={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu",value:"ab",error:"Username must be at least 3 characters"}},I={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu",value:"admin",error:"This username is already taken"}},S={render:e=>r.jsx(a,{...e}),args:{placeholder:"your-username",domain:"university.edu"}},j={render:e=>r.jsx(a,{...e}),args:{placeholder:"enter your student ID",domain:"student.university.edu"}},U={render:()=>r.jsxs("div",{className:"space-y-6 w-80",children:[r.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)]",children:"Create Your Account"}),r.jsx(a,{label:"University Email",placeholder:"firstname.lastname",domain:"stanford.edu"}),r.jsx("div",{className:"pt-4",children:r.jsx("p",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Use your official university email address to verify your student status."})})]}),parameters:{docs:{description:{story:"Email input within a registration form context."}}}},z={render:()=>r.jsxs("div",{className:"space-y-4 w-80",children:[r.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Choose Your Email Type"}),r.jsx(a,{label:"Student Email",placeholder:"username",domain:"student.university.edu",size:"sm"}),r.jsx(a,{label:"Faculty Email",placeholder:"professor.name",domain:"faculty.university.edu",size:"sm"}),r.jsx(a,{label:"Staff Email",placeholder:"firstname.lastname",domain:"staff.university.edu",size:"sm"})]}),parameters:{docs:{description:{story:"Multiple email input options for different user types."}}}};var F,C,M;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu'
  }
}`,...(M=(C=i.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var R,_,V;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Student Email',
    placeholder: 'username',
    domain: 'stanford.edu',
    value: 'sarah.chen'
  }
}`,...(V=(_=o.parameters)==null?void 0:_.docs)==null?void 0:V.source}}};var D,L,B;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    error: 'Username is required',
    value: ''
  }
}`,...(B=(L=l.parameters)==null?void 0:L.docs)==null?void 0:B.source}}};var H,W,Y;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'username',
    domain: 'university.edu',
    size: 'sm'
  }
}`,...(Y=(W=d.parameters)==null?void 0:W.docs)==null?void 0:Y.source}}};var O,P,K;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'username',
    domain: 'university.edu',
    size: 'md'
  }
}`,...(K=(P=m.parameters)==null?void 0:P.docs)==null?void 0:K.source}}};var G,J,Q;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'username',
    domain: 'university.edu',
    size: 'lg'
  }
}`,...(Q=(J=u.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Z,$;c.parameters={...c.parameters,docs:{...(X=c.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Stanford Email',
    placeholder: 'first.last',
    domain: 'stanford.edu',
    value: 'alex.rodriguez'
  }
}`,...($=(Z=c.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,re,ae;p.parameters={...p.parameters,docs:{...(ee=p.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'MIT Email',
    placeholder: 'username',
    domain: 'mit.edu',
    value: 'jdoe'
  }
}`,...(ae=(re=p.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var se,ne,te;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'UC Berkeley Email',
    placeholder: 'firstname_lastname',
    domain: 'berkeley.edu',
    value: 'maya_patel'
  }
}`,...(te=(ne=v.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var ie,oe,le;g.parameters={...g.parameters,docs:{...(ie=g.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Harvard Email',
    placeholder: 'username',
    domain: 'harvard.edu',
    value: 'ewatson'
  }
}`,...(le=(oe=g.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var de,me,ue;y.parameters={...y.parameters,docs:{...(de=y.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Student Email Address',
    placeholder: 'firstname.lastname',
    domain: 'university.edu'
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input for student registration or account creation.'
      }
    }
  }
}`,...(ue=(me=y.parameters)==null?void 0:me.docs)==null?void 0:ue.source}}};var ce,pe,ve;h.parameters={...h.parameters,docs:{...(ce=h.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Faculty Email',
    placeholder: 'professor.name',
    domain: 'faculty.university.edu',
    value: 'dr.smith'
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input for faculty members with faculty domain.'
      }
    }
  }
}`,...(ve=(pe=h.parameters)==null?void 0:pe.docs)==null?void 0:ve.source}}};var ge,ye,he;f.parameters={...f.parameters,docs:{...(ge=f.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Alumni Email',
    placeholder: 'firstname.lastname',
    domain: 'alumni.university.edu',
    value: 'john.doe.2020'
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input for alumni with graduation year convention.'
      }
    }
  }
}`,...(he=(ye=f.parameters)==null?void 0:ye.docs)==null?void 0:he.source}}};var fe,Ee,xe;E.parameters={...E.parameters,docs:{...(fe=E.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    error: 'Email address is required'
  }
}`,...(xe=(Ee=E.parameters)==null?void 0:Ee.docs)==null?void 0:xe.source}}};var be,Ie,Se;x.parameters={...x.parameters,docs:{...(be=x.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    value: 'invalid@username',
    error: 'Username cannot contain @ symbol'
  }
}`,...(Se=(Ie=x.parameters)==null?void 0:Ie.docs)==null?void 0:Se.source}}};var je,Ue,ze;b.parameters={...b.parameters,docs:{...(je=b.parameters)==null?void 0:je.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    value: 'ab',
    error: 'Username must be at least 3 characters'
  }
}`,...(ze=(Ue=b.parameters)==null?void 0:Ue.docs)==null?void 0:ze.source}}};var Ne,we,Te;I.parameters={...I.parameters,docs:{...(Ne=I.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    value: 'admin',
    error: 'This username is already taken'
  }
}`,...(Te=(we=I.parameters)==null?void 0:we.docs)==null?void 0:Te.source}}};var Ae,qe,ke;S.parameters={...S.parameters,docs:{...(Ae=S.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    placeholder: 'your-username',
    domain: 'university.edu'
  }
}`,...(ke=(qe=S.parameters)==null?void 0:qe.docs)==null?void 0:ke.source}}};var Fe,Ce,Me;j.parameters={...j.parameters,docs:{...(Fe=j.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    placeholder: 'enter your student ID',
    domain: 'student.university.edu'
  }
}`,...(Me=(Ce=j.parameters)==null?void 0:Ce.docs)==null?void 0:Me.source}}};var Re,_e,Ve;U.parameters={...U.parameters,docs:{...(Re=U.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  render: () => <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Create Your Account
      </h3>
      
      <InteractiveEmailInput label="University Email" placeholder="firstname.lastname" domain="stanford.edu" />
      
      <div className="pt-4">
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Use your official university email address to verify your student status.
        </p>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Email input within a registration form context.'
      }
    }
  }
}`,...(Ve=(_e=U.parameters)==null?void 0:_e.docs)==null?void 0:Ve.source}}};var De,Le,Be;z.parameters={...z.parameters,docs:{...(De=z.parameters)==null?void 0:De.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-80">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
        Choose Your Email Type
      </h3>
      
      <InteractiveEmailInput label="Student Email" placeholder="username" domain="student.university.edu" size="sm" />
      
      <InteractiveEmailInput label="Faculty Email" placeholder="professor.name" domain="faculty.university.edu" size="sm" />
      
      <InteractiveEmailInput label="Staff Email" placeholder="firstname.lastname" domain="staff.university.edu" size="sm" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Multiple email input options for different user types.'
      }
    }
  }
}`,...(Be=(Le=z.parameters)==null?void 0:Le.docs)==null?void 0:Be.source}}};const Xe=["Default","WithValue","WithError","SmallSize","MediumSize","LargeSize","StanfordEmail","MITEmail","UCBerkeleyEmail","HarvardEmail","StudentRegistration","FacultyEmail","AlumniEmail","RequiredFieldError","InvalidUsernameError","TooShortError","AlreadyTakenError","NoLabel","CustomPlaceholder","RegistrationForm","MultipleEmailOptions"];export{I as AlreadyTakenError,f as AlumniEmail,j as CustomPlaceholder,i as Default,h as FacultyEmail,g as HarvardEmail,x as InvalidUsernameError,u as LargeSize,p as MITEmail,m as MediumSize,z as MultipleEmailOptions,S as NoLabel,U as RegistrationForm,E as RequiredFieldError,d as SmallSize,c as StanfordEmail,y as StudentRegistration,b as TooShortError,v as UCBerkeleyEmail,l as WithError,o as WithValue,Xe as __namedExportsOrder,Qe as default};
