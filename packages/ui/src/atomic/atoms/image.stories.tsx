import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Image, ProfileImage, ThumbnailImage, HeroImage } from './image';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import '../../hive-tokens.css';

const meta: Meta<typeof Image> = {
  title: '01-Atoms/Image - COMPLETE DEFINITION',
  component: Image,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Image - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated image display system for University at Buffalo campus content and media presentation.

### 🏆 **COMPONENT EXCELLENCE**
- **5 Aspect Ratios** - Square, video, photo, wide, portrait plus custom numeric ratios
- **4 Object Fit Options** - Cover, contain, fill, scale-down for perfect image presentation
- **6 Rounded Variants** - From none to full circle for flexible styling
- **3 Loading Placeholders** - Blur, skeleton, none for smooth loading experience
- **Smart Loading States** - Lazy loading, priority loading, error handling with fallbacks
- **Perfect Semantic Tokens** - 100% semantic token usage for all backgrounds and borders
- **Campus Media Ready** - Optimized for UB academic content, events, and student media

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo image content and media display:
- **Student Profiles** - Profile photos, academic headshots, student organization members
- **Campus Events** - Event photos, promotional images, campus life documentation
- **Academic Content** - Course materials, research images, presentation media
- **Administrative Media** - Department photos, faculty portraits, campus facilities
- **Social Features** - Post images, shared content, community galleries
- **Mobile Campus** - Responsive images for mobile campus access and social sharing

### 📱 **MOBILE OPTIMIZATION**
- **Progressive Loading** - Efficient loading with appropriate placeholders
- **Responsive Sizing** - Automatic sizing based on device capabilities
- **Touch-Friendly Display** - Optimized for mobile viewing and interaction
`,
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
      description: 'Image aspect ratio',
    },
    fit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'scale-down'],
      description: 'How image fits in container',
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
      description: 'Loading behavior',
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
      description: 'Apply blur effect',
    },
    priority: {
      control: 'boolean',
      description: 'Priority loading (eager)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

// Default image showcase
export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    alt: 'University at Buffalo student',
    aspectRatio: 'square',
    fit: 'cover',
    loading: 'lazy',
    placeholder: 'skeleton',
    rounded: 'md',
    bordered: false,
    grayscale: false,
    blur: false,
    priority: false,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <div className="w-64 mx-auto">
            <Image {...args} />
          </div>
          <Text variant="body-sm" color="secondary" className="text-center">
            Default image display for University at Buffalo content
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Aspect Ratio Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">📐 ASPECT RATIOS</Badge>
            Image Aspect Ratios - Content Presentation
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 predefined aspect ratios plus custom numeric ratios for flexible content presentation
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Standard Aspect Ratios:</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Square (1:1):</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Student profile"
                    aspectRatio="square"
                    rounded="lg"
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Profile photos</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Video (16:9):</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=225&fit=crop"
                    alt="Campus quad"
                    aspectRatio="video"
                    rounded="lg"
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Campus scenes</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Photo (4:3):</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=225&fit=crop"
                    alt="Library study"
                    aspectRatio="photo"
                    rounded="lg"
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Study spaces</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Wide (21:9):</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=171&fit=crop"
                    alt="Campus panorama"
                    aspectRatio="wide"
                    rounded="lg"
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Campus views</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Portrait (3:4):</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=225&h=300&fit=crop"
                    alt="Student portrait"
                    aspectRatio="portrait"
                    rounded="lg"
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Academic portraits</Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Object Fit Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎯 OBJECT FIT</Badge>
            Image Object Fit - Content Scaling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 object fit options for perfect image scaling and presentation in containers
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Object Fit Comparison:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Cover:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
                    alt="Student photo cover"
                    aspectRatio="square"
                    fit="cover"
                    rounded="lg"
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Fills container, crops if needed</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Contain:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
                    alt="Student photo contain"
                    aspectRatio="square"
                    fit="contain"
                    rounded="lg"
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Fits entirely, may have gaps</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Fill:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
                    alt="Student photo fill"
                    aspectRatio="square"
                    fit="fill"
                    rounded="lg"
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Stretches to fill container</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Scale Down:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
                    alt="Student photo scale"
                    aspectRatio="square"
                    fit="scale-down"
                    rounded="lg"
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Scales down if too large</Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Rounded Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🔵 ROUNDED</Badge>
            Rounded Variants - Visual Styling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 rounded variants from sharp corners to full circles for different content contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Rounded Corner Options:</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">None:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                    alt="No rounding"
                    aspectRatio="square"
                    rounded="none"
                    className="w-20 h-20"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                    alt="Small rounding"
                    aspectRatio="square"
                    rounded="sm"
                    className="w-20 h-20"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                    alt="Medium rounding"
                    aspectRatio="square"
                    rounded="md"
                    className="w-20 h-20"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                    alt="Large rounding"
                    aspectRatio="square"
                    rounded="lg"
                    className="w-20 h-20"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">XL:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
                    alt="XL rounding"
                    aspectRatio="square"
                    rounded="xl"
                    className="w-20 h-20"
                  />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Full:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face"
                    alt="Full circle"
                    aspectRatio="square"
                    rounded="full"
                    className="w-20 h-20"
                  />
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Visual Effects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">✨ EFFECTS</Badge>
            Visual Effects - Image Styling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Visual effects and styling options for different content contexts and emphasis
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Visual Effect Options:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Normal:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop"
                    alt="Normal campus"
                    aspectRatio="photo"
                    rounded="lg"
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Standard appearance</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Bordered:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=200&fit=crop"
                    alt="Bordered library"
                    aspectRatio="photo"
                    rounded="lg"
                    bordered
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">With border outline</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Grayscale:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop"
                    alt="Grayscale campus"
                    aspectRatio="photo"
                    rounded="lg"
                    grayscale
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Monochrome effect</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Blurred:</Text>
                  <Image
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=200&fit=crop"
                    alt="Blurred study"
                    aspectRatio="photo"
                    rounded="lg"
                    blur
                  />
                  <Text variant="body-xs" color="secondary" className="text-center">Blur effect</Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="gold">⏳ LOADING</Badge>
            Loading States - Progressive Enhancement
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Smooth loading experience with placeholders and fallback options
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Loading Placeholder Types:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Skeleton Placeholder:</Text>
                  <div className="w-full h-48 bg-gradient-to-r from-[var(--hive-background-tertiary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] animate-pulse rounded-lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Animated gradient shimmer</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Blur Placeholder:</Text>
                  <div className="w-full h-48 bg-[var(--hive-background-tertiary)] blur-sm rounded-lg" />
                  <Text variant="body-xs" color="secondary" className="text-center">Blurred background</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Error Fallback:</Text>
                  <div className="w-full h-48 bg-[var(--hive-background-tertiary)] rounded-lg flex items-center justify-center">
                    <div className="text-center text-[var(--hive-text-secondary)]">
                      <div className="w-8 h-8 mx-auto mb-2 bg-[var(--hive-text-muted)] rounded opacity-50" />
                      <p className="text-xs">Failed to load image</p>
                    </div>
                  </div>
                  <Text variant="body-xs" color="secondary" className="text-center">Error state display</Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎯 PRESETS</Badge>
            Image Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-configured image components for common University at Buffalo interface patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">ProfileImage Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="flex items-center gap-6">
                  <ProfileImage
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                    alt="Student profile"
                    className="w-16 h-16"
                  />
                  <ProfileImage
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                    alt="Faculty profile"
                    className="w-20 h-20"
                  />
                  <ProfileImage
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                    alt="Alumni profile"
                    className="w-24 h-24"
                  />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">ThumbnailImage Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  <ThumbnailImage
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop"
                    alt="Campus quad"
                  />
                  <ThumbnailImage
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop"
                    alt="Library study"
                  />
                  <ThumbnailImage
                    src="https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop"
                    alt="Campus building"
                  />
                  <ThumbnailImage
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=200&h=200&fit=crop"
                    alt="Student activities"
                  />
                  <ThumbnailImage
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop"
                    alt="Graduation ceremony"
                  />
                  <ThumbnailImage
                    src="https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=200&h=200&fit=crop"
                    alt="Research lab"
                  />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">HeroImage Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <HeroImage
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop"
                  alt="University at Buffalo campus panorama"
                  className="w-full"
                />

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Image Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Image usage in actual University at Buffalo academic and campus life contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Profile Display */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Profile Display:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="flex items-center gap-6">
                <ProfileImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                  alt="John Smith - Computer Science Student"
                  className="w-24 h-24"
                />
                <div className="space-y-2">
                  <Text as="h3" variant="heading-sm" color="primary">
                    John Smith
                  </Text>
                  <Text variant="body-sm" color="secondary">
                    Computer Science & Engineering • Class of 2025
                  </Text>
                  <Text variant="body-sm" color="gold">
                    Dean's List • Research Assistant
                  </Text>
                </div>
              </div>

            </div>
          </div>

          {/* Campus Event Gallery */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Event Gallery:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text as="h3" variant="heading-sm" color="primary">
                CS Department Career Fair 2024
              </Text>

              <HeroImage
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop"
                alt="CS Career Fair main event space"
              />

              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                <ThumbnailImage
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=200&fit=crop"
                  alt="Students networking"
                />
                <ThumbnailImage
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=200&fit=crop"
                  alt="Company booths"
                />
                <ThumbnailImage
                  src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=200&h=200&fit=crop"
                  alt="Resume reviews"
                />
                <ThumbnailImage
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?w=200&h=200&fit=crop"
                  alt="Tech demonstrations"
                />
                <ThumbnailImage
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=200&h=200&fit=crop"
                  alt="Student presentations"
                />
                <ThumbnailImage
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=200&fit=crop"
                  alt="Awards ceremony"
                />
              </div>

            </div>
          </div>

          {/* Course Materials */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Materials Display:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text as="h3" variant="heading-sm" color="primary">
                CSE 331 - Algorithm Analysis
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Lecture Materials:</Text>
                  <div className="space-y-3">
                    
                    <div className="flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=75&fit=crop"
                        alt="Algorithm complexity chart"
                        aspectRatio="photo"
                        rounded="sm"
                        className="w-16 h-12"
                      />
                      <div>
                        <Text variant="body-sm" color="primary" weight="medium">Big O Notation</Text>
                        <Text variant="body-xs" color="secondary">Complexity analysis fundamentals</Text>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=100&h=75&fit=crop"
                        alt="Graph algorithms"
                        aspectRatio="photo"
                        rounded="sm"
                        className="w-16 h-12"
                      />
                      <div>
                        <Text variant="body-sm" color="primary" weight="medium">Graph Algorithms</Text>
                        <Text variant="body-xs" color="secondary">BFS, DFS, shortest paths</Text>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="space-y-4">
                  <Text variant="body-sm" color="gold" weight="medium">Assignment Examples:</Text>
                  <div className="space-y-3">
                    
                    <div className="flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=100&h=75&fit=crop"
                        alt="Code implementation"
                        aspectRatio="photo"
                        rounded="sm"
                        className="w-16 h-12"
                      />
                      <div>
                        <Text variant="body-sm" color="primary" weight="medium">Dynamic Programming</Text>
                        <Text variant="body-xs" color="secondary">Assignment 3 solution</Text>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=75&fit=crop"
                        alt="Data structures"
                        aspectRatio="photo"
                        rounded="sm"
                        className="w-16 h-12"
                      />
                      <div>
                        <Text variant="body-sm" color="primary" weight="medium">Tree Structures</Text>
                        <Text variant="body-xs" color="secondary">Binary search trees</Text>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Faculty Directory */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Faculty Directory:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text as="h3" variant="heading-sm" color="primary">
                Computer Science & Engineering Faculty
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                {[
                  {
                    name: "Dr. Sarah Johnson",
                    title: "Professor & Department Chair",
                    specialties: "Machine Learning, AI Ethics",
                    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                  },
                  {
                    name: "Dr. Michael Chen",
                    title: "Associate Professor",
                    specialties: "Computer Graphics, Visualization",
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                  },
                  {
                    name: "Dr. Emily Rodriguez",
                    title: "Assistant Professor",
                    specialties: "Cybersecurity, Network Protocols",
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                  },
                  {
                    name: "Dr. David Kim",
                    title: "Professor",
                    specialties: "Software Engineering, HCI",
                    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
                  }
                ].map((faculty: any) => (
                  <div key={faculty.name} className="flex items-center gap-4 p-4 bg-[var(--hive-background-primary)] rounded-lg">
                    <ProfileImage
                      src={faculty.image}
                      alt={`${faculty.name} - ${faculty.title}`}
                      className="w-16 h-16"
                    />
                    <div className="space-y-1">
                      <Text variant="body-sm" color="primary" weight="medium">{faculty.name}</Text>
                      <Text variant="body-xs" color="secondary">{faculty.title}</Text>
                      <Text variant="body-xs" color="gold">{faculty.specialties}</Text>
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    alt: 'University at Buffalo campus',
    aspectRatio: 'photo',
    fit: 'cover',
    loading: 'lazy',
    placeholder: 'skeleton',
    rounded: 'lg',
    bordered: false,
    grayscale: false,
    blur: false,
    priority: false,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Image Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different image configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="w-80 mx-auto">
              <Image {...args} />
            </div>
            <Text variant="body-sm" color="secondary" className="text-center">
              Interactive image testing for University at Buffalo content display
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};