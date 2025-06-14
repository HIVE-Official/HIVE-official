'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@hive/ui/components/avatar';
import { Button } from '@hive/ui/components/button';
import { Textarea } from '@hive/ui/components/textarea';
import { useAuth, useUser } from '@clerk/nextjs'; // Assuming Clerk for auth
import { createPost } from '@hive/api-client/src/feed'; // Will create this
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface CreatePostProps {
  spaceId: string;
}

export function CreatePost({ spaceId }: CreatePostProps) {
  const { user } = useUser();
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost: { spaceId: string; content: string }) => createPost(newPost.spaceId, newPost.content),
    onSuccess: () => {
      toast.success('Your post has been published.');
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['feed', spaceId] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to publish post.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      mutation.mutate({ spaceId, content });
    }
  };

  if (!user) return null;

  return (
    <div className="flex space-x-4 rounded-lg bg-neutral-900 p-4">
      <Avatar>
        <AvatarImage src={user.imageUrl} alt={user.fullName ?? ''} />
        <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <form onSubmit={handleSubmit} className="flex-1">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full bg-neutral-800 text-white placeholder:text-neutral-500"
          rows={3}
          disabled={mutation.isPending}
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={!content.trim() || mutation.isPending}>
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Post
          </Button>
        </div>
      </form>
    </div>
  );
} 