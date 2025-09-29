'use client';

import type { Meta, StoryObj } from '@storybook/react';
import {
  HiveInput,
  HiveButton,
  HiveCard,
  HiveCardContent,
  HiveCardHeader,
  HiveCardTitle,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Switch,
  Badge
} from '../../atomic/atoms';
import { Search, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const meta: Meta = {
  title: '02-Atoms/Form Components',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete form component library optimized for campus life and student workflows.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-hive-obsidian min-h-screen p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InputVariants: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div>
        <Label htmlFor="basic">Basic Input</Label>
        <HiveInput
          id="basic"
          placeholder="Enter your message..."
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="with-icon">With Icon</Label>
        <div className="relative mt-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-hive-platinum/60" />
          <HiveInput
            id="with-icon"
            placeholder="Search spaces, people, posts..."
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="error">Error State</Label>
        <HiveInput
          id="error"
          placeholder="Invalid input"
          className="mt-1 border-red-500 focus:border-red-500"
        />
        <p className="text-red-400 text-sm mt-1">This field is required</p>
      </div>

      <div>
        <Label htmlFor="success">Success State</Label>
        <HiveInput
          id="success"
          placeholder="Valid input"
          className="mt-1 border-green-500 focus:border-green-500"
        />
        <p className="text-green-400 text-sm mt-1">Looks good!</p>
      </div>

      <div>
        <Label htmlFor="disabled">Disabled</Label>
        <HiveInput
          id="disabled"
          placeholder="Can't type here"
          disabled
          className="mt-1"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All input states and variants including icons, validation, and disabled states.',
      },
    },
  },
};

export const LoginForm: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <HiveCard className="w-96">
        <HiveCardHeader>
          <HiveCardTitle>Sign into HIVE</HiveCardTitle>
        </HiveCardHeader>
        <HiveCardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-hive-platinum/60" />
              <HiveInput
                id="email"
                type="email"
                placeholder="your.email@buffalo.edu"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-hive-platinum/60" />
              <HiveInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hive-platinum/60 hover:text-hive-gold"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm">
              Remember me for 30 days
            </Label>
          </div>

          <HiveButton className="w-full">Sign In</HiveButton>

          <div className="text-center">
            <a href="#" className="text-sm text-hive-gold hover:underline">
              Forgot your password?
            </a>
          </div>
        </HiveCardContent>
      </HiveCard>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete login form with email validation, password visibility toggle, and campus-specific styling.',
      },
    },
  },
};

export const ProfileEditForm: Story = {
  render: () => (
    <HiveCard className="w-full max-w-2xl">
      <HiveCardHeader>
        <HiveCardTitle>Edit Your Profile</HiveCardTitle>
      </HiveCardHeader>
      <HiveCardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <HiveInput
              id="firstName"
              placeholder="Alex"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <HiveInput
              id="lastName"
              placeholder="Morgan"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="handle">Username</Label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hive-platinum/60">@</span>
            <HiveInput
              id="handle"
              placeholder="alex_morgan"
              className="pl-8"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="major">Major</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your major" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="business">Business Administration</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="psychology">Psychology</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="year">Graduation Year</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Class of..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
              <SelectItem value="2028">2028</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself..."
            className="mt-1 min-h-24"
          />
          <p className="text-sm text-hive-platinum/60 mt-1">
            Let other students know what you're interested in
          </p>
        </div>

        <div>
          <Label className="text-base font-medium">Interests</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {['Programming', 'Music', 'Sports', 'Gaming', 'Photography', 'Travel'].map((interest) => (
              <Badge key={interest} variant="outline" className="cursor-pointer hover:bg-hive-gold hover:text-hive-obsidian">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">Privacy Settings</Label>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="profile-public" className="font-normal">
                Public Profile
              </Label>
              <p className="text-sm text-hive-platinum/60">
                Allow other students to find your profile
              </p>
            </div>
            <Switch id="profile-public" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-email" className="font-normal">
                Show Email
              </Label>
              <p className="text-sm text-hive-platinum/60">
                Display your email on your profile
              </p>
            </div>
            <Switch id="show-email" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="font-normal">
                Push Notifications
              </Label>
              <p className="text-sm text-hive-platinum/60">
                Get notified about new messages and posts
              </p>
            </div>
            <Switch id="notifications" />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <HiveButton variant="outline">Cancel</HiveButton>
          <HiveButton>Save Changes</HiveButton>
        </div>
      </HiveCardContent>
    </HiveCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive profile editing form with campus-specific fields, interests, and privacy controls.',
      },
    },
  },
};

export const PostCreationForm: Story = {
  render: () => (
    <HiveCard className="w-full max-w-lg">
      <HiveCardHeader>
        <HiveCardTitle>Create a Post</HiveCardTitle>
      </HiveCardHeader>
      <HiveCardContent className="space-y-4">
        <div>
          <Label htmlFor="post-content">What's on your mind?</Label>
          <Textarea
            id="post-content"
            placeholder="Share something with your campus community..."
            className="mt-1 min-h-32"
          />
        </div>

        <div>
          <Label htmlFor="space">Post to Space</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Choose a space" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">🏛️ General Discussion</SelectItem>
              <SelectItem value="cs">💻 CS Study Group</SelectItem>
              <SelectItem value="food">🍕 Food & Dining</SelectItem>
              <SelectItem value="events">🎉 Campus Events</SelectItem>
              <SelectItem value="housing">🏠 Housing & Roommates</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-hive-platinum/60 hover:text-hive-gold">
            <span>📷</span>
            <span className="text-sm">Add Photo</span>
          </button>
          <button className="flex items-center space-x-2 text-hive-platinum/60 hover:text-hive-gold">
            <span>📍</span>
            <span className="text-sm">Add Location</span>
          </button>
          <button className="flex items-center space-x-2 text-hive-platinum/60 hover:text-hive-gold">
            <span>🏷️</span>
            <span className="text-sm">Add Tags</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="anonymous" />
          <Label htmlFor="anonymous" className="text-sm">
            Post anonymously
          </Label>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <HiveButton variant="outline">Save Draft</HiveButton>
          <HiveButton>Post</HiveButton>
        </div>
      </HiveCardContent>
    </HiveCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Post creation form with space selection, media attachments, and anonymity options.',
      },
    },
  },
};

export const SearchAndFilters: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      <HiveCard>
        <HiveCardHeader>
          <HiveCardTitle>Discover Content</HiveCardTitle>
        </HiveCardHeader>
        <HiveCardContent className="space-y-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-hive-platinum/60" />
              <HiveInput
                id="search"
                placeholder="Search posts, spaces, people..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="content-type">Content Type</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All content" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Content</SelectItem>
                  <SelectItem value="posts">Posts</SelectItem>
                  <SelectItem value="spaces">Spaces</SelectItem>
                  <SelectItem value="people">People</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="time-range">Time Range</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sort">Sort By</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Most recent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                  <SelectItem value="commented">Most Commented</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Quick Filters</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                'Academic Help',
                'Social Events',
                'Housing',
                'Food & Dining',
                'Study Groups',
                'Sports',
                'Clubs',
                'Jobs & Internships'
              ].map((filter) => (
                <Badge
                  key={filter}
                  variant="outline"
                  className="cursor-pointer hover:bg-hive-gold hover:text-hive-obsidian"
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <HiveButton>Apply Filters</HiveButton>
          </div>
        </HiveCardContent>
      </HiveCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Advanced search and filtering interface for discovering campus content.',
      },
    },
  },
};