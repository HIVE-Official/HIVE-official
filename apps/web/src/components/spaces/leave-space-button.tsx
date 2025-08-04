"use client";

import { useState } from 'react';
import { Button } from "@hive/ui";
import { Alert } from "@/components/temp-stubs";
import { LogOut, AlertTriangle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LeaveSpaceButtonProps {
  spaceId: string;
  spaceName: string;
  spaceType: string;
  userRole?: string;
  onLeave?: () => void;
  className?: string;
}

export function LeaveSpaceButton({
  spaceId,
  spaceName,
  spaceType,
  userRole = 'member',
  onLeave,
  className
}: LeaveSpaceButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const isGreekLife = spaceType === 'greek_life';
  const isImportantRole = userRole === 'owner' || userRole === 'admin';

  const handleLeaveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLeave = async () => {
    setIsLeaving(true);
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      // Get auth token
      try {
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
          const session = JSON.parse(sessionJson);
          headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
        } else {
          headers.Authorization = `Bearer test-token`;
        }
      } catch (error) {
        headers.Authorization = `Bearer test-token`;
      }

      const response = await fetch('/api/spaces/leave', {
        method: 'POST',
        headers,
        body: JSON.stringify({ spaceId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to leave space');
      }

      // Call onLeave callback if provided
      onLeave?.();
      
      // Redirect to spaces page
      window.location.href = '/spaces';
    } catch (error: any) {
      alert(error.message || 'Failed to leave space');
      setIsLeaving(false);
      setShowConfirmation(false);
    }
  };

  const getWarningMessage = () => {
    if (isGreekLife) {
      return "Leaving this Greek life organization will allow you to join a different one. This action cannot be undone.";
    }
    
    if (isImportantRole) {
      return `As a ${userRole}, leaving this space may affect its management. Consider transferring your role first.`;
    }
    
    return "Are you sure you want to leave this space? You can rejoin later if the space allows it.";
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleLeaveClick}
        className={`border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 ${className}`}
        disabled={isLeaving}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Leave Space
      </Button>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isLeaving && setShowConfirmation(false)}
          >
            <motion.div
              className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-md p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Leave {spaceName}?
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {getWarningMessage()}
                  </p>
                </div>
              </div>

              {isGreekLife && (
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-6">
                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Greek Life Policy</span>
                  </div>
                  <p className="text-xs text-purple-300 mt-1">
                    You can only be a member of one Greek life organization at a time.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                  disabled={isLeaving}
                  className="flex-1 border-white/[0.2] text-white hover:bg-white/[0.1]"
                >
                  Cancel
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleConfirmLeave}
                  disabled={isLeaving}
                  className="flex-1 bg-red-500 text-white hover:bg-red-600"
                >
                  {isLeaving ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Leaving...</span>
                    </div>
                  ) : (
                    'Leave Space'
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}