/**
 * useMagicLink Hook
 *
 * Manages magic link authentication flow including sending,
 * verification, and error handling for HIVE email-based auth.
 */
"use client";
import { useState, useCallback } from 'react';
import { AUTH_ROUTES, MAGIC_LINK_CONFIG, AUTH_ERROR_CODES, AUTH_ERROR_MESSAGES } from '../constants.js';
export function useMagicLink() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [emailSent, setEmailSent] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [lastRequest, setLastRequest] = useState(null);
    const [lastRequestTime, setLastRequestTime] = useState(null);
    // Send magic link
    const sendMagicLink = useCallback(async (request) => {
        // Check rate limiting
        if (lastRequestTime) {
            const timeSinceLastRequest = Date.now() - lastRequestTime.getTime();
            const cooldownRemaining = MAGIC_LINK_CONFIG.RESEND_COOLDOWN * 1000 - timeSinceLastRequest;
            if (cooldownRemaining > 0) {
                const secondsRemaining = Math.ceil(cooldownRemaining / 1000);
                throw new Error(`Please wait ${secondsRemaining} seconds before requesting another link.`);
            }
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(AUTH_ROUTES.API.SEND_MAGIC_LINK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...request,
                    // Add timestamp for security
                    timestamp: Date.now()
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                // Handle specific error codes
                switch (errorData.code) {
                    case AUTH_ERROR_CODES.TOO_MANY_REQUESTS:
                        throw new Error('Too many requests. Please try again in an hour.');
                    case AUTH_ERROR_CODES.INVALID_EMAIL:
                        throw new Error(AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INVALID_EMAIL]);
                    default:
                        throw new Error(errorData.message || AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR]);
                }
            }
            const responseData = await response.json();
            setEmailSent(true);
            setLastRequest(request);
            setLastRequestTime(new Date());
            // If response includes verification requirement (e.g., for testing)
            if (responseData.requiresVerification) {
                setIsVerifying(true);
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR];
            setError(errorMessage);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    }, [lastRequestTime]);
    // Verify magic link
    const verifyMagicLink = useCallback(async (verification) => {
        setIsVerifying(true);
        setError(null);
        try {
            const response = await fetch(AUTH_ROUTES.API.VERIFY_MAGIC_LINK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...verification,
                    // Add timestamp for security
                    timestamp: Date.now()
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                // Handle specific error codes
                switch (errorData.code) {
                    case AUTH_ERROR_CODES.INVALID_MAGIC_LINK:
                        throw new Error(AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INVALID_MAGIC_LINK]);
                    case AUTH_ERROR_CODES.EXPIRED_MAGIC_LINK:
                        throw new Error(AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.EXPIRED_MAGIC_LINK]);
                    case AUTH_ERROR_CODES.MAGIC_LINK_USED:
                        throw new Error(AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.MAGIC_LINK_USED]);
                    case AUTH_ERROR_CODES.TOO_MANY_REQUESTS:
                        throw new Error('Too many verification attempts. Please request a new link.');
                    default:
                        throw new Error(errorData.message || AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR]);
                }
            }
            // Verification successful - the response should contain session data
            const responseData = await response.json();
            // Reset state on successful verification
            setEmailSent(false);
            setLastRequest(null);
            setLastRequestTime(null);
            return responseData;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR];
            setError(errorMessage);
            throw error;
        }
        finally {
            setIsVerifying(false);
        }
    }, []);
    // Resend magic link
    const resendMagicLink = useCallback(async () => {
        if (!lastRequest) {
            throw new Error('No previous request to resend');
        }
        await sendMagicLink(lastRequest);
    }, [lastRequest, sendMagicLink]);
    // Reset hook state
    const reset = useCallback(() => {
        setIsLoading(false);
        setError(null);
        setEmailSent(false);
        setIsVerifying(false);
        setLastRequest(null);
        setLastRequestTime(null);
    }, []);
    // Calculate cooldown remaining
    const getCooldownRemaining = useCallback(() => {
        if (!lastRequestTime)
            return 0;
        const timeSinceLastRequest = Date.now() - lastRequestTime.getTime();
        const cooldownRemaining = MAGIC_LINK_CONFIG.RESEND_COOLDOWN * 1000 - timeSinceLastRequest;
        return Math.max(0, Math.ceil(cooldownRemaining / 1000));
    }, [lastRequestTime]);
    return {
        isLoading,
        error,
        emailSent,
        isVerifying,
        sendMagicLink,
        verifyMagicLink,
        resendMagicLink,
        reset,
        // Additional utilities
        canResend: getCooldownRemaining() === 0,
        cooldownRemaining: getCooldownRemaining(),
        lastRequestEmail: lastRequest?.email
    };
}
//# sourceMappingURL=use-magic-link.js.map