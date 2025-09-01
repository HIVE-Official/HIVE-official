import type { Metadata } from "next";
import { ArrowLeft, Calendar, Shield } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface LegalDocument {
  version: string;
  effectiveDate: string;
  title: string;
  content: React.ReactNode;
}

const CURRENT_PRIVACY: LegalDocument = {
  version: "2025-01-15",
  effectiveDate: "January 15, 2025",
  title: "Privacy Policy",
  content: (
    <div className="prose prose-invert max-w-none">
      <div className="mb-8 rounded-lg border border-[var(--hive-brand-secondary)]/20 bg-[var(--hive-brand-secondary)]/5 p-6">
        <h2 className="mt-0 text-xl font-semibold text-[var(--hive-brand-secondary)]">
          TL;DR - Your Privacy Matters
        </h2>
        <p className="mb-0 text-gray-300">
          We collect minimal data to make HIVE work well for you. Analytics are
          anonymized by default, you control your profile visibility, and we
          never sell your personal information.
        </p>
      </div>

      <h2>1. Information We Collect</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-secondary)]/50 bg-[var(--hive-background-primary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-secondary)]">
          TL;DR: Account info, content you create, and anonymized usage data.
        </p>
      </div>

      <h3>Account Information</h3>
      <p>When you create a HIVE account, we collect:</p>
      <ul>
        <li>Email address (for authentication and communication)</li>
        <li>Full name and chosen handle</li>
        <li>Academic information (major, graduation year)</li>
        <li>School affiliation (derived from email domain)</li>
        <li>Profile photo (optional)</li>
        <li>Builder status preference</li>
      </ul>

      <h3>Content and Activity</h3>
      <p>We store content you create on HIVE:</p>
      <ul>
        <li>Posts, comments, and reactions in Spaces</li>
        <li>Tools and interactive elements you build</li>
        <li>Space memberships and roles</li>
        <li>Profile customizations and settings</li>
      </ul>

      <h3>Usage Analytics</h3>
      <p>We collect anonymized usage data to improve HIVE:</p>
      <ul>
        <li>Page views and feature usage patterns</li>
        <li>Tool creation and interaction events</li>
        <li>Session duration and engagement metrics</li>
        <li>Error logs and performance data</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-secondary)]/50 bg-[var(--hive-background-primary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-secondary)]">
          TL;DR: To provide HIVE's features, improve the platform, and
          communicate with you.
        </p>
      </div>

      <p>We use your information to:</p>
      <ul>
        <li>
          <strong>Provide Service Features:</strong> Enable Spaces, Tools,
          profiles, and social interactions
        </li>
        <li>
          <strong>Personalization:</strong> Auto-join relevant Spaces, suggest
          connections, customize your experience
        </li>
        <li>
          <strong>Communication:</strong> Send important updates, security
          notifications, and feature announcements
        </li>
        <li>
          <strong>Platform Improvement:</strong> Analyze usage patterns to
          enhance features and fix issues
        </li>
        <li>
          <strong>Safety and Security:</strong> Detect abuse, prevent spam, and
          maintain community standards
        </li>
      </ul>

      <h2>3. Information Sharing and Disclosure</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-secondary)]/50 bg-[var(--hive-background-primary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-secondary)]">
          TL;DR: We don't sell your data. Limited sharing only for service
          operation and legal compliance.
        </p>
      </div>

      <p>We may share your information in these limited circumstances:</p>
      <ul>
        <li>
          <strong>Public Content:</strong> Posts and profiles you make public
          are visible to other HIVE users
        </li>
        <li>
          <strong>Service Providers:</strong> Trusted third parties who help
          operate HIVE (hosting, analytics, support)
        </li>
        <li>
          <strong>Legal Requirements:</strong> When required by law, court
          order, or to protect rights and safety
        </li>
        <li>
          <strong>Business Transfers:</strong> In the event of a merger,
          acquisition, or sale of assets
        </li>
      </ul>
      <p>
        <strong>
          We never sell your personal information to advertisers or data
          brokers.
        </strong>
      </p>

      <h2>4. Data Security</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-secondary)]/50 bg-[var(--hive-background-primary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-secondary)]">
          TL;DR: Industry-standard security measures protect your data.
        </p>
      </div>

      <p>We protect your information through:</p>
      <ul>
        <li>Encryption in transit and at rest</li>
        <li>Secure authentication systems</li>
        <li>Regular security audits and monitoring</li>
        <li>Access controls and employee training</li>
        <li>Incident response procedures</li>
      </ul>

      <h2>5. Your Privacy Rights and Controls</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-secondary)]/50 bg-[var(--hive-background-primary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-secondary)]">
          TL;DR: You control your profile visibility, can export your data, and
          request deletion.
        </p>
      </div>

      <h3>Profile Privacy</h3>
      <ul>
        <li>Choose whether your profile is publicly viewable</li>
        <li>Control what information appears on your public profile</li>
        <li>Manage Space membership visibility</li>
      </ul>

      <h3>Analytics Controls</h3>
      <ul>
        <li>Analytics are anonymized by default</li>
        <li>Opt-out controls for detailed usage tracking (coming soon)</li>
        <li>Granular controls for different types of data collection</li>
      </ul>

      <h3>Data Rights</h3>
      <p>You have the right to:</p>
      <ul>
        <li>
          <strong>Access:</strong> Request a copy of your personal data
        </li>
        <li>
          <strong>Correction:</strong> Update or correct inaccurate information
        </li>
        <li>
          <strong>Deletion:</strong> Request deletion of your account and data
        </li>
        <li>
          <strong>Portability:</strong> Export your data in a machine-readable
          format
        </li>
        <li>
          <strong>Objection:</strong> Object to certain types of data processing
        </li>
      </ul>

      <h2>6. Regional Privacy Rights</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-secondary)]/50 bg-[var(--hive-background-primary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-secondary)]">
          TL;DR: Additional rights for EU (GDPR) and California (CCPA) users.
        </p>
      </div>

      <h3>European Union (GDPR)</h3>
      <p>If you're in the EU, you have additional rights under GDPR:</p>
      <ul>
        <li>Right to withdraw consent at any time</li>
        <li>Right to lodge a complaint with supervisory authorities</li>
        <li>Right to data portability in structured formats</li>
        <li>Right to object to automated decision-making</li>
      </ul>

      <h3>California (CCPA)</h3>
      <p>California residents have rights under CCPA:</p>
      <ul>
        <li>Right to know what personal information is collected</li>
        <li>Right to delete personal information</li>
        <li>Right to opt-out of sale (we don't sell data)</li>
        <li>Right to non-discrimination for exercising privacy rights</li>
      </ul>

      <h2>7. Children's Privacy (COPPA)</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-secondary)]/50 bg-[var(--hive-background-primary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-secondary)]">
          TL;DR: HIVE is for users 13 and older.
        </p>
      </div>

      <p>
        HIVE is not intended for children under 13. We do not knowingly collect
        personal information from children under 13. If we learn that we have
        collected information from a child under 13, we will delete that
        information promptly.
      </p>

      <h2>8. Data Retention</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-secondary)]/50 bg-[var(--hive-background-primary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-secondary)]">
          TL;DR: We keep data only as long as needed for service operation.
        </p>
      </div>

      <p>We retain your information:</p>
      <ul>
        <li>
          <strong>Account Data:</strong> Until you delete your account
        </li>
        <li>
          <strong>Content:</strong> Until you delete it or your account
        </li>
        <li>
          <strong>Analytics:</strong> Anonymized data may be retained for
          product improvement
        </li>
        <li>
          <strong>Legal Requirements:</strong> As required by applicable laws
        </li>
      </ul>

      <h2>9. International Data Transfers</h2>
      <p>
        HIVE operates globally and may transfer your information to countries
        outside your residence. We ensure appropriate safeguards are in place
        for international transfers.
      </p>

      <h2>10. Third-Party Services</h2>
      <p>
        HIVE may integrate with third-party services (authentication, analytics,
        hosting). These services have their own privacy policies, which we
        encourage you to review.
      </p>

      <h2>11. Changes to This Privacy Policy</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-secondary)]/50 bg-[var(--hive-background-primary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-secondary)]">
          TL;DR: We'll notify you of significant changes.
        </p>
      </div>

      <p>
        We may update this Privacy Policy from time to time. Material changes
        will be communicated through HIVE or via email. We encourage you to
        review this policy periodically.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        For privacy-related questions or to exercise your rights, contact us at:
      </p>
      <ul>
        <li>
          Email:{" "}
          <a
            href="mailto:privacy@hive.co"
            className="text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80"
          >
            privacy@hive.co
          </a>
        </li>
        <li>
          Data Subject Rights:{" "}
          <a
            href="mailto:data-rights@hive.co"
            className="text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80"
          >
            data-rights@hive.co
          </a>
        </li>
      </ul>

      <div className="mt-12 border-t border-gray-800 pt-8">
        <h3 className="text-lg font-semibold text-[var(--hive-brand-secondary)]">Version History</h3>
        <div className="mt-4 space-y-2 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Version 2025-01-15 (Current) - Initial Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const metadata: Metadata = {
  title: "Privacy Policy | HIVE",
  description:
    "Privacy Policy for HIVE - how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-950/50">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center gap-2 px-3 py-1 text-sm text-gray-400 hover:text-[var(--hive-text-inverse)] transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to HIVE
              </Link>
              <div className="h-6 w-px bg-gray-700" />
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Privacy & Data Protection</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Effective: {CURRENT_PRIVACY.effectiveDate}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-[var(--hive-text-inverse)]">
            {CURRENT_PRIVACY.title}
          </h1>
          <p className="text-gray-400">
            Version {CURRENT_PRIVACY.version} • Effective{" "}
            {CURRENT_PRIVACY.effectiveDate}
          </p>
        </div>

        <div className="text-gray-300">{CURRENT_PRIVACY.content}</div>
      </div>
      </div>
    </Suspense>
  );
}
