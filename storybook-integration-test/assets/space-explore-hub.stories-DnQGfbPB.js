import{j as e}from"./jsx-runtime-SKoiH9zj.js";import{R as X}from"./index-DJO9vBfz.js";import{m as n}from"./framer-motion-proxy-Bzlf7Pk2.js";import{c as o}from"./utils-CytzSlOG.js";import{a as Y,S as Z}from"./space-category-card-C5kuzCLZ.js";import{S as ee}from"./search-LJgCGvxp.js";import{F as te}from"./filter-Vq4m1Bj7.js";import{T as w}from"./trending-up-CllCr3lL.js";import{C as re}from"./clock-Boexj8FH.js";import{a as t}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./arrow-right-I_lJ0Vaq.js";import"./createLucideIcon-WpwZgzX-.js";import"./star-DcfUHeTk.js";import"./users-kvqvVsnf.js";import"./house-C4nS1CaC.js";import"./graduation-cap-P9WXVP08.js";import"./v4-CtRu48qb.js";const b=({stats:s,categories:x,onCategoryClick:a,onSearch:i,onShowFilters:f,searchQuery:V="",isLoading:B=!1,className:S})=>{const[k,P]=X.useState(V),U=r=>{r.preventDefault(),i==null||i(k)},J=r=>{P(r.target.value)};return B?e.jsxs("div",{className:o("space-y-8",S),children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"h-12 bg-[var(--hive-background-secondary)]/50 rounded-2xl animate-pulse"}),e.jsx("div",{className:"h-6 bg-[var(--hive-background-secondary)]/30 rounded-xl animate-pulse max-w-md"})]}),e.jsx("div",{className:"h-14 bg-[var(--hive-background-secondary)]/50 rounded-2xl animate-pulse"}),e.jsx("div",{className:"grid grid-cols-4 gap-4",children:[...Array(4)].map((r,c)=>e.jsx("div",{className:"h-24 bg-[var(--hive-background-secondary)]/50 rounded-2xl animate-pulse"},c))}),e.jsx("div",{className:"grid grid-cols-2 gap-6",children:[...Array(4)].map((r,c)=>e.jsx("div",{className:"h-40 bg-[var(--hive-background-secondary)]/50 rounded-2xl animate-pulse"},c))})]}):e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.23,1,.32,1]},className:o("space-y-8",S),children:[e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx(n.h1,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.1},className:"text-4xl font-bold text-[var(--hive-text-primary)] tracking-tight",children:"Explore Campus Spaces"}),e.jsx(n.p,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.2},className:"text-lg text-[var(--hive-text-secondary)] max-w-2xl mx-auto leading-relaxed",children:"Discover and join communities that match your interests, academic goals, and campus life"})]}),e.jsx(n.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.3},children:e.jsx("form",{onSubmit:U,className:"relative max-w-2xl mx-auto",children:e.jsxs("div",{className:"relative",children:[e.jsx(ee,{className:"absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--hive-text-muted)]"}),e.jsx("input",{type:"text",value:k,onChange:J,placeholder:"Search for spaces, courses, organizations...",className:o("w-full pl-12 pr-16 py-4 rounded-2xl border transition-all duration-300","bg-[var(--hive-background-secondary)]/80 backdrop-blur-xl","border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50","text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)]","focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-[var(--hive-brand-primary)]/10")}),f&&e.jsx("button",{type:"button",onClick:f,className:o("absolute right-3 top-1/2 transform -translate-y-1/2","w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-200","text-[var(--hive-text-muted)] hover:text-[var(--hive-brand-primary)]","hover:bg-[var(--hive-background-primary)]/50"),children:e.jsx(te,{className:"w-4 h-4"})})]})})}),e.jsxs(n.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.4},className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[e.jsxs("div",{className:"bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl border border-[var(--hive-border-primary)]/20 rounded-2xl p-6 text-center",children:[e.jsx("div",{className:"text-2xl font-bold text-[var(--hive-brand-primary)] mb-1",children:s.totalSpaces.toLocaleString()}),e.jsx("div",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Total Spaces"})]}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl border border-[var(--hive-border-primary)]/20 rounded-2xl p-6 text-center",children:[e.jsx("div",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-1",children:s.totalMembers.toLocaleString()}),e.jsx("div",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Active Members"})]}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl border border-[var(--hive-border-primary)]/20 rounded-2xl p-6 text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1 text-2xl font-bold text-[var(--hive-status-success)] mb-1",children:[e.jsx(w,{className:"w-5 h-5"}),s.activeToday.toLocaleString()]}),e.jsx("div",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Active Today"})]}),e.jsxs("div",{className:"bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl border border-[var(--hive-border-primary)]/20 rounded-2xl p-6 text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1 text-2xl font-bold text-[var(--hive-brand-secondary)] mb-1",children:[e.jsx(re,{className:"w-5 h-5"}),s.newThisWeek.toLocaleString()]}),e.jsx("div",{className:"text-sm text-[var(--hive-text-secondary)]",children:"New This Week"})]})]}),e.jsxs(n.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.5,duration:.8},children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Browse by Category"}),e.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Find spaces that match your campus experience"})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:x.map((r,c)=>{const K={...Y[r.type],count:r.count};return e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.6+c*.1,duration:.5,ease:[.23,1,.32,1]},className:"relative",children:[r.trending&&e.jsx("div",{className:"absolute -top-2 -right-2 z-20 bg-[var(--hive-status-warning)]/20 backdrop-blur-xl border border-[var(--hive-status-warning)]/40 rounded-full px-3 py-1",children:e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(w,{className:"w-3 h-3 text-[var(--hive-status-warning)]"}),e.jsx("span",{className:"text-xs font-bold text-[var(--hive-status-warning)]",children:"Trending"})]})}),e.jsx(Z,{category:K,onClick:a})]},r.type)})})]}),e.jsxs(n.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.8},className:"text-center pt-4",children:[e.jsx("p",{className:"text-sm text-[var(--hive-text-muted)] mb-4",children:"Can't find what you're looking for?"}),e.jsxs("div",{className:"flex justify-center gap-4",children:[e.jsx("button",{onClick:()=>i==null?void 0:i(""),className:o("px-6 py-3 rounded-2xl border transition-all duration-300","bg-[var(--hive-background-secondary)]/60 border-[var(--hive-border-primary)]/30","text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)]","hover:border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/5"),children:"Browse All Spaces"}),e.jsx("button",{onClick:f,className:o("px-6 py-3 rounded-2xl border transition-all duration-300","bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]/30","text-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/20","hover:border-[var(--hive-brand-primary)]/50"),children:"Advanced Filters"})]})]})]})};b.__docgenInfo={description:"",methods:[],displayName:"SpaceExploreHub",props:{stats:{required:!0,tsType:{name:"SpaceExploreStats"},description:""},categories:{required:!0,tsType:{name:"Array",elements:[{name:"SpaceCategoryStats"}],raw:"SpaceCategoryStats[]"},description:""},onCategoryClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(type: SpaceCategoryType) => void",signature:{arguments:[{type:{name:"union",raw:"'university' | 'residential' | 'greek' | 'student'",elements:[{name:"literal",value:"'university'"},{name:"literal",value:"'residential'"},{name:"literal",value:"'greek'"},{name:"literal",value:"'student'"}]},name:"type"}],return:{name:"void"}}},description:""},onSearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(query: string) => void",signature:{arguments:[{type:{name:"string"},name:"query"}],return:{name:"void"}}},description:""},onShowFilters:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},searchQuery:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const be={title:"HIVE/Spaces/Organisms/SpaceExploreHub",component:b,parameters:{layout:"fullscreen",docs:{description:{component:"The main Space Discovery hub that serves as the entry point for exploring campus spaces. Features category cards, search functionality, and platform statistics."}}},argTypes:{onCategoryClick:{action:"category-clicked"},onSearch:{action:"search-performed"},onShowFilters:{action:"filters-opened"}},tags:["autodocs"]},h={totalSpaces:526,totalMembers:8432,activeToday:347,newThisWeek:23},v=[{type:"university",count:247,trending:!0,recentActivity:89},{type:"residential",count:89,trending:!1,recentActivity:45},{type:"greek",count:34,trending:!0,recentActivity:23},{type:"student",count:156,trending:!1,recentActivity:67}],d={args:{stats:h,categories:v,onCategoryClick:t("category-clicked"),onSearch:t("search-performed"),onShowFilters:t("filters-opened")}},l={args:{stats:h,categories:v,searchQuery:"Computer Science",onCategoryClick:t("category-clicked"),onSearch:t("search-performed"),onShowFilters:t("filters-opened")},parameters:{docs:{description:{story:"Hub with a pre-filled search query, useful for showing search state."}}}},p={args:{stats:{totalSpaces:127,totalMembers:2341,activeToday:89,newThisWeek:8},categories:[{type:"university",count:67,trending:!1,recentActivity:23},{type:"residential",count:23,trending:!0,recentActivity:12},{type:"greek",count:8,trending:!1,recentActivity:3},{type:"student",count:29,trending:!1,recentActivity:15}],onCategoryClick:t("category-clicked"),onSearch:t("search-performed"),onShowFilters:t("filters-opened")},parameters:{docs:{description:{story:"Hub configuration for a smaller campus with fewer spaces and members."}}}},u={args:{stats:{totalSpaces:1247,totalMembers:28567,activeToday:1893,newThisWeek:67},categories:[{type:"university",count:689,trending:!0,recentActivity:234},{type:"residential",count:156,trending:!1,recentActivity:89},{type:"greek",count:89,trending:!0,recentActivity:45},{type:"student",count:313,trending:!1,recentActivity:134}],onCategoryClick:t("category-clicked"),onSearch:t("search-performed"),onShowFilters:t("filters-opened")},parameters:{docs:{description:{story:"Hub configuration for a large campus with many spaces and high activity."}}}},m={args:{stats:{totalSpaces:423,totalMembers:6789,activeToday:289,newThisWeek:19},categories:[{type:"university",count:198,trending:!0,recentActivity:67},{type:"residential",count:78,trending:!1,recentActivity:34},{type:"greek",count:0,trending:!1,recentActivity:0},{type:"student",count:147,trending:!1,recentActivity:56}],onCategoryClick:t("category-clicked"),onSearch:t("search-performed"),onShowFilters:t("filters-opened")},parameters:{docs:{description:{story:"Hub for a campus without Greek life organizations."}}}},y={args:{stats:h,categories:v,isLoading:!0,onCategoryClick:t("category-clicked"),onSearch:t("search-performed"),onShowFilters:t("filters-opened")},parameters:{docs:{description:{story:"Loading state with skeleton placeholders."}}}},g={render:()=>{const[s,x]=React.useState("");return e.jsx("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:e.jsx(b,{stats:h,categories:v,searchQuery:s,onCategoryClick:a=>{t("category-clicked")(a),console.log(`Navigating to ${a} spaces`)},onSearch:a=>{t("search-performed")(a),x(a),console.log(`Searching for: ${a}`)},onShowFilters:t("filters-opened")})})},parameters:{docs:{description:{story:"Fully interactive demo with state management for search functionality."}}}};var C,j,N;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    stats: defaultStats,
    categories: defaultCategories,
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened')
  }
}`,...(N=(j=d.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var A,T,F;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    stats: defaultStats,
    categories: defaultCategories,
    searchQuery: 'Computer Science',
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened')
  },
  parameters: {
    docs: {
      description: {
        story: 'Hub with a pre-filled search query, useful for showing search state.'
      }
    }
  }
}`,...(F=(T=l.parameters)==null?void 0:T.docs)==null?void 0:F.source}}};var L,q,Q;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    stats: {
      totalSpaces: 127,
      totalMembers: 2341,
      activeToday: 89,
      newThisWeek: 8
    },
    categories: [{
      type: 'university' as const,
      count: 67,
      trending: false,
      recentActivity: 23
    }, {
      type: 'residential' as const,
      count: 23,
      trending: true,
      recentActivity: 12
    }, {
      type: 'greek' as const,
      count: 8,
      trending: false,
      recentActivity: 3
    }, {
      type: 'student' as const,
      count: 29,
      trending: false,
      recentActivity: 15
    }],
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened')
  },
  parameters: {
    docs: {
      description: {
        story: 'Hub configuration for a smaller campus with fewer spaces and members.'
      }
    }
  }
}`,...(Q=(q=p.parameters)==null?void 0:q.docs)==null?void 0:Q.source}}};var H,E,W;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    stats: {
      totalSpaces: 1247,
      totalMembers: 28567,
      activeToday: 1893,
      newThisWeek: 67
    },
    categories: [{
      type: 'university' as const,
      count: 689,
      trending: true,
      recentActivity: 234
    }, {
      type: 'residential' as const,
      count: 156,
      trending: false,
      recentActivity: 89
    }, {
      type: 'greek' as const,
      count: 89,
      trending: true,
      recentActivity: 45
    }, {
      type: 'student' as const,
      count: 313,
      trending: false,
      recentActivity: 134
    }],
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened')
  },
  parameters: {
    docs: {
      description: {
        story: 'Hub configuration for a large campus with many spaces and high activity.'
      }
    }
  }
}`,...(W=(E=u.parameters)==null?void 0:E.docs)==null?void 0:W.source}}};var M,D,_;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    stats: {
      totalSpaces: 423,
      totalMembers: 6789,
      activeToday: 289,
      newThisWeek: 19
    },
    categories: [{
      type: 'university' as const,
      count: 198,
      trending: true,
      recentActivity: 67
    }, {
      type: 'residential' as const,
      count: 78,
      trending: false,
      recentActivity: 34
    }, {
      type: 'greek' as const,
      count: 0,
      trending: false,
      recentActivity: 0
    }, {
      type: 'student' as const,
      count: 147,
      trending: false,
      recentActivity: 56
    }],
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened')
  },
  parameters: {
    docs: {
      description: {
        story: 'Hub for a campus without Greek life organizations.'
      }
    }
  }
}`,...(_=(D=m.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};var R,G,I;y.parameters={...y.parameters,docs:{...(R=y.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    stats: defaultStats,
    categories: defaultCategories,
    isLoading: true,
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened')
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with skeleton placeholders.'
      }
    }
  }
}`,...(I=(G=y.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};var $,z,O;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <SpaceExploreHub stats={defaultStats} categories={defaultCategories} searchQuery={searchQuery} onCategoryClick={type => {
        action('category-clicked')(type);
        console.log(\`Navigating to \${type} spaces\`);
      }} onSearch={query => {
        action('search-performed')(query);
        setSearchQuery(query);
        console.log(\`Searching for: \${query}\`);
      }} onShowFilters={action('filters-opened')} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with state management for search functionality.'
      }
    }
  }
}`,...(O=(z=g.parameters)==null?void 0:z.docs)==null?void 0:O.source}}};const Se=["Default","WithSearchQuery","SmallCampus","LargeCampus","NoGreekLife","Loading","InteractiveDemo"];export{d as Default,g as InteractiveDemo,u as LargeCampus,y as Loading,m as NoGreekLife,p as SmallCampus,l as WithSearchQuery,Se as __namedExportsOrder,be as default};
