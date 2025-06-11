import { Input } from "@/components/ui/input";

interface Step1ProfileProps {
  formData: {
    fullName: string;
    preferredName: string;
  };
  updateFormData: (field: string, value: string) => void;
}

export function Step1Profile({ formData, updateFormData }: Step1ProfileProps) {
  return (
    <div className="space-y-4 text-left">
        <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-muted mb-1">
                Full Name
            </label>
            <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                required
                maxLength={40}
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="preferredName" className="block text-sm font-medium text-muted mb-1">
                Preferred Name (optional)
            </label>
             <Input
                id="preferredName"
                name="preferredName"
                type="text"
                placeholder="Johnny"
                maxLength={20}
                value={formData.preferredName}
                onChange={(e) => updateFormData('preferredName', e.target.value)}
            />
             <p className="text-xs text-muted mt-1">We'll only show your preferred name.</p>
        </div>
    </div>
  );
} 