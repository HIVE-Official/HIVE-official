"use strict";
/**
 * Tool Builder - Utilities for creating and composing tools
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolTemplateFactory = exports.ToolBuilder = void 0;
const element_registry_1 = require("./element-registry");
const uuid_1 = require("uuid");
/**
 * Tool Builder Class - Main builder for creating tools
 */
class ToolBuilder {
    constructor(name, description) {
        const toolId = (0, uuid_1.v4)();
        this.tool = {
            id: toolId,
            name,
            description,
            type: 'custom',
            category: 'utility',
            version: '1.0.0',
            status: 'draft',
            visibility: 'private',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.composition = {
            id: (0, uuid_1.v4)(),
            toolId,
            name,
            description,
            elements: [],
            connections: [],
            layout: { type: 'flow' },
            variables: [],
            triggers: []
        };
        this.registry = element_registry_1.ElementRegistry.getInstance();
    }
    // Tool configuration methods
    setType(type) {
        this.tool.type = type;
        return this;
    }
    setCategory(category) {
        this.tool.category = category;
        return this;
    }
    setVisibility(visibility) {
        this.tool.visibility = visibility;
        return this;
    }
    setAuthor(author) {
        this.tool.author = author;
        return this;
    }
    setMetadata(metadata) {
        this.tool.metadata = {
            ...this.tool.metadata,
            ...metadata
        };
        return this;
    }
    // Composition methods
    addElement(elementId, config, position) {
        const element = this.registry.getElement(elementId);
        if (!element) {
            throw new Error(`Element ${elementId} not found in registry`);
        }
        const instanceId = `${elementId}-${(0, uuid_1.v4)().slice(0, 8)}`;
        const composedElement = {
            instanceId,
            elementId,
            config: config || element.defaultConfig,
            position: position || { x: 0, y: 0 },
            size: { width: 200, height: 100 }
        };
        this.composition.elements.push(composedElement);
        return instanceId;
    }
    removeElement(instanceId) {
        this.composition.elements = this.composition.elements.filter(el => el.instanceId !== instanceId);
        // Also remove related connections
        this.composition.connections = this.composition.connections.filter(conn => conn.from.instanceId !== instanceId && conn.to.instanceId !== instanceId);
        return this;
    }
    connect(fromInstanceId, fromPort, toInstanceId, toPort) {
        const fromElement = this.composition.elements.find(el => el.instanceId === fromInstanceId);
        const toElement = this.composition.elements.find(el => el.instanceId === toInstanceId);
        if (!fromElement || !toElement) {
            throw new Error('Elements not found for connection');
        }
        // Validate connection
        if (!this.registry.canConnect(fromElement.elementId, fromPort, toElement.elementId, toPort)) {
            throw new Error('Invalid connection: incompatible types');
        }
        const connection = {
            id: (0, uuid_1.v4)(),
            from: { instanceId: fromInstanceId, portId: fromPort },
            to: { instanceId: toInstanceId, portId: toPort }
        };
        this.composition.connections.push(connection);
        return this;
    }
    addVariable(name, type, defaultValue) {
        const variable = {
            id: (0, uuid_1.v4)(),
            name,
            type,
            defaultValue,
            scope: 'local'
        };
        this.composition.variables.push(variable);
        return this;
    }
    addTrigger(name, event, actions, condition) {
        const trigger = {
            id: (0, uuid_1.v4)(),
            name,
            event,
            actions,
            condition
        };
        this.composition.triggers.push(trigger);
        return this;
    }
    setLayout(layout) {
        this.composition.layout = layout;
        return this;
    }
    setTheme(theme) {
        this.composition.theme = theme;
        return this;
    }
    // Validation and building
    validate() {
        const errors = [];
        const warnings = [];
        // Validate tool metadata
        if (!this.tool.name || this.tool.name.length < 3) {
            errors.push('Tool name must be at least 3 characters');
        }
        if (!this.tool.description || this.tool.description.length < 10) {
            errors.push('Tool description must be at least 10 characters');
        }
        // Validate composition
        if (this.composition.elements.length === 0) {
            warnings.push('Tool has no elements');
        }
        // Check for disconnected elements
        const connectedElements = new Set();
        this.composition.connections.forEach(conn => {
            connectedElements.add(conn.from.instanceId);
            connectedElements.add(conn.to.instanceId);
        });
        this.composition.elements.forEach(el => {
            if (!connectedElements.has(el.instanceId) && this.composition.elements.length > 1) {
                warnings.push(`Element ${el.instanceId} is not connected`);
            }
        });
        // Check for circular dependencies
        if (this.hasCircularDependency()) {
            errors.push('Tool has circular dependencies');
        }
        return {
            valid: errors.length === 0,
            errors,
            warnings
        };
    }
    hasCircularDependency() {
        const visited = new Set();
        const recursionStack = new Set();
        const hasCycle = (instanceId) => {
            visited.add(instanceId);
            recursionStack.add(instanceId);
            const outgoing = this.composition.connections.filter(conn => conn.from.instanceId === instanceId);
            for (const conn of outgoing) {
                const targetId = conn.to.instanceId;
                if (!visited.has(targetId)) {
                    if (hasCycle(targetId))
                        return true;
                }
                else if (recursionStack.has(targetId)) {
                    return true;
                }
            }
            recursionStack.delete(instanceId);
            return false;
        };
        for (const element of this.composition.elements) {
            if (!visited.has(element.instanceId)) {
                if (hasCycle(element.instanceId))
                    return true;
            }
        }
        return false;
    }
    build() {
        const validation = this.validate();
        if (!validation.valid) {
            throw new Error(`Tool validation failed: ${validation.errors.join(', ')}`);
        }
        const tool = {
            ...this.tool,
            configuration: {
                defaultSettings: {},
                customizableFields: [],
                dataSchema: this.generateDataSchema()
            },
            permissions: {
                canEdit: [this.tool.author?.id || ''],
                canView: [],
                canUse: [],
                canShare: [],
                isPublic: this.tool.visibility === 'public'
            },
            pricing: {
                model: 'free'
            },
            analytics: {
                deployments: 0,
                totalUsers: 0,
                activeUsers: 0,
                rating: 0,
                reviews: 0,
                usage: {
                    daily: 0,
                    weekly: 0,
                    monthly: 0,
                    allTime: 0,
                    bySpace: {},
                    byUser: {}
                },
                performance: {
                    averageLoadTime: 0,
                    errorRate: 0,
                    completionRate: 0,
                    userSatisfaction: 0
                }
            }
        };
        return {
            tool,
            composition: this.composition
        };
    }
    generateDataSchema() {
        const inputs = {};
        const outputs = {};
        this.composition.elements.forEach(el => {
            const element = this.registry.getElement(el.elementId);
            if (element) {
                element.inputs?.forEach(input => {
                    inputs[`${el.instanceId}.${input.id}`] = input.type;
                });
                element.outputs?.forEach(output => {
                    outputs[`${el.instanceId}.${output.id}`] = output.type;
                });
            }
        });
        return { inputs, outputs };
    }
    // Utility methods
    clone() {
        const clonedBuilder = new ToolBuilder(this.tool.name + ' (Copy)', this.tool.description || '');
        const newToolId = (0, uuid_1.v4)();
        clonedBuilder.tool = { ...this.tool, id: newToolId };
        clonedBuilder.composition = {
            ...this.composition,
            id: (0, uuid_1.v4)(),
            toolId: newToolId,
            elements: this.composition.elements.map(el => ({ ...el })),
            connections: this.composition.connections.map(conn => ({ ...conn })),
            variables: this.composition.variables.map(v => ({ ...v })),
            triggers: this.composition.triggers.map(t => ({ ...t }))
        };
        return clonedBuilder;
    }
    export() {
        return JSON.stringify({
            tool: this.tool,
            composition: this.composition
        }, null, 2);
    }
    static import(json) {
        const data = JSON.parse(json);
        const builder = new ToolBuilder(data.tool.name, data.tool.description);
        builder.tool = data.tool;
        builder.composition = data.composition;
        return builder;
    }
}
exports.ToolBuilder = ToolBuilder;
/**
 * Tool Template Factory - Pre-built tool templates
 */
class ToolTemplateFactory {
    static createPollTool(question, options) {
        const builder = new ToolBuilder('Quick Poll', `Poll: ${question}`);
        builder
            .setType('poll')
            .setCategory('social')
            .setVisibility('space');
        // Add question display
        const questionId = builder.addElement('display-text', {
            text: question,
            variant: 'h2'
        }, { x: 100, y: 50 });
        // Add radio buttons for options
        let yPos = 150;
        const optionIds = [];
        options.forEach((option, index) => {
            const optionId = builder.addElement('radio', {
                label: option,
                value: index
            }, { x: 100, y: yPos });
            optionIds.push(optionId);
            yPos += 60;
        });
        // Add submit button
        const submitId = builder.addElement('button', {
            label: 'Submit Vote',
            variant: 'primary'
        }, { x: 100, y: yPos });
        // Add results display
        const resultsId = builder.addElement('display-chart', {
            type: 'bar',
            title: 'Results'
        }, { x: 400, y: 150 });
        return builder;
    }
    static createFormTool(fields) {
        const builder = new ToolBuilder('Data Collection Form', 'Custom form for data collection');
        builder
            .setType('form')
            .setCategory('productivity')
            .setVisibility('space');
        let yPos = 50;
        const fieldIds = [];
        fields.forEach(field => {
            const elementType = field.type === 'text' ? 'text-input' :
                field.type === 'number' ? 'number-input' :
                    field.type === 'date' ? 'date-picker' :
                        field.type === 'file' ? 'file-upload' : 'text-input';
            const fieldId = builder.addElement(elementType, {
                label: field.name,
                required: true
            }, { x: 100, y: yPos });
            fieldIds.push(fieldId);
            yPos += 80;
        });
        // Add submit button
        builder.addElement('button', {
            label: 'Submit',
            variant: 'primary'
        }, { x: 100, y: yPos });
        return builder;
    }
    static createSchedulerTool() {
        const builder = new ToolBuilder('Appointment Scheduler', 'Schedule appointments and meetings');
        builder
            .setType('scheduler')
            .setCategory('productivity')
            .setVisibility('space');
        // Add calendar view
        const calendarId = builder.addElement('date-picker', {
            label: 'Select Date'
        }, { x: 100, y: 50 });
        // Add time slots
        const timeSlotsId = builder.addElement('dropdown', {
            label: 'Available Times',
            options: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM']
        }, { x: 100, y: 150 });
        // Add description field
        const descriptionId = builder.addElement('text-input', {
            label: 'Description',
            placeholder: 'What is this appointment for?'
        }, { x: 100, y: 250 });
        // Add book button
        const bookId = builder.addElement('button', {
            label: 'Book Appointment',
            variant: 'primary'
        }, { x: 100, y: 350 });
        // Connect elements
        builder.connect(calendarId, 'value', timeSlotsId, 'date');
        return builder;
    }
}
exports.ToolTemplateFactory = ToolTemplateFactory;
//# sourceMappingURL=tool-builder.js.map