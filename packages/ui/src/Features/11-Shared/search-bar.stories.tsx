import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "../../atomic/molecules/search-bar";
import { Badge } from "../../atomic/atoms/badge";
import { useState } from "react";

/**
 * # SearchBar
 *
 * Molecule component combining Input + Icon for platform-wide search.
 * Used for searching spaces, users, posts, and events across HIVE.
 *
 * ## HIVE Motion System
 * - Uses `transition-smooth ease-liquid` for icon and keyboard shortcut animations
 * - Loading spinner uses `transition-smooth ease-liquid` for smooth appearance
 *
 * ## Usage
 * ```tsx
 * <SearchBar
 *   placeholder="Search spaces..."
 *   onSearch={(value) => console.log(value)}
 *   showShortcut
 * />
 * ```
 */
const meta = {
  title: "11-Shared/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default search bar with magnifying glass icon
 */
export const Default: Story = {
  args: {
    placeholder: "Search...",
    className: "w-[400px]",
  },
};

/**
 * With keyboard shortcut hint (⌘K)
 */
export const WithShortcut: Story = {
  args: {
    placeholder: "Search HIVE...",
    showShortcut: true,
    className: "w-[400px]",
  },
};

/**
 * Loading state while searching
 */
export const Loading: Story = {
  args: {
    placeholder: "Searching...",
    isLoading: true,
    className: "w-[400px]",
  },
};

/**
 * HIVE Pattern: Space discovery search
 */
export const SpaceSearch: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    const spaces = [
      { id: 1, name: "CS Study Group", members: 87, category: "Academic" },
      { id: 2, name: "UB Gaming", members: 143, category: "Gaming" },
      { id: 3, name: "Campus Events", members: 256, category: "Social" },
      { id: 4, name: "Engineering Social", members: 92, category: "Academic" },
    ];

    const filtered = spaces.filter((space) =>
      space.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div className="flex w-[500px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Discover Spaces</h3>
          <Badge variant="secondary">{filtered.length} spaces</Badge>
        </div>

        <SearchBar
          placeholder="Search by name or category..."
          onSearch={setQuery}
          showShortcut
        />

        <div className="space-y-2">
          {filtered.map((space) => (
            <div
              key={space.id}
              className="flex items-center justify-between rounded-lg border border-border bg-background p-3 transition-all duration-smooth ease-liquid hover:border-primary/50 hover:bg-accent"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">{space.name}</span>
                <span className="text-xs text-muted-foreground">{space.members} members</span>
              </div>
              <Badge className="transition-smooth ease-liquid">{space.category}</Badge>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No spaces found. Try a different search term.
            </p>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: User search with avatars
 */
export const UserSearch: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    const users = [
      { id: 1, name: "Sarah Chen", handle: "@sarahc", avatar: "https://github.com/shadcn.png" },
      { id: 2, name: "Alex Morgan", handle: "@alex", avatar: "https://github.com/vercel.png" },
      { id: 3, name: "Jordan Lee", handle: "@jordan", avatar: "/invalid.jpg" },
      { id: 4, name: "Casey Kim", handle: "@casey", avatar: "/invalid2.jpg" },
    ];

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.handle.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div className="flex w-[500px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Find Students</h3>
          <Badge variant="secondary">{filtered.length} online</Badge>
        </div>

        <SearchBar
          placeholder="Search by name or handle..."
          onSearch={setQuery}
        />

        <div className="space-y-2">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 transition-all duration-smooth ease-liquid hover:border-primary/50 hover:bg-accent"
            >
              <div className="h-12 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                {user.avatar && user.avatar !== "/invalid.jpg" && user.avatar !== "/invalid2.jpg" ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-semibold text-primary">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium text-foreground">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.handle}</span>
              </div>
              <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90">
                Follow
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No users found. Try a different search term.
            </p>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Event search with date tags
 */
export const EventSearch: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    const events = [
      { id: 1, name: "Study Session: Data Structures", date: "Today, 7:00 PM", space: "CS Study Group" },
      { id: 2, name: "Campus Game Night", date: "Tomorrow, 8:00 PM", space: "UB Gaming" },
      { id: 3, name: "Career Fair Prep Workshop", date: "Friday, 4:00 PM", space: "Engineering Social" },
      { id: 4, name: "Weekend Hike to Niagara", date: "Saturday, 9:00 AM", space: "Outdoor Adventures" },
    ];

    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div className="flex w-[550px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
          <Badge variant="secondary">{filtered.length} events</Badge>
        </div>

        <SearchBar
          placeholder="Search events..."
          onSearch={setQuery}
          showShortcut
        />

        <div className="space-y-2">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4 transition-all duration-smooth ease-liquid hover:border-primary/50 hover:bg-accent"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{event.name}</span>
                <Badge className="shrink-0 text-xs transition-smooth ease-liquid">
                  {event.date.split(",")[0]}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <svg className="h-3 w-3" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{event.date.split(",")[1]}</span>
                <span>•</span>
                <span>{event.space}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No events found. Try a different search term.
            </p>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Real-time search with loading state
 */
export const RealTimeSearch: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (value: string) => {
      setQuery(value);
      if (!value) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockResults = [
          "CS Study Group",
          "Computer Science Club",
          "CS Career Prep",
          "Data Science Workshop",
        ].filter((item) => item.toLowerCase().includes(value.toLowerCase()));

        setResults(mockResults);
        setIsLoading(false);
      }, 500);
    };

    return (
      <div className="flex w-[450px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground">Search Spaces</h3>

        <SearchBar
          placeholder="Type to search..."
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {query && (
          <div className="rounded-lg border border-border bg-background">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm text-muted-foreground">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-border">
                {results.map((result, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-3 text-left text-sm transition-all duration-smooth ease-liquid hover:bg-accent"
                  >
                    {result}
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Small (320px)</p>
        <SearchBar placeholder="Search..." className="w-[320px]" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Medium (400px)</p>
        <SearchBar placeholder="Search..." className="w-[400px]" showShortcut />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Large (500px)</p>
        <SearchBar placeholder="Search..." className="w-[500px]" showShortcut />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Full Width</p>
        <SearchBar placeholder="Search..." className="w-full" showShortcut />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
