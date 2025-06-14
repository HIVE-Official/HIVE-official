import { motion } from 'framer-motion';
import { Shield, FileText, Eye, Check } from 'lucide-react';
import { OnboardingData } from '../onboarding-wizard';

interface LegalStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

function Label({ htmlFor, className, children }: { htmlFor?: string; className?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none cursor-pointer ${className}`}>
      {children}
    </label>
  );
}

function Checkbox({ id, checked, onCheckedChange }: { 
  id: string; 
  checked: boolean; 
  onCheckedChange: (checked: boolean) => void; 
}) {
  return (
    <button
      type="button"
      id={id}
      onClick={() => onCheckedChange(!checked)}
      className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors ${
        checked 
          ? 'bg-yellow-500 border-yellow-500' 
          : 'border-zinc-600 bg-transparent hover:border-zinc-500'
      }`}
    >
      {checked && <Check className="w-3 h-3 text-black" />}
    </button>
  );
}

export function LegalStep({ data, updateData, onNext }: LegalStepProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          Almost there!
        </h2>
        <p className="text-zinc-400">
          Just need you to review and accept our terms to complete your profile.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800/50 rounded-lg space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <h4 className="text-white font-medium">Terms of Service</h4>
            </div>
            <p className="text-sm text-zinc-400">
              Guidelines for using HIVE responsibly and respectfully in your campus community.
            </p>
            <button
              type="button"
              className="text-blue-400 hover:text-blue-300 text-sm underline"
              onClick={() => window.open('/legal/terms', '_blank')}
            >
              Read Terms →
            </button>
          </div>

          <div className="p-4 bg-zinc-800/50 rounded-lg space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-purple-500" />
              </div>
              <h4 className="text-white font-medium">Privacy Policy</h4>
            </div>
            <p className="text-sm text-zinc-400">
              How we protect your data and what information we collect to improve your experience.
            </p>
            <button
              type="button"
              className="text-purple-400 hover:text-purple-300 text-sm underline"
              onClick={() => window.open('/legal/privacy', '_blank')}
            >
              Read Privacy Policy →
            </button>
          </div>
        </div>

        <div className="bg-zinc-800/30 rounded-lg p-4 space-y-4">
          <h4 className="text-white font-medium">Key Points:</h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
              <span>Your data stays within your school&apos;s community</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
              <span>We never sell your personal information</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
              <span>You can delete your account and data anytime</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
              <span>Content you create belongs to you</span>
            </li>
          </ul>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-zinc-800/50 rounded-lg">
          <Checkbox
            id="consent"
            checked={data.hasConsented}
            onCheckedChange={(checked) => updateData({ hasConsented: checked })}
          />
          <div className="space-y-1">
            <Label
              htmlFor="consent"
              className="text-white font-medium"
            >
              I agree to the Terms of Service and Privacy Policy
            </Label>
            <p className="text-xs text-zinc-400">
              By checking this box, you confirm that you&apos;ve read and agree to our terms and privacy policy, and that you&apos;re eligible to create an account.
            </p>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">
                Age Verification
              </h4>
              <p className="text-sm text-zinc-300">
                By continuing, you confirm that you are at least 13 years old and have the right to enter into this agreement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 