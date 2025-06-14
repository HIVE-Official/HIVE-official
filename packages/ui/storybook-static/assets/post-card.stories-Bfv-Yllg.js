import{j as t}from"./jsx-runtime-CDt2p4po.js";import{c as y}from"./createLucideIcon-DlCdiEX6.js";import"./index-GiUgBvb1.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=y("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);function w(a){const r=Math.floor((new Date().getTime()-a.getTime())/1e3);let e=r/31536e3;return e>1?Math.floor(e)+"y":(e=r/2592e3,e>1?Math.floor(e)+"m":(e=r/86400,e>1?Math.floor(e)+"d":(e=r/3600,e>1?Math.floor(e)+"h":(e=r/60,e>1?Math.floor(e)+"min":Math.floor(r)+"s"))))}function g({post:a,authorProfileUrl:r,currentUserId:e}){const j=a.createdAt.toDate?a.createdAt.toDate():new Date,v=e===a.authorId;return t.jsxs("div",{className:"flex space-x-4 rounded-lg bg-neutral-900 p-4",children:[t.jsx("a",{href:r,children:t.jsx("div",{className:"h-10 w-10 rounded-full bg-neutral-700 flex items-center justify-center text-white",children:a.author.name.charAt(0)})}),t.jsxs("div",{className:"flex-1",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[t.jsx("a",{href:r,className:"font-bold text-white hover:underline",children:a.author.name}),t.jsx("span",{className:"text-neutral-500",children:"·"}),t.jsx("span",{className:"text-neutral-500",children:w(j)})]}),v&&t.jsx("button",{className:"h-6 w-6",children:t.jsx(P,{className:"h-4 w-4"})})]}),t.jsx("p",{className:"mt-2 text-white/90",children:a.content})]})]})}g.__docgenInfo={description:"",methods:[],displayName:"PostCard",props:{post:{required:!0,tsType:{name:"z.infer",elements:[{name:"PostSchema"}],raw:"z.infer<typeof PostSchema>"},description:""},authorProfileUrl:{required:!0,tsType:{name:"string"},description:""},currentUserId:{required:!1,tsType:{name:"string"},description:""}}};const U={title:"Components/PostCard",component:g,parameters:{layout:"centered",backgrounds:{default:"hive",values:[{name:"hive",value:"#0a0a0a"}]}},tags:["autodocs"]},s={id:"post1",authorId:"user123",author:{name:"Jane Doe",avatarUrl:"https://i.pravatar.cc/150?u=janedoe"},spaceId:"space1",content:"Just attended the guest lecture on Quantum Computing, absolutely mind-blowing stuff! Anyone else catch it?",createdAt:new Date,updatedAt:new Date},o={args:{post:s,authorProfileUrl:`/u/${s.author.name}`}},n={args:{post:s,currentUserId:"user123",authorProfileUrl:`/u/${s.author.name}`}},c={args:{post:{...s,author:{name:"John Smith",avatarUrl:void 0}},authorProfileUrl:"/u/John%20Smith"}};var i,l,u;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    post: basePost,
    authorProfileUrl: \`/u/\${basePost.author.name}\`
  }
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var d,m,h;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    post: basePost,
    currentUserId: 'user123',
    authorProfileUrl: \`/u/\${basePost.author.name}\`
  }
}`,...(h=(m=n.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var p,f,x;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    post: {
      ...basePost,
      author: {
        name: 'John Smith',
        avatarUrl: undefined
      }
    },
    authorProfileUrl: '/u/John%20Smith'
  }
}`,...(x=(f=c.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};const D=["Default","AuthorView","NoAvatar"];export{n as AuthorView,o as Default,c as NoAvatar,D as __namedExportsOrder,U as default};
