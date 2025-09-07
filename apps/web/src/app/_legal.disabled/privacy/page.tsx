import { type Metadata } from "next";
import { Heading, Typography } from "@hive/ui";
// import Link from "next/link"; // Unused import removed

export const metadata: Metadata = {
  title: "Privacy Policy | HIVE",
  description: "Privacy Policy for HIVE platform",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Heading level={1} className="mb-8">
        Privacy Policy
      </Heading>
      <div className="space-y-6">
        <Typography variant="lead">
          Your privacy is important to us. It is HIVE's policy to respect your privacy regarding any information we may collect from you across our website.
        </Typography>
        <Typography>
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.
        </Typography>
        <Heading level={2} className="pt-4">
          Information We Collect
        </Heading>
        <Typography>
          Log data: When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer's Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.
        </Typography>
        <Heading level={2} className="pt-4">
          Security
        </Heading>
        <Typography>
          We take security seriously. We use commercially acceptable means to protect your personal information from loss or theft, as well as unauthorized access, disclosure, copying, use or modification.
        </Typography>
      </div>
    </div>
  );
}
