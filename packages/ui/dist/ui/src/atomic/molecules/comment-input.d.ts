import * as React from "react";
export interface CommentInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
    avatar?: string;
    userName: string;
    placeholder?: string;
    maxLength?: number;
    showCharCount?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
    onSubmit?: (comment: string) => void | Promise<void>;
    submitLabel?: string;
}
declare const CommentInput: React.ForwardRefExoticComponent<CommentInputProps & React.RefAttributes<HTMLDivElement>>;
export { CommentInput };
//# sourceMappingURL=comment-input.d.ts.map