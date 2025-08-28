import { z } from "zod";
export declare const MotionEntrySchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodAny;
    type: z.ZodEnum<["liked_post", "replied_to_post", "created_tool", "joined_space", "rsvp_event"]>;
    title: z.ZodString;
    link: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "liked_post" | "replied_to_post" | "created_tool" | "joined_space" | "rsvp_event";
    title: string;
    link: string;
    timestamp?: any;
}, {
    id: string;
    type: "liked_post" | "replied_to_post" | "created_tool" | "joined_space" | "rsvp_event";
    title: string;
    link: string;
    timestamp?: any;
}>;
export declare const PersonalToolSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    icon: z.ZodString;
    config: z.ZodRecord<z.ZodString, z.ZodAny>;
    createdAt: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    description: string;
    config: Record<string, any>;
    icon: string;
    createdAt?: any;
}, {
    id: string;
    name: string;
    description: string;
    config: Record<string, any>;
    icon: string;
    createdAt?: any;
}>;
export type MotionEntry = z.infer<typeof MotionEntrySchema>;
export type PersonalTool = z.infer<typeof PersonalToolSchema>;
//# sourceMappingURL=profile.schema.d.ts.map