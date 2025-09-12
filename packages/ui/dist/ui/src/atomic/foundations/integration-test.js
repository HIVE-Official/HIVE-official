/**
 * HIVE Foundation Systems Integration Test
 * Simple validation that all foundation systems work together
 */
import { motionComposition } from './motion-composition.js';
import { typographyComposition } from './typography-composition.js';
import { colorComposition } from './color-composition.js';
import { layoutComposition } from './layout-composition.js';
import { iconComposition } from './icon-composition.js';
import { interactionComposition } from './interaction-composition.js';
import { shadowComposition } from './shadow-composition.js';
import { borderComposition } from './border-composition.js';
// === BASIC INTEGRATION VALIDATION ===
export const integrationTest = {
    // All 8 foundation systems
    systems: {
        motion: motionComposition,
        typography: typographyComposition,
        color: colorComposition,
        layout: layoutComposition,
        icon: iconComposition,
        interaction: interactionComposition,
        shadow: shadowComposition,
        border: borderComposition
    },
    // Validate all systems import successfully
    validateImports() {
        try {
            const systems = Object.values(this.systems);
            return systems.every(system => typeof system === 'object' && system !== null);
        }
        catch (error) {
            console.error('Foundation system import validation failed:', error);
            return false;
        }
    },
    // Test that we can access key properties from each system
    validateBasicIntegration() {
        try {
            // Test one key property from each system (smoke test)
            const tests = [
                motionComposition.durations.fast.value, // Motion system
                typographyComposition.families.primary.value, // Typography system
                colorComposition.system.brand.gold.primary, // Color system
                layoutComposition.spacing[4], // Layout system
                iconComposition.sizes.base.className, // Icon system
                interactionComposition.principles.philosophy, // Interaction system
                shadowComposition.scale.floating.shadow, // Shadow system
                borderComposition.radius.base.className // Border system
            ];
            return tests.every(test => typeof test === 'string');
        }
        catch (error) {
            console.error('Basic integration validation failed:', error);
            return false;
        }
    },
    // Run complete validation
    runValidation() {
        const systemsValid = this.validateImports();
        const integrationValid = this.validateBasicIntegration();
        const passed = systemsValid && integrationValid;
        return {
            passed,
            systems: Object.keys(this.systems).length,
            message: passed
                ? '✅ All 8 foundation systems integrated successfully'
                : '❌ Foundation system integration failed'
        };
    }
};
//# sourceMappingURL=integration-test.js.map