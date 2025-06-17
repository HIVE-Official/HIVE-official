"use client";

import React, { useState } from "react";
import { AlertTriangle, Shield, Send } from "lucide-react";
import { Button } from "../ui/button";

interface ReportDialogProps {
  reportedUserId?: string;
  reportedContentId?: string;
  reportedContentType?: "profile" | "post" | "comment" | "message" | "space";
  reportedUserName?: string;
  contentPreview?: string;
  children: React.ReactNode;
  onReportSubmitted?: (reportId: string) => void;
}

export function ReportDialog({
  reportedUserId: _reportedUserId,
  reportedContentId: _reportedContentId,
  reportedContentType,
  reportedUserName: _reportedUserName,
  contentPreview,
  children,
  onReportSubmitted,
}: ReportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReason || !description.trim()) return;

    setIsSubmitting(true);
    try {
      // Mock submission - replace with actual useReportUser hook
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onReportSubmitted?.("mock-report-id");
      setIsOpen(false);
      setSelectedReason("");
      setDescription("");
    } catch (error) {
      console.error("Report submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedReason("");
    setDescription("");
  };

  if (!isOpen) {
    return <div onClick={() => setIsOpen(true)}>{children}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-semibold">
            Report {reportedContentType || "User"}
          </h2>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Help us keep HIVE safe by reporting inappropriate content or behavior.
        </p>

        {contentPreview && (
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm mb-4">
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              Content being reported:
            </p>
            <p className="line-clamp-3">{contentPreview}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Reason for report
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            >
              <option value="">Select a reason...</option>
              <option value="harassment">Harassment or intimidation</option>
              <option value="bullying">Bullying</option>
              <option value="hate_speech">Hate speech</option>
              <option value="violence_threats">Violence or threats</option>
              <option value="inappropriate_content">
                Inappropriate content
              </option>
              <option value="spam">Spam</option>
              <option value="fake_profile">Fake profile</option>
              <option value="impersonation">Impersonation</option>
              <option value="self_harm">Self-harm content</option>
              <option value="academic_dishonesty">Academic dishonesty</option>
              <option value="privacy_violation">Privacy violation</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide details about why you're reporting this..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md h-24 resize-none bg-white dark:bg-gray-800"
              minLength={10}
              maxLength={1000}
            />
            <p className="text-xs text-gray-500 mt-1">
              {description.length}/1000 characters (minimum 10)
            </p>
          </div>

          {(selectedReason === "violence_threats" ||
            selectedReason === "self_harm") && (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-200">
                  This requires immediate attention. If you or someone you know
                  is in immediate danger, please contact local emergency
                  services or call a crisis helpline.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !selectedReason || description.trim().length < 10 || isSubmitting
            }
            className="flex-1"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Report
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
