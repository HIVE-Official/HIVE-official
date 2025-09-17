import React from 'react';

export const CheckEmailInfo: React.FC = () => {
  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Check your email</h2>
      <p className="text-muted-foreground">
        We've sent you a magic link to sign in.
      </p>
    </div>
  );
};