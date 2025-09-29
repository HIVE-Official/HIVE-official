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
  position: { x: number; y: number; width: number; height: number };
  isEnabled: boolean;
}

export class Widget extends Entity<WidgetProps> {
  get type(): string {
    return this.props.type;
  }

  get title(): string {
    return this.props.title;
  }

  get config(): Record<string, any> {
    return this.props.config;
  }

  get isVisible(): boolean {
    return this.props.isVisible;
  }

  get order(): number {
    return this.props.order;
  }

  get position(): { x: number; y: number; width: number; height: number } {
    return this.props.position;
  }

  get isEnabled(): boolean {
    return this.props.isEnabled;
  }

  private constructor(props: WidgetProps, id?: string) {
    super(props, id || `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }

  public static create(props: Partial<WidgetProps> & { type: WidgetProps['type']; title: string }, id?: string): Result<Widget> {
    if (!props.title || props.title.trim().length === 0) {
      return Result.fail<Widget>('Widget title is required');
    }

    const widgetProps: WidgetProps = {
      type: props.type,
      title: props.title,
      config: props.config || {},
      isVisible: props.isVisible !== undefined ? props.isVisible : true,
      order: props.order || 0,
      position: props.position || { x: 0, y: 0, width: 200, height: 200 },
      isEnabled: props.isEnabled !== undefined ? props.isEnabled : true
    };

    return Result.ok<Widget>(new Widget(widgetProps, id));
  }

  public updateConfig(config: Record<string, any>): void {
    this.props.config = { ...this.props.config, ...config };
  }

  public setVisibility(isVisible: boolean): void {
    this.props.isVisible = isVisible;
  }

  public setOrder(order: number): void {
    this.props.order = order;
  }

  public setTitle(title: string): Result<void> {
    if (!title || title.trim().length === 0) {
      return Result.fail<void>('Widget title cannot be empty');
    }
    this.props.title = title;
    return Result.ok<void>();
  }
}