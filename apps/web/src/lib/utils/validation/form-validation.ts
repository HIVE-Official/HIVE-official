// Comprehensive form validation for HIVE platform
import { useState, useCallback, useEffect } from 'react';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
  warnings?: Record<string, string[]>;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (_value: any) => string | null;
  email?: boolean;
  url?: boolean;
  phone?: boolean;
  strongPassword?: boolean;
}

export class FormValidator {
  private rules: Record<string, ValidationRule> = {};
  private errors: Record<string, string[]> = {};
  private warnings: Record<string, string[]> = {};

  constructor(rules: Record<string, ValidationRule> = {}) {
    this.rules = rules;
  }

  addRule(field: string, rule: ValidationRule): void {
    this.rules[field] = rule;
  }

  validate(data: Record<string, any>): ValidationResult {
    this.errors = {};
    this.warnings = {};

    for (const [field, rule] of Object.entries(this.rules)) {
      const value = data[field];
      const fieldErrors = this.validateField(field, value, rule, data);
      
      if (fieldErrors.length > 0) {
        this.errors[field] = fieldErrors;
      }
    }

    return {
      isValid: Object.keys(this.errors).length === 0,
      errors: this.errors,
      warnings: this.warnings
    };
  }

  private validateField(
    field: string, 
    value: any, 
    rule: ValidationRule, 
    _allData: Record<string, any>
  ): string[] {
    const errors: string[] = [];

    // Required validation
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`${this.formatFieldName(field)} is required`);
      return errors; // Skip other validations if required field is empty
    }

    // Skip other validations if field is empty but not required
    if (value === undefined || value === null || value === '') {
      return errors;
    }

    // String validations
    if (typeof value === 'string') {
      // Length validations
      if (rule.minLength && value.length < rule.minLength) {
        errors.push(`${this.formatFieldName(field)} must be at least ${rule.minLength} characters`);
      }
      
      if (rule.maxLength && value.length > rule.maxLength) {
        errors.push(`${this.formatFieldName(field)} must be no more than ${rule.maxLength} characters`);
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(value)) {
        errors.push(`${this.formatFieldName(field)} format is invalid`);
      }

      // Email validation
      if (rule.email && !this.isValidEmail(value)) {
        errors.push(`${this.formatFieldName(field)} must be a valid email address`);
      }

      // URL validation
      if (rule.url && !this.isValidUrl(value)) {
        errors.push(`${this.formatFieldName(field)} must be a valid URL`);
      }

      // Phone validation
      if (rule.phone && !this.isValidPhone(value)) {
        errors.push(`${this.formatFieldName(field)} must be a valid phone number`);
      }

      // Strong password validation
      if (rule.strongPassword && !this.isStrongPassword(value)) {
        errors.push(`${this.formatFieldName(field)} must contain at least 8 characters, including uppercase, lowercase, number, and special character`);
      }
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        errors.push(customError);
      }
    }

    return errors;
  }

  private formatFieldName(field: string): string {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    return phoneRegex.test(cleanPhone);
  }

  private isStrongPassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough;
  }
}

// Pre-configured validators for common HIVE use cases
export const profileValidation = new FormValidator({
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/
  },
  handle: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_-]+$/,
    custom: (value: string) => {
      if (value.startsWith('_') || value.startsWith('-')) {
        return 'Handle cannot start with underscore or dash';
      }
      if (value.endsWith('_') || value.endsWith('-')) {
        return 'Handle cannot end with underscore or dash';
      }
      return null;
    }
  },
  email: {
    required: true,
    email: true,
    custom: (value: string) => {
      // Check if email ends with .edu for campus verification
      if (!value.endsWith('.edu')) {
        return 'Please use your .edu email address for campus verification';
      }
      return null;
    }
  },
  bio: {
    maxLength: 280
  },
  website: {
    url: true
  },
  phone: {
    phone: true
  }
});

export const spaceValidation = new FormValidator({
  name: {
    required: true,
    minLength: 3,
    maxLength: 50
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 500
  },
  category: {
    required: true
  }
});

export const toolValidation = new FormValidator({
  name: {
    required: true,
    minLength: 3,
    maxLength: 50
  },
  description: {
    required: true,
    minLength: 20,
    maxLength: 500
  },
  code: {
    required: true,
    minLength: 10,
    custom: (value: string) => {
      // Basic code validation - ensure it's not malicious
      const dangerousPatterns = [
        /eval\(/,
        /Function\(/,
        /setTimeout\(/,
        /setInterval\(/,
        /document\.cookie/,
        /localStorage/,
        /sessionStorage/,
        /\.innerHTML/,
        /\.outerHTML/
      ];
      
      for (const pattern of dangerousPatterns) {
        if (pattern.test(value)) {
          return 'Code contains potentially unsafe patterns';
        }
      }
      return null;
    }
  }
});

export const authValidation = new FormValidator({
  email: {
    required: true,
    email: true
  },
  password: {
    required: true,
    strongPassword: true
  },
  confirmPassword: {
    required: true,
    custom: (value: string, allData?: any) => {
      if (!allData || value !== allData.password) {
        return 'Passwords do not match';
      }
      return null;
    }
  }
});

// Real-time validation hook for React components
export function useFormValidation(
  initialData: Record<string, any> = {},
  validator: FormValidator
) {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = useCallback((field: string, value: any) => {
    const fieldValidator = new FormValidator({
      [field]: validator.rules[field]
    });
    
    const result = fieldValidator.validate({ [field]: value });
    
    setErrors(prev => ({
      ...prev,
      [field]: result.errors[field] || []
    }));

    return result.errors[field]?.length === 0;
  }, [validator]);

  const validateAll = useCallback(() => {
    const result = validator.validate(data);
    setErrors(result.errors);
    setIsValid(result.isValid);
    return result;
  }, [data, validator]);

  const setValue = useCallback((field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    
    // Validate field if it's been touched
    if (touched[field]) {
      validateField(field, value);
    }
  }, [touched, validateField]);

  const setFieldTouched = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, data[field]);
  }, [data, validateField]);

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({});
    setIsValid(false);
  }, [initialData]);

  useEffect(() => {
    const result = validator.validate(data);
    setIsValid(result.isValid);
  }, [data, validator]);

  return {
    data,
    errors,
    touched,
    isValid,
    setValue,
    setTouched: setFieldTouched,
    validateAll,
    reset
  };
}

