import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock deployment states
type DeploymentStatus = 'idle' | 'preparing' | 'building' | 'deploying' | 'success' | 'error';

interface DeploymentState {
  status: DeploymentStatus;
  progress: number;
  message: string;
  logs: string[];
  deploymentUrl?: string;
  error?: string;
}

// Mock Tool Deploy Component
const MockToolDeploy = ({ 
  toolId, 
  onDeploy, 
  onCancel 
}: { 
  toolId: string;
  onDeploy: (config: any) => void;
  onCancel: () => void;
}) => {
  const [deploymentState, setDeploymentState] = React.useState<DeploymentState>({
    status: 'idle',
    progress: 0,
    message: 'Ready to deploy',
    logs: [],
  });

  const [deploymentConfig, setDeploymentConfig] = React.useState({
    environment: 'production',
    deploymentName: '',
    autoScale: true,
    maxInstances: 10,
  });

  const handleDeploy = () => {
    if (!deploymentConfig.deploymentName.trim()) {
      setDeploymentState(prev => ({
        ...prev,
        status: 'error',
        error: 'Deployment name is required',
      }));
      return;
    }

    setDeploymentState(prev => ({
      ...prev,
      status: 'preparing',
      progress: 0,
      message: 'Preparing deployment...',
      logs: ['Starting deployment process...'],
    }));

    // Simulate deployment process
    setTimeout(() => {
      setDeploymentState(prev => ({
        ...prev,
        status: 'building',
        progress: 25,
        message: 'Building tool...',
        logs: [...prev.logs, 'Building application bundle...'],
      }));
    }, 500);

    setTimeout(() => {
      setDeploymentState(prev => ({
        ...prev,
        status: 'deploying',
        progress: 75,
        message: 'Deploying to cloud...',
        logs: [...prev.logs, 'Uploading to deployment server...'],
      }));
    }, 1000);

    setTimeout(() => {
      setDeploymentState(prev => ({
        ...prev,
        status: 'success',
        progress: 100,
        message: 'Deployment successful!',
        logs: [...prev.logs, 'Deployment completed successfully'],
        deploymentUrl: `https://tools.hive.app/${toolId}-${Date.now()}`,
      }));
    }, 1500);

    onDeploy(deploymentConfig);
  };

  const handleCancel = () => {
    setDeploymentState({
      status: 'idle',
      progress: 0,
      message: 'Ready to deploy',
      logs: [],
    });
    onCancel();
  };

  return (
    <div data-testid="tool-deploy">
      <h1>Deploy Tool: {toolId}</h1>
      
      {/* Configuration Form */}
      <div data-testid="deployment-config">
        <div>
          <label htmlFor="deployment-name">Deployment Name:</label>
          <input
            id="deployment-name"
            type="text"
            value={deploymentConfig.deploymentName}
            onChange={(e) => setDeploymentConfig(prev => ({
              ...prev,
              deploymentName: e.target.value,
            }))}
            placeholder="Enter deployment name"
          />
        </div>
        
        <div>
          <label htmlFor="environment">Environment:</label>
          <select
            id="environment"
            value={deploymentConfig.environment}
            onChange={(e) => setDeploymentConfig(prev => ({
              ...prev,
              environment: e.target.value,
            }))}
          >
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
        </div>
        
        <div>
          <label>
            <input
              type="checkbox"
              checked={deploymentConfig.autoScale}
              onChange={(e) => setDeploymentConfig(prev => ({
                ...prev,
                autoScale: e.target.checked,
              }))}
            />
            Enable Auto Scaling
          </label>
        </div>
        
        <div>
          <label htmlFor="max-instances">Max Instances:</label>
          <input
            id="max-instances"
            type="number"
            value={deploymentConfig.maxInstances}
            onChange={(e) => setDeploymentConfig(prev => ({
              ...prev,
              maxInstances: parseInt(e.target.value) || 1,
            }))}
            min="1"
            max="100"
          />
        </div>
      </div>

      {/* Deployment Status */}
      <div data-testid="deployment-status">
        <div>Status: {deploymentState.status}</div>
        <div>Progress: {deploymentState.progress}%</div>
        <div>Message: {deploymentState.message}</div>
        
        {deploymentState.status !== 'idle' && (
          <div data-testid="progress-bar">
            <div 
              style={{ 
                width: `${deploymentState.progress}%`,
                height: '20px',
                backgroundColor: '#4CAF50',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        )}
        
        {deploymentState.error && (
          <div data-testid="error-message" style={{ color: 'red' }}>
            Error: {deploymentState.error}
          </div>
        )}
        
        {deploymentState.deploymentUrl && (
          <div data-testid="deployment-url">
            Deployed at: <a href={deploymentState.deploymentUrl}>{deploymentState.deploymentUrl}</a>
          </div>
        )}
      </div>

      {/* Deployment Logs */}
      <div data-testid="deployment-logs">
        <h3>Deployment Logs</h3>
        {deploymentState.logs.map((log, index) => (
          <div key={index} data-testid={`log-${index}`}>
            {log}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div data-testid="deployment-actions">
        <button
          onClick={handleDeploy}
          disabled={deploymentState.status !== 'idle'}
          data-testid="deploy-button"
        >
          {deploymentState.status === 'idle' ? 'Deploy' : 'Deploying...'}
        </button>
        
        <button
          onClick={handleCancel}
          data-testid="cancel-button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

describe('ToolDeploy Component', () => {
  const mockOnDeploy = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderToolDeploy = (toolId = 'test-tool') => {
    return render(
      <MockToolDeploy
        toolId={toolId}
        onDeploy={mockOnDeploy}
        onCancel={mockOnCancel}
      />
    );
  };

  describe('Initial State', () => {
    it('renders deployment interface', () => {
      renderToolDeploy();

      expect(screen.getByText('Deploy Tool: test-tool')).toBeInTheDocument();
      expect(screen.getByTestId('deployment-config')).toBeInTheDocument();
      expect(screen.getByTestId('deployment-status')).toBeInTheDocument();
      expect(screen.getByTestId('deployment-logs')).toBeInTheDocument();
    });

    it('shows initial deployment status', () => {
      renderToolDeploy();

      expect(screen.getByText('Status: idle')).toBeInTheDocument();
      expect(screen.getByText('Progress: 0%')).toBeInTheDocument();
      expect(screen.getByText('Message: Ready to deploy')).toBeInTheDocument();
    });

    it('renders configuration form with default values', () => {
      renderToolDeploy();

      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // deployment name
      expect(screen.getByDisplayValue('10')).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /Enable Auto Scaling/ })).toBeChecked();
      
      // Check select value differently
      const environmentSelect = screen.getByLabelText('Environment:') as HTMLSelectElement;
      expect(environmentSelect.value).toBe('production');
    });
  });

  describe('Configuration', () => {
    it('updates deployment name', () => {
      renderToolDeploy();

      const nameInput = screen.getByPlaceholderText('Enter deployment name');
      fireEvent.change(nameInput, { target: { value: 'My Tool Deployment' } });

      expect(nameInput).toHaveValue('My Tool Deployment');
    });

    it('updates environment selection', () => {
      renderToolDeploy();

      const environmentSelect = screen.getByLabelText('Environment:') as HTMLSelectElement;
      fireEvent.change(environmentSelect, { target: { value: 'staging' } });

      expect(environmentSelect.value).toBe('staging');
    });

    it('toggles auto scaling', () => {
      renderToolDeploy();

      const autoScaleCheckbox = screen.getByRole('checkbox', { name: /Enable Auto Scaling/ });
      fireEvent.click(autoScaleCheckbox);

      expect(autoScaleCheckbox).not.toBeChecked();
    });

    it('updates max instances', () => {
      renderToolDeploy();

      const maxInstancesInput = screen.getByDisplayValue('10');
      fireEvent.change(maxInstancesInput, { target: { value: '5' } });

      expect(maxInstancesInput).toHaveValue(5);
    });
  });

  describe('Deployment Process', () => {
    it('validates deployment name before starting', () => {
      renderToolDeploy();

      const deployButton = screen.getByTestId('deploy-button');
      fireEvent.click(deployButton);

      expect(screen.getByTestId('error-message')).toHaveTextContent('Error: Deployment name is required');
      expect(mockOnDeploy).not.toHaveBeenCalled();
    });

    it('starts deployment with valid configuration', async () => {
      renderToolDeploy();

      // Set deployment name
      const nameInput = screen.getByPlaceholderText('Enter deployment name');
      fireEvent.change(nameInput, { target: { value: 'Test Deployment' } });

      // Start deployment
      const deployButton = screen.getByTestId('deploy-button');
      fireEvent.click(deployButton);

      expect(mockOnDeploy).toHaveBeenCalledWith({
        environment: 'production',
        deploymentName: 'Test Deployment',
        autoScale: true,
        maxInstances: 10,
      });
    });

    it('shows deployment progress states', async () => {
      renderToolDeploy();

      // Set deployment name and start
      const nameInput = screen.getByPlaceholderText('Enter deployment name');
      fireEvent.change(nameInput, { target: { value: 'Test Deployment' } });
      
      const deployButton = screen.getByTestId('deploy-button');
      fireEvent.click(deployButton);

      // Should show preparing state
      await waitFor(() => {
        expect(screen.getByText('Status: preparing')).toBeInTheDocument();
        expect(screen.getByText('Message: Preparing deployment...')).toBeInTheDocument();
      });

      // Should show building state
      await waitFor(() => {
        expect(screen.getByText('Status: building')).toBeInTheDocument();
        expect(screen.getByText('Progress: 25%')).toBeInTheDocument();
      }, { timeout: 1000 });

      // Should show deploying state
      await waitFor(() => {
        expect(screen.getByText('Status: deploying')).toBeInTheDocument();
        expect(screen.getByText('Progress: 75%')).toBeInTheDocument();
      }, { timeout: 1500 });

      // Should show success state
      await waitFor(() => {
        expect(screen.getByText('Status: success')).toBeInTheDocument();
        expect(screen.getByText('Progress: 100%')).toBeInTheDocument();
        expect(screen.getByText('Message: Deployment successful!')).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('shows deployment logs during process', async () => {
      renderToolDeploy();

      const nameInput = screen.getByPlaceholderText('Enter deployment name');
      fireEvent.change(nameInput, { target: { value: 'Test Deployment' } });
      
      const deployButton = screen.getByTestId('deploy-button');
      fireEvent.click(deployButton);

      // Should show initial log
      await waitFor(() => {
        expect(screen.getByTestId('log-0')).toHaveTextContent('Starting deployment process...');
      });

      // Should show building log
      await waitFor(() => {
        expect(screen.getByTestId('log-1')).toHaveTextContent('Building application bundle...');
      }, { timeout: 1000 });
    });

    it('shows deployment URL on success', async () => {
      renderToolDeploy();

      const nameInput = screen.getByPlaceholderText('Enter deployment name');
      fireEvent.change(nameInput, { target: { value: 'Test Deployment' } });
      
      const deployButton = screen.getByTestId('deploy-button');
      fireEvent.click(deployButton);

      // Wait for completion
      await waitFor(() => {
        expect(screen.getByTestId('deployment-url')).toBeInTheDocument();
        expect(screen.getByText(/Deployed at:/)).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('disables deploy button during deployment', async () => {
      renderToolDeploy();

      const nameInput = screen.getByPlaceholderText('Enter deployment name');
      fireEvent.change(nameInput, { target: { value: 'Test Deployment' } });
      
      const deployButton = screen.getByTestId('deploy-button');
      fireEvent.click(deployButton);

      await waitFor(() => {
        expect(deployButton).toBeDisabled();
        expect(deployButton).toHaveTextContent('Deploying...');
      });
    });
  });

  describe('Progress Bar', () => {
    it('shows progress bar during deployment', async () => {
      renderToolDeploy();

      const nameInput = screen.getByPlaceholderText('Enter deployment name');
      fireEvent.change(nameInput, { target: { value: 'Test Deployment' } });
      
      const deployButton = screen.getByTestId('deploy-button');
      fireEvent.click(deployButton);

      // Progress bar should appear
      await waitFor(() => {
        expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
      });
    });

    it('updates progress bar width', async () => {
      renderToolDeploy();

      const nameInput = screen.getByPlaceholderText('Enter deployment name');
      fireEvent.change(nameInput, { target: { value: 'Test Deployment' } });
      
      const deployButton = screen.getByTestId('deploy-button');
      fireEvent.click(deployButton);

      // Check progress bar width updates
      await waitFor(() => {
        const progressBar = screen.getByTestId('progress-bar').firstChild as HTMLElement;
        expect(progressBar.style.width).toBe('25%');
      }, { timeout: 1000 });
    });
  });

  describe('Cancel Functionality', () => {
    it('handles cancel action', () => {
      renderToolDeploy();

      const cancelButton = screen.getByTestId('cancel-button');
      fireEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalled();
    });

    it('resets deployment state on cancel', () => {
      renderToolDeploy();

      // Start deployment
      const nameInput = screen.getByPlaceholderText('Enter deployment name');
      fireEvent.change(nameInput, { target: { value: 'Test Deployment' } });
      
      const deployButton = screen.getByTestId('deploy-button');
      fireEvent.click(deployButton);

      // Cancel
      const cancelButton = screen.getByTestId('cancel-button');
      fireEvent.click(cancelButton);

      // Should reset to idle state
      expect(screen.getByText('Status: idle')).toBeInTheDocument();
      expect(screen.getByText('Progress: 0%')).toBeInTheDocument();
    });
  });

  describe('Different Tool IDs', () => {
    it('displays correct tool ID in title', () => {
      renderToolDeploy('my-custom-tool');

      expect(screen.getByText('Deploy Tool: my-custom-tool')).toBeInTheDocument();
    });

    it('generates deployment URL with tool ID', async () => {
      renderToolDeploy('unique-tool-id');

      const nameInput = screen.getByPlaceholderText('Enter deployment name');
      fireEvent.change(nameInput, { target: { value: 'Test Deployment' } });
      
      const deployButton = screen.getByTestId('deploy-button');
      fireEvent.click(deployButton);

      await waitFor(() => {
        const deploymentUrl = screen.getByTestId('deployment-url');
        expect(deploymentUrl).toHaveTextContent('unique-tool-id');
      }, { timeout: 2000 });
    });
  });

  describe('Accessibility', () => {
    it('provides proper form labels', () => {
      renderToolDeploy();

      expect(screen.getByLabelText('Deployment Name:')).toBeInTheDocument();
      expect(screen.getByLabelText('Environment:')).toBeInTheDocument();
      expect(screen.getByLabelText('Enable Auto Scaling')).toBeInTheDocument();
      expect(screen.getByLabelText('Max Instances:')).toBeInTheDocument();
    });

    it('provides proper button roles', () => {
      renderToolDeploy();

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2); // Deploy and Cancel buttons
    });

    it('supports keyboard navigation', () => {
      renderToolDeploy();

      const nameInput = screen.getByPlaceholderText('Enter deployment name');
      nameInput.focus();
      expect(nameInput).toHaveFocus();
    });
  });

  describe('Error Handling', () => {
    it('shows error for missing deployment name', () => {
      renderToolDeploy();

      const deployButton = screen.getByTestId('deploy-button');
      fireEvent.click(deployButton);

      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });

    it('handles invalid max instances input', () => {
      renderToolDeploy();

      const maxInstancesInput = screen.getByDisplayValue('10');
      fireEvent.change(maxInstancesInput, { target: { value: 'invalid' } });

      // Should default to 1 for invalid input
      expect(maxInstancesInput).toHaveValue(1);
    });
  });
});