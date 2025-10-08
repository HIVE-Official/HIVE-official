lets # HIVE Campus Patterns

**Version:** 1.0
**Last Updated:** October 2025
**Status:** Production Standards

## Overview

This document defines **campus-specific behavioral patterns** that differentiate HIVE from generic social platforms. These patterns are derived from actual UB student behavior and optimized for the < 3 second engagement loop.

**Core Principle:** Social capital should be **public and quantified** on campus, similar to mainstream social media (Instagram, Twitter). Engagement metrics, connections, and activity drive campus networking.

---

## Table of Contents

1. [Social Proof Patterns](#1-social-proof-patterns)
2. [Trending & Discovery](#2-trending--discovery)
3. [Event RSVP Behavior](#3-event-rsvp-behavior)
4. [Information Density](#4-information-density)
5. [Temporal Context](#5-temporal-context)
6. [Quick Actions](#6-quick-actions)
7. [Campus vs Space Context](#7-campus-vs-space-context)
8. [Visibility & Privacy](#8-visibility--privacy)

---

## 1. Social Proof Patterns

**Priority:** #1 - Most important campus engagement driver

### 1.1 Mutual Connections (Primary Signal)

**Rule:** Mutual friends/connections are the **strongest** social proof indicator.

```typescript
// Priority hierarchy
1. Mutual connections ("5 mutual friends")
2. Same spaces ("Both in CS Study Group")
3. Same major/year ("CS '26")
4. Proximity ("Lives in Ellicott")
5. Greek life (if applicable)
```

**UI Implementation:**

```tsx
<UserCard>
  <Avatar />
  <UserInfo>
    <Name>Sarah Chen</Name>
    <Handle>@sarahc</Handle>

    {/* PRIMARY: Mutual connections (always show if > 0) */}
    {mutualCount > 0 && (
      <MutualBadge priority="primary">
        {mutualCount} mutual {mutualCount === 1 ? "friend" : "friends"}
      </MutualBadge>
    )}

    {/* SECONDARY: Stacked context (show all that apply) */}
    <ContextStack>
      {sameSpaces.length > 0 && (
        <Badge variant="secondary">
          {sameSpaces[0].name}{" "}
          {sameSpaces.length > 1 && `+${sameSpaces.length - 1}`}
        </Badge>
      )}
      {sameMajor && <Badge variant="outline">{major}</Badge>}
      {proximity && <Badge variant="ghost">{proximity}</Badge>}
    </ContextStack>
  </UserInfo>
</UserCard>
```

### 1.2 Friend Activity ("Jake, Sarah +3 reacted")

**Spec Reference:** Line 451-453, 481-485

```tsx
<PostCard>
  {/* Show friend reactions ABOVE post content */}
  {friendsWhoReacted.length > 0 && (
    <SocialProof className="mb-2">
      <AvatarStack avatars={friendsWhoReacted.slice(0, 3)} size="xs" />
      <Text size="sm" variant="secondary">
        {formatFriendsList(friendsWhoReacted)} reacted
      </Text>
    </SocialProof>
  )}

  <PostContent>{content}</PostContent>
</PostCard>
```

**Formatting Rules:**

- 1 friend: "Jake reacted"
- 2 friends: "Jake and Sarah reacted"
- 3+ friends: "Jake, Sarah +3 reacted"
- Always show max 3 avatars in stack

### 1.3 "Who's Going" (Event Context)

**User Feedback:** Time + who's going are critical for event decisions

```tsx
<EventCard>
  <EventTime urgent={isWithin24Hours}>{formatEventTime(startTime)}</EventTime>

  {/* Friend attendance is KEY decision factor */}
  <AttendancePreview>
    <AvatarStack avatars={friendsGoing.slice(0, 5)} />
    <Text>
      {friendsGoing.length > 0 ? (
        <>
          {formatFriendsList(friendsGoing)}{" "}
          {friendsGoing.length === 1 ? "is" : "are"} going
        </>
      ) : (
        <>{totalGoing} people are going</>
      )}
    </Text>
  </AttendancePreview>

  <RSVPActions>
    <Button variant="default">Going</Button>
    <Button variant="outline">Interested</Button>
  </RSVPActions>
</EventCard>
```

### 1.4 Public Social Capital Metrics

**Rule:** All engagement metrics are PUBLIC, like Instagram/Twitter

**Always Visible:**

- Connection count (e.g., "234 connections")
- Post engagement (reactions, comments, shares)
- Space member count
- Event RSVP count
- Ritual participation count
- Check-in streaks

```tsx
<ProfileHeader>
  <ProfileStats>
    {/* All PUBLIC - no privacy toggle */}
    <Stat label="Connections" value={connectionCount} />
    <Stat label="Spaces" value={spaceCount} />
    <Stat label="Posts" value={postCount} />
  </ProfileStats>
</ProfileHeader>
```

**Why Public:** Students WANT to quantify and display social capital on campus. This drives engagement and network effects.

---

## 2. Trending & Discovery

**User Feedback:** "Seeing what stupid shit is trending or what friends are doing"

### 2.1 Trending Indicator

**Spec Reference:** Lines 452, 476-478, 2065-2110

```tsx
<FeedPost>
  {trendingIndicator && (
    <TrendingBadge className="absolute top-2 right-2">Trending</TrendingBadge>
  )}

  {/* Trending context */}
  {trendingContext && (
    <TrendingContext>
      <Flame className="h-3 w-3" />
      <Text size="xs">Trending in {trendingContext}</Text>
    </TrendingContext>
  )}
</FeedPost>
```

**Trending Context Types:**

- "Trending on campus" (campus-wide)
- "Trending in CS" (major-specific)
- "Trending in Greek Life" (category-specific)
- "143 people are talking about this"

### 2.2 Algorithm Score → Visual Prominence

**Spec Reference:** Lines 446-473

```typescript
// Higher algo score = more prominent display
const cardSize = {
  promoted: "large", // 2x height, full cover photo
  standard: "medium", // Normal card
  demoted: "compact", // Minimal card, compressed
}[
  algorithmScore >= 0.8
    ? "promoted"
    : algorithmScore >= 0.4
      ? "standard"
      : "demoted"
];
```

**Promoted Post Features:**

- 2x card height
- Full-width cover image
- Larger text
- More prominent CTA buttons
- Social proof displayed above fold

### 2.3 "Why Am I Seeing This?" Signals

**Rule:** Always show attribution for non-obvious content

```tsx
<FeedPost>
  {/* Attribution line - helps users understand feed */}
  <Attribution>
    {reason === "mutual-friend" && <>Friends with {mutualFriend.name}</>}
    {reason === "same-space" && <>From {space.name}</>}
    {reason === "trending" && <>Trending in {category}</>}
    {reason === "same-major" && <>Popular with {major} students</>}
  </Attribution>

  <PostContent />
</FeedPost>
```

---

## 3. Event RSVP Behavior

**User Feedback:** Time + who's going determines decisions

### 3.1 Event Decision Factors (Priority Order)

1. **Who's going** (friend social proof) - #1
2. **Time & location** (logistics)
3. **Event type** (party vs study session)
4. **Space affiliation** (trust signal)

### 3.2 RSVP UI Pattern

```tsx
<EventCard>
  {/* 1. TIME - Immediate scan */}
  <EventTime urgent={isUrgent}>
    {isToday ? formatTimeToday(time) : formatDateAndTime(time)}
  </EventTime>

  {/* 2. WHO'S GOING - Social proof */}
  <FriendsGoing>
    <AvatarStack friends={friendsGoing} max={5} />
    <Text>
      {friendsGoing.length > 0
        ? `${formatFriends(friendsGoing)} ${friendsGoing.length === 1 ? "is" : "are"} going`
        : `${totalGoing} people going`}
    </Text>
  </FriendsGoing>

  {/* 3. LOCATION - Quick glance */}
  <Location>
    {building}, {campus}
  </Location>

  {/* 4. RSVP - Two-button pattern (no swipe) */}
  <RSVPButtons>
    <Button
      variant={userRsvp === "going" ? "default" : "outline"}
      onClick={() => rsvp("going")}
    >
      Going
    </Button>
    <Button
      variant={userRsvp === "interested" ? "default" : "outline"}
      onClick={() => rsvp("interested")}
    >
      Interested
    </Button>
  </RSVPButtons>
</EventCard>
```

**No Swipe Gestures:** Students prefer tap buttons over swipe-to-RSVP (more explicit, less accidental).

---

## 4. Information Density

**Rule:** Show MORE content, decorate LESS

### 4.1 Profile Card Information Hierarchy

**Immediately Visible (No Click Required):**

```tsx
<ProfileCard variant="preview">
  {/* ALWAYS visible */}
  <Avatar size="lg" />
  <Name>{displayName}</Name>
  <Handle>@{handle}</Handle>

  {/* PRIORITY social proof */}
  {mutualCount > 0 && <MutualBadge>{mutualCount} mutual</MutualBadge>}

  {/* STACKED context (all visible) */}
  <Major>
    {major} '{yearShort}
  </Major>
  {sameSpaces.length > 0 && <SpaceBadge>{sameSpaces[0].name}</SpaceBadge>}
  {proximity && <ProximityTag>{proximity}</ProximityTag>}

  {/* CONNECT action */}
  <ConnectButton />
</ProfileCard>
```

**Click to Expand:**

- Full bio
- All spaces (if > 1)
- Recent activity
- Mutual friends list

### 4.2 Feed Post Card Information

```tsx
<PostCard>
  {/* Header: Author + Context */}
  <PostHeader>
    <Avatar size="sm" />
    <div>
      <Name>{author.name}</Name>
      <Text size="xs" variant="secondary">
        @{author.handle} · {relativeTime}
      </Text>
    </div>
    <SpaceBadge>{space.name}</SpaceBadge>
  </PostHeader>

  {/* Social proof ABOVE content */}
  {friendsWhoReacted.length > 0 && (
    <SocialProof>
      <AvatarStack friends={friendsWhoReacted.slice(0, 3)} />
      <Text>{formatFriends(friendsWhoReacted)} reacted</Text>
    </SocialProof>
  )}

  {/* Content */}
  <PostContent>{content}</PostContent>

  {/* PUBLIC engagement metrics */}
  <PostActions>
    <ReactionButton count={reactionCount} />
    <CommentButton count={commentCount} />
    <ShareButton count={shareCount} />
  </PostActions>
</PostCard>
```

---

## 5. Temporal Context

**Rule:** Urgency increases as deadlines approach

### 5.1 Time-Based Visual Urgency

```typescript
const getUrgencyStyle = (deadline: Date) => {
  const hoursUntil = differenceInHours(deadline, now);

  if (hoursUntil < 2) {
    return {
      color: "text-red-500",
      badge: "Starting soon!",
      variant: "urgent",
    };
  }

  if (hoursUntil < 24) {
    return {
      color: "text-orange-500",
      badge: "Today",
      variant: "soon",
    };
  }

  if (hoursUntil < 168) {
    // 7 days
    return {
      color: "text-blue-500",
      badge: formatDayOfWeek(deadline),
      variant: "upcoming",
    };
  }

  return {
    color: "text-muted-foreground",
    badge: formatDate(deadline),
    variant: "future",
  };
};
```

### 5.2 FOMO Indicators

**Spec Reference:** Line 462, 2123-2156

```tsx
{
  /* Event filling up */
}
{
  rsvpRate > 0.8 && (
    <FOMOBadge variant="warning">
      Filling up fast · {spotsRemaining} spots left
    </FOMOBadge>
  );
}

{
  /* Deadline approaching */
}
{
  hoursUntil < 24 && (
    <DeadlineBadge variant="urgent">Last day to RSVP</DeadlineBadge>
  );
}

{
  /* Popular right now */
}
{
  recentEngagement > threshold && (
    <TrendingBadge>
      {recentEngagementCount} people are talking about this
    </TrendingBadge>
  );
}
```

### 5.3 Last Active Timestamps

**Rule:** Show recency for context, not surveillance

```tsx
<UserCard>
  {/* Show if within last 30 minutes */}
  {isRecentlyActive && (
    <PresenceIndicator variant="online">Active now</PresenceIndicator>
  )}

  {/* Otherwise show relative time if within 24h */}
  {isWithin24Hours && !isRecentlyActive && (
    <Text size="xs" variant="tertiary">
      Active {formatDistanceToNow(lastActive)} ago
    </Text>
  )}
</UserCard>
```

---

## 6. Quick Actions

**User Feedback:** Common campus coordination needs

### 6.1 High-Frequency Campus Behaviors

**Top 5 Most Common Posts:**

1. "Need a ride to [place]?" → Quick ride request
2. "Study session tonight?" → Study coordination
3. Event RSVPs → Going/Interested buttons
4. Textbook selling/buying → Marketplace quick post
5. "Who's going to [event]?" → Social coordination

### 6.2 Composer Quick Actions

```tsx
<Composer>
  <Textarea
    placeholder="What's happening at UB?"
    value={text}
    onChange={setText}
  />

  {/* Quick action shortcuts */}
  <QuickActions>
    <QuickActionButton icon={Car} onClick={() => insertTemplate("ride")}>
      Need Ride
    </QuickActionButton>
    <QuickActionButton icon={Book} onClick={() => insertTemplate("study")}>
      Study Session
    </QuickActionButton>
    <QuickActionButton
      icon={ShoppingCart}
      onClick={() => insertTemplate("marketplace")}
    >
      Sell/Buy
    </QuickActionButton>
  </QuickActions>

  {/* Slash commands for tools */}
  <SlashCommands>/poll, /event, /task, /resource</SlashCommands>
</Composer>
```

**Template Inserts:**

```typescript
const templates = {
  ride: "Looking for a ride to {location} {time}. Anyone going?",
  study: "Study session for {class} tonight at {time} in {location}. Who's in?",
  marketplace: "Selling: {item} - ${price}. DM if interested!",
};
```

### 6.3 Mobile Gesture Standards

**User Feedback:** Pull-to-refresh is #1, swipe RSVP not preferred

**Priority Gestures (Ranked):**

1. **Pull-to-refresh** (essential) - Refresh feed
2. **Long-press** (contextual menus) - Quick actions (save, share, report)
3. **Swipe notifications** (dismissal) - Swipe left to dismiss
4. ~~Swipe event cards~~ (not used) - Prefer tap buttons
5. ~~Swipe between spaces~~ (not used) - Use tabs instead

```tsx
// Pull-to-refresh pattern
<Feed
  onRefresh={async () => {
    await fetchLatestPosts();
  }}
/>

// Long-press contextual menu
<PostCard
  onLongPress={() => showContextMenu([
    { label: 'Save post', icon: Bookmark },
    { label: 'Share to story', icon: Share },
    { label: 'Report', icon: Flag, variant: 'destructive' }
  ])}
/>
```

---

## 7. Campus vs Space Context

**Rule:** UX adapts based on viewing context

### 7.1 Campus Feed (Broad Discovery)

```tsx
<CampusFeedPost>
  {/* Show WHY you're seeing this */}
  <Attribution>
    {reason === "friend" && <>From {friend.name}</>}
    {reason === "space" && <>From {space.name}</>}
    {reason === "trending" && <>Trending in {category}</>}
  </Attribution>

  {/* Show social proof */}
  <SocialProof>
    {friendsWhoReacted.length > 0 && (
      <>{formatFriends(friendsWhoReacted)} reacted</>
    )}
  </SocialProof>

  {/* Show space badge */}
  <SpaceBadge>{space.name}</SpaceBadge>

  <PostContent />
</CampusFeedPost>
```

### 7.2 Space Feed (Known Context)

```tsx
<SpaceFeedPost>
  {/* NO attribution needed - already in space */}
  {/* NO space badge - redundant */}

  {/* Just author + time */}
  <PostHeader>
    <Avatar />
    <Name>{author.name}</Name>
    <Time>{relativeTime}</Time>
  </PostHeader>

  {/* Optional social proof if friends reacted */}
  {friendsInSpace.length > 0 && (
    <SocialProof compact>
      {friendsInSpace.length}{" "}
      {friendsInSpace.length === 1 ? "friend" : "friends"} reacted
    </SocialProof>
  )}

  <PostContent />
</SpaceFeedPost>
```

**Key Difference:** Space feed is CLEANER (less context needed), campus feed is RICHER (more signals to understand relevance).

---

## 8. Visibility & Privacy

**Rule:** Default to PUBLIC, opt-in to privacy

### 8.1 Always Public (No Privacy Toggle)

- Connection count
- Space memberships (except private spaces)
- Post engagement metrics (reactions, comments, shares)
- Event RSVP status
- Major & year
- Campus affiliation

### 8.2 Connections-Only

- Full mutual friends list (count is public, names are connections-only)
- Phone number / email
- Private space membership
- DM history

### 8.3 Same-Space-Only

- Space-specific role (leader, moderator)
- Join date within space
- Space contribution score

### 8.4 Never Public

- Location sharing (real-time)
- Private messages
- Report history
- Blocked users list
- Analytics dashboards (personal insights)

### 8.5 Privacy Implementation

```tsx
<ProfileSection>
  {/* Always visible */}
  <PublicInfo>
    <ConnectionCount>{count}</ConnectionCount>
    <Major>
      {major} '{year}
    </Major>
    <Spaces>{publicSpaces.length} spaces</Spaces>
  </PublicInfo>

  {/* Connections-only */}
  {isConnection && (
    <ConnectionInfo>
      <MutualFriends>{mutualFriends}</MutualFriends>
      <ContactInfo>{email}</ContactInfo>
    </ConnectionInfo>
  )}

  {/* Same-space-only */}
  {isInSameSpace && (
    <SpaceInfo>
      <SpaceRole>Space Leader</SpaceRole>
      <JoinDate>Joined {formatDate(joinedAt)}</JoinDate>
    </SpaceInfo>
  )}
</ProfileSection>
```

**Rationale:** Students WANT to display social capital publicly. Privacy is opt-in for sensitive data (contact info, location), but social metrics are proudly displayed.

---

## 9. Campus-Specific Component Patterns

### 9.1 Space Type Variations

**Spec Reference:** Lines 401-430

**Greek Life Spaces:**

```tsx
<GreekSpaceCard rushMode={isRushSeason}>
  {isRushSeason && (
    <RushBanner variant="prominent">Rush Week · Learn More</RushBanner>
  )}
  <SpaceBadge variant="greek">Greek Life</SpaceBadge>
  <MembershipBadge>Invite Only</MembershipBadge>
</GreekSpaceCard>
```

**Academic Spaces:**

```tsx
<AcademicSpaceCard finalsMode={isFinalsWeek}>
  {isFinalsWeek && (
    <FinalsBanner>Finals Week · Study Resources Available</FinalsBanner>
  )}
  <SpaceBadge variant="academic">Academic · {major}</SpaceBadge>
  <StudyResourcesButton />
</AcademicSpaceCard>
```

**Residential Spaces:**

```tsx
<ResidentialSpaceCard building={building}>
  <SpaceBadge variant="residential">Residential · {building}</SpaceBadge>
  {hasEmergencyAlert && (
    <EmergencyAlert priority="high">Building Alert</EmergencyAlert>
  )}
  <MembershipBadge>Auto-join for residents</MembershipBadge>
</ResidentialSpaceCard>
```

### 9.2 Ritual Participation UI

**Spec Reference:** Lines 513-576

```tsx
<RitualCard>
  <RitualHeader>
    <RitualIcon type={ritual.rewardType} />
    <RitualTitle>{ritual.name}</RitualTitle>
    {ritual.campusWide && <CampusBadge>Campus-Wide</CampusBadge>}
  </RitualHeader>

  {/* PUBLIC participation metrics */}
  <RitualMetrics>
    <Metric>
      <MetricValue>{ritual.participantCount}</MetricValue>
      <MetricLabel>students joined</MetricLabel>
    </Metric>
    <Metric>
      <MetricValue>{ritual.completionRate}%</MetricValue>
      <MetricLabel>completion rate</MetricLabel>
    </Metric>
  </RitualMetrics>

  {/* Leaderboard (public rankings) */}
  <RitualLeaderboard>
    <LeaderboardTitle>Top Streaks</LeaderboardTitle>
    {ritual.streakLeaderboard.slice(0, 5).map((profile, i) => (
      <LeaderboardItem key={profile.id} rank={i + 1}>
        <Avatar src={profile.avatar} size="sm" />
        <Name>{profile.name}</Name>
        <Streak>{profile.streak} days</Streak>
      </LeaderboardItem>
    ))}
  </RitualLeaderboard>

  <RitualActions>
    <Button variant="default" onClick={handleCheckIn}>
      Check In Today
    </Button>
    <Button variant="outline" onClick={viewFullLeaderboard}>
      View Full Leaderboard
    </Button>
  </RitualActions>
</RitualCard>
```

---

## 10. Implementation Checklist

### For Each HIVE Component:

- [ ] Shows mutual connections if > 0 (primary social proof)
- [ ] Uses public metrics (no hiding connection/engagement counts)
- [ ] Adapts to context (campus feed vs space feed)
- [ ] Shows temporal urgency for time-sensitive content
- [ ] Provides "why am I seeing this?" attribution
- [ ] Displays trending indicators where relevant
- [ ] Uses friend social proof ("Jake, Sarah reacted")
- [ ] Supports mobile gestures (pull-to-refresh, long-press)
- [ ] Shows information density (more content, less decoration)
- [ ] Implements proper privacy tiers (public/connections/space)

---

## Resources

- **Design System:** `DESIGN_SYSTEM.md` (component architecture)
- **Product Spec:** `UI_UX_IA_SPEC.md` (full requirements)
- **Core Loop:** "Open app → See feed → Maybe engage → Come back" (< 3s)
- **Behavioral Psychology:** Lines 1940-2220 in spec

---

## Questions?

Contact design system team or reference:

- **UI_UX_IA_SPEC.md** for detailed behavioral psychology patterns
- **DESIGN_SYSTEM.md** for component implementation
- **Storybook** for live examples with campus context

**Last Updated:** October 2025
**Maintainers:** HIVE UX Team
