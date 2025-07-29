import React from "react";
import type { Element } from "@hive/core";
interface ElementLibraryProps {
    elements: Element[];
    onElementSelect: (elementId: string, position: {
        x: number;
        y: number;
    }) => void;
    searchQuery: string;
    selectedCategory: string;
    className?: string;
}
export declare const ElementLibrary: React.FC<ElementLibraryProps>;
export default ElementLibrary;
//# sourceMappingURL=element-library.d.ts.map