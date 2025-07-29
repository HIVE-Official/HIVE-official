import React from 'react';
import type { PingTriggerConfigSchema } from '@hive/core';
import { z } from 'zod';
type PingTriggerConfig = z.infer<typeof PingTriggerConfigSchema>;
interface PingTriggerProps {
    config: PingTriggerConfig;
    onTrigger?: (data: TriggerData) => Promise<void>;
    disabled?: boolean;
    className?: string;
}
interface TriggerData {
    triggerType: string;
    timestamp: Date;
    elementId?: string;
    url?: string;
    event?: string;
    data?: Record<string, unknown>;
}
interface TriggerStatus {
    status: 'idle' | 'pending' | 'success' | 'error';
    message?: string;
    timestamp?: Date;
}
export declare const PingTrigger: React.FC<PingTriggerProps>;
export declare const usePingTriggerManager: () => {
    registerTrigger: (id: string) => void;
    updateTriggerStatus: (id: string, status: TriggerStatus) => void;
    getTriggerStatus: (id: string) => TriggerStatus;
    getAllTriggers: () => {
        status: "idle" | "pending" | "success" | "error";
        message?: string;
        timestamp?: Date;
        id: string;
    }[];
};
export default PingTrigger;
//# sourceMappingURL=ping-trigger.d.ts.map