import{j as r}from"./jsx-runtime-SKoiH9zj.js";import{E as Me}from"./email-input-M2QKOoXV.js";import{r as _e}from"./index-DJO9vBfz.js";import"./utils-CytzSlOG.js";const We={title:"Molecules/Email Input",component:Me,parameters:{layout:"centered",docs:{description:{component:`
A specialized email input component designed for university and campus environments. Combines a username input field with a predefined domain display, perfect for educational email addresses.

**Key Features:**
- Split input design (username + domain)
- University domain presets
- Size variants (sm, md, lg)
- Error state handling
- Accessible labeling
- Focus and hover states
- Campus-specific styling
        `}}},argTypes:{value:{control:"text",description:"Username portion of the email"},domain:{control:"text",description:"Domain portion of the email (without @)"},placeholder:{control:"text",description:"Placeholder text for the username input"},label:{control:"text",description:"Label text displayed above the input"},error:{control:"text",description:"Error message to display"},size:{control:"select",options:["sm","md","lg"],description:"Input size variant"}}},a=({value:e="",...ke})=>{const[Re,qe]=_e.useState(e);return r.jsx(Me,{value:Re,onChange:qe,...ke})},s={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu"}},n={render:e=>r.jsx(a,{...e}),args:{label:"Student Email",placeholder:"username",domain:"stanford.edu",value:"sarah.chen"}},t={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu",error:"Username is required",value:""}},i={render:e=>r.jsx(a,{...e}),args:{label:"Email Address",placeholder:"username",domain:"university.edu",size:"sm"}},o={render:e=>r.jsx(a,{...e}),args:{label:"Email Address",placeholder:"username",domain:"university.edu",size:"md"}},l={render:e=>r.jsx(a,{...e}),args:{label:"Email Address",placeholder:"username",domain:"university.edu",size:"lg"}},d={render:e=>r.jsx(a,{...e}),args:{label:"Stanford Email",placeholder:"first.last",domain:"stanford.edu",value:"alex.rodriguez"}},m={render:e=>r.jsx(a,{...e}),args:{label:"MIT Email",placeholder:"username",domain:"mit.edu",value:"jdoe"}},u={render:e=>r.jsx(a,{...e}),args:{label:"UC Berkeley Email",placeholder:"firstname_lastname",domain:"berkeley.edu",value:"maya_patel"}},c={render:e=>r.jsx(a,{...e}),args:{label:"Harvard Email",placeholder:"username",domain:"harvard.edu",value:"ewatson"}},p={render:e=>r.jsx(a,{...e}),args:{label:"Student Email Address",placeholder:"firstname.lastname",domain:"university.edu"},parameters:{docs:{description:{story:"Email input for student registration or account creation."}}}},v={render:e=>r.jsx(a,{...e}),args:{label:"Faculty Email",placeholder:"professor.name",domain:"faculty.university.edu",value:"dr.smith"},parameters:{docs:{description:{story:"Email input for faculty members with faculty domain."}}}},g={render:e=>r.jsx(a,{...e}),args:{label:"Alumni Email",placeholder:"firstname.lastname",domain:"alumni.university.edu",value:"john.doe.2020"},parameters:{docs:{description:{story:"Email input for alumni with graduation year convention."}}}},y={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu",error:"Email address is required"}},E={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu",value:"invalid@username",error:"Username cannot contain @ symbol"}},h={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu",value:"ab",error:"Username must be at least 3 characters"}},f={render:e=>r.jsx(a,{...e}),args:{label:"University Email",placeholder:"username",domain:"university.edu",value:"admin",error:"This username is already taken"}},b={render:e=>r.jsx(a,{...e}),args:{placeholder:"your-username",domain:"university.edu"}},x={render:e=>r.jsx(a,{...e}),args:{placeholder:"enter your student ID",domain:"student.university.edu"}},I={render:()=>r.jsxs("div",{className:"space-y-6 w-80",children:[r.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)]",children:"Create Your Account"}),r.jsx(a,{label:"University Email",placeholder:"firstname.lastname",domain:"stanford.edu"}),r.jsx("div",{className:"pt-4",children:r.jsx("p",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Use your official university email address to verify your student status."})})]}),parameters:{docs:{description:{story:"Email input within a registration form context."}}}},S={render:()=>r.jsxs("div",{className:"space-y-4 w-80",children:[r.jsx("h3",{className:"text-lg font-semibold text-[var(--hive-text-primary)] mb-4",children:"Choose Your Email Type"}),r.jsx(a,{label:"Student Email",placeholder:"username",domain:"student.university.edu",size:"sm"}),r.jsx(a,{label:"Faculty Email",placeholder:"professor.name",domain:"faculty.university.edu",size:"sm"}),r.jsx(a,{label:"Staff Email",placeholder:"firstname.lastname",domain:"staff.university.edu",size:"sm"})]}),parameters:{docs:{description:{story:"Multiple email input options for different user types."}}}};var j,U,z;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu'
  }
}`,...(z=(U=s.parameters)==null?void 0:U.docs)==null?void 0:z.source}}};var A,w,N;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Student Email',
    placeholder: 'username',
    domain: 'stanford.edu',
    value: 'sarah.chen'
  }
}`,...(N=(w=n.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};var C,T,F;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    error: 'Username is required',
    value: ''
  }
}`,...(F=(T=t.parameters)==null?void 0:T.docs)==null?void 0:F.source}}};var M,k,R;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'username',
    domain: 'university.edu',
    size: 'sm'
  }
}`,...(R=(k=i.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};var q,_,D;o.parameters={...o.parameters,docs:{...(q=o.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'username',
    domain: 'university.edu',
    size: 'md'
  }
}`,...(D=(_=o.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var L,B,H;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'username',
    domain: 'university.edu',
    size: 'lg'
  }
}`,...(H=(B=l.parameters)==null?void 0:B.docs)==null?void 0:H.source}}};var W,Y,O;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Stanford Email',
    placeholder: 'first.last',
    domain: 'stanford.edu',
    value: 'alex.rodriguez'
  }
}`,...(O=(Y=d.parameters)==null?void 0:Y.docs)==null?void 0:O.source}}};var P,V,K;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'MIT Email',
    placeholder: 'username',
    domain: 'mit.edu',
    value: 'jdoe'
  }
}`,...(K=(V=m.parameters)==null?void 0:V.docs)==null?void 0:K.source}}};var G,J,Q;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'UC Berkeley Email',
    placeholder: 'firstname_lastname',
    domain: 'berkeley.edu',
    value: 'maya_patel'
  }
}`,...(Q=(J=u.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Z,$;c.parameters={...c.parameters,docs:{...(X=c.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Harvard Email',
    placeholder: 'username',
    domain: 'harvard.edu',
    value: 'ewatson'
  }
}`,...($=(Z=c.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,re,ae;p.parameters={...p.parameters,docs:{...(ee=p.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(ae=(re=p.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var se,ne,te;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(te=(ne=v.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var ie,oe,le;g.parameters={...g.parameters,docs:{...(ie=g.parameters)==null?void 0:ie.docs,source:{originalSource:`{
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
}`,...(le=(oe=g.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var de,me,ue;y.parameters={...y.parameters,docs:{...(de=y.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    error: 'Email address is required'
  }
}`,...(ue=(me=y.parameters)==null?void 0:me.docs)==null?void 0:ue.source}}};var ce,pe,ve;E.parameters={...E.parameters,docs:{...(ce=E.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    value: 'invalid@username',
    error: 'Username cannot contain @ symbol'
  }
}`,...(ve=(pe=E.parameters)==null?void 0:pe.docs)==null?void 0:ve.source}}};var ge,ye,Ee;h.parameters={...h.parameters,docs:{...(ge=h.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    value: 'ab',
    error: 'Username must be at least 3 characters'
  }
}`,...(Ee=(ye=h.parameters)==null?void 0:ye.docs)==null?void 0:Ee.source}}};var he,fe,be;f.parameters={...f.parameters,docs:{...(he=f.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    value: 'admin',
    error: 'This username is already taken'
  }
}`,...(be=(fe=f.parameters)==null?void 0:fe.docs)==null?void 0:be.source}}};var xe,Ie,Se;b.parameters={...b.parameters,docs:{...(xe=b.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    placeholder: 'your-username',
    domain: 'university.edu'
  }
}`,...(Se=(Ie=b.parameters)==null?void 0:Ie.docs)==null?void 0:Se.source}}};var je,Ue,ze;x.parameters={...x.parameters,docs:{...(je=x.parameters)==null?void 0:je.docs,source:{originalSource:`{
  render: args => <InteractiveEmailInput {...args} />,
  args: {
    placeholder: 'enter your student ID',
    domain: 'student.university.edu'
  }
}`,...(ze=(Ue=x.parameters)==null?void 0:Ue.docs)==null?void 0:ze.source}}};var Ae,we,Ne;I.parameters={...I.parameters,docs:{...(Ae=I.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
}`,...(Ne=(we=I.parameters)==null?void 0:we.docs)==null?void 0:Ne.source}}};var Ce,Te,Fe;S.parameters={...S.parameters,docs:{...(Ce=S.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
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
}`,...(Fe=(Te=S.parameters)==null?void 0:Te.docs)==null?void 0:Fe.source}}};const Ye=["Default","WithValue","WithError","SmallSize","MediumSize","LargeSize","StanfordEmail","MITEmail","UCBerkeleyEmail","HarvardEmail","StudentRegistration","FacultyEmail","AlumniEmail","RequiredFieldError","InvalidUsernameError","TooShortError","AlreadyTakenError","NoLabel","CustomPlaceholder","RegistrationForm","MultipleEmailOptions"];export{f as AlreadyTakenError,g as AlumniEmail,x as CustomPlaceholder,s as Default,v as FacultyEmail,c as HarvardEmail,E as InvalidUsernameError,l as LargeSize,m as MITEmail,o as MediumSize,S as MultipleEmailOptions,b as NoLabel,I as RegistrationForm,y as RequiredFieldError,i as SmallSize,d as StanfordEmail,p as StudentRegistration,h as TooShortError,u as UCBerkeleyEmail,t as WithError,n as WithValue,Ye as __namedExportsOrder,We as default};
