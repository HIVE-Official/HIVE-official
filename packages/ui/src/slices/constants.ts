/**
 * Consolidated slice constants
 */

// Basic onboarding steps
export const ONBOARDING_STEPS = [
  { id: 'welcome', title: 'Welcome', order: 0 },
  { id: 'name', title: 'Name', order: 1 },
  { id: 'handle', title: 'Handle', order: 2 },
  { id: 'academics', title: 'Academics', order: 3 },
  { id: 'legal', title: 'Legal', order: 4 }
];

// Basic magic link config
export const MAGIC_LINK_CONFIG = {
  LINK_EXPIRY: 15,
  TOKEN_EXPIRY: 60 * 24,
  MAX_REQUESTS_PER_HOUR: 5
};

// Slice metadata
export const SLICE_METADATA = {
  version: '1.0.0',
  lastUpdated: new Date().toISOString()
};