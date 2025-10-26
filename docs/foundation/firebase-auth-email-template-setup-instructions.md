# Firebase Custom Email Template Setup Instructions

## Quick Setup Guide

Follow these exact steps to configure the custom HIVE email template in Firebase Console.

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your HIVE project
3. Navigate to **Authentication** → **Templates**

### Step 2: Configure Email Template
1. Click on **"Email address verification"** (this handles magic links)
2. Click **"Edit template"** button
3. You'll see two sections: **Subject** and **Body**

### Step 3: Set Subject Line
In the **Subject** field, replace the default text with:
```
Your magic link to HIVE
```

### Step 4: Set Email Body
1. In the **Body** section, select **"HTML"** tab (not Plain text)
2. Delete all existing HTML content
3. Copy the entire contents of `docs/firebase-auth-email-template.html`
4. Paste it into the HTML body field

### Step 5: Configure From Address (Optional but Recommended)
1. In the same template editor, look for **"From"** field
2. Set it to: `HIVE <noreply@yourdomain.com>`
3. If you don't have a custom domain, use: `HIVE <noreply@yourproject.firebaseapp.com>`

### Step 6: Save Changes
1. Click **"Save"** button
2. Wait for confirmation message
3. Changes may take up to 10 minutes to propagate

### Step 7: Test the Template
1. Go to your HIVE app
2. Navigate to `/auth/login`
3. Enter a test email address
4. Check your inbox for the branded email
5. Verify the email renders correctly on desktop and mobile

## Template Variables Reference

The template uses these Firebase variables that are automatically replaced:

| Variable | Description | Example |
|----------|-------------|---------|
| `%DISPLAY_NAME%` | User's name extracted from email | "John Doe" |
| `%LINK%` | The magic link URL | `https://yourapp.com/auth/verify?...` |
| `%EMAIL%` | User's email address | "john.doe@buffalo.edu" |

## Troubleshooting

### Template Not Updating
- Clear browser cache and try again
- Wait 10-15 minutes for Firebase propagation
- Test in incognito/private browsing mode

### Email Not Received
- Check spam/junk folder
- Verify authorized domains are configured
- Test with different email providers (Gmail, Outlook, etc.)

### Styling Issues
- Ensure you copied the complete HTML template
- Verify no extra characters were added during copy/paste
- Check that CSS is embedded in `<style>` tags

### Link Not Working
- Verify authorized domains include your deployment URLs
- Check that action URLs are configured correctly
- Ensure the link hasn't expired (15-minute limit)

## Email Client Compatibility

The template is tested and optimized for:
- ✅ Gmail (Web, iOS, Android)
- ✅ Outlook (Web, Desktop, Mobile)
- ✅ Apple Mail (macOS, iOS)
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Mobile email clients

## Security Notes

- The template includes a 15-minute expiration notice
- Support email is provided for user assistance
- No sensitive information is displayed in the email
- Links are unique and cannot be reused

## Next Steps

After setting up the email template:
1. Test the complete authentication flow
2. Monitor email delivery rates
3. Gather user feedback on email experience
4. Consider A/B testing different subject lines

## Support

If you encounter issues during setup:
- Check Firebase Console error messages
- Review the troubleshooting section above
- Contact the development team for assistance 