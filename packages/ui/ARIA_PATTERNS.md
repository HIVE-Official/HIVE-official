# 🎯 ARIA Patterns Guide

**Complete ARIA attribute patterns for HIVE components**

This guide documents all ARIA (Accessible Rich Internet Applications) patterns used in HIVE components, ensuring screen reader accessibility and WCAG 2.1 compliance.

---

## 🏗️ Core ARIA Principles

### The Golden Rule of ARIA

**"No ARIA is better than bad ARIA"**

1. **Use native HTML first** - `<button>` beats `<div role="button">`
2. **ARIA only when necessary** - Don't over-engineer
3. **Test with screen readers** - VoiceOver (Mac), NVDA (Windows)
4. **Keep it simple** - Complexity confuses users

### When to Use ARIA

✅ **Use ARIA when:**
- Native HTML doesn't exist (e.g., tabs, trees)
- Need to enhance semantics (e.g., `aria-expanded`)
- Dynamic content updates (e.g., `aria-live`)
- Custom widgets (e.g., dropdown menus)

❌ **Don't use ARIA when:**
- Native HTML provides same functionality
- ARIA duplicates native semantics
- ARIA breaks expected behavior

---

## 📋 ARIA Attributes Reference

### 1. Labels & Descriptions

#### aria-label
**Purpose**: Provides accessible name when visible label not present

```tsx
// ✅ CORRECT: Button with icon only
<Button aria-label="Close dialog">
  <X />
</Button>

// ❌ WRONG: Button with visible text
<Button aria-label="Save">Save</Button>  // Redundant!
```

**Screen Reader**: "Close dialog, button"

---

#### aria-labelledby
**Purpose**: References element(s) that label current element

```tsx
// ✅ CORRECT: Dialog title labels dialog
<Dialog aria-labelledby="dialog-title">
  <DialogTitle id="dialog-title">Confirm Delete</DialogTitle>
  <DialogDescription>This action cannot be undone.</DialogDescription>
</Dialog>
```

**Screen Reader**: "Confirm Delete, dialog"

**Multiple References**:
```tsx
<div aria-labelledby="heading subheading">
  <h2 id="heading">User Settings</h2>
  <p id="subheading">Manage your account preferences</p>
</div>
```

**Screen Reader**: "User Settings Manage your account preferences"

---

#### aria-describedby
**Purpose**: References element(s) that describe current element

```tsx
// ✅ CORRECT: Input with error message
<div>
  <Input
    type="email"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <span id="email-error" className="text-red-500">
      Please enter a valid email address
    </span>
  )}
</div>
```

**Screen Reader** (when invalid):
"Email, edit text, invalid. Please enter a valid email address"

---

### 2. States & Properties

#### aria-expanded
**Purpose**: Indicates if element is expanded or collapsed

```tsx
// ✅ CORRECT: Dropdown button
<Button
  aria-expanded={isOpen}
  aria-controls="dropdown-menu"
  onClick={() => setIsOpen(!isOpen)}
>
  Options
</Button>
<div id="dropdown-menu" hidden={!isOpen}>
  {/* Menu items */}
</div>
```

**Screen Reader**:
- Collapsed: "Options, button, collapsed"
- Expanded: "Options, button, expanded"

---

#### aria-selected
**Purpose**: Indicates selected state in selectable elements

```tsx
// ✅ CORRECT: Tab navigation
<TabsList role="tablist">
  <TabsTrigger
    role="tab"
    aria-selected={activeTab === 'profile'}
    aria-controls="profile-panel"
  >
    Profile
  </TabsTrigger>
</TabsList>
<TabsContent
  id="profile-panel"
  role="tabpanel"
  tabIndex={0}
>
  Profile content
</TabsContent>
```

**Screen Reader**: "Profile, tab, 1 of 3, selected"

---

#### aria-checked
**Purpose**: Indicates checked state in checkboxes/radio buttons

```tsx
// ✅ CORRECT: Custom checkbox
<div
  role="checkbox"
  aria-checked={isChecked}
  aria-label="Accept terms and conditions"
  tabIndex={0}
  onClick={() => setIsChecked(!isChecked)}
  onKeyDown={(e) => e.key === ' ' && setIsChecked(!isChecked)}
/>

// ⚠️ BETTER: Use native checkbox
<Checkbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
  aria-label="Accept terms and conditions"
/>
```

**Screen Reader**: "Accept terms and conditions, checkbox, checked/unchecked"

---

#### aria-disabled
**Purpose**: Indicates disabled state (when native disabled not available)

```tsx
// ⚠️ Use native disabled when possible
<Button disabled={isDisabled}>Submit</Button>

// ✅ Use aria-disabled for custom components
<div
  role="button"
  aria-disabled={isDisabled}
  onClick={isDisabled ? undefined : handleClick}
  className={isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
>
  Submit
</div>
```

**Screen Reader**: "Submit, button, dimmed" or "unavailable"

---

#### aria-invalid
**Purpose**: Indicates validation error in form fields

```tsx
// ✅ CORRECT: Form field with validation
<FormField>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    aria-invalid={!!error}
    aria-describedby={error ? "email-error" : undefined}
  />
  {error && (
    <p id="email-error" role="alert">
      {error}
    </p>
  )}
</FormField>
```

**Screen Reader** (when invalid):
"Email, edit text, invalid. Please enter a valid email"

---

#### aria-required
**Purpose**: Indicates required form fields

```tsx
// ✅ CORRECT: Required field
<Input
  type="text"
  required
  aria-required="true"
  aria-label="Full name"
/>

// Note: Native required attribute is preferred
<Input type="text" required aria-label="Full name" />
```

**Screen Reader**: "Full name, edit text, required"

---

### 3. Live Regions

#### aria-live
**Purpose**: Announces dynamic content updates to screen readers

```tsx
// ✅ CORRECT: Status message
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// ✅ CORRECT: Alert message
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

**Politeness Levels:**
- `polite` - Announce when user is idle (default)
- `assertive` - Interrupt immediately (use sparingly!)
- `off` - Don't announce

**aria-atomic:**
- `true` - Announce entire region
- `false` - Announce only changed parts

**Example: Loading Spinner**
```tsx
<div role="status" aria-live="polite" aria-label="Loading">
  <Spinner />
  <span className="sr-only">Loading content, please wait...</span>
</div>
```

**Screen Reader**: "Loading content, please wait..."

---

#### role="status"
**Purpose**: Live region for status updates (polite)

```tsx
// ✅ CORRECT: Upload progress
<div role="status" aria-live="polite">
  {uploadProgress}% uploaded
</div>
```

**Screen Reader**: "42% uploaded"

---

#### role="alert"
**Purpose**: Live region for important messages (assertive)

```tsx
// ✅ CORRECT: Error notification
<div role="alert">
  <AlertIcon />
  <span>File upload failed. Please try again.</span>
</div>
```

**Screen Reader**: "Alert. File upload failed. Please try again."

---

### 4. Relationships

#### aria-controls
**Purpose**: Identifies element controlled by current element

```tsx
// ✅ CORRECT: Button controls panel
<Button
  aria-expanded={isOpen}
  aria-controls="settings-panel"
  onClick={() => setIsOpen(!isOpen)}
>
  Settings
</Button>
<div id="settings-panel" hidden={!isOpen}>
  Settings content
</div>
```

**Screen Reader**: "Settings, button, expanded, controls settings panel"

---

#### aria-owns
**Purpose**: Defines ownership relationship (when DOM structure doesn't reflect it)

```tsx
// ✅ CORRECT: Select owns listbox (even if not DOM parent)
<div role="combobox" aria-owns="listbox-1" aria-expanded={isOpen}>
  <input type="text" aria-autocomplete="list" />
</div>
<Portal>
  <ul id="listbox-1" role="listbox">
    <li role="option">Option 1</li>
    <li role="option">Option 2</li>
  </ul>
</Portal>
```

---

#### aria-haspopup
**Purpose**: Indicates element triggers popup (menu, dialog, etc.)

```tsx
// ✅ CORRECT: Button triggers menu
<Button
  aria-haspopup="menu"
  aria-expanded={isOpen}
  aria-controls="dropdown-menu"
>
  Actions
</Button>
```

**Values:**
- `menu` - Dropdown menu
- `listbox` - Select dropdown
- `tree` - Tree view
- `grid` - Grid popup
- `dialog` - Modal dialog
- `true` / `false`

---

### 5. Interactive Widgets

#### Dialog / Modal

```tsx
<Dialog>
  <DialogTrigger aria-haspopup="dialog">
    Open Settings
  </DialogTrigger>
  <DialogContent
    role="dialog"
    aria-modal="true"
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    <DialogTitle id="dialog-title">
      Settings
    </DialogTitle>
    <DialogDescription id="dialog-description">
      Manage your preferences
    </DialogDescription>
    {/* Content */}
  </DialogContent>
</Dialog>
```

**Required ARIA:**
- `role="dialog"` - Identifies dialog
- `aria-modal="true"` - Focus trap active
- `aria-labelledby` - References title
- `aria-describedby` - References description (optional)

**Screen Reader**: "Settings, dialog. Manage your preferences"

---

#### Tabs

```tsx
<Tabs>
  <TabsList role="tablist" aria-label="Account settings">
    <TabsTrigger
      role="tab"
      aria-selected={active === 'profile'}
      aria-controls="profile-panel"
      id="profile-tab"
    >
      Profile
    </TabsTrigger>
    <TabsTrigger
      role="tab"
      aria-selected={active === 'security'}
      aria-controls="security-panel"
      id="security-tab"
    >
      Security
    </TabsTrigger>
  </TabsList>

  <TabsContent
    role="tabpanel"
    id="profile-panel"
    aria-labelledby="profile-tab"
    tabIndex={0}
  >
    Profile content
  </TabsContent>
</Tabs>
```

**Required ARIA:**
- `role="tablist"` on tab container
- `role="tab"` on each tab trigger
- `aria-selected` on active tab
- `aria-controls` links tab to panel
- `role="tabpanel"` on each panel
- `aria-labelledby` links panel to tab

**Screen Reader**: "Account settings, tab list. Profile, tab, 1 of 2, selected"

---

#### Dropdown Menu

```tsx
<div>
  <Button
    aria-haspopup="menu"
    aria-expanded={isOpen}
    aria-controls="dropdown-menu"
    id="menu-button"
  >
    Actions
  </Button>

  <div
    role="menu"
    id="dropdown-menu"
    aria-labelledby="menu-button"
    hidden={!isOpen}
  >
    <div role="menuitem" tabIndex={0}>
      Edit
    </div>
    <div role="menuitem" tabIndex={0}>
      Delete
    </div>
  </div>
</div>
```

**Required ARIA:**
- `role="menu"` on container
- `role="menuitem"` on each item
- `aria-haspopup="menu"` on trigger
- `aria-expanded` indicates open/closed
- `aria-controls` links trigger to menu
- `aria-labelledby` labels menu

**Screen Reader**: "Actions, button, has popup. Edit, menu item, 1 of 2"

---

### 6. Landmark Roles

#### Main Content

```tsx
<main id="main-content" tabIndex={-1}>
  <h1>Page Title</h1>
  {/* Main content */}
</main>
```

**Screen Reader**: "Main, landmark"

**Note**: `tabIndex={-1}` allows programmatic focus (for skip links)

---

#### Navigation

```tsx
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/feed">Feed</a></li>
    <li><a href="/spaces">Spaces</a></li>
  </ul>
</nav>
```

**Screen Reader**: "Main navigation, navigation"

**Multiple Navs**: Use unique labels
```tsx
<nav aria-label="Primary navigation">...</nav>
<nav aria-label="Footer navigation">...</nav>
```

---

#### Search

```tsx
<div role="search" aria-label="Site search">
  <Input type="search" placeholder="Search..." />
  <Button type="submit">Search</Button>
</div>
```

**Screen Reader**: "Site search, search"

---

## 🧪 Testing ARIA Implementation

### Screen Reader Testing

**VoiceOver (Mac):**
1. Enable: System Preferences → Accessibility → VoiceOver
2. Shortcut: `Cmd + F5`
3. Navigate: `Ctrl + Option + →/←`

**NVDA (Windows):**
1. Download: https://www.nvaccess.org/
2. Shortcut: `Ctrl + Alt + N`
3. Navigate: `Arrow keys`

**Testing Checklist:**
- [ ] All interactive elements have accessible names
- [ ] Form fields have labels or aria-label
- [ ] Error messages announced via aria-live or role="alert"
- [ ] Modal dialogs trap focus correctly
- [ ] Dynamic content updates announced
- [ ] States (expanded, selected, checked) announced
- [ ] Landmark roles identify page regions

---

### Automated Testing

```typescript
// Test ARIA attributes with React Testing Library
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('dialog has required ARIA attributes', async () => {
  const { container, getByRole } = render(
    <Dialog>
      <DialogContent aria-labelledby="title">
        <DialogTitle id="title">Confirm</DialogTitle>
      </DialogContent>
    </Dialog>
  );

  // Check ARIA attributes
  const dialog = getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(dialog).toHaveAttribute('aria-labelledby', 'title');

  // Check for accessibility violations
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 📚 Resources

- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) - Official W3C guide
- [ARIA in HTML](https://www.w3.org/TR/html-aria/) - Valid ARIA usage
- [WebAIM ARIA Techniques](https://webaim.org/techniques/aria/) - Practical guide
- [A11ycasts](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g) - Video tutorials

---

## ✅ Quick Checklist

**Before Shipping:**
- [ ] All buttons have accessible names (`aria-label` or text)
- [ ] Form fields have labels (`<label>` or `aria-label`)
- [ ] Interactive widgets have proper roles
- [ ] States announced (`aria-expanded`, `aria-selected`)
- [ ] Errors announced (`aria-invalid`, `aria-describedby`)
- [ ] Dialogs have `aria-modal`, `aria-labelledby`
- [ ] Live regions for dynamic updates
- [ ] Tested with screen reader

---

**Last Updated**: 2025-01-30
**WCAG Version**: 2.1 Level AA
**Compliance**: ✅ All patterns follow ARIA Authoring Practices Guide
