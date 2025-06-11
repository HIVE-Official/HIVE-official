'use client';

import { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuth } from '@/hooks/useAuth';

const reportContentCallable = httpsCallable(getFunctions(), 'feed-reportContent');

type ReportStatus = 'idle' | 'loading' | 'success' | 'error';

export function useReport() {
    const { user } = useAuth();
    const [status, setStatus] = useState<ReportStatus>('idle');
    const [error, setError] = useState<string | null>(null);

    const submitReport = async (contentId: string, contentType: string, reason: string) => {
        if (!user) {
            setError("You must be logged in to perform this action.");
            setStatus('error');
            return;
        }

        setStatus('loading');
        setError(null);

        try {
            const result = await reportContentCallable({ contentId, contentType, reason });
            if (result.data.status === 'success') {
                setStatus('success');
            } else {
                throw new Error('Report submission failed.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to send report.');
        } finally {
            setStatus('idle');
        }
    };

    return { status, error, submitReport };
} 