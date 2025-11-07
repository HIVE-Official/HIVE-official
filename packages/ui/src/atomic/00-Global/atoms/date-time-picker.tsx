'use client';

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
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from './icon-library';

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

export const DateTimePicker = React.forwardRef<HTMLButtonElement, DateTimePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Select date and time',
      disabled = false,
      className,
      showTime = true,
      minDate,
      maxDate,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [viewDate, setViewDate] = React.useState<Date>(value || new Date());
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);

    // Update view date when value changes
    React.useEffect(() => {
      if (value) {
        setViewDate(value);
        setSelectedDate(value);
      }
    }, [value]);

    // Generate calendar days
    const getDaysInMonth = () => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days: (Date | null)[] = [];

      // Add empty cells for days before month starts
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }

      // Add days of month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }

      return days;
    };

    const days = getDaysInMonth();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Navigate months
    const previousMonth = () => {
      setViewDate(
        new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
      );
    };

    const nextMonth = () => {
      setViewDate(
        new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
      );
    };

    // Select date
    const selectDate = (date: Date) => {
      if (selectedDate && showTime) {
        // Preserve time when selecting new date
        date.setHours(selectedDate.getHours());
        date.setMinutes(selectedDate.getMinutes());
      }
      setSelectedDate(date);
      onChange?.(date);
      if (!showTime) {
        setOpen(false);
      }
    };

    // Update time
    const updateTime = (hours: number, minutes: number) => {
      const newDate = selectedDate ? new Date(selectedDate) : new Date();
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      setSelectedDate(newDate);
      onChange?.(newDate);
    };

    const isDateDisabled = (date: Date | null) => {
      if (!date) return true;
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    const isDateSelected = (date: Date | null) => {
      if (!date || !selectedDate) return false;
      return (
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      );
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal min-h-[44px]',
              !value && 'text-[var(--hive-text-tertiary)]',
              className
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              showTime ? (
                format(value, 'PPp')
              ) : (
                format(value, 'PP')
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <div className="space-y-3 p-3">
            {/* Month/Year Header */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={previousMonth}
                className="h-9 w-9 min-h-[44px] min-w-[44px]"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>

              <div className="text-sm font-semibold text-[var(--hive-text-primary)]">
                {months[viewDate.getMonth()]} {viewDate.getFullYear()}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextMonth}
                className="h-9 w-9 min-h-[44px] min-w-[44px]"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div
                  key={day}
                  className="flex h-9 w-9 items-center justify-center text-xs font-medium text-[var(--hive-text-tertiary)]"
                >
                  {day}
                </div>
              ))}

              {/* Day cells */}
              {days.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => day && selectDate(day)}
                  disabled={isDateDisabled(day)}
                  className={cn(
                    'flex h-9 w-9 min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-sm transition-colors hover:bg-[var(--hive-background-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] disabled:pointer-events-none disabled:opacity-50',
                    day &&
                      isDateSelected(day) &&
                      'bg-[var(--hive-brand-primary)] text-[var(--hive-brand-primary-text)] hover:bg-[var(--hive-brand-primary)]/90',
                    !day && 'invisible'
                  )}
                >
                  {day?.getDate()}
                </button>
              ))}
            </div>

            {/* Time Picker */}
            {showTime && selectedDate && (
              <div className="border-t border-[var(--hive-border-default)] pt-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-[var(--hive-text-secondary)]">
                      Hour
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="23"
                      value={selectedDate.getHours()}
                      onChange={(e) =>
                        updateTime(
                          parseInt(e.target.value) || 0,
                          selectedDate.getMinutes()
                        )
                      }
                      className="text-center"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-[var(--hive-text-secondary)]">
                      Minute
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={selectedDate.getMinutes()}
                      onChange={(e) =>
                        updateTime(
                          selectedDate.getHours(),
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 border-t border-[var(--hive-border-default)] pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedDate(undefined);
                  onChange?.(undefined);
                  setOpen(false);
                }}
                className="flex-1"
              >
                Clear
              </Button>
              <Button
                size="sm"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Done
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

DateTimePicker.displayName = 'DateTimePicker';
