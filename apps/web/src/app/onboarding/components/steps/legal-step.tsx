import { MotionDiv } from '@hive/ui';
import { Shield, FileText, Eye, Users } from 'lucide-react';
import { Button } from '@hive/ui';
import type { OnboardingData } from '../onboarding-wizard';

interface LegalStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

function Checkbox({ id, checked, onCheckedChange, children }: {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start space-x-3">
      <button
        type="button"
        id={id}
        onClick={() => onCheckedChange(!checked)}
        className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          checked
            ? 'bg-yellow-500 border-yellow-500'
            : 'border-zinc-600 hover:border-zinc-500'
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      <label htmlFor={id} className="text-sm text-zinc-300 cursor-pointer">
        {children}
      </label>
    </div>
  );
}

export function LegalStep({ data, updateData, onNext }: LegalStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.acceptedTerms && data.acceptedPrivacy) {
      onNext();
    }
  };

  const canProceed = data.acceptedTerms && data.acceptedPrivacy;

  return (
    <MotionDiv
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          Privacy & Terms
        </h2>
        <p className="text-zinc-400">
          Please review and accept our terms to continue using HIVE.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Legal Documents */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-blue-500" />
                <h3 className="font-medium text-white">Terms of Service</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Our terms outline how you can use HIVE, your rights, and our responsibilities.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                onClick={() => window.open('/legal/terms', '_blank')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Read Terms
              </Button>
            </div>

            <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-500" />
                <h3 className="font-medium text-white">Privacy Policy</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Learn how we collect, use, and protect your personal information.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                onClick={() => window.open('/legal/privacy', '_blank')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Read Policy
              </Button>
            </div>
          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-4">
          <Checkbox
            id="terms-checkbox"
            checked={data.acceptedTerms}
            onCheckedChange={(checked) => updateData({ acceptedTerms: checked })}
          >
            I have read and agree to the{' '}
            <button
              type="button"
              onClick={() => window.open('/legal/terms', '_blank')}
              className="text-yellow-500 hover:text-yellow-400 underline"
            >
              Terms of Service
            </button>
          </Checkbox>

          <Checkbox
            id="privacy-checkbox"
            checked={data.acceptedPrivacy}
            onCheckedChange={(checked) => updateData({ acceptedPrivacy: checked })}
          >
            I have read and agree to the{' '}
            <button
              type="button"
              onClick={() => window.open('/legal/privacy', '_blank')}
              className="text-yellow-500 hover:text-yellow-400 underline"
            >
              Privacy Policy
            </button>
          </Checkbox>
        </div>

        {/* Privacy Highlights */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-white mb-2">
                Your Privacy Matters
              </h4>
              <ul className="text-sm text-zinc-300 space-y-1">
                <li>• We only collect data necessary for HIVE to function</li>
                <li>• Your academic information stays within your school network</li>
                <li>• You control what information is visible to other students</li>
                <li>• We never sell your personal data to third parties</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!canProceed}
            className={`px-8 py-3 font-medium ${
              canProceed
                ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
            }`}
          >
            {canProceed ? 'Continue to HIVE' : 'Please accept terms to continue'}
          </Button>
        </div>

        <div className="bg-zinc-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-2">
            Questions about our policies?
          </h4>
          <p className="text-xs text-zinc-400">
            Contact us at{' '}
            <a href="mailto:privacy@hive.app" className="text-yellow-500 hover:text-yellow-400">
              privacy@hive.app
            </a>{' '}
            if you have any questions about our terms or privacy practices.
          </p>
        </div>
      </form>
    </MotionDiv>
  );
} 