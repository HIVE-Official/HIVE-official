import type { Metadata } from "next";
import { ArrowLeft, Calendar, Heart } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

interface LegalDocument {
  version: string;
  effectiveDate: string;
  title: string;
  content: React.ReactNode;
}

const CURRENT_GUIDELINES: LegalDocument = {
  version: "2025-01-15",
  effectiveDate: "January 15, 2025",
  title: "Community Guidelines",
  content: (
    <div className="prose prose-invert max-w-none">
      <div className="mb-8 rounded-lg border border-[var(--hive-brand-primary)]/20 bg-[var(--hive-brand-primary)]/5 p-6">
        <h2 className="mt-0 text-xl font-semibold text-[var(--hive-brand-primary)]">
          TL;DR - Be Human, Be Kind
        </h2>
        <p className="mb-0 text-gray-300">
          HIVE is built on respect, authenticity, and collaboration. Treat
          others as you'd want to be treated, contribute meaningfully to your
          communities, and help us create a space where everyone can thrive.
        </p>
      </div>

      <h2>Our Community Values</h2>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-[var(--hive-brand-primary)]/20 bg-[var(--hive-background-tertiary)]/30 p-4">
          <h3 className="mt-0 text-[var(--hive-brand-primary)]">🤝 Respect</h3>
          <p className="mb-0 text-sm">
            Honor different perspectives, backgrounds, and experiences.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--hive-brand-primary)]/20 bg-[var(--hive-background-tertiary)]/30 p-4">
          <h3 className="mt-0 text-[var(--hive-brand-primary)]">✨ Authenticity</h3>
          <p className="mb-0 text-sm">
            Be genuine in your interactions and contributions.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--hive-brand-primary)]/20 bg-[var(--hive-background-tertiary)]/30 p-4">
          <h3 className="mt-0 text-[var(--hive-brand-primary)]">🚀 Growth</h3>
          <p className="mb-0 text-sm">
            Support each other's learning and development.
          </p>
        </div>
      </div>

      <h2>1. Respectful Communication</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-primary)]/50 bg-[var(--hive-background-tertiary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-primary)]">
          TL;DR: Communicate with kindness, even when you disagree.
        </p>
      </div>

      <h3>What We Encourage</h3>
      <ul>
        <li>
          <strong>Constructive Dialogue:</strong> Share different viewpoints
          respectfully
        </li>
        <li>
          <strong>Active Listening:</strong> Seek to understand before being
          understood
        </li>
        <li>
          <strong>Inclusive Language:</strong> Use language that welcomes
          everyone
        </li>
        <li>
          <strong>Helpful Feedback:</strong> Offer suggestions that help others
          improve
        </li>
      </ul>

      <h3>What We Don't Allow</h3>
      <ul>
        <li>Personal attacks, insults, or harassment</li>
        <li>
          Discriminatory language based on identity, background, or beliefs
        </li>
        <li>Threats, intimidation, or doxxing</li>
        <li>Spam, excessive self-promotion, or off-topic content</li>
      </ul>

      <h2>2. Academic Integrity</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-primary)]/50 bg-[var(--hive-background-tertiary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-primary)]">
          TL;DR: Support learning without compromising academic honesty.
        </p>
      </div>

      <p>
        HIVE is a place for collaboration and learning, but we respect academic
        integrity:
      </p>
      <ul>
        <li>
          <strong>Study Groups:</strong> Collaborate on understanding concepts
          and approaches
        </li>
        <li>
          <strong>Resource Sharing:</strong> Share helpful materials, tools, and
          study guides
        </li>
        <li>
          <strong>Peer Support:</strong> Help each other learn and grow
          academically
        </li>
      </ul>

      <p>
        <strong>However, we don't allow:</strong>
      </p>
      <ul>
        <li>Sharing or requesting answers to specific assignments or exams</li>
        <li>Plagiarism or encouraging academic dishonesty</li>
        <li>Violating your institution's academic integrity policies</li>
      </ul>

      <h2>3. Content Standards</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-primary)]/50 bg-[var(--hive-background-tertiary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-primary)]">
          TL;DR: Share content that adds value and follows platform rules.
        </p>
      </div>

      <h3>Encouraged Content</h3>
      <ul>
        <li>
          <strong>Meaningful Posts:</strong> Share experiences, insights, and
          questions that spark discussion
        </li>
        <li>
          <strong>Creative Tools:</strong> Build interactive elements that
          enhance community experiences
        </li>
        <li>
          <strong>Resource Sharing:</strong> Post helpful links, articles, and
          educational materials
        </li>
        <li>
          <strong>Event Promotion:</strong> Share relevant campus events and
          opportunities
        </li>
      </ul>

      <h3>Prohibited Content</h3>
      <ul>
        <li>
          <strong>Illegal Content:</strong> Anything that violates local, state,
          or federal laws
        </li>
        <li>
          <strong>Harmful Content:</strong> Content promoting self-harm,
          violence, or dangerous activities
        </li>
        <li>
          <strong>Adult Content:</strong> Sexually explicit or suggestive
          material
        </li>
        <li>
          <strong>Misinformation:</strong> Deliberately false or misleading
          information
        </li>
        <li>
          <strong>Copyright Violations:</strong> Content that infringes on
          others' intellectual property
        </li>
      </ul>

      <h2>4. Space-Specific Guidelines</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-primary)]/50 bg-[var(--hive-background-tertiary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-primary)]">
          TL;DR: Each Space may have additional rules set by its builders.
        </p>
      </div>

      <p>Different Spaces may have their own specific guidelines:</p>
      <ul>
        <li>
          <strong>Academic Spaces:</strong> May have stricter rules about
          assignment sharing
        </li>
        <li>
          <strong>Professional Spaces:</strong> May require more formal
          communication styles
        </li>
        <li>
          <strong>Interest Groups:</strong> May focus on specific topics or
          activities
        </li>
        <li>
          <strong>Residential Spaces:</strong> May include location-specific
          information and events
        </li>
      </ul>
      <p>
        Always check and follow the specific guidelines for each Space you join.
      </p>

      <h2>5. Tool Creation Guidelines</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-primary)]/50 bg-[var(--hive-background-tertiary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-primary)]">
          TL;DR: Create tools that are safe, functional, and add value to
          communities.
        </p>
      </div>

      <h3>Tool Standards</h3>
      <ul>
        <li>
          <strong>Functionality:</strong> Tools should work as intended and
          provide clear value
        </li>
        <li>
          <strong>Safety:</strong> No malicious code, security vulnerabilities,
          or privacy violations
        </li>
        <li>
          <strong>Accessibility:</strong> Consider users with different
          abilities and devices
        </li>
        <li>
          <strong>Performance:</strong> Optimize for speed and efficiency
        </li>
      </ul>

      <h3>Prohibited Tools</h3>
      <ul>
        <li>Tools that collect unauthorized user data</li>
        <li>Tools that spam or harass other users</li>
        <li>Tools that violate platform security or stability</li>
        <li>Tools that facilitate prohibited content or activities</li>
      </ul>

      <h2>6. Privacy and Safety</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-primary)]/50 bg-[var(--hive-background-tertiary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-primary)]">
          TL;DR: Protect your privacy and respect others' boundaries.
        </p>
      </div>

      <h3>Protecting Yourself</h3>
      <ul>
        <li>
          Don't share personal information like addresses, phone numbers, or
          financial details
        </li>
        <li>
          Use privacy settings to control who can see your profile and content
        </li>
        <li>Report suspicious or concerning behavior to moderators</li>
        <li>Trust your instincts—if something feels wrong, it probably is</li>
      </ul>

      <h3>Respecting Others</h3>
      <ul>
        <li>Don't share others' personal information without permission</li>
        <li>Respect when someone asks for space or sets boundaries</li>
        <li>Don't screenshot or share private conversations publicly</li>
        <li>Ask before tagging people in posts or photos</li>
      </ul>

      <h2>7. Moderation and Enforcement</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-primary)]/50 bg-[var(--hive-background-tertiary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-primary)]">
          TL;DR: Community builders moderate first, HIVE team handles serious
          violations.
        </p>
      </div>

      <h3>How Moderation Works</h3>
      <ul>
        <li>
          <strong>Community Moderation:</strong> Space builders are the first
          line of moderation for their communities
        </li>
        <li>
          <strong>Reporting System:</strong> Users can report content or
          behavior that violates guidelines
        </li>
        <li>
          <strong>Platform Oversight:</strong> HIVE team reviews serious
          violations and appeals
        </li>
        <li>
          <strong>Escalation Process:</strong> Repeated or severe violations may
          result in account restrictions
        </li>
      </ul>

      <h3>Possible Actions</h3>
      <ul>
        <li>
          <strong>Warning:</strong> First-time or minor violations typically
          receive a warning
        </li>
        <li>
          <strong>Content Removal:</strong> Violating content may be removed
          from the platform
        </li>
        <li>
          <strong>Space Restrictions:</strong> Temporary or permanent removal
          from specific Spaces
        </li>
        <li>
          <strong>Account Suspension:</strong> Temporary restriction of account
          access
        </li>
        <li>
          <strong>Account Termination:</strong> Permanent removal for serious or
          repeated violations
        </li>
      </ul>

      <h2>8. Reporting and Appeals</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-primary)]/50 bg-[var(--hive-background-tertiary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-primary)]">
          TL;DR: Report violations and appeal decisions through proper channels.
        </p>
      </div>

      <h3>How to Report</h3>
      <ul>
        <li>Use the report button on posts, comments, or profiles</li>
        <li>Contact Space builders for Space-specific issues</li>
        <li>
          Email{" "}
          <a
            href="mailto:support@hive.co"
            className="text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/80"
          >
            support@hive.co
          </a>{" "}
          for serious violations
        </li>
        <li>Provide specific details and context when reporting</li>
      </ul>

      <h3>Appeals Process</h3>
      <ul>
        <li>You can appeal moderation decisions within 30 days</li>
        <li>
          Email{" "}
          <a
            href="mailto:appeals@hive.co"
            className="text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/80"
          >
            appeals@hive.co
          </a>{" "}
          with your appeal
        </li>
        <li>Include relevant context and explanation</li>
        <li>Appeals are reviewed by a different team member</li>
      </ul>

      <h2>9. Staying Updated</h2>
      <div className="mb-4 rounded border-l-4 border-[var(--hive-brand-primary)]/50 bg-[var(--hive-background-tertiary)]/50 p-4">
        <p className="mb-2 font-medium text-[var(--hive-brand-primary)]">
          TL;DR: Guidelines may evolve as our community grows.
        </p>
      </div>

      <p>
        These guidelines may be updated as HIVE grows and evolves. We'll notify
        the community of significant changes and always aim to maintain the core
        values of respect, authenticity, and growth.
      </p>

      <h2>10. Questions and Support</h2>
      <p>If you have questions about these guidelines or need support:</p>
      <ul>
        <li>
          Community Questions:{" "}
          <a
            href="mailto:community@hive.co"
            className="text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/80"
          >
            community@hive.co
          </a>
        </li>
        <li>
          Safety Concerns:{" "}
          <a
            href="mailto:safety@hive.co"
            className="text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/80"
          >
            safety@hive.co
          </a>
        </li>
        <li>
          General Support:{" "}
          <a
            href="mailto:support@hive.co"
            className="text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/80"
          >
            support@hive.co
          </a>
        </li>
      </ul>

      <div className="mt-12 border-t border-gray-800 pt-8">
        <h3 className="text-lg font-semibold text-[var(--hive-brand-primary)]">Version History</h3>
        <div className="mt-4 space-y-2 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              Version 2025-01-15 (Current) - Initial Community Guidelines
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const metadata: Metadata = {
  title: "Community Guidelines | HIVE",
  description:
    "Community Guidelines for HIVE - standards for respectful and productive community interaction.",
};

export default function CommunityGuidelinesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-950/50">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center gap-2 px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to HIVE
              </Link>
              <div className="h-6 w-px bg-gray-700" />
              <div className="flex items-center gap-2 text-gray-400">
                <Heart className="h-4 w-4" />
                <span className="text-sm">Community Standards</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Effective: {CURRENT_GUIDELINES.effectiveDate}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">
            {CURRENT_GUIDELINES.title}
          </h1>
          <p className="text-gray-400">
            Version {CURRENT_GUIDELINES.version} • Effective{" "}
            {CURRENT_GUIDELINES.effectiveDate}
          </p>
        </div>

        <div className="text-gray-300">{CURRENT_GUIDELINES.content}</div>
      </div>
      </div>
    </Suspense>
  );
}
