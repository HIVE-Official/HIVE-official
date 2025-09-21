import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

// Import atomic components from the UI package
import { 
  Button, 
  Input, 
  Avatar, 
  Badge, 
  Card, 
  Switch,
  Checkbox,
  Select,
  Textarea,
  Tooltip,
  Progress,
  Spinner,
  Tag
} from '@hive/ui';

const mockProps = {
  user: {
    id: 'user-123',
    displayName: 'Test User',
    handle: '@testuser',
    avatar: 'https://example.com/avatar.jpg',
    email: 'test@university.edu'
  },
  onAction: vi.fn(),
  onChange: vi.fn(),
  onSubmit: vi.fn()
};

describe('Atomic Components Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Button Component', () => {
    it('renders button with correct text and variant', () => {
      render(
        <Button variant="primary" size="md">
          Click Me
        </Button>
      );
      
      const button = screen.getByRole('button', { name: 'Click Me' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('hive-button', 'hive-button--primary', 'hive-button--medium');
    });

    it('handles click events correctly', async () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick}>
          Test Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders disabled state correctly', () => {
      render(
        <Button disabled>
          Disabled Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('hive-button--disabled');
    });

    it('renders loading state with spinner', () => {
      render(
        <Button loading>
          Loading Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
    });

    it('supports different button variants', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole('button')).toHaveClass('hive-button--primary');

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('hive-button--secondary');

      rerender(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole('button')).toHaveClass('hive-button--ghost');
    });
  });

  describe('Input Component', () => {
    it('renders input with label and placeholder', () => {
      render(
        <Input
          label="Email Address"
          placeholder="Enter your email"
          type="email"
        />
      );
      
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    });

    it('handles input changes correctly', async () => {
      const handleChange = vi.fn();
      render(
        <Input
          label="Test Input"
          onChange={handleChange}
        />
      );
      
      const input = screen.getByLabelText('Test Input');
      await userEvent.type(input, 'test value');
      
      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('test value');
    });

    it('displays validation errors', () => {
      render(
        <Input
          label="Required Field"
          error="This field is required"
          invalid
        />
      );
      
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByLabelText('Required Field')).toHaveClass('hive-input--invalid');
    });

    it('supports different input sizes', () => {
      const { rerender } = render(<Input size="sm" />);
      expect(screen.getByRole('textbox')).toHaveClass('hive-input--small');

      rerender(<Input size="lg" />);
      expect(screen.getByRole('textbox')).toHaveClass('hive-input--large');
    });

    it('handles disabled and readonly states', () => {
      const { rerender } = render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();

      rerender(<Input readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });
  });

  describe('Avatar Component', () => {
    it('renders avatar with image source', () => {
      render(
        <Avatar
          src="https://example.com/avatar.jpg"
          alt="User Avatar"
          size="md"
        />
      );
      
      const avatar = screen.getByRole('img', { name: 'User Avatar' });
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('renders initials when no image provided', () => {
      render(
        <Avatar
          name="John Doe"
          size="lg"
        />
      );
      
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('handles image loading errors gracefully', async () => {
      render(
        <Avatar
          src="invalid-image-url"
          name="Test User"
          fallback="TU"
        />
      );
      
      const img = screen.getByRole('img');
      fireEvent.error(img);
      
      await waitFor(() => {
        expect(screen.getByText('TU')).toBeInTheDocument();
      });
    });

    it('supports different avatar sizes', () => {
      const { rerender } = render(<Avatar size="sm" name="Test" />);
      expect(screen.getByTestId('avatar')).toHaveClass('hive-avatar--small');

      rerender(<Avatar size="xlarge" name="Test" />);
      expect(screen.getByTestId('avatar')).toHaveClass('hive-avatar--xlarge');
    });
  });

  describe('Badge Component', () => {
    it('renders badge with correct content and variant', () => {
      render(
        <Badge variant="senior" size="md">
          Verified
        </Badge>
      );
      
      const badge = screen.getByText('Verified');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('hive-badge--success');
    });

    it('renders numeric badges correctly', () => {
      render(
        <Badge variant="senior" count={42} />
      );
      
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('handles badge dismissal', async () => {
      const handleDismiss = vi.fn();
      render(
        <Badge dismissible onDismiss={handleDismiss}>
          Dismissible Badge
        </Badge>
      );
      
      const dismissButton = screen.getByRole('button', { name: 'Dismiss' });
      await userEvent.click(dismissButton);
      
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('supports different badge variants', () => {
      const { rerender } = render(<Badge variant="junior">Warning</Badge>);
      expect(screen.getByText('Warning')).toHaveClass('hive-badge--warning');

      rerender(<Badge variant="freshman">Error</Badge>);
      expect(screen.getByText('Error')).toHaveClass('hive-badge--error');
    });
  });

  describe('Card Component', () => {
    it('renders card with header, content, and footer', () => {
      render(
        <Card>
          <Card.Header>
            <Card.Title>Test Card</Card.Title>
          </Card.Header>
          <Card.Content>
            This is the card content
          </Card.Content>
          <Card.Footer>
            <Button>Action</Button>
          </Card.Footer>
        </Card>
      );
      
      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('This is the card content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('handles card interactions correctly', async () => {
      const handleClick = vi.fn();
      render(
        <Card onClick={handleClick} interactive>
          <Card.Content>Clickable Card</Card.Content>
        </Card>
      );
      
      const card = screen.getByTestId('card');
      await userEvent.click(card);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(card).toHaveClass('hive-card--interactive');
    });

    it('supports different card variants and elevations', () => {
      const { rerender } = render(
        <Card elevation="low">
          Content
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('hive-card--outlined', 'hive-card--elevation-low');

      rerender(
        <Card elevation="high">
          Content
        </Card>
      );
      expect(card).toHaveClass('hive-card--filled', 'hive-card--elevation-high');
    });
  });

  describe('Switch Component', () => {
    it('renders switch with label and handles toggle', async () => {
      const handleChange = vi.fn();
      render(
        <Switch
          label="Enable Notifications"
          checked={false}
          onChange={handleChange}
        />
      );
      
      const switchElement = screen.getByRole('switch', { name: 'Enable Notifications' });
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).not.toBeChecked();
      
      await userEvent.click(switchElement);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('supports controlled and uncontrolled modes', () => {
      const { rerender } = render(<Switch defaultChecked />);
      expect(screen.getByRole('switch')).toBeChecked();

      rerender(<Switch checked={false} />);
      expect(screen.getByRole('switch')).not.toBeChecked();
    });

    it('handles disabled state correctly', () => {
      render(<Switch disabled label="Disabled Switch" />);
      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
      expect(switchElement).toHaveClass('hive-switch--disabled');
    });
  });

  describe('Checkbox Component', () => {
    it('renders checkbox with label and handles selection', async () => {
      const handleChange = vi.fn();
      render(
        <Checkbox
          label="I agree to terms"
          checked={false}
          onChange={handleChange}
        />
      );
      
      const checkbox = screen.getByRole('checkbox', { name: 'I agree to terms' });
      expect(checkbox).not.toBeChecked();
      
      await userEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('supports indeterminate state', () => {
      render(
        <Checkbox
          label="Partially selected"
          indeterminate
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveProperty('indeterminate', true);
    });

    it('handles validation errors', () => {
      render(
        <Checkbox
          label="Required checkbox"
          required
          error="This field is required"
        />
      );
      
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  describe('Select Component', () => {
    const options = [
      { value: 'cs', label: 'Computer Science' },
      { value: 'eng', label: 'Engineering' },
      { value: 'math', label: 'Mathematics' }
    ];

    it('renders select with options and handles selection', async () => {
      const handleChange = vi.fn();
      render(
        <Select
          label="Choose Major"
          options={options}
          onChange={handleChange}
        />
      );
      
      const select = screen.getByLabelText('Choose Major');
      await userEvent.click(select);
      
      const option = screen.getByText('Computer Science');
      await userEvent.click(option);
      
      expect(handleChange).toHaveBeenCalledWith('cs');
    });

    it('supports multi-select mode', async () => {
      const handleChange = vi.fn();
      render(
        <Select
          label="Select Interests"
          options={options}
          multiple
          onChange={handleChange}
        />
      );
      
      const select = screen.getByLabelText('Select Interests');
      await userEvent.click(select);
      
      await userEvent.click(screen.getByText('Computer Science'));
      await userEvent.click(screen.getByText('Engineering'));
      
      expect(handleChange).toHaveBeenCalledWith(['cs', 'eng']);
    });

    it('handles search and filtering', async () => {
      render(
        <Select
          label="Searchable Select"
          options={options}
          searchable
        />
      );
      
      const select = screen.getByLabelText('Searchable Select');
      await userEvent.click(select);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await userEvent.type(searchInput, 'comp');
      
      expect(screen.getByText('Computer Science')).toBeInTheDocument();
      expect(screen.queryByText('Mathematics')).not.toBeInTheDocument();
    });
  });

  describe('Textarea Component', () => {
    it('renders textarea with label and handles input', async () => {
      const handleChange = vi.fn();
      render(
        <Textarea
          label="Description"
          placeholder="Enter description"
          onChange={handleChange}
        />
      );
      
      const textarea = screen.getByLabelText('Description');
      await userEvent.type(textarea, 'Test description');
      
      expect(handleChange).toHaveBeenCalled();
      expect(textarea).toHaveValue('Test description');
    });

    it('supports auto-resizing functionality', async () => {
      render(
        <Textarea
          label="Auto-resize"
          autoResize
          minRows={2}
          maxRows={6}
        />
      );
      
      const textarea = screen.getByLabelText('Auto-resize');
      await userEvent.type(textarea, 'Line 1\nLine 2\nLine 3\nLine 4');
      
      expect(textarea).toHaveStyle({ height: expect.any(String) });
    });

    it('displays character count when maxLength is set', async () => {
      render(
        <Textarea
          label="Limited Text"
          maxLength={100}
          showCharCount
        />
      );
      
      const textarea = screen.getByLabelText('Limited Text');
      await userEvent.type(textarea, 'Test message');
      
      expect(screen.getByText('12/100')).toBeInTheDocument();
    });
  });

  describe('Tooltip Component', () => {
    it('shows tooltip on hover', async () => {
      render(
        <Tooltip content="This is a tooltip">
          <Button>Hover me</Button>
        </Tooltip>
      );
      
      const button = screen.getByRole('button');
      await userEvent.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText('This is a tooltip')).toBeInTheDocument();
      });
    });

    it('supports different tooltip positions', async () => {
      const { rerender } = render(
        <Tooltip content="Top tooltip" position="top">
          <Button>Top</Button>
        </Tooltip>
      );
      
      await userEvent.hover(screen.getByRole('button'));
      await waitFor(() => {
        expect(screen.getByTestId('tooltip')).toHaveClass('hive-tooltip--top');
      });

      rerender(
        <Tooltip content="Bottom tooltip" position="bottom">
          <Button>Bottom</Button>
        </Tooltip>
      );
      
      await userEvent.hover(screen.getByRole('button'));
      await waitFor(() => {
        expect(screen.getByTestId('tooltip')).toHaveClass('hive-tooltip--bottom');
      });
    });

    it('handles keyboard accessibility', async () => {
      render(
        <Tooltip content="Accessible tooltip">
          <Button>Focus me</Button>
        </Tooltip>
      );
      
      const button = screen.getByRole('button');
      button.focus();
      
      await waitFor(() => {
        expect(screen.getByText('Accessible tooltip')).toBeInTheDocument();
      });
    });
  });

  describe('Progress Component', () => {
    it('renders progress bar with correct value', () => {
      render(
        <Progress
          value={75}
          max={100}
          label="Loading progress"
        />
      );
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '75');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('supports different progress variants', () => {
      const { rerender } = render(<Progress value={50} variant="success" />);
      expect(screen.getByRole('progressbar')).toHaveClass('hive-progress--success');

      rerender(<Progress value={25} variant="warning" />);
      expect(screen.getByRole('progressbar')).toHaveClass('hive-progress--warning');

      rerender(<Progress value={10} variant="error" />);
      expect(screen.getByRole('progressbar')).toHaveClass('hive-progress--error');
    });

    it('handles indeterminate loading state', () => {
      render(<Progress indeterminate />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveClass('hive-progress--indeterminate');
    });
  });

  describe('Spinner Component', () => {
    it('renders spinner with correct size', () => {
      render(
        <Spinner size="lg" />
      );
      
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('hive-spinner--large');
    });

    it('includes accessible loading text', () => {
      render(
        <Spinner label="Loading content..." />
      );
      
      expect(screen.getByText('Loading content...')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('supports different spinner variants', () => {
      const { rerender } = render(<Spinner variant="dots" />);
      expect(screen.getByTestId('spinner')).toHaveClass('hive-spinner--dots');

      rerender(<Spinner variant="pulse" />);
      expect(screen.getByTestId('spinner')).toHaveClass('hive-spinner--pulse');
    });
  });

  describe('Tag Component', () => {
    it('renders tag with content and variant', () => {
      render(
        <Tag variant="primary">
          React
        </Tag>
      );
      
      const tag = screen.getByText('React');
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveClass('hive-tag--primary');
    });

    it('handles tag removal', async () => {
      const handleRemove = vi.fn();
      render(
        <Tag removable onRemove={handleRemove}>
          Removable Tag
        </Tag>
      );
      
      const removeButton = screen.getByRole('button', { name: 'Remove tag' });
      await userEvent.click(removeButton);
      
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('supports tag selection', async () => {
      const handleSelect = vi.fn();
      render(
        <Tag selectable onSelect={handleSelect}>
          Selectable Tag
        </Tag>
      );
      
      const tag = screen.getByText('Selectable Tag');
      await userEvent.click(tag);
      
      expect(handleSelect).toHaveBeenCalledTimes(1);
      expect(tag).toHaveClass('hive-tag--selected');
    });

    it('displays tag with icon', () => {
      render(
        <Tag icon="star" variant="secondary">
          Starred
        </Tag>
      );
      
      expect(screen.getByTestId('tag-icon')).toBeInTheDocument();
      expect(screen.getByText('Starred')).toBeInTheDocument();
    });
  });
});