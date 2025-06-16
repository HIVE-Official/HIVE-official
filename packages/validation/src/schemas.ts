// Common validation schemas
import { z } from 'zod';

/**
 * Basic email validation schema
 */
export const emailSchema = z.string().email('Invalid email address');

/**
 * Basic password validation schema
 */
export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');

/**
 * Basic ID validation schema
 */
export const idSchema = z.string().min(1, 'ID is required'); 