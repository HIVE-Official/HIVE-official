import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tool, Element, ComposedElement } from '@hive/core/domain/tools';
import { HIVE_ELEMENTS } from '@hive/core/domain/tools/element-registry';
import { ElementRenderer } from '@/components/tools/element-renderers';
import { ToolExecutor } from '@/components/tools/tool-executor';
import { ToolMarketplace } from '@/components/tools/tool-marketplace';
import { HiveLabBuilder } from '@/components/tools/hivelab/visual-builder';
import { DragDropProvider } from '@/components/tools/hivelab/drag-drop-context';

// Mock data
const mockTool: Tool = {
  id: 'test-tool',
  name: 'Test Tool',
  description: 'A test tool for integration testing',
  type: 'utility',
  category: 'productivity',
  visibility: 'public',
  composition: {
    elements: [
      {
        instanceId: 'text-1',
        elementId: 'text-input',
        config: {
          label: 'Your Name',
          placeholder: 'Enter your name',
          required: true
        }
      },
      {
        instanceId: 'button-1',
        elementId: 'button',
        config: {
          text: 'Submit',
          variant: 'primary'
        }
      }
    ],
    connections: []
  },
  creator: {
    id: 'user-1',
    name: 'Test User'
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

describe('Tools Integration Tests', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    });
  });

  describe('Element Rendering', () => {
    it('should render text input element correctly', () => {
      const element: ComposedElement = {
        instanceId: 'test-1',
        elementId: 'text-input',
        config: {
          label: 'Test Input',
          placeholder: 'Enter text'
        }
      };

      const elementDef = HIVE_ELEMENTS.find(e => e.id === 'text-input')!;

      render(
        <ElementRenderer
          element={element}
          elementDef={elementDef}
          isPreview={false}
        />
      );

      expect(screen.getByText('Test Input')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should render button element correctly', () => {
      const element: ComposedElement = {
        instanceId: 'button-1',
        elementId: 'button',
        config: {
          text: 'Click Me',
          variant: 'primary'
        }
      };

      const elementDef = HIVE_ELEMENTS.find(e => e.id === 'button')!;

      render(
        <ElementRenderer
          element={element}
          elementDef={elementDef}
          isPreview={false}
        />
      );

      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });
  });

  describe('Tool Executor', () => {
    it('should execute a tool and render all elements', () => {
      render(
        <ToolExecutor
          tool={mockTool}
          isPreview={false}
        />
      );

      expect(screen.getByText('Test Tool')).toBeInTheDocument();
      expect(screen.getByText('Your Name')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('should handle form submission', async () => {
      const onSave = (() => {});

      render(
        <ToolExecutor
          tool={mockTool}
          onSave={onSave}
          isPreview={false}
        />
      );

      const input = screen.getByPlaceholderText('Enter your name');
      const submitButton = screen.getByText('Submit');

      fireEvent.change(input, { target: { value: 'John Doe' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            'text-1': 'John Doe'
          })
        );
      });
    });
  });

  describe('Tool Marketplace', () => {
    it('should render marketplace with tools', () => {
      const mockTools: Tool[] = [mockTool];

      render(
        <QueryClientProvider client={queryClient}>
          <ToolMarketplace
            initialTools={mockTools}
            userInstalledTools={[]}
          />
        </QueryClientProvider>
      );

      expect(screen.getByText('Tool Marketplace')).toBeInTheDocument();
      expect(screen.getByText('Test Tool')).toBeInTheDocument();
    });

    it('should handle tool installation', async () => {
      const onInstall = (() => {}).mockResolvedValue(undefined);
      const mockTools: Tool[] = [mockTool];

      render(
        <QueryClientProvider client={queryClient}>
          <ToolMarketplace
            initialTools={mockTools}
            userInstalledTools={[]}
            onInstall={onInstall}
          />
        </QueryClientProvider>
      );

      const installButton = screen.getByText('Install');
      fireEvent.click(installButton);

      await waitFor(() => {
        expect(onInstall).toHaveBeenCalledWith('test-tool');
      });
    });
  });

  describe('HiveLab Builder', () => {
    it('should render builder interface', () => {
      render(
        <DragDropProvider>
          <HiveLabBuilder />
        </DragDropProvider>
      );

      expect(screen.getByPlaceholderText('Tool Name')).toBeInTheDocument();
      expect(screen.getByText('Elements')).toBeInTheDocument();
      expect(screen.getByText('Preview')).toBeInTheDocument();
    });

    it('should allow saving a tool', async () => {
      const onSave = (() => {}).mockResolvedValue(undefined);

      render(
        <DragDropProvider>
          <HiveLabBuilder onSave={onSave} />
        </DragDropProvider>
      );

      const nameInput = screen.getByPlaceholderText('Tool Name');
      fireEvent.change(nameInput, { target: { value: 'My New Tool' } });

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'My New Tool'
          })
        );
      });
    });
  });

  describe('Element Registry', () => {
    it('should have all required element types', () => {
      const requiredTypes = [
        'text-input',
        'number-input',
        'date-picker',
        'dropdown',
        'checkbox',
        'button',
        'container',
        'grid'
      ];

      requiredTypes.forEach(type => {
        const element = HIVE_ELEMENTS.find(e => e.id === type);
        expect(element).toBeDefined();
        expect(element?.type).toBe(type);
      });
    });

    it('should have valid element categories', () => {
      const validCategories = ['input', 'display', 'action', 'logic', 'layout'];

      HIVE_ELEMENTS.forEach(element => {
        expect(validCategories).toContain(element.category);
      });
    });
  });

  describe('End-to-End Tool Creation Flow', () => {
    it('should create, save, and execute a tool', async () => {
      const onSave = (() => {}).mockResolvedValue(mockTool);

      // Step 1: Create tool in builder
      const { rerender } = render(
        <DragDropProvider>
          <HiveLabBuilder onSave={onSave} initialTool={mockTool} />
        </DragDropProvider>
      );

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(onSave).toHaveBeenCalled();
      });

      // Step 2: Execute the saved tool
      rerender(
        <ToolExecutor
          tool={mockTool}
          isPreview={false}
        />
      );

      expect(screen.getByText('Test Tool')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();

      // Step 3: Interact with the tool
      const input = screen.getByPlaceholderText('Enter your name');
      fireEvent.change(input, { target: { value: 'Integration Test' } });

      expect(input).toHaveValue('Integration Test');
    });
  });
});