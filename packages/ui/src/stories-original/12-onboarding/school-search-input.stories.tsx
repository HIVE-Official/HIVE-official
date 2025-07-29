import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { action } from "@storybook/addon-actions";

import { SchoolSearchInput } from "../../components/welcome/school-search-input";

const meta: Meta<typeof SchoolSearchInput> = {
  title: "12. Onboarding/School Search Input",
  component: SchoolSearchInput,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "hive-dark",
      values: [{ name: "hive-dark", value: "var(--hive-background-primary)" }],
    },
    docs: {
      description: {
        component: `
# HIVE School Search Input

A searchable input component for university selection during onboarding. Features:

## Key Features
- **University Search**: Searchable dropdown with university database
- **Real-time Filtering**: Instant search results as user types
- **Campus Verification**: Mock integration for .edu domain verification
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Future-Ready**: Prepared for Firestore integration

## Mock Data
Currently includes major NY state universities:
- University at Buffalo
- Stony Brook University  
- Binghamton University
- University at Albany
- Cornell University
- NYU, Columbia, Syracuse

## Implementation Notes
- Uses mock data for development
- Ready for Firestore integration (T1-S1A-D2-03)
- Supports keyboard navigation
- Includes search icon and placeholder text
        `
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    onSchoolSelect: {
      action: "selected",
      description: "Callback function when a school is selected from the list.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for styling"
    },
  },
};

export default meta;
type Story = StoryObj<typeof SchoolSearchInput>;

export const Default: Story = {
  args: {
    onSchoolSelect: action("school-selected")
  },
  render: (args) => (
    <div style={{ width: "384px" }}>
      <SchoolSearchInput {...args} />
    </div>
  ),
};

export const EmptyState: Story = {
  args: {
    onSchoolSelect: action("empty-search")
  },
  render: (args) => (
    <div style={{ width: "384px" }}>
      <SchoolSearchInput {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText(
      "Search for your university..."
    );
    await userEvent.type(input, "NonExistent University", { delay: 50 });
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the empty state when no schools match the search query.'
      }
    }
  }
};

export const BuffaloSearch: Story = {
  args: {
    onSchoolSelect: action("buffalo-selected")
  },
  render: (args) => (
    <div style={{ width: "384px" }}>
      <SchoolSearchInput {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText(
      "Search for your university..."
    );
    await userEvent.type(input, "Buffalo", { delay: 100 });
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows search results for "Buffalo" showing University at Buffalo.'
      }
    }
  }
};

export const CornellSearch: Story = {
  args: {
    onSchoolSelect: action("cornell-selected")
  },
  render: (args) => (
    <div style={{ width: "384px" }}>
      <SchoolSearchInput {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText(
      "Search for your university..."
    );
    await userEvent.type(input, "Cornell", { delay: 100 });
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates search for Cornell University, a private institution.'
      }
    }
  }
};

export const InOnboardingContext: Story = {
  args: {
    onSchoolSelect: action("onboarding-school-selected")
  },
  render: (args) => (
    <div className="space-y-6 p-8 bg-[var(--hive-background-primary)] rounded-xl max-w-md">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
          Select Your University
        </h2>
        <p className="text-[var(--hive-text-muted)]">
          Help us connect you with your campus community
        </p>
      </div>
      <SchoolSearchInput {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'School search integrated into an onboarding step context with proper spacing and labels.'
      }
    }
  }
};

export const SUNYSchoolsShowcase: Story = {
  args: {
    onSchoolSelect: action("suny-school-selected")
  },
  render: (args) => (
    <div className="space-y-6 p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl max-w-lg">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
          SUNY System Universities
        </h2>
        <p className="text-[var(--hive-text-muted)]">
          Search for your SUNY campus to get started
        </p>
      </div>
      <SchoolSearchInput {...args} />
      <div className="text-xs text-[var(--hive-text-muted)] text-center">
        Try searching: "Buffalo", "Stony Brook", "Binghamton", or "Albany"
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcases the component in context of SUNY system university selection with helpful hints.'
      }
    }
  }
};

export const MobileResponsive: Story = {
  args: {
    onSchoolSelect: action("mobile-school-selected")
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile-responsive view of the school search input optimized for touch interaction.'
      }
    }
  },
  render: (args) => (
    <div className="p-4 space-y-4 w-full">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
          Find Your School
        </h3>
        <p className="text-sm text-[var(--hive-text-muted)]">
          Mobile-optimized search experience
        </p>
      </div>
      <SchoolSearchInput {...args} />
    </div>
  )
};
