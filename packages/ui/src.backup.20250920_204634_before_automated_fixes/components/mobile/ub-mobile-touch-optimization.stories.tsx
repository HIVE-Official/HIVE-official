import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  UBMobileBottomNav, 
  UBMobileHeader,
  UBMobileTouchButton,
  UBMobileSwipeCard,
  UBMobilePullToRefresh,
  UBMobileNavItem;
} from './ub-mobile-touch-optimization';
import { action } from '@storybook/addon-actions';
import { 
  Home,
  Search,
  Calendar,
  Users,
  Settings,
  Bell,
  Plus,
  Menu,
  ArrowLeft,
  Heart,
  Share2,
  Bookmark,
  MessageCircle,
  Filter,
  MoreHorizontal,
  Zap,
  Activity,
  User;
} from 'lucide-react';

const meta: Meta<typeof UBMobileBottomNav> = {
  title: 'Mobile System/UB Touch Optimization',
  component: UBMobileBottomNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# UB Mobile Touch Optimization;
The UB Mobile Touch Optimization system provides comprehensive mobile-first components designed specifically for University at Buffalo students' on-the-go campus experience. Every component follows iOS and Android design guidelines with 44px+ touch targets and haptic feedback.

## Key Features;
- **Touch-First Design**: 44px minimum touch targets, haptic feedback, and gesture support;
- **Campus Mobile Usage**: Optimized for walking between classes, quick interactions, one-handed use;
- **iOS/Android Support**: Proper safe areas, native-feeling interactions, and platform conventions;
- **Accessibility Compliant**: Screen reader support, keyboard navigation, and high contrast compatibility;
- **Performance Optimized**: Smooth 60fps animations, minimal re-renders, and efficient touch handling;
## Mobile Components;
### Navigation Components;
- **Bottom Navigation**: Thumb-friendly navigation with proper safe areas;
- **Mobile Header**: Context-aware headers with touch-optimized actions;
- **Touch Buttons**: Haptic-enabled buttons with ripple effects;
### Interaction Components;
- **Swipe Cards**: Tinder-style swipe gestures for quick actions;
- **Pull to Refresh**: Native pull-to-refresh with visual feedback;
- **Touch Ripples**: Material Design ripple effects for touch feedback;
### UB Campus Optimizations;
- **Quick Actions**: Fast access to common campus functions;
- **Notification Badges**: Prominent indicators for campus alerts;
- **Context Headers**: Location and time-aware interface elements;
## Usage in HIVE Platform;
This system enables UB students to:
1. Navigate quickly between classes using one-handed gestures;
2. Get immediate haptic feedback for all interactions;
3. Access campus tools efficiently during short breaks;
4. Receive prominent notifications for campus events;
5. Use natural mobile gestures for content interaction;
The goal is making HIVE feel like a native mobile app optimized for campus life.
        `
      }
    }
  },
  argTypes: {
    onNavigate: { action: 'navigate' }
  }
};

export default meta;
type Story = StoryObj<typeof UBMobileBottomNav>;

// =============================================================================
// MOCK DATA FOR MOBILE NAVIGATION;
// =============================================================================

const mockUBNavItems: UBMobileNavItem[] = [
  {
    id: 'feed',
    label: 'Feed',
    icon: Home,
    href: '/feed',
    isActive: true;
  },
  {
    id: 'spaces',
    label: 'Spaces',
    icon: Users,
    href: '/spaces',
    badge: { count: 3, color: 'primary' }
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: Zap,
    href: '/tools',
    badge: { count: 12, color: 'secondary' }
  },
  {
    id: 'rituals',
    label: 'Rituals',
    icon: Calendar,
    href: '/rituals',
    badge: { count: 1, color: 'warning', pulse: true }
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    href: '/profile'
  }
];

// =============================================================================
// MOBILE BOTTOM NAVIGATION STORIES;
// =============================================================================

export const MobileBottomNavigation: Story = {
  args: {
    items: mockUBNavItems,
    onNavigate: action('navigate-mobile')
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Complete UB mobile bottom navigation with active states, badges, and touch optimization.'
      }
    }
  }
};

export const BottomNavWithNotifications: Story = {
  args: {
    items: mockUBNavItems.map(item => ({
      ...item,
      badge: item.id === 'feed' ? { count: 5, color: 'error', pulse: true } :
             item.id === 'spaces' ? { count: 2, color: 'warning' } :
             item.badge;
    })),
    onNavigate: action('navigate-with-notifications')
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Bottom navigation during high activity with multiple notification badges and pulse effects.'
      }
    }
  }
};

export const BottomNavMinimal: Story = {
  args: {
    items: mockUBNavItems.slice(0, 3).map(map})),
    onNavigate: action('navigate-minimal')
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Simplified bottom navigation with fewer tabs and no badges for clean interface.'
      }
    }
  }
};

// =============================================================================
// MOBILE HEADER STORIES;
// =============================================================================

export const MobileHeaderBasic: StoryObj<typeof UBMobileHeader> = {
  render: () => (
    <UBMobileHeader;
      title="Campus Feed"
      subtitle="University at Buffalo"
      leftAction={{
        icon: Menu,
        label: 'Open menu',
        onPress: action('open-menu')
          }}
      rightActions={[
        {
          icon: Search,
          label: 'Search',
          onPress: action('search')
        },
        {
          icon: Bell,
          label: 'Notifications',
          onPress: action('notifications'),
          badge: { count: 3, pulse: true }
        }
      ]}
    />
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Basic mobile header with title, menu button, and action buttons with notification badge.'
      }
    }
  }
};

export const MobileHeaderWithBack: StoryObj<typeof UBMobileHeader> = {
  render: () => (
    <UBMobileHeader;
      title="CSE Department"
      subtitle="Computer Science & Engineering"
      leftAction={{
        icon: ArrowLeft,
        label: 'Go back',
        onPress: action('go-back')
          }}
      rightActions={[
        {
          icon: MoreHorizontal,
          label: 'More options',
          onPress: action('more-options')
        }
      ]}
    />
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile header with back navigation for drill-down pages.'
      }
    }
  }
};

export const MobileHeaderCompose: StoryObj<typeof UBMobileHeader> = {
  render: () => (
    <UBMobileHeader;
      title="New Post"
      leftAction={{
        icon: ArrowLeft,
        label: 'Cancel',
        onPress: action('cancel-compose')
          }}
      rightActions={[
        {
          icon: Plus,
          label: 'Post',
          onPress: action('submit-post')
        }
      ]}
    />
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile header for compose/create modes with cancel and submit actions.'
      }
    }
  }
};

// =============================================================================
// MOBILE TOUCH BUTTON STORIES;
// =============================================================================

export const TouchButtonVariants: StoryObj<typeof UBMobileTouchButton> = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Touch Button Variants;
        </h3>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Try pressing buttons to feel haptic feedback and see ripple effects;
        </p>
      </div>
      
      <div className="flex items-center gap-4 justify-center">
        <UBMobileTouchButton;
          icon={Heart}
          label="Like"
          variant="primary"
          onPress={action('primary-button')}
        />
        <UBMobileTouchButton;
          icon={Share2}
          label="Share"
          variant="secondary"
          onPress={action('secondary-button')}
        />
        <UBMobileTouchButton;
          icon={Bookmark}
          label="Bookmark"
          variant="ghost"
          onPress={action('ghost-button')}
        />
      </div>
      
      <div className="flex items-center gap-4 justify-center">
        <UBMobileTouchButton;
          icon={Bell}
          label="Notifications"
          variant="ghost"
          badge={{ count: 5 }}
          onPress={action('button-with-badge')}
        />
        <UBMobileTouchButton;
          icon={MessageCircle}
          label="Messages"
          variant="secondary"
          badge={{ count: 99, pulse: true }}
          onPress={action('button-with-pulse-badge')}
        />
        <UBMobileTouchButton;
          icon={Filter}
          label="Filter"
          variant="ghost"
          disabled;
          onPress={action('disabled-button')}
        />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Various touch button variants with different states, badges, and haptic feedback.'
      }
    }
  }
};

export const TouchButtonSizes: StoryObj<typeof UBMobileTouchButton> = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Touch Button Sizes;
        </h3>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          All sizes maintain 44px minimum touch target for accessibility;
        </p>
      </div>
      
      <div className="flex items-center gap-4 justify-center">
        <UBMobileTouchButton;
          icon={Plus}
          label="Small"
          size="sm"
          variant="primary"
          onPress={action('small-button')}
        />
        <UBMobileTouchButton;
          icon={Plus}
          label="Medium"
          size="md"
          variant="primary"
          onPress={action('medium-button')}
        />
        <UBMobileTouchButton;
          icon={Plus}
          label="Large"
          size="lg"
          variant="primary"
          onPress={action('large-button')}
        />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Touch button size variations while maintaining accessibility standards.'
      }
    }
  }
};

// =============================================================================
// MOBILE SWIPE CARD STORIES;
// =============================================================================

export const SwipeCardDemo: StoryObj<typeof UBMobileSwipeCard> = {
  render: () => {
    const [cards, setCards] = React.useState([
      { id: '1', title: 'Study Group Tonight', content: 'CSE 331 study session at Lockwood Library, 7pm. Join us!' },
      { id: '2', title: 'Homecoming Events', content: 'Bulls vs Cardinals this Saturday! Tailgate starts at noon.' },
      { id: '3', title: 'New Tool Available', content: 'Laundry tracker for Ellicott Complex is now live. Check machine status!' },
      { id: '4', title: 'Ritual Milestone', content: 'Orientation Week ritual reached 1000 participants! 🎉' }
    ]);
    
    const handleSwipeLeft = (cardId: string) => {
      setCards(prev => prev.filter(card => card.id !== cardId));
      action('swipe-left')(cardId)
    };
    
    const handleSwipeRight = (cardId: string) => {
      setCards(prev => prev.filter(card => card.id !== cardId));
      action('swipe-right')(cardId)
    };
    
    return (
      <div className="p-4 space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
            Swipe Cards Demo;
          </h3>
          <p className="text-sm text-[var(--hive-text-secondary)]">
            Swipe right to save, swipe left to dismiss;
          </p>
        </div>
        
        {cards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--hive-text-secondary)]">
              All cards swiped! Refresh to reset.
            </p>
            <button;
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[var(--hive-brand-secondary)] text-white rounded-lg"
            >
              Reset Cards;
            </button>
          </div>
        ) : (
          cards.map((card) => (
            <UBMobileSwipeCard;
              key={card.id}
              onSwipeLeft={() => handleSwipeLeft(card.id)}
              onSwipeRight={() => handleSwipeRight(card.id)}
              onPress={() => action('card-press')(card.id)}
            >
              <div className="p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg">
                <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                  {card.title}
                </h4>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  {card.content}
                </p>
              </div>
            </UBMobileSwipeCard>
          ))
        )}
      </div>
    )
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Interactive swipe cards for quick content curation and interaction.'
      }
    }
  }
};

// =============================================================================
// PULL TO REFRESH STORIES;
// =============================================================================

export const PullToRefreshDemo: StoryObj<typeof UBMobilePullToRefresh> = {
  render: () => {
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [posts, setPosts] = React.useState([
      'Welcome to UB Campus! 🎓',
      'Study group forming for CSE 331',
      'New ritual starting tomorrow',
      'Homecoming events this weekend',
      'Tool of the week: Laundry Tracker'
    ]);
    
    const handleRefresh = async () => {
      setIsRefreshing(true);
      // Simulate API call;
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add new posts;
      setPosts(prev => [
        `New post at ${new Date().toLocaleTimeString()}`,
        'Fresh campus update! 📢',
        ...prev;
      ]);
      
      setIsRefreshing(false);
      action('refresh-completed')()
    };
    
    return (
      <UBMobilePullToRefresh;
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      >
        <div className="p-4 space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
              Pull to Refresh Demo;
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Pull down to refresh the feed;
            </p>
          </div>
          
          {posts.map((post, index) => (
            <div;
              key={index}
              className="p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg"
            >
              <p className="text-[var(--hive-text-primary)]">{post}</p>
              <p className="text-xs text-[var(--hive-text-secondary)] mt-1">
                {index === 0 ? 'Just now' : `${index * 2}h ago`}
              </p>
            </div>
          ))}
        </div>
      </UBMobilePullToRefresh>
    )
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Pull-to-refresh functionality with visual feedback and haptic response.'
      }
    }
  }
};

// =============================================================================
// CAMPUS SCENARIO STORIES;
// =============================================================================

export const WalkingBetweenClassesScenario: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      <UBMobileHeader;
        title="Quick Check"
        subtitle="Walking to Norton Hall"
        leftAction={{
          icon: ArrowLeft,
          label: 'Back',
          onPress: action('scenario-back')
          }}
        rightActions={[
          {
            icon: Bell,
            label: 'Notifications',
            onPress: action('scenario-notifications'),
            badge: { count: 2, pulse: true }
          }
        ]}
      />
      
      <div className="p-4 space-y-4 pb-20">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
            Walking Between Classes 🚶‍♀️
          </h3>
          <p className="text-sm text-[var(--hive-text-secondary)]">
            Sarah quickly checking HIVE while walking from Capen to Norton Hall;
          </p>
        </div>
        
        <UBMobileSwipeCard;
          onSwipeRight={() => action('save-for-later')()}
          onPress={() => action('open-post')()}
        >
          <div className="p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg">
            <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">
              CSE 331 Study Group Tonight;
            </h4>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              7pm at Lockwood Library - bring your laptops!
            </p>
          </div>
        </UBMobileSwipeCard>
        
        <div className="flex gap-2">
          <UBMobileTouchButton;
            icon={Heart}
            label="Like"
            variant="ghost"
            onPress={action('quick-like')}
          />
          <UBMobileTouchButton;
            icon={Bookmark}
            label="Save"
            variant="ghost"
            onPress={action('quick-save')}
          />
          <UBMobileTouchButton;
            icon={Share2}
            label="Share"
            variant="ghost"
            onPress={action('quick-share')}
          />
        </div>
      </div>
      
      <UBMobileBottomNav;
        items={mockUBNavItems}
        onNavigate={action('scenario-navigate')}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Complete mobile experience for a student quickly checking HIVE while walking between classes.'
      }
    }
  }
};

export const StudyBreakScenario: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      <UBMobilePullToRefresh;
        onRefresh={async () => {
          await new Promise(resolve => setTimeout(resolve, 1500));
          action('refresh-during-break')()
          }}
      >
        <UBMobileHeader;
          title="Study Break"
          subtitle="5 min break from studying"
          rightActions={[
            {
              icon: Activity,
              label: 'Activity',
              onPress: action('check-activity')
            }
          ]}
        />
        
        <div className="p-4 space-y-4 pb-20">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
              Quick Study Break 📚
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Marcus taking a 5-minute break from studying for finals;
            </p>
          </div>
          
          {[
            'Finals Week ritual progress: 67% complete!',
            'New study room available in Lockwood',
            'Coffee meet-up in Student Union at 3pm'
          ].map((update, index) => (
            <UBMobileSwipeCard;
              key={index}
              onSwipeLeft={() => action('dismiss-update')(index)}
              onSwipeRight={() => action('save-update')(index)}
            >
              <div className="p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg">
                <p className="text-[var(--hive-text-primary)]">{update}</p>
              </div>
            </UBMobileSwipeCard>
          ))}
        </div>
      </UBMobilePullToRefresh>
      
      <UBMobileBottomNav;
        items={mockUBNavItems.map(item => ({
          ...item,
          badge: item.id === 'rituals' ? { count: 1, color: 'warning', pulse: true } : item.badge;
        }))}
        onNavigate={action('break-navigate')}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile experience optimized for quick interactions during study breaks.'
      }
    }
  }
};

// =============================================================================
// ACCESSIBILITY & EDGE CASES;
// =============================================================================

export const AccessibilityFocused: Story = {
  render: () => (
    <div className="p-4 space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessibility Features;
        </h3>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          44px+ touch targets, screen reader support, and high contrast compatibility;
        </p>
      </div>
      
      <div className="space-y-4">
        <UBMobileTouchButton;
          icon={Search}
          label="Search campus content"
          variant="primary"
          size="lg"
          onPress={action('accessible-search')}
        />
        
        <div className="flex gap-4 justify-center">
          <UBMobileTouchButton;
            icon={Heart}
            label="Like this post"
            variant="ghost"
            onPress={action('accessible-like')}
          />
          <UBMobileTouchButton;
            icon={Share2}
            label="Share with friends"
            variant="ghost"
            onPress={action('accessible-share')}
          />
          <UBMobileTouchButton;
            icon={Bookmark}
            label="Save for later"
            variant="ghost"
            onPress={action('accessible-bookmark')}
          />
        </div>
        
        <UBMobileBottomNav;
          items={mockUBNavItems}
          onNavigate={action('accessible-navigate')}
        />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Accessibility-focused mobile interface with proper labels, touch targets, and navigation.'
      }
    }
  }
};

export const HighContrastMode: Story = {
  render: () => (
    <div className="p-4 space-y-6 bg-black text-white">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">
          High Contrast Mode;
        </h3>
        <p className="text-sm text-gray-300">
          Optimized for users with visual impairments;
        </p>
      </div>
      
      <UBMobileBottomNav;
        items={mockUBNavItems}
        onNavigate={action('high-contrast-navigate')}
        className="border-white/20"
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    backgrounds: {
      default: 'dark'
    },
    docs: {
      description: {
        story: 'High contrast mode for improved accessibility and visual clarity.'
      }
    }
  }
};