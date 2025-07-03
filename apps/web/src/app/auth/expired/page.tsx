import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hive/ui';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function ExpiredPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-6 h-6 text-red-500" />
          </div>
          <CardTitle className="text-white">Link Expired</CardTitle>
          <CardDescription className="text-zinc-400">
            This magic link has expired or has already been used.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-zinc-500">
            Magic links expire after 15 minutes for security reasons.
          </p>
          <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
            <Link href="/welcome">Get a new link</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 