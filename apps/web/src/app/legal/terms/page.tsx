import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | HIVE",
  description: "Terms of Service for HIVE platform",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-accent">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-8">
            Last updated: [Date]
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-4">
              By accessing and using HIVE, you accept and agree to be bound by the terms and 
              provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Description of Service</h2>
            <p className="text-gray-300 mb-4">
              HIVE is a social platform designed exclusively for verified college students to 
              connect, collaborate, and engage with their campus community.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Eligibility</h2>
            <p className="text-gray-300 mb-4">
              You must be a currently enrolled student at an accredited university or college 
              with a valid .edu email address to use HIVE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">4. User Conduct</h2>
            <p className="text-gray-300 mb-4">
              Users agree to use HIVE responsibly and in accordance with our Community Guidelines.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Privacy</h2>
            <p className="text-gray-300 mb-4">
              Your privacy is important to us. Please review our Privacy Policy to understand 
              how we collect, use, and protect your information.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
