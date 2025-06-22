import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  TopStrip,
  MainFeed,
  CampusUnlockBanner,
  PostComposer,
  createSampleTopStripItems,
  createSampleUnlockData,
} from "../components";

const meta: Meta = {
  title: "HIVE/Feed System",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Complete feed system with top strip, main feed, campus unlock banners, and post composer.",
      },
    },
  },
};

export default meta;

// Sample feed data
const createSampleFeedItems = () => [
  {
    id: "1",
    type: "ritual" as const,
    timestamp: new Date(),
    priority: "high" as const,
    data: {
      title: "Orientation Q&A",
      description:
        "Ask anything about campus life - current students are here to help!",
      participants: 47,
      maxParticipants: 100,
    },
  },
  {
    id: "2",
    type: "post" as const,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    priority: "medium" as const,
    data: {
      author: { name: "Sarah Chen", handle: "@sarah_cs" },
      content:
        "Just finished setting up my dorm room! The Engineering quad is amazing 🔥",
      reactions: { "🔥": 12, "👏": 8, "🎉": 5 },
    },
  },
  {
    id: "3",
    type: "space-unlock" as const,
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    priority: "high" as const,
    data: {
      spaceName: "Greek Life",
      description:
        "Rush week is starting! Explore fraternities and sororities.",
      requirements: "Sophomore standing",
    },
  },
  {
    id: "4",
    type: "tool-reveal" as const,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    priority: "medium" as const,
    data: {
      toolName: "Study Buddy Matcher",
      builderName: "@alex_dev",
      description: "Find study partners for your classes with smart matching.",
    },
  },
  {
    id: "5",
    type: "campus-event" as const,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    priority: "low" as const,
    data: {
      eventName: "Welcome Week Mixer",
      description: "Meet students from all majors and years!",
      date: "Tonight 7 PM",
      location: "Student Union",
    },
  },
  {
    id: "6",
    type: "builder-challenge" as const,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    priority: "medium" as const,
    data: {
      challengeName: "First Tool Challenge",
      description: "Build your first tool and earn Builder status!",
      reward: "Builder Badge + Early Access",
    },
  },
];

export const CompleteFeedSystem: StoryObj = {
  render: () => {
    const [isUnlockAnimating, setIsUnlockAnimating] = React.useState(true);

    return (
      <div className="min-h-screen bg-bg-root text-text-primary">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="p-4 border-b border-border-line">
            <h1 className="text-2xl font-bold font-display text-text-primary">
              Campus Feed
            </h1>
            <p className="text-text-secondary">
              Stay connected with your campus community
            </p>
          </div>

          {/* Top Strip */}
          <div className="p-4 border-b border-border-line">
            <h2 className="text-lg font-semibold mb-3 font-display">
              Happening Now
            </h2>
            <TopStrip
              items={createSampleTopStripItems()}
              onItemClick={(item) =>
                console.log("Top strip item clicked:", item)
              }
            />
          </div>

          {/* Campus Unlock Banner */}
          <div className="p-4">
            <CampusUnlockBanner
              {...createSampleUnlockData()}
              isAnimating={isUnlockAnimating}
              onCelebrationComplete={() => setIsUnlockAnimating(false)}
            />
          </div>

          {/* Post Composer */}
          <div className="p-4 border-b border-border-line">
            <PostComposer
              onSubmit={(content, reactions) => {
                console.log("Post submitted:", { content, reactions });
                alert(
                  `Posted: "${content}" with reactions: ${reactions.join(", ")}`
                );
              }}
            />
          </div>

          {/* Main Feed */}
          <MainFeed
            items={createSampleFeedItems()}
            onItemClick={(item) => console.log("Feed item clicked:", item)}
            onLoadMore={() => console.log("Load more requested")}
            hasMore={true}
            className="h-96"
          />
        </div>
      </div>
    );
  },
};

export const TopStripOnly: StoryObj = {
  render: () => (
    <div className="p-6 bg-bg-root">
      <h2 className="text-xl font-bold text-text-primary mb-4 font-display">
        Top Strip Component
      </h2>
      <TopStrip
        items={createSampleTopStripItems()}
        onItemClick={(item) => console.log("Item clicked:", item)}
      />
    </div>
  ),
};

export const CampusUnlockBannerDemo: StoryObj = {
  render: () => {
    const [isAnimating, setIsAnimating] = React.useState(false);

    return (
      <div className="p-6 bg-bg-root space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-text-primary font-display">
            Campus Unlock Banner
          </h2>
          <button
            onClick={() => setIsAnimating(true)}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400"
          >
            Trigger Animation
          </button>
        </div>

        <CampusUnlockBanner
          {...createSampleUnlockData()}
          isAnimating={isAnimating}
          onCelebrationComplete={() => setIsAnimating(false)}
        />
      </div>
    );
  },
};

export const PostComposerDemo: StoryObj = {
  render: () => (
    <div className="p-6 bg-bg-root max-w-lg">
      <h2 className="text-xl font-bold text-text-primary mb-4 font-display">
        Post Composer
      </h2>
      <PostComposer
        onSubmit={(content, reactions) => {
          console.log("Post submitted:", { content, reactions });
          alert(`Posted: "${content}" with reactions: ${reactions.join(", ")}`);
        }}
        autoFocus
      />
    </div>
  ),
};

export const MainFeedDemo: StoryObj = {
  render: () => (
    <div className="p-6 bg-bg-root">
      <h2 className="text-xl font-bold text-text-primary mb-4 font-display">
        Main Feed
      </h2>
      <div className="max-w-2xl border border-border-line rounded-lg">
        <MainFeed
          items={createSampleFeedItems()}
          onItemClick={(item) => console.log("Feed item clicked:", item)}
          onLoadMore={() => console.log("Load more requested")}
          hasMore={true}
          className="h-96"
        />
      </div>
    </div>
  ),
};

export const MobileFeedLayout: StoryObj = {
  render: () => (
    <div className="max-w-sm mx-auto bg-bg-root min-h-screen">
      {/* Mobile header */}
      <div className="p-4 border-b border-border-line">
        <h1 className="text-xl font-bold font-display text-text-primary">
          HIVE
        </h1>
      </div>

      {/* Mobile top strip */}
      <div className="p-3">
        <TopStrip
          items={createSampleTopStripItems().slice(0, 3)}
          onItemClick={(item) => console.log("Mobile item clicked:", item)}
        />
      </div>

      {/* Mobile post composer */}
      <div className="p-3 border-b border-border-line">
        <PostComposer
          placeholder="Share with your campus..."
          onSubmit={(content, reactions) =>
            console.log("Mobile post:", { content, reactions })
          }
        />
      </div>

      {/* Mobile feed */}
      <MainFeed
        items={createSampleFeedItems()}
        onItemClick={(item) => console.log("Mobile feed item:", item)}
        className="flex-1"
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
