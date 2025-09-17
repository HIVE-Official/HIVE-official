import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(functions.config().sendgrid?.api_key || '');

export async function sendVerificationEmail(
  email: string,
  code: string,
  userName?: string
): Promise<void> {
  const msg = {
    to: email,
    from: {
      email: 'noreply@hive.buffalo.edu',
      name: 'HIVE'
    },
    subject: 'Verify Your HIVE Email',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
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
            .code-box {
              background: linear-gradient(135deg, #FF6B35 0%, #FFE255 100%);
              color: #000000;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              text-align: center;
              padding: 20px;
              border-radius: 12px;
              margin: 32px 0;
            }
            .footer {
              text-align: center;
              color: #666666;
              font-size: 14px;
              margin-top: 40px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">H</div>
              <h1 style="margin: 0; color: #FFFFFF;">Verify Your Email</h1>
            </div>
            
            <div class="content">
              <p style="font-size: 18px; margin-bottom: 8px;">
                Hi${userName ? ` ${userName}` : ''},
              </p>
              
              <p style="color: #CCCCCC; line-height: 1.6;">
                Please use the verification code below to complete your HIVE account setup:
              </p>
              
              <div class="code-box">${code}</div>
              
              <p style="color: #999999; font-size: 14px; text-align: center;">
                This code will expire in 10 minutes
              </p>
            </div>
            
            <div class="footer">
              <p>If you didn't create a HIVE account, you can safely ignore this email.</p>
              <p style="margin-top: 16px;">
                © ${new Date().getFullYear()} HIVE - University at Buffalo
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Verify Your HIVE Email

Hi${userName ? ` ${userName}` : ''},

Please use the verification code below to complete your HIVE account setup:

${code}

This code will expire in 10 minutes.

If you didn't create a HIVE account, you can safely ignore this email.

© ${new Date().getFullYear()} HIVE - University at Buffalo
    `.trim()
  };

  await sgMail.send(msg);
}