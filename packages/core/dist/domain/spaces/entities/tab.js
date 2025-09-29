"use strict";
/**
 * Tab Entity
 * Represents a tab in a space's layout
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tab = void 0;
const Entity_base_1 = require("../../shared/base/Entity.base");
const Result_1 = require("../../shared/base/Result");
class Tab extends Entity_base_1.Entity {
    get name() {
        return this.props.name;
    }
    get type() {
        return this.props.type;
    }
    get isDefault() {
        return this.props.isDefault;
    }
    get order() {
        return this.props.order;
    }
    get widgets() {
        return this.props.widgets;
    }
    get title() {
        return this.props.title;
    }
    get originPostId() {
        return this.props.originPostId;
    }
    get messageCount() {
        return this.props.messageCount;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get lastActivityAt() {
        return this.props.lastActivityAt;
    }
    get expiresAt() {
        return this.props.expiresAt;
    }
    get isArchived() {
        return this.props.isArchived;
    }
    get isVisible() {
        return this.props.isVisible;
    }
    constructor(props, id) {
        super(props, id || `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    static create(props, id) {
        if (!props.name || props.name.trim().length === 0) {
            return Result_1.Result.fail('Tab name is required');
        }
        const tabProps = {
            name: props.name,
            type: props.type,
            isDefault: props.isDefault || false,
            order: props.order || 0,
            widgets: props.widgets || [],
            isVisible: props.isVisible !== undefined ? props.isVisible : true,
            title: props.title || props.name,
            originPostId: props.originPostId,
            messageCount: props.messageCount || 0,
            createdAt: props.createdAt || new Date(),
            lastActivityAt: props.lastActivityAt,
            expiresAt: props.expiresAt,
            isArchived: props.isArchived || false
        };
        return Result_1.Result.ok(new Tab(tabProps, id));
    }
    addWidget(widgetId) {
        if (!this.props.widgets.includes(widgetId)) {
            this.props.widgets.push(widgetId);
        }
    }
    removeWidget(widgetId) {
        this.props.widgets = this.props.widgets.filter(id => id !== widgetId);
    }
    setOrder(order) {
        this.props.order = order;
    }
    setVisibility(isVisible) {
        this.props.isVisible = isVisible;
    }
}
exports.Tab = Tab;
//# sourceMappingURL=tab.js.map