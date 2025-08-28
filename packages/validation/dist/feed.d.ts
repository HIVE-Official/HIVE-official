import { z } from "zod";
export declare const createPostSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    content: string;
    title: string;
    tags?: string[] | undefined;
}, {
    content: string;
    title: string;
    tags?: string[] | undefined;
}>;
export declare const validatePost: (data: unknown) => {
    content: string;
    title: string;
    tags?: string[] | undefined;
};
//# sourceMappingURL=feed.d.ts.map