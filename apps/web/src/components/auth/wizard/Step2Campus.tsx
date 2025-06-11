import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hive/ui';
import { Button } from '@hive/ui';

interface Step2CampusProps {
  formData: {
    major: string;
    gradYear: string;
  };
  updateFormData: (field: string, value: string) => void;
}

// In a real app, this would come from a database or a larger constants file.
const MAJORS = [
  "Computer Science",
  "Business Administration",
  "Psychology",
  "Biology",
  "Engineering",
  "Communications",
  "Art & Design",
  "Other",
];

export function Step2Campus({ formData, updateFormData }: Step2CampusProps) {
  const currentYear = new Date().getFullYear();
  const gradYears = Array.from({ length: 7 }, (_, i) => (currentYear + i).toString());

  return (
    <div className="space-y-4 text-left">
        <div>
            <label htmlFor="major" className="block text-sm font-medium text-muted mb-1">
                Major
            </label>
            <Select
              value={formData.major}
              onValueChange={(value) => updateFormData('major', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your major" />
              </SelectTrigger>
              <SelectContent>
                {MAJORS.map((major) => (
                  <SelectItem key={major} value={major}>{major}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted mt-1">Used to pre‑join the right Spaces.</p>
        </div>
        <div>
            <label htmlFor="gradYear" className="block text-sm font-medium text-muted mb-1">
                Graduation Year
            </label>
             <Select
              value={formData.gradYear}
              onValueChange={(value) => updateFormData('gradYear', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your graduation year" />
              </SelectTrigger>
              <SelectContent>
                {gradYears.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
    </div>
  );
} 