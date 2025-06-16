// Translation keys and utilities

/**
 * Common translation keys
 */
export const translations = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
  },
} as const;

export type TranslationKey = keyof typeof translations; 