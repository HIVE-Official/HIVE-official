import { z } from 'zod';
export declare const PlacementTargetType: z.ZodEnum<["space", "profile", "feed"]>;
export type PlacementTargetType = z.infer<typeof PlacementTargetType>;
export declare const PlacementPermissionsSchema: z.ZodObject<{
    canEdit: z.ZodDefault<z.ZodBoolean>;
    canRemove: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    canEdit: boolean;
    canRemove: boolean;
}, {
    canEdit?: boolean | undefined;
    canRemove?: boolean | undefined;
}>;
export declare const PlacementSettingsSchema: z.ZodObject<{
    position: z.ZodDefault<z.ZodNumber>;
    pinned: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    position: number;
    pinned: boolean;
}, {
    position?: number | undefined;
    pinned?: boolean | undefined;
}>;
export declare const PlacedToolSchema: z.ZodObject<{
    toolId: z.ZodString;
    targetType: z.ZodEnum<["space", "profile", "feed"]>;
    targetId: z.ZodString;
    permissions: z.ZodDefault<z.ZodObject<{
        canEdit: z.ZodDefault<z.ZodBoolean>;
        canRemove: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        canEdit: boolean;
        canRemove: boolean;
    }, {
        canEdit?: boolean | undefined;
        canRemove?: boolean | undefined;
    }>>;
    settings: z.ZodDefault<z.ZodObject<{
        position: z.ZodDefault<z.ZodNumber>;
        pinned: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        position: number;
        pinned: boolean;
    }, {
        position?: number | undefined;
        pinned?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    toolId: string;
    targetType: "feed" | "space" | "profile";
    targetId: string;
    permissions: {
        canEdit: boolean;
        canRemove: boolean;
    };
    settings: {
        position: number;
        pinned: boolean;
    };
}, {
    toolId: string;
    targetType: "feed" | "space" | "profile";
    targetId: string;
    permissions?: {
        canEdit?: boolean | undefined;
        canRemove?: boolean | undefined;
    } | undefined;
    settings?: {
        position?: number | undefined;
        pinned?: boolean | undefined;
    } | undefined;
}>;
export declare const PLACED_TOOL_COLLECTION_NAME = "placed_tools";
export declare function getPlacementCollectionPath(targetType: PlacementTargetType, targetId: string): string;
export declare function getPlacementDocPath(targetType: PlacementTargetType, targetId: string, placementId: string): string;
export declare function encodePlacementCompositeId(targetType: PlacementTargetType, targetId: string, placementId: string): string;
export declare function decodePlacementCompositeId(compositeId: string): {
    targetType: PlacementTargetType;
    targetId: string;
    placementId: string;
};
export declare function tryDecodePlacementCompositeId(compositeId: string): [boolean, {
    targetType: PlacementTargetType;
    targetId: string;
    placementId: string;
}?];
//# sourceMappingURL=placement.d.ts.map