'use client';

import { useState } from 'react';
import { logger } from '@/lib/logger';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  Zap,
  Users,
  Crown,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Mail,
  Calendar,
  Settings,
  Sparkles,
  ArrowRight,
  Upload,
  Eye,
  Target
} from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
  Badge,
  Avatar,
  FormField,
  Typography,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  RadioGroup,
  RadioGroupItem,
  Label,
  Separator,
  Progress
} from '@hive/ui';

interface Space {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  potentialMembers?: number;
  memberCount?: number;
  isVerified: boolean;
  status: 'preview' | 'active' | 'requested';
  requiredVerification?: {
    type: 'faculty_endorsement' | 'membership_proof' | 'leadership_election' | 'department_approval';
    description: string;
  };
}

interface SpaceActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  space: Space | null;
  onSuccess?: (activatedSpace: Space) => void;
}

const VERIFICATION_TYPES = {
  faculty_endorsement: {
    title: 'Faculty Endorsement',
    description: 'Email confirmation from a faculty member or department representative',
    examples: ['Email from department chair', 'Faculty advisor confirmation', 'Course instructor endorsement']
  },
  membership_proof: {
    title: 'Membership Verification',
    description: 'Proof of current membership or leadership in the organization',
    examples: ['Officer election results', 'Membership roster', 'Organization charter']
  },
  leadership_election: {
    title: 'Leadership Election',
    description: 'Documentation of democratic selection as space leader',
    examples: ['Election results', 'Appointment letter', 'Peer nominations']
  },
  department_approval: {
    title: 'Department Approval',
    description: 'Official approval from relevant UB department or administration',
    examples: ['Department permission letter', 'Admin approval email', 'Official documentation']
  }
};

export function SpaceActivationModal({ isOpen, onClose, space, onSuccess }: SpaceActivationModalProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    leadershipReason: '',
    qualifications: '',
    visionStatement: '',
    firstToolChoice: '',
    contactEmail: '',
    verificationFile: null as File | null,
    agreeToTerms: false
  });

  const handleSubmit = async () => {
    if (!space) return;

    try {
      setIsSubmitting(true);
      
      const submitData = {
        spaceId: space.id,
        action: space.status === 'preview' ? 'request_activation' : 'request_leadership',
        ...formData,
        campusId: 'ub-buffalo'
      };

      // Use different endpoints based on space status
      const endpoint = space.status === 'preview' 
        ? `/api/spaces/${space.id}/request-activation`
        : `/api/spaces/request-to-lead`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) throw new Error('Failed to submit request');
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error);

      setIsSuccess(true);
      onSuccess?.(space);
    } catch (error) {
      logger.error('Failed to submit request:', { error: String(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      leadershipReason: '',
      qualifications: '',
      visionStatement: '',
      firstToolChoice: '',
      contactEmail: '',
      verificationFile: null,
      agreeToTerms: false
    });
    setIsSuccess(false);
    onClose();
  };

  const canProceedStep1 = formData.leadershipReason.length > 20 && formData.qualifications.length > 10;
  const canProceedStep2 = formData.visionStatement.length > 30 && formData.firstToolChoice && formData.contactEmail;
  const canSubmit = formData.agreeToTerms && (!space?.requiredVerification || formData.verificationFile);

  if (!isOpen || !space) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl max-h-[90vh] overflow-auto"
      >
        <Card className="border-accent/20 shadow-2xl">
          <CardHeader className="border-b border-border bg-gradient-to-r from-background to-accent/5">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                  {space.status === 'preview' ? <Zap className="h-5 w-5 text-accent" /> : <Crown className="h-5 w-5 text-accent" />}
                </div>
                <div>
                  <div className="text-lg font-bold">
                    {space.status === 'preview' ? 'Activate Space' : 'Request Leadership'}
                  </div>
                  <div className="text-sm font-normal text-muted-foreground">
                    {space.status === 'preview' 
                      ? `Claim leadership of ${space.name}` 
                      : `Request to become a leader of ${space.name}`
                    }
                  </div>
                </div>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {isSuccess ? (
              <SuccessState space={space} onClose={handleClose} />
            ) : (
              <>
                {/* Space Preview */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <Card className="bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                              <span className="text-accent font-semibold text-sm">
                                {space.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <Typography weight="semibold" className="text-foreground">
                                {space.name}
                              </Typography>
                              <Badge variant="outline" className="text-xs">
                                <Eye className="h-3 w-3 mr-1" />
                                Preview Mode
                              </Badge>
                            </div>
                          </div>
                          <Typography size="small" color="medium" className="mb-2">
                            {space.description}
                          </Typography>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {space.status === 'preview' 
                                  ? `${space.potentialMembers} potential members`
                                  : `${space.memberCount} current members`
                                }
                              </span>
                            </div>
                            <Badge variant="secondary">{space.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((stepNum: any) => (
                      <div key={stepNum} className="flex items-center">
                        <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${
                          step >= stepNum 
                            ? 'border-accent bg-accent text-accent-foreground' 
                            : 'border-border text-muted-foreground'
                        }`}>
                          {step > stepNum ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            stepNum
                          )}
                        </div>
                        {stepNum < 3 && (
                          <div className={`h-px w-8 transition-colors ${step > stepNum ? 'bg-accent' : 'bg-border'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {/* Step 1: Leadership Justification */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <Typography size="large" weight="semibold" className="mb-2">
                          {space.status === 'preview' 
                            ? 'Why should you lead this space?' 
                            : 'Why should you join the leadership team?'
                          }
                        </Typography>
                        <Typography color="medium">
                          {space.status === 'preview'
                            ? 'Help us understand your connection to this community'
                            : 'Explain your vision and qualifications for co-leadership'
                          }
                        </Typography>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Leadership Justification <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            placeholder="Explain why you're the right person to lead this space. What's your connection to this community?"
                            value={formData.leadershipReason}
                            onChange={(e: any) => setFormData(prev => ({ ...prev, leadershipReason: e.target.value }))}
                            rows={4}
                            className="resize-none"
                          />
                          <div className="flex justify-between items-center mt-1">
                            <Typography size="small" color="medium">
                              Be specific about your relationship to this community
                            </Typography>
                            <Typography size="small" color={formData.leadershipReason.length >= 20 ? "default" : "medium"}>
                              {formData.leadershipReason.length}/20+ chars
                            </Typography>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Qualifications <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            placeholder="What experience, skills, or qualities make you qualified to lead?"
                            value={formData.qualifications}
                            onChange={(e: any) => setFormData(prev => ({ ...prev, qualifications: e.target.value }))}
                            rows={3}
                            className="resize-none"
                          />
                          <div className="flex justify-between items-center mt-1">
                            <Typography size="small" color="medium">
                              Leadership experience, relevant skills, commitment level
                            </Typography>
                            <Typography size="small" color={formData.qualifications.length >= 10 ? "default" : "medium"}>
                              {formData.qualifications.length}/10+ chars
                            </Typography>
                          </div>
                        </div>

                        {space.requiredVerification && (
                          <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
                            <CardContent className="p-4">
                              <div className="flex gap-3">
                                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <Typography size="small" weight="medium" className="mb-1">
                                    {VERIFICATION_TYPES[space.requiredVerification.type]?.title} Required
                                  </Typography>
                                  <Typography size="small" color="medium" className="mb-2">
                                    {VERIFICATION_TYPES[space.requiredVerification.type]?.description}
                                  </Typography>
                                  <div className="flex flex-wrap gap-2">
                                    {VERIFICATION_TYPES[space.requiredVerification.type]?.examples.map((example, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {example}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button 
                          onClick={() => setStep(2)} 
                          disabled={!canProceedStep1}
                          className="min-w-32"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Vision & First Tool */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <Typography size="large" weight="semibold" className="mb-2">
                          Your vision for this space
                        </Typography>
                        <Typography color="medium">
                          How will you activate and grow this community?
                        </Typography>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Community Vision <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            placeholder="Describe your vision for this space. What activities, events, or initiatives will you launch?"
                            value={formData.visionStatement}
                            onChange={(e: any) => setFormData(prev => ({ ...prev, visionStatement: e.target.value }))}
                            rows={4}
                            className="resize-none"
                          />
                          <div className="flex justify-between items-center mt-1">
                            <Typography size="small" color="medium">
                              Be specific about your plans to activate and engage members
                            </Typography>
                            <Typography size="small" color={formData.visionStatement.length >= 30 ? "default" : "medium"}>
                              {formData.visionStatement.length}/30+ chars
                            </Typography>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            First Tool to Plant <span className="text-destructive">*</span>
                          </Label>
                          <Select 
                            value={formData.firstToolChoice} 
                            onValueChange={(value: any) => setFormData(prev => ({ ...prev, firstToolChoice: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose your first tool to activate the space" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="quick_poll">Quick Poll - Get instant community feedback</SelectItem>
                              <SelectItem value="event_planner">Event Planner - Schedule meetups and activities</SelectItem>
                              <SelectItem value="announcement_board">Announcement Board - Share important updates</SelectItem>
                              <SelectItem value="signup_sheet">Signup Sheet - Organize volunteers and attendance</SelectItem>
                              <SelectItem value="resource_library">Resource Library - Share files and links</SelectItem>
                              <SelectItem value="discussion_forum">Discussion Forum - Enable community conversations</SelectItem>
                            </SelectContent>
                          </Select>
                          <Typography size="small" color="medium" className="mt-1">
                            This will be the first tool available to members when the space activates
                          </Typography>
                        </div>

                        <FormField
                          label="Contact Email"
                          type="email"
                          placeholder="your.email@buffalo.edu"
                          value={formData.contactEmail}
                          onChange={(e: any) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                          helperText="We'll use this for activation updates and space leadership communications"
                          required
                        />
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={() => setStep(1)}>
                          Back
                        </Button>
                        <Button 
                          onClick={() => setStep(3)}
                          disabled={!canProceedStep2}
                          className="min-w-32"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Verification & Commitment */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <Typography size="large" weight="semibold" className="mb-2">
                          Final step
                        </Typography>
                        <Typography color="medium">
                          Complete verification and confirm your commitment
                        </Typography>
                      </div>

                      <div className="space-y-4">
                        {space.requiredVerification && (
                          <div>
                            <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              {VERIFICATION_TYPES[space.requiredVerification.type]?.title}
                              <Badge variant="outline" className="text-xs">Required</Badge>
                            </Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center transition-colors hover:border-accent/50">
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
                                onChange={(e: any) => setFormData(prev => ({ 
                                  ...prev, 
                                  verificationFile: e.target.files?.[0] || null 
                                }))}
                                className="hidden"
                                id="verification-upload"
                              />
                              <Label htmlFor="verification-upload" className="cursor-pointer">
                                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <Typography size="small" weight="medium" className="mb-1">
                                  Upload verification document
                                </Typography>
                                <Typography size="small" color="medium">
                                  {VERIFICATION_TYPES[space.requiredVerification.type]?.description}
                                </Typography>
                                {formData.verificationFile && (
                                  <div className="mt-2 text-accent">
                                    <CheckCircle2 className="h-4 w-4 inline mr-1" />
                                    {formData.verificationFile.name}
                                  </div>
                                )}
                              </Label>
                            </div>
                          </div>
                        )}

                        <Card className="bg-accent/5 border-accent/20">
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <Crown className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <div>
                                <Typography size="small" weight="medium" className="mb-1">
                                  Leadership Responsibilities
                                </Typography>
                                <ul className="text-xs text-muted-foreground space-y-1">
                                  <li>• Actively engage and grow your community</li>
                                  <li>• Plant and manage useful tools for members</li>
                                  <li>• Maintain a welcoming, inclusive environment</li>
                                  <li>• Follow HIVE community guidelines</li>
                                  <li>• Transfer leadership before graduation</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="flex items-start space-x-2">
                          <input
                            type="checkbox"
                            id="agree-terms"
                            checked={formData.agreeToTerms}
                            onChange={(e: any) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                            className="mt-1"
                          />
                          <Label htmlFor="agree-terms" className="text-sm cursor-pointer">
                            I understand the leadership responsibilities and commit to actively building this community. 
                            I agree to HIVE's <button className="text-accent underline">Community Guidelines</button> and 
                            <button className="text-accent underline"> Terms of Service</button>.
                          </Label>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={() => setStep(2)}>
                          Back
                        </Button>
                        <Button 
                          onClick={handleSubmit}
                          disabled={isSubmitting || !canSubmit}
                          className="min-w-32"
                        >
                          {isSubmitting 
                            ? 'Submitting...' 
                            : space.status === 'preview' 
                              ? 'Activate Space' 
                              : 'Request Leadership'
                          }
                          <Sparkles className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

interface SuccessStateProps {
  space: Space;
  onClose: () => void;
}

function SuccessState({ space, onClose }: SuccessStateProps) {
  const router = useRouter();

  const handleViewSpace = () => {
    router.push(`/spaces/${space.id}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="h-8 w-8 text-green-500" />
      </div>
      
      <Typography size="large" weight="semibold" className="mb-2">
        {space.status === 'preview' ? 'Activation Request Submitted!' : 'Leadership Request Submitted!'}
      </Typography>
      
      <Typography color="medium" className="mb-6 max-w-md mx-auto">
        Your request to {space.status === 'preview' ? 'lead' : 'join the leadership of'} <strong>{space.name}</strong> has been submitted for review. 
        You'll receive an email notification within 24-48 hours about the approval status.
      </Typography>

      <Card className="bg-accent/5 border-accent/20 text-left mb-6">
        <CardContent className="p-4">
          <Typography size="small" weight="medium" className="mb-2">
            What happens next:
          </Typography>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>1. Your application will be reviewed by our team</li>
            <li>2. Verification documents (if required) will be validated</li>
            <li>3. You'll receive email confirmation of approval</li>
            <li>4. Space will transition from Preview to Active mode</li>
            <li>5. Your first tool will be automatically planted</li>
            <li>6. Potential members will be notified of activation</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={onClose}>
          Continue Exploring
        </Button>
        <Button onClick={handleViewSpace}>
          View Space
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}