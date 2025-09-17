'use client';

import React from 'react';
import { CreateEventModal } from '../events/event-modal';

// Re-export CreateEventModal as EventCreationModal for compatibility
export function EventCreationModal(props: any) {
  return <CreateEventModal {...props} />;
}

export default EventCreationModal;