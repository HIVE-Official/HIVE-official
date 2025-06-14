import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hive/ui/components/ui/card';
import { Button } from '@hive/ui/components/button';
import { Clock } from 'lucide-react';
import Link from 'next/link';

export default function ExpiredPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
          <CardTitle className="text-white">Magic link expired</CardTitle>
          <CardDescription className="text-zinc-400">
            This sign-in link is no longer valid
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-zinc-500">
            Magic links expire after 15 minutes for security. Please request a new one to continue.
          </p>
          
          <div className="space-y-2">
            <Link href="/welcome">
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                Get a new magic link
              </Button>
            </Link>
          </div>
          
          <div className="pt-4 border-t border-zinc-800">
            <p className="text-xs text-zinc-600">
              Still having trouble? Make sure you&apos;re using the latest link from your email.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 