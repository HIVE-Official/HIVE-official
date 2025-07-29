# 🔒 HIVE Security Testing Guide

## Development Testing Setup

### 🚀 Quick Start: Development Authentication

**Easy Way: Use the Development Login Page**
1. Visit: `http://localhost:3003/dev-login`
2. Click any user button to login instantly
3. All security systems are active and tested!

**Available Development Users:**
- `student@test.edu` - Student role
- `faculty@test.edu` - Faculty role  
- `admin@test.edu` - Admin role

**Command Line Testing:**
```bash
# Login as student
curl -X POST http://localhost:3003/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.edu","schoolId":"test-university"}'

# Login as faculty  
curl -X POST http://localhost:3003/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"faculty@test.edu","schoolId":"test-university"}'
```

### 1. 🧪 Security Middleware Testing

Test all security layers are working correctly:

```bash
# Test Rate Limiting
curl -X POST http://localhost:3003/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@university.edu","schoolId":"test"}'

# Repeat rapidly to test rate limiting
for i in {1..10}; do
  curl -X POST http://localhost:3003/api/auth/send-magic-link \
    -H "Content-Type: application/json" \
    -d '{"email":"test@university.edu","schoolId":"test"}'
done
```

### 2. 🛡️ Input Validation Testing

Test malicious input detection:

```bash
# SQL Injection Test
curl -X POST http://localhost:3003/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@university.edu; DROP TABLE users;","schoolId":"test"}'

# XSS Test
curl -X POST http://localhost:3003/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"<script>alert(1)</script>@university.edu","schoolId":"test"}'

# NoSQL Injection Test
curl -X POST http://localhost:3003/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@university.edu","schoolId":{"$ne":null}}'
```

### 3. 🔐 Development Bypass Testing

Verify no development bypasses work:

```bash
# Test blocked development tokens
curl -X POST http://localhost:3003/api/auth/verify-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@university.edu","schoolId":"test","token":"DEV_MODE"}'

curl -X POST http://localhost:3003/api/auth/verify-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@university.edu","schoolId":"test","token":"test-token"}'
```

### 4. 📊 Audit Logging Verification

Check the logs show proper security events:
- Look for structured logging with timestamps
- Verify IP address and user agent tracking
- Confirm no sensitive data in logs

## Expected Results

### ✅ Successful Security Tests

**Rate Limiting:**
```json
{"error":"Rate limit exceeded","retryAfter":60}
```

**Input Validation:**
```json
{"error":"Request validation failed"}
```

**Development Bypass Protection:**
```json
{"error":"Invalid or expired magic link"}
```

**Firebase Configuration (Expected in Dev):**
```json
{"error":"Unable to generate magic link"}
```

### 📝 Security Event Logs

You should see logs like:
```
[2025-07-20T05:25:03.904Z] WARN  SECURITY     Security event: auth_failure
[2025-07-20T05:25:03.904Z] WARN  SECURITY     Security event: rate_limit_exceeded
[2025-07-20T05:25:03.904Z] WARN  SECURITY     Security event: dangerous_input_blocked
```

## Development Firebase Setup (Optional)

If you want to test the full auth flow:

### 1. Configure Firebase Dynamic Links

1. Go to Firebase Console → Dynamic Links
2. Add a domain (or use Firebase's free domain)
3. Update your environment variables:

```bash
# .env.local
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project-id.iam.gserviceaccount.com
```

### 2. Create Test School

Add a test school to Firestore:
```javascript
// In Firebase Console → Firestore
{
  collection: "schools",
  document: "test-school",
  data: {
    name: "Test University",
    domain: "test.edu",
    active: true
  }
}
```

### 3. Test Full Flow

```bash
# This should now generate a real magic link
curl -X POST http://localhost:3003/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.edu","schoolId":"test-school"}'
```

## Security Monitoring Dashboard

You can monitor security events in real-time by watching the logs:

```bash
# Follow development logs
npm run dev | grep SECURITY

# Or filter for specific events
npm run dev | grep "rate_limit\|auth_failure\|dangerous_input"
```

## Testing Checklist

- [ ] Rate limiting blocks excessive requests
- [ ] Input validation catches malicious patterns  
- [ ] Development bypasses are completely blocked
- [ ] Error messages are sanitized (no stack traces)
- [ ] Audit logging captures all security events
- [ ] IP addresses and user agents are tracked
- [ ] No sensitive data appears in logs
- [ ] Firebase errors are handled gracefully

## Production Testing

Before deploying to production:

1. **Environment Variables**: Ensure all production secrets are configured
2. **Firebase Setup**: Dynamic Links domain must be configured
3. **Rate Limiting**: Test with real Redis if using Redis backend
4. **Security Headers**: Verify HTTPS and security headers in production
5. **Monitoring**: Set up alerts for security events

## Security Test Results

All tests should show:
- ✅ Proper error handling
- ✅ No information disclosure
- ✅ Complete audit trails
- ✅ Defense-in-depth protection working

The security architecture is **enterprise-ready** even if Firebase Dynamic Links aren't configured!