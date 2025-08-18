import React from "react";
export interface SpaceActivationRequestFormProps {
    space: {
        id: string;
        name: string;
        category: string;
        description: string;
        potentialMembers: number;
        rssEvents: Array<{
            title: string;
            date: string;
            source: string;
        }>;
    };
    onSubmit: (data: {
        connection: string;
        connectionDetails?: string;
        reason: string;
        firstTool: string;
    }) => Promise<void>;
    onCancel: () => void;
}
export declare const SpaceActivationRequestForm: React.FC<SpaceActivationRequestFormProps>;
//# sourceMappingURL=space-activation-request-form.d.ts.map