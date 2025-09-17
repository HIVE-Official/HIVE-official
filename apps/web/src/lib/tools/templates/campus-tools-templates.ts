// Campus-specific tool templates for UB Buffalo
export interface CampusToolTemplate {
  id: string;
  name: string;
  description: string;
  category: 'academic' | 'social' | 'events' | 'services' | 'productivity';
  viralPotential: 'low' | 'medium' | 'high' | 'very-high';
  ubSpecific: boolean;
  features: string[];
  requiredData?: string[];
  socialFeatures?: string[];
}

export const CAMPUS_TOOL_TEMPLATES: CampusToolTemplate[] = [
  {
    id: 'study-group-coordinator',
    name: 'Study Group Coordinator',
    description: 'Organize study sessions with smart scheduling and resource sharing',
    category: 'academic',
    viralPotential: 'very-high',
    ubSpecific: true,
    features: [
      'Auto-scheduling based on class schedules',
      'Resource sharing and note collaboration',
      'Progress tracking and goal setting',
      'Location booking (library rooms)'
    ],
    requiredData: ['course_schedule', 'available_times'],
    socialFeatures: ['invite_classmates', 'share_notes', 'group_chat']
  },
  {
    id: 'laundry-tracker',
    name: 'Laundry Tracker',
    description: 'Never forget your laundry with machine availability and timers',
    category: 'services',
    viralPotential: 'high',
    ubSpecific: true,
    features: [
      'Real-time machine availability',
      'Push notification timers',
      'Building-specific laundry maps',
      'Peak time predictions'
    ],
    requiredData: ['dorm_building', 'notification_preferences'],
    socialFeatures: ['share_availability', 'buddy_system']
  },
  {
    id: 'ride-share-hub',
    name: 'Ride Share Hub',
    description: 'Coordinate rides home with fellow students safely',
    category: 'services',
    viralPotential: 'very-high',
    ubSpecific: false,
    features: [
      'Route matching algorithm',
      'Cost splitting calculator',
      'Safety verification system',
      'Schedule coordination'
    ],
    requiredData: ['home_location', 'travel_dates', 'verification_status'],
    socialFeatures: ['rider_profiles', 'group_rides', 'reviews']
  },
  {
    id: 'meal-swap-coordinator',
    name: 'Meal Swap Coordinator',
    description: 'Trade dining hall swipes efficiently with dietary matching',
    category: 'services',
    viralPotential: 'medium',
    ubSpecific: true,
    features: [
      'Meal plan tracking',
      'Fair trade algorithm',
      'Dietary preference matching',
      'Dining hall schedules'
    ],
    requiredData: ['meal_plan_type', 'dietary_preferences'],
    socialFeatures: ['swap_requests', 'trusted_network']
  }
];

// Get templates with highest viral potential
export function getViralTemplates(limit: number = 3): CampusToolTemplate[] {
  return CAMPUS_TOOL_TEMPLATES
    .filter(t => t.viralPotential === 'very-high' || t.viralPotential === 'high')
    .slice(0, limit);
}

// Get UB-specific templates
export function getUBSpecificTemplates(): CampusToolTemplate[] {
  return CAMPUS_TOOL_TEMPLATES.filter(t => t.ubSpecific);
}

// Get templates by category
export function getTemplatesByCategory(category: string): CampusToolTemplate[] {
  return CAMPUS_TOOL_TEMPLATES.filter(t => t.category === category);
}
