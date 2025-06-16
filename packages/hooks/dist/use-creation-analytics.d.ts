import type { CreationEventType } from "@hive/core";
interface UseCreationAnalyticsOptions {
    toolId?: string;
    spaceId?: string;
    batchSize?: number;
    flushInterval?: number;
    enableDebugLogging?: boolean;
}
interface CreationAnalyticsContext {
    toolId?: string;
    toolName?: string;
    toolVersion?: string;
    toolStatus?: "draft" | "preview" | "published";
    spaceId?: string;
    isSpaceTool?: boolean;
    elementId?: string;
    elementType?: string;
}
export declare const useCreationAnalytics: (options?: UseCreationAnalyticsOptions) => {
    sessionId: `${string}-${string}-${string}-${string}-${string}`;
    isSessionActive: boolean;
    startBuilderSession: (toolId: string, toolName?: string) => void;
    endBuilderSession: (exitReason?: "save" | "abandon" | "publish" | "share") => void;
    updateContext: (context: Partial<CreationAnalyticsContext>) => void;
    currentContext: CreationAnalyticsContext;
    trackEvent: (eventType: CreationEventType, metadata?: Record<string, unknown>, context?: Partial<CreationAnalyticsContext>) => void;
    trackToolCreated: (toolData: {
        toolId: string;
        toolName: string;
        hasDescription: boolean;
        initialElementsCount: number;
        creationSource: "scratch" | "template" | "fork";
        templateUsed?: string;
    }) => void;
    trackToolUpdated: (updateData: {
        versionChanged: boolean;
        newVersion: string;
        elementsCount: number;
        changeType: "major" | "minor" | "patch";
        fieldsChanged: string[];
        editDuration: number;
    }) => void;
    trackToolPublished: (toolData: {
        toolId: string;
        toolName: string;
        elementsCount: number;
        finalVersion: string;
    }) => void;
    trackElementAdded: (elementData: {
        elementId: string;
        elementType: string;
        addMethod: "drag_drop" | "click" | "preset" | "duplicate";
        presetUsed?: string;
        position: {
            x: number;
            y: number;
        };
        canvasElementsCount: number;
        librarySearchQuery?: string;
    }) => void;
    trackElementConfigured: (configData: {
        elementId: string;
        elementType: string;
        configMethod: "properties_panel" | "json_editor" | "inline_edit";
        propertiesChanged: string[];
        configComplexity: "basic" | "advanced";
        validationErrors?: string[];
        timeSpent: number;
    }) => void;
    trackElementRemoved: (elementData: {
        elementId: string;
        elementType: string;
        removalReason: "delete" | "replace" | "cleanup";
        timeOnCanvas: number;
    }) => void;
    trackCanvasModeChanged: (mode: "design" | "preview" | "code") => void;
    trackDeviceModeChanged: (deviceMode: "desktop" | "tablet" | "mobile") => void;
    trackElementLibrarySearched: (searchQuery: string, resultsCount: number) => void;
    trackToolInstanceOpened: (instanceData: {
        toolId: string;
        source: "direct" | "feed" | "share_link" | "embed";
        referrer?: string;
        isFirstTime: boolean;
        deviceType: "desktop" | "tablet" | "mobile";
    }) => void;
    trackToolInstanceSubmitted: (submissionData: {
        toolId: string;
        completionTime: number;
        elementsInteracted: number;
        validationErrors: number;
        dataSize: number;
        isAnonymous: boolean;
        retryCount: number;
    }) => void;
    userPreferences: {
        analyticsOptOut?: boolean;
        anonymizeData?: boolean;
    };
    updatePrivacyPreferences: (preferences: {
        analyticsOptOut?: boolean;
        anonymizeData?: boolean;
    }) => void;
    flushEvents: (force?: boolean) => Promise<void>;
    queueSize: number;
};
export {};
//# sourceMappingURL=use-creation-analytics.d.ts.map