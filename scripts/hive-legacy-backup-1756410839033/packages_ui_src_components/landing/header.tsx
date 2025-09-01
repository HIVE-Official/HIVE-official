import React from 'react';
import { Badge } from '../badge';

export interface HeaderProps {
  onLogin?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onLogin,
  className = "",
}) => {
  return (
    <header className={`px-6 pt-8 ${className}`}>
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-black tracking-tight text-accent font-display">
            HIVE
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="border-border text-muted font-mono text-xs">
            v1.0 BETA
          </Badge>
          
          {onLogin && (
            <button
              onClick={onLogin}
              className="text-sm font-medium text-muted hover:text-accent transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};