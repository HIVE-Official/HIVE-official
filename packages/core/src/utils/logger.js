// @ts-check
export const logger = {
    info: (message, ...args) => {
        if (process.env.NODE_ENV !== "production") {
             
            console.info(`[INFO] ${message}`, ...args);
        }
    },
    error: (message, error) => {
        // Always log errors
         
        console.error(`[ERROR] ${message}`, error);
        // TODO: Add proper error reporting service integration here
    },
    warn: (message, ...args) => {
        if (process.env.NODE_ENV !== "production") {
             
            console.warn(`[WARN] ${message}`, ...args);
        }
    },
    debug: (message, ...args) => {
        if (process.env.NODE_ENV === "development") {
             
            console.debug(`[DEBUG] ${message}`, ...args);
        }
    },
};
//# sourceMappingURL=logger.js.map