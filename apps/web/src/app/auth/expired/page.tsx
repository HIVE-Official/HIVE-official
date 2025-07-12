import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function ExpiredPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div 
        className="w-full max-w-md bg-surface rounded-xl p-8 text-center space-y-6 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
        style={{
          border: '1px solid rgba(255, 215, 0, 0.15)',
        }}
      >
        <div className="mx-auto w-12 h-12 bg-surface rounded-full flex items-center justify-center mb-4">
          <XCircle className="w-6 h-6 text-muted" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-sans font-bold text-foreground">Link Expired</h1>
          <p className="text-muted font-sans">
            This magic link has expired or has already been used.
          </p>
        </div>
        
        <p className="text-sm text-muted font-sans">
          Magic links expire after 15 minutes for security reasons.
        </p>
        
        <Link 
          href="/auth/school-select"
          className="w-full inline-block px-6 py-3 font-sans font-bold rounded-xl transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] hover:scale-[1.02] hover:border-[#FFD700]/60 focus:outline-none text-foreground text-center border border-[#FFD700]/15"
        >
          Get a new link
        </Link>
      </div>
    </div>
  );
} 