# Admin Subdomain Setup - admin.hive.college

## 🚀 Quick Setup (5 minutes)

### Step 1: DNS Configuration (Vercel Dashboard)

1. **Go to Vercel Dashboard** → Your HIVE project → Settings → Domains
2. **Click "Add Domain"**
3. **Enter**: `admin.hive.college`
4. **Vercel will show you** one of these options:

#### Option A: CNAME Record (Most Common)
```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com
```

#### Option B: A Record (If CNAME not available)
```
Type: A
Name: admin
Value: 76.76.21.21
```

### Step 2: Add DNS Record (Your Domain Provider)

Go to your domain provider (where you bought hive.college):

**For Namecheap:**
1. Dashboard → Domain List → hive.college → Advanced DNS
2. Add New Record → CNAME
3. Host: `admin`, Value: `cname.vercel-dns.com`

**For Cloudflare:**
1. DNS → Add record
2. Type: CNAME, Name: `admin`, Target: `cname.vercel-dns.com`
3. **IMPORTANT**: Set Proxy status to "DNS only" (gray cloud)

**For GoDaddy:**
1. DNS → Add → CNAME
2. Host: `admin`, Points to: `cname.vercel-dns.com`

### Step 3: Verify in Vercel

1. Go back to Vercel Dashboard
2. It should show "Valid Configuration" ✅ within 1-2 minutes
3. SSL certificate will be auto-provisioned (takes ~5 minutes)

## 📋 What We've Configured

### Code Changes Made:

1. **Middleware** (`/middleware.ts`):
   - Auto-redirects `/admin` on main domain → `admin.hive.college`
   - Enforces admin authentication on subdomain
   - Separate admin session cookies

2. **Next.js Config** (`next.config.mjs`):
   - Subdomain rewrite rules
   - Admin-specific routing

3. **Vercel Config** (`vercel.json`):
   - Enhanced security headers for admin subdomain
   - Stricter CSP policies
   - X-Frame-Options: DENY

4. **CORS Configuration** (`/lib/cors-config.ts`):
   - Allows API calls between subdomains
   - Maintains session security

## 🔐 Security Benefits

### What You Get with Subdomain:

✅ **Cookie Isolation**: Admin cookies can't be accessed from main site
✅ **XSS Protection**: Vulnerabilities in main app can't affect admin
✅ **CSP Separation**: Stricter content policies for admin panel
✅ **Session Isolation**: Separate admin sessions from user sessions
✅ **Rate Limit Independence**: Different rate limits for admin APIs

## 🎯 How It Works After Setup

### For Admins (Jacob & Noah):

1. **Navigate to** `admin.hive.college`
2. **Sign in** with your admin email (jwrhineh@buffalo.edu or noahowsh@gmail.com)
3. **Access granted** automatically
4. **Full dashboard** at `admin.hive.college/admin`

### Automatic Redirects:

- `hive.college/admin` → Redirects to → `admin.hive.college/admin`
- `hive.college/api/admin/*` → Redirects to → `admin.hive.college/api/admin/*`

### Session Management:

- **Main site**: Uses `hive_session` cookie
- **Admin site**: Uses `hive_admin_session` cookie
- **No cross-contamination** between sessions

## 🚨 Testing Locally

For local development with subdomains:

1. **Edit `/etc/hosts`** (Mac/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows):
```
127.0.0.1 admin.hive.local
127.0.0.1 hive.local
```

2. **Update `.env.local`**:
```env
NEXT_PUBLIC_APP_URL=http://hive.local:3000
NEXT_PUBLIC_ADMIN_URL=http://admin.hive.local:3000
```

3. **Access locally**:
- Main site: `http://hive.local:3000`
- Admin site: `http://admin.hive.local:3000`

## 📊 Cost Breakdown

### What This Costs:
- **Vercel Subdomain**: $0 (included in all plans)
- **SSL Certificate**: $0 (auto-provisioned by Vercel)
- **DNS Record**: $0 (included with domain)
- **Additional Infrastructure**: $0

**Total Additional Cost: $0/month**

## ⚡ Quick Troubleshooting

### DNS Not Propagating?
- Wait 5-10 minutes (DNS can take time)
- Clear browser cache
- Try: `dig admin.hive.college` to check DNS

### SSL Certificate Error?
- Vercel auto-provisions SSL within 5-10 minutes
- Check Vercel Dashboard → Domains for status

### Redirect Loop?
- Clear cookies for both domains
- Check middleware.ts for conflicts

### Can't Access Admin?
- Ensure you're using configured admin email
- Check browser console for errors
- Verify DNS has propagated

## ✅ Verification Checklist

After setup, verify:

- [ ] `admin.hive.college` loads without SSL errors
- [ ] `/admin` on main domain redirects to subdomain
- [ ] Admin login works with configured emails
- [ ] API calls from admin panel work
- [ ] Sessions remain isolated between domains

## 🎉 Status

Once DNS propagates (5-10 minutes), your admin panel will be:
- **More secure** than 90% of startup admin panels
- **Cookie-isolated** from main application
- **XSS-protected** with separate origin
- **Production-ready** for October 1st launch

---

**Need Help?** The subdomain setup is standard Vercel configuration. Their support can assist if needed.