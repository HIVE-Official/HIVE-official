import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CampusSpacesCard.test } from '../../atomic/molecules/campus-spaces-card.test';

/**
 * # CampusSpacesCard.test - Social Media + Utility Platform
 * 
 * The CampusSpacesCard.test molecule combines multiple social and utility atoms to create focused campus interactions. It bridges social media engagement with academic productivity in meaningful ways.
 * 
 * ## Social Media Features
 * - Campus event discovery
- Club and organization networking
 * 
 * ## Utility Features  
 * - Campus navigation and maps
- Dining and facility information
 * 
 * ## Campus Integration
 * Designed for molecule level interactions that blend social engagement
 * with academic utility, making campus life more connected and productive.
 */

// TODO: Replace with actual component implementation
const MockCampusSpacesCard.test: React.FC<any> = (props) => (
  <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
    <h3 className="font-semibold text-[var(--hive-text-primary)]">CampusSpacesCard.test</h3>
    <p className="text-sm text-[var(--hive-text-secondary)]">
      Social media + utility molecule component
    </p>
  </div>
);

const meta: Meta<typeof MockCampusSpacesCard.test> = {
  title: '02-Molecules/CampusSpacesCard.test',
  component: MockCampusSpacesCard.test,
  parameters: {
    docs: {
      description: {
        component: `
# CampusSpacesCard.test - Campus Social + Utility


This molecule component exemplifies HIVE's social media + utility platform approach:

## Social Media Integration
- Campus event discovery
- Club and organization networking
- Roommate and friend finding
- Campus community engagement

## Campus Utility Features
- Campus navigation and maps
- Dining and facility information
- Event scheduling and reminders
- Campus resource access

## Student Engagement Patterns
- Event attendance and networking
- Campus community participation
- Resource sharing and recommendations
- Location-based social connections

The CampusSpacesCard.test ensures every interaction serves both social connection and academic success.
        `
      }
    },
    layout: 'padded'
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[200px] ">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Social media context
export const Default: Story = {
  args: {}
};

// 2. PLAYGROUND STORY - Interactive social/utility controls
export const Playground: Story = {
  args: {}
};

// 3. SOCIAL MEDIA STORY - Community engagement focus
export const SocialMedia: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social Media Platform Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Community engagement and social proof elements
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Discovering campus events</h3>
          <MockDiscoveringComponent />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Finding study spaces</h3>
          <MockFindingComponent />
        </div>
      </div>
    </div>
  )
};

// 4. UTILITY FEATURES STORY - Academic productivity focus  
export const UtilityFeatures: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Academic Utility Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Productivity tools and campus life optimization
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <MockCampusSpacesCard.test />
      </div>
    </div>
  )
};

// 5. CAMPUS SCENARIOS STORY - Real student usage
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How students use this component in real campus situations
        </p>
      </div>
      
      <div className="space-y-4">
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Discovering campus events</h3>
          <MockCampusSpacesCard.test />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Finding study spaces</h3>
          <MockCampusSpacesCard.test />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Connecting with organizations</h3>
          <MockCampusSpacesCard.test />
        </div>
      </div>
    </div>
  )
};

// 6. RESPONSIVE STORY - Mobile social engagement
export const Responsive: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Mobile-First Social Design
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Optimized for 80% mobile campus usage patterns
        </p>
      </div>
      
      <MockCampusSpacesCard.test />
    </div>
  )
};

// 7. ACCESSIBILITY STORY - Inclusive campus community
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessible Campus Community
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          WCAG 2.1 AA compliant social and utility features
        </p>
      </div>
      
      <MockCampusSpacesCard.test />
    </div>
  )
};

// 8. MOTION STORY - HIVE liquid metal social interactions
export const Motion: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social Interaction Motion
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          HIVE liquid metal animations for social engagement
        </p>
      </div>
      
      <MockCampusSpacesCard.test />
    </div>
  )
};