import React from 'react';

export interface EmailGateProps {
  children?: React.ReactNode;
  onEmailSubmit?: (email: string) => void;
}

export const EmailGate: React.FC<EmailGateProps> = ({ children }) => {
  return <div>{children}</div>;
};