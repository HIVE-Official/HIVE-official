/**
 * HIVE Luxury Social Interactions
 * 
 * Buttery smooth social interactions using complete HIVE design system:
 * - Obsidian/charcoal backgrounds with glass morphism
 * - Gold accent shadows and glow effects
 * - Liquid metal physics with spring timing
 * - Campus-contextual social components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, MessageCircle, Share2, Users, Star, BookOpen, Zap, Clock, MapPin } from 'lucide-react';
import { 
  HiveButton, 
  HiveCard, 
  HiveCardHeader, 
  HiveCardTitle, 
  HiveCardContent, 
  HiveBadge 
} from '../../components';

const meta = {
  title: '01-Foundation/HIVE Luxury Social Interactions',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Buttery smooth social interactions using complete HIVE luxury design system - obsidian/charcoal backgrounds, gold accents, liquid metal physics.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// HIVE Liquid Metal Physics - Premium spring timing
const hiveLiquidMotion = {
  socialButton: {
    rest: {
      scale: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1], // HIVE liquid metal easing
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: [0.23, 1, 0.32, 1],
        type: "spring" as const,
        stiffness: 500,
        damping: 12,
      }
    },
    pressed: {
      scale: 0.95,
      y: 1,
      transition: {
        duration: 0.1,
        ease: [0.23, 1, 0.32, 1],
      }
    }
  },
  presencePulse: {
    online: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    },
    active: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    },
    typing: {
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    }
  },
  engagementFlow: {
    likeButton: {
      idle: {
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1],
        }
      },
      liked: {
        scale: [1, 1.3, 1.1],
        rotate: [0, 15, 0],
        transition: {
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1], // Bouncy satisfaction
          times: [0, 0.6, 1],
        }
      }
    }
  }
};

// HIVE Campus Presence Indicator - Complete luxury implementation
const HIVEPresenceIndicator = ({ status }: { status: 'online' | 'active' | 'typing' }) => {
  return (
    <motion.div 
      className="flex items-center gap-3 p-3 bg-[var(--hive-background-secondary)]/80 backdrop-blur-sm border border-[var(--hive-border-subtle)] rounded-2xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className={`w-3 h-3 rounded-full shadow-lg ${
          status === 'online' 
            ? 'bg-[var(--hive-status-success)] shadow-[var(--hive-status-success)]/40' :
          status === 'active' 
            ? 'bg-[var(--hive-brand-primary)] shadow-[var(--hive-shadow-gold-glow)]' :
            'bg-[var(--hive-status-info)] shadow-[var(--hive-status-info)]/40'
        }`}
        variants={hiveLiquidMotion.presencePulse}
        animate={status}
      />
      <span className="text-[var(--hive-text-primary)] text-sm font-medium">
        {status === 'online' ? 'Online in CS Hub' :
         status === 'active' ? 'Active in Study Room' :
         'Typing in Group Chat...'}
      </span>
    </motion.div>
  );
};

// HIVE Campus Social Post - Real campus platform content
const HIVECampusSocialPost = () => {
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  return (
    <HiveCard variant="space" className="max-w-lg">
      <HiveCardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-primary)]/60 rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--hive-shadow-gold-glow)]">
            <Zap className="w-6 h-6 text-[var(--hive-background-primary)]" />
          </div>
          <div className="flex-1">
            <HiveCardTitle className="text-base">CS Study Group</HiveCardTitle>
            <div className="flex items-center gap-2 text-[var(--hive-text-muted)] text-sm">
              <Clock className="w-3 h-3" />
              <span>2 hours ago</span>
              <span>•</span>
              <MapPin className="w-3 h-3" />
              <span>Academic Spaces</span>
            </div>
          </div>
          <HiveBadge variant="success" className="shadow-lg">Live</HiveBadge>
        </div>
      </HiveCardHeader>
      
      <HiveCardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2 text-lg">
            Just built an amazing GPA calculator tool! 📊
          </h3>
          <p className="text-[var(--hive-text-secondary)] leading-relaxed">
            Finished this collaborative project with my study group. It automatically imports course data and predicts semester outcomes. The tool handles weighted GPAs and shows visual progress charts. Try it out and let me know what you think!
          </p>
        </div>
        
        {/* Tool Preview Card */}
        <div className="p-4 bg-[var(--hive-background-tertiary)]/60 backdrop-blur-sm border border-[var(--hive-border-gold)]/30 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-[var(--hive-brand-primary)]" />
            <span className="font-medium text-[var(--hive-text-primary)]">GPA Calculator v2.0</span>
          </div>
          <p className="text-sm text-[var(--hive-text-muted)]">
            Smart academic planning tool with semester forecasting
          </p>
        </div>
        
        {/* Social Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <motion.button
              className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                liked 
                  ? 'bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/30 text-[var(--hive-status-error)] shadow-lg shadow-[var(--hive-status-error)]/20' 
                  : 'bg-[var(--hive-background-secondary)]/60 border border-[var(--hive-border-subtle)] text-[var(--hive-text-secondary)] hover:border-[var(--hive-border-primary)] hover:text-[var(--hive-text-primary)]'
              }`}
              variants={hiveLiquidMotion.engagementFlow.likeButton}
              animate={liked ? "liked" : "idle"}
              onClick={() => setLiked(!liked)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{liked ? 'Liked' : 'Like'}</span>
              <span className="text-xs bg-[var(--hive-overlay-glass)] px-2 py-1 rounded-full">
                {liked ? '24' : '23'}
              </span>
            </motion.button>
            
            <HiveButton
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => setShared(!shared)}
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </HiveButton>
            
            <HiveButton
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Comment</span>
            </HiveButton>
          </div>
          
          <motion.button
            className={`p-2 rounded-xl backdrop-blur-sm transition-all duration-300 ${
              bookmarked
                ? 'bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)] shadow-lg shadow-[var(--hive-shadow-gold-glow)]'
                : 'bg-[var(--hive-background-secondary)]/60 border border-[var(--hive-border-subtle)] text-[var(--hive-text-secondary)] hover:border-[var(--hive-border-primary)]'
            }`}
            onClick={() => setBookmarked(!bookmarked)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
      </HiveCardContent>
    </HiveCard>
  );
};

// HIVE Social Button Grid - Campus interaction patterns
const HIVESocialButtonGrid = () => {
  const [states, setStates] = useState({
    like: false,
    share: false,
    comment: false,
    bookmark: false
  });
  
  const toggleState = (key: keyof typeof states) => {
    setStates(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  return (
    <div className="p-6 bg-[var(--hive-background-primary)] rounded-3xl space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] text-center">
        HIVE Campus Social Interactions
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          className={`flex items-center gap-3 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
            states.like
              ? 'bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/30 text-[var(--hive-status-error)] shadow-lg shadow-[var(--hive-status-error)]/20'
              : 'bg-[var(--hive-background-secondary)]/80 border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] hover:border-[var(--hive-border-primary)] hover:shadow-lg'
          }`}
          onClick={() => toggleState('like')}
          variants={hiveLiquidMotion.socialButton}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          <Heart className={`w-5 h-5 ${states.like ? 'fill-current' : ''}`} />
          <span className="font-medium">Like Tool</span>
        </motion.button>
        
        <motion.button
          className={`flex items-center gap-3 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
            states.share
              ? 'bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)] shadow-lg shadow-[var(--hive-shadow-gold-glow)]'
              : 'bg-[var(--hive-background-secondary)]/80 border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] hover:border-[var(--hive-border-primary)] hover:shadow-lg'
          }`}
          onClick={() => toggleState('share')}
          variants={hiveLiquidMotion.socialButton}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          <Share2 className="w-5 h-5" />
          <span className="font-medium">Share with Study Group</span>
        </motion.button>
        
        <motion.button
          className={`flex items-center gap-3 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
            states.comment
              ? 'bg-[var(--hive-status-info)]/10 border border-[var(--hive-status-info)]/30 text-[var(--hive-status-info)] shadow-lg shadow-[var(--hive-status-info)]/20'
              : 'bg-[var(--hive-background-secondary)]/80 border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] hover:border-[var(--hive-border-primary)] hover:shadow-lg'
          }`}
          onClick={() => toggleState('comment')}
          variants={hiveLiquidMotion.socialButton}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Add Comment</span>
        </motion.button>
        
        <motion.button
          className={`flex items-center gap-3 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
            states.bookmark
              ? 'bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)] shadow-lg shadow-[var(--hive-shadow-gold-glow)]'
              : 'bg-[var(--hive-background-secondary)]/80 border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] hover:border-[var(--hive-border-primary)] hover:shadow-lg'
          }`}
          onClick={() => toggleState('bookmark')}
          variants={hiveLiquidMotion.socialButton}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          <Star className={`w-5 h-5 ${states.bookmark ? 'fill-current' : ''}`} />
          <span className="font-medium">Save for Later</span>
        </motion.button>
      </div>
    </div>
  );
};

// ============================================================================
// STORYBOOK STORIES
// ============================================================================

export const CampusSocialPost: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <HIVECampusSocialPost />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete campus social post with HIVE luxury design system - obsidian backgrounds, gold shadows, liquid metal physics.',
      },
    },
  },
};

export const SocialInteractionGrid: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <HIVESocialButtonGrid />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Campus social interaction buttons with buttery smooth animations and luxury HIVE styling.',
      },
    },
  },
};

export const PresenceIndicators: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen space-y-4">
      <HIVEPresenceIndicator status="online" />
      <HIVEPresenceIndicator status="active" />
      <HIVEPresenceIndicator status="typing" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Campus presence indicators showing student activity with pulsing animations and luxury styling.',
      },
    },
  },
};

export const CompleteExperience: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-2">
            HIVE Campus Social Experience
          </h1>
          <p className="text-[var(--hive-text-secondary)]">
            Luxury interactions for premium campus platform
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <HIVECampusSocialPost />
          <div className="space-y-6">
            <HIVESocialButtonGrid />
            <div className="space-y-3">
              <HIVEPresenceIndicator status="online" />
              <HIVEPresenceIndicator status="active" />
              <HIVEPresenceIndicator status="typing" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete HIVE campus social experience showcasing luxury design system in action.',
      },
    },
  },
};