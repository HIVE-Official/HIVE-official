# Firebase Authentication Setup Guide

## Overview

This guide covers the complete setup of Firebase Authentication for HIVE, including email link authentication and custom email templates.

## 1. Firebase Console Configuration

### Enable Email Link Authentication

1. Go to Firebase Console → Authentication → Sign-in method
2. Enable "Email/Password" provider
3. Enable "Email link (passwordless sign-in)" option
4. Configure authorized domains (add your Vercel deployment domains)

### Configure Action URLs

1. Go to Authentication → Templates
2. Set the following action URLs:
   - **Email address verification**: `https://yourdomain.com/auth/verify`
   - **Password reset**: `https://yourdomain.com/auth/reset`
   - **Email change verification**: `https://yourdomain.com/auth/verify`

## 2. Custom Email Template Setup

### Upload Custom Template

1. In Firebase Console → Authentication → Templates
2. Select "Email address verification" (this is used for magic links)
3. Click "Edit template"
4. Replace the default HTML with the custom template from `docs/firebase-auth-email-template.html`

### Template Configuration

The custom template includes:

- **Subject Line**: "Your magic link to HIVE"
- **Branding**: Gold HIVE logo on dark background
- **Tone**: Confident-friendly ("Hey [Name]—here's your instant pass back into HIVE")
- **Security**: 15-minute expiration notice
- **Support**: Contact email for help

### Template Variables

Firebase automatically replaces these variables:
- `%DISPLAY_NAME%` - User's display name (extracted from email)
- `%LINK%` - The magic link URL
- `%EMAIL%` - User's email address (if needed)

## 3. Email Deliverability

### Custom Domain (Recommended)

1. Go to Authentication → Templates → SMTP settings
2. Configure custom SMTP server or use Firebase's default
3. For better deliverability, set up a custom domain:
   - Add DNS records for your domain
   - Verify domain ownership
   - Update "From" address to use your domain

### Spam Prevention

The template is optimized for deliverability:
- Minimal graphics (text-based logo)
- Clean HTML structure
- Proper email client compatibility
- Clear unsubscribe mechanism (handled by Firebase)

## 4. Testing the Email Template

### Development Testing

1. Use Firebase Auth Emulator for local testing:
   ```bash
   firebase emulators:start --only auth
   ```

2. Test email template rendering:
   - Send test magic link
   - Check email in various clients (Gmail, Outlook, Apple Mail)
   - Verify mobile responsiveness

### Production Testing

1. Test with real email addresses
2. Check spam folder delivery
3. Verify link functionality across devices
4. Monitor email delivery rates

## 5. Environment Configuration

### Development
```env
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

### Production
```env
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-custom-domain.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-prod-project-id
```

## 6. Security Considerations

### Link Expiration
- Magic links expire in 15 minutes (Firebase default)
- Users are notified of expiration in email footer
- Expired links redirect to `/auth/expired` page

### Domain Validation
- Only authorized domains can handle auth redirects
- Configure all deployment domains in Firebase Console
- Include staging and production URLs

### Rate Limiting
- Firebase has built-in rate limiting for auth requests
- Additional rate limiting implemented in API routes
- Monitor for abuse patterns

## 7. Monitoring & Analytics

### Email Delivery Metrics
- Track email send success/failure rates
- Monitor spam folder delivery
- Measure click-through rates on magic links

### User Experience Metrics
- Time from email send to link click
- Magic link success/failure rates
- User drop-off at email verification step

## 8. Troubleshooting

### Common Issues

**Emails not delivering:**
- Check spam folders
- Verify domain configuration
- Review Firebase quotas

**Template not updating:**
- Clear browser cache
- Wait for Firebase propagation (up to 10 minutes)
- Test with incognito/private browsing

**Links not working:**
- Verify authorized domains
- Check URL encoding in email
- Ensure proper redirect handling

### Support Contacts

For email delivery issues, users can contact:
- **Support Email**: thehiveuni@gmail.com
- **Response Time**: Within 24 hours during business days

## 9. Future Enhancements

### Planned Improvements
- A/B testing for email subject lines
- Personalized email content based on user context
- Multi-language email templates
- Enhanced email analytics dashboard

### Template Versioning
- Version control for email templates
- Rollback capability for template changes
- A/B testing framework for email variations 