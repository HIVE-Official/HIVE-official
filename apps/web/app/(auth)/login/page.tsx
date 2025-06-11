'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { LoginForm, Button, Input } from '@hive/ui';
import { fadeIn } from '@/lib/motion';
import Image from "next/image";
import { Mail } from "lucide-react";

const LoginPage: FC = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-sm">
        {/* HIVE Logo */}
        <div className="flex justify-center mb-12 animate-fade-in-up">
          <Image
            src="/assets/images/hivelogo.png"
            alt="HIVE Logo"
            width={120}
            height={32}
            className="object-contain"
          />
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border/10 rounded-lg shadow-lg p-8 md:p-10 space-y-6 animate-fade-in">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">Welcome back.</h1>
            <p className="text-muted">Sign in with your .edu email</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 