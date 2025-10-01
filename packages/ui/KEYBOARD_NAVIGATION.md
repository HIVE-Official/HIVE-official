# ⌨️ Keyboard Navigation Guide

**Complete keyboard navigation patterns for HIVE components**

This guide documents all keyboard interactions for HIVE components, ensuring full accessibility compliance with WCAG 2.1 Success Criterion 2.1.1 (Keyboard) and 2.1.2 (No Keyboard Trap).

---

## 🎯 Core Principles

1. **All functionality available via keyboard** - No mouse-only interactions
2. **Visible focus indicators** - 2px solid gold outline on all focused elements
3. **Logical tab order** - Follows visual flow (left-to-right, top-to-bottom)
4. **No keyboard traps** - Users can always navigate away
5. **Standard conventions** - Follows ARIA Authoring Practices Guide

---

## 📱 Global Shortcuts

These shortcuts work throughout the entire HIVE application:

| Key | Action |
|-----|--------|
| `Tab` | Move focus forward to next interactive element |
| `Shift + Tab` | Move focus backward to previous interactive element |
| `Enter` | Activate focused link or button |
| `Space` | Activate focused button or toggle |
| `Escape` | Close modal, dropdown, or cancel current action |
| `?` | Show keyboard shortcuts help (if available) |

---

## 🧱 Component-by-Component Guide

### Button

**Interactive Element**: Single-action trigger

| Key | Action |
|-----|--------|
| `Tab` | Focus button |
| `Enter` | Activate button |
| `Space` | Activate button |

**Example Usage:**
```tsx
<Button onClick={handleClick}>
  Save Changes
</Button>
```

**Screen Reader**: "Save Changes, button"

---

### Input / Textarea

**Interactive Element**: Text entry field

| Key | Action |
|-----|--------|
| `Tab` | Focus input field |
| `Shift + Tab` | Move to previous field |
| `Enter` | Submit form (if in form) |
| `Escape` | Clear input (if enhanced) or blur field |
| `Ctrl/Cmd + A` | Select all text |

**Example Usage:**
```tsx
<Input
  type="text"
  placeholder="Enter your name"
  aria-label="Full name"
/>
```

**Screen Reader**: "Full name, edit text"

---

### Checkbox

**Interactive Element**: Toggle option

| Key | Action |
|-----|--------|
| `Tab` | Focus checkbox |
| `Space` | Toggle checked/unchecked |

**Example Usage:**
```tsx
<Checkbox
  checked={agreed}
  onCheckedChange={setAgreed}
  aria-label="I agree to terms"
/>
```

**Screen Reader**: "I agree to terms, checkbox, checked/unchecked"

---

### Switch

**Interactive Element**: Binary toggle

| Key | Action |
|-----|--------|
| `Tab` | Focus switch |
| `Space` | Toggle on/off |
| `Enter` | Toggle on/off |

**Example Usage:**
```tsx
<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
  aria-label="Enable notifications"
/>
```

**Screen Reader**: "Enable notifications, switch, on/off"

---

### Select (Dropdown)

**Interactive Element**: Option selection

| Key | Action |
|-----|--------|
| `Tab` | Focus select trigger |
| `Enter` / `Space` | Open dropdown |
| `↑` / `↓` | Navigate options (when open) |
| `Home` | Jump to first option |
| `End` | Jump to last option |
| `Enter` | Select focused option and close |
| `Escape` | Close dropdown without selecting |
| `A-Z` | Jump to option starting with letter |

**Example Usage:**
```tsx
<Select>
  <SelectTrigger aria-label="Choose option">
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

**Screen Reader**: "Choose option, popup button, collapsed/expanded"

---

### Tabs

**Interactive Element**: Content switcher

| Key | Action |
|-----|--------|
| `Tab` | Focus tab list (first tab selected) |
| `← / →` | Navigate between tabs |
| `Home` | Jump to first tab |
| `End` | Jump to last tab |
| `Tab` | Move focus to tab panel content |

**Example Usage:**
```tsx
<Tabs defaultValue="tab1">
  <TabsList aria-label="Main navigation">
    <TabsTrigger value="tab1">Profile</TabsTrigger>
    <TabsTrigger value="tab2">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Profile content</TabsContent>
  <TabsContent value="tab2">Settings content</TabsContent>
</Tabs>
```

**Screen Reader**: "Main navigation, tab list. Profile, tab, 1 of 2, selected"

---

### Dialog / Modal

**Interactive Element**: Overlay content

| Key | Action |
|-----|--------|
| `Tab` | Cycle through modal content (focus trapped) |
| `Shift + Tab` | Reverse cycle through modal content |
| `Escape` | Close modal |
| `Enter` | Activate default button (if present) |

**Focus Management:**
1. When opened: Focus moves to first focusable element in modal
2. While open: Tab cycles only within modal (focus trap)
3. When closed: Focus returns to trigger element

**Example Usage:**
```tsx
<Dialog>
  <DialogTrigger>Open Modal</DialogTrigger>
  <DialogContent aria-labelledby="dialog-title">
    <DialogTitle id="dialog-title">Confirm Action</DialogTitle>
    <DialogDescription>Are you sure?</DialogDescription>
    <DialogFooter>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Screen Reader**: "Confirm Action, dialog. Are you sure?"

---

### Slider

**Interactive Element**: Range input

| Key | Action |
|-----|--------|
| `Tab` | Focus slider |
| `← / ↓` | Decrease value |
| `→ / ↑` | Increase value |
| `Home` | Jump to minimum value |
| `End` | Jump to maximum value |
| `Page Up` | Increase by large step |
| `Page Down` | Decrease by large step |

**Example Usage:**
```tsx
<Slider
  min={0}
  max={100}
  step={5}
  value={[50]}
  onValueChange={setValue}
  aria-label="Volume"
/>
```

**Screen Reader**: "Volume, slider, 50"

---

### Command / Search

**Interactive Element**: Command palette

| Key | Action |
|-----|--------|
| `Ctrl/Cmd + K` | Open command palette |
| `Escape` | Close command palette |
| `↑ / ↓` | Navigate suggestions |
| `Enter` | Execute selected command |
| `Tab` | Cycle through sections (if multiple) |

**Example Usage:**
```tsx
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandGroup heading="Suggestions">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

**Screen Reader**: "Search, edit text. Suggestions, group. Profile, menu item, 1 of 2"

---

### Navigation Shell

**Interactive Element**: App navigation

| Key | Action |
|-----|--------|
| `Tab` | Focus first navigation item |
| `← / →` | Navigate between items |
| `Enter` | Activate navigation link |
| `Home` | Jump to first item |
| `End` | Jump to last item |

**Example Usage:**
```tsx
<nav aria-label="Main navigation">
  <NavigationShell>
    <NavigationItem href="/feed">Feed</NavigationItem>
    <NavigationItem href="/spaces">Spaces</NavigationItem>
    <NavigationItem href="/profile">Profile</NavigationItem>
  </NavigationShell>
</nav>
```

**Screen Reader**: "Main navigation, navigation. Feed, link, 1 of 3"

---

### SkipNav (Skip Links)

**Interactive Element**: Bypass navigation

| Key | Action |
|-----|--------|
| `Tab` (when page loads) | Focus skip link (becomes visible) |
| `Enter` | Jump to main content |
| `Shift + Tab` | Return to skip link |

**Example Usage:**
```tsx
<SkipNav />
<Navigation />
<main id="main-content">
  <h1>Main Content</h1>
</main>
```

**Screen Reader**: "Skip to main content, link"

---

## 🎮 Interactive Patterns

### Roving Tabindex

For toolbar buttons and grid cells, use roving tabindex pattern:

**Pattern**: Only one element in group is tabbable at a time.

| Key | Action |
|-----|--------|
| `Tab` | Enter/exit group |
| `← / → / ↑ / ↓` | Move focus within group |
| `Home` / `End` | Jump to first/last item |

**Example**: Toolbar with multiple buttons
```tsx
<Toolbar role="toolbar" aria-label="Formatting">
  <ToolbarButton tabIndex={0}>Bold</ToolbarButton>
  <ToolbarButton tabIndex={-1}>Italic</ToolbarButton>
  <ToolbarButton tabIndex={-1}>Underline</ToolbarButton>
</Toolbar>
```

---

### Focus Trap (Modals)

**Pattern**: When modal is open, Tab cycles only within modal.

**Implementation**:
1. Store reference to trigger element
2. Move focus to modal when opened
3. Capture Tab/Shift+Tab to cycle within modal
4. Return focus to trigger when closed

**Libraries**: Use `focus-trap-react` or Radix Dialog (built-in)

---

### Focus Management

**Best Practices:**
1. **Preserve focus position** - Return focus after actions complete
2. **Announce changes** - Use `aria-live` for dynamic updates
3. **Clear visual indicators** - 2px gold outline on all focused elements
4. **Logical order** - Tab follows visual flow

**Example**: Delete button that returns focus
```tsx
function handleDelete() {
  const previousItem = getPreviousItem();
  deleteItem(currentItem);
  // Return focus to previous item
  previousItem.focus();
}
```

---

## 🧪 Testing Keyboard Accessibility

### Manual Testing Checklist

- [ ] **Unplug mouse** - Complete entire flow with keyboard only
- [ ] **Tab through page** - All interactive elements reachable
- [ ] **Check focus indicators** - Visible 2px outline on all focused elements
- [ ] **Try all shortcuts** - Verify documented shortcuts work
- [ ] **Check focus order** - Follows logical visual flow
- [ ] **Test modals** - Focus trapped and returns correctly
- [ ] **Test escape key** - Closes modals and dropdowns
- [ ] **Check forms** - All fields navigable and submittable

### Automated Testing

```typescript
// Test keyboard navigation with React Testing Library
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('button is keyboard accessible', async () => {
  const user = userEvent.setup();
  const { getByRole } = render(<Button onClick={mockFn}>Click me</Button>);
  const button = getByRole('button');

  // Tab to button
  await user.tab();
  expect(button).toHaveFocus();

  // Activate with Enter
  await user.keyboard('{Enter}');
  expect(mockFn).toHaveBeenCalled();

  // Activate with Space
  await user.keyboard(' ');
  expect(mockFn).toHaveBeenCalledTimes(2);
});
```

---

## 📚 Resources

- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) - Official W3C patterns
- [WebAIM Keyboard Accessibility](https://webaim.org/techniques/keyboard/) - Testing guide
- [Inclusive Components](https://inclusive-components.design/) - Accessible patterns
- [A11y Project](https://www.a11yproject.com/) - Accessibility checklist

---

## ✅ Quick Reference

**Essential Shortcuts:**
- `Tab` - Navigate forward
- `Shift + Tab` - Navigate backward
- `Enter` - Activate links and buttons
- `Space` - Activate buttons and toggles
- `Escape` - Cancel/close
- `↑ / ↓ / ← / →` - Navigate within component

**Focus Indicator:**
- 2px solid gold (`var(--hive-brand-primary)`)
- 2px offset for breathing room
- Visible on all interactive elements
- Respects `prefers-reduced-motion`

**Testing:**
- Unplug mouse, use keyboard only
- Tab through entire interface
- Verify all functionality accessible
- Check focus indicators visible
- Test with screen reader

---

**Last Updated**: 2025-01-30
**WCAG Version**: 2.1 Level AA
**Compliance**: ✅ All HIVE components keyboard accessible
