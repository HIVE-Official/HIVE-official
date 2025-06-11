'use client';

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/button/Button';
import { fadeIn } from '@/lib/motion';
import { AlertTriangle } from "lucide-react";

const ExpiredLinkPage: FC = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-primary mb-2">Link Expired or Invalid</h1>
        <p className="text-muted mb-6">
          This sign-in link has either expired or has already been used. Please request a new one.
        </p>
        <Link href="/auth/login">
          <span className="bg-accent-gold text-background font-semibold px-6 py-3 rounded-md hover:bg-accent-gold-hover">
            Return to Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ExpiredLinkPage; 