import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { userEvent } from "@testing-library/user-event";
import type { SpaceAnalyticsEvent } from "../types";
import { getAnalyticsEvents, getFirstElement } from "../types";
import { createTestUser, createTestSpace } from "../setup";

// Mock SpaceFeed component since it's just an example
const SpaceFeed = ({
  spaces,
  currentUser: _currentUser,
  isLoading,
  error,
}: {
  spaces: ReturnType<typeof createTestSpace>[];
  currentUser: ReturnType<typeof createTestUser>;
  isLoading?: boolean;
  error?: Error;
}) => {
  if (isLoading) {
    return <div data-testid="space-feed-skeleton">Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (spaces.length === 0) {
    return <div>No spaces found</div>;
  }

  return (
    <div>
      {spaces.map((space) => (
        <div key={space.id}>
          <h3>{space.name}</h3>
          <button data-testid="join-space-button">Join Space</button>
        </div>
      ))}
    </div>
  );
};

describe("SpaceFeed", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Clear analytics events before each test
    (window as unknown as { analyticsEvents: unknown[] }).analyticsEvents = [];
  });

  it("should display spaces and track view events", async () => {
    // Create test data with proper types
    const testUser = createTestUser();
    const testSpaces = [
      createTestSpace({ id: "space-1" }),
      createTestSpace({ id: "space-2" }),
    ];

    // Render component
    render(<SpaceFeed spaces={testSpaces} currentUser={testUser} />);

    // Wait for spaces to be displayed
    await waitFor(() => {
      expect(screen.getByText(testSpaces[0].name)).toBeInTheDocument();
      expect(screen.getByText(testSpaces[1].name)).toBeInTheDocument();
    });

    // Verify analytics events
    const viewEvents = getAnalyticsEvents<SpaceAnalyticsEvent>("SPACE_VIEW");
    expect(viewEvents).toHaveLength(2);
    expect(viewEvents[0]).toMatchObject({
      type: "SPACE_VIEW",
      spaceId: "space-1",
      userId: testUser.id,
    });
  });

  it("should handle joining a space", async () => {
    const testUser = createTestUser();
    const testSpace = createTestSpace();

    render(<SpaceFeed spaces={[testSpace]} currentUser={testUser} />);

    // Find and click join button
    const joinButton = getFirstElement<HTMLButtonElement>("[data-testid='join-space-button']");
    expect(joinButton).not.toBeNull();
    if (joinButton) {
      await user.click(joinButton);
    }

    // Verify join event
    const joinEvents = getAnalyticsEvents<SpaceAnalyticsEvent>("SPACE_JOIN");
    expect(joinEvents).toHaveLength(1);
    expect(joinEvents[0]).toMatchObject({
      type: "SPACE_JOIN",
      spaceId: testSpace.id,
      userId: testUser.id,
    });
  });

  it("should handle empty space list", () => {
    const testUser = createTestUser();
    
    render(<SpaceFeed spaces={[]} currentUser={testUser} />);
    
    expect(screen.getByText(/no spaces found/i)).toBeInTheDocument();
  });

  it("should handle loading state", () => {
    const testUser = createTestUser();
    
    render(<SpaceFeed spaces={[]} currentUser={testUser} isLoading={true} />);
    
    expect(screen.getByTestId("space-feed-skeleton")).toBeInTheDocument();
  });

  it("should handle error state", () => {
    const testUser = createTestUser();
    const error = new Error("Failed to load spaces");
    
    render(<SpaceFeed spaces={[]} currentUser={testUser} error={error} />);
    
    expect(screen.getByText(/failed to load spaces/i)).toBeInTheDocument();
  });
}); 