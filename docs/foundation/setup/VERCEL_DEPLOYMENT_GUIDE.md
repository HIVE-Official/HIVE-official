# Vercel Deployment Guide for HIVE

## 🚀 Quick Start Deployment

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy to Vercel
```bash
# From the root directory
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: Create new team or use personal
# - Link to existing project: N (first time)
# - Project name: hive-platform
# - Directory: ./ (root)
# - Build settings will auto-detect from vercel.json
```

### Step 3: Set Environment Variables
After first deployment, set your env vars:
```bash
vercel env add FIREBASE_PROJECT_ID production
vercel env add FIREBASE_CLIENT_EMAIL production
vercel env add FIREBASE_PRIVATE_KEY production
# ... add all variables from .env.local
```

## 📋 Complete Environment Variables for Production

```bash
# Firebase Client SDK (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-9265c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-9265c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-9265c.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=573191826528
NEXT_PUBLIC_FIREBASE_APP_ID=1:573191826528:web:1d5eaeb8531276e4c1a705
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-NK3E12MSFD

# Firebase Admin SDK (Private - KEEP SECURE)
FIREBASE_PROJECT_ID=hive-9265c
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hive-9265c.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="<your-private-key-here>"

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production

# Authentication
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
MAGIC_LINK_TTL=900

# CRITICAL: Disable dev mode in production!
NEXT_PUBLIC_ENABLE_DEV_AUTO_LOGIN=false
NEXT_PUBLIC_DEV_BYPASS=false

# Optional: Analytics
NEXT_PUBLIC_GA_ID=<your-google-analytics-id>

# Optional: Sentry Error Tracking
SENTRY_DSN=<your-sentry-dsn>
SENTRY_AUTH_TOKEN=<your-sentry-auth-token>

# Optional: Redis (if using caching)
REDIS_URL=<your-redis-url>
```

## 🔗 GitHub Integration Setup

### 1. Connect GitHub Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Import Project"
3. Select "Import Git Repository"
4. Choose your `hive_ui` repository
5. Vercel will auto-detect the monorepo structure

### 2. Configure Build Settings
Vercel will use our `vercel.json`, but verify:
- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `pnpm turbo run build --filter=web`
- **Output Directory**: `apps/web/.next`
- **Install Command**: `npm install -g pnpm@9.1.1 && pnpm install --frozen-lockfile`

### 3. Set Up Automatic Deployments
- **Production Branch**: `main`
- **Preview Deployments**: All other branches
- **Instant Rollbacks**: Available in dashboard

## 🌍 Custom Domain Setup

### 1. Add Domain in Vercel
```bash
vercel domains add your-domain.com
```

Or via Dashboard:
1. Project Settings → Domains
2. Add `your-domain.com`
3. Add `www.your-domain.com`

### 2. DNS Configuration
Add these records to your domain provider:

#### For Apex Domain (your-domain.com)
```
Type: A
Name: @
Value: 76.76.21.21
```

#### For WWW Subdomain
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. SSL Certificate
- Automatically provisioned by Vercel
- Renews automatically
- Zero configuration needed

## ⚡ Performance Optimizations

### Already Configured in vercel.json:
- **Region**: `iad1` (US East - closest to Buffalo)
- **Edge Caching**: Static assets cached for 1 year
- **API Routes**: No caching for dynamic content
- **Security Headers**: HSTS, CSP, XSS protection
- **Function Memory**: Optimized per endpoint

### Additional Optimizations:
1. **Enable Turbo Remote Caching**:
   ```bash
   vercel env add TURBO_TOKEN production
   vercel env add TURBO_TEAM production
   ```

2. **Image Optimization**:
   - Use `next/image` for automatic optimization
   - Images served from Vercel's CDN

3. **Analytics**:
   ```bash
   vercel analytics enable
   ```

## 📊 Monitoring & Analytics

### Vercel Analytics (Built-in)
- Real User Metrics (Core Web Vitals)
- Traffic analytics
- Function execution logs

### Enable Analytics:
```bash
# Install package
pnpm add @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Speed Insights:
```bash
pnpm add @vercel/speed-insights

# Add to app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

<SpeedInsights />
```

## 🔒 Security Checklist

### ✅ Already Configured:
- [x] Security headers in vercel.json
- [x] HTTPS enforced automatically
- [x] Environment variables encrypted
- [x] DDoS protection (Vercel built-in)

### ⚠️ Must Configure:
- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Disable all dev flags
- [ ] Add your domain to Firebase authorized domains
- [ ] Enable Vercel Firewall (paid feature)

## 🚦 Deployment Workflow

### Development → Staging → Production

1. **Development** (Local)
   ```bash
   pnpm dev
   ```

2. **Preview** (Feature branches)
   ```bash
   git push origin feature/new-feature
   # Automatically creates preview deployment
   ```

3. **Staging** (Optional staging branch)
   ```bash
   git push origin staging
   # Preview URL: hive-platform-staging.vercel.app
   ```

4. **Production** (Main branch)
   ```bash
   git push origin main
   # Production URL: your-domain.com
   ```

## 🐛 Troubleshooting

### Build Fails
```bash
# Check build logs
vercel logs

# Test build locally
pnpm turbo run build --filter=web
```

### Environment Variables Not Working
```bash
# List all env vars
vercel env ls

# Pull to .env.local for testing
vercel env pull
```

### Function Timeouts
- Check `vercel.json` for maxDuration settings
- Default is 10s (Hobby), 60s (Pro)
- Upgrade plan if needed

### Domain Not Working
```bash
# Check DNS propagation
vercel domains inspect your-domain.com
```

## 📈 Scaling Considerations

### Free Tier Limits:
- 100GB bandwidth/month
- 100GB-hours of function execution
- 1000 image optimizations/month

### When to Upgrade to Pro:
- Need >10s function execution time
- Want analytics & monitoring
- Need team collaboration
- Want SLA guarantees

### Pro Features ($20/month):
- 1TB bandwidth
- 1000GB-hours functions
- Analytics included
- Team collaboration
- Edge functions
- Cron jobs

## 🎯 Launch Checklist

### Before October 1st:
- [ ] Deploy to Vercel staging
- [ ] Set all production environment variables
- [ ] Create Firestore indexes
- [ ] Configure Firebase email templates
- [ ] Add production domain to Firebase
- [ ] Test with real @buffalo.edu emails
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Configure domain DNS
- [ ] Load test with expected traffic

### Launch Day:
- [ ] Verify all env vars are set
- [ ] Check Firebase Auth is working
- [ ] Monitor Vercel dashboard
- [ ] Watch function logs
- [ ] Check analytics data
- [ ] Be ready to rollback if needed

## 🆘 Emergency Procedures

### Instant Rollback:
```bash
# Via CLI
vercel rollback

# Or in Dashboard:
# Deployments → Select previous → Promote to Production
```

### Emergency Environment Variable Update:
```bash
vercel env add EMERGENCY_FLAG production
vercel --prod --force
```

### Function Issues:
```bash
# Check function logs
vercel logs --output json | grep error

# Increase memory/timeout in vercel.json
```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Monorepo Guide](https://vercel.com/docs/monorepos)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Edge Functions](https://vercel.com/docs/functions/edge-functions)

## 💡 Pro Tips

1. **Use Preview Comments**: Enable PR comments for automatic preview links
2. **Environment Variables**: Use Vercel's UI for sensitive vars, not vercel.json
3. **Monitoring**: Set up Vercel + Sentry integration for error tracking
4. **Caching**: Use ISR (Incremental Static Regeneration) for semi-static pages
5. **Functions**: Keep them small and focused for better performance

---

**Ready to Deploy!** 🚀

With this configuration, HIVE will have:
- Automatic deployments on git push
- Preview environments for every PR
- Production-grade security headers
- Optimized caching strategies
- Global CDN distribution
- Automatic SSL/HTTPS
- Real-time analytics

Just run `vercel` and follow the prompts to get started!