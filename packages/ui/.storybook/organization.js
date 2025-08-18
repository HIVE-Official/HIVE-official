// HIVE Storybook Organization Configuration
// This file manages which components are featured vs hidden in Storybook

export const STORYBOOK_ORGANIZATION = {
  // PRIMARY COMPONENTS - Featured in main navigation
  featured: {
    'HIVE Components': [
      '../src/components/hive-*.stories.@(js|jsx|ts|tsx)',
      '../src/stories/04-hive/*.stories.@(js|jsx|ts|tsx)'
    ],
    'Specialized Features': [
      '../src/stories/07-spaces/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories/11-shell/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories/10-creator/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories/profile/*.stories.@(js|jsx|ts|tsx)'
    ],
    'Foundation': [
      '../src/stories/00-overview/*.stories.@(js|jsx|ts|tsx)',
      '../src/stories/01-foundation/*.stories.@(js|jsx|ts|tsx)'
    ]
  },

  // HIDDEN COMPONENTS - Available but not in main nav
  hidden: [
    // Atomic system duplicates
    '../src/components/atomic/**/*.stories.*',
    '../src/stories/02-atoms/**/*.stories.*',
    
    // shadcn/ui base components  
    '../src/components/ui/**/*.stories.*',
    '../src/stories/03-ui/*.stories.*',
    
    // Legacy duplicates
    '../src/components/legacy/**/*.stories.*',
    
    // Experimental components
    '../src/components/experimental/**/*.stories.*',
    
    // Edge cases (keep but de-emphasize)
    '../src/stories/99-edge-cases/*.stories.*'
  ],

  // DEPRECATED - Available via direct URL only
  deprecated: [
    // Add specific deprecated component patterns here
  ]
};

// Export patterns for main.js configuration
export const getStorybookIncludes = () => [
  ...STORYBOOK_ORGANIZATION.featured['HIVE Components'],
  ...STORYBOOK_ORGANIZATION.featured['Specialized Features'], 
  ...STORYBOOK_ORGANIZATION.featured['Foundation']
];

export const getStorybookExcludes = () => [
  ...STORYBOOK_ORGANIZATION.hidden,
  ...STORYBOOK_ORGANIZATION.deprecated
];