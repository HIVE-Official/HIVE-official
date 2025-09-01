import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
let isInitialized = false;

function initializeSendGrid() {
  if (isInitialized) return;
  
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    isInitialized = true;
  } else if (process.env.NODE_ENV === 'production') {
    throw new Error('SENDGRID_API_KEY is required in production');
  }
}

interface MagicLinkEmailOptions {
  to: string;
  magicLink: string;
  schoolName: string;
}

export async function sendMagicLinkEmail({
  to,
  magicLink,
  schoolName,
}: MagicLinkEmailOptions): Promise<void> {
  // In development, log the magic link instead of sending email
  if (process.env.NODE_ENV === 'development') {
    
    
    
    
    return;
  }

  // Initialize SendGrid only when needed (not during build)
  initializeSendGrid();

  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY is not configured');
  }

  const msg = {
    to,
    from: {
      email: process.env.FROM_EMAIL || 'auth@hive.io',
      name: 'HIVE'
    },
    subject: `Sign in to HIVE for ${schoolName}`,
    html: generateMagicLinkHTML({ magicLink, schoolName }),
    text: generateMagicLinkText({ magicLink, schoolName }),
  };

  try {
    await sgMail.send(msg);
    
  } catch (error) {
    console.error('Error sending magic link email:', error);
    throw new Error('Failed to send magic link email');
  }
}

function generateMagicLinkHTML({ magicLink, schoolName }: { magicLink: string; schoolName: string }): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sign in to HIVE</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          color: #D4AF37;
          margin-bottom: 8px;
        }
        .tagline {
          color: #666;
          font-size: 14px;
        }
        .content {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 32px;
          margin: 24px 0;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #D4AF37 0%, #F4E99B 100%);
          color: #000;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          margin: 24px 0;
        }
        .footer {
          text-align: center;
          color: #666;
          font-size: 12px;
          margin-top: 40px;
        }
        .link-fallback {
          word-break: break-all;
          font-size: 12px;
          color: #666;
          margin-top: 16px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">HIVE</div>
        <div class="tagline">Your campus. Built by students.</div>
      </div>
      
      <div class="content">
        <h2>Sign in to HIVE for ${schoolName}</h2>
        <p>Click the button below to sign in to your HIVE account. This link will expire in 1 hour for security.</p>
        
        <div style="text-align: center;">
          <a href="${magicLink}" class="button">Sign In to HIVE</a>
        </div>
        
        <p style="font-size: 14px; color: #666;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <div class="link-fallback">${magicLink}</div>
      </div>
      
      <div class="footer">
        <p>This email was sent to you because you requested to sign in to HIVE.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    </body>
    </html>
  `;
}

function generateMagicLinkText({ magicLink, schoolName }: { magicLink: string; schoolName: string }): string {
  return `
Sign in to HIVE for ${schoolName}

Click the link below to sign in to your HIVE account. This link will expire in 1 hour for security.

${magicLink}

If you didn't request this, you can safely ignore this email.

--
HIVE - Your campus. Built by students.
  `.trim();
}