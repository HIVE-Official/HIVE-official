/**
 * Simple logger utility for auth-logic package
 * Wraps console methods with consistent formatting
 */
class Logger {
    formatMessage(level, message) {
        return `[${level}] ${new Date().toISOString()} - ${message}`;
    }
    debug(message, metadata) {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.debug(this.formatMessage('DEBUG', message), metadata || '');
        }
    }
    info(message, metadata) {
        // eslint-disable-next-line no-console
        console.info(this.formatMessage('INFO', message), metadata || '');
    }
    warn(message, metadata) {
        // eslint-disable-next-line no-console
        console.warn(this.formatMessage('WARN', message), metadata || '');
    }
    error(message, metadata) {
        const errorMessage = message instanceof Error ? message.message : message;
        // eslint-disable-next-line no-console
        console.error(this.formatMessage('ERROR', errorMessage), metadata || '');
        if (message instanceof Error && message.stack) {
            // eslint-disable-next-line no-console
            console.error(message.stack);
        }
    }
}
export const logger = new Logger();
//# sourceMappingURL=logger.js.map