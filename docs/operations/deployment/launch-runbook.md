# HIVE Launch Day Runbook

**Target Date**: October 1, 2025
**Timeline**: 12-hour launch window
**Team Size**: 3-5 people on standby
**Beta Users**: 50 students
**Public Launch**: Full UB (@buffalo.edu)

---

## 🌅 Pre-Launch (Day Before - 8pm)

### Team Preparation
- [ ] **All team members on call** for launch day
- [ ] **Emergency contacts list** distributed
- [ ] **Communication channels** established (Slack/Discord)
- [ ] **Roles assigned**:
  - Technical Lead (deployment, hotfixes)
  - QA Lead (testing, bug triage)
  - Support Lead (user questions)
  - Product Lead (metrics, decisions)

### Final Verification
```bash
# Run full test suite
pnpm test

# Verify build
NODE_OPTIONS="--max-old-space-size=4096" pnpm build

# Check production deployment
curl https://hive.college/api/health
```

- [ ] Production deployment verified
- [ ] All environment variables set
- [ ] Monitoring dashboards accessible
- [ ] Emergency rollback plan ready

### Content Preparation
- [ ] Welcome email template finalized
- [ ] Launch announcement drafted
- [ ] Social media posts ready
- [ ] FAQ page published
- [ ] Support email monitored

---

## 🔒 T-minus 12 hours (8am Launch Day)

### System Health Check (30 minutes)

```bash
# Check all critical services
curl https://hive.college/api/health
curl https://hive.college/api/auth/csrf
curl https://hive.college/api/spaces/recommended

# Verify Firebase
firebase projects:list
firebase firestore:indexes

# Check Vercel status
vercel ls
vercel logs --since 24h
```

**Dashboard Checklist:**
- [ ] Firebase Console: All services green
- [ ] Vercel Dashboard: No errors in last 24h
- [ ] Upstash Redis: Connection healthy
- [ ] SendGrid: Email sending enabled

### Final Smoke Tests (30 minutes)

**Desktop (Chrome, Firefox, Safari)**
- [ ] Homepage loads (< 3s)
- [ ] Login with test account works
- [ ] Feed displays posts
- [ ] Can join a space
- [ ] Can create a post
- [ ] Profile page loads

**Mobile (iOS Safari, Android Chrome)**
- [ ] All buttons tappable (44px minimum)
- [ ] Navigation works
- [ ] Forms submittable
- [ ] Images display correctly
- [ ] No horizontal scroll

### Prepare Beta User List
- [ ] 50 @buffalo.edu email addresses ready
- [ ] Beta invitation email personalized
- [ ] Tracking spreadsheet prepared

---

## 🚀 Phase 1: Beta Launch (10am - 2pm)

### 10:00am - Send Beta Invitations

```bash
# Use admin script to invite beta users
node scripts/send-beta-invitations.js

# Or manually through SendGrid dashboard
```

**Beta Invitation Email:**
```
Subject: You're invited to HIVE Beta! 🐝

Hey [Name]!

You've been selected as one of 50 beta testers for HIVE - the new campus connection platform for UB students.

🔗 Get started: https://hive.college

What is HIVE?
- Discover campus spaces and communities
- Connect with students in your dorm, classes, and orgs
- Stay updated with campus events and activities

As a beta tester, your feedback is crucial! Report any issues or suggestions to beta@hive.college.

Let's build something remarkable together!

- The HIVE Team

🐝 hive.college
```

### 10:15am - Monitor Initial Signups

**Watch these metrics closely (every 15 minutes):**

| Metric | Target | Alert If |
|--------|--------|----------|
| Signups | 5-10/hour | < 2 in first hour |
| Onboarding completion | > 70% | < 50% |
| Error rate | < 1% | > 5% |
| API latency (p95) | < 500ms | > 1000ms |
| Page load time | < 3s | > 5s |

```bash
# Monitor Vercel logs in real-time
vercel logs --follow

# Filter for errors
vercel logs --follow | grep -i error

# Check Firebase auth
# Go to: console.firebase.google.com/project/hive-prod-ub/authentication/users
```

### 10:30am - First Beta User Feedback

**Set up feedback collection:**
- [ ] Monitor beta@hive.college inbox
- [ ] Watch #beta-feedback Slack channel
- [ ] Check in-app feedback submissions

**Common first-hour issues:**
- Magic link emails not arriving → Check SendGrid logs
- Can't verify email → Check authorized domains in Firebase
- Page loads slowly → Check bundle size, API latency
- Mobile UI broken → Test responsive breakpoints

### 11:00am - Triage Any Issues

**Priority Levels:**

**P0 - Critical (fix immediately):**
- Site completely down
- No one can sign up
- Data loss or corruption
- Security vulnerability

**P1 - High (fix within 1 hour):**
- Major feature broken (feed, spaces, posts)
- Affects > 50% of beta users
- Workaround not obvious

**P2 - Medium (fix today):**
- Minor feature broken
- Affects < 25% of users
- Workaround exists

**P3 - Low (fix next sprint):**
- UI polish issues
- Edge cases
- Nice-to-have features

### 12:00pm - Beta Hour 2 Check-in

**Target Metrics:**
- [ ] 10-20 beta users signed up
- [ ] 5-15 active on platform
- [ ] 3-10 posts created
- [ ] 0 critical (P0) bugs
- [ ] < 2 high (P1) bugs

**If targets met:**
- ✅ Continue to Phase 2 (Public Launch)

**If targets NOT met:**
- 🔍 Investigate root cause
- 🛠️ Fix critical issues
- ⏸️ Consider delaying public launch

### 1:00pm - Go/No-Go Decision

**GREEN (proceed to public launch):**
- ✅ > 10 beta users active
- ✅ Onboarding completion > 70%
- ✅ Error rate < 2%
- ✅ No P0 bugs
- ✅ Beta user feedback positive

**YELLOW (delay 4 hours, reassess at 5pm):**
- ⚠️ 5-10 beta users active
- ⚠️ Onboarding completion 50-70%
- ⚠️ Error rate 2-5%
- ⚠️ 1-2 P1 bugs (fixable)

**RED (delay to tomorrow):**
- 🚨 < 5 beta users active
- 🚨 Onboarding completion < 50%
- 🚨 Error rate > 5%
- 🚨 Any P0 bugs
- 🚨 Major system instability

---

## 🌍 Phase 2: Public Launch (2pm - 8pm)

### 2:00pm - Public Announcement

**If GREEN from Phase 1:**

1. **Send campus-wide email:**
```
Subject: HIVE is now live at UB! 🎉

Buffalo,

HIVE is officially live! Join your classmates in discovering campus life like never before.

🔗 Sign up now: https://hive.college

What you can do on HIVE:
✨ Discover spaces for your interests, classes, and orgs
👥 Connect with students in your dorm and major
📅 Stay updated with campus events
🛠️ Build and share tools with the campus

This is YOUR platform. Let's make UB better together.

See you on HIVE!

- The HIVE Team

🐝 hive.college
```

2. **Post on social media:**
- Instagram: Campus life photo + launch announcement
- Facebook: UB Class of 2026 group
- Twitter: @HIVEatUB launch thread
- Reddit: r/UBuffalo

3. **Notify UB administration:**
- Email campus IT
- Email Student Life office
- Email relevant department heads

### 2:15pm - Monitor Traffic Surge

**Expect 10x traffic increase:**

```bash
# Watch Vercel real-time analytics
vercel logs --follow

# Monitor Firebase quota
# console.firebase.google.com/project/hive-prod-ub/usage

# Watch for rate limiting
# Check Upstash Redis dashboard
```

**Scale indicators:**
- Requests per second: 10-50 (normal) → 100-500 (surge)
- Database reads: 100/min → 1000/min
- API latency: 200ms → may spike to 800ms

### 2:30pm - First Wave Response

**Target Metrics (first 30 minutes):**
- [ ] 50-100 new signups
- [ ] Site remains responsive
- [ ] Error rate < 2%
- [ ] No service degradation

**If experiencing issues:**

```bash
# Enable Vercel Pro scaling (if not already)
vercel scale --min 3 --max 10

# Clear Redis cache if needed
# Check Upstash dashboard

# Reduce API timeouts temporarily
# Edit vercel.json functions.maxDuration
```

### 3:00pm - Public Hour 1 Check-in

**Success Indicators:**
- [ ] 100-200 total signups
- [ ] 50-100 active users
- [ ] 20-50 posts created
- [ ] < 5 support emails
- [ ] System stable

### 4:00pm - Public Hour 2 Check-in

**Growth Tracking:**
- [ ] 200-300 total signups
- [ ] 100-150 active users
- [ ] Spaces being joined (avg 3/user)
- [ ] Feed engagement happening

### 5:00pm - Reassess and Stabilize

**Review all metrics:**
- Signup rate trends
- Server resource usage
- Error patterns
- User feedback themes

**Address issues:**
- Deploy hotfixes if needed
- Adjust rate limits
- Optimize slow queries
- Update FAQ with common questions

### 6:00pm - Evening Rush

**Student evening activity peak (6pm-10pm):**
- Most active usage time
- Monitor closely
- Be ready for support requests
- Team remains on standby

### 8:00pm - End of Day Review

**Day 1 Targets:**
- [ ] 500+ signups ✨
- [ ] 200+ daily active users
- [ ] 100+ posts created
- [ ] > 3 spaces joined per user
- [ ] > 99.5% uptime
- [ ] < 1% error rate
- [ ] System stable

**Team Debrief:**
- What went well?
- What issues occurred?
- What needs immediate attention?
- Plan for tomorrow

---

## 🌙 Post-Launch (8pm onwards)

### Evening Monitoring (8pm-11pm)

- [ ] Check metrics every hour
- [ ] Monitor support inbox
- [ ] Watch for error spikes
- [ ] One team member on call

### Overnight (11pm-8am)

- [ ] Automated monitoring alerts enabled
- [ ] On-call rotation established
- [ ] Emergency contact list active

### Day 2 Morning (8am)

```bash
# Morning health check
curl https://hive.college/api/health

# Review overnight metrics
vercel logs --since 12h | grep -i error

# Check Firebase usage
firebase projects:list
```

**Day 2 Priorities:**
1. Fix any P1/P2 bugs from Day 1
2. Respond to all support emails (< 2 hour SLA)
3. Analyze user behavior data
4. Plan improvements based on feedback
5. Thank beta users

---

## 🚨 Emergency Procedures

### Site Down (P0)

```bash
# 1. Check Vercel status
vercel inspect

# 2. Check recent deployments
vercel ls

# 3. Rollback if recent deploy caused it
vercel rollback

# 4. Check Firebase services
# Go to console.firebase.google.com

# 5. If Firebase issue, check status
# https://status.firebase.google.com/

# 6. Check DNS (if domain not resolving)
dig hive.college
```

**Communication:**
- Post status update immediately
- Email beta users if > 15 min downtime
- Update status page (if available)

### Database Issues

```bash
# Check Firestore status
firebase firestore:indexes

# Check for quota exceeded
# console.firebase.google.com/project/hive-prod-ub/usage

# Verify security rules
firebase firestore:rules get
```

### Authentication Broken

```bash
# Check Firebase Auth
# console.firebase.google.com/project/hive-prod-ub/authentication

# Verify SendGrid
# https://app.sendgrid.com/

# Check environment variables
vercel env ls
```

### Performance Degradation

```bash
# Check API latency
vercel logs --follow | grep "ms"

# Identify slow endpoints
# Look for patterns in logs

# Check database query performance
# Firebase Console → Firestore → Usage

# Consider scaling
vercel scale --max 15
```

---

## 📊 Success Metrics Dashboard

Monitor these in real-time:

### User Acquisition
- **Signups per hour**: Target 20-50
- **Email verification rate**: > 90%
- **Onboarding completion**: > 70%

### Engagement
- **Daily active users**: > 200
- **Spaces joined per user**: > 3
- **Posts per day**: > 100
- **Comments per post**: > 2
- **Session duration**: > 5 minutes

### Technical
- **Uptime**: > 99.5%
- **Error rate**: < 1%
- **Page load time (p95)**: < 3s
- **API latency (p95)**: < 500ms

### Business
- **User retention (D1)**: > 50%
- **Viral coefficient**: Track invites sent
- **Support requests**: < 10/day
- **User satisfaction**: > 4/5 stars

---

## ✅ Launch Day Complete

**When Day 1 ends successfully:**

- [ ] All target metrics met
- [ ] No critical bugs
- [ ] System stable
- [ ] Team debriefed
- [ ] Users happy!

**Celebrate! 🎉**

Then prepare for Day 2, Week 1, and beyond.

**Remember:** Launch is just the beginning. The real work is iteration based on user feedback.