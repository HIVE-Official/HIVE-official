"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index.js';
import { MessageSquare, Star, BarChart3, Users, Send, Eye, Download, ThumbsUp } from 'lucide-react';
import { cn } from '../../lib/utils.js';
const StarRating = ({ rating, maxRating = 5, size = 'sm', onChange }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };
    return (_jsx("div", { className: "flex gap-1", children: Array.from({ length: maxRating }).map((_, index) => (_jsx("button", { onClick: () => onChange?.(index + 1), className: cn("transition-colors", onChange ? "cursor-pointer hover:scale-110" : "cursor-default"), disabled: !onChange, children: _jsx(Star, { className: cn(sizeClasses[size], index < rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300") }) }, index))) }));
};
const FeedbackSurveyBuilder = ({ event, onSave }) => {
    const [survey, setSurvey] = useState({
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
                eventId: survey.eventId,
                title: survey.title,
                description: survey.description || '',
                questions: survey.questions,
                isActive: survey.isActive || false
            });
        }
    };
    const addQuestion = () => {
        const newQuestion = {
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
    const updateQuestion = (questionId, updates) => {
        setSurvey(prev => ({
            ...prev,
            questions: prev.questions?.map(q => q.id === questionId ? { ...q, ...updates } : q)
        }));
    };
    const removeQuestion = (questionId) => {
        setSurvey(prev => ({
            ...prev,
            questions: prev.questions?.filter(q => q.id !== questionId)
        }));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "Survey Title" }), _jsx("input", { type: "text", value: survey.title || '', onChange: (e) => setSurvey(prev => ({ ...prev, title: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "Description" }), _jsx("textarea", { value: survey.description || '', onChange: (e) => setSurvey(prev => ({ ...prev, description: e.target.value })), rows: 3, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Questions" }), _jsx(HiveButton, { size: "sm", onClick: addQuestion, children: "Add Question" })] }), _jsx("div", { className: "space-y-4", children: survey.questions?.map((question, index) => (_jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 space-y-3", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Question ", index + 1] }), _jsx("input", { type: "text", value: question.question, onChange: (e) => updateQuestion(question.id, { question: e.target.value }), placeholder: "Enter your question...", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Type" }), _jsxs("select", { value: question.type, onChange: (e) => updateQuestion(question.id, {
                                                                            type: e.target.value
                                                                        }), className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "rating", children: "Star Rating" }), _jsx("option", { value: "text", children: "Text Response" }), _jsx("option", { value: "yes_no", children: "Yes/No" }), _jsx("option", { value: "multiple_choice", children: "Multiple Choice" })] })] }), _jsx("div", { className: "flex items-center", children: _jsxs("label", { className: "flex items-center gap-2 text-sm", children: [_jsx("input", { type: "checkbox", checked: question.required, onChange: (e) => updateQuestion(question.id, { required: e.target.checked }), className: "rounded border-gray-300 focus:ring-amber-500" }), "Required"] }) })] })] }), _jsx(HiveButton, { size: "sm", variant: "outline", onClick: () => removeQuestion(question.id), className: "ml-4", children: "Remove" })] }), question.type === 'multiple_choice' && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Options (one per line)" }), _jsx("textarea", { value: question.options?.join('\n') || '', onChange: (e) => updateQuestion(question.id, {
                                                    options: e.target.value.split('\n').filter(opt => opt.trim())
                                                }), rows: 3, placeholder: "Option 1\nOption 2\nOption 3", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }))] }) }, question.id))) })] }), _jsxs("div", { className: "flex items-center justify-between pt-6 border-t", children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: survey.isActive, onChange: (e) => setSurvey(prev => ({ ...prev, isActive: e.target.checked })), className: "rounded border-gray-300 focus:ring-amber-500" }), _jsx("span", { className: "text-sm font-medium", children: "Activate survey immediately" })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(HiveButton, { variant: "outline", children: "Preview" }), _jsx(HiveButton, { onClick: handleSave, children: "Save Survey" })] })] })] }));
};
const FeedbackAnalytics = ({ survey, responses }) => {
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
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-gray-900", children: analytics.totalResponses }), _jsx("div", { className: "text-sm text-gray-500", children: "Total Responses" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-green-600", children: [analytics.responseRate, "%"] }), _jsx("div", { className: "text-sm text-gray-500", children: "Response Rate" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-amber-600", children: analytics.ratingAverages.find(r => r.questionId === 'overall_rating')?.average || 'N/A' }), _jsx("div", { className: "text-sm text-gray-500", children: "Overall Rating" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-blue-600", children: [analytics.yesNoStats.find(s => s.questionId === 'recommend')?.yesPercentage || 'N/A', "%"] }), _jsx("div", { className: "text-sm text-gray-500", children: "Would Recommend" })] })] }), analytics.ratingAverages.length > 0 && (_jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Rating Analysis" }), _jsx("div", { className: "space-y-4", children: analytics.ratingAverages.map((rating) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-gray-900 mb-1", children: rating.question }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(StarRating, { rating: rating.average }), _jsxs("span", { className: "text-sm text-gray-600", children: [rating.average, "/5 (", rating.count, " responses)"] })] })] }), _jsx("div", { className: "text-right", children: _jsx("div", { className: "text-2xl font-bold text-gray-900", children: rating.average }) })] }, rating.questionId))) })] })), analytics.yesNoStats.length > 0 && (_jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Yes/No Questions" }), _jsx("div", { className: "space-y-4", children: analytics.yesNoStats.map((stat) => (_jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900 mb-2", children: stat.question }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex-1 bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-green-500 h-2 rounded-full transition-all duration-500", style: { width: `${stat.yesPercentage}%` } }) }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(ThumbsUp, { className: "w-4 h-4 text-green-500" }), _jsxs("span", { className: "font-medium", children: [stat.yesPercentage, "%"] }), _jsxs("span", { className: "text-gray-500", children: ["(", stat.yesCount, "/", stat.totalCount, ")"] })] })] })] }, stat.questionId))) })] })), analytics.textResponses.some(tr => tr.responses.length > 0) && (_jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Written Feedback" }), _jsx("div", { className: "space-y-6", children: analytics.textResponses
                            .filter(tr => tr.responses.length > 0)
                            .map((textResponse) => (_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-3", children: textResponse.question }), _jsxs("div", { className: "space-y-3", children: [textResponse.responses.slice(0, 5).map((response, index) => (_jsx("div", { className: "p-3 bg-gray-50 rounded-lg", children: _jsx("p", { className: "text-gray-700 text-sm", children: response }) }, index))), textResponse.responses.length > 5 && (_jsxs("p", { className: "text-sm text-gray-500", children: ["+", textResponse.responses.length - 5, " more responses"] }))] })] }, textResponse.questionId))) })] }))] }));
};
export function EventFeedbackTool({ event, isBuilder = false, onSendFeedbackRequest, onExportFeedback }) {
    const [view, setView] = useState('overview');
    const [surveys, setSurveys] = useState([]);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    // Mock data - replace with API calls
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Mock API calls
                await new Promise(resolve => setTimeout(resolve, 1000));
                const mockSurvey = {
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
                const mockResponses = [
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
            }
            catch (error) {
                console.error('Failed to fetch feedback data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [event.id]);
    const handleSaveSurvey = useCallback((newSurvey) => {
        const survey = {
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
        }
        catch (error) {
            console.error('Failed to send feedback requests:', error);
            alert('Failed to send feedback requests');
        }
    }, [onSendFeedbackRequest]);
    if (loading) {
        return (_jsxs("div", { className: "p-8 text-center", children: [_jsx("div", { className: "w-8 h-8 bg-amber-500 rounded-lg animate-pulse mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading feedback data..." })] }));
    }
    const activeSurvey = surveys.find(s => s.isActive);
    if (view === 'create') {
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Create Feedback Survey" }), _jsx("p", { className: "text-gray-600", children: "Design a custom feedback form for your event" })] }), _jsx(HiveButton, { variant: "outline", onClick: () => setView('overview'), children: "Back to Overview" })] }), _jsx(FeedbackSurveyBuilder, { event: event, onSave: handleSaveSurvey })] }));
    }
    if (view === 'analytics' && activeSurvey) {
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Feedback Analytics" }), _jsxs("p", { className: "text-gray-600", children: ["Insights from ", activeSurvey.title] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(HiveButton, { variant: "outline", onClick: () => onExportFeedback?.('csv'), children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export Data"] }), _jsx(HiveButton, { variant: "outline", onClick: () => setView('overview'), children: "Back to Overview" })] })] }), _jsx(FeedbackAnalytics, { survey: activeSurvey, responses: responses })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Event Feedback" }), _jsx("p", { className: "text-gray-600", children: "Collect and analyze feedback from event attendees" })] }), isBuilder && (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(HiveButton, { variant: "outline", onClick: () => setView('create'), children: "Create Survey" }), activeSurvey && (_jsxs(HiveButton, { onClick: handleSendFeedbackRequest, children: [_jsx(Send, { className: "w-4 h-4 mr-2" }), "Send Requests"] }))] }))] }), _jsx(HiveCard, { className: "p-6", children: activeSurvey ? (_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: activeSurvey.title }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 border-green-200", children: "Active" })] }), _jsx("p", { className: "text-gray-600 mb-4", children: activeSurvey.description }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-4 h-4 text-gray-400" }), _jsxs("span", { className: "text-sm text-gray-600", children: [activeSurvey.responseCount, " responses"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-400" }), _jsxs("span", { className: "text-sm text-gray-600", children: [activeSurvey.averageRating, "/5 average"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MessageSquare, { className: "w-4 h-4 text-gray-400" }), _jsxs("span", { className: "text-sm text-gray-600", children: [activeSurvey.questions.length, " questions"] })] })] })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs(HiveButton, { size: "sm", onClick: () => setView('analytics'), children: [_jsx(BarChart3, { className: "w-4 h-4 mr-2" }), "View Analytics"] }), _jsxs(HiveButton, { size: "sm", variant: "outline", children: [_jsx(Eye, { className: "w-4 w-4 mr-2" }), "Preview Survey"] })] })] })) : (_jsxs("div", { className: "text-center py-8", children: [_jsx(MessageSquare, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No Active Survey" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Create a feedback survey to collect attendee responses after your event" }), isBuilder && (_jsx(HiveButton, { onClick: () => setView('create'), children: "Create Feedback Survey" }))] })) }), activeSurvey && responses.length > 0 && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-gray-900", children: responses.length }), _jsx("div", { className: "text-sm text-gray-500", children: "Total Responses" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-green-600", children: [Math.round((responses.length / activeSurvey.responseCount) * 100) || 0, "%"] }), _jsx("div", { className: "text-sm text-gray-500", children: "Response Rate" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-yellow-500", children: activeSurvey.averageRating }), _jsx("div", { className: "text-sm text-gray-500", children: "Avg Rating" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: responses.filter(r => r.responses.recommend === true).length }), _jsx("div", { className: "text-sm text-gray-500", children: "Recommenders" })] })] })), responses.length > 0 && (_jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Recent Responses" }), _jsx("div", { className: "space-y-4", children: responses.slice(0, 5).map((response) => (_jsxs("div", { className: "flex items-start justify-between p-4 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("p", { className: "font-medium text-gray-900", children: response.isAnonymous ? 'Anonymous' : response.userName }), response.responses.overall_rating && (_jsx(StarRating, { rating: response.responses.overall_rating }))] }), response.responses.improvements && (_jsxs("p", { className: "text-sm text-gray-600", children: ["\"", response.responses.improvements, "\""] }))] }), _jsx("div", { className: "text-xs text-gray-400", children: response.submittedAt.toLocaleDateString() })] }, response.id))) }), responses.length > 5 && (_jsx("div", { className: "text-center mt-4", children: _jsx(HiveButton, { variant: "outline", onClick: () => setView('analytics'), children: "View All Responses" }) }))] }))] }));
}
export default EventFeedbackTool;
//# sourceMappingURL=event-feedback-tool.js.map