"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "@hive/ui";
import { ArrowLeft, Loader, Zap, Users, Lightbulb, AlertCircle } from "lucide-react";
import { authenticatedFetch } from "@/lib/auth/utils/auth-utils";

export default function RequestActivationPage() {
  const params = useParams();
  const router = useRouter();
  const spaceId = params.spaceId as string;
  
  const [formData, setFormData] = useState({
    connection: '',
    connectionDetails: '',
    reason: '',
    firstToolIdea: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [autoApproved, setAutoApproved] = useState(false);

  const connectionOptions = [
    { value: 'major', label: "I'm a student in this major", example: "CS major requesting CS Majors space" },
    { value: 'ta', label: "I'm a TA for this subject", example: "TA for CSE 115" },
    { value: 'leader', label: "I lead a related group", example: "President of ACM chapter" },
    { value: 'other', label: "Other connection", example: "Describe your connection" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const response = await authenticatedFetch(`/api/spaces/${spaceId}/request-activation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          connection: formData.connection,
          connectionDetails: formData.connection === 'other' ? formData.connectionDetails : undefined,
          reason: formData.reason,
          firstToolIdea: formData.firstToolIdea,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }
      
      if (data.autoApproved) {
        setAutoApproved(true);
        setSuccess(true);
        // Redirect to space after delay
        setTimeout(() => {
          router.push(`/spaces/${spaceId}`);
        }, 3000);
      } else {
        setSuccess(true);
        // Redirect back to spaces list
        setTimeout(() => {
          router.push('/spaces');
        }, 2000);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          {autoApproved ? (
            <>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-neutral-400 mb-6">
                Your request was automatically approved! You're now the leader of this space.
              </p>
              <p className="text-sm text-neutral-500">
                Redirecting to your space...
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-hive-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-hive-gold" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-4">
                Request Submitted!
              </h2>
              <p className="text-neutral-400 mb-6">
                Your request to lead this space has been submitted and will be reviewed within 24 hours.
              </p>
              <p className="text-sm text-neutral-500">
                Redirecting to spaces...
              </p>
            </>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => router.back()}
              className="text-neutral-400 hover:text-[var(--hive-text-inverse)]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-[var(--hive-text-inverse)]">
                Request to Lead Space
              </h1>
              <p className="text-sm text-neutral-400">
                Apply to activate and lead this community
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Info Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-hive-gold/[0.05] to-transparent border-hive-gold/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-hive-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-hive-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--hive-text-inverse)] mb-2">
                Become a Founding Builder
              </h3>
              <p className="text-sm text-neutral-400 mb-3">
                As the space leader, you'll shape this community, plant the first tools, 
                and help members connect and collaborate.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/[0.05] rounded-full text-xs text-neutral-300">
                  🏆 Founding Builder Badge
                </span>
                <span className="px-3 py-1 bg-white/[0.05] rounded-full text-xs text-neutral-300">
                  ⚡ Instant Activation (if eligible)
                </span>
                <span className="px-3 py-1 bg-white/[0.05] rounded-full text-xs text-neutral-300">
                  🛠️ Tool Creation Access
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Connection Type */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">
              Your Connection
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              How are you connected to this space?
            </p>
            <div className="space-y-3">
              {connectionOptions.map((option: any) => (
                <label
                  key={option.value}
                  className="flex items-start gap-3 p-4 rounded-lg border border-white/10 hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="connection"
                    value={option.value}
                    checked={formData.connection === option.value}
                    onChange={(e) => setFormData({ ...formData, connection: e.target.value })}
                    className="mt-1"
                    required
                  />
                  <div className="flex-1">
                    <div className="font-medium text-[var(--hive-text-inverse)]">
                      {option.label}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                      {option.example}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            
            {formData.connection === 'other' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Describe your connection
                </label>
                <input
                  type="text"
                  value={formData.connectionDetails}
                  onChange={(e) => setFormData({ ...formData, connectionDetails: e.target.value })}
                  className="w-full px-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-[var(--hive-text-inverse)] placeholder:text-neutral-500 focus:border-hive-gold focus:outline-none"
                  placeholder="e.g., Former club president, department volunteer..."
                  required={formData.connection === 'other'}
                />
              </div>
            )}
          </Card>

          {/* Reason */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">
              Why You?
            </h3>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Tell us why you're the right person to lead this space (2-3 sentences)
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-lg text-[var(--hive-text-inverse)] placeholder:text-neutral-500 focus:border-hive-gold focus:outline-none resize-none"
              placeholder="Share your experience, vision, or passion for this community..."
              rows={4}
              minLength={10}
              required
            />
            <div className="text-xs text-neutral-500 mt-2">
              {formData.reason.length}/500 characters
            </div>
          </Card>

          {/* First Tool */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">
              Your First Tool
            </h3>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              What's the first tool you'll plant for this community?
            </label>
            <input
              type="text"
              value={formData.firstToolIdea}
              onChange={(e) => setFormData({ ...formData, firstToolIdea: e.target.value })}
              className="w-full px-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-[var(--hive-text-inverse)] placeholder:text-neutral-500 focus:border-hive-gold focus:outline-none"
              placeholder="e.g., Study group scheduler, Resource library, Event calendar..."
              required
            />
            <p className="text-xs text-neutral-500 mt-2">
              Tools are interactive utilities that help your community collaborate
            </p>
          </Card>

          {/* Error Display */}
          {error && (
            <Card className="p-4 border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            </Card>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 border-white/20 text-[var(--hive-text-inverse)] hover:bg-white/10"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.connection || !formData.reason || !formData.firstToolIdea}
              className="flex-1 bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}