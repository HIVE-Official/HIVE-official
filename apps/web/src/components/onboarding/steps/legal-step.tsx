"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Checkbox } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { FileCheck, Loader2, ExternalLink } from 'lucide-react';
import { logger } from '@hive/core';

export function OnboardingLegalStep() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  
  const [acceptTerms, setAcceptTerms] = useState(onboardingData?.consentGiven || false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(onboardingData?.consentGiven || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!acceptTerms || !acceptPrivacy) return;
    
    setIsLoading(true);
    
    try {
      await update({
        consentGiven: true
      });

      logger.info('Legal consent given');
      router.push('/onboarding/name');
      
    } catch (error) {
      logger.error('Failed to save legal consent:', error);
      setIsLoading(false);
    }
  };

  const isFormValid = acceptTerms && acceptPrivacy;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card border-border">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <FileCheck className="w-6 h-6 text-accent" />
          </div>
          <CardTitle className="text-xl font-display text-card-foreground">
            Terms & Privacy
          </CardTitle>
          <CardDescription className="text-muted-foreground font-sans">
            Please review and accept our terms to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Terms of Service */}
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <h3 className="font-medium text-card-foreground mb-2">Terms of Service</h3>
              <p className="text-sm text-muted-foreground mb-3">
                By using HIVE, you agree to our community guidelines, acceptable use policy, 
                and terms of service. This includes respectful interaction with other users 
                and appropriate use of our platform.
              </p>
              <a 
                href="/terms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors"
              >
                Read Full Terms
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="accept-terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-1"
              />
              <label 
                htmlFor="accept-terms" 
                className="text-sm text-card-foreground cursor-pointer leading-relaxed"
              >
                I agree to the Terms of Service and Community Guidelines
              </label>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <h3 className="font-medium text-card-foreground mb-2">Privacy Policy</h3>
              <p className="text-sm text-muted-foreground mb-3">
                We respect your privacy and are committed to protecting your personal data. 
                Our privacy policy explains how we collect, use, and safeguard your information 
                on the HIVE platform.
              </p>
              <a 
                href="/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors"
              >
                Read Privacy Policy
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="accept-privacy"
                checked={acceptPrivacy}
                onCheckedChange={(checked) => setAcceptPrivacy(checked as boolean)}
                className="mt-1"
              />
              <label 
                htmlFor="accept-privacy" 
                className="text-sm text-card-foreground cursor-pointer leading-relaxed"
              >
                I agree to the Privacy Policy and understand how my data will be used
              </label>
            </div>
          </div>

          {/* Important Notice */}
          <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> HIVE is designed for verified students with .edu email addresses. 
              By continuing, you confirm you are a current student at an accredited institution.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full h-12"
            disabled={!isFormValid || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'I Agree'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 