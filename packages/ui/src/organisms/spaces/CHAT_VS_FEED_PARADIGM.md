# 💬 Chat vs Feed: Spaces UX Paradigm Shift

**Decision**: Spaces should use **CHAT UX** (Discord/Slack) not **FEED UX** (Twitter/Facebook)

---

## 🎯 The Core Difference

### Feed Model (Twitter/Facebook)

```
┌────────────────────────────────┐
│ Header                         │
├────────────────────────────────┤
│ [Composer/Post Button]         │  ← Top
├────────────────────────────────┤
│ ↓ Scroll Down for More         │
│                                │
│ Post 1 (newest)                │
│ Post 2                         │
│ Post 3                         │
│ Post 4 (older)                 │
│ ...                            │
└────────────────────────────────┘
```

### Chat Model (Discord/Slack) ✅ **CHOSEN**

```
┌────────────────────────────────┐
│ Header                         │
├────────────────────────────────┤
│ ↑ Scroll Up for History        │
│                                │
│ Message 1 (older)              │
│ Message 2                      │
│ Message 3                      │
│ Message 4 (newest)             │
├────────────────────────────────┤
│ [Text Input at Bottom]         │  ← Bottom
└────────────────────────────────┘
```

---

## 🤔 Why Chat Model for Spaces?

### 1. **Real-Time Conversations**

- Spaces are live communities, not passive content feeds
- Users expect to see latest messages immediately (like group chat)
- New messages appear at bottom, where you're already looking

### 2. **Natural Reading Flow**

- Eyes are trained: input at bottom = chat
- Bottom composer = "I'm in a conversation"
- Top composer = "I'm broadcasting to followers"

### 3. **Context Preservation**

- When you type, you can see the messages you're replying to above
- Feed model: composer at top means you can't see what you're responding to

### 4. **Mobile Familiarity**

- Every messaging app: iMessage, WhatsApp, Telegram = bottom input
- Users don't have to learn new patterns

### 5. **Engagement Psychology**

- Bottom input = lower friction ("just type and send")
- Top composer = feels more formal ("crafting a post")

---

## 📐 Layout Architecture

### V3 (Chat Model) - NEW

```
┌─────────────────────────────────────────────────────────┐
│ HEADER (Sticky Top)                          [☰ Menu]   │
├─────────────────────────┬───────────────────────────────┤
│                         │                               │
│  MESSAGES (60%)         │   RIGHT DOCK (40%)            │
│  Scroll ↑ for history   │   Full-height sidebar         │
│                         │                               │
│  ┌──────────────────┐   │   ┌───────────────────────┐   │
│  │ Old Message 1    │   │   │ 📅 Calendar           │   │
│  │ Old Message 2    │   │   │                       │   │
│  │ ...              │   │   │ 👥 Members            │   │
│  │ Recent Message   │   │   │                       │   │
│  └──────────────────┘   │   │ ℹ️  About             │   │
│                         │   │                       │   │
├─────────────────────────┤   │                       │   │
│ COMPOSER (Fixed Bottom) │   │   (Scrollable)        │   │
│ [Type a message...]     │   │                       │   │
└─────────────────────────┴───────────────────────────────┘
```

### V2 (Feed Model) - OLD

```
┌─────────────────────────────────────────────────────────┐
│ HEADER (Sticky Top)                                     │
├─────────────────────────┬───────────────────────────────┤
│ COMPOSER (Top)          │                               │
│ [What's on your mind?]  │                               │
├─────────────────────────┤   CONTEXT RAIL (Sticky)       │
│                         │                               │
│  FEED (60%)             │   - Calendar                  │
│  Scroll ↓ for more      │   - Members                   │
│                         │   - About                     │
│  ┌──────────────────┐   │                               │
│  │ Post 1 (newest)  │   │   (Can overflow viewport)     │
│  │ Post 2           │   │                               │
│  │ ...              │   │                               │
│  └──────────────────┘   │                               │
│                         │                               │
└─────────────────────────┴───────────────────────────────┘
```

---

## 🎨 Right Dock: Sidebar vs Floating Panel

### V3: Full-Height Sidebar (Like Left Nav) ✅

```
┌─────────┬────────────┬────────────┐
│ Left    │ Feed       │ Right Dock │
│ Nav     │ (60%)      │ (40%)      │
│ (App)   │            │            │
│         │            │ [Calendar] │
│ [Home]  │ Messages   │            │
│ [Spaces]│ Area       │ [Members]  │
│ [Tools] │            │            │
│         │            │ [About]    │
│         │ Composer   │            │
└─────────┴────────────┴────────────┘
```

**Characteristics**:

- ✅ Full viewport height
- ✅ Part of page chrome (like left sidebar)
- ✅ Always visible (desktop)
- ✅ Scrolls independently
- ✅ Feels like app structure, not content

### V2: Floating Context Panel (OLD)

```
┌──────────────────────────────────┐
│ Header                           │
├──────────────────┬───────────────┤
│                  │               │
│ Feed             │ Context       │
│                  │ [Sticky]      │
│                  │               │
│ (Scrolls down)   │ Calendar      │
│                  │ Members       │
│                  │ About         │
│                  │               │
│                  │ (Can overflow)│
└──────────────────┴───────────────┘
```

**Characteristics**:

- ⚠️ Starts below header
- ⚠️ Sticky but can overflow
- ⚠️ Feels like sidebar but positioned as content
- ⚠️ Mobile = stacks below feed

---

## 🔄 Key Behavior Changes

| Aspect                | V2 (Feed Model)     | V3 (Chat Model)      |
| --------------------- | ------------------- | -------------------- |
| **Composer Position** | Top of feed         | Bottom (fixed)       |
| **Scroll Direction**  | Down for more       | Up for history       |
| **New Posts Appear**  | Top (push down)     | Bottom (append)      |
| **Auto-scroll**       | Stay at top         | Scroll to bottom     |
| **Reading Pattern**   | Top → Down          | Bottom → Up          |
| **Right Dock**        | Sticky in content   | Full-height sidebar  |
| **Mental Model**      | "Browsing feed"     | "In a chat room"     |
| **Primary Action**    | "Post an update"    | "Send a message"     |
| **Engagement**        | Passive consumption | Active participation |

---

## 💡 Implementation Details

### Auto-Scroll to Bottom

```typescript
// Like Discord - always show latest
React.useEffect(() => {
  if (messagesRef.current && !isLoading) {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }
}, [isLoading, newMessageCount]);
```

### Scroll-to-Bottom Button

```typescript
// Show button when user scrolls up (like Discord)
const [showScrollButton, setShowScrollButton] = useState(false);

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;
  const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
  setShowScrollButton(!isNearBottom);
};
```

### Fixed Composer Height

```typescript
// Composer is ALWAYS visible at bottom
<div className="flex-shrink-0 border-t border-border bg-background">
  <div className="max-w-3xl mx-auto px-4 py-4">{composer}</div>
</div>
```

### Full-Height Right Dock

```typescript
// Right Dock spans entire viewport height (minus header)
<aside className="flex flex-col h-full border-l border-border">
  <div className="flex-1 overflow-y-auto p-6">{rightRail}</div>
</aside>
```

---

## 📱 Mobile Considerations

### Chat Model Benefits on Mobile

- ✅ Keyboard doesn't cover input (native behavior)
- ✅ Thumb zone: bottom = easy to reach
- ✅ Familiar pattern (all messaging apps)
- ✅ Dock in drawer = clean focus on chat

### Feed Model Issues on Mobile

- ❌ Composer at top = scroll up to post
- ❌ Keyboard covers view
- ❌ Unfamiliar for messaging context

---

## 🎯 User Mental Model

### Feed Model Says:

> "This is a place to share updates and see what others posted"

**Behavior**: Passive consumption, occasional posting

### Chat Model Says:

> "This is a live conversation happening right now"

**Behavior**: Active participation, continuous engagement

---

## 🚀 Migration Path

### Option 1: Hard Switch (Recommended)

```typescript
// Just use V3 everywhere
import { SpaceLayoutV3 as SpaceLayout } from "@hive/ui";
```

### Option 2: Space Type Driven

```typescript
// Chat-style spaces use V3
if (space.type === "chat" || space.type === "community") {
  return <SpaceLayoutV3 />;
}
// News/announcement spaces use V2
else {
  return <SpaceLayoutV2 />;
}
```

### Option 3: User Preference

```typescript
// Let users toggle
const layout = userPrefs.spaceLayout; // 'feed' | 'chat'
return layout === "chat" ? <SpaceLayoutV3 /> : <SpaceLayoutV2 />;
```

---

## ✅ Acceptance Criteria for V3

### Core Behaviors

- [x] Composer fixed at bottom (like Discord)
- [x] Auto-scroll to bottom on load
- [x] Scroll up for message history
- [x] New messages append to bottom
- [x] Dock is full-height sidebar
- [x] Dock scrolls independently
- [x] Scroll-to-bottom button when scrolled up

### Visual

- [x] 60/40 split maintained
- [x] Dock feels like app chrome
- [x] Composer always visible
- [x] Messages area fills available space
- [x] Clean separation: messages | Dock

### Mobile

- [x] Dock in drawer
- [x] Composer at bottom (native keyboard behavior)
- [x] Thumb-friendly input position
- [x] Clean focus on conversation

### Performance

- [x] Smooth scrolling (60fps)
- [x] No layout shift
- [x] Fast message rendering
- [x] Efficient auto-scroll

---

## 📊 Expected Impact

### Engagement Metrics

- **Session Duration**: +30-50% (chat = sticky)
- **Messages Sent**: +50-100% (lower friction)
- **Daily Active Users**: +20-30% (chat = habit forming)
- **Retention**: +25-40% (conversations = connections)

### User Perception

- **Before (Feed)**: "I'll check it occasionally"
- **After (Chat)**: "I'm part of an active community"

---

## 🎨 Brand Alignment

The chat model aligns BETTER with HIVE's vision:

- **Community-First**: Chat emphasizes real-time connection
- **Engagement-Driven**: Lower friction = more participation
- **Campus Life**: Group chats are how students actually communicate
- **Premium Feel**: Discord/Slack are premium products

---

## 🔮 Future Enhancements

### Chat-Specific Features to Add

1. **Typing Indicators**: "Alex is typing..."
2. **Read Receipts**: "Seen by 23 members"
3. **Reactions**: Quick emoji reactions to messages
4. **Threads**: Reply chains (like Discord threads)
5. **Voice Channels**: Audio rooms
6. **Presence**: Online/offline status
7. **Mentions**: @username notifications
8. **Rich Embeds**: Link previews, media

---

**Recommendation**: **Ship V3 as the default Spaces layout**. It better serves HIVE's community-first mission and aligns with how students actually communicate.
Status: Superseded
Superseded by: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md
Note: Retained for historical context only. If any guidance here conflicts with the Spaces v1 spec, follow the spec.



