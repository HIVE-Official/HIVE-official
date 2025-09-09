'use client';

import { useState, useCallback } from 'react';

export function useCopyLink() {
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyLink = useCallback(async (path: string, id?: string) => {
    try {
      const url = `${window.location.origin}${path}`;
      await navigator.clipboard.writeText(url);
      
      setCopied(true);
      if (id) setCopiedId(id);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
        setCopiedId(null);
      }, 2000);
      
      return true;
    } catch (error) {
      console.error('Failed to copy link:', error);
      
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = `${window.location.origin}${path}`;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        if (id) setCopiedId(id);
        
        setTimeout(() => {
          setCopied(false);
          setCopiedId(null);
        }, 2000);
        
        return true;
      } catch (err) {
        console.error('Fallback copy failed:', err);
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, []);

  const copyPostLink = useCallback((spaceId: string, postId: string) => {
    return copyLink(`/spaces/${spaceId}/posts/${postId}`, postId);
  }, [copyLink]);

  const copySpaceLink = useCallback((spaceId: string) => {
    return copyLink(`/spaces/${spaceId}`, spaceId);
  }, [copyLink]);

  const copyProfileLink = useCallback((userId: string) => {
    return copyLink(`/profile/${userId}`, userId);
  }, [copyLink]);

  return {
    copyLink,
    copyPostLink,
    copySpaceLink,
    copyProfileLink,
    copied,
    copiedId,
    isCopied: (id: string) => copied && copiedId === id
  };
}