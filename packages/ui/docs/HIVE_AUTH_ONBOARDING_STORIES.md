# HIVE Auth & Onboarding Stories - Implementation Plan

## Key Differences from Generic Patterns

### 1. **Magic Link Authentication** (No Passwords!)
- School selection FIRST (UB, test university, etc.)
- Email input with domain validation (@buffalo.edu, @test.edu)
- Magic link sent to email
- Development mode shows actual link for testing
- No password fields anywhere!

### 2. **Dark Premium Design System**
```tsx
// Background
className="min-h-screen bg-[#0A0A0B] text-white"

// Gradients
className="bg-gradient-to-br from-[#0A0A0B] via-[#0F0F10] to-[#0A0A0B]"

// Glass effects
className="bg-white/[0.02] border-white/[0.08] backdrop-blur-xl"

// Brand primary (gold)
className="text-[var(--hive-brand-primary)]"
```

### 3. **HIVE Components** (Not shadcn!)
- `HiveButton` - Custom button with HIVE styling
- `HiveCard` - Glass morphism cards
- `HiveInput` - Dark-themed inputs
- `HiveLogo` - Official logo component
- `HiveProgress` - Progress bars with HIVE tokens
- `HiveModal` - Modal dialogs
- `CompletionPsychologyEnhancer` - Gamification component

### 4. **Framer Motion Animations**
```tsx
// Stagger effects
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}

// Spring physics
transition={{ delay: 0.2, type: "spring", stiffness: 200 }}

// Pulse animations
animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
transition={{ duration: 2, repeat: Infinity }}
```

### 5. **Student Voice & Campus Culture**
Interests are authentic and hilarious:
- "Bills Mafia member"
- "Ramen connoisseur"
- "Knox Hall survivor"
- "Coffee addict (obviously)"
- "CS major (actually cool unlike at other schools)"

### 6. **7-Step Onboarding Flow**
1. **Welcome** - HIVE logo with pulse animation
2. **User Type** - Student, Alumni, or Faculty (faculty gets simplified flow)
3. **Personal Info** - First name, last name, handle
4. **Photo** - Profile photo upload (optional, can skip)
5. **Academics & Bio** - Major, graduation year, bio
6. **Interests** - Select 3-6 from categorized list
7. **Completion** - Accept terms, finish onboarding

### 7. **Progress Tracking**
- Sidebar with step indicators and checkmarks
- Profile preview cards that build up as you progress
- Cards have rotation effects (-rotate-1, rotate-1)
- Percentage completion shown

## Stories to Create

### Auth Flow Stories
1. **School Selection** - Grid of schools with location/domain
2. **Email Input** - Campus email with domain validation
3. **Magic Link Sent** - Success modal with dev mode link
4. **Verification Loading** - Spinning loader with status
5. **Verification Success** - Checkmark animation
6. **Verification Error** - Expired/invalid link states

### Onboarding Flow Stories
1. **Welcome Step** - HIVE logo with pulse, "Get Started" button
2. **User Type Selection** - Student/Alumni/Faculty cards
3. **Personal Info** - Name fields with handle validation
4. **Photo Upload** - Drag-drop or file picker (optional)
5. **Academics** - Major dropdown, graduation year
6. **Interests Selection** - Categorized chips (3-6 required)
7. **Completion** - Terms acceptance, profile ready

### Special States
1. **Development Mode Badge** - Shows when using test.edu
2. **Error States** - Network, validation, server errors
3. **Loading States** - Skeleton loaders, spinners
4. **Empty States** - No results, no data
5. **Faculty Flow** - Simplified 5-step version

## Implementation Notes

- Use real HIVE components from @hive/ui (HiveButton, HiveCard, etc.)
- Match exact color palette (#0A0A0B background, gold brand)
- Include Framer Motion animations for polish
- Use HIVE design tokens (var(--hive-spacing-6), var(--hive-text-primary))
- Add realistic student-voice copy
- Show development mode badges where appropriate
- Include profile preview sidebar for onboarding
- Use glass morphism effects throughout

## File Structure
```
/Features/01-Auth/
  - school-selection.stories.tsx
  - magic-link.stories.tsx
  - verification.stories.tsx

/Features/02-Onboarding/
  - welcome.stories.tsx
  - user-type.stories.tsx
  - personal-info.stories.tsx
  - photo-upload.stories.tsx
  - academics.stories.tsx
  - interests.stories.tsx
  - completion.stories.tsx
```

Should I proceed with creating these HIVE-authentic stories?
