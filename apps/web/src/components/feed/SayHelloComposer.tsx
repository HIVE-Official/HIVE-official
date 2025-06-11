'use client';

import { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useMutation } from '@tanstack/react-query';
import { Textarea } from '@hive/ui/components/ui/textarea';
import { Button } from '@hive/ui/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const sayHelloFn = httpsCallable(getFunctions(), 'feed-sayHello');

export function SayHelloComposer() {
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (newMessage: string) => sayHelloFn({ message: newMessage }),
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Your "Hello" has been posted.',
      });
      setMessage('');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to post your message. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      mutate(message);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Say Hello to your community!</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="What's on your mind? (140 characters max)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={140}
          required
          disabled={isPending}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending || !message.trim()}>
            {isPending ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </form>
    </div>
  );
} 