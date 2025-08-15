import type { Meta, StoryObj } from '@storybook/react';
import { Image, ProfileImage, ThumbnailImage, HeroImage } from '../../atomic/atoms/image';
import { User, Camera, Image as ImageIcon, AlertCircle } from 'lucide-react';

const meta: Meta<typeof Image> = {
  title: '01-Atoms/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE image component with lazy loading, error handling, aspect ratios, and campus-specific presets.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility',
    },
    aspectRatio: {
      control: 'select',
      options: ['square', 'video', 'photo', 'wide', 'portrait'],
      description: 'Aspect ratio preset or custom number',
    },
    fit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'scale-down'],
      description: 'How image should fit container',
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
      description: 'Loading strategy',
    },
    placeholder: {
      control: 'select',
      options: ['blur', 'skeleton', 'none'],
      description: 'Loading placeholder type',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius',
    },
    bordered: {
      control: 'boolean',
      description: 'Show border',
    },
    grayscale: {
      control: 'boolean',
      description: 'Apply grayscale filter',
    },
    blur: {
      control: 'boolean',
      description: 'Apply blur filter',
    },
    priority: {
      control: 'boolean',
      description: 'High priority loading',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=entropy',
    alt: 'Campus students studying',
    aspectRatio: 'photo',
  },
};

export const Square: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    alt: 'Student profile',
    aspectRatio: 'square',
  },
};

export const WithBorder: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&crop=entropy',
    alt: 'Campus building',
    aspectRatio: 'photo',
    bordered: true,
    rounded: 'lg',
  },
};

export const Rounded: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    alt: 'Student profile',
    aspectRatio: 'square',
    rounded: 'full',
  },
};

// All aspect ratios
export const AllAspectRatios: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="text-center">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
            alt="Square aspect ratio"
            aspectRatio="square"
            className="w-full max-w-48"
          />
          <p className="mt-2 text-sm text-hive-text-secondary">Square (1:1)</p>
        </div>
        
        <div className="text-center">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=281&fit=crop&crop=entropy"
            alt="Video aspect ratio"
            aspectRatio="video"
            className="w-full max-w-64"
          />
          <p className="mt-2 text-sm text-hive-text-secondary">Video (16:9)</p>
        </div>
        
        <div className="text-center">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&crop=entropy"
            alt="Photo aspect ratio"
            aspectRatio="photo"
            className="w-full max-w-64"
          />
          <p className="mt-2 text-sm text-hive-text-secondary">Photo (4:3)</p>
        </div>
        
        <div className="text-center">
          <Image
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&h=300&fit=crop&crop=entropy"
            alt="Wide aspect ratio"
            aspectRatio="wide"
            className="w-full max-w-80"
          />
          <p className="mt-2 text-sm text-hive-text-secondary">Wide (21:9)</p>
        </div>
        
        <div className="text-center">
          <Image
            src="https://images.unsplash.com/photo-1494790108755-2616b612b9ab?w=300&h=400&fit=crop&crop=face"
            alt="Portrait aspect ratio"
            aspectRatio="portrait"
            className="w-full max-w-48"
          />
          <p className="mt-2 text-sm text-hive-text-secondary">Portrait (3:4)</p>
        </div>
      </div>
    </div>
  ),
};

// All fit options
export const AllFitOptions: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300"
            alt="Cover fit"
            aspectRatio="square"
            fit="cover"
            className="w-32 h-32"
            rounded="md"
          />
          <p className="mt-2 text-sm text-hive-text-secondary">Cover</p>
          <p className="text-xs text-hive-text-mutedLight">Fills container, may crop</p>
        </div>
        
        <div className="text-center">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300"
            alt="Contain fit"
            aspectRatio="square"
            fit="contain"
            className="w-32 h-32"
            rounded="md"
          />
          <p className="mt-2 text-sm text-hive-text-secondary">Contain</p>
          <p className="text-xs text-hive-text-mutedLight">Fits entirely, may letterbox</p>
        </div>
        
        <div className="text-center">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300"
            alt="Fill fit"
            aspectRatio="square"
            fit="fill"
            className="w-32 h-32"
            rounded="md"
          />
          <p className="mt-2 text-sm text-hive-text-secondary">Fill</p>
          <p className="text-xs text-hive-text-mutedLight">Stretches to fill</p>
        </div>
        
        <div className="text-center">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300"
            alt="Scale-down fit"
            aspectRatio="square"
            fit="scale-down"
            className="w-32 h-32"
            rounded="md"
          />
          <p className="mt-2 text-sm text-hive-text-secondary">Scale Down</p>
          <p className="text-xs text-hive-text-mutedLight">Smaller of contain/none</p>
        </div>
      </div>
    </div>
  ),
};

// Campus image scenarios
export const CampusImageScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Profiles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1494790108755-2616b612b9ab?w=150&h=150&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          ].map((src, index) => (
            <div key={index} className="text-center">
              <Image
                src={src}
                alt={`Student ${index + 1}`}
                aspectRatio="square"
                rounded="full"
                bordered
                className="w-24 h-24 mx-auto"
                fallback={
                  <div className="flex items-center justify-center h-full bg-hive-surface-elevated rounded-full">
                    <User className="w-8 h-8 text-hive-text-mutedLight" />
                  </div>
                }
              />
              <p className="mt-2 text-sm text-hive-text-primary">Student {index + 1}</p>
              <p className="text-xs text-hive-text-secondary">CS Major</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop&crop=entropy',
              title: 'Study Group Session',
              date: 'Today 3:00 PM',
              location: 'Library Room 201'
            },
            {
              src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=300&fit=crop&crop=entropy',
              title: 'Campus Tech Talk',
              date: 'Tomorrow 7:00 PM',
              location: 'Engineering Building'
            }
          ].map((event, index) => (
            <div key={index} className="border border-hive-border-subtle rounded-lg overflow-hidden bg-hive-background-secondary">
              <Image
                src={event.src}
                alt={event.title}
                aspectRatio="video"
                className="w-full"
                fallback={
                  <div className="flex items-center justify-center h-full bg-hive-surface-elevated">
                    <ImageIcon className="w-12 h-12 text-hive-text-mutedLight" />
                  </div>
                }
              />
              <div className="p-4">
                <h4 className="font-semibold text-hive-text-primary mb-2">{event.title}</h4>
                <p className="text-sm text-hive-text-secondary">{event.date}</p>
                <p className="text-sm text-hive-text-mutedLight">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Screenshots</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=entropy',
              title: 'GPA Calculator',
              description: 'Calculate your semester GPA',
              users: '1.2k users'
            },
            {
              src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=entropy',
              title: 'Study Planner',
              description: 'Plan your study sessions', 
              users: '847 users'
            },
            {
              src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=entropy',
              title: 'Grade Tracker',
              description: 'Track all your grades',
              users: '2.1k users'
            }
          ].map((tool, index) => (
            <div key={index} className="border border-hive-border-subtle rounded-lg overflow-hidden bg-hive-background-secondary">
              <Image
                src={tool.src}
                alt={tool.title}
                aspectRatio="photo"
                className="w-full"
                fallback={
                  <div className="flex items-center justify-center h-full bg-hive-surface-elevated">
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-hive-text-mutedLight mx-auto mb-2" />
                      <p className="text-xs text-hive-text-mutedLight">No preview available</p>
                    </div>
                  </div>
                }
              />
              <div className="p-4">
                <h4 className="font-semibold text-hive-text-primary mb-1">{tool.title}</h4>
                <p className="text-sm text-hive-text-secondary mb-2">{tool.description}</p>
                <p className="text-xs text-hive-text-mutedLight">{tool.users}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=300&fit=crop&crop=entropy',
            'https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=300&fit=crop&crop=entropy',
            'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=300&fit=crop&crop=entropy',
            'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=300&h=300&fit=crop&crop=entropy',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=entropy',
            'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=300&h=300&fit=crop&crop=entropy',
            'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=300&h=300&fit=crop&crop=entropy',
          ].map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Campus photo ${index + 1}`}
              aspectRatio="square"
              rounded="lg"
              className="w-full hover:scale-105 transition-transform duration-200 cursor-pointer"
              fallback={
                <div className="flex items-center justify-center h-full bg-hive-surface-elevated">
                  <ImageIcon className="w-8 h-8 text-hive-text-mutedLight" />
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

// Loading states and error handling
export const LoadingStatesAndErrorHandling: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Loading Placeholders</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Image
              src="https://httpstat.us/200?sleep=3000"
              alt="Skeleton placeholder"
              aspectRatio="square"
              placeholder="skeleton"
              className="w-48 h-48"
            />
            <p className="mt-2 text-sm text-hive-text-secondary">Skeleton Placeholder</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://httpstat.us/200?sleep=3000"
              alt="Blur placeholder"
              aspectRatio="square"
              placeholder="blur"
              className="w-48 h-48"
            />
            <p className="mt-2 text-sm text-hive-text-secondary">Blur Placeholder</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://httpstat.us/200?sleep=3000"
              alt="No placeholder"
              aspectRatio="square"
              placeholder="none"
              className="w-48 h-48"
            />
            <p className="mt-2 text-sm text-hive-text-secondary">No Placeholder</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Error States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <Image
              src="https://invalid-url-that-will-fail.com/image.jpg"
              alt="Default error state"
              aspectRatio="square"
              className="w-48 h-48"
            />
            <p className="mt-2 text-sm text-hive-text-secondary">Default Error State</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://another-invalid-url.com/image.jpg"
              alt="Custom fallback"
              aspectRatio="square"
              className="w-48 h-48"
              fallback={
                <div className="flex flex-col items-center justify-center h-full bg-hive-surface-elevated text-hive-text-secondary">
                  <AlertCircle className="w-8 h-8 mb-2" />
                  <p className="text-sm">Custom Fallback</p>
                  <p className="text-xs">Unable to load image</p>
                </div>
              }
            />
            <p className="mt-2 text-sm text-hive-text-secondary">Custom Fallback</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Visual Effects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
              alt="Normal image"
              aspectRatio="square"
              className="w-48 h-48"
            />
            <p className="mt-2 text-sm text-hive-text-secondary">Normal</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
              alt="Grayscale image"
              aspectRatio="square"
              grayscale
              className="w-48 h-48"
            />
            <p className="mt-2 text-sm text-hive-text-secondary">Grayscale</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
              alt="Blurred image"
              aspectRatio="square"
              blur
              className="w-48 h-48"
            />
            <p className="mt-2 text-sm text-hive-text-secondary">Blur Effect</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Responsive images
export const ResponsiveImages: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Responsive Hero Image</h3>
        <Image
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=675&fit=crop&crop=entropy"
          alt="Campus hero image"
          aspectRatio="video"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          className="w-full"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Responsive Grid</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Image
              key={index}
              src={`https://images.unsplash.com/photo-${1522202176988 + index * 1000}?w=300&h=300&fit=crop&crop=entropy`}
              alt={`Responsive image ${index + 1}`}
              aspectRatio="square"
              rounded="lg"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="w-full"
              fallback={
                <div className="flex items-center justify-center h-full bg-hive-surface-elevated">
                  <ImageIcon className="w-8 h-8 text-hive-text-mutedLight" />
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Profile Images</h3>
        <div className="flex items-center space-x-4">
          {[
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1494790108755-2616b612b9ab?w=100&h=100&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          ].map((src, index) => (
            <ProfileImage
              key={index}
              src={src}
              alt={`Profile ${index + 1}`}
              className="w-16 h-16"
              fallback={
                <div className="flex items-center justify-center h-full bg-hive-surface-elevated rounded-full">
                  <User className="w-6 h-6 text-hive-text-mutedLight" />
                </div>
              }
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Thumbnail Images</h3>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ThumbnailImage
              key={index}
              src={`https://images.unsplash.com/photo-${1541339907198 + index * 10000}?w=150&h=150&fit=crop&crop=entropy`}
              alt={`Thumbnail ${index + 1}`}
              className="w-24 h-24"
              fallback={
                <div className="flex items-center justify-center h-full bg-hive-surface-elevated">
                  <ImageIcon className="w-6 h-6 text-hive-text-mutedLight" />
                </div>
              }
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Hero Image</h3>
        <HeroImage
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop&crop=entropy"
          alt="Campus hero"
          className="w-full max-w-2xl"
          fallback={
            <div className="flex items-center justify-center h-full bg-hive-surface-elevated">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-hive-text-mutedLight mx-auto mb-2" />
                <p className="text-sm text-hive-text-mutedLight">Hero image unavailable</p>
              </div>
            </div>
          }
        />
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=entropy',
    alt: 'Interactive image - Use controls to customize →',
    aspectRatio: 'photo',
    fit: 'cover',
    rounded: 'md',
    bordered: false,
    grayscale: false,
    blur: false,
    loading: 'lazy',
    placeholder: 'skeleton',
  },
};