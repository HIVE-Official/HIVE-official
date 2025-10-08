# Spaces Flow: IA/UI/UX Audit

**Date**: October 2025
**Status**: Foundation Complete → IA/UX Refinement Needed
**Auditor**: Claude (Design System Analysis)

---

## Executive Summary

The spaces flow has a **solid design system foundation** (proper tokens, animations, layout modes). Now we need to audit against **campus behavioral patterns** and **information architecture** principles.

### Current State
✅ Design tokens applied consistently
✅ Smooth animations (400ms, cubic-bezier easing)
✅ Two layout modes (sidebar, fullwidth)
✅ Discord-style context panel

### Gaps Identified
❌ Missing social proof signals (mutual connections, friend activity)
❌ No trending indicators or "why am I seeing this?"
❌ Information density too low (hiding critical campus context)
❌ Event RSVP pattern doesn't prioritize "who's going"
❌ Unclear navigation hierarchy
❌ No quick actions for common campus behaviors

---

## 1. Information Architecture Issues

### 1.1 Space Discovery Flow

**Current State**: `spaces-monochrome-homebase.stories.tsx`

```
Discovery → Browse by Category → View Space Card → Join
```

**Problems**:
1. **No social proof on discovery cards** - Can't see mutual connections or friends in space
2. **No trending indicators** - Can't tell which spaces are active
3. **Missing "why am I seeing this?"** - No attribution for recommended spaces
4. **Information hidden** - Member count, post activity not prominent

**Fix Required**:
```tsx
<DiscoverableSpaceCard>
  {/* MISSING: Trending badge */}
  {isTrending && <TrendingBadge>Trending on campus</TrendingBadge>}

  {/* MISSING: Social proof (PRIMARY signal) */}
  {mutualMembers > 0 && (
    <MutualBadge priority="primary">
      {mutualMembers} connections in this space
    </MutualBadge>
  )}

  {/* MISSING: Friend activity */}
  {friendsInSpace.length > 0 && (
    <SocialProof>
      <AvatarStack friends={friendsInSpace.slice(0, 3)} />
      <Text>{formatFriends(friendsInSpace)} are members</Text>
    </SocialProof>
  )}

  {/* Current: Description - GOOD */}
  <Description>{space.description}</Description>

  {/* MISSING: Public metrics (should be MORE prominent) */}
  <PublicMetrics>
    <Metric>{memberCount} members</Metric>
    <Metric>{postCount} posts</Metric>
    <Metric>{activeToday} active today</Metric>
  </PublicMetrics>
</DiscoverableSpaceCard>
```

**Campus Pattern Violated**: CAMPUS_PATTERNS.md Lines 32-74 (Social Proof Patterns)

---

### 1.2 Space Layout - Sidebar vs Main Content Priority

**Current State**: `space-layout.tsx`

```
60% Feed | 40% Sidebar (About, Events, Resources, Members)
```

**Problems**:
1. **About section** (description, rules) takes prime sidebar real estate
2. **Events** buried below about section
3. **Members preview** at bottom (friends in space should be TOP)
4. **No friend activity feed** in sidebar

**Fix Required**:
```tsx
// CORRECT priority order for sidebar (40%)
<Sidebar>
  {/* 1. FRIENDS IN SPACE - Primary social proof */}
  <FriendsInSpace>
    <AvatarStack friends={friendsInSpace} max={8} />
    <Text>{friendsInSpace.length} connections here</Text>
  </FriendsInSpace>

  {/* 2. EVENTS - Time-sensitive, high priority */}
  <SpaceEventsPanel urgentFirst />

  {/* 3. MEMBERS PREVIEW - Who's active */}
  <SpaceMembersPanel
    sortBy="recent-activity"
    showOnlineStatus
  />

  {/* 4. RESOURCES - Utilitarian */}
  <SpaceResourcesPanel />

  {/* 5. ABOUT - Static info, lowest priority */}
  <SpaceAboutSection collapsible defaultCollapsed />
</Sidebar>
```

**Campus Pattern Violated**: CAMPUS_PATTERNS.md Lines 451-453 (Friend Activity Priority)

---

### 1.3 Post Feed - Missing Social Proof

**Current State**: `space-post-feed.tsx`

```tsx
<PostCard>
  <Author + Time />
  <Content />
  <Reactions (count only) />
</PostCard>
```

**Problems**:
1. **No friend reactions shown** - Can't see which connections reacted
2. **No "why am I seeing this?"** - Promoted posts have no attribution
3. **Engagement metrics buried** - Not prominent enough
4. **No trending indicators** - Can't tell if post is popular

**Fix Required**:
```tsx
<PostCard>
  {/* MISSING: Attribution for non-obvious posts */}
  {algorithmScore > 0.7 && (
    <Attribution>
      {reason === "friend-reaction" && (
        <>Sarah and 3 others reacted</>
      )}
      {reason === "trending" && (
        <>Trending in {space.category}</>
      )}
    </Attribution>
  )}

  {/* MISSING: Friend reactions ABOVE content */}
  {friendsWhoReacted.length > 0 && (
    <SocialProof className="mb-2">
      <AvatarStack avatars={friendsWhoReacted.slice(0, 3)} size="xs" />
      <Text size="sm">
        {formatFriendsList(friendsWhoReacted)} reacted
      </Text>
    </SocialProof>
  )}

  <PostHeader>
    <Avatar />
    <Name + Handle />
    <Time />
  </PostHeader>

  <PostContent />

  {/* ENHANCED: More prominent engagement */}
  <PostActions>
    <ReactionButton
      count={reactionCount}
      friendsWhoReacted={friendsWhoReacted}
    />
    <CommentButton count={commentCount} />
    <ShareButton count={shareCount} />
  </PostActions>

  {/* MISSING: Trending indicator */}
  {isTrending && (
    <TrendingBadge>
      {engagementCount} people are talking about this
    </TrendingBadge>
  )}
</PostCard>
```

**Campus Pattern Violated**: CAMPUS_PATTERNS.md Lines 76-94 (Friend Activity), Lines 167-183 (Trending)

---

## 2. User Experience Issues

### 2.1 Event RSVP Pattern

**Current State**: `space-events-panel.tsx`

```tsx
<EventCard>
  <Title + Description />
  <Time + Location />
  <RSVPCount (total only) />
  <RSVPButton />
</EventCard>
```

**Problems**:
1. **"Who's going" is NOT prioritized** - Should be #1 decision factor
2. **No friend attendance shown** - Critical social proof missing
3. **Time urgency not visual** - No color coding for "today" vs "this week"
4. **RSVP count buried** - Should be prominent with avatars

**Fix Required**:
```tsx
<EventCard>
  {/* 1. TIME - Immediate scan with urgency */}
  <EventTime urgent={isWithin24Hours} color={getUrgencyColor(time)}>
    {isToday ? formatTimeToday(time) : formatDateAndTime(time)}
  </EventTime>

  {/* 2. WHO'S GOING - Social proof (PRIMARY) */}
  <FriendsGoing prominent>
    <AvatarStack friends={friendsGoing.slice(0, 5)} />
    <Text weight="semibold">
      {friendsGoing.length > 0 ? (
        <>{formatFriends(friendsGoing)} {friendsGoing.length === 1 ? 'is' : 'are'} going</>
      ) : (
        <>{totalGoing} people going</>
      )}
    </Text>
  </FriendsGoing>

  {/* 3. LOCATION - Quick glance */}
  <Location compact>{building}, {campus}</Location>

  {/* 4. TITLE + DESCRIPTION */}
  <EventTitle>{title}</EventTitle>
  <EventDescription lines={2}>{description}</EventDescription>

  {/* 5. RSVP - Two-button pattern (NO swipe) */}
  <RSVPButtons>
    <Button variant={userRsvp === 'going' ? 'default' : 'outline'}>
      Going
    </Button>
    <Button variant={userRsvp === 'interested' ? 'default' : 'outline'}>
      Interested
    </Button>
  </RSVPButtons>

  {/* FOMO indicators */}
  {rsvpRate > 0.8 && (
    <FOMOBadge>Filling up fast · {spotsRemaining} spots left</FOMOBadge>
  )}
</EventCard>
```

**Campus Pattern Violated**: CAMPUS_PATTERNS.md Lines 239-293 (Event RSVP Behavior)

---

### 2.2 Space Composer - Missing Quick Actions

**Current State**: `space-composer-with-tools.tsx`

```tsx
<Composer>
  <Textarea placeholder="Message #space..." />
  <InlineToolMenu> {/* Poll, Event, Task, Resource */}
  <AttachButtons> {/* File, Image */}
  <SendButton />
</Composer>
```

**Problems**:
1. **No quick actions for common behaviors** - "Need ride", "Study session", "Selling textbook"
2. **Tools menu is generic** - Doesn't prioritize high-frequency campus actions
3. **No template inserts** - Students repeat same patterns

**Fix Required**:
```tsx
<Composer>
  <Textarea placeholder="What's happening at UB?" />

  {/* MISSING: Quick action templates */}
  <QuickActions>
    <QuickActionButton icon={Car} template="ride">
      Need Ride
    </QuickActionButton>
    <QuickActionButton icon={Book} template="study">
      Study Session
    </QuickActionButton>
    <QuickActionButton icon={ShoppingCart} template="marketplace">
      Sell/Buy
    </QuickActionButton>
    <QuickActionButton icon={Calendar} template="event">
      Create Event
    </QuickActionButton>
  </QuickActions>

  {/* Existing tool menu (secondary) */}
  <InlineToolMenu />

  <AttachButtons />
  <SendButton />
</Composer>

// Templates
const templates = {
  ride: "Looking for a ride to {location} {time}. Anyone going?",
  study: "Study session for {class} tonight at {time} in {location}. Who's in?",
  marketplace: "Selling: {item} - ${price}. DM if interested!",
  event: "/event" // Trigger slash command
}
```

**Campus Pattern Violated**: CAMPUS_PATTERNS.md Lines 474-526 (Quick Actions)

---

### 2.3 Context Panel (Thread View) - Missing Features

**Current State**: `space-layout.tsx` (fullwidth mode)

```tsx
<ContextPanel>
  <ThreadHeader>Thread</ThreadHeader>
  <OriginalPost />
  <CommentsPlaceholder>Comments coming soon...</CommentsPlaceholder>
</ContextPanel>
```

**Problems**:
1. **No friend engagement shown** - Can't see which connections commented
2. **No thread social proof** - Missing "5 of your friends are in this thread"
3. **Comments not implemented** - Core feature missing
4. **No quick reply** - Can't respond without closing panel

**Fix Required**:
```tsx
<ContextPanel>
  <ThreadHeader>
    <Title>Thread</Title>
    <CloseButton />
  </ThreadHeader>

  {/* MISSING: Thread social proof */}
  {friendsInThread.length > 0 && (
    <ThreadSocialProof>
      <AvatarStack friends={friendsInThread.slice(0, 3)} size="xs" />
      <Text size="sm">
        {friendsInThread.length} {friendsInThread.length === 1 ? 'friend' : 'friends'} in this thread
      </Text>
    </ThreadSocialProof>
  )}

  <OriginalPost highlighted />

  {/* IMPLEMENT: Comments list */}
  <CommentsSection>
    {comments.map(comment => (
      <CommentCard
        key={comment.id}
        comment={comment}
        isFriend={friendIds.includes(comment.authorId)}
      />
    ))}
  </CommentsSection>

  {/* MISSING: Quick reply without closing panel */}
  <QuickReplyComposer sticky="bottom">
    <Avatar size="sm" />
    <Input placeholder="Reply to thread..." />
    <SendButton />
  </QuickReplyComposer>
</ContextPanel>
```

---

## 3. Information Density Issues

### 3.1 Space About Section - Too Prominent

**Current State**: `space-about-section.tsx`

Takes prime sidebar real estate with:
- Description (long text)
- Tags (visual clutter)
- Stats (redundant with header)
- Rules (rarely read)
- Created by (low priority)

**Problems**:
1. **Static info takes high-priority slot** - Should be collapsible
2. **Stats redundant** - Already in space header
3. **Rules rarely viewed** - Should be in "..." menu
4. **Description too long** - Truncate with "read more"

**Fix Required**:
```tsx
<SpaceAboutSection collapsible defaultCollapsed>
  {/* Compact collapsed state */}
  {collapsed ? (
    <CollapsedPreview onClick={expand}>
      <Description lines={2}>{description}</Description>
      <ExpandButton>Read more</ExpandButton>
    </CollapsedPreview>
  ) : (
    <ExpandedView>
      <Description>{description}</Description>
      <Tags>{tags}</Tags>
      <CreatedBy>{createdBy}</CreatedBy>
      <Rules>{rules}</Rules>
    </ExpandedView>
  )}
</SpaceAboutSection>
```

**Campus Pattern Violated**: CAMPUS_PATTERNS.md Lines 296-333 (Information Density)

---

### 3.2 Members Panel - Missing Activity Context

**Current State**: `space-members-panel.tsx`

```tsx
<MembersPanel>
  <MemberGrid>
    <Avatar />
    <Name />
    <Role badge />
  </MemberGrid>
</MembersPanel>
```

**Problems**:
1. **No online status** - Can't tell who's active
2. **No recent activity** - "Posted 5m ago", "Reacted recently"
3. **No mutual connections** - Missing primary social proof
4. **Random sort order** - Should be: Online → Friends → Recent activity

**Fix Required**:
```tsx
<MembersPanel>
  <MemberList sortBy="social-proof">
    {members.map(member => (
      <MemberCard key={member.id}>
        <Avatar />
        {isOnline && <OnlineIndicator />}

        <MemberInfo>
          <Name>{member.name}</Name>
          <Handle>@{member.handle}</Handle>

          {/* Social proof */}
          {mutualCount > 0 && (
            <MutualBadge>{mutualCount} mutual</MutualBadge>
          )}

          {/* Recent activity */}
          {lastActivity && (
            <Activity size="xs" color="muted">
              {lastActivity.type} {formatRelative(lastActivity.time)}
            </Activity>
          )}
        </MemberInfo>

        {isLeader && <Badge variant="gold">Leader</Badge>}
      </MemberCard>
    ))}
  </MemberList>
</MembersPanel>
```

---

## 4. Navigation & Hierarchy Issues

### 4.1 Unclear Entry Point

**Problem**: No clear "Discover Spaces" vs "My Spaces" distinction in navigation.

**Current**: Single "Spaces" route shows... what? Both? Discovery first?

**Fix Required**:
```tsx
<NavigationShell>
  <NavTabs>
    <NavTab href="/feed">Feed</NavTab>
    <NavTab href="/spaces">My Spaces</NavTab> {/* User's joined spaces */}
    <NavTab href="/spaces/discover">Discover</NavTab> {/* Browse all */}
    <NavTab href="/profile">Profile</NavTab>
  </NavTabs>
</NavigationShell>

// OR: Combined with default view
<NavigationShell>
  <NavTab href="/spaces">
    Spaces
    <DropdownMenu>
      <MenuItem href="/spaces">My Spaces</MenuItem>
      <MenuItem href="/spaces/discover">Discover</MenuItem>
      <MenuItem href="/spaces/trending">Trending</MenuItem>
    </DropdownMenu>
  </NavTab>
</NavigationShell>
```

---

### 4.2 Space Page - Missing Breadcrumbs

**Problem**: When viewing a space, no way to navigate back to "All Spaces" or "Discover".

**Fix Required**:
```tsx
<SpacePage>
  <Breadcrumbs>
    <BreadcrumbItem href="/spaces">My Spaces</BreadcrumbItem>
    <BreadcrumbItem href="/spaces/discover">Discover</BreadcrumbItem>
    <BreadcrumbItem current>{space.name}</BreadcrumbItem>
  </Breadcrumbs>

  <SpaceHeader />
  <SpaceLayout />
</SpacePage>
```

---

## 5. Mobile UX Issues

### 5.1 Missing Pull-to-Refresh

**Campus Pattern**: Pull-to-refresh is #1 priority gesture (CAMPUS_PATTERNS.md Lines 530-547)

**Current**: No pull-to-refresh on space feed.

**Fix Required**:
```tsx
<SpacePostFeed
  onRefresh={async () => {
    await fetchLatestPosts();
  }}
  refreshing={isRefreshing}
/>
```

---

### 5.2 Context Panel - Mobile Overlay

**Current**: Full-screen overlay works, but:
1. No swipe-down to dismiss
2. No backdrop blur on overlay
3. Loses scroll position in feed when closing

**Fix Required**:
```tsx
// Mobile context panel
<motion.div
  drag="y"
  dragConstraints={{ top: 0 }}
  dragElastic={0.2}
  onDragEnd={(e, { offset, velocity }) => {
    if (offset.y > 100 || velocity.y > 500) {
      handleCloseContext(); // Swipe down to dismiss
    }
  }}
  className="fixed inset-0 z-50 bg-background"
>
  {/* Drag handle */}
  <div className="mx-auto w-12 h-1 rounded-full bg-muted my-2" />

  {contextContent}
</motion.div>

// Backdrop with blur
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={handleCloseContext}
  className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
/>
```

---

## 6. Priority Fixes (Ranked by Impact)

### P0: Critical (Blocking Launch)
1. **Add social proof to discovery cards** (mutual connections, friends in space)
2. **Implement "who's going" for events** (friend avatars + names)
3. **Reorder sidebar priority** (Friends → Events → Members → Resources → About)
4. **Add pull-to-refresh to feed**

### P1: High Priority (Launch-adjacent)
5. **Implement comment system in context panel**
6. **Add trending indicators to posts/spaces**
7. **Add quick action templates to composer**
8. **Show friend reactions on posts**
9. **Add online status to member cards**

### P2: Medium Priority (Post-launch)
10. **Add "why am I seeing this?" attribution**
11. **Implement breadcrumb navigation**
12. **Add FOMO indicators to events**
13. **Add swipe-down to dismiss on mobile context panel**
14. **Collapse About section by default**

### P3: Nice to Have
15. **Add trending spaces section to discovery**
16. **Show recent activity on member cards**
17. **Add visibility for private spaces**
18. **Implement space-specific analytics**

---

## 7. Component-by-Component Action Items

### Discovery Components

#### `joined-space-card.tsx`
- [ ] Add mutual connections badge
- [ ] Add friend activity ("3 friends posted today")
- [ ] Show online member count
- [ ] Add trending badge if applicable

#### `discoverable-space-card.tsx`
- [ ] Add mutual members count (PRIMARY)
- [ ] Show friend avatars in space
- [ ] Add "Trending on campus" badge
- [ ] Make metrics MORE prominent (not subtle)
- [ ] Add "why recommended" attribution

#### `space-category-accordion.tsx`
- [ ] Sort categories by user relevance (friends in category)
- [ ] Show category trending indicator
- [ ] Display friend distribution across categories

---

### Space Sidebar Components

#### `space-about-section.tsx`
- [ ] Make collapsible with default collapsed
- [ ] Truncate description to 2 lines when collapsed
- [ ] Remove redundant stats (duplicate from header)
- [ ] Move rules to dropdown menu

#### `space-events-panel.tsx`
- [ ] Reorder: Time → Who's going → Location → RSVP
- [ ] Show friend avatars for "who's going"
- [ ] Add urgency color coding (today = red, this week = orange)
- [ ] Add FOMO indicators (filling up, last day)
- [ ] Remove swipe gestures, use tap buttons only

#### `space-resources-panel.tsx`
- [ ] Add "added by" attribution
- [ ] Show click count as social proof
- [ ] Pin friend-shared resources to top

#### `space-members-panel.tsx`
- [ ] Add online status indicators
- [ ] Show mutual connections count
- [ ] Display recent activity ("Posted 5m ago")
- [ ] Sort by: Online → Friends → Recent activity
- [ ] Add "Friends in this space" section at top

---

### Feed Components

#### `space-post-feed.tsx`
- [ ] Add friend reactions ABOVE content
- [ ] Show "why am I seeing this?" for promoted posts
- [ ] Add trending badges
- [ ] Make engagement metrics MORE prominent
- [ ] Implement pull-to-refresh

#### `space-composer-with-tools.tsx`
- [ ] Add quick action buttons (ride, study, marketplace)
- [ ] Implement template inserts
- [ ] Reorder tool priority (Event → Poll → Task → Resource)
- [ ] Add visual preview for attached tools

#### `space-leader-toolbar.tsx`
- [ ] Add pending content count badges (MORE prominent)
- [ ] Show notification dots for reports
- [ ] Add quick "Pin post" action

---

### Layout Components

#### `space-layout.tsx`
- [ ] Reorder sidebar: Friends → Events → Members → Resources → About
- [ ] Add "Friends in Space" section at top of sidebar
- [ ] Implement comment system in context panel
- [ ] Add thread social proof ("5 friends in thread")
- [ ] Add quick reply composer in context panel
- [ ] Implement swipe-down to dismiss on mobile

---

## 8. Design Patterns to Implement

### Social Proof Pattern
```tsx
// EVERYWHERE: Show mutual connections first
<CampusContext priority="social-proof">
  {mutualCount > 0 && (
    <MutualBadge variant="primary">{mutualCount} mutual</MutualBadge>
  )}
  {sameSpaces.length > 0 && (
    <Badge variant="secondary">{sameSpaces[0].name}</Badge>
  )}
  {sameMajor && <Badge variant="outline">{major}</Badge>}
</CampusContext>
```

### Trending Pattern
```tsx
// Posts, Spaces, Events with high engagement
{isTrending && (
  <TrendingBadge>
    <Flame className="h-3 w-3" />
    <Text size="xs">
      {trendingIn === 'campus' ? 'Trending on campus' : `Trending in ${trendingIn}`}
    </Text>
  </TrendingBadge>
)}
```

### Time Urgency Pattern
```tsx
// Events, deadlines, time-sensitive content
const urgencyStyle = getUrgencyStyle(deadline);

<EventTime
  color={urgencyStyle.color}
  badge={urgencyStyle.badge}
>
  {formatEventTime(time)}
</EventTime>
```

### Friend Activity Pattern
```tsx
// Posts, events, spaces where friends are active
{friendsWhoEngaged.length > 0 && (
  <SocialProof>
    <AvatarStack friends={friendsWhoEngaged.slice(0, 3)} />
    <Text>{formatFriendsList(friendsWhoEngaged)} {actionVerb}</Text>
  </SocialProof>
)}
```

---

## 9. Testing Checklist

### For Each Component:
- [ ] Shows mutual connections when > 0
- [ ] Uses public metrics (no privacy hiding)
- [ ] Adapts to context (campus vs space feed)
- [ ] Shows temporal urgency for time-sensitive items
- [ ] Provides "why am I seeing this?" attribution
- [ ] Displays trending indicators where relevant
- [ ] Shows friend social proof
- [ ] Supports mobile gestures (pull-to-refresh)
- [ ] Information density appropriate (show more, not less)
- [ ] Implements correct privacy tiers

---

## 10. Next Steps

1. **Review this audit** with design/product team
2. **Prioritize P0 fixes** (social proof, events, sidebar reorder)
3. **Create implementation plan** for each component
4. **Update Storybook stories** to show campus context
5. **Test with real campus data** (mutual connections, trending, etc.)
6. **Iterate based on user feedback**

---

**Status**: Ready for implementation sprint
**Estimated Effort**: 2-3 weeks for P0/P1 fixes
**Dependencies**: Need campus context data (mutuals, trending) from backend
