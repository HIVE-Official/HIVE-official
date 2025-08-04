/**
 * Simple logger utility for HIVE UI package
 * Provides consistent logging across components
 */
class Logger {
    constructor() {
        this.isDevelopment = process.env.NODE_ENV === 'development';
    }
    formatMessage(level, message, data) {
        const timestamp = new Date().toISOString();
        const prefix = `[HIVE-UI ${level.toUpperCase()}] ${timestamp}`;
        if (data) {
            return `${prefix} ${message} ${JSON.stringify(data, null, 2)}`;
        }
        return `${prefix} ${message}`;
    }
    debug(message, data) {
        if (this.isDevelopment) {
            console.debug(this.formatMessage('debug', message, data));
        }
    }
    info(message, data) {
        console.info(this.formatMessage('info', message, data));
    }
    warn(message, data) {
        console.warn(this.formatMessage('warn', message, data));
    }
    error(message, data) {
        console.error(this.formatMessage('error', message, data));
    }
}
export const logger = new Logger();
//# sourceMappingURL=logger.js.map