import React from 'react';
import { BaseWidgetProps, CoordinationOpportunity } from '../bento-grid/types';
interface PriorityCoordinationWidgetProps extends BaseWidgetProps {
    priorities: CoordinationOpportunity[];
    isLoading?: boolean;
    onActionTaken: (priorityId: string, actionId: string) => void;
    onPriorityClick: (priorityId: string) => void;
    onViewAll: () => void;
}
export declare const PriorityCoordinationWidget: React.FC<PriorityCoordinationWidgetProps>;
export {};
//# sourceMappingURL=priority-coordination-widget.d.ts.map