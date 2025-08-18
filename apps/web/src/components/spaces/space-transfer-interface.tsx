"use client";

import React, { useState, useEffect as _useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authenticatedFetch } from '../../lib/auth-utils';
import { Button, Badge } from "@hive/ui";
import { Alert } from "@/components/temp-stubs";
import { 
  ArrowRight, 
  Clock, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Users,
  Home,
  GraduationCap,
  Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpaceInfo {
  id: string;
  name: string;
  type: string;
  memberCount: number;
  description?: string;
}

interface MovementRestriction {
  canMove: boolean;
  reason?: string;
  nextAvailableDate?: string;
  currentCooldownDays?: number;
  movementsThisPeriod?: number;
}

interface MovementRecord {
  fromSpaceId: string;
  toSpaceId: string;
  spaceType: string;
  movementType: string;
  timestamp: string;
  reason?: string;
  adminOverride?: boolean;
}

interface SpaceTransferInterfaceProps {
  currentSpace: SpaceInfo;
  availableSpaces: SpaceInfo[];
  spaceType: 'campus_living' | 'cohort' | 'fraternity_and_sorority';
  onTransferComplete?: () => void;
}

export function SpaceTransferInterface({ 
  currentSpace, 
  availableSpaces, 
  spaceType,
  onTransferComplete 
}: SpaceTransferInterfaceProps) {
  const [selectedTargetSpace, setSelectedTargetSpace] = useState<SpaceInfo | null>(null);
  const [transferReason, setTransferReason] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const queryClient = useQueryClient();

  // Get movement restrictions and history
  const { data: movementInfo } = useQuery({
    queryKey: ['space-movement-info'],
    queryFn: async () => {
      const response = await authenticatedFetch('/api/spaces/transfer');
      if (!response.ok) throw new Error('Failed to fetch movement info');
      return response.json();
    }
  });

  // Check specific transfer restrictions
  const { data: transferValidation, isLoading: validationLoading } = useQuery({
    queryKey: ['transfer-validation', currentSpace.id, selectedTargetSpace?.id],
    queryFn: async () => {
      if (!selectedTargetSpace) return null;
      
      const params = new URLSearchParams({
        spaceType,
        fromSpaceId: currentSpace.id,
        toSpaceId: selectedTargetSpace.id
      });
      
      const response = await authenticatedFetch(`/api/spaces/transfer?${params}`);
      if (!response.ok) throw new Error('Failed to validate transfer');
      return response.json();
    },
    enabled: !!selectedTargetSpace
  });

  // Transfer mutation
  const transferMutation = useMutation({
    mutationFn: async ({ toSpaceId, reason }: { toSpaceId: string; reason: string }) => {
      const response = await authenticatedFetch('/api/spaces/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromSpaceId: currentSpace.id,
          toSpaceId,
          reason
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Transfer failed');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['space-movement-info'] });
      queryClient.invalidateQueries({ queryKey: ['user-spaces'] });
      setShowConfirmation(false);
      setSelectedTargetSpace(null);
      setTransferReason('');
      onTransferComplete?.();
    }
  });

  const getSpaceTypeIcon = (type: string) => {
    switch (type) {
      case 'campus_living': return <Home className="h-4 w-4" />;
      case 'cohort': return <GraduationCap className="h-4 w-4" />;
      case 'fraternity_and_sorority': return <Building className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getSpaceTypeName = (type: string) => {
    switch (type) {
      case 'campus_living': return 'Housing';
      case 'cohort': return 'Academic';
      case 'fraternity_and_sorority': return 'Greek Life';
      default: return 'Community';
    }
  };

  const getRestrictionInfo = () => {
    const restrictions = {
      campus_living: {
        cooldown: '1 month',
        limit: '1 transfer per month',
        description: 'You can change your housing space once per month'
      },
      cohort: {
        cooldown: '1 month for major, 1 year for graduation year',
        limit: '1 transfer per month',
        description: 'Major changes: once per month. Graduation year changes: locked for 1 year'
      },
      fraternity_and_sorority: {
        cooldown: 'No cooldown',
        limit: '1 organization at a time',
        description: 'You can only be a member of one Greek organization at a time'
      }
    };

    return restrictions[spaceType] || restrictions.campus_living;
  };

  const handleTransfer = () => {
    if (!selectedTargetSpace) return;
    
    transferMutation.mutate({
      toSpaceId: selectedTargetSpace.id,
      reason: transferReason
    });
  };

  const restrictionInfo = getRestrictionInfo();
  const currentRestriction = movementInfo?.currentRestrictions?.[spaceType];

  return (
    <div className="space-y-6">
      {/* Current Space */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Current Space</h3>
          <Badge variant="outline" className="border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)]">
            {getSpaceTypeName(spaceType)}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          {getSpaceTypeIcon(spaceType)}
          <div className="flex-1">
            <h4 className="font-medium text-white">{currentSpace.name}</h4>
            <p className="text-sm text-neutral-400">
              {currentSpace.memberCount.toLocaleString()} members
            </p>
          </div>
        </div>
      </div>

      {/* Movement Restrictions */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
          <h3 className="text-lg font-semibold text-white">Movement Restrictions</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-400">Cooldown Period:</span>
            <span className="text-white">{restrictionInfo.cooldown}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-400">Transfer Limit:</span>
            <span className="text-white">{restrictionInfo.limit}</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {restrictionInfo.description}
          </p>
          
          {currentRestriction && !currentRestriction.canMove && (
            <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">Transfer Restricted</span>
              </div>
              <p className="text-xs text-red-300">
                {currentRestriction.reason}
              </p>
              {currentRestriction.nextAvailableDate && (
                <div className="flex items-center gap-2 mt-2 text-xs text-red-300">
                  <Calendar className="h-3 w-3" />
                  <span>
                    Available: {new Date(currentRestriction.nextAvailableDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Available Spaces */}
      {(!currentRestriction || currentRestriction.canMove) && (
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Transfer to</h3>
          
          <div className="grid gap-3">
            {availableSpaces.filter(space => space.id !== currentSpace.id).map((space) => (
              <motion.div
                key={space.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedTargetSpace?.id === space.id
                    ? 'bg-[var(--hive-brand-secondary)]/10 border-[var(--hive-brand-secondary)]/30'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'
                }`}
                onClick={() => setSelectedTargetSpace(space)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getSpaceTypeIcon(space.type)}
                    <div>
                      <h4 className="font-medium text-white">{space.name}</h4>
                      <p className="text-sm text-neutral-400">
                        {space.memberCount.toLocaleString()} members
                      </p>
                    </div>
                  </div>
                  
                  {selectedTargetSpace?.id === space.id && (
                    <CheckCircle className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Transfer Reason */}
      {selectedTargetSpace && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Transfer Reason</h3>
          <textarea
            value={transferReason}
            onChange={(e) => setTransferReason(e.target.value)}
            placeholder="Why are you transferring? (optional)"
            className="w-full h-24 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-white placeholder-neutral-400 resize-none focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
            maxLength={200}
          />
          <p className="text-xs text-neutral-400 mt-2">
            {transferReason.length}/200 characters
          </p>
        </motion.div>
      )}

      {/* Transfer Validation */}
      {selectedTargetSpace && transferValidation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Transfer Preview</h3>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-medium text-white">{currentSpace.name}</div>
                <div className="text-xs text-neutral-400">Current</div>
              </div>
              
              <ArrowRight className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
              
              <div className="text-center">
                <div className="font-medium text-white">{selectedTargetSpace.name}</div>
                <div className="text-xs text-neutral-400">New</div>
              </div>
            </div>
            
            {transferValidation.canMove ? (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Allowed</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">Restricted</span>
              </div>
            )}
          </div>

          {!transferValidation.canMove && (
            <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-300">
                {transferValidation.restrictions?.reason}
              </p>
            </div>
          )}
          
          <div className="flex gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedTargetSpace(null);
                setTransferReason('');
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            
            <Button
              variant="primary"
              onClick={() => setShowConfirmation(true)}
              disabled={!transferValidation.canMove || validationLoading}
              className="flex-1 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255]"
            >
              {validationLoading ? 'Validating...' : 'Transfer Space'}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && selectedTargetSpace && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[var(--hive-background-primary)] border border-white/[0.1] rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Confirm Transfer</h3>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-400">From:</span>
                    <span className="text-white">{currentSpace.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-neutral-400">To:</span>
                    <span className="text-white">{selectedTargetSpace.name}</span>
                  </div>
                </div>
                
                <p className="text-sm text-neutral-400">
                  This action cannot be undone. You will lose access to {currentSpace.name} 
                  and gain access to {selectedTargetSpace.name}.
                </p>
                
                {spaceType === 'campus_living' && (
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <p className="text-xs text-yellow-300">
                      Housing transfers may affect your physical room assignment. 
                      Contact housing services separately for room changes.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1"
                  disabled={transferMutation.isPending}
                >
                  Cancel
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleTransfer}
                  className="flex-1 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255]"
                  disabled={transferMutation.isPending}
                >
                  {transferMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 animate-spin" />
                      <span>Transferring...</span>
                    </div>
                  ) : (
                    'Confirm Transfer'
                  )}
                </Button>
              </div>
              
              {transferMutation.isError && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-300">
                    {transferMutation.error?.message || 'Transfer failed'}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Movement History */}
      {movementInfo?.movementHistory && movementInfo.movementHistory.length > 0 && (
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transfers</h3>
          
          <div className="space-y-3">
            {movementInfo.movementHistory.slice(0, 5).map((record: MovementRecord, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  {getSpaceTypeIcon(record.spaceType)}
                  <div>
                    <div className="text-sm text-white">
                      {record.movementType === 'transfer' ? 'Transferred' : 'Left'} space
                    </div>
                    <div className="text-xs text-neutral-400">
                      {new Date(record.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <Badge variant="outline" className="text-xs capitalize">
                  {record.spaceType.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}