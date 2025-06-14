import { z } from 'zod';

const elementSchemas: Record<string, z.ZodObject<any, any, any>> = {
  textBlock: z.object({
    content: z.string().min(1, 'Content cannot be empty.'),
    style: z.enum(['h1', 'h2', 'h3', 'body', 'caption']),
  }),
  imageBlock: z.object({
    src: z.string().url('Must be a valid URL.'),
    alt: z.string(),
    fit: z.enum(['cover', 'contain']),
  }),
  divider: z.object({
    thickness: z.number().min(1).max(8),
    variant: z.enum(['solid', 'dashed']),
  }),
  stack: z.object({
    direction: z.enum(['vertical', 'horizontal']),
    gap: z.number().min(0).max(16),
    align: z.enum(['start', 'center', 'end']),
  }),
  button: z.object({
    label: z.string().min(1),
    variant: z.enum(['primary', 'secondary', 'ghost', 'destructive']),
    action: z.string().url().or(z.literal('')),
  }),
  choiceSelect: z.object({
    prompt: z.string(),
    options: z.array(z.string()).min(2, 'Must have at least two options.'),
    multi: z.boolean(),
  }),
  textInput: z.object({
    prompt: z.string(),
    placeholder: z.string(),
    maxLength: z.number().min(10).max(1000),
  }),
  ratingStars: z.object({
    prompt: z.string(),
    max: z.literal(5),
  }),
  countdownTimer: z.object({
    endTimestamp: z.number().positive(),
    style: z.enum(['default', 'compact']),
  }),
  progressBar: z.object({
    goal: z.number().positive(),
    current: z.number().min(0),
    showPct: z.boolean(),
  }),
  conditionGate: z.object({
    rule: z.string(),
  }),
  pingTrigger: z.object({
    message: z.string().min(1),
    delaySeconds: z.number().min(0).max(3600),
    scope: z.enum(['personal', 'space']),
  }),
};

/**
 * Validates the configuration of a single element against its hardcoded Zod schema.
 * @param elementId The ID of the element type (e.g., "textBlock").
 * @param config The configuration object to validate.
 * @returns A promise that resolves if validation is successful, or rejects with an error.
 */
export const validateElementConfig = (elementId: string, config: unknown) => {
  const schema = elementSchemas[elementId];
  if (!schema) {
    throw new Error(`No validation schema found for element ID: ${elementId}`);
  }

  const validation = schema.safeParse(config);
  if (!validation.success) {
    throw new Error(`Invalid configuration for ${elementId}: ${validation.error.flatten().fieldErrors}`);
  }

  return validation.data;
}; 