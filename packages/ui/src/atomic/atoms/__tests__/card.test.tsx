/**
 * Card Component Tests
 *
 * Comprehensive test suite for the Card component family covering:
 * - Card base component rendering
 * - CardHeader, CardTitle, CardDescription rendering
 * - CardContent, CardFooter rendering
 * - Composition patterns (full card structure)
 * - Accessibility requirements
 * - Event handling (onClick, hover)
 * - Prop forwarding and ref handling
 * - Styling and className merging
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../card';
import { axe } from 'jest-axe';

describe('Card Component', () => {
  describe('Card - Base Component', () => {
    it('renders a div element', () => {
      const { container } = render(<Card>Card content</Card>);
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with text content', () => {
      render(<Card>Hello World</Card>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <Card>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </Card>
      );
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    });

    it('applies default styling classes', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('bg-[#0c0c0c]');
      expect(card).toHaveClass('border', 'border-white/8');
      expect(card).toHaveClass('text-white');
    });

    it('forwards className to the card element', () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });

    it('merges custom className with default classes', () => {
      const { container } = render(<Card className="p-8 shadow-lg">Content</Card>);
      const card = container.firstChild as HTMLElement;

      // Default classes should still be present
      expect(card).toHaveClass('rounded-lg', 'bg-[#0c0c0c]');
      // Custom classes should be added
      expect(card).toHaveClass('p-8', 'shadow-lg');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Content</Card>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.textContent).toBe('Content');
    });

    it('forwards HTML attributes', () => {
      render(
        <Card data-testid="custom-card" id="card-123" aria-label="Info card">
          Content
        </Card>
      );
      const card = screen.getByTestId('custom-card');

      expect(card).toHaveAttribute('id', 'card-123');
      expect(card).toHaveAttribute('aria-label', 'Info card');
    });
  });

  describe('CardHeader', () => {
    it('renders as a div', () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with text content', () => {
      render(<CardHeader>Card Header</CardHeader>);
      expect(screen.getByText('Card Header')).toBeInTheDocument();
    });

    it('applies default styling classes', () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      const header = container.firstChild as HTMLElement;

      expect(header).toHaveClass('flex', 'flex-col');
      expect(header).toHaveClass('space-y-1.5');
      expect(header).toHaveClass('p-6');
    });

    it('forwards className', () => {
      const { container } = render(
        <CardHeader className="custom-header">Header</CardHeader>
      );
      const header = container.firstChild as HTMLElement;
      expect(header).toHaveClass('custom-header');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardHeader ref={ref}>Header</CardHeader>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardTitle', () => {
    it('renders as a div', () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with text content', () => {
      render(<CardTitle>My Card Title</CardTitle>);
      expect(screen.getByText('My Card Title')).toBeInTheDocument();
    });

    it('applies default styling classes', () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      const title = container.firstChild as HTMLElement;

      expect(title).toHaveClass('text-lg', 'font-semibold');
      expect(title).toHaveClass('leading-none', 'tracking-tight');
      expect(title).toHaveClass('text-white');
    });

    it('forwards className', () => {
      const { container } = render(
        <CardTitle className="text-2xl">Title</CardTitle>
      );
      const title = container.firstChild as HTMLElement;
      expect(title).toHaveClass('text-2xl');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardTitle ref={ref}>Title</CardTitle>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardDescription', () => {
    it('renders as a div', () => {
      const { container } = render(<CardDescription>Description</CardDescription>);
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with text content', () => {
      render(<CardDescription>This is a description</CardDescription>);
      expect(screen.getByText('This is a description')).toBeInTheDocument();
    });

    it('applies default styling classes', () => {
      const { container } = render(<CardDescription>Description</CardDescription>);
      const description = container.firstChild as HTMLElement;

      expect(description).toHaveClass('text-sm');
      expect(description).toHaveClass('text-white/70');
    });

    it('forwards className', () => {
      const { container } = render(
        <CardDescription className="text-base">Description</CardDescription>
      );
      const description = container.firstChild as HTMLElement;
      expect(description).toHaveClass('text-base');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardDescription ref={ref}>Description</CardDescription>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardContent', () => {
    it('renders as a div', () => {
      const { container } = render(<CardContent>Content</CardContent>);
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with text content', () => {
      render(<CardContent>Main content here</CardContent>);
      expect(screen.getByText('Main content here')).toBeInTheDocument();
    });

    it('applies default styling classes', () => {
      const { container } = render(<CardContent>Content</CardContent>);
      const content = container.firstChild as HTMLElement;

      expect(content).toHaveClass('p-6', 'pt-0');
    });

    it('forwards className', () => {
      const { container } = render(
        <CardContent className="p-4">Content</CardContent>
      );
      const content = container.firstChild as HTMLElement;
      expect(content).toHaveClass('p-4');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardContent ref={ref}>Content</CardContent>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardFooter', () => {
    it('renders as a div', () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with text content', () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('applies default styling classes', () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      const footer = container.firstChild as HTMLElement;

      expect(footer).toHaveClass('flex', 'items-center');
      expect(footer).toHaveClass('p-6', 'pt-0');
    });

    it('forwards className', () => {
      const { container } = render(
        <CardFooter className="justify-end">Footer</CardFooter>
      );
      const footer = container.firstChild as HTMLElement;
      expect(footer).toHaveClass('justify-end');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardFooter ref={ref}>Footer</CardFooter>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Composition Patterns', () => {
    it('renders a complete card with all subcomponents', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Main content</CardContent>
          <CardFooter>Footer actions</CardFooter>
        </Card>
      );

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card Description')).toBeInTheDocument();
      expect(screen.getByText('Main content')).toBeInTheDocument();
      expect(screen.getByText('Footer actions')).toBeInTheDocument();
    });

    it('renders card with only header and content', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title Only</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );

      expect(screen.getByText('Title Only')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.queryByText('Footer')).not.toBeInTheDocument();
    });

    it('renders card with custom content structure', () => {
      render(
        <Card>
          <div className="custom-structure">
            <h2>Custom Heading</h2>
            <p>Custom paragraph</p>
          </div>
        </Card>
      );

      expect(screen.getByText('Custom Heading')).toBeInTheDocument();
      expect(screen.getByText('Custom paragraph')).toBeInTheDocument();
    });

    it('maintains proper DOM hierarchy', () => {
      const { container } = render(
        <Card data-testid="card">
          <CardHeader data-testid="header">
            <CardTitle data-testid="title">Title</CardTitle>
          </CardHeader>
          <CardContent data-testid="content">Content</CardContent>
        </Card>
      );

      const card = screen.getByTestId('card');
      const header = screen.getByTestId('header');
      const title = screen.getByTestId('title');
      const content = screen.getByTestId('content');

      expect(card).toContainElement(header);
      expect(header).toContainElement(title);
      expect(card).toContainElement(content);
    });
  });

  describe('Interactive Cards', () => {
    it('handles onClick events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Card onClick={handleClick} data-testid="clickable-card">
          Clickable Card
        </Card>
      );

      const card = screen.getByTestId('clickable-card');
      await user.click(card);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be keyboard navigable when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleKeyDown = vi.fn();

      render(
        <Card
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
        >
          Interactive Card
        </Card>
      );

      const card = screen.getByRole('button');
      card.focus();
      expect(card).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it('applies hover states via className', () => {
      const { container } = render(
        <Card className="hover:bg-white/10 hover:border-white/20">
          Hoverable Card
        </Card>
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('hover:bg-white/10');
      expect(card).toHaveClass('hover:border-white/20');
    });

    it('supports disabled state via aria-disabled', () => {
      render(
        <Card aria-disabled="true" data-testid="disabled-card">
          Disabled Card
        </Card>
      );
      const card = screen.getByTestId('disabled-card');

      expect(card).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations for basic card', async () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Accessible Card</CardTitle>
          </CardHeader>
          <CardContent>Content here</CardContent>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports ARIA role attribute', () => {
      render(
        <Card role="article" aria-label="News article">
          Article content
        </Card>
      );
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-label', 'News article');
    });

    it('supports aria-labelledby for card title', () => {
      render(
        <Card aria-labelledby="card-title-1">
          <CardHeader>
            <CardTitle id="card-title-1">Card Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
      const card = screen.getByText('Card Title').closest('div[aria-labelledby]');
      expect(card).toHaveAttribute('aria-labelledby', 'card-title-1');
    });

    it('supports aria-describedby for card description', () => {
      render(
        <Card aria-describedby="card-desc-1">
          <CardHeader>
            <CardDescription id="card-desc-1">Description text</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
      const card = screen.getByText('Description text').closest('div[aria-describedby]');
      expect(card).toHaveAttribute('aria-describedby', 'card-desc-1');
    });

    it('maintains proper heading hierarchy with CardTitle', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Heading Level 2</h2>
            </CardTitle>
          </CardHeader>
        </Card>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Styling Variations', () => {
    it('supports custom border styles', () => {
      const { container } = render(
        <Card className="border-2 border-[#FFD700]">
          Gold border card
        </Card>
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-2', 'border-[#FFD700]');
    });

    it('supports custom background colors', () => {
      const { container } = render(
        <Card className="bg-gradient-to-r from-purple-900 to-blue-900">
          Gradient card
        </Card>
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('bg-gradient-to-r', 'from-purple-900', 'to-blue-900');
    });

    it('supports shadow styles', () => {
      const { container } = render(
        <Card className="shadow-xl hover:shadow-2xl">
          Shadow card
        </Card>
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('shadow-xl', 'hover:shadow-2xl');
    });

    it('supports spacing adjustments', () => {
      render(
        <Card>
          <CardHeader className="p-4">Compact header</CardHeader>
          <CardContent className="p-4">Compact content</CardContent>
          <CardFooter className="p-4">Compact footer</CardFooter>
        </Card>
      );

      const header = screen.getByText('Compact header');
      const content = screen.getByText('Compact content');
      const footer = screen.getByText('Compact footer');

      expect(header).toHaveClass('p-4');
      expect(content).toHaveClass('p-4');
      expect(footer).toHaveClass('p-4');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty card', () => {
      const { container } = render(<Card />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles card with only whitespace', () => {
      const { container } = render(<Card>   </Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
      expect(card.textContent).toBe('   ');
    });

    it('handles very long content', () => {
      const longText = 'Lorem ipsum dolor sit amet';
      render(
        <Card>
          <CardContent data-testid="long-content">
            {longText.repeat(100)}
          </CardContent>
        </Card>
      );
      const content = screen.getByTestId('long-content');
      expect(content.textContent).toContain(longText);
    });

    it('handles nested cards', () => {
      render(
        <Card data-testid="outer">
          <CardContent>
            <Card data-testid="inner">
              <CardContent>Nested card</CardContent>
            </Card>
          </CardContent>
        </Card>
      );

      const outer = screen.getByTestId('outer');
      const inner = screen.getByTestId('inner');

      expect(outer).toContainElement(inner);
    });

    it('handles null/undefined className gracefully', () => {
      const { container } = render(<Card className={undefined}>Content</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
