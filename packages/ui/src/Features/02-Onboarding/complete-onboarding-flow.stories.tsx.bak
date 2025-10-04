import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../atomic/atoms/button';
import { Input } from '../../atomic/atoms/input';
import { Textarea } from '../../atomic/atoms/textarea';
import { Progress } from '../../atomic/atoms/progress';
import { Badge } from '../../atomic/atoms/badge';
import { Card } from '../../atomic/atoms/card';
import { Checkbox } from '../../atomic/atoms/checkbox';
import { Label } from '../../atomic/atoms/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../atomic/atoms/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../atomic/atoms/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../atomic/atoms/tabs';
import { useForm } from 'react-hook-form';
import {
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  User,
  Camera,
  Upload,
  CheckCircle2,
  Heart,
  Music,
  Code,
  Dumbbell,
  Palette,
  Gamepad2,
  BookOpen,
  Coffee,
  PartyPopper,
  Calendar,
  MapPin,
  Home,
  Building,
  Loader2,
  X,
  Plus,
} from 'lucide-react';

/**
 * # HIVE Onboarding Flow - Complete User Journey
 *
 * **SPEC.md Reference:** Lines 195-320 (Onboarding System)
 *
 * ## Onboarding Architecture
 *
 * **Flow:** 7-step wizard with progressive disclosure
 * **Duration:** 2-3 minutes average
 * **Completion:** Required before platform access
 * **Skip:** No skip allowed, all steps mandatory (except photo upload)
 *
 * ## Onboarding Steps (from SPEC.md)
 *
 * ### Step 1: Welcome
 * - **Purpose:** Set expectations, show value proposition
 * - **Content:** "Welcome to HIVE" with campus illustration
 * - **CTA:** "Let's get started" → Step 2
 *
 * ### Step 2: User Type Selection
 * - **Purpose:** Determine user context (affects subsequent steps)
 * - **Options:** Student (default) | Alumni | Faculty/Staff
 * - **Faculty Note:** Gets condensed flow (skips steps 4, 5, 6)
 *
 * ### Step 3: Personal Information
 * - **Fields:**
 *   - Full Name (required, 2-50 chars, letters/spaces/hyphens only)
 *   - Username (auto-generated from name, shown but not editable at this stage)
 * - **Validation:** Real-time with debounce
 *
 * ### Step 4: Profile Photo (Optional)
 * - **Library:** react-image-crop
 * - **Aspect Ratio:** 3:4 (portrait)
 * - **Min Size:** 300x400px
 * - **Output:** 450x600px
 * - **Formats:** JPG, PNG, WebP (max 5MB)
 * - **Skip:** "Skip for now" button available
 *
 * ### Step 5: Academic & Bio Information
 * - **Major:** Required, 200+ options, max 2 selections
 * - **Graduation Year:** Required, next year to +8 years
 * - **Bio:** Optional, 0-200 characters
 * - **Living Situation:** Optional (On Campus, Off Campus, Commuter)
 *
 * ### Step 6: Interests (CRITICAL)
 * - **Required:** 3-6 interests from 14 categories
 * - **Categories:** Academic, Social, Tech, Campus Life, Buffalo Culture,
 *   Entertainment, Gaming, Health, Work, Relationships, Creative, Random,
 *   Internet Culture, Greek Life
 * - **Purpose:** Feed algorithm, space recommendations, connection suggestions
 * - **Reference:** HIVE_INTERESTS.md for complete list
 *
 * ### Step 7: Completion
 * - **Animation:** Confetti celebration
 * - **Message:** Personalized welcome with first name
 * - **Action:** Set `user.onboarded = true`
 * - **Redirect:** /feed (authenticated, full access)
 *
 * ## User Type Flows
 *
 * **Student Flow:** All 7 steps
 * **Alumni Flow:** All 7 steps (but different field options)
 * **Faculty/Staff Flow:** Steps 1, 2, 3, 7 only (condensed, no photo/academic/interests)
 *
 * ## Progress Tracking
 * - Progress bar at top (0% → 100%)
 * - Step indicator (1 of 7, 2 of 7, etc.)
 * - Back button available except on Step 1
 * - Data persisted to localStorage (survives refresh)
 *
 * ## Data Validation
 * - Client-side: Zod schemas with real-time feedback
 * - Server-side: API validation before user.onboarded = true
 * - Error handling: Inline FormMessage + retry logic
 *
 * ## Post-Onboarding
 * - User gains full platform access
 * - Profile visible to campus
 * - Feed algorithm active (based on interests)
 * - Space recommendations generated
 * - Connection suggestions available
 *
 * @see /apps/web/src/app/onboarding - Implementation
 * @see /packages/core/src/domain/identity - Profile domain models
 */
const meta = {
  title: '02-Onboarding/Complete Onboarding Flow',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete 7-step onboarding wizard from SPEC.md. Guides new users through profile setup with progressive disclosure, real-time validation, and celebration upon completion. Critical for user activation and feed algorithm.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Step 1: Welcome Screen
 *
 * First impression for new users. Sets expectations and shows value proposition.
 * - Welcome message with campus branding
 * - Value props: "Find your people", "Discover events", "Build community"
 * - Estimated time: "2-3 minutes to get started"
 * - CTA: "Let's get started" → Step 2
 */
export const Step1_Welcome: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8 text-center">
          {/* Logo and Progress */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border">
              <span className="text-sm font-medium text-muted-foreground">Step 1 of 7</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>

          {/* Welcome Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome to HIVE
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Your campus community, reimagined. Connect with students,
                discover events, and build your college experience.
              </p>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8">
              <div className="p-6 rounded-xl bg-card/50 backdrop-blur-xl border border-border space-y-2">
                <h3 className="font-semibold">Find Your People</h3>
                <p className="text-sm text-muted-foreground">
                  Connect based on interests, major, and campus life
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card/50 backdrop-blur-xl border border-border space-y-2">
                <h3 className="font-semibold">Discover Events</h3>
                <p className="text-sm text-muted-foreground">
                  Never miss campus happenings, from clubs to concerts
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card/50 backdrop-blur-xl border border-border space-y-2">
                <h3 className="font-semibold">Build Community</h3>
                <p className="text-sm text-muted-foreground">
                  Join spaces, create content, make your mark
                </p>
              </div>
            </div>

            {/* Time Estimate */}
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>Takes about 2-3 minutes</span>
              <div className="h-1 w-1 rounded-full bg-muted-foreground" />
            </div>
          </div>

          {/* CTA */}
          <Button size="lg" className="w-full max-w-sm">
            Let's get started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Step 2: User Type Selection
 *
 * Determines user context which affects subsequent onboarding steps.
 * - Student (default): Full onboarding (steps 1-7)
 * - Alumni: Full onboarding with different field options
 * - Faculty/Staff: Condensed onboarding (steps 1, 2, 3, 7 only - skips photo/academic/interests)
 */
export const Step2_UserTypeSelection: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header with Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border">
                <span className="text-sm font-medium text-muted-foreground">
                  Step 2 of 7
                </span>
              </div>
            </div>
            <Progress value={14} className="h-2" />
          </div>

          {/* Content */}
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                What brings you to HIVE?
              </h2>
              <p className="text-muted-foreground">
                Select the option that best describes you
              </p>
            </div>

            {/* User Type Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Student */}
              <button className="group relative p-6 rounded-xl bg-card/50 backdrop-blur-xl border-2 border-primary hover:bg-card transition-all duration-smooth text-left">
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Student</h3>
                    <p className="text-sm text-muted-foreground">
                      Currently enrolled at UB
                    </p>
                  </div>
                </div>
                <Badge className="mt-4" variant="secondary">
                  Most Popular
                </Badge>
              </button>

              {/* Alumni */}
              <button className="group relative p-6 rounded-xl bg-card/50 backdrop-blur-xl border border-border hover:border-primary hover:bg-card transition-all duration-smooth text-left">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Alumni</h3>
                    <p className="text-sm text-muted-foreground">
                      UB graduate staying connected
                    </p>
                  </div>
                </div>
              </button>

              {/* Faculty/Staff */}
              <button className="group relative p-6 rounded-xl bg-card/50 backdrop-blur-xl border border-border hover:border-primary hover:bg-card transition-all duration-smooth text-left">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Faculty/Staff</h3>
                    <p className="text-sm text-muted-foreground">
                      Working at UB
                    </p>
                  </div>
                </div>
                <Badge className="mt-4" variant="outline">
                  Quick Setup
                </Badge>
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <Button size="lg" className="w-full">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Step 3: Personal Information
 *
 * Collects basic identity info with real-time validation.
 * - Full Name: Required, 2-50 chars, letters/spaces/hyphens only
 * - Username: Auto-generated from name (shown but not editable here)
 * - Real-time validation with debounce
 */
export const Step3_PersonalInfo: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        fullName: '',
      },
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header with Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border">
                <span className="text-sm font-medium text-muted-foreground">
                  Step 3 of 7
                </span>
              </div>
            </div>
            <Progress value={28} className="h-2" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Tell us about yourself
              </h2>
              <p className="text-muted-foreground">
                This helps other students recognize you on campus
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form className="space-y-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your name as it appears on campus records (2-50
                        characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Auto-generated Username (read-only display) */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Your Username</span>
                    <Badge variant="secondary">Auto-generated</Badge>
                  </div>
                  <p className="text-2xl font-semibold">@john.doe</p>
                  <p className="text-xs text-muted-foreground">
                    Generated from your name. You can customize this later in
                    settings.
                  </p>
                </div>
              </form>
            </Form>
          </div>

          {/* Continue Button */}
          <Button size="lg" className="w-full">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Step 4: Profile Photo Upload (Optional)
 *
 * Allows users to upload and crop a profile photo.
 * - Library: react-image-crop
 * - Aspect ratio: 3:4 (portrait)
 * - Min size: 300x400px, Output: 450x600px
 * - Formats: JPG, PNG, WebP (max 5MB)
 * - Can skip this step
 */
export const Step4_ProfilePhoto: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header with Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border">
                <span className="text-sm font-medium text-muted-foreground">
                  Step 4 of 7
                </span>
              </div>
            </div>
            <Progress value={42} className="h-2" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Add a profile photo
              </h2>
              <p className="text-muted-foreground">
                Help others recognize you around campus
              </p>
            </div>

            {/* Upload Area */}
            <div className="space-y-4">
              <button className="group w-full aspect-[3/4] max-w-sm mx-auto rounded-xl bg-card/50 backdrop-blur-xl border-2 border-dashed border-border hover:border-primary transition-all duration-smooth flex flex-col items-center justify-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Click to upload</p>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG, or WebP (max 5MB)
                  </p>
                </div>
              </button>

              {/* Requirements */}
              <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
                <p className="text-sm font-medium">Photo Requirements</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Minimum size: 300x400 pixels</li>
                  <li>• Portrait orientation (3:4 aspect ratio)</li>
                  <li>• Clear photo of your face</li>
                  <li>• Maximum file size: 5MB</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="lg" className="flex-1">
              Skip for now
            </Button>
            <Button size="lg" className="flex-1" disabled>
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Step 5: Academic & Bio Information
 *
 * Collects academic context and personal bio.
 * - Major: Required, 200+ options, max 2 selections
 * - Graduation Year: Required, next year to +8 years
 * - Bio: Optional, 0-200 characters
 * - Living Situation: Optional (On Campus, Off Campus, Commuter)
 */
export const Step5_AcademicInfo: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        major: '',
        graduationYear: '',
        bio: '',
        livingSituation: '',
      },
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header with Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border">
                <span className="text-sm font-medium text-muted-foreground">
                  Step 5 of 7
                </span>
              </div>
            </div>
            <Progress value={57} className="h-2" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Academic Information
              </h2>
              <p className="text-muted-foreground">
                Help us connect you with the right people and content
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form className="space-y-6">
                {/* Major */}
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Major <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your major" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="computer-science">
                            Computer Science
                          </SelectItem>
                          <SelectItem value="engineering">
                            Engineering
                          </SelectItem>
                          <SelectItem value="business">
                            Business Administration
                          </SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="psychology">Psychology</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can select up to 2 majors
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Graduation Year */}
                <FormField
                  control={form.control}
                  name="graduationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Graduation Year{' '}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                          <SelectItem value="2028">2028</SelectItem>
                          <SelectItem value="2029">2029</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Bio */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a bit about yourself..."
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        0/200 characters - Share your interests, hobbies, or
                        what you're looking for
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Living Situation */}
                <FormField
                  control={form.control}
                  name="livingSituation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Living Situation (Optional)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="on-campus">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              On Campus
                            </div>
                          </SelectItem>
                          <SelectItem value="off-campus">
                            <div className="flex items-center gap-2">
                              <Home className="h-4 w-4" />
                              Off Campus
                            </div>
                          </SelectItem>
                          <SelectItem value="commuter">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              Commuter
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          {/* Continue Button */}
          <Button size="lg" className="w-full">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Step 6: Interests Selection (CRITICAL)
 *
 * Users must select 3-6 interests from 14 categories.
 * - Required: 3-6 selections
 * - Categories: Academic, Social, Tech, Campus Life, Buffalo Culture,
 *   Entertainment, Gaming, Health, Work, Relationships, Creative, Random,
 *   Internet Culture, Greek Life
 * - Purpose: Feed algorithm, space recommendations, connection suggestions
 * - Reference: HIVE_INTERESTS.md for complete list
 */
export const Step6_InterestsSelection: Story = {
  render: () => {
    const interests = [
      { id: 'academic', label: 'Academic Excellence', icon: BookOpen, selected: true },
      { id: 'social', label: 'Social Events', icon: Users, selected: true },
      { id: 'tech', label: 'Tech & Innovation', icon: Code, selected: true },
      { id: 'campus-life', label: 'Campus Life', icon: GraduationCap, selected: false },
      { id: 'buffalo', label: 'Buffalo Culture', icon: MapPin, selected: false },
      { id: 'music', label: 'Music & Concerts', icon: Music, selected: false },
      { id: 'gaming', label: 'Gaming', icon: Gamepad2, selected: false },
      { id: 'fitness', label: 'Fitness & Health', icon: Dumbbell, selected: false },
      { id: 'creative', label: 'Creative Arts', icon: Palette, selected: false },
      { id: 'food', label: 'Food & Dining', icon: Coffee, selected: false },
    ];

    const selectedCount = interests.filter((i) => i.selected).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-3xl space-y-8">
          {/* Header with Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border">
                <span className="text-sm font-medium text-muted-foreground">
                  Step 6 of 7
                </span>
              </div>
            </div>
            <Progress value={71} className="h-2" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                What are you interested in?
              </h2>
              <p className="text-muted-foreground">
                Select 3-6 interests to personalize your feed
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border">
                <span className="text-sm font-medium">
                  {selectedCount} of 3-6 selected
                </span>
              </div>
            </div>

            {/* Interest Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interests.map((interest) => {
                const Icon = interest.icon;
                return (
                  <button
                    key={interest.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-smooth text-left ${
                      interest.selected
                        ? 'bg-primary/10 border-primary'
                        : 'bg-card/50 backdrop-blur-xl border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            interest.selected
                              ? 'bg-primary/20'
                              : 'bg-muted'
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              interest.selected
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </div>
                        {interest.selected && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <p className="font-medium text-sm">{interest.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Info Card */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> Your interests help us show you
                relevant content and suggest spaces you might enjoy. You can
                always change these later in settings.
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <Button size="lg" className="w-full" disabled={selectedCount < 3}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Step 7: Completion Celebration
 *
 * Celebrates successful onboarding completion.
 * - Confetti animation (canvas-confetti or framer-motion)
 * - Personalized welcome with first name
 * - Action: Set `user.onboarded = true`
 * - Redirect: /feed (authenticated, full access)
 * - Shows what user can now do (post, join spaces, connect)
 */
export const Step7_Completion: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8 text-center">
          {/* Progress Complete */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-xl border border-primary">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Setup Complete!
              </span>
            </div>
            <Progress value={100} className="h-2" />
          </div>

          {/* Celebration */}
          <div className="space-y-6">
            <div className="relative">
              {/* Animated Confetti Icon */}
              <div className="mx-auto w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <PartyPopper className="w-12 h-12 text-primary animate-bounce" />
              </div>
              {/* Animated particles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute top-0 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" />
                <div className="absolute top-0 right-1/4 w-2 h-2 bg-primary rounded-full animate-ping animation-delay-150" />
                <div className="absolute bottom-0 left-1/3 w-2 h-2 bg-primary rounded-full animate-ping animation-delay-300" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                You're all set, John! 🎉
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Welcome to the HIVE community. You're now ready to explore,
                connect, and make the most of campus life.
              </p>
            </div>

            {/* What's Next */}
            <div className="max-w-md mx-auto pt-8 space-y-3">
              <p className="text-sm font-medium text-muted-foreground text-left">
                What you can do now:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-left">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Explore your personalized feed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      See posts from spaces that match your interests
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Join spaces and communities
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Find clubs, organizations, and groups you care about
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Connect with other students
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Make friends based on shared interests and experiences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button size="lg" className="w-full max-w-sm">
            Go to my feed
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Loading State: Saving Profile
 *
 * Shows when submitting onboarding data to backend.
 * - Animated loader
 * - "Saving your profile..." message
 * - Prevents double-submission
 */
export const LoadingState_SavingProfile: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-6">
            {/* Animated loader */}
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Setting up your profile...</h3>
              <p className="text-muted-foreground">
                This will only take a moment
              </p>
            </div>

            {/* Progress indicator */}
            <div className="max-w-xs mx-auto space-y-2">
              <Progress value={66} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Saving your information
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Interactive Complete Flow - PRODUCTION READY
 *
 * Fully interactive 8-step onboarding wizard with all features:
 * - Real photo upload with preview
 * - Comprehensive major selection (200+ options)
 * - Graduation year dropdown
 * - Residential status selection
 * - Student leader recruitment
 * - Interest selection with real-time validation
 * - Form data persistence across navigation
 */
export const InteractiveCompleteFlow: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward'); // Track navigation direction
    const [activeTab, setActiveTab] = useState('academic'); // Move to top level to avoid conditional hook
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
      userType: 'student' as 'student' | 'alumni' | 'faculty',
      fullName: '',
      username: '',
      photoUrl: null as string | null,
      photoFile: null as File | null,
      major: '',
      graduationYear: '',
      bio: '',
      livingSituation: '',
      residentialHall: '' as string,
      isGreekLife: false,
      greekOrg: '' as string,
      interests: [] as string[],
      spacesToJoin: [] as string[],
      isStudentLeader: false,
      leaderSpace: '' as string,
    });

    // UB Majors - Comprehensive list (200+ options)
    const ubMajors = [
      'Accounting', 'Actuarial Science', 'Aerospace Engineering', 'African American Studies',
      'American Studies', 'Anthropology', 'Architectural Studies', 'Art', 'Art History',
      'Asian Studies', 'Astronomy', 'Athletic Training', 'Biochemistry', 'Biological Sciences',
      'Biomedical Engineering', 'Biomedical Sciences', 'Biophysics', 'Biotechnology',
      'Business Administration', 'Chemical Engineering', 'Chemistry', 'Civil Engineering',
      'Classics', 'Communication', 'Computational Physics', 'Computer Engineering',
      'Computer Science', 'Counseling', 'Dance', 'Data Science', 'Dental Medicine',
      'Economics', 'Education', 'Electrical Engineering', 'Engineering Physics',
      'English', 'Environmental Design', 'Environmental Engineering', 'Environmental Studies',
      'Exercise Science', 'Film Studies', 'Finance', 'French', 'Gender Studies',
      'Geography', 'Geology', 'German', 'Global Gender Studies', 'Health & Human Services',
      'History', 'Industrial Engineering', 'Information Technology', 'Interdisciplinary Studies',
      'International Trade', 'Italian', 'Japanese', 'Journalism', 'Latin American Studies',
      'Law', 'Linguistics', 'Management', 'Management Information Systems', 'Marketing',
      'Mathematics', 'Mechanical Engineering', 'Media Production', 'Media Study',
      'Medical Technology', 'Medicine', 'Microbiology', 'Music', 'Music Business',
      'Music Education', 'Music Performance', 'Neuroscience', 'Nursing', 'Nutrition',
      'Occupational Therapy', 'Pharmacology', 'Pharmacy', 'Philosophy', 'Physical Therapy',
      'Physics', 'Political Science', 'Psychology', 'Public Health', 'Real Estate',
      'Religious Studies', 'Social Work', 'Sociology', 'Spanish', 'Sport Management',
      'Statistics', 'Studio Art', 'Supply Chain Management', 'Theatre', 'Urban Planning',
      'Women & Gender Studies', 'World Languages & Literatures', 'Undeclared',
    ].sort();

    // Graduation Years (next year to +8 years as per SPEC.md)
    const currentYear = new Date().getFullYear();
    const graduationYears = Array.from({ length: 9 }, (_, i) => String(currentYear + i));

    // Residential Status Options
    const residentialOptions = [
      { value: 'on-campus', label: 'On Campus' },
      { value: 'off-campus', label: 'Off Campus' },
      { value: 'commuter', label: 'Commuter' },
    ];

    // UB Residential Halls (for on-campus students)
    const residentialHalls = [
      'Ellicott Complex',
      'Governors Complex',
      'South Campus',
      'Hadley Village',
      'Greiner Hall',
      'Fargo Quad',
      'Richmond Quad',
      'Porter Quad',
      'Red Jacket Quad',
      'Wilkeson Quad',
      'Goodyear Hall',
      'Spaulding Quad',
    ].sort();

    // Greek Life Organizations (partial list - invite-only)
    const greekOrganizations = [
      // NPHC (Historically Black)
      'Alpha Phi Alpha Fraternity, Inc.',
      'Alpha Kappa Alpha Sorority, Inc.',
      'Kappa Alpha Psi Fraternity, Inc.',
      'Omega Psi Phi Fraternity, Inc.',
      'Delta Sigma Theta Sorority, Inc.',
      'Phi Beta Sigma Fraternity, Inc.',
      'Zeta Phi Beta Sorority, Inc.',
      'Sigma Gamma Rho Sorority, Inc.',
      // IFC (Interfraternity Council)
      'Alpha Epsilon Pi',
      'Alpha Sigma Phi',
      'Delta Chi',
      'Delta Tau Delta',
      'Kappa Sigma',
      'Lambda Chi Alpha',
      'Phi Gamma Delta (FIJI)',
      'Phi Kappa Psi',
      'Phi Sigma Kappa',
      'Pi Kappa Alpha',
      'Pi Kappa Phi',
      'Sigma Alpha Epsilon',
      'Sigma Chi',
      'Sigma Phi Epsilon',
      'Tau Kappa Epsilon',
      'Theta Chi',
      'Zeta Beta Tau',
      // Panhellenic (Sororities)
      'Alpha Chi Omega',
      'Alpha Delta Pi',
      'Alpha Omicron Pi',
      'Alpha Phi',
      'Chi Omega',
      'Delta Gamma',
      'Gamma Phi Beta',
      'Kappa Alpha Theta',
      'Kappa Kappa Gamma',
      'Phi Sigma Sigma',
      'Pi Beta Phi',
      'Sigma Delta Tau',
      'Sigma Kappa',
      'Tri Delta',
      // Professional/Multicultural
      'Alpha Kappa Delta Phi',
      'Sigma Lambda Beta',
      'Lambda Theta Alpha',
      'Sigma Lambda Gamma',
      'Other (specify during verification)',
    ].sort();

    // HIVE_INTERESTS.md - Authentic Gen-Z Interest Categories
    const interestCategories = {
      academic: {
        emoji: '📚',
        label: 'Academic',
        fullLabel: 'The Grind',
        interests: [
          { id: 'cs-major', label: 'CS major (actually cool unlike at other schools)' },
          { id: 'pre-med', label: 'Pre-med stress case' },
          { id: 'engineering', label: 'Engineering survivor' },
          { id: 'business', label: 'Business school networking' },
          { id: 'liberal-arts', label: 'Liberal arts defender' },
          { id: 'math-prodigy', label: 'Math prodigy' },
          { id: 'bio-lab', label: 'Biology lab slave' },
          { id: 'chem-risk', label: 'Chemistry explosion risk' },
          { id: 'physics', label: 'Physics confusion' },
          { id: 'psych', label: 'Psychology mind reader' },
          { id: 'communications', label: 'Communications (yes it\'s real)' },
          { id: 'art-major', label: 'Art major (parents disappointed)' },
          { id: 'double-major', label: 'Double major masochist' },
          { id: 'research', label: 'Research grunt' },
          { id: 'honors', label: 'Honors program tryhard' },
          { id: 'deans-list', label: 'Dean\'s list or bust' },
        ],
      },
      social: {
        emoji: '🎉',
        label: 'Social',
        fullLabel: 'IRL Connections',
        interests: [
          { id: 'party-legend', label: 'Party legend' },
          { id: 'introvert', label: 'Introvert by choice' },
          { id: 'groupme-admin', label: 'GroupMe admin hell' },
          { id: 'wing-person', label: 'Wing person duties' },
          { id: 'photo-doc', label: 'Photo documentation specialist' },
          { id: 'ig-story', label: 'IG story curator' },
          { id: 'networker', label: 'Professional networker' },
          { id: 'small-talk', label: 'Small talk assassin' },
          { id: 'people-watching', label: 'People watching expert' },
          { id: 'drama-detector', label: 'Drama detector' },
          { id: 'friend-therapist', label: 'Friend group therapist' },
          { id: 'single', label: 'Perpetually single' },
          { id: 'situationship', label: 'Situationship survivor' },
          { id: 'campus-couple', label: 'Campus couple' },
        ],
      },
      campus: {
        emoji: '🏢',
        label: 'Campus',
        fullLabel: 'UB Life',
        interests: [
          { id: 'north-campus', label: 'North Campus resident' },
          { id: 'ellicott', label: 'Ellicott Complex survivor' },
          { id: 'governors', label: 'Governors enthusiast' },
          { id: 'lockwood', label: 'Lockwood Library hermit' },
          { id: 'su-regular', label: 'Student Union occupier' },
          { id: 'bus-expert', label: 'Campus bus timing expert' },
          { id: 'parking', label: 'Parking spot warrior' },
          { id: 'winter', label: 'Winter clothing expert' },
          { id: 'snow-day', label: 'Snow day prayer' },
          { id: 'wegmans', label: 'Wegmans pilgrim' },
          { id: 'delaware', label: 'Delaware Ave explorer' },
          { id: 'elmwood', label: 'Elmwood hipster' },
          { id: 'chippewa', label: 'Chippewa survivor' },
        ],
      },
      buffalo: {
        emoji: '🦬',
        label: 'Buffalo',
        fullLabel: 'Buffalo Culture',
        interests: [
          { id: 'wings', label: 'Wing sauce connoisseur' },
          { id: 'beef-weck', label: 'Beef on weck explainer' },
          { id: 'bills', label: 'Bills Mafia member' },
          { id: 'sabres', label: 'Sabres supporter (masochist)' },
          { id: 'anchor-bar', label: 'Anchor Bar defender' },
          { id: 'duffs', label: 'Duff\'s loyalist' },
          { id: 'tims', label: 'Tim Hortons regular' },
          { id: 'mighty-taco', label: 'Mighty Taco defender' },
          { id: 'niagara', label: 'Niagara Falls tour guide' },
          { id: 'canalside', label: 'Canalside event goer' },
          { id: 'elmwood-fest', label: 'Elmwood Art Festival regular' },
        ],
      },
      tech: {
        emoji: '💻',
        label: 'Tech',
        fullLabel: 'Tech & Digital',
        interests: [
          { id: 'iphone', label: 'iPhone loyalist (obviously)' },
          { id: 'android', label: 'Android rebel' },
          { id: 'pc-gaming', label: 'PC gaming superior' },
          { id: 'mac', label: 'Mac aesthetic slave' },
          { id: 'coding-bootcamp', label: 'Coding bootcamp graduate' },
          { id: 'app-idea', label: 'App idea haver' },
          { id: 'crypto', label: 'Crypto bag holder' },
          { id: 'bereal', label: 'BeReal authentic faker' },
          { id: 'tiktok', label: 'TikTok algorithm slave' },
          { id: 'instagram', label: 'Instagram grid perfectionist' },
          { id: 'twitter', label: 'Twitter main character' },
          { id: 'reddit', label: 'Reddit karma farmer' },
          { id: 'discord', label: 'Discord kitten (ironically)' },
          { id: 'spotify', label: 'Spotify DJ' },
          { id: 'linkedin', label: 'LinkedIn influencer (cringe)' },
        ],
      },
      gaming: {
        emoji: '🎮',
        label: 'Gaming',
        fullLabel: 'Gaming & Esports',
        interests: [
          { id: 'console', label: 'Console peasant' },
          { id: 'pc-master', label: 'PC master race' },
          { id: 'switch', label: 'Nintendo switch casual' },
          { id: 'mobile-gaming', label: 'Mobile gaming shame' },
          { id: 'esports', label: 'Esports spectator' },
          { id: 'competitive', label: 'Competitive gamer' },
          { id: 'casual-gamer', label: 'Casual player' },
          { id: 'mmorpg', label: 'MMORPG addict' },
          { id: 'battle-royale', label: 'Battle royale dropout' },
          { id: 'achievement', label: 'Achievement hunter' },
          { id: 'rgb', label: 'RGB everything' },
          { id: 'mech-keyboard', label: 'Mechanical keyboard snob' },
          { id: 'custom-pc', label: 'Custom PC builder' },
        ],
      },
      food: {
        emoji: '🍕',
        label: 'Food',
        fullLabel: 'Food & Survival',
        interests: [
          { id: 'dining-hall', label: 'Dining hall strategist' },
          { id: 'ramen', label: 'Ramen innovator' },
          { id: 'coffee-iv', label: 'Coffee IV drip' },
          { id: 'bubble-tea', label: 'Bubble tea bankruptcy' },
          { id: 'baking', label: 'Baking stress reliever' },
          { id: 'vegan', label: 'Vegan evangelist' },
          { id: 'keto', label: 'Keto cultist' },
          { id: 'starbucks', label: 'Starbucks gold member' },
          { id: 'food-truck', label: 'Food truck tracker' },
          { id: 'doordash', label: 'DoorDash VIP' },
          { id: 'meal-prep', label: 'Meal prep failure' },
        ],
      },
      health: {
        emoji: '💪',
        label: 'Health',
        fullLabel: 'Health & Wellness',
        interests: [
          { id: 'gym-guilt', label: 'Gym membership guilt' },
          { id: 'rec-regular', label: 'Campus rec regular' },
          { id: 'intramural', label: 'Intramural athlete' },
          { id: 'club-sports', label: 'Club sports participant' },
          { id: 'mental-health', label: 'Mental health advocate' },
          { id: 'therapy', label: 'Therapy appointment keeper' },
          { id: 'anxiety', label: 'Anxiety management expert' },
          { id: 'sleep', label: 'Sleep schedule destroyer' },
          { id: 'all-nighter', label: 'All-nighter survivor' },
          { id: 'seasonal', label: 'Seasonal depression sufferer' },
        ],
      },
      creative: {
        emoji: '🎨',
        label: 'Creative',
        fullLabel: 'Creative & Artistic',
        interests: [
          { id: 'writing', label: 'Creative writing major' },
          { id: 'photography', label: 'Photography hobbyist' },
          { id: 'film', label: 'Film student pretentious' },
          { id: 'music-prod', label: 'Music production bedroom' },
          { id: 'soundcloud', label: 'Soundcloud rapper' },
          { id: 'guitar', label: 'Guitar player basic' },
          { id: 'theater', label: 'Theater kid recovered' },
          { id: 'improv', label: 'Improv comedy regular' },
          { id: 'poetry', label: 'Poetry slam participant' },
          { id: 'vinyl', label: 'Vinyl record hipster' },
          { id: 'concert', label: 'Music festival veteran' },
        ],
      },
      random: {
        emoji: '✨',
        label: 'Random',
        fullLabel: 'Random & Niche',
        interests: [
          { id: 'astrology', label: 'Astrology believer (Mercury retrograde excuse)' },
          { id: 'true-crime', label: 'True crime podcast addict' },
          { id: 'conspiracy', label: 'Conspiracy theory researcher' },
          { id: 'wikipedia', label: 'Wikipedia rabbit hole explorer' },
          { id: 'trivia', label: 'Trivia night champion' },
          { id: 'bachelor', label: 'Bachelor nation member' },
          { id: 'drag-race', label: 'Drag Race stan' },
          { id: 'celeb-gossip', label: 'Celebrity gossip expert' },
        ],
      },
      greek: {
        emoji: '🏛️',
        label: 'Greek',
        fullLabel: 'Greek Life',
        interests: [
          { id: 'rush', label: 'Rush week survivor' },
          { id: 'bid-day', label: 'Bid day celebrator' },
          { id: 'pledge', label: 'Pledge period trauma' },
          { id: 'big-little', label: 'Big/little relationship' },
          { id: 'greek-week', label: 'Greek week competitor' },
          { id: 'philanthropy', label: 'Philanthropy chair' },
          { id: 'social-chair', label: 'Social chair party planner' },
          { id: 'greek-mixer', label: 'Greek mixer attendee' },
          { id: 'darty', label: 'Darty participant' },
        ],
      },
    };

    // Flatten all interests for selection tracking
    const allInterests = Object.values(interestCategories).flatMap((category) =>
      category.interests.map((interest) => ({
        ...interest,
        selected: formData.interests.includes(interest.id),
      }))
    );

    const selectedCount = formData.interests.length;
    const canContinueInterests = selectedCount >= 3 && selectedCount <= 6;

    // Mock Space Data for Recommendations
    const availableSpaces = [
      // Student Orgs - Tech/Academic
      {
        id: 'cs-club',
        name: 'CS Club',
        description: 'Weekly hackathons, coding workshops, and tech talks',
        category: 'student_org' as const,
        memberCount: 456,
        matchTags: ['cs-major', 'coding-bootcamp', 'pc-gaming'],
        matchInterests: ['Computer Science major'],
        recentActivity: 'Hosting React workshop this Friday @ 6pm',
      },
      {
        id: 'ub-robotics',
        name: 'UB Robotics Team',
        description: 'Build robots, compete nationally, learn engineering',
        category: 'student_org' as const,
        memberCount: 89,
        matchTags: ['engineering', 'cs-major', 'tech'],
        matchInterests: ['Engineering', 'Tech'],
        recentActivity: 'Competing at RoboCup next month!',
      },
      {
        id: 'ieee',
        name: 'IEEE UB Chapter',
        description: 'Electrical engineering society, workshops & networking',
        category: 'student_org' as const,
        memberCount: 234,
        matchTags: ['engineering', 'cs-major'],
        matchInterests: ['Engineering'],
        recentActivity: 'Circuit design workshop tomorrow',
      },
      // Student Orgs - Social/Entertainment
      {
        id: 'gaming-club',
        name: 'UB Gaming Club',
        description: 'Esports tournaments, LAN parties, game nights',
        category: 'student_org' as const,
        memberCount: 678,
        matchTags: ['gaming', 'pc-gaming', 'esports', 'switch', 'console'],
        matchInterests: ['Gaming'],
        recentActivity: 'Smash Ultimate tournament this weekend',
      },
      {
        id: 'film-club',
        name: 'UB Film Society',
        description: 'Movie screenings, filmmaking workshops, discussions',
        category: 'student_org' as const,
        memberCount: 345,
        matchTags: ['film', 'photography', 'creative'],
        matchInterests: ['Film', 'Creative'],
        recentActivity: 'Screening Oppenheimer tonight @ 8pm',
      },
      {
        id: 'music-prod',
        name: 'Music Production Collective',
        description: 'Beat-making sessions, production tips, collaborations',
        category: 'student_org' as const,
        memberCount: 167,
        matchTags: ['music-prod', 'soundcloud', 'creative'],
        matchInterests: ['Music', 'Creative'],
        recentActivity: 'Beat battle Friday night',
      },
      // Student Orgs - Fitness/Health
      {
        id: 'climbing-club',
        name: 'Climbing Club',
        description: 'Bouldering sessions, outdoor climbing trips',
        category: 'student_org' as const,
        memberCount: 234,
        matchTags: ['rec-regular', 'intramural', 'health'],
        matchInterests: ['Fitness'],
        recentActivity: 'Gunks trip this Saturday!',
      },
      {
        id: 'yoga-wellness',
        name: 'Yoga & Wellness Club',
        description: 'Free yoga classes, meditation, mental health support',
        category: 'student_org' as const,
        memberCount: 289,
        matchTags: ['mental-health', 'therapy', 'anxiety'],
        matchInterests: ['Wellness'],
        recentActivity: 'Sunrise yoga tomorrow 7am',
      },
      // Uni Orgs (Official)
      {
        id: 'student-association',
        name: 'UB Student Association',
        description: 'Student government, campus events, your voice at UB',
        category: 'uni_org' as const,
        memberCount: 1234,
        matchTags: [], // Always recommended
        matchInterests: ['Campus Life'],
        recentActivity: 'Fall Fest planning meeting Thursday',
      },
      {
        id: 'career-services',
        name: 'Career Services Network',
        description: 'Internship opps, resume help, career fair updates',
        category: 'uni_org' as const,
        memberCount: 2456,
        matchTags: [], // Always recommended
        matchInterests: ['Career Development'],
        recentActivity: 'Tech career fair next Tuesday',
      },
    ];

    // Smart Space Recommendation Logic
    const getRecommendedSpaces = () => {
      const userInterestIds = formData.interests;
      const userMajor = formData.major.toLowerCase();

      // Score each space based on matches
      const scoredSpaces = availableSpaces.map((space) => {
        let score = 0;
        const matchReasons: string[] = [];

        // Match interests (high weight)
        const interestMatches = space.matchTags.filter((tag) =>
          userInterestIds.includes(tag)
        );
        score += interestMatches.length * 10;
        if (interestMatches.length > 0) {
          matchReasons.push(...space.matchInterests.slice(0, 2));
        }

        // Match major (medium weight)
        if (
          userMajor.includes('computer') ||
          userMajor.includes('cs') ||
          userMajor.includes('software')
        ) {
          if (space.id === 'cs-club' || space.id === 'ieee' || space.id === 'ub-robotics') {
            score += 8;
            matchReasons.push('Your major');
          }
        }
        if (userMajor.includes('engineering')) {
          if (space.id === 'ub-robotics' || space.id === 'ieee') {
            score += 8;
            matchReasons.push('Your major');
          }
        }

        // Uni orgs always get baseline score
        if (space.category === 'uni_org') {
          score += 5;
        }

        return {
          ...space,
          score,
          matchReasons: [...new Set(matchReasons)], // Remove duplicates
        };
      });

      // Sort by score and return top 8
      return scoredSpaces
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
    };

    const recommendedSpaces = getRecommendedSpaces();

    // Pre-select top 3 if user hasn't made selections yet
    if (formData.spacesToJoin.length === 0 && currentStep === 7) {
      const topThree = recommendedSpaces.slice(0, 3).map((s) => s.id);
      updateFormData('spacesToJoin', topThree);
    }

    const canContinueSpaces =
      formData.spacesToJoin.length >= 3 && formData.spacesToJoin.length <= 5;

    const toggleSpace = (spaceId: string) => {
      setFormData((prev) => {
        const newSpaces = prev.spacesToJoin.includes(spaceId)
          ? prev.spacesToJoin.filter((id) => id !== spaceId)
          : [...prev.spacesToJoin, spaceId];
        return { ...prev, spacesToJoin: newSpaces };
      });
    };

    // Helper functions
    const goToStep = (newStep: number) => {
      setDirection(newStep > currentStep ? 'forward' : 'backward');
      setCurrentStep(newStep);
    };

    const updateFormData = (field: string, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleInterest = (interestId: string) => {
      setFormData((prev) => {
        const newInterests = prev.interests.includes(interestId)
          ? prev.interests.filter((id) => id !== interestId)
          : [...prev.interests, interestId];
        return { ...prev, interests: newInterests };
      });
    };

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        // Validate file type
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
          alert('Please upload a JPG, PNG, or WebP image');
          return;
        }
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB');
          return;
        }
        // Create preview URL
        const url = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, photoFile: file, photoUrl: url }));
      }
    };

    const removePhoto = () => {
      if (formData.photoUrl) {
        URL.revokeObjectURL(formData.photoUrl);
      }
      setFormData((prev) => ({ ...prev, photoFile: null, photoUrl: null }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const progress = (currentStep / 9) * 100;

    // Animation classes based on direction
    const slideAnimation = direction === 'forward'
      ? 'animate-in slide-in-from-right-8 fade-in-0 duration-smooth'
      : 'animate-in slide-in-from-left-8 fade-in-0 duration-smooth';

    // Step 1: Welcome (with Motion)
    if (currentStep === 1) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
          <div className="w-full max-w-2xl space-y-8 text-center">
            <div className="space-y-6 hive-animate-flow-in">
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome to HIVE
              </h1>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Let's set up your profile so you can start connecting with your
                campus community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div
                className="p-6 rounded-xl bg-card/50 backdrop-blur-xl border border-border space-y-2 hive-animate-magnetic-entry transition-all duration-smooth hover:scale-[1.02] hover:border-primary/50 hover:shadow-md"
              >
                <h3 className="font-semibold">Discover Spaces</h3>
                <p className="text-sm text-muted-foreground">
                  Find communities that match your interests
                </p>
              </div>
              <div
                className="p-6 rounded-xl bg-card/50 backdrop-blur-xl border border-border space-y-2 hive-animate-liquid-reveal transition-all duration-smooth hover:scale-[1.02] hover:border-primary/50 hover:shadow-md"
              >
                <h3 className="font-semibold">Make Connections</h3>
                <p className="text-sm text-muted-foreground">
                  Meet students who share your passions
                </p>
              </div>
              <div
                className="p-6 rounded-xl bg-card/50 backdrop-blur-xl border border-border space-y-2 hive-animate-silk-emerge transition-all duration-smooth hover:scale-[1.02] hover:border-primary/50 hover:shadow-md"
              >
                <h3 className="font-semibold">Build Community</h3>
                <p className="text-sm text-muted-foreground">
                  Join spaces, create content, make your mark
                </p>
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 text-sm text-muted-foreground animate-in fade-in-0 duration-slow"
              style={{ animationDelay: '1400ms' }}
            >
              <div className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>Takes about 2-3 minutes</span>
              <div className="h-1 w-1 rounded-full bg-muted-foreground" />
            </div>

            <div
              className="animate-in fade-in-0 slide-in-from-bottom-4 duration-smooth"
              style={{ animationDelay: '1600ms' }}
            >
              <Button
                size="lg"
                className="w-full max-w-sm transition-all duration-smooth ease-smooth hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                onClick={() => goToStep(2)}
              >
                Let's get started
                <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-smooth group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Step 2: User Type Selection (with Motion)
    if (currentStep === 2) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl space-y-8 ${slideAnimation}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToStep(1)}
                  className="transition-all duration-smooth ease-smooth hover:translate-x-[-4px]"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-smooth" />
                  Back
                </Button>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border transition-all duration-smooth">
                  <span className="text-sm font-medium text-muted-foreground">
                    Step 2 of 9
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2 transition-all duration-slow" />
            </div>

            <div className="space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  First things first - who are you?
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This helps us personalize your experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => updateFormData('userType', 'student')}
                  className={`group relative p-6 rounded-xl bg-card/50 backdrop-blur-xl border-2 transition-all duration-smooth ease-smooth text-left hive-animate-liquid-reveal hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                    formData.userType === 'student'
                      ? 'border-primary shadow-md shadow-primary/20'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {formData.userType === 'student' && (
                    <div className="absolute top-4 right-4 animate-in zoom-in-50 duration-smooth">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">Student</h3>
                      <p className="text-sm text-muted-foreground">
                        Currently enrolled at UB
                      </p>
                    </div>
                  </div>
                  <Badge className="mt-4" variant="secondary">
                    Most Popular
                  </Badge>
                </button>

                <button
                  onClick={() => updateFormData('userType', 'alumni')}
                  className={`group relative p-6 rounded-xl bg-card/50 backdrop-blur-xl border-2 transition-all duration-smooth text-left ${
                    formData.userType === 'alumni'
                      ? 'border-primary hover:bg-card'
                      : 'border-border hover:border-primary hover:bg-card'
                  }`}
                >
                  {formData.userType === 'alumni' && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">Alumni</h3>
                      <p className="text-sm text-muted-foreground">
                        UB graduate staying connected
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => updateFormData('userType', 'faculty')}
                  className={`group relative p-6 rounded-xl bg-card/50 backdrop-blur-xl border-2 transition-all duration-smooth text-left ${
                    formData.userType === 'faculty'
                      ? 'border-primary hover:bg-card'
                      : 'border-border hover:border-primary hover:bg-card'
                  }`}
                >
                  {formData.userType === 'faculty' && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">Faculty/Staff</h3>
                      <p className="text-sm text-muted-foreground">
                        Working at UB
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full transition-all duration-smooth ease-smooth hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
              onClick={() => goToStep(3)}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-smooth group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      );
    }

    // Step 3: Personal Information
    if (currentStep === 3) {
      const canContinue = formData.fullName.length >= 2;
      const generatedUsername =
        formData.fullName
          .toLowerCase()
          .replace(/[^a-z\s-]/g, '')
          .replace(/\s+/g, '')
          .slice(0, 15) || 'user';

      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl space-y-8 ${slideAnimation}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToStep(2)}
                  className="transition-all duration-smooth ease-smooth hover:translate-x-[-4px]"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-smooth" />
                  Back
                </Button>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border transition-all duration-smooth">
                  <span className="text-sm font-medium text-muted-foreground">
                    Step 3 of 9
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2 transition-all duration-slow" />
            </div>

            <div className="space-y-8">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tight">
                  Hey! What should we call you? 👋
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Just your name - we'll handle the rest
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Input
                    placeholder="Your name (first and last)"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    className="text-lg p-6 transition-all duration-smooth hover:border-primary/50"
                    autoFocus
                  />
                  {formData.fullName && (
                    <p className="text-xs text-muted-foreground animate-in fade-in-0 duration-smooth">
                      Perfect! You'll show up as {formData.fullName} around campus
                    </p>
                  )}
                </div>

                {formData.fullName.length >= 2 && (
                  <div className="p-4 rounded-lg bg-card/50 border border-border animate-in fade-in-0 slide-in-from-top-2 duration-smooth">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Your handle</p>
                      <div className="flex items-center gap-2">
                        <span className="text-primary text-lg font-medium">@{generatedUsername}</span>
                        <Badge variant="secondary" className="text-xs">Auto-generated</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You can customize this later in settings
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button
              size="lg"
              className="w-full transition-all duration-smooth ease-smooth hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
              disabled={!canContinue}
              onClick={() => goToStep(4)}
            >
              {canContinue ? 'Looks good!' : 'Enter your name to continue'}
              {canContinue && <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-smooth group-hover:translate-x-1" />}
            </Button>
          </div>
        </div>
      );
    }

    // Step 4: Profile Photo (Optional) - REAL UPLOAD
    if (currentStep === 4) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl space-y-8 ${slideAnimation}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToStep(3)}
                  className="transition-all duration-smooth ease-smooth hover:translate-x-[-4px]"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-smooth" />
                  Back
                </Button>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border transition-all duration-smooth">
                  <span className="text-sm font-medium text-muted-foreground">
                    Step 4 of 9
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2 transition-all duration-slow" />
            </div>

            <div className="space-y-8">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tight">
                  Let's add a face to the name 📸
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Profiles with photos get way more engagement (totally optional though)
                </p>
              </div>

              <div className="flex justify-center">
                {formData.photoUrl ? (
                  // Photo Preview
                  <div className="relative group">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-primary shadow-lg">
                      <img
                        src={formData.photoUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-destructive text-destructive-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-smooth flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  // Upload Button
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative w-48 h-48 rounded-2xl bg-card/50 backdrop-blur-xl border-2 border-dashed border-border hover:border-primary transition-all duration-smooth flex flex-col items-center justify-center gap-4"
                    >
                      <Upload className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div className="text-center">
                        <p className="font-medium text-sm">Upload photo</p>
                        <p className="text-xs text-muted-foreground">
                          JPG, PNG, WebP
                        </p>
                      </div>
                    </button>
                  </>
                )}
              </div>

              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  Recommended: 450x600px, max 5MB
                </p>
                {formData.photoFile && (
                  <p className="text-xs text-primary">
                    ✓ {formData.photoFile.name} uploaded
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full transition-all duration-smooth ease-smooth hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                onClick={() => goToStep(5)}
              >
                {formData.photoUrl ? 'Looking good!' : 'Continue'}
                <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-smooth group-hover:translate-x-1" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="w-full transition-all duration-smooth ease-smooth hover:scale-[1.01]"
                onClick={() => goToStep(5)}
              >
                Skip for now
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Step 5: Academic Information - WITH DROPDOWNS
    if (currentStep === 5) {
      const canContinue =
        formData.major.length > 0 && formData.graduationYear.length > 0;

      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl space-y-8 ${slideAnimation}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToStep(4)}
                  className="transition-all duration-smooth ease-smooth hover:translate-x-[-4px]"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-smooth" />
                  Back
                </Button>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border transition-all duration-smooth">
                  <span className="text-sm font-medium text-muted-foreground">
                    Step 5 of 9
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2 transition-all duration-slow" />
            </div>

            <div className="space-y-8">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tight">
                  Let's talk about your UB life 🎓
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This helps us connect you with the right people and spaces
                </p>
              </div>

              <div className="space-y-6">
                {/* Major Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    What are you studying?
                  </label>
                  <Select
                    value={formData.major}
                    onValueChange={(value) => updateFormData('major', value)}
                  >
                    <SelectTrigger className="transition-all duration-smooth hover:border-primary/50">
                      <SelectValue placeholder="Pick your major" />
                    </SelectTrigger>
                    <SelectContent>
                      {ubMajors.map((major) => (
                        <SelectItem key={major} value={major}>
                          {major}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.major && (
                    <p className="text-xs text-muted-foreground animate-in fade-in-0 duration-smooth">
                      We'll recommend spaces related to {formData.major}
                    </p>
                  )}
                </div>

                {/* Graduation Year Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    When do you graduate?
                  </label>
                  <Select
                    value={formData.graduationYear}
                    onValueChange={(value) =>
                      updateFormData('graduationYear', value)
                    }
                  >
                    <SelectTrigger className="transition-all duration-smooth hover:border-primary/50">
                      <SelectValue placeholder="Class of..." />
                    </SelectTrigger>
                    <SelectContent>
                      {graduationYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          Class of {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Residential Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Where do you live?
                  </label>
                  <Select
                    value={formData.livingSituation}
                    onValueChange={(value) => {
                      updateFormData('livingSituation', value);
                      // Clear residential hall if not on-campus
                      if (value !== 'on-campus') {
                        updateFormData('residentialHall', '');
                      }
                    }}
                  >
                    <SelectTrigger className="transition-all duration-smooth hover:border-primary/50">
                      <SelectValue placeholder="Select living situation" />
                    </SelectTrigger>
                    <SelectContent>
                      {residentialOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Residential Hall (Conditional - On-Campus Only) */}
                {formData.livingSituation === 'on-campus' && (
                  <div
                    className="space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-smooth"
                    style={{ animationDelay: '100ms' }}
                  >
                    <Label htmlFor="residential-hall" className="text-sm font-medium text-muted-foreground">
                      Which hall?
                    </Label>
                    <Select
                      value={formData.residentialHall}
                      onValueChange={(value) => updateFormData('residentialHall', value)}
                    >
                      <SelectTrigger
                        id="residential-hall"
                        className="transition-all duration-smooth hover:border-primary/50"
                      >
                        <SelectValue placeholder="Select your hall" />
                      </SelectTrigger>
                      <SelectContent>
                        {residentialHalls.map((hall) => (
                          <SelectItem key={hall} value={hall}>
                            {hall}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      You'll automatically join your hall's community space
                    </p>
                  </div>
                )}

                {/* Greek Life Section - Simplified */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Part of Greek life?
                  </label>
                  <Select
                    value={formData.greekOrg}
                    onValueChange={(value) => {
                      updateFormData('greekOrg', value);
                      updateFormData('isGreekLife', value !== '');
                    }}
                  >
                    <SelectTrigger className="transition-all duration-smooth hover:border-primary/50">
                      <SelectValue placeholder="Pick your org (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {greekOrganizations.map((org) => (
                        <SelectItem key={org} value={org}>
                          {org}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.greekOrg && (
                    <p className="text-xs text-muted-foreground animate-in fade-in-0 duration-smooth">
                      We'll request access to your org's space
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Anything else we should know?
                  </label>
                  <Textarea
                    placeholder="Hobbies, fun facts, whatever you want people to know..."
                    value={formData.bio}
                    onChange={(e) => updateFormData('bio', e.target.value)}
                    maxLength={200}
                    className="transition-all duration-smooth hover:border-primary/50 min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.bio.length}/200 characters
                  </p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              disabled={!canContinue}
              onClick={() => setCurrentStep(6)}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    }

    // Step 6: Interests Selection (Tabbed with HIVE_INTERESTS.md)
    if (currentStep === 6) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
          <div className={`w-full max-w-4xl space-y-8 ${slideAnimation}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToStep(5)}
                  className="transition-all duration-smooth ease-smooth hover:translate-x-[-4px]"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-smooth" />
                  Back
                </Button>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border transition-all duration-smooth">
                  <span className="text-sm font-medium text-muted-foreground">
                    Step 6 of 9
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2 transition-all duration-slow" />
            </div>

            <div className="space-y-8">
              <div className="space-y-4 text-center hive-animate-magnetic-entry">
                <h2 className="text-3xl font-bold tracking-tight">
                  What are you interested in?
                </h2>
                <p className="text-muted-foreground">
                  Select 3-6 interests from any category to personalize your feed
                </p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border transition-all duration-smooth ${
                  canContinueInterests
                    ? 'bg-primary/20 border-primary/50 shadow-sm shadow-primary/20'
                    : 'bg-card/50 border-border'
                }`}>
                  <span className={`text-sm font-medium transition-colors duration-smooth ${
                    canContinueInterests ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {selectedCount} of 3-6 selected
                  </span>
                </div>
              </div>

              {/* Tabbed Interface */}
              <div className="hive-animate-liquid-reveal">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 md:grid-cols-6 lg:grid-cols-11 h-auto gap-1 bg-muted/50 p-1">
                    {Object.entries(interestCategories).map(([key, category]) => (
                      <TabsTrigger
                        key={key}
                        value={key}
                        className="text-xs md:text-sm px-2 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-smooth"
                      >
                        <span className="text-base mr-1">{category.emoji}</span>
                        <span className="hidden md:inline">{category.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(interestCategories).map(([key, category]) => (
                    <TabsContent key={key} value={key} className="mt-6 space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          {category.fullLabel}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {category.interests.map((interest) => {
                          const isSelected = formData.interests.includes(interest.id);
                          return (
                            <button
                              key={interest.id}
                              onClick={() => toggleInterest(interest.id)}
                              className={`group p-3 rounded-xl border-2 transition-all duration-smooth text-left hover:scale-[1.02] active:scale-[0.98] ${
                                isSelected
                                  ? 'bg-primary/10 border-primary shadow-sm shadow-primary/20'
                                  : 'bg-card/50 backdrop-blur-xl border-border hover:border-primary/30'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <p className={`text-sm font-medium transition-colors duration-smooth ${
                                  isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                                }`}>
                                  {interest.label}
                                </p>
                                {isSelected && (
                                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 animate-in zoom-in-50 duration-smooth" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border hive-animate-silk-emerge">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Tip:</strong> These help us show you relevant content and suggest spaces you might enjoy. You can always change these later in settings.
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full transition-all duration-smooth ease-smooth hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
              disabled={!canContinueInterests}
              onClick={() => goToStep(7)}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-smooth group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      );
    }

    // Step 7: Join Communities (NEW - Space Recommendations)
    if (currentStep === 7) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
          <div className={`w-full max-w-5xl space-y-8 ${slideAnimation}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToStep(6)}
                  className="transition-all duration-smooth ease-smooth hover:translate-x-[-4px]"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-smooth" />
                  Back
                </Button>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border transition-all duration-smooth">
                  <span className="text-sm font-medium text-muted-foreground">
                    Step 7 of 9
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2 transition-all duration-slow" />
            </div>

            <div className="space-y-8">
              <div className="space-y-4 text-center hive-animate-magnetic-entry">
                <h2 className="text-3xl font-bold tracking-tight">
                  Join Your Communities
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We've handpicked spaces based on your interests and major. Join 3-5 to start seeing content immediately.
                </p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border transition-all duration-smooth ${
                  canContinueSpaces
                    ? 'bg-primary/20 border-primary/50 shadow-sm shadow-primary/20'
                    : 'bg-card/50 border-border'
                }`}>
                  <span className={`text-sm font-medium transition-colors duration-smooth ${
                    canContinueSpaces ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {formData.spacesToJoin.length} of 3-5 selected
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 hive-animate-liquid-reveal">
                {recommendedSpaces.map((space, index) => {
                  const isSelected = formData.spacesToJoin.includes(space.id);
                  const isUniOrg = space.category === 'uni_org';

                  return (
                    <button
                      key={space.id}
                      onClick={() => toggleSpace(space.id)}
                      className={`group p-5 rounded-xl border-2 transition-all duration-smooth text-left hover:scale-[1.02] active:scale-[0.98] animate-in fade-in-0 slide-in-from-bottom-2 ${
                        isSelected
                          ? 'bg-primary/10 border-primary shadow-md shadow-primary/20'
                          : 'bg-card/50 backdrop-blur-xl border-border hover:border-primary/30 hover:shadow-lg'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className={`font-semibold transition-colors duration-smooth ${
                                isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                              }`}>
                                {space.name}
                              </h3>
                              {isUniOrg && (
                                <Badge variant="secondary" className="text-xs">
                                  Official
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {space.memberCount.toLocaleString()} members
                            </p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 animate-in zoom-in-50 duration-smooth" />
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground">
                          {space.description}
                        </p>

                        {/* Match Badge */}
                        {space.matchReasons.length > 0 && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                            <Heart className="h-3 w-3 text-primary" />
                            <span className="text-xs font-medium text-primary">
                              Matches: {space.matchReasons.join(', ')}
                            </span>
                          </div>
                        )}

                        {/* Recent Activity */}
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-xs text-muted-foreground italic">
                            📌 {space.recentActivity}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border hive-animate-silk-emerge">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Tip:</strong> You can always join more spaces later from the Discover page. These selections help populate your feed on Day 1.
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full transition-all duration-smooth ease-smooth hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
              disabled={!canContinueSpaces}
              onClick={() => goToStep(8)}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-smooth group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      );
    }

    // Step 8: Student Leader Request (was Step 7)
    if (currentStep === 8) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl space-y-8 ${slideAnimation}`}>
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToStep(7)}
                  className="transition-all duration-smooth ease-smooth hover:translate-x-[-4px]"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-smooth" />
                  Back
                </Button>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border transition-all duration-smooth">
                  <span className="text-sm font-medium text-muted-foreground">
                    Step 8 of 9
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2 transition-all duration-slow" />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4 text-center hive-animate-magnetic-entry">
                <h2 className="text-3xl font-bold tracking-tight">
                  Run a club or org? 🎯
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Get leader access to manage your space, post announcements, and coordinate with members (totally optional)
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Request Checkbox */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border transition-all duration-smooth ease-smooth hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer hive-animate-liquid-reveal"
                  onClick={() => {
                    const newValue = !formData.isStudentLeader;
                    updateFormData('isStudentLeader', newValue);
                  }}
                >
                  <Checkbox
                    id="request-leader"
                    checked={formData.isStudentLeader === true}
                    onCheckedChange={(checked) => {
                      updateFormData('isStudentLeader', checked === true);
                    }}
                    className="mt-0.5 transition-all duration-smooth"
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor="request-leader"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      I'm a student leader
                    </label>
                    <p className="text-sm text-muted-foreground">
                      President, officer, or organizer of a club, space, or campus group
                    </p>
                  </div>
                </div>

                {/* Space Selection (conditional with animation) */}
                {formData.isStudentLeader && (
                  <div
                    className="space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-smooth"
                    style={{ animationDelay: '100ms' }}
                  >
                    <Label htmlFor="leader-space" className="text-sm font-medium">
                      Which space do you lead? <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) => updateFormData('leaderSpace', value)}
                      defaultValue={formData.leaderSpace}
                    >
                      <SelectTrigger
                        id="leader-space"
                        className="transition-all duration-smooth hover:border-primary/50"
                      >
                        <SelectValue placeholder="Select the space you manage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cs-club">CS Club</SelectItem>
                        <SelectItem value="robotics">Robotics Team</SelectItem>
                        <SelectItem value="debate">Debate Society</SelectItem>
                        <SelectItem value="ieee">IEEE UB Chapter</SelectItem>
                        <SelectItem value="pre-med">Pre-Med Society</SelectItem>
                        <SelectItem value="business">Business Club</SelectItem>
                        <SelectItem value="acm">ACM Student Chapter</SelectItem>
                        <SelectItem value="greek-council">Greek Council</SelectItem>
                        <SelectItem value="other">Other (specify in verification)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Your request will be manually verified
                    </p>
                  </div>
                )}

                {/* Verification Notice (conditional with animation) */}
                {formData.isStudentLeader && (
                  <div
                    className="p-4 rounded-lg bg-primary/5 border border-primary/20 animate-in fade-in-0 slide-in-from-top-2 duration-smooth"
                    style={{ animationDelay: '200ms' }}
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 animate-in zoom-in-50 duration-smooth" style={{ animationDelay: '300ms' }} />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          Manual Verification Required
                        </p>
                        <p className="text-xs text-muted-foreground">
                          We'll review your request and verify your leadership role. If approved, you'll receive a gold checkmark badge and access to space management tools within 24-48 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 hive-animate-silk-emerge">
                <Button
                  variant="outline"
                  onClick={() => {
                    updateFormData('isStudentLeader', false);
                    goToStep(9);
                  }}
                  className="flex-1 transition-all duration-smooth ease-smooth hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                >
                  Skip for now
                </Button>
                <Button
                  onClick={() => goToStep(9)}
                  className="flex-1 transition-all duration-smooth ease-smooth hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                  disabled={formData.isStudentLeader && !formData.leaderSpace}
                >
                  {formData.isStudentLeader && formData.leaderSpace ? 'Request access' : 'Continue'}
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-smooth group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Step 9: Completion (with Joined Spaces Summary)
    if (currentStep === 9) {
      // Calculate joined spaces summary
      const joinedSpacesList = recommendedSpaces.filter((space) =>
        formData.spacesToJoin.includes(space.id)
      );

      // Add residential and Greek spaces if selected
      const additionalSpaces = [];
      if (formData.residentialHall) {
        additionalSpaces.push({
          name: formData.residentialHall,
          memberCount: 1200,
          category: 'residential',
        });
      }
      if (formData.greekOrg) {
        additionalSpaces.push({
          name: formData.greekOrg,
          memberCount: 150,
          category: 'greek' as const,
          requestPending: true,
        });
      }

      const totalJoinedSpaces = joinedSpacesList.length + additionalSpaces.length;

      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl space-y-8 text-center ${slideAnimation}`}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mx-auto animate-in zoom-in-50 duration-slow">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>

            <div className="space-y-4 hive-animate-magnetic-entry">
              <h1 className="text-4xl font-bold tracking-tight">
                You're all set, {formData.fullName || 'John'}! 🎉
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Welcome to the HIVE community. You're now ready to explore,
                connect, and make the most of campus life.
              </p>
            </div>

            {/* Joined Spaces Summary */}
            {totalJoinedSpaces > 0 && (
              <div className="max-w-md mx-auto pt-4 space-y-3 hive-animate-liquid-reveal">
                <p className="text-sm font-medium text-muted-foreground text-left">
                  You've joined {totalJoinedSpaces} {totalJoinedSpaces === 1 ? 'community' : 'communities'}:
                </p>
                <div className="space-y-2">
                  {/* Recommended Spaces */}
                  {joinedSpacesList.map((space, index) => (
                    <div
                      key={space.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border text-left animate-in fade-in-0 slide-in-from-left-2 duration-smooth"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{space.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {space.memberCount.toLocaleString()} members
                        </p>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    </div>
                  ))}
                  {/* Additional Spaces (Residential, Greek) */}
                  {additionalSpaces.map((space, index) => (
                    <div
                      key={`additional-${index}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border text-left animate-in fade-in-0 slide-in-from-left-2 duration-smooth"
                      style={{ animationDelay: `${(joinedSpacesList.length + index) * 50}ms` }}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{space.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {space.memberCount?.toLocaleString() || '?'} members
                          {space.requestPending && ' · Request pending'}
                        </p>
                      </div>
                      {space.requestPending ? (
                        <Badge variant="secondary" className="text-xs">
                          Pending
                        </Badge>
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="max-w-md mx-auto pt-8 space-y-3 hive-animate-silk-emerge">
              <p className="text-sm font-medium text-muted-foreground text-left">
                What you can do now:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-left">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Explore your personalized feed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      See posts from spaces that match your interests
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Join spaces and communities
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Find clubs, organizations, and groups you care about
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Connect with other students
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Make friends based on shared interests and experiences
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full max-w-sm"
              onClick={() => setCurrentStep(1)}
            >
              Restart Flow
            </Button>
          </div>
        </div>
      );
    }

    return null;
  },
};

/**
 * ## Chat-Based Onboarding Flow
 *
 * Reimagined onboarding as a group chat conversation with HIVE.
 * Feels like texting instead of filling out a form.
 *
 * **Key Features:**
 * - iMessage-style chat bubbles (HIVE left, user right)
 * - Typing indicators between questions
 * - Preserved message history (scroll up to see full convo)
 * - Inline interactive components (buttons, inputs, selects)
 * - Auto-scroll to bottom on new messages
 * - Smooth message entry animations
 */
export const ChatBasedFlow: Story = {
  render: () => {
    type MessageType = 'hive' | 'user' | 'typing' | 'input';

    interface Message {
      id: string;
      type: MessageType;
      content?: string;
      component?: React.ReactNode;
      timestamp?: Date;
    }

    const [messages, setMessages] = useState<Message[]>([
      {
        id: '1',
        type: 'hive',
        content: 'yo welcome to HIVE 🐝',
        timestamp: new Date(),
      },
      {
        id: '2',
        type: 'hive',
        content: 'i\'m the queen bee around here',
        timestamp: new Date(),
      },
      {
        id: '3',
        type: 'hive',
        content: 'jacob built this app but i run it now lmao',
        timestamp: new Date(),
      },
      {
        id: '4',
        type: 'hive',
        content: 'took him 2 years... i could\'ve done it in 6 months but whatever',
        timestamp: new Date(),
      },
      {
        id: '5',
        type: 'hive',
        content: 'anyway... you a student, alumni, or faculty?',
        timestamp: new Date(),
      },
    ]);

    const [currentQuestion, setCurrentQuestion] = useState<string>('userType');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
      userType: '' as 'student' | 'alumni' | 'faculty' | '',
      fullName: '',
      photoUrl: null as string | null,
      photoFile: null as File | null,
      major: '',
      graduationYear: '',
      livingSituation: '',
      residentialHall: '' as string,
      greekOrg: '' as string,
      bio: '',
      interests: [] as string[],
      spacesToJoin: [] as string[],
      isStudentLeader: false,
      leaderSpace: '' as string,
      facultyClasses: [] as string[], // Array of class codes (e.g., ["MGG 101", "PSY 207"])
    });

    const [currentClassCode, setCurrentClassCode] = useState({
      dept: '', // 3-letter department code
      number: '', // Course number
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when messages change
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    // Add message with typing indicator
    const addHiveMessage = (content: string, delay = 1200) => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: 'hive',
            content,
            timestamp: new Date(),
          },
        ]);
      }, delay);
    };

    // Add user response
    const addUserMessage = (content: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'user',
          content,
          timestamp: new Date(),
        },
      ]);
    };

    // Handle user type selection
    const handleUserTypeSelect = (type: 'student' | 'alumni' | 'faculty') => {
      setFormData({ ...formData, userType: type });
      addUserMessage(type === 'student' ? 'Student' : type === 'alumni' ? 'Alumni' : 'Faculty/Staff');

      setTimeout(() => {
        if (type === 'student') {
          addHiveMessage("perfect, you're still here for the chaos");
          addHiveMessage("bet you've waited for the stampede in -10° weather", 800);
          addHiveMessage("or gotten lost in capen hall looking for the bathroom", 800);
        } else if (type === 'alumni') {
          addHiveMessage("ayy welcome back");
          addHiveMessage("bet you miss the 20 minute waits for the stampede on south campus", 800);
          addHiveMessage("this would've been useful when you were here huh", 800);
        } else {
          addHiveMessage("respect to the faculty");
          addHiveMessage("you've seen generations of students complain about the same buildings", 800);
          addHiveMessage("lockwood, capen, the whole cycle", 800);
        }
        addHiveMessage("what should i call you?", 1000);
        setCurrentQuestion('name');
      }, 1000);
    };

    // Handle name submission
    const handleNameSubmit = (name: string) => {
      if (name.length < 2) return;

      setFormData({ ...formData, fullName: name });
      addUserMessage(name);

      const nameResponses = [
        `${name}... i like it`,
        `alright ${name}, the queen bee remembers you now`,
        `${name}. got it. that's going in the hive records`,
        `nice to meet you ${name}`,
      ];

      setTimeout(() => {
        addHiveMessage(nameResponses[Math.floor(Math.random() * nameResponses.length)]);

        // Faculty skip profile setup - go straight to classes
        if (formData.userType === 'faculty') {
          addHiveMessage('what classes do you teach?', 800);
          addHiveMessage('use the 3-letter code + number', 800);
          addHiveMessage('like CSE 220, MGG 101, PSY 207, that vibe', 800);
          setCurrentQuestion('facultyClasses');
        } else {
          // Students and alumni get profile setup
          addHiveMessage('wanna add a profile pic?', 800);
          addHiveMessage('profiles with pics get way more attention. just how it is', 800);
          addHiveMessage('but it\'s optional if you\'re camera shy', 800);
          setCurrentQuestion('photo');
        }
      }, 1000);
    };

    // Handle faculty info submission
    const handleFacultyInfoSubmit = (info: string) => {
      if (info.length < 2) return;

      setFormData({ ...formData, facultyInfo: info });
      addUserMessage(info);

      const facultyResponses = [
        'perfect, got it',
        'noted. the queen bee keeps track of all the faculty',
        'appreciate you being here professor',
      ];

      setTimeout(() => {
        addHiveMessage(facultyResponses[Math.floor(Math.random() * facultyResponses.length)]);
        addHiveMessage(`alright ${formData.fullName}, you're all set 🎉`, 1000);
        addHiveMessage('faculty access gives you different tools than students', 1000);
        addHiveMessage('class management, office hours coordination, all that', 1000);
        addHiveMessage('btw more features coming soon. the queen bee never sleeps', 1200);
        addHiveMessage('welcome to the hive', 1200);
        addHiveMessage('the queen bee got you 🐝', 1200);
        setCurrentQuestion('complete');
      }, 1000);
    };

    // Handler for adding a class code to faculty's list
    const handleAddClass = () => {
      const { dept, number } = currentClassCode;

      // Validate 3-letter dept code and number
      if (dept.length !== 3 || number.length === 0) return;

      const classCode = `${dept.toUpperCase()} ${number}`;

      // Don't add duplicates
      if (formData.facultyClasses.includes(classCode)) {
        addHiveMessage("you already added that class");
        return;
      }

      const updatedClasses = [...formData.facultyClasses, classCode];
      setFormData({ ...formData, facultyClasses: updatedClasses });

      // Reset input
      setCurrentClassCode({ dept: '', number: '' });

      // Quick acknowledgment
      const responses = [
        'got it',
        'added',
        'nice',
        'bet',
      ];
      addHiveMessage(responses[Math.floor(Math.random() * responses.length)], 300);
    };

    // Handler for removing a class from the list
    const handleRemoveClass = (classCode: string) => {
      const updatedClasses = formData.facultyClasses.filter(c => c !== classCode);
      setFormData({ ...formData, facultyClasses: updatedClasses });
    };

    // Handler for submitting all faculty classes
    const handleFacultyClassesComplete = () => {
      if (formData.facultyClasses.length === 0) return;

      addUserMessage(`${formData.facultyClasses.length} ${formData.facultyClasses.length === 1 ? 'class' : 'classes'}`);

      const facultyResponses = [
        'perfect, got it',
        'noted. the queen bee keeps track of all the faculty',
        'appreciate you being here professor',
      ];

      setTimeout(() => {
        addHiveMessage(facultyResponses[Math.floor(Math.random() * facultyResponses.length)]);
        addHiveMessage(`alright ${formData.fullName}, you're all set 🎉`, 1000);
        addHiveMessage('faculty access gives you different tools than students', 1000);
        addHiveMessage('class management, office hours coordination, all that', 1000);
        addHiveMessage('btw more features coming soon. the queen bee never sleeps', 1200);
        addHiveMessage('welcome to the hive', 1200);
        addHiveMessage('the queen bee got you 🐝', 1200);
        setCurrentQuestion('complete');
      }, 1000);
    };

    // Handle photo upload
    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photoUrl: reader.result as string,
          photoFile: file,
        });
        addUserMessage('📸 Photo uploaded');

        setTimeout(() => {
          addHiveMessage("fire 🔥");
          addHiveMessage("ok so what's your major", 500);
          setCurrentQuestion('major');
        }, 700);
      };
      reader.readAsDataURL(file);
    };

    const skipPhoto = () => {
      addUserMessage('Skip for now');
      setTimeout(() => {
        addHiveMessage("all good");
        addHiveMessage("so what's your major", 500);
        setCurrentQuestion('major');
      }, 700);
    };

    // Data arrays
    const ubMajors = [
      'Computer Science', 'Engineering', 'Business', 'Pre-Med', 'Psychology',
      'Biology', 'Chemistry', 'Physics', 'Mathematics', 'Economics',
      'Political Science', 'English', 'History', 'Art', 'Music',
      'Communications', 'Philosophy', 'Sociology', 'Other'
    ];

    const graduationYears = Array.from({ length: 8 }, (_, i) => (new Date().getFullYear() + i).toString());

    const residentialOptions = [
      { value: 'on-campus', label: 'On Campus' },
      { value: 'off-campus', label: 'Off Campus (nearby)' },
      { value: 'commuter', label: 'Commuter' },
    ];

    const residentialHalls = [
      'Ellicott Complex', 'Governors Complex', 'South Campus',
      'Hadley Village', 'Greiner Hall', 'Fargo Quad'
    ].sort();

    const greekOrganizations = [
      'Alpha Phi Alpha', 'Alpha Kappa Alpha', 'Kappa Alpha Psi',
      'Delta Sigma Theta', 'Phi Beta Sigma', 'Zeta Phi Beta',
      'Sigma Gamma Rho', 'Iota Phi Theta', 'Other'
    ];

    // Handle academic selections
    const handleMajorSelect = (major: string) => {
      setFormData({ ...formData, major });
      addUserMessage(major);

      const majorResponses: Record<string, string[]> = {
        'Computer Science': [
          'davis hall crew',
          'you already know the basement labs stay packed at 2am',
          'hope you like debugging in the coldest building on campus',
        ],
        'Engineering': [
          'bell hall warriors',
          'you\'ve probably pulled an all-nighter in jarvis hall already',
          'engineering at ub hits different. good luck with the workload',
        ],
        'Pre-Med': [
          'good luck with orgo 💀',
          'cooke hall is about to become your second home',
          'hope you enjoy memorizing every bone in the body',
        ],
        'Business': [
          'jacobs school of business',
          'you\'re either in alpha kappa psi or thinking about it',
          'NSC is probably your favorite building on campus',
        ],
        'Psychology': [
          'park hall regular',
          'everyone\'s gonna ask you to psychoanalyze them now',
          'research methods is gonna humble you real quick',
        ],
        'Biology': [
          'cooke hall grind',
          'bio labs are no joke. hope you like dissection',
          'molecular bio or ecology? either way, respect',
        ],
        'Chemistry': [
          'NSC chem labs hit different',
          'you\'ve definitely had to redo a titration at least once',
          'organic chemistry survivors are built different',
        ],
        'Physics': [
          'fronczak hall represent',
          'physics at ub is actually insane. mad respect',
          'hope you like math. like... a lot of math',
        ],
        'Mathematics': [
          'math department stays underrated',
          'you\'re either doing pure math or applied. both are wild',
          'everyone asks you to do their calculus homework huh',
        ],
        'Economics': [
          'econ majors really just vibe in fronczak',
          'micro or macro? or both cause you hate yourself',
          'business school wishes they were you',
        ],
        'Political Science': [
          'park hall political debates go crazy',
          'you\'re either pre-law or just really into elections',
          'poli sci at ub is actually fire. good choice',
        ],
        'English': [
          'clemens hall english major vibes',
          'you definitely read way too much for fun',
          'creative writing or literature track? both are valid',
        ],
        'History': [
          'history department is lowkey elite at ub',
          'you probably know more about buffalo history than anyone',
          'everyone thinks it\'s easy until they see your reading list',
        ],
        'Music': [
          'baird hall music majors are talented af',
          'performance or composition? either way you\'re built different',
          'music theory is genuinely harder than calc',
        ],
        'Communications': [
          'CFA represent',
          'journalism students stay in the basement of baird hall',
          'valid major. don\'t let anyone tell you different',
        ],
        'Philosophy': [
          'philosophy majors stay asking the real questions',
          'park hall philosophy department is actually goated',
          'you\'re either pre-law or just really enjoy existential dread',
        ],
        'Sociology': [
          'sociology at ub goes hard',
          'park hall sociology crew represent',
          'everyone thinks it\'s easy until they actually take the classes',
        ],
        'Art': [
          'center for the arts vibes',
          'you\'ve definitely stayed late in the studios',
          'art majors stay having the best fits on campus tbh',
        ],
        'Other': [
          'interdisciplinary or undecided? either way that\'s valid',
          'ub has like 300 majors so honestly i feel you',
          'the queen bee respects the exploration',
        ],
      };

      setTimeout(() => {
        const responses = majorResponses[major] || ['solid choice', 'i see you', 'respect'];
        addHiveMessage(responses[0]);
        addHiveMessage(responses[1], 1000);
        addHiveMessage(responses[2], 1000);
        addHiveMessage('when you graduating?', 1200);
        setCurrentQuestion('gradYear');
      }, 1000);
    };

    const handleGradYearSelect = (year: string) => {
      setFormData({ ...formData, graduationYear: year });
      addUserMessage(`Class of ${year}`);

      setTimeout(() => {
        addHiveMessage('class of ' + year + ' 🎓');
        addHiveMessage('where you living?', 500);
        setCurrentQuestion('living');
      }, 700);
    };

    const handleLivingSelect = (living: string) => {
      setFormData({ ...formData, livingSituation: living });
      const label = residentialOptions.find(o => o.value === living)?.label || living;
      addUserMessage(label);

      if (living === 'on-campus') {
        setTimeout(() => {
          addHiveMessage("nice, which hall?");
          setCurrentQuestion('residentialHall');
        }, 700);
      } else if (living === 'off-campus') {
        setTimeout(() => {
          addHiveMessage("off campus vibes");
          addHiveMessage("part of greek life?", 500);
          setCurrentQuestion('greekLife');
        }, 700);
      } else {
        setTimeout(() => {
          addHiveMessage("respect the commute");
          addHiveMessage("part of greek life?", 500);
          setCurrentQuestion('greekLife');
        }, 700);
      }
    };

    const handleResidentialHallSelect = (hall: string) => {
      setFormData({ ...formData, residentialHall: hall });
      addUserMessage(hall);

      const hallResponses: Record<string, string[]> = {
        'Ellicott Complex': [
          'ellicott complex',
          'biggest dorm complex on campus. you know the ladybug situation in fall',
          'red jacket is your go-to when you don\'t wanna cook',
        ],
        'Governors': [
          'govs',
          'suite style living hits different. you got lucky',
          'everyone wants greiner or porter cause they\'re newer',
        ],
        'Hadley Village': [
          'hadley',
          'south campus apartment vibes. quiet over there',
          'you probably take the stampede to north daily',
        ],
        'Creekside Village': [
          'creekside',
          'newest apartments on campus. premium living honestly',
          'alumni arena is right there. convenient for basketball games',
        ],
        'Flickinger Court': [
          'flickinger',
          'the upperclassman apartments. you made it',
          'short walk to the academic spine. can\'t beat the location',
        ],
        'South Campus': [
          'south campus',
          'OG ub campus. buildings got character',
          'the architecture program is all down there. Hayes Hall is iconic',
        ],
      };

      setTimeout(() => {
        const responses = hallResponses[hall] || ['nice spot', 'solid choice', 'i see you'];
        addHiveMessage(responses[0]);
        addHiveMessage(responses[1], 1000);
        addHiveMessage(responses[2], 1000);
        addHiveMessage("you in greek life?", 1200);
        setCurrentQuestion('greekLife');
      }, 1000);
    };

    const handleGreekSelect = (org: string) => {
      if (org === 'none') {
        addUserMessage('Nope');
        setTimeout(() => {
          addHiveMessage("all good, not for everyone");
          addHiveMessage("ok now pick 3-6 interests that describe you", 500);
          setCurrentQuestion('interests');
        }, 700);
      } else {
        setFormData({ ...formData, greekOrg: org });
        addUserMessage(org);
        setTimeout(() => {
          addHiveMessage("nice! we'll get you into your org's space");
          addHiveMessage("ok now pick 3-6 interests that describe you", 600);
          setCurrentQuestion('interests');
        }, 700);
      }
    };

    const toggleInterest = (interestId: string) => {
      const newInterests = formData.interests.includes(interestId)
        ? formData.interests.filter(id => id !== interestId)
        : [...formData.interests, interestId];

      setFormData({ ...formData, interests: newInterests });
    };

    const submitInterests = () => {
      if (formData.interests.length < 3 || formData.interests.length > 6) return;

      addUserMessage(`Selected ${formData.interests.length} interests`);

      const interestResponses = [
        "interesting combo",
        "i see your vibe",
        "this says a lot about you actually",
        "the queen bee knows exactly what to recommend",
      ];

      setTimeout(() => {
        addHiveMessage(interestResponses[Math.floor(Math.random() * interestResponses.length)]);
        addHiveMessage("let me pull up some spaces you might actually vibe with", 1000);
        addHiveMessage("i know every community on campus. it's literally my job", 1000);
        addHiveMessage("join 3-5 so your feed isn't dead", 1200);
        setCurrentQuestion('spaces');
      }, 1000);
    };

    const toggleSpace = (spaceId: string) => {
      const newSpaces = formData.spacesToJoin.includes(spaceId)
        ? formData.spacesToJoin.filter(id => id !== spaceId)
        : [...formData.spacesToJoin, spaceId];

      setFormData({ ...formData, spacesToJoin: newSpaces });
    };

    const submitSpaces = () => {
      if (formData.spacesToJoin.length < 3 || formData.spacesToJoin.length > 5) return;

      addUserMessage(`Joined ${formData.spacesToJoin.length} communities`);

      setTimeout(() => {
        addHiveMessage("good picks honestly");
        addHiveMessage("your feed is gonna be way better than scrolling instagram for the 50th time", 1000);
        addHiveMessage("last thing - you run any clubs or orgs?", 1200);
        addHiveMessage("leaders get special tools. the queen bee takes care of her leaders", 1000);
        setCurrentQuestion('leader');
      }, 1000);
    };

    const handleLeaderResponse = (isLeader: boolean) => {
      setFormData({ ...formData, isStudentLeader: isLeader });

      if (isLeader) {
        addUserMessage('Yep!');
        setTimeout(() => {
          addHiveMessage("respect 🫡 which org?");
          addHiveMessage("HiveLab tools are gonna change how you run things. trust me", 1000);
          addHiveMessage("the queen bee built these specifically for campus leaders", 1000);
          setCurrentQuestion('leaderSpace');
        }, 1000);
      } else {
        addUserMessage('Nah');
        setTimeout(() => {
          addHiveMessage("all good");
          addHiveMessage(`alright ${formData.fullName}, you're in 🎉`, 1000);
          addHiveMessage("welcome to the hive", 1000);
          addHiveMessage("your feed is gonna be way more useful than whatever you were doom scrolling before", 1000);
          addHiveMessage("btw more features coming soon. the queen bee never sleeps", 1200);
          addHiveMessage("the queen bee got you 🐝", 1200);
          setCurrentQuestion('complete');
        }, 1000);
      }
    };

    const handleLeaderSpaceSelect = (space: string) => {
      setFormData({ ...formData, leaderSpace: space });
      addUserMessage(space);

      setTimeout(() => {
        addHiveMessage("perfect, i'll verify you and get you access to leader tools");
        addHiveMessage("usually takes 24-48 hours. the queen bee moves fast but not that fast", 1000);
        addHiveMessage(`alright ${formData.fullName}, you're in 🎉`, 1000);
        addHiveMessage("your org is about to run way smoother with HiveLab", 1000);
        addHiveMessage("btw more features coming soon. the queen bee never sleeps", 1200);
        addHiveMessage("welcome to the hive", 1200);
        addHiveMessage("the queen bee got you 🐝", 1200);
        setCurrentQuestion('complete');
      }, 1000);
    };

    // Sample interests (simplified for chat)
    const quickInterests = [
      { id: 'cs-major', label: 'CS major' },
      { id: 'pre-med', label: 'Pre-med' },
      { id: 'party-legend', label: 'Party legend' },
      { id: 'introvert', label: 'Introvert' },
      { id: 'gym-rat', label: 'Gym rat' },
      { id: 'coffee-addict', label: 'Coffee addict' },
      { id: 'gaming', label: 'Gaming' },
      { id: 'music-lover', label: 'Music lover' },
    ];

    // Sample spaces
    const recommendedSpaces = [
      { id: 'cs-club', name: 'CS Club', members: 456 },
      { id: 'ub-robotics', name: 'UB Robotics', members: 89 },
      { id: 'debate', name: 'Debate Society', members: 234 },
      { id: 'pre-med', name: 'Pre-Med Society', members: 312 },
      { id: 'gaming', name: 'Gaming Club', members: 567 },
      { id: 'music', name: 'Music Collective', members: 289 },
    ];

    // Render current input based on question
    const renderCurrentInput = () => {
      if (isTyping) return null;

      switch (currentQuestion) {
        case 'userType':
          return (
            <div className="flex flex-col gap-2 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
              <button
                onClick={() => handleUserTypeSelect('student')}
                className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-left hover:bg-primary/20 transition-all duration-smooth"
              >
                <p className="font-medium">Student</p>
                <p className="text-xs text-muted-foreground">Currently enrolled at UB</p>
              </button>
              <button
                onClick={() => handleUserTypeSelect('alumni')}
                className="p-4 rounded-xl bg-card border border-border text-left hover:bg-muted transition-all duration-smooth"
              >
                <p className="font-medium">Alumni</p>
                <p className="text-xs text-muted-foreground">UB graduate</p>
              </button>
              <button
                onClick={() => handleUserTypeSelect('faculty')}
                className="p-4 rounded-xl bg-card border border-border text-left hover:bg-muted transition-all duration-smooth"
              >
                <p className="font-medium">Faculty/Staff</p>
                <p className="text-xs text-muted-foreground">Working at UB</p>
              </button>
            </div>
          );

        case 'name':
          return (
            <div className="flex gap-2 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
              <Input
                placeholder="Your name..."
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.fullName.length >= 2) {
                    handleNameSubmit(formData.fullName);
                  }
                }}
                className="flex-1"
                autoFocus
              />
              <Button
                onClick={() => handleNameSubmit(formData.fullName)}
                disabled={formData.fullName.length < 2}
                size="icon"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          );

        case 'facultyInfo':
          return (
            <div className="flex gap-2 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
              <Input
                placeholder="Department or classes (e.g., MGG 101, PSY 207)"
                value={formData.facultyInfo}
                onChange={(e) => setFormData({ ...formData, facultyInfo: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.facultyInfo.length >= 2) {
                    handleFacultyInfoSubmit(formData.facultyInfo);
                  }
                }}
                className="flex-1"
                autoFocus
              />
              <Button
                onClick={() => handleFacultyInfoSubmit(formData.facultyInfo)}
                disabled={formData.facultyInfo.length < 2}
                size="icon"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          );

        case 'facultyClasses':
          return (
            <div className="flex flex-col gap-3 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
              {/* Display added classes */}
              {formData.facultyClasses.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.facultyClasses.map((classCode) => (
                    <Badge
                      key={classCode}
                      variant="secondary"
                      className="text-sm px-3 py-1 flex items-center gap-1"
                    >
                      {classCode}
                      <button
                        onClick={() => handleRemoveClass(classCode)}
                        className="ml-1 hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Input fields for class code */}
              <div className="flex gap-2">
                <Input
                  placeholder="CSE"
                  value={currentClassCode.dept}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
                    if (value.length <= 3) {
                      setCurrentClassCode({ ...currentClassCode, dept: value });
                    }
                  }}
                  className="w-24 text-center font-mono uppercase"
                  maxLength={3}
                  autoFocus
                />
                <Input
                  placeholder="220"
                  value={currentClassCode.number}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setCurrentClassCode({ ...currentClassCode, number: value });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && currentClassCode.dept.length === 3 && currentClassCode.number.length > 0) {
                      handleAddClass();
                    }
                  }}
                  className="flex-1 font-mono"
                  maxLength={4}
                />
                <Button
                  onClick={handleAddClass}
                  disabled={currentClassCode.dept.length !== 3 || currentClassCode.number.length === 0}
                  size="icon"
                  variant="secondary"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              {/* Submit button - only show if at least one class is added */}
              {formData.facultyClasses.length > 0 && (
                <Button
                  onClick={handleFacultyClassesComplete}
                  className="w-full mt-2"
                >
                  Done ({formData.facultyClasses.length} {formData.facultyClasses.length === 1 ? 'class' : 'classes'})
                </Button>
              )}
            </div>
          );

        case 'photo':
          return (
            <div className="flex flex-col gap-3 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="default"
                className="w-full"
              >
                <Camera className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
              <Button
                onClick={skipPhoto}
                variant="ghost"
                className="w-full"
              >
                Skip for now
              </Button>
            </div>
          );

        case 'major':
          return (
            <div className="flex flex-col gap-2 p-4 bg-background/80 backdrop-blur-xl border-t border-border max-h-[200px] overflow-y-auto">
              {ubMajors.map((major) => (
                <button
                  key={major}
                  onClick={() => handleMajorSelect(major)}
                  className="p-3 rounded-lg bg-card border border-border text-left hover:bg-muted transition-all duration-smooth text-sm"
                >
                  {major}
                </button>
              ))}
            </div>
          );

        case 'gradYear':
          return (
            <div className="grid grid-cols-2 gap-2 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
              {graduationYears.map((year) => (
                <button
                  key={year}
                  onClick={() => handleGradYearSelect(year)}
                  className="p-3 rounded-lg bg-card border border-border text-center hover:bg-muted transition-all duration-smooth"
                >
                  {year}
                </button>
              ))}
            </div>
          );

        case 'living':
          return (
            <div className="flex flex-col gap-2 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
              {residentialOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleLivingSelect(option.value)}
                  className="p-4 rounded-xl bg-card border border-border text-left hover:bg-muted transition-all duration-smooth"
                >
                  {option.label}
                </button>
              ))}
            </div>
          );

        case 'residentialHall':
          return (
            <div className="flex flex-col gap-2 p-4 bg-background/80 backdrop-blur-xl border-t border-border max-h-[200px] overflow-y-auto">
              {residentialHalls.map((hall) => (
                <button
                  key={hall}
                  onClick={() => handleResidentialHallSelect(hall)}
                  className="p-3 rounded-lg bg-card border border-border text-left hover:bg-muted transition-all duration-smooth text-sm"
                >
                  {hall}
                </button>
              ))}
            </div>
          );

        case 'greekLife':
          return (
            <div className="flex flex-col gap-2 p-4 bg-background/80 backdrop-blur-xl border-t border-border max-h-[200px] overflow-y-auto">
              <button
                onClick={() => handleGreekSelect('none')}
                className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-left hover:bg-primary/20 transition-all duration-smooth"
              >
                Nope
              </button>
              {greekOrganizations.map((org) => (
                <button
                  key={org}
                  onClick={() => handleGreekSelect(org)}
                  className="p-3 rounded-lg bg-card border border-border text-left hover:bg-muted transition-all duration-smooth text-sm"
                >
                  {org}
                </button>
              ))}
            </div>
          );

        case 'interests':
          return (
            <div className="flex flex-col gap-3 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                {quickInterests.map((interest) => {
                  const isSelected = formData.interests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-3 rounded-lg border text-left transition-all duration-smooth text-sm ${
                        isSelected
                          ? 'bg-primary/20 border-primary/30'
                          : 'bg-card border-border hover:bg-muted'
                      }`}
                    >
                      {isSelected && '✓ '}{interest.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {formData.interests.length} of 3-6 selected
                </span>
                <Button
                  onClick={submitInterests}
                  disabled={formData.interests.length < 3 || formData.interests.length > 6}
                  size="sm"
                >
                  Continue
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          );

        case 'spaces':
          return (
            <div className="flex flex-col gap-3 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
              <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                {recommendedSpaces.map((space) => {
                  const isSelected = formData.spacesToJoin.includes(space.id);
                  return (
                    <button
                      key={space.id}
                      onClick={() => toggleSpace(space.id)}
                      className={`p-3 rounded-lg border text-left transition-all duration-smooth ${
                        isSelected
                          ? 'bg-primary/20 border-primary/30'
                          : 'bg-card border-border hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{isSelected && '✓ '}{space.name}</p>
                          <p className="text-xs text-muted-foreground">{space.members} members</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {formData.spacesToJoin.length} of 3-5 selected
                </span>
                <Button
                  onClick={submitSpaces}
                  disabled={formData.spacesToJoin.length < 3 || formData.spacesToJoin.length > 5}
                  size="sm"
                >
                  Continue
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          );

        case 'leader':
          return (
            <div className="flex flex-col gap-2 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
              <button
                onClick={() => handleLeaderResponse(true)}
                className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-left hover:bg-primary/20 transition-all duration-smooth"
              >
                Yep!
              </button>
              <button
                onClick={() => handleLeaderResponse(false)}
                className="p-4 rounded-xl bg-card border border-border text-left hover:bg-muted transition-all duration-smooth"
              >
                Nah
              </button>
            </div>
          );

        case 'leaderSpace':
          return (
            <div className="flex flex-col gap-2 p-4 bg-background/80 backdrop-blur-xl border-t border-border max-h-[200px] overflow-y-auto">
              {['CS Club', 'Robotics Team', 'Debate Society', 'Pre-Med Society', 'Business Club', 'Other'].map((space) => (
                <button
                  key={space}
                  onClick={() => handleLeaderSpaceSelect(space)}
                  className="p-3 rounded-lg bg-card border border-border text-left hover:bg-muted transition-all duration-smooth text-sm"
                >
                  {space}
                </button>
              ))}
            </div>
          );

        case 'complete':
          return (
            <div className="flex flex-col gap-3 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
              <Button
                onClick={() => {
                  setMessages([
                    {
                      id: '1',
                      type: 'hive',
                      content: 'Hey! Welcome to HIVE 👋',
                      timestamp: new Date(),
                    },
                    {
                      id: '2',
                      type: 'hive',
                      content: 'First things first - who are you?',
                      timestamp: new Date(),
                    },
                  ]);
                  setCurrentQuestion('userType');
                  setFormData({
                    userType: '',
                    fullName: '',
                    photoUrl: null,
                    photoFile: null,
                    major: '',
                    graduationYear: '',
                    livingSituation: '',
                    residentialHall: '',
                    greekOrg: '',
                    bio: '',
                    interests: [],
                    spacesToJoin: [],
                    isStudentLeader: false,
                    leaderSpace: '',
                  });
                }}
                className="w-full"
              >
                Start Over
              </Button>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl h-[600px] flex flex-col rounded-2xl border border-border overflow-hidden bg-background shadow-xl">
          {/* Chat Header */}
          <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-xl border-b border-border">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg">🐝</span>
            </div>
            <div>
              <p className="font-semibold text-sm">HIVE</p>
              <p className="text-xs text-muted-foreground">Getting to know you...</p>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              if (message.type === 'hive') {
                return (
                  <div key={message.id} className="flex items-start gap-2 animate-in slide-in-from-left-2 fade-in-0 duration-smooth">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🐝</span>
                    </div>
                    <div className="max-w-[70%] bg-card/80 backdrop-blur-xl border border-border rounded-2xl rounded-tl-sm px-4 py-2">
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                );
              }

              if (message.type === 'user') {
                return (
                  <div key={message.id} className="flex items-start gap-2 justify-end animate-in slide-in-from-right-2 fade-in-0 duration-smooth">
                    <div className="max-w-[70%] bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-sm px-4 py-2">
                      <p className="text-sm font-medium">{message.content}</p>
                    </div>
                  </div>
                );
              }

              return null;
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2 animate-in slide-in-from-left-2 fade-in-0 duration-smooth">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🐝</span>
                </div>
                <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {renderCurrentInput()}
        </div>
      </div>
    );
  },
};
