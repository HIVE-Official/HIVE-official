/**
 * Create Event Modal - Temporary stub for MVP
 * Will be fully implemented post-launch
 */

import React from 'react';

export const CreateEventModal = ({ isOpen, onClose, onCreate, ...props }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-[var(--hive-background-secondary)] p-6 rounded-2xl max-w-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-[var(--hive-text-primary)]">Create Event</h2>
        <p className="mt-2 text-[var(--hive-text-secondary)]">Event creation coming soon...</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-[var(--hive-brand-primary)] text-black rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
};
