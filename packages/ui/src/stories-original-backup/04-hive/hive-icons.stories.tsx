import type { Meta, StoryObj } from '@storybook/react';
import { HiveLogo, IconWrapper, iconSizes } from '../../components/hive-icons';
import { 
  Home, User, Users, Search, Bell, Settings, Menu, X,
  MessageSquare, Plus, Edit, Share, Bookmark, Heart, Star,
  BookOpen, GraduationCap, Calendar, Clock, MapPin, Building,
  Zap, Code, Wrench, Sparkles, Target, Award,
  Check, CheckCircle, AlertCircle, Info, Loader,
  Image, File, FileText, Video, Link, ExternalLink,
  Eye, Lock, Download, Save
} from 'lucide-react';

const meta: Meta = {
  title: '04-HIVE/Icons',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE Icon System - HIVE brand logos + Lucide icons for a clean, consistent approach.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const HiveLogos: Story = {
  render: () => (
    <div className="flex gap-8 items-center p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="white" size={48} />
        <span className="text-xs text-[var(--hive-text-primary)]">White</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 bg-[var(--hive-text-primary)] rounded-lg">
        <HiveLogo variant="black" size={48} />
        <span className="text-xs text-[var(--hive-background-primary)]">Black</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HiveLogo variant="gold" size={48} />
        <span className="text-xs text-[var(--hive-brand-secondary)]">Gold</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'HIVE brand logos in white, black, and gold variants for different backgrounds'
      }
    }
  }
};

export const NavigationIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="flex flex-col items-center gap-2">
        <Home className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Home</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <User className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">User</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Users className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Users</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Search className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Search</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Bell className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Bell</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Settings className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Settings</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common navigation icons from Lucide React'
      }
    }
  }
};

export const AcademicIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="flex flex-col items-center gap-2">
        <BookOpen className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">BookOpen</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <GraduationCap className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">GraduationCap</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Calendar className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Calendar</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Clock className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Clock</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MapPin className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">MapPin</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Building className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Building</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Academic and campus-related icons for HIVE spaces'
      }
    }
  }
};

export const ToolIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="flex flex-col items-center gap-2">
        <Zap className="w-6 h-6 text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Zap</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Code className="w-6 h-6 text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Code</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Wrench className="w-6 h-6 text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Wrench</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Sparkles className="w-6 h-6 text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Sparkles</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Target className="w-6 h-6 text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Target</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Award className="w-6 h-6 text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Award</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tool building and creation icons with gold accent colors'
      }
    }
  }
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="flex flex-col items-center gap-2">
        <Star size={iconSizes.xs} className="text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">XS (3)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Star size={iconSizes.sm} className="text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">SM (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Star size={iconSizes.md} className="text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">MD (5)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Star size={iconSizes.lg} className="text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">LG (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Star size={iconSizes.xl} className="text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">XL (32px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Star size={iconSizes['2xl']} className="text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">2XL (48px)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Consistent icon sizing scale for HIVE components'
      }
    }
  }
};

export const IconWrapperDemo: Story = {
  render: () => (
    <div className="flex gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <IconWrapper size="sm">
        <Heart className="text-red-400" />
      </IconWrapper>
      <IconWrapper size="md">
        <Heart className="text-red-400" />
      </IconWrapper>
      <IconWrapper size="lg">
        <Heart className="text-red-400" />
      </IconWrapper>
      <IconWrapper size={40}>
        <Heart className="text-red-400" />
      </IconWrapper>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'IconWrapper utility component for consistent icon styling and sizing'
      }
    }
  }
};

export const StatusIcons: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="flex flex-col items-center gap-2">
        <Check className="w-6 h-6 text-green-400" />
        <span className="text-xs text-[var(--hive-text-primary)]">Check</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CheckCircle className="w-6 h-6 text-green-400" />
        <span className="text-xs text-[var(--hive-text-primary)]">CheckCircle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AlertCircle className="w-6 h-6 text-yellow-400" />
        <span className="text-xs text-[var(--hive-text-primary)]">AlertCircle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Info className="w-6 h-6 text-blue-400" />
        <span className="text-xs text-[var(--hive-text-primary)]">Info</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader className="w-6 h-6 text-[var(--hive-text-primary)] animate-spin" />
        <span className="text-xs text-[var(--hive-text-primary)]">Loader</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status and feedback icons with semantic colors'
      }
    }
  }
};

export const InteractionIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="flex flex-col items-center gap-2">
        <Plus className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Plus</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Edit className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Edit</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Share className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Share</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Heart className="w-6 h-6 text-red-400" />
        <span className="text-xs text-[var(--hive-text-primary)]">Heart</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Bookmark className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Bookmark</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Download className="w-6 h-6 text-[var(--hive-text-primary)]" />
        <span className="text-xs text-[var(--hive-text-primary)]">Download</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive action icons for user engagement'
      }
    }
  }
};