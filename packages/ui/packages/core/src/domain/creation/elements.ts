import { z } from 'zod';

/**
 * Canonical HiveLab element definitions.
 * These align with the vBETA element kit defined in the HiveLab system spec.
 */

export const ElementIdSchema = z
  .string()
  .regex(/^el_[A-Za-z0-9_-]+$/, 'Element ids must look like "el_xxx"');

export const ElementType = z.enum([
  'staticText',
  'staticImage',
  'divider',
  'shortTextInput',
  'longTextInput',
  'multipleChoice',
  'imagePicker',
  'submitButton',
  'linkButton',
]);

export type ElementTypeValue = z.infer<typeof ElementType>;

const StaticTextPropsSchema = z.object({
  content: z.string().min(1, 'Content cannot be empty.'),
  align: z.enum(['left', 'center', 'right']).default('left'),
  size: z.enum(['small', 'medium', 'large']).default('medium'),
});

const StaticImagePropsSchema = z.object({
  imageUrl: z.string().url('Must be a valid URL'),
  altText: z.string().max(160),
  caption: z.string().max(160).optional(),
});

const DividerPropsSchema = z.object({
  thickness: z.enum(['thin', 'thick']).default('thin'),
});

const ShortTextInputPropsSchema = z.object({
  label: z.string().min(1),
  placeholder: z.string().max(120).optional(),
  maxLength: z.number().min(1).max(280).default(140),
  required: z.boolean().default(false),
});

const LongTextInputPropsSchema = z.object({
  label: z.string().min(1),
  placeholder: z.string().max(240).optional(),
  maxLength: z.number().min(50).max(2000).default(500),
  required: z.boolean().default(false),
});

const MultipleChoicePropsSchema = z.object({
  label: z.string().min(1),
  options: z.array(z.string().min(1)).min(2).max(8),
  allowMultiple: z.boolean().default(false),
  shuffleOptions: z.boolean().default(false),
});

const ImagePickerPropsSchema = z.object({
  label: z.string().min(1),
  helpText: z.string().max(200).optional(),
  maxFileSizeMB: z.number().min(1).max(10).default(5),
});

const SubmitButtonPropsSchema = z.object({
  label: z.string().min(1),
  actionName: z.string().min(1),
  style: z.enum(['primary', 'secondary']).default('primary'),
  disabledUntilValid: z.boolean().default(true),
});

const LinkButtonPropsSchema = z.object({
  label: z.string().min(1),
  url: z.string().url('Must be a valid URL'),
  openInNewTab: z.boolean().default(true),
});

const baseInstance = {
  id: ElementIdSchema,
};

export const ElementInstanceSchema = z.discriminatedUnion('type', [
  z.object({ ...baseInstance, type: z.literal('staticText'), props: StaticTextPropsSchema }),
  z.object({ ...baseInstance, type: z.literal('staticImage'), props: StaticImagePropsSchema }),
  z.object({ ...baseInstance, type: z.literal('divider'), props: DividerPropsSchema }),
  z.object({ ...baseInstance, type: z.literal('shortTextInput'), props: ShortTextInputPropsSchema }),
  z.object({ ...baseInstance, type: z.literal('longTextInput'), props: LongTextInputPropsSchema }),
  z.object({ ...baseInstance, type: z.literal('multipleChoice'), props: MultipleChoicePropsSchema }),
  z.object({ ...baseInstance, type: z.literal('imagePicker'), props: ImagePickerPropsSchema }),
  z.object({ ...baseInstance, type: z.literal('submitButton'), props: SubmitButtonPropsSchema }),
  z.object({ ...baseInstance, type: z.literal('linkButton'), props: LinkButtonPropsSchema }),
]);

export type ElementInstance = z.infer<typeof ElementInstanceSchema>;

const elementPropSchemas: Record<ElementTypeValue, z.ZodTypeAny> = {
  staticText: StaticTextPropsSchema,
  staticImage: StaticImagePropsSchema,
  divider: DividerPropsSchema,
  shortTextInput: ShortTextInputPropsSchema,
  longTextInput: LongTextInputPropsSchema,
  multipleChoice: MultipleChoicePropsSchema,
  imagePicker: ImagePickerPropsSchema,
  submitButton: SubmitButtonPropsSchema,
  linkButton: LinkButtonPropsSchema,
};

export const ElementPropsByType = elementPropSchemas;

export function validateElementConfig(type: ElementTypeValue, props: unknown) {
  const schema = elementPropSchemas[type];
  const result = schema.safeParse(props);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
}

export const ElementLibrary = Object.entries(elementPropSchemas).map(([type, schema]) => ({
  type: type as ElementTypeValue,
  schema,
}));
