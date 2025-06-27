import { Metadata } from "next";
// import Link from "next/link"; // Unused import removed

export const metadata: Metadata = {
  title: "Community Guidelines | HIVE",
  description: "Community Guidelines for HIVE platform",
};

export default function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-h1 font-display font-semibold mb-8 text-accent">Community Guidelines</h1>
        
        <div className="space-y-8">
          <p className="text-body font-sans text-muted mb-8">
            Last updated: [Date]
          </p>

          <section className="mb-8">
            <h2 className="text-h2 font-display font-semibold mb-4 text-foreground">1. Be Respectful</h2>
            <p className="text-body font-sans text-muted mb-4 leading-relaxed">
              Treat all community members with respect and kindness. Harassment, hate speech, 
              and discriminatory behavior are not tolerated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 font-display font-semibold mb-4 text-foreground">2. Keep It Academic</h2>
            <p className="text-body font-sans text-muted mb-4 leading-relaxed">
              HIVE is designed for educational and campus-related discussions. Keep content 
              relevant to student life and academic pursuits.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 font-display font-semibold mb-4 text-foreground">3. No Spam or Self-Promotion</h2>
            <p className="text-body font-sans text-muted mb-4 leading-relaxed">
              Avoid excessive self-promotion, spam, or irrelevant content. Focus on meaningful 
              contributions to the community.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 font-display font-semibold mb-4 text-foreground">4. Protect Privacy</h2>
            <p className="text-body font-sans text-muted mb-4 leading-relaxed">
              Respect others&apos; privacy and do not share personal information without consent. 
              What happens in HIVE stays in HIVE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 font-display font-semibold mb-4 text-foreground">5. Report Issues</h2>
            <p className="text-body font-sans text-muted mb-4 leading-relaxed">
              Help us maintain a positive environment by reporting inappropriate content 
              or behavior to our moderation team.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
