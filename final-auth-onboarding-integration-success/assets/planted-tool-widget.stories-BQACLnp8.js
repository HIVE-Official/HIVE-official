import{j as t}from"./jsx-runtime-SKoiH9zj.js";import{P as b}from"./planted-tool-widget-BiC0jdwj.js";import{a as e}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-DJO9vBfz.js";import"./framer-motion-proxy-Bzlf7Pk2.js";import"./utils-CytzSlOG.js";import"./ellipsis-D7-MrO0F.js";import"./createLucideIcon-WpwZgzX-.js";import"./settings-GFIh7SpU.js";import"./message-square-BYWfq8X7.js";import"./play-D7e6preK.js";import"./trash-2-D4UgS-bT.js";import"./circle-alert-D_Mj0ODU.js";import"./calendar-BPdIbUwb.js";import"./bar-chart-3-CRKf5MQJ.js";import"./users-kvqvVsnf.js";import"./zap-0mfePDxG.js";import"./circle-check-big-DTzGNsHe.js";import"./v4-CtRu48qb.js";const Te={title:"HIVE/Tools/Molecules/PlantedToolWidget",component:b,parameters:{layout:"fullscreen",docs:{description:{component:"Displays planted tools in the Space Tool Grid with status indicators, configuration options, and usage statistics. Shows different states based on tool configuration and health."}}},argTypes:{variant:{control:{type:"select"},options:["default","compact","detailed"]},showStats:{control:{type:"boolean"}},showActions:{control:{type:"boolean"}}},tags:["autodocs"]},o={id:"event-management",name:"Event Management",description:"Create, manage, and track events with RSVP functionality and calendar integration",icon:"📅",category:"coordination",version:"2.1.0",isConfigured:!0,canConfigure:!0,canRemove:!0,canView:!0,hasRequiredSettings:!0,lastUsed:"2024-01-20T14:30:00Z",usageCount:15,outputs:3,interactions:47},c={args:{tool:{...o,status:"active"},onConfigure:e("configure"),onRemove:e("remove"),onToggleStatus:e("toggle-status"),onViewDetails:e("view-details"),onViewOutputs:e("view-outputs")}},d={args:{tool:{...o,status:"needs_setup",isConfigured:!1,hasRequiredSettings:!1,name:"Assignment Tracker",description:"Track assignments, due dates, and submission status",icon:"📝",category:"academic",usageCount:0,outputs:0,interactions:0,lastUsed:void 0},onConfigure:e("configure"),onRemove:e("remove"),onToggleStatus:e("toggle-status"),onViewDetails:e("view-details")},parameters:{docs:{description:{story:"Tool that has been planted but needs initial configuration before it can be used."}}}},l={args:{tool:{...o,status:"error",errorMessage:"Failed to connect to calendar API. Check your integration settings.",name:"Calendar Sync",description:"Sync events with external calendar services",icon:"🔄",category:"productivity"},onConfigure:e("configure"),onRemove:e("remove"),onToggleStatus:e("toggle-status"),onViewDetails:e("view-details")},parameters:{docs:{description:{story:"Tool in error state showing error message and fix action."}}}},u={args:{tool:{...o,status:"configured",name:"Poll Creator",description:"Create polls and surveys for community decision making",icon:"📊",category:"social",usageCount:0,outputs:0,interactions:0,lastUsed:void 0},onConfigure:e("configure"),onRemove:e("remove"),onToggleStatus:e("toggle-status"),onViewDetails:e("view-details")},parameters:{docs:{description:{story:"Tool that is configured but not yet activated."}}}},m={args:{tool:{...o,status:"disabled",name:"Study Timer",description:"Pomodoro-style timer for focused study sessions",icon:"⏰",category:"productivity",usageCount:28,outputs:12,interactions:95,lastUsed:"2024-01-18T10:15:00Z"},onConfigure:e("configure"),onRemove:e("remove"),onToggleStatus:e("toggle-status"),onViewDetails:e("view-details"),onViewOutputs:e("view-outputs")},parameters:{docs:{description:{story:"Tool that has been temporarily disabled but retains its configuration and history."}}}},g={args:{tool:{...o,status:"active"},variant:"compact",onConfigure:e("configure"),onViewDetails:e("view-details")},parameters:{docs:{description:{story:"Compact variant suitable for dense layouts or mobile views."}}}},p={args:{tool:{...o,status:"active",name:"Group Chat",description:"Real-time messaging and coordination for space members",icon:"💬",category:"social",usageCount:247,outputs:156,interactions:1893,lastUsed:"2024-01-20T16:45:00Z"},onConfigure:e("configure"),onRemove:e("remove"),onToggleStatus:e("toggle-status"),onViewDetails:e("view-details"),onViewOutputs:e("view-outputs")},parameters:{docs:{description:{story:"Highly used tool showing significant engagement statistics."}}}},v={args:{tool:{...o,status:"active",canConfigure:!1,canRemove:!1,canView:!0},onViewDetails:e("view-details"),onViewOutputs:e("view-outputs")},parameters:{docs:{description:{story:"Tool viewed by a regular member with limited permissions (no configure/remove actions)."}}}},y={render:()=>{const n=[{...o,id:"productivity-tool",name:"Task Manager",icon:"✅",category:"productivity",status:"active"},{...o,id:"social-tool",name:"Icebreaker",icon:"🎉",category:"social",status:"configured"},{...o,id:"academic-tool",name:"Grade Tracker",icon:"📈",category:"academic",status:"needs_setup"},{...o,id:"coordination-tool",name:"Meeting Scheduler",icon:"🗓️",category:"coordination",status:"active"}];return t.jsx("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:t.jsxs("div",{className:"max-w-4xl mx-auto",children:[t.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-6",children:"Tool Categories"}),t.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:n.map(a=>t.jsx(b,{tool:a,onConfigure:e("configure"),onRemove:e("remove"),onToggleStatus:e("toggle-status"),onViewDetails:e("view-details"),onViewOutputs:e("view-outputs")},a.id))})]})})},parameters:{docs:{description:{story:"Showcase of all tool categories with different statuses."}}}},f={render:()=>{const n=[{...o,status:"active"},{...o,id:"assignment-tracker",name:"Assignment Tracker",icon:"📝",category:"academic",status:"needs_setup",isConfigured:!1,usageCount:0,outputs:0,interactions:0,lastUsed:void 0},{...o,id:"poll-creator",name:"Poll Creator",icon:"📊",category:"social",status:"configured",usageCount:0,outputs:0,interactions:0,lastUsed:void 0},{...o,id:"laundry-tracker",name:"Laundry Tracker",icon:"👕",category:"coordination",status:"active",usageCount:67,outputs:23,interactions:156,lastUsed:"2024-01-20T12:30:00Z"}];return t.jsx("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:t.jsxs("div",{className:"max-w-2xl mx-auto",children:[t.jsxs("div",{className:"mb-6",children:[t.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-2",children:"Space Tools"}),t.jsx("p",{className:"text-[var(--hive-text-secondary)]",children:"Manage your planted tools and their configurations"})]}),t.jsx("div",{className:"space-y-4",children:n.map(a=>t.jsx(b,{tool:a,onConfigure:e("configure"),onRemove:e("remove"),onToggleStatus:e("toggle-status"),onViewDetails:e("view-details"),onViewOutputs:e("view-outputs")},a.id))}),t.jsxs("div",{className:"mt-6 p-4 border-2 border-dashed border-[var(--hive-border-primary)]/30 rounded-2xl text-center hover:border-[var(--hive-brand-primary)]/50 hover:bg-[var(--hive-brand-primary)]/5 transition-all duration-300 cursor-pointer",children:[t.jsx("div",{className:"w-12 h-12 mx-auto mb-2 rounded-xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 flex items-center justify-center",children:t.jsx("span",{className:"text-2xl",children:"➕"})}),t.jsx("h3",{className:"font-medium text-[var(--hive-text-primary)] mb-1",children:"Plant New Tool"}),t.jsx("p",{className:"text-sm text-[var(--hive-text-secondary)]",children:"Add functionality to your space"})]})]})})},parameters:{docs:{description:{story:"Complete tool grid layout as it would appear in a space dashboard."}}}},h={render:()=>{const[n,a]=React.useState([{...o,status:"active"},{...o,id:"poll-creator",name:"Poll Creator",icon:"📊",category:"social",status:"configured",usageCount:0,outputs:0,interactions:0,lastUsed:void 0}]),ee=async(s,r)=>{await new Promise(i=>setTimeout(i,1e3)),a(i=>i.map(w=>w.id===s?{...w,status:r?"active":"disabled"}:w)),e("toggle-status")(s,r)},te=s=>{a(r=>r.filter(i=>i.id!==s)),e("remove")(s)};return t.jsx("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:t.jsxs("div",{className:"max-w-3xl mx-auto",children:[t.jsx("h2",{className:"text-2xl font-bold text-[var(--hive-text-primary)] mb-6",children:"Interactive Tool Management"}),t.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:n.map(s=>t.jsx(b,{tool:s,onConfigure:e("configure"),onRemove:te,onToggleStatus:ee,onViewDetails:e("view-details"),onViewOutputs:e("view-outputs")},s.id))})]})})},parameters:{docs:{description:{story:"Fully interactive demo with live state updates for tool management actions."}}}};var T,x,C;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'active'
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs')
  }
}`,...(C=(x=c.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var S,N,V;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'needs_setup',
      isConfigured: false,
      hasRequiredSettings: false,
      name: 'Assignment Tracker',
      description: 'Track assignments, due dates, and submission status',
      icon: '📝',
      category: 'academic',
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool that has been planted but needs initial configuration before it can be used.'
      }
    }
  }
}`,...(V=(N=d.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var k,R,D;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'error',
      errorMessage: 'Failed to connect to calendar API. Check your integration settings.',
      name: 'Calendar Sync',
      description: 'Sync events with external calendar services',
      icon: '🔄',
      category: 'productivity'
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool in error state showing error message and fix action.'
      }
    }
  }
}`,...(D=(R=l.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var P,j,U;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'configured',
      name: 'Poll Creator',
      description: 'Create polls and surveys for community decision making',
      icon: '📊',
      category: 'social',
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool that is configured but not yet activated.'
      }
    }
  }
}`,...(U=(j=u.parameters)==null?void 0:j.docs)==null?void 0:U.source}}};var A,O,I;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'disabled',
      name: 'Study Timer',
      description: 'Pomodoro-style timer for focused study sessions',
      icon: '⏰',
      category: 'productivity',
      usageCount: 28,
      outputs: 12,
      interactions: 95,
      lastUsed: '2024-01-18T10:15:00Z'
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool that has been temporarily disabled but retains its configuration and history.'
      }
    }
  }
}`,...(I=(O=m.parameters)==null?void 0:O.docs)==null?void 0:I.source}}};var M,_,G;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'active'
    },
    variant: 'compact',
    onConfigure: action('configure'),
    onViewDetails: action('view-details')
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant suitable for dense layouts or mobile views.'
      }
    }
  }
}`,...(G=(_=g.parameters)==null?void 0:_.docs)==null?void 0:G.source}}};var Z,E,H;p.parameters={...p.parameters,docs:{...(Z=p.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'active',
      name: 'Group Chat',
      description: 'Real-time messaging and coordination for space members',
      icon: '💬',
      category: 'social',
      usageCount: 247,
      outputs: 156,
      interactions: 1893,
      lastUsed: '2024-01-20T16:45:00Z'
    },
    onConfigure: action('configure'),
    onRemove: action('remove'),
    onToggleStatus: action('toggle-status'),
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs')
  },
  parameters: {
    docs: {
      description: {
        story: 'Highly used tool showing significant engagement statistics.'
      }
    }
  }
}`,...(H=(E=p.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var W,F,L;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    tool: {
      ...baseTool,
      status: 'active',
      canConfigure: false,
      canRemove: false,
      canView: true
    },
    onViewDetails: action('view-details'),
    onViewOutputs: action('view-outputs')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool viewed by a regular member with limited permissions (no configure/remove actions).'
      }
    }
  }
}`,...(L=(F=v.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var q,B,z;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    const tools: PlantedTool[] = [{
      ...baseTool,
      id: 'productivity-tool',
      name: 'Task Manager',
      icon: '✅',
      category: 'productivity',
      status: 'active'
    }, {
      ...baseTool,
      id: 'social-tool',
      name: 'Icebreaker',
      icon: '🎉',
      category: 'social',
      status: 'configured'
    }, {
      ...baseTool,
      id: 'academic-tool',
      name: 'Grade Tracker',
      icon: '📈',
      category: 'academic',
      status: 'needs_setup'
    }, {
      ...baseTool,
      id: 'coordination-tool',
      name: 'Meeting Scheduler',
      icon: '🗓️',
      category: 'coordination',
      status: 'active'
    }];
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-6">
            Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map(tool => <PlantedToolWidget key={tool.id} tool={tool} onConfigure={action('configure')} onRemove={action('remove')} onToggleStatus={action('toggle-status')} onViewDetails={action('view-details')} onViewOutputs={action('view-outputs')} />)}
          </div>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all tool categories with different statuses.'
      }
    }
  }
}`,...(z=(B=y.parameters)==null?void 0:B.docs)==null?void 0:z.source}}};var J,K,Q;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => {
    const tools: PlantedTool[] = [{
      ...baseTool,
      status: 'active'
    }, {
      ...baseTool,
      id: 'assignment-tracker',
      name: 'Assignment Tracker',
      icon: '📝',
      category: 'academic',
      status: 'needs_setup',
      isConfigured: false,
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined
    }, {
      ...baseTool,
      id: 'poll-creator',
      name: 'Poll Creator',
      icon: '📊',
      category: 'social',
      status: 'configured',
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined
    }, {
      ...baseTool,
      id: 'laundry-tracker',
      name: 'Laundry Tracker',
      icon: '👕',
      category: 'coordination',
      status: 'active',
      usageCount: 67,
      outputs: 23,
      interactions: 156,
      lastUsed: '2024-01-20T12:30:00Z'
    }];
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
              Space Tools
            </h2>
            <p className="text-[var(--hive-text-secondary)]">
              Manage your planted tools and their configurations
            </p>
          </div>
          
          <div className="space-y-4">
            {tools.map(tool => <PlantedToolWidget key={tool.id} tool={tool} onConfigure={action('configure')} onRemove={action('remove')} onToggleStatus={action('toggle-status')} onViewDetails={action('view-details')} onViewOutputs={action('view-outputs')} />)}
          </div>
          
          {/* Add New Tool Button */}
          <div className="mt-6 p-4 border-2 border-dashed border-[var(--hive-border-primary)]/30 rounded-2xl text-center hover:border-[var(--hive-brand-primary)]/50 hover:bg-[var(--hive-brand-primary)]/5 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 flex items-center justify-center">
              <span className="text-2xl">➕</span>
            </div>
            <h3 className="font-medium text-[var(--hive-text-primary)] mb-1">
              Plant New Tool
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Add functionality to your space
            </p>
          </div>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete tool grid layout as it would appear in a space dashboard.'
      }
    }
  }
}`,...(Q=(K=f.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Y,$;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => {
    const [tools, setTools] = React.useState<PlantedTool[]>([{
      ...baseTool,
      status: 'active'
    }, {
      ...baseTool,
      id: 'poll-creator',
      name: 'Poll Creator',
      icon: '📊',
      category: 'social',
      status: 'configured',
      usageCount: 0,
      outputs: 0,
      interactions: 0,
      lastUsed: undefined
    }]);
    const handleToggleStatus = async (toolId: string, activate: boolean) => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setTools(prevTools => prevTools.map(tool => {
        if (tool.id === toolId) {
          return {
            ...tool,
            status: activate ? 'active' : 'disabled'
          };
        }
        return tool;
      }));
      action('toggle-status')(toolId, activate);
    };
    const handleRemoveTool = (toolId: string) => {
      setTools(prevTools => prevTools.filter(tool => tool.id !== toolId));
      action('remove')(toolId);
    };
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-6">
            Interactive Tool Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map(tool => <PlantedToolWidget key={tool.id} tool={tool} onConfigure={action('configure')} onRemove={handleRemoveTool} onToggleStatus={handleToggleStatus} onViewDetails={action('view-details')} onViewOutputs={action('view-outputs')} />)}
          </div>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with live state updates for tool management actions.'
      }
    }
  }
}`,...($=(Y=h.parameters)==null?void 0:Y.docs)==null?void 0:$.source}}};const xe=["Active","NeedsSetup","ErrorState","Configured","Disabled","CompactVariant","HighUsage","LimitedPermissions","AllCategories","ToolGrid","InteractiveDemo"];export{c as Active,y as AllCategories,g as CompactVariant,u as Configured,m as Disabled,l as ErrorState,p as HighUsage,h as InteractiveDemo,v as LimitedPermissions,d as NeedsSetup,f as ToolGrid,xe as __namedExportsOrder,Te as default};
