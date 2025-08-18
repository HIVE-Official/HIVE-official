interface ExclusiveSpace {
    id: string;
    name: string;
    type: "honors" | "research" | "greek" | "leadership" | "special";
    requirements: string[];
    description: string;
    icon: string;
    applicationStatus?: "pending" | "approved" | "rejected" | null;
}
interface RequestAccessCardProps {
    exclusiveSpaces?: ExclusiveSpace[];
    className?: string;
}
export declare function RequestAccessCard({ exclusiveSpaces, className }: RequestAccessCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=request-access-card.d.ts.map