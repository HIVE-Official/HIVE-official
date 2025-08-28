import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
  tags: z.array(z.string()).max(5).optional(),
});

export const validatePost = (data: unknown) => {
  const result = createPostSchema.parse(data);
  return result;
};
