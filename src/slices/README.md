# HIVE Slice-Based Architecture

This directory implements a slice-based architecture pattern for better separation of concerns, maintainability, and scalability.

## Slice Structure

### 1. **onboarding/** - User Onboarding & Welcome Experience
- User registration and setup flows
- Welcome experiences and first-time user guidance
- School selection and initial configuration
- Onboarding wizards and step-by-step processes

**Components**: Onboarding wizards, welcome cards, school search, setup flows

### 2. **auth/** - Authentication & Session Management  
- Login/logout flows
- Magic link authentication
- Session management and persistence
- Authentication state and guards

**Components**: Auth flows, login forms, session providers, auth guards

### 3. **feed-rituals/** - Content & Community Features
- Activity feeds and content streams
- Community rituals and engagement patterns
- Social interactions and content creation
- Real-time updates and notifications

**Components**: Feed components, post cards, activity streams, ritual systems, social features

### 4. **spaces-tools/** - Space Management & Tool Ecosystem
- Space discovery, creation, and management
- Tool marketplace and tool management
- HiveLab and tool creation workflows
- Space-tool integration and deployment

**Components**: Space systems, tool marketplace, HiveLab, tool runtime, space management

### 5. **elements-profile/** - UI Elements & User Profiles
- Core UI elements and design system components
- User profile management and customization
- Personal dashboard and widgets
- Profile analytics and settings

**Components**: Base UI elements, profile systems, personal dashboards, settings, analytics

## Architecture Principles

1. **Clear Boundaries**: Each slice has well-defined responsibilities
2. **Minimal Coupling**: Slices communicate through well-defined interfaces
3. **Independent Development**: Teams can work on slices independently
4. **Shared Foundation**: Common utilities and base components are shared
5. **Feature-Based Organization**: Related features grouped together

## Import Rules

- Components within a slice can import from other files in the same slice
- Slices can import from `shared/` utilities and base components
- Cross-slice imports should be minimal and go through public interfaces
- Avoid circular dependencies between slices

## Migration Strategy

1. Create slice structure and boundaries
2. Move existing components to appropriate slices
3. Update imports to use slice-based paths
4. Refactor cross-slice dependencies
5. Establish slice-specific state management