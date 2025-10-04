# Visual Hierarchy & Information Architecture Solution

**The Problem**: How do we add campus context (social proof, trending, friend activity) without creating visual clutter or looking generic?

**The Solution**: Strategic information layering with clear visual hierarchy.

---

## The Anti-Pattern: Badge Soup

### ❌ What NOT To Do
```tsx
// TOO MANY BADGES = VISUAL CLUTTER
<SpaceCard>
  <Title>CS Study Group</Title>

  {/* Badge overload - hard to scan */}
  <Badges>
    <Badge>Trending</Badge>
    <Badge>5 mutual connections</Badge>
    <Badge>CS</Badge>
    <Badge>Academic</Badge>
    <Badge>87 members</Badge>
    <Badge>234 posts</Badge>
    <Badge>12 events</Badge>
    <Badge>Sarah is a member</Badge>
    <Badge>Active today</Badge>
  </Badges>

  <Description>...</Description>
</SpaceCard>
```

**Problems**:
1. **Too many visual elements** competing for attention
2. **No hierarchy** - everything has equal visual weight
3. **Hard to scan** - cognitive overload
4. **Looks generic** - badge soup like every other platform

---

## The Solution: Layered Information Architecture

### Visual Hierarchy Levels

```
LEVEL 1: Primary Signal (1 item max)
  ↓ Eye goes here first
  ↓ Largest, most prominent

LEVEL 2: Secondary Context (2-3 items)
  ↓ Supporting information
  ↓ Medium prominence

LEVEL 3: Tertiary Details (expandable)
  ↓ "More info" on click/hover
  ↓ Subtle, compressed

LEVEL 4: Hidden/Inferred
  ↓ Not shown unless relevant
  ↓ Contextual appearance
```

---

## Space Discovery Card: Layered Approach

### ✅ CORRECT: Clear Hierarchy

```tsx
<SpaceCard className="hover:border-primary transition-all duration-[400ms]">
  {/* LAYER 1: PRIMARY SIGNAL (floating, prominent) */}
  {primarySignal && (
    <PrimarySignal className="absolute top-3 right-3">
      {primarySignal.type === 'trending' && (
        <TrendingBadge variant="prominent">
          <Flame className="h-4 w-4" />
          Trending
        </TrendingBadge>
      )}
      {primarySignal.type === 'friend-activity' && (
        <FriendBadge variant="prominent">
          <AvatarStack size="xs" max={3} avatars={friendsInSpace} />
          {friendsInSpace.length} friends
        </FriendBadge>
      )}
    </PrimarySignal>
  )}

  {/* LAYER 2: CORE CONTENT (main focus) */}
  <CardContent className="p-6 space-y-3">
    {/* Title + Category (inline, single line) */}
    <div className="flex items-baseline gap-2">
      <h3 className="text-lg font-semibold tracking-tight leading-tight">
        {space.name}
      </h3>
      <Badge variant="outline" size="sm">{space.category}</Badge>
    </div>

    {/* Description (2-3 lines max, truncated) */}
    <p className="text-sm text-muted-foreground leading-normal line-clamp-2">
      {space.description}
    </p>

    {/* LAYER 3: SECONDARY SIGNALS (compact row) */}
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      {/* Public metrics (always visible) */}
      <Stat>
        <Users className="h-3 w-3 inline mr-1" />
        {space.memberCount}
      </Stat>
      <Stat>
        <MessageSquare className="h-3 w-3 inline mr-1" />
        {space.postCount}
      </Stat>

      {/* Activity indicator (if recent) */}
      {hasRecentActivity && (
        <ActivityDot>
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span>Active today</span>
        </ActivityDot>
      )}
    </div>
  </CardContent>

  {/* LAYER 4: ACTION (always at bottom) */}
  <CardFooter className="p-6 pt-0">
    <Button variant="default" className="w-full">
      Join Space
    </Button>
  </CardFooter>
</SpaceCard>
```

**Visual Hierarchy**:
1. **Eye goes to**: Trending badge OR friend avatars (top-right)
2. **Then reads**: Space name + description (center)
3. **Then scans**: Member count, post count, activity (bottom stats)
4. **Then acts**: Join button (always at bottom)

**Result**: Clean, scannable, not cluttered.

---

## Information Density: What to Show vs Hide

### Rule: Progressive Disclosure

**Always Visible** (no click required):
- Space name
- Primary category
- Description (2 lines max)
- ONE primary signal (trending OR friends, not both)
- Public metrics (member count, post count)
- Join/Joined button

**Expandable/Hover** (on interaction):
- Full description (if > 2 lines)
- All tags (if > 2 tags)
- Mutual members list (click to see names)
- Recent activity details
- Space rules
- Created by

**Contextual** (only when relevant):
- Trending badge (if trending)
- Friend activity (if friends in space)
- Recent activity dot (if activity today)
- New posts badge (if unread posts)

---

## Space Card: Size Variations

### Compact Card (Discovery Grid)
```tsx
<CompactSpaceCard className="h-48">
  {/* Primary signal: Top-right */}
  <TrendingBadge />

  {/* Core info: Vertical stack */}
  <div className="space-y-2">
    <Title>{name}</Title>
    <Category>{category}</Category>
    <Description lines={2}>{description}</Description>
  </div>

  {/* Stats: Single row */}
  <Stats>
    <Stat icon={Users}>{memberCount}</Stat>
    <Stat icon={MessageSquare}>{postCount}</Stat>
  </Stats>

  {/* Action: Full-width button */}
  <Button>Join</Button>
</CompactSpaceCard>
```

### Expanded Card (Featured/Promoted)
```tsx
<ExpandedSpaceCard className="h-64">
  {/* Cover image (if available) */}
  {coverImage && (
    <CoverImage src={coverImage} className="h-24 object-cover" />
  )}

  {/* Primary signal: Overlay on image */}
  <TrendingBadge className="absolute top-3 right-3" />

  {/* Core info: More space */}
  <div className="p-6 space-y-3">
    <Title size="xl">{name}</Title>
    <Category prominent>{category}</Category>
    <Description lines={3}>{description}</Description>

    {/* SHOW friend activity (more space available) */}
    {friendsInSpace.length > 0 && (
      <FriendActivity>
        <AvatarStack avatars={friendsInSpace.slice(0, 5)} />
        <Text>
          {formatFriends(friendsInSpace)} are members
        </Text>
      </FriendActivity>
    )}

    {/* Stats: Expanded with labels */}
    <Stats>
      <Stat>
        <StatValue>{memberCount}</StatValue>
        <StatLabel>members</StatLabel>
      </Stat>
      <Stat>
        <StatValue>{postCount}</StatValue>
        <StatLabel>posts</StatLabel>
      </Stat>
      <Stat>
        <StatValue>{eventCount}</StatValue>
        <StatLabel>events</StatLabel>
      </Stat>
    </Stats>
  </div>

  {/* Action */}
  <CardFooter>
    <Button size="lg">Join Space</Button>
  </CardFooter>
</ExpandedSpaceCard>
```

**When to use which**:
- **Compact**: Discovery grid (3-4 per row)
- **Expanded**: Featured space, search results, promoted spaces

---

## Post Card: Layered Information

### ✅ CORRECT: Visual Hierarchy

```tsx
<PostCard className="p-4 hover:bg-accent/30 transition-all duration-[400ms]">
  {/* LAYER 1: ATTRIBUTION (if needed) - Top, subtle */}
  {attribution && (
    <Attribution className="text-xs text-muted-foreground mb-2">
      {attribution.reason === 'friend' && (
        <>From CS Study Group · Sarah is a member</>
      )}
      {attribution.reason === 'trending' && (
        <>Trending with CS students</>
      )}
    </Attribution>
  )}

  {/* LAYER 2: SOCIAL PROOF (if friends reacted) - Above content */}
  {friendsWhoReacted.length > 0 && (
    <SocialProof className="mb-3 flex items-center gap-2">
      <AvatarStack size="xs" max={3} avatars={friendsWhoReacted} />
      <Text size="sm" className="text-muted-foreground">
        {formatFriends(friendsWhoReacted)} reacted
      </Text>
    </SocialProof>
  )}

  {/* LAYER 3: AUTHOR + TIME - Single line */}
  <PostHeader className="flex items-center gap-3 mb-3">
    <Avatar size="sm" src={author.avatar} />
    <div className="flex-1 min-w-0">
      <Name className="text-sm font-semibold truncate">{author.name}</Name>
      <Time className="text-xs text-muted-foreground">{relativeTime}</Time>
    </div>

    {/* Space badge (inline, subtle) */}
    <SpaceBadge size="sm" variant="outline">{space.name}</SpaceBadge>
  </PostHeader>

  {/* LAYER 4: CONTENT - Main focus */}
  <PostContent className="text-sm leading-normal mb-4">
    {content}
  </PostContent>

  {/* LAYER 5: ENGAGEMENT - Bottom, single row */}
  <PostActions className="flex items-center gap-6 text-xs text-muted-foreground">
    <ActionButton>
      <Heart className="h-4 w-4" />
      <span>{likeCount}</span>
    </ActionButton>
    <ActionButton>
      <MessageCircle className="h-4 w-4" />
      <span>{commentCount}</span>
    </ActionButton>
    <ActionButton>
      <Share2 className="h-4 w-4" />
      <span>{shareCount}</span>
    </ActionButton>
  </PostActions>

  {/* LAYER 6: TRENDING (if applicable) - Footer */}
  {isTrending && (
    <TrendingFooter className="mt-3 pt-3 border-t border-border">
      <Flame className="h-3 w-3 text-orange-500" />
      <Text size="xs" className="text-muted-foreground">
        {engagementCount} people are talking about this
      </Text>
    </TrendingFooter>
  )}
</PostCard>
```

**Reading order** (F-pattern):
1. Attribution (if present) - why am I seeing this?
2. Friend social proof (if present) - who I know engaged
3. Author + time + space - who posted, when, where
4. Content - what's being said
5. Engagement metrics - how popular is it
6. Trending (if applicable) - additional context

**Visual weight distribution**:
- Content: 60% of visual space
- Social proof + attribution: 20%
- Metadata + engagement: 20%

---

## Event Card: Priority-Based Layout

### ✅ CORRECT: "Who's Going" First

```tsx
<EventCard className="p-6 space-y-4">
  {/* LAYER 1: TIME (urgent visual treatment) */}
  <EventTime
    className={cn(
      "text-sm font-semibold",
      isWithin24Hours && "text-red-500",
      isWithin1Week && !isWithin24Hours && "text-orange-500"
    )}
  >
    {isToday ? formatTimeToday(time) : formatDateAndTime(time)}
  </EventTime>

  {/* LAYER 2: WHO'S GOING (primary decision factor) */}
  <FriendsGoing className="flex items-center gap-3 p-3 bg-accent/20 rounded-lg">
    <AvatarStack size="sm" max={5} avatars={friendsGoing} />
    <div>
      <Text weight="semibold" size="sm">
        {friendsGoing.length > 0 ? (
          formatFriendsWithNames(friendsGoing)
        ) : (
          `${totalGoing} people`
        )}
      </Text>
      <Text size="xs" variant="secondary">
        {friendsGoing.length > 0 ? 'are going' : 'going'}
      </Text>
    </div>
  </FriendsGoing>

  {/* LAYER 3: TITLE + LOCATION (metadata) */}
  <div className="space-y-1">
    <h4 className="text-base font-semibold tracking-tight">{title}</h4>
    <Location className="text-sm text-muted-foreground">
      {building}, {campus}
    </Location>
  </div>

  {/* LAYER 4: DESCRIPTION (truncated) */}
  <Description className="text-sm text-muted-foreground line-clamp-2">
    {description}
  </Description>

  {/* LAYER 5: RSVP ACTIONS (always at bottom) */}
  <RSVPButtons className="flex gap-2">
    <Button
      variant={userRsvp === 'going' ? 'default' : 'outline'}
      className="flex-1"
    >
      Going
    </Button>
    <Button
      variant={userRsvp === 'interested' ? 'default' : 'outline'}
      className="flex-1"
    >
      Interested
    </Button>
  </RSVPButtons>

  {/* LAYER 6: FOMO (contextual, only if relevant) */}
  {rsvpRate > 0.8 && (
    <FOMOBadge className="text-xs text-orange-500">
      Filling up fast · {spotsRemaining} spots left
    </FOMOBadge>
  )}
</EventCard>
```

**Key decisions**:
1. **Time gets urgency color** (red today, orange this week, default future)
2. **"Who's going" is PROMINENT** with background highlight
3. **Friends by name** when possible, not just count
4. **RSVP buttons always visible** (no scrolling to find action)
5. **FOMO only when relevant** (not always cluttering UI)

---

## Sidebar: Collapsible Sections

### ✅ CORRECT: Progressive Disclosure

```tsx
<Sidebar className="space-y-4">
  {/* PRIORITY 1: Friends in Space (always expanded) */}
  <FriendsSection>
    <SectionHeader>
      <Title>Friends in this Space</Title>
      <Count>{friendsInSpace.length}</Count>
    </SectionHeader>
    <AvatarGrid max={8} avatars={friendsInSpace} />
    {friendsInSpace.length > 8 && (
      <ViewAllButton>View all {friendsInSpace.length}</ViewAllButton>
    )}
  </FriendsSection>

  {/* PRIORITY 2: Events (expanded by default) */}
  <EventsSection defaultExpanded>
    <SectionHeader>
      <Title>Upcoming Events</Title>
      <Count>{events.length}</Count>
    </SectionHeader>
    <EventList>
      {events.slice(0, 3).map(event => (
        <CompactEventCard key={event.id} {...event} />
      ))}
    </EventList>
  </EventsSection>

  {/* PRIORITY 3: Members (expanded by default) */}
  <MembersSection defaultExpanded>
    <SectionHeader>
      <Title>Active Members</Title>
      <Count>{totalMembers}</Count>
    </SectionHeader>
    <MemberList>
      {members.slice(0, 6).map(member => (
        <CompactMemberCard key={member.id} {...member} />
      ))}
    </MemberList>
    <ViewAllButton>View all members</ViewAllButton>
  </MembersSection>

  {/* PRIORITY 4: Resources (collapsed by default) */}
  <ResourcesSection defaultCollapsed>
    <SectionHeader>
      <Title>Resources</Title>
      <Count>{resources.length}</Count>
    </SectionHeader>
    <ResourceList>
      {resources.map(resource => (
        <CompactResourceCard key={resource.id} {...resource} />
      ))}
    </ResourceList>
  </ResourcesSection>

  {/* PRIORITY 5: About (collapsed by default) */}
  <AboutSection defaultCollapsed>
    <SectionHeader>
      <Title>About</Title>
    </SectionHeader>
    <Description>{space.description}</Description>
    <Tags>{space.tags}</Tags>
    <Rules>{space.rules}</Rules>
  </AboutSection>
</Sidebar>
```

**Collapse strategy**:
- **Always expanded**: Friends (high value, small space)
- **Default expanded**: Events, Members (high value, medium space)
- **Default collapsed**: Resources, About (lower priority, can be large)

**Visual indicators**:
- Collapsed sections show preview (first line of description)
- Chevron icon indicates expandable
- Count badge shows quantity at a glance

---

## Mobile Adaptations

### Responsive Information Hierarchy

```tsx
// DESKTOP: More information visible
<DesktopLayout>
  <SpaceCard className="p-6">
    {/* Show everything */}
    <TrendingBadge />
    <FriendActivity />
    <Description lines={3} />
    <Stats expanded />
  </SpaceCard>
</DesktopLayout>

// MOBILE: Compressed, prioritized
<MobileLayout>
  <SpaceCard className="p-4">
    {/* Show ONLY primary signal */}
    {primarySignal === 'trending' ? <TrendingBadge /> : <FriendActivity />}

    {/* More aggressive truncation */}
    <Description lines={2} />

    {/* Compact stats */}
    <Stats compact />

    {/* Tap to expand full info */}
    <ExpandButton>More info</ExpandButton>
  </SpaceCard>
</MobileLayout>
```

**Mobile principles**:
1. **One primary signal max** (trending OR friends, not both)
2. **More aggressive truncation** (2 lines vs 3 lines)
3. **Tap to expand** for full details
4. **Larger touch targets** (buttons, cards)

---

## Color & Visual Weight

### Hierarchy Through Visual Treatment

```tsx
// LEVEL 1: Primary signal (highest contrast)
<TrendingBadge className="bg-orange-500 text-white font-semibold">
  Trending
</TrendingBadge>

// LEVEL 2: Core content (standard contrast)
<Title className="text-foreground font-semibold">
  CS Study Group
</Title>

// LEVEL 3: Supporting info (medium contrast)
<Stats className="text-muted-foreground">
  87 members · 234 posts
</Stats>

// LEVEL 4: Tertiary details (low contrast)
<CreatedBy className="text-muted-foreground/70 text-xs">
  Created by Sarah Chen
</CreatedBy>
```

**Contrast ratios**:
- Primary signal: 10:1 (high contrast badge)
- Core content: 7:1 (standard text)
- Supporting info: 5:1 (muted)
- Tertiary: 4.5:1 (subtle)

---

## Animation: Drawing Attention

### Subtle Motion for Important Updates

```tsx
// New friend joined space (animate in)
<FriendBadge
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
  +1 friend joined
</FriendBadge>

// Trending indicator (pulse)
<TrendingBadge
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Trending
</TrendingBadge>

// New post indicator (slide in)
<NewPostsBadge
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
>
  3 new posts
</NewPostsBadge>
```

**When to animate**:
- ✅ New content appearing (friend joined, new post)
- ✅ State changes (RSVP confirmed, post liked)
- ✅ Trending/time-sensitive indicators
- ❌ Static content (description, stats)
- ❌ Every hover (too distracting)

---

## Summary: Visual Hierarchy Rules

### The Formula

1. **One primary signal per card** (trending OR friends, not both)
2. **Core content gets 60% visual space** (title, description)
3. **Supporting info gets 20%** (stats, metadata)
4. **Actions get 20%** (buttons, always at bottom)
5. **Tertiary details are collapsible** (full description, rules)
6. **Mobile gets more aggressive truncation** (half the info)

### Information Density Checklist

- [ ] Maximum 1 primary signal (trending/friends)
- [ ] Maximum 3 secondary badges (category, activity, etc.)
- [ ] Description truncated to 2-3 lines
- [ ] Stats in single row (not stacked)
- [ ] Action button always visible
- [ ] Tertiary info expandable/hidden
- [ ] Mobile shows 50% less info than desktop

### Visual Weight Distribution

```
Primary Signal:     15% (high contrast, prominent)
Core Content:       60% (title + description)
Supporting Info:    15% (stats, metadata)
Actions:            10% (buttons)
```

**Result**: Clean, scannable cards that show critical campus context without visual clutter.
