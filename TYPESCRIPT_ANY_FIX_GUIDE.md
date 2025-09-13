# TypeScript 'any' Fix Guide

## Statistics
- **Total 'any' usage**: 1154
- **Files affected**: 329
- **Critical issues**: 14
- **High priority**: 778

## Common Replacements

- `event: any` → `event: React.ChangeEvent<HTMLInputElement>`
- `error: any` → `error: Error | null`
- `data: any` → `data: unknown`
- `response: any` → `response: Response`
- `props: any` → `props: Record<string, unknown>`
- `children: any` → `children: React.ReactNode`
- `value: any` → `value: string | number | boolean`
- `item: any` → `item: unknown`
- `user: any` → `user: { id: string; email: string; [key: string]: unknown }`
- `config: any` → `config: Record<string, unknown>`

## Fix Priority

### 1. Critical (Props)
- packages\ui\src\atomic\organisms\profile-dashboard.tsx:777
- packages\ui\src\atomic\organisms\profile-dashboard.tsx:781
- packages\ui\src\index-minimal.ts:91
- packages\ui\src\index-production.ts:40
- packages\ui\src\index-production.ts:47

### 2. High (Function Parameters & Return Types)
- apps\web\src\app\api\activity\insights\route.ts:364
- apps\web\src\app\api\admin\dashboard\route.ts:293
- apps\web\src\app\api\admin\spaces\analytics\route.ts:120
- apps\web\src\app\api\admin\spaces\route.ts:682
- apps\web\src\app\api\analytics\metrics\route.ts:223

### 3. Medium (State & Variables)
- apps\web\src\app\(dashboard)\tools\[toolId]\deploy\page.tsx:60
- apps\web\src\app\dashboard\page.tsx:18
- apps\web\src\components\events\event-tool-integration.tsx:126
- apps\web\src\components\profile\profile-page.tsx:111
- apps\web\src\hooks\use-events.ts:257


## TypeScript Configuration Recommendations

Add these to your tsconfig.json to prevent new 'any' usage:

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

Or simply use:
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```


## Next Steps
1. Fix critical prop type issues first
2. Update function signatures
3. Enable strict mode in tsconfig.json
4. Run `npx tsc --noEmit` to verify fixes
