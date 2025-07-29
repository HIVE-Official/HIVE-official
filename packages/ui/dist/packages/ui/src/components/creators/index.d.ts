export type { Element, ElementInstance, Tool, ToolTemplate, BuilderMode, DeploymentOptions, ElementConfig, ElementSchema, ConfigProperty, ValidationRule, ElementDocumentation, ElementCategory, ToolConfig, ToolMetadata, ToolCategory, ToolStatus, ToolBuilder, CanvasState, HistoryState, Position, Size, ElementStyle, Spacing, VisualBuilderProps, TemplateBuilderProps, WizardBuilderProps, ElementPickerProps, ElementConfigProps, ToolPreviewProps, BuilderAction, BuilderContextType, EventHandler, EventAction, Condition, CampusToolExtensions, HiveElement, HiveElementInstance, HiveTool, HiveToolTemplate, HiveBuilderMode, HiveDeploymentOptions } from './types';
export { VisualToolBuilder } from './visual-tool-builder';
export { TemplateToolBuilder } from './template-tool-builder';
export { WizardToolBuilder } from './wizard-tool-builder';
export { ElementPicker } from './element-picker';
export { ElementConfig } from './element-config';
export { ToolPreview } from './tool-preview';
export { ELEMENT_CATEGORIES } from './element-picker';
export { VisualToolBuilder as default } from './visual-tool-builder';
export declare const HiveCreators: {
    readonly VisualToolBuilder: () => Promise<import("react").FC<import("./types").VisualBuilderProps>>;
    readonly TemplateToolBuilder: () => Promise<import("react").FC<import("./types").TemplateBuilderProps>>;
    readonly WizardToolBuilder: () => Promise<import("react").FC<import("./types").WizardBuilderProps>>;
    readonly ElementPicker: () => Promise<import("react").FC<import("./types").ElementPickerProps>>;
    readonly ElementConfig: () => Promise<import("react").FC<import("./types").ElementConfigProps>>;
    readonly ToolPreview: () => Promise<import("react").FC<import("./types").ToolPreviewProps>>;
};
export declare const getBuilderComponent: (mode: BuilderMode) => () => Promise<import("react").FC<import("./types").WizardBuilderProps>>;
export declare const validateTool: (tool: Tool) => string[];
export declare const createEmptyTool: (userId: string, mode?: BuilderMode) => Tool;
export declare const createElementInstance: (element: Element, position?: Position) => ElementInstance;
export declare const createDeploymentOptions: (deployTo?: "personal" | "space" | "marketplace", targetId?: string) => DeploymentOptions;
export declare const createToolHooks: () => {
    useToolBuilder: any;
    useElementLibrary: any;
    useToolPreview: any;
};
export declare const HIVE_CREATORS_VERSION = "1.0.0";
export declare const SUPPORTED_BUILDER_MODES: BuilderMode[];
export declare const CREATOR_FEATURES: {
    readonly dragAndDrop: true;
    readonly realTimePreview: true;
    readonly templateLibrary: true;
    readonly wizardMode: true;
    readonly elementCategories: true;
    readonly customElements: false;
    readonly aiAssistant: false;
    readonly collaboration: false;
};
//# sourceMappingURL=index.d.ts.map