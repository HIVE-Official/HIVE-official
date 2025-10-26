# Welcome Mat Component

## Overview

The Welcome Mat is a dismissible overlay component that greets new users when they first arrive at HIVE after completing onboarding. It provides a warm welcome experience and guides users toward key actions like exploring spaces.

## Features

- **One-time Display**: Shows only once per user using localStorage persistence
- **Web-first Design**: Optimized for web usage with appropriate messaging
- **Builder Nudging**: Primary CTA drives users to explore spaces
- **Smooth Animations**: Premium entrance/exit animations using Framer Motion
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive**: Works across desktop and mobile viewports

## Usage

### Basic Implementation

```tsx
import { WelcomeMat, useWelcomeMat } from '@hive/ui';

function MyApp() {
  const { isVisible, dismissWelcomeMat } = useWelcomeMat();

  return (
    <div>
      {/* Your app content */}
      <WelcomeMat
        isVisible={isVisible}
        onDismiss={dismissWelcomeMat}
        userName="Alex Chen"
      />
    </div>
  );
}
```

### With Provider (Recommended)

The `WelcomeMatProvider` automatically handles authentication state and shows the welcome mat at the right time:

```tsx
import { WelcomeMatProvider } from '@/components/welcome-mat-provider';

function RootLayout({ children }) {
  return (
    <WelcomeMatProvider>
      {children}
    </WelcomeMatProvider>
  );
}
```

## Component Props

### WelcomeMat

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Whether the welcome mat is visible |
| `onDismiss` | `() => void` | Yes | Callback when the welcome mat is dismissed |
| `userName` | `string` | No | User's name for personalization |
| `className` | `string` | No | Additional CSS classes |

### useWelcomeMat Hook

Returns an object with:

| Property | Type | Description |
|----------|------|-------------|
| `isVisible` | `boolean` | Whether the welcome mat should be shown |
| `dismissWelcomeMat` | `() => void` | Function to dismiss and persist dismissal |
| `hasCheckedStorage` | `boolean` | Whether localStorage check is complete |

## Design Decisions

### Messaging
- **Primary Message**: "You're in — welcome to HIVE! 🚀"
- **Tone**: Confident-friendly (Apple Support meets campus RA)
- **Tips**: Web-focused guidance about scrolling feed and creating spaces

### Actions
- **Primary CTA**: "Explore Spaces" → `/spaces` (drives Builder engagement)
- **Secondary CTA**: "View your profile →" → `/profile`
- **Dismiss**: X button in top-right corner

### Trigger Logic
- Shows on first page load after onboarding completion
- Triggered by `onboardingCompleted: true` in user profile
- Persisted dismissal via `localStorage.welcomeMatDismissed`
- Never shows again once dismissed

## Styling

The component uses HIVE's design system:

- **Background**: Dark gradient with backdrop blur
- **Card**: Glassmorphism effect with subtle borders
- **Colors**: Gold accents (#FFD700) on dark theme (#0A0A0A)
- **Typography**: System font stack with proper hierarchy
- **Animations**: Smooth scale and fade transitions

## Accessibility

- **Keyboard Navigation**: Tab through all interactive elements
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Traps focus within the modal when open
- **Color Contrast**: WCAG 2.1 AA compliant contrast ratios

## Integration Points

### Authentication
- Integrates with `useAuth` hook to check user state
- Only shows for authenticated users with completed onboarding
- Respects loading states to prevent flash of content

### Navigation
- Primary CTA navigates to `/spaces` for space discovery
- Secondary CTA navigates to `/profile` for profile management
- Uses `window.location.href` for full page navigation

### Persistence
- Uses localStorage for client-side persistence
- Graceful fallback if localStorage is unavailable
- Could be extended to use Firestore for cross-device persistence

## Testing

### Storybook Stories
- Default state with standard messaging
- Personalized state with user name
- Hidden state for testing show/hide
- Animation showcase for interaction testing
- Accessibility testing with a11y addon

### Manual Testing
1. Complete onboarding flow
2. Navigate to any page
3. Verify welcome mat appears
4. Test dismiss functionality
5. Refresh page and verify it doesn't reappear
6. Clear localStorage and verify it reappears

## Future Enhancements

### Planned Features
- A/B testing for different messaging
- Personalized tips based on user's major/interests
- Integration with analytics for conversion tracking
- Progressive disclosure of advanced features

### Potential Improvements
- Cross-device dismissal via Firestore
- Contextual tips based on current page
- Onboarding checklist integration
- Celebration animations for milestones 