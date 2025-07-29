/**
 * Social-First Navigation Demo
 *
 * Demonstrates HIVE's feed-centric navigation structure optimized for:
 * - Social consumption (feed as gravity well)
 * - Short URLs for GroupMe sharing (/s/cs-majors, /u/sarah)
 * - Mobile-first with bottom tabs
 * - Space discovery with social proof
 */
import type { Meta, StoryObj } from '@storybook/react';
import { HiveNavigationShell } from '../../components/navigation';
declare const meta: Meta<typeof HiveNavigationShell>;
export default meta;
type Story = StoryObj<typeof HiveNavigationShell>;
export declare const SocialFirstDesktop: Story;
export declare const MobileFeedFirst: Story;
export declare const SpaceDiscoveryWithSocialProof: Story;
export declare const ProfileCommandCenter: Story;
//# sourceMappingURL=navigation-social-first.stories.d.ts.map