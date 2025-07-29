# HIVE Atomic Design Principles

## Foundation Philosophy

The HIVE atomic design system is built on **mobile-first**, **web-enhanced** principles that ensure consistent, accessible, and delightful experiences across all systems.

## Core Principles

### 1. **Mobile-First Architecture**
- All atoms designed for touch interactions (44px minimum touch targets)
- Progressive enhancement from mobile → tablet → desktop
- Responsive by default, not as an afterthought

### 2. **Enhanced Token Integration** 
- **Zero hard-coded values** - all components use HIVE design tokens
- Consistent color, typography, spacing, and motion across all components
- Design tokens from `@hive/tokens` package for maintainability

### 3. **Atomic Composition**
```
Pages → Templates → Organisms → Molecules → Atoms → Tokens
```
- **Atoms**: Button, Input, Text, Icon (building blocks)
- **Molecules**: Card, FormField, SearchBar (combinations)
- **Organisms**: Header, Sidebar, DataTable (complex sections) 
- **Templates**: PageLayout, DashboardLayout (page structures)
- **Pages**: Specific implementations using templates

### 4. **Consistent Interaction Patterns**
- All interactive elements follow HIVE motion system
- Consistent hover, focus, and active states
- Accessibility-first approach with proper ARIA labels

### 5. **System-Aware Design**
- Components work seamlessly across all 7 HIVE systems
- Cross-system data flow and navigation patterns
- Unified error handling and loading states

## Usage Guidelines

### Component Hierarchy
Always build **bottom-up**:
1. Start with atoms for basic functionality
2. Compose molecules for common patterns  
3. Build organisms for complex sections
4. Create templates for page layouts
5. Implement pages using templates

### Token Usage
```tsx
// ✅ Good - Uses HIVE design tokens
className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"

// ❌ Bad - Hard-coded values
className="bg-[#FFD700] text-[#0A0A0B] hover:bg-[#FFE255]"
```

### Responsive Design
```tsx
// ✅ Good - Mobile-first responsive
<div className="p-4 sm:p-6 lg:p-8">
  <Text variant="body-sm sm:body-md lg:body-lg">
    Content
  </Text>
</div>
```

## Quality Standards

### Performance
- Sub-2-second loading for all components
- Optimized animations (60fps on mobile)
- Efficient re-renders and memoization

### Accessibility 
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- Color contrast ratios: 4.5:1+ for text

### Cross-Browser Support
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- Consistent behavior across platforms