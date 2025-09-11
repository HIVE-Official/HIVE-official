import { toast as sonnerToast } from 'sonner';
import { CheckCircle, XCircle, Info, AlertTriangle, Loader2 } from 'lucide-react';
import { createElement } from 'react';

export const toast = {
  success: (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      icon: createElement(CheckCircle, { className: 'h-5 w-5 text-green-400' }),
      duration: 4000,
    });
  },

  error: (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
      icon: createElement(XCircle, { className: 'h-5 w-5 text-red-400' }),
      duration: 5000,
    });
  },

  info: (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
      icon: createElement(Info, { className: 'h-5 w-5 text-blue-400' }),
      duration: 4000,
    });
  },

  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
      icon: createElement(AlertTriangle, { className: 'h-5 w-5 text-yellow-400' }),
      duration: 4500,
    });
  },

  loading: (message: string, description?: string) => {
    return sonnerToast.loading(message, {
      description,
      icon: createElement(Loader2, { className: 'h-5 w-5 animate-spin text-[var(--hive-gold)]' }),
    });
  },

  promise: <T,>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading,
      success,
      error,
    });
  },

  // HIVE-specific success messages
  spaceJoined: (spaceName: string) => {
    toast.success(`Welcome to ${spaceName}!`, 'You can now participate in this space');
  },

  spaceLeft: (spaceName: string) => {
    toast.info(`Left ${spaceName}`, 'You can rejoin anytime');
  },

  postCreated: () => {
    toast.success('Post created!', 'Your post is now live');
  },

  profileUpdated: () => {
    toast.success('Profile updated', 'Your changes have been saved');
  },

  eventRSVP: (eventName: string) => {
    toast.success(`RSVP confirmed for ${eventName}`, 'We\'ll remind you when it starts');
  },

  toolInstalled: (toolName: string) => {
    toast.success(`${toolName} installed`, 'Tool is now available in your space');
  },

  // HIVE-specific error messages
  authRequired: () => {
    toast.error('Authentication required', 'Please sign in to continue');
  },

  networkError: () => {
    toast.error('Network error', 'Please check your connection and try again');
  },

  permissionDenied: () => {
    toast.error('Permission denied', 'You don\'t have access to perform this action');
  },

  somethingWentWrong: () => {
    toast.error('Something went wrong', 'Please try again later');
  },
};

export default toast;