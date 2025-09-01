"use client";

import { ButtonEnhanced, Typography, Dialog } from "@hive/ui";

interface OrgAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrgAccessModal({ isOpen, onClose }: OrgAccessModalProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Organization Access"
      size="sm"
    >
      <div className="space-y-4">
        <Typography variant="body">
          Organization access is currently in beta. Please check back later or
          contact us for early access.
        </Typography>
        <div className="flex justify-end">
          <ButtonEnhanced variant="accent" onClick={onClose}>
            Close
          </ButtonEnhanced>
        </div>
      </div>
    </Dialog>
  );
} 