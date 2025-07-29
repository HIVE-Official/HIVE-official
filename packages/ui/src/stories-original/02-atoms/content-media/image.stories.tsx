import type { Meta, StoryObj } from '@storybook/react';
import { 
  Image, 
  ProfileImage, 
  ThumbnailImage, 
  HeroImage 
} from '../../../atomic/atoms/image';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { ImageIcon, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof Image> = {
  title: '02-atoms/Content Media/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Image Component** - Advanced image display with loading states, aspect ratios, and error handling

Part of the HIVE Atomic Design System providing consistent image rendering with enhanced UX features.

## Features
- **5 Aspect Ratios**: Square, video, photo, wide, portrait + custom ratios
- **4 Object Fit Options**: Cover, contain, fill, scale-down for responsive images
- **3 Loading Modes**: Lazy, eager, with priority support for critical images
- **3 Placeholder Types**: Skeleton, blur, none for loading states
- **6 Border Radius**: None to full rounding options
- **Visual Effects**: Grayscale, blur, border styling
- **Error Handling**: Graceful fallbacks and error states
- **Performance**: Lazy loading, sizes attribute, priority loading
- **Accessibility**: Proper alt text and semantic structure

## Preset Components
- **ProfileImage**: Square, rounded, optimized for profile photos
- **ThumbnailImage**: Square thumbnails for galleries and lists
- **HeroImage**: Video aspect ratio for hero sections and banners

## Use Cases
- **Hero Sections**: Large banner images with video aspect ratio
- **Profile Photos**: Circular or rounded profile images
- **Content Images**: Article and blog post illustrations
- **Thumbnails**: Product and content preview images
- **Galleries**: Grid layouts with consistent aspect ratios
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL'
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility'
    },
    aspectRatio: {
      control: 'select',
      options: ['square', 'video', 'photo', 'wide', 'portrait'],
      description: 'Image aspect ratio preset'
    },
    fit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'scale-down'],
      description: 'How image should fit within container'
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
      description: 'Image loading strategy'
    },
    placeholder: {
      control: 'select',
      options: ['blur', 'skeleton', 'none'],
      description: 'Loading placeholder type'
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius variant'
    },
    bordered: {
      control: 'boolean',
      description: 'Add border around image'
    },
    grayscale: {
      control: 'boolean',
      description: 'Apply grayscale filter'
    },
    blur: {
      control: 'boolean',
      description: 'Apply blur effect'
    },
    priority: {
      control: 'boolean',
      description: 'Load image with high priority'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample image URLs for demos
const sampleImages = {
  landscape: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  portrait: 'https://images.unsplash.com/photo-1494790108755-2616b2c0c3ee?w=400&h=600&fit=crop',
  square: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  wide: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop',
  hero: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=675&fit=crop',
  tech: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
};

// Default Image
export const Default: Story = {
  args: {
    src: sampleImages.landscape,
    alt: 'Beautiful landscape',
    aspectRatio: 'photo'
  }
};

// All Aspect Ratios
export const AllAspectRatios: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Text variant="body-sm" color="secondary">Square (1:1)</Text>
          <Image
            src={sampleImages.square}
            alt="Square aspect ratio"
            aspectRatio="square"
            className="w-full max-w-xs"
          />
        </div>
        
        <div className="space-y-2">
          <Text variant="body-sm" color="secondary">Video (16:9)</Text>
          <Image
            src={sampleImages.hero}
            alt="Video aspect ratio"
            aspectRatio="video"
            className="w-full max-w-xs"
          />
        </div>
        
        <div className="space-y-2">
          <Text variant="body-sm" color="secondary">Photo (4:3)</Text>
          <Image
            src={sampleImages.landscape}
            alt="Photo aspect ratio"
            aspectRatio="photo"
            className="w-full max-w-xs"
          />
        </div>
        
        <div className="space-y-2">
          <Text variant="body-sm" color="secondary">Wide (21:9)</Text>
          <Image
            src={sampleImages.wide}
            alt="Wide aspect ratio"
            aspectRatio="wide"
            className="w-full max-w-xs"
          />
        </div>
        
        <div className="space-y-2">
          <Text variant="body-sm" color="secondary">Portrait (3:4)</Text>
          <Image
            src={sampleImages.portrait}
            alt="Portrait aspect ratio"
            aspectRatio="portrait"
            className="w-full max-w-xs"
          />
        </div>
        
        <div className="space-y-2">
          <Text variant="body-sm" color="secondary">Custom (2:1)</Text>
          <Image
            src={sampleImages.wide}
            alt="Custom aspect ratio"
            aspectRatio={2}
            className="w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  )
};

// Object Fit Options
export const ObjectFitOptions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-2xl">
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Cover (Default)</Text>
        <Image
          src={sampleImages.landscape}
          alt="Cover fit"
          aspectRatio="square"
          fit="cover"
          className="w-full max-w-xs"
        />
        <Text variant="body-xs" color="muted">
          Scales image to cover container, may crop
        </Text>
      </div>
      
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Contain</Text>
        <Image
          src={sampleImages.landscape}
          alt="Contain fit"
          aspectRatio="square"
          fit="contain"
          className="w-full max-w-xs"
        />
        <Text variant="body-xs" color="muted">
          Scales image to fit inside container
        </Text>
      </div>
      
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Fill</Text>
        <Image
          src={sampleImages.landscape}
          alt="Fill fit"
          aspectRatio="square"
          fit="fill"
          className="w-full max-w-xs"
        />
        <Text variant="body-xs" color="muted">
          Stretches image to fill container exactly
        </Text>
      </div>
      
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Scale Down</Text>
        <Image
          src={sampleImages.landscape}
          alt="Scale down fit"
          aspectRatio="square"
          fit="scale-down"
          className="w-full max-w-xs"
        />
        <Text variant="body-xs" color="muted">
          Acts like contain but never scales up
        </Text>
      </div>
    </div>
  )
};

// Border Radius Options
export const BorderRadiusOptions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-2xl">
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">None</Text>
        <Image
          src={sampleImages.square}
          alt="No border radius"
          aspectRatio="square"
          rounded="none"
          className="w-full max-w-24"
        />
      </div>
      
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Small</Text>
        <Image
          src={sampleImages.square}
          alt="Small border radius"
          aspectRatio="square"
          rounded="sm"
          className="w-full max-w-24"
        />
      </div>
      
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Medium</Text>
        <Image
          src={sampleImages.square}
          alt="Medium border radius"
          aspectRatio="square"
          rounded="md"
          className="w-full max-w-24"
        />
      </div>
      
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Large</Text>
        <Image
          src={sampleImages.square}
          alt="Large border radius"
          aspectRatio="square"
          rounded="lg"
          className="w-full max-w-24"
        />
      </div>
      
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">XL</Text>
        <Image
          src={sampleImages.square}
          alt="Extra large border radius"
          aspectRatio="square"
          rounded="xl"
          className="w-full max-w-24"
        />
      </div>
      
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Full</Text>
        <Image
          src={sampleImages.square}
          alt="Full border radius"
          aspectRatio="square"
          rounded="full"
          className="w-full max-w-24"
        />
      </div>
    </div>
  )
};

// Visual Effects
export const VisualEffects: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-2xl">
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Normal</Text>
        <Image
          src={sampleImages.landscape}
          alt="Normal image"
          aspectRatio="photo"
          className="w-full max-w-xs"
        />
      </div>
      
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Grayscale</Text>
        <Image
          src={sampleImages.landscape}
          alt="Grayscale image"
          aspectRatio="photo"
          grayscale
          className="w-full max-w-xs"
        />
      </div>
      
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Blur</Text>
        <Image
          src={sampleImages.landscape}
          alt="Blurred image"
          aspectRatio="photo"
          blur
          className="w-full max-w-xs"
        />
      </div>
      
      <div className="space-y-2">
        <Text variant="body-sm" color="secondary">Bordered</Text>
        <Image
          src={sampleImages.landscape}
          alt="Bordered image"
          aspectRatio="photo"
          bordered
          className="w-full max-w-xs"
        />
      </div>
    </div>
  )
};

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Placeholder Types</Text>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Text variant="body-sm" color="secondary">Skeleton (Default)</Text>
            <Image
              src={sampleImages.landscape}
              alt="Skeleton placeholder"
              aspectRatio="photo"
              placeholder="skeleton"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="body-sm" color="secondary">Blur</Text>
            <Image
              src={sampleImages.landscape}
              alt="Blur placeholder"
              aspectRatio="photo"
              placeholder="blur"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="body-sm" color="secondary">None</Text>
            <Image
              src={sampleImages.landscape}
              alt="No placeholder"
              aspectRatio="photo"
              placeholder="none"
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Loading Priority</Text>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text variant="body-sm" color="secondary">Lazy Loading</Text>
            <Image
              src={sampleImages.tech}
              alt="Lazy loaded image"
              aspectRatio="photo"
              loading="lazy"
              className="w-full"
            />
            <Text variant="body-xs" color="muted">
              Loads when scrolled into view
            </Text>
          </div>
          
          <div className="space-y-2">
            <Text variant="body-sm" color="secondary">Priority Loading</Text>
            <Image
              src={sampleImages.office}
              alt="Priority loaded image"
              aspectRatio="photo"
              priority
              className="w-full"
            />
            <Text variant="body-xs" color="muted">
              Loads immediately for critical images
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
};

// Error Handling
export const ErrorHandling: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Error States</Text>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text variant="body-sm" color="secondary">Default Error</Text>
            <Image
              src="https://invalid-url-that-will-fail.jpg"
              alt="Broken image"
              aspectRatio="photo"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="body-sm" color="secondary">Custom Fallback</Text>
            <Image
              src="https://another-invalid-url.jpg"
              alt="Broken image with fallback"
              aspectRatio="photo"
              fallback={
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <Text variant="body-sm">Custom fallback content</Text>
                </div>
              }
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Fallback Variations</Text>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Text variant="body-sm" color="secondary">Icon Fallback</Text>
            <Image
              src="https://fail1.jpg"
              alt="Icon fallback"
              aspectRatio="square"
              fallback={
                <div className="flex items-center justify-center h-full">
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
                </div>
              }
              className="w-full max-w-32"
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="body-sm" color="secondary">Text Fallback</Text>
            <Image
              src="https://fail2.jpg"
              alt="Text fallback"
              aspectRatio="square"
              fallback="Image not available"
              className="w-full max-w-32"
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="body-sm" color="secondary">Badge Fallback</Text>
            <Image
              src="https://fail3.jpg"
              alt="Badge fallback"
              aspectRatio="square"
              fallback={
                <div className="flex items-center justify-center h-full">
                  <Badge variant="error">Error</Badge>
                </div>
              }
              className="w-full max-w-32"
            />
          </div>
        </div>
      </div>
    </div>
  )
};

// Preset Components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Text variant="heading-sm">ProfileImage</Text>
        <div className="flex items-center gap-4">
          <ProfileImage
            src={sampleImages.square}
            alt="Profile image"
            className="w-16 h-16"
          />
          <ProfileImage
            src={sampleImages.portrait}
            alt="Profile image"
            className="w-24 h-24"
          />
          <ProfileImage
            src={sampleImages.square}
            alt="Profile image"
            className="w-32 h-32"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">ThumbnailImage</Text>
        <div className="grid grid-cols-4 gap-4 max-w-md">
          <ThumbnailImage
            src={sampleImages.landscape}
            alt="Thumbnail 1"
          />
          <ThumbnailImage
            src={sampleImages.tech}
            alt="Thumbnail 2"
          />
          <ThumbnailImage
            src={sampleImages.office}
            alt="Thumbnail 3"
          />
          <ThumbnailImage
            src={sampleImages.hero}
            alt="Thumbnail 4"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">HeroImage</Text>
        <HeroImage
          src={sampleImages.hero}
          alt="Hero banner"
          className="w-full max-w-2xl"
        />
      </div>
    </div>
  )
};

// Gallery Example
export const GalleryExample: Story = {
  render: () => (
    <HiveCard className="p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <Text variant="heading-lg">Project Gallery</Text>
          <Text variant="body-md" color="secondary">
            Showcase of recent work and achievements
          </Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Image
              src={sampleImages.tech}
              alt="Technology project"
              aspectRatio="photo"
              className="w-full"
            />
            <div>
              <Text variant="heading-sm">Tech Dashboard</Text>
              <Text variant="body-sm" color="secondary">
                Modern analytics platform with real-time data visualization
              </Text>
              <div className="flex gap-2 mt-2">
                <Badge variant="primary" size="sm">React</Badge>
                <Badge variant="secondary" size="sm">TypeScript</Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Image
              src={sampleImages.office}
              alt="Office collaboration"
              aspectRatio="photo"
              className="w-full"
            />
            <div>
              <Text variant="heading-sm">Team Workspace</Text>
              <Text variant="body-sm" color="secondary">
                Collaborative environment for remote team productivity
              </Text>
              <div className="flex gap-2 mt-2">
                <Badge variant="success" size="sm">Vue.js</Badge>
                <Badge variant="info" size="sm">Node.js</Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Image
              src={sampleImages.landscape}
              alt="Mobile application"
              aspectRatio="photo"
              className="w-full"
            />
            <div>
              <Text variant="heading-sm">Mobile App</Text>
              <Text variant="body-sm" color="secondary">
                Cross-platform mobile application for field operations
              </Text>
              <div className="flex gap-2 mt-2">
                <Badge variant="warning" size="sm">React Native</Badge>
                <Badge variant="ghost" size="sm">GraphQL</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HiveCard>
  )
};

// Responsive Image Example
export const ResponsiveImageExample: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Responsive Behavior</Text>
        <Text variant="body-md" color="secondary">
          Images automatically adapt to different screen sizes and containers
        </Text>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Text variant="body-sm" color="secondary">Mobile (Square)</Text>
          <Image
            src={sampleImages.square}
            alt="Mobile optimized"
            aspectRatio="square"
            className="w-full md:hidden"
          />
          <Image
            src={sampleImages.landscape}
            alt="Desktop optimized"
            aspectRatio="photo"
            className="w-full hidden md:block"
          />
        </div>
        
        <div className="space-y-2">
          <Text variant="body-sm" color="secondary">Tablet (Photo)</Text>
          <Image
            src={sampleImages.landscape}
            alt="Tablet optimized"
            aspectRatio="photo"
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Text variant="body-sm" color="secondary">Desktop (Wide)</Text>
          <Image
            src={sampleImages.wide}
            alt="Desktop optimized"
            aspectRatio="wide"
            className="w-full hidden lg:block"
          />
          <Image
            src={sampleImages.landscape}
            alt="Fallback"
            aspectRatio="photo"
            className="w-full lg:hidden"
          />
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <Text variant="body-sm" className="text-blue-800">
          <strong>Performance Tip:</strong> Use the `sizes` attribute to help the browser 
          choose the best image size for each viewport. Combine with `priority` for 
          above-the-fold images and `loading="lazy"` for images below the fold.
        </Text>
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="max-w-md">
      <Image {...args} className="w-full" />
    </div>
  ),
  args: {
    src: sampleImages.landscape,
    alt: 'Interactive image demo',
    aspectRatio: 'photo',
    fit: 'cover',
    loading: 'lazy',
    placeholder: 'skeleton',
    rounded: 'md',
    bordered: false,
    grayscale: false,
    blur: false,
    priority: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different image configurations including aspect ratios, object fit, visual effects, and loading options.'
      }
    }
  }
};