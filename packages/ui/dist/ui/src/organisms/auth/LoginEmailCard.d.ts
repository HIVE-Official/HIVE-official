export interface LoginEmailCardProps {
    campusLabel?: string;
    email?: string;
    placeholder?: string;
    error?: string | null;
    isSubmitting?: boolean;
    onEmailChange?: (value: string) => void;
    onSubmit?: () => void;
    onBack?: () => void;
}
export declare function LoginEmailCard({ campusLabel, email, placeholder, error, isSubmitting, onEmailChange, onSubmit, onBack, }: LoginEmailCardProps): import("react/jsx-runtime").JSX.Element;
export default LoginEmailCard;
//# sourceMappingURL=LoginEmailCard.d.ts.map