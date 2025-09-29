"use strict";
/**
 * Widget Entity
 * Represents a widget component in a space
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
const Entity_base_1 = require("../../shared/base/Entity.base");
const Result_1 = require("../../shared/base/Result");
class Widget extends Entity_base_1.Entity {
    get type() {
        return this.props.type;
    }
    get title() {
        return this.props.title;
    }
    get config() {
        return this.props.config;
    }
    get isVisible() {
        return this.props.isVisible;
    }
    get order() {
        return this.props.order;
    }
    get position() {
        return this.props.position;
    }
    get isEnabled() {
        return this.props.isEnabled;
    }
    constructor(props, id) {
        super(props, id || `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    static create(props, id) {
        if (!props.title || props.title.trim().length === 0) {
            return Result_1.Result.fail('Widget title is required');
        }
        const widgetProps = {
            type: props.type,
            title: props.title,
            config: props.config || {},
            isVisible: props.isVisible !== undefined ? props.isVisible : true,
            order: props.order || 0,
            position: props.position || { x: 0, y: 0, width: 200, height: 200 },
            isEnabled: props.isEnabled !== undefined ? props.isEnabled : true
        };
        return Result_1.Result.ok(new Widget(widgetProps, id));
    }
    updateConfig(config) {
        this.props.config = { ...this.props.config, ...config };
    }
    setVisibility(isVisible) {
        this.props.isVisible = isVisible;
    }
    setOrder(order) {
        this.props.order = order;
    }
    setTitle(title) {
        if (!title || title.trim().length === 0) {
            return Result_1.Result.fail('Widget title cannot be empty');
        }
        this.props.title = title;
        return Result_1.Result.ok();
    }
}
exports.Widget = Widget;
//# sourceMappingURL=widget.js.map