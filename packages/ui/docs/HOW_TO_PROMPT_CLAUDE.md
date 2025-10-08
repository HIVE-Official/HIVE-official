# How to Prompt Claude for Storybook Updates

This guide shows you exactly how to ask Claude for updates to your Storybook setup, organized by common tasks.

---

## 🎯 Quick Reference

| Task | Prompt Template |
|------|----------------|
| Add new component | "Create a [component type] component for [feature] that [does what]" |
| Update existing story | "Update the [component] story to include [what changes]" |
| Add new feature | "Create a new feature section for [feature name] with [components list]" |
| Fix styling | "Fix the [component] styling to match HIVE design system" |
| Reorganize | "Reorganize [what] by [how] (e.g., by feature, by complexity)" |

---

## 📝 Prompting Patterns

### Pattern 1: Adding New Components

**Good Prompt:**
```
Create a Space Card component for the 03-Spaces feature that displays:
- Space name and description
- Member count
- Join button
- Space type badge

Use HIVE design system standards:
- CVA variants for different space types (student_org, class, interest)
- Mobile-first sizing (44px+ touch targets)
- HIVE CSS variables for colors
- Framer Motion for hover effects

Create both the component and its story file.
```

**Why it works:**
- ✅ Specifies the feature (03-Spaces)
- ✅ Lists exact requirements
- ✅ References design standards
- ✅ Requests both component and story

**Result:** Claude will create component in `src/features/03-Spaces/space-card.tsx` and story in `src/features/03-Spaces/space-card.stories.tsx`

---

### Pattern 2: Updating Existing Stories

**Good Prompt:**
```
Update the Profile Bento Grid story to include:
1. A new variant showing empty state (no content)
2. A loading state variant
3. Mobile viewport example (375px)
4. Add accessibility notes to the docs

Component is in: src/features/02-Profile/profile-bento-grid.stories.tsx
```

**Why it works:**
- ✅ Specific component identified
- ✅ Clear list of additions
- ✅ Provides file path
- ✅ Numbered for clarity

---

### Pattern 3: Adding New Features

**Good Prompt:**
```
Create a new feature section "04-Feed" for the feed/content discovery feature.

Include these components:
- Feed Post Card (show post content, engagement buttons)
- Feed Filter Bar (filter by space, ritual, etc.)
- Infinite Scroll Container (pagination wrapper)

Create:
1. Feature folder: src/features/04-Feed/
2. Overview page: src/features/04-Feed/index.mdx
3. Component stories for each

Follow HIVE vertical slice organization.
```

**Why it works:**
- ✅ Clear feature name and purpose
- ✅ Lists all components needed
- ✅ Specifies folder structure
- ✅ References organizational pattern

---

### Pattern 4: Reorganization Tasks

**Good Prompt:**
```
I want to reorganize [X] to be organized by [Y].

Current organization: [describe current state]
Desired organization: [describe desired state]

Please:
1. Analyze the current structure
2. Create a reorganization plan
3. Execute the changes
4. Update Storybook config if needed
5. Verify everything still works
```

**Example:**
```
I want to reorganize the notification components to separate them by notification type (social, spaces, rituals, system).

Current: All notifications in 07-Notifications/
Desired: 07-Notifications/ with subfolders for each type

Please reorganize and update story titles accordingly.
```

---

### Pattern 5: Fixing Issues

**Good Prompt:**
```
There's an issue with [component/feature]:

Issue: [describe what's wrong]
Expected: [describe what should happen]
Current behavior: [describe what actually happens]

Component location: [file path]
Error message (if any): [paste error]

Please investigate and fix.
```

**Example:**
```
There's an issue with the Navigation Shell component:

Issue: Mobile menu doesn't close when clicking a link
Expected: Menu should close immediately when navigation occurs
Current behavior: Menu stays open, user has to manually close it

Component location: src/features/08-Navigation/navigation-shell.tsx

Please investigate and fix.
```

---

## 🏗️ Structure-Aware Prompts

Claude understands your project structure. Reference these paths:

```
packages/ui/
├── src/
│   ├── features/           # Vertical slices (feature-based)
│   │   ├── 01-Onboarding/
│   │   ├── 02-Profile/
│   │   ├── 03-Spaces/
│   │   ├── 04-Feed/
│   │   ├── 05-HiveLab/
│   │   ├── 06-Rituals/
│   │   ├── 07-Notifications/
│   │   ├── 08-Navigation/
│   │   ├── 09-Social/
│   │   ├── 10-Forms/
│   │   └── 11-Shared/
│   ├── atomic/             # Component source (not stories)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── 00-Design-System/  # Design tokens
│   └── Introduction.tsx    # Welcome page
└── .storybook/            # Storybook config
```

**Example prompts:**
- "Add a new component to 02-Profile feature"
- "Update the 11-Shared/button.stories.tsx"
- "Create overview docs for 05-HiveLab feature"

---

## 💡 Pro Tips

### Tip 1: Be Specific About Location
❌ **Vague:** "Update the button component"
✅ **Specific:** "Update src/features/11-Shared/button.stories.tsx"

### Tip 2: Reference Standards
Always mention:
- "Follow HIVE design system"
- "Use CVA variants"
- "Mobile-first sizing"
- "HIVE CSS variables"

### Tip 3: Request Verification
End prompts with:
- "Verify it works in Storybook"
- "Test on mobile viewport"
- "Check accessibility"

### Tip 4: Batch Related Changes
Instead of multiple small prompts:
```
Update Profile feature:
1. Add loading states to all widgets
2. Add empty states
3. Update viewport examples
4. Add keyboard navigation docs
```

### Tip 5: Use Feature Context
Instead of: "Create a button"
Better: "Create a join button for the Spaces feature that handles joining/leaving spaces"

---

## 📚 Common Task Examples

### Adding a New Component to Existing Feature

```
Create a Space Member List component for 03-Spaces that:
- Shows space members with avatars
- Displays member role (founder, admin, member)
- Shows online status
- Has infinite scroll for large member lists
- Includes search/filter

Component specs:
- Use profile avatars from 02-Profile
- Follow HIVE mobile-first design
- Include loading and empty states

Create component and story in src/features/03-Spaces/
```

### Creating a Complete New Feature

```
Create the 04-Feed feature with complete documentation and components.

Feed purpose: Content discovery stream showing posts from joined spaces

Components needed:
1. Feed Post Card - display post content
2. Feed Filter Bar - filter by space/ritual
3. Feed Empty State - no content message
4. Feed Loading State - skeleton loaders
5. Infinite Scroll Container - pagination

Structure:
src/features/04-Feed/
├── index.mdx (overview doc)
├── feed-post-card.tsx
├── feed-post-card.stories.tsx
├── feed-filter-bar.tsx
├── feed-filter-bar.stories.tsx
└── ... (other components)

Follow HIVE vertical slice organization and design standards.
```

### Updating Multiple Related Stories

```
Update all Profile feature stories (src/features/02-Profile/) to:
1. Add dark theme variants
2. Include mobile viewport examples (375px)
3. Add interaction tests using @storybook/test
4. Document keyboard navigation
5. Add accessibility notes

Components to update:
- profile-bento-grid
- profile-identity-widget
- profile-activity-widget
- profile-connections-widget
```

### Adding Documentation

```
Create comprehensive documentation for the 08-Navigation feature:

1. Update src/features/08-Navigation/index.mdx with:
   - Keyboard shortcuts reference table
   - Navigation hierarchy diagram
   - Mobile vs desktop differences
   - Accessibility guidelines

2. Add JSDoc comments to navigation components

3. Create a KEYBOARD_SHORTCUTS.md in the feature folder

4. Update stories to include usage examples for each navigation pattern
```

---

## 🔧 Troubleshooting Prompts

### Storybook Won't Load
```
Storybook isn't loading. Help me debug:

Error message: [paste error]
Last change made: [what you changed]
Steps tried: [what you've tried]

Please:
1. Diagnose the issue
2. Fix the error
3. Verify Storybook runs
4. Explain what went wrong
```

### Component Not Showing in Storybook
```
I created a new component but it's not showing in Storybook:

Component: src/features/[feature]/[component].tsx
Story: src/features/[feature]/[component].stories.tsx

The story file exists but doesn't appear in the sidebar.

Please check:
1. Story file export structure
2. .storybook/main.ts glob patterns
3. Story title format
4. Any errors in console
```

### Styling Not Working
```
The [component] styling doesn't match HIVE design system:

Issues:
- Colors are hardcoded instead of CSS variables
- Touch targets too small on mobile
- Not using CVA variants

Component: [file path]

Please:
1. Convert to HIVE CSS variables
2. Ensure 44px+ touch targets
3. Add CVA variants
4. Update story to show all variants
```

---

## 🎨 Design System Prompts

### Checking Compliance
```
Audit all components in [feature] for HIVE design system compliance:

Check for:
✅ HIVE CSS variables (no hardcoded colors)
✅ Mobile-first sizing (44px+ touch targets)
✅ CVA variants
✅ React.forwardRef
✅ TypeScript types exported
✅ Accessible (ARIA labels, keyboard nav)

Generate a compliance report and fix any issues.
```

### Adding New Design Tokens
```
Add new design tokens for [purpose]:

Tokens needed:
- --hive-[name]: [value]
- --hive-[name]-hover: [value]

Location: packages/tokens/src/index.css

Then update:
1. @hive/tokens package
2. HIVE documentation in 00-Design-System
3. Examples showing usage
```

---

## 🚀 Workflow Integration

### Before Starting Development
```
I'm about to build [feature]. Help me plan:

Feature description: [what it does]
User flow: [step by step]

Please:
1. Identify which features this relates to (01-11)
2. List existing components I can reuse
3. Identify new components needed
4. Suggest component structure
5. Create a development checklist
```

### After Building Components
```
I just built [components] for [feature]. Help me create Storybook stories:

Components:
- [list components and paths]

For each component, create stories with:
1. Default variant
2. All prop combinations
3. Loading state
4. Empty state
5. Error state
6. Mobile viewport example
7. Interaction examples

Follow HIVE story structure and add autodocs.
```

---

## ✅ Checklist for Good Prompts

Use this checklist when crafting prompts:

- [ ] **Clear goal** - What do you want to accomplish?
- [ ] **Specific location** - Which feature/component/file?
- [ ] **Design standards** - Mention HIVE design system
- [ ] **Examples** - Show what you want if possible
- [ ] **Completeness** - List all requirements
- [ ] **Verification** - Ask Claude to test/verify
- [ ] **Context** - Reference related components/features

---

## 🎓 Learning Mode

To understand decisions, add:
```
...and explain:
- Why you chose this approach
- Alternative approaches considered
- Trade-offs involved
- Best practices followed
```

---

##Remember: Claude knows your project structure, HIVE design system, and Storybook best practices. The more specific and contextual your prompts, the better the results!

**Quick Start Prompt:**
```
I need help with Storybook. I want to [describe what you want].
The component/feature is [location/name].
Please [specific action] following HIVE standards.
```

That's it! Claude will figure out the rest based on your project structure and conventions.
