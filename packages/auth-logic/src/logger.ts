/**
 * Simple logger utility for auth-logic package
 * Wraps console methods with consistent formatting
 */

interface LogMetadata {
  [key: string]: unknown;
}

class Logger {
  private formatMessage(level: string, message: string): string {
    return `[${level}] ${new Date().toISOString()} - ${message}`;
  }

  debug(message: string, metadata?: LogMetadata): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('DEBUG', message), metadata || '');
    }
  }

  info(message: string, metadata?: LogMetadata): void {
    console.info(this.formatMessage('INFO', message), metadata || '');
  }

  warn(message: string, metadata?: LogMetadata): void {
    console.warn(this.formatMessage('WARN', message), metadata || '');
  }

  error(message: string | Error, metadata?: LogMetadata): void {
    const errorMessage = message instanceof Error ? message.message : message;
    console.error(this.formatMessage('ERROR', errorMessage), metadata || '');
    if (message instanceof Error && message.stack) {
      console.error(message.stack);
    }
  }
}

export const logger = new Logger();