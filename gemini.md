# Gemini CLI for HIVE Development

## Overview

This guide covers using [Google's Gemini CLI](https://github.com/google-gemini/gemini-cli) specifically within the HIVE monorepo for AI-assisted development, code review, and project acceleration.

## Quick Setup

### 1. Install Gemini CLI
```bash
# Option 1: Run directly (recommended for first-time use)
npx https://github.com/google-gemini/gemini-cli

# Option 2: Install globally
npm install -g @google/gemini-cli
```

### 2. Authentication
```bash
# Start Gemini CLI
gemini

# Follow the prompts to sign in with your Google account
# This gives you 1,000 requests/day for free
```

### 3. For Higher Limits (Optional)
```bash
# Get API key from https://aistudio.google.com/app/apikey
export GEMINI_API_KEY="your-api-key-here"
```

## HIVE-Specific Workflows

### 🏗️ Architecture Analysis

**Explore the monorepo structure:**
```
> Analyze the HIVE monorepo architecture. What are the main packages and their responsibilities?
```

**Understand the tech stack:**
```
> What technologies are used in this project? Focus on the frontend stack, state management, and build tools.
```

**Review package dependencies:**
```
> Explain the dependency relationships between packages in this monorepo. Which packages depend on each other?
```

### 🎨 UI Component Development

**Analyze existing components:**
```
> Review the UI components in packages/ui/src/components. What design patterns are used?
```

**Create new components:**
```
> Help me create a new Button component following the existing patterns in packages/ui/src/components/ui/
```

**Storybook integration:**
```
> Generate a Storybook story for the Button component following the patterns in packages/ui/src/
```

### 🔧 Code Quality & Refactoring

**Linting and TypeScript:**
```
> Review the ESLint configuration and suggest improvements for better code quality
```

**Type safety:**
```
> Check for any 'any' types in the codebase and suggest proper TypeScript interfaces
```

**Performance optimization:**
```
> Analyze the Next.js app for performance bottlenecks and suggest optimizations
```

### 🚀 Feature Development

**New feature planning:**
```
> Help me plan the implementation of a user profile page. Consider the existing patterns in apps/web/src/app/
```

**API integration:**
```
> Review the API routes in apps/web/src/app/api/ and suggest improvements for error handling
```

**State management:**
```
> Analyze the current state management approach and suggest improvements using Zustand or React Query
```

### 🧪 Testing & Quality Assurance

**Test coverage:**
```
> Review the test files and suggest additional test cases for critical components
```

**E2E testing:**
```
> Help me write Playwright tests for the onboarding flow
```

**Accessibility:**
```
> Audit the components for accessibility issues and suggest improvements
```

## Project-Specific Commands

### Monorepo Management
```bash
# Navigate to specific packages
cd packages/ui && gemini
> Review this package's structure and suggest improvements

cd packages/core && gemini  
> Analyze the business logic and domain models

cd apps/web && gemini
> Review the Next.js application structure
```

### Development Workflow
```bash
# Start in the root directory
cd /Users/laneyfraass/hive_ui
gemini

# Common HIVE-specific prompts:
> Help me understand the authentication flow in this app
> Review the Firebase configuration and security rules
> Analyze the onboarding process and suggest UX improvements
> Help me implement a new feature following the existing patterns
```

## HIVE Project Context for Gemini

### Key Technologies
- **Frontend:** Next.js 15.3.3, React 19 RC, TypeScript 5.8.3
- **Styling:** Tailwind CSS, shadcn/ui, Radix Primitives
- **State:** Zustand, React Query (TanStack Query)
- **Backend:** Firebase (Auth, Firestore, Functions)
- **Build:** Turborepo, pnpm workspaces
- **Testing:** Vitest, Playwright, Storybook

### Project Structure
```
hive_ui/
├── apps/
│   ├── web/          # Main Next.js application
│   └── admin/        # Admin dashboard
├── packages/
│   ├── ui/           # Shared UI components (Storybook)
│   ├── core/         # Business logic and types
│   ├── hooks/        # Shared React hooks
│   ├── auth-logic/   # Authentication logic
│   └── ...           # Other shared packages
```

### Development Standards
- **Type Safety:** Strict TypeScript, no `any` types
- **Code Quality:** ESLint with 0 errors, ≤15 warnings
- **UI/UX:** Dark theme with gold accents, WCAG 2.1 AA compliance
- **Architecture:** Clean separation of concerns, modular design

## Common HIVE Development Tasks

### 1. Component Development
```
> Create a new form component following the patterns in packages/ui/src/components/ui/
> Include proper TypeScript interfaces, accessibility features, and Storybook stories
```

### 2. API Development
```
> Help me create a new API route for user profile updates
> Follow the patterns in apps/web/src/app/api/ and include proper error handling
```

### 3. Database Operations
```
> Review the Firestore security rules and suggest improvements
> Help me write Firebase Functions following the patterns in functions/src/
```

### 4. Testing
```
> Write unit tests for the new component using Vitest and Testing Library
> Create E2E tests for the user flow using Playwright
```

### 5. Documentation
```
> Generate JSDoc comments for the new functions
> Update the README with the new feature
> Create Storybook documentation for the component
```

## Troubleshooting

### Common Issues

**Quota Exceeded:**
```bash
# Check your usage at https://aistudio.google.com/app/apikey
# Consider upgrading your plan for higher limits
```

**Authentication Issues:**
```bash
# Clear authentication and try again
rm -rf ~/.gemini
gemini
```

**Project Context Issues:**
```bash
# Make sure you're in the right directory
cd /Users/laneyfraass/hive_ui
gemini
```

### Performance Tips

1. **Be Specific:** Include file paths and context in your prompts
2. **Use Examples:** Reference existing code patterns when asking for new features
3. **Iterate:** Start with high-level questions, then dive into details
4. **Validate:** Always review and test Gemini's suggestions

## Integration with HIVE Workflow

### Pre-Development
```bash
gemini
> Help me plan the implementation of [feature]. Consider the existing patterns in this codebase.
```

### During Development
```bash
gemini
> Review this code and suggest improvements for type safety and performance.
```

### Post-Development
```bash
gemini
> Help me write tests for this feature following the existing test patterns.
> Generate documentation for this new component.
```

## Best Practices for HIVE

1. **Follow Existing Patterns:** Always reference existing code when asking for new implementations
2. **Maintain Type Safety:** Ensure all suggestions include proper TypeScript interfaces
3. **Consider Accessibility:** Include ARIA attributes and keyboard navigation in UI suggestions
4. **Test Coverage:** Ask for test cases that follow the existing testing patterns
5. **Documentation:** Request JSDoc comments and Storybook stories for new components
6. **Performance:** Consider bundle size and rendering performance in suggestions
7. **Security:** Review Firebase security rules and API authentication in suggestions

## Resources

- [Gemini CLI GitHub Repository](https://github.com/google-gemini/gemini-cli)
- [Google AI Studio](https://aistudio.google.com/app/apikey)
- [HIVE Project Documentation](./README.md)
- [HIVE Development Standards](./cursor_rules/)

---

*This guide is specifically tailored for the HIVE project. For general Gemini CLI usage, see the [official documentation](https://github.com/google-gemini/gemini-cli).* 