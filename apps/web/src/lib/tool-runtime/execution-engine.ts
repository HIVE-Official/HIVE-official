/**
 * Tool Execution Engine
 * Client-side runtime for executing HiveLab tools
 */

import { 
  ElementDefinition, 
  ExecutionContext,
  StorageService,
  ApiService,
  UIService,
  EventService,
  getElement
} from './element-registry';
import { authenticatedFetch } from '../auth-utils';

export interface ToolInstance {
  id: string;
  toolId: string;
  spaceId: string;
  elements: ToolElement[];
  connections: ElementConnection[];
  variables: Record<string, any>;
  config: ToolConfig;
}

export interface ToolElement {
  id: string;
  elementId: string; // Reference to element definition
  position: { x: number; y: number };
  config: Record<string, any>;
}

export interface ElementConnection {
  id: string;
  from: { elementId: string; portId: string };
  to: { elementId: string; portId: string };
  type: 'data' | 'trigger';
}

export interface ToolConfig {
  name: string;
  description: string;
  autoRun: boolean;
  triggers: string[];
  permissions: {
    canExecute: string[];
    dataAccess: string[];
  };
}

export interface ExecutionResult {
  success: boolean;
  outputs: Record<string, any>;
  errors: string[];
  logs: ExecutionLog[];
  duration: number;
}

export interface ExecutionLog {
  timestamp: Date;
  level: 'debug' | 'info' | 'warning' | 'error';
  message: string;
  elementId?: string;
  data?: any;
}

export class ToolExecutionEngine {
  private context: ExecutionContext;
  private instance: ToolInstance;
  private executionStack: string[] = [];
  private outputs: Map<string, any> = new Map();
  private logs: ExecutionLog[] = [];
  private startTime: number = 0;
  private abortController: AbortController;

  constructor(
    instance: ToolInstance,
    userId: string,
    onUIUpdate?: (elementId: string, data: any) => void,
    onToast?: (message: string, type: string) => void
  ) {
    this.instance = instance;
    this.abortController = new AbortController();
    
    // Initialize execution context
    this.context = {
      toolId: instance.toolId,
      spaceId: instance.spaceId,
      userId,
      storage: this.createStorageService(),
      api: this.createApiService(),
      ui: this.createUIService(onUIUpdate, onToast),
      events: this.createEventService(),
      variables: new Map(Object.entries(instance.variables || {})),
      inputs: {},
      timestamp: new Date()
    };
  }

  /**
   * Execute the tool
   */
  async execute(inputs: Record<string, any> = {}): Promise<ExecutionResult> {
    this.startTime = Date.now();
    this.context.inputs = inputs;
    this.logs = [];
    this.outputs.clear();
    this.executionStack = [];

    try {
      this.log('info', 'Starting tool execution', { toolId: this.instance.toolId });

      // Find entry points (elements with no incoming connections or button triggers)
      const entryPoints = this.findEntryPoints();
      
      if (entryPoints.length === 0) {
        throw new Error('No entry points found in tool');
      }

      // Execute each entry point
      for (const elementId of entryPoints) {
        if (this.abortController.signal.aborted) {
          throw new Error('Execution aborted');
        }
        
        await this.executeElement(elementId);
      }

      this.log('info', 'Tool execution completed successfully');

      return {
        success: true,
        outputs: Object.fromEntries(this.outputs),
        errors: [],
        logs: this.logs,
        duration: Date.now() - this.startTime
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log('error', `Tool execution failed: ${errorMessage}`, { error });

      return {
        success: false,
        outputs: Object.fromEntries(this.outputs),
        errors: [errorMessage],
        logs: this.logs,
        duration: Date.now() - this.startTime
      };
    }
  }

  /**
   * Abort execution
   */
  abort(): void {
    this.abortController.abort();
    this.log('warning', 'Execution aborted by user');
  }

  /**
   * Execute a single element
   */
  private async executeElement(elementId: string): Promise<any> {
    // Check for circular dependencies
    if (this.executionStack.includes(elementId)) {
      throw new Error(`Circular dependency detected: ${elementId}`);
    }

    this.executionStack.push(elementId);

    try {
      const element = this.instance.elements.find(e => e.id === elementId);
      if (!element) {
        throw new Error(`Element not found: ${elementId}`);
      }

      const definition = getElement(element.elementId);
      if (!definition) {
        throw new Error(`Element definition not found: ${element.elementId}`);
      }

      this.log('debug', `Executing element: ${definition.name}`, { elementId });

      // Gather input values from connected elements
      const inputValues = await this.gatherInputs(elementId, definition);

      // Create element-specific context
      const elementContext: ExecutionContext = {
        ...this.context,
        inputs: inputValues
      };

      // Execute the element
      const result = await definition.executor(elementContext, element.config);

      // Store output
      this.outputs.set(elementId, result);

      // Process outgoing connections
      await this.processOutgoingConnections(elementId, result);

      return result;

    } finally {
      this.executionStack.pop();
    }
  }

  /**
   * Gather input values for an element
   */
  private async gatherInputs(
    elementId: string,
    definition: ElementDefinition
  ): Promise<Record<string, any>> {
    const inputs: Record<string, any> = {};

    if (!definition.inputs) {
      return inputs;
    }

    // Find incoming connections
    const incomingConnections = this.instance.connections.filter(
      conn => conn.to.elementId === elementId
    );

    for (const inputDef of definition.inputs) {
      const connection = incomingConnections.find(
        conn => conn.to.portId === inputDef.id
      );

      if (connection) {
        // Get value from connected element
        const sourceValue = this.outputs.get(connection.from.elementId);
        
        if (sourceValue === undefined) {
          // Execute source element if not yet executed
          await this.executeElement(connection.from.elementId);
          inputs[inputDef.id] = this.outputs.get(connection.from.elementId);
        } else {
          inputs[inputDef.id] = sourceValue;
        }
      } else {
        // Use default value or user input
        inputs[inputDef.id] = this.context.inputs[`${elementId}.${inputDef.id}`];
      }
    }

    return inputs;
  }

  /**
   * Process outgoing connections from an element
   */
  private async processOutgoingConnections(
    elementId: string,
    result: any
  ): Promise<void> {
    const outgoingConnections = this.instance.connections.filter(
      conn => conn.from.elementId === elementId
    );

    for (const connection of outgoingConnections) {
      if (connection.type === 'trigger') {
        // For trigger connections, execute target immediately
        await this.executeElement(connection.to.elementId);
      }
      // Data connections are handled when target element requests inputs
    }
  }

  /**
   * Find entry point elements
   */
  private findEntryPoints(): string[] {
    const hasIncoming = new Set(
      this.instance.connections.map(conn => conn.to.elementId)
    );

    return this.instance.elements
      .filter(element => {
        // Elements with no incoming connections
        if (!hasIncoming.has(element.id)) {
          return true;
        }

        // Button elements are always entry points
        const definition = getElement(element.elementId);
        return definition?.id === 'button';
      })
      .map(element => element.id);
  }

  /**
   * Create storage service
   */
  private createStorageService(): StorageService {
    const storageKey = `tool_${this.instance.toolId}_storage`;
    const storage = JSON.parse(
      localStorage.getItem(storageKey) || '{}'
    );

    return {
      get: (key: string) => storage[key],
      set: (key: string, value: any) => {
        storage[key] = value;
        localStorage.setItem(storageKey, JSON.stringify(storage));
      },
      delete: (key: string) => {
        delete storage[key];
        localStorage.setItem(storageKey, JSON.stringify(storage));
      },
      clear: () => {
        localStorage.removeItem(storageKey);
      }
    };
  }

  /**
   * Create API service
   */
  private createApiService(): ApiService {
    return {
      fetch: (url: string, options?: globalThis.RequestInit) => {
        return fetch(url, {
          ...options,
          signal: this.abortController.signal
        });
      },
      spaceData: async (path: string, options?: any) => {
        const response = await authenticatedFetch(
          `/api/spaces/${this.instance.spaceId}/${path}`,
          {
            ...options,
            signal: this.abortController.signal
          }
        );
        return response.json();
      },
      userData: async (path: string, options?: any) => {
        const response = await authenticatedFetch(
          `/api/users/${this.context.userId}/${path}`,
          {
            ...options,
            signal: this.abortController.signal
          }
        );
        return response.json();
      }
    };
  }

  /**
   * Create UI service
   */
  private createUIService(
    onUIUpdate?: (elementId: string, data: any) => void,
    onToast?: (message: string, type: string) => void
  ): UIService {
    return {
      showToast: (message: string, type = 'info') => {
        this.log('info', `Toast: ${message}`, { type });
        onToast?.(message, type);
      },
      showModal: async (content: any) => {
        this.log('info', 'Modal shown', { content });
        // Return a promise that resolves when modal is closed
        return new Promise(resolve => {
          // In real implementation, this would show a modal
          setTimeout(() => resolve(null), 100);
        });
      },
      updateDisplay: (elementId: string, data: any) => {
        this.log('debug', `Display updated: ${elementId}`, { data });
        onUIUpdate?.(elementId, data);
      }
    };
  }

  /**
   * Create event service
   */
  private createEventService(): EventService {
    const listeners = new Map<string, Set<(data: any) => void>>();

    return {
      emit: (event: string, data: any) => {
        this.log('debug', `Event emitted: ${event}`, { data });
        const handlers = listeners.get(event);
        if (handlers) {
          handlers.forEach(handler => handler(data));
        }
      },
      on: (event: string, handler: (data: any) => void) => {
        if (!listeners.has(event)) {
          listeners.set(event, new Set());
        }
        listeners.get(event)!.add(handler);
      },
      off: (event: string, handler: (data: any) => void) => {
        listeners.get(event)?.delete(handler);
      }
    };
  }

  /**
   * Log execution event
   */
  private log(
    level: ExecutionLog['level'],
    message: string,
    data?: any
  ): void {
    this.logs.push({
      timestamp: new Date(),
      level,
      message,
      data
    });

    // Console output for debugging
    if (process.env.NODE_ENV === 'development') {
      const logFn = level === 'error' ? console.error :
                   level === 'warning' ? console.warn :
                   level === 'debug' ? console.debug :
                   console.log;
      
      logFn(`[ToolEngine] ${message}`, data || '');
    }
  }
}

/**
 * Validate tool before execution
 */
export function validateTool(instance: ToolInstance): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check for required elements
  if (instance.elements.length === 0) {
    errors.push('Tool must have at least one element');
  }

  // Validate each element
  for (const element of instance.elements) {
    const definition = getElement(element.elementId);
    if (!definition) {
      errors.push(`Unknown element type: ${element.elementId}`);
      continue;
    }

    // Validate element configuration
    for (const prop of definition.properties) {
      if (prop.required && !element.config[prop.key]) {
        errors.push(`${definition.name}: ${prop.label} is required`);
      }
    }
  }

  // Validate connections
  for (const connection of instance.connections) {
    const fromElement = instance.elements.find(e => e.id === connection.from.elementId);
    const toElement = instance.elements.find(e => e.id === connection.to.elementId);

    if (!fromElement || !toElement) {
      errors.push('Invalid connection: element not found');
      continue;
    }

    // Check port compatibility
    const fromDef = getElement(fromElement.elementId);
    const toDef = getElement(toElement.elementId);

    if (!fromDef || !toDef) {
      continue;
    }

    const fromPort = fromDef.outputs?.find(p => p.id === connection.from.portId);
    const toPort = toDef.inputs?.find(p => p.id === connection.to.portId);

    if (!fromPort || !toPort) {
      errors.push('Invalid connection: port not found');
    } else if (fromPort.type !== toPort.type) {
      errors.push(`Incompatible connection: ${fromPort.type} to ${toPort.type}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}