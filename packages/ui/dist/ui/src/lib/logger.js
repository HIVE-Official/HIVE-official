// Simple logger utility for development
const isDevelopment = process.env.NODE_ENV === 'development';
export const logger = {
    log: (...args) => {
        if (isDevelopment) {
            console.log('[HIVE]', ...args);
        }
    },
    error: (...args) => {
        console.error('[HIVE ERROR]', ...args);
    },
    warn: (...args) => {
        if (isDevelopment) {
            console.warn('[HIVE WARN]', ...args);
        }
    },
    info: (...args) => {
        if (isDevelopment) {
            console.info('[HIVE INFO]', ...args);
        }
    },
    debug: (...args) => {
        if (isDevelopment) {
            console.debug('[HIVE DEBUG]', ...args);
        }
    },
    group: (label) => {
        if (isDevelopment) {
            console.group(label);
        }
    },
    groupEnd: () => {
        if (isDevelopment) {
            console.groupEnd();
        }
    },
    time: (label) => {
        if (isDevelopment) {
            console.time(label);
        }
    },
    timeEnd: (label) => {
        if (isDevelopment) {
            console.timeEnd(label);
        }
    },
};
//# sourceMappingURL=logger.js.map