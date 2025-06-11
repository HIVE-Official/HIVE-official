import { z } from "zod";

export const MotionEntrySchema = z.object({
    id: z.string(),
    timestamp: z.any(), // Firestore Timestamp
    type: z.enum([
        "liked_post", 
        "replied_to_post",
        "created_tool",
        "joined_space",
        "rsvp_event"
    ]),
    title: z.string(),
    link: z.string().url(),
});

export const PersonalToolSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string(), // or an enum of possible icons
    config: z.record(z.any()), // The specific settings for this tool instance
    createdAt: z.any(), // Firestore Timestamp
});

export type MotionEntry = z.infer<typeof MotionEntrySchema>;
export type PersonalTool = z.infer<typeof PersonalToolSchema>; 
 