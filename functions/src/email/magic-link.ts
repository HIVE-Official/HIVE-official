import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from Firebase config
sgMail.setApiKey(functions.config().sendgrid?.api_key || '');

interface MagicLinkEmailData {
  to: string;
  magicLink: string;
  userName?: string;
}

export async function sendMagicLinkEmail(
  email: string,
  magicLink: string,
  userName?: string
): Promise<void> {
  const msg = {
    to: email,
    from: {
      email: 'noreply@hive.buffalo.edu',
      name: 'HIVE'
    },
    subject: 'Your HIVE Magic Link',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>HIVE Magic Link</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background-color: #0A0A0A;
              color: #FFFFFF;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 40px 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              width: 60px;
              height: 60px;
              background: linear-gradient(135deg, #FF6B35 0%, #FFE255 100%);
              border-radius: 12px;
              margin: 0 auto 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              background-color: #1A1A1A;
              border-radius: 12px;
              padding: 32px;
              margin-bottom: 24px;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #FF6B35 0%, #FFE255 100%);
              color: #000000;
              text-decoration: none;
              padding: 14px 32px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              margin: 24px 0;
            }
            .link-text {
              background-color: #2A2A2A;
              padding: 12px;
              border-radius: 8px;
              word-break: break-all;
              font-family: monospace;
              font-size: 14px;
              color: #FFE255;
              margin: 16px 0;
            }
            .footer {
              text-align: center;
              color: #666666;
              font-size: 14px;
              margin-top: 40px;
            }
            .warning {
              background-color: #2A1F1A;
              border-left: 4px solid #FF6B35;
              padding: 12px;
              margin: 20px 0;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">H</div>
              <h1 style="margin: 0; color: #FFFFFF;">Welcome to HIVE</h1>
            </div>
            
            <div class="content">
              <p style="font-size: 18px; margin-bottom: 8px;">
                Hi${userName ? ` ${userName}` : ''},
              </p>
              
              <p style="color: #CCCCCC; line-height: 1.6;">
                Click the button below to sign in to your HIVE account. This magic link will expire in 1 hour.
              </p>
              
              <div style="text-align: center;">
                <a href="${magicLink}" class="button">Sign In to HIVE</a>
              </div>
              
              <p style="color: #999999; font-size: 14px; margin-top: 24px;">
                Or copy and paste this link into your browser:
              </p>
              
              <div class="link-text">${magicLink}</div>
              
              <div class="warning">
                <strong>Security Notice:</strong> This link is unique to you. Don't share it with anyone.
              </div>
            </div>
            
            <div class="footer">
              <p>If you didn't request this email, you can safely ignore it.</p>
              <p style="margin-top: 16px;">
                © ${new Date().getFullYear()} HIVE - University at Buffalo
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Welcome to HIVE!

Hi${userName ? ` ${userName}` : ''},

Click this link to sign in to your HIVE account:
${magicLink}

This magic link will expire in 1 hour.

Security Notice: This link is unique to you. Don't share it with anyone.

If you didn't request this email, you can safely ignore it.

© ${new Date().getFullYear()} HIVE - University at Buffalo
    `.trim()
  };

  await sgMail.send(msg);
}