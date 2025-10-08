import type { Meta, StoryObj } from "@storybook/react";
import { ProfileHeader } from "../../atomic/organisms/profile-header";

/**
 * # ProfileHeader
 *
 * Organism component for profile page headers.
 * Displays full profile information with actions for connecting/messaging.
 *
 * ## HIVE Profile System
 * - Large portrait avatar for strong visual identity (Tinder-style)
 * - **NEW**: Swipeable photo carousel (max 5 photos)
 * - Academic context prominently displayed
 * - Context-aware actions (Edit vs Connect/Message)
 * - Verification and status badges
 *
 * ## Features
 * - **Portrait Avatar**: Large 3:4 aspect ratio (240×320px) per spec
 * - **Swipeable Carousel**: Multiple photos with dot indicators and counter
 * - **Verification Badge**: Visual trust indicator
 * - **Contextual Actions**: Edit (own profile) vs Connect/Message (others)
 * - **Academic Info**: Major, year, graduation, pronouns
 * - **Flexible Badges**: Custom status and role indicators
 *
 * ## Usage
 * ```tsx
 * // Single photo (traditional)
 * <ProfileHeader
 *   name="Sarah Chen"
 *   handle="sarahc"
 *   avatarUrl="https://..."
 *   bio="CS major interested in AI/ML"
 *   major="Computer Science"
 *   verified={true}
 *   onConnect={() => console.log('Connect clicked')}
 * />
 *
 * // Multiple photos (swipeable carousel)
 * <ProfileHeader
 *   name="Sarah Chen"
 *   handle="sarahc"
 *   photos={[
 *     "https://photo1.jpg",
 *     "https://photo2.jpg",
 *     "https://photo3.jpg",
 *   ]}
 *   bio="CS major interested in AI/ML"
 *   major="Computer Science"
 *   verified={true}
 *   onConnect={() => console.log('Connect clicked')}
 * />
 * ```
 */
const meta = {
  title: "02-Profile/ProfileHeader",
  component: ProfileHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default profile header (other user's profile)
 */
export const Default: Story = {
  args: {
    name: "Sarah Chen",
    handle: "sarahc",
    avatarUrl: "https://github.com/shadcn.png",
    bio: "Computer Science major passionate about AI/ML and building tools that make campus life better. Always down for coffee and tech talks!",
    major: "Computer Science",
    academicYear: "Junior",
    graduationYear: 2025,
    pronouns: "she/her",
    verified: true,
    isOwnProfile: false,
    isConnected: false,
    badges: [
      { label: "Space Leader", variant: "default" },
      { label: "Active Now", variant: "secondary" },
    ],
    onConnect: () => console.log("Connect clicked"),
    onMessage: () => console.log("Message clicked"),
  },
};

/**
 * Own profile view - shows edit button
 */
export const OwnProfile: Story = {
  args: {
    name: "Alex Morgan",
    handle: "alex",
    avatarUrl: "https://github.com/vercel.png",
    bio: "Biology pre-med, research assistant in neuroscience lab. Looking to connect with other pre-med students!",
    major: "Biology",
    academicYear: "Sophomore",
    graduationYear: 2026,
    pronouns: "they/them",
    verified: true,
    isOwnProfile: true,
    badges: [
      { label: "Research Assistant", variant: "default" },
      { label: "Pre-Med", variant: "secondary" },
    ],
    onEdit: () => console.log("Edit profile clicked"),
  },
};

/**
 * Connected profile - shows message button
 */
export const Connected: Story = {
  args: {
    name: "Jordan Lee",
    handle: "jordan",
    avatarUrl: "https://github.com/shadcn.png",
    bio: "Engineering student working on sustainable energy solutions. Member of Climate Action Club.",
    major: "Mechanical Engineering",
    academicYear: "Senior",
    graduationYear: 2024,
    pronouns: "he/him",
    verified: true,
    isOwnProfile: false,
    isConnected: true,
    badges: [
      { label: "Climate Club Leader", variant: "default" },
      { label: "Connected", variant: "outline" },
    ],
    onMessage: () => console.log("Message clicked"),
  },
};

/**
 * Minimal profile - no avatar
 */
export const NoAvatar: Story = {
  args: {
    name: "Casey Kim",
    handle: "casey",
    bio: "Business major exploring campus entrepreneurship opportunities",
    major: "Business Administration",
    academicYear: "Freshman",
    verified: false,
    isOwnProfile: false,
    onConnect: () => console.log("Connect clicked"),
  },
};

/**
 * Graduate student profile
 */
export const GradStudent: Story = {
  args: {
    name: "Dr. Riley Park",
    handle: "rileyp",
    avatarUrl: "https://github.com/vercel.png",
    bio: "PhD candidate in Computer Science researching distributed systems and cloud computing. Teaching assistant for CSE 442.",
    major: "Computer Science",
    academicYear: "PhD Candidate",
    graduationYear: 2025,
    pronouns: "she/her",
    verified: true,
    isOwnProfile: false,
    isConnected: false,
    badges: [
      { label: "Research Fellow", variant: "default" },
      { label: "Teaching Assistant", variant: "secondary" },
      { label: "PhD Candidate", variant: "outline" },
    ],
    onConnect: () => console.log("Connect clicked"),
  },
};

/**
 * Profile with many badges
 */
export const WithManyBadges: Story = {
  args: {
    name: "Morgan Taylor",
    handle: "morgan",
    avatarUrl: "https://github.com/shadcn.png",
    bio: "Psychology major, mental health peer advocate, research participant coordinator. Passionate about making campus mental health resources more accessible.",
    major: "Psychology",
    academicYear: "Junior",
    graduationYear: 2025,
    pronouns: "she/her",
    verified: true,
    isOwnProfile: false,
    badges: [
      { label: "Mental Health Peer", variant: "default" },
      { label: "Research Coordinator", variant: "secondary" },
      { label: "Active Member", variant: "outline" },
      { label: "Dean's List", variant: "secondary" },
      { label: "🎯 Looking for study partner", variant: "outline" },
    ],
    onConnect: () => console.log("Connect clicked"),
  },
};

/**
 * Freshman profile
 */
export const Freshman: Story = {
  args: {
    name: "Jamie Davis",
    handle: "jamie",
    bio: "Just started at UB! Exploring majors and looking to join clubs. Interests: photography, music, sustainability.",
    major: "Undeclared",
    academicYear: "Freshman",
    graduationYear: 2027,
    pronouns: "he/him",
    verified: true,
    isOwnProfile: false,
    badges: [
      { label: "New Student", variant: "secondary" },
      { label: "Exploring Majors", variant: "outline" },
    ],
    onConnect: () => console.log("Connect clicked"),
  },
};

/**
 * Unverified profile
 */
export const Unverified: Story = {
  args: {
    name: "Avery Chen",
    handle: "avery",
    bio: "Communications major interested in digital media and content creation",
    major: "Communications",
    academicYear: "Sophomore",
    verified: false,
    isOwnProfile: false,
    onConnect: () => console.log("Connect clicked"),
  },
};

/**
 * Profile with long content
 */
export const LongContent: Story = {
  args: {
    name: "Blake Taylor-Rodriguez",
    handle: "blaketaylorrodriguez",
    avatarUrl: "https://github.com/shadcn.png",
    bio: "Environmental Science major with a double minor in Political Science and Public Policy. Passionate about climate action, environmental justice, and building sustainable communities. Currently working on research project analyzing the impact of urban green spaces on community health outcomes. Also involved in campus sustainability initiatives and community organizing.",
    major: "Environmental Science with minors in Political Science and Public Policy",
    academicYear: "Senior",
    graduationYear: 2024,
    pronouns: "they/them",
    verified: true,
    isOwnProfile: false,
    badges: [
      { label: "Environmental Justice Advocate", variant: "default" },
      { label: "Research Assistant", variant: "secondary" },
      { label: "Sustainability Committee", variant: "outline" },
      { label: "Community Organizer", variant: "secondary" },
    ],
    onConnect: () => console.log("Connect clicked"),
  },
};

/**
 * Swipeable avatar with 2 photos
 */
export const SwipeableTwoPhotos: Story = {
  args: {
    name: "Sarah Chen",
    handle: "sarahc",
    photos: [
      "https://github.com/shadcn.png",
      "https://github.com/vercel.png",
    ],
    bio: "Computer Science major passionate about AI/ML. Check out my photos!",
    major: "Computer Science",
    academicYear: "Junior",
    graduationYear: 2025,
    pronouns: "she/her",
    verified: true,
    isOwnProfile: true,
    badges: [
      { label: "Space Leader", variant: "default" },
    ],
    onEdit: () => console.log("Edit profile clicked"),
  },
};

/**
 * Swipeable avatar with 4 photos (Tinder-style)
 */
export const SwipeableMultiplePhotos: Story = {
  args: {
    name: "Alex Morgan",
    handle: "alex",
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=450&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=450&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=450&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=450&h=600&fit=crop",
    ],
    bio: "Biology pre-med, research assistant. Swipe to see my campus adventures!",
    major: "Biology",
    academicYear: "Sophomore",
    graduationYear: 2026,
    pronouns: "they/them",
    verified: true,
    isOwnProfile: false,
    isConnected: false,
    badges: [
      { label: "Research Assistant", variant: "default" },
      { label: "Pre-Med", variant: "secondary" },
    ],
    onConnect: () => console.log("Connect clicked"),
    onMessage: () => console.log("Message clicked"),
  },
};

/**
 * Swipeable avatar with 5 photos (max allowed)
 */
export const SwipeableMaxPhotos: Story = {
  args: {
    name: "Jordan Lee",
    handle: "jordan",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=450&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=450&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=450&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=450&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=450&h=600&fit=crop",
    ],
    bio: "Engineering student working on sustainable energy solutions. 5 photos showcasing my journey!",
    major: "Mechanical Engineering",
    academicYear: "Senior",
    graduationYear: 2024,
    pronouns: "he/him",
    verified: true,
    isOwnProfile: false,
    isConnected: true,
    badges: [
      { label: "Climate Club Leader", variant: "default" },
      { label: "Connected", variant: "outline" },
    ],
    onMessage: () => console.log("Message clicked"),
  },
};

/**
 * Own profile with swipeable photos
 */
export const OwnProfileSwipeable: Story = {
  args: {
    name: "Casey Kim",
    handle: "casey",
    photos: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=450&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=450&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=450&h=600&fit=crop",
    ],
    bio: "Business major exploring campus entrepreneurship. Swipe through my story!",
    major: "Business Administration",
    academicYear: "Freshman",
    graduationYear: 2027,
    pronouns: "she/her",
    verified: true,
    isOwnProfile: true,
    badges: [
      { label: "Entrepreneur Club", variant: "default" },
      { label: "New Student", variant: "secondary" },
    ],
    onEdit: () => console.log("Edit profile clicked"),
  },
};

/**
 * Comparison: Single photo vs Swipeable carousel
 */
export const ComparisonSingleVsSwipeable: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Single Photo (Traditional Avatar)
        </h3>
        <ProfileHeader
          name="Alex Single"
          handle="alexs"
          avatarUrl="https://github.com/shadcn.png"
          bio="Using a single profile photo"
          major="Computer Science"
          academicYear="Junior"
          verified={true}
          isOwnProfile={false}
          onConnect={() => console.log("Connect")}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Multiple Photos (Swipeable Carousel)
        </h3>
        <ProfileHeader
          name="Jordan Swipe"
          handle="jordans"
          photos={[
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=450&h=600&fit=crop",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=450&h=600&fit=crop",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=450&h=600&fit=crop",
          ]}
          bio="Using swipeable photo carousel - much more engaging!"
          major="Computer Science"
          academicYear="Junior"
          verified={true}
          isOwnProfile={false}
          onConnect={() => console.log("Connect")}
        />
      </div>
    </div>
  ),
};

/**
 * Full profile page layout example
 */
export const FullPageLayout: Story = {
  render: () => (
    <div className="max-w-5xl mx-auto space-y-8">
      <ProfileHeader
        name="Sarah Chen"
        handle="sarahc"
        photos={[
          "https://github.com/shadcn.png",
          "https://github.com/vercel.png",
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=450&h=600&fit=crop",
        ]}
        bio="Computer Science major passionate about AI/ML and building tools that make campus life better. Always down for coffee and tech talks!"
        major="Computer Science"
        academicYear="Junior"
        graduationYear={2025}
        pronouns="she/her"
        verified={true}
        isOwnProfile={false}
        isConnected={false}
        badges={[
          { label: "Space Leader", variant: "default" },
          { label: "Active Now", variant: "secondary" },
        ]}
        onConnect={() => console.log("Connect clicked")}
      />

      {/* Profile content would go here */}
      <div className="rounded-lg border border-dashed border-border p-12 text-center">
        <p className="text-muted-foreground">
          Profile widgets and content appear here
        </p>
      </div>
    </div>
  ),
};
