/**
 * Widget Entity
 * Represents a widget component in a space
 */
import { Entity } from '../../shared/base/Entity.base';
import { Result } from '../../shared/base/Result';
interface WidgetProps {
    type: 'calendar' | 'poll' | 'links' | 'files' | 'rss' | 'custom';
    title: string;
    config: Record<string, any>;
    isVisible: boolean;
    order: number;
    position: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    isEnabled: boolean;
}
export declare class Widget extends Entity<WidgetProps> {
    get type(): string;
    get title(): string;
    get config(): Record<string, any>;
    get isVisible(): boolean;
    get order(): number;
    get position(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    get isEnabled(): boolean;
    private constructor();
    static create(props: Partial<WidgetProps> & {
        type: WidgetProps['type'];
        title: string;
    }, id?: string): Result<Widget>;
    updateConfig(config: Record<string, any>): void;
    setVisibility(isVisible: boolean): void;
    setOrder(order: number): void;
    setTitle(title: string): Result<void>;
}
export {};
//# sourceMappingURL=widget.d.ts.map