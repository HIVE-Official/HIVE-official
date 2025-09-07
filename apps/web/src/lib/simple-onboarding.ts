// Temporary simple onboarding implementation to unblock core functionality
// TODO: Re-enable full transaction-manager.ts after fixing syntax issues

import { dbAdmin } from './firebase-admin';
import { logger } from './logger';

export interface TransactionResult<T = any> {
  success: boolean;
  data?: T;
  error?: Error;
  operationsCompleted: string[];
  operationsFailed: string[];
  duration: number;
}

export class TransactionError extends Error {
  constructor(
    message: string,
    public readonly operation: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'TransactionError';
  }
}

export async function executeOnboardingTransaction(
  userId: string,
  userEmail: string,
  onboardingData: any,
  normalizedHandle: string,
  context?: { requestId?: string }
): Promise<TransactionResult<{ updatedUserData: any; normalizedHandle: string }>> {
  const startTime = Date.now();
  const operationsCompleted: string[] = [];
  const operationsFailed: string[] = [];

  try {
    logger.info('Starting simplified onboarding transaction', {
      userId,
      userEmail,
      handle: normalizedHandle
    });

    const now = new Date();
    const updatedUserData = {
      fullName: onboardingData.fullName,
      userType: onboardingData.userType,
      firstName: onboardingData.firstName,
      lastName: onboardingData.lastName,
      major: onboardingData.major,
      academicLevel: onboardingData.academicLevel,
      graduationYear: onboardingData.graduationYear,
      handle: normalizedHandle,
      avatarUrl: onboardingData.avatarUrl || '',
      builderRequestSpaces: onboardingData.builderRequestSpaces,
      consentGiven: onboardingData.consentGiven,
      consentGivenAt: now,
      onboardingCompleted: true,
      onboardingCompletedAt: now,
      updatedAt: now,
    };

    // Simple direct update without full transaction complexity
    await dbAdmin.collection('users').doc(userId).update(updatedUserData);
    operationsCompleted.push('update_user_profile');

    const duration = Date.now() - startTime;

    return {
      success: true,
      data: { updatedUserData, normalizedHandle },
      operationsCompleted,
      operationsFailed,
      duration
    };

  } catch (error: unknown) {
    const duration = Date.now() - startTime;
    
    logger.error('Simplified onboarding failed', {
      userId,
      userEmail,
      error: error instanceof Error ? error.message : String(error)
    });

    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
      operationsCompleted,
      operationsFailed,
      duration
    };
  }
}

export async function executeBuilderRequestCreation(
  userId: string,
  userEmail: string,
  userName: string,
  spaceIds: string[],
  userType: 'student' | 'alumni' | 'faculty',
  context?: { requestId?: string }
): Promise<TransactionResult<void>> {
  const startTime = Date.now();
  const operationsCompleted: string[] = [];
  const operationsFailed: string[] = [];

  try {
    logger.info('Creating builder requests', {
      userId,
      spaceCount: spaceIds.length
    });

    // Simple batch creation without complex transaction handling
    const batch = dbAdmin.batch();
    const now = new Date();
    
    for (const spaceId of spaceIds) {
      const requestId = `${userId}_${spaceId}_${Date.now()}`;
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      
      const builderRequest = {
        id: requestId,
        userId,
        userName,
        userEmail,
        userType,
        spaceId,
        requestReason: userType === 'faculty' ? 'Faculty management access request' : 'Builder access request',
        status: 'pending' as const,
        submittedAt: now,
        expiresAt,
        metadata: {
          onboardingRequest: true,
          submissionSource: 'onboarding_flow'
        }
      };
      
      batch.set(
        dbAdmin.collection('builderRequests').doc(requestId),
        builderRequest
      );
      
      operationsCompleted.push(`builder_request_${spaceId}`);
    }
    
    await batch.commit();

    const duration = Date.now() - startTime;

    return {
      success: true,
      operationsCompleted,
      operationsFailed,
      duration
    };

  } catch (error: unknown) {
    const duration = Date.now() - startTime;

    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
      operationsCompleted,
      operationsFailed,
      duration
    };
  }
}