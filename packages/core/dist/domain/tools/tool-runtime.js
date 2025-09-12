"use strict";
/**
 * Tool Runtime Engine - Executes tool compositions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolRuntimeEngine = exports.RuntimeContext = void 0;
const element_registry_1 = require("./element-registry");
const uuid_1 = require("uuid");
class RuntimeContext {
    constructor(instanceId, composition, initialVariables) {
        this.instanceId = instanceId;
        this.composition = composition;
        this.variables = new Map();
        this.elementStates = new Map();
        this.eventHandlers = new Map();
        this.errors = [];
        // Initialize variables
        composition.variables.forEach(variable => {
            const value = initialVariables?.[variable.name] ?? variable.defaultValue ?? null;
            this.variables.set(variable.id, { value });
        });
    }
    // Variable management
    getVariable(id) {
        return this.variables.get(id)?.value;
    }
    setVariable(id, value) {
        this.variables.set(id, { value });
        this.emit('variable:changed', { id, value });
    }
    // Element state management
    getElementState(instanceId) {
        return this.elementStates.get(instanceId) || { data: null };
    }
    setElementState(instanceId, state) {
        this.elementStates.set(instanceId, state);
        this.emit('element:stateChanged', { instanceId, state });
    }
    updateElementState(instanceId, updates) {
        const current = this.getElementState(instanceId);
        this.setElementState(instanceId, { ...current, ...updates });
    }
    // Event handling
    on(event, handler) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event).push(handler);
    }
    off(event, handler) {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }
    emit(event, data) {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            handlers.forEach(handler => {
                try {
                    handler(data);
                }
                catch (error) {
                    this.addError(new Error(`Event handler error: ${error}`));
                }
            });
        }
    }
    // Error handling
    addError(error) {
        this.errors.push(error);
        this.emit('error', error);
    }
    getErrors() {
        return [...this.errors];
    }
    clearErrors() {
        this.errors = [];
    }
    hasErrors() {
        return this.errors.length > 0;
    }
    // Snapshot for persistence
    snapshot() {
        return {
            instanceId: this.instanceId,
            variables: Object.fromEntries(this.variables),
            elementStates: Object.fromEntries(this.elementStates),
            errors: this.errors.map(e => e.message)
        };
    }
    static restore(composition, snapshot) {
        const context = new RuntimeContext(snapshot.instanceId, composition);
        Object.entries(snapshot.variables).forEach(([id, value]) => {
            context.variables.set(id, value);
        });
        Object.entries(snapshot.elementStates).forEach(([id, state]) => {
            context.elementStates.set(id, state);
        });
        snapshot.errors?.forEach((message) => {
            context.addError(new Error(message));
        });
        return context;
    }
}
exports.RuntimeContext = RuntimeContext;
/**
 * Tool Runtime Engine - Main execution engine
 */
class ToolRuntimeEngine {
    constructor() {
        this.instances = new Map();
        this.contexts = new Map();
        this.executionQueue = [];
        this.isProcessing = false;
        this.registry = element_registry_1.ElementRegistry.getInstance();
    }
    static getInstance() {
        if (!ToolRuntimeEngine.instance) {
            ToolRuntimeEngine.instance = new ToolRuntimeEngine();
        }
        return ToolRuntimeEngine.instance;
    }
    /**
     * Create and start a new tool instance
     */
    async createInstance(tool, composition, userId, spaceId, initialData) {
        const instanceId = (0, uuid_1.v4)();
        const instance = {
            id: instanceId,
            toolId: tool.id,
            spaceId,
            userId,
            state: {
                status: 'idle',
                variables: initialData || {}
            },
            data: {},
            config: tool.configuration.defaultSettings,
            startedAt: new Date(),
            lastActivity: new Date()
        };
        const context = new RuntimeContext(instanceId, composition, initialData);
        this.instances.set(instanceId, instance);
        this.contexts.set(instanceId, context);
        // Set up event listeners
        this.setupEventListeners(instanceId, composition, context);
        // Initialize elements
        await this.initializeElements(composition, context);
        // Start execution
        instance.state.status = 'running';
        await this.execute(instanceId);
        return instance;
    }
    /**
     * Execute a tool instance
     */
    async execute(instanceId) {
        const instance = this.instances.get(instanceId);
        const context = this.contexts.get(instanceId);
        const composition = await this.getComposition(instance.toolId);
        if (!instance || !context || !composition) {
            throw new Error(`Instance ${instanceId} not found`);
        }
        try {
            // Process data flow
            await this.processDataFlow(composition, context);
            // Check for errors
            if (context.hasErrors()) {
                instance.state.status = 'error';
                instance.state.errors = context.getErrors();
                return;
            }
            // Update instance state
            instance.state.variables = context.snapshot().variables;
            instance.lastActivity = new Date();
        }
        catch (error) {
            instance.state.status = 'error';
            instance.state.errors = [error];
            context.addError(error);
        }
    }
    /**
     * Process data flow through connected elements
     */
    async processDataFlow(composition, context) {
        const processed = new Set();
        const processing = new Set();
        const processElement = async (element) => {
            if (processed.has(element.instanceId))
                return;
            if (processing.has(element.instanceId)) {
                throw new Error(`Circular dependency detected at ${element.instanceId}`);
            }
            processing.add(element.instanceId);
            // Get incoming connections
            const incomingConnections = composition.connections.filter(conn => conn.to.instanceId === element.instanceId);
            // Process dependencies first
            for (const conn of incomingConnections) {
                const sourceElement = composition.elements.find(el => el.instanceId === conn.from.instanceId);
                if (sourceElement && !processed.has(sourceElement.instanceId)) {
                    await processElement(sourceElement);
                }
            }
            // Process this element
            await this.processElement(element, composition, context);
            processing.delete(element.instanceId);
            processed.add(element.instanceId);
        };
        // Process all elements
        for (const element of composition.elements) {
            await processElement(element);
        }
    }
    /**
     * Process a single element
     */
    async processElement(element, composition, context) {
        const elementDef = this.registry.getElement(element.elementId);
        if (!elementDef) {
            throw new Error(`Element ${element.elementId} not found`);
        }
        // Get input data from connections
        const inputData = {};
        const incomingConnections = composition.connections.filter(conn => conn.to.instanceId === element.instanceId);
        for (const conn of incomingConnections) {
            const sourceState = context.getElementState(conn.from.instanceId);
            const value = sourceState[conn.from.portId];
            // Apply transformation if defined
            const transformedValue = conn.transform
                ? await this.applyTransform(value, conn.transform)
                : value;
            inputData[conn.to.portId] = transformedValue;
        }
        // Check visibility condition
        if (element.visibility?.condition) {
            const isVisible = await this.evaluateCondition(element.visibility.condition, context);
            if (!isVisible) {
                context.updateElementState(element.instanceId, { visible: false });
                return;
            }
        }
        // Validate inputs
        if (element.validation) {
            for (const rule of element.validation) {
                const isValid = await this.validateRule(inputData, rule, context);
                if (!isValid) {
                    context.addError(new Error(rule.message));
                    return;
                }
            }
        }
        // Execute element logic based on category
        const outputData = await this.executeElementLogic(elementDef, element, inputData, context);
        // Update element state
        context.setElementState(element.instanceId, {
            ...inputData,
            ...outputData,
            visible: true
        });
    }
    /**
     * Execute element-specific logic
     */
    async executeElementLogic(elementDef, element, inputData, context) {
        const output = {};
        switch (elementDef.category) {
            case 'input':
                // Input elements store their current value
                output.value = inputData.value ?? element.config.defaultValue ?? null;
                break;
            case 'display':
                // Display elements pass through data
                output.data = inputData.data ?? inputData.text ?? inputData.src ?? null;
                break;
            case 'action':
                // Action elements trigger events
                if (elementDef.type === 'button') {
                    context.emit(`element:${element.instanceId}:click`);
                }
                else if (elementDef.type === 'timer') {
                    // Start/stop timer logic
                    const duration = element.config.duration || 60;
                    output.remaining = duration;
                    // Would implement actual timer logic here
                }
                break;
            case 'logic':
                // Logic elements perform computations
                if (elementDef.type === 'condition') {
                    const result = this.evaluateOperator(inputData.value, inputData.compare, String(element.config.operator || ''));
                    output.true = result ? inputData.value : null;
                    output.false = !result ? inputData.value : null;
                }
                else if (elementDef.type === 'calculation') {
                    output.result = this.calculate(Number(inputData.a || 0), Number(inputData.b || 0), String(element.config.operation || 'add'));
                }
                break;
            case 'data':
                // Data elements fetch/process data
                // Would implement API calls, database queries, etc.
                break;
            case 'layout':
                // Layout elements don't process data
                break;
        }
        return output;
    }
    /**
     * Helper methods
     */
    async applyTransform(value, transform) {
        switch (transform.type) {
            case 'map':
                return Array.isArray(value)
                    ? value.map((v) => eval(transform.function)(v))
                    : eval(transform.function)(value);
            case 'filter':
                return Array.isArray(value)
                    ? value.filter((v) => eval(transform.function)(v))
                    : value;
            case 'reduce':
                return Array.isArray(value)
                    ? value.reduce(eval(transform.function), transform.initialValue)
                    : value;
            case 'custom':
                return eval(transform.function)(value);
            default:
                return value;
        }
    }
    async evaluateCondition(condition, context) {
        try {
            // Simple condition evaluation - in production, use a safe expression evaluator
            const variables = context.snapshot().variables;
            const func = new Function(...Object.keys(variables), `return ${condition}`);
            return func(...Object.values(variables));
        }
        catch {
            return false;
        }
    }
    async validateRule(data, rule, context) {
        switch (rule.type) {
            case 'required':
                return data != null && data !== '';
            case 'min':
                return Number(data) >= Number(rule.value || 0);
            case 'max':
                return Number(data) <= Number(rule.value || Infinity);
            case 'pattern':
                return rule.pattern ? new RegExp(rule.pattern).test(String(data)) : true;
            case 'custom':
                return await this.evaluateCondition(String(rule.value || ''), context);
            default:
                return true;
        }
    }
    evaluateOperator(a, b, operator) {
        switch (operator) {
            case 'equals':
                return a === b;
            case 'not-equals':
                return a !== b;
            case 'greater':
                return Number(a) > Number(b);
            case 'less':
                return Number(a) < Number(b);
            case 'contains':
                return String(a).includes(String(b));
            default:
                return false;
        }
    }
    calculate(a, b, operation) {
        switch (operation) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                return b !== 0 ? a / b : 0;
            case 'modulo':
                return b !== 0 ? a % b : 0;
            default:
                return 0;
        }
    }
    setupEventListeners(instanceId, composition, context) {
        // Set up trigger listeners
        composition.triggers.forEach(trigger => {
            context.on(trigger.event, async () => {
                if (trigger.condition) {
                    const shouldTrigger = await this.evaluateCondition(trigger.condition, context);
                    if (!shouldTrigger)
                        return;
                }
                // Execute actions
                for (const action of trigger.actions) {
                    await this.executeAction(action, context);
                }
            });
        });
    }
    async executeAction(action, context) {
        switch (action.type) {
            case 'set-variable':
                if (action.target) {
                    context.setVariable(action.target, action.payload);
                }
                break;
            case 'call-api':
                // Would implement API call logic
                break;
            case 'navigate':
                // Would implement navigation logic
                break;
            case 'show-modal':
                // Would implement modal display logic
                break;
            case 'custom':
                // Would implement custom action logic
                break;
        }
    }
    async initializeElements(composition, context) {
        for (const element of composition.elements) {
            context.setElementState(element.instanceId, {
                config: element.config,
                position: element.position,
                size: element.size
            });
        }
    }
    async getComposition(_toolId) {
        // In production, this would fetch from database
        return null;
    }
    /**
     * Instance management methods
     */
    getInstance(instanceId) {
        return this.instances.get(instanceId);
    }
    pauseInstance(instanceId) {
        const instance = this.instances.get(instanceId);
        if (instance) {
            instance.state.status = 'paused';
        }
    }
    resumeInstance(instanceId) {
        const instance = this.instances.get(instanceId);
        if (instance && instance.state.status === 'paused') {
            instance.state.status = 'running';
            this.execute(instanceId);
        }
    }
    stopInstance(instanceId) {
        const instance = this.instances.get(instanceId);
        if (instance) {
            instance.state.status = 'completed';
            this.instances.delete(instanceId);
            this.contexts.delete(instanceId);
        }
    }
    getActiveInstances() {
        return Array.from(this.instances.values()).filter(instance => instance.state.status === 'running');
    }
}
exports.ToolRuntimeEngine = ToolRuntimeEngine;
//# sourceMappingURL=tool-runtime.js.map