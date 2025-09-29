#!/usr/bin/env npx tsx
/**
 * Test Email Configuration Script
 * Run: npx tsx scripts/test-email-config.ts
 */

import { getEmailServiceStatus, isEmailServiceReady, sendMagicLinkEmail } from '../src/lib/email-service';

async function testEmailConfiguration() {
  console.log('\n🔍 Testing Email Service Configuration\n');
  console.log('=' .repeat(50));

  // Check if service is ready
  const readyStatus = await isEmailServiceReady();
  console.log(`\n✅ Ready: ${readyStatus.ready ? 'Yes' : 'No'}`);
  console.log(`📧 Provider: ${readyStatus.provider}`);
  console.log(`💬 Message: ${readyStatus.message}`);

  // Get detailed status
  const status = await getEmailServiceStatus();
  console.log('\n📊 Configuration Details:');
  console.log(JSON.stringify(status.details, null, 2));

  if (!readyStatus.ready) {
    console.log('\n⚠️  Email service is not configured!');
    console.log('\n📝 To configure email delivery:');
    console.log('\n1. For SendGrid:');
    console.log('   - Sign up at https://sendgrid.com');
    console.log('   - Create an API key');
    console.log('   - Add to .env.local:');
    console.log('     SENDGRID_API_KEY=your-api-key');
    console.log('     SENDGRID_FROM_EMAIL=hello@yourdomain.com');
    console.log('\n2. For Firebase:');
    console.log('   - Go to Firebase Console > Authentication > Sign-in method');
    console.log('   - Enable Email/Password provider');
    console.log('   - Enable Email link (passwordless sign-in)');
    console.log('\n3. Copy .env.email.template to .env.local and fill in your credentials');
    return;
  }

  // Optional: Send a test email
  const testEmail = process.argv[2];
  if (testEmail) {
    console.log(`\n📨 Sending test email to: ${testEmail}`);
    const testLink = 'https://hive.college/auth/verify?token=TEST&mode=test';
    const success = await sendMagicLinkEmail(testEmail, testLink, 'Test University');

    if (success) {
      console.log('✅ Test email sent successfully!');
      console.log('Check your inbox for the magic link email.');
    } else {
      console.log('❌ Failed to send test email');
      console.log('Check the logs above for error details.');
    }
  } else {
    console.log('\n💡 Tip: To send a test email, run:');
    console.log('   npx tsx scripts/test-email-config.ts your-email@example.com');
  }

  console.log('\n' + '=' .repeat(50));
  console.log('\n✨ Email configuration test complete!\n');
}

// Run the test
testEmailConfiguration().catch(console.error);