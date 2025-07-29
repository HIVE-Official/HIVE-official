import React from "react";
import type { Element } from "@hive/core";
interface ElementCardProps {
    element: Element;
    onSelect: (elementId: string) => void;
    enableDrag?: boolean;
    className?: string;
}
export declare const ElementCard: React.FC<ElementCardProps>;
export {};
//# sourceMappingURL=element-card.d.ts.map