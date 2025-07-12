# 🚀 Vercel Deployment Setup Guide

## 🔒 **IMPORTANT: Set Environment Variables in Vercel Dashboard**

You need to set these environment variables in your Vercel Dashboard for secure deployment:

### **Required Environment Variables for Vercel:**

1. **Go to**: [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → Settings → Environment Variables

2. **Add these variables for ALL environments** (Development, Preview, Production):

```bash
# Firebase Admin SDK (Server-side)
FIREBASE_PROJECT_ID=hive-9265c
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hive-9265c.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCQw5AuSdfnzLxY
tH4qIzCcGXwYAmzq+FWG8++sPmDdHnHM/0eVQWzhELBI0gNeBTjLUFYxM59VBvQ8
WfKK6d+kzZSfq5XSl5c2L75uufPw507NTMi29ShlZeviSgkGpg6KSTptbvdzskVm
tW6G+qOGqUU5hrtaUmYhK5e4baWNrRbw5Prq9rPDx+Y7137wYu7Tbwh8etIwHgNe
e2C8dYVF+TqgB3iwIWC5AqLye7RkgHq0HCll8JMfqrOOXqAal8KNTu8Tkzo0HMLn
ZkbSBssh7KgIOhQISHl52kV+9sFWDopIrn02N47bEE34IMIGnuqs607TreNKIAzM
7iAcxp5vAgMBAAECggEAOVgGXpeou20p9Ld2vKlY4ZTkx7v6Oi+p7X3mpGPHSf/7
01kSGYkjoJnUQtxSMiW+ZCdMJUxOIsfQ6rE0txtCmI1JAODexd9/qhrKhCEMBRMT
b5apcXP2jwgLIwXxwlz4KIYua1gIFJ/7Bt76y+Qv77FQtyNsRrCaPSx/+rIQYOil
swmk3QUCkHXAcg86mG5vh86eqi3z04aUajil3xqyUy5dB+JfPY86IrWWB1s7VtXR
hPT3awaTt8WSLbXxCotwJfEFdlcX+YPp2C1BOwi2E7pqL6HIHeRiOAzd7AJY3Huw
0Y3lP/Ysv6fVjekhV8bjrLn4OkZBqOPso6uUY6n+eQKBgQDG+dOHBWaK3P6FsZ3l
S73y5NNtH5wfwLmyHS1rYkQ01RrD/sgOK7xbsAP07fjaPdQaBqhTbCP0F/fhzCRH
BJKyOND6OEiJXGubWqQ8Ysu3xe0JAPtJ6WtnYx6ZgfRCDFN8gsLb2e7onQkCOfFy
BNZVQlDr011OH6ZXr80V31wj6QKBgQC6QGRmkBfNxSbwxA3M55ipuiy5P7ljKWN6
06DcLKIuOBJqKbeIiP7B/WpqTUERDB7lfVIHNmalEk5mJC/v5HpGuapkRiV/FQoL
TT3NySFgXFLy2jg6u6aSbp/iKCE9lwHHoiWlMqffEZpvzXuIG54O2GVBYJWSY3jR
1p1nMsvwlwKBgD2GuMLSh6++wDFFB+cEMbsuyLXAhX1IEeOipA3FeAPCNaGPYfsH
yRms5rxQ7ZdGcRSPJHOPR9rNooe+oSUYo+faK7yDtOJMorWKJKjLf+TWngIfvJRR
SjXQ74BWL9pQh2xD3s8up3JkRIncsu0n08LPW8hgNkTXAo+wu8DcrVgpAoGBALlL
8Nc9CgGU4F3un1A5JV/OskoHBPiLp8X+H+6MlTloXaGzKT40FUiIR0PE4jQEnARy
/pXgYJRftxHVdL+0zpXoh4XFZ+6bzudZjGBcdtE4aOnlgsWkBV9voa9Nf2yX/JRR
VCSbVfoOuFf81aae20wnq+00GvqN7hjN7MFL/yu3AoGBAJC8vRRuLKf9amXmF0XZ
hX6qqWfaknNsOjcSMwEYQ/DKUYFpLqE/iOyd/ijNg1zKwx2PCrXMYlax7clxBpxB
XNxjOwgLawc5Xve5JCAPqZYZ5fhsQXia+q7RXMErHH7pHZJzsS6skazweWkQ337M
hWucTx4sSgJ1JIUi6q/e69jV
-----END PRIVATE KEY-----

# NextAuth Configuration
NEXTAUTH_SECRET=D7YdGIchExeTPaj5kCyqZGQSyO1xJkdKc2XzAn7P7XM=
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app

# Firebase Client (Already public in your code)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hive-9265c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-9265c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hive-9265c.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=573191826528
NEXT_PUBLIC_FIREBASE_APP_ID=1:573191826528:web:1d5eaeb8531276e4c1a705
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-NK3E12MSFD
```

### **⚠️ IMPORTANT NOTES:**

1. **FIREBASE_PRIVATE_KEY**: 
   - Copy the ENTIRE private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
   - Include all the line breaks (`\n`) exactly as shown
   - This is the most critical variable - if it's wrong, authentication won't work

2. **NEXTAUTH_URL & NEXT_PUBLIC_APP_URL**:
   - Replace `https://your-vercel-domain.vercel.app` with your actual Vercel domain
   - Use `https://hive.college` if you have a custom domain set up

3. **Environment Scoping**:
   - Set these for **Development**, **Preview**, AND **Production** environments
   - Use the same values for all environments (single project setup)

## 🔍 **Verification Steps:**

### After Setting Environment Variables:

1. **Deploy to Vercel**: 
   ```bash
   git push  # This will trigger a Vercel deployment
   ```

2. **Test the Health Endpoint**:
   ```bash
   curl https://your-domain.vercel.app/api/health
   ```
   
   Should return:
   ```json
   {
     "status": "healthy",
     "checks": {
       "firebase": {
         "clientConfigured": true,
         "adminConfigured": true,
         "projectId": "hive-9265c"
       }
     }
   }
   ```

3. **Test Authentication**:
   - Visit `https://your-domain.vercel.app/auth`
   - Should load without errors
   - Try the email authentication flow

## 🚨 **If Deployment Fails:**

### Common Issues:

1. **Firebase Private Key Format Error**:
   - Make sure you copied the ENTIRE private key including headers/footers
   - Ensure line breaks are preserved as `\n`

2. **Environment Variable Not Set**:
   - Check Vercel Dashboard → Settings → Environment Variables
   - Make sure all required variables are set for the correct environment

3. **Build Errors**:
   - Check Vercel deployment logs
   - Look for Firebase initialization errors

### Quick Debug:
```bash
# Check if environment variables are loaded
curl https://your-domain.vercel.app/api/health
```

## ✅ **Success Indicators:**

- [ ] Health endpoint returns `"adminConfigured": true`
- [ ] Auth page loads without console errors
- [ ] Email authentication flow works
- [ ] No Firebase initialization errors in Vercel logs

## 🔒 **Security Reminders:**

- Never commit the actual private key to git
- Rotate credentials monthly
- Monitor Vercel deployment logs for security issues
- Set up alerts for authentication failures

---

**Need Help?** Check the deployment logs in Vercel Dashboard → Deployments → [Latest] → Function Logs