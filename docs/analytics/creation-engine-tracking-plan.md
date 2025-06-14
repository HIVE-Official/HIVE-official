# Creation Engine Analytics Tracking Plan

## Overview

This document defines the analytics tracking plan for HIVE's Creation Engine, covering all events related to tool creation, element manipulation, and builder sessions. The tracking plan follows the decisions made in **T3-EF-D3-01** and implements server-side anonymization for privacy.

## Event Categories

### 1. Tool-Level Events

#### `tool_created`
**Purpose:** Track when a new tool is created  
**Trigger:** When a user successfully creates and saves a new tool  

```typescript
{
  event: 'tool_created',
  userId: string,
  sessionId: string,
  timestamp: number,
  builderAnalyticsEnabled: boolean,
  properties: {
    toolId: string,
    toolName: string,
    initialElementCount: number,
    createdFromTemplate: boolean,
    templateId?: string
  }
}
```

#### `tool_updated`
**Purpose:** Track tool modifications and versioning  
**Trigger:** When a tool is saved with changes  

```typescript
{
  event: 'tool_updated',
  properties: {
    toolId: string,
    toolName: string,
    previousVersion: string,
    newVersion: string,
    versionType: 'major' | 'minor' | 'patch',
    elementCount: number,
    changeType: 'element_added' | 'element_removed' | 'element_configured' | 'tool_renamed' | 'tool_description_updated'
  }
}
```

#### `tool_forked`
**Purpose:** Track when tools are forked for customization  
**Trigger:** When a user creates a copy of an existing tool  

```typescript
{
  event: 'tool_forked',
  properties: {
    originalToolId: string,
    newToolId: string,
    originalToolName: string,
    newToolName: string,
    originalOwnerId: string,
    elementCount: number
  }
}
```

#### `tool_placed_in_space`
**Purpose:** Track tool installations in spaces  
**Trigger:** When a tool is installed/deployed to a space  

```typescript
{
  event: 'tool_placed_in_space',
  properties: {
    toolId: string,
    toolName: string,
    toolVersion: string,
    spaceId: string,
    spaceName: string,
    spaceType: string,
    placementMethod: 'direct_install' | 'forked_install' | 'template_install'
  }
}
```

### 2. Element-Level Events (Atomic Actions)

#### `element_used`
**Purpose:** Track when elements are first added to tools  
**Trigger:** When an element is successfully added to the canvas (first commit)  

```typescript
{
  event: 'element_used',
  properties: {
    toolId: string,
    elementId: string,
    elementType: string,
    elementCategory: 'Display & Layout' | 'Inputs & Choices' | 'Logic & Dynamics',
    positionInTool: number,
    addedFromPicker: boolean
  }
}
```

#### `element_configured`
**Purpose:** Track element configuration changes  
**Trigger:** When element properties are modified  

```typescript
{
  event: 'element_configured',
  properties: {
    toolId: string,
    elementId: string,
    elementType: string,
    configurationField: string,
    previousValue?: unknown,
    newValue: unknown,
    configurationMethod: 'manual_input' | 'preset_selected' | 'drag_resize'
  }
}
```

#### `element_deleted`
**Purpose:** Track element removal from tools  
**Trigger:** When an element is removed from the canvas  

```typescript
{
  event: 'element_deleted',
  properties: {
    toolId: string,
    elementId: string,
    elementType: string,
    elementCategory: 'Display & Layout' | 'Inputs & Choices' | 'Logic & Dynamics',
    positionInTool: number,
    timeInTool: number // milliseconds
  }
}
```

### 3. Builder Session Events (Journey Analytics)

#### `builder_session_started`
**Purpose:** Track builder session initiation  
**Trigger:** When a user enters the tool builder interface  

```typescript
{
  event: 'builder_session_started',
  properties: {
    toolId?: string, // undefined for new tool creation
    sessionType: 'new_tool' | 'edit_existing' | 'fork_tool',
    entryPoint: 'profile_tools' | 'space_builder' | 'direct_link' | 'template_gallery'
  }
}
```

#### `builder_session_ended`
**Purpose:** Track builder session completion and outcomes  
**Trigger:** When a user exits the builder (save, publish, or abandon)  

```typescript
{
  event: 'builder_session_ended',
  properties: {
    toolId?: string,
    sessionDuration: number, // milliseconds
    elementsAdded: number,
    elementsConfigured: number,
    elementsDeleted: number,
    toolSaved: boolean,
    toolPublished: boolean,
    exitMethod: 'save_and_close' | 'publish' | 'discard_changes' | 'browser_close' | 'timeout'
  }
}
```

## Implementation Guidelines

### Event Triggering Rules

1. **Element Add → Configure → Delete Flow:**
   - `element_used`: Fire only when element is successfully committed to canvas
   - `element_configured`: Fire for each property change after initial add
   - `element_deleted`: Fire when element is removed from canvas

2. **Drag Operations:**
   - Ignore raw drag events unless they result in successful element placement
   - Track drag-resize as `element_configured` with `configurationMethod: 'drag_resize'`

3. **Session Boundaries:**
   - Start session on builder page load/navigation
   - End session on explicit exit, page navigation, or 30-minute timeout

### Privacy & Anonymization

#### Server-Side Anonymization (Always-On for vBETA)
- Hash `userId` to prevent direct identification
- Anonymize `toolName` by replacing with character count (`tool_15chars`)
- Preserve structural data needed for analytics insights

#### Future Opt-Out Support
- `builderAnalyticsEnabled` flag in user profile (Firestore)
- When false, suppress all creation events for that user
- Maintain flag in event schema for forward compatibility

### Integration Points

#### UI Component Integration
```typescript
// In ToolBuilderCanvas component
import { useAnalytics } from '@hive/analytics';
import { CreationEventTypes } from '@hive/core';

const { track } = useAnalytics();

// Track element addition
const handleElementAdd = (element: Element) => {
  // ... add element to canvas
  track(CreationEventTypes.ELEMENT_USED, {
    toolId: currentTool.id,
    elementId: element.id,
    elementType: element.type,
    elementCategory: element.category,
    positionInTool: elements.length,
    addedFromPicker: true
  });
};
```

#### Backend Integration
```typescript
// In tool creation API
import { anonymizeCreationEvent } from '@hive/core';

const createTool = async (toolData: CreateToolRequest) => {
  const tool = await createToolInFirestore(toolData);
  
  // Track creation event
  const event = {
    event: 'tool_created',
    userId: req.user.uid,
    sessionId: req.sessionId,
    timestamp: Date.now(),
    builderAnalyticsEnabled: req.user.builderAnalyticsEnabled ?? true,
    properties: {
      toolId: tool.id,
      toolName: tool.name,
      initialElementCount: tool.elements.length,
      createdFromTemplate: !!toolData.templateId,
      templateId: toolData.templateId
    }
  };
  
  // Anonymize and send to analytics
  await sendAnalyticsEvent(anonymizeCreationEvent(event));
};
```

## Key Metrics & Insights

### Tool Creation Funnel
- Session start → First element add → Tool save → Tool publish
- Average time to first publish
- Element usage patterns by category
- Drop-off points in builder flow

### Element Popularity
- Most/least used elements by category
- Configuration complexity (avg configs per element)
- Element deletion patterns (which elements get removed most)

### Builder Engagement
- Session duration distribution
- Elements per session
- Save vs. abandon rates
- Entry point effectiveness

### Tool Ecosystem Health
- Fork rates (tool reusability)
- Cross-space tool placement
- Version update adoption rates

## Testing & Validation

### Event Schema Validation
All events are validated against Zod schemas before transmission:
```typescript
import { CreationEventSchema } from '@hive/core';

const validateEvent = (event: unknown) => {
  const result = CreationEventSchema.safeParse(event);
  if (!result.success) {
    console.error('Invalid creation event:', result.error);
    return false;
  }
  return true;
};
```

### Analytics Testing
- Unit tests for event generation in UI components
- Integration tests for backend event processing
- E2E tests for complete creation flows with event verification

## Future Enhancements

### Phase 2 Additions
- Heat mapping for canvas interactions
- A/B testing framework for builder UX
- Real-time collaboration analytics
- Performance metrics (render times, lag detection)

### Advanced Privacy Controls
- Granular opt-out by event type
- Data retention controls
- User data export/deletion compliance 