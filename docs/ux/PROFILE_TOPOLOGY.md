# PROFILE TOPOLOGY
**Campus Identity: Who You Are, What You Do**

> **Design Philosophy**: SF polish meets campus chaos
> **Target**: < 2 seconds profile load, instant actions
> **Aesthetic**: Linear/Vercel/Arc meets student authenticity
> **Platform**: Web-first (desktop primary, mobile companion)

---

## Table of Contents

1. [Strategic Context](#strategic-context)
2. [Design System Foundation](#design-system-foundation)
3. [Profile Architecture](#profile-architecture)
4. [Connections System](#connections-system)
5. [Component Specifications](#component-specifications)
6. [Technical Architecture](#technical-architecture)
7. [Performance & Analytics](#performance--analytics)
8. [Testing Strategy](#testing-strategy)

---

## Strategic Context

### What Is a Profile?

**Profile** = Campus identity showing who you are and what you contribute

**Not LinkedIn**:
- No resume, no job titles, no professional networking
- Authentic student presence, not curated personal brand
- Activity-based, not credentials-based

**Core Elements**:
1. **Identity**: Name, username, avatar, bio, year, school
2. **Activity**: Posts, comments, upvotes, spaces joined
3. **Connections**: Friends, mutual friends (not "professional network")
4. **Completion**: Percentage-based progress (gamification)

### Profile Views

#### Own Profile (`/profile/[id]` when viewing self)
- **Full edit access**: Change avatar, name, bio, privacy settings
- **Completion widget**: Shows % complete with next steps
- **Activity timeline**: All posts, comments, upvotes (private view)
- **Settings access**: Privacy controls, notifications, account

#### Other User Profile (`/profile/[id]` when viewing others)
- **Read-only**: See public info, activity, mutual spaces
- **Connection CTA**: "Add Friend" or "Friends ✓"
- **Activity timeline**: Public posts only (respects privacy)
- **No settings**: Can't edit other user's profile

#### Compact Profile (Hover Card)
- **Triggered**: Hover over username/avatar anywhere
- **Quick info**: Avatar, name, bio (1 line), mutual spaces
- **Fast action**: "Add Friend" or "View Profile" CTA
- **Lightweight**: No heavy data fetch

### Profile vs. Feed vs. Spaces

| Aspect | Profile | Feed | Space Board |
|--------|---------|------|-------------|
| **Focus** | Who you are | What's happening | Where you coordinate |
| **Content** | Your posts/activity | All posts from spaces | Single space posts |
| **Action** | Edit identity, add friends | Scroll, upvote, comment | Post, use tools |
| **Frequency** | Weekly edits | Daily browsing | Multiple times/day |

---

## Design System Foundation

### Color Palette
```css
/* Inherits from FEED_RITUALS_TOPOLOGY.md */
/* Additional Profile-Specific Colors */

--profile-completion-bg: rgba(16, 185, 129, 0.1); /* Green progress */
--profile-completion-border: rgba(16, 185, 129, 0.2);
--profile-completion-fill: var(--success);

--connection-badge-bg: rgba(59, 130, 246, 0.1);   /* Blue for friend badge */
--connection-badge-border: rgba(59, 130, 246, 0.2);
--connection-badge-text: #3B82F6;

--verified-badge-bg: rgba(255, 215, 0, 0.1);      /* Gold for @buffalo.edu */
--verified-badge-border: rgba(255, 215, 0, 0.2);
--verified-badge-text: var(--gold-start);
```

### Typography
```css
/* Inherits from base design system */
/* Profile-Specific Scales */

--text-display-name: 24px / 28px;                /* User full name */
--text-username: 14px / 20px;                    /* @handle */
--text-bio: 14px / 22px;                         /* Generous line height for readability */
--text-stat-value: 18px / 22px;                  /* Connection count */
--text-stat-label: 12px / 16px;                  /* "friends" label */
```

### Avatar Sizes
```css
--avatar-xs: 32px;      /* Inline mentions, comments */
--avatar-sm: 48px;      /* Post cards, connection list */
--avatar-md: 96px;      /* Profile header (desktop) */
--avatar-lg: 128px;     /* Profile edit modal */
--avatar-xl: 160px;     /* Full-screen profile view (rare) */
```

### Layout
```css
--profile-max-width: 1200px;        /* Full profile layout */
--profile-header-height: 240px;     /* Desktop header */
--profile-sidebar-width: 320px;     /* Right sidebar */
--profile-content-width: 640px;     /* Main timeline */
```

---

## Profile Architecture

### Spatial Layout

#### Desktop (1024px+) - Own Profile
```
┌─────────────────────────────────────────────────────────────┐
│ S0: Shell (collapsible sidebar + top bar)                  │
├──────────┬──────────────────────────────┬───────────────────┤
│          │ S1: Profile Header           │                   │
│  Sidebar │ ┌────────┐                   │   R: Rail         │
│          │ │ Avatar │ Jane Smith        │   (Profile)       │
│  • Feed  │ │  96px  │ @jane_s           │                   │
│  • Spaces│ └────────┘ Class of 2028     │   • Completion    │
│  • Me ←  │            School of Eng     │     [████░] 80%   │
│  • Lab   │                              │                   │
│  • Notif │ Bio: Love hiking and photo.. │   • Spaces (12)   │
│          │                              │     [Grid of 12]  │
│          │ [Edit Profile]               │                   │
│          ├──────────────────────────────┤   • Friends (42)  │
│          │ Tabs:                        │     [Grid of 42]  │
│          │ [Posts] [Activity] [Friends] │                   │
│          ├──────────────────────────────┤                   │
│          │ S3: Timeline                 │                   │
│          │ [Post Card]                  │                   │
│          │ [Post Card]                  │                   │
│          │ [Post Card]                  │                   │
│          │ ...infinite scroll           │                   │
└──────────┴──────────────────────────────┴───────────────────┘
```

#### Desktop (1024px+) - Other User Profile
```
┌─────────────────────────────────────────────────────────────┐
│ S0: Shell                                                   │
├──────────┬──────────────────────────────┬───────────────────┤
│          │ S1: Profile Header           │                   │
│  Sidebar │ ┌────────┐                   │   R: Rail         │
│          │ │ Avatar │ Mike Johnson      │                   │
│          │ │  96px  │ @mike_j           │   • Mutual (7)    │
│          │ └────────┘ Class of 2027     │     [Avatars]     │
│          │            School of Eng     │                   │
│          │            [🎓 @buffalo.edu] │   • Spaces (8)    │
│          │                              │     [Shared: 3]   │
│          │ Bio: Captain of soccer team..│                   │
│          │                              │                   │
│          │ [Add Friend] [Message]       │                   │
│          ├──────────────────────────────┤                   │
│          │ Tabs:                        │                   │
│          │ [Posts] [Activity]           │                   │
│          ├──────────────────────────────┤                   │
│          │ S3: Timeline (public only)   │                   │
│          │ [Post Card]                  │                   │
│          │ [Post Card]                  │                   │
└──────────┴──────────────────────────────┴───────────────────┘
```

#### Mobile (0-767px) - Own Profile
```
┌─────────────────────────────────────┐
│ S0: Top Bar                        │
│ [←] My Profile [⋯ Settings]        │
├─────────────────────────────────────┤
│ S1: Profile Header (stacked)       │
│        ┌────────┐                  │
│        │ Avatar │                  │
│        │  96px  │                  │
│        └────────┘                  │
│       Jane Smith                   │
│       @jane_s                      │
│       Class of 2028 · Eng          │
│                                     │
│ Bio: Love hiking and photography...│
│                                     │
│ [Edit Profile]                     │
│                                     │
│ [Completion] 80% ████░             │
├─────────────────────────────────────┤
│ Tabs (horizontal scroll):          │
│ [Posts] [Activity] [Friends]       │
├─────────────────────────────────────┤
│ S3: Timeline                       │
│ [Post Card]                        │
│ [Post Card]                        │
│ [Post Card]                        │
│ ...infinite scroll                 │
│                                     │
├─────────────────────────────────────┤
│ Bottom Nav: Feed|Spaces|+|Notif|Me │
└─────────────────────────────────────┘
```

### Profile Header Components

#### Avatar

**Visual Treatment**:
```css
.profile-avatar {
  width: var(--avatar-md);
  height: var(--avatar-md);
  border-radius: var(--radius-full);
  border: 3px solid var(--border-subtle);
  object-fit: cover;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.profile-avatar:hover {
  border-color: var(--border-gold);
  box-shadow: 0 0 0 6px rgba(255, 215, 0, 0.1);
  cursor: pointer; /* Opens avatar upload modal if own profile */
}

.profile-avatar-verified::after {
  content: '✓';
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--gold-start), var(--gold-end));
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: var(--weight-bold);
  color: #000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
```

**States**:
1. **Default**: Gray border, no hover (other profiles)
2. **Hover** (own profile): Gold border glow, pointer cursor
3. **Uploading**: Shimmer overlay, disabled hover
4. **Verified**: Gold checkmark badge overlay

#### Name & Username

**Structure**:
```html
<div class="profile-identity">
  <h1 class="profile-name">Jane Smith</h1>
  <p class="profile-username">@jane_s</p>
  <div class="profile-badges">
    <span class="badge verified">🎓 @buffalo.edu</span>
    <span class="badge class-year">Class of 2028</span>
    <span class="badge school">School of Engineering</span>
  </div>
</div>
```

**Visual Treatment**:
```css
.profile-name {
  font-size: var(--text-display-name);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
  letter-spacing: var(--tracking-tight);
  margin-bottom: 4px;
}

.profile-username {
  font-size: var(--text-username);
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.profile-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.badge {
  padding: 4px 10px;
  border-radius: var(--radius-xs);
  font-size: var(--text-micro);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.badge.verified {
  background: var(--verified-badge-bg);
  border: 1px solid var(--verified-badge-border);
  color: var(--verified-badge-text);
}

.badge.class-year,
.badge.school {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}
```

#### Bio

**Visual Treatment**:
```css
.profile-bio {
  max-width: 480px;
  margin-top: 16px;
  font-size: var(--text-bio);
  line-height: 1.6;
  color: var(--text-secondary);
  white-space: pre-wrap; /* Preserve line breaks */
}

.profile-bio.empty {
  color: var(--text-tertiary);
  font-style: italic;
}

/* Truncate on other profiles */
.profile-bio.truncated {
  max-height: 66px; /* ~3 lines */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.profile-bio-expand {
  color: var(--gold-start);
  font-weight: var(--weight-medium);
  cursor: pointer;
  transition: opacity var(--motion-quick);
}

.profile-bio-expand:hover {
  opacity: 0.8;
}
```

**Constraints**:
- **Max length**: 300 characters
- **Line breaks**: Preserved (user can add line breaks)
- **Links**: Auto-linked (http:// or https://)
- **Emoji**: Supported (but no excessive spam)
- **Truncation**: 3 lines on other profiles, "Read more" expands

#### Primary Action

**Own Profile**:
```css
.profile-edit-button {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  font-size: var(--text-body);
  font-weight: var(--weight-medium);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.profile-edit-button:hover {
  border-color: var(--border-gold);
  background: rgba(255, 215, 0, 0.05);
  color: var(--gold-start);
}
```

**Other Profile**:
```css
.profile-add-friend-button {
  padding: 10px 20px;
  background: linear-gradient(135deg, var(--gold-start), var(--gold-end));
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--text-body);
  font-weight: var(--weight-semibold);
  color: #000;
  box-shadow: var(--shadow-gold);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.profile-add-friend-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 32px rgba(255, 215, 0, 0.4);
}

.profile-add-friend-button.friends {
  background: transparent;
  border: 1px solid var(--connection-badge-border);
  color: var(--connection-badge-text);
  box-shadow: none;
}

.profile-add-friend-button.friends:hover {
  background: rgba(59, 130, 246, 0.05);
  transform: translateY(0);
}
```

**States**:
- **Not Friends**: Gold "Add Friend" CTA
- **Friends**: Blue "Friends ✓" button (click to unfriend with confirm)
- **Request Sent**: Gray "Request Sent..." (can cancel)
- **Request Received**: Gold "Accept Request" + Gray "Decline"

### Profile Tabs

#### Tab Bar

**Visual Treatment**:
```css
.profile-tabs {
  display: flex;
  gap: 32px;
  margin-top: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-subtle);
}

.profile-tab {
  padding: 8px 0;
  font-size: var(--text-body);
  font-weight: var(--weight-medium);
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all var(--motion-quick) var(--ease-smooth);
  position: relative;
}

.profile-tab:hover:not(.active) {
  color: var(--text-primary);
}

.profile-tab.active {
  color: var(--gold-start);
  border-bottom-color: var(--gold-start);
}

.profile-tab-count {
  margin-left: 6px;
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
```

**Tabs (Own Profile)**:
1. **Posts** (42): All posts created by user
2. **Activity** (128): Upvotes, comments, tool responses
3. **Friends** (15): Connection list

**Tabs (Other Profile)**:
1. **Posts** (public only): Visible posts (respects privacy)
2. **Activity**: Hidden (private info)

#### Posts Tab

**Content**: Timeline of user's posts (chronological, infinite scroll)

**Structure**:
```
┌─────────────────────────────────────┐
│ [Post Card]                         │
│ Posted to: Chemistry 101            │
│ 2 days ago                          │
├─────────────────────────────────────┤
│ [Post Card]                         │
│ Posted to: Campus Feed              │
│ 5 days ago                          │
├─────────────────────────────────────┤
│ [Post Card]                         │
│ Posted to: Red Jacket Hall          │
│ 1 week ago                          │
└─────────────────────────────────────┘
```

**Empty State** (own profile):
```
┌─────────────────────────────────────┐
│        [Empty illustration]         │
│                                     │
│     You haven't posted yet          │
│                                     │
│ Share your first thought with the   │
│ campus community!                   │
│                                     │
│ [Create First Post - Gold]          │
└─────────────────────────────────────┘
```

#### Activity Tab (Own Profile Only)

**Content**: Timeline of all activity (upvotes, comments, tool responses)

**Structure**:
```
┌─────────────────────────────────────┐
│ [↑] You upvoted                     │
│     "Who's going to Wegmans?"       │
│     in Red Jacket Hall · 1h ago    │
├─────────────────────────────────────┤
│ [💬] You commented                  │
│     "I'm down! Leaving at 3pm"     │
│     on Mike's post · 2h ago        │
├─────────────────────────────────────┤
│ [✓] You responded to poll           │
│     "Best study spot on campus"     │
│     in Chemistry 101 · 5h ago      │
└─────────────────────────────────────┘
```

**Privacy**: Only visible on own profile (private info)

#### Friends Tab

**Content**: Grid of connected users (avatars + names)

**Structure** (Desktop):
```
┌─────────────────────────────────────┐
│ Friends (15)                        │
│                                     │
│ [Grid: 4 cols x N rows]             │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│ │ [Av] │ │ [Av] │ │ [Av] │ │ [Av] ││
│ │ Name │ │ Name │ │ Name │ │ Name ││
│ └──────┘ └──────┘ └──────┘ └──────┘│
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│ │ [Av] │ │ [Av] │ │ [Av] │ │ [Av] ││
│ │ Name │ │ Name │ │ Name │ │ Name ││
│ └──────┘ └──────┘ └──────┘ └──────┘│
│ ...                                 │
└─────────────────────────────────────┘
```

**Friend Card**:
```css
.friend-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.friend-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: var(--shadow-elevated);
  transform: translateY(-2px);
}

.friend-card-avatar {
  width: var(--avatar-sm);
  height: var(--avatar-sm);
  margin-bottom: 8px;
}

.friend-card-name {
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  color: var(--text-primary);
  text-align: center;
}

.friend-card-username {
  font-size: var(--text-micro);
  color: var(--text-tertiary);
}
```

### Right Rail (Desktop Only)

#### Completion Widget (Own Profile)

**Visual Treatment**:
```css
.completion-widget {
  padding: 20px;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.05) 0%,
    rgba(16, 185, 129, 0.02) 100%
  );
  border: 1px solid var(--profile-completion-border);
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.completion-progress {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 12px;
}

.completion-progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--success) 0%,
    var(--profile-completion-fill) 100%
  );
  border-radius: var(--radius-full);
  transition: width var(--motion-slow) var(--ease-smooth);
}

.completion-next-step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(16, 185, 129, 0.08);
  border-radius: var(--radius-sm);
  font-size: var(--text-caption);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--motion-quick);
}

.completion-next-step:hover {
  background: rgba(16, 185, 129, 0.12);
}
```

**Structure**:
```
┌─────────────────────────────────────┐
│ Profile Completion                  │
│                                     │
│ 80% ████████░░                      │
│                                     │
│ Next Step:                          │
│ [✓] Complete your bio               │
│     Add a few words about yourself  │
│                                     │
│ [See all steps]                     │
└─────────────────────────────────────┘
```

**Completion Steps** (Students: 8 total):
1. ✅ Upload profile photo (onboarding)
2. ✅ Add first & last name (onboarding)
3. ✅ Choose username (onboarding)
4. ✅ Join 3 spaces (onboarding auto-join)
5. ☐ Write a bio (max 300 chars)
6. ☐ Make your first post
7. ☐ Add 3 friends
8. ☐ Join 2 additional spaces

**100% Complete Celebration**:
```
┌─────────────────────────────────────┐
│ 🎉 Profile Complete!                │
│                                     │
│ 100% ██████████                     │
│                                     │
│ You've unlocked the full HIVE       │
│ experience. Keep exploring!         │
└─────────────────────────────────────┘
```

#### Mutual Friends (Other Profile)

**Visual Treatment**:
```
┌─────────────────────────────────────┐
│ Mutual Friends (7)                  │
│                                     │
│ [Avatar row: 5 visible + "+2 more"] │
│ Sarah, Mike, Alex, Jordan, Chris    │
│                                     │
│ [See all mutual friends]            │
└─────────────────────────────────────┘
```

**Hover**: Shows tooltip with full names

#### Shared Spaces (Other Profile)

**Visual Treatment**:
```
┌─────────────────────────────────────┐
│ Shared Spaces (3)                   │
│                                     │
│ [Icon] Chemistry 101                │
│ [Icon] Red Jacket Hall              │
│ [Icon] Class of 2028                │
│                                     │
│ [See all 8 spaces]                  │
└─────────────────────────────────────┘
```

**Highlight**: Shared spaces shown first, then others (grayed out)

---

## Connections System

### What Are Connections?

**Connections** = Bilateral friend relationships (like Facebook friends, not Twitter follows)

**Key Principles**:
- **Bilateral**: Both users must accept (no one-way follows)
- **Campus-scoped**: Only connect with users on same campus
- **Real identity**: @buffalo.edu verification ensures authenticity
- **No "networking"**: This is social, not professional

### Connection Flow

#### Sending Request

**Flow**:
```
1. User views other profile
2. Clicks "Add Friend" gold button
3. Confirm modal: "Send friend request to Mike Johnson?"
4. Click "Send Request"
5. Button changes to "Request Sent..." (gray, can cancel)
6. Other user receives notification
```

**Notification** (recipient):
```
┌─────────────────────────────────────┐
│ [Avatar] Jane Smith sent you a      │
│          friend request             │
│                                     │
│ [Accept - Gold] [Decline - Gray]    │
└─────────────────────────────────────┘
```

#### Accepting Request

**Flow**:
```
1. User receives notification
2. Clicks notification → opens sender's profile
3. Profile shows "Accept Request" + "Decline" buttons
4. User clicks "Accept Request"
5. Confetti animation (160ms)
6. Button changes to "Friends ✓" (blue)
7. Both users added to each other's friends list
8. Sender receives notification: "Mike accepted your friend request"
```

#### Unfriending

**Flow**:
```
1. User on friend's profile clicks "Friends ✓" button
2. Dropdown opens: [View Profile] [Unfriend]
3. Click "Unfriend"
4. Confirm modal: "Remove Mike from friends?"
5. Click "Confirm"
6. Button changes back to "Add Friend"
7. No notification sent to other user (silent)
```

### Friend Request Manager

**Location**: Notifications dropdown (top bar)

**Structure**:
```
┌─────────────────────────────────────┐
│ Notifications                       │
│                                     │
│ FRIEND REQUESTS (3)                 │
│ ──────────────────────────────────  │
│ [Avatar] Sarah Martinez             │
│          @sarah_m                   │
│          [Accept] [Decline]         │
│                                     │
│ [Avatar] Alex Kim                   │
│          @alex_k                    │
│          [Accept] [Decline]         │
│                                     │
│ [Avatar] Jordan Lee                 │
│          @jordan_l                  │
│          [Accept] [Decline]         │
│                                     │
│ [See all requests (3)]              │
└─────────────────────────────────────┘
```

**Badge** (unread count on notification bell):
```css
.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--danger);
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: var(--weight-bold);
  color: #FFF;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
}
```

### Privacy Settings

**Location**: Settings → Privacy

**Options**:
```
┌─────────────────────────────────────┐
│ Privacy Settings                    │
│                                     │
│ WHO CAN SEE YOUR POSTS?             │
│ ○ Everyone on campus (default)     │
│ ○ Friends only                     │
│ ○ Only me (private)                │
│                                     │
│ WHO CAN SEND YOU FRIEND REQUESTS?   │
│ ○ Everyone on campus (default)     │
│ ○ Friends of friends               │
│ ○ No one (disable requests)        │
│                                     │
│ WHO CAN SEE YOUR FRIENDS LIST?      │
│ ○ Everyone (default)               │
│ ○ Friends only                     │
│ ○ Only me                          │
│                                     │
│ WHO CAN SEE YOUR ACTIVITY?          │
│ ○ Everyone                         │
│ ○ Friends only (default)           │
│ ○ Only me                          │
│                                     │
│ [Save Changes - Gold]               │
└─────────────────────────────────────┘
```

**Defaults**:
- Posts: Everyone on campus
- Friend requests: Everyone on campus
- Friends list: Everyone
- Activity: Friends only

---

## Component Specifications

### ProfileHeader Component

**File**: `packages/ui/src/atomic/organisms/profile-header.tsx`

**Props Interface**:
```typescript
interface ProfileHeaderProps {
  // User data
  user: {
    uid: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
    graduationYear: number;
    schoolCode: string;
    schoolName: string;
    email: string; // For verified badge
  };

  // Stats
  friendCount: number;
  spaceCount: number;
  postCount: number;

  // View context
  isOwnProfile: boolean;
  isFriend: boolean;
  hasRequestSent: boolean;
  hasRequestReceived: boolean;

  // Interactions
  onEditProfile?: () => void;
  onAddFriend?: () => void;
  onAcceptRequest?: () => void;
  onDeclineRequest?: () => void;
  onUnfriend?: () => void;
  onMessage?: () => void; // Future: DMs

  // Display
  compact?: boolean; // Mobile version
}
```

**States**:
1. **Own Profile**: "Edit Profile" button
2. **Other - Not Friends**: "Add Friend" gold CTA
3. **Other - Friends**: "Friends ✓" blue button (dropdown with unfriend)
4. **Other - Request Sent**: "Request Sent..." gray (can cancel)
5. **Other - Request Received**: "Accept Request" + "Decline" buttons
6. **Loading**: Skeleton header

**Interaction Timeline**:
```
User clicks Add Friend → Confirm modal (240ms), send request
Request sent → Button grays (100ms), text updates
Friend accepts → Confetti (160ms), button blues (100ms)
User clicks Friends ✓ → Dropdown opens (160ms)
User clicks Unfriend → Confirm modal (240ms), remove connection
```

### ProfileCompletionWidget Component

**File**: `packages/ui/src/atomic/molecules/profile-completion-widget.tsx`

**Props Interface**:
```typescript
interface ProfileCompletionWidgetProps {
  // Progress
  completionPercentage: number; // 0-100
  completedSteps: string[]; // IDs of completed steps
  allSteps: {
    id: string;
    label: string;
    description: string;
    completed: boolean;
  }[];

  // Next step
  nextStep?: {
    id: string;
    label: string;
    description: string;
    action: () => void;
  };

  // Interactions
  onViewAllSteps: () => void;
  onCompleteStep?: (stepId: string) => void;

  // Display
  variant?: 'default' | 'compact';
}
```

**States**:
1. **Incomplete** (0-99%): Shows progress bar, next step CTA
2. **Complete** (100%): Celebration message, confetti (one-time)
3. **Collapsed**: Click to expand all steps
4. **Expanded**: Full step list with checkmarks

**Interaction Timeline**:
```
User completes step → Progress bar animates (240ms smooth)
Reaches 100% → Confetti burst (240ms), celebration message (160ms fade)
User clicks next step → Navigate to relevant section
```

### FriendCard Component

**File**: `packages/ui/src/atomic/molecules/friend-card.tsx`

**Props Interface**:
```typescript
interface FriendCardProps {
  // User data
  user: {
    uid: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl?: string;
  };

  // Mutual context
  mutualFriendCount?: number;
  mutualSpaceCount?: number;

  // Interactions
  onCardClick: () => void; // Navigate to profile
  onUnfriend?: () => void; // If own friends list

  // Display
  variant?: 'grid' | 'list';
  showMutualInfo?: boolean;
}
```

**States**:
1. **Default**: Idle, no hover
2. **Hover**: Elevated shadow, border glow
3. **Loading**: Shimmer animation

**Interaction Timeline**:
```
User hovers → Border glow (100ms), shadow elevates
User clicks → Navigate to profile (no animation)
```

---

## Technical Architecture

### API Endpoints

#### Profile Data
```typescript
// Get user profile
GET /api/profile/:userId
Response: {
  user: User;
  stats: {
    friendCount: number;
    spaceCount: number;
    postCount: number;
  };
  connection: {
    isFriend: boolean;
    hasRequestSent: boolean;
    hasRequestReceived: boolean;
  };
}

// Update own profile
PATCH /api/profile
Body: {
  bio?: string;
  avatarUrl?: string;
  privacy?: PrivacySettings;
}
Response: User

// Upload avatar
POST /api/profile/upload-avatar
Body: FormData (image file)
Response: { avatarUrl: string }

// Get completion status
GET /api/profile/completion-status
Response: {
  percentage: number;
  completedSteps: string[];
  nextStep?: Step;
}
```

#### Connections
```typescript
// Send friend request
POST /api/profile/:userId/add-friend
Response: {
  requestSent: true;
  requestId: string;
}

// Accept friend request
POST /api/profile/friend-requests/:requestId/accept
Response: {
  accepted: true;
  friendship: Connection;
}

// Decline friend request
POST /api/profile/friend-requests/:requestId/decline
Response: { declined: true }

// Unfriend
DELETE /api/profile/:userId/unfriend
Response: { unfriended: true }

// Get friend requests (pending)
GET /api/profile/friend-requests
Response: {
  incoming: User[];
  outgoing: User[];
}

// Get friends list
GET /api/profile/:userId/friends
Query params:
  - search?: string
  - page?: number
  - limit?: number (default: 50)
Response: {
  friends: User[];
  total: number;
}

// Get mutual friends
GET /api/profile/:userId/mutual-friends
Response: {
  mutuals: User[];
  count: number;
}
```

#### Activity
```typescript
// Get user posts
GET /api/profile/:userId/posts
Query params:
  - page?: number
  - limit?: number (default: 20)
Response: {
  posts: Post[];
  hasMore: boolean;
}

// Get user activity (own profile only)
GET /api/profile/activity
Query params:
  - page?: number
  - limit?: number (default: 20)
Response: {
  activities: Activity[];
  hasMore: boolean;
}

interface Activity {
  id: string;
  type: 'upvote' | 'comment' | 'tool_response' | 'event_rsvp';
  timestamp: Date;
  post?: Post;
  comment?: string;
  tool?: Tool;
  event?: Event;
}
```

### Database Schema

#### Users Collection (Extended)
```typescript
// Collection: users
{
  uid: string;
  campusId: string;

  // Identity
  firstName: string;
  lastName: string;
  username: string; // Unique per campus
  email: string; // @buffalo.edu
  avatarUrl?: string;
  bio?: string;

  // Academic
  graduationYear: number;
  schoolCode: string; // "eng", "arts", "business"
  schoolName: string; // Denormalized
  residentialBuilding?: string;

  // Stats (denormalized)
  friendCount: number;
  spaceCount: number;
  postCount: number;
  commentCount: number;

  // Completion
  profileCompletion: number; // 0-100
  completedSteps: string[];
  celebratedCompletion: boolean; // One-time confetti flag

  // Privacy settings
  privacy: {
    postsVisibility: 'everyone' | 'friends' | 'private';
    friendRequestsFrom: 'everyone' | 'friends_of_friends' | 'none';
    friendsListVisibility: 'everyone' | 'friends' | 'private';
    activityVisibility: 'everyone' | 'friends' | 'private';
  };

  // Timestamps
  createdAt: Date;
  emailVerifiedAt: Date;
  lastActiveAt: Date;
}

// Indexes:
// - (campusId, username) UNIQUE
// - (campusId, email) UNIQUE
// - (campusId, graduationYear, schoolCode)
// - (campusId, lastActiveAt DESC)
```

#### Connections Collection
```typescript
// Collection: connections
{
  id: string; // Auto-generated
  campusId: string;

  // Bilateral relationship
  userId1: string; // Alphabetically first UID
  userId2: string; // Alphabetically second UID

  // Metadata
  createdAt: Date;
  lastInteractionAt: Date; // Updated on mutual space joins, DMs, etc.
}

// Indexes:
// - (campusId, userId1, userId2) UNIQUE
// - (campusId, userId1) - Get user1's friends
// - (campusId, userId2) - Get user2's friends
```

#### Friend Requests Collection
```typescript
// Collection: friend_requests
{
  id: string;
  campusId: string;

  // Request
  fromUserId: string;
  toUserId: string;

  // Status
  status: 'pending' | 'accepted' | 'declined';

  // Timestamps
  createdAt: Date;
  respondedAt?: Date;
}

// Indexes:
// - (campusId, toUserId, status) - Incoming requests
// - (campusId, fromUserId, status) - Outgoing requests
// - (campusId, fromUserId, toUserId, status) UNIQUE
```

#### Activity Timeline Collection
```typescript
// Collection: user_activities
{
  id: string;
  campusId: string;
  userId: string;

  // Activity type
  type: 'upvote' | 'comment' | 'tool_response' | 'event_rsvp' | 'space_join' | 'post_create';

  // References
  postId?: string;
  commentId?: string;
  toolId?: string;
  eventId?: string;
  spaceId?: string;

  // Metadata
  createdAt: Date;
}

// Indexes:
// - (campusId, userId, createdAt DESC) - User activity timeline
// - (campusId, userId, type, createdAt DESC) - Filter by type
```

### Security Rules

#### Profile Access
```typescript
// Anyone can read public profiles
// Privacy settings enforced at query level
match /users/{userId} {
  allow read: if request.auth != null
    && resource.data.campusId == request.auth.token.campusId;

  allow update: if request.auth.uid == userId
    && request.resource.data.campusId == resource.data.campusId; // Can't change campus
}
```

#### Connection Permissions
```typescript
// Only involved users can create/read connections
match /connections/{connectionId} {
  allow read: if request.auth != null
    && (
      resource.data.userId1 == request.auth.uid
      || resource.data.userId2 == request.auth.uid
    );

  // Connections created via friend request acceptance
  // Not directly via this collection
  allow create: if false;
}
```

#### Friend Request Permissions
```typescript
match /friend_requests/{requestId} {
  // Can create request to any campus user
  allow create: if request.auth != null
    && request.resource.data.fromUserId == request.auth.uid
    && request.resource.data.campusId == request.auth.token.campusId;

  // Can read if sender or recipient
  allow read: if request.auth != null
    && (
      resource.data.fromUserId == request.auth.uid
      || resource.data.toUserId == request.auth.uid
    );

  // Can update status if recipient
  allow update: if request.auth != null
    && resource.data.toUserId == request.auth.uid
    && request.resource.data.status != resource.data.status; // Status changed
}
```

---

## Performance & Analytics

### Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Profile Load** | < 2.0s | Image-heavy, can tolerate slightly slower |
| **Avatar Upload** | < 3.0s | Large file, progress bar shown |
| **Friend Request Action** | < 500ms | Must feel instant |
| **Tab Switch** | < 300ms | Client-side only |
| **Timeline Scroll** | < 16ms | 60fps smoothness |

### Optimization Strategies

#### 1. Avatar Lazy Loading
```typescript
// Use Next.js Image with blur placeholder
<Image
  src={user.avatarUrl}
  alt={`${user.firstName} ${user.lastName}`}
  width={96}
  height={96}
  placeholder="blur"
  blurDataURL={user.avatarBlurHash}
  quality={90}
  priority={isOwnProfile} // Preload own avatar
/>
```

#### 2. Denormalized Stats
```typescript
// Update friendCount in user doc on connection/unfriend
// Avoids counting connections subcollection on every profile load
const userRef = doc(db, 'users', userId);
await updateDoc(userRef, {
  friendCount: increment(1),
  lastActiveAt: serverTimestamp(),
});
```

#### 3. Cached Mutual Friends
```typescript
// Calculate mutuals on server, cache for 5 minutes
const mutualFriendsKey = `mutuals:${userId1}:${userId2}`;
const cached = await redis.get(mutualFriendsKey);

if (cached) return JSON.parse(cached);

const mutuals = await calculateMutualFriends(userId1, userId2);
await redis.set(mutualFriendsKey, JSON.stringify(mutuals), 'EX', 300);

return mutuals;
```

### Analytics Events

#### Profile Engagement
```typescript
trackEvent('profile_view', {
  profileUserId: string,
  isOwnProfile: boolean,
  source: 'search' | 'post' | 'friend_list' | 'space',
});

trackEvent('profile_edit_click', { section: 'bio' | 'avatar' | 'settings' });
trackEvent('profile_tab_switch', { tab: 'posts' | 'activity' | 'friends' });
trackEvent('profile_completion_step_click', { stepId: string });
```

#### Connection Activity
```typescript
trackEvent('friend_request_sent', {
  toUserId: string,
  source: 'profile' | 'people_you_may_know' | 'mutual_friends',
});

trackEvent('friend_request_accepted', {
  fromUserId: string,
  timeToAccept: number, // Seconds from request to accept
});

trackEvent('friend_request_declined', { fromUserId: string });
trackEvent('unfriend', { userId: string, daysAsFriends: number });
```

#### Completion Tracking
```typescript
trackEvent('profile_completion_updated', {
  oldPercentage: number,
  newPercentage: number,
  stepCompleted: string,
});

trackEvent('profile_completion_100', {
  timeToComplete: number, // Days from signup
});
```

### Success Metrics (KPIs)

#### Profile Health
- **Completion Rate**: % of users with 100% profile completion
- **Average Completion**: Mean completion % across all users
- **Time to Complete**: Days from signup to 100%
- **Bio Fill Rate**: % of users with non-empty bio

#### Connection Metrics
- **Friend Request Accept Rate**: % of requests accepted
- **Average Friends per User**: Mean friend count
- **Connection Growth**: New friendships per week
- **Mutual Friend Density**: Avg mutuals between any 2 friends

#### Engagement Metrics
- **Profile Views per User per Day**: How often profiles are visited
- **Own Profile Visit Rate**: % of users who check their own profile daily
- **Tab Usage**: Distribution of tab views (Posts, Activity, Friends)

---

## Testing Strategy

### Unit Tests

#### ProfileHeader Component
```typescript
describe('ProfileHeader', () => {
  test('renders user info correctly', () => {
    render(<ProfileHeader user={mockUser} isOwnProfile={false} />);
    expect(screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)).toBeInTheDocument();
    expect(screen.getByText(`@${mockUser.username}`)).toBeInTheDocument();
  });

  test('shows Edit Profile for own profile', () => {
    render(<ProfileHeader isOwnProfile={true} />);
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });

  test('shows Add Friend for other profile', () => {
    render(<ProfileHeader isOwnProfile={false} isFriend={false} />);
    expect(screen.getByText('Add Friend')).toBeInTheDocument();
  });

  test('handles friend request', async () => {
    const onAddFriend = jest.fn();
    render(<ProfileHeader isOwnProfile={false} onAddFriend={onAddFriend} />);

    fireEvent.click(screen.getByText('Add Friend'));
    expect(onAddFriend).toHaveBeenCalled();
  });
});
```

#### ProfileCompletionWidget Component
```typescript
describe('ProfileCompletionWidget', () => {
  test('renders completion percentage', () => {
    render(<ProfileCompletionWidget completionPercentage={80} />);
    expect(screen.getByText(/80%/)).toBeInTheDocument();
  });

  test('shows next step CTA', () => {
    const nextStep = { id: 'bio', label: 'Complete your bio', action: jest.fn() };
    render(<ProfileCompletionWidget nextStep={nextStep} />);
    expect(screen.getByText('Complete your bio')).toBeInTheDocument();
  });

  test('shows celebration at 100%', () => {
    render(<ProfileCompletionWidget completionPercentage={100} />);
    expect(screen.getByText(/Profile Complete!/i)).toBeInTheDocument();
  });
});
```

### Integration Tests

#### Friend Request Flow
```typescript
describe('Friend Request Flow', () => {
  test('sends and accepts friend request', async () => {
    // User A sends request
    const { rerender } = render(<ProfileHeader user={userB} isOwnProfile={false} />);
    fireEvent.click(screen.getByText('Add Friend'));

    // Button changes to Request Sent
    await waitFor(() => {
      expect(screen.getByText(/Request Sent/i)).toBeInTheDocument();
    });

    // User B receives and accepts
    rerender(<ProfileHeader user={userA} isOwnProfile={false} hasRequestReceived={true} />);
    fireEvent.click(screen.getByText('Accept Request'));

    // Both users now friends
    await waitFor(() => {
      expect(screen.getByText(/Friends/i)).toBeInTheDocument();
    });
  });
});
```

### E2E Tests (Playwright)

#### Profile Completion Flow
```typescript
test('student completes profile', async ({ page }) => {
  await loginAsStudent(page);
  await page.goto('/profile/me');

  // Should see completion widget
  await expect(page.locator('[data-testid="completion-widget"]')).toBeVisible();

  // Click next step: Add bio
  await page.click('text=Complete your bio');

  // Should open edit modal
  await expect(page.locator('[data-testid="edit-bio-modal"]')).toBeVisible();

  // Fill bio
  await page.fill('[name="bio"]', 'Love hiking and photography!');
  await page.click('text=Save');

  // Completion should update
  await expect(page.locator('text=/Profile Completion/')).toContainText('85%');
});
```

#### Friend Request E2E
```typescript
test('students connect as friends', async ({ page, context }) => {
  // User A logs in
  await loginAs(page, 'jane_s');
  await page.goto('/profile/mike_j');

  // Send friend request
  await page.click('text=Add Friend');
  await expect(page.locator('text=Request Sent')).toBeVisible();

  // User B logs in (new tab)
  const page2 = await context.newPage();
  await loginAs(page2, 'mike_j');

  // Check notifications
  await page2.click('[data-testid="notification-bell"]');
  await expect(page2.locator('text=Jane Smith sent you a friend request')).toBeVisible();

  // Accept request
  await page2.click('text=Accept');

  // Should show confetti
  await expect(page2.locator('[data-testid="confetti"]')).toBeVisible();

  // Both users should see friendship
  await page.reload();
  await expect(page.locator('text=Friends')).toBeVisible();
  await expect(page2.locator('text=Friends')).toBeVisible();
});
```

---

## Appendix: Quick Reference

### Profile Sections
- **Header**: Avatar, name, username, bio, badges
- **Tabs**: Posts, Activity (own only), Friends
- **Rail**: Completion (own), Mutual Friends (other), Shared Spaces (other)

### Connection States
- **Not Friends**: "Add Friend" gold CTA
- **Request Sent**: "Request Sent..." gray
- **Request Received**: "Accept Request" + "Decline"
- **Friends**: "Friends ✓" blue button

### Completion Steps (Students)
1. Upload profile photo ✅
2. Add first & last name ✅
3. Choose username ✅
4. Join 3 spaces ✅
5. Write a bio ☐
6. Make your first post ☐
7. Add 3 friends ☐
8. Join 2 additional spaces ☐

### Privacy Defaults
- Posts: Everyone on campus
- Friend requests: Everyone on campus
- Friends list: Everyone
- Activity: Friends only

---

**Remember**: Profiles are about authenticity, not personal branding. Real students, real campus life.
