import type { SpaceShowcaseData } from "./space-showcase-card";
import type { EventAnnouncementData } from "./event-announcement-card";
import type { UGCPostData } from "./ugc-post-card";

export const mockSpace: SpaceShowcaseData = {
  id: "space-1",
  name: "CS Study Group",
  description:
    "A collaborative space for Computer Science students to share notes, discuss algorithms, and prepare for technical interviews together.",
  coverImage:
    "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
  memberCount: 1247,
  category: "Academic",
  isVerified: true,
  isJoined: false,
  recentMembers: [
    {
      id: "1",
      name: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "Sarah Kim",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
    },
    { id: "3", name: "Mike Johnson" },
  ],
  tags: [],
};

export const mockEvent: EventAnnouncementData = {
  id: "event-1",
  title: "Spring Semester Kickoff Ritual",
  description:
    "Join us for the traditional start of spring semester with keynotes from student leaders, campus updates, and the unveiling of this semester's ritual challenges.",
  startTime: "2024-02-15T18:00:00Z",
  location: {
    type: "physical" as const,
    venue: "Johnson Athletic Center",
  },
  attendeeCount: 847,
  isAttending: false,
  eventType: "ritual" as const,
  tags: [],
  organizer: {
    id: "1",
    name: "test",
  },
};

export const mockPost: UGCPostData = {
  id: "post-1",
  author: {
    id: "user-1",
    name: "Laney Fraas",
    handle: "laney",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    isVerified: true,
  },
  content: {
    text: "Just solved the classic 'Two Sum' problem using a HashMap approach! 🎉 The key insight is trading space for time complexity. Instead of nested loops (O(n²)), we can solve it in O(n) with O(n) extra space.",
    media: [
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop",
        alt: "Code solution on laptop screen",
      },
    ],
  },
  engagement: {
    likes: 142,
    comments: 23,
    shares: 8,
  },
  userInteractions: {
    hasLiked: true,
    hasBookmarked: false,
    hasShared: false,
  },
  timestamp: "2024-01-15T14:30:00Z",
  postType: "media",
};
