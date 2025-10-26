// Bounded Context Owner: Community Guild
import { SpacePostAggregate, type SpacePostCreationInput, type SpacePostSnapshot } from "@core";

const createPostSnapshot = (input: SpacePostCreationInput): SpacePostSnapshot => {
  const creation = SpacePostAggregate.create(input);

  if (!creation.ok) {
    throw new Error(`Failed to create post fixture: ${creation.error}`);
  }

  const aggregate = creation.value;
  aggregate.pullDomainEvents();
  return aggregate.toSnapshot();
};

export const seedSpacePostSnapshots: readonly SpacePostSnapshot[] = [
  createPostSnapshot({
    id: "post-robotics-event",
    spaceId: "space-robotics",
    authorId: "profile-jwrhineh",
    authorHandle: "@jacob",
    content: "Autonomous Rover Test Night. RSVP to help calibrate sensors before competition weekend.",
    createdAt: new Date(Date.now() - 1000 * 60 * 90),
    tags: ["events", "hardware", "practice"],
    kind: "event",
    audience: "campus",
    origin: "tool_manual",
    shareToCampus: true,
    attachments: [
      {
        type: "image",
        url: "https://cdn.hive.so/spaces/robotics/rover-test.jpg",
        title: "Rover test flyer"
      }
    ],
    event: {
      title: "Autonomous Rover Test Night",
      description: "Bring safety goggles + laptop. Live drivetrain test with TA support.",
      location: "Foundry Lab",
      startAt: new Date(Date.now() + 1000 * 60 * 5),
      endAt: new Date(Date.now() + 1000 * 60 * 90),
      maxAttendees: 40,
      enableWaitlist: true,
      goingCount: 18,
      maybeCount: 6,
      waitlistCount: 2,
      checkInEnabled: true,
      checkedInCount: 0,
      checkInWindowBefore: 30,
      checkInWindowAfter: 60,
      qrCodeEnabled: true,
      coHostIds: ["profile-luca"],
      coHostNames: ["Luca Nguyen"],
      isRssImported: false,
      userRsvp: "going",
      userCheckedIn: false,
      coverImageUrl: "https://cdn.hive.so/spaces/robotics/rover-test.jpg",
      coverImageAlt: "Students testing a rover in the lab"
    }
  }),
  createPostSnapshot({
    id: "post-robotics-1",
    spaceId: "space-robotics",
    authorId: "profile-jwrhineh",
    authorHandle: "@jacob",
    content: "Ops update: sensor kits are staged. Ping here if you still need one for the rover build—9 left!",
    createdAt: new Date(Date.now() - 1000 * 60 * 3),
    tags: ["hardware", "sensors"]
  }),
  createPostSnapshot({
    id: "post-robotics-2",
    spaceId: "space-robotics",
    authorId: "profile-luca",
    authorHandle: "@luca",
    content: "CAD session recording uploaded. Start at 12:32 for the CAM walkthrough.",
    createdAt: new Date(Date.now() - 1000 * 60 * 42)
  }),
  createPostSnapshot({
    id: "post-panic-1",
    spaceId: "space-panic-relief",
    authorId: "profile-sam",
    authorHandle: "@sam",
    content: "Anyone awake and willing to review orgo mechanisms? Midterm is wrecking me.",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    tags: ["orgo", "help"]
  }),
  createPostSnapshot({
    id: "post-panic-2",
    spaceId: "space-panic-relief",
    authorId: "profile-kai",
    authorHandle: "@kai",
    content: "10 minute breathing track from last night's calm circle. Queue it if your heart is racing.",
    createdAt: new Date(Date.now() - 1000 * 60 * 55)
  }),
  createPostSnapshot({
    id: "post-panic-event",
    spaceId: "space-panic-relief",
    authorId: "profile-nia",
    authorHandle: "@nia",
    content: "Midnight Calm Circle is back tonight. Add it to your calendar and bring a friend who needs a reset.",
    createdAt: new Date(Date.now() - 1000 * 60 * 150),
    tags: ["wellness", "night"],
    kind: "event",
    audience: "members",
    origin: "tool_manual",
    attachments: [],
    event: {
      title: "Midnight Calm Circle",
      description: "10 minute breathing + affirmation check-in.",
      location: "Discord Voice",
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 2),
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 2.5),
      maxAttendees: 60,
      enableWaitlist: false,
      goingCount: 32,
      maybeCount: 8,
      waitlistCount: 0,
      checkInEnabled: true,
      checkedInCount: 0,
      checkInWindowBefore: 15,
      checkInWindowAfter: 30,
      qrCodeEnabled: false,
      coHostIds: ["profile-nia"],
      coHostNames: ["Nia"],
      isRssImported: false,
      userRsvp: "maybe",
      userCheckedIn: false,
      coverImageUrl: null,
      coverImageAlt: null
    }
  }),
  createPostSnapshot({
    id: "post-richmond-1",
    spaceId: "space-dorm-richmond",
    authorId: "profile-lee",
    authorHandle: "@lee",
    content: "Doing a Target run at 8pm. DM snacks/supply requests. Need a ride? 2 seats open.",
    createdAt: new Date(Date.now() - 1000 * 60 * 18)
  }),
  createPostSnapshot({
    id: "post-richmond-event",
    spaceId: "space-dorm-richmond",
    authorId: "profile-jordan",
    authorHandle: "@jordan",
    content: "Movie night poll closes at 5pm—RSVP so we know how much popcorn to prep.",
    createdAt: new Date(Date.now() - 1000 * 60 * 210),
    tags: ["community", "events"],
    kind: "event",
    audience: "members",
    origin: "member",
    event: {
      title: "Floor Movie Night",
      description: "Bring blankets; polls open for movie choice.",
      location: "7th Floor Lounge",
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 26.5),
      maxAttendees: 50,
      enableWaitlist: true,
      goingCount: 22,
      maybeCount: 10,
      waitlistCount: 0,
      checkInEnabled: false,
      checkedInCount: 0,
      checkInWindowBefore: 0,
      checkInWindowAfter: 0,
      qrCodeEnabled: false,
      coHostIds: ["profile-jordan"],
      coHostNames: ["Jordan"],
      isRssImported: false,
      userRsvp: "going",
      userCheckedIn: false,
      coverImageUrl: null,
      coverImageAlt: null
    }
  })
];
