import{j as r}from"./jsx-runtime-CDt2p4po.js";import{w as m,u}from"./index-D9g-7nFz.js";import{S as n}from"./school-search-input-DkZOwQ-1.js";import"./index-GiUgBvb1.js";import"./input-VO8katut.js";import"./utils-CytzSlOG.js";import"./createLucideIcon-DlCdiEX6.js";const g={title:"Components/Welcome/SchoolSearchInput",component:n,parameters:{layout:"centered",backgrounds:{default:"hive-dark",values:[{name:"hive-dark",value:"#0A0A0A"}]}},tags:["autodocs"],argTypes:{onSchoolSelect:{action:"selected",description:"Callback function when a school is selected from the list."},className:{control:"text"}}},t={render:e=>r.jsx("div",{style:{width:"384px"},children:r.jsx(n,{...e})})},a={render:e=>r.jsx("div",{style:{width:"384px"},children:r.jsx(n,{...e})}),play:async({canvasElement:e})=>{const p=await m(e).findByPlaceholderText("Search for your university...");await u.type(p,"NonExistent University",{delay:50})}};var s,o,c;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: args => <div style={{
    width: '384px'
  }}>\r
      <SchoolSearchInput {...args} />\r
    </div>
}`,...(c=(o=t.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var i,l,d;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => <div style={{
    width: '384px'
  }}>\r
      <SchoolSearchInput {...args} />\r
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText('Search for your university...');
    await userEvent.type(input, 'NonExistent University', {
      delay: 50
    });
  }
}`,...(d=(l=a.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const j=["Default","EmptyState"];export{t as Default,a as EmptyState,j as __namedExportsOrder,g as default};
