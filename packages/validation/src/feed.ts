import { z } from "zod";
import { logger } from "@hive/core";

export const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
  tags: z.array(z.string()).max(5).optional(),
});

export const validatePost = (data: unknown) => {
  try {
    const result = createPostSchema.parse(data);
    logger.debug("Post validation successful", {
      title: result.title,
      contentLength: result.content.length,
      tagCount: result.tags?.length,
    });
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn("Post validation failed", {
        issues: error.issues,
      });
    } else {
      logger.error("Unexpected validation error", { 
        error: error instanceof Error ? error : new Error(String(error))
      });
    }
    throw error;
  }
};
