// i18n configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * Initialize i18n configuration
 */
export const initI18n = async () => {
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en: {
          translation: {
            // Add translations here
          },
        },
      },
    });
};

export default i18n; 