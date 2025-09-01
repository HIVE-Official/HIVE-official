import { User } from 'lucide-react';
interface User {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    builderStatus?: 'none' | 'pending' | 'active';
    role?: 'student' | 'faculty' | 'admin';
}
interface MobileNavigationMenuProps {
    user?: User | null;
    isOpen: boolean;
    onClose: () => void;
    unreadNotifications?: number;
    className?: string;
}
export declare function MobileNavigationMenu({ user, isOpen, onClose, unreadNotifications, className }: MobileNavigationMenuProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=mobile-navigation-menu.d.ts.map