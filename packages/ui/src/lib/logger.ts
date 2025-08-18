/**
 * Simple logger utility for HIVE UI package
 * Provides consistent logging across components
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogData {
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, data?: LogData): string {
    const timestamp = new Date().toISOString();
    const prefix = `[HIVE-UI ${level.toUpperCase()}] ${timestamp}`;
    
    if (data) {
      return `${prefix} ${message} ${JSON.stringify(data, null, 2)}`;
    }
    return `${prefix} ${message}`;
  }

  debug(message: string, data?: LogData): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message, data));
    }
  }

  info(message: string, data?: LogData): void {
    console.info(this.formatMessage('info', message, data));
  }

  warn(message: string, data?: LogData): void {
    console.warn(this.formatMessage('warn', message, data));
  }

  error(message: string, data?: LogData): void {
    console.error(this.formatMessage('error', message, data));
  }
}

export const logger = new Logger();