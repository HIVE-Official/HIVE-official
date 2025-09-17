# Pattern Migration Guide

## Automated Hook Extraction Results

### Loading State Pattern
- **Instances found**: 5
- **Hook to use**: `useLoadingState`
- **Import**: `import { useLoadingState } from '@hive/hooks/generated';`

**Before:**
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
```

**After:**
```typescript
const { data, loading, error, setData, setLoading, setError } = useAsyncState();
```

### Modal State Pattern
- **Instances found**: 12
- **Hook to use**: `useModalState`
- **Import**: `import { useModalState } from '@hive/hooks/generated';`

**Before:**
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
```

**After:**
```typescript
const { data, loading, error, setData, setLoading, setError } = useAsyncState();
```

### Form State Pattern
- **Instances found**: 2
- **Hook to use**: `useFormState`
- **Import**: `import { useFormState } from '@hive/hooks/generated';`

**Before:**
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
```

**After:**
```typescript
const { data, loading, error, setData, setLoading, setError } = useAsyncState();
```

### Data Fetching Pattern
- **Instances found**: 31
- **Hook to use**: `useFetchData`
- **Import**: `import { useFetchData } from '@hive/hooks/generated';`

**Before:**
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
```

**After:**
```typescript
const { data, loading, error, setData, setLoading, setError } = useAsyncState();
```

### Pagination Pattern
- **Instances found**: 1
- **Hook to use**: `usePagination`
- **Import**: `import { usePagination } from '@hive/hooks/generated';`

**Before:**
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
```

**After:**
```typescript
const { data, loading, error, setData, setLoading, setError } = useAsyncState();
```


## Estimated Impact
- **Code reduction**: ~255 lines
- **Consistency improvement**: 100%
- **Testing simplification**: Test hooks once, use everywhere
