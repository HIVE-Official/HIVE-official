/**
 * UniversalShell
 * Simple shell component that wraps children
 * TODO: Implement proper shell with navigation, etc.
 */

import React from 'react';

interface UniversalShellProps {
  children: React.ReactNode;
}

const UniversalShell: React.FC<UniversalShellProps> = ({ children }) => {
  return <>{children}</>;
};

export default UniversalShell;
