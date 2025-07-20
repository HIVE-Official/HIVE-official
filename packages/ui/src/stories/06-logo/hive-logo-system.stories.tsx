import type { Meta, StoryObj } from '@storybook/react';
import { HiveLogo } from '../../components/hive-icons';

// Placeholder components for demonstration
const HiveLogoVariants = ({ variant, size }: any) => (
  <div className="flex items-center gap-2">
    <HiveLogo variant={variant} size={size} />
    <span className="text-[#C1C1C4] text-sm">{variant} variant</span>
  </div>
);

const HiveLogoPatterns = ({ pattern }: any) => (
  <div className="p-4 bg-[#111113] rounded-lg border border-[#2A2A2D]">
    <HiveLogo size="md" />
    <span className="text-[#9B9B9F] text-xs mt-2 block">{pattern} pattern</span>
  </div>
);

const HiveLogoResponsive = ({ breakpoint, containerWidth }: any) => (
  <div className="p-4 bg-[#111113] rounded-lg border border-[#2A2A2D]">
    <HiveLogo size={breakpoint === 'mobile' ? 'sm' : breakpoint === 'tablet' ? 'md' : 'lg'} />
    <span className="text-[#9B9B9F] text-xs mt-2 block">{breakpoint || containerWidth}</span>
  </div>
);

const HiveLogoProduction = ({ format, optimization }: any) => (
  <div className="p-4 bg-[#111113] rounded-lg border border-[#2A2A2D]">
    <HiveLogo size="lg" />
    <span className="text-[#9B9B9F] text-xs mt-2 block">{format} - {optimization}</span>
  </div>
);

const HiveLogoEnterprise = ({ variant }: any) => (
  <div className="p-4 bg-[#111113] rounded-lg border border-[#2A2A2D]">
    <HiveLogo size="lg" />
    <span className="text-[#FFD700] text-xs mt-2 block">Enterprise {variant}</span>
  </div>
);

const HiveLogoAccessibility = ({ variant }: any) => (
  <div className="p-4 bg-[#111113] rounded-lg border border-[#2A2A2D]">
    <HiveLogo size="lg" />
    <span className="text-[#10B981] text-xs mt-2 block">A11y: {variant}</span>
  </div>
);

const HiveLogoPerformance = ({ optimization }: any) => (
  <div className="p-4 bg-[#111113] rounded-lg border border-[#2A2A2D]">
    <HiveLogo size="lg" />
    <span className="text-[#3B82F6] text-xs mt-2 block">Optimized: {optimization}</span>
  </div>
);

const meta: Meta = {
  title: 'HIVE Components/Logo System',
  parameters: {
    docs: {
      description: {
        component: 'Complete HIVE logo system with variants, responsive behavior, and performance optimizations',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Main Logo Component
export const MainLogo: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Logo - Main Component</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Size Variants</h2>
          <div className="flex flex-wrap items-center gap-8">
            <div className="text-center">
              <HiveLogo size="xs" />
              <p className="text-[#9B9B9F] text-sm mt-2">XS (16px)</p>
            </div>
            <div className="text-center">
              <HiveLogo size="sm" />
              <p className="text-[#9B9B9F] text-sm mt-2">SM (24px)</p>
            </div>
            <div className="text-center">
              <HiveLogo size="md" />
              <p className="text-[#9B9B9F] text-sm mt-2">MD (32px)</p>
            </div>
            <div className="text-center">
              <HiveLogo size="lg" />
              <p className="text-[#9B9B9F] text-sm mt-2">LG (48px)</p>
            </div>
            <div className="text-center">
              <HiveLogo size="xl" />
              <p className="text-[#9B9B9F] text-sm mt-2">XL (64px)</p>
            </div>
            <div className="text-center">
              <HiveLogo size="2xl" />
              <p className="text-[#9B9B9F] text-sm mt-2">2XL (96px)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Color Variants</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#111113] p-4 rounded-lg">
                <HiveLogo variant="gold" size="lg" />
              </div>
              <p className="text-[#9B9B9F] text-sm mt-2">Gold (Default)</p>
            </div>
            <div className="text-center">
              <div className="bg-[#111113] p-4 rounded-lg">
                <HiveLogo variant="white" size="lg" />
              </div>
              <p className="text-[#9B9B9F] text-sm mt-2">White</p>
            </div>
            <div className="text-center">
              <div className="bg-[#E5E5E7] p-4 rounded-lg">
                <HiveLogo variant="black" size="lg" />
              </div>
              <p className="text-[#9B9B9F] text-sm mt-2">Black</p>
            </div>
            <div className="text-center">
              <div className="bg-[#111113] p-4 rounded-lg">
                <HiveLogo variant="monochrome" size="lg" />
              </div>
              <p className="text-[#9B9B9F] text-sm mt-2">Monochrome</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Logo Types</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-3">Symbol Only</h3>
              <HiveLogo type="symbol" size="xl" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-3">Wordmark Only</h3>
              <HiveLogo type="wordmark" size="xl" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-3">Full Logo (Symbol + Wordmark)</h3>
              <HiveLogo type="full" size="xl" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Interactive States</h2>
          <div className="flex gap-6">
            <div className="text-center">
              <HiveLogo size="lg" interactive />
              <p className="text-[#9B9B9F] text-sm mt-2">Hover Enabled</p>
            </div>
            <div className="text-center">
              <HiveLogo size="lg" loading />
              <p className="text-[#9B9B9F] text-sm mt-2">Loading State</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
};

// Logo Variants Showcase
export const LogoVariants: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Logo Variants</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Brand Variants</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <HiveLogoVariants variant="primary" size="lg" />
            <HiveLogoVariants variant="secondary" size="lg" />
            <HiveLogoVariants variant="minimal" size="lg" />
            <HiveLogoVariants variant="compact" size="lg" />
            <HiveLogoVariants variant="stacked" size="lg" />
            <HiveLogoVariants variant="inline" size="lg" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Special Editions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <HiveLogoVariants variant="anniversary" size="lg" />
            <HiveLogoVariants variant="premium" size="lg" />
            <HiveLogoVariants variant="community" size="lg" />
          </div>
        </section>
      </div>
    </div>
  ),
};

// Logo Patterns
export const LogoPatterns: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Logo Patterns</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Usage Patterns</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Navigation Header</h3>
              <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
                <HiveLogoPatterns pattern="navigation" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Footer</h3>
              <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
                <HiveLogoPatterns pattern="footer" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Loading Screen</h3>
              <div className="bg-[#111113] p-8 rounded-lg border border-[#2A2A2D] flex items-center justify-center">
                <HiveLogoPatterns pattern="loading" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Card Branding</h3>
              <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
                <HiveLogoPatterns pattern="card" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
};

// Responsive Logo
export const ResponsiveLogo: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">HIVE Responsive Logo</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Breakpoint Behavior</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-3">Desktop (lg+)</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoResponsive breakpoint="desktop" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-3">Tablet (md)</h3>
              <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
                <HiveLogoResponsive breakpoint="tablet" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-3">Mobile (sm)</h3>
              <div className="bg-[#111113] p-3 rounded-lg border border-[#2A2A2D]">
                <HiveLogoResponsive breakpoint="mobile" />
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Container Adaptation</h2>
          <div className="space-y-4">
            <div className="w-full bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
              <HiveLogoResponsive containerWidth="full" />
            </div>
            <div className="w-1/2 bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
              <HiveLogoResponsive containerWidth="half" />
            </div>
            <div className="w-1/4 bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
              <HiveLogoResponsive containerWidth="quarter" />
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
};

// Production & Enterprise
export const ProductionEnterprise: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Production & Enterprise Logos</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Production Optimized</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">SVG Optimized</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoProduction format="svg" optimization="production" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">PNG Fallback</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoProduction format="png" optimization="production" />
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Enterprise Variants</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Enterprise Suite</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoEnterprise variant="suite" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Enterprise Pro</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoEnterprise variant="pro" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">White Label</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoEnterprise variant="whitelabel" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
};

// Accessibility & Performance
export const AccessibilityPerformance: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Accessibility & Performance</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Accessibility Features</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">High Contrast</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoAccessibility variant="high-contrast" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Screen Reader Optimized</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoAccessibility variant="screen-reader" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Reduced Motion</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoAccessibility variant="reduced-motion" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Print Optimized</h3>
              <div className="bg-[#E5E5E7] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoAccessibility variant="print" />
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-6">Performance Optimizations</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Lazy Loading</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoPerformance optimization="lazy" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Critical Path</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoPerformance optimization="critical" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#C1C1C4] mb-4">Preloaded</h3>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <HiveLogoPerformance optimization="preload" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
};