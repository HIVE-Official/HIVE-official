"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Input,
  Alert,
  AlertDescription,
  Progress,
  Badge
} from '@hive/ui';
import {
  Flag,
  AlertTriangle,
  Shield,
  X,
  CheckCircle,
  MessageSquare,
  Camera,
  Link as LinkIcon
} from 'lucide-react';

interface ReportContentModalProps {
  contentId: string;
  contentType: 'post' | 'comment' | 'message' | 'tool' | 'space' | 'profile' | 'event';
  contentPreview?: string;
  spaceId?: string;
  trigger?: React.ReactNode;
}

interface ReportFormData {
  category: string;
  subCategory: string;
  description: string;
  evidenceUrls: string[];
  additionalContext: string;
}

export function ReportContentModal({
  contentId,
  contentType,
  contentPreview,
  spaceId,
  trigger
}: ReportContentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'category' | 'details' | 'evidence' | 'review' | 'complete'>('category');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<ReportFormData>({
    category: '',
    subCategory: '',
    description: '',
    evidenceUrls: [],
    additionalContext: ''
  });

  const [newUrl, setNewUrl] = useState('');

  const reportCategories = [
    { value: 'spam', label: 'Spam or unwanted content', description: 'Repetitive, irrelevant, or promotional content' },
    { value: 'harassment', label: 'Harassment or bullying', description: 'Targeting individuals with harmful behavior' },
    { value: 'hate_speech', label: 'Hate speech', description: 'Content promoting hatred based on identity' },
    { value: 'inappropriate_content', label: 'Inappropriate content', description: 'Content not suitable for the community' },
    { value: 'misinformation', label: 'Misinformation', description: 'False or misleading information' },
    { value: 'violence', label: 'Violence or threats', description: 'Content promoting or depicting violence' },
    { value: 'self_harm', label: 'Self-harm content', description: 'Content promoting self-injury or suicide' },
    { value: 'privacy_violation', label: 'Privacy violation', description: 'Sharing personal information without consent' },
    { value: 'copyright', label: 'Copyright infringement', description: 'Unauthorized use of copyrighted material' },
    { value: 'impersonation', label: 'Impersonation', description: 'Pretending to be someone else' },
    { value: 'other', label: 'Other violation', description: 'Other community guideline violations' }
  ];

  const subCategories = {
    harassment: ['Personal attacks', 'Doxxing', 'Stalking', 'Targeted abuse'],
    hate_speech: ['Racial slurs', 'Religious hatred', 'Gender-based', 'Sexual orientation'],
    inappropriate_content: ['Adult content', 'Graphic imagery', 'Disturbing content', 'Off-topic'],
    spam: ['Commercial spam', 'Repetitive posting', 'Link farming', 'Bot activity'],
    violence: ['Physical threats', 'Graphic violence', 'Weapons', 'Self-defense'],
    other: ['Terms of service', 'Community rules', 'Platform abuse', 'Technical misuse']
  };

  const resetForm = () => {
    setFormData({
      category: '',
      subCategory: '',
      description: '',
      evidenceUrls: [],
      additionalContext: ''
    });
    setCurrentStep('category');
    setReportId(null);
    setNewUrl('');
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'category':
        setCurrentStep('details');
        break;
      case 'details':
        setCurrentStep('evidence');
        break;
      case 'evidence':
        setCurrentStep('review');
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'details':
        setCurrentStep('category');
        break;
      case 'evidence':
        setCurrentStep('details');
        break;
      case 'review':
        setCurrentStep('evidence');
        break;
    }
  };

  const addEvidenceUrl = () => {
    if (newUrl.trim() && !formData.evidenceUrls.includes(newUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        evidenceUrls: [...prev.evidenceUrls, newUrl.trim()]
      }));
      setNewUrl('');
    }
  };

  const removeEvidenceUrl = (url: string) => {
    setFormData(prev => ({
      ...prev,
      evidenceUrls: prev.evidenceUrls.filter(u => u !== url)
    }));
  };

  const submitReport = async () => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/content/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId,
          contentType,
          category: formData.category,
          subCategory: formData.subCategory || undefined,
          description: formData.description,
          evidence: formData.evidenceUrls.length > 0 || formData.additionalContext ? {
            urls: formData.evidenceUrls,
            additionalContext: formData.additionalContext
          } : undefined,
          spaceId
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setReportId(result.reportId);
        setCurrentStep('complete');
      } else {
        throw new Error(result.message || 'Failed to submit report');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'category': return 25;
      case 'details': return 50;
      case 'evidence': return 75;
      case 'review': return 90;
      case 'complete': return 100;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'category': return formData.category !== '';
      case 'details': return formData.description.trim().length >= 10;
      case 'evidence': return true; // Evidence is optional
      case 'review': return true;
      default: return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        resetForm();
      }
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="max-w-sm" className="text-red-400 border-red-400/50 hover:bg-red-400/10">
            <Flag className="h-4 w-4 mr-2" />
            Report
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-400" />
            <span>Report Content</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          {currentStep !== 'complete' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-gray-400">{getStepProgress()}%</span>
              </div>
              <Progress value={getStepProgress()} className="w-full" />
            </div>
          )}

          {/* Content Preview */}
          {contentPreview && currentStep !== 'complete' && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {contentType}
                </Badge>
                <span className="text-sm text-gray-400">Content being reported:</span>
              </div>
              <p className="text-gray-300 text-sm line-clamp-3">{contentPreview}</p>
            </div>
          )}

          {/* Step: Category Selection */}
          {currentStep === 'category' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Why are you reporting this content?</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Select the category that best describes the issue with this content.
                </p>
              </div>

              <div className="space-y-2">
                {reportCategories.map((category) => (
                  <div
                    key={category.value}
                    onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.category === category.value
                        ? 'border-red-400 bg-red-400/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-white">{category.label}</h4>
                        <p className="text-sm text-gray-400 mt-1">{category.description}</p>
                      </div>
                      {formData.category === category.value && (
                        <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 ml-3" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step: Details */}
          {currentStep === 'details' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Provide details</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Help us understand the issue by providing specific details.
                </p>
              </div>

              {/* Sub-category */}
              {subCategories[formData.category as keyof typeof subCategories] && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Specific issue (optional)
                  </label>
                  <Select value={formData.subCategory} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, subCategory: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specific issue" />
                    </SelectTrigger>
                    <SelectContent>
                      {subCategories[formData.category as keyof typeof subCategories].map((sub) => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, description: (e.target as any).value }))}
                  placeholder="Describe specifically what you think violates our community guidelines..."
                  className="min-h-[100px]"
                  maxLength={1000}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Be specific and factual</span>
                  <span>{formData.description.length}/1000</span>
                </div>
              </div>

              {formData.description.length > 0 && formData.description.length < 10 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Please provide at least 10 characters to help us understand the issue.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Step: Evidence */}
          {currentStep === 'evidence' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Add evidence (optional)</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Provide any additional context or evidence to support your report.
                </p>
              </div>

              {/* URLs */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Related URLs
                </label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUrl((e.target as any).value)}
                    placeholder="https://example.com/related-content"
                    className="flex-1"
                  />
                  <Button
                    onClick={addEvidenceUrl}
                    variant="outline"
                    className="max-w-sm"
                    disabled={!newUrl.trim()}
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                
                {formData.evidenceUrls.length > 0 && (
                  <div className="space-y-1">
                    {formData.evidenceUrls.map((url, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded border">
                        <span className="text-sm text-gray-300 truncate flex-1 mr-2">{url}</span>
                        <Button
                          onClick={() => removeEvidenceUrl(url)}
                          variant="outline"
                          className="max-w-sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Context */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Additional context
                </label>
                <Textarea
                  value={formData.additionalContext}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, additionalContext: (e.target as any).value }))}
                  placeholder="Any additional information that might help us review this report..."
                  className="min-h-[80px]"
                  maxLength={500}
                />
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {formData.additionalContext.length}/500
                </div>
              </div>

              <Alert>
                <Camera className="h-4 w-4" />
                <AlertDescription>
                  Screenshots and images can be submitted after the initial report through our support system.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Step: Review */}
          {currentStep === 'review' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Review your report</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Please review the information before submitting your report.
                </p>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white capitalize">{formData.category.replace('_', ' ')}</span>
                </div>
                
                {formData.subCategory && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Specific issue:</span>
                    <span className="text-white">{formData.subCategory}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-700">
                  <span className="text-gray-400 block mb-1">Description:</span>
                  <p className="text-white text-sm">{formData.description}</p>
                </div>

                {formData.evidenceUrls.length > 0 && (
                  <div className="pt-2 border-t border-gray-700">
                    <span className="text-gray-400 block mb-1">Evidence URLs:</span>
                    <div className="space-y-1">
                      {formData.evidenceUrls.map((url, index) => (
                        <div key={index} className="text-blue-400 text-sm truncate">{url}</div>
                      ))}
                    </div>
                  </div>
                )}

                {formData.additionalContext && (
                  <div className="pt-2 border-t border-gray-700">
                    <span className="text-gray-400 block mb-1">Additional context:</span>
                    <p className="text-white text-sm">{formData.additionalContext}</p>
                  </div>
                )}
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Your report will be reviewed by our moderation team within 24 hours. We may contact you if additional information is needed.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Step: Complete */}
          {currentStep === 'complete' && (
            <div className="text-center space-y-4 py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <div>
                <h3 className="text-xl font-medium text-white mb-2">Report Submitted</h3>
                <p className="text-gray-400 mb-4">
                  Thank you for helping keep our community safe. Your report has been submitted successfully.
                </p>
                {reportId && (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 inline-block">
                    <span className="text-sm text-gray-400">Report ID: </span>
                    <span className="text-white font-mono">{reportId}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Our moderation team will review your report within 2-24 hours</p>
                <p>• We may contact you if additional information is needed</p>
                <p>• You can check the status of your report in your profile settings</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep !== 'complete' && (
            <div className="flex justify-between pt-4 border-t border-gray-800">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={currentStep === 'category'}
              >
                Back
              </Button>

              <div className="space-x-2">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                
                {currentStep === 'review' ? (
                  <Button
                    onClick={submitReport}
                    disabled={isSubmitting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isSubmitting ? (
                      <>
                        <MessageSquare className="h-4 w-4 mr-2 animate-pulse" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Flag className="h-4 w-4 mr-2" />
                        Submit Report
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Close button for complete step */}
          {currentStep === 'complete' && (
            <div className="text-center">
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-green-600 hover:bg-green-700"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}