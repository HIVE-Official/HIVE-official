import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(functions.config().sendgrid?.api_key || '');

export async function sendWelcomeEmail(
  email: string,
  userName: string
): Promise<void> {
  const msg = {
    to: email,
    from: {
      email: 'noreply@hive.buffalo.edu',
      name: 'HIVE'
    },
    subject: 'Welcome to HIVE! <‰',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to HIVE</title>
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
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #FF6B35 0%, #FFE255 100%);
              border-radius: 16px;
              margin: 0 auto 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 36px;
              font-weight: bold;
            }
            .content {
              background-color: #1A1A1A;
              border-radius: 12px;
              padding: 32px;
              margin-bottom: 24px;
            }
            .feature {
              display: flex;
              align-items: flex-start;
              margin: 24px 0;
            }
            .feature-icon {
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #FF6B35 0%, #FFE255 100%);
              border-radius: 8px;
              margin-right: 16px;
              flex-shrink: 0;
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
              <h1 style="margin: 0; color: #FFFFFF;">Welcome to HIVE!</h1>
              <p style="color: #FFE255; font-size: 18px; margin-top: 8px;">Your Campus, Connected</p>
            </div>
            
            <div class="content">
              <p style="font-size: 18px; margin-bottom: 24px;">
                Hey ${userName}! =K
              </p>
              
              <p style="color: #CCCCCC; line-height: 1.6;">
                You're now part of HIVE - the platform connecting students across campus for real coordination and community.
              </p>
              
              <div class="feature">
                <div class="feature-icon"></div>
                <div>
                  <h3 style="margin: 0 0 8px 0; color: #FFFFFF;">Join Spaces</h3>
                  <p style="margin: 0; color: #999999; font-size: 14px;">
                    Connect with your dorm, major, clubs, and interest groups
                  </p>
                </div>
              </div>
              
              <div class="feature">
                <div class="feature-icon"></div>
                <div>
                  <h3 style="margin: 0 0 8px 0; color: #FFFFFF;">Coordinate Activities</h3>
                  <p style="margin: 0; color: #999999; font-size: 14px;">
                    Find study partners, share rides, organize food runs
                  </p>
                </div>
              </div>
              
              <div class="feature">
                <div class="feature-icon"></div>
                <div>
                  <h3 style="margin: 0 0 8px 0; color: #FFFFFF;">Build Tools</h3>
                  <p style="margin: 0; color: #999999; font-size: 14px;">
                    Create and share campus utilities without coding
                  </p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 32px;">
                <a href="https://hive.buffalo.edu/spaces" class="button">Explore Spaces</a>
              </div>
              
              <p style="color: #666666; font-size: 14px; text-align: center; margin-top: 24px;">
                Need help? Check out our <a href="https://hive.buffalo.edu/help" style="color: #FFE255;">Getting Started Guide</a>
              </p>
            </div>
            
            <div class="footer">
              <p>Questions? Reply to this email or visit our help center.</p>
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

Hey ${userName}! =K

You're now part of HIVE - the platform connecting students across campus for real coordination and community.

What you can do:
" Join Spaces - Connect with your dorm, major, clubs, and interest groups
" Coordinate Activities - Find study partners, share rides, organize food runs  
" Build Tools - Create and share campus utilities without coding

Get started: https://hive.buffalo.edu/spaces

Need help? Check out our Getting Started Guide: https://hive.buffalo.edu/help

Questions? Reply to this email or visit our help center.

© ${new Date().getFullYear()} HIVE - University at Buffalo
    `.trim()
  };

  await sgMail.send(msg);
}