import { z } from 'zod';
export declare const SessionStatus: {
    readonly AUTHENTICATED: "authenticated";
    readonly UNAUTHENTICATED: "unauthenticated";
    readonly LOADING: "loading";
    readonly ERROR: "error";
};
export type SessionStatusType = typeof SessionStatus[keyof typeof SessionStatus];
export declare const SessionSchema: any;
export type Session = z.infer<typeof SessionSchema>;
export interface SessionConfig {
    maxInactiveTime: number;
}
export declare class SessionManager {
    private config;
    private inactivityTimeout?;
    private renewalTimeout?;
    constructor(config?: Partial<SessionConfig>);
    initializeSession(session: Session): void;
    resetInactivityTimer(): void;
    private scheduleRenewal;
    private handleInactiveSession;
    private renewSession;
    validateSession(session: Session): boolean;
    clearTimers(): void;
    private emitSessionEvent;
}
export declare const sessionManager: SessionManager;
export declare const useSessionManager: () => {
    validateSession: (session: Session) => boolean;
    resetInactivityTimer: () => void;
    initializeSession: (session: Session) => void;
    clearTimers: () => void;
};
//# sourceMappingURL=session.d.ts.map