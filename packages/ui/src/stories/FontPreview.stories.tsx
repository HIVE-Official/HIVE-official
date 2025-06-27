import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Fonts',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Font System

Our typography system uses three carefully selected fonts for an S-tier premium feel:

## Font Stack
- **Space Grotesk Variable**: Headlines, hero text, call-to-actions
- **Geist Sans**: Body text, menus, micro-copy (S-tier premium feel)
- **Geist Mono**: Code snippets, technical content, countdown numerals

## Implementation
Fonts are served from \`packages/ui/public/fonts/\` and loaded via CSS custom properties.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// === SPACE GROTESK VARIABLE (DISPLAY) ===
export const SpaceGroteskDisplay: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-background text-foreground">
      <div>
        <h2 className="text-h2 mb-6 font-display">Space Grotesk Variable (Display)</h2>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-display font-display font-semibold leading-tight tracking-tight">
              Display Text (64px)
            </h1>
            <p className="text-caption text-muted-foreground">Hero headlines, marketing pages</p>
          </div>
          
          <div>
            <h1 className="text-h1 font-display font-semibold leading-tight tracking-tight">
              Heading 1 (48px)
            </h1>
            <p className="text-caption text-muted-foreground">Page titles, primary headings</p>
          </div>
          
          <div>
            <h2 className="text-h2 font-display font-semibold leading-tight tracking-tight">
              Heading 2 (32px)
            </h2>
            <p className="text-caption text-muted-foreground">Section headers, secondary headings</p>
          </div>
          
          <div>
            <h3 className="text-h3 font-display font-semibold leading-tight tracking-tight">
              Heading 3 (24px)
            </h3>
            <p className="text-caption text-muted-foreground">Subsection headers</p>
          </div>
          
          <div>
            <h4 className="text-h4 font-display font-semibold leading-tight tracking-tight">
              Heading 4 (20px)
            </h4>
            <p className="text-caption text-muted-foreground">Card titles, minor headings</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// === GEIST SANS (BODY) ===
export const GeistSansBody: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-background text-foreground">
      <div>
        <h2 className="text-h2 mb-6 font-display">Geist Sans (Body)</h2>
        
        <div className="space-y-6 max-w-2xl">
          <div>
            <p className="text-body font-sans leading-relaxed">
              This is body text using <strong>Geist Sans</strong>. It's perfect for paragraphs, descriptions, and main content areas. 
              The font provides excellent readability and a modern, clean aesthetic that aligns with our premium brand.
            </p>
            <p className="text-caption text-muted-foreground mt-2">Body text (16px) - Main content, paragraphs</p>
          </div>
          
          <div>
            <p className="text-body-sm font-sans leading-relaxed">
              This is smaller body text using <strong>Geist Sans</strong>. It's ideal for secondary content, captions, and supporting text.
            </p>
            <p className="text-caption text-muted-foreground mt-2">Body Small (14px) - Secondary content, captions</p>
          </div>
          
          <div>
            <p className="text-caption font-sans leading-normal text-muted-foreground">
              This is caption text using <strong>Geist Sans</strong>. It's used for labels, metadata, and micro-copy throughout the interface.
            </p>
            <p className="text-caption text-muted-foreground mt-2">Caption (12px) - Labels, metadata, micro-copy</p>
          </div>
          
          <div>
            <button className="text-button font-sans font-medium leading-none px-4 py-2 bg-primary text-primary-foreground rounded-md">
              Button Text (14px)
            </button>
            <p className="text-caption text-muted-foreground mt-2">Button (14px) - Button text, CTAs</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// === GEIST MONO (CODE) ===
export const GeistMonoCode: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-background text-foreground">
      <div>
        <h2 className="text-h2 mb-6 font-display">Geist Mono (Code)</h2>
        
        <div className="space-y-6 max-w-2xl">
          <div>
            <code className="text-code font-mono leading-relaxed bg-muted px-1.5 py-0.5 rounded-md">
              const platform = "HIVE"
            </code>
            <p className="text-caption text-muted-foreground mt-2">Inline code (14px)</p>
          </div>
          
          <div>
            <pre className="text-code font-mono leading-relaxed bg-muted p-4 rounded-md overflow-x-auto">
{`function createPost(content: string) {
  return {
    id: generateId(),
    content,
    timestamp: Date.now(),
    author: getCurrentUser()
  }
}`}
            </pre>
            <p className="text-caption text-muted-foreground mt-2">Code block (14px) - Code snippets, technical content</p>
          </div>
          
          <div>
            <p className="text-code font-mono leading-relaxed">
              1234567890 - Countdown numerals and technical content
            </p>
            <p className="text-caption text-muted-foreground mt-2">Technical numerals and content</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// === COMPLETE SHOWCASE ===
export const CompleteShowcase: Story = {
  render: () => (
    <div className="p-8 space-y-12 bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-display font-display font-semibold leading-tight tracking-tight mb-4">
          The Future of Social
        </h1>
        <p className="text-body font-sans leading-relaxed max-w-2xl mx-auto">
          HIVE is a social platform designed for creators, innovators, and communities 
          who want to connect in meaningful ways. Built with privacy and authenticity at its core.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-h2 font-display font-semibold leading-tight tracking-tight">
            Space Grotesk Variable
          </h2>
          <p className="text-body-sm font-sans leading-relaxed text-muted-foreground">
            Used for headlines, hero text, and call-to-actions. Provides a bold, modern aesthetic 
            that commands attention while maintaining excellent readability.
          </p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-h2 font-display font-semibold leading-tight tracking-tight">
            Geist Sans
          </h2>
          <p className="text-body-sm font-sans leading-relaxed text-muted-foreground">
            Used for body text, menus, and micro-copy. Offers <strong>S-tier premium feel</strong> with 
            exceptional legibility and a clean, contemporary design.
          </p>
        </div>
      </div>
      
      <div className="text-center">
        <code className="text-code font-mono leading-relaxed bg-muted px-3 py-2 rounded-md">
          const brand = "HIVE" // Built with premium typography
        </code>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Brand Compliance Check:**
- ✅ Space Grotesk Variable for headlines and hero text
- ✅ Geist Sans for body text and UI elements (S-tier premium)
- ✅ Geist Mono for code and technical content
- ✅ Proper font weights and line heights
- ✅ CSS custom properties for consistent usage
- ✅ Font files served from UI package public directory
        `,
      },
    },
  },
}; 