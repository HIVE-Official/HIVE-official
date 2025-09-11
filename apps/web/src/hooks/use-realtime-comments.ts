import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  QueryConstraint,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Comment {
  id: string;
  postId: string;
  parentId?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: string[];
  mentions: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  edited?: boolean;
  deleted?: boolean;
}

interface UseRealtimeCommentsReturn {
  comments: Comment[] | null;
  loading: boolean;
  error: Error | null;
}

export function useRealtimeComments(
  postId: string,
  spaceId?: string
): UseRealtimeCommentsReturn {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!postId) {
      setComments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build the query
      const constraints: QueryConstraint[] = [
        orderBy('createdAt', 'asc')
      ];

      // Determine the collection path
      let commentsRef;
      if (spaceId) {
        commentsRef = collection(db, 'spaces', spaceId, 'posts', postId, 'comments');
      } else {
        // Fallback to global posts collection if no spaceId
        commentsRef = collection(db, 'posts', postId, 'comments');
      }

      const q = query(commentsRef, ...constraints);

      // Set up real-time listener
      const unsubscribe = onSnapshot(
        q,
        (snapshot: any) => {
          const commentsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Comment));

          setComments(commentsData);
          setLoading(false);
        },
        (err: any) => {
          console.error('Error fetching comments:', err);
          setError(err as Error);
          setLoading(false);
        }
      );

      // Cleanup subscription
      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up comments listener:', err);
      setError(err as Error);
      setLoading(false);
    }
  }, [postId, spaceId]);

  return { comments, loading, error };
}