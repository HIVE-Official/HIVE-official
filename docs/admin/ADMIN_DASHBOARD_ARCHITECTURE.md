# HIVE Admin Dashboard Architecture

## Overview
The HIVE Admin Dashboard is a comprehensive platform management system designed for real-time oversight, content moderation, and analytics. Built with a focus on campus safety and community health, it provides administrators with the tools needed to maintain a thriving social utility platform.

## Core Components

### 1. Real-Time Moderation System
**Location**: `/components/admin/real-time-moderation.tsx`

**Features**:
- **Live Content Queue**: Real-time feed of reported content requiring review
- **Auto-Moderation Rules**: AI-powered content filtering with configurable rules
- **Priority System**: Critical, high, medium, and low priority categorization
- **Quick Actions**: One-click dismiss, remove content, or suspend user
- **False Positive Tracking**: Monitors accuracy of automated systems

**Key Metrics Tracked**:
- Pending reports count
- Average response time (target: <15 minutes)
- False positive rate (target: <10%)
- Report trends by category

### 2. Content Analytics Engine
**Location**: `/components/admin/content-analytics.tsx`

**Analytics Provided**:
- **Engagement Metrics**: Likes, comments, shares, overall engagement rate
- **User Behavior**: Active contributors vs lurkers, super users identification
- **Trending Analysis**: Real-time trending posts, topics, and spaces
- **Quality Scoring**: Content quality assessment and deletion rates
- **Activity Patterns**: Peak usage hours and days for optimal moderation staffing

**Space Health Monitoring**:
- Growth trajectories for each space
- Member engagement levels
- Content velocity metrics
- Health status indicators (healthy, growing, stable, declining, inactive)

### 3. Platform Health Dashboard
**Location**: `/app/admin/page.tsx`

**Overview Metrics**:
- **User Statistics**: Total users, active vs inactive, distribution by major/year
- **Space Metrics**: Active spaces, activation rates, member counts
- **Builder Requests**: Pending approvals, urgent items, approval rates
- **System Health**: Uptime, memory usage, database collection sizes

**Quick Actions**:
- Review builder requests
- Moderate reported content
- View live activity feed
- Generate reports
- Access platform settings

### 4. Feature Flag Management
**Capabilities**:
- Toggle features on/off in real-time
- Percentage-based rollouts
- A/B testing framework
- User/school-specific targeting
- Version control and rollback

## API Architecture

### Moderation Endpoints
```
GET  /api/admin/moderation/reports     # Fetch reported content
GET  /api/admin/moderation/stats       # Real-time moderation statistics
GET  /api/admin/moderation/rules       # Auto-moderation rule configuration
POST /api/admin/moderation/reports/:id/action  # Take action on report
```

### Analytics Endpoints
```
GET  /api/admin/analytics/content      # Content performance metrics
GET  /api/admin/analytics/spaces       # Space health and growth data
GET  /api/admin/analytics/users        # User behavior analytics
GET  /api/admin/analytics/trends       # Trending content and topics
```

### System Endpoints
```
GET  /api/admin/dashboard              # Main dashboard data
GET  /api/admin/feature-flags          # Feature flag configuration
PATCH /api/admin/feature-flags/:id     # Update feature flag
GET  /api/admin/system/health          # System health metrics
```

## Security & Permissions

### Admin Role Requirements
- Only users with `admin` role in Firebase Auth custom claims
- Additional verification through `requireAdmin()` middleware
- All actions logged with admin user ID and timestamp
- Sensitive operations require 2FA (planned)

### Data Protection
- All admin queries campus-isolated (`campusId: 'ub-buffalo'`)
- PII redaction in logs and exports
- Encrypted storage for sensitive moderation notes
- Rate limiting on all admin endpoints

## Monitoring & Alerts

### Real-Time Alerts
- Critical reports (harassment, safety concerns)
- Spam detection spikes
- System performance degradation
- Unusual user behavior patterns

### Performance Targets
- **Moderation Response**: < 15 minutes for high priority
- **Dashboard Load Time**: < 2 seconds
- **Analytics Generation**: < 5 seconds
- **Real-time Updates**: < 1 second latency

## User Experience Features

### Dashboard Customization
- Draggable widget layout (planned)
- Saved view preferences
- Custom alert thresholds
- Personalized quick actions

### Reporting Capabilities
- Export to CSV/PDF
- Scheduled reports via email
- Custom date ranges
- Trend comparison tools

## Mobile Admin Experience
- Responsive design for tablet/phone
- Critical alerts via push notifications
- Quick moderation actions
- Simplified metrics view

## Integration Points

### Firebase Integration
- Real-time Firestore listeners for live updates
- Cloud Functions for automated moderation
- Analytics integration for user behavior
- Auth integration for secure access

### External Services (Planned)
- SendGrid for admin email alerts
- Slack integration for team notifications
- Google Analytics for deeper insights
- AI moderation services (Perspective API)

## Scaling Considerations

### Performance Optimization
- Server-side data aggregation
- Caching for frequently accessed metrics
- Pagination for large data sets
- Background processing for heavy analytics

### Multi-Campus Support (Future)
- Campus-specific admin panels
- Cross-campus metrics comparison
- Centralized super-admin view
- Campus-isolated moderation queues

## Development Workflow

### Adding New Admin Features
1. Create component in `/components/admin/`
2. Add API route in `/app/api/admin/`
3. Implement `requireAdmin()` middleware
4. Add to admin dashboard tabs
5. Document in this file

### Testing Admin Features
- Use dev session with admin role
- Test with various data volumes
- Verify campus isolation
- Check mobile responsiveness
- Validate real-time updates

## Roadmap

### Phase 1 (Current)
✅ Basic dashboard with user/space metrics
✅ Real-time moderation queue
✅ Content analytics
✅ Feature flag management
✅ System health monitoring

### Phase 2 (Next Sprint)
- [ ] Advanced AI moderation
- [ ] Predictive analytics
- [ ] Automated report generation
- [ ] Team collaboration tools
- [ ] Audit logging

### Phase 3 (Post-Launch)
- [ ] Multi-campus support
- [ ] ML-based trend prediction
- [ ] Advanced user segmentation
- [ ] Custom moderation workflows
- [ ] API for external integrations

## Best Practices

### Moderation Guidelines
1. Review context before taking action
2. Document reasons for decisions
3. Escalate uncertain cases
4. Track false positives
5. Regular review of auto-mod rules

### Data Analysis
1. Focus on trends, not snapshots
2. Consider campus context
3. Compare across time periods
4. Identify early warning signs
5. Share insights with team

### Emergency Response
1. Have escalation procedures
2. Direct line to campus safety
3. Legal compliance protocols
4. Crisis communication plan
5. Post-incident reviews

---

## Quick Start for Admins

1. **Access Dashboard**: Navigate to `/admin` when logged in with admin privileges
2. **Check Alerts**: Review any urgent items in the alert bar
3. **Monitor Queue**: Check moderation queue for pending reports
4. **Review Analytics**: Examine trending content and space health
5. **Take Action**: Use quick actions for common tasks

For technical questions about the admin dashboard, contact the HIVE technical team.