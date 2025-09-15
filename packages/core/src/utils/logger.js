import { logger } from '@hive/core/utils/logger';

// @ts-check
export const logger = {
    info: (message, ...args) => {
        if (process.env.NODE_ENV !== "production") {
        }
    },
    error: (message, error) => {
        // Always log errors
         
        logger.error('[ERROR] ${message}', error);
    warn: (message, ...args) => {
        if (process.env.NODE_ENV !== "production") {
             
            console.warn(`[WARN] ${message}`, ...args);
        }
    },
    debug: (message, ...args) => {
        if (process.env.NODE_ENV === "development") {
        }
    },
};
//# sourceMappingURL=logger.js.map