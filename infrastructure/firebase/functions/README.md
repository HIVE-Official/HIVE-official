# HIVE Cloud Functions

This directory contains the Firebase Cloud Functions for the HIVE platform, which provide backend services, data processing, notifications, recommendations, and analytics.

## Function Categories

### Notifications

- **onNewMessage**: Sends a notification when a user receives a new message
- **onNewEvent**: Notifies space/club members when a new event is created

### Event Sync

- **syncEventsFromRSS**: Syncs events from external RSS feeds to the platform (scheduled weekly)

### User Engagement

- **trackUserActivity**: Logs and analyzes user activities in the app
- **initializeUserEngagementMetrics**: Creates initial engagement metrics for new users
- **updateUserStreaks**: Updates user login streaks and resets inactive streaks (scheduled daily)

### Recommendations

- **generateRecommendations**: Generates personalized recommendations for users (scheduled daily)
- **trackRecommendationClick**: Logs when users interact with recommendations

### Analytics

- **calculatePlatformMetrics**: Computes daily platform-wide metrics (scheduled daily)
- **trackContentView**: Records content views and updates view counts
- **calculateTrendingContent**: Determines trending content across the platform (scheduled every 3 hours)
- **calculateRetentionMetrics**: Analyzes user retention across different cohorts (scheduled weekly)

## Data Model

The functions interact with the following Firestore collections:

- **user_profiles**: User information and stats
- **events**: Event data
- **spaces**: Community spaces
- **clubs**: University clubs
- **messages**: User-to-user messages
- **user_activities**: Log of user actions
- **user_engagement_metrics**: User-specific engagement data
- **user_recommendations**: Personalized recommendations
- **platform_metrics**: System-wide performance metrics
- **content_metrics**: Content-specific engagement data
- **trending**: Currently trending content
- **analytics**: Various analytics reports

## Deployment

To deploy functions to Firebase:

```bash
npm run deploy
```

To deploy a specific function:

```bash
npm run deploy -- --only functions:functionName
```

## Local Development

Run the Firebase emulator for local testing:

```bash
npm run serve
```

## Scheduled Functions

| Function | Schedule | Description |
|----------|----------|-------------|
| syncEventsFromRSS | Weekly (Mon, 2am) | Syncs events from external sources |
| generateRecommendations | Daily (3am) | Creates personalized recommendations |
| updateUserStreaks | Daily (midnight) | Updates user activity streaks |
| calculatePlatformMetrics | Daily (1am) | Computes platform stats |
| calculateTrendingContent | Every 3 hours | Determines what's trending |
| calculateRetentionMetrics | Weekly (Sun, 2am) | Analyzes user retention |

## Security Rules

All functions follow these security principles:

1. User authentication required for user-specific operations
2. Data validation before processing
3. Rate limiting for public endpoints
4. Error handling with appropriate HTTP responses
5. Detailed logging for monitoring and debugging

## Monitoring

Function logs are available in the Firebase console and can be queried using:

```bash
npm run logs
``` 