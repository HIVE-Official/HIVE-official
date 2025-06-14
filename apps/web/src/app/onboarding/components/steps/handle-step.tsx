import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AtSign, Check, X, Loader2 } from 'lucide-react';
import { Input } from '@hive/ui/components/input';
import { OnboardingData } from '../onboarding-wizard';

interface HandleStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

function Label({ htmlFor, className, children }: { htmlFor?: string; className?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none ${className}`}>
      {children}
    </label>
  );
}

type ValidationState = 'idle' | 'checking' | 'available' | 'taken' | 'invalid';

export function HandleStep({ data, updateData, onNext }: HandleStepProps) {
  const [validationState, setValidationState] = useState<ValidationState>('idle');
  const [validationMessage, setValidationMessage] = useState('');
  const [checkTimeout, setCheckTimeout] = useState<NodeJS.Timeout | null>(null);

  const generateSuggestion = useCallback(() => {
    if (!data.fullName) return '';
    const nameParts = data.fullName.toLowerCase().split(' ');
    if (nameParts.length >= 2) {
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];
      return `${firstName}.${lastName}`;
    }
    return nameParts[0] || '';
  }, [data.fullName]);

  useEffect(() => {
    if (!data.handle && data.fullName) {
      const suggestion = generateSuggestion();
      if (suggestion) {
        updateData({ handle: suggestion });
      }
    }
  }, [data.fullName, data.handle, updateData, generateSuggestion]);

  const validateHandle = async (handle: string) => {
    if (!handle) {
      setValidationState('idle');
      setValidationMessage('');
      return;
    }

    const handleRegex = /^[a-zA-Z0-9._-]{3,20}$/;
    if (!handleRegex.test(handle)) {
      setValidationState('invalid');
      setValidationMessage('Handle must be 3-20 characters and contain only letters, numbers, dots, hyphens, and underscores');
      return;
    }

    setValidationState('checking');
    
    try {
      const response = await fetch('/api/auth/check-handle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle }),
      });

      const result = await response.json();
      
      if (response.ok && result.available) {
        setValidationState('available');
        setValidationMessage('Handle is available!');
      } else {
        setValidationState('taken');
        setValidationMessage(result.message || 'Handle is not available');
      }
    } catch (error) {
      setValidationState('invalid');
      setValidationMessage('Error checking handle availability');
    }
  };

  const handleChange = (value: string) => {
    updateData({ handle: value });
    
    if (checkTimeout) {
      clearTimeout(checkTimeout);
    }
    
    const timeout = setTimeout(() => {
      validateHandle(value);
    }, 500);
    
    setCheckTimeout(timeout);
  };

  const getValidationIcon = () => {
    switch (validationState) {
      case 'checking':
        return <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />;
      case 'available':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'taken':
      case 'invalid':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getValidationColor = () => {
    switch (validationState) {
      case 'available':
        return 'border-green-500';
      case 'taken':
      case 'invalid':
        return 'border-red-500';
      case 'checking':
        return 'border-yellow-500';
      default:
        return 'border-zinc-700';
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
          <AtSign className="w-8 h-8 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          Choose your handle
        </h2>
        <p className="text-zinc-400">
          Your handle is how people will find and mention you on HIVE.
        </p>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="handle" className="text-white">
            Handle
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              @
            </div>
            <Input
              id="handle"
              type="text"
              placeholder="your.handle"
              value={data.handle}
              onChange={(e) => handleChange(e.target.value)}
              className={`pl-8 pr-10 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-yellow-500 ${getValidationColor()}`}
              autoFocus
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {getValidationIcon()}
            </div>
          </div>
          
          {validationMessage && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm ${
                validationState === 'available' ? 'text-green-500' :
                (validationState === 'taken' || validationState === 'invalid') ? 'text-red-500' :
                'text-yellow-500'
              }`}
            >
              {validationMessage}
            </motion.p>
          )}
        </div>

        <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-medium text-white">
            Handle Guidelines
          </h4>
          <ul className="text-xs text-zinc-400 space-y-1">
            <li>• 3-20 characters long</li>
            <li>• Letters, numbers, dots, hyphens, and underscores only</li>
            <li>• Must be unique across all of HIVE</li>
            <li>• Can&apos;t be changed later, so choose wisely!</li>
          </ul>
        </div>

        {data.fullName && validationState === 'taken' && (
          <div className="space-y-2">
            <Label className="text-white text-sm">
              Try these alternatives:
            </Label>
            <div className="flex flex-wrap gap-2">
              {[
                `${generateSuggestion()}${Math.floor(Math.random() * 100)}`,
                `${generateSuggestion().replace('.', '_')}`,
                `${generateSuggestion()}_${new Date().getFullYear()}`,
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleChange(suggestion)}
                  className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded-full transition-colors"
                >
                  @{suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </motion.div>
  );
} 