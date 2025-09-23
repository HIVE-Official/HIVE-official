import { type Ritual } from '@/lib/rituals-framework';

/**
 * Pre-built Ritual Templates
 * 
 * These are the core rituals that create HIVE's unique campus culture.
 * Each ritual is designed to feel organic and meaningful, not gamified.
 */

/**
 * First Light - Week 1 Onboarding Ritual
 * 
 * Philosophy: The first moment students break out of lurking and contribute
 * to their campus community. A gentle, welcoming first step.
 */
export const firstLightRitual: Omit<Ritual, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'createdBy'> = {
  name: 'first_light',
  title: 'First Light',
  description: 'Break the ice and make your first contribution to campus life. Share something meaningful with your community.',
  tagline: 'Your first spark in the campus constellation ✨',
  
  type: 'onboarding',
  category: 'welcome',
  tags: ['onboarding', 'first-post', 'community', 'welcome'],
  
  status: 'draft',
  startTime: new Date(), // Set dynamically
  duration: 7 * 24 * 60, // 7 days
  timezone: 'America/New_York',
  
  universities: [], // Set per campus
  isGlobal: false,
  
  participationType: 'individual',
  requiresInvitation: false,
  
  prerequisites: {
    accountAge: 0, // New users
    minSpaceMemberships: 1, // Must join at least one space
  },
  
  actions: [
    {
      id: 'join_first_space',
      type: 'join_space',
      name: 'Join Your First Space',
      description: 'Find a space that resonates with you and join the community',
      isRequired: true,
      weight: 30,
      maxOccurrences: 1,
      validationRules: {}
    },
    {
      id: 'make_first_post',
      type: 'post',
      name: 'Share Your First Thought',
      description: 'Post something genuine - an introduction, question, or observation about campus life',
      isRequired: true,
      weight: 50,
      maxOccurrences: 1,
      validationRules: {
        minLength: 20,
        bannedWords: ['test', 'testing', 'hello world']
      }
    },
    {
      id: 'interact_with_community',
      type: 'interact',
      name: 'Connect with Others',
      description: 'Like, comment, or engage with other students\' posts',
      isRequired: true,
      weight: 20,
      maxOccurrences: 3,
      validationRules: {}
    }
  ],
  
  milestones: [
    {
      id: 'early_adopters',
      name: 'Early Adopters',
      description: 'First 10% of eligible students participate',
      participantThreshold: 50, // Adjust per campus size
      progressThreshold: 10,
      unlocks: ['community_badge'],
      celebration: {
        message: 'The early sparks are lighting up! 🌟',
        badgeAwarded: 'early_light'
      },
      isReached: false
    },
    {
      id: 'community_ignition',
      name: 'Community Ignition',
      description: 'Critical mass of participation achieved',
      participantThreshold: 200,
      progressThreshold: 30,
      unlocks: ['campus_bulletin_board'],
      celebration: {
        message: 'Your campus is coming alive! The conversation has begun! 🔥',
        animation: 'campus_glow'
      },
      isReached: false
    }
  ],
  
  rewards: [
    {
      id: 'first_light_badge',
      type: 'badge',
      name: 'First Light',
      description: 'You were among the first to share your voice on campus',
      requiresCompletion: true,
      minimumParticipation: 100,
      rarity: 'uncommon',
      isTimeLimited: true,
      unlockScope: 'user'
    },
    {
      id: 'campus_contributor',
      type: 'recognition',
      name: 'Campus Contributor',
      description: 'Recognized as one of the founding voices of your campus community',
      requiresCompletion: true,
      minimumParticipation: 100,
      rarity: 'rare',
      isTimeLimited: false,
      unlockScope: 'user'
    }
  ],
  
  featureUnlocks: [
    {
      id: 'advanced_posting',
      featureId: 'rich_text_posting',
      name: 'Rich Text Posting',
      description: 'Unlock advanced formatting, mentions, and media in your posts',
      participationThreshold: 20,
      scope: 'campus',
      isReversible: false,
      unlockDelay: 60, // 1 hour after threshold
      announceDelay: 30 // 30 minutes before announcing
    }
  ],
  
  metrics: {
    participationRate: 0,
    completionRate: 0,
    engagementScore: 0,
    socialImpact: 0
  }
};

/**
 * Orientation Q&A - Weeks 1-2 Ritual
 * 
 * Philosophy: Help new students ask questions and get answers from
 * upperclassmen. Creates natural mentorship connections.
 */
export const orientationQARitual: Omit<Ritual, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'createdBy'> = {
  name: 'orientation_qa',
  title: 'Orientation Q&A',
  description: 'Ask questions, share answers, and build the campus knowledge base together',
  tagline: 'Every question matters, every answer helps 🤝',
  
  type: 'onboarding',
  category: 'knowledge_sharing',
  tags: ['orientation', 'questions', 'mentorship', 'knowledge'],
  
  status: 'draft',
  startTime: new Date(),
  duration: 14 * 24 * 60, // 2 weeks
  timezone: 'America/New_York',
  
  universities: [],
  isGlobal: false,
  
  participationType: 'collaborative',
  requiresInvitation: false,
  
  prerequisites: {
    accountAge: 0,
    minSpaceMemberships: 1,
  },
  
  actions: [
    {
      id: 'ask_question',
      type: 'post',
      name: 'Ask a Question',
      description: 'Post a genuine question about campus life, academics, or student experiences',
      isRequired: false,
      weight: 40,
      maxOccurrences: 5,
      validationRules: {
        minLength: 10,
        mustMentionUsers: false
      }
    },
    {
      id: 'answer_question',
      type: 'comment',
      name: 'Share an Answer',
      description: 'Help a fellow student by answering their question',
      isRequired: false,
      weight: 60,
      maxOccurrences: 10,
      validationRules: {
        minLength: 20
      }
    },
    {
      id: 'upvote_helpful',
      type: 'vote',
      name: 'Recognize Helpful Answers',
      description: 'Upvote answers that were helpful to you or others',
      isRequired: false,
      weight: 10,
      maxOccurrences: 20,
      validationRules: {}
    }
  ],
  
  milestones: [
    {
      id: 'knowledge_base_started',
      name: 'Knowledge Base Started',
      description: '50 questions and answers shared',
      participantThreshold: 100,
      progressThreshold: 15,
      unlocks: ['qa_leaderboard'],
      celebration: {
        message: 'The campus knowledge base is growing! 📚',
      },
      isReached: false
    },
    {
      id: 'mentorship_network',
      name: 'Mentorship Network',
      description: 'Strong Q&A participation creates natural mentorship connections',
      participantThreshold: 250,
      progressThreshold: 40,
      unlocks: ['mentor_matching'],
      celebration: {
        message: 'Mentorship connections are forming naturally! 🌱',
        animation: 'network_growth'
      },
      isReached: false
    }
  ],
  
  rewards: [
    {
      id: 'helpful_mentor',
      type: 'badge',
      name: 'Helpful Mentor',
      description: 'Your answers helped fellow students navigate campus life',
      requiresCompletion: false,
      minimumParticipation: 50,
      rarity: 'rare',
      isTimeLimited: false,
      unlockScope: 'user'
    },
    {
      id: 'knowledge_contributor',
      type: 'recognition',
      name: 'Knowledge Contributor',
      description: 'Helped build the foundation of campus knowledge sharing',
      requiresCompletion: false,
      minimumParticipation: 70,
      rarity: 'epic',
      isTimeLimited: true,
      unlockScope: 'user'
    }
  ],
  
  featureUnlocks: [
    {
      id: 'qa_tools',
      featureId: 'question_answer_tools',
      name: 'Q&A Tools',
      description: 'Special formatting and organization tools for questions and answers',
      participationThreshold: 25,
      scope: 'campus',
      isReversible: false
    }
  ],
  
  metrics: {
    participationRate: 0,
    completionRate: 0,
    engagementScore: 0,
    socialImpact: 0
  }
};

/**
 * Torch Pass - Week 2 Viral Invitation Ritual
 * 
 * Philosophy: Exclusive invitation system that creates FOMO while building
 * social connections. Students can invite friends to join HIVE.
 */
export const torchPassRitual: Omit<Ritual, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'createdBy'> = {
  name: 'torch_pass',
  title: 'Torch Pass',
  description: 'Share the HIVE experience with friends through exclusive invitations',
  tagline: 'Pass the torch, grow the community 🔥',
  
  type: 'community',
  category: 'viral_growth',
  tags: ['invitations', 'social', 'exclusive', 'growth'],
  
  status: 'draft',
  startTime: new Date(),
  duration: 7 * 24 * 60, // 1 week
  timezone: 'America/New_York',
  
  universities: [],
  isGlobal: false,
  
  participationType: 'social',
  requiresInvitation: false,
  
  prerequisites: {
    accountAge: 7, // Must be on platform for 1 week
    completedRituals: ['first_light'], // Must complete First Light
    minSpaceMemberships: 2,
  },
  
  actions: [
    {
      id: 'send_invitation',
      type: 'share',
      name: 'Send Torch Invitation',
      description: 'Invite a friend to join HIVE with a personalized message',
      isRequired: true,
      weight: 50,
      maxOccurrences: 3, // Limited invitations create exclusivity
      validationRules: {
        minLength: 30, // Must write personal message
        requiresMedia: false
      }
    },
    {
      id: 'friend_joins',
      type: 'interact',
      name: 'Friend Accepts Invitation',
      description: 'Someone you invited successfully joins and completes onboarding',
      isRequired: false,
      weight: 50,
      maxOccurrences: 3,
      validationRules: {}
    }
  ],
  
  milestones: [
    {
      id: 'viral_ignition',
      name: 'Viral Ignition',
      description: 'Invitation acceptance rate hits 60%',
      participantThreshold: 100,
      progressThreshold: 20,
      unlocks: ['invitation_boost'],
      celebration: {
        message: 'The torch is spreading rapidly! 🔥',
        animation: 'viral_spread'
      },
      isReached: false
    }
  ],
  
  rewards: [
    {
      id: 'torch_bearer',
      type: 'badge',
      name: 'Torch Bearer',
      description: 'You helped grow the HIVE community',
      requiresCompletion: true,
      minimumParticipation: 100,
      rarity: 'rare',
      isTimeLimited: true,
      unlockScope: 'user'
    }
  ],
  
  featureUnlocks: [
    {
      id: 'advanced_invitations',
      featureId: 'invitation_customization',
      name: 'Custom Invitations',
      description: 'Create personalized invitation experiences',
      participationThreshold: 30,
      scope: 'campus',
      isReversible: false
    }
  ],
  
  metrics: {
    participationRate: 0,
    completionRate: 0,
    engagementScore: 0,
    socialImpact: 0
  }
};

/**
 * Space Wars - Monthly Competitive Ritual
 * 
 * Philosophy: Friendly competition between spaces that builds community
 * pride and cross-space interaction. Not zero-sum - everyone can win.
 */
export const spaceWarsRitual: Omit<Ritual, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'createdBy'> = {
  name: 'space_wars',
  title: 'Space Wars',
  description: 'Monthly celebration of space creativity, engagement, and community building',
  tagline: 'May the best community spirit win! ⚔️',
  
  type: 'community',
  category: 'monthly_event',
  tags: ['competition', 'spaces', 'community', 'monthly'],
  
  status: 'draft',
  startTime: new Date(),
  duration: 30 * 24 * 60, // 1 month
  timezone: 'America/New_York',
  
  universities: [],
  isGlobal: false,
  
  participationType: 'competitive',
  requiresInvitation: false,
  
  prerequisites: {
    minSpaceMemberships: 1,
    accountAge: 14, // 2 weeks minimum
  },
  
  actions: [
    {
      id: 'create_space_content',
      type: 'post',
      name: 'Create Space Content',
      description: 'Post engaging content in your space',
      isRequired: false,
      weight: 30,
      maxOccurrences: 20,
      validationRules: {
        minLength: 50,
        requiresMedia: false
      }
    },
    {
      id: 'cross_space_interaction',
      type: 'interact',
      name: 'Cross-Space Interaction',
      description: 'Engage positively with posts from other spaces',
      isRequired: false,
      weight: 40,
      maxOccurrences: 50,
      validationRules: {}
    },
    {
      id: 'create_collaborative_tool',
      type: 'create_tool',
      name: 'Build Space Tools',
      description: 'Create or contribute to tools that benefit your space',
      isRequired: false,
      weight: 30,
      maxOccurrences: 5,
      validationRules: {}
    }
  ],
  
  milestones: [
    {
      id: 'healthy_competition',
      name: 'Healthy Competition',
      description: 'All major spaces have active participation',
      participantThreshold: 500,
      progressThreshold: 40,
      unlocks: ['space_showcase'],
      celebration: {
        message: 'All spaces are thriving! This is what healthy competition looks like! 🏆',
        animation: 'space_celebration'
      },
      isReached: false
    }
  ],
  
  rewards: [
    {
      id: 'space_champion',
      type: 'recognition',
      name: 'Space Champion',
      description: 'Recognized as a driving force in your space community',
      requiresCompletion: false,
      minimumParticipation: 75,
      rarity: 'epic',
      isTimeLimited: false,
      unlockScope: 'space'
    },
    {
      id: 'community_builder',
      type: 'badge',
      name: 'Community Builder',
      description: 'You helped make your space a vibrant community',
      requiresCompletion: false,
      minimumParticipation: 60,
      rarity: 'rare',
      isTimeLimited: false,
      unlockScope: 'user'
    }
  ],
  
  featureUnlocks: [
    {
      id: 'space_customization',
      featureId: 'advanced_space_features',
      name: 'Advanced Space Features',
      description: 'Custom themes, banners, and enhanced moderation tools',
      participationThreshold: 50,
      scope: 'campus',
      isReversible: false
    }
  ],
  
  metrics: {
    participationRate: 0,
    completionRate: 0,
    engagementScore: 0,
    socialImpact: 0
  }
};

/**
 * Emergency Ritual Template - For spontaneous campus moments
 * 
 * Philosophy: When something significant happens on campus (good or bad),
 * HIVE can quickly deploy a ritual to channel community response.
 */
export const emergencyRitualTemplate: Omit<Ritual, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'createdBy'> = {
  name: 'emergency_template',
  title: 'Campus Moment',
  description: 'A space for the community to come together during significant campus events',
  tagline: 'Together in this moment 🤝',
  
  type: 'emergency',
  category: 'responsive',
  tags: ['emergency', 'community', 'support', 'responsive'],
  
  status: 'draft',
  startTime: new Date(),
  duration: 3 * 24 * 60, // 3 days - short duration for immediate response
  timezone: 'America/New_York',
  
  universities: [],
  isGlobal: false,
  
  participationType: 'collective',
  requiresInvitation: false,
  
  prerequisites: {
    accountAge: 1, // Very low barrier
  },
  
  actions: [
    {
      id: 'share_support',
      type: 'post',
      name: 'Share Support',
      description: 'Share words of support, encouragement, or community solidarity',
      isRequired: false,
      weight: 50,
      maxOccurrences: 3,
      validationRules: {
        minLength: 10,
        bannedWords: ['hate', 'divisive', 'political'] // Context-dependent
      }
    },
    {
      id: 'amplify_positivity',
      type: 'interact',
      name: 'Amplify Positivity',
      description: 'Engage with and amplify positive, supportive messages',
      isRequired: false,
      weight: 30,
      maxOccurrences: 10,
      validationRules: {}
    },
    {
      id: 'offer_help',
      type: 'post',
      name: 'Offer Help',
      description: 'Offer practical help, resources, or support to fellow students',
      isRequired: false,
      weight: 20,
      maxOccurrences: 2,
      validationRules: {
        minLength: 20
      }
    }
  ],
  
  milestones: [
    {
      id: 'community_unity',
      name: 'Community Unity',
      description: 'Campus comes together in support',
      participantThreshold: 200,
      progressThreshold: 30,
      unlocks: ['unity_badge'],
      celebration: {
        message: 'In difficult times, our community shows its true strength 💙',
        badgeAwarded: 'unity_badge'
      },
      isReached: false
    }
  ],
  
  rewards: [
    {
      id: 'community_support',
      type: 'recognition',
      name: 'Community Support',
      description: 'You were there when your community needed support',
      requiresCompletion: false,
      minimumParticipation: 20,
      rarity: 'legendary',
      isTimeLimited: false,
      unlockScope: 'user'
    }
  ],
  
  featureUnlocks: [], // Emergency rituals focus on community, not features
  
  metrics: {
    participationRate: 0,
    completionRate: 0,
    engagementScore: 0,
    socialImpact: 0
  }
};

/**
 * All ritual templates
 */
export const ritualTemplates = {
  firstLight: firstLightRitual,
  orientationQA: orientationQARitual,
  torchPass: torchPassRitual,
  spaceWars: spaceWarsRitual,
  emergency: emergencyRitualTemplate,
};

/**
 * Get ritual template by name
 */
export function getRitualTemplate(name: keyof typeof ritualTemplates) {
  return ritualTemplates[name];
}

/**
 * Create ritual from template with customization
 */
export function createRitualFromTemplate(
  templateName: keyof typeof ritualTemplates,
  customizations: {
    universities: string[];
    startTime: Date;
    timezone?: string;
    title?: string;
    description?: string;
  }
) {
  const template = getRitualTemplate(templateName);
  
  return {
    ...template,
    ...customizations,
    name: `${template.name}_${Date.now()}`, // Unique name
    timezone: customizations.timezone || template.timezone,
  };
}