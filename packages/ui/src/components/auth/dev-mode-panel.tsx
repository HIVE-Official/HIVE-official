"use client";

import React from "react";
import { useAuth } from "@hive/auth-logic";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export function DevModePanel() {
  const { devMode, setDevModeConfig } = useAuth();

  // Only render in development
  if (process.env.NODE_ENV === 'production' || !devMode || !setDevModeConfig) {
    return null;
  }

  const handleToggleEnabled = (checked: boolean) => {
    setDevModeConfig({ enabled: checked });
  };

  const handleToggleSkipOnboarding = (checked: boolean) => {
    setDevModeConfig({ skipOnboarding: checked });
  };

  const handleToggleAuthError = (checked: boolean) => {
    setDevModeConfig({
      simulateErrors: {
        ...devMode.simulateErrors,
        auth: checked,
      },
    });
  };

  const handleToggleNetworkError = (checked: boolean) => {
    setDevModeConfig({
      simulateErrors: {
        ...devMode.simulateErrors,
        network: checked,
      },
    });
  };

  const handleToggleOnboardingError = (checked: boolean) => {
    setDevModeConfig({
      simulateErrors: {
        ...devMode.simulateErrors,
        onboarding: checked,
      },
    });
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const delay = parseInt(e.target.value);
    if (!isNaN(delay) && delay >= 0) {
      setDevModeConfig({ delayMs: delay });
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 p-4 w-80 bg-zinc-900 border border-zinc-800 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4" />
          <h3 className="font-medium">Developer Mode</h3>
        </div>
        <Switch
          checked={devMode.enabled}
          onCheckedChange={handleToggleEnabled}
        />
      </div>

      {devMode.enabled && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="skip-onboarding">Skip Onboarding</Label>
              <Switch
                id="skip-onboarding"
                checked={devMode.skipOnboarding}
                onCheckedChange={handleToggleSkipOnboarding}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auth-error">Simulate Auth Error</Label>
              <Switch
                id="auth-error"
                checked={devMode.simulateErrors.auth}
                onCheckedChange={handleToggleAuthError}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="network-error">Simulate Network Error</Label>
              <Switch
                id="network-error"
                checked={devMode.simulateErrors.network}
                onCheckedChange={handleToggleNetworkError}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="onboarding-error">Simulate Onboarding Error</Label>
              <Switch
                id="onboarding-error"
                checked={devMode.simulateErrors.onboarding}
                onCheckedChange={handleToggleOnboardingError}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delay">Response Delay (ms)</Label>
              <Input
                id="delay"
                type="number"
                min={0}
                value={devMode.delayMs}
                onChange={handleDelayChange}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="pt-2 border-t border-zinc-800">
              <div className="text-sm text-zinc-400">
                <p className="font-medium mb-1">Mock User</p>
                <p>Email: {devMode.mockUser.email}</p>
                <p>Name: {devMode.mockUser.fullName}</p>
                <p>Role: {devMode.mockUser.customClaims?.isBuilder ? 'Builder' : 'Student'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
} 