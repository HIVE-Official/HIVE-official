/**
 * DateTimePicker - Date and time selection component
 *
 * Features:
 * - Calendar date picker with month/year navigation
 * - Time input (hours and minutes)
 * - Radix UI Popover for dropdown
 * - 44×44px minimum touch targets
 * - Keyboard accessible
 * - White glow focus states
 *
 * Usage:
 * ```tsx
 * import { DateTimePicker } from '@hive/ui';
 *
 * const [date, setDate] = useState<Date>();
 *
 * <DateTimePicker
 *   value={date}
 *   onChange={setDate}
 *   placeholder="Select date and time"
 * />
 * ```
 */
import * as React from 'react';
export interface DateTimePickerProps {
    /**
     * Selected date value
     */
    value?: Date;
    /**
     * Callback when date changes
     */
    onChange?: (date: Date | undefined) => void;
    /**
     * Placeholder text
     * @default "Select date and time"
     */
    placeholder?: string;
    /**
     * Disabled state
     */
    disabled?: boolean;
    /**
     * Additional class names for the trigger button
     */
    className?: string;
    /**
     * Include time picker
     * @default true
     */
    showTime?: boolean;
    /**
     * Minimum selectable date
     */
    minDate?: Date;
    /**
     * Maximum selectable date
     */
    maxDate?: Date;
}
export declare const DateTimePicker: React.ForwardRefExoticComponent<DateTimePickerProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=date-time-picker.d.ts.map