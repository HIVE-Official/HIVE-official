"use client";

import React, { useState, useEffect } from 'react';
import { Button, Progress, Input } from '../atoms';
import { Card } from '../molecules';
import { 
  UserPlus, 
  Users, 
  Mail, 
  MessageCircle, 
  Copy,
  CheckCircle,
  ChevronRight,
  Share,
  Send,
  Sparkles,
  Heart,
  Link,
  QrCode,
  Clock,
  Award,
  Target;
} from 'lucide-react';

export interface ConnectRitualProps {currentStep?: number;
  onStepComplete?: (stepId: string, data: any) => void;
  onRitualComplete?: () => void;
  userProfile?: {
    name: string;
    handle: string;
    interests: string[];};
  className?: string;
}

const InvitationMethodStep = ({ onComplete, userProfile }: any) => {
  const [invitesSent, setInvitesSent] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [inviteCode] = useState('HIVE-' + Math.random().toString(36).substr(2, 8).toUpperCase());
  const [shareableLink] = useState(`https://hive.college/join/${inviteCode}`);
  const [copied, setCopied] = useState(false);

  const maxInvites = 5; // Limited invitations create scarcity;
  const inviteMethods = [
    {
      id: 'direct_link',
      title: 'Share Invite Link',
      description: 'Share your personal invite link with friends',
      icon: Link,
      action: 'Copy Link'
    },
    {
      id: 'text_message',
      title: 'Text Message',
      description: 'Send invites via SMS or messaging apps',
      icon: MessageCircle,
      action: 'Compose Message'
    },
    {
      id: 'email',
      title: 'Email Invitation',
      description: 'Send personalized email invitations',
      icon: Mail,
      action: 'Send Email'
    },
    {
      id: 'qr_code',
      title: 'QR Code',
      description: 'Generate a QR code for easy sharing',
      icon: QrCode,
      action: 'Generate QR'
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = (method: string) => {
    if (invitesSent < maxInvites) {
      setInvitesSent(prev => prev + 1);
      // Simulate sending invite;
    }}
  };

  const isComplete = invitesSent >= 2; // Require at least 2 invites sent;
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <UserPlus className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-hive-text-primary mb-2">
          Invite Your Friends;
        </h3>
        <p className="text-hive-text-secondary">
          You have {maxInvites} exclusive invitations to share;
        </p>
      </div>

      {/* Invitation Stats */}
      <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-hive-text-primary">Invitations Remaining</h4>
            <p className="text-sm text-hive-text-secondary">Limited time exclusive access</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-400">
              {maxInvites - invitesSent}
            </div>
            <div className="text-xs text-hive-text-secondary">out of {maxInvites}</div>
          </div>
        </div>
        <Progress;
          value={(invitesSent / maxInvites) * 100} 
          className="h-2 mt-3"
        />
      </Card>

      {/* Personal Invite Link */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-hive-gold/20 rounded-lg flex items-center justify-center">
            <Link className="h-5 w-5 text-hive-gold" />
          </div>
          <div>
            <h4 className="font-semibold text-hive-text-primary">Your Personal Invite Link</h4>
            <p className="text-sm text-hive-text-secondary">Share this link to invite friends</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <Input;
            value={shareableLink}
            readOnly;
            className="flex-1 font-mono text-sm"
          />
          <Button;
            onClick={handleCopyLink}
            variant="secondary"
            className={`px-4 ${copied ? 'text-green-400 border-green-400' : ''}`}
          >
            {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        <div className="bg-hive-surface-elevated p-4 rounded-lg">
          <h5 className="font-medium text-hive-text-primary mb-2">Invite Preview:</h5>
          <div className="text-sm text-hive-text-secondary italic">
            "Hey! I'm using HIVE to prepare for campus life at UB. It's helping me find study groups, 
            connect with people in my major, and get ready for the semester. Want to join me? 
            Use my invite link: {shareableLink}"
          </div>
        </div>
      </Card>

      {/* Invitation Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inviteMethods.map(method => {
          const IconComponent = method.icon;
          
          return (
            <Card;
              key={method.id}}
              className="p-4 cursor-pointer hover:border-purple-400/50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <IconComponent className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-hive-text-primary mb-1">
                    {method.title}
                  </h4>
                  <p className="text-sm text-hive-text-secondary mb-3">
                    {method.description}
                  </p>
                  <Button;
                    size="sm"
                    onClick={() => handleSendInvite(method.id)}
                    disabled={invitesSent >= maxInvites}
                    className="bg-purple-500 text-white hover:bg-purple-600"
                  >
                    {method.action}
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Social Proof */}
      <Card className="p-4 bg-hive-surface-elevated">
        <div className="flex items-center space-x-3">
          <Users className="h-5 w-5 text-hive-brand-secondary" />
          <div>
            <p className="text-sm font-medium text-hive-text-primary">
              1,247 students are already preparing for fall semester;
            </p>
            <p className="text-xs text-hive-text-secondary">
              Your friends will thank you for the early access;
            </p>
          </div>
        </div>
      </Card>

      {/* Completion Status */}
      <div className="bg-hive-surface-elevated p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-hive-text-secondary">Invites sent:</span>
          <span className={`font-semibold ${isComplete ? 'text-green-400' : 'text-hive-text-secondary'}`}>
            {invitesSent}/2+ required;
          </span>
        </div>
        {isComplete && (
          <div className="flex items-center space-x-2 text-green-400 text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>Great! You've helped grow the HIVE community</span>
          </div>
        )}
      </div>

      <Button;
        onClick={() => onComplete({invitesSent, inviteCode) })}
        disabled={!isComplete}
        className="w-full bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90"
      >
        Complete Connect Ritual;
        <Sparkles className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export function RitualConnectWorkflow({ 
  currentStep = 0, 
  onStepComplete,
  onRitualComplete,
  userProfile = { name: 'Student', handle: '@student', interests: [] },
  className = '' 
}: ConnectRitualProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [connectData, setConnectData] = useState<any>({});

  const handleStepComplete = (data: any) => {
    setConnectData(data);
    onStepComplete?.('friend_invitations', data);
    setIsComplete(true);
    onRitualComplete?.();
  };

  if (isComplete) {
    return (
      <div className={`space-y-8 ${className}`}>
        <Card className="p-8 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-hive-text-primary mb-4">
            Connect Ritual Complete!
          </h2>
          
          <p className="text-hive-text-secondary text-lg mb-6">
            Awesome! You've sent {connectData.invitesSent} invitations to help your friends;
            join HIVE. Your social graph is being built and your Connections Widget will be;
            populated as friends accept your invites.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-hive-surface-elevated rounded-lg">
              <UserPlus className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <h3 className="font-semibold text-hive-text-primary">Invites Sent</h3>
              <p className="text-sm text-hive-text-secondary">{connectData.invitesSent} friends invited</p>
            </div>
            <div className="p-4 bg-hive-surface-elevated rounded-lg">
              <Heart className="h-8 w-8 mx-auto mb-2 text-pink-400" />
              <h3 className="font-semibold text-hive-text-primary">Social Graph</h3>
              <p className="text-sm text-hive-text-secondary">Building connections</p>
            </div>
            <div className="p-4 bg-hive-surface-elevated rounded-lg">
              <Award className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <h3 className="font-semibold text-hive-text-primary">Community Builder</h3>
              <p className="text-sm text-hive-text-secondary">Badge earned</p>
            </div>
          </div>

          <div className="bg-hive-gold/10 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center space-x-2 text-hive-gold mb-2">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">Invite Code: {connectData.inviteCode}</span>
            </div>
            <p className="text-xs text-hive-text-secondary">
              Save this code - you can share it later too!
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 text-purple-400">
            <Target className="h-5 w-5" />
            <span className="font-medium">Ready for Week 4: Launch Preparation</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-hive-text-primary">
              Connect Ritual;
            </h2>
            <p className="text-hive-text-secondary">
              Week 3 • Build your network;
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-hive-text-secondary text-sm">
              <Clock className="h-4 w-4" />
              <span>~10 minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
          <div className="flex items-start space-x-3">
            <Users className="h-5 w-5 text-purple-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-1">
                Limited Invitation Access;
              </h4>
              <p className="text-sm text-hive-text-secondary">
                HIVE is currently invite-only for the summer preparation period. 
                Your 5 exclusive invitations help build our initial campus community;
                before the public launch.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <InvitationMethodStep;
          onComplete={handleStepComplete}
          userProfile={userProfile}
        />
      </Card>
    </div>
  );
}