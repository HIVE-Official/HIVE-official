import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',
  
  // HIVE Branding
  brandTitle: 'HIVE Component Library',
  brandUrl: 'https://hive.dev',
  
  // Colors - Matte Obsidian Glass Aesthetic
  colorPrimary: '#FBBF24', // Golden accent
  colorSecondary: '#F59E0B', // Deeper gold
  
  // UI
  appBg: '#0F0F0F',
  appContentBg: '#1A1A1A',
  appBorderColor: 'rgba(255, 255, 255, 0.1)',
  appBorderRadius: 12,
  
  // Text
  textColor: '#FFFFFF',
  textInverseColor: '#000000',
  textMutedColor: 'rgba(255, 255, 255, 0.6)',
  
  // Toolbar
  barTextColor: 'rgba(255, 255, 255, 0.8)',
  barSelectedColor: '#FBBF24',
  barBg: 'rgba(0, 0, 0, 0.2)',
  
  // Form
  inputBg: 'rgba(255, 255, 255, 0.05)',
  inputBorder: 'rgba(255, 255, 255, 0.1)',
  inputTextColor: '#FFFFFF',
  inputBorderRadius: 8,
  
  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: '"Fira Code", monospace',
});