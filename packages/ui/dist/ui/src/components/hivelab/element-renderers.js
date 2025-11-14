'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Input, Button, Card, CardContent, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Progress, } from '../../atomic/index.js';
import { Search, Filter, Users, Calendar, Tag, FileText, Bell, MapPin, } from 'lucide-react';
// Search Input Element
export function SearchInputElement({ config, onChange }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debounceMs = config.debounceMs || 300;
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onChange && query !== '') {
                onChange({ query, searchTerm: query });
            }
            // Mock suggestions for demo
            if (config.showSuggestions && query.length > 2) {
                setSuggestions([
                    `${query} in spaces`,
                    `${query} in users`,
                    `${query} in posts`
                ]);
                setShowSuggestions(true);
            }
            else {
                setShowSuggestions(false);
            }
        }, debounceMs);
        return () => clearTimeout(timer);
    }, [query, debounceMs, onChange, config.showSuggestions]);
    return (_jsxs("div", { className: "relative", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: config.placeholder || 'Search...', className: "pl-10" })] }), showSuggestions && suggestions.length > 0 && (_jsx("div", { className: "absolute z-10 w-full mt-1 bg-background border border-border rounded-lg shadow-lg", children: suggestions.map((suggestion, index) => (_jsx("button", { className: "w-full px-3 py-2 text-left text-sm hover:bg-accent rounded-lg", onClick: () => {
                        setQuery(suggestion);
                        setShowSuggestions(false);
                    }, children: suggestion }, index))) }))] }));
}
// Filter Selector Element
export function FilterSelectorElement({ config, onChange }) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const options = config.options || [];
    const allowMultiple = config.allowMultiple !== false;
    const handleFilterToggle = (value) => {
        let newFilters;
        if (allowMultiple) {
            newFilters = selectedFilters.includes(value)
                ? selectedFilters.filter(f => f !== value)
                : [...selectedFilters, value];
        }
        else {
            newFilters = selectedFilters.includes(value) ? [] : [value];
        }
        setSelectedFilters(newFilters);
        if (onChange) {
            onChange({ selectedFilters: newFilters, filters: newFilters });
        }
    };
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Filter, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-sm font-medium", children: "Filters" })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: options.map((option, index) => {
                    const value = option.value || option;
                    const label = option.label || option;
                    const count = option.count;
                    const isSelected = selectedFilters.includes(value);
                    return (_jsxs(Button, { variant: isSelected ? "default" : "outline", size: "sm", onClick: () => handleFilterToggle(value), className: "h-8", children: [label, config.showCounts && count && (_jsx(Badge, { variant: "sophomore", className: "ml-2 h-4 text-xs", children: count }))] }, index));
                }) }), selectedFilters.length > 0 && (_jsxs("div", { className: "text-xs text-muted-foreground", children: [selectedFilters.length, " filter", selectedFilters.length !== 1 ? 's' : '', " applied"] }))] }));
}
// Result List Element
export function ResultListElement({ config, data }) {
    const items = data?.items || [];
    const itemsPerPage = config.itemsPerPage || 10;
    const showPagination = config.showPagination !== false;
    const paginatedItems = useMemo(() => {
        return items.slice(0, itemsPerPage);
    }, [items, itemsPerPage]);
    return (_jsx(Card, { children: _jsxs(CardContent, { className: "p-0", children: [_jsx("div", { className: "space-y-0", children: paginatedItems.length > 0 ? (paginatedItems.map((item, index) => (_jsx("div", { className: "px-6 py-4 border-b last:border-b-0 border-border hover:bg-muted/40 transition-colors", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium", children: item.title || `Result ${index + 1}` }), item.badge && (_jsx(Badge, { variant: "outline", children: item.badge }))] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: item.description || 'Campus tool description placeholder text' }), item.meta && (_jsx("div", { className: "text-xs text-muted-foreground mt-2 flex gap-4", children: item.meta.map((meta, metaIndex) => (_jsx("span", { children: meta }, metaIndex))) }))] }), _jsx(Button, { variant: "ghost", size: "sm", children: "Open" })] }) }, index)))) : (_jsx("div", { className: "px-6 py-12 text-center", children: _jsx("p", { className: "text-sm text-muted-foreground", children: "No results yet. Add data sources to see live preview." }) })) }), showPagination && (_jsxs("div", { className: "px-6 py-3 border-t border-border flex items-center justify-between", children: [_jsxs("span", { className: "text-sm text-muted-foreground", children: ["Showing ", paginatedItems.length, " of ", items.length, " results"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", children: "Previous" }), _jsx(Button, { variant: "outline", size: "sm", children: "Next" })] })] }))] }) }));
}
// Date Picker Element
export function DatePickerElement({ config, onChange }) {
    const [selectedDate, setSelectedDate] = useState('');
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-sm font-medium", children: "Date & Time" })] }), _jsx(Input, { type: config.includeTime ? 'datetime-local' : 'date', value: selectedDate, onChange: (e) => {
                    const value = e.target.value;
                    setSelectedDate(value);
                    if (onChange) {
                        onChange({ selectedDate: value });
                    }
                } }), config.helperText && (_jsx("p", { className: "text-xs text-muted-foreground", children: config.helperText }))] }));
}
// User Selector Element
export function UserSelectorElement({ config, onChange }) {
    const fakeUsers = [
        { id: '1', name: 'Amelia Chen', handle: '@amelia' },
        { id: '2', name: 'Jordan Smith', handle: '@jordan' },
        { id: '3', name: 'Liam Patel', handle: '@liam' },
        { id: '4', name: 'Sophia Martinez', handle: '@sophia' }
    ];
    const [selectedUser, setSelectedUser] = useState();
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-sm font-medium", children: "Select user" })] }), _jsxs(Select, { value: selectedUser, onValueChange: (value) => {
                    setSelectedUser(value);
                    if (onChange) {
                        onChange({ selectedUser: value });
                    }
                }, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Choose a member" }) }), _jsx(SelectContent, { children: fakeUsers.map((user) => (_jsx(SelectItem, { value: user.id, children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { children: user.name }), _jsx("span", { className: "text-xs text-muted-foreground", children: user.handle })] }) }, user.id))) })] }), config.allowMultiple && (_jsx("div", { className: "text-xs text-muted-foreground", children: "Multi-select will support drag-assignment once live data is wired." }))] }));
}
// Tag Cloud Element
export function TagCloudElement({ config, data }) {
    const tags = data?.tags || [
        { label: 'Rush Week', weight: 18 },
        { label: 'Study Groups', weight: 12 },
        { label: 'Gaming', weight: 9 },
        { label: 'Student Gov', weight: 7 },
        { label: 'Dorm Deals', weight: 5 },
    ];
    const sortedTags = [...tags].sort((a, b) => b.weight - a.weight).slice(0, config.maxTags || 30);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Tag, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-sm font-medium", children: "Tag Cloud" })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: sortedTags.map((tag, index) => (_jsxs(Badge, { variant: "outline", className: "text-sm font-medium px-3 py-1", style: {
                        fontSize: `${Math.max(12, Math.min(22, tag.weight + 12))}px`,
                    }, children: [tag.label, config.showCounts && (_jsx("span", { className: "text-xs text-muted-foreground ml-2", children: tag.weight }))] }, index))) })] }));
}
// Map View Element
export function MapViewElement() {
    return (_jsx("div", { className: "border border-dashed border-border rounded-lg h-60 flex items-center justify-center bg-muted/10 text-sm text-muted-foreground", children: _jsxs("div", { className: "space-y-2 text-center", children: [_jsx(MapPin, { className: "h-6 w-6 mx-auto text-muted-foreground" }), _jsx("p", { children: "Interactive map preview renders here once data is connected." })] }) }));
}
// Chart Display Element
export function ChartDisplayElement({ config }) {
    return (_jsx(Card, { className: "bg-gradient-to-br from-muted/50 to-muted", children: _jsxs(CardContent, { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Chart Preview" }), _jsx("p", { className: "text-2xl font-semibold", children: "Registration Flow" })] }), _jsxs(Badge, { variant: "outline", className: "uppercase text-[10px] tracking-wide", children: [config.chartType || 'bar', " chart"] })] }), _jsx("div", { className: "space-y-4", children: [60, 40, 80, 55].map((value, index) => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1", children: [_jsxs("span", { children: ["Week ", index + 1] }), _jsxs("span", { children: [value, "%"] })] }), _jsx(Progress, { value: value })] }, index))) }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Sample data shown. Connect analytics data to see real student behavior." })] }) }));
}
// Form Builder Element
export function FormBuilderElement({ config }) {
    const fields = config.fields || [
        { name: 'Title', type: 'text', required: true },
        { name: 'Description', type: 'textarea', required: false },
        { name: 'Location', type: 'text', required: false },
        { name: 'Date', type: 'date', required: true },
    ];
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-sm font-medium", children: "Form Fields" })] }), _jsx("div", { className: "space-y-3", children: fields.map((field, index) => (_jsxs("div", { className: "border border-dashed border-border rounded-lg px-4 py-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "font-medium", children: field.name }), _jsx(Badge, { variant: field.required ? 'default' : 'outline', children: field.type })] }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: field.required ? 'Required field' : 'Optional field' })] }, index))) }), _jsx(Button, { variant: "outline", size: "sm", children: "+ Add field" })] }));
}
// Notification Center Element
export function NotificationCenterElement({ config }) {
    const notifications = [
        { title: 'New RSVP', description: '14 students joined Powerlifting Rush Week', timeAgo: '2m' },
        { title: 'Tool Deployment', description: 'Dorm Dash Delivery went live in Founders Commons', timeAgo: '12m' },
        { title: 'Feedback', description: '3 students rated your form 5 stars', timeAgo: '1h' },
    ];
    return (_jsx(Card, { children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("div", { className: "px-6 py-4 border-b border-border flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-sm font-medium", children: "Live Notifications" })] }), _jsxs(Badge, { variant: "outline", children: [config.maxNotifications || 10, " max"] })] }), _jsx("div", { className: "divide-y divide-border", children: notifications.map((notification, index) => (_jsxs("div", { className: "px-6 py-4 hover:bg-muted/40 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "font-medium", children: notification.title }), _jsx("span", { className: "text-xs text-muted-foreground", children: notification.timeAgo })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: notification.description })] }, index))) })] }) }));
}
// Element renderer map
const ELEMENT_RENDERERS = {
    'search-input': SearchInputElement,
    'filter-selector': FilterSelectorElement,
    'result-list': ResultListElement,
    'date-picker': DatePickerElement,
    'user-selector': UserSelectorElement,
    'tag-cloud': TagCloudElement,
    'map-view': MapViewElement,
    'chart-display': ChartDisplayElement,
    'form-builder': FormBuilderElement,
    'notification-center': NotificationCenterElement,
};
export function renderElement(elementId, props) {
    const renderer = ELEMENT_RENDERERS[elementId];
    if (!renderer) {
        return (_jsxs("div", { className: "border border-dashed border-border rounded-lg p-4 text-sm text-muted-foreground", children: ["Unimplemented element: ", elementId] }));
    }
    return renderer(props);
}
//# sourceMappingURL=element-renderers.js.map