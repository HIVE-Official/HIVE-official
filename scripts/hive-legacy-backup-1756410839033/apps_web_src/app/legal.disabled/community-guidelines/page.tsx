import { Metadata } from "next";
// import Link from "next/link"; // Unused import removed
import { Card, CardContent, CardHeader, CardTitle, Typography } from '@hive/ui'

export const metadata: Metadata = {
  title: "Community Guidelines | HIVE",
  description: "Community Guidelines for HIVE platform",
};

export default function CommunityGuidelinesPage() {
  return (
    <div className="container mx-auto flex max-w-4xl flex-col items-center justify-center p-4 lg:p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Typography variant="h1">Community Guidelines</Typography>
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <Typography>
            Welcome to the HIVE community. We're building a place for meaningful connection, and that starts with
            mutual respect and a shared understanding of our values.
          </Typography>

          <Typography variant="h3" className="mt-8">
            The Core Principles
          </Typography>
          <ul>
            <li>
              <Typography>
                <strong>Be Respectful:</strong> Treat others as you would like to be treated. Disagreements are fine,
                but personal attacks, harassment, and hate speech are not.
              </Typography>
            </li>
            <li>
              <Typography>
                <strong>Foster Authenticity:</strong> Represent yourself truthfully. This is a community for real
                people to have real conversations.
              </Typography>
            </li>
            <li>
              <Typography>
                <strong>Contribute Constructively:</strong> Aim to add value to the conversation. Share your
                knowledge, ask thoughtful questions, and help others.
              </Typography>
            </li>
            <li>
              <Typography>
                <strong>Respect Privacy:</strong> Do not share private information about others without their explicit
                consent.
              </Typography>
            </li>
          </ul>

          <Typography variant="h3" className="mt-8">
            Prohibited Content and Behavior
          </Typography>
          <Typography>
            The following are strictly prohibited and may result in content removal, account suspension, or a permanent
            ban:
          </Typography>
          <ul>
            <li>
              <Typography>Hate speech, discrimination, or harassment of any kind.</Typography>
            </li>
            <li>
              <Typography>Threats of violence or promotion of self-harm.</Typography>
            </li>
            <li>
              <Typography>Spam, phishing, or other malicious activities.</Typography>
            </li>
            <li>
              <Typography>Impersonation of others in a misleading or deceptive manner.</Typography>
            </li>
            <li>
              <Typography>Illegal content or promotion of illegal activities.</Typography>
            </li>
            <li>
              <Typography>Sexually explicit content.</Typography>
            </li>
          </ul>
          <Typography variant="h3" className="mt-8">
            Enforcement
          </Typography>
          <Typography>
            We take these guidelines seriously. Our moderation team will review reported content and take appropriate
            action. If you see something that violates these guidelines, please report it.
          </Typography>
          <Typography variant="h3" className="mt-8">
            A Living Document
          </Typography>
          <Typography>
            These guidelines may evolve over time as our community grows. We are committed to working with our members
            to create a safe and vibrant environment for everyone.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
