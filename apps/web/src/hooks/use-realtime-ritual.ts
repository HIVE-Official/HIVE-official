"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '@hive/core';
import { doc, onSnapshot, collection, query, where, orderBy, limit, Unsubscribe } from 'firebase/firestore';
import { useAuth } from '@hive/auth-logic';

export interface RealtimeRitualData {
  id: string;
  name: string;
  title: string;
  description: string;
  type: string;
  status: string;
  stats: {
    totalParticipants: number;
    activeParticipants: number;
    completedParticipants: number;
    averageProgress: number;
    lastActivityAt: Date;
  };
  userParticipation?: {
    id: string;
    status: string;
    progressPercentage: number;
    actionsCompleted: any[];
    milestonesReached: any[];
    currentStreak: number;
    longestStreak: number;
    lastActivityAt: Date;
  };
  recentActivity: Array<{
    type: 'join' | 'complete_action' | 'milestone_reached';
    userId: string;
    userName: string;
    timestamp: Date;
    actionId?: string;
    milestoneId?: string;
  }>;
  milestones: Array<{
    id: string;
    name: string;
    description: string;
    isReached: boolean;
    reachedAt?: Date;
    participantsCompleted: number;
  }>;
}

export interface RitualUpdate {
  type: 'stats' | 'participation' | 'milestone' | 'activity';
  data: any;
  timestamp: Date;
}

/**
 * Real-time ritual participation hook
 * Provides instant updates on ritual progress, participation, and milestones
 */
export function useRealtimeRitual(ritualId: string | null) {
  const { user } = useAuth();
  const [ritualData, setRitualData] = useState<RealtimeRitualData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveUpdates, setLiveUpdates] = useState<RitualUpdate[]>([]);

  const unsubscribersRef = useRef<Map<string, Unsubscribe>>(new Map());

  // Clean up listeners on unmount
  useEffect(() => {
    return () => {
      unsubscribersRef.current.forEach((unsubscribe) => unsubscribe());
      unsubscribersRef.current.clear();
    };
  }, []);

  // Main ritual data listener
  useEffect(() => {
    if (!ritualId || !user) {
      setRitualData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // 1. Listen to main ritual document
    const ritualDocRef = doc(db, 'rituals', ritualId);
    const unsubscribeRitual = onSnapshot(ritualDocRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setError('Ritual not found');
          setIsLoading(false);
          return;
        }

        const ritualInfo = snapshot.data();

        setRitualData(prev => ({
          ...prev,
          id: ritualId,
          name: ritualInfo.name,
          title: ritualInfo.title,
          description: ritualInfo.description,
          type: ritualInfo.type,
          status: ritualInfo.status,
          stats: {
            totalParticipants: ritualInfo.stats?.totalParticipants || 0,
            activeParticipants: ritualInfo.stats?.activeParticipants || 0,
            completedParticipants: ritualInfo.stats?.completedParticipants || 0,
            averageProgress: ritualInfo.stats?.averageProgress || 0,
            lastActivityAt: ritualInfo.stats?.lastActivityAt?.toDate() || new Date()
          },
          userParticipation: prev?.userParticipation,
          recentActivity: prev?.recentActivity || [],
          milestones: prev?.milestones || []
        }));

        setIsLoading(false);

        // Broadcast stats update
        setLiveUpdates(prev => [...prev.slice(-4), {
          type: 'stats',
          data: ritualInfo.stats,
          timestamp: new Date()
        }]);
      },
      (error) => {
        console.error('Error listening to ritual:', error);
        setError('Failed to load ritual data');
        setIsLoading(false);
      }
    );

    unsubscribersRef.current.set('ritual', unsubscribeRitual);

    // 2. Listen to user's participation
    const participationQuery = query(
      collection(db, 'ritual_participation'),
      where('ritualId', '==', ritualId),
      where('userId', '==', user.id),
      where('campusId', '==', 'ub-buffalo'),
      limit(1)
    );

    const unsubscribeParticipation = onSnapshot(participationQuery, (snapshot) => {
      let userParticipation = null;

      if (!snapshot.empty) {
        const participationDoc = snapshot.docs[0];
        const participationData = participationDoc.data();

        userParticipation = {
          id: participationDoc.id,
          status: participationData.status,
          progressPercentage: participationData.progressPercentage || 0,
          actionsCompleted: participationData.actionsCompleted || [],
          milestonesReached: participationData.milestonesReached || [],
          currentStreak: participationData.currentStreak || 0,
          longestStreak: participationData.longestStreak || 0,
          lastActivityAt: participationData.lastActivityAt?.toDate() || new Date()
        };
      }

      setRitualData(prev => prev ? {
        ...prev,
        userParticipation: userParticipation || undefined
      } : prev);

      // Broadcast participation update
      setLiveUpdates(prev => [...prev.slice(-4), {
        type: 'participation',
        data: userParticipation,
        timestamp: new Date()
      }]);
    });

    unsubscribersRef.current.set('participation', unsubscribeParticipation);

    // 3. Listen to milestone completions
    const milestonesQuery = query(
      collection(db, 'rituals', ritualId, 'milestones'),
      orderBy('participantsCompleted', 'desc')
    );

    const unsubscribeMilestones = onSnapshot(milestonesQuery, (snapshot) => {
      const milestones = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          description: data.description || '',
          isReached: data.isReached || false,
          reachedAt: data.reachedAt?.toDate(),
          participantsCompleted: data.participantsCompleted || 0
        };
      });

      setRitualData(prev => prev ? {
        ...prev,
        milestones
      } : prev);

      // Check for newly reached milestones
      snapshot.docChanges().forEach(change => {
        if (change.type === 'modified') {
          const milestoneData = change.doc.data();
          if (milestoneData.isReached && milestoneData.reachedAt) {
            const reachedTime = milestoneData.reachedAt.toDate();
            // Only broadcast if reached in last 30 seconds (real-time)
            if (Date.now() - reachedTime.getTime() < 30000) {
              setLiveUpdates(prev => [...prev.slice(-4), {
                type: 'milestone',
                data: {
                  milestoneId: change.doc.id,
                  name: milestoneData.name,
                  description: milestoneData.description,
                  participantsCompleted: milestoneData.participantsCompleted
                },
                timestamp: new Date()
              }]);
            }
          }
        }
      });
    });

    unsubscribersRef.current.set('milestones', unsubscribeMilestones);

    // 4. Listen to recent ritual activity
    const recentActivityQuery = query(
      collection(db, 'ritual_action_completions'),
      where('ritualId', '==', ritualId),
      where('campusId', '==', 'ub-buffalo'),
      orderBy('completedAt', 'desc'),
      limit(10)
    );

    const unsubscribeActivity = onSnapshot(recentActivityQuery, (snapshot) => {
      const recentActivity = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          type: 'complete_action' as const,
          userId: data.userId,
          userName: data.userName || 'Anonymous',
          timestamp: data.completedAt?.toDate() || new Date(),
          actionId: data.actionId
        };
      });

      setRitualData(prev => prev ? {
        ...prev,
        recentActivity
      } : prev);

      // Broadcast new activity
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const activityData = change.doc.data();
          const completedAt = activityData.completedAt?.toDate();

          // Only broadcast very recent activity (last 10 seconds)
          if (completedAt && Date.now() - completedAt.getTime() < 10000) {
            setLiveUpdates(prev => [...prev.slice(-4), {
              type: 'activity',
              data: {
                userId: activityData.userId,
                userName: activityData.userName || 'Someone',
                actionId: activityData.actionId
              },
              timestamp: new Date()
            }]);
          }
        }
      });
    });

    unsubscribersRef.current.set('activity', unsubscribeActivity);

    // Cleanup function
    return () => {
      unsubscribersRef.current.forEach((unsubscribe) => unsubscribe());
      unsubscribersRef.current.clear();
    };

  }, [ritualId, user]);

  // Clear old updates periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUpdates(prev => prev.filter(update =>
        Date.now() - update.timestamp.getTime() < 60000 // Keep last minute
      ));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const joinRitual = useCallback(async () => {
    if (!ritualId || !user) return false;

    try {
      const response = await fetch(`/api/rituals/${ritualId}/participate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({
          action: 'join',
          entryPoint: 'realtime_hook'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to join ritual');
      }

      return true;
    } catch (error) {
      console.error('Error joining ritual:', error);
      return false;
    }
  }, [ritualId, user]);

  const completeAction = useCallback(async (actionId: string, metadata?: any) => {
    if (!ritualId || !user) return false;

    try {
      const response = await fetch(`/api/rituals/${ritualId}/participate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({
          action: 'complete_action',
          actionId,
          metadata: metadata || {},
          entryPoint: 'realtime_hook'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to complete action');
      }

      const result = await response.json();
      return result.progress;
    } catch (error) {
      console.error('Error completing ritual action:', error);
      return false;
    }
  }, [ritualId, user]);

  return {
    // Data
    ritual: ritualData,
    isLoading,
    error,
    liveUpdates,

    // Computed values
    isParticipating: !!ritualData?.userParticipation,
    userProgress: ritualData?.userParticipation?.progressPercentage || 0,
    isCompleted: ritualData?.userParticipation?.status === 'completed',

    // Actions
    joinRitual,
    completeAction,

    // Real-time indicators
    hasRecentActivity: liveUpdates.some(update =>
      Date.now() - update.timestamp.getTime() < 30000
    ),
    participantCount: ritualData?.stats.activeParticipants || 0
  };
}

/**
 * Hook for ritual list with real-time updates
 */
export function useRealtimeRitualsList() {
  const { user } = useAuth();
  const [rituals, setRituals] = useState<RealtimeRitualData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setRituals([]);
      setIsLoading(false);
      return;
    }

    const ritualsQuery = query(
      collection(db, 'rituals'),
      where('status', 'in', ['active', 'scheduled']),
      where('universities', 'array-contains', 'university_buffalo'),
      orderBy('stats.lastActivityAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(ritualsQuery, (snapshot) => {
      const ritualsList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          title: data.title,
          description: data.description,
          type: data.type,
          status: data.status,
          stats: {
            totalParticipants: data.stats?.totalParticipants || 0,
            activeParticipants: data.stats?.activeParticipants || 0,
            completedParticipants: data.stats?.completedParticipants || 0,
            averageProgress: data.stats?.averageProgress || 0,
            lastActivityAt: data.stats?.lastActivityAt?.toDate() || new Date()
          },
          recentActivity: [],
          milestones: []
        };
      });

      setRituals(ritualsList);
      setIsLoading(false);
    }, (error) => {
      console.error('Error loading rituals list:', error);
      setError('Failed to load rituals');
      setIsLoading(false);
    });

    return unsubscribe;
  }, [user]);

  return {
    rituals,
    isLoading,
    error
  };
}