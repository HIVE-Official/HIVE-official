import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

/**
 * Calls the `createPost` Cloud Function.
 * @param {string} spaceId The ID of the space to post in.
 * @param {string} content The text content of the post.
 */
export const createPost = async (spaceId: string, content: string): Promise<any> => {
  const createPostCallable = httpsCallable(functions, 'createPost');
  return await createPostCallable({ spaceId, content });
}; 