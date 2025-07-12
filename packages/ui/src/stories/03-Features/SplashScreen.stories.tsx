/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { SplashScreen } from '../../components/auth/splash-screen';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SplashScreen> = {
  title: 'Auth/SplashScreen',
  component: SplashScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Screen 0: Splash/Teaser** - Brand ignition with tap requirement

According to the HIVE vBETA Authentication spec:
- Full-bleed #0A0A0A background  
- Center "Get Inside" button (56px height, pill shape, gold border 2px)
- Small crest watermark 8% opacity bottom-right
- Hover → gold glow effect
- Click → screen fades to black 120ms then continues

**Copy**: 
- Button: "Get Inside"
- Footer: "Built by Students · Owned by Students."

**Motion**: Follows HIVE brand standards with 350ms cubic-bezier transitions.
        `,
      },
    },
  },
  argTypes: {
    onContinue: {
      description: 'Callback when user clicks "Get Inside" button',
      action: 'continue',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onContinue: action('continue-clicked'),
  },
};

export const InteractionDemo: Story = {
  args: {
    onContinue: action('continue-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Hover over the "Get Inside" button to see the gold glow effect. Click to see the fade-to-black transition.',
      },
    },
  },
};

export const BrandValidation: Story = {
  args: {
    onContinue: action('continue-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: `
**Brand Compliance Check:**
- ✅ Matte black background (#0A0A0A)
- ✅ Gold accent (#FFD700) for button and crest
- ✅ Space Grotesk font for button text
- ✅ Geist Sans for footer text
- ✅ 8dp grid spacing system
- ✅ Subtle grain texture
- ✅ No unauthorized colors
        `,
      },
    },
  },
}; 