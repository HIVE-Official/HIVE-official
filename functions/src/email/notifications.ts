import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(functions.config().sendgrid?.api_key || '');

interface NotificationEmailData {
  userName: string;
  title?: string;
  message?: string;
  posts?: any[];
  events?: any[];
  date?: string;
}

export async function sendNotificationEmail(
  email: string,
  type: string,
  data: NotificationEmailData
): Promise<void> {
  let subject = '';
  let htmlContent = '';
  let textContent = '';

  switch (type) {
    case 'daily-digest':
      subject = `Your HIVE Daily Digest - ${data.date}`;
      htmlContent = generateDailyDigestHTML(data);
      textContent = generateDailyDigestText(data);
      break;
      
    case 'new_post':
      subject = data.title || 'New Post in Your Space';
      htmlContent = generateNewPostHTML(data);
      textContent = generateNewPostText(data);
      break;
      
    case 'mention':
      subject = 'You were mentioned on HIVE';
      htmlContent = generateMentionHTML(data);
      textContent = generateMentionText(data);
      break;
      
    case 'event_reminder':
      subject = data.title || 'Event Reminder';
      htmlContent = generateEventReminderHTML(data);
      textContent = generateEventReminderText(data);
      break;
      
    default:
      subject = data.title || 'HIVE Notification';
      htmlContent = generateGenericHTML(data);
      textContent = generateGenericText(data);
  }

  const msg = {
    to: email,
    from: {
      email: 'noreply@hive.buffalo.edu',
      name: 'HIVE'
    },
    subject,
    html: htmlContent,
    text: textContent
  };

  await sgMail.send(msg);
}

function generateDailyDigestHTML(data: NotificationEmailData): string {
  const postsHTML = data.posts?.map(post => `
    <div style="background-color: #2A2A2A; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
      <p style="margin: 0 0 8px 0; font-weight: 600;">${post.authorName}</p>
      <p style="margin: 0; color: #CCCCCC;">${post.content}</p>
      <p style="margin: 8px 0 0 0; color: #666666; font-size: 12px;">
        ${post.likes || 0} likes " ${post.comments || 0} comments
      </p>
    </div>
  `).join('') || '<p>No new posts today</p>';

  const eventsHTML = data.events?.map(event => `
    <div style="background-color: #2A2A2A; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #FFE255;">${event.title}</p>
      <p style="margin: 0; color: #CCCCCC;">${event.description}</p>
      <p style="margin: 8px 0 0 0; color: #666666; font-size: 12px;">
        ${new Date(event.startDate).toLocaleString()}
      </p>
    </div>
  `).join('') || '<p>No upcoming events</p>';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
            margin-bottom: 32px;
          }
          .content {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; color: #FFFFFF;">Your HIVE Daily Digest</h1>
            <p style="color: #666666; margin-top: 8px;">${data.date}</p>
          </div>
          
          <div class="content">
            <h2 style="color: #FFE255; margin-top: 0;">Recent Posts</h2>
            ${postsHTML}
          </div>
          
          <div class="content">
            <h2 style="color: #FFE255; margin-top: 0;">Upcoming Events</h2>
            ${eventsHTML}
          </div>
          
          <p style="text-align: center; color: #666666; font-size: 14px;">
            <a href="https://hive.buffalo.edu/settings" style="color: #FFE255;">Manage Email Preferences</a>
          </p>
        </div>
      </body>
    </html>
  `;
}

function generateDailyDigestText(data: NotificationEmailData): string {
  const posts = data.posts?.map(post => 
    `${post.authorName}: ${post.content}\n${post.likes || 0} likes " ${post.comments || 0} comments`
  ).join('\n\n') || 'No new posts today';

  const events = data.events?.map(event => 
    `${event.title}\n${event.description}\n${new Date(event.startDate).toLocaleString()}`
  ).join('\n\n') || 'No upcoming events';

  return `
Your HIVE Daily Digest - ${data.date}

Recent Posts:
${posts}

Upcoming Events:
${events}

Manage Email Preferences: https://hive.buffalo.edu/settings
  `.trim();
}

function generateNewPostHTML(data: NotificationEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0A0A0A; color: #FFFFFF; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #1A1A1A; border-radius: 12px; padding: 24px;">
          <h2 style="color: #FFE255; margin-top: 0;">${data.title}</h2>
          <p style="color: #CCCCCC;">${data.message}</p>
          <a href="https://hive.buffalo.edu" style="display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #FFE255 100%); color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 16px;">View Post</a>
        </div>
      </body>
    </html>
  `;
}

function generateNewPostText(data: NotificationEmailData): string {
  return `${data.title}\n\n${data.message}\n\nView on HIVE: https://hive.buffalo.edu`;
}

function generateMentionHTML(data: NotificationEmailData): string {
  return generateNewPostHTML(data);
}

function generateMentionText(data: NotificationEmailData): string {
  return generateNewPostText(data);
}

function generateEventReminderHTML(data: NotificationEmailData): string {
  return generateNewPostHTML(data);
}

function generateEventReminderText(data: NotificationEmailData): string {
  return generateNewPostText(data);
}

function generateGenericHTML(data: NotificationEmailData): string {
  return generateNewPostHTML(data);
}

function generateGenericText(data: NotificationEmailData): string {
  return generateNewPostText(data);
}