'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { cn } from '../../lib/utils.js';
import { Button } from './button.js';
import { Input } from './input.js';
import { Popover, PopoverContent, PopoverTrigger } from './popover.js';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from './icon-library.js';
export const DateTimePicker = React.forwardRef(({ value, onChange, placeholder = 'Select date and time', disabled = false, className, showTime = true, minDate, maxDate, }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [viewDate, setViewDate] = React.useState(value || new Date());
    const [selectedDate, setSelectedDate] = React.useState(value);
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
        const days = [];
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
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };
    const nextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };
    // Select date
    const selectDate = (date) => {
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
    const updateTime = (hours, minutes) => {
        const newDate = selectedDate ? new Date(selectedDate) : new Date();
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        setSelectedDate(newDate);
        onChange?.(newDate);
    };
    const isDateDisabled = (date) => {
        if (!date)
            return true;
        if (minDate && date < minDate)
            return true;
        if (maxDate && date > maxDate)
            return true;
        return false;
    };
    const isDateSelected = (date) => {
        if (!date || !selectedDate)
            return false;
        return (date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear());
    };
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { ref: ref, variant: "outline", className: cn('w-full justify-start text-left font-normal min-h-[44px]', !value && 'text-[var(--hive-text-tertiary)]', className), disabled: disabled, children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), value ? (showTime ? (format(value, 'PPp')) : (format(value, 'PP'))) : (_jsx("span", { children: placeholder }))] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsxs("div", { className: "space-y-3 p-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: previousMonth, className: "h-9 w-9 min-h-[44px] min-w-[44px]", children: _jsx(ChevronLeftIcon, { className: "h-4 w-4" }) }), _jsxs("div", { className: "text-sm font-semibold text-[var(--hive-text-primary)]", children: [months[viewDate.getMonth()], " ", viewDate.getFullYear()] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: nextMonth, className: "h-9 w-9 min-h-[44px] min-w-[44px]", children: _jsx(ChevronRightIcon, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "grid grid-cols-7 gap-1", children: [['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (_jsx("div", { className: "flex h-9 w-9 items-center justify-center text-xs font-medium text-[var(--hive-text-tertiary)]", children: day }, day))), days.map((day, index) => (_jsx("button", { type: "button", onClick: () => day && selectDate(day), disabled: isDateDisabled(day), className: cn('flex h-9 w-9 min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-sm transition-colors hover:bg-[var(--hive-background-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] disabled:pointer-events-none disabled:opacity-50', day &&
                                        isDateSelected(day) &&
                                        'bg-[var(--hive-brand-primary)] text-[var(--hive-brand-primary-text)] hover:bg-[var(--hive-brand-primary)]/90', !day && 'invisible'), children: day?.getDate() }, index)))] }), showTime && selectedDate && (_jsx("div", { className: "border-t border-[var(--hive-border-default)] pt-3", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "mb-1 block text-xs font-medium text-[var(--hive-text-secondary)]", children: "Hour" }), _jsx(Input, { type: "number", min: "0", max: "23", value: selectedDate.getHours(), onChange: (e) => updateTime(parseInt(e.target.value) || 0, selectedDate.getMinutes()), className: "text-center" })] }), _jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "mb-1 block text-xs font-medium text-[var(--hive-text-secondary)]", children: "Minute" }), _jsx(Input, { type: "number", min: "0", max: "59", value: selectedDate.getMinutes(), onChange: (e) => updateTime(selectedDate.getHours(), parseInt(e.target.value) || 0), className: "text-center" })] })] }) })), _jsxs("div", { className: "flex gap-2 border-t border-[var(--hive-border-default)] pt-3", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => {
                                        setSelectedDate(undefined);
                                        onChange?.(undefined);
                                        setOpen(false);
                                    }, className: "flex-1", children: "Clear" }), _jsx(Button, { size: "sm", onClick: () => setOpen(false), className: "flex-1", children: "Done" })] })] }) })] }));
});
DateTimePicker.displayName = 'DateTimePicker';
//# sourceMappingURL=date-time-picker.js.map