# Onboarding Component Alternatives

This directory contains multiple subjective approaches to onboarding components.

## 🎯 **Current Alternatives**

### **Academic Information Step**
- **`academic-step.tsx`** - Motion-first approach with smooth animations
- **`academic-card-step.tsx`** - Card-first approach with information density

### **Interest Selection Step**
- **`interests-step.tsx`** - Category-first hierarchical selection
- **`interests-selection-step.tsx`** - Tag-first social discovery pattern

### **Welcome Step**
- **`welcome-step.tsx`** - Hero-first brand introduction
- **`welcome-role-step.tsx`** - Role-first utility-focused approach

## 📋 **Selection Guide**

**Choose Motion-First (`*-step.tsx`) When:**
- Mobile-first experience
- Smooth animations priority
- Minimal cognitive load
- Performance is key

**Choose Card-First (`*-card-step.tsx`) When:**
- Information density needed
- Familiar patterns preferred
- Desktop-first experience
- Multiple data points

## 🧪 **A/B Testing Status**

- **Academic Step**: Testing both approaches in vBETA
- **Interest Selection**: Testing both approaches in vBETA  
- **Welcome Step**: Testing both approaches in vBETA

## 🎯 **Usage in Code**

```typescript
// Import both alternatives
import { AcademicStep } from './academic-step';
import { AcademicCardStep } from './academic-card-step';

// Use feature flags or context to choose
const useCardApproach = useFeatureFlag('onboarding-card-approach');
const AcademicComponent = useCardApproach ? AcademicCardStep : AcademicStep;
```

See `/packages/ui/COMPONENT_ALTERNATIVES.md` for complete documentation.