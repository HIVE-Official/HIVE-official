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
        <h1 className="text-4xl font-bold mb-8 text-accent">Community Guidelines</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-8">
            Last updated: [Date]
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Be Respectful</h2>
            <p className="text-gray-300 mb-4">
              Treat all community members with respect and kindness. Harassment, hate speech, 
              and discriminatory behavior are not tolerated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Keep It Academic</h2>
            <p className="text-gray-300 mb-4">
              HIVE is designed for educational and campus-related discussions. Keep content 
              relevant to student life and academic pursuits.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. No Spam or Self-Promotion</h2>
            <p className="text-gray-300 mb-4">
              Avoid excessive self-promotion, spam, or irrelevant content. Focus on meaningful 
              contributions to the community.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Protect Privacy</h2>
            <p className="text-gray-300 mb-4">
              Respect others&apos; privacy and do not share personal information without consent. 
              What happens in HIVE stays in HIVE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Report Issues</h2>
            <p className="text-gray-300 mb-4">
              Help us maintain a positive environment by reporting inappropriate content 
              or behavior to our moderation team.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
