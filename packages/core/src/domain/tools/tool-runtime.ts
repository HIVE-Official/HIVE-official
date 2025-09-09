/**
 * Tool Runtime Engine - Executes tool compositions
 */

import {
  Tool,
  ToolComposition,
  ComposedElement,
  ElementConnection,
  Variable,
  Trigger,
  Action,
  ToolInstance,
  InstanceState,
  DataType
} from './tool';
import { ElementRegistry } from './element-registry';
import { v4 as uuidv4 } from 'uuid';

/**
 * Runtime Context - Manages execution state
 */
export class RuntimeContext {
  private variables: Map<string, any> = new Map();
  private elementStates: Map<string, any> = new Map();
  private eventHandlers: Map<string, Function[]> = new Map();
  private errors: Error[] = [];

  constructor(
    private instanceId: string,
    private composition: ToolComposition,
    initialVariables?: Record<string, any>
  ) {
    // Initialize variables
    composition.variables.forEach(variable => {
      const value = initialVariables?.[variable.name] ?? variable.defaultValue ?? null;
      this.variables.set(variable.id, value);
    });
  }

  // Variable management
  getVariable(id: string): any {
    return this.variables.get(id);
  }

  setVariable(id: string, value: any): void {
    this.variables.set(id, value);
    this.emit('variable:changed', { id, value });
  }

  // Element state management
  getElementState(instanceId: string): any {
    return this.elementStates.get(instanceId) || {};
  }

  setElementState(instanceId: string, state: any): void {
    this.elementStates.set(instanceId, state);
    this.emit('element:stateChanged', { instanceId, state });
  }

  updateElementState(instanceId: string, updates: any): void {
    const current = this.getElementState(instanceId);
    this.setElementState(instanceId, { ...current, ...updates });
  }

  // Event handling
  on(event: string, handler: Function): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  off(event: string, handler: Function): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit(event: string, data?: any): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          this.addError(new Error(`Event handler error: ${error}`));
        }
      });
    }
  }

  // Error handling
  addError(error: Error): void {
    this.errors.push(error);
    this.emit('error', error);
  }

  getErrors(): Error[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  // Snapshot for persistence
  snapshot(): any {
    return {
      instanceId: this.instanceId,
      variables: Object.fromEntries(this.variables),
      elementStates: Object.fromEntries(this.elementStates),
      errors: this.errors.map(e => e.message)
    };
  }

  static restore(composition: ToolComposition, snapshot: any): RuntimeContext {
    const context = new RuntimeContext(snapshot.instanceId, composition);
    
    Object.entries(snapshot.variables).forEach(([id, value]) => {
      context.variables.set(id, value);
    });
    
    Object.entries(snapshot.elementStates).forEach(([id, state]) => {
      context.elementStates.set(id, state);
    });
    
    snapshot.errors?.forEach((message: string) => {
      context.addError(new Error(message));
    });
    
    return context;
  }
}

/**
 * Tool Runtime Engine - Main execution engine
 */
export class ToolRuntimeEngine {
  private static instance: ToolRuntimeEngine;
  private registry: ElementRegistry;
  private instances: Map<string, ToolInstance> = new Map();
  private contexts: Map<string, RuntimeContext> = new Map();
  private executionQueue: ExecutionTask[] = [];
  private isProcessing = false;

  private constructor() {
    this.registry = ElementRegistry.getInstance();
  }

  static getInstance(): ToolRuntimeEngine {
    if (!ToolRuntimeEngine.instance) {
      ToolRuntimeEngine.instance = new ToolRuntimeEngine();
    }
    return ToolRuntimeEngine.instance;
  }

  /**
   * Create and start a new tool instance
   */
  async createInstance(
    tool: Tool,
    composition: ToolComposition,
    userId: string,
    spaceId: string,
    initialData?: Record<string, any>
  ): Promise<ToolInstance> {
    const instanceId = uuidv4();
    
    const instance: ToolInstance = {
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
  async execute(instanceId: string): Promise<void> {
    const instance = this.instances.get(instanceId);
    const context = this.contexts.get(instanceId);
    const composition = await this.getComposition(instance!.toolId);

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

    } catch (error) {
      instance.state.status = 'error';
      instance.state.errors = [error as Error];
      context.addError(error as Error);
    }
  }

  /**
   * Process data flow through connected elements
   */
  private async processDataFlow(
    composition: ToolComposition,
    context: RuntimeContext
  ): Promise<void> {
    const processed = new Set<string>();
    const processing = new Set<string>();

    const processElement = async (element: ComposedElement): Promise<void> => {
      if (processed.has(element.instanceId)) return;
      if (processing.has(element.instanceId)) {
        throw new Error(`Circular dependency detected at ${element.instanceId}`);
      }

      processing.add(element.instanceId);

      // Get incoming connections
      const incomingConnections = composition.connections.filter(
        conn => conn.to.instanceId === element.instanceId
      );

      // Process dependencies first
      for (const conn of incomingConnections) {
        const sourceElement = composition.elements.find(
          el => el.instanceId === conn.from.instanceId
        );
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
  private async processElement(
    element: ComposedElement,
    composition: ToolComposition,
    context: RuntimeContext
  ): Promise<void> {
    const elementDef = this.registry.getElement(element.elementId);
    if (!elementDef) {
      throw new Error(`Element ${element.elementId} not found`);
    }

    // Get input data from connections
    const inputData: Record<string, any> = {};
    const incomingConnections = composition.connections.filter(
      conn => conn.to.instanceId === element.instanceId
    );

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
      const isVisible = await this.evaluateCondition(
        element.visibility.condition,
        context
      );
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
    const outputData = await this.executeElementLogic(
      elementDef,
      element,
      inputData,
      context
    );

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
  private async executeElementLogic(
    elementDef: any,
    element: ComposedElement,
    inputData: Record<string, any>,
    context: RuntimeContext
  ): Promise<Record<string, any>> {
    const output: Record<string, any> = {};

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
        } else if (elementDef.type === 'timer') {
          // Start/stop timer logic
          const duration = element.config.duration || 60;
          output.remaining = duration;
          // Would implement actual timer logic here
        }
        break;

      case 'logic':
        // Logic elements perform computations
        if (elementDef.type === 'condition') {
          const result = this.evaluateOperator(
            inputData.value,
            inputData.compare,
            element.config.operator
          );
          output.true = result ? inputData.value : null;
          output.false = !result ? inputData.value : null;
        } else if (elementDef.type === 'calculation') {
          output.result = this.calculate(
            inputData.a,
            inputData.b,
            element.config.operation
          );
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
  private async applyTransform(value: any, transform: any): Promise<any> {
    switch (transform.type) {
      case 'map':
        return Array.isArray(value) 
          ? value.map((v: any) => eval(transform.function)(v))
          : eval(transform.function)(value);
      
      case 'filter':
        return Array.isArray(value)
          ? value.filter((v: any) => eval(transform.function)(v))
          : value;
      
      case 'reduce':
        return Array.isArray(value)
          ? value.reduce(eval(transform.function))
          : value;
      
      case 'custom':
        return eval(transform.function)(value);
      
      default:
        return value;
    }
  }

  private async evaluateCondition(condition: string, context: RuntimeContext): Promise<boolean> {
    try {
      // Simple condition evaluation - in production, use a safe expression evaluator
      const variables = context.snapshot().variables;
      const func = new Function(...Object.keys(variables), `return ${condition}`);
      return func(...Object.values(variables));
    } catch {
      return false;
    }
  }

  private async validateRule(data: any, rule: any, context: RuntimeContext): Promise<boolean> {
    switch (rule.type) {
      case 'required':
        return data != null && data !== '';
      case 'min':
        return data >= rule.value;
      case 'max':
        return data <= rule.value;
      case 'pattern':
        return new RegExp(rule.value).test(data);
      case 'custom':
        return await this.evaluateCondition(rule.value, context);
      default:
        return true;
    }
  }

  private evaluateOperator(a: any, b: any, operator: string): boolean {
    switch (operator) {
      case 'equals':
        return a === b;
      case 'not-equals':
        return a !== b;
      case 'greater':
        return a > b;
      case 'less':
        return a < b;
      case 'contains':
        return String(a).includes(String(b));
      default:
        return false;
    }
  }

  private calculate(a: number, b: number, operation: string): number {
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

  private setupEventListeners(
    instanceId: string,
    composition: ToolComposition,
    context: RuntimeContext
  ): void {
    // Set up trigger listeners
    composition.triggers.forEach(trigger => {
      context.on(trigger.event, async () => {
        if (trigger.condition) {
          const shouldTrigger = await this.evaluateCondition(trigger.condition, context);
          if (!shouldTrigger) return;
        }

        // Execute actions
        for (const action of trigger.actions) {
          await this.executeAction(action, context);
        }
      });
    });
  }

  private async executeAction(action: Action, context: RuntimeContext): Promise<void> {
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

  private async initializeElements(
    composition: ToolComposition,
    context: RuntimeContext
  ): Promise<void> {
    for (const element of composition.elements) {
      context.setElementState(element.instanceId, {
        config: element.config,
        position: element.position,
        size: element.size
      });
    }
  }

  private async getComposition(toolId: string): Promise<ToolComposition | null> {
    // In production, this would fetch from database
    return null;
  }

  /**
   * Instance management methods
   */
  getInstance(instanceId: string): ToolInstance | undefined {
    return this.instances.get(instanceId);
  }

  pauseInstance(instanceId: string): void {
    const instance = this.instances.get(instanceId);
    if (instance) {
      instance.state.status = 'paused';
    }
  }

  resumeInstance(instanceId: string): void {
    const instance = this.instances.get(instanceId);
    if (instance && instance.state.status === 'paused') {
      instance.state.status = 'running';
      this.execute(instanceId);
    }
  }

  stopInstance(instanceId: string): void {
    const instance = this.instances.get(instanceId);
    if (instance) {
      instance.state.status = 'completed';
      this.instances.delete(instanceId);
      this.contexts.delete(instanceId);
    }
  }

  getActiveInstances(): ToolInstance[] {
    return Array.from(this.instances.values()).filter(
      instance => instance.state.status === 'running'
    );
  }
}

/**
 * Execution Task for queue processing
 */
interface ExecutionTask {
  instanceId: string;
  elementId: string;
  priority: number;
  timestamp: Date;
}