"use client";

import React, { useState, useCallback } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../../index';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Settings, 
  Eye, 
  Vote,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters: string[]; // user IDs who voted for this option
}

interface PollData {
  id: string;
  question: string;
  options: PollOption[];
  isActive: boolean;
  allowMultiple: boolean;
  isAnonymous: boolean;
  endDate?: Date;
  createdBy: string;
  createdAt: Date;
  totalVotes: number;
  totalVoters: number
}

interface PollDualInterfaceProps {
  poll: PollData;
  userRole: 'leader' | 'member' | 'guest';
  userId: string;
  onUpdatePoll?: (updates: Partial<PollData>) => Promise<void>;
  onVote?: (optionIds: string[]) => Promise<void>;
  onDeletePoll?: () => Promise<void>;
  showInterface?: boolean
}

// Interface Component - For Leaders/Builders (Utility Side)
const PollInterface = ({ 
  poll, 
  onUpdate, 
  onDelete, 
  onToggleActive 
}: {
  poll: PollData;
  onUpdate: (updates: Partial<PollData>) => void;
  onDelete: () => void;
  onToggleActive: () => void
}) => {
  const [editingQuestion, setEditingQuestion] = useState(poll.question);
  const [editingOptions, setEditingOptions] = useState(poll.options);

  const addOption = () => {
    const newOption: PollOption = {
      id: `option_${Date.now()}`,
      text: '',
      votes: 0,
      voters: []
    };
    setEditingOptions([...editingOptions, newOption])
  };

  const updateOption = (optionId: string, text: string) => {
    setEditingOptions(options => 
      options.map(opt => opt.id === optionId ? { ...opt, text } : opt)
    )
  };

  const removeOption = (optionId: string) => {
    if (editingOptions.length > 2) {
      setEditingOptions(options => options.filter(opt => opt.id !== optionId))
    }
  };

  const saveChanges = () => {
    onUpdate({
      question: editingQuestion,
      options: editingOptions.filter(opt => opt.text.trim())
    })
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Poll Configuration</h3>
          <HiveBadge className="bg-blue-100 text-blue-800 border-blue-200">
            Interface
          </HiveBadge>
        </div>
        
        <div className="flex items-center gap-2">
          <HiveBadge className={
            poll.isActive 
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-red-100 text-red-800 border-red-200"
          }>
            {poll.isActive ? 'Active' : 'Inactive'}
          </HiveBadge>
          
          <HiveButton
            size="sm"
            variant="outline"
            onClick={onToggleActive}
          >
            {poll.isActive ? 'Deactivate' : 'Activate'}
          </HiveButton>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <HiveCard className="p-3 text-center">
          <div className="text-xl font-bold text-gray-900">{poll.totalVotes}</div>
          <div className="text-xs text-gray-500">Total Votes</div>
        </HiveCard>
        <HiveCard className="p-3 text-center">
          <div className="text-xl font-bold text-green-600">{poll.totalVoters}</div>
          <div className="text-xs text-gray-500">Voters</div>
        </HiveCard>
        <HiveCard className="p-3 text-center">
          <div className="text-xl font-bold text-blue-600">
            {poll.totalVotes > 0 ? Math.round((poll.totalVoters / poll.totalVotes) * 100) : 0}%
          </div>
          <div className="text-xs text-gray-500">Participation</div>
        </HiveCard>
      </div>

      {/* Question Editor */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Poll Question
        </label>
        <input
          type="text"
          value={editingQuestion}
          onChange={(e) => setEditingQuestion(e.target.value)}
          placeholder="Enter your poll question..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>

      {/* Options Editor */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Poll Options
          </label>
          <HiveButton size="sm" onClick={addOption}>
            <Plus className="w-3 h-3 mr-1" />
            Add Option
          </HiveButton>
        </div>
        
        <div className="space-y-2">
          {editingOptions.map((option, index) => (
            <div key={option.id} className="flex items-center gap-2">
              <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
              <input
                type="text"
                value={option.text}
                onChange={(e) => updateOption(option.id, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <div className="text-sm text-gray-500 w-16 text-center">
                {option.votes} votes
              </div>
              {editingOptions.length > 2 && (
                <HiveButton
                  size="sm"
                  variant="outline"
                  onClick={() => removeOption(option.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </HiveButton>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Poll Settings</h4>
        
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={poll.allowMultiple}
              onChange={(e) => onUpdate({ allowMultiple: e.target.checked }}
              className="rounded border-gray-300 focus:ring-amber-500"
            />
            <span className="text-sm text-gray-700">Allow multiple selections</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={poll.isAnonymous}
              onChange={(e) => onUpdate({ isAnonymous: e.target.checked }}
              className="rounded border-gray-300 focus:ring-amber-500"
            />
            <span className="text-sm text-gray-700">Anonymous voting</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <HiveButton variant="outline" onClick={onDelete} className="text-red-600">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Poll
        </HiveButton>
        
        <div className="flex gap-2">
          <HiveButton variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </HiveButton>
          <HiveButton onClick={saveChanges}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Save Changes
          </HiveButton>
        </div>
      </div>
    </div>
  )
};

// Surface Component - For Post Board (Informational Side)
const PollSurface = ({ 
  poll, 
  userId, 
  userRole, 
  onVote, 
  hasVoted 
}: {
  poll: PollData;
  userId: string;
  userRole: string;
  onVote: (optionIds: string[]) => void;
  hasVoted: boolean
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (optionId: string) => {
    if (!poll.isActive) return;
    
    if (poll.allowMultiple) {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      )
    } else {
      setSelectedOptions([optionId])
    }
  };

  const handleVote = () => {
    if (selectedOptions.length > 0) {
      onVote(selectedOptions);
      setSelectedOptions([])
    }
  };

  const getOptionPercentage = (option: PollOption) => {
    return poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0
  };

  const hasUserVoted = poll.options.some(option => option.voters.includes(userId));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Vote className="w-4 h-4 text-green-600" />
          <HiveBadge className="bg-green-100 text-green-800 border-green-200">
            Surface
          </HiveBadge>
        </div>
        
        {!poll.isActive && (
          <HiveBadge variant="outline">
            Poll Closed
          </HiveBadge>
        )}
      </div>

      {/* Question */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">{poll.question}</h3>
        {poll.allowMultiple && (
          <p className="text-sm text-gray-600">Select all that apply</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {poll.options.map((option) => {
          const percentage = getOptionPercentage(option);
          const isSelected = selectedOptions.includes(option.id);
          const userVotedForThis = option.voters.includes(userId);
          
          return (
            <div key={option.id} className="space-y-2">
              <button
                onClick={() => handleOptionToggle(option.id)}
                disabled={!poll.isActive || hasUserVoted}
                className={cn(
                  "w-full text-left p-3 rounded-lg border transition-all",
                  poll.isActive && !hasUserVoted && "hover:border-amber-300",
                  isSelected && "border-amber-500 bg-amber-50",
                  userVotedForThis && "border-green-500 bg-green-50",
                  (!poll.isActive || hasUserVoted) && "opacity-60 cursor-not-allowed"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{option.text}</span>
                  <div className="flex items-center gap-2">
                    {userVotedForThis && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-sm text-gray-600">
                      {option.votes} vote{option.votes !== 1 ? 's' : ''} ({percentage}%)
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={cn(
                      "h-2 rounded-full transition-all duration-500",
                      userVotedForThis ? "bg-green-500" : "bg-amber-500"
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </button>
            </div>
          )
          })
      </div>

      {/* Vote Button */}
      {poll.isActive && !hasUserVoted && (
        <HiveButton
          onClick={handleVote}
          disabled={selectedOptions.length === 0}
          className="w-full"
        >
          <Vote className="w-4 h-4 mr-2" />
          Submit Vote{selectedOptions.length > 1 ? 's' : ''}
        </HiveButton>
      )}

      {/* Stats Footer */}
      <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span>{poll.totalVotes} total votes</span>
          <span>{poll.totalVoters} participants</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>
            {poll.endDate 
              ? `Ends ${poll.endDate.toLocaleDateString()}`
              : 'No end date'
            }
          </span>
        </div>
      </div>
    </div>
  )
};

export function PollDualInterface({
  poll,
  userRole,
  userId,
  onUpdatePoll,
  onVote,
  onDeletePoll,
  showInterface = false
}: PollDualInterfaceProps) {
  const [currentView, setCurrentView] = useState<'interface' | 'surface' | 'both'>(
    showInterface && userRole === 'leader' ? 'interface' : 'surface'
  );

  const hasUserVoted = poll.options.some(option => option.voters.includes(userId));
  const canEdit = userRole === 'leader' || poll.createdBy === userId;

  const handleUpdatePoll = useCallback(async (updates: Partial<PollData>) => {
    try {
      await onUpdatePoll?.(updates)
    } catch (error) {
      console.error('Failed to update poll:', error)
    }
  }, [onUpdatePoll]);

  const handleVote = useCallback(async (optionIds: string[]) => {
    try {
      await onVote?.(optionIds)
    } catch (error) {
      console.error('Failed to vote:', error)
    }
  }, [onVote]);

  const handleToggleActive = () => {
    handleUpdatePoll({ isActive: !poll.isActive })
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this poll?')) {
      try {
        await onDeletePoll?.()
      } catch (error) {
        console.error('Failed to delete poll:', error)
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* View Toggle (only for leaders) */}
      {canEdit && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Poll View</h4>
            <p className="text-sm text-gray-600">Toggle between configuration and public view</p>
          </div>
          
          <div className="flex items-center bg-white rounded-lg p-1 shadow-sm">
            <HiveButton
              size="sm"
              variant={currentView === 'interface' ? 'primary' : 'ghost'}
              onClick={() => setCurrentView('interface')}
            >
              <Settings className="w-3 h-3 mr-1" />
              Interface
            </HiveButton>
            <HiveButton
              size="sm"
              variant={currentView === 'surface' ? 'primary' : 'ghost'}
              onClick={() => setCurrentView('surface')}
            >
              <Eye className="w-3 h-3 mr-1" />
              Surface
            </HiveButton>
            <HiveButton
              size="sm"
              variant={currentView === 'both' ? 'primary' : 'ghost'}
              onClick={() => setCurrentView('both')}
            >
              Both
            </HiveButton>
          </div>
        </div>
      )}

      {/* Interface/Surface Views */}
      <div className={cn(
        "grid gap-6",
        currentView === 'both' ? "lg:grid-cols-2" : "lg:grid-cols-1"
      )}>
        {(currentView === 'interface' || currentView === 'both') && canEdit && (
          <HiveCard className="p-6">
            <PollInterface
              poll={poll}
              onUpdate={handleUpdatePoll}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
            />
          </HiveCard>
        )}

        {(currentView === 'surface' || currentView === 'both') && (
          <HiveCard className="p-6">
            <PollSurface
              poll={poll}
              userId={userId}
              userRole={userRole}
              onVote={handleVote}
              hasVoted={hasUserVoted}
            />
          </HiveCard>
        )}
      </div>
    </div>
  )
}

export default PollDualInterface;