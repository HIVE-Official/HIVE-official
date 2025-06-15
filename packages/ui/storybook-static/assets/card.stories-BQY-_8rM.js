import{j as r}from"./jsx-runtime-CDt2p4po.js";import{C as a,a as u,b as t,c as C,d as x,e as f}from"./card-DjkyhoT6.js";import{B as i}from"./button-GqeBBbqz.js";import{I as j}from"./input-VO8katut.js";import"./badge-E1dQhR_G.js";import{S as h}from"./design-canvas-D-j6oFw3.js";import"./grid-BjptKGNo.js";import"./space-card-CrIRh5ZE.js";import"./element-picker-BZEJXByV.js";import"./index-GiUgBvb1.js";import"./welcome-mat-DxZ7I1ZQ.js";import"./analytics-dashboard-D6Bgel0L.js";import"./utils-CytzSlOG.js";import"./index-BwobEAja.js";import"./loader-circle-BzTvcBo1.js";import"./createLucideIcon-DlCdiEX6.js";import"./users-BnPOFdzp.js";import"./zap-DCkLN-xk.js";import"./proxy-Bec6Vc3j.js";const O={title:"Components/Card",component:a,tags:["autodocs"],argTypes:{radius:{control:{type:"select"},options:["sm","default","lg","full"]}}},s={render:e=>r.jsxs(a,{...e,className:"w-[350px]",children:[r.jsxs(u,{children:[r.jsx(t,{children:"Create Project"}),r.jsx(C,{children:"Deploy your new project in one-click."})]}),r.jsx(x,{children:r.jsx("form",{children:r.jsx("div",{className:"grid w-full items-center gap-4",children:r.jsx("div",{className:"flex flex-col space-y-1.5",children:r.jsx(j,{id:"name",placeholder:"Name of your project"})})})})}),r.jsxs(f,{className:"flex justify-between",children:[r.jsx(i,{variant:"outline",children:"Cancel"}),r.jsx(i,{children:"Deploy"})]})]})},o={render:e=>r.jsxs(h,{direction:"row",gap:4,children:[r.jsx(a,{...e,radius:"sm",children:r.jsx(t,{children:"Small"})}),r.jsx(a,{...e,radius:"default",children:r.jsx(t,{children:"Default"})}),r.jsx(a,{...e,radius:"lg",children:r.jsx(t,{children:"Large"})}),r.jsx(a,{...e,radius:"full",children:r.jsx(t,{children:"Full"})})]})};var d,n,l;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(l=(n=s.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var c,m,p;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => <Stack direction="row" gap={4}>\r
            <Card {...args} radius="sm"><CardTitle>Small</CardTitle></Card>\r
            <Card {...args} radius="default"><CardTitle>Default</CardTitle></Card>\r
            <Card {...args} radius="lg"><CardTitle>Large</CardTitle></Card>\r
            <Card {...args} radius="full"><CardTitle>Full</CardTitle></Card>\r
        </Stack>
}`,...(p=(m=o.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const q=["Default","Radii"];export{s as Default,o as Radii,q as __namedExportsOrder,O as default};
