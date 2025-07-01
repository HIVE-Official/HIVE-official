"use client";
import React, { createContext, useContext, useState } from 'react';
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

  const showWelcomeMat = () => setIsVisible(true);
  const hideWelcomeMat = () => setIsVisible(false);

  return (
    <WelcomeMatContext.Provider value={{ isVisible, showWelcomeMat, hideWelcomeMat }}>
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
