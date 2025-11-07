'use client';
export const HIVE_EASING = {
    liquid: [0.23, 1, 0.32, 1],
    magnetic: [0.25, 0.46, 0.45, 0.94],
    silk: [0.16, 1, 0.3, 1],
};
export const enterTransition = {
    duration: 0.45,
    ease: HIVE_EASING.liquid,
};
export const popTransition = {
    duration: 0.28,
    ease: HIVE_EASING.magnetic,
};
//# sourceMappingURL=motion-presets.js.map