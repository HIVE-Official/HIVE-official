import type { Meta, StoryObj } from "@storybook/react";
import { PhotoCarousel } from "../../atomic/molecules/photo-carousel";

/**
 * # PhotoCarousel
 *
 * Molecule component for displaying swipeable photo galleries in profiles.
 * Tinder-style carousel with dot indicators and photo counter.
 *
 * ## HIVE Profile Photos
 * - Max 5 photos per profile (spec requirement)
 * - Swipeable with touch/mouse drag
 * - Dot indicators for current position
 * - Photo counter overlay
 * - Loop navigation
 *
 * ## Features
 * - **Aspect Ratios**: Square, portrait (4:5 Tinder-style), or wide
 * - **Dot Indicators**: Tinder-style horizontal dots at top
 * - **Photo Counter**: Bottom-right overlay showing "2 / 5"
 * - **Auto-loop**: Carousel loops infinitely
 * - **Touch-friendly**: Swipe gestures on mobile
 *
 * ## Usage
 * ```tsx
 * <PhotoCarousel
 *   photos={[
 *     "https://example.com/photo1.jpg",
 *     "https://example.com/photo2.jpg",
 *     "https://example.com/photo3.jpg",
 *   ]}
 *   aspectRatio="portrait"
 * />
 * ```
 */
const meta = {
  title: "02-Profile/PhotoCarousel",
  component: PhotoCarousel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PhotoCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default portrait carousel (Tinder-style 4:5 ratio)
 */
export const Default: Story = {
  args: {
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    ],
    aspectRatio: "portrait",
  },
};

/**
 * Full 5-photo gallery (max allowed)
 */
export const FivePhotos: Story = {
  args: {
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop",
    ],
    aspectRatio: "portrait",
  },
};

/**
 * Single photo (no indicators shown)
 */
export const SinglePhoto: Story = {
  args: {
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    ],
    aspectRatio: "portrait",
  },
};

/**
 * Two photos
 */
export const TwoPhotos: Story = {
  args: {
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    ],
    aspectRatio: "portrait",
  },
};

/**
 * Square aspect ratio
 */
export const SquareAspectRatio: Story = {
  args: {
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    ],
    aspectRatio: "square",
  },
};

/**
 * Wide aspect ratio
 */
export const WideAspectRatio: Story = {
  args: {
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=450&fit=crop",
    ],
    aspectRatio: "wide",
  },
};

/**
 * Campus photos (activities and events)
 */
export const CampusPhotos: Story = {
  args: {
    photos: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=500&fit=crop", // Library
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=500&fit=crop", // Graduation
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=500&fit=crop", // Study group
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=500&fit=crop", // Cafe
    ],
    aspectRatio: "portrait",
  },
};

/**
 * Profile page integration example
 */
export const ProfileIntegration: Story = {
  render: () => (
    <div className="max-w-md mx-auto space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Sarah's Photos</h3>
        <p className="text-sm text-muted-foreground mb-4">5 photos</p>
      </div>

      <PhotoCarousel
        photos={[
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=500&fit=crop",
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=500&fit=crop",
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=500&fit=crop",
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=500&fit=crop",
        ]}
        aspectRatio="portrait"
      />

      <div className="text-xs text-muted-foreground text-center">
        Swipe or use arrow keys to navigate
      </div>
    </div>
  ),
};

/**
 * Empty state (no photos)
 */
export const EmptyState: Story = {
  render: () => (
    <div className="max-w-md mx-auto">
      <div className="aspect-[4/5] rounded-2xl border-2 border-dashed border-border bg-muted/20 flex flex-col items-center justify-center p-8 text-center">
        <svg
          className="h-16 w-16 text-muted-foreground/50 mb-4"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <p className="text-sm font-medium text-foreground mb-1">No photos yet</p>
        <p className="text-xs text-muted-foreground">Add up to 5 photos to your profile</p>
      </div>
    </div>
  ),
};

/**
 * Comparison: Different aspect ratios
 */
export const AspectRatioComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Portrait (4:5 - Tinder-style)</h3>
        <div className="max-w-md">
          <PhotoCarousel
            photos={[
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
            ]}
            aspectRatio="portrait"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Square (1:1)</h3>
        <div className="max-w-md">
          <PhotoCarousel
            photos={[
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            ]}
            aspectRatio="square"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Wide (16:9)</h3>
        <div className="max-w-2xl">
          <PhotoCarousel
            photos={[
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=450&fit=crop",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
            ]}
            aspectRatio="wide"
          />
        </div>
      </div>
    </div>
  ),
};
