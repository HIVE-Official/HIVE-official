"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { 
  MessageSquare, 
  Star, 
  BarChart3, 
  Users, 
  Send,
  Eye,
  Download,
  Filter,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Lightbulb
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EventDefinition, EventFeedback, EventAnalytics } from './event-system-core';

interface EventFeedbackToolProps {
  event: EventDefinition;
  isBuilder?: boolean;
  onSendFeedbackRequest?: (recipients: string[]) => Promise<void>;
  onExportFeedback?: (format: 'csv' | 'pdf') => void;
}

interface FeedbackQuestion {
  id: string;
  type: 'rating' | 'text' | 'multiple_choice' | 'yes_no';
  question: string;
  required: boolean;
  options?: string[];
  category: 'overall' | 'organization' | 'content' | 'venue' | 'custom';
}

interface FeedbackSurvey {
  id: string;
  eventId: string;
  title: string;
  description: string;
  questions: FeedbackQuestion[];
  isActive: boolean;
  createdAt: Date;
  responseCount: number;
  averageRating: number;
}

interface FeedbackResponse {
  id: string;
  surveyId: string;
  userId: string;
  userName: string;
  responses: Record<string, any>;
  submittedAt: Date;
  isAnonymous: boolean;
}

const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = 'sm',
  onChange 
}: { 
  rating: number; 
  maxRating?: number; 
  size?: 'sm' | 'md' | 'lg';
  onChange?: (rating: number) => void;
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange?.(index + 1)}
          className={cn(
            "transition-colors",
            onChange ? "cursor-pointer hover:scale-110" : "cursor-default"
          )}
          disabled={!onChange}
        >
          <Star 
            className={cn(
              sizeClasses[size],
              index < rating 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-300"
            )} 
          />
        </button>
      ))}
    </div>
  );
};

const FeedbackSurveyBuilder = ({ 
  event, 
  onSave 
}: { 
  event: EventDefinition; 
  onSave: (survey: Omit<FeedbackSurvey, 'id' | 'createdAt' | 'responseCount' | 'averageRating'>) => void;
}) => {
  const [survey, setSurvey] = useState<Partial<FeedbackSurvey>>({
    eventId: event.id,
    title: `${event.title} Feedback`,
    description: 'Help us improve future events by sharing your experience',
    questions: [
      {
        id: 'overall_rating',
        type: 'rating',
        question: 'How would you rate this event overall?',
        required: true,
        category: 'overall'
      },
      {
        id: 'organization_rating',
        type: 'rating',
        question: 'How well was the event organized?',
        required: true,
        category: 'organization'
      },
      {
        id: 'content_rating',
        type: 'rating',
        question: 'How valuable was the content/activities?',
        required: true,
        category: 'content'
      },
      {
        id: 'venue_rating',
        type: 'rating',
        question: 'How suitable was the venue?',
        required: true,
        category: 'venue'
      },
      {
        id: 'recommend',
        type: 'yes_no',
        question: 'Would you recommend this event to others?',
        required: true,
        category: 'overall'
      },
      {
        id: 'improvements',
        type: 'text',
        question: 'What could we improve for next time?',
        required: false,
        category: 'custom'
      },
      {
        id: 'comments',
        type: 'text',
        question: 'Any additional comments?',
        required: false,
        category: 'custom'
      }
    ],
    isActive: false
  });

  const handleSave = () => {
    if (survey.title && survey.questions && survey.questions.length > 0) {
      onSave({
        eventId: survey.eventId!,
        title: survey.title,
        description: survey.description || '',
        questions: survey.questions,
        isActive: survey.isActive || false
      });
    }
  };

  const addQuestion = () => {
    const newQuestion: FeedbackQuestion = {
      id: `question_${Date.now()}`,
      type: 'text',
      question: '',
      required: false,
      category: 'custom'
    };
    
    setSurvey(prev => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion]
    }));
  };

  const updateQuestion = (questionId: string, updates: Partial<FeedbackQuestion>) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions?.map(q => 
        q.id === questionId ? { ...q, ...updates } : q
      )
    }));
  };

  const removeQuestion = (questionId: string) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions?.filter(q => q.id !== questionId)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Survey Title
          </label>
          <input
            type="text"
            value={survey.title || ''}
            onChange={(e) => setSurvey(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Description
          </label>
          <textarea
            value={survey.description || ''}
            onChange={(e) => setSurvey(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Questions</h3>
          <HiveButton size="sm" onClick={addQuestion}>
            Add Question
          </HiveButton>
        </div>

        <div className="space-y-4">
          {survey.questions?.map((question, index) => (
            <HiveCard key={question.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question {index + 1}
                      </label>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                        placeholder="Enter your question..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <div className="flex gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <select
                          value={question.type}
                          onChange={(e) => updateQuestion(question.id, { 
                            type: e.target.value as FeedbackQuestion['type'] 
                          })}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="rating">Star Rating</option>
                          <option value="text">Text Response</option>
                          <option value="yes_no">Yes/No</option>
                          <option value="multiple_choice">Multiple Choice</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={question.required}
                            onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                            className="rounded border-gray-300 focus:ring-amber-500"
                          />
                          Required
                        </label>
                      </div>
                    </div>
                  </div>

                  <HiveButton
                    size="sm"
                    variant="secondary"
                    onClick={() => removeQuestion(question.id)}
                    className="ml-4"
                  >
                    Remove
                  </HiveButton>
                </div>

                {question.type === 'multiple_choice' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Options (one per line)
                    </label>
                    <textarea
                      value={question.options?.join('\n') || ''}
                      onChange={(e) => updateQuestion(question.id, { 
                        options: e.target.value.split('\n').filter(opt => opt.trim()) 
                      })}
                      rows={3}
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                )}
              </div>
            </HiveCard>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={survey.isActive}
            onChange={(e) => setSurvey(prev => ({ ...prev, isActive: e.target.checked }))}
            className="rounded border-gray-300 focus:ring-amber-500"
          />
          <span className="text-sm font-medium">Activate survey immediately</span>
        </label>

        <div className="flex gap-3">
          <HiveButton variant="secondary">Preview</HiveButton>
          <HiveButton onClick={handleSave}>Save Survey</HiveButton>
        </div>
      </div>
    </div>
  );
};

const FeedbackAnalytics = ({ 
  survey, 
  responses 
}: { 
  survey: FeedbackSurvey; 
  responses: FeedbackResponse[];
}) => {
  const analytics = useMemo(() => {
    const totalResponses = responses.length;
    
    // Calculate rating averages
    const ratingQuestions = survey.questions.filter(q => q.type === 'rating');
    const ratingAverages = ratingQuestions.map(question => {
      const ratings = responses
        .map(r => r.responses[question.id])
        .filter(rating => typeof rating === 'number');
      
      const average = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0;
      
      return {
        questionId: question.id,
        question: question.question,
        average: Math.round(average * 10) / 10,
        count: ratings.length
      };
    });

    // Calculate yes/no percentages
    const yesNoQuestions = survey.questions.filter(q => q.type === 'yes_no');
    const yesNoStats = yesNoQuestions.map(question => {
      const yesResponses = responses.filter(r => r.responses[question.id] === true).length;
      const totalResponses = responses.filter(r => r.responses[question.id] !== undefined).length;
      
      return {
        questionId: question.id,
        question: question.question,
        yesPercentage: totalResponses > 0 ? Math.round((yesResponses / totalResponses) * 100) : 0,
        yesCount: yesResponses,
        totalCount: totalResponses
      };
    });

    // Get text responses
    const textQuestions = survey.questions.filter(q => q.type === 'text');
    const textResponses = textQuestions.map(question => ({
      questionId: question.id,
      question: question.question,
      responses: responses
        .map(r => r.responses[question.id])
        .filter(response => response && typeof response === 'string' && response.trim())
    }));

    return {
      totalResponses,
      ratingAverages,
      yesNoStats,
      textResponses,
      responseRate: survey.responseCount > 0 ? Math.round((totalResponses / survey.responseCount) * 100) : 0
    };
  }, [survey, responses]);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{analytics.totalResponses}</div>
          <div className="text-sm text-gray-500">Total Responses</div>
        </HiveCard>
        
        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{analytics.responseRate}%</div>
          <div className="text-sm text-gray-500">Response Rate</div>
        </HiveCard>
        
        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">
            {analytics.ratingAverages.find(r => r.questionId === 'overall_rating')?.average || 'N/A'}
          </div>
          <div className="text-sm text-gray-500">Overall Rating</div>
        </HiveCard>

        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {analytics.yesNoStats.find(s => s.questionId === 'recommend')?.yesPercentage || 'N/A'}%
          </div>
          <div className="text-sm text-gray-500">Would Recommend</div>
        </HiveCard>
      </div>

      {/* Rating Questions */}
      {analytics.ratingAverages.length > 0 && (
        <HiveCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Rating Analysis</h3>
          <div className="space-y-4">
            {analytics.ratingAverages.map((rating) => (
              <div key={rating.questionId} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-1">{rating.question}</p>
                  <div className="flex items-center gap-3">
                    <StarRating rating={rating.average} />
                    <span className="text-sm text-gray-600">
                      {rating.average}/5 ({rating.count} responses)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{rating.average}</div>
                </div>
              </div>
            ))}
          </div>
        </HiveCard>
      )}

      {/* Yes/No Questions */}
      {analytics.yesNoStats.length > 0 && (
        <HiveCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Yes/No Questions</h3>
          <div className="space-y-4">
            {analytics.yesNoStats.map((stat) => (
              <div key={stat.questionId}>
                <p className="font-medium text-gray-900 mb-2">{stat.question}</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stat.yesPercentage}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ThumbsUp className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{stat.yesPercentage}%</span>
                    <span className="text-gray-500">({stat.yesCount}/{stat.totalCount})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </HiveCard>
      )}

      {/* Text Responses */}
      {analytics.textResponses.some(tr => tr.responses.length > 0) && (
        <HiveCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Written Feedback</h3>
          <div className="space-y-6">
            {analytics.textResponses
              .filter(tr => tr.responses.length > 0)
              .map((textResponse) => (
                <div key={textResponse.questionId}>
                  <h4 className="font-medium text-gray-900 mb-3">{textResponse.question}</h4>
                  <div className="space-y-3">
                    {textResponse.responses.slice(0, 5).map((response, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-700 text-sm">{response}</p>
                      </div>
                    ))}
                    {textResponse.responses.length > 5 && (
                      <p className="text-sm text-gray-500">
                        +{textResponse.responses.length - 5} more responses
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </HiveCard>
      )}
    </div>
  );
};

export function EventFeedbackTool({ 
  event, 
  isBuilder = false, 
  onSendFeedbackRequest, 
  onExportFeedback 
}: EventFeedbackToolProps) {
  const [view, setView] = useState<'overview' | 'create' | 'analytics'>('overview');
  const [surveys, setSurveys] = useState<FeedbackSurvey[]>([]);
  const [responses, setResponses] = useState<FeedbackResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API calls
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockSurvey: FeedbackSurvey = {
          id: 'survey_1',
          eventId: event.id,
          title: `${event.title} Feedback`,
          description: 'Help us improve future events by sharing your experience',
          questions: [
            {
              id: 'overall_rating',
              type: 'rating',
              question: 'How would you rate this event overall?',
              required: true,
              category: 'overall'
            },
            {
              id: 'organization_rating',
              type: 'rating',
              question: 'How well was the event organized?',
              required: true,
              category: 'organization'
            },
            {
              id: 'recommend',
              type: 'yes_no',
              question: 'Would you recommend this event to others?',
              required: true,
              category: 'overall'
            },
            {
              id: 'improvements',
              type: 'text',
              question: 'What could we improve for next time?',
              required: false,
              category: 'custom'
            }
          ],
          isActive: true,
          createdAt: new Date('2024-01-20T10:00:00Z'),
          responseCount: 25,
          averageRating: 4.2
        };

        const mockResponses: FeedbackResponse[] = [
          {
            id: 'response_1',
            surveyId: 'survey_1',
            userId: 'user_1',
            userName: 'Sarah Johnson',
            responses: {
              overall_rating: 5,
              organization_rating: 4,
              recommend: true,
              improvements: 'More interactive activities would be great!'
            },
            submittedAt: new Date('2024-01-21T14:30:00Z'),
            isAnonymous: false
          },
          {
            id: 'response_2',
            surveyId: 'survey_1',
            userId: 'user_2',
            userName: 'Anonymous',
            responses: {
              overall_rating: 4,
              organization_rating: 5,
              recommend: true,
              improvements: 'Better sound system needed'
            },
            submittedAt: new Date('2024-01-21T15:45:00Z'),
            isAnonymous: true
          }
        ];
        
        setSurveys([mockSurvey]);
        setResponses(mockResponses);
      } catch (error) {
        console.error('Failed to fetch feedback data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [event.id]);

  const handleSaveSurvey = useCallback((newSurvey: Omit<FeedbackSurvey, 'id' | 'createdAt' | 'responseCount' | 'averageRating'>) => {
    const survey: FeedbackSurvey = {
      ...newSurvey,
      id: `survey_${Date.now()}`,
      createdAt: new Date(),
      responseCount: 0,
      averageRating: 0
    };
    
    setSurveys(prev => [...prev, survey]);
    setView('overview');
  }, []);

  const handleSendFeedbackRequest = useCallback(async () => {
    try {
      if (onSendFeedbackRequest) {
        // Get all attendees who checked in
        const recipients = ['user1@example.com', 'user2@example.com']; // Mock data
        await onSendFeedbackRequest(recipients);
        
        // Show success feedback
        alert('Feedback requests sent successfully!');
      }
    } catch (error) {
      console.error('Failed to send feedback requests:', error);
      alert('Failed to send feedback requests');
    }
  }, [onSendFeedbackRequest]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 bg-amber-500 rounded-lg animate-pulse mx-auto mb-4" />
        <p className="text-gray-600">Loading feedback data...</p>
      </div>
    );
  }

  const activeSurvey = surveys.find(s => s.isActive);

  if (view === 'create') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Feedback Survey</h2>
            <p className="text-gray-600">Design a custom feedback form for your event</p>
          </div>
          <HiveButton variant="secondary" onClick={() => setView('overview')}>
            Back to Overview
          </HiveButton>
        </div>

        <FeedbackSurveyBuilder event={event} onSave={handleSaveSurvey} />
      </div>
    );
  }

  if (view === 'analytics' && activeSurvey) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Feedback Analytics</h2>
            <p className="text-gray-600">Insights from {activeSurvey.title}</p>
          </div>
          <div className="flex gap-3">
            <HiveButton variant="secondary" onClick={() => onExportFeedback?.('csv')}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </HiveButton>
            <HiveButton variant="secondary" onClick={() => setView('overview')}>
              Back to Overview
            </HiveButton>
          </div>
        </div>

        <FeedbackAnalytics survey={activeSurvey} responses={responses} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Feedback</h2>
          <p className="text-gray-600">Collect and analyze feedback from event attendees</p>
        </div>
        
        {isBuilder && (
          <div className="flex items-center gap-3">
            <HiveButton variant="secondary" onClick={() => setView('create')}>
              Create Survey
            </HiveButton>
            {activeSurvey && (
              <HiveButton onClick={handleSendFeedbackRequest}>
                <Send className="w-4 h-4 mr-2" />
                Send Requests
              </HiveButton>
            )}
          </div>
        )}
      </div>

      {/* Survey Status */}
      <HiveCard className="p-6">
        {activeSurvey ? (
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{activeSurvey.title}</h3>
                <HiveBadge className="bg-green-100 text-green-800 border-green-200">
                  Active
                </HiveBadge>
              </div>
              <p className="text-gray-600 mb-4">{activeSurvey.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {activeSurvey.responseCount} responses
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-600">
                    {activeSurvey.averageRating}/5 average
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {activeSurvey.questions.length} questions
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <HiveButton size="sm" onClick={() => setView('analytics')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </HiveButton>
              <HiveButton size="sm" variant="secondary">
                <Eye className="w-4 w-4 mr-2" />
                Preview Survey
              </HiveButton>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Survey</h3>
            <p className="text-gray-600 mb-4">
              Create a feedback survey to collect attendee responses after your event
            </p>
            {isBuilder && (
              <HiveButton onClick={() => setView('create')}>
                Create Feedback Survey
              </HiveButton>
            )}
          </div>
        )}
      </HiveCard>

      {/* Quick Stats */}
      {activeSurvey && responses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <HiveCard className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{responses.length}</div>
            <div className="text-sm text-gray-500">Total Responses</div>
          </HiveCard>
          
          <HiveCard className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round((responses.length / activeSurvey.responseCount) * 100) || 0}%
            </div>
            <div className="text-sm text-gray-500">Response Rate</div>
          </HiveCard>
          
          <HiveCard className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {activeSurvey.averageRating}
            </div>
            <div className="text-sm text-gray-500">Avg Rating</div>
          </HiveCard>

          <HiveCard className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {responses.filter(r => r.responses.recommend === true).length}
            </div>
            <div className="text-sm text-gray-500">Recommenders</div>
          </HiveCard>
        </div>
      )}

      {/* Recent Responses */}
      {responses.length > 0 && (
        <HiveCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Responses</h3>
          <div className="space-y-4">
            {responses.slice(0, 5).map((response) => (
              <div key={response.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-gray-900">
                      {response.isAnonymous ? 'Anonymous' : response.userName}
                    </p>
                    {response.responses.overall_rating && (
                      <StarRating rating={response.responses.overall_rating} />
                    )}
                  </div>
                  {response.responses.improvements && (
                    <p className="text-sm text-gray-600">"{response.responses.improvements}"</p>
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  {response.submittedAt.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
          
          {responses.length > 5 && (
            <div className="text-center mt-4">
              <HiveButton variant="secondary" onClick={() => setView('analytics')}>
                View All Responses
              </HiveButton>
            </div>
          )}
        </HiveCard>
      )}
    </div>
  );
}

export default EventFeedbackTool;