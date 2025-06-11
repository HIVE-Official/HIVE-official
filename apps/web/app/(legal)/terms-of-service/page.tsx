import { HIVE_TERMS_OF_SERVICE } from "@/lib/legal";

export default function TermsOfServicePage() {
    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold text-primary mb-2">HIVE Terms of Service</h1>
                <p className="text-muted mb-8">Effective Date: {HIVE_TERMS_OF_SERVICE.effectiveDate}</p>
                
                <div className="prose prose-invert prose-p:text-muted prose-headings:text-primary prose-a:text-accent-gold hover:prose-a:text-accent-gold-hover">
                    {HIVE_TERMS_OF_SERVICE.sections.map((section, index) => (
                        <section key={index} className="mb-6">
                            <h2 className="text-2xl font-semibold">{section.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: section.content }} />
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
} 