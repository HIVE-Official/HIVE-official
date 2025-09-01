import React from 'react';
interface LibraryContextualAccessProps {
    space: any;
    onToolInstall?: (elementId: string, configuration?: any) => Promise<void>;
    onClose?: () => void;
    isOpen?: boolean;
    triggerRef?: React.RefObject<HTMLElement>;
}
export declare function LibraryContextualAccess({ space, onToolInstall, onClose, isOpen, triggerRef }: LibraryContextualAccessProps): import("react/jsx-runtime").JSX.Element | null;
export default LibraryContextualAccess;
//# sourceMappingURL=library-contextual-access.d.ts.map