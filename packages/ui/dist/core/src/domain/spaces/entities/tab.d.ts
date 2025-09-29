/**
 * Tab Entity
 * Represents a tab in a space's layout
 */
import { Entity } from '../../shared/base/Entity.base';
import { Result } from '../../shared/base/Result';
interface TabProps {
    name: string;
    type: 'feed' | 'widget' | 'resource' | 'custom';
    isDefault: boolean;
    order: number;
    widgets: string[];
    isVisible: boolean;
    title: string;
    originPostId?: string;
    messageCount: number;
    createdAt: Date;
    lastActivityAt?: Date;
    expiresAt?: Date;
    isArchived: boolean;
}
export declare class Tab extends Entity<TabProps> {
    get name(): string;
    get type(): string;
    get isDefault(): boolean;
    get order(): number;
    get widgets(): string[];
    get title(): string;
    get originPostId(): string | undefined;
    get messageCount(): number;
    get createdAt(): Date;
    get lastActivityAt(): Date | undefined;
    get expiresAt(): Date | undefined;
    get isArchived(): boolean;
    get isVisible(): boolean;
    private constructor();
    static create(props: Partial<TabProps> & {
        name: string;
        type: TabProps['type'];
    }, id?: string): Result<Tab>;
    addWidget(widgetId: string): void;
    removeWidget(widgetId: string): void;
    setOrder(order: number): void;
    setVisibility(isVisible: boolean): void;
}
export {};
//# sourceMappingURL=tab.d.ts.map