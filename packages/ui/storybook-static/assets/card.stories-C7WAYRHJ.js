import{j as r}from"./jsx-runtime-CDt2p4po.js";import{C as a,a as u,b as s,c as C,d as x,e as f}from"./card-DjkyhoT6.js";import{B as n}from"./button-GqeBBbqz.js";import{I as j}from"./input-VO8katut.js";import{S as h}from"./stack-DBI1tmaE.js";import"./index-GiUgBvb1.js";import"./utils-CytzSlOG.js";import"./index-BwobEAja.js";import"./loader-circle-BzTvcBo1.js";import"./createLucideIcon-DlCdiEX6.js";const F={title:"Components/Card",component:a,tags:["autodocs"],argTypes:{radius:{control:{type:"select"},options:["sm","default","lg","full"]}}},t={render:e=>r.jsxs(a,{...e,className:"w-[350px]",children:[r.jsxs(u,{children:[r.jsx(s,{children:"Create Project"}),r.jsx(C,{children:"Deploy your new project in one-click."})]}),r.jsx(x,{children:r.jsx("form",{children:r.jsx("div",{className:"grid w-full items-center gap-4",children:r.jsx("div",{className:"flex flex-col space-y-1.5",children:r.jsx(j,{id:"name",placeholder:"Name of your project"})})})})}),r.jsxs(f,{className:"flex justify-between",children:[r.jsx(n,{variant:"outline",children:"Cancel"}),r.jsx(n,{children:"Deploy"})]})]})},d={render:e=>r.jsxs(h,{direction:"row",gap:4,children:[r.jsx(a,{...e,radius:"sm",children:r.jsx(s,{children:"Small"})}),r.jsx(a,{...e,radius:"default",children:r.jsx(s,{children:"Default"})}),r.jsx(a,{...e,radius:"lg",children:r.jsx(s,{children:"Large"})}),r.jsx(a,{...e,radius:"full",children:r.jsx(s,{children:"Full"})})]})};var l,o,i;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <Card {...args} className="w-[350px]">\r
      <CardHeader>\r
        <CardTitle>Create Project</CardTitle>\r
        <CardDescription>Deploy your new project in one-click.</CardDescription>\r
      </CardHeader>\r
      <CardContent>\r
        <form>\r
          <div className="grid w-full items-center gap-4">\r
            <div className="flex flex-col space-y-1.5">\r
              <Input id="name" placeholder="Name of your project" />\r
            </div>\r
          </div>\r
        </form>\r
      </CardContent>\r
      <CardFooter className="flex justify-between">\r
        <Button variant="outline">Cancel</Button>\r
        <Button>Deploy</Button>\r
      </CardFooter>\r
    </Card>
}`,...(i=(o=t.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var c,m,p;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => <Stack direction="row" gap={4}>\r
            <Card {...args} radius="sm"><CardTitle>Small</CardTitle></Card>\r
            <Card {...args} radius="default"><CardTitle>Default</CardTitle></Card>\r
            <Card {...args} radius="lg"><CardTitle>Large</CardTitle></Card>\r
            <Card {...args} radius="full"><CardTitle>Full</CardTitle></Card>\r
        </Stack>
}`,...(p=(m=d.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const b=["Default","Radii"];export{t as Default,d as Radii,b as __namedExportsOrder,F as default};
