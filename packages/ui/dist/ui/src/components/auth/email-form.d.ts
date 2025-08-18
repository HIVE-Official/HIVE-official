import * as z from 'zod';
declare const emailFormSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
}, {
    email?: string;
}>;
type EmailFormValues = z.infer<typeof emailFormSchema>;
interface EmailFormProps {
    onSubmit: (data: EmailFormValues) => void;
    isLoading?: boolean;
    apiError?: string | null;
    className?: string;
}
export declare const EmailForm: ({ onSubmit, isLoading, apiError, className, }: EmailFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=email-form.d.ts.map