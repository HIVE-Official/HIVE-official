'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Input,
  Button,
  Card,
  CardContent,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Progress,
} from '../../atomic/atoms';
import {
  Search,
  Filter,
  Users,
  Calendar,
  Tag,
  BarChart3,
  Clock,
  FileText,
  Bell,
  MapPin,
} from 'lucide-react';
import type { ElementProps } from '../../lib/hivelab/element-system';

// Search Input Element
export function SearchInputElement({ config, onChange }: ElementProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
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
      } else {
        setShowSuggestions(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, onChange, config.showSuggestions]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder={config.placeholder || 'Search...'}
          className="pl-10"
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-3 py-2 text-left text-sm hover:bg-accent rounded-lg"
              onClick={() => {
                setQuery(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Filter Selector Element
export function FilterSelectorElement({ config, onChange }: ElementProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const options = config.options || [];
  const allowMultiple = config.allowMultiple !== false;

  const handleFilterToggle = (value: string) => {
    let newFilters: string[];
    
    if (allowMultiple) {
      newFilters = selectedFilters.includes(value)
        ? selectedFilters.filter(f => f !== value)
        : [...selectedFilters, value];
    } else {
      newFilters = selectedFilters.includes(value) ? [] : [value];
    }
    
    setSelectedFilters(newFilters);
    if (onChange) {
      onChange({ selectedFilters: newFilters, filters: newFilters });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {options.map((option: any, index: number) => {
          const value = option.value || option;
          const label = option.label || option;
          const count = option.count;
          const isSelected = selectedFilters.includes(value);
          
          return (
            <Button
              key={index}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterToggle(value)}
              className="h-8"
            >
              {label}
              {config.showCounts && count && (
                <Badge variant="sophomore" className="ml-2 h-4 text-xs">
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
      
      {selectedFilters.length > 0 && (
        <div className="text-xs text-muted-foreground">
          {selectedFilters.length} filter{selectedFilters.length !== 1 ? 's' : ''} applied
        </div>
      )}
    </div>
  );
}

// Result List Element
export function ResultListElement({ config, data }: ElementProps) {
  const items = data?.items || [];
  const itemsPerPage = config.itemsPerPage || 10;
  const showPagination = config.showPagination !== false;

  const paginatedItems = useMemo(() => {
    return items.slice(0, itemsPerPage);
  }, [items, itemsPerPage]);

  return (
    <Card>
      <CardContent className="p-0">
        <div className="space-y-0">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item: any, index: number) => (
              <div
                key={index}
                className="px-6 py-4 border-b last:border-b-0 border-border hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.title || `Result ${index + 1}`}</span>
                      {item.badge && (
                        <Badge variant="outline">{item.badge}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description || 'Campus tool description placeholder text'}
                    </p>
                    {item.meta && (
                      <div className="text-xs text-muted-foreground mt-2 flex gap-4">
                        {item.meta.map((meta: string, metaIndex: number) => (
                          <span key={metaIndex}>{meta}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-muted-foreground">No results yet. Add data sources to see live preview.</p>
            </div>
          )}
        </div>

        {showPagination && (
          <div className="px-6 py-3 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Showing {paginatedItems.length} of {items.length} results
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Date Picker Element
export function DatePickerElement({ config, onChange }: ElementProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Date & Time</span>
      </div>

      <Input
        type={config.includeTime ? 'datetime-local' : 'date'}
        value={selectedDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          setSelectedDate(value);
          if (onChange) {
            onChange({ selectedDate: value });
          }
        }}
      />

      {config.helperText && (
        <p className="text-xs text-muted-foreground">{config.helperText}</p>
      )}
    </div>
  );
}

// User Selector Element
export function UserSelectorElement({ config, onChange }: ElementProps) {
  const fakeUsers = [
    { id: '1', name: 'Amelia Chen', handle: '@amelia' },
    { id: '2', name: 'Jordan Smith', handle: '@jordan' },
    { id: '3', name: 'Liam Patel', handle: '@liam' },
    { id: '4', name: 'Sophia Martinez', handle: '@sophia' }
  ];

  const [selectedUser, setSelectedUser] = useState<string | undefined>();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Select user</span>
      </div>

      <Select
        value={selectedUser}
        onValueChange={(value) => {
          setSelectedUser(value);
          if (onChange) {
            onChange({ selectedUser: value });
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose a member" />
        </SelectTrigger>
        <SelectContent>
          {fakeUsers.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              <div className="flex flex-col">
                <span>{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.handle}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {config.allowMultiple && (
        <div className="text-xs text-muted-foreground">
          Multi-select will support drag-assignment once live data is wired.
        </div>
      )}
    </div>
  );
}

// Tag Cloud Element
export function TagCloudElement({ config, data }: ElementProps) {
  const tags = data?.tags || [
    { label: 'Rush Week', weight: 18 },
    { label: 'Study Groups', weight: 12 },
    { label: 'Gaming', weight: 9 },
    { label: 'Student Gov', weight: 7 },
    { label: 'Dorm Deals', weight: 5 },
  ];

  const sortedTags = [...tags].sort((a, b) => b.weight - a.weight).slice(0, config.maxTags || 30);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Tag Cloud</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {sortedTags.map((tag, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-sm font-medium px-3 py-1"
            style={{
              fontSize: `${Math.max(12, Math.min(22, tag.weight + 12))}px`,
            }}
          >
            {tag.label}
            {config.showCounts && (
              <span className="text-xs text-muted-foreground ml-2">
                {tag.weight}
              </span>
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
}

// Map View Element
export function MapViewElement() {
  return (
    <div className="border border-dashed border-border rounded-lg h-60 flex items-center justify-center bg-muted/10 text-sm text-muted-foreground">
      <div className="space-y-2 text-center">
        <MapPin className="h-6 w-6 mx-auto text-muted-foreground" />
        <p>Interactive map preview renders here once data is connected.</p>
      </div>
    </div>
  );
}

// Chart Display Element
export function ChartDisplayElement({ config }: ElementProps) {
  return (
    <Card className="bg-gradient-to-br from-muted/50 to-muted">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Chart Preview</p>
            <p className="text-2xl font-semibold">Registration Flow</p>
          </div>
          <Badge variant="outline" className="uppercase text-[10px] tracking-wide">
            {config.chartType || 'bar'} chart
          </Badge>
        </div>

        <div className="space-y-4">
          {[60, 40, 80, 55].map((value, index) => (
            <div key={index}>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Week {index + 1}</span>
                <span>{value}%</span>
              </div>
              <Progress value={value} />
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          Sample data shown. Connect analytics data to see real student behavior.
        </div>
      </CardContent>
    </Card>
  );
}

// Form Builder Element
export function FormBuilderElement({ config }: ElementProps) {
  const fields = config.fields || [
    { name: 'Title', type: 'text', required: true },
    { name: 'Description', type: 'textarea', required: false },
    { name: 'Location', type: 'text', required: false },
    { name: 'Date', type: 'date', required: true },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Form Fields</span>
      </div>

      <div className="space-y-3">
        {fields.map((field: any, index: number) => (
          <div
            key={index}
            className="border border-dashed border-border rounded-lg px-4 py-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{field.name}</span>
              <Badge variant={field.required ? 'default' : 'outline'}>
                {field.type}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {field.required ? 'Required field' : 'Optional field'}
            </p>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm">
        + Add field
      </Button>
    </div>
  );
}

// Notification Center Element
export function NotificationCenterElement({ config }: ElementProps) {
  const notifications = [
    { title: 'New RSVP', description: '14 students joined Powerlifting Rush Week', timeAgo: '2m' },
    { title: 'Tool Deployment', description: 'Dorm Dash Delivery went live in Founders Commons', timeAgo: '12m' },
    { title: 'Feedback', description: '3 students rated your form 5 stars', timeAgo: '1h' },
  ];

  return (
    <Card>
      <CardContent className="p-0">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Live Notifications</span>
          </div>
          <Badge variant="outline">{config.maxNotifications || 10} max</Badge>
        </div>

        <div className="divide-y divide-border">
          {notifications.map((notification, index) => (
            <div key={index} className="px-6 py-4 hover:bg-muted/40 transition-colors">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{notification.title}</span>
                <span className="text-xs text-muted-foreground">{notification.timeAgo}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {notification.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Element renderer map
const ELEMENT_RENDERERS: Record<string, (props: ElementProps) => JSX.Element> = {
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

export function renderElement(elementId: string, props: ElementProps) {
  const renderer = ELEMENT_RENDERERS[elementId];
  if (!renderer) {
    return (
      <div className="border border-dashed border-border rounded-lg p-4 text-sm text-muted-foreground">
        Unimplemented element: {elementId}
      </div>
    );
  }

  return renderer(props);
}
