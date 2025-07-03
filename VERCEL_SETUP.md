# HIVE Vercel Deployment Configuration

## 🚀 Deployment Status: Production Ready

The HIVE monorepo is fully configured for optimal deployment on Vercel with the following improvements:

### ✅ Infrastructure Optimizations Implemented

1. **Monorepo-Aware Build**: Uses Turborepo for efficient builds
2. **Smart Caching**: Only rebuilds when relevant files change
3. **Security Headers**: Full security hardening implemented
4. **Performance Optimizations**: Static asset caching and optimization
5. **API Function Optimization**: Tailored memory and timeout settings

## 🛠️ Vercel Project Configuration

### Required Vercel Environment Variables

#### Firebase Configuration (Required)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

#### Firebase Admin (Server-side)
```
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key
```

#### Optional Configuration
```
NODE_ENV=production
VERCEL_ENV=production
```

### Project Settings in Vercel Dashboard

1. **Root Directory**: Leave empty (monorepo root)
2. **Build Command**: Automatically detected from `vercel.json`
3. **Output Directory**: `apps/web/.next` (automatically configured)
4. **Install Command**: Automatically handled by `vercel.json`

## 📁 Project Structure Optimization

### Build Configuration
- **Framework**: Next.js 15.3.4 with App Router
- **Build Tool**: Turborepo for monorepo orchestration
- **Package Manager**: pnpm 9.1.1 (globally installed in build)
- **TypeScript**: 5.8.3 with strict mode

### Deployment Flow
```
1. Install pnpm globally
2. Install all workspace dependencies
3. Build workspace packages in dependency order
4. Build Next.js application
5. Deploy optimized bundle
```

## ⚡ Performance Features

### Caching Strategy
- **Static Assets**: 1-year cache with immutable flag
- **API Routes**: No caching for fresh data
- **Build Cache**: Turborepo remote caching ready

### Function Optimization
- **Auth APIs**: 15s timeout, 1GB memory
- **Standard APIs**: 10s timeout, 1GB memory
- **Heavy Operations**: 30s timeout, 1GB memory

## 🔒 Security Configuration

### Implemented Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security` with preload
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restricting camera/microphone/geolocation

### HTTPS & Domain Security
- HSTS preload ready
- Frame denial for clickjacking protection
- Content type sniffing prevention

## 🚨 Critical Deployment Checklist

### Pre-deployment Requirements
- [ ] All environment variables configured in Vercel
- [ ] Firebase project properly configured
- [ ] Domain DNS configured (if using custom domain)
- [ ] Security rules deployed to Firebase
- [ ] Database indexes created

### Post-deployment Verification
- [ ] Health check endpoint responds: `/api/health`
- [ ] Authentication flow works end-to-end
- [ ] Firebase connection verified
- [ ] All static assets loading correctly
- [ ] Security headers present in response

## 🔄 Deployment Commands

### Manual Deployment (from local)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Local Testing Before Deploy
```bash
# Build and verify locally
cd apps/web
npm run build
npm run start

# Test production build
curl http://localhost:3000/api/health
```

## 📊 Monitoring & Analytics

### Built-in Monitoring
- Vercel Analytics enabled
- Core Web Vitals tracking
- Function execution monitoring
- Error tracking and alerts

### Custom Health Checks
- `/api/health` - Basic health check
- Firebase connectivity verification
- Environment validation

## 🚀 Advanced Configuration

### Branch Deployments
- **Production**: `main` branch
- **Staging**: `staging` branch  
- **Preview**: All other branches

### Environment-Specific Settings
```javascript
// Production optimizations
if (process.env.VERCEL_ENV === 'production') {
  // Production-only configurations
}
```

### Turborepo Remote Caching (Optional)
To enable Vercel's remote caching:
1. Add `TURBO_TOKEN` and `TURBO_TEAM` to environment variables
2. Run builds with `--remote-only` flag

## 🛡️ Security Best Practices

### Environment Variables
- Never commit secrets to git
- Use Vercel's encrypted environment variables
- Rotate Firebase service account keys regularly

### Content Security
- All external resources loaded over HTTPS
- Firebase security rules properly configured
- API rate limiting implemented

### Compliance
- Privacy policy accessible at `/legal/privacy`
- Terms of service at `/legal/terms`
- Community guidelines at `/legal/community-guidelines`

## 📞 Support & Troubleshooting

### Common Issues
1. **Build failures**: Check Turborepo cache and dependencies
2. **Environment variables**: Verify all required vars are set
3. **Firebase connection**: Check project ID and credentials
4. **Static assets**: Verify path aliases in Next.js config

### Debug Commands
```bash
# Check build locally
pnpm turbo build --filter=web

# Verify environment
curl https://your-domain.vercel.app/api/debug-env

# Test API health
curl https://your-domain.vercel.app/api/health
```

---

**✅ Status**: Ready for production deployment
**📅 Last Updated**: December 2024
**🔧 Configuration Version**: 2.0 (Optimized for monorepo) 