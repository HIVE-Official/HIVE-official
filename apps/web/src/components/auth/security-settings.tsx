'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  Smartphone,
  Key,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Globe,
  Monitor,
  MapPin,
  Clock,
  UserX,
  Bell,
  Download,
  Trash2,
  RefreshCw,
  ChevronRight,
  Info,
  Settings,
  Loader2,
  Copy,
  QrCode,
  FileText,
  LogOut
} from 'lucide-react';
import { Button, Badge, Switch } from '@hive/ui';
import { cn } from '../../lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import { authenticatedFetch } from '../../lib/auth-utils';

interface SecuritySession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: Date;
  isCurrent: boolean;
}

interface BackupCode {
  code: string;
  used: boolean;
  usedAt?: Date;
}

interface SecurityLog {
  id: string;
  type: 'login' | 'logout' | 'password_change' | 'settings_change' | 'failed_login' | 'recovery';
  description: string;
  timestamp: Date;
  ipAddress: string;
  location?: string;
  device?: string;
}

interface SecuritySettingsProps {
  userId: string;
  className?: string;
}

export function SecuritySettings({ userId, className = '' }: SecuritySettingsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'password' | 'twofactor' | 'sessions' | 'privacy' | 'logs'>('overview');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Security Status
  const [securityScore, setSecurityScore] = useState(0);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [backupCodes, setBackupCodes] = useState<BackupCode[]>([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [sessions, setSessions] = useState<SecuritySession[]>([]);
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  
  // Settings
  const [settings, setSettings] = useState({
    // Password
    passwordLastChanged: new Date(),
    requirePasswordChange: false,
    
    // 2FA
    twoFactorMethod: 'app' as 'app' | 'sms' | 'email',
    twoFactorPhone: '',
    twoFactorEmail: '',
    
    // Sessions
    sessionTimeout: 30, // days
    rememberDevice: true,
    
    // Privacy
    profileVisibility: 'campus' as 'public' | 'campus' | 'friends' | 'private',
    showOnlineStatus: true,
    allowMessages: 'everyone' as 'everyone' | 'friends' | 'none',
    shareLocation: false,
    shareActivity: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    securityAlerts: true,
    loginAlerts: true,
    
    // Data
    dataExportEnabled: true,
    deleteAccountEnabled: false
  });

  // Password change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  
  // 2FA setup
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [setupStep, setSetupStep] = useState<'method' | 'setup' | 'verify' | 'backup'>('method');

  useEffect(() => {
    fetchSecurityData();
  }, [userId]);

  const fetchSecurityData = async () => {
    setLoading(true);
    try {
      const [statusRes, sessionsRes, logsRes] = await Promise.all([
        authenticatedFetch(`/api/users/${userId}/security/status`),
        authenticatedFetch(`/api/users/${userId}/security/sessions`),
        authenticatedFetch(`/api/users/${userId}/security/logs`)
      ]);

      if (statusRes.ok) {
        const status = await statusRes.json();
        setSecurityScore(calculateSecurityScore(status));
        setTwoFactorEnabled(status.twoFactorEnabled);
        setSettings(prev => ({ ...prev, ...status.settings }));
      }

      if (sessionsRes.ok) {
        const sessionsData = await sessionsRes.json();
        setSessions(sessionsData.sessions || []);
      }

      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setSecurityLogs(logsData.logs || []);
      }
    } catch (error) {
      console.error('Error fetching security data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSecurityScore = (status: any): number => {
    let score = 0;
    if (status.emailVerified) score += 20;
    if (status.twoFactorEnabled) score += 30;
    if (status.passwordStrong) score += 20;
    if (status.backupCodesGenerated) score += 10;
    if (status.recentPasswordChange) score += 10;
    if (status.secureSettings) score += 10;
    return Math.min(score, 100);
  };

  const getSecurityLevel = (score: number): { label: string; color: string } => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-400' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-400' };
    if (score >= 40) return { label: 'Fair', color: 'text-yellow-400' };
    return { label: 'Poor', color: 'text-red-400' };
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setSaving(true);
    try {
      const response = await authenticatedFetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      if (response.ok) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        alert('Password changed successfully');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    } finally {
      setSaving(false);
    }
  };

  const enable2FA = async () => {
    setSaving(true);
    try {
      const response = await authenticatedFetch('/api/auth/2fa/enable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: settings.twoFactorMethod
        })
      });

      if (response.ok) {
        const data = await response.json();
        setQrCode(data.qrCode);
        setBackupCodes(data.backupCodes);
        setSetupStep('setup');
      }
    } catch (error) {
      console.error('Error enabling 2FA:', error);
    } finally {
      setSaving(false);
    }
  };

  const verify2FA = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) return;

    setSaving(true);
    try {
      const response = await authenticatedFetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (response.ok) {
        setTwoFactorEnabled(true);
        setSetupStep('backup');
      }
    } catch (error) {
      console.error('Error verifying 2FA:', error);
    } finally {
      setSaving(false);
    }
  };

  const disable2FA = async () => {
    if (!confirm('Are you sure you want to disable two-factor authentication?')) return;

    setSaving(true);
    try {
      const response = await authenticatedFetch('/api/auth/2fa/disable', {
        method: 'POST'
      });

      if (response.ok) {
        setTwoFactorEnabled(false);
        setBackupCodes([]);
      }
    } catch (error) {
      console.error('Error disabling 2FA:', error);
    } finally {
      setSaving(false);
    }
  };

  const revokeSession = async (sessionId: string) => {
    try {
      const response = await authenticatedFetch(`/api/auth/sessions/${sessionId}/revoke`, {
        method: 'POST'
      });

      if (response.ok) {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
      }
    } catch (error) {
      console.error('Error revoking session:', error);
    }
  };

  const updatePrivacySetting = async (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    try {
      await authenticatedFetch('/api/users/privacy-settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value })
      });
    } catch (error) {
      console.error('Error updating privacy setting:', error);
    }
  };

  const exportData = async () => {
    try {
      const response = await authenticatedFetch('/api/users/export-data', {
        method: 'POST'
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hive-data-${format(new Date(), 'yyyy-MM-dd')}.json`;
        a.click();
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const securityLevel = getSecurityLevel(securityScore);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
              Security Settings
            </h2>
            <p className="text-sm text-neutral-400">
              Manage your account security and privacy
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-[var(--hive-text-inverse)]">
              {securityScore}%
            </div>
            <div className={cn('text-sm font-medium', securityLevel.color)}>
              {securityLevel.label}
            </div>
          </div>
        </div>

        {/* Security Score Bar */}
        <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${securityScore}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={cn(
              'h-full',
              securityScore >= 80 ? 'bg-green-400' :
              securityScore >= 60 ? 'bg-blue-400' :
              securityScore >= 40 ? 'bg-yellow-400' :
              'bg-red-400'
            )}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="text-center">
            <div className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2',
              twoFactorEnabled ? 'bg-green-500/20' : 'bg-red-500/20'
            )}>
              <Smartphone className={cn(
                'h-6 w-6',
                twoFactorEnabled ? 'text-green-400' : 'text-red-400'
              )} />
            </div>
            <div className="text-xs text-neutral-400">2FA</div>
            <div className={cn(
              'text-xs font-medium',
              twoFactorEnabled ? 'text-green-400' : 'text-red-400'
            )}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Monitor className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-xs text-neutral-400">Sessions</div>
            <div className="text-xs font-medium text-blue-400">
              {sessions.length} Active
            </div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-purple-400" />
            </div>
            <div className="text-xs text-neutral-400">Privacy</div>
            <div className="text-xs font-medium text-purple-400 capitalize">
              {settings.profileVisibility}
            </div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="text-xs text-neutral-400">Last Login</div>
            <div className="text-xs font-medium text-yellow-400">
              2 hours ago
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: Shield },
          { id: 'password', label: 'Password', icon: Lock },
          { id: 'twofactor', label: '2FA', icon: Smartphone },
          { id: 'sessions', label: 'Sessions', icon: Monitor },
          { id: 'privacy', label: 'Privacy', icon: Eye },
          { id: 'logs', label: 'Activity', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm flex items-center gap-2 whitespace-nowrap transition-all',
              activeTab === tab.id
                ? 'bg-white/10 text-[var(--hive-text-inverse)] border border-white/20'
                : 'bg-white/5 text-neutral-400 hover:bg-white/[0.07]'
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Security Recommendations */}
            <div className="bg-white/5 rounded-lg border border-white/10 p-4">
              <h3 className="font-medium text-[var(--hive-text-inverse)] mb-3">
                Security Recommendations
              </h3>
              
              <div className="space-y-3">
                {!twoFactorEnabled && (
                  <div className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-yellow-300 font-medium">Enable Two-Factor Authentication</p>
                      <p className="text-xs text-yellow-300/80 mt-1">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setActiveTab('twofactor')}
                      className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300"
                    >
                      Enable
                    </Button>
                  </div>
                )}

                {backupCodes.length === 0 && twoFactorEnabled && (
                  <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <Key className="h-5 w-5 text-orange-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-orange-300 font-medium">Generate Backup Codes</p>
                      <p className="text-xs text-orange-300/80 mt-1">
                        Create backup codes in case you lose access to your 2FA device
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setActiveTab('twofactor')}
                      className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300"
                    >
                      Generate
                    </Button>
                  </div>
                )}

                {securityScore >= 80 && (
                  <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-green-300 font-medium">Great Security!</p>
                      <p className="text-xs text-green-300/80 mt-1">
                        Your account is well protected. Keep up the good work!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 rounded-lg border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-[var(--hive-text-inverse)]">
                  Recent Activity
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('logs')}
                  className="text-neutral-400"
                >
                  View All
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {securityLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-2 h-2 rounded-full',
                        log.type === 'failed_login' ? 'bg-red-400' :
                        log.type === 'login' ? 'bg-green-400' :
                        'bg-blue-400'
                      )} />
                      <div>
                        <p className="text-sm text-[var(--hive-text-inverse)]">
                          {log.description}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {log.location} • {log.device}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-400">
                      {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'password' && (
          <motion.div
            key="password"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="bg-white/5 rounded-lg border border-white/10 p-4">
              <h3 className="font-medium text-[var(--hive-text-inverse)] mb-4">
                Change Password
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] placeholder-neutral-500 focus:outline-none focus:border-white/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    >
                      {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    New Password
                  </label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] placeholder-neutral-500 focus:outline-none focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] placeholder-neutral-500 focus:outline-none focus:border-white/20"
                  />
                </div>

                <Button
                  onClick={changePassword}
                  disabled={!currentPassword || !newPassword || !confirmPassword || saving}
                  className="w-full bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Changing...
                    </>
                  ) : (
                    'Change Password'
                  )}
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-neutral-400">
                  Last changed: {formatDistanceToNow(settings.passwordLastChanged, { addSuffix: true })}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'sessions' && (
          <motion.div
            key="sessions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {sessions.map(session => (
              <div key={session.id} className="bg-white/5 rounded-lg border border-white/10 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Monitor className="h-5 w-5 text-blue-400" />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-[var(--hive-text-inverse)]">
                          {session.device}
                        </h4>
                        {session.isCurrent && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-neutral-400">
                        {session.browser} • {session.location}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {session.ipAddress} • Last active {formatDistanceToNow(new Date(session.lastActive), { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  {!session.isCurrent && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => revokeSession(session.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10"
            >
              Sign Out All Other Sessions
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}