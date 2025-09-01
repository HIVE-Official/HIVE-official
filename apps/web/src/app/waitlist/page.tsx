'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { HiveLogo, Button, Input, Card } from '@hive/ui';

export const dynamic = 'force-dynamic';

interface WaitlistFormData {
  email: string;
  firstName: string;
  lastName: string;
}

function WaitlistPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Extract school parameters
  const schoolId = searchParams?.get('schoolId') || null;
  const schoolName = searchParams?.get('schoolName') || null;
  const schoolDomain = searchParams?.get('domain') || null;
  const signupCount = parseInt(searchParams?.get('signupCount') || '0');
  const threshold = parseInt(searchParams?.get('threshold') || '350');

  const [formData, setFormData] = useState<WaitlistFormData>({ 
    email: '', 
    firstName: '',
    lastName: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Redirect if missing required school context
  useEffect(() => {
    if (!schoolId || !schoolName || !schoolDomain) {
      router.push('/schools');
    }
  }, [schoolId, schoolName, schoolDomain, router]);

  // Show loading if redirecting due to missing school context
  if (!schoolId || !schoolName || !schoolDomain) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 text-accent animate-spin mx-auto" />
          <p className="text-muted">Redirecting to school selection...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    // Email validation for school domain (but be flexible for waitlist)
    if (schoolDomain !== 'test.edu') {
      const emailDomain = formData.email.split('@')[1]?.toLowerCase();
      if (emailDomain !== schoolDomain.toLowerCase()) {
        setError(`Please use your @${schoolDomain} email address`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          schoolId,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to join waitlist');
      }
    } catch (error) {
      console.error('Waitlist signup error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const progressPercentage = Math.min((signupCount / threshold) * 100, 100);
  const remainingSignups = Math.max(threshold - signupCount, 0);

  if (success) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-success/20 border border-success/30">
            <Sparkles className="w-8 h-8 text-success" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-foreground">
              You&apos;re on the waitlist! 🎉
            </h1>
            <p className="text-muted">
              Welcome to the <span className="text-accent font-semibold">{schoolName}</span> waitlist.
            </p>
            <p className="text-sm text-muted">
              We&apos;ll email you at <span className="text-accent">{formData.email}</span> when HIVE launches at your school.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <Button
              onClick={() => router.push('/schools')}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Back to Schools
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.02)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,215,0,0.03)_0%,transparent_50%)]" />
      
      {/* Header */}
      <div className="relative z-10 border-b border-accent/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/schools" 
              className="group flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-base"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-base" />
              <span className="text-sm font-medium">Back to schools</span>
            </Link>
            
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/landing" className="hover:opacity-80 transition-opacity duration-base">
                <HiveLogo size="md" color="gold" withText={true} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          
          {/* Progress Section */}
          <div className="mb-8">
            <Card className="p-6 bg-surface border-accent/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">{schoolName}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <Users className="w-3 h-3" />
                    <span>{signupCount}/{threshold}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Progress to launch</span>
                    <span className="text-xs font-medium text-accent">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-accent to-yellow-400 h-2 rounded-full transition-all duration-base"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted">
                    {remainingSignups === 0 ? 'Launching soon!' : `${remainingSignups} more students needed`}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Join the waitlist
            </h1>
            <p className="text-muted leading-relaxed">
              Be the first to know when HIVE launches at <span className="text-accent font-semibold">{schoolName}</span>
            </p>
          </div>

          {/* Waitlist Form */}
          <Card className="p-6 bg-surface border-accent/20">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First name
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="First name"
                    required
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last name
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Last name"
                    required
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  School email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={schoolDomain === 'test.edu' ? 'Enter any email (dev mode)' : `Enter your @${schoolDomain} address`}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  className={`w-full ${error ? 'border-red-500' : ''}`}
                />
              </div>

              {error && (
                <Card className="p-3 bg-error/10 border-error/20">
                  <p className="text-sm text-error">{error}</p>
                </Card>
              )}

              <Button
                type="submit"
                disabled={isLoading || !formData.email || !formData.firstName || !formData.lastName}
                variant="accent"
                size="lg"
                className="w-full"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Joining waitlist...</span>
                  </div>
                ) : (
                  'Join waitlist'
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

function WaitlistPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 text-[var(--hive-brand-primary)] animate-spin" />
          <span className="text-[var(--hive-text-secondary)]">Loading...</span>
        </div>
      </div>
    }>
      <WaitlistPageContent />
    </Suspense>
  );
}

export default function WaitlistPage() {
  return <WaitlistPageWrapper />;
}