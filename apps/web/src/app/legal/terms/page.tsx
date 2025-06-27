import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | HIVE",
  description: "Terms of Service for HIVE platform",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-h1 font-display font-semibold mb-8 text-accent">Terms of Service</h1>
        
        <div className="space-y-8">
          <p className="text-body font-sans text-muted mb-8">
            Last updated: [Date]
          </p>

          <section className="mb-8">
            <h2 className="text-h2 font-display font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p className="text-body font-sans text-muted mb-4 leading-relaxed">
              By accessing and using HIVE, you accept and agree to be bound by the terms and 
              provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 font-display font-semibold mb-4 text-foreground">2. Description of Service</h2>
            <p className="text-body font-sans text-muted mb-4 leading-relaxed">
              HIVE is a social platform designed exclusively for verified college students to 
              connect, collaborate, and engage with their campus community.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 font-display font-semibold mb-4 text-foreground">3. Eligibility</h2>
            <p className="text-body font-sans text-muted mb-4 leading-relaxed">
              You must be a currently enrolled student at an accredited university or college 
              with a valid .edu email address to use HIVE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 font-display font-semibold mb-4 text-foreground">4. User Conduct</h2>
            <p className="text-body font-sans text-muted mb-4 leading-relaxed">
              Users agree to use HIVE responsibly and in accordance with our Community Guidelines.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 font-display font-semibold mb-4 text-foreground">5. Privacy</h2>
            <p className="text-body font-sans text-muted mb-4 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy to understand 
              how we collect, use, and protect your information.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
