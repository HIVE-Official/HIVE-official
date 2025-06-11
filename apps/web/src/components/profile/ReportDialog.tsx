'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useReport } from '@/hooks/useReport';

interface ReportDialogProps {
  profileId: string;
  onClose: () => void;
}

export function ReportDialog({ profileId, onClose }: ReportDialogProps) {
  const [reason, setReason] = useState('');
  const { status, submitReport } = useReport();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim()) {
      await submitReport(profileId, 'users', reason);
      if (status !== 'error') {
        onClose();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h3 className="font-semibold">Report Profile</h3>
      <Textarea
        placeholder="Please provide a reason for reporting this profile..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={4}
        required
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="destructive" disabled={status === 'loading' || !reason.trim()}>
          {status === 'loading' ? 'Submitting...' : 'Submit Report'}
        </Button>
      </div>
      {status === 'error' && <p className="text-sm text-red-500">Failed to submit report. Please try again.</p>}
    </form>
  );
} 