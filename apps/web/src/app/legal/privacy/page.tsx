import { type Metadata } from "next";
// import Link from "next/link"; // Unused import removed

export const metadata: Metadata = {
  title: "Privacy Policy | HIVE",
  description: "Privacy Policy for HIVE platform",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-accent">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-8">
            Last updated: [Date]
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              complete your profile, or contact us for support.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the information we collect to provide, maintain, and improve our services, 
              communicate with you, and personalize your experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Information Sharing</h2>
            <p className="text-gray-300 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Data Security</h2>
            <p className="text-gray-300 mb-4">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Your Rights</h2>
            <p className="text-gray-300 mb-4">
              You have the right to access, update, or delete your personal information. 
              Contact us if you wish to exercise these rights.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
