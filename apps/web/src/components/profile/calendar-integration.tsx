"use client";

import React, { useState, useEffect } from 'react';
import { Button, Badge } from '@hive/ui';
import { 
  Calendar,
  Link,
  Unlink,
  RefreshCw,
  Check,
  AlertCircle,
  ChevronRight,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntegrationStatus {
  connected: boolean;
  email?: string;
  lastSync?: string;
  syncEnabled?: boolean;
}

export function CalendarIntegration() {
  const [googleStatus, setGoogleStatus] = useState<IntegrationStatus>({ connected: false });
  const [outlookStatus, setOutlookStatus] = useState<IntegrationStatus>({ connected: false });
  const [isConnecting, setIsConnecting] = useState<'google' | 'outlook' | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    checkIntegrationStatus();
  }, []);

  const checkIntegrationStatus = async () => {
    try {
      // Check Google Calendar status
      const googleResponse = await fetch('/api/profile/integrations/google');
      if (googleResponse.ok) {
        const googleData = await googleResponse.json();
        setGoogleStatus(googleData.integration || { connected: false });
      }

      // Check Outlook Calendar status (would be similar API)
      // For now, we'll just set it as not connected
      setOutlookStatus({ connected: false });
    } catch (error) {
      console.error('Error checking integration status:', error);
    }
  };

  const handleConnect = async (provider: 'google' | 'outlook') => {
    setIsConnecting(provider);
    
    try {
      if (provider === 'google') {
        const response = await fetch('/api/profile/integrations/google?action=connect');
        if (response.ok) {
          const data = await response.json();
          // Redirect to Google OAuth
          window.location.href = data.authUrl;
        }
      } else {
        // Outlook integration would be similar
        alert('Outlook integration coming soon!');
      }
    } catch (error) {
      console.error(`Error connecting ${provider}:`, error);
      alert(`Failed to connect ${provider}. Please try again.`);
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnect = async (provider: 'google' | 'outlook') => {
    if (!confirm(`Are you sure you want to disconnect ${provider} Calendar?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/profile/integrations/${provider}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        if (provider === 'google') {
          setGoogleStatus({ connected: false });
        } else {
          setOutlookStatus({ connected: false });
        }
      }
    } catch (error) {
      console.error(`Error disconnecting ${provider}:`, error);
      alert(`Failed to disconnect ${provider}. Please try again.`);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    
    try {
      // Trigger manual sync
      const response = await fetch('/api/profile/integrations/sync', {
        method: 'POST'
      });
      
      if (response.ok) {
        await checkIntegrationStatus();
        alert('Calendar sync completed!');
      }
    } catch (error) {
      console.error('Error syncing calendars:', error);
      alert('Failed to sync calendars. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Calendar Integrations</h3>
        {(googleStatus.connected || outlookStatus.connected) && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleSync}
            disabled={isSyncing}
            className="gap-2"
          >
            <RefreshCw className={cn("h-4 w-4", isSyncing && "animate-spin")} />
            Sync Now
          </Button>
        )}
      </div>

      {/* Google Calendar */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium">Google Calendar</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Sync your Google Calendar events with HIVE
              </p>
              {googleStatus.connected && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Connected as: {googleStatus.email}
                  </p>
                  {googleStatus.lastSync && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last synced: {new Date(googleStatus.lastSync).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            {googleStatus.connected ? (
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                  <Check className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDisconnect('google')}
                  className="text-red-500 hover:text-red-600"
                >
                  <Unlink className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleConnect('google')}
                disabled={isConnecting === 'google'}
                className="gap-2"
              >
                {isConnecting === 'google' ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Link className="h-4 w-4" />
                    Connect
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Outlook Calendar */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-600/10 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">Outlook Calendar</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Sync your Outlook/Office 365 events
              </p>
              {outlookStatus.connected && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Connected as: {outlookStatus.email}
                  </p>
                  {outlookStatus.lastSync && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last synced: {new Date(outlookStatus.lastSync).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            {outlookStatus.connected ? (
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                  <Check className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDisconnect('outlook')}
                  className="text-red-500 hover:text-red-600"
                >
                  <Unlink className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleConnect('outlook')}
                disabled={isConnecting === 'outlook'}
                className="gap-2"
              >
                {isConnecting === 'outlook' ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Link className="h-4 w-4" />
                    Connect
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Privacy First</p>
            <p>
              We only sync event titles, times, and locations. Your calendar data is encrypted 
              and never shared with other users without your permission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}