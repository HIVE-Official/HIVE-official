# Presentation System Setup

## Quick Implementation Guide for October 1st Launch

### Why You Need This
Your design system is production-ready, but without a presentation layer, your team lacks:
- Component documentation
- Interactive playground
- Design-dev handoff tools
- Visual regression testing

### Minimal Viable Presentation (2 hours to implement)

#### Step 1: Create Critical Stories (30 min)

Create these 5 essential story files:

##### 1. System Overview (`/packages/ui/src/stories/System.stories.tsx`)
```typescript
export default {
  title: '00-System/Overview',
  parameters: {
    docs: {
      description: {
        component: 'UB Design System - built by students, for students'
      }
    }
  }
}

export const Introduction = () => (
  <div className="p-8 bg-hive-obsidian text-hive-platinum">
    <h1>UB Design System</h1>
    <p>"Dorm Room Startup" Aesthetic</p>
    {/* Add brand colors, typography samples */}
  </div>
)
```

##### 2. Core Atoms (`/packages/ui/src/stories/Atoms.stories.tsx`)
```typescript
import { Button, HiveCard, HiveModal } from '../atomic/atoms'

export default {
  title: '02-Atoms/Core',
  component: Button
}

export const Buttons = () => (
  <>
    <Button variant="primary">Primary</Button>
    <Button variant="brand">Brand Gradient</Button>
    <Button loading>Loading...</Button>
  </>
)
```

##### 3. Navigation (`/packages/ui/src/stories/Navigation.stories.tsx`)
```typescript
import { ResponsiveNavigation } from '../atomic/organisms'

export default {
  title: '04-Organisms/Navigation',
  component: ResponsiveNavigation
}

export const Default = () => <ResponsiveNavigation />
export const Mobile = () => <ResponsiveNavigation forceMobile />
```

##### 4. Profile System (`/packages/ui/src/stories/Profile.stories.tsx`)
```typescript
import { CompleteHiveProfileSystem } from '../atomic/organisms'

export default {
  title: '07-Systems/Profile',
  component: CompleteHiveProfileSystem
}

export const Complete = () => <CompleteHiveProfileSystem />
```

##### 5. Feed Patterns (`/packages/ui/src/stories/Feed.stories.tsx`)
```typescript
// Mock feed items showing the asymmetric layout
export const FeedLayout = () => (
  <div className="grid grid-cols-12 gap-4">
    <div className="col-span-8">Large Card</div>
    <div className="col-span-4 space-y-4">
      <div>Small Card</div>
      <div>Small Card</div>
    </div>
  </div>
)
```

#### Step 2: Run Storybook (5 min)
```bash
cd packages/ui
pnpm storybook
```

#### Step 3: Document Core Props (30 min)

Add JSDoc comments to your key components:
```typescript
interface ButtonProps {
  /** Visual style variant */
  variant?: 'default' | 'primary' | 'secondary' | 'brand'
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg'
  /** Loading state with pulse animation */
  loading?: boolean
  /** Optional leading icon */
  leadingIcon?: React.ReactNode
}
```

#### Step 4: Create Component Status Matrix (15 min)

Track what's ready:
```markdown
| Component | Designed | Built | Documented | Stories |
|-----------|----------|-------|------------|---------|
| Button | ✅ | ✅ | ⚠️ | ⚠️ |
| HiveCard | ✅ | ✅ | ❌ | ❌ |
| SpaceCard | ✅ | ⚠️ | ❌ | ❌ |
| FeedItem | ⚠️ | ❌ | ❌ | ❌ |
```

### Post-Launch Presentation Roadmap

#### Phase 1: Documentation (Week 2)
- Add stories for all atoms
- Document all props with TypeScript
- Create usage examples
- Add accessibility notes

#### Phase 2: Interactive Playground (Week 3)
- Add Storybook controls addon
- Create theme switcher
- Build responsive previews
- Add code snippet copying

#### Phase 3: Design Handoff (Month 2)
- Export design tokens to Figma
- Create design-dev sync process
- Build component usage analytics
- Implement visual regression tests

### Presentation System Architecture

```
/packages/ui/
├── .storybook/
│   ├── main.ts          # Configuration
│   ├── preview.ts       # Global decorators
│   └── theme.ts         # Custom Storybook theme
├── src/
│   ├── stories/
│   │   ├── 00-System/   # Overview & tokens
│   │   ├── 02-Atoms/    # Basic components
│   │   ├── 03-Molecules/# Compositions
│   │   ├── 04-Organisms/# Complex sections
│   │   └── 07-Systems/  # Complete features
│   └── atomic/
│       └── **/*.stories.tsx  # Co-located stories
```

### Key Presentation Patterns

#### 1. Component Variations
Show all states in one view:
```typescript
export const ButtonStates = () => (
  <div className="space-y-4">
    <div>Default: <Button>Click</Button></div>
    <div>Hover: <Button className="hover">Click</Button></div>
    <div>Active: <Button className="active">Click</Button></div>
    <div>Disabled: <Button disabled>Click</Button></div>
    <div>Loading: <Button loading>Click</Button></div>
  </div>
)
```

#### 2. Responsive Previews
Show mobile/tablet/desktop:
```typescript
export const ResponsiveCard = () => (
  <>
    <div className="w-full max-w-sm">
      <h3>Mobile</h3>
      <SpaceCard />
    </div>
    <div className="w-full max-w-md">
      <h3>Tablet</h3>
      <SpaceCard />
    </div>
    <div className="w-full max-w-lg">
      <h3>Desktop</h3>
      <SpaceCard />
    </div>
  </>
)
```

#### 3. Dark Theme Testing
Always show in the campus dark theme:
```typescript
export const decorators = [
  (Story) => (
    <div className="bg-hive-obsidian min-h-screen p-8">
      <Story />
    </div>
  )
]
```

### Integration with Development

#### VS Code Extension
Install "Storybook Snippets" for quick story creation

#### Git Hooks
Add story requirement for new components:
```bash
# pre-commit hook
if [[ $(git diff --name-only --cached | grep -E "\.tsx$") ]]; then
  echo "Check: Does component have .stories.tsx?"
fi
```

#### CI/CD Integration
```yaml
# .github/workflows/storybook.yml
- name: Build Storybook
  run: pnpm build-storybook
- name: Deploy to Chromatic
  run: pnpm chromatic
```

### Success Metrics

#### Launch Day (Oct 1)
- [ ] 5 critical story files created
- [ ] Storybook builds without errors
- [ ] Core components documented

#### Week 1
- [ ] All atoms have stories
- [ ] Navigation patterns documented
- [ ] Profile system showcased

#### Month 1
- [ ] 50+ stories created
- [ ] Interactive controls added
- [ ] Team using for development

### Common Pitfalls to Avoid

1. **Don't over-document** - Focus on what developers need
2. **Don't create before building** - Document what exists
3. **Don't aim for perfection** - Ship iteratively
4. **Don't ignore mobile** - Test all breakpoints
5. **Don't forget dark mode** - It's your primary theme

---

*Remember: The presentation system is for your team, not for show. Make it useful, not beautiful.*
