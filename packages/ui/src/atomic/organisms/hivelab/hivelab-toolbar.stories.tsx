import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveLabToolbar } from './hivelab-toolbar';

/**
 * # HiveLab Toolbar
 *
 * Top toolbar for the HiveLab builder interface. Contains file operations,
 * edit operations, view controls, and tool actions.
 *
 * ## Features
 * - Tool name display with unsaved indicator
 * - File operations (save, import, export, duplicate, delete)
 * - Edit operations (undo, redo)
 * - View controls (zoom in/out/fit, grid toggle)
 * - Preview/run button with running state
 * - Settings and documentation access
 * - Keyboard shortcut hints in tooltips
 * - Disabled states for unavailable actions
 *
 * ## Usage
 * ```tsx
 * <HiveLabToolbar
 *   toolName="Event Signup Form"
 *   canUndo={history.canUndo}
 *   canRedo={history.canRedo}
 *   zoom={viewport.zoom}
 *   isSaved={!hasChanges}
 *   onSave={handleSave}
 *   onRun={handlePreview}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Organisms/HiveLabToolbar',
  component: HiveLabToolbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HiveLabToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toolbar
 */
export const Default: Story = {
  args: {
    toolName: 'Event Signup Form',
    canUndo: true,
    canRedo: false,
    zoom: 1,
    isSaved: true,
    showGrid: true,
  },
};

/**
 * Unsaved changes
 */
export const UnsavedChanges: Story = {
  args: {
    toolName: 'My Tool',
    canUndo: true,
    canRedo: true,
    zoom: 1,
    isSaved: false,
    showGrid: true,
  },
};

/**
 * Running/preview mode
 */
export const Running: Story = {
  args: {
    toolName: 'Poll Creator',
    canUndo: true,
    canRedo: false,
    zoom: 1,
    isSaved: true,
    isRunning: true,
    showGrid: true,
  },
};

/**
 * Zoomed in
 */
export const ZoomedIn: Story = {
  args: {
    toolName: 'Marketplace Listing',
    canUndo: true,
    canRedo: false,
    zoom: 1.5,
    isSaved: true,
    showGrid: true,
  },
};

/**
 * Zoomed out
 */
export const ZoomedOut: Story = {
  args: {
    toolName: 'Study Group Finder',
    canUndo: true,
    canRedo: false,
    zoom: 0.5,
    isSaved: true,
    showGrid: true,
  },
};

/**
 * Grid hidden
 */
export const GridHidden: Story = {
  args: {
    toolName: 'Anonymous Feedback',
    canUndo: true,
    canRedo: false,
    zoom: 1,
    isSaved: true,
    showGrid: false,
  },
};

/**
 * No undo/redo available
 */
export const NoHistory: Story = {
  args: {
    toolName: 'New Tool',
    canUndo: false,
    canRedo: false,
    zoom: 1,
    isSaved: true,
    showGrid: true,
  },
};

/**
 * Long tool name
 */
export const LongToolName: Story = {
  args: {
    toolName: 'Comprehensive Campus Event Registration System with Waitlist Management',
    canUndo: true,
    canRedo: true,
    zoom: 1,
    isSaved: false,
    showGrid: true,
  },
};

/**
 * Interactive toolbar
 */
export const Interactive: Story = {
  render: () => {
    const [state, setState] = useState({
      toolName: 'Interactive Tool',
      canUndo: false,
      canRedo: false,
      zoom: 1,
      isSaved: true,
      isRunning: false,
      showGrid: true,
      history: [] as string[],
      historyIndex: -1,
    });

    const addToHistory = (action: string) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(action);
      setState({
        ...state,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: true,
        canRedo: false,
        isSaved: false,
      });
    };

    const handleUndo = () => {
      if (state.historyIndex > 0) {
        setState({
          ...state,
          historyIndex: state.historyIndex - 1,
          canUndo: state.historyIndex > 1,
          canRedo: true,
        });
      }
    };

    const handleRedo = () => {
      if (state.historyIndex < state.history.length - 1) {
        setState({
          ...state,
          historyIndex: state.historyIndex + 1,
          canUndo: true,
          canRedo: state.historyIndex < state.history.length - 2,
        });
      }
    };

    const handleSave = () => {
      setState({ ...state, isSaved: true });
      addToHistory('Saved');
    };

    const handleZoomIn = () => {
      setState({ ...state, zoom: Math.min(state.zoom + 0.25, 4) });
      addToHistory('Zoom in');
    };

    const handleZoomOut = () => {
      setState({ ...state, zoom: Math.max(state.zoom - 0.25, 0.1) });
      addToHistory('Zoom out');
    };

    const handleZoomToFit = () => {
      setState({ ...state, zoom: 1 });
      addToHistory('Reset zoom');
    };

    const handleToggleGrid = () => {
      setState({ ...state, showGrid: !state.showGrid });
      addToHistory(`Grid ${state.showGrid ? 'off' : 'on'}`);
    };

    const handleRun = () => {
      setState({ ...state, isRunning: !state.isRunning });
      addToHistory(state.isRunning ? 'Stop preview' : 'Start preview');
    };

    return (
      <div className="min-h-screen flex flex-col">
        <HiveLabToolbar
          {...state}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onSave={handleSave}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomToFit={handleZoomToFit}
          onToggleGrid={handleToggleGrid}
          onRun={handleRun}
          onDuplicate={() => addToHistory('Duplicate')}
          onDelete={() => addToHistory('Delete')}
          onExport={() => addToHistory('Export')}
          onImport={() => addToHistory('Import')}
          onSettings={() => addToHistory('Settings')}
          onViewCode={() => addToHistory('View code')}
          onViewDocs={() => addToHistory('View docs')}
        />

        {/* Status display */}
        <div className="flex-1 p-8">
          <div className="bg-muted rounded-lg p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Toolbar State</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Tool: {state.toolName}</div>
                <div>Saved: {state.isSaved ? 'Yes' : 'No'}</div>
                <div>Zoom: {Math.round(state.zoom * 100)}%</div>
                <div>Grid: {state.showGrid ? 'On' : 'Off'}</div>
                <div>Running: {state.isRunning ? 'Yes' : 'No'}</div>
                <div>Can Undo: {state.canUndo ? 'Yes' : 'No'}</div>
                <div>Can Redo: {state.canRedo ? 'Yes' : 'No'}</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">History ({state.history.length})</h3>
              <div className="space-y-1">
                {state.history.length > 0 ? (
                  state.history.map((action, i) => (
                    <div
                      key={i}
                      className={cn(
                        'text-xs px-2 py-1 rounded',
                        i === state.historyIndex
                          ? 'bg-primary text-primary-foreground'
                          : i < state.historyIndex
                          ? 'bg-background'
                          : 'bg-background/50 text-muted-foreground'
                      )}
                    >
                      {i + 1}. {action}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">No actions yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * All states showcase
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold mb-2">Saved, Can Undo/Redo</p>
        <HiveLabToolbar
          toolName="Event Signup"
          canUndo={true}
          canRedo={true}
          zoom={1}
          isSaved={true}
        />
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Unsaved Changes</p>
        <HiveLabToolbar
          toolName="Poll Creator"
          canUndo={true}
          canRedo={false}
          zoom={1}
          isSaved={false}
        />
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Running Preview</p>
        <HiveLabToolbar
          toolName="Marketplace"
          canUndo={true}
          canRedo={false}
          zoom={1}
          isSaved={true}
          isRunning={true}
        />
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Zoomed In (150%)</p>
        <HiveLabToolbar
          toolName="Study Groups"
          canUndo={true}
          canRedo={false}
          zoom={1.5}
          isSaved={true}
        />
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Zoomed Out (50%)</p>
        <HiveLabToolbar
          toolName="Feedback Form"
          canUndo={true}
          canRedo={false}
          zoom={0.5}
          isSaved={true}
        />
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Grid Hidden</p>
        <HiveLabToolbar
          toolName="Lost & Found"
          canUndo={true}
          canRedo={false}
          zoom={1}
          isSaved={true}
          showGrid={false}
        />
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">No History</p>
        <HiveLabToolbar
          toolName="New Tool"
          canUndo={false}
          canRedo={false}
          zoom={1}
          isSaved={true}
        />
      </div>
    </div>
  ),
};

/**
 * In builder context
 */
export const InBuilderContext: Story = {
  render: () => (
    <div className="h-screen flex flex-col bg-background border">
      <HiveLabToolbar
        toolName="Event Registration System"
        canUndo={true}
        canRedo={true}
        zoom={1}
        isSaved={false}
        showGrid={true}
      />

      {/* Mock canvas */}
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Builder Canvas Area</p>
          <p className="text-xs text-muted-foreground mt-1">
            Toolbar provides controls for the builder
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Different zoom levels
 */
export const ZoomLevels: Story = {
  render: () => (
    <div className="space-y-4">
      {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4].map((zoom) => (
        <div key={zoom}>
          <p className="text-sm font-semibold mb-2">Zoom: {Math.round(zoom * 100)}%</p>
          <HiveLabToolbar
            toolName="My Tool"
            canUndo={true}
            canRedo={false}
            zoom={zoom}
            isSaved={true}
          />
        </div>
      ))}
    </div>
  ),
};
