"use client";
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
// import { useAuth } from "@hive/hooks";
// import { WelcomeMat, useWelcomeMat } from "@hive/ui";

interface WelcomeMatContextType {
  isVisible: boolean;
  showWelcomeMat: () => void;
  hideWelcomeMat: () => void;
}

const WelcomeMatContext = createContext<WelcomeMatContextType | undefined>(undefined);

export const WelcomeMatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showWelcomeMat = useCallback(() => setIsVisible(true), []);
  const hideWelcomeMat = useCallback(() => setIsVisible(false), []);

  const value = useMemo(() => ({
    isVisible,
    showWelcomeMat,
    hideWelcomeMat
  }), [isVisible, showWelcomeMat, hideWelcomeMat]);

  return (
    <WelcomeMatContext.Provider value={value}>
      {children}
    </WelcomeMatContext.Provider>
  );
};

export const useWelcomeMat = () => {
  const context = useContext(WelcomeMatContext);
  if (context === undefined) {
    throw new Error('useWelcomeMat must be used within a WelcomeMatProvider');
  }
  return context;
};
