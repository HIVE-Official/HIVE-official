/**
 * Tool Builder - Utilities for creating and composing tools
 */

import {
  Tool,
  ToolComposition,
  ComposedElement,
  ElementConnection,
  Variable,
  Trigger,
  Action,
  LayoutConfig,
  ThemeConfig,
  ToolType,
  ToolCategory,
  ToolVisibility,
  DataType
} from './tool';
import { ElementRegistry } from './element-registry';
import { v4 as uuidv4 } from 'uuid';

/**
 * Tool Builder Class - Main builder for creating tools
 */
export class ToolBuilder {
  private tool: Partial<Tool>;
  private composition: ToolComposition;
  private registry: ElementRegistry;

  constructor(name: string, description: string) {
    const toolId = uuidv4();
    
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
      id: uuidv4(),
      toolId,
      name,
      description,
      elements: [],
      connections: [],
      layout: { type: 'flow' },
      variables: [],
      triggers: []
    };

    this.registry = ElementRegistry.getInstance();
  }

  // Tool configuration methods
  setType(type: ToolType): ToolBuilder {
    this.tool.type = type;
    return this;
  }

  setCategory(category: ToolCategory): ToolBuilder {
    this.tool.category = category;
    return this;
  }

  setVisibility(visibility: ToolVisibility): ToolBuilder {
    this.tool.visibility = visibility;
    return this;
  }

  setAuthor(author: Tool['author']): ToolBuilder {
    this.tool.author = author;
    return this;
  }

  setMetadata(metadata: Partial<Tool['metadata']>): ToolBuilder {
    this.tool.metadata = {
      ...this.tool.metadata,
      ...metadata
    } as Tool['metadata'];
    return this;
  }

  // Composition methods
  addElement(
    elementId: string, 
    config?: Record<string, unknown>,
    position?: { x: number; y: number }
  ): string {
    const element = this.registry.getElement(elementId);
    if (!element) {
      throw new Error(`Element ${elementId} not found in registry`);
    }

    const instanceId = `${elementId}-${uuidv4().slice(0, 8)}`;
    
    const composedElement: ComposedElement = {
      instanceId,
      elementId,
      config: config || element.defaultConfig,
      position: position || { x: 0, y: 0 },
      size: { width: 200, height: 100 }
    };

    this.composition.elements.push(composedElement);
    return instanceId;
  }

  removeElement(instanceId: string): ToolBuilder {
    this.composition.elements = this.composition.elements.filter(
      el => el.instanceId !== instanceId
    );
    // Also remove related connections
    this.composition.connections = this.composition.connections.filter(
      conn => conn.from.instanceId !== instanceId && conn.to.instanceId !== instanceId
    );
    return this;
  }

  connect(
    fromInstanceId: string,
    fromPort: string,
    toInstanceId: string,
    toPort: string
  ): ToolBuilder {
    const fromElement = this.composition.elements.find(el => el.instanceId === fromInstanceId);
    const toElement = this.composition.elements.find(el => el.instanceId === toInstanceId);

    if (!fromElement || !toElement) {
      throw new Error('Elements not found for connection');
    }

    // Validate connection
    if (!this.registry.canConnect(fromElement.elementId, fromPort, toElement.elementId, toPort)) {
      throw new Error('Invalid connection: incompatible types');
    }

    const connection: ElementConnection = {
      id: uuidv4(),
      from: { instanceId: fromInstanceId, portId: fromPort },
      to: { instanceId: toInstanceId, portId: toPort }
    };

    this.composition.connections.push(connection);
    return this;
  }

  addVariable(name: string, type: Variable['type'], defaultValue?: unknown): ToolBuilder {
    const variable: Variable = {
      id: uuidv4(),
      name,
      type,
      defaultValue,
      scope: 'local'
    };

    this.composition.variables.push(variable);
    return this;
  }

  addTrigger(
    name: string,
    event: string,
    actions: Action[],
    condition?: string
  ): ToolBuilder {
    const trigger: Trigger = {
      id: uuidv4(),
      name,
      event,
      actions,
      condition
    };

    this.composition.triggers.push(trigger);
    return this;
  }

  setLayout(layout: LayoutConfig): ToolBuilder {
    this.composition.layout = layout;
    return this;
  }

  setTheme(theme: ThemeConfig): ToolBuilder {
    this.composition.theme = theme;
    return this;
  }

  // Validation and building
  validate(): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

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
    const connectedElements = new Set<string>();
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

  private hasCircularDependency(): boolean {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const hasCycle = (instanceId: string): boolean => {
      visited.add(instanceId);
      recursionStack.add(instanceId);

      const outgoing = this.composition.connections.filter(
        conn => conn.from.instanceId === instanceId
      );

      for (const conn of outgoing) {
        const targetId = conn.to.instanceId;
        
        if (!visited.has(targetId)) {
          if (hasCycle(targetId)) return true;
        } else if (recursionStack.has(targetId)) {
          return true;
        }
      }

      recursionStack.delete(instanceId);
      return false;
    };

    for (const element of this.composition.elements) {
      if (!visited.has(element.instanceId)) {
        if (hasCycle(element.instanceId)) return true;
      }
    }

    return false;
  }

  build(): { tool: Tool; composition: ToolComposition } {
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
        model: 'free' as const
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
    } as Tool;

    return {
      tool,
      composition: this.composition
    };
  }

  private generateDataSchema(): Tool['configuration']['dataSchema'] {
    const inputs: Record<string, DataType> = {};
    const outputs: Record<string, DataType> = {};

    this.composition.elements.forEach(el => {
      const element = this.registry.getElement(el.elementId);
      if (element) {
        element.inputs?.forEach(input => {
          inputs[`${el.instanceId}.${input.id}`] = input.type as DataType;
        });
        element.outputs?.forEach(output => {
          outputs[`${el.instanceId}.${output.id}`] = output.type as DataType;
        });
      }
    });

    return { inputs, outputs };
  }

  // Utility methods
  clone(): ToolBuilder {
    const clonedBuilder = new ToolBuilder(
      this.tool.name + ' (Copy)',
      this.tool.description || ''
    );
    
    const newToolId = uuidv4();
    clonedBuilder.tool = { ...this.tool, id: newToolId };
    clonedBuilder.composition = {
      ...this.composition,
      id: uuidv4(),
      toolId: newToolId,
      elements: this.composition.elements.map(el => ({ ...el })),
      connections: this.composition.connections.map(conn => ({ ...conn })),
      variables: this.composition.variables.map(v => ({ ...v })),
      triggers: this.composition.triggers.map(t => ({ ...t }))
    };
    
    return clonedBuilder;
  }

  export(): string {
    return JSON.stringify({
      tool: this.tool,
      composition: this.composition
    }, null, 2);
  }

  static import(json: string): ToolBuilder {
    const data = JSON.parse(json);
    const builder = new ToolBuilder(data.tool.name, data.tool.description);
    
    builder.tool = data.tool;
    builder.composition = data.composition;
    
    return builder;
  }
}

/**
 * Validation Result Interface
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Tool Template Factory - Pre-built tool templates
 */
export class ToolTemplateFactory {
  static createPollTool(question: string, options: string[]): ToolBuilder {
    const builder = new ToolBuilder('Quick Poll', `Poll: ${question}`);
    
    builder
      .setType('poll')
      .setCategory('social')
      .setVisibility('space');

    // Add question display
    const _questionId = builder.addElement('display-text', {
      text: question,
      variant: 'h2'
    }, { x: 100, y: 50 });

    // Add radio buttons for options
    let yPos = 150;
    const optionIds: string[] = [];
    
    options.forEach((option, index) => {
      const optionId = builder.addElement('radio', {
        label: option,
        value: index
      }, { x: 100, y: yPos });
      
      optionIds.push(optionId);
      yPos += 60;
    });

    // Add submit button
    const _submitId = builder.addElement('button', {
      label: 'Submit Vote',
      variant: 'primary'
    }, { x: 100, y: yPos });

    // Add results display
    const _resultsId = builder.addElement('display-chart', {
      type: 'bar',
      title: 'Results'
    }, { x: 400, y: 150 });

    return builder;
  }

  static createFormTool(fields: Array<{ name: string; type: string }>): ToolBuilder {
    const builder = new ToolBuilder('Data Collection Form', 'Custom form for data collection');
    
    builder
      .setType('form')
      .setCategory('productivity')
      .setVisibility('space');

    let yPos = 50;
    const fieldIds: string[] = [];

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

  static createSchedulerTool(): ToolBuilder {
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
    const _descriptionId = builder.addElement('text-input', {
      label: 'Description',
      placeholder: 'What is this appointment for?'
    }, { x: 100, y: 250 });

    // Add book button
    const _bookId = builder.addElement('button', {
      label: 'Book Appointment',
      variant: 'primary'
    }, { x: 100, y: 350 });

    // Connect elements
    builder.connect(calendarId, 'value', timeSlotsId, 'date');

    return builder;
  }
}