/**
 * HIVE Design System ESLint Rules
 * Enforces brand compliance at build time
 */

// Unauthorized color patterns that violate HIVE brand guidelines
const FORBIDDEN_COLORS = [
  // Traditional status colors
  'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink',
  'rose', 'cyan', 'teal', 'emerald', 'lime', 'amber', 'violet',
  'indigo', 'fuchsia',
  
  // Specific Tailwind color variants
  'red-50', 'red-100', 'red-200', 'red-300', 'red-400', 'red-500', 'red-600', 'red-700', 'red-800', 'red-900',
  'green-50', 'green-100', 'green-200', 'green-300', 'green-400', 'green-500', 'green-600', 'green-700', 'green-800', 'green-900',
  'blue-50', 'blue-100', 'blue-200', 'blue-300', 'blue-400', 'blue-500', 'blue-600', 'blue-700', 'blue-800', 'blue-900',
  'purple-50', 'purple-100', 'purple-200', 'purple-300', 'purple-400', 'purple-500', 'purple-600', 'purple-700', 'purple-800', 'purple-900',
  
  // Color aliases that should use HIVE tokens
  'success', 'error', 'warning', 'info', 'danger',
];

// Allowed HIVE brand colors
const ALLOWED_COLORS = [
  'background', 'foreground', 'surface', 'surface-01', 'surface-02', 'surface-03',
  'border', 'muted', 'disabled', 'accent', 'accent-hover', 'accent-active',
  'ring', 'ring-offset', 'card', 'popover', 'primary', 'secondary',
  'white', 'black', 'transparent', 'current', 'inherit'
];

// Forbidden motion values (should use HIVE timing)
const FORBIDDEN_MOTION = [
  '100ms', '150ms', '200ms', '250ms', '300ms', '350ms', '450ms', '500ms',
  'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'
];

// Allowed HIVE motion values
const ALLOWED_MOTION = [
  '50ms', '90ms', '120ms', '180ms', '280ms', '400ms',
  'var(--motion-instant)', 'var(--motion-micro)', 'var(--motion-fast)',
  'var(--motion-standard)', 'var(--motion-slow)', 'var(--motion-ritual)',
  'var(--motion-curve)', 'var(--motion-smooth)', 'var(--motion-snap)', 'var(--motion-elegant)'
];

/**
 * Check if a string contains forbidden color classes
 */
function containsForbiddenColors(value) {
  if (typeof value !== 'string') return false;
  
  const colorPatterns = FORBIDDEN_COLORS.map(color => 
    `(text-${color}|bg-${color}|border-${color}|ring-${color}|from-${color}|to-${color}|via-${color})`
  );
  
  const regex = new RegExp(`\\b(${colorPatterns.join('|')})\\b`, 'i');
  return regex.test(value);
}

/**
 * Extract color classes from className string
 */
function extractColorClasses(value) {
  if (typeof value !== 'string') return [];
  
  const matches = value.match(/\b(text-|bg-|border-|ring-|from-|to-|via-)[a-z0-9-]+/gi) || [];
  return matches;
}

/**
 * Check if motion value violates HIVE guidelines
 */
function isForbiddenMotion(value) {
  if (typeof value !== 'string') return false;
  return FORBIDDEN_MOTION.includes(value.trim());
}

export default {
  rules: {
    'no-unauthorized-colors': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce HIVE monochrome + gold color system',
          category: 'Design System',
          recommended: true,
        },
        fixable: null,
        schema: [],
        messages: {
          forbiddenColor: 'Color "{{ color }}" violates HIVE design system. Use monochrome + gold system: {{ allowed }}',
          useDesignTokens: 'Use HIVE design tokens instead of hardcoded colors: {{ suggestion }}',
        },
      },
      create(context) {
        return {
          // Check JSX className attributes
          JSXAttribute(node) {
            if (node.name.name === 'className' && node.value) {
              let classValue = '';
              
              if (node.value.type === 'Literal') {
                classValue = node.value.value;
              } else if (node.value.type === 'JSXExpressionContainer' && 
                        node.value.expression.type === 'TemplateLiteral') {
                // Handle template literals
                classValue = node.value.expression.quasis.map(q => q.value.raw).join('');
              }
              
              if (containsForbiddenColors(classValue)) {
                const violatingClasses = extractColorClasses(classValue)
                  .filter(cls => FORBIDDEN_COLORS.some(forbidden => cls.includes(forbidden)));
                
                violatingClasses.forEach(cls => {
                  context.report({
                    node,
                    messageId: 'forbiddenColor',
                    data: {
                      color: cls,
                      allowed: 'background, foreground, surface, accent, muted, border'
                    },
                  });
                });
              }
            }
          },

          // Check CSS-in-JS objects (styled-components, emotion, etc.)
          Property(node) {
            if (node.key && node.value && 
                ['color', 'backgroundColor', 'borderColor'].includes(node.key.name)) {
              
              let colorValue = '';
              if (node.value.type === 'Literal') {
                colorValue = node.value.value;
              }
              
              // Check for hex colors that aren't HIVE brand colors
              const hiveBrandColors = ['#0A0A0A', '#FFFFFF', '#111111', '#2A2A2A', '#6B7280', '#FFD700', '#EAC200', '#C4A500'];
              if (colorValue.startsWith('#') && !hiveBrandColors.includes(colorValue.toUpperCase())) {
                context.report({
                  node,
                  messageId: 'useDesignTokens',
                  data: {
                    suggestion: 'hsl(var(--background)), hsl(var(--accent)), etc.'
                  },
                });
              }
            }
          },

          // Check for hardcoded transition durations
          Property(node) {
            if (node.key && node.value && 
                ['transitionDuration', 'animationDuration'].includes(node.key.name)) {
              
              let motionValue = '';
              if (node.value.type === 'Literal') {
                motionValue = node.value.value;
              }
              
              if (isForbiddenMotion(motionValue)) {
                context.report({
                  node,
                  message: `Motion timing "${motionValue}" violates HIVE design system. Use: ${ALLOWED_MOTION.slice(0, 6).join(', ')}`,
                });
              }
            }
          },
        };
      },
    },

    'require-hive-motion': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Require HIVE motion timing and easing curves',
          category: 'Design System',
          recommended: true,
        },
        fixable: 'code',
        schema: [],
        messages: {
          useHiveMotion: 'Use HIVE motion timing: {{ suggestion }}',
          useHiveCurve: 'Use HIVE easing curves: {{ suggestion }}',
        },
      },
      create(context) {
        return {
          // Check transition and animation properties
          Property(node) {
            if (node.key && node.value) {
              const propertyName = node.key.name || node.key.value;
              
              if (['transition', 'transitionTimingFunction', 'animationTimingFunction'].includes(propertyName)) {
                let value = '';
                if (node.value.type === 'Literal') {
                  value = node.value.value;
                }
                
                if (FORBIDDEN_MOTION.includes(value)) {
                  context.report({
                    node,
                    messageId: propertyName.includes('TimingFunction') ? 'useHiveCurve' : 'useHiveMotion',
                    data: {
                      suggestion: propertyName.includes('TimingFunction') 
                        ? 'var(--motion-curve), var(--motion-smooth), var(--motion-elegant)'
                        : 'var(--motion-standard), var(--motion-fast), var(--motion-slow)'
                    },
                  });
                }
              }
            }
          },
        };
      },
    },

    'no-hardcoded-spacing': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Discourage hardcoded spacing values',
          category: 'Design System',
          recommended: true,
        },
        fixable: null,
        schema: [],
        messages: {
          useSpacingTokens: 'Use HIVE spacing tokens instead of hardcoded values: {{ suggestion }}',
        },
      },
      create(context) {
        return {
          Property(node) {
            if (node.key && node.value && 
                ['margin', 'padding', 'gap', 'top', 'right', 'bottom', 'left'].includes(node.key.name)) {
              
              let value = '';
              if (node.value.type === 'Literal') {
                value = node.value.value;
              }
              
              // Check for hardcoded pixel values (but allow 0)
              if (typeof value === 'string' && /^\d+px$/.test(value) && value !== '0px') {
                const pixelValue = parseInt(value);
                let suggestion = 'var(--spacing-md)';
                
                // Suggest appropriate spacing token
                if (pixelValue <= 4) suggestion = 'var(--spacing-xs)';
                else if (pixelValue <= 8) suggestion = 'var(--spacing-sm)';
                else if (pixelValue <= 12) suggestion = 'var(--spacing-md)';
                else if (pixelValue <= 16) suggestion = 'var(--spacing-lg)';
                else if (pixelValue <= 24) suggestion = 'var(--spacing-xl)';
                else if (pixelValue <= 32) suggestion = 'var(--spacing-2xl)';
                else suggestion = 'var(--spacing-3xl) or var(--spacing-4xl)';
                
                context.report({
                  node,
                  messageId: 'useSpacingTokens',
                  data: { suggestion },
                });
              }
            }
          },
        };
      },
    },

    'enforce-hive-typography': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce HIVE typography scale and font families',
          category: 'Design System',
          recommended: true,
        },
        fixable: null,
        schema: [],
        messages: {
          useHiveTypography: 'Use HIVE typography classes: {{ suggestion }}',
          useHiveFonts: 'Use HIVE font families: {{ suggestion }}',
        },
      },
      create(context) {
        return {
          // Check for hardcoded font-size in CSS-in-JS
          Property(node) {
            if (node.key && node.value && node.key.name === 'fontSize') {
              let value = '';
              if (node.value.type === 'Literal') {
                value = node.value.value;
              }
              
              if (typeof value === 'string' && /^\d+px$/.test(value)) {
                context.report({
                  node,
                  messageId: 'useHiveTypography',
                  data: {
                    suggestion: '.text-display, .text-h1, .text-h2, .text-body, etc.'
                  },
                });
              }
            }

            // Check font-family
            if (node.key && node.value && node.key.name === 'fontFamily') {
              let value = '';
              if (node.value.type === 'Literal') {
                value = node.value.value;
              }
              
              const hiveAcceptedFonts = ['var(--font-display)', 'var(--font-sans)', 'var(--font-mono)'];
              if (value && !hiveAcceptedFonts.some(font => value.includes(font))) {
                context.report({
                  node,
                  messageId: 'useHiveFonts',
                  data: {
                    suggestion: 'var(--font-display), var(--font-sans), var(--font-mono)'
                  },
                });
              }
            }
          },
        };
      },
    },
  },
};