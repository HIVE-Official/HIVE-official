// HIVE Tool Creator Components - Complete Export System
// Atomic Design: All creator system components and types

// === CORE TYPES ===
export type {
  // Main types
  Element,
  ElementInstance,
  Tool,
  ToolTemplate,
  BuilderMode,
  DeploymentOptions,
  
  // Configuration types
  ElementConfig,
  ElementSchema,
  ConfigProperty,
  ValidationRule,
  ElementDocumentation,
  ElementCategory,
  ToolConfig,
  ToolMetadata,
  ToolCategory,
  ToolStatus,
  
  // Builder types
  ToolBuilder,
  CanvasState,
  HistoryState,
  Position,
  Size,
  ElementStyle,
  Spacing,
  
  // Component prop types
  VisualBuilderProps,
  TemplateBuilderProps,
  WizardBuilderProps,
  ElementPickerProps,
  ElementConfigProps,
  ToolPreviewProps,
  
  // Action types
  BuilderAction,
  BuilderContextType,
  
  // Events and interactions
  EventHandler,
  EventAction,
  Condition,
  
  // Campus-specific extensions
  CampusToolExtensions,
  
  // Re-exported for external use
  HiveElement,
  HiveElementInstance,
  HiveTool,
  HiveToolTemplate,
  HiveBuilderMode,
  HiveDeploymentOptions
} from './types';

// === MAIN BUILDER COMPONENTS ===
export { VisualToolBuilder } from './visual-tool-builder';
export { TemplateToolBuilder } from './template-tool-builder';
export { WizardToolBuilder } from './wizard-tool-builder';

// === SUPPORTING COMPONENTS ===
export { ElementPicker } from './element-picker';
export { ElementConfig } from './element-config';
export { ToolPreview } from './tool-preview';

// === CONSTANTS AND UTILITIES ===
export { ELEMENT_CATEGORIES } from './element-picker';

// === DEFAULT EXPORTS FOR CONVENIENCE ===
export { VisualToolBuilder as default } from './visual-tool-builder';

// === COMPONENT COLLECTIONS ===
// All builder components in one object for dynamic imports
export const HiveCreators = {
  VisualToolBuilder: () => import('./visual-tool-builder').then(m => m.VisualToolBuilder),
  TemplateToolBuilder: () => import('./template-tool-builder').then(m => m.TemplateToolBuilder),
  WizardToolBuilder: () => import('./wizard-tool-builder').then(m => m.WizardToolBuilder),
  ElementPicker: () => import('./element-picker').then(m => m.ElementPicker),
  ElementConfig: () => import('./element-config').then(m => m.ElementConfig),
  ToolPreview: () => import('./tool-preview').then(m => m.ToolPreview)
} as const;

// === BUILDER MODE UTILITIES ===
export const getBuilderComponent = (mode: BuilderMode) => {
  switch (mode) {
    case 'visual':
      return HiveCreators.VisualToolBuilder;
    case 'template':
      return HiveCreators.TemplateToolBuilder;
    case 'wizard':
      return HiveCreators.WizardToolBuilder;
    default:
      return HiveCreators.VisualToolBuilder;
  }
};

// === VALIDATION UTILITIES ===
export const validateTool = (tool: Tool): string[] => {
  const errors: string[] = [];
  
  if (!tool.name.trim()) {
    errors.push('Tool name is required');
  }
  
  if (!tool.description.trim()) {
    errors.push('Tool description is required');
  }
  
  if (!tool.metadata.category) {
    errors.push('Tool category is required');
  }
  
  if (tool.elements.length === 0) {
    errors.push('Tool must have at least one element');
  }
  
  return errors;
};

// === TOOL CREATION UTILITIES ===
export const createEmptyTool = (userId: string, mode: BuilderMode = 'visual'): Tool => ({
  id: `tool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  name: 'New Tool',
  description: '',
  ownerId: userId,
  collaborators: [],
  status: 'draft',
  currentVersion: '1.0.0',
  versions: [],
  elements: [],
  config: {
    theme: 'auto',
    primaryColor: '#FFD700',
    backgroundColor: '#ffffff',
    allowMultipleSubmissions: false,
    requireAuthentication: true,
    showProgressBar: false,
    autoSave: true,
    dataRetentionDays: 90,
    notifyOnSubmission: false,
    trackingEnabled: true,
    allowAnalyticsOptOut: true,
  },
  metadata: {
    toolType: mode,
    tags: [],
    difficulty: 'beginner',
    category: 'productivity',
    language: 'en',
  },
  isPublic: false,
  forkCount: 0,
  viewCount: 0,
  useCount: 0,
  ratingCount: 0,
  isSpaceTool: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// === ELEMENT UTILITIES ===
export const createElementInstance = (
  element: Element, 
  position: Position = { x: 0, y: 0 }
): ElementInstance => ({
  id: `instance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  elementId: element.id,
  position,
  size: { width: 200, height: 'auto' },
  config: { ...element.defaultConfig },
  style: {
    backgroundColor: 'transparent',
    padding: { top: 8, right: 8, bottom: 8, left: 8 },
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  },
  conditions: [],
  events: [],
  zIndex: 0,
  isLocked: false,
  isVisible: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// === DEPLOYMENT UTILITIES ===
export const createDeploymentOptions = (
  deployTo: 'personal' | 'space' | 'marketplace' = 'personal',
  targetId: string = 'current-user'
): DeploymentOptions => ({
  deployTo,
  targetId,
  permissions: {
    canView: 'authenticated',
    canEdit: 'owner',
    canFork: true,
    canComment: true
  },
  settings: {
    embedAllowed: false,
    analyticsEnabled: true,
    dataRetention: 90,
    requireLogin: true,
    allowSubmissions: true,
    submissionNotifications: false
  }
});

// === HOOK UTILITIES (if needed) ===
// These would be implemented as React hooks in a separate hooks file
export const createToolHooks = () => ({
  // Placeholder for future hook exports
  useToolBuilder: null,
  useElementLibrary: null,
  useToolPreview: null
});

// === VERSION INFO ===
export const HIVE_CREATORS_VERSION = '1.0.0';
export const SUPPORTED_BUILDER_MODES: BuilderMode[] = ['visual', 'template', 'wizard'];

// === FEATURE FLAGS ===
export const CREATOR_FEATURES = {
  dragAndDrop: true,
  realTimePreview: true,
  templateLibrary: true,
  wizardMode: true,
  elementCategories: true,
  customElements: false, // Future feature
  aiAssistant: false,    // Future feature
  collaboration: false   // Future feature
} as const;