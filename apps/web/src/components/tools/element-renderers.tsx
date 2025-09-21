"use client";

import { useState, useEffect, useMemo } from 'react';
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
  Progress
} from '@hive/ui';
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
  MapPin
} from 'lucide-react';
import { ElementProps } from '@/lib/element-system';

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
          onChange={(e: React.ChangeEvent) => setQuery(e.target.value)}
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
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayItems = items.slice(startIndex, startIndex + itemsPerPage);

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No results found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {displayItems.map((item: any, index: number) => (
          <Card key={index} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <h3 className="font-medium">{item.title || item.name || `Item ${index + 1}`}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    {item.type && <Badge variant="freshman">{item.type}</Badge>}
                    {item.date && (
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, items.length)} of {items.length}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Date Picker Element
export function DatePickerElement({ config, onChange }: ElementProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const includeTime = config.includeTime || false;
  const allowRange = config.allowRange || false;

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    if (onChange) {
      onChange({
        selectedDate: date,
        selectedTime: includeTime ? selectedTime : undefined,
        selectedDates: allowRange ? [date] : date
      });
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    if (onChange) {
      onChange({
        selectedDate,
        selectedTime: time,
        selectedDates: allowRange ? [selectedDate] : selectedDate
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">
          {allowRange ? 'Date Range' : 'Select Date'}
        </span>
      </div>
      
      <div className="space-y-2">
        <Input
          type="date"
          value={selectedDate}
          onChange={(e: React.ChangeEvent) => handleDateChange(e.target.value)}
          min={config.minDate}
          max={config.maxDate}
        />
        
        {includeTime && (
          <Input
            type="time"
            value={selectedTime}
            onChange={(e: React.ChangeEvent) => handleTimeChange(e.target.value)}
          />
        )}
        
        {allowRange && selectedDate && (
          <Input
            type="date"
            placeholder="End date"
            min={selectedDate}
            max={config.maxDate}
          />
        )}
      </div>
    </div>
  );
}

// User Selector Element
export function UserSelectorElement({ config, onChange }: ElementProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const allowMultiple = config.allowMultiple || false;
  const showAvatars = config.showAvatars !== false;
  
  // Mock users for demo
  const mockUsers = useMemo(() => [
    { id: '1', name: 'Alice Johnson', avatar: '👩', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', avatar: '👨', email: 'bob@example.com' },
    { id: '3', name: 'Carol Davis', avatar: '👩‍🦳', email: 'carol@example.com' },
    { id: '4', name: 'David Wilson', avatar: '👨‍🦲', email: 'david@example.com' },
  ], []);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (userId: string) => {
    let newSelection: string[];
    
    if (allowMultiple) {
      newSelection = selectedUsers.includes(userId)
        ? selectedUsers.filter(id => id !== userId)
        : [...selectedUsers, userId];
    } else {
      newSelection = selectedUsers.includes(userId) ? [] : [userId];
    }
    
    setSelectedUsers(newSelection);
    if (onChange) {
      onChange({ 
        selectedUsers: newSelection,
        selectedUserData: mockUsers.filter(u => newSelection.includes(u.id))
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">
          {allowMultiple ? 'Select Users' : 'Select User'}
        </span>
      </div>
      
      <Input
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e: React.ChangeEvent) => setSearchQuery(e.target.value)}
      />
      
      <div className="max-h-40 overflow-y-auto space-y-1">
        {filteredUsers.map(user => (
          <div
            key={user.id}
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
              selectedUsers.includes(user.id) ? 'bg-primary/10 border border-primary/20' : 'hover:bg-accent'
            }`}
            onClick={() => handleUserSelect(user.id)}
          >
            {showAvatars && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                {user.avatar}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedUsers.length > 0 && (
        <div className="text-xs text-muted-foreground">
          {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
}

// Chart Display Element
export function ChartDisplayElement({ config, data }: ElementProps) {
  const chartData = data?.chartData || [];
  const chartType = config.chartType || 'bar';
  const showLegend = config.showLegend !== false;
  
  // Mock chart implementation using simple bars
  const maxValue = Math.max(...chartData.map((item: any) => item.value || 0));

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">
          {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
        </span>
      </div>
      
      {chartData.length === 0 ? (
        <div className="h-32 flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
          No data to display
        </div>
      ) : (
        <div className="space-y-2">
          {chartData.map((item: any, index: number) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.label || `Item ${index + 1}`}</span>
                <span className="font-medium">{item.value}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showLegend && chartData.length > 0 && (
        <div className="text-xs text-muted-foreground">
          Total: {chartData.reduce((sum: number, item: any) => sum + (item.value || 0), 0)}
        </div>
      )}
    </div>
  );
}

// Form Builder Element
export function FormBuilderElement({ config, onChange }: ElementProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const fields = config.fields || [];
  const validateOnChange = config.validateOnChange !== false;

  const handleFieldChange = (fieldName: string, value: any) => {
    const newFormData = { ...formData, [fieldName]: value };
    setFormData(newFormData);
    
    // Clear error for this field
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
    
    if (onChange) {
      onChange({ formData: newFormData, isValid: validateForm(newFormData) });
    }
  };

  const validateForm = (data: Record<string, any>) => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach((field: any) => {
      if (field.required && (!data[field.name] || data[field.name].toString().trim() === '')) {
        newErrors[field.name] = `${field.label || field.name} is required`;
      }
    });
    
    if (validateOnChange) {
      setErrors(newErrors);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm(formData);
    if (isValid && onChange) {
      onChange({ 
        formData, 
        action: 'submit',
        isValid: true
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Form</span>
      </div>
      
      <div className="space-y-3">
        {fields.map((field: any, index: number) => (
          <div key={index} className="space-y-1">
            <label className="text-sm font-medium">
              {field.label || field.name}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                className="w-full p-2 border border-border rounded-lg resize-none"
                rows={3}
                value={formData[field.name] || ''}
                onChange={(e: React.ChangeEvent) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
              />
            ) : field.type === 'select' ? (
              <Select
                value={formData[field.name] || ''}
                onValueChange={(value) => handleFieldChange(field.name, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder || 'Select...'} />
                </SelectTrigger>
                <SelectContent>
                  {(field.options || []).map((option: any, optIndex: number) => (
                    <SelectItem key={optIndex} value={option.value || option}>
                      {option.label || option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={field.type || 'text'}
                value={formData[field.name] || ''}
                onChange={(e: React.ChangeEvent) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
              />
            )}
            
            {errors[field.name] && (
              <div className="text-xs text-destructive">{errors[field.name]}</div>
            )}
          </div>
        ))}
        
        <Button onClick={handleSubmit} className="w-full">
          Submit Form
        </Button>
      </div>
    </div>
  );
}

// Element renderer registry
export const ELEMENT_RENDERERS = {
  'search-input': SearchInputElement,
  'filter-selector': FilterSelectorElement,
  'result-list': ResultListElement,
  'date-picker': DatePickerElement,
  'user-selector': UserSelectorElement,
  'chart-display': ChartDisplayElement,
  'form-builder': FormBuilderElement,
  // Add more renderers as needed
};

// Generic element renderer
export function renderElement(elementId: string, props: ElementProps): JSX.Element {
  const Renderer = ELEMENT_RENDERERS[elementId as keyof typeof ELEMENT_RENDERERS];
  
  if (!Renderer) {
    return (
      <div className="p-4 border border-dashed border-muted-foreground rounded-lg text-center text-muted-foreground">
        <div className="text-sm">Element: {elementId}</div>
        <div className="text-xs">Renderer not implemented</div>
      </div>
    );
  }
  
  return <Renderer {...props} />;
}