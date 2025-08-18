// HIVE Tool Execution Runtime - Safe execution environment for user-created tools

export interface ExecutionContext {
  userId: string;
  toolId: string;
  spaceId?: string;
  permissions: string[];
  timeout: number;
  maxMemory: number;
}

export interface ExecutionResult {
  success: boolean;
  result?: any;
  error?: string;
  executionTime: number;
  memoryUsed: number;
  logs: string[];
  metadata?: Record<string, any>;
}

export interface ToolDefinition {
  id: string;
  name: string;
  code: string;
  language: 'javascript' | 'typescript' | 'python';
  version: string;
  dependencies: string[];
  permissions: string[];
  schema: {
    inputs: Record<string, any>;
    outputs: Record<string, any>;
  };
  category: string;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

class SafeExecutionEnvironment {
  private context: ExecutionContext;
  private logs: string[] = [];
  private startTime: number = 0;
  private memoryStart: number = 0;

  constructor(context: ExecutionContext) {
    this.context = context;
  }

  // Safe console implementation
  private createSafeConsole(): typeof console {
    return {
      log: (...args: any[]) => {
        this.logs.push(`[LOG] ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ')}`);
      },
      warn: (...args: any[]) => {
        this.logs.push(`[WARN] ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ')}`);
      },
      error: (...args: any[]) => {
        this.logs.push(`[ERROR] ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ')}`);
      }
    } as typeof console;
  }

  // Safe HIVE API for tools
  private createHiveAPI() {
    return {
      // User data access (with permission checks)
      user: {
        getId: () => this.context.permissions.includes('user:read') ? this.context.userId : null,
        getProfile: async () => {
          if (!this.context.permissions.includes('user:read')) {
            throw new Error('Permission denied: user:read required');
          }
          // Return sanitized user data
          return { id: this.context.userId, name: 'Current User' };
        }
      },
      
      // Space data access
      space: {
        getId: () => this.context.spaceId,
        getMembers: async () => {
          if (!this.context.permissions.includes('space:read')) {
            throw new Error('Permission denied: space:read required');
          }
          // Return mock space data for now
          return [];
        }
      },
      
      // Data storage for tools
      storage: {
        get: async (key: string) => {
          if (!this.context.permissions.includes('storage:read')) {
            throw new Error('Permission denied: storage:read required');
          }
          // TODO: Implement secure tool storage
          return localStorage.getItem(`tool_${this.context.toolId}_${key}`);
        },
        set: async (key: string, value: any) => {
          if (!this.context.permissions.includes('storage:write')) {
            throw new Error('Permission denied: storage:write required');
          }
          // TODO: Implement secure tool storage
          localStorage.setItem(`tool_${this.context.toolId}_${key}`, JSON.stringify(value));
        },
        delete: async (key: string) => {
          if (!this.context.permissions.includes('storage:write')) {
            throw new Error('Permission denied: storage:write required');
          }
          localStorage.removeItem(`tool_${this.context.toolId}_${key}`);
        }
      },
      
      // HTTP requests (sandboxed)
      http: {
        get: async (url: string) => {
          if (!this.context.permissions.includes('network:read')) {
            throw new Error('Permission denied: network:read required');
          }
          // TODO: Implement safe HTTP client with domain restrictions
          return fetch(url);
        },
        post: async (url: string, data: any) => {
          if (!this.context.permissions.includes('network:write')) {
            throw new Error('Permission denied: network:write required');
          }
          return fetch(url, { method: 'POST', body: JSON.stringify(data) });
        }
      },
      
      // UI utilities
      ui: {
        showToast: (message: string, type: 'success' | 'error' | 'info' = 'info') => {
          // TODO: Integration with toast system
          this.logs.push(`[TOAST:${type}] ${message}`);
        },
        showModal: (title: string, content: string) => {
          // TODO: Integration with modal system
          this.logs.push(`[MODAL] ${title}: ${content}`);
        }
      }
    };
  }

  // Execute JavaScript/TypeScript code safely
  async executeJSCode(code: string, inputs: Record<string, any>): Promise<ExecutionResult> {
    this.startTime = Date.now();
    this.memoryStart = (performance as any).memory?.usedJSHeapSize || 0;
    this.logs = [];

    try {
      // Create sandboxed environment
      const sandbox = {
        console: this.createSafeConsole(),
        HIVE: this.createHiveAPI(),
        inputs: inputs,
        // Safe utilities
        JSON: JSON,
        Math: Math,
        Date: Date,
        Promise: Promise,
        setTimeout: (fn: Function, delay: number) => {
          if (delay > 5000) throw new Error('Timeout too long (max 5s)');
          return setTimeout(fn, delay);
        },
        // Blocked globals
        window: undefined,
        document: undefined,
        localStorage: undefined,
        sessionStorage: undefined,
        fetch: undefined,
        XMLHttpRequest: undefined,
        eval: undefined,
        Function: undefined
      };

      // Wrap code in async function
      const wrappedCode = `
        (async function() {
          ${code}
        })()
      `;

      // Create function with restricted scope
      const func = new Function(
        ...Object.keys(sandbox),
        `"use strict"; return ${wrappedCode}`
      );

      // Execute with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Execution timeout')), this.context.timeout);
      });

      const executionPromise = func(...Object.values(sandbox));
      const result = await Promise.race([executionPromise, timeoutPromise]);

      const executionTime = Date.now() - this.startTime;
      const memoryUsed = ((performance as any).memory?.usedJSHeapSize || 0) - this.memoryStart;

      return {
        success: true,
        result,
        executionTime,
        memoryUsed,
        logs: this.logs
      };

    } catch (error) {
      const executionTime = Date.now() - this.startTime;
      const memoryUsed = ((performance as any).memory?.usedJSHeapSize || 0) - this.memoryStart;

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime,
        memoryUsed,
        logs: this.logs
      };
    }
  }
}

export class ToolExecutionRuntime {
  private static instance: ToolExecutionRuntime;
  private runningTools: Map<string, AbortController> = new Map();

  static getInstance(): ToolExecutionRuntime {
    if (!ToolExecutionRuntime.instance) {
      ToolExecutionRuntime.instance = new ToolExecutionRuntime();
    }
    return ToolExecutionRuntime.instance;
  }

  async executeTool(
    tool: ToolDefinition,
    inputs: Record<string, any>,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    const executionId = `${tool.id}_${Date.now()}`;
    const abortController = new AbortController();
    this.runningTools.set(executionId, abortController);

    try {
      // Validate inputs against schema
      const validationResult = this.validateInputs(inputs, tool.schema.inputs);
      if (!validationResult.valid) {
        return {
          success: false,
          error: `Input validation failed: ${validationResult.errors.join(', ')}`,
          executionTime: 0,
          memoryUsed: 0,
          logs: []
        };
      }

      // Create execution environment
      const env = new SafeExecutionEnvironment(context);

      // Execute based on language
      let result: ExecutionResult;
      switch (tool.language) {
        case 'javascript':
        case 'typescript':
          result = await env.executeJSCode(tool.code, inputs);
          break;
        case 'python':
          // TODO: Implement Python execution (requires server-side runtime)
          result = {
            success: false,
            error: 'Python execution not yet supported in browser',
            executionTime: 0,
            memoryUsed: 0,
            logs: []
          };
          break;
        default:
          result = {
            success: false,
            error: `Unsupported language: ${tool.language}`,
            executionTime: 0,
            memoryUsed: 0,
            logs: []
          };
      }

      // Add metadata
      result.metadata = {
        toolId: tool.id,
        toolName: tool.name,
        executionId,
        userId: context.userId,
        spaceId: context.spaceId
      };

      return result;

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Execution failed',
        executionTime: 0,
        memoryUsed: 0,
        logs: []
      };
    } finally {
      this.runningTools.delete(executionId);
    }
  }

  cancelExecution(executionId: string): boolean {
    const controller = this.runningTools.get(executionId);
    if (controller) {
      controller.abort();
      this.runningTools.delete(executionId);
      return true;
    }
    return false;
  }

  getRunningExecutions(): string[] {
    return Array.from(this.runningTools.keys());
  }

  private validateInputs(
    inputs: Record<string, any>,
    schema: Record<string, any>
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const [key, definition] of Object.entries(schema)) {
      const value = inputs[key];

      // Check required fields
      if (definition.required && (value === undefined || value === null)) {
        errors.push(`Required field '${key}' is missing`);
        continue;
      }

      // Skip validation for optional missing fields
      if (value === undefined || value === null) continue;

      // Type validation
      if (definition.type) {
        const expectedType = definition.type;
        const actualType = typeof value;

        if (expectedType === 'array' && !Array.isArray(value)) {
          errors.push(`Field '${key}' must be an array`);
        } else if (expectedType !== 'array' && actualType !== expectedType) {
          errors.push(`Field '${key}' must be of type ${expectedType}`);
        }
      }

      // Length validation for strings
      if (typeof value === 'string') {
        if (definition.minLength && value.length < definition.minLength) {
          errors.push(`Field '${key}' must be at least ${definition.minLength} characters`);
        }
        if (definition.maxLength && value.length > definition.maxLength) {
          errors.push(`Field '${key}' must be no more than ${definition.maxLength} characters`);
        }
      }

      // Range validation for numbers
      if (typeof value === 'number') {
        if (definition.min !== undefined && value < definition.min) {
          errors.push(`Field '${key}' must be at least ${definition.min}`);
        }
        if (definition.max !== undefined && value > definition.max) {
          errors.push(`Field '${key}' must be no more than ${definition.max}`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Pre-built tool templates
export const toolTemplates = {
  calculator: {
    name: 'Simple Calculator',
    code: `
// Simple Calculator Tool
const { operation, a, b } = inputs;

let result;
switch (operation) {
  case 'add':
    result = a + b;
    break;
  case 'subtract':
    result = a - b;
    break;
  case 'multiply':
    result = a * b;
    break;
  case 'divide':
    if (b === 0) throw new Error('Division by zero');
    result = a / b;
    break;
  default:
    throw new Error('Invalid operation');
}


return { result, operation: \`\${a} \${operation} \${b}\` };
    `,
    schema: {
      inputs: {
        operation: { type: 'string', required: true },
        a: { type: 'number', required: true },
        b: { type: 'number', required: true }
      },
      outputs: {
        result: { type: 'number' },
        operation: { type: 'string' }
      }
    }
  },

  todoList: {
    name: 'Personal Todo List',
    code: `
// Personal Todo List Tool
const { action, task, id } = inputs;

// Get current todos from storage
let todos = await HIVE.storage.get('todos') || [];
todos = typeof todos === 'string' ? JSON.parse(todos) : todos;

switch (action) {
  case 'add':
    const newTodo = {
      id: Date.now().toString(),
      task,
      completed: false,
      createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    await HIVE.storage.set('todos', todos);
    HIVE.ui.showToast('Task added!', 'success');
    return { todos, added: newTodo };
    
  case 'complete':
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.completed = true;
      await HIVE.storage.set('todos', todos);
      HIVE.ui.showToast('Task completed!', 'success');
    }
    return { todos };
    
  case 'list':
    return { todos };
    
  default:
    throw new Error('Invalid action. Use: add, complete, or list');
}
    `,
    schema: {
      inputs: {
        action: { type: 'string', required: true },
        task: { type: 'string', required: false },
        id: { type: 'string', required: false }
      },
      outputs: {
        todos: { type: 'array' },
        added: { type: 'object', required: false }
      }
    }
  },

  spaceStats: {
    name: 'Space Statistics',
    code: `
// Space Statistics Tool
const spaceId = HIVE.space.getId();
if (!spaceId) {
  throw new Error('This tool must be run within a space');
}

const members = await HIVE.space.getMembers();
const memberCount = members.length;
const activeMembers = members.filter(m => m.lastActive > Date.now() - 24 * 60 * 60 * 1000).length;



return {
  spaceId,
  totalMembers: memberCount,
  activeMembers,
  activityRate: memberCount > 0 ? (activeMembers / memberCount) * 100 : 0,
  timestamp: new Date().toISOString()
};
    `,
    schema: {
      inputs: {},
      outputs: {
        spaceId: { type: 'string' },
        totalMembers: { type: 'number' },
        activeMembers: { type: 'number' },
        activityRate: { type: 'number' },
        timestamp: { type: 'string' }
      }
    }
  }
};

export default ToolExecutionRuntime;