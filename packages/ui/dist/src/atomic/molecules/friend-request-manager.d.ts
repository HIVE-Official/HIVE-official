import React from 'react';
interface FriendRequestManagerProps {
    userId: string;
    onAcceptRequest?: (requestId: string) => Promise<void>;
    onRejectRequest?: (requestId: string) => Promise<void>;
    onCancelRequest?: (requestId: string) => Promise<void>;
    onSendRequest?: (userId: string, message?: string) => Promise<void>;
    className?: string;
}
export declare const FriendRequestManager: React.FC<FriendRequestManagerProps>;
export {};
//# sourceMappingURL=friend-request-manager.d.ts.map