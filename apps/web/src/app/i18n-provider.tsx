'use client';

import { I18nextProvider } from 'react-i18next';
import i18next from '@hive/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
} 