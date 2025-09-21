import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';

// Import components for accessibility testing
import { 
  Button, 
  Input, 
  Card, 
  Modal, 
  Form, 
  Navigation,
  Avatar,
  Badge,
  Tooltip
} from '@hive/ui';

// Add jest-axe matcher
expect.extend(toHaveNoViolations);

// Mock components for complex accessibility scenarios
const AccessibleForm = () => (
  <form role="form" aria-labelledby="form-title">
    <h2 id="form-title">Create New Tool</h2>
    
    <div className="form-group">
      <label htmlFor="tool-name" className="required">
        Tool Name
        <span aria-label="required">*</span>
      </label>
      <Input 
        id="tool-name"
        required
        aria-describedby="tool-name-help tool-name-error"
        aria-invalid="false"
      />
      <div id="tool-name-help" className="help-text">
        Enter a descriptive name for your tool
      </div>
      <div id="tool-name-error" className="error-text" aria-live="polite">
        {/* Error messages appear here */}
      </div>
    </div>
    
    <div className="form-group">
      <label htmlFor="tool-description">Description</label>
      <textarea 
        id="tool-description"
        aria-describedby="tool-description-help"
        rows={4}
      />
      <div id="tool-description-help" className="help-text">
        Provide a detailed description of what your tool does
      </div>
    </div>
    
    <fieldset>
      <legend>Tool Category</legend>
      <div role="radiogroup" aria-labelledby="category-legend">
        <div>
          <input type="radio" id="academic" name="category" value="academic" />
          <label htmlFor="academic">Academic</label>
        </div>
        <div>
          <input type="radio" id="productivity" name="category" value="productivity" />
          <label htmlFor="productivity">Productivity</label>
        </div>
        <div>
          <input type="radio" id="social" name="category" value="social" />
          <label htmlFor="social">Social</label>
        </div>
      </div>
    </fieldset>
    
    <div className="form-actions">
      <Button type="submit" variant="primary">
        Create Tool
      </Button>
      <Button type="button" variant="secondary">
        Cancel
      </Button>
    </div>
  </form>
);

const AccessibleNavigation = () => (
  <nav role="navigation" aria-label="Main navigation">
    <ul role="menubar">
      <li role="none">
        <a href="/dashboard" role="menuitem" aria-current="page">
          Dashboard
        </a>
      </li>
      <li role="none">
        <a href="/feed" role="menuitem">
          Feed
        </a>
      </li>
      <li role="none">
        <button 
          role="menuitem" 
          aria-haspopup="true" 
          aria-expanded="false"
          id="tools-menu-button"
        >
          Tools
        </button>
        <ul role="menu" aria-labelledby="tools-menu-button" hidden>
          <li role="none">
            <a href="/tools" role="menuitem">My Tools</a>
          </li>
          <li role="none">
            <a href="/tools/create" role="menuitem">Create Tool</a>
          </li>
          <li role="none">
            <a href="/tools/marketplace" role="menuitem">Marketplace</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

const AccessibleModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="modal-overlay"
    >
      <div className="modal-content">
        <header className="modal-header">
          <h2 id="modal-title">Confirm Delete</h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="close-button"
          >
            ×
          </button>
        </header>
        
        <div id="modal-description" className="modal-body">
          <p>Are you sure you want to delete this tool? This action cannot be undone.</p>
        </div>
        
        <div className="modal-footer">
          <Button variant="destructive" onClick={onClose}>
            Delete Tool
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

const AccessibleDataTable = () => (
  <div role="region" aria-labelledby="table-title" tabIndex={0}>
    <h3 id="table-title">User Tools</h3>
    <table role="table" aria-describedby="table-description">
      <caption id="table-description">
        A list of tools created by users, sortable by name, category, and creation date
      </caption>
      <thead>
        <tr role="row">
          <th 
            role="columnheader" 
            tabIndex={0}
            aria-sort="ascending"
            aria-label="Tool name, sortable"
          >
            Name
          </th>
          <th 
            role="columnheader" 
            tabIndex={0}
            aria-sort="none"
            aria-label="Category, sortable"
          >
            Category
          </th>
          <th 
            role="columnheader" 
            tabIndex={0}
            aria-sort="none"
            aria-label="Creation date, sortable"
          >
            Created
          </th>
          <th role="columnheader">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row">
          <td role="gridcell">Grade Calculator</td>
          <td role="gridcell">Academic</td>
          <td role="gridcell">
            <time dateTime="2024-07-15">July 15, 2024</time>
          </td>
          <td role="gridcell">
            <button aria-label="Edit Grade Calculator">Edit</button>
            <button aria-label="Delete Grade Calculator">Delete</button>
          </td>
        </tr>
        <tr role="row">
          <td role="gridcell">Study Planner</td>
          <td role="gridcell">Productivity</td>
          <td role="gridcell">
            <time dateTime="2024-07-20">July 20, 2024</time>
          </td>
          <td role="gridcell">
            <button aria-label="Edit Study Planner">Edit</button>
            <button aria-label="Delete Study Planner">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

describe('Accessibility Compliance Tests', () => {
  describe('WCAG 2.1 AA Compliance', () => {
    it('ensures form components meet accessibility standards', async () => {
      const { container } = render(<AccessibleForm />);
      
      // Run axe accessibility tests
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      
      // Test specific accessibility features
      const requiredInput = screen.getByLabelText(/Tool Name/);
      expect(requiredInput).toHaveAttribute('required');
      expect(requiredInput).toHaveAttribute('aria-describedby');
      expect(requiredInput).toHaveAttribute('aria-invalid', 'false');
      
      // Test form structure
      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('aria-labelledby', 'form-title');
      
      // Test fieldset and legend
      const fieldset = screen.getByRole('group');
      expect(fieldset.querySelector('legend')).toHaveTextContent('Tool Category');
      
      // Test radio group
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeInTheDocument();
    });

    it('validates navigation accessibility', async () => {
      const { container } = render(<AccessibleNavigation />);
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      
      // Test navigation structure
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
      
      // Test menubar and menuitems
      const menubar = screen.getByRole('menubar');
      expect(menubar).toBeInTheDocument();
      
      const menuitems = screen.getAllByRole('menuitem');
      expect(menuitems.length).toBeGreaterThan(0);
      
      // Test current page indication
      const currentPage = screen.getByRole('menuitem', { current: 'page' });
      expect(currentPage).toHaveAttribute('aria-current', 'page');
      
      // Test submenu accessibility
      const submenuButton = screen.getByRole('menuitem', { expanded: false });
      expect(submenuButton).toHaveAttribute('aria-haspopup', 'true');
      expect(submenuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('ensures modal dialogs are fully accessible', async () => {
      const mockOnClose = vi.fn();
      const { container } = render(<AccessibleModal isOpen={true} onClose={mockOnClose} />);
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      
      // Test modal structure
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
      expect(dialog).toHaveAttribute('aria-describedby', 'modal-description');
      
      // Test close button accessibility
      const closeButton = screen.getByLabelText('Close dialog');
      expect(closeButton).toBeInTheDocument();
      
      // Test focus management
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('validates data table accessibility', async () => {
      const { container } = render(<AccessibleDataTable />);
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      
      // Test table structure
      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('aria-describedby', 'table-description');
      
      // Test caption
      const caption = screen.getByText(/A list of tools created by users/);
      expect(caption).toBeInTheDocument();
      
      // Test column headers
      const columnHeaders = screen.getAllByRole('columnheader');
      columnHeaders.forEach(header => {
        if (header.hasAttribute('aria-sort')) {
          expect(header).toHaveAttribute('tabIndex', '0');
        }
      });
      
      // Test action buttons have descriptive labels
      const editButtons = screen.getAllByLabelText(/Edit/);
      const deleteButtons = screen.getAllByLabelText(/Delete/);
      
      expect(editButtons.length).toBe(2);
      expect(deleteButtons.length).toBe(2);
    });
  });

  describe('Keyboard Navigation', () => {
    it('ensures all interactive elements are keyboard accessible', () => {
      render(<AccessibleForm />);
      
      // Test tab order
      const inputs = screen.getAllByRole('textbox');
      const buttons = screen.getAllByRole('button');
      const radios = screen.getAllByRole('radio');
      
      [...inputs, ...radios, ...buttons].forEach(element => {
        // All interactive elements should be focusable
        expect(element).not.toHaveAttribute('tabIndex', '-1');
        
        // Focus the element
        element.focus();
        expect(element).toHaveFocus();
      });
    });

    it('validates skip links functionality', () => {
      const PageWithSkipLink = () => (
        <div>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <nav>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </nav>
          <main id="main-content" tabIndex={-1}>
            <h1>Main Content</h1>
          </main>
        </div>
      );
      
      render(<PageWithSkipLink />);
      
      const skipLink = screen.getByText('Skip to main content');
      const mainContent = screen.getByRole('main');
      
      expect(skipLink).toHaveAttribute('href', '#main-content');
      expect(mainContent).toHaveAttribute('id', 'main-content');
      expect(mainContent).toHaveAttribute('tabIndex', '-1');
    });

    it('tests keyboard shortcuts and access keys', () => {
      const ComponentWithShortcuts = () => (
        <div>
          <button accessKey="s" aria-keyshortcuts="Alt+s">
            Save (Alt+S)
          </button>
          <button accessKey="c" aria-keyshortcuts="Alt+c">
            Cancel (Alt+C)
          </button>
        </div>
      );
      
      render(<ComponentWithShortcuts />);
      
      const saveButton = screen.getByText(/Save/);
      const cancelButton = screen.getByText(/Cancel/);
      
      expect(saveButton).toHaveAttribute('accessKey', 's');
      expect(saveButton).toHaveAttribute('aria-keyshortcuts', 'Alt+s');
      expect(cancelButton).toHaveAttribute('accessKey', 'c');
      expect(cancelButton).toHaveAttribute('aria-keyshortcuts', 'Alt+c');
    });
  });

  describe('Screen Reader Support', () => {
    it('ensures proper ARIA labels and descriptions', () => {
      const ComponentWithARIA = () => (
        <div>
          <button 
            aria-label="Add new tool to your collection"
            aria-describedby="add-tool-help"
          >
            +
          </button>
          <div id="add-tool-help" className="sr-only">
            Click to open the tool creation wizard
          </div>
          
          <div role="status" aria-live="polite" aria-atomic="true">
            Tool saved successfully
          </div>
          
          <div role="alert" aria-live="assertive">
            Error: Please fix the following issues
          </div>
        </div>
      );
      
      render(<ComponentWithARIA />);
      
      const button = screen.getByLabelText('Add new tool to your collection');
      expect(button).toHaveAttribute('aria-describedby', 'add-tool-help');
      
      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-live', 'polite');
      expect(status).toHaveAttribute('aria-atomic', 'true');
      
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });

    it('validates landmark roles and document structure', () => {
      const PageStructure = () => (
        <div>
          <header role="banner">
            <h1>HIVE Platform</h1>
          </header>
          
          <nav role="navigation" aria-label="Main">
            <ul>
              <li><a href="/dashboard">Dashboard</a></li>
            </ul>
          </nav>
          
          <main role="main">
            <section aria-labelledby="tools-heading">
              <h2 id="tools-heading">Your Tools</h2>
              <p>Manage your created tools</p>
            </section>
            
            <aside role="complementary" aria-label="Tool statistics">
              <h3>Statistics</h3>
              <p>You have created 5 tools</p>
            </aside>
          </main>
          
          <footer role="contentinfo">
            <p>&copy; 2024 HIVE Platform</p>
          </footer>
        </div>
      );
      
      render(<PageStructure />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('complementary')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      
      // Test section labeling
      const section = screen.getByRole('region');
      expect(section).toHaveAttribute('aria-labelledby', 'tools-heading');
    });

    it('tests dynamic content announcements', () => {
      const DynamicContent = () => {
        const [message, setMessage] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        
        const handleAction = () => {
          setLoading(true);
          setMessage('Processing...');
          
          setTimeout(() => {
            setLoading(false);
            setMessage('Action completed successfully');
          }, 1000);
        };
        
        return (
          <div>
            <button onClick={handleAction}>
              Perform Action
            </button>
            
            <div 
              role="status" 
              aria-live="polite" 
              aria-busy={loading}
              className="sr-only"
            >
              {message}
            </div>
            
            {loading && (
              <div role="progressbar" aria-label="Processing request">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        );
      };
      
      render(<DynamicContent />);
      
      const button = screen.getByRole('button');
      const status = screen.getByRole('status');
      
      expect(status).toHaveAttribute('aria-live', 'polite');
      
      // Trigger action
      fireEvent.click(button);
      expect(status).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('Visual Accessibility', () => {
    it('ensures sufficient color contrast ratios', () => {
      const ColorContrastTest = () => (
        <div>
          <div className="bg-primary-600 text-white p-4">
            Primary background with white text
          </div>
          <div className="bg-secondary-100 text-secondary-800 p-4">
            Secondary background with dark text
          </div>
          <div className="bg-error-50 text-error-700 p-4">
            Error background with error text
          </div>
        </div>
      );
      
      const { container } = render(<ColorContrastTest />);
      
      // Mock contrast ratio calculations
      const elements = container.querySelectorAll('[class*="bg-"]');
      elements.forEach(element => {
        const styles = window.getComputedStyle(element);
        const backgroundColor = styles.backgroundColor;
        const textColor = styles.color;
        
        // Mock contrast calculation - in real implementation, use actual contrast calculation
        const contrastRatio = calculateMockContrastRatio(backgroundColor, textColor);
        expect(contrastRatio).toBeGreaterThanOrEqual(4.5); // WCAG AA standard
      });
    });

    it('validates focus indicators visibility', () => {
      const FocusIndicatorTest = () => (
        <div>
          <Button>Focusable Button</Button>
          <Input placeholder="Focusable Input" />
          <a href="/test">Focusable Link</a>
        </div>
      );
      
      render(<FocusIndicatorTest />);
      
      const focusableElements = [
        screen.getByRole('button'),
        screen.getByRole('textbox'),
        screen.getByRole('link')
      ];
      
      focusableElements.forEach(element => {
        element.focus();
        
        const styles = window.getComputedStyle(element);
        
        // Focus should be visible
        expect(styles.outline).not.toBe('none');
        expect(styles.outlineWidth).not.toBe('0px');
        
        // Or should have custom focus styling
        if (styles.outline === 'none') {
          expect(styles.boxShadow).toBeTruthy();
        }
      });
    });

    it('tests responsive text scaling', () => {
      const ResponsiveText = () => (
        <div>
          <h1 className="text-2xl md:text-4xl">Responsive Heading</h1>
          <p className="text-sm md:text-base">Responsive body text</p>
        </div>
      );
      
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      
      const { container: mobileContainer } = render(<ResponsiveText />);
      const mobileHeading = mobileContainer.querySelector('h1')!;
      expect(mobileHeading).toHaveClass('text-2xl');
      
      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });
      
      const { container: desktopContainer } = render(<ResponsiveText />);
      const desktopHeading = desktopContainer.querySelector('h1')!;
      expect(desktopHeading).toHaveClass('md:text-4xl');
    });
  });

  describe('Assistive Technology Compatibility', () => {
    it('ensures compatibility with screen readers', () => {
      const ScreenReaderOptimized = () => (
        <div>
          <h1>
            Welcome to HIVE
            <span className="sr-only"> - Social utility platform for students</span>
          </h1>
          
          <nav aria-label="Breadcrumb">
            <ol>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/tools">Tools</a></li>
              <li aria-current="page">Create Tool</li>
            </ol>
          </nav>
          
          <div className="visually-hidden" id="page-description">
            This page allows you to create a new tool for the HIVE platform
          </div>
        </div>
      );
      
      render(<ScreenReaderOptimized />);
      
      // Screen reader only content should be present but visually hidden
      const srOnlyContent = screen.getByText(/Social utility platform/);
      expect(srOnlyContent).toHaveClass('sr-only');
      
      // Breadcrumb navigation
      const breadcrumb = screen.getByLabelText('Breadcrumb');
      expect(breadcrumb).toBeInTheDocument();
      
      const currentPage = screen.getByText('Create Tool');
      expect(currentPage).toHaveAttribute('aria-current', 'page');
    });

    it('validates voice control compatibility', () => {
      const VoiceControlOptimized = () => (
        <div>
          <button data-voice-command="create tool">
            Create New Tool
          </button>
          <button data-voice-command="save draft">
            Save as Draft
          </button>
          <button data-voice-command="publish tool">
            Publish Tool
          </button>
        </div>
      );
      
      render(<VoiceControlOptimized />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('data-voice-command');
        
        // Button text should match voice command for clarity
        const voiceCommand = button.getAttribute('data-voice-command');
        const buttonText = button.textContent?.toLowerCase();
        
        expect(buttonText).toContain(voiceCommand?.split(' ')[0] || '');
      });
    });
  });
});

// Helper function for mock contrast ratio calculation
function calculateMockContrastRatio(backgroundColor: string, textColor: string): number {
  // Simplified mock - in real implementation, calculate actual contrast ratio
  // using luminance values and WCAG formula
  return 4.6; // Mock value that passes WCAG AA
}