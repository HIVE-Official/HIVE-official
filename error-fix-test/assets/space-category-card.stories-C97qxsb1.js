import{j as t}from"./jsx-runtime-B9GTzLod.js";import{S as a,a as F}from"./space-category-card-lBWfrcFg.js";import{a as e}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-BMjrbHXN.js";import"./framer-motion-proxy-Bip1EXUU.js";import"./utils-CytzSlOG.js";import"./arrow-right-CLTrdEkf.js";import"./createLucideIcon-DtX30ipI.js";import"./star-q8LOEa9p.js";import"./users-B5XgMSov.js";import"./house-Bg02DBcS.js";import"./graduation-cap-CjRbfMsL.js";import"./v4-CtRu48qb.js";const Y={title:"HIVE/Spaces/Atoms/SpaceCategoryCard",component:a,parameters:{layout:"centered",docs:{description:{component:"Category launch cards for the four main space types in HIVE. These cards serve as the entry points in the Space Discovery hub, allowing users to browse specific types of spaces."}}},argTypes:{variant:{control:{type:"select"},options:["default","featured"],description:"Visual variant of the card"},onClick:{action:"clicked"}},tags:["autodocs"]},r=(_,z)=>({...F[_],count:z}),o={args:{category:r("university",247),onClick:e("university-clicked")}},c={args:{category:r("residential",89),onClick:e("residential-clicked")}},s={args:{category:r("greek",34),onClick:e("greek-clicked")}},i={args:{category:r("student",156),onClick:e("student-clicked")}},n={args:{category:r("university",247),variant:"featured",onClick:e("featured-clicked")}},d={render:()=>t.jsxs("div",{className:"grid grid-cols-2 gap-6 max-w-4xl",children:[t.jsx(a,{category:r("university",247),onClick:e("university-clicked")}),t.jsx(a,{category:r("residential",89),onClick:e("residential-clicked")}),t.jsx(a,{category:r("greek",34),onClick:e("greek-clicked")}),t.jsx(a,{category:r("student",156),onClick:e("student-clicked")})]}),parameters:{docs:{description:{story:"Interactive grid showing all four space category types as they would appear in the Space Discovery hub."}}}},p={args:{category:r("greek",0),onClick:e("empty-category-clicked")},parameters:{docs:{description:{story:"Category card with zero spaces - useful for schools that might not have certain space types."}}}},g={args:{category:r("university",1247),onClick:e("large-count-clicked")},parameters:{docs:{description:{story:"Category card with large space counts - tests number formatting."}}}};var l,u,y;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    category: createCategoryWithCount('university', 247),
    onClick: action('university-clicked')
  }
}`,...(y=(u=o.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var m,C,k;c.parameters={...c.parameters,docs:{...(m=c.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    category: createCategoryWithCount('residential', 89),
    onClick: action('residential-clicked')
  }
}`,...(k=(C=c.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var h,v,S;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    category: createCategoryWithCount('greek', 34),
    onClick: action('greek-clicked')
  }
}`,...(S=(v=s.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var f,x,w;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    category: createCategoryWithCount('student', 156),
    onClick: action('student-clicked')
  }
}`,...(w=(x=i.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var W,b,j;n.parameters={...n.parameters,docs:{...(W=n.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    category: createCategoryWithCount('university', 247),
    variant: 'featured',
    onClick: action('featured-clicked')
  }
}`,...(j=(b=n.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};var E,I,N;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-6 max-w-4xl">
      <SpaceCategoryCard category={createCategoryWithCount('university', 247)} onClick={action('university-clicked')} />
      <SpaceCategoryCard category={createCategoryWithCount('residential', 89)} onClick={action('residential-clicked')} />
      <SpaceCategoryCard category={createCategoryWithCount('greek', 34)} onClick={action('greek-clicked')} />
      <SpaceCategoryCard category={createCategoryWithCount('student', 156)} onClick={action('student-clicked')} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Interactive grid showing all four space category types as they would appear in the Space Discovery hub.'
      }
    }
  }
}`,...(N=(I=d.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var R,A,D;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    category: createCategoryWithCount('greek', 0),
    onClick: action('empty-category-clicked')
  },
  parameters: {
    docs: {
      description: {
        story: 'Category card with zero spaces - useful for schools that might not have certain space types.'
      }
    }
  }
}`,...(D=(A=p.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var G,T,V;g.parameters={...g.parameters,docs:{...(G=g.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    category: createCategoryWithCount('university', 1247),
    onClick: action('large-count-clicked')
  },
  parameters: {
    docs: {
      description: {
        story: 'Category card with large space counts - tests number formatting.'
      }
    }
  }
}`,...(V=(T=g.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};const $=["University","Residential","Greek","Student","Featured","Interactive","ZeroSpaces","LargeNumbers"];export{n as Featured,s as Greek,d as Interactive,g as LargeNumbers,c as Residential,i as Student,o as University,p as ZeroSpaces,$ as __namedExportsOrder,Y as default};
