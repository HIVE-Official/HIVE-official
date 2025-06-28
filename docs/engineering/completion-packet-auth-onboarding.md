# HIVE Authentication & Onboarding - Completion Packet

## Purpose and Scope

This completion packet serves as the comprehensive documentation framework for conceiving, reviewing, and implementing the Authentication and Onboarding vertical slice with full consideration for data architecture, API design, user interface, motion design, security protocols, analytics integration, accessibility compliance, testing coverage, and launch readiness. The packet itself contains no code, UX mockups, or implementation decisions—instead, it provides structured empty sections and detailed instructions that future AI-human collaborative sessions must follow to systematically fill each component during the actual build process.

## Collaborative Rhythm and Locking Protocol

The AI will draft each section as a complete block of prose, presenting all relevant considerations, dependencies, and specifications in one cohesive narrative before pausing for human review and feedback. Once the human partner types the word "Locked," that section becomes immutable and forms the foundation for subsequent sections—the AI may then proceed to the next section in the prescribed sequence. Skipping ahead or working out of order is strictly forbidden, as each section builds upon the architectural decisions and constraints established in previous sections, creating a dependency chain that ensures system coherence and prevents contradictory specifications.

## Documentation Section Sequence

The packet follows a precise eleven-section sequence that begins with "Context Snapshot" to establish the current system state and user journey requirements, then advances through "System Dependencies" to map integration points with existing HIVE infrastructure, followed by "Data and Schema" to define the persistence layer and data relationships. The sequence continues with "API Contracts" to specify endpoint behavior and request-response patterns, then "State Machines" to model user flow transitions and system state changes, followed by "Edge-case and Security Notes" to address error conditions and threat mitigation. The documentation then covers "Analytics and Logging" to define measurement and observability requirements, proceeds to "UI and UX Specification" to establish interface patterns and interaction design, continues with "Testing Plan" to outline validation strategies across unit, integration, and end-to-end scenarios, advances to "Build-Task Narrative" to sequence implementation work and define completion criteria, and concludes with "Final Ship Checklist" to enumerate pre-launch verification steps and rollback procedures.

## AI Guidance for Build Sessions

During actual build sessions, the AI must ask clarifying questions whenever information is missing, ambiguous, or contradictory rather than making assumptions or proceeding with incomplete specifications. The AI should actively reference previously-locked vertical slices and existing system components to ensure new authentication and onboarding work integrates seamlessly with the broader HIVE platform architecture. The AI is explicitly prohibited from proposing code implementations, database migrations, Storybook stories, wireframes, or user interface copy until every documentation section has been completed and locked by the human partner.

## Completion Protocol and Code Generation Gate

The AI must conclude the packet by providing a comprehensive summary of its own completeness, explicitly identifying any remaining gaps or dependencies, and formally requesting human permission to proceed to code generation. No TypeScript interfaces, React components, Firebase security rules, API route handlers, database schemas, test files, or Storybook documentation should be created until the human explicitly grants permission after reviewing the fully-completed packet and confirming that all sections meet the requirements for system integration, security compliance, and launch readiness.

---

## Section Templates

### Context Snapshot
*Establishes the current system state, user journey requirements, and integration points with existing HIVE infrastructure.*

**Current Authentication Infrastructure Status:**

HIVE already has substantial authentication and onboarding infrastructure in place, but it's in a partially-implemented state that requires completion and integration. The existing system includes a Firebase Auth foundation with magic link authentication for .edu email addresses, a multi-step onboarding flow with Zustand state management, and comprehensive UI components in the `@hive/ui` package. However, critical gaps exist in data persistence, security rule implementation, and production-ready error handling.

**Existing Components and Architecture:**

The authentication flow currently supports email-based magic link authentication through `/api/auth/email/start` and `/api/auth/email/verify` endpoints, with Firebase Auth handling the underlying token management. The `@hive/auth-logic` package provides a React context with `useAuth` hook that includes development mode support with mock users, automatic authentication state management, and integration with Firebase's `onAuthStateChanged` listener. The onboarding system implements a five-step flow (Display Name & Avatar, Leader Question, Space Verification, Academic Card, Interests) managed through a Zustand store in `apps/web/src/lib/stores/onboarding.ts`, with step-specific validation and routing logic.

**Critical Integration Points:**

The system integrates with Firebase Auth for authentication tokens, Firestore for user data persistence (though not fully implemented), Next.js App Router for routing and API endpoints, the `@hive/ui` component library for consistent interface patterns, and Zustand for client-side state management. The `RouteGuard` component provides authentication and onboarding requirement enforcement across the application, while the `AuthProvider` wraps the entire application to provide authentication context.

**Current User Journey Gaps:**

While the UI flow is largely complete, several critical backend integrations are missing: user profile data is not being persisted to Firestore during onboarding completion, the `/api/auth/complete-onboarding` endpoint has TODO comments indicating incomplete implementation, space verification for student leaders is not connected to actual verification logic, and handle uniqueness checking is not implemented. Additionally, the development mode bypass system needs production-ready error handling and security validation.

**Technical Debt and Immediate Concerns:**

The current implementation has mock data patterns throughout development mode that need production equivalents, incomplete error handling in API routes that could expose security vulnerabilities, missing analytics tracking for conversion funnel analysis, and Firestore security rules that don't align with the current data model. The onboarding completion flow also lacks proper transaction handling for data consistency and rollback capabilities for failed operations.

### System Dependencies
*Maps all integration points with existing packages, APIs, and third-party services required for authentication and onboarding functionality.*

**Core Package Dependencies:**

The authentication and onboarding system has deep integration with the existing HIVE monorepo packages, requiring `@hive/auth-logic` for authentication context and Firebase configuration, `@hive/core` for business logic, types, and logging utilities, `@hive/ui` for all interface components including the complete onboarding step components and authentication forms, `@hive/validation` for Zod schemas and runtime data validation, and `@hive/hooks` for shared React hooks and state management patterns. Additionally, the system depends on `@hive/utilities` for common helper functions and `@hive/tokens` for design system consistency.

**Firebase Service Integration:**

Firebase Auth provides the foundational authentication service with magic link email authentication, custom token generation for development mode, user profile management through `updateProfile`, and integration with Firestore for user data persistence. Firebase Firestore serves as the primary database for user profiles, onboarding data, space memberships, and verification records, while Firebase Cloud Functions handle server-side authentication logic, onboarding completion processing, and email verification workflows. The system also integrates with Firebase Admin SDK for server-side user management and custom claims assignment.

**Next.js Framework Dependencies:**

The system leverages Next.js App Router for authentication routes (`/auth/email`, `/auth/verify`, `/onboarding/[step]`), API route handlers for authentication endpoints (`/api/auth/email/start`, `/api/auth/email/verify`, `/api/auth/complete-onboarding`), middleware for authentication state management, and server-side rendering for optimal performance. The `RouteGuard` component integrates with Next.js routing to enforce authentication and onboarding requirements across protected routes.

**Third-Party Service Dependencies:**

Email delivery requires integration with a transactional email service (currently using Firebase Auth's built-in email sending, but may need SendGrid or similar for custom templates), while image storage for user avatars depends on Firebase Storage or a CDN service. Analytics tracking will require integration with the HIVE analytics package and potentially external services for conversion funnel analysis. The system also needs integration with university email verification services to validate .edu domain authenticity.

**Development and Testing Dependencies:**

The development environment requires Jest and React Testing Library for unit and integration testing, Playwright for end-to-end authentication flow testing, Storybook for component development and visual regression testing, and Firebase Emulator Suite for local development and testing. The system also depends on ESLint and TypeScript for code quality enforcement, and Prettier for consistent code formatting.

**State Management and Data Flow Dependencies:**

Client-side state management relies on Zustand for onboarding data persistence, React Query for server state management and caching, React Context for authentication state propagation, and the existing `useAuth` hook for authentication status. The system integrates with the broader HIVE state management patterns and must maintain consistency with existing data flow architectures.

**Security and Compliance Dependencies:**

The authentication system must integrate with HIVE's security infrastructure including Firestore security rules for data access control, rate limiting mechanisms for API endpoints, CSRF protection for form submissions, and content security policy enforcement. The system also requires integration with privacy compliance tools for GDPR and CCPA requirements, audit logging for security events, and encryption services for sensitive data handling.

### Data and Schema
*Defines the complete data model including Firestore collections, document structures, validation schemas, and data relationships.*

**Core User Profile Schema:**

The primary user document in the `users` collection contains the complete user profile with fields for `uid` (string, Firebase Auth ID), `email` (string, verified .edu email), `fullName` (string, display name), `handle` (string, unique username), `avatarUrl` (optional string, profile image URL), `emailVerified` (boolean, email verification status), `onboardingCompleted` (boolean, completion flag), `role` (enum: 'public', 'verified', 'verifiedPlus', 'moderator', 'admin'), `createdAt` (timestamp), `updatedAt` (timestamp), and `lastActiveAt` (timestamp). The document structure must support atomic updates and include proper indexing for handle uniqueness checks and email lookups.

**Onboarding Data Schema:**

The onboarding process extends the user profile with academic and leadership information including `academicLevel` (enum: 'undergraduate', 'masters', 'phd'), `majors` (array of strings, supporting multiple majors), `graduationYear` (number, four-digit year), `interests` (array of strings, user-selected interests), `isStudentLeader` (boolean, leadership status), `spaceId` (optional string, associated space for leaders), `spaceName` (optional string, custom space name), `spaceDescription` (optional string, space description), and `verificationEmails` (optional array of strings, verification contact emails). This data structure aligns with the existing `OnboardingData` interface in `packages/core/src/types/onboarding.ts` and supports both individual users and student leaders creating spaces.

**Authentication and Session Management:**

Firebase Auth handles token management with custom claims including `onboardingCompleted` (boolean), `role` (string), `emailVerified` (boolean), and `isBuilder` (boolean for space creators). Session data includes authentication tokens with appropriate expiration, refresh token management, and custom claims that sync with Firestore user data. The system maintains session consistency between Firebase Auth and Firestore through Cloud Functions triggers on user creation and profile updates.

**Space and Membership Relationships:**

For student leaders, the schema includes space creation with documents in the `spaces` collection containing `id` (string, unique identifier), `name` (string, space name), `description` (string, space purpose), `category` (enum: 'Major', 'Residential', 'Student Life', 'Club', 'General'), `createdBy` (string, creator user ID), `isPublic` (boolean, visibility), `imageUrl` (string, space image), `memberCount` (number, cached member count), and `createdAt` (timestamp). Space membership is tracked through sub-collections with `spaces/{spaceId}/members/{userId}` documents containing `role` (enum: 'member', 'moderator', 'admin'), `joinedAt` (timestamp), and `invitedBy` (optional string, referrer user ID).

**Verification and Security Schema:**

The verification system for student leaders includes documents in a `verifications` collection with `id` (string, unique verification ID), `userId` (string, user being verified), `spaceId` (string, space being verified), `verificationEmails` (array of strings, contact emails), `status` (enum: 'pending', 'in_progress', 'approved', 'rejected'), `submittedAt` (timestamp), `reviewedAt` (optional timestamp), `reviewedBy` (optional string, admin user ID), and `notes` (optional string, admin notes). This enables manual verification workflows for space leadership claims.

**Data Validation and Constraints:**

All data must pass Zod schema validation with email format validation for .edu domains, handle format validation (3-20 characters, lowercase, alphanumeric and underscores), full name length constraints (2-50 characters), major and interest selection from predefined lists, graduation year validation (current year to current year + 10), and space name uniqueness within categories. The validation schemas must be shared between client and server to ensure consistency and prevent invalid data submission.

**Indexing and Query Optimization:**

Firestore indexes are required for handle uniqueness queries (`users` collection, single field index on `handle`), email lookup queries (`users` collection, single field index on `email`), space membership queries (composite index on `spaces/{spaceId}/members` with `role` and `joinedAt`), verification status queries (`verifications` collection, composite index on `status` and `submittedAt`), and user role queries (`users` collection, single field index on `role`). These indexes support efficient authentication, authorization, and administrative queries while maintaining query performance at scale.

**Data Migration and Versioning:**

The schema includes version tracking with a `schemaVersion` field in user documents to support future migrations, backward compatibility for existing partial user data, and migration scripts for converting development mock data to production schema. The system must handle schema evolution gracefully, including adding new fields without breaking existing functionality and migrating legacy data structures from the current partial implementation.

### API Contracts
*Specifies all endpoint behaviors, request-response patterns, error codes, and integration with Firebase Auth and custom backend services.*

**Authentication Endpoints:**

The `POST /api/auth/email/start` endpoint accepts `{ email: string }` with .edu domain validation, returns `{ ok: boolean, timeoutMs: number, message: string }` on success or `{ message: string }` with 400/500 status on error, implements rate limiting (max 3 attempts per 15 minutes per email), and integrates with Firebase Auth's `sendSignInLinkToEmail` function. The `POST /api/auth/email/verify` endpoint accepts `{ email: string, url: string }` containing the magic link, returns `{ ok: boolean, user: { uid, email, isNewUser, emailVerified }, idToken: string }` on success, handles Firebase Auth errors with specific error codes (invalid-action-code, user-disabled, too-many-requests), and includes development mode bypass returning mock authentication data.

**Onboarding Data Management:**

The `POST /api/auth/complete-onboarding` endpoint accepts the complete `OnboardingData` payload with required fields (fullName, major, handle, consentGiven) and optional fields (avatarUrl, builderOptIn, spaceId), validates all input data against Zod schemas, checks handle uniqueness against existing users, creates or updates the user document in Firestore with a transaction, updates Firebase Auth custom claims to include `onboardingCompleted: true`, and returns `{ ok: boolean, message: string, userId?: string }` with appropriate error handling for validation failures, database errors, and authentication issues. The endpoint must handle both individual user onboarding and student leader onboarding with space creation.

**Profile and Settings Endpoints:**

A new `GET /api/profile/me` endpoint returns the current user's complete profile data including onboarding status, space memberships, and verification status, requires valid Firebase Auth token, and handles cases where user data doesn't exist in Firestore. The `PATCH /api/profile/me` endpoint allows updating specific profile fields (fullName, avatarUrl, interests, major) with proper validation, implements optimistic locking to prevent concurrent update conflicts, and maintains audit trails for profile changes. A `POST /api/profile/check-handle` endpoint validates handle availability, implements rate limiting to prevent enumeration attacks, and returns immediate feedback for username selection.

**Space and Verification Endpoints:**

For student leaders, `POST /api/spaces/create` accepts space creation data (name, description, category, imageUrl), validates the user's leadership status, creates the space document and initial membership record in a Firestore transaction, and returns the created space data with membership information. The `POST /api/verification/submit` endpoint handles verification requests for student leader status, accepts verification emails and space information, creates verification records for admin review, and triggers notification workflows for verification processing. A `GET /api/verification/status` endpoint allows users to check their verification status and provides estimated processing times.

**Administrative Endpoints:**

Admin-only endpoints include `GET /api/admin/verifications` for listing pending verifications with filtering and pagination, `POST /api/admin/verifications/{id}/approve` for approving student leader verifications, `POST /api/admin/verifications/{id}/reject` for rejecting verifications with required reason notes, and `GET /api/admin/users` for user management with search and filtering capabilities. All admin endpoints require elevated permissions validated through Firebase Auth custom claims and implement comprehensive audit logging.

**Error Handling and Status Codes:**

All endpoints follow consistent error response patterns with 400 for validation errors including field-specific error messages, 401 for authentication failures with appropriate redirect hints, 403 for authorization failures with clear permission requirements, 409 for conflict errors (duplicate handles, existing verifications), 429 for rate limiting with retry-after headers, and 500 for server errors with sanitized error messages and correlation IDs for debugging. Error responses include `{ error: string, details?: object, correlationId: string }` structure for consistent client-side error handling.

**Authentication and Authorization:**

All protected endpoints require valid Firebase Auth ID tokens in the Authorization header as `Bearer {token}`, implement token verification through Firebase Admin SDK, validate custom claims for role-based access control, and include automatic token refresh handling for expired tokens. The system maintains session consistency between client and server through proper token validation and custom claims synchronization with Firestore user data.

**Rate Limiting and Security:**

API endpoints implement rate limiting with different limits per endpoint type (authentication: 3/15min, profile updates: 10/hour, admin actions: 100/hour), CORS policies restricting access to authorized domains, request size limits preventing payload attacks, and IP-based blocking for suspicious activity patterns. The system includes comprehensive request logging for security monitoring and audit compliance.

**Development and Testing Support:**

All endpoints support development mode with mock data responses when Firebase environment variables are not configured, include comprehensive OpenAPI documentation for testing and integration, provide detailed error messages in development environments while sanitizing them in production, and support integration testing through consistent test data patterns and predictable mock responses.

### State Machines
*Models user flow transitions, system state changes, and the complete authentication and onboarding journey from entry to completion.*

**Primary Authentication State Machine:**

The authentication flow begins in the `anonymous` state where users can access public content but cannot perform authenticated actions, transitions to `email_pending` when a valid .edu email is submitted through `/api/auth/email/start`, moves to `email_verification` when the magic link email is sent and the user is directed to check their email, and advances to `authenticated_unverified` when the user clicks the magic link but before email verification is confirmed. The flow then moves to `authenticated_verified` once email verification is complete through `/api/auth/email/verify`, and finally reaches `authenticated_onboarding_required` if the user needs to complete onboarding or `authenticated_complete` if onboarding is already finished. Error states include `email_invalid` for non-.edu emails, `verification_expired` for expired magic links, and `authentication_failed` for various Firebase Auth errors.

**Onboarding State Machine:**

The onboarding process starts in `onboarding_start` when an authenticated user without completed onboarding is redirected to `/onboarding/1`, progresses through `step_1_display_name` for name and handle collection, `step_2_leader_question` for leadership status determination, and conditionally enters `step_3_space_verification` only for users who indicate they are student leaders. All users then proceed to `step_4_academic_card` for academic information collection and `step_5_interests` for interest selection, before reaching `onboarding_submitting` during the final data submission process. The flow concludes in `onboarding_complete` when all data is successfully persisted and the user is redirected to their feed, or enters error states like `onboarding_validation_error` for invalid data, `onboarding_submission_error` for server failures, or `handle_conflict_error` for duplicate username attempts.

**Student Leader Verification State Machine:**

For users who indicate student leadership, a parallel verification state machine begins in `verification_not_required` for regular users, `verification_pending_submission` for leaders who haven't yet submitted verification details, and `verification_submitted` once verification emails and space information are provided to admins. The verification then moves to `verification_under_review` when admins begin processing, and concludes in either `verification_approved` allowing full space creation capabilities or `verification_rejected` with the option to resubmit with additional information. This state machine runs independently of the main onboarding flow, allowing users to complete onboarding while verification is pending.

**Space Creation State Machine:**

For approved student leaders, space creation begins in `space_creation_available` where they can initiate space creation, moves to `space_details_collection` during the space information gathering process, advances to `space_validation` for server-side validation of space name uniqueness and content appropriateness, and proceeds to `space_creation_submitting` during the Firestore transaction that creates the space and initial membership. The flow concludes in `space_created_success` with automatic membership assignment, or enters error states like `space_name_conflict` for duplicate names, `space_validation_failed` for inappropriate content, or `space_creation_error` for database failures.

**Session and Authentication State Management:**

The session state machine manages authentication persistence across browser sessions, starting in `session_initializing` during app startup while Firebase Auth state is being determined, moving to `session_authenticated` for valid authenticated sessions with proper token management, or `session_anonymous` for unauthenticated users. The session handles automatic token refresh in `session_refreshing` state, manages authentication state changes in `session_state_changing`, and handles logout processes in `session_terminating`. Error states include `session_expired` for expired tokens requiring re-authentication and `session_error` for authentication service failures.

**Profile and Settings State Machine:**

Post-onboarding profile management includes states for `profile_viewing` when users access their profile page, `profile_editing` during profile updates, `profile_saving` during server synchronization, and `profile_updated` after successful changes. The avatar upload process has its own sub-states including `avatar_selecting`, `avatar_uploading`, `avatar_processing`, and `avatar_updated`. Handle changes require special handling with states for `handle_checking_availability`, `handle_available`, `handle_unavailable`, and `handle_updated` to manage the uniqueness validation process.

**Error Recovery and Retry Logic:**

All state machines include comprehensive error recovery patterns with automatic retry logic for transient failures, user-initiated retry options for recoverable errors, and clear error messaging with actionable next steps for permanent failures. The system maintains error state history to prevent infinite retry loops and provides fallback paths for users to complete critical flows even when secondary features fail. State persistence ensures that users can resume interrupted flows after browser refreshes or network interruptions.

**Development Mode State Overrides:**

In development mode, the state machines include bypass mechanisms that allow direct navigation to any state for testing purposes, mock state transitions that simulate server responses without actual API calls, and state inspection tools for debugging complex user flows. The development overrides maintain the same state validation logic as production while providing additional flexibility for testing edge cases and error conditions.

### Edge-case and Security Notes
*Addresses error conditions, security threats, rate limiting, data validation, and threat mitigation strategies.*

**Authentication Security Vulnerabilities:**

The magic link authentication system must prevent email enumeration attacks by returning consistent responses regardless of whether an email exists in the system, implement proper rate limiting to prevent brute force attempts against email validation, and include CSRF protection for all authentication endpoints. The system must validate that magic links can only be used once and expire after a reasonable timeframe (15 minutes), prevent replay attacks by invalidating tokens after successful authentication, and implement proper session management to prevent session fixation attacks. Additionally, the development mode bypass must be completely disabled in production environments to prevent unauthorized access through mock authentication paths.

**Input Validation and Data Sanitization:**

All user inputs require comprehensive validation including email format verification with proper .edu domain checking that prevents subdomain spoofing, handle validation that prevents SQL injection attempts and Unicode normalization attacks, full name sanitization that removes potentially malicious scripts while preserving international characters, and major/interest selection validation against predefined whitelists to prevent injection of arbitrary data. The system must implement proper content security policies to prevent XSS attacks through user-generated content and validate all file uploads for avatar images including file type verification, size limits, and malware scanning.

**Authorization and Privilege Escalation:**

The role-based access control system must prevent privilege escalation by validating all role assignments through server-side checks, ensuring that student leader verification cannot be bypassed through client-side manipulation, and implementing proper authorization checks for all space creation and management operations. The system must validate that users can only access and modify their own profile data, prevent unauthorized access to admin endpoints through proper role validation, and implement audit logging for all privilege-sensitive operations to detect potential security breaches.

**Data Privacy and Compliance:**

The system must implement proper data retention policies for user profiles and onboarding data, provide mechanisms for users to request data deletion in compliance with GDPR and CCPA requirements, and ensure that sensitive information like verification emails is properly encrypted at rest and in transit. Personal data must be minimized to only what's necessary for platform functionality, and the system must implement proper consent management for data collection and processing, including clear opt-out mechanisms for non-essential data usage.

**Rate Limiting and Abuse Prevention:**

Comprehensive rate limiting must be implemented across all endpoints with different limits for authentication attempts (3 per 15 minutes per email), profile updates (10 per hour per user), handle availability checks (20 per minute per user), and space creation attempts (1 per day per user). The system must detect and prevent automated attacks through behavioral analysis, implement progressive delays for repeated failed attempts, and include IP-based blocking for suspicious activity patterns while maintaining legitimate user access.

**Edge Cases in User Flows:**

The system must handle users who start onboarding but never complete it by implementing cleanup processes for incomplete profiles, managing users who lose access to their .edu email addresses through account recovery mechanisms, and addressing situations where multiple users attempt to claim the same handle simultaneously through proper database locking. The verification system must handle cases where verification emails bounce or are invalid, where student leaders leave their institutions mid-verification, and where spaces need to be transferred to new leaders due to graduation or role changes.

**Session Management and Token Security:**

Firebase Auth tokens must be properly validated on every request with appropriate error handling for expired tokens, the system must implement proper logout functionality that invalidates all session tokens, and token refresh must be handled gracefully without disrupting user experience. The system must prevent token theft through proper HTTPS enforcement, secure cookie configurations, and protection against cross-site scripting attacks that could expose authentication tokens.

**Database Security and Transaction Integrity:**

All database operations must use proper transactions to ensure data consistency, especially during onboarding completion where multiple documents are created or updated simultaneously. The system must implement proper database security rules that prevent unauthorized data access, validate all queries to prevent injection attacks, and include proper backup and recovery mechanisms for critical user data. Firestore security rules must be comprehensive and tested to prevent data leakage or unauthorized modifications.

**Third-Party Integration Security:**

Integration with Firebase services must include proper error handling for service outages, the system must validate all responses from external services to prevent injection attacks, and proper API key management must be implemented to prevent unauthorized access to Firebase resources. Email delivery services must be configured with proper authentication and rate limiting to prevent abuse, and any image storage services must implement proper access controls and content validation.

**Monitoring and Incident Response:**

The system must implement comprehensive logging for all security-relevant events including authentication attempts, authorization failures, and data access patterns, with proper log retention and analysis capabilities. Security monitoring must include automated alerts for suspicious activity patterns, failed authentication attempts, and potential data breaches, with clear incident response procedures for handling security events. The system must maintain audit trails for all administrative actions and provide tools for investigating potential security incidents.

### Analytics and Logging
*Defines measurement requirements, event tracking, conversion funnels, and observability needs for authentication and onboarding flows.*

**Authentication Funnel Analytics:**

The authentication flow requires comprehensive conversion tracking starting with `auth_email_page_viewed` when users land on the email entry page, `auth_email_submitted` when valid .edu emails are submitted, `auth_email_invalid` for non-.edu email attempts, `auth_magic_link_sent` when emails are successfully dispatched, `auth_magic_link_clicked` when users click the verification link, `auth_verification_completed` when authentication is successful, and `auth_verification_failed` for various failure modes. Each event must include metadata such as email domain, user agent, referrer source, and geographic location to enable detailed conversion analysis and identify potential issues with specific university domains or user segments.

**Onboarding Conversion Tracking:**

The onboarding process requires step-by-step conversion tracking with `onboarding_started` when users enter the first step, `onboarding_step_completed` for each individual step completion with step number and completion time, `onboarding_step_abandoned` when users leave without completing a step, `onboarding_validation_error` for form validation failures with specific field information, and `onboarding_completed` for successful completion. The system must track time spent on each step, form field interaction patterns, and abandonment points to identify optimization opportunities and user experience issues.

**Student Leader Verification Analytics:**

The verification system requires specialized tracking including `verification_leadership_claimed` when users indicate they are student leaders, `verification_details_submitted` when verification information is provided, `verification_admin_review_started` when admins begin processing, `verification_approved` and `verification_rejected` for admin decisions, and `space_created_post_verification` for successful space creation. The analytics must track verification processing times, approval rates, common rejection reasons, and the correlation between verification success and subsequent platform engagement.

**User Engagement and Retention Metrics:**

Post-onboarding analytics must track user activation with `profile_first_view` when users access their profile, `profile_updated` for profile modifications, `space_joined` for space membership, `first_post_created` for content creation, and `daily_active_user` for ongoing engagement. The system must implement cohort analysis to track user retention by onboarding completion date, university domain, and user type (regular vs. student leader), enabling data-driven decisions about onboarding effectiveness and user experience improvements.

**Error and Performance Monitoring:**

Comprehensive error tracking includes `api_error_occurred` for all API failures with endpoint, error code, and user context, `client_error_occurred` for frontend errors with stack traces and user actions, `performance_slow_response` for API responses exceeding performance thresholds, and `user_flow_interrupted` for incomplete user journeys. The system must implement real-time alerting for critical errors affecting authentication or onboarding flows, with detailed error context to enable rapid debugging and resolution.

**Security and Abuse Detection Analytics:**

Security monitoring requires tracking `suspicious_login_attempt` for unusual authentication patterns, `rate_limit_exceeded` for users hitting API limits, `invalid_token_usage` for authentication token issues, `admin_action_performed` for all administrative operations, and `data_access_anomaly` for unusual data access patterns. The analytics must include behavioral analysis to detect potential automated attacks, account takeover attempts, and privilege escalation attempts, with automated alerting for high-risk security events.

**Business Intelligence and Growth Metrics:**

Strategic analytics include `university_domain_analysis` to track adoption across different institutions, `referral_source_tracking` to understand user acquisition channels, `feature_usage_analysis` to measure engagement with different platform features, and `conversion_funnel_optimization` to identify improvement opportunities. The system must support A/B testing for onboarding flow variations, feature flag analytics for gradual rollouts, and cohort analysis for understanding long-term user value and retention patterns.

**Privacy-Compliant Data Collection:**

All analytics must comply with privacy regulations by implementing proper consent management for non-essential tracking, data anonymization for sensitive user information, and user opt-out mechanisms for analytics collection. The system must maintain clear data retention policies for analytics data, implement proper data access controls for analytics dashboards, and provide transparency to users about what data is collected and how it's used for platform improvement.

**Real-Time Monitoring and Alerting:**

The logging system must implement real-time monitoring with automated alerts for authentication service outages, onboarding completion rate drops below thresholds, security events requiring immediate attention, and performance degradation affecting user experience. The alerting system must include escalation procedures for different severity levels, integration with incident response tools, and comprehensive runbooks for common issues.

**Data Export and Analysis Infrastructure:**

The analytics system must support data export for advanced analysis including daily/weekly/monthly reporting dashboards, custom query capabilities for product team analysis, integration with business intelligence tools for strategic planning, and data warehouse integration for long-term trend analysis. The system must maintain data quality through validation checks, duplicate detection, and consistency monitoring across different data sources and analytics platforms.

### UI and UX Specification
*Establishes interface patterns, interaction design, accessibility requirements, and motion design for all authentication and onboarding touchpoints.*

**Design System Integration and Visual Consistency:**

All authentication and onboarding interfaces must adhere to the HIVE design system established in `@hive/ui` and `@hive/tokens`, utilizing the dark theme with gold accent colors, consistent typography using the Space Grotesk and Geist font families, and standardized spacing scale (4, 8, 16, 24, 32px) for layout consistency. The interfaces must implement the existing component patterns including the `Button` component with proper variant usage (primary for progression, secondary for alternatives, outline for optional actions), `Input` components with proper validation states and error messaging, and `Card` layouts for content organization. All components must maintain visual consistency with the existing HIVE brand including proper use of the golden accent color (#FFD700), consistent border radius (8px for cards, 6px for buttons), and appropriate shadow usage for depth hierarchy.

**Authentication Flow Interface Patterns:**

The email entry interface builds on the existing `AuthForm` component with a clean, centered layout featuring the HIVE logo, clear value proposition messaging, prominent email input field with .edu domain validation, and contextual error messaging for invalid emails. The magic link sent confirmation page utilizes the existing `MagicLinkSent` component with clear instructions, email confirmation display, resend functionality with countdown timer, and fallback options for users who don't receive the email. The verification success page provides immediate feedback with success animations, clear next steps, and automatic redirection to onboarding with appropriate loading states.

**Onboarding Step Interface Design:**

Each onboarding step follows a consistent layout pattern with progress indication showing current step and overall completion, clear step titles and descriptions, form fields with proper validation and error states, and navigation controls (previous/next buttons) with appropriate disabled states. Step 1 (Display Name & Avatar) expands the existing `DisplayNameAvatar` component with improved avatar upload flow, real-time handle availability checking with visual feedback, and clear validation messaging for name and handle requirements. Step 2 (Leader Question) enhances the existing `LeaderQuestion` component with clear explanation of leadership benefits, visual distinction between options, and contextual help for users unsure about their leadership status.

**Student Leader Verification Interface:**

The space verification interface (Step 3) builds on the existing `SpaceVerification` component with improved space creation flow, clear verification requirements explanation, email input fields with validation for institutional addresses, and progress indication for the verification process. The interface must clearly communicate the verification timeline, provide examples of appropriate verification contacts, and include fallback options for users who cannot provide verification emails. The space creation interface provides intuitive category selection, rich text editing for descriptions, image upload with preview, and clear guidelines for appropriate space content.

**Academic Information and Interests Interface:**

Step 4 (Academic Card) enhances the existing `AcademicCard` component with improved major selection using searchable dropdowns, academic level selection with clear definitions, graduation year input with validation, and visual feedback for completed sections. Step 5 (Interests) improves the existing `Interests` component with categorized interest selection, search functionality for finding specific interests, visual feedback for selected items, and the ability to add custom interests with moderation approval. Both interfaces must provide clear progress indication and validation feedback.

**Accessibility and Inclusive Design Requirements:**

All interfaces must meet WCAG 2.1 AA standards including proper semantic HTML structure with heading hierarchy, comprehensive ARIA labels and descriptions for all interactive elements, keyboard navigation support with visible focus indicators, and screen reader compatibility with descriptive text for all visual elements. The interfaces must support high contrast mode, respect user preferences for reduced motion, provide alternative text for all images and icons, and include proper error announcement for screen readers. Form validation must be accessible with clear error messaging, proper form labeling, and logical tab order for keyboard navigation.

**Responsive Design and Mobile Optimization:**

The authentication and onboarding flows must be fully responsive with mobile-first design principles, touch-friendly interface elements with appropriate sizing (minimum 44px touch targets), optimized layouts for portrait and landscape orientations, and performance optimization for slower mobile connections. The interfaces must handle various screen sizes gracefully, maintain readability and usability on small screens, and provide appropriate input methods for mobile devices (numeric keyboards for years, email keyboards for email inputs). Loading states and progress indication must be particularly clear on mobile devices where network conditions may be variable.

**Motion Design and Micro-Interactions:**

The interfaces must implement subtle, purposeful animations using Framer Motion including smooth transitions between onboarding steps, loading state animations for form submissions, success/error state animations for user feedback, and progress indication animations. Motion design must respect accessibility preferences with reduced motion support, provide clear visual feedback for user actions, and enhance the overall user experience without causing distraction or performance issues. Animations must be optimized for performance and include appropriate fallbacks for older devices.

**Error States and Edge Case Interfaces:**

Comprehensive error handling interfaces include network error states with retry options, form validation errors with clear correction guidance, authentication failure states with appropriate next steps, and server error states with helpful messaging. The interfaces must handle edge cases such as expired sessions, incomplete onboarding data, verification delays, and space creation conflicts with clear user guidance and recovery options. All error states must maintain brand consistency while providing actionable solutions for users.

**Development Mode and Testing Interfaces:**

Development interfaces include the existing `DevModePanel` component with enhanced debugging capabilities, visual indicators for development mode active, easy switching between mock and real authentication, and testing tools for various user scenarios. The development interfaces must not appear in production builds and must provide comprehensive testing capabilities for all user flows and edge cases.

**Integration with Existing HIVE Components:**

The authentication and onboarding interfaces must integrate seamlessly with existing HIVE components including the `RouteGuard` for access control, navigation components for consistent header/footer, the `WelcomeMatProvider` for new user guidance, and existing layout components for consistent page structure. The interfaces must maintain consistency with the broader HIVE platform design language while providing specialized functionality for authentication and onboarding flows.

### Testing Plan
*Outlines validation strategies across unit tests, integration tests, end-to-end scenarios, security testing, and accessibility compliance verification.*

[TO BE FILLED DURING BUILD SESSION]

### Build-Task Narrative
*Sequences implementation work, defines completion criteria, and establishes the order of development tasks from infrastructure to user-facing features.*

[TO BE FILLED DURING BUILD SESSION]

### Final Ship Checklist
*Enumerates pre-launch verification steps, rollback procedures, monitoring setup, and post-launch validation requirements.*

[TO BE FILLED DURING BUILD SESSION] 