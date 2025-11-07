# 🔒 HIVE Security Checklist - CRITICAL FOR LAUNCH

## ⚠️ IMMEDIATE ACTIONS REQUIRED (Block Launch Until Complete)

### 1. ✅ Secrets Management
- [x] Remove ALL secrets from .env.production file
- [x] Add .env.production to .gitignore
- [ ] **CRITICAL: Generate NEW Firebase service account** (current one is compromised)
- [ ] **CRITICAL: Generate NEW NextAuth secret** with: `openssl rand -base64 32`
- [ ] Add secrets to Vercel environment variables (NOT in files)
- [ ] Rotate any other exposed API keys

### 2. ✅ Authentication Security
- [x] Re-enable authentication middleware (was completely disabled!)
- [x] Remove ALL development authentication bypasses
- [x] Block dev-auth-helper in production
- [x] Enforce .edu email validation (was only logging)
- [x] Add UB-specific domain validation (@buffalo.edu only)
- [x] Eliminate localStorage-based auth fallbacks in production
- [x] Centralize client networking via secure fetch with cookies + CSRF
- [ ] Test authentication flow end-to-end in production

### 3. ✅ Campus Isolation
- [x] Create campus isolation utilities
- [ ] Add `where('campusId', '==', 'ub-buffalo')` to ALL Firestore queries
- [ ] Update Firebase security rules to enforce campus isolation
- [ ] Audit all API routes for campus validation
- [ ] Test cross-campus data access is blocked

### 4. ⏳ Session Security
- [ ] Migrate from localStorage to secure HTTP-only cookies
- [ ] Implement CSRF protection
- [ ] Add session rotation on sensitive operations
- [ ] Implement device fingerprinting
- [ ] Add suspicious activity detection

### 5. ⏳ API Security
- [ ] Add rate limiting to all API routes
- [ ] Implement proper error handling (don't expose stack traces)
- [ ] Add request validation with Zod schemas
- [ ] Implement API key rotation strategy
- [ ] Add security headers to all responses

## 🚀 Pre-Launch Security Audit

### Authentication Flow
- [ ] User can only sign up with @buffalo.edu email
- [ ] Magic links expire after 1 hour
- [ ] Sessions expire after 24 hours
- [ ] Logout properly clears all session data
- [ ] Password reset flow is secure

### Data Access
- [ ] Users can only see UB campus data
- [ ] Private profiles are actually private
- [ ] Deleted content is not accessible
- [ ] File uploads are validated and scanned

### Infrastructure
- [ ] HTTPS enforced on all routes
- [ ] Security headers configured
- [ ] Content Security Policy implemented
- [ ] CORS properly configured
- [ ] Dependency vulnerabilities scanned

## 🔐 Environment Variables Setup

### Required for Production (Add to Vercel)
```bash
# Firebase Admin (NEVER commit these!)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

# Authentication
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://www.hive.college

# Environment
NODE_ENV=production
NEXT_PUBLIC_ENVIRONMENT=production
```

### Safe to Include in Code (Public)
```bash
# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```

## 🚨 Security Testing Commands

```bash
# Check for exposed secrets
git secrets --scan

# Audit npm dependencies
npm audit

# Check for TypeScript errors
pnpm typecheck

# Test authentication flow
curl -X POST https://your-domain/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","schoolId":"ub"}'
# Should return: 403 Forbidden

# Test campus isolation
# Try to access data with wrong campus ID
# Should be blocked
```

## 📊 Security Monitoring

### Set Up Alerts For:
- [ ] Failed authentication attempts > 10 per minute
- [ ] Cross-campus access attempts
- [ ] Unusual data access patterns
- [ ] Server errors > 1% of requests
- [ ] Response times > 3 seconds

### Log and Track:
- All authentication events
- API access patterns
- Error rates by endpoint
- User session analytics
- Security rule violations

## ✅ Launch Day Security Protocol

1. **Before Launch:**
   - Run full security audit
   - Test all authentication flows
   - Verify campus isolation
   - Check all environment variables
   - Enable monitoring and alerts

2. **During Launch:**
   - Monitor authentication logs
   - Watch for security violations
   - Track error rates
   - Be ready to enable strict mode

3. **Post-Launch:**
   - Review security logs daily
   - Rotate secrets monthly
   - Update dependencies weekly
   - Conduct security audits quarterly

## 🔴 Emergency Response Plan

If a security breach is detected:

1. **Immediate Actions:**
   - Enable maintenance mode
   - Rotate all secrets
   - Review access logs
   - Identify scope of breach

2. **Communication:**
   - Notify users if data was accessed
   - Contact legal team
   - Prepare transparency report

3. **Recovery:**
   - Patch vulnerability
   - Enhance monitoring
   - Document lessons learned
   - Update security procedures

---

**Remember:** Security is not optional. Every shortcut taken now becomes a vulnerability hackers will exploit. The reputation damage from a breach on launch day would be catastrophic.

**Last Updated:** September 24, 2025
**Next Review:** Before October 1st Launch
