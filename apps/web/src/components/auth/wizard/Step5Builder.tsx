'use client';

import { Label } from '@hive/ui/src/components/ui/label';
import { Switch } from '@hive/ui/src/components/ui/switch';
import { FlaskConical } from "lucide-react";

interface Step5BuilderProps {
  formData: {
    isBuilder: boolean;
  };
  updateFormData: (field: string, value: boolean) => void;
}

export function Step5Builder({ formData, updateFormData }: Step5BuilderProps) {
  return (
    <div className="text-center space-y-4 p-4">
        <div className="flex justify-center items-center">
            <div className="p-3 rounded-full bg-accent-gold/20">
                 <FlaskConical className="h-8 w-8 text-accent-gold" />
            </div>
        </div>
        <h2 className="text-xl font-bold">Become a Builder?</h2>
        <p className="text-muted max-w-xs mx-auto">
            Place tools, create new experiences, and help shape the future of campus life in the HiveLAB beta.
        </p>
      
      <div className="flex items-center justify-center space-x-2 pt-4">
        <Switch
          id="builder-mode"
          checked={formData.isBuilder}
          onCheckedChange={(checked: boolean) =>
            updateFormData('isBuilder', checked)
          }
        />
        <Label htmlFor="builder-mode" className="text-lg">
          Join HiveLAB beta
        </Label>
      </div>
    </div>
  );
} 